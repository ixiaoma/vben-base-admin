import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';

import { OrgTreeParamsModel, OrgTreeResultModel } from './model/orgModel';

enum Api {
  GetOrgList = '/api/smartf-authx/authxOrg/listPage',
  GetOrgTree = '/api/smartf-authx/authxOrg/getOrgTree',
  GetMeditionOrgList = '/api/smartf-authx/authxMediateOrg/listPage',
}
//原告/委托机构列表
export const getApplyOrgList = (data) => {
  return defHttp.post({ url: Api.GetOrgList, data });
};

//调解组织
export const getMeditionOrgList = (data) => {
  return defHttp.get<void>({ url: Api.GetMeditionOrgList, data });
};

//机构树
export const getOrgTree = (data: OrgTreeParamsModel, mode: ErrorMessageMode = 'none') => {
  return defHttp.post<OrgTreeResultModel>(
    { url: Api.GetOrgTree, data },
    { isReturnNativeResponse: false, errorMessageMode: mode },
  );
};
