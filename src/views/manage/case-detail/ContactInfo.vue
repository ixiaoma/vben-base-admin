<template>
  <a-card class="contact-info">
    <template #title>
      联系信息
      <a-radio-group
        v-model:value="mode"
        size="small"
        button-style="solid"
        :style="{ marginLeft: '20px' }"
        @change="radioChange"
      >
        <a-radio-button value="phone">电话</a-radio-button>
        <a-radio-button value="address">地址</a-radio-button>
      </a-radio-group>
    </template>
    <BasicTable @register="registerTable" class="pop-table">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'connectedTimes'">
          {{
            record.telTimes
              ? ((record.connectedTimes / record.telTimes) * 100).toFixed(2) + '%'
              : null
          }}
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:phone-outlined',
                onClick: handleCall.bind(null, record),
              },
              {
                icon: 'ant-design:form-outlined',
                onClick: handleEdit.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </a-card>
</template>
<script lang="ts" setup name="CaseAllocation">
  import { ref, unref, computed } from 'vue';
  import { useRoute } from 'vue-router';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getPhoneColumns, getAddressColumns } from './casedetail.data';
  import { getContactInfoList, getAddressInfoList } from '/@/api/manage/caseallocation';

  const mode = ref('phone');

  const { query } = useRoute();
  const { caseNo } = query;

  const tableProps = computed(() => {
    return {
      api: mode.value === 'phone' ? getContactInfoList : getAddressInfoList,
      columns: mode.value === 'phone' ? getPhoneColumns() : getAddressColumns(),
      actionColumn:
        mode.value === 'phone'
          ? {
              width: 120,
              title: '操作',
              dataIndex: 'action',
            }
          : undefined,
    };
  });

  //初始化列表数据
  const [registerTable, { setProps, reload }] = useTable({
    ...unref(tableProps),
    maxHeight: 200,
    searchInfo: {
      caseNo,
    },
    useSearchForm: false, //是否展示搜索区域
    showIndexColumn: false, //是否展示序号列
  });

  //电话/地址列表切换
  function radioChange() {
    setProps(unref(tableProps));
    reload();
  }

  function handleCall() {}

  function handleEdit() {}
</script>
<style lang="less" scoped>
  .contact-info {
    margin: 20px 0;

    .pop-table {
      ::v-deep(.ant-table-wrapper) {
        padding: 0;
      }
    }
  }
</style>
