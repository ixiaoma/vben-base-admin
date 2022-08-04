import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  GetUserInfoModel,
  SendSmsCodeParams,
  LoginByPhoneParams,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/api/smartf-authx/authx/login',
  Logout = '/api/smartf-authx/authx/logout',
  GetUserInfo = '/api/smartf-authx/authx/getLoginUser',
  SendSmsCode = '/api/smartf-authx/authx/sendSmsCode',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: 发送验证码
 */
export function sendSmsCodeApi(params: SendSmsCodeParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.SendSmsCode,
      params,
    },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
}
/**
 * @description: 手机号登录
 */
export function loginByPhoneApi(params: LoginByPhoneParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.Login,
      params,
    },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
}
/**
 * @description: 账号登录
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.Login,
      params,
    },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo 获取用户信息
 */
export function getUserInfo() {
  return defHttp.post<GetUserInfoModel>({ url: Api.GetUserInfo });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

// 登出
export function doLogout() {
  return defHttp.post({ url: Api.Logout }, { loginOut: true });
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
