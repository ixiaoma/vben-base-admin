import { message } from 'ant-design-vue';

import { useEnumStore } from '/@/store/modules/enum';
import { Persistent } from '/@/utils/cache/persistent';

import { getApiEnum, getChainVerifyUrl } from '/@/api/common/enum';

//判断列表是否选中
export function isSelect(list: Array<string | number>, isSingle: Boolean = false): boolean {
  if (!list.length) {
    message.warning('请勾选想要操作的数据');
    return false;
  }
  if (isSingle && list.length > 1) {
    message.warning('只能选择一条数据进行操作');
    return true;
  }
  return true;
}

//获取全量枚举中的数据
export function getEnum(enumCode?: string, backList = false, codeValue?: string) {
  const enumStore = useEnumStore();
  const globalEnum = enumStore.getGlobalEnum;
  if (!globalEnum) {
    return codeValue ? null : [];
  }
  if (codeValue && enumCode) {
    const chooseEnum = globalEnum[enumCode];
    return chooseEnum[codeValue]?.label;
  }
  if (enumCode) {
    if (backList) {
      const EnumList = Object.values(globalEnum[enumCode]);
      return EnumList;
    }
    return globalEnum[enumCode];
  }
  return globalEnum;
}

//获取单个枚举
export function getApiEnumList(code: string) {
  if (!code) {
    return;
  }
  return new Promise((resolve) => {
    const data = Persistent.getSession(code);
    if (data) {
      resolve(data);
      return;
    }
    getApiEnum(code).then((res) => {
      Persistent.setSession(code, { list: res }, true);
      resolve({ list: res });
    });
  });
}

//区块链--上链查证
export function chainVerify(urlEnum = 'ChainVerifyUrl') {
  const url: any = Persistent.getSession(urlEnum);
  if (url) {
    window.open(url);
    return;
  }
  getChainVerifyUrl().then((res) => {
    Persistent.setSession(urlEnum, res, true);
    window.open(res);
  });
}
