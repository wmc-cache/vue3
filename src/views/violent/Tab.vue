<template>
	<div class="content">
		<div class="tab">
			<div
				class="item1"
				:style="item1"
				@click="select1"
				data-id="1"
				ref="item1"
			>
				<div>全部事件</div>
			</div>
			<div
				class="item2"
				:style="item2"
				@click="select2"
				data-id="2"
				ref="item2"
			>
				<div>我参与的事件</div>
			</div>

			<div
				@click="open"
				class="item3"
			>
				<div>发布新事件</div>
			</div>

			<div class="item4">{{isEndTime}}</div>
		</div>
	</div>
	<div
		v-if="state === '2'"
		class="tag"
	>
		<div
			@click="changeTag(item.id, item.link)"
			:class="[{ active: item.id === activeId }]"
			v-for="item in tagList"
			:key="item.id"
			class="tag-item"
		>
			{{ item.title }}
		</div>
	</div>
</template>

<script>
export default {
	name: "Tab",
	data() {
		return {
			state: "1",
			tag: 1,
			item1: {
				backgroundColor: "#418fe8",
				color: "#ffffff"
			},
			item2: {
				backgroundColor: "#fff",
				color: "#999999"
			},
			activeId: 1,
			tagList: [
				{ id: 1, title: "我发布的事件", link: "/violent/my/event" },
				{ id: 2, title: "我的评论", link: "/violent/my/comment" },
				{ id: 3, title: "回复我的事件", link: "/violent/my/reply" }
			],
			isEndTime: null
		};
	},
	watch: {
		$route(to, from) {
			const projectId = localStorage.getItem("projectId");
				const eventId = localStorage.getItem("eventId");
			if (to.path == `/violent/all/${projectId}`||to.path ==`/eventdetail/${eventId}`) {
				this.state = "1";
				this.item1.background = "#418fe8";
				this.item1.color = "#ffffff";
				this.item2.background = "#fff";
				this.item2.color = "#999999";
			} else {
				this.state = "2";
				this.item2.background = "#418fe8";
				this.item2.color = "#ffffff";
				this.item1.background = "#fff";
				this.item1.color = "#999999";
			}
			if (to.path == `/violent/my/event/:id`) {
				this.activeId = 1;
			}
			if (to.path == `/violent/my/event/${projectId}`) {
				this.activeId = 1;
			}
			if (to.path == `/violent/my/comment/${projectId}`) {
				this.activeId = 2;
			}
			if (to.path == `/violent/my/reply/${projectId}`) {
				this.activeId = 3;
			}
		}
	},
	mounted() {
		console.log(this.$route.fullPath);
		this.isEndTime = localStorage.getItem("isEndTime");
		const projectId = localStorage.getItem("projectId");
		if (this.$route.fullPath === `/violent/my/event/${projectId}`) {
			this.activeId = 1;
		}
		if (this.$route.fullPath === `/violent/my/comment/${projectId}`) {
			this.activeId = 2;
		}
		if (this.$route.fullPath === `/violent/my/reply/${projectId}`) {
			this.activeId = 3;
		}

		this.state = localStorage.getItem("state");
		if (localStorage.getItem("state") === "1") {
			this.item1.background = "#418fe8";
			this.item1.color = "#ffffff";
			this.item2.background = "#fff";
			this.item2.color = "#999999";
		} else {
			this.item2.background = "#418fe8";
			this.item2.color = "#ffffff";
			this.item1.background = "#fff";
			this.item1.color = "#999999";
		}
	},
	methods: {
		select1() {
			console.log(this.$refs.item1.getAttribute("data-id"));
			if ((this.state == "2") | 2) {
				this.state = "1";
				localStorage.setItem("state", 1);
				this.item1.background = "#418fe8";
				this.item1.color = "#ffffff";
				this.item2.background = "#fff";
				this.item2.color = "#999999";
				const id = localStorage.getItem("projectId");
				this.$router.push({
					path: `/violent/all/${id}`
				});
				return;
			}
		},
		select2() {
			console.log(this.$refs.item2.getAttribute("data-id"));
			if ((this.state == "1") | 1) {
				this.state = "2";
				localStorage.setItem("state", 2);
				this.item2.background = "#418fe8";
				this.item2.color = "#ffffff";
				this.item1.background = "#fff";
				this.item1.color = "#999999";
				this.$router.push({
					path: "/violent/my"
				});
				return;
			}
		},
		changeTag(id, link) {
			localStorage.setItem("Id", `${id}`);
			this.activeId = id;
			const projectId = localStorage.getItem("projectId");
			this.$router.push({
				path: `${link}/${projectId}`
			});
		},
		open() {
			this.$store.commit("createPushEventDialog");
		}
	}
};
</script>

<style scoped>
.content {
	margin-top: 20px;
	width: 1200px;
	height: 59px;
	background: #ffffff;
	box-shadow: 0px 3px 18px rgba(42, 59, 84, 0.12);
	opacity: 1;
	border-radius: 10px;
}
.tab {
	display: flex;
}
.item1 {
	margin-left: 21px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 130px;
	height: 59px;
	cursor: pointer;
	opacity: 1;
	border-radius: 10px;
	font-size: 16px;
}

.item2 {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 130px;
	height: 59px;
	opacity: 1;
	border-radius: 10px;
	font-size: 16px;
	cursor: pointer;
}

.item3 {
	margin-left: 581px;
	width: 159px;
	height: 59px;
	background: #418fe8;
	opacity: 1;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	font-size: 16px;
	cursor: pointer;
}

.item4 {
	margin-left: 41px;
	font-size: 18px;
	color: #333333;
	display: flex;
	justify-content: center;
	align-items: center;
}

.tag {
	width: 1200px;
	margin: auto;
	display: flex;
}

.tag-item {
	margin-left: 36px;
	margin-top: 20px;
	color: #707070;
	font-weight: 400;
}
.active {
	color: #333333;
	font-weight: 500;
}
</style>

