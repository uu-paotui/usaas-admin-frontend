/*
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-12-01 16:16:04
 * @LastEditTime: 2021-12-04 15:22:28
 * @Description: 
 */
import { IComponentsChild } from '../components/componentsBase';

export const g_uid = () => {
  return Math.random().toString(36).substr(2);
}

// 获取所有组件的属性名field
export const getFieldsFromComponentList = (componentList: IComponentsChild[]) => {
  let fields = {};
  componentList.forEach(item => {
    if (item?.field) {
      fields[item.field] = ''
    }
  })
  return fields;
}

// 根据组件id 查找组件
export const findComponentByComponentList = (componentId: string, componentList: IComponentsChild[]) => {
  let component = {};
  componentList.forEach(item => {
    if (item.componentId === componentId) {
      component = item;
    }
  })
  if (!component) {
    console.error(`没有搜索到field: ${componentId}的面板，请检查field是否正确`);
  }
  return component;
}