export enum StatusEnum {
  '否',
  '是',
}

export enum ValidEnum {
  '无效',
  '有效',
}

// 还款状态
export enum RepaymentStatusEnum {
  'NOT_REPAY' = '未还款',
  'TOTAL_REPAY' = '全部还款',
  'PARTIAL_REPAY' = '部分还款',
}

// 联系状态
export enum ContactStatusEnum {
  'CanTouch' = '可联',
  'LossTouch' = '失联',
  'OTHER' = '其他',
}

//案件类型
export enum CaseTypeEnum {
  '金融类案件' = 1009,
  '通用案件' = 1001,
  '执前调解案件' = 1002,
}

const customerEnum = {
  StatusEnum: StatusEnum,
  ValidEnum: ValidEnum,
  RepaymentStatusEnum: RepaymentStatusEnum,
  CaseTypeEnum: CaseTypeEnum,
  ContactStatusEnum: ContactStatusEnum,
};

export function getEnumArray(valueEnum: any[] | string | Record<string, any>) {
  const enumData = typeof valueEnum === 'string' ? customerEnum[valueEnum] : valueEnum;
  let values = Array.isArray(enumData) ? enumData : Object.values(enumData);
  // 如果 enum 值为 number 类型，ts 生成的 js 对象会同时包含枚举的名称，针对该情形需提出枚举名称
  const hasNum = values.some((v) => typeof v === 'number');
  if (hasNum) {
    values = values.filter((v) => typeof v === 'number');
  } else {
    values = Object.keys(enumData);
  }
  return values.map((ele) => {
    return {
      label: enumData[ele],
      value: ele,
    };
  });
}
