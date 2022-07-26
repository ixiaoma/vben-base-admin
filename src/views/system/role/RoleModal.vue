<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" v-if="!isPrimision" />
    <BasicTree
      v-else
      :treeData="treeData"
      :fieldNames="{ title: 'resName', key: 'resCode' }"
      checkable
      :toolbar="false"
      :checkedKeys="selectedKeys"
      @check="treeChcek"
    />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, inject, nextTick } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { useRoleStore } from '/@/store/modules/role';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'RoleModal',
    components: { BasicModal, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const isUpdate = ref(true);
      const isPrimision = ref(false);
      const treeData = ref<TreeItem[]>([]);
      const selectedKeys = ref<any>([]);
      const roleStore = useRoleStore();
      const checkStatus: any = inject('$checkStatus');
      const rowData = ref<any>({});
      const checkedCodes = ref<any>([]);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      /**
       * @description: 弹框默认数据处理
       */
      const [register, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        rowData.value = data.record;
        isUpdate.value = !!data?.isUpdate;
        isPrimision.value = !!data?.isPrimision;
        nextTick(async () => {
          if (unref(isUpdate)) {
            // 编辑默认值处理
            setFieldsValue({
              ...data.record,
            });
          }
          if (unref(isPrimision)) {
            // 已有权限数据获取 处理
            const result = await roleStore.getListRoleResourceFun({
              roleCode: data?.record?.roleCode,
            });
            result && (selectedKeys.value = result.map((ele) => ele.resCode));
            treeData.value = data?.menuList;
          }
        });
      });

      const getTitle = computed(() =>
        unref(isPrimision) ? '分配权限' : !unref(isUpdate) ? '新增角色' : '编辑角色',
      );
      /**
       * @description: 勾选数据
       */
      function treeChcek(_val, e) {
        checkedCodes.value = e?.checkedNodes;
      }

      /**
       * @description: 确定提交
       */
      async function handleSubmit() {
        try {
          let result: any;
          setModalProps({ confirmLoading: true });
          if (unref(isPrimision)) {
            // 权限更新
            result = await roleStore.updateBindResourceFun({
              resource: checkedCodes?.value,
              roleCode: rowData?.value?.roleCode,
            });
          } else {
            const values = await validate();
            if (unref(isUpdate)) {
              // 更新
              values.id = rowData?.value?.id;
              result = await roleStore.updateRoleFun(values);
            } else {
              // 全局新增
              result = await roleStore.addRoleFun(values);
            }
          }
          if (result.data.success) {
            setModalProps({ confirmLoading: true });
            checkStatus(result.data.errorCode, t('sys.api.saveSuccessMsg'), 'message', 'success');
            closeModal();
            emit('success');
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
        register,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
        selectedKeys,
        isPrimision,
        treeChcek,
      };
    },
  });
</script>
