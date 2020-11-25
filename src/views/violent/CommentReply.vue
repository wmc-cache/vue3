<template>
	<div
		v-for="item in list"
		class="CommentReply-body"
		:key="item.id"
	>

		<div class="box">
			<div class="top">
				<div class="name">{{ item.username }}:</div>

				<div class="text">{{ item.content }}</div>
				<div
					class="text-active"
					@click="reply(item.id)"
				>回复</div>
				<div
					class="text-active"
					@click="read(item.id)"
				>查看评论</div>
			</div>

			<div
				class="bottom"
				v-if="activeId == item.id"
			>
				<comment-1></comment-1>
			</div>
		</div>

	</div>
</template>

<script>
import Comment1 from "@/views/violent/Comment-1";
import Axios from "axios";
export default {
	name: "CommentReply",
	components: {
		Comment1
	},
	data() {
		return {
			list: [],
			activeId: 0
		};
	},
	async mounted() {
		const id = localStorage.getItem("parentId");
		const data = await Axios.post("/emulation/selectComment", {
			eventId: this.$route.params.id,
			parentId: id
		});
		this.list = data.data.data;
		console.log("!!!!!", data);
	},
	methods: {
		reply(parentId) {
			this.$store.commit("showFeedModel");
			localStorage.setItem("parentId", parentId);
		},
		read(parentId) {
			this.activeId = parentId;
			localStorage.setItem("parentId", parentId);
		}
	}
};
</script>

<style scoped>
.CommentReply-body {
	display: flex;

	margin-left: 50px;
	margin-top: 20px;
	width: 700px;
}
.name {
	color: #333;
}
.text {
	margin-left: 5px;
	color: #707070;
}
.text-active {
	margin-left: 5px;
	color: #0084ff;
}
.bottom {
	display: block;
}
.top {
	display: flex;
}
</style>