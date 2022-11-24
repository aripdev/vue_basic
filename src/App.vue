<script setup>
import UserIndex from "./components/User/Index.vue";
import UserCreate from "./components/User/Create.vue";
import Modal from "./components/Layouts/Modal.vue";
import { onMounted, ref } from "vue";
import server from "./server.js";
import Notification from "./components/Layouts/Notification.vue";

const listModal = ref({
  addUser: false,
});

const users = ref(null);

const configuration = ref({
  notif: false,
  notifMessage: "",
});

function modalAction(component, action) {
  listModal.value[component] = action;
}

function loadUserData(page, limit) {
  server.getAllUser(page, limit).then((r) => {
    users.value = r.data;
  });
}

function notifAction(action, message = "") {
  configuration.value.notif = action;
  configuration.value.notifMessage = message;
}
onMounted(() => {
  loadUserData();
});
</script>
<template>
  <Notification
    @notifAction="notifAction"
    :see="configuration.notif"
    :message="configuration.notifMessage"
  ></Notification>
  <UserIndex
    :users="users"
    @addUser="modalAction"
    @refresh="loadUserData"
    @notifAction="notifAction"
  ></UserIndex>
  <Modal @modalAction="modalAction" name="addUser" :open="listModal.addUser">
    <template #body>
      <UserCreate
        @refresh="loadUserData"
        @modalAction="modalAction"
        @notifAction="notifAction"
      ></UserCreate>
    </template>
  </Modal>
</template>
