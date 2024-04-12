const Home = () => import(/* webpackChunkName: "front" */ '@/views/Front/HomeIndex.vue');
const TechnicalNews = () =>
  import(/* webpackChunkName: "front" */ '@/views/Front/TechnicalNews.vue');
const GeekNews = () => import(/* webpackChunkName: "front" */ '@/views/Front/GeekNews.vue');
const NoticesAnnounce = () =>
  import(/* webpackChunkName: "front" */ '@/views/Front/NoticesAnnounce.vue');
const HotTopics = () => import(/* webpackChunkName: "front" */ '@/views/Front/HotTopics.vue');
import(/* webpackChunkName: "front" */ '@/views/Front/NoticesAnnounce.vue');
const ArticleDetial = () =>
  import(/* webpackChunkName: "front" */ '@/views/Front/ArticleDetial.vue');

export default [
  {
    path: '',
    name: 'Home',
    component: Home,
    meta: {
      nav: {
        headerTitle: '首页'
      }
    }
  },
  {
    path: 'technical_news',
    name: 'TechnicalNews',
    component: TechnicalNews,
    meta: {
      nav: {
        headerTitle: '技术动态'
      }
    }
  },
  {
    path: 'geek_news',
    name: 'GeekNews',
    component: GeekNews,
    meta: {
      nav: {
        headerTitle: '极客新闻'
      }
    }
  },
  {
    path: 'notices',
    name: 'NoticesAnnounce',
    component: NoticesAnnounce,
    meta: {
      nav: {
        headerTitle: '通知公告'
      }
    }
  },
  {
    path: 'hot_topics',
    name: 'HotTopics',
    component: HotTopics,
    meta: {
      nav: {
        headerTitle: '技术热点'
      }
    }
  },
  {
    path: 'detail/:id',
    name: 'ArticleDetial',
    component: ArticleDetial
  }
];
