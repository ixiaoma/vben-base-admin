// import { S } from 'mockjs';
import type { RouteMeta } from 'vue-router';
export interface RouteItem {
  path: string;
  description: string;
  icon: string;
  id: string;
  orders: string | number;
  resCode: string;
  resName: string;
  resType: string;
  upResCode: string | number;
  tnt: string;
  children?: RouteItem[];
  meta: RouteMeta;
  component: any;
  // meta: RouteMeta;
  // name?: string;
  // alias?: string | string[];
  // redirect?: string;
  // caseSensitive?: boolean;
  // children?: RouteItem[];
}
export interface MenuParamsModel {
  type: string;
}
/**
 * @description: Get menu return value
 */
export type getMenuListResultModel = RouteItem[];
export type getMenuParamsModel = MenuParamsModel;
