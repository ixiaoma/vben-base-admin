import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel, getMenuParamsModel } from './model/menuModel';

enum Api {
  // GetMenuList = '/getMenuList',
  GetMenuList = '/api/smartf-authx/authxResource/getResTree',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = (params: getMenuParamsModel) => {
  return defHttp.post<getMenuListResultModel>({ url: Api.GetMenuList, params });
};
