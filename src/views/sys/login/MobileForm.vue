<template>
  <a-form
    v-show="getShow"
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
  >
    <a-form-item name="mobile" class="enter-x">
      <a-input
        size="large"
        v-model:value="formData.mobile"
        :placeholder="t('sys.login.mobile')"
        class="fix-auto-fill"
      />
    </a-form-item>
    <a-form-item name="sms" class="enter-x">
      <countdown-input
        size="large"
        class="fix-auto-fill"
        v-model:value="formData.sms"
        :placeholder="t('sys.login.smsCode')"
      />
    </a-form-item>
    <a-form-item v-if="formData.showNc">
      <div id="nc"></div>
    </a-form-item>

    <a-form-item class="enter-x">
      <a-button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref, provide } from 'vue';
  import { CountdownInput } from '/@/components/CountDown';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDesign } from '/@/hooks/web/useDesign';
  const { t } = useI18n();
  const { getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const useUser = useUserStore();
  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    mobile: '',
    sms: '',
    showNc: false,
  });

  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.SMS_CODE);
  provide('formData', formData);
  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    (window as any).nvc &&
      (window as any).nvc.getNVCValAsync(async (nvcVal) => {
        // 获取人机信息串
        // 将以下getNVCVal()函数的值，跟随业务请求一起上传，由后端请求AnalyzeNvc接口并返回200，400，600或者800。
        // 正式上线前务必将该服务端接口，更改为您自己的业务服务端接口
        try {
          loading.value = true;
          const userInfo = await useUser.loginByPhone({
            phone: formData.mobile,
            smsCode: formData.sms,
            acsData: nvcVal,
            type: 'SMS_CODE',
            tnt: 'TTCSZ6CN',
            mode: 'none', //不要默认的错误提示
          });
          if (userInfo) {
            notification.success({
              message: t('sys.login.loginSuccessTitle'),
              description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.name}`,
              duration: 3,
            });
          }
        } catch (error) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
            getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
          });
        } finally {
          loading.value = false;
        }
      });
  }
</script>
<style lang="scss" scoped>
  @import '/@/styles/login.scss';
</style>
