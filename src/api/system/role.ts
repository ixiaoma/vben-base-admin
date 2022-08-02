import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  RoleListParamsModel,
  RoleResourceParamsModel,
  BindResourceParamsModel,
  delRoleParamsModel,
  UpdateRoleParamsModel,
  addRoleParamsModel,
  RoleResourceResultModel,
} from './model/roleModel';

enum Api {
  GetRoleList = '/api/smartf-authx/authxRole/listPage', // 获取角色列表
  AddRoleList = '/api/smartf-authx/authxRole/add', // 新增角色
  UpdateRoleList = '/api/smartf-authx/authxRole/updateById', // 更新角色
  DelRoleList = '/api/smartf-authx/authxRole/deleteByIdLogical', // 删除角色
  // GetRoleDetail = '/api/smartf-authx/authxRole/getById', // 获取角色详情
  UpdateBindResource = '/api/smartf-authx/authxRole/bindResource', // 更新角色绑定资源
  GetListRoleResource = '/api/smartf-authx/authxRole/listRoleResource', // 查询角色所拥有的权限
}

/**
 * @description:获取角色列表
 */

export const getRoleList = (params: RoleListParamsModel) => {
  return defHttp.post<RoleResourceResultModel>({ url: Api.GetRoleList, params });
};
/**
 * @description:新增角色
 */

export const addRoleList = (params: addRoleParamsModel, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<null>(
    { url: Api.AddRoleList, params },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
};
/**
 * @description:更新角色
 */

export const updateRoleList = (params: UpdateRoleParamsModel, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<null>(
    { url: Api.UpdateRoleList, params },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
};
/**
 * @description:删除角色
 */

export const delRoleList = (params: delRoleParamsModel, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<null>(
    { url: Api.DelRoleList, params },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
};
/**
 * @description:获取角色详情
 */

// export const getRoleDetail = (params: delRoleParamsModel, mode: ErrorMessageMode = 'modal') => {
//   return defHttp.get<RoleListParamsModel>(
//     { url: Api.getRoleDetail, params },
//     {
//       isReturnNativeResponse: true,
//       errorMessageMode: mode,
//     },
//   );
// };
/**
 * @description:更新绑定资源
 */

export const updateBindResource = (
  params: BindResourceParamsModel,
  mode: ErrorMessageMode = 'modal',
) => {
  return defHttp.post<null>(
    { url: Api.UpdateBindResource, params },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
};
/**
 * @description:查询角色所拥有的权限
 */

export const getListRoleResource = (
  params: RoleResourceParamsModel,
  mode: ErrorMessageMode = 'message',
) => {
  return defHttp.post<RoleResourceResultModel>(
    { url: Api.GetListRoleResource, params },
    {
      isReturnNativeResponse: false,
      errorMessageMode: mode,
    },
  );
};
