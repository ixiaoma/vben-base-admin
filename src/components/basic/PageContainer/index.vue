<template>
  <div class="basic-container">
    <div class="basic-page">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .basic-container {
    padding: 20px;
    .basic-page {
      padding: 20px;
      background-color: #fff;
    }
  }
</style>
