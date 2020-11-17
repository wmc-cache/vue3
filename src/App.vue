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
<<<<<<< HEAD
	name: "App",
	components: {
		Loader
	},
	setup() {
		const store = useStore<GlobalDataProps>();
		const currentUser = computed(() => {
			location.setItem("user",store.state);
			return store.state.user;
		});
		const isLoading = computed(() => store.state.loading);
		const error = computed(() => store.state.error);
=======
  name: "App",
  components: {
    Loader,
  },
  setup() {
    const store = useStore();
    computed(() => {
      localStorage.setItem("store", store as any);
    });
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);
>>>>>>> fb85f3c6e7a1358b0f30dd8fa6046e2de0f62b95

    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value;
        if (status && message) {
          notification.error({
            message: "错误",
            description: `${message}`,
            placement: "bottomRight",
          });
        }
      }
    );
    return {
      currentUser,
      isLoading,
      error,
    };
  },
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
