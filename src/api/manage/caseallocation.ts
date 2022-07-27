import { defHttp } from '/@/utils/http/axios';
import { DemoListGetResultModel } from './model/caseAllocationModel';

enum Api {
  GetCaseAllocationList = '/api/mediation/caseMediation/listAssignedCase',
  GetCaseDetail = '/api/caseinfo/caseBase/getBaseInfo',
  GetRepayList = '/api/casecollect/repay/repayPage',
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
