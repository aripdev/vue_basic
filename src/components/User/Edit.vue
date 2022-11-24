<template>
  <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="updateUser">
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="pt-2 space-y-6 sm:pt-4 sm:space-y-5">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Edit User</h3>
        </div>
        <div class="space-y-6 sm:space-y-5">
          <div
            class="
              sm:grid
              sm:grid-cols-3
              sm:gap-4
              sm:items-start
              sm:border-t
              sm:border-gray-200
              sm:pt-5
            "
          >
            <label
              for="first-name"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Name
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                v-model="users.name"
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="
                  max-w-lg
                  block
                  w-full
                  shadow-sm
                  focus:ring-indigo-500 focus:border-indigo-500
                  sm:max-w-xs sm:text-sm
                  border-gray-300
                  rounded-md
                "
              />
            </div>
          </div>

          <div
            class="
              sm:grid
              sm:grid-cols-3
              sm:gap-4
              sm:items-start
              sm:border-t
              sm:border-gray-200
              sm:pt-5
            "
          >
            <label
              for="last-name"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Title
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                v-model="users.title"
                type="text"
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                class="
                  max-w-lg
                  block
                  w-full
                  shadow-sm
                  focus:ring-indigo-500 focus:border-indigo-500
                  sm:max-w-xs sm:text-sm
                  border-gray-300
                  rounded-md
                "
              />
            </div>
          </div>

          <div
            class="
              sm:grid
              sm:grid-cols-3
              sm:gap-4
              sm:items-start
              sm:border-t
              sm:border-gray-200
              sm:pt-5
            "
          >
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Email
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                v-model="users.email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="
                  block
                  max-w-lg
                  w-full
                  shadow-sm
                  focus:ring-indigo-500 focus:border-indigo-500
                  sm:text-sm
                  border-gray-300
                  rounded-md
                "
              />
            </div>
          </div>

          <div
            class="
              sm:grid
              sm:grid-cols-3
              sm:gap-4
              sm:items-start
              sm:border-t
              sm:border-gray-200
              sm:pt-5
            "
          >
            <label
              for="country"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Roles
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <select
                v-model="users.role"
                id="country"
                name="country"
                autocomplete="country-name"
                class="
                  max-w-lg
                  block
                  focus:ring-indigo-500 focus:border-indigo-500
                  w-full
                  shadow-sm
                  sm:max-w-xs sm:text-sm
                  border-gray-300
                  rounded-md
                "
              >
                <option v-for="role in roles" :key="role" :value="role">
                  {{ role }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Action -->

    <div class="pt-5">
      <div class="flex justify-end">
        <button
          type="button"
          class="
            bg-white
            py-2
            px-4
            border border-gray-300
            rounded-md
            shadow-sm
            text-sm
            font-medium
            text-gray-700
            hover:bg-gray-50
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          "
          @click="$emit('modalAction', 'editUser', false)"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="
            ml-3
            inline-flex
            justify-center
            py-2
            px-4
            border border-transparent
            shadow-sm
            text-sm
            font-medium
            rounded-md
            text-white
            bg-indigo-600
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          "
        >
          Update
        </button>
      </div>
    </div>
  </form>
</template>
<script setup>
import { ref } from "vue";
import server from "../../server";

const emit = defineEmits(["refresh", "modalAction", "notification"]);

const props = defineProps({
  person: Object,
});

const roles = ref(["member", "team", "admin"]);

const users = ref({
  id: props.person.id,
  name: props.person.name,
  title: props.person.title,
  email: props.person.email,
  role: props.person.role,
});

function updateUser() {
  server.updateUser(users.value).then((r) => {
    if (r.status == 200) {
      emit("modalAction", "editUser", false);
      emit("refresh");
      emit("notification", "User Updated");
    }
  });
}
</script>