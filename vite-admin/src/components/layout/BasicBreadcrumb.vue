<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumb = computed(() => route.matched.filter((data) => data.meta?.breadcrumb))

</script>

<template>
    <div class="breadcrumb-container">
        <a-breadcrumb separator="/">
            <a-breadcrumb-item v-for="(step, index) in breadcrumb" :key="step.name">
                <router-link v-if="index < breadcrumb.length - 1" :to="{ name: step.name }">{{
                    step.meta.breadcrumb.name
                }}</router-link>
                <span v-else>{{ step.meta.breadcrumb.name }}</span>
            </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>

<style type="text/css" lang="less" scoped>
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
</style>
