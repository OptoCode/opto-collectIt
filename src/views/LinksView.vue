<template lang="pug">
v-container
  v-row
    v-col(cols='12')
      v-card
        v-card-title
          h2 Links
        v-card-text
          v-row
            v-col(cols='12' md='6')
              v-text-field(v-model='search' label='Search links by title or tag' outlined)
              AddLinkDialog
          v-row
            v-col(cols='12')
          v-row(v-if='links.length > 0')
            v-col(cols='12')
              v-list
                v-list-item(v-for='(link, index) in links' :key='index')
                  a(:href='link.url' target='_blank') {{ link.title }}
                  p {{ link.tags }}
                  p {{ link.id }}
                v-btn(@click='deleteLink(link.id)')
                  v-icon mdi-delete
          v-row(v-else)
            v-col(cols='12')
              p No links found.
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useLinksStore } from "@/stores/links";
import { useCurrentUser } from "vuefire";
import AddLinkDialog from "@/components/AddLinkDialog.vue";

const linksStore = useLinksStore();
const user = useCurrentUser();
const links = computed(() => linksStore.links);
const newLink = {
  title: "",
  url: "",
  tags: "",
};
const search = "";

const searchLinks = () => {
  linksStore.searchLinks(search);
};

const addLink = () => {
  linksStore.addLink(newLink);
  newLink.title = "";
  newLink.url = "";
  newLink.tags = "";
};

const deleteLink = (index) => {
  linksStore.deleteLink(index);
};
onMounted(() => {
  if (user) {
    linksStore.fetchLinks(user.value.uid);
  }
});
</script>
