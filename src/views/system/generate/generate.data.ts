import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '字段名称',
    dataIndex: 'field',
    width: 150,
    slots: { customRender: 'field' },
  },
  {
    title: '字段类型',
    dataIndex: 'field_type',
    width: 150,
    slots: { customRender: 'fieldType' },
  },
  {
    title: '无符号',
    dataIndex: 'unsigned',
    width: 50,
    slots: { customRender: 'unsigned' },
  },
  {
    title: '长度',
    dataIndex: 'length',
    width: 150,
    slots: { customRender: 'length' },
  },
  {
    title: 'Null',
    dataIndex: 'null',
    width: 50,
    slots: { customRender: 'null' },
  },
  {
    title: '索引类型',
    dataIndex: 'index_type',
    width: 100,
    slots: { customRender: 'indexType' },
  },
  {
    title: '默认值',
    dataIndex: 'default',
    width: 100,
    slots: { customRender: 'default' },
  },
  {
    title: '注释',
    dataIndex: 'remark',
    width: 200,
    slots: { customRender: 'remark' },
  },
];
export const formSchema: FormSchema[] = [
  {
    field: 'table',
    label: '表名',
    component: 'Input',
    required: true,
  },
  {
    field: 'model',
    label: '模型',
    component: 'Input',
    required: true,
  },
  {
    field: 'grid',
    label: '表格设计',
    component: 'InputTextArea',
    required: true
  },
  {
    field: 'controller_make',
    label: '生成控制器',
    component: 'Switch',
    helpMessage: '生成后，会自动添加到菜单',
    defaultValue: false,
  },
  {
    field: 'controller_path',
    label: '路由路径',
    component: 'Input',
    defaultValue: 'App\\Controller',
    ifShow: ({ values }) => values.controller_make === true,
    colProps: { lg: 12, md: 12 },
  },
  {
    field: 'parent_id',
    label: '路由菜单',
    component: 'TreeSelect',
    helpMessage: '将此菜单放到哪个菜单下？',
    ifShow: ({ values }) => values.controller_make === true,
    colProps: { lg: 12, md: 12 },
  },
];

export const indexTypes = [{ value: 'unique' }, { value: 'index' }, { value: 'fulltext' }];
export const mysqlTypes = [
  {
    label: '数字',
    options: [
      { value: 'tinyint' },
      { value: 'smallint' },
      { value: 'mediumint' },
      { value: 'int' },
      { value: 'bigint' },
      { value: 'decimal' },
      { value: 'float' },
      { value: 'uuid' },
      { value: 'boolean' },
    ],
  },
  {
    label: '日期与时间',
    options: [{ value: 'date' }, { value: 'datetime' }, { value: 'timestamp' }, { value: 'time' }],
  },
  {
    label: '文本',
    options: [
      { value: 'char' },
      { value: 'varchar' },
      { value: 'tinyText' },
      { value: 'text' },
      { value: 'mediumText' },
      { value: 'longText' },
      { value: 'binary' },
      { value: 'varbinary' },
      { value: 'tinyblob' },
      { value: 'blob' },
      { value: 'mediumblob' },
      { value: 'longblob' },
      { value: 'enum' },
      { value: 'set' },
    ],
  },
  {
    label: 'json',
    options: [{ value: 'json' }],
  },
];
