<template>
  <Auth>
    <template #form>
      <VeeForm
        class="auth-form-field"
        @submit.prevent="handleSave"
        v-slot="{ errors }"
      >
        <h3>Profile</h3>
        <AppInput
          v-for="field in formFields"
          :key="field.key"
          :fieldKey="field.key"
          :type="field.type"
          :rules="field.rules"
          :placeholder="field.placeholder"
          :errors="errors"
          v-model="user[field.key]"
        />
        <el-button
          type="primary"
          :disabled="!!Object.keys(errors).length"
          @click="handleSave"
          >Save</el-button
        >
      </VeeForm>
    </template>
  </Auth>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Auth from "@/components/Auth.vue";
import AppInput from "@/components/_global/AppInput.vue";
import { INPUT_FIELD } from "@/components/_global/interface";
@Options({
  components: {
    Auth,
    AppInput,
  },
})
export default class LoginView extends Vue {
  // @Prop({ type: Boolean, default: false }) readonly isLoggedIn!: boolean;
  user: Record<string, any> = {
    phoneNumber: "",
    displayName: "",
    accept: false,
  };
  formFields: INPUT_FIELD[] = [
    {
      placeholder: "Name",
      key: "displayName",
      type: "text",
      rules: "required",
    },
    {
      placeholder: "Phone Number",
      key: "phoneNumber",
      type: "number",
      rules: "required | number",
    },
    // {
    //   placeholder: "Accept Terms",
    //   key: "accept",
    //   type: "checkbox",
    //   rules: "required",
    // },
  ];

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
