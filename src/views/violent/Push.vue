<template>
	<div class="push-card">
		<validate-form @form-submit="onFormSubmit">

			<validate-input
				class="push-card-input-title"
				:rules="titleRules"
				v-model="titleVal"
				placeholder="请输入标题（事件发布不显示发布者姓名）"
				type="text"
			/>

			<div class="card-item">

				<validate-input
					class="push-card-input-content"
					type="password"
					tag="textarea"
					placeholder="生成新事件（提倡有亲身体验的）···"
					:rules="contentRules"
					v-model="contentVal"
				/>
			</div>
			<template #submit>

				<button
					class="push-card-submit-button"
					type="submit"
				>提交</button>
			</template>
		</validate-form>
		<button
			class="push-card-cancel-button"
			@click="cancel"
		>取消</button>
		<div class="upload">
			<upload @uploadImg="uploadImg"></upload>
		</div>

	</div>

</template>

<script lang="ts">
import { defineComponent, ref, store } from "vue";
import { useStore } from "vuex";
import ValidateForm from "@/components/ValidateForm";
import ValidateInput, { RulesProp } from "@/components/ValidateInput";
import Upload from "@/components/Upload";
import Axios from "axios";

export default defineComponent({
	name: "Push",
	components: {
		ValidateForm,
		ValidateInput,
		Upload
	},

	setup(props, context) {
		//const file = [];
		const store = useStore();
		const cancel = () => {
			clearInterval(window.timer);
			store.commit("cancelPushEventDialog");
		};
		const titleVal = ref("");
		const titleRules: RulesProp = [
			{
				type: "required",
				message: "标题不能为空"
			}
		];
		const contentVal = ref("");
		const contentRules: RulesProp = [
			{
				type: "required",
				message: "内容不能为空"
			}
		];
		const url = [];
		const uploadImg = arr => {
			console.log("!!!!!!!!!", arr);
			url.value = arr;
			//localStorage.setItem("url", arr);
		};

		const onFormSubmit = async (result: boolean) => {
			if (result) {
				const payload = {
					title: titleVal.value,
					content: contentVal.value
				};
				const id = localStorage.getItem("projectId");

				const data = await Axios.post("/emulation/event", {
					projectId: id,
					content: payload.content,
					title: payload.title,
					url: `${url.value}`
				});
				location.reload();
				console.log(data.data.data);
			}
		};

		return {
			cancel,
			titleVal,
			titleRules,
			contentVal,
			contentRules,
			onFormSubmit,
			uploadImg
		};
	}
});
</script>

<style>
.push-card {
	width: 837px;
	min-height: 330px;
	background: #ffffff;
	box-shadow: 0px 3px 18px rgba(42, 59, 84, 0.12);
	opacity: 1;
	border-radius: 10px;
	margin-top: 20px;
	padding: 20px;
}
.push-card-input-title {
	border: 0 !important;
	border-bottom: 1px solid #f0f2f7 !important;
	border-radius: 0 !important;
}
.push-card-input-content {
	margin-top: 10px;
	border: 0 !important;
	height: 200px;
}
.push-card-cancel-button {
	position: absolute;
	margin-left: 683px;
	margin-top: -40px;
	width: 107px;
	height: 40px;
	background: #999999;
	opacity: 1;
	border-radius: 6px;
	color: #fff;
}
.push-card-submit-button {
	width: 107px;
	height: 40px;
	background: #418fe8;
	opacity: 1;
	border-radius: 6px;
	color: #fff;
	margin-left: 19px;
	margin-top: 40px;
}
.upload {
	margin-top: 10px;
	margin-left: 20px;
}
</style>