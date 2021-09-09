import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '分组名称',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: '配置名',
    dataIndex: 'field',
    width: 180,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 180,
  },
];

const isOptions = (type: string) =>
  [
    'Select',
    'ApiSelect',
    'TreeSelect',
    'ApiTreeSelect',
    'RadioButtonGroup',
    'RadioGroup',
    'Checkbox',
    'CheckboxGroup',
    'Cascader',
    'DatePicker',
    'MonthPicker',
    'RangePicker',
    'WeekPicker',
    'TimePicker',
    'Switch',
    'StrengthMeter',
    'Render',
    'Slider',
    'Rate',
  ].indexOf(type) !== -1;
const isMenu = (type: number) => type === 1;
const isDir = (type: number) => type === 0;

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '配置类型',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '分组', value: 0 },
        { label: '配置', value: 1 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'name',
    label: '分组名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'key',
    label: '配置名',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => isDir(values.type),
  },
  {
    field: 'parent_id',
    label: '父级分类',
    component: 'TreeSelect',
    required: true,
    componentProps: {
      treeDefaultExpandedKeys: [0],
      replaceFields: {
        title: 'name',
        key: 'key',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    ifShow: ({ values }) => !isDir(values.type),
  },
  {
    field: 'component',
    label: '使用组件',
    component: 'Select',
    defaultValue: 'Input',
    componentProps: {
      options: [
        { label: '文本输入框', value: 'Input' },
        // { label: 'InputGroup', value: 'InputGroup' },
        { label: '密码输入框', value: 'InputPassword' },
        { label: '密码强度验证', value: 'StrengthMeter' },
        { label: '长文本输入框', value: 'InputTextArea' },
        { label: '数字输入框', value: 'InputNumber' },
        { label: '获取验证码', value: 'InputCountDown' },
        { label: '选择器', value: 'Select' },
        // { label: '远程搜索选择器', value: 'ApiSelect' },
        { label: '树型选择', value: 'TreeSelect' },
        { label: '远程树型选择', value: 'ApiTreeSelect' },
        { label: '风格的选择按钮', value: 'RadioButtonGroup' },
        { label: '单选框', value: 'RadioGroup' },
        { label: '多选框', value: 'Checkbox' },
        { label: '多选框组', value: 'CheckboxGroup' },
        { label: '自动完成', value: 'AutoComplete' },
        { label: '级联选择', value: 'Cascader' },
        { label: '日期选择框', value: 'DatePicker' },
        { label: '年月选择框', value: 'MonthPicker' },
        { label: '日期范围选择框', value: 'RangePicker' },
        { label: '周选择器', value: 'WeekPicker' },
        { label: '时间选择器', value: 'TimePicker' },
        { label: '开关', value: 'Switch' },
        { label: '上传组件', value: 'Upload' },
        { label: '图标选择器', value: 'IconPicker' },
        { label: '滑块', value: 'Slider' },
        { label: '评分', value: 'Rate' },
      ],
    },
    colProps: { lg: 12, md: 12 },
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'value',
    label: '默认值',
    component: 'Input',
    componentProps: {
      colProps: { lg: 12, md: 12 },
    },
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'options',
    label: '扩展数据',
    component: 'InputTextArea',
    helpMessage: 'value|名称 ，每行一个参数 例如：\n 1|启用',
    required: true,
    ifShow: ({ values }) => isMenu(values.type) && isOptions(values.component),
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'order',
    label: '排序',
    component: 'InputNumber',
    defaultValue: 50,
    colProps: { lg: 12, md: 12 },
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    ifShow: ({ values }) => isDir(values.type),
  },
  {
    field: 'field',
    label: '字段变量',
    required: true,
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'required',
    label: '必填',
    required: true,
    component: 'RadioGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '可选', value: 0 },
        { label: '必填', value: 1 },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
];
