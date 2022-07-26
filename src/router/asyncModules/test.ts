export default {
  'views/demos/form/rule-form.vue': () => import('@/views/demos/form/rule-form/index.vue'), // 验证表单
  'views/demos/icons/Iconfont.vue': () => import('@/views/demos/icons/Iconfont.vue'), // 自定义图标
  'views/demos/tables/search-table/index.vue': () =>
    import('@/views/demos/tables/search-table/index.vue'), // search-table
  'views/demos/custom-modal.vue': () => import('@/views/demos/custom-modal.vue'), // 自定义模态框
};
