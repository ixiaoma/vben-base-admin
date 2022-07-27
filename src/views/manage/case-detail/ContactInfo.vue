<template>
  <a-card>
    <a-radio-group v-model:value="mode" button-style="solid" :style="{ marginBottom: '8px' }" @change="radioChange">
      <a-radio-button value="phone">电话</a-radio-button>
      <a-radio-button value="address">地址</a-radio-button>
    </a-radio-group>
    <BasicTable @register="registerTable" class="pop-table" />
  </a-card> 
</template>
<script lang="ts" setup name="CaseAllocation">
  import { ref, unref, computed } from 'vue';
  import { useRoute } from 'vue-router';

  import { BasicTable, useTable } from '/@/components/Table';
  import { getPhoneColumns, getAddressColumns } from './casedetail.data';
  import { getContactInfoList, getAddressInfoList } from '/@/api/manage/caseallocation';

  const route = useRoute();
  const { caseNo } = route.query;

  const mode = ref('phone')

  const tableProps = computed(()=>{
    return {
      api: mode.value === 'phone' ? getContactInfoList : getAddressInfoList,
      columns: mode.value === 'phone' ? getPhoneColumns() : getAddressColumns(),
    }
  })
  console.log(tableProps);
  
  const [registerTable, {setProps, reload}] = useTable({
    ...unref(tableProps),
    maxHeight: 200,
    searchInfo: {
      caseNo,
    },
    useSearchForm: false, //是否展示搜索区域
    showIndexColumn: false, //是否展示序号列
  });

  function radioChange(){
    setProps(unref(tableProps))
    reload()
  }
</script>
<style lang="less" scoped>
  .pop-table {
    ::v-deep(.ant-table-wrapper) {
      padding: 0;
    }
  }
</style>
