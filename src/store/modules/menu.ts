import { defineStore } from 'pinia';
import type { ErrorMessageMode } from '/#/axios';
import {
  getMenuListResultModel,
  MenuParamsModel,
  delMenuParamsModel,
  updateMenuParamsModel,
  addMenuParamsModel,
} from '/@/api/system/model/menuModel';
import { getMenuList, addMenu, updateMenu, delMenu } from '/@/api/system/menu';

export const useMenuStore = defineStore({
  id: 'system-menu',
  state: () => ({}),
  getters: {},
  actions: {
    /**
     * @description:获取菜单列表
     */
    async getMenuFun(
      param?: MenuParamsModel & {
        mode?: ErrorMessageMode;
      },
    ): Promise<getMenuListResultModel | null> {
      const params = param || { type: 'MENU' };
      return await getMenuList(params);
    },
    /**
     * @description:新增菜单
     */
    async addMenuFun(
      params: addMenuParamsModel & {
        isReturnNativeResponse?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await addMenu(param);
    },
    /**
     * @description:更新菜单
     */
    async updateMenuFun(
      params: updateMenuParamsModel & {
        isReturnNativeResponse?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await updateMenu(param);
    },
    /**
     * @description:删除菜单
     */
    async delMenuFun(
      params: delMenuParamsModel & {
        isReturnNativeResponse?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await delMenu(param);
    },
  },
});
