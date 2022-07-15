<template>
  <basic-modal v-bind="$attrs" title="案件分配" width="700px" @ok="handleSubmit" @register="register">
    <p class="h-20" v-for="index in 20" :key="index">根据屏幕高度自适应</p>
    <!-- 自定义页脚
    <template #footer>
      <a-button key="back">Return</a-button>
      <a-button key="submit" type="primary">Submit</a-button>
    </template> -->
  </basic-modal>
</template>
<script lang="ts" setup name="AllocationModal">
  import { BasicModal, useModalInner } from '/@/components/Modal'

  const [register, { closeModal }] = useModalInner();

  //声明emit
  // const emit = defineEmits(['success']);
  const emit = defineEmits<{ 
    (e: 'success', value: any): void
  }>()

  //props声明
  // const props = defineProps({
  //   foo: String
  // })
  // const props = defineProps<{
  //   foo: string
  //   bar?: number
  // }>()

  function handleSubmit() {
    emit('success', {a: 3})
    closeModal();
  }
</script>
<style lang="less" scoped>
  .empty-tips {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>