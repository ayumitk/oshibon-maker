<template>
  <div class="max-w-2xl mx-auto px-2 sm:px-0 py-4">
    <div class="relative">
      <FormText
        placeholder="本のタイトル / 作者名 / ISBN"
        @click="() => (open = true)"
        icon
        class="cursor-pointer"
      />
      <i
        class="fa-solid fa-magnifying-glass absolute top-0 left-0 text-gray-400 p-5 text-xl leading-tight"
      />
    </div>

    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-20" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed z-20 inset-0 overflow-y-auto">
          <div class="sm:flex items-start justify-center min-h-full p-4">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full"
              >
                <div class="relative">
                  <FormText
                    v-model="searchQuery"
                    placeholder="本のタイトル / 作者名 / ISBN"
                    @input="getSearchResult"
                    icon
                    modal
                  />
                  <i
                    class="fa-solid fa-magnifying-glass absolute top-0 left-0 text-gray-400 p-5 text-xl leading-tight"
                  />
                  <button
                    class="absolute right-0 top-0 p-5 leading-[0] z-30"
                    @click="() => (open = false)"
                  >
                    <i
                      class="fa-solid fa-circle-xmark text-xl leading-tight text-gray-400 hover:text-gray-300"
                    ></i>
                    <span class="sr-only">検索を閉じる</span>
                  </button>
                </div>

                <div class="min-h-[400px]">
                  <p
                    v-if="loading"
                    class="text-center text-gray-400 font-medium text-sm py-10"
                  >
                    Loading...
                  </p>
                  <template v-else>
                    <p
                      v-if="searchError"
                      class="text-center text-gray-400 font-medium text-sm py-10"
                    >
                      データ取得に失敗しました。<br />もう一度トライしてみて！
                    </p>
                    <p
                      v-if="
                        rakutenSearchResults !== null &&
                        rakutenSearchResults.length === 0
                      "
                      class="text-center text-gray-400 font-medium text-sm py-10"
                    >
                      本が見つかりませんでした。<br />他のキーワードで試してみて！
                    </p>
                    <SearchResults
                      v-else
                      @pickBook="pickBook"
                      :results="rakutenSearchResults"
                      :searchError="searchError"
                    />
                  </template>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <p
      v-if="duplicateMessage"
      class="text-red-500 bg-opacity-90 bg-red-100 p-8 text-center absolute w-full top-1/2 left-0 font-bold text-xl"
    >
      既に追加済みの本です
    </p>

    <PickedBooks
      :oshibon="oshibon"
      @deleteBook="deleteBook"
      @openSearch="openSearch"
    />

    <div v-if="authIsReady" class="text-center mt-10">
      <label class="font-bold text-gray-900 mb-1 block"
        >推し本コレクションのタイトル
      </label>
      <input
        type="text"
        v-model="oshibon.title"
        :class="`${
          user
            ? 'focus:ring-indigo-500 focus:border-indigo-500'
            : 'text-gray-500 bg-gray-100'
        } border-2 w-full p-4 text-xl rounded-2xl border-gray-300 focus:outline-0`"
        :readonly="!user ? true : false"
      />
      <div class="mt-4 gap-y-3 flex flex-col">
        <Button
          v-if="!user"
          @click="handleTwitterSignIn"
          icon
          color="twitter"
          size="large"
          class="w-[280px] mx-auto"
        >
          <i class="fa-brands fa-twitter mr-1" />
          まずはTwitterでログイン
        </Button>

        <Button
          @click="createOshibon"
          color="primary"
          size="large"
          class="w-[280px] mx-auto"
          :disabled="user ? false : true"
          >推し本コレクションを作成</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// types
import { Book, Oshibon } from "../types";

import { ref, computed, onUpdated } from "vue";
import axios from "axios";
import { db } from "../firebase/config";
import { addDoc, collection } from "@firebase/firestore";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

// components
import SearchResults from "../components/SearchResults.vue";
import PickedBooks from "../components/PickedBooks.vue";
import Button from "../components/Button.vue";
import FormText from "../components/FormText.vue";

const open = ref(false);

const store = useStore();
const router = useRouter();

const searchError = ref<boolean>(false);
const searchQuery = ref<string>("");
const queryTimeout = ref<any>(null);
const rakutenApplicationId = ref("1012778944159854199");
const rakutenAffiliateId = ref("1afd78a9.38577cc8.1afd78aa.064c1d73");
const rakutenSearchResults = ref<Book[] | null>(null);
const loading = ref<boolean>(false);

const user = computed(() => store.state.user);
const authIsReady = computed(() => store.state.authIsReady);

const oshibon = ref<Oshibon>({ pickedBooks: [], title: "推し本", uid: "" });

onUpdated(() => {
  if (user.value) {
    oshibon.value.title = `${user.value.displayName}の推し本`;
    oshibon.value.uid = store.state.user.uid;
  }
});

const getSearchResult = () => {
  loading.value = true;
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&keyword=${searchQuery.value}&booksGenreId=001&affiliateId=${rakutenAffiliateId.value}&applicationId=${rakutenApplicationId.value}`
        );
        rakutenSearchResults.value = result.data.Items.map(
          (item: { Item: Book }) => {
            return item.Item;
          }
        );
        // console.log(rakutenSearchResults.value);
      } catch {
        searchError.value = true;
      }
      loading.value = false;
      return;
    } else {
      rakutenSearchResults.value = null;
    }
    loading.value = false;
  }, 300);
};

