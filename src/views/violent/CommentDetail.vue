<template>
	<div
		class="body"
		v-for="item in list"
		:key="item.id"
	>
		<div class="title">
			<div class="name">{{item.username}}</div>
			<div class="time">{{item.updateTime}}</div>
		</div>
		<div class="text">
			{{item.content}}

		</div>
		<div class="bottom">
			<div @click="reply(item.id)">回复</div>
			<!-- <div class="agree">
				<img
					src="../../assets/上.png"
					alt=""
				>
				<div class="agree-text">赞同51</div>
			</div>
			<div class="dislike">
				<img
					src="../../assets/下.png"
					alt=""
				>
			</div> -->
			<div
				@click="isShow(item.id,item.id)"
				class="comment"
			>
				<img
					class="message-icon"
					src="../../assets/message.png"
					alt=""
				>
				查看评论
			</div>

		</div>
		<div v-if="activeId===item.id">
			<comment-reply></comment-reply>
		</div>
		<feed-comment></feed-comment>
	</div>
</template>

<script>
import CommentReply from "@/views/violent/CommentReply";
import FeedComment from "@/views/violent/FeedComment";
import Axios from "axios";
export default {
	name: "CommentDetail",
	components: {
		CommentReply,
		FeedComment
	},
	data() {
		return {
			list: [],
			isEndTime: null,
			activeId: null
		};
	},
	async mounted() {
		this.isEndTime = localStorage.getItem("isEndTime");
		const data = await Axios.post("/emulation/selectComment", {
			eventId: this.$route.params.id,
			parentId: 0
		});
		this.list = data.data.data;
		console.log("comment:", data.data.data);
	},
	methods: {
		isShow(id, parentId) {
			this.activeId = id;
			localStorage.setItem("parentId", parentId);
		},
		reply(parentId) {
			this.$store.commit("showFeedModel");
			localStorage.setItem("parentId", parentId);
		}
	}
};
</script>

<style scoped>
.body {
	padding: 20px;
	border-bottom: 1px solid #fff0f2f7;
}
.title {
	display: flex;
	justify-content: space-between;
}
.name {
	font-size: 18px;
	font-weight: 400;
	color: #333333;
}
.bottom {
	display: flex;
	margin-top: 20px;
}

.agree {
	width: 79px;
	height: 32px;
	background: #e5f2ff;
	opacity: 1;
	border-radius: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.agree-text {
	margin-left: 5px;
	color: #0084ff;
}
.dislike {
	width: 31px;
	height: 32px;
	background: #e5f2ff;
	margin-left: 15px;
	border-radius: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.comment {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 20px;
}

img {
	width: 11px;
	height: 10px;
}

.message-icon {
	width: 15px;
	height: 15px;
	margin-right: 6px;
}
</style>