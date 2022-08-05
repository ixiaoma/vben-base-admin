<template>
  <div class="case-detail">
    <a-row :gutter="20">
      <a-col :span="16">
        <BaseInfo v-bind="$attrs" />
        <ContactInfo v-bind="$attrs" />
        <RecordInfo v-bind="$attrs" />
      </a-col>
      <a-col :span="8">
        <LitigantInfo v-bind="$attrs" />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup name="CaseDetail">
  import BaseInfo from './BaseInfo.vue';
  import ContactInfo from './ContactInfo.vue';
  import RecordInfo from './RecordInfo.vue';
  import LitigantInfo from './LitigantInfo.vue';
</script>
<style lang="less" scoped>
  .case-detail {
    padding: 20px;
    background-color: @app-content-background;

    ::v-deep(.ant-card-head) {
      border: none;

      .ant-card-head-title {
        position: relative;
        padding-left: 12px;
        padding-bottom: 0;

        &::before {
          content: '';
          position: absolute;
          top: 19px;
          left: 0;
          width: 4px;
          height: 18px;
          background-color: @allocation-color;
        }
      }
    }

    ::v-deep(.ant-card-body) {
      padding: 12px 20px;
    }
  }
</style>
