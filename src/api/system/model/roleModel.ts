export type RoleListParamsModel = {
  current: number | string;
  pageSize: number | string;
  tnt?: string;
};
export type delRoleParamsModel = {
  id: string;
  tnt?: string;
};
export type addRoleParamsModel = {
  roleName: string;
  roleCode: string;
  description?: string;
  gmtCreate?: string;
  tnt?: string;
};
export type RoleResourceParamsModel = {
  roleCode: string;
  tnt?: string;
};

export type updateRoleParamsModel = delRoleParamsModel & addRoleParamsModel;

export type BindResourceParamsModel = RoleResourceParamsModel & { resource: Array<any> };

export type RoleResourceResultModel = updateRoleParamsModel;
