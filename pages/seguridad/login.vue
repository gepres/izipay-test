<template>
  <v-container>
    <h1>{{ $t("segurity.title_login") }}</h1>
    <v-row>
      <v-col cols="6" offset="3">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
           <v-btn  color="primary"  class="mr-4 text-none mb-3" @click="goRegister">
              registrar
            </v-btn>
            <!-- <v-text-field v-model="name" :counter="10" :rules="nameRules" label="usuario" outlined required ></v-text-field> -->

            <v-text-field v-model="email" type="email" :rules="emailRules" label="correo" outlined required></v-text-field>
            <v-text-field v-model="pass"  label="contraseña" type="password" outlined required ></v-text-field>

            <v-btn  :disabled="!valid" color="primary"  class="mr-4 text-none" @click="validate">
              Ingresar
            </v-btn>
        </v-form>

      </v-col>
    </v-row>


  <!-- <amplify-sign-out></amplify-sign-out> -->
  <!-- <amplify-authenticator>

    <amplify-sign-up
    header-text="registro"
    slot="sign-up"
  ></amplify-sign-up> -->

  <!-- <amplify-sign-in
    header-text="Ingreso"
    slot="sign-in"
    have-account-text="gaaaa"
    :form-fields.prop="Description"
    submit-button-text="ingresar"
    :handle-submit="enviar()"
  ></amplify-sign-in> -->

  <!-- </amplify-authenticator> -->

  </v-container>
</template>

<script>
// import '@aws-amplify/ui-vue';
import { mapState, mapActions, mapMutations } from "vuex";
import { Auth } from 'aws-amplify';
import axios from 'axios'
export default {
  layout: 'segurity',
  name:'login',
  data(){
    return{
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      pass:'',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      Description:[
        {
          type: 'text',
          label: 'usuario',
          placeholder: 'usuario',
          required: true,
        },
        {
          type: 'email',
          label: 'correo',
          placeholder: 'correo',
          required: true,
        },
        {
          type: 'password',
          label: 'contraseña',
          placeholder: 'contraseña',
          required: true,
        }
      ],
    }
  },

  //
  methods:{
     ...mapMutations({
      setSession: 'general/set_session',
    }),
    enviar(){
      console.log('enviar login');
    },
    goRegister(){
      this.$router.push({path:'/seguridad/register'})
    },
    async validate () {
        this.$refs.form.validate()
        try {
          const data = {
            email:this.email,
            password:this.pass
          }
          console.log('datos',data);
           const res = await this.$auth.loginWith('local', { data })
          console.log('user',res);


          //  this.$router.push({path:'/'})
          // let username = this.name
          // let password = this.pass
            // const user = await Auth.signIn(username, password);
            // if(user.username){
            //   let data = {
            //     Session:user.Session,
            //     attributes:user.attributes,
            //     signInUserSession:user.signInUserSession
            //   }
            //   console.log('data session login',data);
            //   // this.setSession(data)
            //   this.$session.start();
            //   this.$session.set("Session", user.Session);
            //   this.$session.set("attributes", user.attributes);
            //   this.$session.set("signInUserSession", user.signInUserSession);
              // this.$router.push({path:'/'})
            // }
        } catch (error) {
            console.log('error signing in', error);
        }
      },
  }
}
</script>

<style>

</style>
