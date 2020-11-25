<template>
	<div>
		<a-upload
			:headers="{Authorization:`Bearer ${token}`}"
			action="/emulation/uploadFile"
			list-type="picture"
			v-model:fileList="fileList"
		>

			<a-button>
				<upload-outlined /> 上传图片
			</a-button>
		</a-upload>
		<button
			class="button"
			ref="button"
			@click="uploadImg"
		>upload</button>
		<!-- <pre>{{ fileList }}</pre> -->

	</div>
</template>

<script lang="ts">
import { UploadOutlined } from "@ant-design/icons-vue";
import {
	defineComponent,
	PropType,
	computed,
	ref,
	watch,
	onMounted,
	onUnmounted
} from "vue";
import { useStore } from "vuex";
export default defineComponent({
	components: {
		UploadOutlined
	},
	props: {
		uploadImg: {
			type: Function
		}
	},

	emits: ["uploadImg"],
	setup(props, context) {
		const fileList = ref([]);
		const button = ref();
		const token = ref("");
		onMounted(() => {
			window.timer = setInterval(() => {
				button.value.click();
			}, 2000);
			token.value = localStorage.getItem("token");
		});

		const uploadImg = () => {
			let arr = [];
			fileList.value.forEach((ele: any) => {
				arr.push(ele.response.data.picName);
			});
			context.emit("uploadImg", arr);
		};

		return {
			fileList,
			uploadImg,
			button,
			token
		};
	}
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
.button {
	display: none;
}
/* .upload{
	margin-left:620px ;
	margin-top: -100px;
	padding: 100px;
} */
</style>
