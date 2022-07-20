import type { AppRouteRecordRaw } from '/@/router/types';
// import { t } from '/@/hooks/web/useI18n';
import {
  REDIRECT_NAME,
  LAYOUT,
  EXCEPTION_COMPONENT,
  PAGE_NOT_FOUND_NAME,
} from '/@/router/constant';

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  resName: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      resName: PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  component: LAYOUT,
  resName: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('/@/views/sys/redirect/index.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
};
export const SELF_SETTING: AppRouteRecordRaw = {
  path: '/self',
  resName: 'SelfSetting',
  component: LAYOUT,
  redirect: '/self/setting',
  meta: {
    title: '个人中心',
  },
  children: [
    {
      path: '/self/setting',
      resName: 'AccountSettingPage',
      component: () => import('/@/views/sys/setting/index.vue'),
      meta: {
        title: '个人中心',
      },
    },
  ],
};
export const CASE_DETAIL: AppRouteRecordRaw = {
  path: '/case',
  resName: 'CaseDetail',
  component: LAYOUT,
  redirect: '/case/detail',
  meta: {
    title: '案件详情',
  },
  children: [
    {
      path: '/case/detail',
      resName: 'CaseDetailPage',
      component: () => import('/@/views/manage/case-detail/index.vue'),
      meta: {
        title: '案件详情',
      },
    },
  ],
};
