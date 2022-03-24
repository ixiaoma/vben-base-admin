import { App } from 'vue';

import { SvgIcon } from '@/components/basic/SvgIcon';
import { IconFont } from '@/components/basic/Iconfont';
import { BaseContainer } from '@/components/basic/PageContainer';
import { TopBar } from '@/components/basic/TopBar';
import { DynamicTable } from '@/components/core/SearchTable';

/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
  app.component(SvgIcon.name, SvgIcon);
  app.component(IconFont.name, IconFont);
  app.component('BaseContainer', BaseContainer);
  app.component('TopBar', TopBar);
  app.component('SearchTable', DynamicTable);
}
