<template>

	<div class="body">
		<div class="content">
			<div class="title">“网络暴力”实验项目</div>
			<div class="name">你好{{name}}!

					<router-link  class="out" to="/">退出</router-link>

			</div>
		
		</div>
	</div>

</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
	name: "Header",
	components: {},
	data() {
		return {
			name: localStorage.getItem("name")
		};
	},

	onMounted() {}
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
.out{
	font-size: 14px;
	color: #FFBB33;
}
</style>
