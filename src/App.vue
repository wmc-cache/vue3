<template>
	<div class="h-100 container-fluid px-0 flex-shrink-0">
		<loader v-if="isLoading"></loader>

		<router-view> </router-view>

		<a-back-top />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./components/Loader.vue";
import createMessage from "./components/createMessage";
import { GlobalDataProps } from "./store";
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";

export default defineComponent({
	name: "App",
	components: {
		Loader
	},
	setup() {
		const store = useStore();
		const currentUser = computed(() => store.state.user);
		const isLoading = computed(() => store.state.loading);
		const error = computed(() => store.state.error);
		watch(currentUser, () => {
			localStorage.setItem("flag", currentUser.value.flag);
			localStorage.setItem("name", currentUser.value.username);
		});
		watch(
			() => error.value.status,
			() => {
				const { status, message } = error.value;
				console.log(error.value);
				if (status) {
					notification.error({
						message: "错误",
						description: "账号或密码错误",
						placement: "bottomRight"
					});
				}
			}
		);
		return {
			currentUser,
			isLoading,
			error
		};
	}
});
</script>

<style>
.content {
	position: relative;
	height: 100%;
	width: 1200px;
	margin: auto;
}

button {
	margin: 0;
	padding: 0;
	border: 1px solid transparent;
	outline: none;
}
</style>
