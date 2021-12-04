<!--
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-12-02 15:19:53
 * @LastEditTime: 2021-12-04 11:16:57
 * @Description: 表单配置
-->
<template>
  <div class="title">表单配置</div>
  <a-form
    layout="vertical"
    v-bind="formItemLayout"
  >
    <a-form-item label="布局：">
      <a-select
        :value="store.formConfig.layout"
        @change="(value) => handleUpdate('layout', value)"
      >
        <a-select-option :value="24">一行一列</a-select-option>
        <a-select-option :value="12">一行两列</a-select-option>
        <a-select-option :value="8">一行三列</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="标签宽度：">
      <a-row>
        <a-col :span="16">
          <a-slider :value="store.formConfig.labelCol" @change="(value) => handleUpdate('labelCol', value)" :min="2" :max="20" />
        </a-col>
        <a-col :span="7">
          <a-input-number :value="store.formConfig.labelCol" @change="(value) => handleUpdate('labelCol', value)" :min="2" :max="20" />
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item label="标签展示模式：">
      <a-radio-group
        v-model:value="store.formConfig.labelShowModel"
        @change="({ target }) => handleUpdate('labelShowModel', target.value)"
      >
        <a-radio value="horizontal">同行</a-radio>
        <a-radio value="vertical">单独一行</a-radio>
      </a-radio-group>
    </a-form-item>
    <div class="title">表单Footer配置</div>
    <a-form-item label="确认按钮文案：">
      <a-input
        :value="store.formConfig.onOkText"
        @change="({target}) => handleUpdate('onOkText', target.value)"
        placeholder="请输入" />
    </a-form-item>
     <a-form-item label="取消按钮文案：">
      <a-input
        :value="store.formConfig.onCancelText"
        @change="({target}) => handleUpdate('onCancelText', target.value)"
        placeholder="请输入" />
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent } from 'vue';
import { componentListStore } from '../store/index';

export default defineComponent({
  setup() {
    const store = componentListStore();
    const formItemLayout =  {
      // labelCol: { span: 6 },
      // wrapperCol: { span: 18 }
    }

    const handleUpdate = (name, value) => {
      store.dispatchComponentList({
        type: 'updateFormConfig',
        formConfig: {
          [name]: value
        }
      })
    }

    return {
      formItemLayout,
      store,
      handleUpdate
    }
  }
})
</script>
<style lang="less" scoped>
.title {
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 700;
}
.ant-input-number {
  min-width: none !important;
  width: 100%;
  margin-left: 10px;
}
</style>