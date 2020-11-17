<template>
	<div>
		<global-header></global-header>
		<div class="content">
			<div class="title">选择要加入或生成的实验项目</div>
			<div class="item">
				<div class="item1">
					<div
						class="span1"
						@click="select1"
						:style="active1"
					> <img
							v-if="state===1"
							src="../assets/德1.png"
							alt=""
						>
						<img
							v-else
							src="../assets/德2.png"
							alt=""
						>

					</div>
					<div class="tip">"德"相关实验项目</div>

				</div>

				<div class="item2">
					<div
						class="span2"
						@click="select2"
						:style="active2"
					>
						<img
							v-if="state===2"
							src="../assets/法1.png"
							alt=""
						>
						<img
							v-else
							src="../assets/法2.png"
							alt=""
						>

					</div>
					<div class="tip">"法"相关实验项目</div>

				</div>

			</div>

			<div
				v-if="state===1"
				class="tetail"
			>

				<div
					v-if="flag==='2'"
					class="test1"
					@click="create"
				> 创建“网络暴力”实验项目</div>

				<div
					class="test1"
					v-for="item in list"
					@click="go(item.id)"
				>
					{{item.addTime}} “网络暴力”实验项目
				</div>

			</div>
		</div>
		<create-violent></create-violent>
	</div>
</template>

<script>
import GlobalHeader from "../components/GlobalHeader";
import CreateViolent from "@/views/CreateViolent";
import Axios from "axios";
export default {
	name: "SelectTest",
	components: {
		GlobalHeader,
		CreateViolent
	},
	async mounted() {
		const data = await Axios.post("/school/selectProject", { state: 1 });
		console.log(data.data.data);
		this.list = data.data.data;
		this.flag = localStorage.getItem("flag");
	},
	data() {
		return {
			flag: 1,
			show: false,
			state: 0,
			active1: {
				backgroundColor: "#fff"
			},
			active2: {
				backgroundColor: "#fff"
			},
			list: []
		};
	},
	methods: {
		create() {
			console.log("showMode");
			this.$store.commit("showModel");

			console.log(this.$store.state.showModel);
		},
		go(id) {
			this.$router.push({ path: `/violent/all/${id}` });
			localStorage.setItem("projectId",id)
		},
		select1() {
			this.state = 1;
			this.active1.backgroundColor = "#0084ff";
			this.active2.backgroundColor = "#fff";
		},
		select2() {
			this.state = 2;
			this.active2.backgroundColor = "#0084ff";
			this.active1.backgroundColor = "#fff";
		}
	}
};
</script>



<style scoped>
.content {
	width: 1200px;
	margin: auto;
	display: flex;
	flex-direction: column;
}
.title {
	margin: auto;
	margin-top: 50px;
	width: 260px;
	font-size: 20px;
	font-weight: 400;
	color: #0084ff;
}

.item {
	display: flex;
	width: 100%;
	justify-content: space-around;
	margin-top: 59px;
}
img {
	width: 74px;
	height: 75px;
}
.span1 {
	width: 165px;
	height: 165px;
	background-color: #ffffff;
	box-shadow: 0px 3px 18px rgba(42, 59, 84, 0.12);
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}
.span2 {
	width: 165px;
	height: 165px;
	background-color: #ffffff;
	box-shadow: 0px 3px 18px rgba(42, 59, 84, 0.12);
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}

.item1,
.item2 {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.tip {
	margin-top: 33px;
}
.tetail {
	margin: auto;
	width: 881px;
	height: 333px;
	padding: 50px;
	background: rgba(0, 132, 255, 0.03);
	border: 1px solid #0084ff;
	box-shadow: 0px 3px 18px rgba(42, 59, 84, 0.12);
	opacity: 1;
	border-radius: 10px;
	margin-top: 50px;
}
.test1 {
	cursor: pointer;
}
.test1:hover {
	color: #0084ff;
}
</style>
