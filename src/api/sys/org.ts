import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetOrgList = '/api/smartf-authx/authxOrg/listPage',
}

export const getOrgList = (data) => {
  return defHttp.post({ url: Api.GetOrgList, data });
};
