import type { RouteRecordRaw, RouteMeta } from 'vue-router';
// import { RoleEnum } from '/@/enums/roleEnum';
import { defineComponent } from 'vue';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  // path: string;
  // description?: string;
  // icon?: string;
  // id?: string;
  // orders?: string | number;
  // resCode?: string;
  // name?: string;
  // resType?: string;
  // upResCode?: string | number;
  // tnt?: string;
  // children?: AppRouteRecordRaw[];
  // meta: RouteMeta;
  // component?: Component | string;
  // components?: Component;
  // props?: Recordable;
  // fullPath?: string;
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success';
  content?: string;
  dot?: boolean;
}

export interface Menu {
  [x: string]: any;
  path: string;
  description: string;
  icon: string;
  id: string;
  orders: string | number;
  resCode: string;
  name: string;
  resType: string;
  upResCode: string | number;
  tnt: string;
  children?: Menu[];
  meta: Partial<RouteMeta>;

  // name: string;

  // icon?: string;

  // path: string;

  // path contains param, auto assignment.
  // paramPath?: string;

  // disabled?: boolean;

  // children?: Menu[];

  // orderNo?: number;

  // roles?: RoleEnum[];

  // meta?: Partial<RouteMeta>;

  // tag?: MenuTag;

  // hideMenu?: boolean;
}

export interface MenuModule {
  orderNo?: number;
  menu: Menu;
}

// export type AppRouteModule = RouteModule | AppRouteRecordRaw;
export type AppRouteModule = AppRouteRecordRaw;
