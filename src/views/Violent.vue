<template>
	<div
		class="violent"
		@scroll="onScrollChange( $event)"
	>
		<Header></Header>
		<Tab></Tab>

		<div class="content">
			<div
				class="body"
				id="wut"
			>
				<push v-if="display"></push>
				<div class="area">
					<router-view> </router-view>
				</div>
			</div>

			<div class="tipArea">
				<Tip></Tip>

				<div v-if="isEndTime=='已结束'">
					<div class="flag1">
						<textarea
							placeholder="填写实验评价"
							class="text"
							v-if="flag==1"
							v-model="value"
							cols="30"
							rows="10"
						></textarea>
						<button
							@click="flag1"
							v-if="flag==1"
						>提交实验评价</button>
					</div>

					<button
						@click="flag2"
						v-if="flag==2"
					>查看实验评价</button>
				</div>

			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Header from "@/views/violent/Header.vue";
import Tab from "@/views/violent/Tab.vue";
import Tip from "@/views/violent/Tip.vue";
import Push from "@/views/violent/Push.vue";
import Axios from "axios";
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";
export default defineComponent({
	name: "Violent",
	components: {
		Header,
		Tab,
		Tip,
		Push
	},
	setup(props) {
		const store = useStore();
		const router = useRouter();
		const flag = ref(null);
		const isEndTime = ref(null);
		const value = ref("");
		onMounted(() => {
			flag.value = localStorage.getItem("flag");
			isEndTime.value = localStorage.getItem("isEndTime");
		});

		const onScrollChange = $event => {
			console.log($event.target.scrollTop);
		};
		const display = computed(() => store.state.pushEventDialog);
		const flag1 = async () => {
			const projectId = localStorage.getItem("projectId");
			const content = value.value;
			if (content.trim() == "") {
				notification.error({
					message: "内容不能为空"
				});
				return;
			}
			const data = await Axios.post("emulation/projectFeed", {
				projectId,
				content
			});
			if (data.status) {
				notification.open({
					message: "成功",
					description: "填写实验评价成功"
				});
			}
			setTimeout(() => {
				location.reload();
			}, 3000);
		};

		const flag2 = () => {
			router.push({ path: "/feedList" });
		};
		return {
			display,
			flag,
			isEndTime,
			value,
			flag1,
			flag2,
			onScrollChange
		};
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
button {
	margin-top: 10px;
	width: 353px;
	height: 55px;
	background: #418fe8;
	box-shadow: 0px 3px 18px rgba(42, 59, 84, 0.12);
	opacity: 1;
	border-radius: 7px;
	color: #fff;
}
.flag1 {
	margin-top: 10px;
	display: flex;
	flex-direction: column;
}
.text {
	padding: 10px;
	border: none;
	width: 353px;
	height: 330px;
	background: #ffffff;
	box-shadow: 0px 3px 18px rgba(42, 59, 84, 0.12);
	border-radius: 10px;
}
</style>
