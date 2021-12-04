<!--
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-11-23 16:34:12
 * @LastEditTime: 2021-11-25 10:03:39
 * @Description: 表单配置测试
-->
<template>
  <div class="m-4">
    <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
      <Card class="w-full enter-y">
        <a-button type="primary" @click="handleJumpFormConfig">快去定制吧~</a-button>
        <a-button type="primary" @click="handlePreview">预览</a-button>
      </Card>
    </PageWrapper>
    <PreviewModal @register="registerPreModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PageWrapper } from '/@/components/Page';
import { useGo } from '/@/hooks/web/usePage';
import { useModal } from '/@/components/Modal';
import { Card } from 'ant-design-vue';
import PreviewModal from './PreviewModal.vue';

export default defineComponent({
  name: 'FormConfig',
  components: {
    PageWrapper,
    Card,
    PreviewModal
  },
  setup() {
    const [registerPreModal, { openModal }] = useModal();
    const go = useGo();

    function handleJumpFormConfig() {
      go('/form/config/index');
    }

    function handlePreview() {
      openModal(true, {
        a: 1
      })
    }

    return {
      handleJumpFormConfig,
      handlePreview,
      registerPreModal,
    }
  },
});
</script>

<style>

</style>