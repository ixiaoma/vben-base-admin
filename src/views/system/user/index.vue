<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <OrgTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" v-if="isAdd && handlePrimission('add')"
          >添加</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              tooltip: '编辑',
              onClick: handleEdit.bind(null, record),
              ifShow: handlePrimission('edit', record),
            },
            {
              label: '删除',
              color: 'error',
              onClick: handleDelete.bind(null, record),
              ifShow: handlePrimission('del', record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive, inject, ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getUserList, getAdminUserList } from '/@/api/system/user';
  import { PageWrapper } from '/@/components/Page';
  import OrgTree from './../org/orgTree.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  import { usePermission } from '/@/hooks/web/usePermission';

  import { useModal } from '/@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, searchFormSchema } from './account.data';
  // import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'AccountManagement',
    components: { BasicTable, PageWrapper, OrgTree, AccountModal, TableAction },
    setup() {
      // const go = useGo();
      const { t } = useI18n();
      const { createConfirm } = useMessage();
      const { hasPermission } = usePermission();
      const checkStatus: any = inject('$checkStatus');
      const userStore = useUserStore();
      const isAdd = ref<boolean>(false);
      const selectedTreeData = ref<any>({});
      const searchInfo = reactive<Recordable>({});
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload, updateTableDataRecord, setTableData, setPagination }] =
        useTable({
          title: '用户列表',
          api: getUserList,
          rowKey: 'id',
          columns,
          formConfig: {
            labelWidth: 120,
            schemas: searchFormSchema,
            autoSubmitOnEnter: true,
          },
          immediate: false,
          useSearchForm: true,
          showTableSetting: true,
          bordered: false,
          handleSearchInfoFn(info) {
            return handleParams(info);
          },
          actionColumn: {
            width: 120,
            title: '操作',
            dataIndex: 'action',
            slots: { customRender: 'action' },
          },
        });
      /**
       * @description: 请求参数处理
       */
      function handleParams(params?: any, isReload?: boolean) {
        // userAdd 为 1 显示 添加按钮 发起数据请求 否则不显示 不请求后台数据
        isAdd.value = selectedTreeData?.value?.userAdd === '1';
        // 点击查询按钮是否发起请求 false  是  true 否
        !isReload && (params.isSendRequest = !isAdd.value);
        if (!selectedTreeData.value.code) {
          //租户超级管理员 接口请求 参数处理
          params.api = getAdminUserList;
          params.orgCode = selectedTreeData?.value?.orgCode ?? selectedTreeData?.value?.code;
        } else {
          // 普通用户 接口请求 参数处理
          params.api = getUserList;
          if (selectedTreeData?.value?.code === 'REGISTER_USER') {
            // 注册用户 参数处理
            params.orgCode = 'default';
            isReload && reload(params);
          } else {
            // 普通用户 参数处理
            params.orgCode = selectedTreeData?.value?.orgCode;
            params.groupCode = selectedTreeData?.value?.groupCode;
          }
        }
        if (isReload) {
          isAdd.value ? reload(params) : setTableData([]), setPagination({ total: 0 });
        }
        return params;
      }
      /**
       * @description: 按钮权限控制
       */
      function handlePrimission(type: any, record?: any) {
        let result = false;
        switch (type) {
          case 'del':
            result = !['admin'].includes(record.account) && hasPermission(['SYS_USER_DELETE']);
            break;
          case 'edit':
            result = hasPermission(['SYS_USER_EDIT']);
            break;
          case 'add':
            result = hasPermission(['SYS_USER_ADD']);
            break;
          default:
            result = false;
        }
        return result;
      }
      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        console.log(record);
        openModal(true, {
          record,
          isUpdate: true,
        });
      }
      /**
       * @description: 删除用户
       */
      function handleDelete(record: Recordable) {
        createConfirm({
          iconType: 'warning',
          content: t('sys.api.delWarningMsg'),
          onOk: async function () {
            const result: any = await userStore.delUserFun({ id: record.id });
            if (result.data.success) {
              checkStatus(result.data.errorCode, t('sys.api.delSuccessMsg'), 'message', 'success');
              const params: any = { isUpdate: false };
              handleSuccess(params);
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
       * @description: 刷新
       */
      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          // 演示不刷新表格直接更新内部数据。
          // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
          const result = updateTableDataRecord(values.id, values);
          console.log(result);
        } else {
          handleParams(searchInfo, true);
        }
      }
      /**
       * @description: 组织树 选择
       */
      function handleSelect(node) {
        selectedTreeData.value = node.node;
        handleParams(searchInfo, true);
      }
      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        searchInfo,
        handlePrimission,
        isAdd,
      };
    },
  });
</script>
