<!--
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-11-23 17:35:31
 * @LastEditTime: 2021-11-24 16:29:48
 * @Description: 预览
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerPreview"
    title="表单预览"
    width="60%"
    footer=""
  >
    <VueForm
      v-model="formData"
      :schema="formSchema"
      @submit="handleSubmit"
      :form-footer="formFooter"
    />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm } from '/@/components/Form/index';
import VueForm from '@lljj/vue3-form-ant';
import { formSchema } from './index.data';

export default defineComponent({
  name: 'previewModal',
  components: {
    BasicModal,
    BasicForm,
    VueForm
  },
  setup() {
    const [registerPreview, { closeModal }] = useModalInner(data => {
      console.log('---data----', data.a)
    });
    const formData = ref({});
    const formFooter = {
      okBtn: '提交',
      cancelBtn: '取消'
    }
    
    function handleSubmit() {
      console.log('---a----', formData)
    }

    return {
      registerPreview,
      closeModal,
      formData,
      formSchema,
      handleSubmit,
      formFooter
    }
  }
})
</script>