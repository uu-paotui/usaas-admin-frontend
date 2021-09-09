<template>
  <div class="m-4">
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
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
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, h, nextTick } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { apiMenuTableList, apiMenuTableDelete, apiMenuStatusSwitch } from '/@/api/sys/system';

  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';

  import { columns, searchFormSchema } from './menu.data';
  import { Switch } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'MenuManagement',
    components: { BasicTable, MenuDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      columns.map((column) => {
        if (column.dataIndex !== 'status') {
          return column;
        }
        column['customRender'] = ({ record }) => {
          if (!Reflect.has(record, 'pendingStatus')) {
            record.pendingStatus = false;
          }
          return h(Switch, {
            disabled: record.disabled || false,
            checked: record.status === 1,
            checkedChildren: '已启用',
            unCheckedChildren: '已禁用',
            loading: record.pendingStatus,
            onChange(checked: boolean) {
              record.pendingStatus = true;
              const newStatus = checked ? 1 : 0;
              const { createMessage } = useMessage();
              apiMenuStatusSwitch({ permission_id: record.permission_id, status: newStatus })
                .then((res) => {
                  record.status = newStatus;
                  createMessage.success(res.message || '处理成功');
                  reload();
                })
                .catch((res) => {
                  createMessage.error(res.error || '处理失败');
                })
                .finally(() => {
                  record.pendingStatus = false;
                });
            },
          });
        };
      });

      const [registerTable, { reload, expandAll }] = useTable({
        title: '菜单列表',
        api: apiMenuTableList,
        columns,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
        },
        isTreeTable: true,
        immediate: true,
        pagination: false,
        striped: false,
        useSearchForm: false,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 80,
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

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await apiMenuTableDelete(record.permission_id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // 演示默认展开所有表项
        nextTick(expandAll);
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
      };
    },
  });
</script>
