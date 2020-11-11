<template>

	<div class="tip">
		<div class="title">实验项目简介</div>
		<div class="date">开始日期:2020.10.28---结束日期:2020.10.28</div>
		<div class="text">
			文字形式介绍实验项目的基本规则。包括内容、流程、目的等。文字形式介绍实验项目的基本规则。包括内容、流程、目的等。文字形式介绍实验项目的基本规则。包括内容、流程、目的等。文字形式介绍实验项目的基本规则。包括内容、流程、目的等。文字形式介绍实验项目的基本规则。包括内容、流程、目的等。文字形式介绍实验项目的基本规则。包括内容、流程、目的等。
			文字形式介绍实验项目的基本规则。包括内容、流程、目的等。文字形式介绍实验项目的基本规则。包括内容、流程、目的等。文字形式介绍实验项目的基本规则。包括内容、流程、目的等。文字形式介绍实验项目的基本规则。包括内容、流程、目的等。文字形式介绍实验项目的基本规则。包括内容、流程、目的等。文字形式介绍实验项目的基本规则。包括内容、流程、目的等。

		</div>
	</div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "Tip",
	components: {}
});
</script>

<style scoped>
.tip {
	width: 353px;
	height: 100%;
	background: #ffffff;
	box-shadow: 0px 3px 18px rgba(42, 59, 84, 0.12);
	opacity: 1;
	border-radius: 10px;
}
.title {
	padding-left: 24px;
	padding-top: 20px;
	font-size: 20px;
	font-weight: 500;
	color: #333333;
}
.date {
	width: 313px;
	font-size: 14px;
	font-weight: 400;
	color: #707070;
	white-space: nowrap;
	margin-left: 24px;
	margin-top: 20px;
}
.text {
	margin-left: 24px;
	margin-top: 20px;
	padding-bottom: 20px;
	width: 314px;

	font-size: 14px;
	font-family: Source Han Sans CN;
	font-weight: 400;
	line-height: 24px;
	color: #707070;
	opacity: 1;
}
</style>