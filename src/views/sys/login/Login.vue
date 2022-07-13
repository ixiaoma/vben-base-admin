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
          <login-form />
          <mobile-form />
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
  import { computed, unref } from 'vue';
  import { SvgIcon } from '/@/components/Icon';
  import LoginForm from './LoginForm.vue';
  import MobileForm from './MobileForm.vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useLocaleStore } from '/@/store/modules/locale';
  import { LoginStateEnum, useLoginState } from './useLogin';

  defineProps({
    sessionTimeout: {
      type: Boolean,
    },
  });
  const globSetting = useGlobSetting();
  const { prefixCls } = useDesign('login');
  const { t } = useI18n();
  const localeStore = useLocaleStore();
  const showLocale = localeStore.getShowPicker;
  const title = computed(() => globSetting?.title ?? '');
  const { setLoginState, getLoginState } = useLoginState();
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

    .container {
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
