<template>
	<div class="body">

		<div class="from">
			<validate-form @form-submit="onFormSubmit">
				<div class="from-item">
					<label class="form-label">用户名</label>
					<validate-input
						class="from-input"
						:rules="userRules"
						v-model="userVal"
						placeholder="请输入用户名"
						type="text"
					/>
				</div>

				<div class="from-item">
					<label class="form-label">密码</label>
					<validate-input
						class="from-input"
						type="password"
						placeholder="请输入密码"
						:rules="passwordRules"
						v-model="passwordVal"
					/>
				</div>
				<template #submit>
					<button
						type="submit"
						style="width:300px;margin:auto;margin-top:50px;"
						class="btn btn-primary btn-block"
					>登录</button>
				</template>
			</validate-form>

			<a-popover placement="bottom">

				<a-button type="primary">
					Hover me
				</a-button>
				<template v-slot:content>
					<p>Content</p>
					<p>Content</p>
				</template>
			</a-popover>

		</div>

	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import ValidateForm from "../components/ValidateForm.vue";
import createMessage from "../components/createMessage";
import { notification } from "ant-design-vue";
export default defineComponent({
	name: "Login",
	components: {
		ValidateInput,
		ValidateForm
	},
	setup() {
		const router = useRouter();
		const store = useStore();
		const userVal = ref("");
		const userRules: RulesProp = [
			{
				type: "required",
				message: "用户名不能为空"
			}
		];
		const passwordVal = ref("");
		const passwordRules: RulesProp = [
			{
				type: "required",
				message: "密码不能为空"
			}
		];

		const onFormSubmit = (result: boolean) => {
			if (result) {
				const payload = {
					name: userVal.value,

					password: passwordVal.value
				};
				store
					.dispatch("loginAndFetch", payload)
					.then(data => {
						notification.open({
							message: "登录成功",
							description: "欢迎"
						});
						router.push("/home");
					})
					.catch(e => {
						console.log(e);
					});
			}
		};

		return {
			userRules,
			userVal,
			passwordVal,
			passwordRules,
			onFormSubmit
		};
	}
});
</script>

<style>
.body {
	/* height: 100%;
	width: 100%;
	background-size: cover;
	background-image: url("http://101.37.119.148:3000/back.png"); */
}

.from {
	width: 500px;
	margin: auto;
}

.from-item {
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 500px;
	margin-top: 30px;
}

.form-label {
	width: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.from-input {
	border: 0 !important;
	border-bottom: 1px solid black !important;
	border-radius: 0 !important;
	width: 300px !important;
}
</style>
