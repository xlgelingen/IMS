<script setup>
import { ref, watch } from 'vue';
import { useStore } from '@/stores/index.js';
import { useRouter, useRoute } from 'vue-router';
import { HeartOutlined, PoweroffOutlined, AppstoreOutlined, DownOutlined } from '@ant-design/icons-vue'
import { formatRoutes } from '@/utils/nav'
import Cookies from 'js-cookie';
import routesAll from '@/router/routesFront'

const router = useRouter();
const store = useStore();
const route = useRoute()

var userName = store.user.name;

const navRoutes = ref(formatRoutes(routesAll))
console.log('前台/routesAll', routesAll)
console.log('前台/navRoutes', navRoutes.value)

const activeIndex = ref()
const foundRoute = findRoute(navRoutes.value)

if (!foundRoute) {
    activeIndex.value = route.meta.activeName
} else {
    activeIndex.value = route.name
}
console.log('前台/activeIndex', activeIndex.value)

// eslint-disable-next-line no-unused-vars
watch(route, (to, from) => {
    const foundRoute = findRoute(navRoutes.value)
    if (!foundRoute) {
        activeIndex.value = to.meta.activeName
    } else {
        activeIndex.value = to.name
    }
})

function findRoute(routes) {
    for (const r of routes) {
        if (r.name === route.name) {
            return r;
        } else if (r.children?.length > 0) {
            const foundRoute = findRoute(r.children);
            if (foundRoute) {
                return foundRoute;
            }
        }
    }
    return null;
}

function handleGoFront() {
    router.push({ name: 'Root' })
}

function handleLogout() {
    const TOKEN_KEY = 'web_token';
    Cookies.remove(TOKEN_KEY);
    location.reload()
}
</script>

<template>
    <div class="header-section front-header">
        <div class="header-content">
            <div class="header-bd">
                <img src="@/assets/images/header-logo.svg" class="header-logo" data-v-4b2afc42="">
                <el-menu :default-active="activeIndex" class="header-menu" :router="true" mode="horizontal"
                    :ellipsis="false">
                    <template v-for="route in navRoutes">
                        <el-sub-menu v-if="route.children?.length" :index="route.name" :key="route.path"
                            class="hasChildren">
                            <template #title>
                                <svg-icon v-if="route.meta.nav?.svg" :name="route.meta.nav.svg.name" width="24px"
                                    height="18px" style="margin-right: 5px;"></svg-icon>
                                <span>{{ route.meta.nav.headerTitle }}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item v-for="data in route.children" :key="data.name" :index="data.name"
                                    :route="{ name: data.name }">
                                    <svg-icon v-if="data.meta.nav?.svg" :name="data.meta.nav.svg.name" width="24px"
                                        height="18px" style="margin-right: 5px;"></svg-icon>
                                    <span>{{ data.meta.nav.headerTitle }}</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>

                        <el-menu-item v-else :key="route.name" :index="route.name" :route="{ name: route.name }">
                            <svg-icon v-if="route.meta.nav?.svg" :name="route.meta.nav.svg.name" width="24px"
                                height="18px" style="margin-right: 5px;"></svg-icon>
                            <span>{{ route.meta.nav.headerTitle }}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </div>
            <div class="header-ft">
                <div class="bar-info-container">
                    <HeartOutlined />
                </div>
                <el-dropdown style="height: 100%">
                    <div class="bar-info-container">
                        <!-- 使用 <i> 元素展示用户的头像，这里通过 CSS 类名 userInfo-avatar 来设置头像的样式。 -->
                        <i class="userInfo-avatar"></i>
                        <!-- 用户名 -->
                        <span class="userInfo-name">{{ userName }}</span>
                        <!-- 下拉icon -->
                        <DownOutlined :style="{ fontSize: '10px', marginLeft: '4px' }" />
                    </div>

                    <!-- 插槽 -->
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click=handleGoFront>
                                <!-- 设置图标icon -->
                                <AppstoreOutlined :style="{ marginRight: '4px' }" />
                                管理后台
                            </el-dropdown-item>
                            <el-dropdown-item @click=handleLogout>
                                <!-- 设置图标icon -->
                                <PoweroffOutlined :style="{ marginRight: '4px' }" />
                                退出系统
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.header-section {
    position: relative;
    padding: 0 16px;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.6);
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    background-color: #fff;

    .header-content {
        display: flex;
        justify-content: space-between;
        width: 1180px;
        margin: auto;
    }

    .header-bd {
        flex: 1;
    }

    .header-bd,
    .header-ft {
        display: flex;
        align-items: center;
    }
}

.header-bd {
    flex: 1;

    .header-logo {
        height: 70%;
    }

    .header-menu {
        margin-left: 20px;
    }
}

.bar-info-container {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    transition: all 0.2s ease;
    cursor: pointer;
    outline: none;

    &:hover {
        background-color: #ecf5ff;
    }

    .userInfo-name {
        font-size: 14px;
        vertical-align: middle;
    }

    .userInfo-avatar {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background-color: #ccc;
        border-radius: 50%;
        margin: 0 10px;
    }
}
</style>
<style lang="less">

.front-header .el-menu--horizontal.el-menu{
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
}

.front-header .el-menu--horizontal>.el-menu-item{
    margin: 0 20px;
    padding: 0;
}

.front-header .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .front-header .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    background-color: #fff;
}
</style>