<template>
  <Auth>
    <template #form>
      <form class="auth-form-field" @submit="handleLogin">
        <h3>Sign In</h3>
        <label for="email">Email</label>
        <el-input
          type="email"
          v-model="credentials.email"
          placeholder="Email"
        />
        <label for="email">Password</label>
        <el-input
          type="password"
          v-model="credentials.password"
          placeholder="Password"
        />
        <div class="forgot-pw">
          <a href="/forgot-pasword">Forgot Password</a>
        </div>
        <el-button type="primary" @click="handleLogin">Login</el-button>
      </form>
    </template>
  </Auth>
</template>
<script lang="ts">
import { Prop } from "vue-property-decorator";
import { Options, Vue } from "vue-class-component";
import Auth from "@/components/Auth.vue";
@Options({
  components: {
    Auth,
  },
})
export default class LoginView extends Vue {
  // @Prop({ type: Boolean, default: false }) readonly isLoggedIn!: boolean;
  credentials: Record<string, any> = {
    email: "",
    password: "",
  };
  errorMessage = "";

  async handleLogin(e: any) {
    e.preventDefault();
    try {
      const user = await this.$store.dispatch("loginUser", this.credentials);
      if (user.email) this.$router.push({ name: "Home" });
      // if (isAlreadyExists) {
      //   this.errorMessage =
      //     "This email is already registered with us, try logging in whith the same email.";
      // } else this.errorMessage = user;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
</script>
