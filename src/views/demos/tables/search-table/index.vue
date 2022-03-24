<template>
  <top-bar>
    <a-tabs name="tabbar">
      <a-tab-pane key="1" tab="Tab 1" />
      <a-tab-pane key="2" tab="Tab 2" force-render />
      <a-tab-pane key="3" tab="Tab 3" />
    </a-tabs>
  </top-bar>

  <base-container>
    <search-table
      ref="dynamicTableRef"
      size="small"
      bordered
      :data-request="loadData"
      :columns="columns"
      :hideInQuery="hideInQuery"
      rowKey="heroid"
      @toggle-advanced="toggleAdvanced"
    />
  </base-container>
</template>

<script lang="ts" setup>
  import { columns, tableData } from './columns';

  const loadData = async (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          list: tableData,
          ...params,
        });
      }, 500);
    });
  };
  const hideInQuery = ['time'];
</script>

<style lang="less" scoped></style>
