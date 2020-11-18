<template>
	<div>

		<a-modal
			v-model:visible="visible"
			title="对评论评分"
			@cancel="cancel"
			@ok="handleOk"
		>
			<div v-for="item in list">
				<div  @click="click(item.id)" :class="[{active:active===item.id}]">
					{{item.title}}
				</div>

			</div>

		</a-modal>
	</div>
</template>
<script>
import Axios from "axios";
export default {
	name: "Score",
	data() {
		return {
			active: 1,
			visible: false,
			value: "",
			list: [
				{ id: 1, title: "喜欢，这个评论帮助或安慰到了我" },
				{ id: 2, title: "中立，没什么感觉" },
				{ id: 3, title: "讨厌，这个评论伤害到了我" }
			]
		};
	},
	mounted() {
		this.visible = this.$store.state.feedModel;
	},
	computed: {
		feedModel() {
			return this.$store.state.feedModel;
		}
	},
	watch: {
		feedModel(value) {
			this.visible = value;
		}
	},
	methods: {
		click(id){
    this.active = id
		},
		cancel() {
			this.$store.commit("cancelFeedModel");
		},

		async handleOk(e) {
			this.$store.commit("cancelFeedModel");
			const id = localStorage.getItem("score");
		
			const data = await Axios.post("/school/comment", {
				id: id,
				score: this.active
			});
			location.reload()
			console.log(data);
		}
	}
};
</script>
<style scoped>
input {
	width: 400px;
	border: none;
	background-color: snow;
}
.active {
	background-color: aliceblue;
}
</style>