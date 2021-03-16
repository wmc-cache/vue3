<template>

	<div class="body">
		<div class="content">
			<div class="title">个人中心</div>

			<div class="name">你好{{name}}!

				<span
					class="out"
					@click="out"
				>返回</span>

			</div>

		</div>

		<div class="container">
			<div>个人图像</div>
			<img
				v-if="url"
				style="width:100px;height:100px"
				:src="`https://peri.xxlun.com/emulation/img/${url}`"
				alt=""
			>

			<div style="margin-top:10px;">
				<upload></upload>
			</div>
			<a-input
				v-model:value="password"
				placeholder="新密码"
				style="width:500px;margin-top:100px"
			/>
			<a-button @click="surePassword">确认修改密码</a-button>
		</div>

	</div>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import upload from "./upload.vue";
import Axios from "axios";
export default defineComponent({
	name: "Header",
	components: {
		upload
	},
	data() {
		return {
			name: localStorage.getItem("name")
		};
	},
	setup() {
		const router = useRouter();
		const route = useRoute();
		let url = localStorage.getItem("Img");
		const password = ref(null);
		const out = () => {
			localStorage.removeItem("token");
			router.push("/room/0");
		};

		const go = () => {
			router.push("/message");
		};

		const surePassword = async () => {
			const data = await Axios.post("emulation/upData", {
				password: password.value
			});
			if (data.status == 200) {
				password.value = "";
				alert("成功");
			}
		};

		return { out, go, url, password, surePassword };
	}
});
</script>

<style scoped>
.body {
	background-color: #418fe8;
	height: 50px;
}
.content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 1200px;
}
.title {
	font-size: 28px;
	color: #ffffff;
}
.name {
	font-size: 14px;
	color: #ffffff;
}
.out {
	font-size: 14px;
	color: #ffbb33;
	cursor: pointer;
	margin-left: 10px;
}
</style>
