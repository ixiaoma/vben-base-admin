// import { S } from 'mockjs';
import type { RouteMeta } from 'vue-router';
export interface RouteItem {
  label: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}
export type MenuParamsModel = {
  type?: string;
  tnt?: string;
};
export type delMenuParamsModel = {
  id: string;
};
export type addMenuParamsModel = {
  resName: string;
  path: string;
  icon?: string;
  permission: string;
  resType: string;
  keepAlive: string | number;
  orders: string | number;
  resCode: string;
  upResCode: string;
  parentCode: string | number;
};

export type updateMenuParamsModel = addMenuParamsModel & delMenuParamsModel;
/**
 * @description: Get menu return value
 */
export type getMenuListResultModel = RouteItem[];
