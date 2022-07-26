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
  getRoleList = '/api/smartf-authx/authxRole/listPage', // 获取角色列表
  addRoleList = '/api/smartf-authx/authxRole/add', // 新增角色
  updateRoleList = '/api/smartf-authx/authxRole/updateById', // 更新角色
  delRoleList = '/api/smartf-authx/authxRole/deleteByIdLogical', // 删除角色
  // getRoleDetail = '/api/smartf-authx/authxRole/getById', // 获取角色详情
  updateBindResource = '/api/smartf-authx/authxRole/bindResource', // 更新角色绑定资源
  getListRoleResource = '/api/smartf-authx/authxRole/listRoleResource', // 查询角色所拥有的权限
}

/**
 * @description:获取角色列表
 */

export const getRoleList = (params: RoleListParamsModel) => {
  return defHttp.post<RoleResourceResultModel>({ url: Api.getRoleList, params });
};
/**
 * @description:新增角色
 */

export const addRoleList = (params: addRoleParamsModel, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<null>(
    { url: Api.addRoleList, params },
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
    { url: Api.updateRoleList, params },
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
    { url: Api.delRoleList, params },
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
    { url: Api.updateBindResource, params },
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
  mode: ErrorMessageMode = 'modal',
) => {
  return defHttp.post<RoleResourceResultModel>(
    { url: Api.getListRoleResource, params },
    {
      isReturnNativeResponse: false,
      errorMessageMode: mode,
    },
  );
};
