<script setup>
// import { computed } from 'vue'
// import { useRoute } from 'vue-router'
import BasicLayoutHeader from './BasicLayoutHeader.vue'
import BasicLayoutSider from './BasicLayoutSider.vue'
import BasicLayoutFooter from './BasicLayoutFooter.vue';
// const route = useRoute()
// const breadcrumb = computed(() => route.matched.filter((data) => data.meta?.breadcrumb))

</script>

<template>
  <div class="page-wrapper">
    <BasicLayoutSider class="page-sider" />
    <div class="page-mainer">
      <BasicLayoutHeader class="page-header" />
      <div class="page-body">
        <el-scrollbar>
          <div class="page-body-content-wrapper">
            <router-view></router-view>
            <BasicLayoutFooter class="page-body-footer" />
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.page-wrapper {
  height: 100vh;
  min-width: fit-content;
  background: linear-gradient(#ffffff, #f5f5f5 28%);
  display: flex;
}

.page-mainer {
  flex: 1;
  display: flex;
  flex-direction: column;

  .page-body {
    flex: 1;
    padding: 8px;
    padding-bottom: 0;
    height: 1px;

    :deep(.el-scrollbar__view) {
      height: 100%;
    }

    .page-body-content-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
  }

  .page-header {
    flex: none;
  }

  .breadcrumb-container {
    flex: none;
    width: 100%;
    padding: 4px 8px;
    // margin-bottom: 20px;
  }

  .breadcrumb-item {
    color: #606266;
    font-weight: normal;

    &:last-child {
      color: 303133;
    }
  }

}
</style>
