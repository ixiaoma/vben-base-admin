import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  getMenuListResultModel,
  MenuParamsModel,
  delMenuParamsModel,
  updateMenuParamsModel,
  addMenuParamsModel,
} from './model/menuModel';

enum Api {
  GetMenuList = '/api/smartf-authx/authxResource/getResTree', // 获取菜单列表
  AddMenu = '/api/smartf-authx/authxResource/add', // 新增菜单
  UpdateMenu = '/api/smartf-authx/authxResource/updateById', // 更新菜单
  DelMenu = '/api/smartf-authx/authxResource/deleteByIdLogical', // 删除菜单
}

/**
 * @description:获取菜单列表
 */

export const getMenuList = (params: MenuParamsModel) => {
  return defHttp.post<getMenuListResultModel>({ url: Api.GetMenuList, params });
};
/**
 * @description:新增菜单
 */

export const addMenu = (params: addMenuParamsModel, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<getMenuListResultModel>(
    { url: Api.AddMenu, params },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
};
/**
 * @description:更新菜单
 */

export const updateMenu = (params: updateMenuParamsModel, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<getMenuListResultModel>(
    { url: Api.UpdateMenu, params },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
};
/**
 * @description:删除菜单
 */

export const delMenu = (params: delMenuParamsModel, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<getMenuListResultModel>(
    { url: Api.DelMenu, params },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
};
