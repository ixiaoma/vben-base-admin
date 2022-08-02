import { getRoleList } from '/@/api/system/role';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';
import { vueHFn } from '/@/utils/tableInnerHandle';
import { addressList } from '/@/utils/address';

export const columns: BasicColumn[] = [
  {
    title: '用户账号',
    dataIndex: 'account',
    width: 120,
  },
  {
    title: '用户姓名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '角色',
    dataIndex: 'roleNames',
    customRender: ({ record }) => {
      let result = '';
      if (record?.roleNames) {
        result = record.roleNames.join(', ');
      }
      return vueHFn({ data: result });
    },
  },
  {
    title: '状态',
    dataIndex: 'lockState',
    width: 100,
    customRender: ({ record }) => {
      let result = '';
      switch (record.lockState) {
        case '0':
          result = '未锁定';
          break;
        case '1':
          result = '锁定';
          break;
        default:
          result = record.lockState;
      }
      return vueHFn({ data: result });
    },
  },
  {
    title: '创建时间',
    dataIndex: 'gmtCreate',
    width: 180,
    customRender: ({ record }) => {
      return vueHFn({ data: formatToDateTime(record.gmtCreate) });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户账号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'name',
    label: '用户姓名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'phone',
    label: '手机号',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'picture',
    label: '证件照片',
    component: 'Input',
    required: true,
    ifShow: true,
  },
  {
    field: 'certNoFrontPath',
    label: '身份证正面',
    component: 'Input',
    required: true,
    show: false,
  },
  {
    field: 'certNoBackPath',
    label: '身份证反面',
    component: 'Input',
    required: true,
    show: false,
  },
  {
    field: 'name',
    label: '用户姓名',
    component: 'Input',
    required: true,
    ifShow: true,
  },
  {
    field: 'account',
    label: '用户账号',
    component: 'Input',
    required: true,
    // helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    // rules: [
    //   {
    //     required: true,
    //     message: '请输入用户名',
    //   },
    //   {
    //     validator(_, value) {
    //       return new Promise((resolve, reject) => {
    //         isAccountExist(value)
    //           .then(() => resolve())
    //           .catch((err) => {
    //             reject(err.message || '验证失败');
    //           });
    //       });
    //     },
    //   },
    // ],
  },
  {
    field: 'phone',
    label: '手机号',
    component: 'Input',
    required: true,
  },
  {
    field: 'certNo',
    label: '用户证件号',
    component: 'Input',
    required: true,
  },
  {
    field: 'mediateStartTime',
    label: '入行时间',
    component: 'DatePicker',
    required: true,
    span: 24,
  },

  {
    label: '角色',
    field: 'roleCodes',
    component: 'ApiSelect',
    mode: 'multiple',
    componentProps: ({ formModel }) => {
      return {
        api: getRoleList,
        resultField: 'list',
        params: { current: 1, pageSize: 9999 },
        labelField: 'roleName',
        valueField: 'roleCode',
        onChange: (_code, item): void => {
          formModel.roleNames = item.map((ele) => ele.label);
        },
        // onOptionsChange:(val) =>{
        //    console.log(val)
        // }
      };
    },
    required: true,
  },
  {
    field: 'roleNames',
    label: '角色名称',
    component: 'Select',
    show: false,
  },
  {
    field: 'workPlace',
    label: '工作地点',
    component: 'Cascader',
    componentProps: () => {
      return {
        fieldNames: {
          value: 'label',
        },
        options: addressList,
      };
    },
    required: true,
  },
  {
    field: 'detailAddress',
    label: ' ',
    component: 'Input',
    required: false,
    show: true,
  },
  {
    field: 'professionalArea',
    label: '擅长领域',
    component: 'InputTextArea',
    required: false,
  },
  {
    field: 'nameSignPic',
    label: '调解员签名',
    component: 'Upload',
    // componentProps: () => {
    //   return {
    //     listType:'picture-card'
    //   };
    // },
    required: false,
    ifShow: true,
    slot: 'nameSignPicSlot',
  },

  {
    label: '状态',
    field: 'lockState',
    component: 'RadioGroup',
    required: true,
    componentProps: {
      options: [
        { label: '未锁定', value: '未锁定' },
        { label: '锁定', value: '锁定' },
      ],
    },
  },
];
