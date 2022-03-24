<template>
  <div class="top-bar">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
  .top-bar {
    padding: 0 20px;
    background-color: #fff;
    border-top: 2px solid #f0f3fb;
    :deep(.ant-tabs-nav) {
      height: 40px;
      margin-bottom: 0;
      &:brefor {
        display: none;
      }
      .ant-tabs-tab-btn {
        padding: 0 20px;
      }
    }
  }
</style>
