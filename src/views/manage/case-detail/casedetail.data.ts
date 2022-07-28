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

import { BasicColumn } from '/@/components/Table/src/types/table';

import { ValidEnum } from '/@/enums/commonEnum';

//基本信息字段
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
//联系信息--电话列表字段
export function getPhoneColumns(): BasicColumn[] {
  return [
    {
      title: '联系人',
      dataIndex: 'contactName',
    },
    {
      title: '关系',
      dataIndex: 'relation',
      enumCode: 'ContactRelationTypeEnum',
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
      format: 'phone'
    },
    {
      title: '来源',
      dataIndex: 'source',
    },
    {
      title: '号码检测',
      dataIndex: 'isValid',
      enumProp: ValidEnum
    },
    {
      title: '外呼状态',
      dataIndex: 'outboundStatus',
    },
    {
      title: '可联状态',
      dataIndex: 'touchStatus',
    },
    {
      title: '历史接通比例',
      dataIndex: 'connectedTimes',
    },
    {
      title: '最近接通时间',
      dataIndex: 'latestTelTime',
      format: 'date|YYYY-MM-DD',
    },
    {
      title: '备注',
      dataIndex: 'memo',
    }
  ];
}
//联系信息--地址列表字段
export function getAddressColumns(): BasicColumn[] {
  return [
    {
      title: '地址类型',
      dataIndex: 'addressType',
      enumCode: 'AddressTypeEnum',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '来源',
      dataIndex: 'source',
    },
    {
      title: '是否有效',
      dataIndex: 'isValid',
      enumProp: ValidEnum
    }
  ];
}
//记录信息--调解记录列表字段
export function getMeditorColumns(): BasicColumn[] {
  return [
    {
      title: '调解时间',
      dataIndex: 'mediationTime',
      format: 'date|YYYY-MM-DD',
    },
    {
      title: '调解组织',
      dataIndex: 'mediationGroup',
    },
    {
      title: '调解员',
      dataIndex: 'mediatior',
    },
    {
      title: '行动类型',
      dataIndex: 'actionType',
      enumCode: 'MediationRecordType'
    },
    {
      title: '联系号码',
      dataIndex: 'contactPhone',
      format: 'phone'
    },
    {
      title: '联系结果',
      dataIndex: 'contactResult',
    },
    {
      title: '调解结果',
      dataIndex: 'mediationResult',
    },
    {
      title: '约定下次沟通时间',
      dataIndex: 'nextMediationTime',
      format: 'date|YYYY-MM-DD',
    },
    {
      title: '标签',
      dataIndex: 'mediationTag',
    },
    {
      title: '备注',
      dataIndex: 'memo',
    }
  ];
}
//记录信息--操作记录列表字段
export function getActionColumns(): BasicColumn[] {
  return [
    {
      title: '操作时间',
      dataIndex: 'mediationTime',
      format: 'date|YYYY-MM-DD',
    },
    {
      title: '操作人',
      dataIndex: 'operator',
    },
    {
      title: '操作内容',
      dataIndex: 'actionType',
    }
  ];
}