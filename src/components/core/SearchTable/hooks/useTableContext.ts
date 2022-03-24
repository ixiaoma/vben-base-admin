import type { DynamicTableInstance } from './../typing';
import { provide, inject, type ComponentInternalInstance } from 'vue';

const key = Symbol('SearchTable');

export function createTableContext(instance: ComponentInternalInstance) {
  provide(key, instance.proxy);
}

export function useTableContext() {
  return inject(key) as DynamicTableInstance;
}
