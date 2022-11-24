<template>
  <div v-show="props.see" class="bg-green-50 border-l-4 border-green-400 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationCircleIcon
          class="h-5 w-5 text-green-400"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <p class="text-sm text-green-700">
          {{ props.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ExclamationCircleIcon } from "@heroicons/vue/24/outline";
import { onMounted, watchEffect } from "@vue/runtime-core";

const props = defineProps({
  see: Boolean,
  message: String,
});

const emit = defineEmits(["notifAction"]);

watchEffect(() => {
  if (props.see) {
    setTimeout(() => {
      emit("notifAction", false);
    }, 3000);
  }
});
</script>