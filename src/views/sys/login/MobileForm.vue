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
        ref="countdownRef"
        size="large"
        class="fix-auto-fill"
        v-model:value="formData.sms"
        :placeholder="t('sys.login.smsCode')"
        :sendCodeApi="sendCodeApi"
      />
    </a-form-item>
    <a-form-item v-show="formData.showNc">
      <div id="nc" v-show="formData.showNc" :key:any="formData.ncTimer"></div>
    </a-form-item>

    <a-form-item class="enter-x">
      <a-button
        type="primary"
        size="large"
        block
        @click="handleLogin(PARENT_LOGIN)"
        :loading="loading"
      >
        {{ t('sys.login.loginButton') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref, provide, inject } from 'vue';
  import { CountdownInput } from '/@/components/CountDown';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { useUserStore } from '/@/store/modules/user';

  const formData = reactive({
    mobile: '',
    sms: '',
    showNc: false,
    ncTimer: null,
  });

  const formRef = ref();
  const USERSTORE = useUserStore();
  const loading = ref(false);
  const PARENT_LOGIN: any = inject('handleLogin');
  const countdownRef = ref<null | any>(CountdownInput);
  const parentHandleLogin: any = inject('handleLogin');
  const checkStatus: any = inject('$checkStatus');

  const { t } = useI18n();
  const { validForm } = useFormValid(formRef);
  const { getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.SMS_CODE);
  provide('formData', formData);
  function sonFun() {
    return countdownRef.value.countButtonRef.handleStart;
  }
  async function handleLogin(callback: Function) {
    const data = await validForm();
    if (!data) return;
    callback(USERSTORE.loginByPhone, {
      phone: data.mobile,
      smsCode: data.sms,
      type: 'SMS_CODE',
    });
  }
  function sendCodeApi() {
    if (!formData.mobile) {
      checkStatus(1, t('sys.login.mobilePlaceholder'), 'message', 'warning');
      return;
    }
    parentHandleLogin(null, formData, true);
    return true;
  }
  defineExpose({
    formData,
    handleLogin,
    formRef,
    loading,
    sonFun,
    sendCodeApi,
  });
</script>
<style lang="scss" scoped>
  @import '/@/styles/login.scss';
</style>
