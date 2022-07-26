import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetEnumList = '/api/basedata/enum/list',
  GetMoneyEnum = '/api/caseinfo/caseBase/queryLawsuitAmountCategory', //金额分档
  GetOvdDayEnum = '/api/caseinfo/caseBase/queryOvdDaysCategory', //逾期天数
  GetProdNameEnum = '/api/caseinfo/caseBase/listProdNames', //借款产品
}
//获取全局枚举
export const enumApi = () => {
  return defHttp.get({ url: Api.GetEnumList });
};
//异步码表
export const getApiEnum = (enumCode) => {
  return defHttp.get({ url: Api[enumCode] });
};
