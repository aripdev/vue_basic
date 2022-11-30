<script setup>
import { provide, ref } from "vue";
import UserIndex from "./components/User/Index.vue";
import Notification from "./components/Layouts/Notification.vue";
import Modal from "./components/Layouts/Modal.vue";
import "nprogress/nprogress.css";

const configuration = ref({
  notif: false,
  notifMessage: "",
});

const quickNote = ref({
  netError: false,
});

function netErr() {
  quickNote.value.netError = true;
}

function notifAction(action, message = "") {
  configuration.value.notif = action;
  configuration.value.notifMessage = message;
}

provide("quickNote", {
  netErr,
});
</script>
<template>
  <Notification
    @notifAction="notifAction"
    :see="configuration.notif"
    :message="configuration.notifMessage"
  ></Notification>
  <UserIndex @notifAction="notifAction"></UserIndex>
  <!-- Quick Notification -->
  <div
    v-show="quickNote.netError"
    class="absolute bg-white top-0 w-full h-screen z-30"
  >
    <div class="flex justify-center items-center h-screen">
      <div class="m-4 md:m-0">
        <p class="text-2xl text-gray-700 font-bold">Network Error</p>
        <p class="text-gray-500 py-2">
          Check you connectivity, we can't reach the server
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.loading {
  animation: shimmer 2s infinite linear;
  border: transparent;
  color: transparent;
  background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
  background-size: 1000px 100%;
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
</style>
