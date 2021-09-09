import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { apiModuleTableModify } from '/@/api/sys/system';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: '模型名称',
    dataIndex: 'title',
  },
  {
    title: '表名',
    dataIndex: 'name',
  },
  {
    title: '表字段',
    dataIndex: 'attributes',
  },
  {
    title: '虚拟路由',
    dataIndex: 'route',
  },
  {
    title: '编辑页展示组件',
    dataIndex: 'edit_component',
  },
  {
    title: '列表页展示组件',
    dataIndex: 'list_component',
  },
  {
    title: '搜索项',
    dataIndex: 'filter',
  },
  {
    title: '虚拟路由',
    dataIndex: 'route',
  },
  {
    title: '模块状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '开启',
        unCheckedChildren: '关闭',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          apiModuleTableModify(record.module_id, { status: newStatus })
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改模型状态`);
            })
            .catch(() => {
              createMessage.error('修改模型状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '创建时间',
    dataIndex: 'updated_at',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '模型名称',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '开启', value: 1 },
        { label: '关闭', value: 0 },
      ],
    },
    colProps: { span: 3 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'title',
    label: '模型名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'name',
    label: '模型值',
    required: true,
    component: 'Input',
  },
  {
    field: 'primary_key',
    label: '主键',
    required: true,
    component: 'Input',
  },
  {
    field: 'attributes',
    label: '表字段',
    required: true,
    component: 'Input',
    slot: 'attributes',
  },
  {
    field: 'filter',
    label: '搜索项',
    required: true,
    component: 'Input',
    slot: 'filter',
  },
  {
    field: 'grid',
    label: '表格配置',
    required: true,
    component: 'Input',
    slot: 'grid',
  },
  {
    field: 'status',
    label: '模块状态',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '开启', value: 1 },
        { label: '关闭', value: 0 },
      ],
    },
  },
];

export const formGridSchema: FormSchema[] = [
  {
    field: 'title',
    label: '列表表头',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'api',
    label: '数据接口',
    helpMessage: '可自定义该列表的数据响应接口',
    component: 'Input',
    colProps: { span: 12 },
    componentProps: {
      placeholder: '可自定义该列表的数据响应接口',
    },
  },
  {
    field: 'striped',
    label: '斑马线',
    component: 'RadioGroup',
    defaultValue: 1,
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '关闭', value: 0 },
      ],
    },
  },
  {
    field: 'showSummary',
    label: '显示合计行',
    component: 'RadioGroup',
    defaultValue: 1,
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '关闭', value: 0 },
      ],
    },
  },
  {
    field: 'showTableSetting',
    label: '显示表格设置',
    component: 'RadioGroup',
    defaultValue: 1,
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '关闭', value: 0 },
      ],
    },
  },
  {
    field: 'showIndexColumn',
    label: '显示序号列',
    component: 'RadioGroup',
    defaultValue: 1,
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '关闭', value: 0 },
      ],
    },
  },
  {
    field: 'ellipsis',
    label: '文本超出隐藏',
    component: 'RadioGroup',
    defaultValue: 1,
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '关闭', value: 0 },
      ],
    },
  },
  {
    field: 'canResize',
    label: '自适应高度',
    component: 'RadioGroup',
    defaultValue: 1,
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '关闭', value: 0 },
      ],
    },
  },
];
