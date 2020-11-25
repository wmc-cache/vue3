<template>
	<div class="body">
		<div
			@scroll="onScrollChange"
			class="title"
		>
			{{ title }}
		</div>
		<div class="imgList">
			<div v-for="item in url">
				<img
					class="img-content"
					v-if="!(item == '')"
					:src="`http://peri.xxlun.com/emulation/img/${item}`"
					alt=""
				/>
			</div>
		</div>

		<div class="text-content">
			{{ content }}
		</div>
		<!-- <div class="bottom">
			<div class="agree">
				<img
					v-if="!agree"
					src="../../assets/上.png"
					alt=""
				>
				<div
					@click="click"
					class="agree-text"
				>赞同
					<span>
						{{praise}}
					</span>

				</div>

			</div>
			<div class="dislike">
				<img
					src="../../assets/下.png"
					alt=""
				>
			</div>

			<div class="comment">
				<img
					class="message-icon"
					src="../../assets/message.png"
					alt=""
				>
				{{commentSum}}条评论
			</div>

			

		</div> -->
	</div>
	<div
		v-if="feedContent"
		class="feed"
	>事件生成者反馈:{{ feedContent }}</div>
	<div
		v-if="isEndTime == '进行中'"
		class="postComment"
	>
		<textarea
			v-model="value"
			class="postText"
		></textarea>
		<div class="button-post">
			<div @click="post">发表评论</div>
		</div>
	</div>

	<div class="space">{{ commentSum }}条评论</div>
	<comment-detail></comment-detail>
</template>

<script>
import CommentDetail from "@/views/violent/CommentDetail";
import Axios from "axios";
export default {
	name: "EventDetail",
	components: {
		CommentDetail
	},
	data() {
		return {
			title: "",
			content: "",
			praise: "",
			noPraise: "",
			value: "",
			commentSum: "",
			agree: false,
			feedContent: "",
			isEndTime: "",
			url: ""
		};
	},
	async mounted() {
		this.isEndTime = localStorage.getItem("isEndTime");
		const projectId = localStorage.getItem("projectId");
		const data = await Axios.post("/emulation/selectEvent", {
			projectId: projectId,
			state: "1"
		});
		const id = this.$route.params.id;
		console.log("detail", data.data.data);
		data.data.data.forEach(ele => {
			if (ele.id == id) {
				this.title = ele.title;
				this.content = ele.content;
				this.praise = ele.praise;
				this.noPraise = ele.noPraise;
				this.commentSum = ele.commentSum;
				this.feedContent = ele.feedContent;
				this.url = ele.url.split(",");
			}
		});
	},
	methods: {
		onScrollChange() {
			console.log($event.target.scrollTop);
		},
		async post() {
			const id = this.$route.params.id;
			const data = await Axios.post("/emulation/comment", {
				eventId: id,
				content: this.value
			});
			console.log(data);
			location.reload();
		},
		click() {
			this.agree = true;
		}
	}
};
</script>

<style scoped>
.body {
	padding: 20px;
}
.title {
	font-size: 18px;
	font-weight: bold;
	color: #707070;
}

.img-content {
	width: 253px;
	height: 144px;
	background: #ffffff;
	border: 1px solid #707070;
	opacity: 1;
}

.text-content {
	font-size: 14px;
	font-weight: 400;
	color: #707070;
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
.bottom-span {
	color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 98px;
	height: 32px;
	background: #418fe8;
	opacity: 1;
	border-radius: 6px;
	margin-left: 470px;
}

.span {
	height: 20px;
	width: 100%;
	background-color: #fff;
}

.space {
	width: 837px;
	height: 54px;
	background: #f6f6f6;
	border-radius: 10px 10px 0px 0px;
	margin-top: 20px;
	display: flex;
	align-items: center;
	padding-left: 21px;
}
.postComment {
	width: 837px;
	height: 139px;
	background: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
}
.postText {
	margin: auto;
	width: 700px;
	height: 99px;
	background: #f5f5f5;
	opacity: 1;
	border-radius: 10px;
}
.button-post {
	margin-right: 10px;
	width: 76px;
	height: 32px;
	background: #418fe8;
	border-radius: 6px;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
}

.feed {
	padding: 20px;
	background-color: #ffbb33;
	color: #fff;
}

.imgList {
	display: flex;
	flex-wrap: wrap;
}
</style>