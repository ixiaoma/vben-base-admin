import { getApplyOrgList, getMeditionOrgList } from '/@/api/system/org';

import { StatusEnum, getEnumArray } from '/@/enums/commonEnum';
import { getApiEnumList } from '/@/utils/commonUtil';

import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(allocationStatus = '1', caseType = 1009): BasicColumn[] {
  return [
    {
      title: '调解号',
      dataIndex: 'mediateNo',
      ifShow: caseType === 1009 && allocationStatus === '2',
    },
    {
      title: caseType === 1009 ? '原告' : caseType === 1001 ? '原告姓名或名称' : '申请人',
      dataIndex: 'applyName',
    },
    {
      title: caseType === 1009 ? '被告' : caseType === 1001 ? '被告姓名或名称' : '被申请人',
      dataIndex: 'receiveName',
    },
    {
      title: '身份证号',
      dataIndex: 'receiveCardId',
      ifShow: caseType === 1009,
    },
    {
      title: '标的金额(元)',
      dataIndex: 'targetAmount',
      format: 'fenToyuan',
      ifShow: caseType !== 1001,
    },
    {
      title: '生效文书文号',
      dataIndex: 'legalDocumentCode',
      ifShow: caseType === 1002,
    },
    {
      title: '督促案号',
      dataIndex: 'superviseCaseNumber',
      ifShow: caseType === 1002,
    },
    {
      title: '逾期天数',
      dataIndex: 'ovdDays',
      ifShow: caseType === 1009,
    },
    {
      title: '联系状态',
      dataIndex: 'contactStatus',
      ifShow: caseType === 1009 && allocationStatus === '2',
    },
    {
      title: '调解状态',
      dataIndex: 'mediationStatus',
      enumCode: 'MediationStatus',
      ifShow: caseType === 1009 && allocationStatus === '2',
    },
    {
      title: '协议状态',
      dataIndex: 'agrStatus',
      enumCode: 'AgrStatusEnum', //对应枚举code
      ifShow: caseType === 1009 && allocationStatus === '2',
    },
    {
      title: '还款状态',
      dataIndex: 'repayStatus',
      ifShow: caseType === 1009 && allocationStatus === '2',
    },
    {
      title: '调解员',
      dataIndex: 'currentMediatorName',
      ifShow: allocationStatus === '2',
    },
    {
      title: '调解组织',
      dataIndex: 'orgName',
      ifShow: caseType === 1009 && allocationStatus === '2',
    },
    {
      title: '分配日期',
      dataIndex: 'assignDate',
      ifShow: allocationStatus === '2',
    },
    {
      title: '批次号',
      dataIndex: 'batchNo',
      ifShow: caseType === 1009,
    },
    {
      title: caseType === 1001 ? '提交日期' : '受理日期',
      dataIndex: 'acceptDate',
    },
    {
      title: '手机号',
      dataIndex: 'receivePhone',
      ifShow: caseType === 1009,
    },
    {
      title: '所在城市',
      dataIndex: 'receiveAddress',
      ifShow: caseType === 1009,
    },
    {
      title: '案由',
      dataIndex: 'reasonDisplayName',
    },
    {
      title: '利息(元)',
      dataIndex: 'interestAmount',
      ifShow: caseType === 1009,
    },
    {
      title: '锁定状态',
      dataIndex: 'locked',
      enumProp: StatusEnum,
      ifShow: caseType === 1009 && allocationStatus === '2',
    },
    {
      title: '案件编号',
      dataIndex: caseType === 1001 ? 'caseNo' : 'applyOrgCaseNo',
    },
    {
      title: '产品',
      dataIndex: 'prodName',
      ifShow: caseType === 1009,
    },
  ];
}

export function getFormConfig(allocationStatus = '1', caseType = 1009): Partial<FormProps> {
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
        field: '[assignDateBegin, assignDateEnd]',
        component: 'RangePicker',
        label: '分配日期',
        colProps: {
          span: 12,
        },
        show: allocationStatus === '2',
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
        show: caseType === 1009,
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
        field: 'mediateNo',
        component: 'Input',
        label: '调解号',
        colProps: {
          span: 6,
        },
        show: caseType === 1009 && allocationStatus === '2',
      },
      {
        field: 'applyCode',
        component: 'ApiSelect',
        label: caseType === 1002 ? '申请人' : '原告',
        colProps: {
          span: 6,
        },
        componentProps: {
          api: getApplyOrgList,
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
        label: caseType === 1002 ? '被申请人' : '被告',
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
        show: caseType === 1009,
      },
      {
        field: 'receiveCardId',
        component: 'Input',
        label: '身份证号',
        colProps: {
          span: 6,
        },
        show: caseType === 1009,
      },
      {
        field: 'receivePhone',
        component: 'Input',
        label: '手机号',
        colProps: {
          span: 6,
        },
        show: caseType === 1009,
      },
      {
        field: 'reason',
        label: '案由',
        component: 'Select',
        optionEnumCode: 'CaseReasonEnum',
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
        show: caseType === 1009,
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
        show: caseType !== 1001,
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
        field: 'ovdDays',
        component: 'ApiSelect',
        label: '逾期天数',
        colProps: {
          span: 6,
        },
        show: caseType === 1009,
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
      {
        field: 'currentMediatorName',
        component: 'Input',
        label: '调解员',
        colProps: {
          span: 6,
        },
        show: caseType !== 1009 && allocationStatus === '2',
      },
      {
        field: 'orgCode',
        component: 'ApiSelect',
        label: '调解组织',
        colProps: {
          span: 6,
        },
        show: caseType === 1009 && allocationStatus === '2',
        componentProps: {
          api: getMeditionOrgList,
          params: {
            orgType: 'MEDIATE_ORG',
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
        field: 'agrStatus',
        label: '协议状态',
        component: 'Select',
        optionEnumCode: 'AgrStatusEnum',
        colProps: {
          span: 6,
        },
        show: caseType === 1009 && allocationStatus === '2',
      },
      {
        field: 'mediationStatus',
        label: '调解状态',
        component: 'Select',
        optionEnumCode: 'MediationStatus',
        colProps: {
          span: 6,
        },
        show: caseType === 1009 && allocationStatus === '2',
      },
      {
        field: 'locked',
        label: '锁定状态',
        component: 'Select',
        componentProps: {
          options: getEnumArray('StatusEnum'),
        },
        colProps: {
          span: 6,
        },
        show: caseType === 1009 && allocationStatus === '2',
      },
      {
        field: 'contactStatus',
        label: '联系状态',
        component: 'Select',
        colProps: {
          span: 6,
        },
        componentProps: {
          options: getEnumArray('ContactStatusEnum'),
        },
        show: caseType === 1009 && allocationStatus === '2',
      },
      {
        field: 'repayStatus',
        label: '还款状态',
        component: 'Select',
        componentProps: {
          options: getEnumArray('RepaymentStatusEnum'),
        },
        colProps: {
          span: 6,
        },
        show: caseType === 1009 && allocationStatus === '2',
      },
    ],
  };
}
