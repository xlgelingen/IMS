import BasicLayout from '@/components/layout/BasicLayout.vue';
// import Home from '@/views/HomeIndex.vue';
import NotFound from '@/views/Common/NotFound.vue';
import Forbidden from '@/views/Common/ForbiddenIndex.vue';
import AccountLogin from '@/views/Common/AccountLogin.vue';
import routesArticle from './routesArticle';
const ClassifyIndex = () =>
  import(/* webpackChunkName: "Classify" */ '@/views/Classify/ClassifyIndex.vue');
const UserIndex = () => import(/* webpackChunkName: "Manager" */ '@/views/Manager/UserIndex.vue');

export default [
  {
    path: '/admin',
    name: 'Root',
    component: BasicLayout,
    redirect: {
      name: 'UserIndex'
    },
    children: [
      {
        path: 'manager',
        name: 'UserIndex',
        component: UserIndex,
        meta: {
          nav: {
            icon: 'icon-user',
            title: '用户管理'
          },
          breadcrumb: {
            name: '用户列表'
          }
        }
      },
      {
        path: 'classify',
        name: 'ClassifyIndex',
        component: ClassifyIndex,
        meta: {
          nav: {
            icon: 'icon-goods',
            title: '分类管理'
          },
          breadcrumb: {
            name: '分类'
          }
        }
      },
      ...routesArticle
    ]
  },
  {
    path: '/login',
    name: 'AccountLogin',
    component: AccountLogin
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: Forbidden
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
];
