<template>
  <v-row justify="center" align="center">
    <h1>haaaa</h1>
    {{session}}
    <!-- {{sessionData.signInUserSession.accessToken.jwtToken}} -->
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  middleware: 'rolAuth',
  components: {
    Logo,
    VuetifyLogo
  },
  data(){
    return{
       sessionData: null,
    }
  },
  // mounted() {
  //     if (this.$session.exists()) {
  //       this.sessionData = this.$session.getAll();
  //     } else {
  //       // this.$router.push("Login");
  //     }
  //   },
  computed:{
     ...mapState({
      session: (state) => state.general.session,
    }),
  }
}
</script>
