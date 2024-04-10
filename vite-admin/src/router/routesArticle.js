const ArticleIndex = () =>
  import(/* webpackChunkName: "article" */ '@/views/Article/ArticleIndex.vue')
const ArticleEdit = () =>
  import(/* webpackChunkName: "article" */ '@/views/Article/ArticleEdit.vue')
const ArticleCreate = () =>
  import(/* webpackChunkName: "article" */ '@/views/Article/ArticleCreate.vue')
// const ArticleClassify = () =>
//   import(/* webpackChunkName: "article" */ '@/views/Article/ArticleClassify.vue')
//   const ArticleShow = () =>
//   import(/* webpackChunkName: "article" */ '@/views/Article/ArticleShow.vue')

export default [
  {
    path: 'article',
    name: 'Article',
    redirect: { name: 'ArticleIndex' },
    meta: {
      nav: {
        icon: 'icon-file',
        title: '文章管理'
      },
      breadcrumb: {
        name: '文章'
      }
    },
    children: [
      {
        path: '',
        name: 'ArticleIndex',
        component: ArticleIndex,
        meta: {
          nav: {
            title: '文章列表'
          },
          breadcrumb: {
            name: '文章列表'
          }
        }
      },
      {
        path: 'create',
        name: 'ArticleCreate',
        component: ArticleCreate,
        meta: {
          nav: {
            title: '新建文章'
          },
          breadcrumb: {
            name: '新建文章'
          }
        }
      },
      {
        path: ':id/edit',
        name: 'ArticleEdit',
        component: ArticleEdit,
        meta: {
          // nav: {
          //   title: '编辑文章'
          // },
          breadcrumb: {
            name: '编辑文章'
          }
        }
      },
    ]
  }
]
