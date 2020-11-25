<template>
	<div>
		<a-modal
			title="填写实验项目简介"
			v-model:visible="show"
			:confirm-loading="confirmLoading"
			@ok="handleOk"
			@cancel="cancel"
		>
			<input
				placeholder="请输入标题"
				class="title"
				v-model="title"
			/>
			<textarea
				placeholder="请输入描述"
				v-model="content"
				class="text"
				name=""
				id=""
				cols="30"
				rows="10"
			></textarea>
		</a-modal>
	</div>
</template>
<script>
export default {
	data() {
		return {
			title: "",
			content: "",
			ModalText: "Content of the modal",
			show: this.$store.state.showModel,
			confirmLoading: false
		};
	},
	mounted() {
		this.show = this.$store.state.showModel;
	},
	computed: {
		showModel() {
			return this.$store.state.showModel;
		}
	},
	watch: {
		showModel(value) {
			console.log(value);
			this.show = value;
		}
	},
	methods: {
		cancel() {
			this.show = this.$store.commit("cancelModel");
		},

		handleOk() {
		
			this.$store.dispatch("createProject", {
				title: `${this.title}`,
				content: `${this.content}`,
				state: "1"
			});
			setTimeout(()=>{ location.reload()},3000)
			
			this.show = this.$store.commit("cancelModel");
		}
	}
};
</script>

<style  scoped>
.text {
	border: none;
	width: 100%;
}
.title {
	border: none;
	width: 100%;
}
</style>