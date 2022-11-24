<template>
  <div class="sm:flex sm:items-start mt-3">
    <div
      class="
        mx-auto
        flex-shrink-0 flex
        items-center
        justify-center
        h-12
        w-12
        rounded-full
        bg-red-100
        sm:mx-0 sm:h-10 sm:w-10
      "
    >
      <ExclamationTriangleIcon
        class="h-6 w-6 text-red-600"
        aria-hidden="true"
      />
    </div>
    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
        Remove User
      </DialogTitle>
      <div class="mt-2">
        <p class="text-sm text-gray-500">
          Are you sure you want to delete
          <span class="text-red-400">'{{ props.person.name }}'</span>, This
          action cannot be undone.
        </p>
      </div>
    </div>
  </div>
  <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
    <button
      type="button"
      class="
        w-full
        inline-flex
        justify-center
        rounded-md
        border border-transparent
        shadow-sm
        px-4
        py-2
        bg-red-600
        text-base
        font-medium
        text-white
        hover:bg-red-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
        sm:ml-3 sm:w-auto sm:text-sm
      "
      @click="deleteUser"
    >
      Delete
    </button>
    <button
      type="button"
      class="
        mt-3
        w-full
        inline-flex
        justify-center
        rounded-md
        border border-gray-300
        shadow-sm
        px-4
        py-2
        bg-white
        text-base
        font-medium
        text-gray-700
        hover:bg-gray-50
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-indigo-500
        sm:mt-0 sm:w-auto sm:text-sm
      "
      @click="$emit('modalAction', 'destroyUser', false)"
      ref="cancelButtonRef"
    >
      Cancel
    </button>
  </div>
</template>

<script setup>
import { DialogTitle } from "@headlessui/vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import server from "../../server";
const emit = defineEmits(["refresh", "modalAction", "notification"]);
const props = defineProps({
  person: Object,
});

function deleteUser() {
  emit("modalAction", "destroyUser", false);
  emit("notification", "User deleted");
  server.deleteUser(props.person.id);
  emit("refresh");
}
</script>