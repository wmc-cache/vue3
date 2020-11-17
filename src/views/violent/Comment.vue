<template>
	<div>
		<div v-for="item in [1,2,3,4,5,6,7,8,9,10]" class="body">
			<div class="title">
				<div class="title-span1">我:</div>
				<div class="title-span2">发起者好感度：满意</div>
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
			<!-- <div class="bottom">
				<div class="bottom-span1">510人赞同观点</div>
				<div class="bottom-span2">510人不赞同观点</div>
				<div class="bottom-span3">
					<img
					class="span3-img"
						src="../../assets/message.png"
						alt=""
					>
					250条评论</div>
				<div class="bottom-span4">原文520条评论</div>
				<div class="bottom-span5">查看发起者事件反馈</div>
			</div> -->
		</div>
	</div>

</template>

<script>
export default {
	name: "Comment"
};
</script>

<style scoped>
.body {
	padding: 20px;
	border-bottom: 1px solid #f0f2f7;
}
.title {
	display: flex;
	align-items: center;
}
.title-span1 {
	font-size: 18px;
	font-weight: 400;
	color: #333333;
}
.title-span2 {
	font-size: 14px;
	font-weight: 400;
	color: #1e1e1e;
	margin-left: 417px;
	white-space: nowrap;
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
	margin-top: 36px;
	display: flex;
	align-items: center;
}
.bottom-span1 {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 105px;
	height: 32px;
	background: #e5f2ff;
	opacity: 1;
	border-radius: 6px;
	color: #0084ff;
}
.bottom-span2 {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 119px;
	height: 32px;
	background: rgba(255, 187, 51, 0.16);
	border: 1px solid #ffbb33;
	opacity: 1;
	border-radius: 6px;
	margin-left: 15px;
}
.bottom-span3 {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 20px;
}
.span3-img{
	margin-right: 5px;
}
.bottom-span4 {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 120px;
}
.bottom-span5 {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 80px;
	width: 149px;
	height: 32px;
	background: #418fe8;
	opacity: 1;
	border-radius: 6px;
	color: #fff;
}

img {
	width: 15px;
	height: 15px;
}
</style>