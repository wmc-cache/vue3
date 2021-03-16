<template>
	<input
		ref="input"
		type="file"
		@change="handleFileChange"
		multiple
	>
	<a-button @click="upload">上传新图像</a-button>
	<a-button @click="submit">提交新图像</a-button>

	<!-- <div
		v-for="item in urlList"
		class="img-border center"
		style="width:120px;height:120px;border:1px solid blue;"
	>
		<img
			:src="item.url"
			style="width:100px;height:100px"
		/>
	</div> -->
	<img
		v-if="url"
		:src="`https://peri.xxlun.com/emulation/img/${url}`"
		style="width:100px;height:100px"
	/>

</template>

<script lang="ts">
let urlId = 1; //图片Id
import axios from "axios";
import { ref } from "vue";
import Axios from "axios";

export default {
	name: "upload",

	setup() {
		const input = ref();
		//
		const url = ref(null);
		//上传图片的url列表
		const urlList = ref([]);
		//上传文件
		const upload = () => {
			input.value.click();
		};

		//文件改变
		const handleFileChange = e => {
			const currentTarget = e.target as HTMLInputElement;
			if (currentTarget.files) {
				const files = Array.from(currentTarget.files);
				console.log("files", files);
				const formData = new FormData();
				formData.append("file", files[0]);
				const token = localStorage.getItem("token");
				axios
					.post("/emulation/uploadFile", formData, {
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${token}`
						}
					})
					.then(res => {
						url.value = res.data.data.picName;
						console.log("wmc", url);
						urlList.value.push({ id: urlId, url: res.data.url });
						urlId++;
						console.log(urlList.value);
						console.log(res.data.url);
					});
			}
		};
		//上传图片
		const submit = async () => {
			console.log(url);
			const data = await Axios.post("emulation/upData", {
				picUrl: url.value
			});
			localStorage.setItem("Img", url.value);
			location.reload();
		};
		return { input, upload, submit, handleFileChange, url, urlList };
	}
};
</script>

<style scoped>
input {
	display: none;
}
</style>
