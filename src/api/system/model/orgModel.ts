export type OrgTreeParamsModel = {
  orgCode: string;
  tnt?: string;
};
export type OrgTreeResultModel = {
  code: string;
  name: string;
  type: string;
  upCode: string;
  userAdd: string;
  upOrgCode?: string;
  orgName?: string;
  orgCode?: string;
  orgType?: string;
  tntName?: string;
  tnt?: string;
};
// export type DelUserParamsModel = {
//   id: string;
//   tnt?: string;
// };
// export type AddUserParamsModel = {
//   account: string;
//   certNo: string;
//   certNoBackPath: string;
//   certNoFrontPath: string;
//   city: string;
//   province: string;
//   detailAddress: string;
//   district: string;
//   lockState: string;
//   name: string;
//   nameSignPic: string;
//   orgCode: string;
//   phone: string;
//   roleCodes: Array<string>;
//   roleNames?: Array<string>;
//   roleNamesNew: string;
//   gmtCreate?: string;
//   groupCode?: string;
//   professionalArea?: string;
//   tnt?: string;
// };

// export type UpdateUserParamsModel = AddUserParamsModel & DelUserParamsModel;

// export type GetUserListResultModel = UpdateUserParamsModel;
