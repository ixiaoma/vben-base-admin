import { defineStore } from 'pinia';
import type { ErrorMessageMode } from '/#/axios';
import {
  GetUserListResultModel,
  UserParamsModel,
  DelUserParamsModel,
  UpdateUserParamsModel,
  AddUserParamsModel,
} from '/@/api/system/model/userModel';
import {
  getUserList,
  addUser,
  updateUser,
  delUser,
  getAdminUserList,
  addAdminUser,
  updateAdminUser,
} from '/@/api/system/user';

export const useUserStore = defineStore({
  id: 'system-User',
  state: () => ({}),
  getters: {},
  actions: {
    /**
     * @description:获取用户列表
     */
    async getUserFun(
      param?: UserParamsModel & {
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserListResultModel | null> {
      const params: any = param;
      return await getUserList(params);
    },
    /**
     * @description:新增用户
     */
    async addUserFun(
      params: AddUserParamsModel & {
        isReturnNativeResponse?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await addUser(param);
    },
    /**
     * @description:更新用户
     */
    async updateUserFun(
      params: UpdateUserParamsModel & {
        isReturnNativeResponse?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await updateUser(param);
    },
    /**
     * @description:删除用户
     */
    async delUserFun(
      params: DelUserParamsModel & {
        isReturnNativeResponse?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await delUser(param);
    },
    /**
     * @description:获取超级管理员用户列表
     */
    async getAdminUserFun(
      param?: UserParamsModel & {
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserListResultModel | null> {
      const params: any = param;
      return await getAdminUserList(params);
    },
    /**
     * @description:新增超级管理员用户
     */
    async addAdminUserFun(
      params: AddUserParamsModel & {
        isReturnNativeResponse?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await addAdminUser(param);
    },
    /**
     * @description:更新超级管理员用户
     */
    async updateAdminUserFun(
      params: UpdateUserParamsModel & {
        isReturnNativeResponse?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      const param: any = params;
      return await updateAdminUser(param);
    },
  },
});
