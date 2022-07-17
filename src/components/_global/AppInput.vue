<template>
  <div class="d-flex flex-column form-group">
    <label :for="placeholder">{{ placeholder }}</label>
    <VeeField
      :name="fieldKey"
      :rules="rules"
      :label="placeholder"
      :type="type"
      v-bind="$attrs"
      as="input"
      class="form-control"
      :class="{
        'border-danger': errors[fieldKey],
      }"
      @input="$emit('input')"
      @change="$emit('change')"
      @keyup="$emit('keyup')"
    />
    <VeeError :name="fieldKey" as="small" class="text-danger" />
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
export default class AppInput extends Vue {
  @Prop({ type: String, default: "" }) placeholder!: string;
  @Prop({ type: String, default: "" }) fieldKey!: string;
  @Prop({ type: String, default: "text" }) type!: string;
  @Prop({ type: Object, default: () => ({}) }) errors!: any;
  @Prop({ type: [String, Object], default: () => "" }) rules!: any;
  get appInputEvents() {
    return this.$listners;
  }
}
</script>
