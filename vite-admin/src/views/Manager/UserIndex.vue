<script setup>
// import { useRoute, useRouter } from 'vue-router';
import { ref, reactive, computed } from 'vue';
import { useStore } from '@/stores/index.js';
import { ElMessage } from 'element-plus'
import userService from '@/services/user';
import Cookies from 'js-cookie';
import { Delete, EditPen } from '@element-plus/icons-vue'

const store = useStore();
// const route = useRoute();
// const router = useRouter();

const usersAll = store.users;

const pageIndex = ref(1);
const pageSize = ref(10);

const paginationCurrent = ref(1);
const paginationTotal = usersAll.length

// 使用 slice 方法获取分页后的用户数组
const startIndex = computed(() => (pageIndex.value - 1) * pageSize.value);

// 使用 slice 方法获取分页后的用户数组
const tableUsers = computed(() => usersAll.slice(startIndex.value, startIndex.value + pageSize.value));
const editUserVisible = ref(false);
const addUserVisible = ref(false);
const editDialogVisible = ref(false)
const delDialogVisible = ref(false)
const addRef = ref();
const addUser = reactive({
    name: null,
    phone: null,
    password: null,
    role: null
})

const userId = ref();
const loginUserID = store.user.id;
// console.log('用户列表/loginUserID', loginUserID)
var editUser = reactive({});
const originUser = reactive({});

const editRules = {
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],

    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {
            pattern: /^1[3456789]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
        }
    ],

    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message: '密码不能少于8位，必须包含字母和数字，不能有特殊字符',
            trigger: 'blur'
        }
    ],
}

const addRules = {
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],

    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {
            pattern: /^1[3456789]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
        }
    ],

    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message: '密码不能少于8位，必须包含字母和数字，不能有特殊字符',
            trigger: 'blur'
        }
    ],
}

function handleOnChange(index, size) {
    pageIndex.value = index;
    pageSize.value = size;
}

function handelEditUser(e) {
    userId.value = e.target.dataset.id;
    // console.log('用户编辑/userId111', userId.value)
    editUserVisible.value = true;
    privateSetUserInfo(userId.value);
}

function handelDelUser(e) {
    userId.value = e.target.dataset.id;
    delDialogVisible.value = true;
    // privateSetUserInfo(userId.value);
}

function handeladdUser() {
    addUserVisible.value = true;
}

async function privateSetUserInfo(userId) {
    try {
        let userInfoArr = usersAll.filter((item) => {
            return item.id == Number(userId)
        })
        let userInfo = userInfoArr[0]
        Object.assign(originUser, userInfo);
        Object.assign(editUser, userInfo);
        // console.log('用户编辑/userId', userId.value)
        // console.log('用户编辑/userInfo', userInfo)
        // console.log('用户编辑/editUser', editUser);
        // console.log('用户编辑/originUser', originUser);
    } catch (error) {
        console.error('获取编辑用户信息失败：', error);
    }
}

async function handlesubmitUser() {
    if (!addUser.name || !addUser.phone || !addUser.password) {
        ElMessage({
            message: "params empty!",
            type: 'error',
        })
        return
    }
    console.log("name: ", addUser.name, "phone: ", addUser.phone, "password:", addUser.password)
    ElMessage({
        message: '修改成功！',
        type: 'success',
    })
    addUserVisible.value = false;
    // await userService.addUser({ name: addUser.name, phone: addUser.phone, password: addUser.password}).then(function (data) {
    //     if (data.code === 200) {
    //         ElMessage({
    //             message: '新建成功！',
    //             type: 'success',
    //         })
    //         setTimeout(() => {
    //             location.reload()
    //         }, 700)
    //     } else {
    //         ElMessage({
    //             message: '修改失败！',
    //             type: 'error',
    //         })
    //         console.log(data);
    //     }
    // }).catch(function (error) {
    //     console.log(error);
    // });
}

async function handleSaveUser() {
    if (!userId.value || !editUser.name || !editUser.phone || !editUser.password) {
        ElMessage({
            message: 'params empty!',
            type: 'error',
        })
        return
    }
    console.log('userID:', userId.value, "name: ", editUser.name, "phone: ", editUser.phone, "password:", editUser.password)

    if (userId.value == loginUserID) {
        editDialogVisible.value = true;
        return
    }

    ElMessage({
        message: '新建成功！',
        type: 'success',
    })
    editUserVisible.value = false;

    // await userService.editUser({ id: userId.value, name: editUser.name, phone: editUser.phone, password: editUser.password}).then(function (data) {
    //     if (data.code === 200) {
    //         ElMessage({
    //             message: '修改成功！',
    //             type: 'success',
    //         })
    //         setTimeout(() => {
    //             if (userId.value !== loginUserID) {
    //                 location.reload()
    //             }
    //         }, 700)
    //     } else {
    //         ElMessage({
    //             message: '修改失败！',
    //             type: 'error',
    //         })
    //         console.log(data);
    //     }
    // }).catch(function (error) {
    //     console.log(error);
    // });
}

