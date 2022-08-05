import { Persistent, BasicKeys } from '/@/utils/cache/persistent';
import { CacheTypeEnum } from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';
import { TOKEN_KEY, TNT_KEY } from '/@/enums/cacheEnum';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getTnt() {
  return getCache(TNT_KEY);
}
export function getToken() {
  return getAuthCache(TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}
export function getCache<T>(key: BasicKeys, isSession = false) {
  const fn = !isSession ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setCache(key: BasicKeys, value, isSession = false) {
  const fn = !isSession ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

export function clearCache(isSession = false, immediate = true) {
  const fn = !isSession ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}
