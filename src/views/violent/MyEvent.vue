<template>
	<div>
		<div
			class="body"
			v-for="item in list"
		>
			<div class="header">
				<div class="title">为什么中国要禁掉那么多优秀的动漫？</div>
				<div class="time">2020.10.28</div>
			</div>
			<div class="text-img">
				<img
					v-if="image"
					class="content-img"
					src="../../assets/mobile.jpg"
					alt=""
				>
				<div
					v-if="image"
					class="text"
				>曾经我也曾愤怒，但是随着年龄越来越大，我逐渐懂了广电局的良苦用心。郭嘉虽然禁了很多很多文化产品，但是并没有禁的死死的，留有百丝余地，这就很妙。对于中国青年来说，找资源就像是寻宝游戏一样，随着经验的积累与智商的提高，逐步获取需要的东西。小学时期，天真可爱，我只看奥特曼，多啦a梦，所以畅通无阻，没人禁这些玩意儿。初中，身体开始发育，开始有了欲望，渴求，初具雏形的三观。这时候精神上和身体的需求需要得到一定满足，但是不能过度。作为网络上的新手，能力相当有限曾经我也曾愤怒，但是随着年龄越来越大，我逐渐懂了广电局的良苦用心。郭嘉虽然禁了很多很多文化产品，但是并没有禁的死死的，留有百丝余地，这就很妙。对于中国青年来说，找资源就像是寻宝游戏一样，随着经验的积累与智商的提高，逐步获取需要的东西。小学时期，天真可爱，我只看奥特曼，多啦a梦，所以畅通无阻，没人禁这些玩意儿。初中，身体开始发育，开始有了欲望，渴求，初具雏形的三观。这时候精神上和身体的需求需要得到一定满足，但是不能过度。作为网络上的新手，能力相当有限</div>

				<div
					v-if="!image"
					class="text-no"
				>曾经我也曾愤怒，但是随着年龄越来越大，我逐渐懂了广电局的良苦用心。郭嘉虽然禁了很多很多文化产品，但是并没有禁的死死的，留有百丝余地，这就很妙。对于中国青年来说，找资源就像是寻宝游戏一样，随着经验的积累与智商的提高，逐步获取需要的东西。小学时期，天真可爱，我只看奥特曼，多啦a梦，所以畅通无阻，没人禁这些玩意儿。初中，身体开始发育，开始有了欲望，渴求，初具雏形的三观。这时候精神上和身体的需求需要得到一定满足，但是不能过度。作为网络上的新手，能力相当有限曾经我也曾愤怒，但是随着年龄越来越大，我逐渐懂了广电局的良苦用心。郭嘉虽然禁了很多很多文化产品，但是并没有禁的死死的，留有百丝余地，这就很妙。对于中国青年来说，找资源就像是寻宝游戏一样，随着经验的积累与智商的提高，逐步获取需要的东西。小学时期，天真可爱，我只看奥特曼，多啦a梦，所以畅通无阻，没人禁这些玩意儿。初中，身体开始发育，开始有了欲望，渴求，初具雏形的三观。这时候精神上和身体的需求需要得到一定满足，但是不能过度。作为网络上的新手，能力相当有限
				</div>
			</div>

			<div class="bottom">
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
					25条评论
				</div>
			</div>
		</div>
	</div>

</template>

<script>
export default {
	name: "MyEvent",
	components: {
		
	},
	data() {
		return {
			list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
			image: true
		};
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
	object-fit: cover;
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
