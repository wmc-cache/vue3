<template>
	<div>
		<a-upload
			action="http://localhost:3000/upload"
			list-type="picture"
			v-model:fileList="fileList"
			@change="change"
		>
			<a-button>
				<upload-outlined /> 上传图片 </a-button>
		</a-upload>

	</div>
</template>

<script lang="ts">
import { UploadOutlined } from "@ant-design/icons-vue";
import { defineComponent, PropType, computed, ref, watch } from "vue";
export default defineComponent({
	components: {
		UploadOutlined
	},
	setup() {
    const fileList = ref(null);
   
		const change = e => {
      console.log(typeof e)
      // if(Array.isArray(e)){

	       console.log(e.fileList);
      // }
		
		}
		return { fileList, change };
	}
});
</script>
<style scoped>
.upload-list-inline ::v-deep(.ant-upload-list-item) {
	float: left;
	width: 200px;
	margin-right: 8px;
}
.upload-list-inline ::v-deep(.ant-upload-animate-enter) {
	animation-name: uploadAnimateInlineIn;
}
.upload-list-inline ::v-deep(.ant-upload-animate-leave) {
	animation-name: uploadAnimateInlineOut;
}
</style>
