<template>
	<teleport to="#back">

		<div
			class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
			:style="{backgroundColor: background || ''}"
		>
			<div class="loading-content">
				<a-spin size="large" />

			</div>
		</div>
	</teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import useDOMCreate from "../hooks/useDOMCreate";
export default defineComponent({
	props: {
		background: {
			type: String
		}
	},
	setup() {
		useDOMCreate("back");
	}
});
</script>

<style>
.loading-container {
	background: rgba(255, 255, 255, 0.5);
	z-index: 100;
	position: fixed;
	top: 0;
	left: 0;
}
</style>
