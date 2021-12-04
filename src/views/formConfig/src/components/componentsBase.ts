/*
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-12-01 16:07:26
 * @LastEditTime: 2021-12-04 17:01:38
 * @Description: 
 */
export interface ICommonComponent {
  type: string         // 组件类型
  label?: string       // 标题
  componentId: string  // 组件唯一ID
  field: string        // 字段名，在表单内唯一/*  */
  selected: boolean    // 是否为当前选中组件
  required: boolean    // 是否必填
}

export interface IComponentsChild extends ICommonComponent {
  options?: any                // 存放针对每个组件的 个性化配置参数
  width?: number               // 元素/组件宽度
  message?: string            // 表单校验提示信息
  isInput?: boolean           // 组件类型：输入框
  [key: string]: any
}

export const commonConfig: IComponentsChild = {
  type: 'input',
  label: '输入框',
  componentId: 'ID',
  field: 'field',
  selected: false,
  required: false,
}