import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 180,
  },
  // <a-button type="primary" preIcon="mdi:page-next-outline"> 主按钮 </a-button>
  {
    title: '角色',
    dataIndex: 'role',
    width: 200,
    customRender: ({ record }) => {
      const role = record.roles;
      let newArry = <any>[];
      role.map((item) => {
        newArry.push(h(Tag, () => item.role_name));
      });
      return newArry;
    },
  },
  {
    title: '备注',
    dataIndex: 'description',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 5 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    helpMessage: ['唯一，不允许重复'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      // {
      //   validator(_, value) {
      //     return new Promise((resolve, reject) => {
      //       isAccountExist(value)
      //         .then(() => resolve())
      //         .catch(() => {
      //           reject('已存在');
      //         });
      //     });
      //   },
      // },
    ],
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },
  {
    field: 'mobile',
    label: '手机号码',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    // required: true,
    ifShow: true,
  },
  {
    field: 'roles',
    label: '角色',
    component: 'CheckboxGroup',
    required: true,
  },
  {
    field: 'department_id',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'name',
        key: 'department_id',
        value: 'department_id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: '备注',
    field: 'description',
    component: 'InputTextArea',
  },
];
