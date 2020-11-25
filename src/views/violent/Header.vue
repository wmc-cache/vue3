<template>

	<div class="body">
		<div class="content">
			<div class="title">“网络暴力”实验项目</div>
			<div class="name">你好{{name}}!

				<span
					class="out"
					@click="out"
				>退出</span>
			</div>

		</div>
	</div>

</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
	name: "Header",
	components: {},
	data() {
		return {
			name: localStorage.getItem("name")
		};
	},
	setup() {
		const router = useRouter();
		const out = () => {
			//localStorage.removeItem("token");
			router.push("/");
		};

		return { out };
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
}
</style>
