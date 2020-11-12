<template>

	<div class="violent">

		<Header></Header>
		<Tab></Tab>

		<div class="content">
			<div class="body">
				<push v-if="display"></push>
				<div class="area">
					<router-view>

					</router-view>
				</div>

			</div>

			<div class="tipArea">
				<Tip></Tip>
			</div>

		</div>

	</div>

</template>

<script lang="ts">
import { defineComponent,computed} from "vue";
import { useStore } from "vuex";
import Header from "@/views/violent/Header";
import Tab from "@/views/violent/Tab";
import Tip from "@/views/violent/Tip";
import Push from "@/views/violent/Push";
export default defineComponent({
	name: "Violent",
	components: {
		Header,
		Tab,
		Tip,
		Push
	},
	setup() {
		const store = useStore();
    const display = computed(() => store.state.pushEventDialog)
		return { display };
	}
});
</script>

<style scoped>
.violent {
	position: relative;
}
.content {
	width: 1200px;
}
.body {
	display: flex;
	flex-direction: column;
}
.area {
	margin-top: 20px;
	width: 837px;
	box-shadow: 0px 3px 18px rgba(42, 59, 84, 0.12);
	opacity: 1;
	border-radius: 10px;
}
.tipArea {
	position: absolute;
	right: 0;
	top: 20px;
}
</style>
