import { createStore } from "vuex";

// firebase imports
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import {
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";

const store = createStore({
  state: {
    user: null,
    authIsReady: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      // console.log("user state changed: ", state.user);
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload;
    },
  },
  actions: {
    async twitterSignIn(context) {
      const provider = new TwitterAuthProvider();
      await signInWithPopup(auth, provider)
        .then((result) => {
          context.commit("setUser", result.user);
          setDoc(doc(db, "users", result.user.uid), {
            displayName: result.user.displayName,
            photoUrl: result.user.photoURL,
            createdAt: serverTimestamp(),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async logout(context) {
      await signOut(auth);
      context.commit("setUser", null);
    },
  },
});

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit("setAuthIsReady", true);
  store.commit("setUser", user);
  unsub();
});

// export store
export default store;
