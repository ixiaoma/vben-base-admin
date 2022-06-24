<template>
  <BasicTable
    @register="registerTable"
    :rowSelection="{ type: 'checkbox', selectedRowKeys: checkedKeys, onChange: onSelectChange }"
  >
    <template #toolbar>
      <a-button type="primary" @click="getFormValues">案件分配</a-button>
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './tableData';
  import { getCaseAllocationList } from '/@/api/manage/caseallocation';
  import { isSelect } from '/@/utils/checkUtil'
  const checkedKeys = ref<Array<string | number>>([]);
  const [registerTable, { getForm }] = useTable({
    api: getCaseAllocationList,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getFormConfig(),
    showTableSetting: false,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
  });
  function getFormValues() {
    isSelect(checkedKeys.value)
    console.log(getForm().getFieldsValue());
  }
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    console.log(selectedRowKeys);
    checkedKeys.value = selectedRowKeys;
  }
</script>