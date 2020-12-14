<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-spacer />
<!-- @click="salir" -->
      <v-btn text color="red" @click="$auth.logout()">Salir</v-btn>

    </v-app-bar>


    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import { Auth } from 'aws-amplify';
export default {
  data () {
    return {
      sessionData: null,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },

         {
          icon: 'mdi-chart-bubble',
          title: 'Lista',
          to: '/lista'
        },
         {
          icon: 'mdi-chart-bubble',
          title: 'Crear',
          to: '/createUser'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'login',
          to: '/seguridad/login'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },

  //
  methods:{
    // created() {
    //   if (this.$session.exists()) {
    //     this.sessionData = this.$session.getAll();
    //   } else {
    //     // this.$router.push("Login");
    //   }
    // },
    mounted() {
      if (this.$session.exists()) {
        this.sessionData = this.$session.getAll();

      } else {
        console.log('no autorizados');
        this.$router.push("/seguridad/login");
      }
    },
    async salir(){
       try {
        await Auth.signOut();
        this.$session.destroy();
        this.$router.push("/seguridad/login");

      } catch (error) {
          console.log('error signing out: ', error);
      }
    }
  }
}
</script>
