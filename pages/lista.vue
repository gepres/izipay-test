<template>
 <div>
    <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
    hide-default-footer
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
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
   <control-pagination :total-show="productsTotal" :total-data="total_data" :page="page" :total-pages="total_pages" :length-page="length_page" @lengthPageChanged="lengthPageChanged" @pageChanged="pageChanged"/>
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
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
      ],
      desserts: [],

    }),

    computed: {
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


    },
}
</script>

<style>

</style>
