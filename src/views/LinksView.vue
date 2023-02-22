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
    v-col(cols='12' xl="6" lg="4" md="6" v-for='(link, index) in filterLinks' :key='index')
      v-card(v-if='links.length > 0')
        v-card-title
          h3 {{ link.title }}
        div(v-if="isYouTubeLink(link.url)")
          iframe(:src="getYouTubeEmbedUrl(link.url)" width="100%" height="315" :title="link.title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen)
        v-img(v-else src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.gif" height="200px")
        v-card-text 
          v-chip-group
            v-chip(v-for='tag in link.tags' :key='tag' size="x-small") {{ tag }}
        v-card-text(v-show="link.notes") 
          h3 {{ link.notes }}
        v-card-actions 
          v-btn(icon="mdi-link" :href="link.url" target="_blank")
          v-spacer
          v-btn(color='primary' text @click='editLink(link.id)' icon="mdi-pen")
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
const newLink = {
  title: "",
  url: "",
  tags: "",
};
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

const addLink = () => {
  linksStore.addLink(newLink);
  newLink.title = "";
  newLink.url = "";
  newLink.tags = "";
};

const deleteLink = (index) => {
  confirm("Are you sure you want to delete this link?") &&
    linksStore.deleteLink(index);
};

const isYouTubeLink = (url) => {
  return url.includes("https://youtu.be/");
};

const getYouTubeEmbedUrl = (url) => {
  const videoId = url.split(".be/")[1];
  return `https://www.youtube.com/embed/${videoId}`;
};

onMounted(() => {
  if (user) {
    linksStore.fetchLinks(user.value.uid);
  }
});
</script>
