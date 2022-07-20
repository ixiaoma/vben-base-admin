import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/api/smartf-authx/authx/login',
  Logout = '/api/smartf-authx/authx/logout',
  GetUserInfo = '/api/smartf-authx/authx/getLoginUser',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams) {
  return defHttp.post<LoginResultModel>({
    url: Api.Login,
    params,
  });
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.post<GetUserInfoModel>({ url: Api.GetUserInfo });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.post({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
