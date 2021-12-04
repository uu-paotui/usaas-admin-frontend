<!--
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-11-25 09:55:26
 * @LastEditTime: 2021-12-02 10:10:58
 * @Description: 组件库
-->
<template>
  <div class="w-1/4 sider--wrapper">
    <div v-for="item in defaultSettings" :key="item.type" class="sider--wrapper__item">
      <p class="sider--wrapper__item_title">{{item.name}}</p>
      <div class="sider--wrapper__item_element">
        <div
          v-for="(element) in item.components"
          :key="element.type"
          class="sider--wrapper__item_element__label"
          @click="() => handleClickComponent(element)"
        >{{element.label}}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { defaultSettings } from './sidebarType';
import { componentListStore } from '../../store/index';

export default defineComponent({
  naem: 'sider',
  setup() {
    const store = componentListStore();
    const handleClickComponent = (element) => {
      store.dispatchComponentList({
        type: 'addComponent',
        component: element
      })
    }

    return {
      store,
      defaultSettings,
      handleClickComponent
    }
  }
})

</script>
<style lang="less">
@import '../../styles/siderBar.less';
</style>