<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import { useStore } from '@/stores/index.js';

const router = useRouter();
const route = useRoute();
const store = useStore();
const articlesAll = store.articles;
const id = ref(route.params.id)

// let articles = computed(() => {
//   return articlesAll.map((article, index) => {
//     return { ...article, listId: index + 1 };
//   });
// })

let article = computed(() => {
  return articlesAll.find((item) => {
    return item.id == id.value;
  });
})

console.log('前台详情article', article.value)

function handleBack(){
  router.go(-1);
}
</script>

<template>
  <div class="page-body-content">
    <div class="content-header-back">
      <div class="back-btn" @click="handleBack">
        <span class="iconfont icon-zuojian"></span>
        返回
      </div>
    </div>
    <div class="article-title">{{ article.name }}</div>
    <div class="article-time">{{ article.create_time }}</div>
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.page-body-content {
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  width: 1180px;
  background-color: #fff;
  flex: 1;
}

.content-header-back {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 36px;
  padding-right: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid #0000000F;

  .back-btn {
    display: flex;
    align-items: center;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: #00000073;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #1890FF;
    }
  }

  .icon-zuojian {
    font-size: 9px;
    margin-right: 3px;
  }
}

.article-title {
  width: fit-content;
  margin: auto;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 24px;
}

.article-time {
  width: fit-content;
  margin: auto;
  margin-bottom: 10px;
  color: #b2b2b2;

}

.article-content {
  width: fit-content;
  max-width: 70%;
  margin: auto;
  margin-top: 20px;
  line-height: 24px;
}
</style>