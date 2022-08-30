<template>
  <ul class="px-4">
    <li
      v-for="book in results"
      @click="$emit('pickBook', book)"
      :key="book.title"
      class="py-4 cursor-pointer flex border-b items-start border-gray-300"
    >
      <img :src="book.largeImageUrl" :alt="book.title" class="mr-4 w-20" />
      <div class="flex-1">
        <p class="font-bold text-gray-900 mb-1">{{ book.title }}</p>
        <p class="text-gray-700 text-sm">{{ book.author }}</p>
        <!-- <p>{{ book.publisherName }}</p>
          <p>ISBN: {{ book.isbn }}</p> -->
        <a
          :href="book.affiliateUrl"
          target="_blank"
          rel="noopener"
          class="text-indigo-600 text-sm"
          >楽天ブックスへ</a
        >
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full mt-3"
        >
          <span>この本を選択</span>
        </button>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";

// types
import { Book } from "../types";

// props
interface Props {
  results: Book[] | null;
  searchError: Boolean;
}
const props = defineProps<Props>();
const { results } = toRefs(props);

// emits
interface Emits {
  (e: "pickBook", book: Book): void;
}
const emits = defineEmits<Emits>();
</script>
