<script setup>
import { useRouter } from 'vue-router';
import {computed } from 'vue';
import { useStore } from '@/stores/index.js';

const router = useRouter();
const store = useStore();
const articlesArr = store.articles;

const articlesAll = computed(() => {
  return articlesArr.filter((article) => {
    return article.classify == '技术热点';
  });
})
let articles = computed(() => {
  return articlesAll.value.map((article, index) => {
    return { ...article, listId: index + 1 };
  });
})

function handleGoDetail(e){
  let id = e.target.dataset.id;
  router.push({ name: 'ArticleDetial', params: { id: `${id}` } })
}
</script>

<template>
  <div class="page-body-content">
    <div class="article-list">
      <template v-for="article in articles" :key="article.id">
        <div class="article-item">
          <div class="item-id">{{ article.listId }}</div>
          <div class="item-content">
            <div class="item-top">
              <!-- <div class="item-top-classify">{{ article.classify }}</div> -->
              <div class="item-top-time">{{ article.create_time }}</div>
            </div>
            <div class="item-title" :data-id="article.id" @click="handleGoDetail">{{ article.name }}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.page-body-content {
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 1180px;
  background-color: #fff;
  flex: 1;
}

.article-list {
  min-height: 100%;
  // padding: 24px;
}

.article-item {
  display: flex;
  // margin-bottom: 20px;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);

}

.item-id {
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #ff7155;
  font-size: 23px;
  font-family: DINCondensed-Bold, DINCondensed;
  font-weight: 700;
}

.item-content {
  flex: 1;
  padding: 20px 0;

  .item-title{
    margin: 10px 0;
    width: fit-content;
    font-size: 20px;
    transition: all 0.3s;
    cursor: pointer;

    &:hover{
      color:#409eff;
    }
  }

  .item-top{
    display: flex;
    align-items: center;
  }
  .item-top-classify{
    padding: 0 9px;
    line-height: 2;
    background-color: #dcdcdc;
    font-size: 14px;
    margin-right: 1em;
    font-weight: 700;
  }
  .item-top-time {
    color: #b2b2b2;
  }
}
</style>