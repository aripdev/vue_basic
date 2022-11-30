<template>
  <div
    class="spinner-border animate-spin inline-block border-4 rounded-full"
    :class="config"
    role="status"
  ></div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  dimension: {
    type: Number,
    default: 5,
  },
  color: {
    type: String,
    default: "text-indigo-700",
  },
});

const config = computed(() => {
  return `h-${props.dimension} w-${props.dimension} ${props.color}`;
});
</script>
<style scoped>
.spinner-border {
  border: 0.25em solid;
  border-top-width: 0.25em;
  border-right-color: currentcolor;
  border-right-width: 0.25em;
  border-bottom-width: 0.25em;
  border-left-width: 0.25em;
  border-right-color: transparent;
}
</style>