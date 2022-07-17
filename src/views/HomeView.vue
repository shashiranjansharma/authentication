<template>
  <div class="home position-relative">
    <div class="sticky-top position-absolute w-100">
      <nav class="d-flex justify-content-between p-3 border-bottom">
        <div v-if="currenUser" class="font-weight-bold font-italic">
          {{ `Hi, ${currenUser.displayName || currenUser.email}` }}
        </div>
        <div>
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
          <a @click="logout"> Logout</a>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class HomeView extends Vue {
  get currenUser() {
    return this.$store.getters.getCurrentUser;
  }
  logout() {
    try {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
</script>
