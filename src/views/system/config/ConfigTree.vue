<template>
  <div class="bg-white m-4 mr-0 overflow-hidden">
    <BasicTree
      title="分组列表"
      toolbar
      :checkable="false"
      :clickRowToExpand="false"
      :treeData="treeData"
      :replaceFields="{ key: 'id', title: 'name' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';

  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { apiConfigTableList } from '/@/api/sys/system';

  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree },

    emits: ['select'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([]);

      async function fetch() {
        treeData.value = (await apiConfigTableList({ parent_id: 0 })) as unknown as TreeItem[];
        // 第一次加载，将列表默认拉取第一个。
        if (treeData.value.length > 0) {
          emit('select', treeData.value[0].id || 0);
        }
      }

      function handleSelect(keys) {
        emit('select', keys[0]);
      }

      onMounted(() => {
        fetch();
      });
      return { treeData, handleSelect };
    },
  });
</script>
