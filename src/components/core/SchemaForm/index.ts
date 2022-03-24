export * from './types/form';
export * from './types/formItem';

import SchemaForm from './schema-form.vue';

export { SchemaForm };

export type SchemaFormRef = InstanceType<typeof SchemaForm>;
