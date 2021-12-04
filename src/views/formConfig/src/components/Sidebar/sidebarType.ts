/*
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-11-30 11:50:14
 * @LastEditTime: 2021-12-04 15:22:11
 * @Description: 
 */
import {baseComponents, advanceComponents} from './index';

export interface IComponentsType {
  name: string
  type: string
  components: any
}

export const defaultSettings: IComponentsType[] = [
  {
    name: '基础组件',
    type: 'baseComponent',
    components: baseComponents
  }, {
    name: '高级组件',
    type: 'advanceComponent',
    components: advanceComponents
  }
]