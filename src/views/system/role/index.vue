<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" v-show="handlePrimission('add')">
          添加
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              // icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
              ifShow: handlePrimission('edit', record),
            },
            {
              label: '分配权限',
              // icon: 'clarity:note-edit-line',
              onClick: handlePrimisionBtn.bind(null, record),
              ifShow: handlePrimission('primission', record),
            },
            {
              label: '删除',
              // icon: 'ant-design:delete-outlined',
              color: 'error',
              onClick: handleDelete.bind(null, record),
              ifShow: handlePrimission('del', record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <!-- <RoleDrawer @register="registerDrawer" @success="handleSuccess" /> -->
    <RoleModal @register="register" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, inject } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRoleList } from '/@/api/system/role';
  import { useRoleStore } from '/@/store/modules/role';
  import { useMenuStore } from '/@/store/modules/menu';
  import { useModal } from '/@/components/Modal';
  // import RoleDrawer from './RoleDrawer.vue';
  import RoleModal from './RoleModal.vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { columns, searchFormSchema } from './role.data';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, TableAction, RoleModal },
    setup() {
      const { hasPermission } = usePermission();
      const roleStroe = useRoleStore();
      const menuStroe = useMenuStore();
      const { createConfirm } = useMessage();
      const checkStatus: any = inject('$checkStatus');
      const { t } = useI18n();
      let menuList: any;
      getMenuList();
      const [register, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '角色列表',
        api: getRoleList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: false,
        showIndexColumn: false,
        actionColumn: {
          width: 180,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      /**
       * @description: 按钮权限控制
       */
      function handlePrimission(type: any, record?: any) {
        let result = false;
        switch (type) {
          case 'del':
            result = !['ADMIN'].includes(record.resCode) && hasPermission(['MAN_ROLE_DELETE']);
            break;
          case 'edit':
            result = hasPermission(['MAN_ROLE_EDIT']);
            break;
          case 'add':
            result = hasPermission(['MAN_ROLE_ADD']);
            break;
          case 'primission':
            result = hasPermission(['MAN_ROLE_ASSIGNPERMISSION']);
            break;
          default:
            result = false;
        }
        return result;
      }
      /**
       * @description: 获取菜单按钮列表
       */
      async function getMenuList() {
        menuList = await menuStroe.getMenu({});
      }
      /**
       * @description: 分配权限
       */
      function handlePrimisionBtn(record) {
        openModal(true, {
          record,
          menuList,
          isPrimision: true,
        });
      }
      /**
       * @description: 添加角色
       */
      function handleCreate() {
        openModal(true);
      }
      /**
       * @description: 编辑角色
       */
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }
      /**
       * @description: 删除角色
       */
      function handleDelete(record: Recordable) {
        createConfirm({
          iconType: 'warning',
          content: t('sys.api.delWarningMsg'),
          onOk: async function () {
            const result: any = await roleStroe.delRoleFun({ id: record.id });
            if (result.data.success) {
              checkStatus(result.data.errorCode, t('sys.api.delSuccessMsg'), 'message', 'success');
              handleSuccess();
            } else {
              checkStatus(
                result.data.errorCode,
                result.data.errorMessage || t('sys.api.delFailedMsg'),
              );
            }
          },
        });
      }
      /**
       * @description: 刷新页面
       */
      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        register,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handlePrimission,
        handlePrimisionBtn,
      };
    },
  });
</script>
