<template>
  <form
    ref="formAdd"
    class="space-y-8 divide-y divide-gray-200"
    @submit.prevent="saveUser"
  >
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="pt-2 space-y-6 sm:pt-4 sm:space-y-5">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">New User</h3>
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
                v-model.trim="users.name"
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
                :class="{ 'border-red-500': errorForm && errorForm['name'] }"
              />
              <span v-if="errorForm" class="text-xs text-red-500">{{
                errorForm["name"]
              }}</span>
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
                v-model.trim="users.title"
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
                :class="{ 'border-red-500': errorForm && errorForm['title'] }"
              />
              <span v-if="errorForm" class="text-xs text-red-500">{{
                errorForm["title"]
              }}</span>
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
                v-model.trim="users.email"
                id="email"
                name="email"
                type="text"
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
                :class="{ 'border-red-500': errorForm && errorForm['email'] }"
              />
              <span v-if="errorForm" class="text-xs text-red-500">{{
                errorForm["email"]
              }}</span>
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
                v-model.trim="users.role"
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
          @click="$emit('modalAction', 'addUser', false)"
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
            border
            shadow-sm
            text-sm
            font-medium
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          "
          :class="[
            formLocked
              ? 'bg-white border-gray-300 text-gray-700 focus:ring-0'
              : ' hover:bg-indigo-700 bg-indigo-600 text-white ',
          ]"
        >
          <LoaderData v-show="formLocked" class="mr-2"></LoaderData>
          <span>Save</span>
        </button>
      </div>
    </div>
  </form>
</template>
<script setup>
import { inject, ref } from "vue";
import server from "../../server";
import LoaderData from "../Layouts/LoaderData.vue";
import validation from "../../lib/validation";

const quickNote = inject("quickNote");

const roles = ref(["member", "team", "admin"]);

const emit = defineEmits(["modalAction", "refresh", "notification"]);

const formAdd = ref();

const formLocked = ref(false);

const users = ref({
  name: "",
  title: "",
  email: "",
  role: "member",
});

const rules = ref({
  name: "required|alpha_space|min:3|max:50",
  title: "required|alpha_space|min:3|max:50",
  email: "required|email|min:3|max:50",
  role: "required|alpha|min:2:max:50",
});

const errorForm = ref(null);

function locked(action) {
  const form = formAdd.value;

  formLocked.value = action;

  for (var x = 0; x < form.length; x++) {
    form[x].setAttribute("disabled", action);
  }
}

function saveUser() {
  const checkValidation = validation.sanitize(users.value, rules.value);

  if (Object.keys(checkValidation).length) {
    errorForm.value = checkValidation;
  } else {
    errorForm.value = null;
    locked(true);
    server
      .addingUser(users.value)
      .then((r) => {
        if (r.status == 201) {
          emit("modalAction", "addUser", false);
          emit("refresh");
          emit("notification", "Success add new user");
        }
      })
      .catch((er) => {
        if (er.code == "ERR_NETWORK") {
          quickNote.netErr();
        }
      })
      .finally(() => {
        locked(false);
        server.done();
      });
  }
}
</script>