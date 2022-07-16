<template>
  <div class="home">
    <nav>
      <div v-if="currenUser">
        {{ `Hi ${currenUser.displayName || currenUser.email}` }}
      </div>
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <a @click="logout"> Logout</a>
      </div>
    </nav>
    <router-view />
    <el-button>Test</el-button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {
  get currenUser() {
    return this.$store.getters.getCurrentUser;
    // .then((resolve: any) => {
    //   console.log(resolve);
    //   return resolve;
    // })
    // .catch((err: any) => {
    //   throw new Error(err);
    // });
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
