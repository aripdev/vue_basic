<template>
  <div class="px-4 sm:px-6 lg:px-8 pt-4">
    <!-- Heading -->
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Manage User</h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all the users in your account including their name, title,
          email and role.
        </p>
      </div>
      <!-- Add User -->
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          class="
            inline-flex
            items-center
            justify-center
            rounded-md
            border border-transparent
            bg-indigo-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            shadow-sm
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:ring-offset-2
            sm:w-auto
          "
          @click="actionId(person, 'add')"
        >
          Add user
        </button>
      </div>
    </div>

    <div class="my-4 md:grid md:grid-cols-6">
      <!-- Searching -->

      <div class="col-start-2 col-span-2">
        <div class="flex-1 flex">
          <form
            class="w-full flex md:ml-0"
            @submit.prevent="filterAdd('search', selectedFilter.search)"
          >
            <label for="search-field" class="sr-only">Search</label>
            <div
              class="relative w-full text-gray-400 focus-within:text-gray-600"
            >
              <div
                class="
                  absolute
                  inset-y-0
                  left-2
                  flex
                  items-center
                  pointer-events-none
                "
              >
                <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                class="
                  block
                  w-full
                  h-full
                  pl-8
                  pr-3
                  py-2
                  border-2 border-indigo-200
                  rounded-md
                  text-gray-900
                  placeholder-gray-500
                  focus:outline-none
                  focus:placeholder-gray-400
                  focus:ring-0
                  focus:border-indigo-300
                  sm:text-sm
                "
                placeholder="Search"
                type="search"
                name="search"
                v-model="selectedFilter.search"
              />
            </div>
            <button
              type="button"
              class="
                inline-flex
                items-center
                px-3
                py-2
                border border-transparent
                text-sm
                leading-4
                font-medium
                rounded-md
                shadow-sm
                ml-2
                text-white
                bg-indigo-600
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-500
              "
              @click.prevent="filterAdd('search', selectedFilter.search)"
            >
              Find
            </button>
          </form>
        </div>
      </div>
      <!-- Navigation Data -->

      <div class="col-span-3 flex space-y-4 lg:space-y-0 space-x-4 justify-end">
        <!-- Sorting -->
        <div class="my-auto">
          <Menu as="div" class="relative z-10 inline-block text-left">
            <div>
              <MenuButton
                class="
                  group
                  inline-flex
                  justify-center
                  text-sm
                  font-medium
                  text-gray-700
                  hover:text-gray-900
                "
              >
                Sort
                <ChevronDownIcon
                  class="
                    flex-shrink-0
                    -mr-1
                    ml-1
                    h-5
                    w-5
                    text-gray-400
                    group-hover:text-gray-500
                  "
                  aria-hidden="true"
                />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="
                  origin-top-left
                  absolute
                  left-0
                  z-10
                  mt-2
                  w-40
                  rounded-md
                  shadow-2xl
                  bg-white
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                "
              >
                <div class="py-1">
                  <MenuItem
                    v-for="option in sortOptions"
                    :key="option"
                    v-slot="{ active }"
                  >
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm font-medium text-gray-900',
                      ]"
                      @click.prevent="filterAdd('sorting', option)"
                    >
                      {{ option }}
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <!-- Limits -->
        <div>
          <select
            v-model="configPage.limit"
            class="
              block
              focus:ring-indigo-500 focus:border-indigo-500
              shadow-sm
              sm:max-w-xs sm:text-sm
              border-gray-300
              rounded-md
            "
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>

      <!-- Filter View -->

      <div class="col-start-2 col-span-5 mt-2">
        <div class="flex gap-2">
          <div
            class="bg-gray-200 rounded-3xl py-1 px-2 flex content-baseline"
            v-for="filter in filterView"
            :key="filter.action"
          >
            <span class="text-sm text-gray-600">{{ filter.query }}</span>
            <button class="ml-1" @click="removeFilter(filter.action)">
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="md:grid md:grid-cols-6">
      <!-- Filter by Role -->

      <div class="mt-2">
        <div>
          <label class="text-lg font-bold text-gray-700 flex space-x-2">
            <AdjustmentsHorizontalIcon class="w-6 h-6" />
            <span>Roles</span></label
          >

          <fieldset class="mt-4 ml-6">
            <div class="space-y-4">
              <div
                v-for="role in rolesAvail"
                :key="role"
                class="flex items-center"
              >
                <input
                  :id="role"
                  name="notification-method"
                  type="radio"
                  :checked="role == selectedFilter.roles"
                  class="
                    focus:ring-indigo-500
                    h-4
                    w-4
                    text-indigo-600
                    border-gray-300
                  "
                  @change.prevent="filterAdd('roles', role)"
                />
                <label
                  :for="role"
                  class="ml-3 block text-sm font-medium text-gray-700"
                >
                  {{ role }}
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <!-- List Users -->
      <div
        class="
          mt-2
          overflow-hidden
          shadow
          ring-1 ring-black ring-opacity-5
          sm:-mx-6
          md:mx-0 md:rounded-lg
          col-span-5
        "
      >
        <div v-if="users.data == null">User Empty</div>
        <div v-if="users.data != null">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="
                    py-3.5
                    pl-4
                    pr-3
                    text-left text-sm
                    font-semibold
                    text-gray-900
                    sm:pl-6
                  "
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="
                    hidden
                    px-3
                    py-3.5
                    text-left text-sm
                    font-semibold
                    text-gray-900
                    lg:table-cell
                  "
                >
                  Title
                </th>
                <th
                  scope="col"
                  class="
                    hidden
                    px-3
                    py-3.5
                    text-left text-sm
                    font-semibold
                    text-gray-900
                    sm:table-cell
                  "
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="
                    px-3
                    py-3.5
                    text-left text-sm
                    font-semibold
                    text-gray-900
                  "
                >
                  Role
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="person in users.data" :key="person.email">
                <td
                  class="
                    w-full
                    max-w-0
                    py-4
                    pl-4
                    pr-3
                    text-sm
                    font-medium
                    text-gray-900
                    sm:w-auto sm:max-w-none sm:pl-6
                  "
                >
                  {{ person.name }}
                  <dl class="font-normal lg:hidden">
                    <dt class="sr-only">Title</dt>
                    <dd class="mt-1 truncate text-gray-700">
                      {{ person.title }}
                    </dd>
                    <dt class="sr-only sm:hidden">Email</dt>
                    <dd class="mt-1 truncate text-gray-500 sm:hidden">
                      {{ person.email }}
                    </dd>
                  </dl>
                </td>
                <td
                  class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                >
                  {{ person.title }}
                </td>
                <td
                  class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                >
                  {{ person.email }}
                </td>
                <td class="px-3 py-4 text-sm text-gray-500">
                  {{ person.role }}
                </td>
                <td
                  class="
                    md:py-4 md:pl-3
                    pr-4
                    text-right text-sm
                    font-medium
                    md:pr-6 md:space-x-2
                  "
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">
                    <PencilSquareIcon
                      @click.prevent="actionId(person, 'edit')"
                      class="
                        h-6
                        w-6
                        mx-1
                        lg:inline-block
                        my-4
                        md:my-0
                        hover:shadow-lg
                      "
                    />
                    <span class="sr-only">, {{ person.name }}</span></a
                  >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">
                    <XCircleIcon
                      @click.prevent="actionId(person, 'delete')"
                      class="
                        h-6
                        w-6
                        mx-1
                        lg:inline-block
                        text-red-500
                        bg-red-100
                        rounded-full
                        hover:bg-slate-100 hover:shadow
                      "
                    />
                    <span class="sr-only">, {{ person.name }}</span></a
                  >
                </td>
              </tr>
            </tbody>
          </table>

          <Pagination
            :total="users.total"
            :limit="configPage.limit"
            :current="configPage.pages"
            @pageAction="changePage"
            @navAction="navAction"
          ></Pagination>
        </div>
      </div>
    </div>

    <!-- Modal Add User -->

    <Modal @modalAction="modalAction" name="addUser" :open="listModal.addUser">
      <template #body>
        <UserCreate
          @refresh="refreshAfterAction"
          @modalAction="modalAction"
          @notification="notification"
        ></UserCreate>
      </template>
    </Modal>

    <!-- Modal Destroy User -->
    <Modal
      @modalAction="modalAction"
      name="destroyUser"
      :open="listModal.destroyUser"
    >
      <template #body>
        <DestroyUser
          :person="selectedPerson"
          @modalAction="modalAction"
          @refresh="refreshAfterAction"
          @notification="notification"
        ></DestroyUser>
      </template>
    </Modal>

    <!-- Modal Edit User -->
    <Modal
      @modalAction="modalAction"
      name="editUser"
      :open="listModal.editUser"
    >
      <template #body>
        <EditUser
          :person="selectedPerson"
          @modalAction="modalAction"
          @refresh="refreshAfterAction"
          @notification="notification"
        ></EditUser>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import Modal from "../Layouts/Modal.vue";
