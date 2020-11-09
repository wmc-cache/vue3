<template>

	<div class="h-100 container px-0 flex-shrink-0">

		<loader v-if="isLoading"></loader>

		<router-view>

		</router-view>

		<a-back-top />

	</div>

</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalHeader from "./components/GlobalHeader.vue";
import Loader from "./components/Loader.vue";
import createMessage from "./components/createMessage";
import { GlobalDataProps } from "./store";
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";

export default defineComponent({
	name: "App",
	components: {
		GlobalHeader,
		Loader
	},
	setup() {
		const store = useStore<GlobalDataProps>();
		const currentUser = computed(() => store.state.user);
		const isLoading = computed(() => store.state.loading);
		const error = computed(() => store.state.error);

		watch(
			() => error.value.status,
			() => {
				const { status, message } = error.value;
				if (status && message) {
					notification.error({
						message: "错误",
						description: `${message}`
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
</style>
