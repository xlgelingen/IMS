<script setup>
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus'
import articleService from '@/services/article';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import BasicBreadcrumb from '@/components/layout/BasicBreadcrumb.vue';

const router = useRouter();

let editor = ClassicEditor

const formRef = ref();
const formData = reactive({
    name: null,
    classify: null,
    content: null
})

const smsRules = {
    name: [
        { required: true, message: '请输入文章标题', trigger: 'blur' }
    ],
    classify: [
        { required: true, message: '请选择分类', trigger: 'change' }
    ],
    content: [
        { required: true, message: '请输入文章内容', trigger: 'blur' },
    ],
}

function handleBack() {
    router.push({ name: 'ArticleIndex' })
}

function handleResetForm() {
    formRef.value.resetFields();
};

async function handleSubmit() {
    formData.content = formData.content.replace(/<[^>]+>/g, '');
    const isValid = await formRef.value.validate();
    if (!isValid) {
        // 如果验证不通过，则直接返回，不执行后续操作
        return;
    }
    console.log('项目添加/formData', formData)
    // ElMessage({
    //     message: '新建成功！',
    //     type: 'success',
    // })
    await articleService.addArticle(formData).then(function (data) {
        if (data.code === 200) {
            ElMessage({
                message: '新建成功！',
                type: 'success',
            })
            setTimeout(() => {
                router.push({ name: 'ArticleIndex' }).then(() => {
                    window.location.reload();
                });
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

</script>

<template>
    <div class="page-body-content">
        <BasicBreadcrumb />
        <div class="content-wrapper">
            <div class="content-header">
                <div class="content-header-back">
                    <div class="back-btn" @click="handleBack">
                        <span class="iconfont icon-zuojian"></span>
                        返回
                    </div>
                    <div class="back-title">文章列表</div>
                </div>
            </div>
            <div class="content-mainer">
                <div class="content-mainer">
                    <a-form ref="formRef" name="basic" :model="formData" :rules="smsRules" :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 17 }" :hideRequiredMark="hideRequiredMark" @finish="handleSubmit">
                        <a-form-item label="标题" name="name">
                            <a-input v-model:value="formData.name" :title="formData.name" placeholder="请输入文章标题" />
                        </a-form-item>
                        <a-form-item label="分类" name="classify">
                            <a-select v-model:value="formData.classify" placeholder="请选择分类" autocomplete="on">
                                <a-select-option value="1">技术动态</a-select-option>
                                <a-select-option value="2">极客新闻</a-select-option>
                                <a-select-option value="3">通知公告</a-select-option>
                                <a-select-option value="4">技术热点</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="内容" name="formData.content" placeholder="请输入文章内容">
                            <ckeditor :editor="editor" v-model="formData.content"></ckeditor>
                        </a-form-item>
                        <a-form-item v-if="!id" :wrapper-col="{ span: 14, offset: 4 }">
                            <a-button type="primary" html-type="submit">提交</a-button>
                            <a-button style="margin-left: 10px" @click="handleResetForm">重置</a-button>
                        </a-form-item>
                    </a-form>
                </div>
                <div>
                </div>
            </div>
        </div>
    </div>
</template>

<style type="text/css" lang="less" scoped>
.page-body-content {
    // margin: 40px 40px 20px 40px;
    min-width: 900px;
    // background-color: #fff;
    flex: 1;
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

    .content-header-back {
        display: flex;

        .back-btn {
            display: flex;
            align-items: center;
            font-family: Inter;
            font-size: 14px;
            font-weight: 400;
            line-height: 24px;
            color: #000000;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
                color: #1890FF;
            }
        }

        .icon-zuojian {
            font-size: 9px;
            margin-right: 3px;
        }

        .back-title {
            margin-left: 10px;
            font-family: Roboto;
            font-size: 14px;
            font-weight: 400;
            line-height: 24px;
            color: #00000073;
        }
    }
}

.content-mainer {
    padding: 24px;
    padding-bottom: 60px;

}
</style>

<!-- <script setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import CKEditor from '@ckeditor/ckeditor5-vue';

let editor = ClassicEditor
let editorData = '<h1>111</h1><p>123456789</p>'
let editorConfig = {
}
</script>
<template>
    <div>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
</template> -->
