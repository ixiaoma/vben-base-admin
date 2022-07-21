import { defineStore } from 'pinia';
import type { ErrorMessageMode } from '/#/axios';
import {
  getMenuListResultModel,
  MenuParamsModel,
  delMenuParamsModel,
  updateMenuParamsModel,
  addMenuParamsModel,
} from '/@/api/sys/model/menuModel';
import { getMenuList, addMenuList, updateMenuList, delMenuList } from '/@/api/sys/menu';

export const useMenuStore = defineStore({
  id: 'system-menu',
  state: () => ({}),
  getters: {},
  actions: {
    /**
     * @description:获取菜单列表
     */
    async getMenu(
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
    async addMenu(
      params: addMenuParamsModel & {
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await addMenuList(param);
    },
    /**
     * @description:更新菜单
     */
    async updateMenu(
      params: updateMenuParamsModel & {
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await updateMenuList(param);
    },
    /**
     * @description:删除菜单
     */
    async delMenu(
      params: delMenuParamsModel & {
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await delMenuList(param);
    },
  },
});
