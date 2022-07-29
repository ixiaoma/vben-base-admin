<template>
  <a-form
    class="account-login enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <a-form-item name="account" class="enter-x">
      <a-input
        size="large"
        allow-clear
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      >
        <template #prefix>
          <SvgIcon size="26" name="login-user" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item name="password" class="enter-x">
      <a-input-password
        size="large"
        allow-clear
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      >
        <template #prefix>
          <SvgIcon size="26" name="login-pwd" />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item v-show="formData.showNc">
      <div id="nd" v-show="formData.showNc" :key:any="formData.ndTimer"></div>
    </a-form-item>
    <a-row class="enter-x" v-if="false">
      <a-col :span="12">
        <a-form-item>
          <a-checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </a-checkbox>
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item class="enter-x btn-form">
      <a-button
        type="primary"
        class="login-btn"
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
  import { reactive, ref, unref, computed, inject } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { userLoginStore } from '../../../store/modules/login';
  // import { useEnumStore } from '/@/store/modules/enum';

  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';

  const formData = reactive({
    account: 'wangerg',
    password: '1234567',
    showNc: false,
    ndTimer: null,
  });

  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);
  const USERSTORE = userLoginStore();
  const PARENT_LOGIN: any = inject('handleLogin');

  const { t } = useI18n();
  const { getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();
  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.ACCOUNT_PASSWORD);

  async function handleLogin(callback: Function, acsData?: any) {
    const data = await validForm();
    if (!data) return;
    callback(USERSTORE.login, {
      password: data.password,
      account: data.account,
      type: 'ACCOUNT_PASSWORD',
      acsData: acsData || '',
    });
  }

  defineExpose({
    handleLogin,
    formData,
    formRef,
    loading,
  });
</script>
<style lang="less" scoped>
  @import './login.less';

  .account-login {
    .btn-form {
      // margin-top: 60px;

      .login-btn {
        box-shadow: 0px 12px 20px -4px rgba(8, 88, 241, 0.4);
      }
    }

    .ant-input-affix-wrapper {
      border: none;
      border-bottom: 1px solid #655446;

      &:focus {
        box-shadow: none;
      }
    }

    .ant-input-affix-wrapper-focused {
      box-shadow: none;
    }

    .ant-form-item-has-error {
      .ant-input-affix-wrapper,
      .ant-input-affix-wrapper:hover {
        border-color: initial;
        box-shadow: none;
        border-bottom-color: #ed6f6f;
      }
    }
  }
</style>