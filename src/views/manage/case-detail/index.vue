<template>
  案件详情
  {{ id }}
  {{ mediateNo }}
  //TODO
</template>
<script lang="ts" setup name="CaseDetail">
  // import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const { id, mediateNo } = route.query;
</script>
