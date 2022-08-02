import { defHttp } from '/@/utils/http/axios';
import { isDevFn } from '../../../build/utils';
import { getEnv, getAppEnvConfig } from '/@/utils/env';
const { VITE_GLOB_API_URL } = getAppEnvConfig();
import {
  GetUserListResultModel,
  UserParamsModel,
  DelUserParamsModel,
  AddUserParamsModel,
  UpdateUserParamsModel,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  GetUserList = '/api/smartf-authx/authxUser/listPage', // 获取用户列表
  AddUser = '/api/smartf-authx/authxUser/add', // 新增用户
  DelUser = '/api/smartf-authx/authxUser/deleteByIdLogical', // 删除用户
  UpdateUser = '/api/smartf-authx/authxUser/updateById', // 修改用户
  AddAdminUser = '/api/smartf-authx/authxUser/addAdmin', // 添加超级管理员用户
  UpdateAdminUser = '/api/smartf-authx/authxUser/updateAdminById', // 修改超级管理员用户
  GetAdminUserList = '/api/smartf-authx/authxUser/listAdminPage', // 查询超级管理员用户
  UploadImg = '/api/smartf-authx/authxUser/upload', // 图片上传
  DownLoadImg = '/api/smartf-authx/authxUser/download?ossPath=', // 图片下载
}

/**
 * @description:获取用户列表
 */
export const getUserList = (params: UserParamsModel) => {
  return defHttp.post<GetUserListResultModel>({ url: Api.GetUserList, params });
};

/**
 * @description:新增用户
 */
export const addUser = (params: AddUserParamsModel, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<GetUserListResultModel>(
    { url: Api.AddUser, params },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
};

/**
 * @description:更新用户
 */
export const updateUser = (params: UpdateUserParamsModel, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<GetUserListResultModel>(
    { url: Api.UpdateUser, params },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
};

/**
 * @description:删除用户
 */
export const delUser = (params: DelUserParamsModel, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<GetUserListResultModel>(
    { url: Api.DelUser, params },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
};

/**
 * @description:获取超级管理员用户列表
 */
export const getAdminUserList = (params: UserParamsModel) => {
  return defHttp.post<GetUserListResultModel>({ url: Api.GetAdminUserList, params });
};

/**
 * @description:新增超级管理员用户
 */
export const addAdminUser = (params: AddUserParamsModel, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<GetUserListResultModel>(
    { url: Api.AddAdminUser, params },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
};

/**
 * @description:更新超级管理员用户
 */
export const updateAdminUser = (
  params: UpdateUserParamsModel,
  mode: ErrorMessageMode = 'modal',
) => {
  return defHttp.post<GetUserListResultModel>(
    { url: Api.UpdateAdminUser, params },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
};

/**
 * @description:图片上传
 */
export const uploadImgAxios = () => {
  return defHttp.post<GetUserListResultModel>(
    { url: Api.UploadImg },
    // {
    //   isReturnNativeResponse: true,
    //   errorMessageMode: mode,
    // },
  );
};
export const uploadImgUrl = () => {
  return isDevFn(getEnv()) ? `${VITE_GLOB_API_URL}${Api.UploadImg}` : Api.UploadImg;
};

/**
 * @description:图片下载
 */
export const downloadImg = () => {
  return defHttp.post<GetUserListResultModel>(
    { url: Api.DownLoadImg },
    {
      isReturnNativeResponse: false,
    },
  );
};

export const downloadImgUrl = () => {
  return isDevFn(getEnv()) ? `${VITE_GLOB_API_URL}${Api.DownLoadImg}` : Api.DownLoadImg;
};
