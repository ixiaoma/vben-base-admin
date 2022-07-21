import { defHttp } from '/@/utils/http/axios';
import {
  getMenuListResultModel,
  MenuParamsModel,
  delMenuParamsModel,
  updateMenuParamsModel,
  addMenuParamsModel,
} from './model/menuModel';

enum Api {
  // GetMenuList = '/getMenuList',
  getMenuList = '/api/smartf-authx/authxResource/getResTree', // 获取菜单列表
  addMenuList = '/api/smartf-authx/authxResource/add', // 新增菜单
  updateMenuList = '/api/smartf-authx/authxResource/updateById', // 更新菜单
  delMenuList = '/api/smartf-authx/authxResource/deleteByIdLogical', // 删除菜单
}

/**
 * @description:获取菜单列表
 */

// export const getMenuList = () => {
//   return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
// };
export const getMenuList = (params: MenuParamsModel) => {
  return defHttp.post<getMenuListResultModel>({ url: Api.getMenuList, params });
};
/**
 * @description:新增菜单
 */

export const addMenuList = (params: addMenuParamsModel) => {
  return defHttp.post<getMenuListResultModel>({ url: Api.addMenuList, params });
};
/**
 * @description:更新菜单
 */

export const updateMenuList = (params: updateMenuParamsModel) => {
  return defHttp.post<getMenuListResultModel>({ url: Api.updateMenuList, params });
};
/**
 * @description:删除菜单
 */

export const delMenuList = (params: delMenuParamsModel) => {
  return defHttp.post<getMenuListResultModel>({ url: Api.delMenuList, params });
};
