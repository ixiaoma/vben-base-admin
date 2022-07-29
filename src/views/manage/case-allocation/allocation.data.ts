import { getOrgList } from '/@/api/sys/org';

import { StatusEnum } from '/@/enums/commonEnum';
import { getApiEnumList } from '/@/utils/commonUtil';

import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(caseType = 1009): BasicColumn[] {
  return [
    {
      title: '调解号',
      dataIndex: 'mediateNo',
      ifShow: caseType === 1009
    },
    {
      title: '原告',
      dataIndex: 'applyName',
    },
    {
      title: '被告',
      dataIndex: 'receiveName',
    },
    {
      title: '身份证号',
      dataIndex: 'receiveCardId',
    },
    {
      title: '标的金额(元)',
      dataIndex: 'targetAmount',
    },
    {
      title: '逾期天数',
      dataIndex: 'ovdDays',
    },
    {
      title: '联系状态',
      dataIndex: 'contactStatus',
    },
    {
      title: '调解状态',
      dataIndex: 'mediationStatus',
      enumCode: 'MediationStatus',
    },
    {
      title: '协议状态',
      dataIndex: 'agrStatus',
      enumCode: 'AgrStatusEnum', //对应枚举code
    },
    {
      title: '还款状态',
      dataIndex: 'repayStatus',
    },
    {
      title: '调解员',
      dataIndex: 'currentMediatorName',
    },
    {
      title: '调解组织',
      dataIndex: 'orgName',
    },
    {
      title: '分配日期',
      dataIndex: 'assignDate',
    },
    {
      title: '批次号',
      dataIndex: 'batchNo',
    },
    {
      title: '受理日期',
      dataIndex: 'acceptDate',
    },
    {
      title: '手机号',
      dataIndex: 'receivePhone',
    },
    {
      title: '所在城市',
      dataIndex: 'receiveAddress',
    },
    {
      title: '案由',
      dataIndex: 'reasonDisplayName',
    },
    {
      title: '利息(元)',
      dataIndex: 'interestAmount',
    },
    {
      title: '锁定状态',
      dataIndex: 'locked',
      enumProp: StatusEnum
    },
    {
      title: '案件编号',
      dataIndex: 'applyOrgCaseNo',
    },
    {
      title: '产品',
      dataIndex: 'prodName',
    },
  ];
}
//show
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
            orgType: 'FINANCE_ORG',
            pageSize: 999,
            current: 1,
          },
          resultField: 'list',
          labelField: 'orgName',
          valueField: 'orgCode',
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
        label: '身份证号',
        colProps: {
          span: 6,
        },
      },
      {
        field: 'receivePhone',
        component: 'Input',
        label: '手机号',
        colProps: {
          span: 6,
        },
      },
      {
        field: 'reason',
        label: '案由',
        component: 'Select',
        optionEnumCode: 'CaseReasonEnum',
        // componentProps: {
        //   options: getEnum('CaseReasonEnum', true)
        // },
        colProps: {
          span: 6,
        },
      },
      {
        field: 'prodName',
        label: '借款产品',
        component: 'Select',
        // optionEnumCode: 'ProductNameEnum',
        colProps: {
          span: 6,
        },
      },
      // {
      //   field: 'prodName',
      //   component: 'ApiSelect',
      //   label: '借款产品',
      //   colProps: {
      //     span: 6,
      //   },
      //   componentProps: {
      //     api: () => getApiEnumList('GetProdNameEnum'),
      //     immediate: false,
      //     onChange: (e) => {
      //       console.log('selected:', e);
      //     },
      //     // atfer request callback
      //     onOptionsChange: (options) => {
      //       console.log('get options', options.length, options);
      //     },
      //   },
      // },
      {
        field: 'targetAmtRangeCode',
        component: 'ApiSelect',
        label: '标的金额',
        colProps: {
          span: 6,
        },
        componentProps: {
          api: () => getApiEnumList('GetMoneyEnum'),
          resultField: 'list',
          labelField: 'rangeDisplay',
          valueField: 'rangeCode',
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
        field: 'ovdDaysRangeCode',
        component: 'ApiSelect',
        label: '逾期天数',
        colProps: {
          span: 6,
        },
        componentProps: {
          api: () => getApiEnumList('GetOvdDayEnum'),
          resultField: 'list',
          labelField: 'rangeDisplay',
          valueField: 'rangeCode',
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
    ],
  };
}
