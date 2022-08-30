<template>
  <Disclosure as="nav" class="bg-white shadow">
    <div class="max-w-2xl mx-auto px-2 sm:px-0">
      <div class="relative flex justify-between h-16">
        <div class="flex-1 flex items-center sm:items-stretch">
          <router-link
            to="/"
            class="flex-shrink-0 flex items-center hover:opacity-70"
          >
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
              alt="推し本メーカー"
            />
            <span class="ml-2 font-bold text-xl">推し本メーカー</span>
          </router-link>
        </div>
        <div
          v-if="authIsReady"
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <Button v-if="!user" @click="$emit('login')" icon color="twitter">
            <i class="fa-brands fa-twitter mr-1" />
            Twitterでログイン
          </Button>

          <template v-if="user">
            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative z-10">
              <div>
                <MenuButton
                  class="bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    :src="user.photoURL"
                    alt=""
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem>
                    <span
                      @click="$emit('logout')"
                      class="block px-4 py-2 text-gray-700 cursor-pointer"
                      >ログアウト</span
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </template>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script setup lang="ts">
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";

import Button from "../components/Button.vue";

const props = defineProps({
  user: {
    type: Object,
  },
  authIsReady: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits<{
  (e: "login"): void;
  (e: "logout"): void;
}>();
</script>
