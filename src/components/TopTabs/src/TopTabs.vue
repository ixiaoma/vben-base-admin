<template>
  <a-tabs
    :activeKey="activeKey"
    v-bind="$attrs"
    class="top-tab"
    tabBarGutter="20"
    hide-add
    type="editable-card"
    @edit="closeTab"
    @change="handleChangeTab"
  >
    <slot></slot>
    <template #leftExtra>
      <slot name="leftExtra"></slot>
    </template>
    <a-tab-pane v-for="item in detailList" :key="item.id" :tab="item.receiveName">
      <CaseDetail :recordData="item" />
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup name="CaseAllocation">
  import { ref, unref, getCurrentInstance } from 'vue';

  import type { TabInstance } from './typing';

  import { deepMerge } from '/@/utils';
  import { isArray } from '/@/utils/is';
  import CaseDetail from '/@/views/manage/case-detail/index.vue';

  const props = defineProps({
    activeKey: { type: String },
  });
  const emit = defineEmits(['register', 'update:activeKey']);

  const propsRef = ref(null);
  const initActiveKey = ref();
  const detailList = ref<any[]>([]);

  const tabInstance: TabInstance = {
    setTabProps: setTabProps,
    openTabs: openTabs,
  };
  const instance = getCurrentInstance();
  instance && emit('register', tabInstance);
  function setTabProps(props): void {
    propsRef.value = deepMerge(unref(propsRef) || ({} as any), props);
  }

  //切换tab
  function handleChangeTab(activeKey) {
    emit('update:activeKey', activeKey);
  }
  //关闭tab
  function closeTab(targetKey: string) {
    let lastIndex = 0;
    detailList.value.forEach((pane, i) => {
      if (pane.id === targetKey) {
        lastIndex = i - 1;
      }
    });
    detailList.value = detailList.value.filter((pane) => pane.id !== targetKey);
    if (detailList.value.length && props.activeKey === targetKey) {
      handleChangeTab(lastIndex >= 0 ? detailList.value[lastIndex].id : detailList.value[0].id);
    } else if (!detailList.value.length) {
      handleChangeTab(initActiveKey.value);
    }
  }
  //跳转详情页
  function openTabs(record) {
    initActiveKey.value = props.activeKey;
    handleChangeTab(record.id);
    if (isArray(record)) {
      handleChangeTab(record[0].id);
      detailList.value = [...unref(detailList), ...record];
    } else {
      handleChangeTab(record.id);
      const isOpen = detailList.value.find((pane) => pane.id === record.id);
      if (!isOpen) {
        detailList.value.push(record);
      }
    }
  }
</script>
<style lang="less" scoped>
  .top-tab {
    background-color: #fff;

    ::v-deep(.ant-tabs-nav) {
      margin: 0;
      padding: 0 20px;
    }

    ::v-deep(.ant-tabs-tab) {
      background: initial;
      border: none;
      color: @light-grey-color;
    }

    ::v-deep(.ant-tabs-tab-active) {
      border-bottom: 2px solid @functional-color!important;

      .ant-tabs-tab-btn {
        color: @grey-color;
        text-shadow: none;
      }
    }

    ::v-deep(.ant-tabs-extra-content) {
      margin-right: 20px;

      a {
        color: @grey-color;
      }
    }
  }
</style>
