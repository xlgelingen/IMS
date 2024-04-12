<script setup>
import { useStore } from '@/stores/index.js';
import { useRouter } from 'vue-router';
import { HeartOutlined, PoweroffOutlined, BankOutlined, DownOutlined } from '@ant-design/icons-vue'
import Cookies from 'js-cookie';

const router = useRouter();
const store = useStore();
var userName = store.user.name;

function handleGoFront(){
  router.push({ name: 'FrontLayout' })
}

function handleLogout() {
  const TOKEN_KEY = 'web_token';
  Cookies.remove(TOKEN_KEY);
  location.reload()
}
</script>

<template>
  <div class="header-section">
    <div class="header-hd"></div>
    <div class="header-bd"></div>
    <div class="header-ft">
      <div class="bar-info-container">
        <!-- heart icon -->
        <HeartOutlined />
      </div>

      <!-- 创建一个下拉菜单。 -->
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
            <el-dropdown-item  @click=handleGoFront>
              <!-- 设置图标icon -->
              <BankOutlined :style="{ marginRight: '4px' }"/>
              用户前台
            </el-dropdown-item>
            <el-dropdown-item  @click= handleLogout>
              <!-- 设置图标icon -->
              <PoweroffOutlined :style="{ marginRight: '4px' }" />
              退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-section {
  position: relative;
  padding: 0 16px;
  height: 54px;
  display: flex;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);

  .header-bd {
    flex: 1;
  }
}

.header-hd,
.header-bd,
.header-ft {
  display: flex;
  align-items: center;
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