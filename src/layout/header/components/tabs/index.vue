<template>
  <div class="tabs-view">
    <ATabs
      :active-key="activeKey"
      hide-add
      type="editable-card"
      size="small"
      class="tabs"
      @change="changePage"
      @edit="editTabItem"
    >
      <ATabs.TabPane v-for="pageItem in tabsList" :key="pageItem.fullPath">
        <template #tab>
          <ADropdown :trigger="['contextmenu']">
            <div style="display: inline-block">
              <TitleI18n :title="pageItem.meta?.title" />
            </div>
          </ADropdown>
        </template>
      </ATabs.TabPane>
    </ATabs>
  </div>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue';
  import { useRoute, useRouter, RouteLocation } from 'vue-router';
  import { Storage } from '@/utils/storage';
  import { TABS_ROUTES } from '@/enums/cacheEnum';
  import { useTabsViewStore, blackList } from '@/store/modules/tabsView';

  // import {
  //   ReloadOutlined,
  //   CloseOutlined,
  //   VerticalRightOutlined,
  //   VerticalLeftOutlined,
  //   ColumnWidthOutlined,
  //   MinusOutlined,
  // } from '@ant-design/icons-vue';
  // import { REDIRECT_NAME } from '@/router/constant';
  import { TitleI18n } from '@/components/basic/TitleI18n';

  type RouteItem = Omit<RouteLocation, 'matched' | 'redirectedFrom'>;

  const route = useRoute();
  const router = useRouter();
  const tabsViewStore = useTabsViewStore();

  const activeKey = computed(() => route.fullPath);

  // 标签页列表
  const tabsList = computed(() => tabsViewStore.getTabsList);

  // 获取简易的路由对象
  const getSimpleRoute = (route): RouteItem => {
    const { fullPath, hash, meta, name, params, path, query } = route;
    return { fullPath, hash, meta, name, params, path, query };
  };

  let routes: RouteItem[] = [];

  try {
    const routesStr = Storage.get(TABS_ROUTES) as string | null | undefined;
    routes = routesStr ? JSON.parse(routesStr) : [getSimpleRoute(route)];
  } catch (e) {
    routes = [getSimpleRoute(route)];
  }

  // 初始化标签页
  tabsViewStore.initTabs(routes);

  // tabsViewMutations.initTabs(routes)

  // 将当前组件从keep-alive缓存中移除
  const delCurrCompFromKeepAlive = () => {
    if (route.meta.keepAlive) {
      const name = router.currentRoute.value.matched.find((item) => item.name == route.name)
        ?.components?.default.name;
      if (name) {
        keepAliveStore.remove(name);
      }
    }
  };

  watch(
    () => route.fullPath,
    () => {
      if (blackList.some((n) => n === route.name)) return;
      // tabsViewMutations.addTabs(getSimpleRoute(route))
      tabsViewStore.addTabs(getSimpleRoute(route));
    },
    { immediate: true },
  );

  // 在页面关闭或刷新之前，保存数据
  window.addEventListener('beforeunload', () => {
    Storage.set(TABS_ROUTES, JSON.stringify(tabsList.value));
  });

  // 目标路由是否等于当前路由
  // const isCurrentRoute = (route) => {
  //   return router.currentRoute.value.matched.some((item) => item.name === route.name);
  // };

  // 关闭当前页面
  const removeTab = (route) => {
    if (tabsList.value.length === 1) {
      return message.warning('这已经是最后一页，不能再关闭了！');
    }
    delCurrCompFromKeepAlive();
    // tabsViewMutations.closeCurrentTabs(route)
    tabsViewStore.closeCurrentTab(route);
    // 如果关闭的是当前页
    if (activeKey.value === route.fullPath) {
      const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)];
      router.push(currentRoute);
    }
  };
  // tabs 编辑（remove || add）
  const editTabItem = (targetKey, action: string) => {
    if (action == 'remove') {
      removeTab(tabsList.value.find((item) => item.fullPath == targetKey));
    }
  };
  // 切换页面
  const changePage = (key) => {
    router.push(key);
  };

  // // 刷新页面
  // const reloadPage = () => {
  //   delCurrCompFromKeepAlive();
  //   router.replace({
  //     name: REDIRECT_NAME,
  //     params: {
  //       path: unref(route).fullPath,
  //     },
  //   });
  // };

  // // 关闭左侧
  // const closeLeft = (route) => {
  //   // tabsViewMutations.closeLeftTabs(route)
  //   tabsViewStore.closeLeftTabs(route);
  //   !isCurrentRoute(route) && router.replace(route.fullPath);
  // };

  // // 关闭右侧
  // const closeRight = (route) => {
  //   // tabsViewMutations.closeRightTabs(route)
  //   tabsViewStore.closeRightTabs(route);
  //   !isCurrentRoute(route) && router.replace(route.fullPath);
  // };

  // // 关闭其他
  // const closeOther = (route) => {
  //   // tabsViewMutations.closeOtherTabs(route)
  //   tabsViewStore.closeOtherTabs(route);
  //   !isCurrentRoute(route) && router.replace(route.fullPath);
  // };

  // // 关闭全部
  // const closeAll = () => {
  //   localStorage.removeItem('routes');
  //   // tabsViewMutations.closeAllTabs()
  //   tabsViewStore.closeAllTabs();
  //   router.replace('/');
  // };
</script>

<style lang="less" scoped>
  .tabs-view {
    flex: 1;
    overflow: hidden;
    padding: 0 20px;
    :deep(.tabs) {
      .ant-tabs-nav {
        padding: 4px 20px 0 10px;
        margin: 0;
        background-color: white;
        user-select: none;
        &::before {
          display: none;
        }
      }
      .ant-tabs-tab {
        border: none;
        background-color: #fff;
      }
      .ant-tabs-tab-active {
        color: #2759dc;
        font-weight: 400;
        font-size: 14px;
        background-color: #f0f3fb;
      }
      .ant-tabs-tab:not(.ant-tabs-tab-active) {
        color: #666;
        .ant-tabs-tab-remove {
          width: 0;
        }
        .anticon-close {
          width: 0;
          visibility: hidden;
          transition: width 0.3s;
        }

        &:hover {
          .anticon-close {
            width: 16px;
            visibility: visible;
            padding-left: 6px;
          }
          .ant-tabs-tab-remove {
            width: unset;
          }
        }
      }
    }

    .tabs-view-content {
      /* height: calc(100vh - #{$header-height}); */
      height: calc(100vh - 110px);
      padding: 20px 14px 0;
      overflow: auto;
    }
  }
</style>
