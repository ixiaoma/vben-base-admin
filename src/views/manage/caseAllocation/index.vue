<template>
  <basic-table
    @register="registerTable"
    :rowSelection="{ type: 'checkbox', selectedRowKeys: checkedKeys, onChange: onSelectChange }"
  >
    <template #toolbar>
      <a-button type="primary" @click="getFormValues">案件分配</a-button>
    </template>
    <template #action="{ record }">
        <table-action
          :actions="[
            {
              label: '详情',
              onClick: handleDetail.bind(null, record),
            }
          ]"
        />
      </template>
  </basic-table>
</template>
<script lang="ts" setup name="CaseAllocation">
  import { ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './allocation.data';
  import { getCaseAllocationList } from '/@/api/manage/caseallocation';
  import { isSelect } from '/@/utils/checkUtil';

  const checkedKeys = ref<Array<string | number>>([]); //当前列表选中的key

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
      slots: { customRender: 'action' },
    }
  });

  //获取form表单数据
  function getFormValues() {
    isSelect(checkedKeys.value);
    console.log(getForm().getFieldsValue());
  }
  //列表复选框勾选
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    console.log(selectedRowKeys);
    checkedKeys.value = selectedRowKeys;
  }

  function handleDetail(record) {
    console.log(record);
    
  }
</script>
