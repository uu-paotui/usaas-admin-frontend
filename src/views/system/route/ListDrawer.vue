<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './list.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import {
    apiConfigTableCreate,
    apiConfigTableList,
    apiConfigTableModify,
  } from '/@/api/sys/system';
  import { TreeItem } from '/@/components/Tree';

  export default defineComponent({
    name: 'ListDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const recordId = ref(0);
      const parentId = ref(0);
      const treeData = ref<TreeItem[]>([]);
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        recordId.value = data.record && data.record.id ? data.record.id : 0;
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        } else {
          parentId.value = data?.parent_id || 0;
          setFieldsValue({
            parent_id: parentId.value,
            type: parentId.value > 0 ? 1 : 0,
          });
        }

        if (unref(treeData).length === 0) {
          const treeData = await apiConfigTableList({ parent_id: 0 });
          updateSchema({
            field: 'parent_id',
            componentProps: {
              treeData: [
                {
                  name: '顶层',
                  id: 0,
                  children: treeData,
                },
              ],
            },
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增配置' : '编辑配置'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          !unref(isUpdate)
            ? await apiConfigTableCreate(values).then(() => closeDrawer())
            : await apiConfigTableModify(recordId.value, values).then(() => closeDrawer());
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
