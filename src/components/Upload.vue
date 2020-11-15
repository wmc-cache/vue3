<template>
<div>
    <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture" v-model:fileList="fileList">
        <a-button>
            <upload-outlined /> 上传图片
        </a-button>
    </a-upload>
    <pre>{{ fileList }}</pre>
    <button @click="fabu">fabu</button>
</div>
</template>

<script lang="ts">
import {
    UploadOutlined
} from "@ant-design/icons-vue";
import {
    defineComponent,
    PropType,
    computed,
    ref,
    watch
} from "vue";
export default defineComponent({
    components: {
        UploadOutlined,
    },
    setup() {
        const fileList = ref();
        // watch(fileList, () => {
        //     if (fileList.value[0].response) {
        //         console.log(fileList.value[0].response.url);
        //     }
        // });
        // computed(() => {
        //     if (fileList.value[0].response) {
        //         console.log(fileList.value[0].response.url);
        //     }
        // });
        const fabu = () => {
            fileList.value.forEach((ele: any) => {
                console.log(ele.response.url);
            });
        };
        return {
            fileList,
            fabu
        };
    },
});
</script>

<style scoped>
.upload-list-inline ::v-deep(.ant-upload-list-item) {
    float: left;
    width: 200px;
    margin-right: 8px;
}

.upload-list-inline ::v-deep(.ant-upload-animate-enter) {
    animation-name: uploadAnimateInlineIn;
}

.upload-list-inline ::v-deep(.ant-upload-animate-leave) {
    animation-name: uploadAnimateInlineOut;
}
</style>
