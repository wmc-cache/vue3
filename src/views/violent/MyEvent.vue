<template>
	<div>
		<div
			class="body"
			v-for="item in list"
			:key="item.id"
		>
			<div class="header">
				<div
					@click="goToDetail(item.id)"
					class="title"
				>{{item.title}}</div>
				<div class="time">{{item.addTime}}</div>
			</div>
			<div
				class="text-img"
				@click="goToDetail(item.id)"
			>

				<img
					v-if="!(item.url[0]=='')"
					class="content-img"
					:src="`http://peri.xxlun.com/emulation/img/${item.url[0]}`"
				>
				<div class="text">{{item.content}}</div>

			</div>

			<div class="bottom">
				<!-- <div class="agree">
					<img
						src="../../assets/上.png"
						alt=""
					>
					<div class="agree-text">赞同{{item.noPraise}}</div>
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
					{{item.commentSum}}条评论
				</div> -->

				<div
					v-if="!item.feedContent&&isEndTime=='已结束'"
					class="span1"
					@click="post(item.id)"
				>填写事件反馈</div>

			</div>
		</div>
		<feed></feed>
	</div>

</template>

<script>
import Axios from "axios";
import feed from "./Feed.vue";

export default {
	name: "EventTitle",
	components: {
		feed
	},
	data() {
		return {
			list: [],
			image: true,
			isEndTime: null
		};
	},
	async mounted() {
		this.isEndTime = localStorage.getItem("isEndTime");
		const id = localStorage.getItem("projectId");
		const data = await Axios.post("/emulation/selectEvent", {
			projectId: id
		});
		console.log(data.data.data);
		this.list = data.data.data;
		[...this.list].forEach(ele => {
			//console.log(">>>", ele.url.split(","));
			ele.url = ele.url.split(",", 1);
		});
	},
	methods: {
		goToDetail(id) {
			this.$router.push({ path: `/eventdetail/${id}` });
		},
		post(id) {
			localStorage.setItem("eventId", id);
			this.$store.commit("showFeedModel");
		}
	}
};
</script>

<style scoped>
.body {
	margin-top: 20px;
	padding: 20px;
	border-bottom: 1px solid #f0f2f7;
}
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
}
.title {
	font-size: 18px;
	font-weight: 500;
	color: #333333;
}
.time {
	margin-right: 21px;
}
.text-img {
	display: flex;
	margin-top: 20px;
	cursor: pointer;
}
.text {
	font-size: 14px;
	font-weight: 400;
	height: 134px;
	width: 496px;
	color: #666666;
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 6;
	-webkit-box-orient: vertical;
}
.content-img {
	width: 266px !important;
	height: 143px !important;
	background: #ffffff;
	margin-right: 33px;
	border: 1px solid #707070;
}

.text-no {
	font-size: 14px;
	font-weight: 400;
	height: 70px;
	width: 795px;
	color: #666666;
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
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
.span1 {
	width: 123px;
	height: 32px;
	background: #418fe8;
	opacity: 1;
	color: #ffffff;
	border-radius: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}
</style>
