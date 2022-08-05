<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      :key="timer"
      title="组织列表"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      :defaultExpandAll="true"
      :fieldNames="{ key: 'code', title: 'name' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { string } from 'vue-types';

  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { useOrgStore } from '/@/store/modules/org';

  const props: any = defineProps({
    pageSource: {
      type: string,
      default: '',
    },
  });
  const emits = defineEmits(['select']);
  const treeData = ref<TreeItem[]>([]);
  const orgStore = useOrgStore();
  const timer = ref<number>();
  async function fetch() {
    const result = (await orgStore.getOrgTreeFun()) as unknown as TreeItem[];
    if (props.pageSource === 'ORG') {
      treeData.value = [
        {
          name: '组织管理',
          code: '0',
          orgCode: '0',
          type: 'SYS',
          children: result,
          userAdd: '0',
          key: '0',
        },
      ];
    } else {
      treeData.value = result;
    }
    timer.value = +new Date();
  }

  function handleSelect(keys, node) {
    emits('select', node, keys[0]);
  }

  onMounted(() => {
    fetch();
  });

  defineExpose({
    treeData,
    handleSelect,
    timer,
  });
</script>
