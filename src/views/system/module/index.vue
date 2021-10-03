<template>
  <div>
    <BasicTable @register="registerTable">
      <!--      <template #toolbar>-->
      <!--        <a-button type="primary" @click="handleCreate"> 模型管理 </a-button>-->
      <!--      </template>-->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '表格配置',
              onClick: handleEditGridDrawer.bind(null, record),
            },
            {
              label: '表单配置',
              onClick: handleEditGridDrawer.bind(null, record),
            },
            {
              label: '搜索配置',
              onClick: handleEditGridDrawer.bind(null, record),
            },
            {
              label: '生成表',
              popConfirm: {
                title: '确认在数据库创建该表？',
              },
            },
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <ModuleDrawer @register="registerDrawer" @success="handleSuccess" />
    <GridSettingDrawer @register="registerGridDrawer" @success="handleOpenGridDrawerCreate" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { apiModuleTableList, apiModuleTableDelete } from '/@/api/sys/system';

  import { useDrawer } from '/@/components/Drawer';
  import ModuleDrawer from './ModuleDrawer.vue';
  import GridSettingDrawer from './GridSettingDrawer.vue';
  import { columns, searchFormSchema } from './module.data';

  export default defineComponent({
    name: 'ModuleManagement',
    components: { BasicTable, ModuleDrawer, GridSettingDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerGridDrawer, { openDrawer: openGridDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '模型列表',
        api: apiModuleTableList,
        columns,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 400,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleOpenGridDrawerCreate() {
        openGridDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEditGridDrawer(record: Recordable) {
        openGridDrawer(true, {
          record,
          isUpdate: true,
        });
      }
      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await apiModuleTableDelete(record.module_id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        registerGridDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleOpenGridDrawerCreate,
        handleEditGridDrawer,
      };
    },
  });
</script>
