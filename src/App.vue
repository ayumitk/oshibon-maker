<template>
  <Navbar
    :user="user"
    :authIsReady="authIsReady"
    @login="onLogin"
    @logout="onLogout"
  />
  <RouterView />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

import Navbar from "./components/Navbar.vue";

const store = useStore();

const user = computed(() => store.state.user);
const authIsReady = computed(() => store.state.authIsReady);

const onLogin = async () => {
  try {
    await store.dispatch("twitterSignIn");
  } catch (err: any) {
    console.log(err);
  }
};
const onLogout = () => store.dispatch("logout");
</script>
