<template>
  <div class="header">
    <div class="content">
      <div class="title">线上实验平台</div>
      <div class="right">
        <img class="icon" src="../assets/icon.png" alt="" />
        <img class="whutlogo" src="../assets/whutlogo.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GlobalHeader",
});
</script>
<style scoped>
.header {
  height: 50px;
  background-color: #418fe8;
}
.content {
  width: 1200px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
}

.title {
  font-size: 28px;
  color: #ffffff;
}
.icon {
  width: 35px;
  height: 35px;
}

.whutlogo {
  width: 195px;
  height: 44px;
}
</style>