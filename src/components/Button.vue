<template>
  <button type="button" :class="classes" :disabled="disabled">
    <slot>Button</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: "primary",
  },
  variant: {
    type: String,
    default: "contained",
  },
  size: {
    type: String,
    default: "medium",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const classes = computed(() => ({
  btn: true,
  primary: props.color === "primary",
  secondary: props.color === "secondary",
  twitter: props.color === "twitter",
  [`${props.size || "medium"}`]: true,
  disabled: props.disabled,
  contained: props.variant === "contained",
  outlined: props.variant === "outlined",
}));
</script>

<style lang="postcss">
.btn {
  @apply border border-transparent font-medium shadow-sm focus:outline-none focus:ring-4 focus:ring-offset-0;
}
.btn.twitter {
  @apply bg-sky-500 hover:bg-sky-400 focus:ring-sky-200;
}
.btn.small {
  @apply text-sm px-3 py-1 rounded-lg;
}
.btn.medium {
  @apply text-base px-4 py-2 rounded-xl;
}
.btn.large {
  @apply text-lg px-5 py-3 rounded-2xl;
}
.btn.contained {
  @apply text-white;
}
.btn.contained.primary:not(.disabled) {
  @apply bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-200;
}
.btn.contained.secondary:not(.disabled) {
  @apply bg-gray-600 hover:bg-gray-500 focus:ring-gray-300;
}
.btn.outlined.primary:not(.disabled) {
  @apply border-indigo-600 hover:border-indigo-500 focus:ring-indigo-100 text-indigo-600 hover:bg-indigo-50;
}
.btn.outlined.secondary:not(.disabled) {
  @apply border-gray-400 hover:border-gray-500 focus:ring-gray-200 text-gray-600 hover:bg-gray-50;
}
.btn.contained.disabled {
  @apply bg-gray-200 text-gray-400;
}
.btn.outlined.disabled {
  @apply border-gray-300 text-gray-300;
}
</style>
