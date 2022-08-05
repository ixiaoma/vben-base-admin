import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
// import { h } from 'vue';
import { vueHFn } from '/@/utils/tableInnerHandle';
import { Icon } from '/@/components/Icon';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'resName',
    // width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 80,
    customRender: ({ record }) => {
      return vueHFn({ elCss: { icon: record.icon }, el: Icon });
    },
  },
  {
    title: '排序',
    dataIndex: 'orders',
    width: 80,
  },
  {
    title: '路由地址',
    dataIndex: 'path',
  },
  {
    title: '类型',
    dataIndex: 'resType',
    width: 80,
    customRender: ({ record }) => {
      const text = record.resType === 'MENU' ? '菜单' : '按钮';
      return vueHFn({ data: text });
    },
  },
];

// const isDir = (type: string) => type === '0';
// const isMenu = (type: string) => type === 'MENU';
export const isButton = (type: string) => type === 'BUTTON';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'resName',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'resType',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    componentProps: ({ formModel, formActionType }) => {
      return {
        options: [
          { label: '菜单', value: 'MENU' },
          { label: '按钮', value: 'BUTTON' },
        ],
        oninput: (): void => {
          formActionType.updateSchema({
            field: 'path',
            label: formModel.resType === 'MENU' ? '权限标识' : '路由地址',
          });
        },
      };
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'resName',
    label: '名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'upResCode',
    label: '上级菜单',
    component: 'TreeSelect',
    required: true,
    componentProps: {
      fieldNames: {
        label: 'resName',
        key: 'id',
        value: 'resCode',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'resCode',
    label: '编码',
    component: 'Input',
    required: true,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: true,
    ifShow: ({ values }) => !isButton(values.resType),
  },

  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: true,
  },
  {
    field: 'orders',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
];
