import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      users: null,
      user: null,
      classifications: null,
      articles: null,
      navRoutes:[]
    }
  },
  actions: {
    setUsers(usersInfo) {
      this.users= usersInfo
    },
    setUser(userInfo){
      this.user= userInfo
    },
    setClassifications(classifications){
      this.classifications = classifications
    },
    setArticles(articles) {
      this.articles = articles
    },
    setNavRoutes(navRoutes){
      this.navRoutes = navRoutes
    }
  }
})

export default useStore
