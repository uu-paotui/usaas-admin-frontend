/*
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-11-23 17:32:16
 * @LastEditTime: 2021-11-24 16:20:16
 * @Description: 私有数据
 */
export const formSchema = {
    type: "object",
    required: [
        'userName',
        'age',
    ],
    properties: {
        userName: {
            type: 'string',
            title: '用户名',
            'ui:placeholder': 'kkkkk'
        },
        age: {
            type: 'number',
            title: '年龄'
        },
        bio: {
            type: 'string',
            title: '签名',
            minLength: 10,
            default: '知道的越多、就知道的越少',
            'ui:options': {
                placeholder: '请输入你的签名',
                type: 'textarea',
                rows: 5
            }
        }
    },
  }