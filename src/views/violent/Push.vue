<template>
	<div class="push-card">
		<validate-form @form-submit="onFormSubmit">

			<validate-input
				class="push-card-input-title"
				:rules="userRules"
				v-model="userVal"
				placeholder="请输入标题（事件发布不显示发布者姓名）"
				type="text"
			/>

			<div class="card-item">

				<validate-input
					class="push-card-input-content"
					type="password"
					tag="textarea"
					placeholder="生成新事件（提倡有亲身体验的）···"
					:rules="passwordRules"
					v-model="passwordVal"
				/>
			</div>
			<template #submit>
				<button
					type="submit"
					class="push-card-cancel-button"
				>取消</button>
				<button
					type="submit"
					class="push-card-submit-button"
				>提交</button>
			</template>
		</validate-form>
		<div class="upload">
			<upload></upload>
		</div>

	</div>

</template>

<script>
import ValidateForm from "@/components/ValidateForm";
import ValidateInput from "@/components/ValidateInput";
import Upload from "@/components/Upload";
export default {
	name: "Push",
	components: {
		ValidateForm,
		ValidateInput,
		Upload
	}
};
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
	border: 0 !important;
	height: 200px;
}
.push-card-cancel-button {
	margin-left: 483px;
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
}
.upload{
	margin-top: -35px;
	margin-left: 20px;
}
</style>