<template>
  <input
    type="text"
    :class="classes"
    :readonly="readonly"
    placeholder="Placeholder"
    :v-model="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  icon: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  modal: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const classes = computed(() => ({
  "form-text": true,
  readonly: props.readonly,
  icon: props.icon,
  modal: props.modal,
}));
</script>

<style lang="postcss">
.form-text {
  @apply border-2 w-full text-xl border-gray-300 focus:outline-0;
}
.form-text:not(.readonly) {
  @apply hover:border-indigo-200 hover:bg-indigo-50;
}
.form-text.readonly {
  @apply text-gray-500 bg-gray-100;
}
.form-text:not(.icon) {
  @apply p-4;
}
.form-text.icon {
  @apply py-4 pr-4 pl-12;
}
.form-text:not(.modal) {
  @apply rounded-2xl;
}
.form-text.modal {
  @layer rounded-y-2xl;
}
</style>
