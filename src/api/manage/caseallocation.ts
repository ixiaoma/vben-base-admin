import { defHttp } from '/@/utils/http/axios';
import { DemoListGetResultModel } from './model/caseAllocationModel';

enum Api {
  GetCaseAllocationList = '/api/mediation/caseMediation/listAssignedCase',
}

export const getCaseAllocationList = (data) => {
  return defHttp.post<DemoListGetResultModel>({ url: Api.GetCaseAllocationList, data });
};
