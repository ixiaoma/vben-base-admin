import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetEnumList = '/api/basedata/enum/list'
}
//获取全局枚举
export const getEnumList = () => {
  return defHttp.get({ url: Api.GetEnumList });
};

