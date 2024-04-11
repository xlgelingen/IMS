const PREFIX = `${import.meta.env.VITE_APP_HOST}`
// const WEB_PREFIX = `${PREFIX}/api/web`
const ADMIN_PREFIX = `${PREFIX}/api/admin`

export default {
  ossToken: `${PREFIX}/api/file/alioss-token`,
  ossStore: `${PREFIX}/api/file/alioss-store`,
  users: `${ADMIN_PREFIX}/users/user-info`,
  addUser: `${ADMIN_PREFIX}/users/create`,
  editUser:`${ADMIN_PREFIX}/users/edit`,
  delUser:`${ADMIN_PREFIX}/users/del`,
  classify: `${ADMIN_PREFIX}/classify/classify-info`,
  addClassify: `${ADMIN_PREFIX}/classify/create`,
  editClassify:`${ADMIN_PREFIX}/classify/edit`,
  delClassify:`${ADMIN_PREFIX}/classify/del`,
  articles: `${ADMIN_PREFIX}/articles/article-info`,
  addArticle: `${ADMIN_PREFIX}/articles/create`,
  editArticle:`${ADMIN_PREFIX}/articles/edit`,
  delArticle:`${ADMIN_PREFIX}/articles/del`,
  phoneLogin: `${PREFIX}/api/login/phone`,
  accountLogin: `${PREFIX}/api/login/account`,
  varifyToken: `${PREFIX}/api/token`,
}