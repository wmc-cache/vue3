<template>
	<div>
		<div style="width:500px;margin:auto;">

			<a-input
				style="margin-top:80px"
				placeholder="用户名"
				v-model:value="username"
			/>
			<a-input
				style="margin-top:80px;"
				placeholder="密码"
				v-model:value="password"
			/>
			<a-button
				@click="register"
				style="margin-top:80px;"
			>注册</a-button>
		</div>

	</div>
</template>

<script>
import Axios from "axios";
export default {
	data() {
		return {
			username: null,
			password: null
		};
	},
	methods: {
		async register() {
			const data = await Axios.post("emulation/register", {
				username: this.username,
				password: this.password
			});

			if (data.status == 200) {
				this.username = "";
				this.password = "";
				console.log(data.data);
				if (data.data.data == "用户已存在") {
					alert("用户已存在");
				}
				if (data.data.data == "注册成功") {
					alert("注册成功");
				}
			}
		}
	}
};
</script>

<style>
</style>