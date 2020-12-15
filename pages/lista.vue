<template>
 <div>
    <v-data-table
    :headers="headers"
    :items="initList"
    class="elevation-1"
    hide-default-footer
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <!-- HEADER - START -->

    <!-- nombres y apellidos -->
    <template  v-slot:header.nombres="{ item }">
     <div class="content-header py-2">
       <v-btn text class="text-none" @click="toggleOrder('nombres')">Nombre y Apellidos</v-btn>
        <v-text-field flat hide-details dense solo label="Escribe aqui" outlined></v-text-field>
     </div>
    </template>

    <!-- email/usuario -->
    <template  v-slot:header.email="{ item }">
     <div class="content-header py-2">
       <v-btn text class="text-none" @click="toggleOrder('email')">Email/usuario</v-btn>
        <v-text-field flat hide-details dense solo label="Escribe aqui" outlined></v-text-field>
     </div>
    </template>

    <!-- opciopnes -->
    <template  v-slot:header.actions="{ item }">
     <v-btn color="primary" >Buscar</v-btn>
    </template>



    <!-- HEADER - START  -->


    <!-- BODY - START  -->
    <template  v-slot:item.rol="{ item }">
     <span v-if="item.rol.length == 1">{{item.rol[0]}}</span>
     <v-select v-else dense :items="item.rol"  :value="item.rol[0]" label="rol"  solo flat></v-select>
    </template>


    <!-- BODY - END  -->



    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        disabled
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        disabled
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
   <control-pagination :total-show="totalList" :total-data="total_data" :page="page" :total-pages="total_pages" :length-page="length_page" @lengthPageChanged="lengthPageChanged" @pageChanged="pageChanged"/>

 </div>

</template>

<script>
import axios from 'axios'
import mPagination from "@/mixins/mixinPagination";
import controlPagination from '@/components/general/ControlPaginacion'
export default {
  middleware: 'rolAuth',
  meta: {
    auth: { authority: 'edit' }
  },
  name:'lista',
  mixins: [mPagination],
  components: {
    "control-pagination": controlPagination,
  },
  data: () => ({
     sortBy: '',
     itemRol:'rol',
      sortDesc: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'nombres',
          align: 'start',
          sortable: false,
          value: 'nombres',
          width:'150'
        },
        { text: 'email', value: 'email', width:'150', sortable: false, },
        { text: 'rol', value: 'rol', width:'150' },
        { text: 'tienda', value: 'tienda' },
        { text: 'estado', value: 'estado' },
        { text: 'Opciones', value: 'actions', sortable: false, },
      ],
      desserts: [],

    }),

    computed: {
      initList(){
        let list = [
          {
            nombres:'genaro pretill',
            email:'genaro@test.com',
            rol:['user','rol'],
            tienda:'mini market lucho',
            estado:'Activo'
          },
           {
            nombres:'jose luis',
            email:'ojse@test.com',
            rol:['rol'],
            tienda:'polleria polaco',
            estado:'Activo'
          }
        ]
        return list
      },
      totalList(){
        return this.initList.length
      }
    },


    created () {
      // this.initialize()
      // this.init = 'initListado'
      // await this.initListado();
    },

    methods: {
      async initialize () {
        try {
          let params = {
          cod_negocio:'NPE0000002',
          data_busqueda:'',
          tamanio_pagina:20,
          pagina:1
        }
        const res = await axios.get('http://3.84.91.212/Negocio/ProdNegocioConsPag',params)
        console.log(res);
        } catch (error) {
          console.log(error);
        }
      },
      async initListado(return_to_push=false){
        let params = {
          cod_negocio: this.id_negocio,
          data_busqueda: this.search,
          tamanio_pagina: this.length_page,
          pagina: this.page,
        };

        let { data } = await axios.get('', params);
        if(!return_to_push){
          this.products = data.productos
          this.manageData(data)
        }
       else return data.productos
      },
       toggleOrder (value) {
        this.sortDesc = !this.sortDesc
        this.sortBy = value
      },

      // nextSort () {
      //   let index = this.headers.findIndex(h => h.value === this.sortBy)
      //   index = (index + 1) % this.headers.length
      //   this.sortBy = this.headers[index].value
      // },


    },
}
</script>

<style>

</style>
