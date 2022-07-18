<template>
  <div :class="prefixCls">
    <div class="container">
      <div class="left-con"></div>
      <div class="right-con">
        <div :class="`${prefixCls}-tabs`">
          <div class="tabs-item" @click="setLoginState(LoginStateEnum.ACCOUNT_PASSWORD)">
            <span
              :class="unref(getLoginState) === LoginStateEnum.ACCOUNT_PASSWORD ? 'active-tabs' : ''"
              >账号登录</span
            >
          </div>
          <div class="tabs-item" @click="setLoginState(LoginStateEnum.SMS_CODE)">
            <span :class="unref(getLoginState) === LoginStateEnum.SMS_CODE ? 'active-tabs' : ''"
              >手机登录</span
            >
          </div>
        </div>
        <div :class="`${prefixCls}-form`">
          <login-form ref="loginRef" />
          <mobile-form ref="mobileRef" />
        </div>
        <a-row class="enter-x" type="flex" justify="space-between">
          <a-button type="link" size="small" class="back-btn">
            <svg-icon size="20" name="back" class="back-icon" />
            {{ t('sys.login.backHome') }}
          </a-button>
          <a-button type="link" size="small" :style="{ 'text-align': 'right' }">
            {{ t('sys.login.forgetPassword') }}
          </a-button>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { unref, ref, provide } from 'vue';
  import { SvgIcon } from '/@/components/Icon';
  import LoginForm from './LoginForm.vue';
  import MobileForm from './MobileForm.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { LoginStateEnum, useLoginState } from './useLogin';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';

  defineProps({
    sessionTimeout: {
      type: Boolean,
    },
  });

  const mobileRef = ref<InstanceType<typeof MobileForm>>();
  // const mobileRef = ref<null | any>(MobileForm);
  const loginRef = ref<InstanceType<typeof LoginForm>>();
  const userStore = useUserStore();

  const { t } = useI18n();
  const { prefixCls } = useDesign('login');
  const { setLoginState, getLoginState } = useLoginState();
  const { createMessage, notification, createErrorModal } = useMessage();

  provide('handleLogin', handleLogin);
  provide('ncCodeFun', ncCodeFun);
  init();

  console.log(import.meta.env);
  // 初始化无痕验证
  function init() {
    AWSC.use('nvc', function (_state, module) {
      // 初始化 调用module.init进行初始化
      (window as any).nvc = module.init({
        // test: module.TEST_NC_PASS, // 测试无痕验证通过
        // 应用类型标识。它和使用场景标识（scene字段）一起决定了无痕验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的appkey字段值，请务必正确填写。
        appkey: 'FFFF0N0000000000A686', //"LTAI5tRAEVrPrq4zfoc26AAk",//
        //使用场景标识。它和应用类型标识（appkey字段）一起决定了无痕验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的scene值，请务必正确填写。
        scene: 'nvc_message',
        // 二次验证获取人机信息串，跟随业务请求一起上传至业务服务器，由业务服务器进行验签。
        success: function (data) {
          console.log('144-----:', data);
          if (unref(getLoginState) === LoginStateEnum.SMS_CODE) {
            //验证码登录
            mobileRef.value!.formData.showNc = false;
            mobileRef.value!.sonFun()();
          } else {
            // 账号登录
            loginRef.value!.formData.showNc = false;
            loginRef.value!.handleLogin(getLoginData, data);
          }
          // that.showNCView = false
          // that.handleSendWithNvc(data)
        },
        // 前端二次验证失败时触发该回调参数
        fail: function (failCode) {
          console.log('150----:', failCode);
          mobileRef.value!.formData.showNc = false;
          loginRef.value!.formData.showNc = false;
          window.console && console.log(failCode);
          createMessage.error('人机验证失败!');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        // 前端二次验证加载异常时触发该回调参数。
        error: function (errorCode) {
          console.log('160----:', errorCode);
          mobileRef.value!.formData.showNc = false;
          loginRef.value!.formData.showNc = false;
          window.console && console.log(errorCode);
          createMessage.error('人机验证失败!');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
      });
    });
  }
  // 无痕验证 错误校验
  function ncCodeFun(res: any, params: any, idName: string): Boolean {
    if (!res || res?.data.success != true) {
      const errorCode = res?.data.errorCode;
      if (errorCode == '400') {
        if (params!.showNc) {
          return false;
        } else {
          params!.showNc = true;
        }
        var ncoption = {
          // 声明滑动验证需要渲染的目标ID。
          renderTo: idName || 'nc',
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
      return false;
    }
    return true;
  }
  // 登录接口请求
  async function getLoginData(ajaxFun: Function, params: any, acsData?: any) {
    let newRef: any = loginRef;
    let idName: any = 'nd';
    if (unref(getLoginState) === LoginStateEnum.SMS_CODE) {
      newRef = mobileRef.value;
      idName = 'nc';
    } else {
      newRef = loginRef.value;
      idName = 'nd';
    }
    newRef.loading = true;
    params.acsData = params.acsData || acsData;
    params.mode = 'none';
    params.tnt = 'TTCSZ6CN';
    const userInfo = await ajaxFun(params);
    const isPass: Boolean = await ncCodeFun(userInfo, newRef.formData, idName);
    if (isPass) {
      userStore.afterLoginAction(true);
      notification.success({
        message: t('sys.login.loginSuccessTitle'),
        description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.name}`,
        duration: 3,
      });
    }
    newRef.loading = false;
  }

  // 无痕验证 校验
  function handleLogin(ajaxFun: Function, params: any) {
    (window as any).nvc &&
      (window as any).nvc.getNVCValAsync(async (nvcVal) => {
        // 获取人机信息串
        // 将以下getNVCVal()函数的值，跟随业务请求一起上传，由后端请求AnalyzeNvc接口并返回200，400，600或者800。
        // 正式上线前务必将该服务端接口，更改为您自己的业务服务端接口
        try {
          await getLoginData(ajaxFun, params, nvcVal);
        } catch (error) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
            getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
          });
        }
      });
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-login';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';
  @dark-bg: #293146;

  html[data-theme='dark'] {
    .@{prefix-cls} {
      background-color: @dark-bg;
      background-image: url(/@/assets/svg/login-bg-dark.svg);

      .ant-input,
      .ant-input-password {
        background-color: #232a3b;
      }

      .ant-btn:not(.ant-btn-link):not(.ant-btn-primary) {
        border: 1px solid #4a5569;
      }

      &-form {
        background: transparent !important;
      }

      .app-iconify {
        color: #fff;
      }
    }

    input.fix-auto-fill,
    .fix-auto-fill input {
      -webkit-text-fill-color: #c9d1d9 !important;
      box-shadow: inherit !important;
    }
  }

  .@{prefix-cls} {
    min-height: 100%;
    overflow: hidden;
    background: url(/@/assets/images/login-bg.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: @screen-xl) {
      .@{prefix-cls}-form {
        background-color: #fff;
      }
    }

    .container {
      width: 1040px;
      min-height: 445px;
      display: flex;
      background-color: #fff;

      .left-con {
        width: 600px;
        background: linear-gradient(155deg, #208afd 0%, #1465f8 100%);
      }

      .right-con {
        flex: 1;
        padding: 53px 40px 23px;
        .@{prefix-cls}-tabs {
          display: flex;
          margin-bottom: 40px;

          .tabs-item {
            font-size: 26px;
            width: 50%;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            color: #999;
            line-height: 45px;
            letter-spacing: 4px;
            cursor: pointer;

            &:hover {
              color: @primary-color;
            }

            &:last-child {
              text-align: end;
            }
          }

          .active-tabs {
            color: @primary-color;
            border-bottom: 3px solid @primary-color;
          }
        }

        .back-btn {
          padding-left: 20px;

          .back-icon {
            position: absolute;
            left: 0;
          }
        }
      }

      .@{logo-prefix-cls} {
        display: flex;
        width: 60%;
        height: 80px;

        &__title {
          font-size: 24px;
          color: #fff;
        }

        img {
          width: 48px;
        }
      }
    }

    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
      height: 30px;

      &__title {
        font-size: 16px;
        color: #fff;
      }

      img {
        width: 100%;
      }
    }

    // .container {
    //   .@{logo-prefix-cls} {
    //     display: flex;
    //     width: 60%;
    //     height: 80px;

    //     &__title {
    //       font-size: 24px;
    //       color: #fff;
    //     }

    //     img {
    //       width: 48px;
    //     }
    //   }
    // }

    &-sign-in-way {
      .anticon {
        font-size: 22px;
        color: #888;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }

    input:not([type='checkbox']) {
      min-width: 360px;

      @media (max-width: @screen-xl) {
        min-width: 320px;
      }

      @media (max-width: @screen-lg) {
        min-width: 260px;
      }

      @media (max-width: @screen-md) {
        min-width: 240px;
      }

      @media (max-width: @screen-sm) {
        min-width: 160px;
      }
    }

    .@{countdown-prefix-cls} input {
      min-width: unset;
    }

    .ant-divider-inner-text {
      font-size: 12px;
      color: @text-color-secondary;
    }
  }
</style>
