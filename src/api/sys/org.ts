import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetOrgList = '/api/smartf-authx/authxOrg/listPage',
  GetOrgTree = '/api/smartf-authx/authxOrg/getOrgTree'
}
//调解组织/原告/委托机构列表
export const getOrgList = (data) => {
  return defHttp.post({ url: Api.GetOrgList, data });
};
//机构数
export const getOrgTree = (data) => {
  return defHttp.post({ url: Api.GetOrgTree, data });
};
