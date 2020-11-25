<template>

	<div class="tip">
		<div class="title">{{title}}</div>
		<div class="date">开始日期:{{addTime}}</div>
		<div class="date-end">结束日期:{{endTime}}</div>
		<div class="text">
			{{content}}
		</div>
	</div>

</template>

<script>
import Axios from "axios";

export default {
	name: "Tip",
	components: {},
	data() {
		return {
			title: "",
			content: "",
			addTime: "",
			endTime: ""
		};
	},
	async mounted() {
		this.endTime = localStorage.getItem("endTime");
		const data = await Axios.post("/emulation/selectProject", { state: 1 });
		const id = localStorage.getItem("projectId");

		data.data.data.forEach(ele => {
			if (ele.id == id) {
				this.addTime = ele.addTime;
				this.title = ele.title;
				this.content = ele.content;
			}
		});
		console.log(data.data.data);
	}
};
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
.date-end {
	width: 313px;
	font-size: 14px;
	font-weight: 400;
	color: #ffbb33;
	white-space: nowrap;
	margin-left: 24px;
	margin-top: 20px;
}

.text {
	margin-left: 24px;
	margin-top: 20px;
	padding-bottom: 20px;
	width: 314px;
	height: auto;
	font-size: 14px;
   white-space: wrap;
	font-weight: 400;
  color: #707070;
}
</style>