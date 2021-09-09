<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <ConfigTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable
      class="w-3/4 xl:w-4/5 m-4"
      @register="registerTable"
      :searchInfo="searchInfo"
      @fetch-success="onFetchSuccess"
    >
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增配置 </a-button>
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
    <ListDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, nextTick, reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { apiConfigTableList, apiConfigTableDelete } from '/@/api/sys/system';

  import { useDrawer } from '/@/components/Drawer';
  import ListDrawer from './ListDrawer.vue';

  import { columns } from './list.data';
  import ConfigTree from '/@/views/system/config/ConfigTree.vue';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    name: 'MenuManagement',
    components: { BasicTable, PageWrapper, ListDrawer, ConfigTree, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload, expandAll }] = useTable({
        title: '配置列表',
        api: apiConfigTableList,
        columns,
        isTreeTable: true,
        immediate: false,
        pagination: false,
        striped: false,
        useSearchForm: false,
        showTableSetting: false,
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
      const searchInfo = reactive<Recordable>({});
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
          parent_id: searchInfo.parent_id,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await apiConfigTableDelete(record.id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // 演示默认展开所有表项
        nextTick(expandAll);
      }

      function handleSelect(parentId = '') {
        searchInfo.parent_id = parentId;
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        searchInfo,
        handleCreate,
        handleSelect,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
      };
    },
  });
</script>
