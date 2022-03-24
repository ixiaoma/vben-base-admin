<template>
  <div class="table-search">
    <schema-form ref="dynamicFormRef" :form-schema="formSchema">
      <template #operate-button>
        <template v-if="formItemSchemas.length > 0 && formItemSchemas.length > defaultShowItems">
          <a @click="toggleAdvanced" class="open-btn">
            {{ advanced ? $t('component.form.putAway') : $t('component.form.unfold') }}
            <caret-down-outlined class="collapse-icon" />
          </a>
        </template>
        <span class="search-submitButtons" :style="{ float: 'right', overflow: 'hidden' }">
          <span>
            <a-button type="primary" style="margin-right: 10px" @click="query">
              {{ $t('common.queryText') }}
            </a-button>
            <a-button type="default" @click="reset" class="reset-btn">
              {{ $t('common.resetText') }}
            </a-button>
          </span>
        </span>
      </template>
    </schema-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, computed, ref, nextTick } from 'vue';
  import { CaretDownOutlined } from '@ant-design/icons-vue';
  import type { TableColumn } from '../../typing';
  import SchemaForm from '@/components/core/SchemaForm/schema-form.vue';
  import type { FormItemSchema, FormProps } from '@/components/core/SchemaForm/types/form';

  export default defineComponent({
    name: 'QueryForm',
    components: { CaretDownOutlined, SchemaForm },
    props: {
      /** 默认显示个数 */
      defaultShowItems: {
        type: Number,
        default: 3,
      },
      /** 表单属性配置 */
      formProps: {
        type: Object as PropType<FormProps>,
        default: () => ({}),
      },
      columns: {
        type: Object as PropType<TableColumn[]>,
        required: true,
      },
    },
    emits: ['query', 'reset', 'toggle-advanced'],
    setup(props, { slots, emit }) {
      const state = reactive({
        advanced: false,
        labelMap: {},
      });

      const dynamicFormRef = ref<InstanceType<typeof SchemaForm>>();

      // 获取表格列key
      const getColumnKey = (column: TableColumn) => {
        return `${column.key || column.dataIndex || ''}`.split('.').pop() || '';
      };

      /**
       * @description 展开/收起 图标旋转转数
       */
      const turn = computed(() => `${state.advanced ? 0.5 : 0}turn`);

      const formSchema = computed(() => {
        return {
          schemas: !state.advanced
            ? formItemSchemas.value.slice(0, props.defaultShowItems)
            : formItemSchemas.value,
          labelWidth: 80,
          ...props.formProps,
        };
      });

      const formItemSchemas = computed<FormItemSchema[]>(() => {
        return props.columns
          .filter((n) => {
            const field = getColumnKey(n);
            return !n.hideInSearch && !!field && field !== '$action';
          })
          .map((n) => {
            return {
              field: n.formItemProps?.field ?? n.searchField ?? getColumnKey(n),
              component: 'Input',
              label: n.title,
              colProps: {
                span: 8,
              },
              ...n.formItemProps,
            };
          });
      });

      /**
       * @description 切换展开/收起 状态
       */
      const toggleAdvanced = async () => {
        state.advanced = !state.advanced;
        await nextTick();
        emit('toggle-advanced', state.advanced);
      };

      /**
       * @param {number} span 栅格占位格数
       */
      const calcSubBtnOffset = (span: number) => {
        const total = (state.advanced ? Object.keys(slots).length : props.defaultShowItems) * span;
        const remainder = total % 24;
        if (total < 24 || remainder === 0) {
          return 0;
        }
        return 24 - remainder;
      };

      const reset = async () => {
        dynamicFormRef.value?.resetFields();
        await query();
      };
      const query = async () => {
        const formModel = await dynamicFormRef.value?.validate();
        console.log('queryPara;ms', formModel);

        emit('query', formModel);
      };

      return {
        ...toRefs(state),
        dynamicFormRef,
        turn,
        reset,
        query,
        calcSubBtnOffset,
        formSchema,
        formItemSchemas,
        toggleAdvanced,
      };
    },
  });
</script>

<style lang="less" scoped>
  .table-search {
    border-bottom: 1px solid #ddd;
  }
  .reset-btn {
    background-color: #eaeaea;
    border-color: #eaeaea;
  }
  .open-btn {
    color: @primary-color;
    display: inline-block;
    margin-top: 8px;
  }
  .search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
    .ant-btn {
      border-radius: 4px;
    }
    .ant-btn-primary {
      background-color: @primary-color;
    }
  }

  :deep(.ant-row) {
    width: 100%;
  }

  :deep(.ant-form-item) {
    margin-right: 0;
    margin-bottom: 18px;
    &.operate-button {
      margin-bottom: 0;
      text-align: center;
    }
  }

  .collapse-icon {
    transform: rotate(v-bind(turn));
    transition: transform 0.3s;
  }
</style>
