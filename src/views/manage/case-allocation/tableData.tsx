import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { getOrgList } from '/@/api/sys/org';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '调解号',
      dataIndex: 'mediateNo'
    },
    {
      title: '原告',
      dataIndex: 'applyName'
    },
    {
      title: '被告',
      dataIndex: 'receiveName'
    },
    {
      title: '身份证号',
      dataIndex: 'receiveCardId'
    },
    {
      title: '标的金额(元)',
      dataIndex: 'targetAmount'
    },
    {
      title: '逾期天数',
      dataIndex: 'ovdDays'
    },
    {
      title: '联系状态',
      dataIndex: 'contactStatus'
    },
    {
      title: '调解状态',
      dataIndex: 'mediationStatus'
    },
    {
      title: '协议状态',
      dataIndex: 'agrStatus'
    },
    {
      title: '还款状态',
      dataIndex: 'repayStatus'
    },
    {
      title: '调解员',
      dataIndex: 'currentMediatorName'
    },
    {
      title: '调解组织',
      dataIndex: 'orgName'
    },
    {
      title: '分配日期',
      dataIndex: 'assignDate'
    },
    {
      title: '批次号',
      dataIndex: 'batchNo'
    },
    {
      title: '案件编号',
      dataIndex: 'applyOrgCaseNo'
    },
    {
      title: '受理日期',
      dataIndex: 'acceptDate'
    },
    {
      title: '手机号',
      dataIndex: 'receivePhone'
    },
    {
      title: '所在城市',
      dataIndex: 'receiveAddress'
    },
    {
      title: '案由',
      dataIndex: 'reasonDisplayName'
    },
    {
      title: '产品',
      dataIndex: 'prodName'
    },
    {
      title: '利息(元)',
      dataIndex: 'interestAmount'
    },
    {
      title: '锁定状态',
      dataIndex: 'locked'
    },
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: '[acceptDateBegin, acceptDateEnd]',
        component: 'RangePicker',
        label: '受理日期',
        colProps: {
          span: 12,
        },
        componentProps: {
          class: 'time-full',
          format: 'YYYY-MM-DD',
          valueFormat: 'YYYY-MM-DD  HH:mm:ss',
        },
      },
      {
        field: 'batchNo',
        component: 'Input',
        label: '批次号',
        colProps: {
          span: 6,
        },
      },
      {
        field: 'applyOrgCaseNo',
        component: 'Input',
        label: '案件编号',
        colProps: {
          span: 6,
        },
      },
      {
        field: 'applyCode',
        component: 'ApiSelect',
        label: '原告',
        colProps: {
          span: 6,
        },
        componentProps: {
          api: getOrgList,
          params: {
            "orgType":"FINANCE_ORG", 
            pageSize: 999, 
            current: 1
          },
          resultField: 'list',
          // use name as label
          labelField: 'orgName',
          // use id as value
          valueField: 'orgCode',
          // not request untill to select
          immediate: false,
          onChange: (e) => {
            console.log('selected:', e);
          },
          // atfer request callback
          onOptionsChange: (options) => {
            console.log('get options', options.length, options);
          },
        },
      },
      {
        field: 'receiveName',
        component: 'Input',
        label: '被告',
        colProps: {
          span: 6,
        },
      },
      {
        field: 'receiveAddress',
        component: 'Input',
        label: '所在城市',
        colProps: {
          span: 6,
        },
      },
      {
        field: 'receiveCardId',
        component: 'Input',
        label: '身份证',
        colProps: {
          span: 6,
        },
      },
    ],
  };
}