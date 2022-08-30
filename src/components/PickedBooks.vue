<template>
  <div class="my-4">
    <h2 class="text-center mb-3 font-bold">あなたの推し本コレクション</h2>
    <ul class="grid grid-cols-4 gap-3 sm:gap-5">
      <template v-if="oshibon.pickedBooks">
        <li
          v-for="book in oshibon.pickedBooks"
          class="text-center h-full flex flex-col"
        >
          <div class="flex-1">
            <img :src="book.largeImageUrl" :alt="book.title" class="mx-auto" />
          </div>

          <Button
            size="small"
            variant="outlined"
            color="secondary"
            @click="$emit('deleteBook', book)"
            class="mt-1"
            >削除</Button
          >
        </li>
      </template>
      <template v-if="oshibon.pickedBooks.length < 8">
        <li
          v-for="n in 8 - oshibon.pickedBooks.length"
          class="flex items-start"
        >
          <span
            @click="$emit('openSearch')"
            class="text-center text-xs bg-gray-100 min-h-[120px] flex items-center w-full justify-center text-gray-500 cursor-pointer hover:bg-indigo-50"
            >本を選択<br />してください</span
          >
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

// types
import { Oshibon, Book } from "../types";

// components
import Button from "../components/Button.vue";

// props
interface Props {
  oshibon: Oshibon;
}
const props = defineProps<Props>();
const { oshibon } = toRefs(props);

// emits
interface Emits {
  (e: "deleteBook", book: Book): void;
  (e: "openSearch"): void;
}
const emits = defineEmits<Emits>();
</script>
