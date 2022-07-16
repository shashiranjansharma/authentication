<template>
  <Auth>
    <template #form>
      <form v-if="!isCreated" class="auth-form-field" @submit="registerUser">
        <h3>Sign Up</h3>
        <label for="name">Name</label>
        <el-input type="text" v-model="credentials.name" placeholder="Name" />
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
        <div v-if="errorMessage" class="forgot-pw">
          <a href="/login">Sign In</a>
        </div>
        <el-button type="primary" @click="registerUser">Register</el-button>
        <br />
        <el-alert v-if="errorMessage" :title="errorMessage" type="error" />
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
  @Prop({ type: Boolean, default: false }) readonly isLoggedIn!: boolean;
  credentials: Record<string, any> = {
    email: "",
    password: "",
    name: "",
  };
  isCreated = false;
  errorMessage = "";
  async registerUser(e: any) {
    e.preventDefault();
    try {
      const user = await this.$store.dispatch("registerUser", this.credentials);
      const isAlreadyExists = !!user.includes("auth/email-already-in-use");
      if (user.email) {
        this.$router.push({ name: "Profile" });
      } else if (isAlreadyExists) {
        this.errorMessage =
          "This email is already registered with us, try logging in whith the same email.";
      } else this.errorMessage = user;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
</script>
