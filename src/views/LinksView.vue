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
    v-col(cols='12' xl="3" lg="4" md="6" v-for='(link, index) in filterLinks' :key='index')
      v-card(v-if='links.length > 0')
        v-card-title
          h3 {{ link.title }}
        div(v-if="isYouTubeLink(link.url)")
          iframe(:src="getYouTubeEmbedUrl(link.url)" width="100%" height="315" :title="link.title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen)
        v-img(v-else src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.gif" height="200px")
        v-card-text 
          v-chip-group
            v-chip(v-for='tag in link.tags' :key='tag' size="x-small") {{ tag.toUpperCase() }}
        v-card-text 
          v-text-field(label="title" v-model="newLink.title")
          v-text-field(label="url" v-model="newLink.url")
          v-text-field(label="tags" v-model="newLink.tags")
        v-card-actions 
          v-btn(icon="mdi-link" :href="link.url" target="_blank")
          v-spacer
          v-btn(color='primary' text @click='editLink(link.id)' icon="mdi-pen")
          v-btn(@click="updateLink(link.id)" color='primary' text icon="mdi-check")
          v-btn(color='primary' text @click='deleteLink(link.id)' icon="mdi-delete")
      v-card(v-else) 
        v-card-text
          p No links found.
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useLinksStore } from "@/stores/links";
import { useCurrentUser } from "vuefire";
import AddLinkDialog from "@/components/AddLinkDialog.vue";

const linksStore = useLinksStore();
const user = useCurrentUser();
const links = computed(() => linksStore.links);
const edit = ref(false);
const search = ref("");

const filterLinks = computed(() => {
  return links.value.filter((link) => {
    return (
      link.title.toLowerCase().includes(search.value.toLowerCase()) ||
      link.tags.some((tag) =>
        tag.toLowerCase().includes(search.value.toLowerCase())
      )
    );
  });
});

function updateLink(id, link) {
  // Update the link in the store
  linksStore.updateLink(id, link);

  // We are no longer editing a link
  edit.value = false;
}

function deleteLink(index) {
  confirm("Are you sure you want to delete this link?") &&
    linksStore.deleteLink(index);
}

function isYouTubeLink(url) {
  return url.includes("https://youtu.be/");
}

function getYouTubeEmbedUrl(url) {
  const videoId = url.split(".be/")[1];
  return `https://www.youtube.com/embed/${videoId}`;
}

onMounted(() => {
  if (user) {
    linksStore.fetchLinks(user.value.uid);
  }
});
</script>
