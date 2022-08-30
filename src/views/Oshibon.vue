<template>
  <template v-if="oshibon.pickedBooks.length">
    <h1 class="text-2xl font-bold text-center text-white bg-indigo-600 py-3">
      <span class="max-w-2xl mx-auto px-2 sm:px-0 block">{{
        oshibon.title
      }}</span>
    </h1>
    <div class="max-w-2xl mx-auto p-2 sm:p-0">
      <ul class="mb-10">
        <li
          v-for="book in oshibon.pickedBooks"
          :key="book.title"
          class="py-2 flex border-b items-start"
        >
          <img :src="book.largeImageUrl" :alt="book.title" class="w-20 mr-4" />
          <div>
            <p class="font-bold">{{ book.title }}</p>
            <div class="mt-1 mb-2 text-sm text-gray-700">
              <p>{{ book.author }}</p>
              <p>{{ book.publisherName }}</p>
              <p>ISBN: {{ book.isbn }}</p>
            </div>
            <div class="flex gap-1">
              <a
                :href="book.affiliateUrl"
                target="_blank"
                rel="noopener"
                class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              >
                <img
                  src="../assets/images/rakuten-logo.png"
                  alt="楽天ブックス"
                  class="h-4"
                />
                <span class="sr-only">楽天ブックス</span>
              </a>
              <a
                v-if="book.amazon"
                :href="book.amazon"
                target="_blank"
                rel="noopener"
                class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              >
                <img
                  src="../assets/images/amazon-logo.png"
                  alt="Amazon"
                  class="h-4"
                />
                <span class="sr-only">Amazon</span>
              </a>
            </div>
          </div>
        </li>
      </ul>

      <div class="text-center pb-20">
        <ShareNetwork
          network="twitter"
          :url="`https://oshibonmaker.com/${route.params.id}`"
          :title="twitterPost"
          description="description"
          quote="quote"
          hashtags="推し本メーカー"
          twitterUser="oshibonmaker"
          class="relative inline-flex items-center px-5 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-sky-500 shadow-sm hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 justify-center w-[280px]"
        >
          <i class="fa-brands fa-twitter mr-1"></i>
          <span>Share on Twitter</span>
        </ShareNetwork>
      </div>
    </div>
  </template>
  <p v-else class="text-center text-gray-500 p-6">Loading...</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { db } from "../firebase/config";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { useRoute } from "vue-router";

// types
import { Oshibon } from "../types";

const route = useRoute();

const oshibon = ref<Oshibon>({ pickedBooks: [], title: "推し本", uid: "" });
const twitterPost = ref<string>("");

const docId = String(route.params.id);
const docRef = doc(db, "oshibon", docId);
getDoc(docRef).then((docSnap: DocumentData) => {
  oshibon.value = docSnap.data();

  twitterPost.value = `${oshibon.value.title}\n`;
  oshibon.value.pickedBooks.forEach((book) => {
    twitterPost.value += `●${book.title} (${book.author})\n`;
  });
});
</script>
