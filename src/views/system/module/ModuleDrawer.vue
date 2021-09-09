<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="1000px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #attributes="{ model, field }">
        <CodeEditor v-model:value="model.attributes" mode="application/json" />
      </template>
      <template #filter="{ model, field }">
        <CodeEditor v-model:value="model.filter" mode="application/json" />
      </template>
      <template #grid="{ model, field }">
        <CodeEditor v-model:value="model.grid" mode="application/json" />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './module.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { TreeItem } from '/@/components/Tree';

  import { apiModuleTableModify, apiModuleTableCreate, getMenuTreeList } from '/@/api/sys/system';
  import { CodeEditor } from '/@/components/CodeEditor';

  export default defineComponent({
    name: 'ModuleDrawer',
    components: { BasicDrawer, CodeEditor, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const recordId = ref(0);
      const treeData = ref<TreeItem[]>([]);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          //菜单分配
          treeData.value = (await getMenuTreeList()) as any as TreeItem[];
        }
        isUpdate.value = !!data?.isUpdate;
        recordId.value = data.record?.module_id ? data.record.module_id : 0;
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增模型' : '编辑模型'));

      async function handleSubmit() {
        try {
          const values = await validate();
          // console.log(values);

          values.attributes = JSON.parse(values.attributes);
          values.grid = JSON.parse(values.grid);
          values.filter = JSON.parse(values.filter);

          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          !unref(isUpdate)
            ? await apiModuleTableCreate(values).then(() => {
                closeDrawer();
              })
            : await apiModuleTableModify(recordId.value, values).then(() => {
                closeDrawer();
              });
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
      };
    },
  });
</script>
