<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, inject } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from '/@/hooks/web/useI18n';
  //  import { getMenuList } from '/@/api/system/menu';
  import { useMenuStore } from '/@/store/modules/menu';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const isUpdate = ref(true);
      const isRowAdd = ref(false);
      const menuStroe = useMenuStore();
      const isButton = (type: string) => type === 'BUTTON';
      const checkStatus: any = inject('$checkStatus');
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });
      let rowData: any;
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        isRowAdd.value = !!data?.isRowAdd;
        rowData = data.record;
        let obj = {
          upResCode: '0',
          resType: 'MENU',
          orders: 999,
        };
        if (!data.record) {
          // 全局新增
          data.record = obj;
        } else {
          //行内新增
          if (unref(isRowAdd)) {
            obj.upResCode = data.record.resCode;
            obj.resType = data.record.resType;
            data.record = obj;
          }
        }
        setFormDefaultValue(data.record);
        // if (unref(isUpdate)) {
        setFieldsValue({
          ...data.record,
        });
        // }
        // const treeData = await getMenuList({});
        const menuData = await menuStroe.getMenu({});
        const treeData = [
          {
            resName: '根菜单',
            id: 'home',
            resCode: '0',
            children: menuData,
          },
        ];
        updateSchema({
          field: 'upResCode',
          componentProps: { treeData },
        });
      });
      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));
      /**
       * @description: formSchema 动态切换
       */
      function setFormDefaultValue(value: any) {
        formSchema.forEach((ele) => {
          if (ele.field === 'path') {
            ele.label = isButton(value.resType) ? '权限标识' : '路由地址';
          }
        });
      }
      /**
       * @description: 确定提交
       */
      async function handleSubmit() {
        try {
          const values = await validate();
          let result: any;
          setDrawerProps({ confirmLoading: true });
          if (rowData) {
            if (unref(isUpdate)) {
              // 更新
              values.id = rowData.id;
              result = await menuStroe.updateMenu(values);
            } else {
              // 行内新增
              result = await menuStroe.addMenu(values);
            }
          } else {
            // 全局新增
            result = await menuStroe.addMenu(values);
          }
          if (result.data.success) {
            checkStatus(result.data.errorCode, t('sys.api.saveSuccessMsg'), 'message', 'success');
            closeDrawer();
            emit('success');
          } else {
            checkStatus(
              result.data.errorCode,
              result.data.errorMessage || t('sys.api.saveFailedMsg'),
            );
          }
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
