import request from "@/utils/request.js";
import API from "@/consts/api.js";

const articleService = {
  getArticle() {
    return request.get(API.articles);
  },
  addArticle(data) {
    return request.post(API.addArticle,data);
  },
  editArticle(data){
    return request.put(API.editArticle,data);
  },
  delArticle(data){
    return request.delete(API.delArticle,data);
  },
};

export default articleService;