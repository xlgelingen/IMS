<script setup>
import { ref, reactive } from 'vue';
import { useStore } from '@/stores/index.js';
// import { getEditData } from '@/utils/data.js'
import { ElMessage } from 'element-plus'
import classifyService from '@/services/classify';
import { Delete, EditPen } from '@element-plus/icons-vue'

const store = useStore();
const tableDatas = store.classifications;
// const tableDatas = [{ id: 1, name: '技术动态' }, { id: 2, name: '极客新闻' }, { id: 3, name: '通知公告' }, { id: 4, name: '技术热点' },];

const editDataVisible = ref(false);
const addDataVisible = ref(false);
const delDialogVisible = ref(false)

const editRules = {
    id: [
        { required: true, message: '请输入ID', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
}

const addRules = {
    id: [
        { required: true, message: '请输入ID', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
}

var editData = reactive({});
const originData = reactive({});

const addRef = ref();
const editRef = ref();
const addData = reactive({
    name: null,
})

function handeladdData() {
    addDataVisible.value = true;
}

function handelEditData(e) {
    originData.id = e.target.dataset.id;
    originData.name = e.target.dataset.name;
    Object.assign(editData, originData);
    console.log('分类列表/editData', editData)
    editDataVisible.value = true;
}

function handelDelData(e) {
    delDialogVisible.value = true;
    editData.id = e.target.dataset.id;
}

async function handlesubmitData() {
    if (!addData.name) {
        ElMessage({
            message: "params empty!",
            type: 'error',
        })
        return
    }

    const isValid = await addRef.value.validate();
    if (!isValid) {
        // 如果验证不通过，则直接返回，不执行后续操作
        return;
    }

    console.log("name: ", addData.name)
    await classifyService.addClassify({ name: addData.name}).then(function (data) {
        if (data.code === 200) {
            ElMessage({
                message: '新建成功！',
                type: 'success',
            })
            setTimeout(() => {
                location.reload()
            }, 700)
        } else {
            ElMessage({
                message: '新建失败！',
                type: 'error',
            })
            console.log(data);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

async function handleSaveData() {
    if (!editData.id || !editData.name) {
        ElMessage({
            message: 'params empty!',
            type: 'error',
        })
        return
    }

    const isValid = await editRef.value.validate();
    if (!isValid) {
        // 如果验证不通过，则直接返回，不执行后续操作
        return;
    }

    console.log('id:', editData.id, "name: ", editData.name)
    await classifyService.editClassify({ name: editData.name, id: editData.id}).then(function (data) {
        if (data.code === 200) {
            ElMessage({
                message: '修改成功！',
                type: 'success',
            })
            setTimeout(() => {
                location.reload()
            }, 700)
        } else {
            ElMessage({
                message: '修改失败！',
                type: 'error',
            })
            console.log(data);
        }
    }).catch(function (error) {
        console.log(error);
    });

}
async function handleDelConfirm() {
    delDialogVisible.value = false;
    await classifyService.delClassify({ id: editData.id}).then(function (data) {
        if (data.code === 200) {
            ElMessage({
                message: '删除成功！',
                type: 'success',
            })
            setTimeout(() => {
                location.reload()
            }, 700)
        } else {
            ElMessage({
                message: '删除失败！',
                type: 'error',
            })
            console.log(data);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

const handleDelClose = () => {
    delDialogVisible.value = false;
}

function handleResetForm() {
    Object.assign(editData, originData);
};

function handleResetadd() {
    addRef.value.resetFields();
};

</script>

<template>
    <div class="page-body-content">
        <div class="content-wrapper">
            <div class="content-header">
                <div class="addData-text">分类列表</div>
                <div class="addData-btn" @click="handeladdData">新增分类</div>
            </div>

            <div class="content-mainer">
                <table class="table-container">
                    <tr>
                        <th>
                            <div class="table-th">
                                ID
                            </div>
                        </th>
                        <th>
                            <div class="table-th">
                                分类名称
                            </div>
                        </th>
                        <th>
                            <div class="table-th">
                                操作
                            </div>
                        </th>
                    </tr>
                    <template v-for="data in tableDatas" :key="data.id">
                        <tr class="table-data">
                            <td>{{ data.id }}</td>
                            <td>{{ data.name }}</td>
                            <td style="display: flex; align-items: center">
                                <div class="data-edit" :data-id="data.id" :data-name="data.name"
                                    @click="handelEditData">
                                    <el-icon>
                                        <EditPen />
                                    </el-icon>
                                    编辑
                                </div>
                                <div class="data-del" :data-id="data.id" @click="handelDelData">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>
                                    删除
                                </div>
                            </td>
                        </tr>
                    </template>
                </table>
            </div>

            <el-dialog v-model="editDataVisible" :title="`正在编辑的分类名称：${originData.name}`" width="800">
                <div class="content-form">
                    <el-form ref="editRef" :model="editData" :rules="editRules" status-icon label-position="top">
                        <el-form-item prop="name" label="分类名称">
                            <el-input type="text" placeholder="请输入分类名称" v-model="editData.name"
                                autocomplete="on"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <a-space>
                                <a-button type="primary" @click="handleSaveData">保存</a-button>
                                <a-button @click="handleResetForm">重置</a-button>
                            </a-space>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>

            <el-dialog v-model="addDataVisible" title="新建分类" width="800">
                <div class="content-form">
                    <el-form ref="addRef" :model="addData" :rules="addRules" status-icon label-position="top">
                        <el-form-item prop="name" label="分类名称">
                            <el-input type="text" placeholder="请输入分类名称" v-model="addData.name"
                                autocomplete="on"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <a-space>
                                <a-button type="primary" @click="handlesubmitData">提交</a-button>
                                <a-button @click="handleResetadd">重置</a-button>
                            </a-space>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>

            <el-dialog v-model="delDialogVisible" title="Tips" width="500" :before-close="handleDelClose">
                <span>确定要删除分类吗？</span>
                <template #footer>
                    <div class="dialog-footer">
                        <a-button @click="delDialogVisible = false;" style="margin-right: 8px;">取消</a-button>
                        <a-button type="primary" @click="handleDelConfirm">
                            确定
                        </a-button>
                    </div>
                </template>
            </el-dialog>
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

    .addData-btn {
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

.data-edit,
.data-del {
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
    width: 35%;

    &:first-child {
        width: 30%;
    }

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
</style>
