import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const manage: AppRouteModule = {
  path: '/manage',
  name: 'Manage',
  component: LAYOUT,
  redirect: '/manage/searchtable',
  meta: {
    orderNo: 10,
    icon: 'carbon:cloud-service-management',
    title: t('routes.manage.manage'),
  },
  children: [
    {
      path: 'case-allocation',
      name: 'CaseAllocation',
      component: () => import('/@/views/manage/case-allocation/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.manage.searchtable'),
      },
    }
  ],
};

export default manage;
