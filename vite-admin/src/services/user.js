import request from "@/utils/request.js";
import API from "@/consts/api.js";

const userService = {
  getUsers() {
    return request.get(API.users);
  },
  addUser(data) {
    return request.post(API.addUser,data);
  },
  getEditUser(userId){
    return request.post(API.editUser,userId);
  },
  editUser(data){
    return request.put(API.editUser,data);
  },
  delUser(data){
    return request.delete(API.delUser,data);
  },
};

export default userService;