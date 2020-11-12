<template>

	<div class="violent">

		<Header></Header>
		<Tab></Tab>
		<div class="content">

			<div class="area">
				<router-view>

				</router-view>
			</div>

			<div class="tipArea">
				<Tip></Tip>
			</div>

		</div>

	</div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/views/violent/Header";
import Tab from "@/views/violent/Tab";
import Tip from "@/views/violent/Tip";
export default defineComponent({
	name: "Violent",
	components: {
		Header,
		Tab,
		Tip
	}
});
</script>

<style scoped> 
.violent{
	position: relative;
}
.content {
	width: 1200px;
}
.area {
	margin-top: 20px;
	width: 837px;
	
	background: #ffffff;
	box-shadow: 0px 3px 18px rgba(42, 59, 84, 0.12);
	opacity: 1;
	border-radius: 10px;
}
.tipArea{
 position: absolute;
 right:0;
 top:20px;
}
</style>
