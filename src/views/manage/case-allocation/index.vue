<template>
  <BasicTable
    @register="registerTable"
    :rowSelection="{
      type: 'checkbox',
      fixed: 'left',
      selectedRowKeys: checkedKeys,
      onChange: onSelectChange,
    }"
  >
    <template #toolbar>
      <a-button type="primary" @click="handleAssign">案件分配</a-button>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <TableAction
          :actions="[
            {
              label: '详情',
              onClick: handleDetail.bind(null, record),
            },
          ]"
        />
      </template>
    </template>
  </BasicTable>
  <AssignModal @register="registerModal" @success="submitSuccess" />
</template>
<script lang="ts" setup name="CaseAllocation">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { isSelect } from '/@/utils/commonUtil';
  import AssignModal from './AssignModal.vue';
  import { useModal } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './allocation.data';
  import { getCaseAllocationList } from '/@/api/manage/caseallocation';

  const router = useRouter();
  const checkedKeys = ref<Array<string | number>>([]); //当前列表选中的key

  const [registerModal, { openModal }] = useModal();

  const [registerTable, { getForm }] = useTable({
    api: getCaseAllocationList,
    columns: getBasicColumns(), //表头字段配置
    useSearchForm: true, //是否展示搜索区域
    formConfig: getFormConfig(), //查询表单字段配置
    tableSetting: { fullScreen: true },
    showIndexColumn: false, //是否展示序号列
    //rowKey: 'id', //如果返回数据的key为"id"可不写这行
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
    },
  });
  //获取form表单数据
  function handleAssign() {
    if (!isSelect(checkedKeys.value)) {
      return;
    }
    openModal(true);
    console.log('查询区域数据', getForm().getFieldsValue());
  }
  //列表复选框勾选
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    console.log(selectedRowKeys);
    checkedKeys.value = selectedRowKeys;
  }
  //跳转详情页
  function handleDetail({ id, mediateNo }: ReadonlyRecordable) {
    router.push({
      name: 'CaseDetail',
      query: {
        id,
        mediateNo,
      },
    });
  }
  //弹框emit的方法
  function submitSuccess(data) {
    console.log('submit', data);
  }
</script>
