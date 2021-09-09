import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { apiRateLimiterModify } from '/@/api/sys/system';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: 'QPS',
    dataIndex: 'count',
    width: 80,
  },
  {
    title: '时间（秒）',
    dataIndex: 'ttl',
    width: 100,
  },
  {
    title: '请求路由',
    dataIndex: 'request_uri',
  },
  {
    title: '请求方法',
    dataIndex: 'request_method',
  },
  {
    title: '限制开启',
    dataIndex: 'limit_start_time',
  },
  {
    title: '限制结束',
    dataIndex: 'limit_end_time',
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? '1' : '0';
          const { createMessage } = useMessage();
          apiRateLimiterModify(record.id, {
            status: newStatus,
          })
            .then((res) => {
              // @ts-ignore
              record.status = res.status;
              createMessage.success(`修改成功`);
            })
            .catch(() => {
              createMessage.error('修改成功失败');
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
    dataIndex: 'created_at',
    width: 180,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'request_uri',
    label: '请求路由',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'request_method',
    label: '请求方法',
    component: 'Input',
    colProps: { span: 4 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'count',
    label: 'QPS',
    component: 'InputNumber',
    defaultValue: 1000,
  },
  {
    field: 'ttl',
    label: '时间（秒）',
    component: 'InputNumber',
    defaultValue: 3600,
  },
  {
    field: 'request_uri',
    label: '请求路由',
    component: 'Input',
  },
  {
    field: 'request_method',
    label: '请求方法',
    component: 'Input',
  },
  {
    field: 'limit_start_time',
    label: '限制开始时间',
    component: 'TimePicker',
  },
  {
    field: 'limit_end_time',
    label: '限制结束时间',
    component: 'TimePicker',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    defaultValue: '',
  },
];
