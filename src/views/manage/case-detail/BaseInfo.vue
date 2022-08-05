<template>
  <a-card title="基本信息">
    <a-descriptions :column="3" size="small">
      <a-descriptions-item
        v-for="(item, index) in baseInfoList"
        :key="index"
        :label="item.label"
        :contentStyle="{ fontSize: '14px' }"
      >
        <RepayTable v-if="item.field === 'repayInfo'" v-bind="$attrs" />
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
  import { ref, unref, useAttrs } from 'vue';

  import RepayTable from './RepayTable.vue';

  import { getBaseInfoField, RecordProps } from './casedetail.data';
  import { getCaseDetail } from '/@/api/manage/caseallocation';

  import { formatToDateTime } from '/@/utils/dateUtil';
  import { getEnum, chainVerify } from '/@/utils/commonUtil';
  import { regFenToYuanToThousands } from '/@/utils/formatUtil';

  const attrs = useAttrs();
  const { caseNo, mediateNo, caseType, assignStatus } = unref(attrs.recordData) as RecordProps;

  const baseInfoList = ref(getBaseInfoField(caseType, assignStatus));

  async function getBaseInfo() {
    const params = { caseNo };
    const res = await getCaseDetail(params);
    baseInfoList.value = baseInfoList.value
      .filter((item) => !Reflect.has(item, 'show') || item.show)
      ?.map((ele) => {
        let valueData: any = undefined;
        if (ele.field === 'mediateNo') {
          valueData = mediateNo;
        } else {
          const fieldValue = res[ele.field];
          if (ele.type === 'money') {
            valueData = regFenToYuanToThousands(fieldValue);
          } else if (ele.type === 'date') {
            valueData = formatToDateTime(fieldValue);
          } else {
            if (ele.optionEnumCode) {
              valueData = getEnum(ele.optionEnumCode, false, fieldValue || 'UN_CHAINED');
            } else {
              valueData = fieldValue;
            }
          }
        }
        return {
          ...ele,
          value: valueData,
        };
      });
  }

  getBaseInfo();
</script>
<style lang="less" scoped>
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
