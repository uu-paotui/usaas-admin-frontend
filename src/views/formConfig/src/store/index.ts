/*
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-12-02 09:35:12
 * @LastEditTime: 2021-12-04 15:22:37
 * @Description: 
 */
import { defineStore } from 'pinia';
import { cloneDeep, mergeWith } from 'lodash-es';
import { g_uid } from '../utils/tools';
import { IComponentsChild } from '../components/componentsBase';
import { IFormConfigBase } from '../components/formConfigBase';

interface IOptionsType {
  [key: string]: any;
}

interface ActionType {
  type: 'addComponent' | 'deleteComponent' | 'copyComponent' | 'updateComponent' | 'selectComponent'
          | 'updateFormConfig'
  component?: IComponentsChild
  options?: IOptionsType
  formConfig?: IFormConfigBase
}

interface IState {
  component: IComponentsChild
  componentList: IComponentsChild[]
  formConfig: IFormConfigBase
}

export const componentListStore = defineStore({
  id: 'globalState',
  state: (): IState => ({
    component: {} as IComponentsChild,
    componentList: [],
    formConfig: {
      layout: 24,
      labelCol: 4,
      labelShowModel: 'horizontal',
      onOkText: '确定',
      onCancelText: '取消'
    }
  }),
  getters: {},
  actions: {
    dispatchComponentList(actionType: ActionType) {
      const { type, component, options, formConfig } = actionType || {};
      switch (type) {
        case 'addComponent':
          const cloneComponent = cloneDeep(component) as IComponentsChild;
          this.componentList = [
            ...this.componentList,
            {
              ...cloneComponent,
              componentId: `ID_${g_uid()}`,
              field: `${cloneComponent.type}_${g_uid()}`
            }
          ];
          break;
        case 'selectComponent':
          this.componentList.forEach(item => {
            if (item.componentId === component?.componentId) {
              item.selected = true
              this.component = cloneDeep(item)
            } else {
              item.selected = false
            }
          })
          break;
        case 'updateComponent':
          this.componentList = this.componentList.map(item => {
            if (component?.componentId === item.componentId) {
              item = mergeWith(
                cloneDeep(item),
                options
              );
              this.component = item;
            }
            return item;
          })
          break;
        case 'copyComponent':
          const copyComponent = cloneDeep(component) as IComponentsChild;
          this.componentList.push({
            ...copyComponent,
            componentId: `${copyComponent.componentId}_${g_uid()}`,
            field: `${copyComponent.field}_${g_uid()}`,
            selected: false
          })
          break;
        case 'deleteComponent':
          if (component?.selected) {
            this.component = {} as IComponentsChild;
          }
          this.componentList = this.componentList.filter(item => component?.componentId !== item.componentId);
          break;
        case 'updateFormConfig':
          this.formConfig = {
            ...this.formConfig,
            ...formConfig
          }
          break;
        default:
          break;
      }
    },
    
    clearAllComponentList() {
      this.componentList = [];
      this.component = {} as IComponentsChild;
    }
  }
})