import UserCreate from "./Create.vue";
import EditUser from "./Edit.vue";
import DestroyUser from "./Destroy.vue";
import Pagination from "../Layouts/Pagination.vue";
import server from "../../server";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import {
  XMarkIcon,
  XCircleIcon,
  PencilSquareIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/vue/24/outline";

const users = ref({
  data: null,
  total: 0,
});

const configPage = ref({
  pages: 1,
  limit: 2,
});

const sortOptions = ["name", "title", "email", "role"];

const rolesAvail = ["team", "member", "admin"];

const emit = defineEmits(["notifAction"]);

const selectedPerson = ref();
const listModal = ref({
  destroyUser: false,
  editUser: false,
  addUser: false,
});
const selectedFilter = ref({
  search: "",
  sorting: "",
  roles: "",
});
const filterView = ref([]);

function filterAdd(action, query) {
  const _key = Object.keys(selectedFilter.value).find((el) => el === action);

  if (_key) {
    const findKey = filterFinder(action);
    if (findKey !== false) {
      filterView.value[findKey]["query"] = query;
    } else {
      filterView.value.push({ action: action, query: query });
    }

    selectedFilter.value[_key] = query;

    getUsers();
  }
}

function removeFilter(action) {
  const _key = Object.keys(selectedFilter.value).find((el) => el === action);

  if (_key) {
    const findKey = filterFinder(action);
    if (findKey !== false) {
      filterView.value.splice(findKey, 1);
      selectedFilter.value[_key] = "";
    }
  }
  getUsers();
}

function filterFinder(key) {
  if (filterView.value.length) {
    for (var x = 0; x < filterView.value.length; x++) {
      if (filterView.value[x]["action"] == key) {
        return x;
      }
    }
  }
  return false;
}

function getUsers() {
  const _query = {
    _page: configPage.value.pages,
    _limit: configPage.value.limit,
    role: selectedFilter.value.roles,
    _sort: selectedFilter.value.sorting,
    q: selectedFilter.value.search,
  };

  const _key = [];

  Object.keys(_query).map((el) => {
    if (_query[el] !== "") {
      _key.push(el + "=" + _query[el]);
    }
  });

  const queryBuilder = _key.join("&");

  server.getUsers(queryBuilder).then((r) => {
    users.value.total = parseInt(r.headers["x-total-count"]);
    users.value.data = r.data;
  });
}

function actionId(person, action) {
  selectedPerson.value = person;
  if (action == "delete") {
    return (listModal.value.destroyUser = true);
  } else if (action == "edit") {
    listModal.value.editUser = true;
  } else {
    listModal.value.addUser = true;
  }
}

function modalAction(component, action) {
  listModal.value[component] = action;
}

function notification(message) {
  emit("notifAction", true, message);
}

function changePage(page) {
  configPage.value.pages = page;
  console.log(page, configPage.value.pages);
  // getUsers();
  // refresh(page, configPage.value.limit);
}

function navAction(action) {
  const _page =
    action == "next"
      ? (configPage.value.pages += 1)
      : (configPage.value.pages -= 1);

  changePage(_page);
}

function refreshAfterAction() {
  refresh(1, configPage.value.limit);
  configPage.value.pages = 1;
}

function refresh(page = 1, limit) {
  server.getAllUser(page, limit).then((r) => {
    users.value.total = parseInt(r.headers["x-total-count"]);
    users.value.data = r.data;
  });
}

onMounted(() => {
  getUsers();
});

watchEffect(() => {
  const limit = configPage.value.limit;
  if (limit) {
    configPage.value.limit = parseInt(limit);
    getUsers();
  }
});
</script>