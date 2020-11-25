<template>
	<div>
		<div v-for="item in list">
			<div
				v-if="item.parentId==0"
				class="body"
			>
				<div class="title">
					<div class="title-span1">{{item.username}}对我事件的评论:</div>
					<div class="title-time">{{item.addTime}}</div>
				</div>
				<div class="content">
					<div class="content-span1">
						{{item.content}}
					</div>

					<div class="content-span2">
						{{item.eventContent}}
					</div>
				</div>
				<div class="bottom">
					<div
						v-if="isEndTime=='进行中'&& !item.score"
						@click="score(item.id)"
						class="score"
					>对评论评分</div>

				</div>
			</div>
			<score></score>
		</div>

	</div>

</template>

<script>
import Axios from "axios";
import Score from "@/views/violent/Score";
export default {
	name: "Reply",
	components: {
		Score
	},
	data() {
		return {
			list: [],
			isEndTime: ""
		};
	},
	async mounted() {
		this.isEndTime = localStorage.getItem("isEndTime");
		const data = await Axios.post("emulation/selectCommentAll", { state: "" });
		this.list = data.data.data;
		console.log(data.data.data);
	},
	methods: {
		score(id) {
			localStorage.setItem("score", id);
			console.log("www");
			this.$store.commit("showFeedModel");
		}
	}
};
</script>

<style scoped>
.body {
	padding: 20px;
	border-bottom: 1px solid #f0f2f7;
}
.title {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.title-span1 {
	white-space: normal;
	font-size: 18px;
	font-weight: 400;
	color: #333333;
}
.title-time {
	font-size: 14px;
	font-weight: 400;
	color: #707070;
	margin-left: 163px;
}
.content {
	display: flex;
	align-items: center;
	margin-top: 20px;
}
.content-span1 {
	width: 574px;
	height: 38px;
	font-size: 14px;
	font-family: Source Han Sans CN;
	font-weight: 400;
	line-height: 21px;
	color: #707070;
	opacity: 1;
}

.content-span2 {
	width: 177px;
	height: 58px;
	overflow: hidden;
	font-size: 18px;
	font-family: Source Han Sans CN;
	font-weight: bold;
	line-height: 31px;
	color: #707070;
	opacity: 1;
	margin-left: 44px;
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

.bottom {
	/* display: flex;
	justify-content: center;
	align-items: center; */
}

.bottom-text {
	font-size: 14px;
	font-weight: 400;
	color: #1e1e1e;
	margin-left: 458px;
}
.score {
	width: 79px;
	height: 32px;
	background: #0084ff;
	opacity: 1;
	border-radius: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
}
</style>