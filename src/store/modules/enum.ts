import type { EnumInfo } from '/#/store';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { enumApi } from '/@/api/common/enum';
import { ENUM_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
// import { isArray } from '/@/utils/is';

interface EnumState {
  globalEnum: Nullable<EnumInfo>;
}

export const useEnumStore = defineStore({
  id: 'app-enum',
  state: (): EnumState => ({
    globalEnum: null,
  }),
  getters: {
    getEnumData(): EnumInfo {
      return this.globalEnum || getAuthCache(ENUM_KEY) || null;
    }
  },
  actions: {
    setEnumData(globalEnum: EnumInfo | null) {
      this.globalEnum = globalEnum;
      setAuthCache(ENUM_KEY, globalEnum);
    },
    resetState(): void {
      this.globalEnum = null;
    },
    /**
     * @description: 全量枚举
     */
    async getEnumListAction(): Promise<EnumInfo | null> {
      const enumRes = await enumApi();
      const globalEnum = {}
      for(let i in enumRes){
        const enumList: any[] = []
        for(let j in enumRes[i]){
          enumList.push(enumRes[i][j])
        }
        globalEnum[i] = enumList
      }
      this.setEnumData(globalEnum)
      return globalEnum;
    }
  },
});

// Need to be used outside the setup
export function useEnumStoreWithOut() {
  return useEnumStore(store);
}
