import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

// 租户表头
export const tntColumns: any[] = [
  {
    title: '租户名称',
    dataIndex: 'tntName',
  },
  {
    title: '租户编号',
    dataIndex: 'tnt',
  },
  {
    title: '租户管理员',
    dataIndex: 'adminName',
  },
  {
    title: '登录图片',
    dataIndex: 'loginPic',
    ifShow: false,
  },
  {
    title: '管理员手机号',
    dataIndex: 'adminPhone',
    ifShow: false,
  },
];
// 机构表头
export const organColumns: BasicColumn[] = [
  {
    title: '组织名称',
    dataIndex: 'orgName',
  },
  {
    title: '组织类型',
    dataIndex: 'orgType',
  },
  {
    title: '节点编号',
    dataIndex: 'orgCode',
  },
];
// 组织表头
export const orgColumns: BasicColumn[] = [
  {
    title: '组织名称',
    dataIndex: 'orgName',
  },
  {
    title: '组织类型',
    dataIndex: 'orgType',
  },
  {
    title: '组织代码',
    dataIndex: 'orgCode',
  },
  {
    title: '代字',
    dataIndex: 'deputyCode',
  },
];
// 小组表头
export const gourpColumns: BasicColumn[] = [
  {
    title: '小组名称',
    dataIndex: 'groupName',
  },
];

// 租户form查询
export const tntSearchFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '租户名称',
    component: 'Input',
    required: true,
  },
];
// 机构form查询
export const organSearchFormSchema: FormSchema[] = [
  {
    field: 'orgName',
    label: '组织名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'orgType',
    label: '组织类型',
    component: 'Select',
    required: true,
  },
];
// 机构form查询
export const orgSearchFormSchema: FormSchema[] = [
  {
    field: 'orgName',
    label: '组织名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'orgType',
    label: '组织类型',
    component: 'Select',
    required: true,
  },
  {
    field: 'orgCode',
    label: '组织代码',
    component: 'Input',
    required: true,
  },
];

