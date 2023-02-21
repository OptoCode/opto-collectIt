<template lang="pug">
v-container
  v-row
    v-col(cols='12')
      v-card
        v-card-title
          h2 Login
        v-card-text
          v-form(@submit.prevent='login')
            v-text-field(label='Email' v-model='email' required)
            v-text-field(label='Password' v-model='password' type='password' required)
            v-btn(color='primary' type='submit') Login
          v-snackbar(v-model='snackbar' :color='snackbarColor' top) {{ snackbarMessage }}
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  setup() {
    const auth = useFirebaseAuth();
    const email = ref(null);
    const password = ref(null);
    const snackbar = ref(false);
    const snackbarMessage = ref("");
    const snackbarColor = ref("");
    const router = useRouter();

    const login = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push({ name: "home" });
      } catch (error) {
        snackbarMessage.value = error.message;
        snackbarColor.value = "error";
        snackbar.value = true;
      }
    };

    return {
      login,
      email,
      password,
      snackbar,
      snackbarMessage,
      snackbarColor,
    };
  },
};
</script>
<style lang="scss" scoped>
.v-snack__wrapper {
  z-index: 999999;
}
</style>
