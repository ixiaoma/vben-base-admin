<template>
  <div class="case-detail">
    <a-row :gutter="20">
      <a-col :span="16">
        <BaseInfo />
      </a-col>
      <a-col :span="8" />
    </a-row>
  </div>
</template>
<script lang="ts" setup name="CaseDetail">
  import BaseInfo from './BaseInfo.vue';
</script>
<style lang="less" scoped>
  .case-detail {
    padding: 20px;
  }
</style>
