<template>
	<div>
		<global-header></global-header>
	</div>
</template>


<script>
import { defineComponent, ref, onMounted } from "vue";
import GlobalHeader from "../components/GlobalHeader";
export default defineComponent({
	name: "SelectTest",
	components: {
			GlobalHeader
	},
	
});
</script>


<style>
</style>
