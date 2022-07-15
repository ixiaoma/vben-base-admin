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
        @click="handleLogin"
        :loading="loading"
      >
        {{ t('sys.login.loginButton') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  //import { onKeyStroke } from '@vueuse/core';
  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();

  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);

  const formData = reactive({
    account: '15226597178',
    password: '7654321',
  });

  const { validForm } = useFormValid(formRef);

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.ACCOUNT_PASSWORD);
  let nvc: any = null;
  function init() {
    AWSC.use('nvc', function (state, module) {
      // 初始化 调用module.init进行初始化
      nvc = module.init({
        // test: module.TEST_NC_PASS, // 测试无痕验证通过
        // 应用类型标识。它和使用场景标识（scene字段）一起决定了无痕验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的appkey字段值，请务必正确填写。
        appkey: 'FFFF0N0000000000A686', //"LTAI5tRAEVrPrq4zfoc26AAk",//
        //使用场景标识。它和应用类型标识（appkey字段）一起决定了无痕验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的scene值，请务必正确填写。
        scene: 'nvc_message',
        // 二次验证获取人机信息串，跟随业务请求一起上传至业务服务器，由业务服务器进行验签。
        success: function (data) {
          console.log('144-----:', data);
          // that.showNCView = false
          // that.handleSendWithNvc(data)
        },
        // 前端二次验证失败时触发该回调参数
        fail: function (failCode) {
          console.log('150----:', failCode);
          // that.showNCView = false;
          // window.console && console.log(failCode);
          // that.$message.error('人机验证失败!');
          // setTimeout(() => {
          //   window.location.reload()
          // }, 1000);
        },
        // 前端二次验证加载异常时触发该回调参数。
        error: function (errorCode) {
          console.log('160----:', errorCode);
          // window.console && console.log(errorCode);
          // that.$message.error('人机验证失败!');
          // setTimeout(() => {
          //   window.location.reload()
          // }, 1000);
        },
      });
    });
  }
  init();
  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    nvc && nvc.getNVCValAsync(async (nvcVal) => {
      // 获取人机信息串
      // 将以下getNVCVal()函数的值，跟随业务请求一起上传，由后端请求AnalyzeNvc接口并返回200，400，600或者800。
      // 正式上线前务必将该服务端接口，更改为您自己的业务服务端接口
      try {
        loading.value = true;
        const userInfo = await userStore.login({
          password: data.password,
          account: data.account,
          acsData: nvcVal,
          type: 'ACCOUNT_PASSWORD',
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
<style lang="less" scoped>
  .account-login {
    .btn-form {
      margin-top: 60px;

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
