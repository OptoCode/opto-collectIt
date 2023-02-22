<template lang="pug">
div
  v-btn(color='primary' @click='dialog = true')  Add Link 
  v-dialog(v-model='dialog')
    v-card
      v-card-title
        span.headline Add Link
      v-card-text
        v-text-field(label='Title' v-model='linkTitle' required)
        v-text-field(label='URL' v-model='linkUrl' required)
        //- v-select(label='Tags' v-model='linkTags' :items='tags' multiple chips)
        v-text-field(v-model="linkInput" label="Link" outlined dense @input="handleInput")
        v-chip(v-for="(tag, index) in tags" :key="index" outlined @click="deleteTag(index)") {{ tag }}
      v-card-actions
        v-btn(text color='primary' @click='dialog = false') Cancel
        v-btn(text color='primary' @click='saveLink') Save
</template>

<script setup>
import { useLinksStore } from "@/stores/links";
import { ref } from "vue";

const dialog = ref(false);
const linkTitle = ref("");
const linkUrl = ref("");
// const linkTags = ref([]);
const linkInput = ref("");
const tags = ref([]);

const saveLink = async () => {
  const link = {
    title: linkTitle.value,
    url: linkUrl.value,
    tags: tags.value,
  };
  await useLinksStore().addLink(link);
  dialog.value = false;
};

function handleInput() {
  if (linkInput.value.includes(",")) {
    const tag = linkInput.value.split(",")[0];
    tags.value.push(tag);
    linkInput.value = "";
  }
}

function deleteTag(index) {
  tags.value.splice(index, 1);
}

// Listen for share events
// if ("share" in navigator) {
//   navigator.share.addEventListener("share", (event) => {
//     linkTitle.value = event.data.title;
//     linkUrl.value = event.data.url;
//     dialog.value = true;
//   });
// }
</script>
