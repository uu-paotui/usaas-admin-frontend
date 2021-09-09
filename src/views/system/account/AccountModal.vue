<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './account.data';
  import { apiDeptTableList, apiRoleTreeList } from "/@/api/sys/system";
  import { apiAccountTableCreate, apiAccountTableModify } from '/@/api/sys/account';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const recordId = ref(0);
      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        recordId.value = data?.record?.user_id ? data.record.user_id : 0;

        if (unref(isUpdate)) {
          rowId.value = data.record.user_id;
          let record = JSON.parse(JSON.stringify(data.record));
          record.roles = record.roles.map((role) => role?.pivot?.role_id);
          setFieldsValue({
            ...record,
          });
        }
        const treeData = await apiDeptTableList();
        const treeDataRoles = await apiRoleTreeList();

        let options = treeDataRoles?.map(({ role_id, role_name }) => ({
          label: role_name,
          value: role_id,
          key: role_id + '',
        }));
        updateSchema([
          {
            field: 'password',
            show: true,
          },
          {
            field: 'username',
            componentProps: {
              disabled: unref(isUpdate),
            },
          },
          {
            field: 'department_id',
            componentProps: { treeData },
          },
          {
            field: 'roles',
            componentProps: { options },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          !unref(isUpdate)
            ? await apiAccountTableCreate(values).then(() => closeModal())
            : await apiAccountTableModify(recordId.value, values).then(() => closeModal());

          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
