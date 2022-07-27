interface BaseInfo {
  label?: string;
  field: string;
  type?: string;
  suffix?: string;
  from?: string;
  value?: any;
  slot?: string;
  optionEnumCode?: string;
}

export function getBaseInfoField(): Array<BaseInfo> {
  return [
    {
      label: '标的金额',
      field: 'targetAmount',
      type: 'money',
    },
    {
      label: '总本金',
      field: 'principalAmount',
      type: 'money',
    },
    {
      label: '总利息',
      field: 'interestAmount',
      type: 'money',
    },
    {
      label: '总罚息',
      field: 'liquidatedAmount',
      type: 'money',
    },
    {
      label: '受理日期',
      field: 'acceptanceTime',
      type: 'date',
    },
    {
      label: '批次号',
      field: 'batchNo',
    },
    {
      label: '案件编号',
      field: 'applyOrgCaseNo',
    },
    {
      label: '调解号',
      field: 'mediateNo',
    },
    {
      label: '案由',
      field: 'reason',
      optionEnumCode: 'CaseReasonEnum',
    },
    {
      label: '合同笔数',
      field: 'contractNum',
    },
    {
      label: '逾期天数',
      field: 'ovdDays',
      suffix: '天',
    },
    {
      field: 'repayInfo',
    },
    {
      label: '案件区块链编码',
      field: 'chainHash',
    },
    {
      label: '上链状态',
      field: 'chainStatus',
      optionEnumCode: 'ChainStatusEnum',
    },
  ];
}
