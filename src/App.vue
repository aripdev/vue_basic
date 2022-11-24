<script setup>
import { ref } from "vue";
import UserIndex from "./components/User/Index.vue";
import Notification from "./components/Layouts/Notification.vue";

const configuration = ref({
  notif: false,
  notifMessage: "",
});

function notifAction(action, message = "") {
  configuration.value.notif = action;
  configuration.value.notifMessage = message;
}
</script>
<template>
  <Notification
    @notifAction="notifAction"
    :see="configuration.notif"
    :message="configuration.notifMessage"
  ></Notification>
  <UserIndex @notifAction="notifAction"></UserIndex>
</template>
