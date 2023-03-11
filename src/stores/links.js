// src/store/links.js

import { defineStore } from "pinia";
import { db } from "@/firebase/config";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useCurrentUser } from "vuefire";

export const useLinksStore = defineStore({
  id: "links",
  state: () => ({
    search: "",
    links: [],
    user: useCurrentUser(),
  }),
  getters: {
    getLinkById: (state) => (id) => {
      return state.links.find((link) => link.id === id);
    },
  },
  actions: {
    async fetchLinks(id) {
      const linksCollection = collection(db, "users", id, "links");
      const snapshot = await getDocs(linksCollection);
      const links = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      this.links = links;
    },
    async addLink(link) {
      const linksCollection = collection(db, "users", this.user.uid, "links");
      await addDoc(linksCollection, link);
      this.fetchLinks(this.user.uid);
    },
    async updateLink(link) {
      const linkRef = doc(db, "users", this.user.uid, "links", link);
      await updateDoc(linkRef, link);
      this.fetchLinks(this.user.uid);
    },
    async deleteLink(linkId) {
      if (!this.user) return;
      const linkRef = doc(db, "users", this.user.uid, "links", linkId);
      await deleteDoc(linkRef);
      this.fetchLinks(this.user.uid);
    },
  },
});
