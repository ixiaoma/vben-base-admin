<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <!-- <template #detailAddressSlot="{ model,field }">
       <a-input class="detail-adress" v-model:value ="model[field]"></a-input>
      </template> -->
      <template #nameSignPicSlot="{ field }">
        <BasicCustomUpload
          :api="uploadImgAxios"
          :imageUrl="nameSignPicUrl"
          @change="uploadChange"
          :keyName="field"
          :key="formTimer"
          :accept="['.png']"
        />
      </template>
      <template #IdPictureSlot>
        <a-form-item label="证件照片" required>
          <div class="ID-card-box">
            <BasicCustomUpload
              :api="uploadImgAxios"
              :customPlaceholderImg="FRONT_IMG"
              :imageUrl="IdPictureUrls[0]"
              @change="uploadChange"
              keyName="certNoFrontPath"
              :key="formTimer + 1"
              :uploadChoseText="t('routes.system.user.IDcardPortrait')"
              :accept="['.png', '.jpg', '.jpeg', 'bmp']"
            />
            <BasicCustomUpload
              :api="uploadImgAxios"
              :customPlaceholderImg="BACK_IMG"
              :imageUrl="IdPictureUrls[1]"
              @change="uploadChange"
              keyName="certNoBackPath"
              :key="formTimer + 2"
              :uploadChoseText="t('routes.system.user.IDcardNationalEmblem')"
              :accept="['.png', '.jpg', '.jpeg', 'bmp']"
            />
          </div>
          <div class="text-tag">{{ t('routes.system.user.tips') }}</div>
          <div
            class="text-danger padding-left-20"
            v-if="IdPictureTipShow || getIdCardPicStatus()"
            >{{ t('routes.system.user.validatIDCardMessage') }}</div
          >
        </a-form-item>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, inject } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicCustomUpload } from '/@/components/CustomUpload';
  import { accountFormSchema } from './user.data';
  import { useUserStore } from '/@/store/modules/user';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { uploadImgUrl, downloadImgUrl, uploadImgAxios } from '/@/api/system/user';
  import FRONT_IMG from '/@/assets/svg/ID-card-front.svg';
  import BACK_IMG from '/@/assets/svg/ID-card-back.svg';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm, BasicCustomUpload },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const isUpdate = ref(true);
      const checkStatus: any = inject('$checkStatus');
      const userStore = useUserStore();
      const rowData = ref<any>({});
      const treeData = ref<any>({});
      const nameSignPicUrl = ref<string>('');
      const IdPictureUrls = ref<string[]>([]);
      const formTimer = ref<any>(null);
      const uploadData = ref<any>({});
      const firstIn = ref<boolean>(true);
      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: accountFormSchema,
        baseColProps: { span: 24 },
        showActionButtonGroup: false,
        actionColOptions: {
          span: 12,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        treeData.value = data?.treeData;
        // 是否调解员角色
        let isMediator = false;
        if (unref(isUpdate)) {
          const {
            province,
            city,
            district,
            certNoFrontPath,
            certNoBackPath,
            nameSignPic,
            roleCodes,
          } = data.record;
          isMediator = roleCodes.includes('MEDIATOR');
          // 省市县数据处理
          data.record.workPlace = [province, city, district];
          // 图片数据处理
          data.record.IdPicture = `${downloadImgUrl()}${certNoFrontPath},${downloadImgUrl()}${certNoBackPath}`;
          IdPictureUrls.value = [
            `${downloadImgUrl()}${certNoFrontPath}`,
            `${downloadImgUrl()}${certNoBackPath}`,
          ];
          nameSignPicUrl.value = `${downloadImgUrl()}${nameSignPic}`;
          uploadData.value = {
            certNoFrontPath,
            certNoBackPath,
            nameSignPic,
          };
          rowData.value = data.record;
          firstIn.value = false;
        } else {
          IdPictureUrls.value = [];
          uploadData.value = {};
          rowData.value = {};
          nameSignPicUrl.value = '';
          firstIn.value = true;
        }

        updateSchema([
          { field: 'nameSignPic', required: isMediator, ifShow: isMediator },
          { field: 'account', componentProps: { disabled: unref(isUpdate) } },
        ]);
        setFieldsValue({
          ...data.record,
        });
        formTimer.value = +new Date();
      });

      const getTitle = computed(() =>
        !unref(isUpdate)
          ? `${t('common.addNewText')}${t('routes.system.user.name')}`
          : `${t('common.editText')}${t('routes.system.user.name')}`,
      );
      const IdPictureTipShow = computed(() => {
        if (firstIn.value === true) return false;
        return getIdCardPicStatus();
      });

      function getIdCardPicStatus() {
        if (firstIn.value === true) return false;
        return uploadData.value?.certNoFrontPath && uploadData.value?.certNoBackPath ? false : true;
      }

      /**
       * @description: 获取图片上传返回值
       */
      function uploadChange(val) {
        uploadData.value = { ...uploadData.value, ...val };
        const frontPath = uploadData.value.certNoFrontPath;
        const backPath = uploadData.value.certNoBackPath;
        const obj = {
          IdPicture: getIdCardPicStatus() ? `${frontPath},${backPath}` : '',
          certNoFrontPath: frontPath,
          certNoBackPath: backPath,
        };
        firstIn.value = false;
        setFieldsValue({ ...rowData, ...obj });
      }

      /**
       * @description: 确定提交
       */
      async function handleSubmit() {
        firstIn.value = false;
        try {
          let result: any;
          setModalProps({ confirmLoading: true });
          getIdCardPicStatus();
          const values = await validate();

          // 参数处理
          values.province = values?.workPlace[0];
          values.city = values?.workPlace[1];
          values.district = values?.workPlace[2];
          values.roleNamesNew = values.roleNames.join(',');
          values.orgCode = treeData.value.orgCode;
          values.groupCode = treeData.value.groupCode;
          values.mediateStartTime = +new Date(values.mediateStartTime);
          delete values?.workPlace;
          delete values?.IdPicture;
          const params = { ...values, ...uploadData.value };

          if (unref(isUpdate)) {
            // 更新
            params.id = rowData?.value?.id;
            result = await userStore.updateUserFun(params);
          } else {
            // 全局新增
            result = await userStore.addUserFun(params);
          }
          if (result.data.success) {
            setModalProps({ confirmLoading: true });
            checkStatus(result.data.errorCode, t('sys.api.saveSuccessMsg'), 'message', 'success');
            closeModal(resetFields);
            emit('success', { isUpdate: !unref(isUpdate), values: unref(rowData) });
          } else {
            checkStatus(
              result.data.errorCode,
              result.data.errorMessage || t('sys.api.saveFailedMsg'),
            );
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        registerModal,
        registerForm,
        getTitle,
        handleSubmit,
        rowData,
        uploadImgUrl,
        FRONT_IMG,
        BACK_IMG,
        nameSignPicUrl,
        uploadChange,
        formTimer,
        uploadImgAxios,
        IdPictureUrls,
        IdPictureTipShow,
        getIdCardPicStatus,
        t,
      };
    },
  });
</script>
<style scoped lang="less">
  .ID-card-box {
    display: flex;
    justify-content: space-around;
  }
  /* 文本标注 */
  .text-tag {
    color: rgb(204, 204, 204);
    font-size: 12px;
  }
</style>
