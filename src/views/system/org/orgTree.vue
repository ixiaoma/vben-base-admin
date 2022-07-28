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
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';

  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { useOrgStore } from '/@/store/modules/org';

  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree },

    emits: ['select'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([]);
      const orgStore = useOrgStore();
      const timer = ref<number>();
      async function fetch() {
        treeData.value = (await orgStore.getOrgTreeFun()) as unknown as TreeItem[];
        timer.value = +new Date();
      }

      function handleSelect(keys, node) {
        emit('select', node, keys[0]);
      }

      onMounted(() => {
        fetch();
      });
      return { treeData, handleSelect, timer };
    },
  });
</script>
