<template>
  <a-card>
    <a-descriptions title="基本信息" :column="3" size="small">
      <a-descriptions-item
        v-for="(item, index) in baseInfoList"
        :key="index"
        :label="item.label"
        :contentStyle="{ fontSize: '14px' }"
      >
        <RepayTable v-if="item.field === 'repayInfo'" />
        <div
          class="ellipsis-text btn-text"
          :title="item.value"
          v-else-if="item.field === 'chainHash'"
          @click="() => chainVerify()"
          >{{ item.value }}</div
        >
        <div class="ellipsis-text" v-else :title="item.value"
          >{{ item.value }} {{ item.suffix }}</div
        >
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  import RepayTable from './RepayTable.vue';

  import { getBaseInfoField } from './casedetail.data';
  import { getCaseDetail } from '/@/api/manage/caseallocation';

  import { formatToDateTime } from '/@/utils/dateUtil';
  import { getEnum, chainVerify } from '/@/utils/commonUtil';
  import { regFenToYuanToThousands } from '/@/utils/formatUtil';

  const route = useRoute();
  const { caseNo, mediateNo } = route.query;

  const baseInfoList = ref(getBaseInfoField());

  async function getBaseInfo() {
    const params = { caseNo };
    const res = await getCaseDetail(params);
    baseInfoList.value.forEach((ele) => {
      if (ele.field === 'mediateNo') {
        ele.value = mediateNo;
      } else {
        const fieldValue = res[ele.field];
        if (ele.type === 'money') {
          ele.value = regFenToYuanToThousands(fieldValue);
        } else if (ele.type === 'date') {
          ele.value = formatToDateTime();
        } else {
          if (ele.optionEnumCode) {
            ele.value = getEnum(ele.optionEnumCode, false, fieldValue);
          } else {
            ele.value = fieldValue;
          }
        }
      }
    });
  }
  getBaseInfo();
</script>
<style lang="less" scoped>
  ::v-deep(.ant-descriptions-title) {
    position: relative;
    padding-left: 12px;

    &::before {
      content: '';
      position: absolute;
      top: 3px;
      left: 0;
      width: 4px;
      height: 18px;
      background-color: @allocation-color;
    }
  }

  ::v-deep(.ant-descriptions-item-label) {
    position: relative;
    padding-left: 10px;
    font-size: 14px;
    color: @weak-grey-color;

    &::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 0;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: @allocation-color;
    }
  }

  ::v-deep(.ant-descriptions-item-content) {
    display: inline-block;
    overflow: hidden;

    .ellipsis-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: keep-all;
    }
  }

  .btn-text {
    color: @primary-color;
    cursor: pointer;
  }
</style>
