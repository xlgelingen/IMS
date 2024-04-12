import BasicLayout from '@/components/layout/BasicLayout.vue';
// import Home from '@/views/Front/HomeIndex.vue';
import FrontLayout from '@/views/Front/FrontLayout.vue';
import NotFound from '@/views/Common/NotFound.vue';
import Forbidden from '@/views/Common/ForbiddenIndex.vue';
import AccountLogin from '@/views/Common/AccountLogin.vue';
import routesArticle from './routesArticle';
import routesFront from './routesFront';
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
    path: '/front',
    name: 'FrontLayout',
    component: FrontLayout,
    redirect: {
      name: 'Home'
    },
    children: [
      ...routesFront
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
