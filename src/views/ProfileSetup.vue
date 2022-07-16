<template>
  <Auth>
    <template #form>
      <form class="auth-form-field" @submit="handleSave">
        <h3>Profile</h3>
        <label for="email">Name</label>
        <el-input type="text" v-model="user.displayName" placeholder="Name" />
        <label for="email">Phone</label>
        <el-input
          type="number"
          v-model="user.phoneNumber"
          placeholder="Phone"
        />

        <el-button type="primary" @click="handleSave">Save</el-button>
      </form>
    </template>
  </Auth>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Auth from "@/components/Auth.vue";
@Options({
  components: {
    Auth,
  },
})
export default class LoginView extends Vue {
  // @Prop({ type: Boolean, default: false }) readonly isLoggedIn!: boolean;
  user: Record<string, any> = {
    phoneNumber: "",
    displayName: "",
  };
  errorMessage = "";

  handleSave(e: any) {
    e.preventDefault();
    try {
      this.$store.dispatch("saveProfile", this.user);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
</script>
