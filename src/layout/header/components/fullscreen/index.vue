<template>
  <a-tooltip :title="getTitle" placement="bottom" :mouseEnterDelay="0.5">
    <span @click="toggle">
      <FullscreenOutlined v-if="!isFullscreen" :style="{ fontSize: '20px' }" />
      <FullscreenExitOutlined v-else :style="{ fontSize: '20px' }" />
    </span>
  </a-tooltip>
</template>
<script lang="ts" setup>
  import { computed, unref } from 'vue';

  import { useI18n } from 'vue-i18n';
  import { useFullscreen } from '@vueuse/core';
  import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
  const { t } = useI18n();
  const { toggle, isFullscreen } = useFullscreen();
  const getTitle = computed(() => {
    return unref(isFullscreen)
      ? t('layout.header.tooltipExitFull')
      : t('layout.header.tooltipEntryFull');
  });
</script>
