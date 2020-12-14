<template>
  <v-container>
    <h1>{{ $t("segurity.title_register") }}</h1>
    <v-row>
      <v-col cols="6" offset="3">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
            <v-text-field v-model="datos.user"  label="usuario" outlined required ></v-text-field>
            <v-text-field v-model="datos.first_name"  label="Nombre" outlined required ></v-text-field>
            <v-text-field v-model="datos.email"  label="Correo" outlined required ></v-text-field>
            <v-text-field v-model="datos.phone"  label="Teléfono" type="tel" outlined required ></v-text-field>
            <!-- <v-select :items="roles" label="Roles" v-model="datos.rol" item-text="name" item-value="value" outlined ></v-select> -->
            <v-text-field v-model="datos.pass"  label="contraseña" type="password" outlined  ></v-text-field>

            <v-btn  :disabled="!valid" color="primary"  class="mr-4 text-none" @click="registrar">
              registrar
            </v-btn>
        </v-form>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Auth } from 'aws-amplify';
export default {
   layout: 'segurity',
  name:'register',
  data(){
    return {
       valid: true,
      roles:[
        {
          name:'administrador',
          value:'0'
        },
        {
          name:'moderador',
          value:'1'
        }
      ],
      datos:{
        user:'',
        first_name:'',
        last_name:'',
        pass:'',
        email:'',
        phone:'',
        rol:''
      }
    }
  },

  //
  methods:{
   async registrar(){
    this.$refs.form.validate()
      try {
        let params = {
            username:this.datos.user,
            password:this.datos.pass,
            attributes: {
              name:this.datos.first_name,
              email:this.datos.email,
              phone_number:'+01123456789',
              // rol:this.datos.rol
            }
        }
        console.log('params',params);
        const { user } = await Auth.signUp(params);
        if(user){
            this.$router.push({path:'/seguridad/codeConfirm'})
        }
        console.log(user);
      } catch (error) {
          console.log('error signing up:', error);
      }

    }
  }
}
</script>

<style>

</style>
