<template>
  <Button v-bind="$attrs" :disabled="isStart" @click="handleStart" :loading="loading">
    {{ getButtonText }}
  </Button>
</template>
<script lang="ts">
  import { defineComponent, ref, watchEffect, computed, unref, inject } from 'vue';
  import { Button } from 'ant-design-vue';
  import { useCountdown } from './useCountdown';
  import { isFunction } from '/@/utils/is';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';

  const props = {
    value: { type: [Object, Number, String, Array] },
    count: { type: Number, default: 60 },
    beforeStartFunc: {
      type: Function as PropType<() => Promise<boolean>>,
      default: null,
    },
  };
  export default defineComponent({
    name: 'CountButton',
    components: { Button },
    props,
    setup(props) {
      const loading = ref(false);
      const useUser = useUserStore();
      const { notification, createMessage } = useMessage();
      const { currentCount, isStart, start, reset } = useCountdown(props.count);
      const { t } = useI18n();
      const formData: any = inject('formData');
      const getButtonText = computed(() => {
        return !unref(isStart)
          ? t('component.countdown.normalText')
          : t('component.countdown.sendText', [unref(currentCount)]);
      });

      watchEffect(() => {
        props.value === undefined && reset();
      });

      /**
       * @description: Judge whether there is an external function before execution, and decide whether to start after execution
       */
      async function handleStart() {
        if (!formData.mobile) {
          createMessage.warning(t('sys.login.mobilePlaceholder'));
          return;
        }
        const { beforeStartFunc } = props;
        if (beforeStartFunc && isFunction(beforeStartFunc)) {
          loading.value = true;
          try {
            const canStart = await beforeStartFunc();
            canStart && start();
          } finally {
            loading.value = false;
          }
        } else {
          start();
        }
        (window as any).nvc.getNVCValAsync(function (nvcVal) {
          // 获取人机信息串
          // 将以下getNVCVal()函数的值，跟随业务请求一起上传，由后端请求AnalyzeNvc接口并返回200，400，600或者800。
          // 正式上线前务必将该服务端接口，更改为您自己的业务服务端接口
          sendSmsCodeWithNvc(nvcVal);
        });
      }
      async function sendSmsCodeWithNvc(nvcVal) {
        formData.showNc = false;
        useUser.sendSmsCode({ phone: formData.mobile, acsData: nvcVal }).then((res: any) => {
          if (!res || res?.data.success != true) {
            const errorCode = res?.data.errorCode;
            if (errorCode == '400') {
              if (formData.showNc) {
                return;
              } else {
                formData.showNc = true;
              }
              var ncoption = {
                // 声明滑动验证需要渲染的目标ID。
                renderTo: 'nc',
              };
              // 唤醒二次验证（滑动验证码）
              (window as any).nvc.getNC(ncoption);
            } else if (errorCode == '800' || errorCode == '900') {
              setTimeout(() => {
                window.location.reload();
              }, 1000);
              notification.error({
                message: res?.data.errorMessage || t('sys.api.validationFailed'),
              });
            }
            return;
          }
          createMessage.success(t('sys.login.sendSmsCodeSuccess'));
          reset();
        });
      }
      return { handleStart, currentCount, loading, getButtonText, isStart, formData };
    },
  });
</script>
