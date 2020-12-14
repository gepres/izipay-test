<template>
  <v-container class="px-0">
    <v-row class="ma-0 pa-0 d-flex justify-center">
      <v-col :cols="4" class="d-flex flex-row pr-0">
        <span id="text-pagina" class="pr-2">Páginación:</span>
        <v-select
          id="cbx-cant-pag"
          v-model="select"
          @change="onChangePageLength"
          :items="lengthPageArray"
          outline
          solo
          dense
          :height="20"
          style="max-width:80px"
        />
      </v-col>
      <!-- class="d-flex justify-start" -->
      <v-col :cols="8" class="d-flex justify-end pr-7">
        <v-pagination
          id="paginacion"
          v-model="pageL"
          :length="totalPages"
          :total-visible="totalPages"
          @input="onPageChanged"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    totalData: {
      type: Number,
      default: 0,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
    page: {
      type: Number,
      default: 1,
    },
    pagesVisible: {
      type: Number,
      default: 10,
    },
    lengthPage: {
      type: String / Number,
      default: 10,
    },
    lengthPageArray:{
      type:Array,
      default:() => ([10, 20, 50]),
    }
  },
  data() {
    return {
      select: null,
      pageL: null,
    };
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    ...mapActions({
      onResize: "general/onResize",
    }),
    onChangePageLength() {
      this.$emit("lengthPageChanged", this.select);
    },
    onPageChanged() {
      this.$emit("pageChanged", this.pageL);
    },
  },
  computed: {
    // ...mapState({
    //   is_mobile: (state) => state.general.is_mobile,
    //   is_small_mobile: (state) => state.general.is_small_mobile,
    //   width: (state) => state.general.width,
    // }),
  },
  watch: {
    page(){
      this.pageL = this.page
    }
  },
  created() {
    this.select = this.lengthPage;
    this.pageL = this.page;
  },
};
</script>

<style>
.my-col-personalizado {
  width: 80px;
  height: 50px;
  float: left;
}

.fila {
  float: left;
  display: inline-block;
}

#text-pagina {
  font-size: 13px;
  text-align: center;
  align-items: center;
  margin: 10px 0px 0px 0px;
}

#cbx-cant-pag .v-input {
  font-size: 13px;
  max-width: 80px !important;
  width: 20px;
}
</style>