const localStorageItem = localStorage.getItem("oshibon");
if (localStorageItem) {
  oshibon.value = JSON.parse(localStorageItem!);
}

const duplicateMessage = ref(false);
const showDuplicateMessage = () => {
  duplicateMessage.value = true;
  setTimeout(() => {
    duplicateMessage.value = false;
  }, 3000);
};

const pickBook = async (item: Book) => {
  const isDuplicate = oshibon.value.pickedBooks.some(
    (book: Book) => book.isbn === item.isbn
  );
  if (!isDuplicate) {
    try {
      const amazon = await axios.get(
        `https://us-central1-oshibon-maker-45160.cloudfunctions.net/api/amazon/${item.isbn}`
      );
      if (amazon.data.SearchResult.Items.length) {
        item = {
          ...item,
          amazon: amazon.data.SearchResult.Items[0].DetailPageURL,
        };
      }
    } catch (err) {
      console.log(err);
    }
    oshibon.value.pickedBooks.push(item);

    localStorage.removeItem("oshibon");
    localStorage.setItem("oshibon", JSON.stringify(oshibon.value));
    rakutenSearchResults.value = null;
    searchQuery.value = "";
  } else {
    showDuplicateMessage();
    rakutenSearchResults.value = null;
    searchQuery.value = "";
  }
  open.value = false;
};

const deleteBook = (item: Book) => {
  oshibon.value.pickedBooks = oshibon.value.pickedBooks.filter((book: Book) => {
    return book.isbn !== item.isbn;
  });
  localStorage.removeItem("oshibon");
  localStorage.setItem("oshibon", JSON.stringify(oshibon.value));
};

const createOshibon = async () => {
  const colRef = collection(db, "oshibon");
  await addDoc(colRef, oshibon.value)
    .then(function (docRef) {
      router.push({
        name: "oshibon",
        params: { id: docRef.id },
      });
    })
    .catch(function (error) {
      console.error(error);
    });
};

const error = ref(null);
const handleTwitterSignIn = async () => {
  try {
    await store.dispatch("twitterSignIn");
    oshibon.value.title = `${user.value.displayName}の推し本`;

    localStorage.removeItem("oshibon");
    localStorage.setItem("oshibon", JSON.stringify(oshibon.value));
  } catch (err: any) {
    console.log(err);
  }
};

const openSearch = () => {
  open.value = !open.value;
};
</script>
