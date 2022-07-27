import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetEnumList = '/api/basedata/enum/list', //全量枚举
  GetChainVerifyUrl = '/api/smartf-alipay/alipay/chainVerifyUrl', //存证上链
  GetMoneyEnum = '/api/caseinfo/caseBase/queryLawsuitAmountCategory', //金额分档
  GetOvdDayEnum = '/api/caseinfo/caseBase/queryOvdDaysCategory', //逾期天数
  GetProdNameEnum = '/api/caseinfo/caseBase/listProdNames', //借款产品
}

//存证上链--查验url
export const getChainVerifyUrl = () => {
  return defHttp.get({ url: Api.GetChainVerifyUrl }, { isTransformResponse: false });
};

//获取全局枚举
export const enumApi = () => {
  return defHttp.get<void>({ url: Api.GetEnumList });
};

//异步码表
export const getApiEnum = (enumCode) => {
  return defHttp.get<void>({ url: Api[enumCode] });
};
