<!--
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-12-02 11:53:03
 * @LastEditTime: 2021-12-04 17:01:28
 * @Description: 
-->
<template>
  <a-collapse-panel key="1" header="输入框属性设置">
    <a-row>
      <a-col :span="8">占位文本：</a-col>
      <a-col :span="16">
        <a-input placeholder="请输入" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">显示清空按钮：</a-col>
      <a-col :span="16">
        <a-switch />
      </a-col>
    </a-row>
  </a-collapse-panel>
</template>
<script>

export default {
  
}
</script>