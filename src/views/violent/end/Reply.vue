<template>
	<div>
		<div
			v-for="item in [1,2,3,4,5,6,7,8,9,10]"
			class="body"
		>
			<div class="title">
				<div class="title-span1">“用户3”对我事件的评论:</div>
				<div class="title-time">2020.10.28</div>
			</div>
			<div class="content">
				<div class="content-span1">
					DP口问题 换线试试 我一开始也这样 我是DP连主机 显卡HDMI连耳机 也造成这问题 后来光纤连耳机 HDMI连显示器到显卡 就没这问题了
				</div>

				<div class="content-span2">
					为什么中国要禁掉那么多优秀的动漫？
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
				<div class="bottom-span1">
					<img
						class="span1-img"
						src="../../assets/评价.png"
						alt=""
					>
					<div class="span1-text">好感度评价</div>
				</div>
				<div class="bottom-span2">
					<img
						class="span2-img"
						src="../../assets/完成.png"
						alt=""
					>
					<div class="span2-text">已填写反馈</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
export default {
	name: "Reply"
};
</script>

<style scoped>
.body {
	padding: 20px;
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
	height: 54px;
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
	display: flex;
	justify-content: center;
	align-items: center;
}

.bottom-span1 {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 226px;
	width: 115px;
	height: 32px;
	background: #418fe8;
	opacity: 1;
	border-radius: 6px;
}

.span1-img {
	width: 20px;
	height: 20px;
}
.span1-text {
	color: #fff;
	margin-left: 5px;
}
.bottom-span2 {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 100px;
	width: 111px;
	height: 32px;
	background: #418fe8;
	opacity: 1;
	border-radius: 6px;
}
.span2-img {
	width: 20px;
	height: 20px;
}
.span2-text {
	color: #fff;
	margin-left: 5px;
}
</style>