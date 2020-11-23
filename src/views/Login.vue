<template>
  <div class="body">
    <global-header class="fixed-top"></global-header>
    <div class="content">
      <img class="login-img" src="../assets/login.png" />

      <div class="from">
        <div class="from-title">账号登陆</div>
        <validate-form @form-submit="onFormSubmit">
          <div class="from-item">
            <validate-input
              class="from-input"
              :rules="userRules"
              v-model="userVal"
              placeholder="账号"
              type="text"
            />
          </div>

          <div class="from-item">
            <validate-input
              class="from-input"
              type="password"
              placeholder="密码"
              :rules="passwordRules"
              v-model="passwordVal"
            />
          </div>
          <template #submit>
            <button type="submit" class="from-button">登录</button>
          </template>
        </validate-form>
        
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import ValidateForm from "../components/ValidateForm.vue";
import createMessage from "../components/createMessage";
import { notification } from "ant-design-vue";
import GlobalHeader from "../components/GlobalHeader.vue";
export default defineComponent({
  name: "Login",
  components: {
    GlobalHeader,
    ValidateInput,
    ValidateForm,
  },
  data() {
    return {};
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const userVal = ref("");
    const userRules: RulesProp = [
      {
        type: "required",
        message: "用户名不能为空",
      },
    ];
    const passwordVal = ref("");
    const passwordRules: RulesProp = [
      {
        type: "required",
        message: "密码不能为空",
      },
    ];

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          username: userVal.value,
          password: passwordVal.value,
        };
        store
          .dispatch("loginAndFetch", payload)
          .then((data) => {
            notification.open({
              message: "登录成功",
              description: "欢迎",
            });
            router.push("/select");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };

    return {
      userRules,
      userVal,
      passwordVal,
      passwordRules,
      onFormSubmit,
    };
  },
});
</script>

<style>
.body {
  height: 100%;
}

.content {
  display: flex;
}

.login-img {
  margin-top: 100px;
  width: 820px;
  height: 547px;
}

.from {
  margin-left: 52px;
  margin-top: 200px;
  background-color: #418fe8;
  width: 342px;
  height: 313px;
}
.from-title {
  margin-left: 17.25px;
  font-size: 15px;
  margin-top: 30px;
  color: #ffffff;
}
.from-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 342px;
  margin-top: 15px;
}

.from-input {
  border: 0 !important;
  border-bottom: 1px solid #fff !important;
  border-radius: 0 !important;
  width: 298px !important;
  background-color: #418fe8 !important;
}
.from-button {
  width: 342px;
  height: 58px;
  margin-top: 140px;
  background-color: #ffbb33;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 14px rgba(42, 59, 84, 0.12);
}

.from-input::-webkit-input-placeholder {
  color: #fff !important;
}
.from-input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff !important;
}
.from-input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fff !important;
}
.from-input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #fff !important;
}
</style>
