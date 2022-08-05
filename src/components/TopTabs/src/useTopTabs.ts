import { error } from '/@/utils/log';
import { isProdMode } from '/@/utils/env';
import { tryOnUnmounted } from '@vueuse/core';
import { ref, unref } from 'vue';
import { ReturnMethods, UseTabReturnType } from './typing';

export function useTopTabs(): UseTabReturnType {
  const tabRef = ref(null);

  function register(tabInstance) {
    isProdMode() &&
      tryOnUnmounted(() => {
        tabRef.value = null;
      });

    if (isProdMode() && tabInstance === unref(tabRef)) {
      return;
    }
    tabRef.value = tabInstance;
  }

  function getTabInstance(): any {
    const tab = unref(tabRef);
    if (!tab) {
      error('The tab instance has not been obtained yet');
    }
    return tab;
  }

  const methods: ReturnMethods = {
    setTabProps: (props) => {
      getTabInstance()?.setTabsProps(props);
    },
    setActiveKey: (activeKey) => {
      getTabInstance()?.setTabsProps({
        activeKey: activeKey,
      });
    },
    openTabs: (tabProps) => {
      getTabInstance()?.openTabs(tabProps);
    },
  };

  return [register, methods];
}
