<template lang="pug">
v-app
  v-app-bar(app)
    v-app-bar-title CollectIt
    v-spacer
    v-btn(icon="mdi-logout" @click="logout")
  v-main
    RouterView
</template>
<script>
//logout
import { useFirebaseAuth } from "vuefire";
import { useRouter } from "vue-router";
export default {
  setup() {
    const route = useRouter();
    const auth = useFirebaseAuth();
    const logout = () => {
      auth.signOut();
      route.push("/login");
    };
    return {
      logout,
    };
  },
};
</script>
