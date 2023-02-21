<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>
        <span class="headline">Add Link</span>
      </v-card-title>

      <v-card-text>
        <v-text-field label="Title" v-model="linkTitle" required></v-text-field>
        <v-text-field label="URL" v-model="linkUrl" required></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
        <v-btn text color="primary" @click="saveLink">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useLinksStore } from "@/stores/links";
import { ref } from "vue";

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
    defautl: true,
  },
});
const dialog = ref(props.dialog);
const linkTitle = ref("");
const linkUrl = ref("");

const saveLink = async () => {
  const link = {
    title: linkTitle.value,
    url: linkUrl.value,
    // add other fields as needed
  };
  await useLinksStore().addLink(link);
  dialog.value = false;
};

// Listen for share events
// if ("share" in navigator) {
//   navigator.share.addEventListener("share", (event) => {
//     linkTitle.value = event.data.title;
//     linkUrl.value = event.data.url;
//     dialog.value = true;
//   });
// }
</script>
