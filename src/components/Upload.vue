<template>
	<div>
		<a-upload
			action="http://localhost:3000/upload"
			list-type="picture"
			v-model:fileList="fileList"
		>

			<a-button>
				<upload-outlined /> 上传图片
			</a-button>
		</a-upload>
		<button ref="button" @click="uploadImg">upload</button>
		<pre>{{ fileList }}</pre>

	</div>
</template>

<script lang="ts">
import { UploadOutlined } from "@ant-design/icons-vue";
import { defineComponent, PropType, computed, ref, watch } from "vue";
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
		//const store = useStore();
		const fileList = ref([]);
		const button = ref()
		// computed(() => {
		// 	fileList.value.forEach((ele: any) => {
		// 		if (ele.status == "done") {
		// 			console.log(ele.response.url);
		// 		}
		// 	});
		// });

		const uploadImg = () => {
			const arr = [];
			fileList.value.forEach((ele: any) => {
				arr.push(ele.response.url);
			});
			context.emit("uploadImg",arr,button);
		};

		watch(fileList, () => {
			fileList.value.forEach((ele: any) => {
				if (ele.status == "done") {
					console.log(ele.response.url);
				}
			});
		});
		// const fabu = () => {
		//     fileList.value.forEach((ele: any) => {
		//         console.log(ele.response.url);
		//     });
		// };
		return {
			fileList,
			uploadImg,
			button
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
/* .upload{
	margin-left:620px ;
	margin-top: -100px;
	padding: 100px;
} */
</style>
