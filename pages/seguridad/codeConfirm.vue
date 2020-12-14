<template>
  <v-container>
    <h1>Confirmar codigo</h1>
    <!-- <v-row>
      <v-col cols="6" offset="3">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
            <v-text-field v-model="datos.user"  label="usuario" outlined required ></v-text-field>
            <v-text-field v-model="datos.code"  label="Codigo" outlined required ></v-text-field>
             <v-btn  :disabled="!valid" color="primary"  class="mr-4 text-none" @click="validation">
              validar
            </v-btn>
        </v-form>
      </v-col>
    </v-row> -->
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>

        <v-card-text class="text-center pt-3">
         <h3 class="primary--text"> Activo su cuenta</h3>
        </v-card-text>



        <v-card-actions class="text-center d-flex justify-center">

          <v-btn
            color="primary"
            @click="dialog = false"
          >
            Ingresar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { Auth } from 'aws-amplify';
  export default {
    name:"confimar-codigo",
     layout: 'segurity',
    data(){
      return{
        valid: true,
        dialog:true,
        datos:{
          user:'',
          code:''
        }
      }
    },

    //
    methods:{
     async  validation(){
      try {
        let params={
          username:this.datos.user,
          code:441079
        }
        let username = this.datos.user
        let code = this.datos.code
        console.log('params',params);
        const res  = await Auth.confirmSignUp(username,code);
         console.log('res',res);
         if(res){
            this.$router.push({path:'/seguridad/login'})
         }
      } catch (error) {
              console.log('error confirming sign up', error);
      }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
