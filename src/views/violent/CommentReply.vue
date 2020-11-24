<template>
	<div
		v-for="item in list"
		class="CommentReply-body"
	>
		<div class="name">
			{{item.username}}
		</div>
		<div class="text">{{item.content}}
		</div>
	</div>
</template>

<script>
import Axios from "axios";
export default {
	name: "CommentReply",
	data() {
		list: [];
	},
	async mounted() {
		const id = localStorage.getItem("parentId");
		const data = await Axios.post("/emulation/selectComment", {
			eventId: this.$route.params.id,
			parentId: id
		});
		this.list = data.data.data;
		console.log("!!!!!", data);
	}
};
</script>

<style scoped>
.CommentReply-body {
	margin-left: 50px;
	width: 700px;
}
.name {
	color: #333;
}
.text {
	color: #707070;
}
</style>