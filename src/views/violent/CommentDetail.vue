<template>
	<div class="body">
		<div class="title">
			<div class="name">用户3:</div>
			<div class="time">2020.10.28</div>
		</div>
		<div class="text">
			DP口问题 换线试试 我一开始也这样 我是DP连主机 显卡HDMI连耳机 也造成这问题 后来光纤连耳机 HDMI连显示器到显卡 就没这问题了

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
				25条回复
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "CommentDetail"
};
</script>

<style scoped>
.body {
	padding: 20px;
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