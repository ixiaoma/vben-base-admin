<template>
  <div class="custom-upload">
    <Upload
      :class="[{ 'custom-upload-placeholer-img': customPlaceholderImg }]"
      :file-list="fileListRef"
      :action="action"
      :accept="getStringAccept"
      :multiple="multiple"
      :before-upload="beforeUpload"
      :show-upload-list="showUploadList"
      :list-type="listType"
      :headers="newHeaders"
      :data="data"
      :customRequest="uploadApiByItem"
      @preview="handlePreview"
      @remove="handleRemoveImg"
    >
      <img v-if="isUploadList" :src="imgUrl" alt="" />
      <div v-if="isUploadList">
        <img
          v-if="customPlaceholderImg"
          class="custom-upload-placeholer-img"
          :src="customPlaceholderImg"
        />
        <div class="custom-upload-inner-content">
          <loading-outlined v-if="isUploadingRef" />
          <plus-outlined v-else />
          <div class="ant-upload-text">{{
            isUploadingRef
              ? t('component.upload.uploading') + '...'
              : uploadChoseText || t('component.upload.choose')
          }}</div>
        </div>
      </div>
    </Upload>
    <a-modal
      v-if="previewVisible"
      :visible="previewVisible"
      :title="previewTitle"
      :footer="null"
      @cancel="handleCancel"
    >
      <img alt="" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
  <Alert
    v-if="showHelpText"
    :message="getHelpText"
    type="info"
    banner
    class="upload-modal-toolbar__text"
  />
  <FileList
    v-if="isFileList"
    :dataSource="fileListRef"
    :columns="columns"
    :actionColumn="actionColumn"
  />
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRefs, unref, computed, PropType, inject } from 'vue';
  import { Upload, Alert } from 'ant-design-vue';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  // hooks
  import { useUploadType } from './useUpload';
  import { useMessage } from '/@/hooks/web/useMessage';
  //   types
  import { FileItem, UploadResultStatus } from './typing';
  import { basicProps } from './props';
  import { createTableColumns, createActionColumn } from './data';
  // utils
  import { checkImgType, getBase64WithFile } from './helper';
  import { buildUUID } from '/@/utils/uuid';
  import { isFunction } from '/@/utils/is';
  import { warn } from '/@/utils/log';
  import FileList from './FileList.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { propTypes } from '/@/utils/propTypes';
  import { USER_INFO_KEY } from '/@/enums/cacheEnum';

  export default defineComponent({
    name: 'CustomUpload',
    components: { Upload, Alert, FileList, PlusOutlined, LoadingOutlined },
    props: {
      ...basicProps,
      previewFileList: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
      action: propTypes.string.def(''),
      keyName: propTypes.string.def(''),
      headers: propTypes.any.def({}),
      data: propTypes.any.def({}),
      imageUrl: propTypes.any.def(''),
      uploadChoseText: propTypes.string.def(''),
      showHelpText: propTypes.bool.def(false),
      showUploadList: propTypes.bool.def(true),
      customPlaceholderImg: propTypes.string.def(),
      isFileList: propTypes.bool.def(false), // 待完善
    },
    emits: ['change', 'register', 'delete'],
    setup(props, { emit }) {
      // const checkStatus: any = inject('$checkStatus');
      const getCache: any = inject('$getCache');
      // const loginStore = userLoginStore();
      const { t } = useI18n();
      const previewVisible = ref(false);
      const previewImage = ref('');
      const previewTitle = ref(t('component.cropper.preview'));
      const state = reactive<{ fileList: FileItem[] }>({
        fileList: [],
      });
      //   是否正在上传
      const isUploadingRef = ref(false);
      const fileListRef = ref<FileItem[]>([]);
      const imgUrl = ref<any>('');
      const newHeaders = ref<any>({});
      const { accept, helpText, maxNumber, maxSize } = toRefs(props);
      const { getStringAccept, getHelpText } = useUploadType({
        acceptRef: accept,
        helpTextRef: helpText,
        maxNumberRef: maxNumber,
        maxSizeRef: maxSize,
      });

      const { createMessage } = useMessage();

      const setNewProps = computed(() => {
        const { keyName, imageUrl, headers } = props;
        return {
          keyName,
          imageUrl,
          headers: { 'TENANT-ID': getCache(USER_INFO_KEY).tnt, ...headers },
        };
      });
      const obj: any = {
        thumbUrl: setNewProps.value.imageUrl,
      };
      fileListRef.value = setNewProps.value.imageUrl ? [...unref(fileListRef), obj] : [];
      imgUrl.value = setNewProps.value.imageUrl;
      newHeaders.value = setNewProps.value.headers;
      const isUploadList = computed(() => {
        if (props.showUploadList) {
          return fileListRef.value.length <= 0;
        } else {
          return imgUrl.value;
        }
      });
      const getIsSelectFile = computed(() => {
        return (
          fileListRef.value.length > 0 &&
          !fileListRef.value.every((item) => item.status === UploadResultStatus.SUCCESS)
        );
      });

      const getOkButtonProps = computed(() => {
        const someSuccess = fileListRef.value.some(
          (item) => item.status === UploadResultStatus.SUCCESS,
        );
        return {
          disabled: isUploadingRef.value || fileListRef.value.length === 0 || !someSuccess,
        };
      });

      const getUploadBtnText = computed(() => {
        const someError = fileListRef.value.some(
          (item) => item.status === UploadResultStatus.ERROR,
        );
        return isUploadingRef.value
          ? t('component.upload.uploading')
          : someError
          ? t('component.upload.reUploadFailed')
          : t('component.upload.startUpload');
      });

      // 生成图片缩略图
      function thumbUrlHandle(file: File) {
        const { size, name } = file;
        const commonItem = {
          uuid: buildUUID(),
          file,
          size,
          name,
          percent: 0,
          type: name.split('.').pop(),
        };
        if (checkImgType(file)) {
          // beforeUpload，如果异步会调用自带上传方法
          // file.url = await getBase64(file);
          getBase64WithFile(file).then(({ result: thumbUrl }) => {
            fileListRef.value = [
              ...unref(fileListRef),
              {
                thumbUrl,
                ...commonItem,
              },
            ];
          });
        } else {
          fileListRef.value = [...unref(fileListRef), commonItem];
        }
      }

      // 上传前校验
      function beforeUpload(file: File) {
        const { maxSize } = props;
        // 设置最大值，则判断
        if (maxSize && file.size / 1024 / 1024 >= maxSize) {
          createMessage.error(t('component.upload.maxSizeMultiple', [maxSize]));
          return false;
        }
        thumbUrlHandle(file);
      }

      // 图片上传状态处理
      // function handleChange(info) {
      //   if (info.file.status === 'uploading') {
      //     isUploadingRef.value = true;
      //     return;
      //   }
      //   if (info.file.status === 'error') {
      //     isUploadingRef.value = false;
      //     // if(info.file.response.code === 401){
      //     //   loginStore.logout();
      //     // }else{
      //     // checkStatus(info.file.response.code);
      //     // }
      //     return;
      //   }
      //   if (info.file.status === 'done') {
      //      thumbUrlHandle(info.file.originFileObj);
      //     props.showUploadList && (imgUrl.value = fileListRef.value[0].thumbUrl);
      //     isUploadingRef.value = false;
      //   }
      //   isUploadingRef.value = false;
      //   console.log(props.keyName)
      //   emit('change', props.keyName ? {[props.keyName]: info.responseData}  : info.responseData);
      // }

      // 删除图片
      function handleRemoveImg() {
        imgUrl.value = '';
        fileListRef.value = [];
        isUploadingRef.value = false;
        // emit('delete', props.keyName);
        emit('change', props.keyName ? { [props.keyName]: '' } : '');
      }
      // 预览弹框关闭
      function handleCancel() {
        previewVisible.value = false;
        previewTitle.value = '';
      }
      // 预览
      const handlePreview = async (file) => {
        previewImage.value = file.thumbUrl;
        previewVisible.value = true;
        previewTitle.value =
          file.name || file.thumbUrl.substring(file.thumbUrl.lastIndexOf('/') + 1);
      };

      // 点击关闭：则所有操作不保存，包括上传的
      async function handleCloseFunc() {
        if (!isUploadingRef.value) {
          fileListRef.value = [];
          return true;
        } else {
          createMessage.warning(t('component.upload.uploadWait'));
          return false;
        }
      }

      // 删除
      function handleRemove(record: FileItem) {
        const index = fileListRef.value.findIndex((item) => item.uuid === record.uuid);
        index !== -1 && fileListRef.value.splice(index, 1);
        emit('delete', record);
      }

      // 预览
      // function handlePreview(record: FileItem) {
      //   const { url = '' } = record;
      //   createImgPreview({
      //     imageList: [url],
      //   });
      // }

      async function uploadApiByItem(item: any) {
        const { api } = props;
        if (!api || !isFunction(api)) {
          return warn('upload api must exist and be a function');
        }
        try {
          item.status = UploadResultStatus.UPLOADING;
          isUploadingRef.value = true;
          let formData = new FormData();
          formData.append('file', item.file);
          const result = await props.api?.(
            formData,
            function onUploadProgress(progressEvent: ProgressEvent) {
              const complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
              item.percent = complete;
            },
          );
          item.status = UploadResultStatus.SUCCESS;
          isUploadingRef.value = false;
          item.responseData = result;
          // emit('change', result);
          // return {
          //   success: true,
          //   error: null,
          // };
        } catch (e) {
          item.status = UploadResultStatus.ERROR;
          isUploadingRef.value = false;
          // return {
          //   success: false,
          //   error: e,
          // };
        }
        emit('change', props.keyName ? { [props.keyName]: item.responseData } : item.responseData);
      }

      // 点击开始上传
      async function handleStartUpload() {
        const { maxNumber } = props;
        if ((fileListRef.value.length + props.previewFileList?.length ?? 0) > maxNumber) {
          return createMessage.warning(t('component.upload.maxNumber', [maxNumber]));
        }
        try {
          isUploadingRef.value = true;
          // 只上传不是成功状态的
          const uploadFileList =
            fileListRef.value.filter((item) => item.status !== UploadResultStatus.SUCCESS) || [];
          const data = await Promise.all(
            uploadFileList.map((item) => {
              return uploadApiByItem(item);
            }),
          );
          isUploadingRef.value = false;
          // 生产环境:抛出错误
          const errorList = data.filter((item: any) => !item.success);
          if (errorList.length > 0) throw errorList;
        } catch (e) {
          isUploadingRef.value = false;
          throw e;
        }
      }

      //   点击保存
      function handleOk() {
        const { maxNumber } = props;

        if (fileListRef.value.length > maxNumber) {
          return createMessage.warning(t('component.upload.maxNumber', [maxNumber]));
        }
        if (isUploadingRef.value) {
          return createMessage.warning(t('component.upload.saveWarn'));
        }
        const fileList: string[] = [];

        for (const item of fileListRef.value) {
          const { status, responseData } = item;
          if (status === UploadResultStatus.SUCCESS && responseData) {
            fileList.push(responseData.url);
          }
        }
        // 存在一个上传成功的即可保存
        if (fileList.length <= 0) {
          return createMessage.warning(t('component.upload.saveError'));
        }
        fileListRef.value = [];
        emit('change', fileList);
      }

      return {
        columns: createTableColumns() as any[],
        actionColumn: createActionColumn(handleRemove) as any,
        getHelpText,
        getStringAccept,
        getOkButtonProps,
        beforeUpload,
        fileListRef,
        state,
        isUploadingRef,
        handleStartUpload,
        handleOk,
        handleCloseFunc,
        getIsSelectFile,
        getUploadBtnText,
        // handleChange,
        t,
        imgUrl,
        previewVisible,
        previewImage,
        previewTitle,
        handleCancel,
        handlePreview,
        handleRemoveImg,
        isUploadList,
        uploadApiByItem,
        newHeaders,
      };
    },
  });
</script>
<style lang="less" scoped>
  .custom-upload {
    .custom-upload-placeholer-img {
      height: 100%;
      width: 100%;
    }

    // :deep(.ant-upload-list-item){
    //   width:200px;
    //   height:150px;
    // }

    :deep(.ant-upload-select) {
      position: relative;

      .custom-upload-inner-content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
      }

      .ant-upload-text {
        font-size: 12px;
      }
    }

    :deep(.ant-upload-list-item) {
      padding: 0;
    }
  }
</style>
