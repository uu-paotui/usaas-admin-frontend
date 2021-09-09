<template>
  <div class="m-4 p-4 bg-white">
    <ATabs default-active-key="1" @change="selectTab">
      <ATabPane v-for="(item, index) in formConfigSchema" :key="index" :tab="item.name" />
    </ATabs>
    <BasicForm @register="registerForm" @submit="handleSubmit" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, onMounted } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { TreeItem } from '/@/components/Tree';
  import { apiPostConfig, apiGetConfig } from '/@/api/sys/system';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'ConfigIndex',
    components: { BasicForm },
    emits: ['success', 'register'],
    setup(_) {
      const isUpdate = ref(true);
      const tabSelect = ref<string>('system');
      const tabId = ref<number>(0);
      const treeData = ref<TreeItem[]>([]);
      const formConfigSchema = ref<any>([]);
      const formSchema = ref<any>([]);
      const [registerForm, { validate, setFieldsValue }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: true,
        submitButtonOptions: { text: '保存设置' },
        showResetButton: false,
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      function selectTab(tab) {
        tabId.value = tab;
        const config = formConfigSchema.value[tab] || {};
        formSchema.value = (config.items || []) as FormSchema[];
        tabSelect.value = config.key || 'system';
        setFieldsValue({
          ...(config.values || []),
        });
      }

      async function handleSubmit() {
        try {
          const values = await validate();
          const { notification } = useMessage();
          await apiPostConfig(tabSelect.value, values).then((res) => {
            formConfigSchema.value[tabId.value].values = res;
            notification.success({
              message: '设置成功',
            });
          });
        } finally {
        }
      }

      onMounted(async () => {
        await apiGetConfig().then((res) => {
          formConfigSchema.value = res;
          selectTab(0);
        });
      });

      return {
        registerForm,
        formConfigSchema,
        selectTab,
        getTitle,
        handleSubmit,
        treeData,
      };
    },
  });
</script>
