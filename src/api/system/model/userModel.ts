export type UserParamsModel = {
  current: number;
  pageSize: number;
  orgCode: string;
  groupCode?: string;
  tnt?: string;
};
export type DelUserParamsModel = {
  id: string;
  tnt?: string;
};
export type AddUserParamsModel = {
  account: string;
  certNo: string;
  certNoBackPath: string;
  certNoFrontPath: string;
  city: string;
  province: string;
  detailAddress: string;
  district: string;
  lockState: string;
  name: string;
  nameSignPic: string;
  orgCode: string;
  phone: string;
  roleCodes: Array<string>;
  roleNames?: Array<string>;
  roleNamesNew: string;
  gmtCreate?: string;
  groupCode?: string;
  professionalArea?: string;
  tnt?: string;
};

export type UpdateUserParamsModel = AddUserParamsModel & DelUserParamsModel;

export type GetUserListResultModel = UpdateUserParamsModel;
