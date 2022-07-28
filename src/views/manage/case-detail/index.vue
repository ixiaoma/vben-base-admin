<template>
  <div class="case-detail">
    <a-row :gutter="20">
      <a-col :span="16">
        <BaseInfo />
        <ContactInfo />
        <RecordInfo />
      </a-col>
      <a-col :span="8" />
    </a-row>
  </div>
</template>
<script lang="ts" setup name="CaseDetail">
  import BaseInfo from './BaseInfo.vue';
  import ContactInfo from './ContactInfo.vue'
  import RecordInfo from './RecordInfo.vue'
</script>
<style lang="less" scoped>
  .case-detail {
    padding: 20px;

    ::v-deep(.ant-card-head){
      border: none;

      .ant-card-head-title{
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

    ::v-deep(.ant-card-body){
      padding: 12px 20px;
    }
  }
</style>
