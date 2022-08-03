<template>
  <div class="case-allocation">
    <a-tabs v-model:activeKey="activeKey" class="top-tab" @change="handleChangeTab">
      <a-tab-pane key="1" tab="待分配" />
      <a-tab-pane key="2" tab="已分配" />
      <template #leftExtra>
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            {{ selectType.caseTypeName }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu @select="handleMenuClick" selectable v-model:selectedKeys="selectType.caseType">
              <a-menu-item v-for="item in caseTypeList" :key="item.value">
                {{ item.label }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>
    <BasicTable
      @register="registerTable"
      :rowSelection="{
        type: 'checkbox',
        fixed: 'left',
        selectedRowKeys: checkedKeys,
        onChange: onSelectChange,
      }"
    >
      <template #toolbar>
        <a-button type="primary" @click="handleAssign">案件分配</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '详情',
                onClick: handleDetail.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <AssignModal @register="registerModal" @success="submitSuccess" />
  </div>
</template>
<script lang="ts" setup name="CaseAllocation">
  import { ref, unref, reactive, computed } from 'vue';
  import { useRouter } from 'vue-router';

  import AssignModal from './AssignModal.vue';
  import { DownOutlined } from '@ant-design/icons-vue';

  import { useModal } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { isSelect } from '/@/utils/commonUtil';
  import { getEnumArray } from '/@/enums/commonEnum';
  import { getBasicColumns, getFormConfig } from './allocation.data';
  import { getCaseBaseList, getCaseAllocationList } from '/@/api/manage/caseallocation';

  interface CaseState {
    caseType: Array<number>;
    caseTypeName: string | undefined;
  }

  const caseTypeList = getEnumArray('CaseTypeEnum');
  const activeKey = ref('1');

  const selectType = reactive<CaseState>({
    caseType: [1009],
    caseTypeName: '要素式案件',
  });

  const tableProps = computed(() => {
    return {
      api: activeKey.value === '1' ? getCaseBaseList : getCaseAllocationList,
      columns: getBasicColumns(activeKey.value, selectType.caseType[0]),
      formConfig: getFormConfig(activeKey.value, selectType.caseType[0]),
      searchInfo: {
        caseType: selectType.caseType[0],
      },
      resizeWidthScroll: true,
    };
  });

  const router = useRouter();
  const checkedKeys = ref<Array<string | number>>([]); //当前列表选中的key

  const [registerModal, { openModal }] = useModal();

  const [registerTable, { getForm, setProps, reload }] = useTable({
    ...unref(tableProps),
    useSearchForm: true, //是否展示搜索区域
    showIndexColumn: false, //是否展示序号列
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
    },
  });
  //切换案件类型
  function handleMenuClick({ key }) {
    selectType.caseTypeName = caseTypeList.find((ele) => ele.value === key)?.label;
    handleChangeTab();
  }
  function handleChangeTab() {
    setProps(unref(tableProps));
    reload();
  }
  //获取form表单数据
  function handleAssign() {
    if (!isSelect(checkedKeys.value)) {
      return;
    }
    openModal(true);
    console.log('查询区域数据', getForm().getFieldsValue());
  }
  //列表复选框勾选
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    console.log(selectedRowKeys);
    checkedKeys.value = selectedRowKeys;
  }
  //跳转详情页
  function handleDetail({ mediateNo, caseNo }: ReadonlyRecordable) {
    router.push({
      name: 'CaseDetail',
      query: {
        mediateNo,
        caseNo,
      },
    });
  }
  //弹框emit的方法
  function submitSuccess(data) {
    console.log('submit', data);
  }
</script>
<style lang="less" scoped>
  .top-tab {
    background-color: #fff;
    padding: 0 20px;

    ::v-deep(.ant-tabs-nav) {
      margin: 0;
    }

    ::v-deep(.ant-tabs-tab) {
      padding: 9px 0;
    }

    .ant-dropdown-link {
      margin-right: 40px;
    }
  }
</style>
