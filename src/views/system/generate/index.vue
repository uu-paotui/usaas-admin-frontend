<template>
  <PageWrapper class="m-4 p-4 bg-white" title="模型生成">
    <BasicForm @register="registerForm" />
    <BasicTable @register="registerTable">
      <template #field="{ record }">
        <AInput name="field" :v-model="record.field" />
      </template>
      <template #default="{ record }">
        <AInput name="default" :v-model="record.default" />
      </template>
      <template #remark="{ record }">
        <AInput name="remark" :v-model="record.remark" />
      </template>
      <template #unsigned="{ record }">
        <ACheckbox name="unsigned" :v-model="record.unsigned" />
      </template>
      <template #null="{ record }">
        <ACheckbox name="null" :v-model="record.null" />
      </template>
      <template #length="{ record }">
        <AInputNumber name="length" :v-model="record.length" />
      </template>
      <template #fieldType="{ record }">
        <ASelect :default-value="record.default || '无'" style="width: 100%">
          <ASelectOptGroup v-for="group in mysqlTypes" :label="group.label">
            <ASelectOption v-for="item in group.options" :value="item.value">
              {{ item.value }}
            </ASelectOption>
          </ASelectOptGroup>
        </ASelect>
      </template>
      <template #indexType="{ record }">
        <ASelect :default-value="record.index_type || '无'" style="width: 100%">
          <ASelectOption v-for="item in indexTypes" :value="item.value">
            {{ item.value }}
          </ASelectOption>
        </ASelect>
      </template>

      <template #toolbar>
        <div class="p-2 bg-white">
          <a-button type="primary" @click="handleCreate"> 添加一个字段</a-button>
        </div>
      </template>

      <template #footer>
        <div class="p-2 bg-white">
          <!--          <a-button type="primary" @click="handleSubmit">测试</a-button>-->
        </div>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
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
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction, EditRecordRow } from '/@/components/Table';
  import { apiMenuTableList } from '/@/api/sys/system';
  import { useDrawer } from '/@/components/Drawer';
  import { columns, formSchema, mysqlTypes, indexTypes } from './generate.data';
  import { BasicForm, useForm } from '/@/components/Form';
  import PageWrapper from '/@/components/Page/src/PageWrapper.vue';
  import { CodeEditor } from '/@/components/CodeEditor';
  import { rand } from '@vueuse/core';

  export default defineComponent({
    name: 'RoleManagement',
    components: {
      PageWrapper,
      CodeEditor,
      BasicTable,
      TableAction,
      BasicForm,
    },
    setup() {
      const [registerDrawer] = useDrawer();
      formSchema.map(async (item) => {
        if (item.field === 'parent_id') {
          const treeData = await apiMenuTableList();
          item.componentProps = {
            replaceFields: {
              title: 'name',
              key: 'permission_id',
              value: 'permission_id',
            },
            getPopupContainer: () => document.body,
            treeDefaultExpandedKeys: [0],
            treeData: [
              {
                name: '顶层',
                permission_id: 0,
                parent_id: 0,
                children: treeData,
              },
            ],
          };
        }
        return item;
      });
      const [registerForm] = useForm({
        labelWidth: 150,
        showActionButtonGroup: false,
        schemas: formSchema,
      });
      let data = ref<any[]>([]);
      const [registerTable, { reload, getDataSource }] = useTable({
        title: '字段列表',
        columns,
        useSearchForm: false,
        showTableSetting: false,
        bordered: false,
        showIndexColumn: false,
        pagination: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        // data.value.push({
        //   id: rand(1, 5555),
        //   length: 1,
        //   unsigned: false,
        //   index_type: '',
        // });
        const value = getDataSource();
        value.push({
          id: rand(1, 5555),
          key: rand(1, 5555) + '',
          length: 1,
          unsigned: true,
          index_type: '',
        });

        //setTableData(value);
      }

      function handleEdit(record: EditRecordRow) {
        // openDrawer(true, {
        //   record,
        //   isUpdate: true,
        // });
      }

      function handleDelete(record: Recordable) {
        const dataRow = getDataSource();
        let index = dataRow.findIndex((res) => {
          return res.id === record.id;
        });
        if (index !== -1) {
          dataRow.splice(index, 1);
        }
      }

      function handleSuccess() {
        reload();
      }

      function handleSubmit() {
        // const dataParam = cloneDeep(data.value);
        console.log(getDataSource());
      }

      return {
        registerTable,
        mysqlTypes,
        indexTypes,
        data,
        registerForm,
        handleSubmit,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
