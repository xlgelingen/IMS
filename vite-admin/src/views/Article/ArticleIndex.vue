<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useStore } from '@/stores/index.js';
import { ElMessage } from 'element-plus'
import articleService from '@/services/article';
import { Delete, EditPen } from '@element-plus/icons-vue'
import BasicBreadcrumb from '@/components/layout/BasicBreadcrumb.vue';

const router = useRouter();
const store = useStore();
const articles = store.articles;

const pageIndex = ref(1);
const pageSize = ref(10);

const paginationCurrent = ref(1);
const paginationTotal = articles.length

// 使用 slice 方法获取分页后的用户数组
const startIndex = computed(() => (pageIndex.value - 1) * pageSize.value);

// 使用 slice 方法获取分页后的用户数组
const tableDatas = computed(() => articles.slice(startIndex.value, startIndex.value + pageSize.value));

const delDialogVisible = ref(false)
let delId = ref(null)

function handelEditArticle(e) {
    let id = Number(e.target.dataset.id);
    router.push({ name: 'ArticleEdit', params: { id: `${id}` } })
}

function handelAddArticle() {
    router.push({ name: 'ArticleCreate' })
}

function handelDelData(e) {
    delDialogVisible.value = true;
    delId.value = e.target.dataset.id;
}

async function handleDelConfirm() {
    delDialogVisible.value = false;
    await articleService.delArticle({ id: delId.value }).then(function (data) {
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

function handleOnChange(index, size) {
    pageIndex.value = index;
    pageSize.value = size;
}
</script>

<template>
    <div class="page-body-content">
        <BasicBreadcrumb />
        <div class="content-wrapper">
            <div class="content-header">
                <div class="addArticle-btn" @click="handelAddArticle">新增文章</div>
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
                                标题
                            </div>
                        </th>
                        <th>
                            <div class="table-th">
                                分类
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
                            <td>{{ data.classify }}</td>
                            <td style="display: flex; align-items: center">
                                <div class="data-edit" :data-id="data.id" :data-name="data.name"
                                    @click="handelEditArticle">
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

                <a-pagination v-model:current="paginationCurrent" size="small" show-quick-jumper
                    :total="paginationTotal" show-size-changer @change="handleOnChange"
                    :show-total="(total, range) => `第${range[0]}-${range[1]}条/总共 ${total}条`" class="table-pagination" />
            </div>

            <el-dialog v-model="delDialogVisible" title="Tips" width="500" :before-close="handleDelClose">
                <span>确定要删除文章吗？</span>
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
    flex: 1;
    min-width: 900px;
    display: flex;
    flex-direction: column;
    // background-color: #fff;
}

.content-wrapper {
    flex: 1;
    margin: 40px 40px 20px 40px;
    background-color: #fff;
}

.content-header {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 58px;
    padding: 0 24px;
    border-bottom: 1px solid #0000000F;

    .addArticle-btn {
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

.content-mainer {
    padding: 24px;
    padding-bottom: 60px;

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
