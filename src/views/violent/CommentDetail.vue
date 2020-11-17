<template>
	<div class="body" v-for="item in list">
		<div class="title">
			<div class="name">用户3:</div>
			<div class="time">{{item.addTime}}</div>
		</div>
		<div class="text">
			{{item.content}}

		</div>
		<!-- <div class="bottom">
			<div class="agree">
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
			</div>
			<div class="comment">
				<img
					class="message-icon"
					src="../../assets/message.png"
					alt=""
				>
				25条回复
			</div>
		</div> -->
	</div>
</template>

<script>
import Axios from 'axios';
export default {
	name: "CommentDetail",
	data(){
		return{
			list:[]
		}
	},
	async mounted() {
	
		const data = await Axios.post("/school/selectComment", {
			eventId: this.$route.params.id
		});
		this.list = data.data.data
		console.log("comment:", data.data.data);
	}
};
</script>

<style scoped>
.body {
	padding: 20px;
	border-bottom:1px solid #FFF0F2F7 ;
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