async function handleEditConfirm() {
    ElMessage({
        message: '修改成功！',
        type: 'success',
    })
    editDialogVisible.value = false;
    editUserVisible.value = false;
    // await userService.editUser({ id: userId.value, name: editUser.name, phone: editUser.phone, password: editUser.password }).then(function (data) {
    //     if (data.code === 200) {
    //         ElMessage({
    //             message: '修改成功！',
    //             type: 'success',
    //         })
    //     } else {
    //         ElMessage({
    //             message: '修改失败！',
    //             type: 'error',
    //         })
    //         console.log(data);
    //     }
    // }).catch(function (error) {
    //     console.log(error);
    // });
    const TOKEN_KEY = 'web_token';
    Cookies.remove(TOKEN_KEY);
    setTimeout(() => {
        location.reload()
    }, 700)
}

function handleEditConcel() {
    Object.assign(editUser, originUser);
    editDialogVisible.value = false;
    editUserVisible.value = false;
}

const handleEditClose = () => {
    editDialogVisible.value = false;
}

async function handleDelConfirm() {
    delDialogVisible.value = false;
    ElMessage({
        message: '删除成功！',
        type: 'success',
    })
    // await userService.editUser({ id: userId.value, name: editUser.name, phone: editUser.phone, password: editUser.password }).then(function (data) {
    //     if (data.code === 200) {
    //         ElMessage({
    //             message: '修改成功！',
    //             type: 'success',
    //         })
    //     } else {
    //         ElMessage({
    //             message: '修改失败！',
    //             type: 'error',
    //         })
    //         console.log(data);
    //     }
    // }).catch(function (error) {
    //     console.log(error);
    // });
    setTimeout(() => {
        location.reload()
    }, 700)
}

const handleDelClose = () => {
    delDialogVisible.value = false;
}

function handleResetForm() {
    Object.assign(editUser, originUser);
};

function handleResetadd() {
    addRef.value.resetFields();
};

</script>

