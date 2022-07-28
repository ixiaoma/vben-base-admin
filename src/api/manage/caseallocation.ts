import { defHttp } from '/@/utils/http/axios';
import { DemoListGetResultModel } from './model/caseAllocationModel';

enum Api {
  GetCaseAllocationList = '/api/mediation/caseMediation/listAssignedCase',
  GetCaseDetail = '/api/caseinfo/caseBase/getBaseInfo',
  GetRepayList = '/api/casecollect/repay/repayPage',
  GetContactInfo = '/api/caseinfo/case/detail/getAccusedPhoneInfo',
  GetAddressInfo = '/api/caseinfo/case/detail/getAccusedAddressInfo',
  GetWorkPlaceMediateRecord = '/api/mediation/workplace/getMediateRecordInfo',
  GetCaseMediateRecord = '/api/caseinfo/case/detail/getMediateRecordInfo',
  GetActionRecord = '/api/mediation/workplace/getAccusedActionRecordInfo',
  GetWorkPlaceLitigantInfo = '/api/mediation/workplace/getLitigantInfo',
  GetCaseLitigantInfo = '/api/caseinfo/case/detail/getLitigantInfo',
}

//案件分配列表
export const getCaseAllocationList = (data) => {
  return defHttp.post<DemoListGetResultModel>({ url: Api.GetCaseAllocationList, data });
};

//案件详情
export const getCaseDetail = (params) => {
  return defHttp.get({ url: Api.GetCaseDetail, params });
};

//还款情况列表
export const getRepayList = (data) => {
  return defHttp.post({ url: Api.GetRepayList, data });
};

//联系信息--电话列表
export const getContactInfoList = (params) => {
  return defHttp.get({ url: Api.GetContactInfo, params });
};

//联系信息--地址列表
export const getAddressInfoList = (params) => {
  return defHttp.get({ url: Api.GetAddressInfo, params });
};

//调解记录
export const getWorkPlaceMediateRecord = (params) => {
  return defHttp.get({ url: Api.GetWorkPlaceMediateRecord, params });
};
export const getCaseMediateRecord = (params) => {
  return defHttp.get({ url: Api.GetCaseMediateRecord, params });
};

//操作记录
export const getActionRecord = (params) => {
  return defHttp.get({ url: Api.GetActionRecord, params });
};

//当事人列表
export const getWorkPlaceLitigantInfo = (params) => {
  return defHttp.get({ url: Api.GetWorkPlaceLitigantInfo, params });
};
export const getCaseLitigantInfo = (params) => {
  return defHttp.get({ url: Api.GetCaseLitigantInfo, params });
};
