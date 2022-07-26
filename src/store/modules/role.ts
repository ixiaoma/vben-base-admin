import { defineStore } from 'pinia';
import type { ErrorMessageMode } from '/#/axios';
import {
  RoleListParamsModel,
  RoleResourceParamsModel,
  BindResourceParamsModel,
  delRoleParamsModel,
  UpdateRoleParamsModel,
  addRoleParamsModel,
  RoleResourceResultModel,
} from '/@/api/system/model/roleModel';
import {
  getRoleList,
  addRoleList,
  updateRoleList,
  delRoleList,
  getListRoleResource,
  updateBindResource,
} from '/@/api/system/role';

export const useRoleStore = defineStore({
  id: 'system-role',
  state: () => ({}),
  getters: {},
  actions: {
    /**
     * @description:获取角色列表
     */
    async getRoleFun(
      param?: RoleListParamsModel & {
        mode?: ErrorMessageMode;
      },
    ): Promise<RoleResourceResultModel | null> {
      const params: any = param;
      return await getRoleList(params);
    },
    /**
     * @description:新增角色
     */
    async addRoleFun(
      params: addRoleParamsModel & {
        isReturnNativeResponse?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await addRoleList(param);
    },
    /**
     * @description:更新角色
     */
    async updateRoleFun(
      params: UpdateRoleParamsModel & {
        isReturnNativeResponse?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await updateRoleList(param);
    },
    /**
     * @description:删除角色
     */
    async delRoleFun(
      params: delRoleParamsModel & {
        isReturnNativeResponse?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await delRoleList(param);
    },
    /**
     * @description:查询角色所拥有的权限
     */
    async getListRoleResourceFun(
      params: RoleResourceParamsModel & {
        isReturnNativeResponse?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await getListRoleResource(param);
    },
    /**
     * @description:更新角色绑定资源
     */
    async updateBindResourceFun(
      params: BindResourceParamsModel & {
        isReturnNativeResponse?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await updateBindResource(param);
    },
  },
});
