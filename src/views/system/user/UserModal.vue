<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #nameSignPicSlot="{ model, field }">
        <a-input v-model:value="model[field]" />
      </template>
      <!-- <template #workPlaceSlot="{ model }"> -->
      <!-- <span>{{model}}</span> -->
      <!-- <div class="user-place"> -->
      <!-- <a-select
           v-model:value="model.province"
          :options="provinceList.map(item => ({ value: item.value }))"
          > -->
      <!-- <a-select-option v-for="item in provinceList"  :key="item.value" :value="item.label">{{item.label}}</a-select-option> -->
      <!-- </a-select> -->
      <!-- <a-select v-model:value="model.city" />
          <a-select v-model:value="model.district" /> -->
      <!-- </div> -->
      <!-- <a-input v-model:value="model.detailAddress" /> -->
      <!-- </template> -->
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, inject } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './user.data';
  import { useUserStore } from '/@/store/modules/user';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { addressList } from '/@/utils/address';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const isUpdate = ref(true);
      const checkStatus: any = inject('$checkStatus');
      const userStore = useUserStore();
      const rowData = ref<any>({});
      const provinceList = ref<any>([]);
      console.log(addressList);
      provinceList.value = addressList;
      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: accountFormSchema,
        baseColProps: { span: 24 },
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        rowData.value = data.record;
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }

        updateSchema([
          {
            field: 'pwd',
            show: !unref(isUpdate),
          },
          // {
          //   field: 'dept',
          //   componentProps: { treeData },
          // },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增用户' : '编辑用户'));

      /**
       * @description: 确定提交
       */
      async function handleSubmit() {
        try {
          let result: any;
          setModalProps({ confirmLoading: true });
          const values = await validate();
          if (unref(isUpdate)) {
            // 更新
            values.id = rowData?.value?.id;
            result = await userStore.updateUserFun(values);
          } else {
            // 全局新增
            result = await userStore.addUserFun(values);
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

      // async function handleSubmit() {
      //   try {
      //     const values = await validate();
      //     setModalProps({ confirmLoading: true });
      //     // TODO custom api
      //     console.log(values);
      //     closeModal();
      //     emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
      //   } finally {
      //     setModalProps({ confirmLoading: false });
      //   }
      // }

      return { registerModal, registerForm, getTitle, handleSubmit, provinceList };
    },
  });
</script>
<style lang="less" scoped>
  @import '/@/styles/user.less';
</style>