// 租户modal
export const tntFormSchema: FormSchema[] = [
  {
    field: 'tntName',
    label: '租户名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'tnt',
    label: '租户编号',
    component: 'Input',
    required: true,
  },
  {
    field: 'adminName',
    label: '租户管理员',
    component: 'Input',
    required: true,
  },
  {
    field: 'adminPhone',
    label: '管理员手机号',
    component: 'Input',
    required: true,
  },
  {
    field: 'orders',
    label: '序号',
    component: 'Input',
    required: true,
  },
  {
    field: 'loginPic',
    label: '登录图片',
    component: 'Upload',
    required: true,
  },
];
// 机构modal
export const organFormSchema: FormSchema[] = [
  {
    field: 'orgName',
    label: '组织名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'orgCode',
    label: '节点编号',
    component: 'Input',
    required: true,
  },
  {
    field: 'orgType',
    label: '组织类型',
    component: 'Select',
    required: true,
  },
  {
    field: 'certNo',
    label: '统一社会信用代码',
    component: 'Input',
    ifShow: false,
    required: true,
  },
  {
    field: 'contactName',
    label: '法人姓名',
    component: 'Input',
    ifShow: false,
    required: true,
  },
  {
    field: 'contactCertNo',
    label: '法人身份证',
    component: 'Input',
    ifShow: false,
    required: true,
  },
  {
    field: 'businessAddress',
    label: '经营地址',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'bankAccount',
    label: '银行账号',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'bankAccountName',
    label: '银行账户名称',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'bankAccountType',
    label: '银行账户类型',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'bankOrgId',
    label: '银行用机构id',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'bankCode',
    label: '银行代码',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'openPlatformMerchantPid',
    label: '开放平台商户pid',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'contactPhone',
    label: '客服电话',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'alipayAccount',
    label: '支付宝账号',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'orders',
    label: '序号',
    component: 'Input',
    required: true,
  },
  {
    field: 'sealPic',
    label: '机构用章',
    component: 'Upload',
    required: true,
    ifShow: false,
  },
  {
    field: 'innerroomPic',
    label: '内景照片',
    component: 'Upload',
    required: false,
    ifShow: false,
  },
  {
    field: 'orgCertNoPic',
    label: '营业执照照片',
    component: 'Upload',
    required: false,
    ifShow: false,
  },
  {
    field: 'overdoorPic',
    label: '门头照片',
    component: 'Upload',
    required: false,
    ifShow: false,
  },
  {
    field: 'certNoFrontPic',
    label: '法人身份证人像面',
    component: 'Upload',
    required: false,
    ifShow: false,
  },
  {
    field: 'certNoBackPic',
    label: '法人身份证国徽面',
    component: 'Upload',
    required: false,
    ifShow: false,
  },
];
//组织Modal
export const orgFormSchema: FormSchema[] = [
  // 一级商户信息
  {
    field: 'certPic',
    label: '证件照片',
    component: 'Upload',
    required: true,
  },
  {
    field: 'orgType',
    label: '组织类型',
    component: 'Select',
    required: true,
  },
  {
    field: 'orgName',
    label: '组织名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'orgCode',
    label: '组织代码',
    component: 'Input',
    required: true,
  },
  {
    field: 'contactName',
    label: '联系人姓名',
    component: 'Input',
    required: true,
  },
  {
    field: 'contactCertNo',
    label: '身份证号',
    component: 'Input',
    required: true,
  },
  {
    field: 'contactPhone',
    label: '联系人手机号码',
    component: 'Input',
    required: true,
  },
  {
    field: 'certNo',
    label: '统一社会信用代码',
    component: 'Input',
    required: true,
  },
  {
    field: 'email',
    label: '电子邮箱',
    component: 'Input',
  },
  {
    field: 'courtId',
    label: '所属法院',
    component: 'Input',
  },
  {
    field: 'bankAccount',
    label: '银行账号',
    component: 'Input',
  },
  {
    field: 'bankAccountName',
    label: '银行账户名称',
    component: 'Input',
  },
  {
    field: 'bankAccountType',
    label: '银行账户类型',
    component: 'Input',
  },
  {
    field: 'bankOrgId',
    label: '银行用机构id',
    component: 'Input',
  },
  {
    field: 'bankCode',
    label: '银行代码',
    component: 'Input',
  },
  {
    field: 'openPlatformMerchantPid',
    label: '开放平台商户pid',
    component: 'Input',
  },
  {
    field: 'alipayAccount',
    label: '支付宝账号',
    component: 'Input',
  },
  {
    field: 'orders',
    label: '序号',
    component: 'Input',
    required: true,
  },
  {
    field: 'sealPic',
    label: '调解组织用章',
    component: 'Upload',
    required: true,
  },

  // 二级商户信息
  {
    field: 'secMerchantBindingAlipayLogonId',
    label: '签约支付宝账户',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'secMerchantAliasName',
    label: '商户名称',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'secMerchantAlipayLogonId',
    label: '结算支付宝账号',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'secMerchantMobile',
    label: '手机号',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'status',
    label: '入住状态',
    component: 'Select',
    componentProps: {
      disabled: true,
    },
    ifShow: false,
  },
  {
    field: 'status',
    label: '二级商户id',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
    ifShow: false,
  },
];
// 小组modal
export const groupFormSchema: FormSchema[] = [
  {
    field: 'groupName',
    label: '小组名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'groupCode',
    label: '小组编号',
    component: 'Input',
    required: true,
  },
  {
    field: 'adminName',
    label: '负责人',
    component: 'Input',
    required: true,
  },
  {
    field: 'adminPhone',
    label: '联系电话',
    component: 'Input',
    required: true,
  },
  {
    field: 'orders',
    label: '序号',
    component: 'Input',
    required: true,
  },
];
