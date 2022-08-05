<template>
  <a-card class="record-info">
    <a-radio-group v-model:value="mode" button-style="solid" @change="radioChange">
      <a-radio-button value="meditorRecord">调解记录</a-radio-button>
      <a-radio-button value="actionRecord">操作记录</a-radio-button>
    </a-radio-group>
    <BasicTable @register="registerTable" class="pop-table">
      <template #bodyCell="{ column, record }">
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
  import { ref, unref, computed, useAttrs } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getMeditorColumns, getActionColumns, RecordProps } from './casedetail.data';
  import { getWorkPlaceMediateRecord, getActionRecord } from '/@/api/manage/caseallocation';

  const attrs = useAttrs();
  const { caseNo } = unref(attrs.recordData) as RecordProps;

  const mode = ref('meditorRecord');

  const tableProps = computed(() => {
    return {
      api: mode.value === 'meditorRecord' ? getWorkPlaceMediateRecord : getActionRecord,
      columns: mode.value === 'meditorRecord' ? getMeditorColumns() : getActionColumns(),
      actionColumn:
        mode.value === 'meditorRecord'
          ? {
              width: 100,
              title: '操作',
              dataIndex: 'action',
            }
          : undefined,
      resizeWidthScroll: true,
    };
  });
  //初始化列表数据
  const [registerTable, { setProps, reload }] = useTable({
    ...unref(tableProps),
    maxHeight: 200,
    canResize: false,
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
  .pop-table {
    ::v-deep(.ant-table-wrapper) {
      padding: 12px 0;
    }
  }
</style>
