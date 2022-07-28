import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/user/index',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: t('routes.basic.system.moduleName'),
  },
  children: [
    {
      path: 'user',
      name: 'AccountManagement',
      meta: {
        title: t('routes.basic.system.user'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/system/user/index.vue'),
    },
    // {
    //   path: 'account_detail/:id',
    //   name: 'AccountDetail',
    //   meta: {
    //     hideMenu: true,
    //     title: t('routes.basic.system.account_detail'),
    //     ignoreKeepAlive: true,
    //     showMenu: false,
    //     currentActiveMenu: '/system/user/index',
    //   },
    //   component: () => import('/@/views/system/user/AccountDetail.vue'),
    // },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.basic.system.role'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/role/index.vue'),
    },

    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: t('routes.basic.system.menu'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/menu/index.vue'),
    },
    {
      path: 'org',
      name: 'DeptManagement',
      meta: {
        title: t('routes.basic.system.org'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/org/index.vue'),
    },
    // {
    //   path: 'changePassword',
    //   name: 'ChangePassword',
    //   meta: {
    //     title: t('routes.basic.system.password'),
    //     ignoreKeepAlive: true,
    //   },
    //   component: () => import('/@/views/system/password/index.vue'),
    // },
  ],
};

export default system;
