<template>
	<div>

		<a-modal
			v-model:visible="visible"
			title="评论"
			@cancel="cancel"
			@ok="handleOk"
		>
			<input
				placeholder="评论"
				v-model="value"
			/>
		</a-modal>
	</div>
</template>
<script>
import Axios from "axios";
export default {
	name: "FeedComment",
	data() {
		return {
			visible: false,
			value: ""
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
		cancel() {
			this.$store.commit("cancelFeedModel");
		},

		async handleOk(e) {
			this.$store.commit("cancelFeedModel");
			const id = localStorage.getItem("projectId");
			const eventId = localStorage.getItem("eventId");
			const parentId = localStorage.getItem("parentId");
			const data = await Axios.post("/emulation/comment", {
				eventId: eventId,
				parentId: parentId,
				content: this.value
			});
			location.reload();
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
</style>