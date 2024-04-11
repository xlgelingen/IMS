import request from "@/utils/request.js";
import API from "@/consts/api.js";

const classifyService = {
  getClassify() {
    return request.get(API.classify);
  },
  addClassify(data) {
    return request.post(API.addClassify,data);
  },
  editClassify(data){
    return request.put(API.editClassify,data);
  },
  delClassify(data){
    return request.delete(API.delClassify,data);
  },
};

export default classifyService;