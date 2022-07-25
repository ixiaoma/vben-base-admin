<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 添加 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '新增',
              // icon: 'clarity:note-edit-line',
              onClick: handleAdd.bind(null, record),
            },
            {
              label: '编辑',
              // icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              // icon: 'ant-design:delete-outlined',
              color: 'error',
              onClick: handleDelete.bind(null, record),
              // popConfirm: {
              //   title: '是否确认删除',
              //   confirm: handleDelete.bind(null, record),
              // },
            },
          ]"
        />
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick, inject } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getMenuList } from '/@/api/system/menu';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';
  import { useMenuStore } from '/@/store/modules/menu';
  import { usePermission } from '/@/hooks/web/usePermission';

  import { columns, searchFormSchema } from './menu.data';

  export default defineComponent({
    name: 'MenuManagement',
    components: { BasicTable, MenuDrawer, TableAction },
    setup() {
      const { hasPermission } = usePermission();
      console.log(hasPermission(['ADMIN']));
      const { createConfirm } = useMessage();
      const menuStroe = useMenuStore();
      const { t } = useI18n();
      const checkStatus: any = inject('$checkStatus');
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload, expandAll, collapseAll }] = useTable({
        title: '菜单列表',
        api: getMenuList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        isTreeTable: true,
        pagination: false,
        striped: false,
        useSearchForm: false,
        showTableSetting: true,
        bordered: false,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 180,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      /**
       * @description: 添加
       */
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }
      /**
       * @description: 行内新增
       */
      function handleAdd(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: false,
          isRowAdd: true,
        });
      }
      /**
       * @description: 编辑更新
       */
      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }
      /**
       * @description: 删除
       */
      function handleDelete(record: Recordable) {
        createConfirm({
          iconType: 'warning',
          content: t('sys.api.delWarningMsg'),
          onOk: async function () {
            const result: any = await menuStroe.delMenu({ id: record.id });
            if (result.data.success) {
              checkStatus(result.data.errorCode, t('sys.api.saveSuccessMsg'), 'message', 'success');
              handleSuccess();
            } else {
              checkStatus(
                result.data.errorCode,
                result.data.errorMessage || t('sys.api.saveFailedMsg'),
              );
            }
          },
        });
      }

      function handleSuccess() {
        reload();
      }
      /**
       * @description: 默认展开 收起
       */
      function onFetchSuccess() {
        nextTick(collapseAll); // 收起
        return;
        nextTick(expandAll); //展开
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleAdd,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
      };
    },
  });
</script>