<template>
    <div class="page-body-content">
        <div class="content-wrapper user-content">
            <div class="content-header">
                <div class="addUser-text">用户列表</div>
                <div class="addUser-btn" @click="handeladdUser">新增用户</div>
            </div>

            <div class="content-mainer">
                <table class="table-container">
                    <tr>
                        <th>
                            <div class="table-th">
                                姓名
                            </div>
                        </th>
                        <th>
                            <div class="table-th">
                                电话
                            </div>
                        </th>
                        <th>
                            <div class="table-th">
                                密码
                            </div>
                        </th>
                        <th>
                            <div class="table-th">
                                创建时间
                            </div>
                        </th>
                        <th>
                            <div class="table-th">
                                操作
                            </div>
                        </th>
                    </tr>
                    <template v-for="user in tableUsers" :key="user.id">
                        <tr class="table-user">
                            <td>{{ user.name }}</td>
                            <td>{{ user.phone }}</td>
                            <td>{{ user.password }}</td>
                            <td>{{ user.create_time }}</td>
                            <td style="display: flex; align-items: center">
                                <div class="user-edit" :data-id="user.id" @click="handelEditUser">
                                    <el-icon>
                                        <EditPen />
                                    </el-icon>
                                    编辑
                                </div>
                                <div class="user-del" :data-id="user.id" @click="handelDelUser">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>
                                    删除
                                </div>
                            </td>
                        </tr>
                    </template>
                </table>

                <a-pagination v-model:current="paginationCurrent" size="small" show-quick-jumper
                    :total="paginationTotal" show-size-changer @change="handleOnChange"
                    :show-total="(total, range) => `第${range[0]}-${range[1]}条/总共 ${total}条`" class="table-pagination" />
            </div>

            <el-dialog v-model="editDialogVisible" title="Tips" width="500" :before-close="handleEditClose">
                <span>正在编辑的是登录用户，提交保存后需要重新登录，确定要提交吗？</span>
                <template #footer>
                    <div class="dialog-footer">
                        <a-button @click="handleEditConcel" style="margin-right: 8px;">取消</a-button>
                        <a-button type="primary" @click="handleEditConfirm">
                            确定
                        </a-button>
                    </div>
                </template>
            </el-dialog>

            <el-dialog v-model="delDialogVisible" title="Tips" width="500" :before-close="handleDelClose">
                <span>确定要删除用户吗？</span>
                <template #footer>
                    <div class="dialog-footer">
                        <a-button @click="delDialogVisible = false;" style="margin-right: 8px;">取消</a-button>
                        <a-button type="primary" @click="handleDelConfirm">
                            确定
                        </a-button>
                    </div>
                </template>
            </el-dialog>

            <a-drawer :title="`正在编辑用户：${editUser.name}`" :width="720" :open="editUserVisible"
                :body-style="{ paddingBottom: '80px' }" :footer-style="{ textAlign: 'right' }"
                @close="editUserVisible = false">
                <div class="content-form">
                    <el-form :model="editUser" :rules="editRules" status-icon label-position="top">
                        <el-form-item prop="name" label="用户名">
                            <el-input type="text" placeholder="请输入用户名" v-model="editUser.name"
                                autocomplete="on"></el-input>
                        </el-form-item>
                        <el-form-item prop="phone" label="手机号">
                            <el-input type="number" placeholder="请输入手机号" v-model="editUser.phone"
                                autocomplete="on"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="密码">
                            <el-input type="text" placeholder="请输入密码" v-model="editUser.password"
                                autocomplete="on"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <a-space>
                                <a-button type="primary" @click="handleSaveUser">保存</a-button>
                                <a-button @click="handleResetForm">重置</a-button>
                            </a-space>
                        </el-form-item>
                    </el-form>
                </div>
            </a-drawer>

            <a-drawer title="新建用户" :width="720" :open="addUserVisible" :body-style="{ paddingBottom: '80px' }"
                :footer-style="{ textAlign: 'right' }" @close="addUserVisible = false">
                <div class="content-form">
                    <el-form :ref="addRef" :model="addUser" :rules="addRules" status-icon label-position="top">
                        <el-form-item prop="name" label="用户名">
                            <el-input type="text" placeholder="请输入用户名" v-model="addUser.name"
                                autocomplete="on"></el-input>
                        </el-form-item>
                        <el-form-item prop="phone" label="手机号">
                            <el-input type="number" placeholder="请输入手机号" v-model="addUser.phone"
                                autocomplete="on"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="密码">
                            <el-input type="text" placeholder="请输入密码" v-model="addUser.password"
                                autocomplete="on"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <a-space>
                                <a-button type="primary" @click="handlesubmitUser">保存</a-button>
                                <a-button @click="handleResetadd">重置</a-button>
                            </a-space>
                        </el-form-item>
                    </el-form>
                </div>
            </a-drawer>
        </div>
    </div>
</template>

<style type="text/css" lang="less" scoped>
.page-body-content {
    margin: 40px 40px 20px 40px;
    min-width: 900px;
    background-color: #fff;
    flex: 1;
}

.content-wrapper {
    border-radius: 10px;
}

.content-mainer {
    padding: 24px;
    padding-bottom: 60px;

}

.content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 58px;
    padding: 0 24px;
    border-bottom: 1px solid #0000000F;

    .addUser-btn {
        color: #fff;
        background: #1890ff;
        box-shadow: 0 2px 0 rgba(5, 175, 255, 0.1);
        padding: 10px 15px;
        border-radius: 6px;
        width: fit-content;
        transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        cursor: pointer;

        &:hover {
            color: #fff;
            background: #40a9ff;
        }
    }
}

.user-edit,
.user-del {
    display: flex;
    align-items: center;
    margin-right: 8px;
    color: #1890ff;
    font-size: 14px;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
        color: #409eff;
        font-weight: 600;
    }
}



.table-container {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    border-radius: 15px 15px 0 0;
}



.table-container tr:first-child {
    background-color: #fafafa;
}

.table-container th {
    font-weight: 600;
    text-align: left;
    border-bottom: 1px solid #0000000F;
    padding: 12px 0;

    .table-th {
        border-right: 1px solid #0000000F;
        padding: 0 8px;
        color: #626161;
        font-weight: 400;
    }
}

.table-container th:last-child .table-th {
    border: none;
}

.table-container td {
    border-bottom: 1px solid #f0f0f0;
    padding: 12px 8px;
}

.table-container tr td {
    text-align: left;
}

.table-pagination {
    margin-top: 24px;
    text-align: right;
}
</style>