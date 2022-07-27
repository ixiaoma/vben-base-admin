<template>
  <a-popover title="还款情况" trigger="click">
    <template #content>
      <BasicTable @register="registerTable" class="pop-table" />
    </template>
    <a-button type="link" size="small">还款计划</a-button>
  </a-popover>
</template>
<script lang="ts" setup name="CaseAllocation">
  import { useRoute } from 'vue-router';

  import { BasicTable, useTable } from '/@/components/Table';
  import { getRepayList } from '/@/api/manage/caseallocation';

  const route = useRoute();
  const { caseNo } = route.query;

  const [registerTable] = useTable({
    api: getRepayList,
    columns: [
      {
        title: '还款时间',
        dataIndex: 'date | repayDate',
      },
      {
        title: '还款流水号',
        dataIndex: 'repayFlowNo',
      },
      {
        title: '还款金额',
        dataIndex: 'repayAmt',
      },
    ], //表头字段配置
    maxHeight: 260,
    searchInfo: {
      //额外的请求参数
      caseNo,
    },
    useSearchForm: false, //是否展示搜索区域
    showIndexColumn: false, //是否展示序号列
    //rowKey: 'id', //如果返回数据的key为"id"可不写这行
  });
</script>
<style lang="less" scoped>
  .pop-table {
    width: 500px;

    ::v-deep(.ant-table-wrapper) {
      padding: 0;
    }
  }
</style>
