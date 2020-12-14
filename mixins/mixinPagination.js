import { mapState, mapMutations } from "vuex";

export default {
  data: () => ({
    bottom: false,
    page: 1,
    total_pages: 1,
    length_page: 10,
    total_data: null,
    init: "",
    is_searching:false,
    disableListener:false
  }),
  methods: {
    // ...mapMutations({
    //   setIsBottom:'favorito/setIsBottom',
    //   setIsBottomBusqueda:'general/setIsBottomBusqueda'
    // }),
    isBottom() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = (visible + scrollY)+100 >= pageHeight;
      // let is = (bottomOfPage || pageHeight < visible) && this.is_mobile
      let is = bottomOfPage && this.is_mobile
      return is
    },
    lengthPageChanged(length) {
      this.length_page = length;
    },
    pageChanged(page) {
      this.page = page;
    },
    /**
     * gestiona la data recibida de una peticion
     * @param {*} model objeto que se seteará
     * @param {*} data objeto que trae los registros
     * @param {*} name nombre de la propiedad que se tiene en data
     */
    manageData(data) {
      if (this.page == 1) {
        this.total_data = data.nro_registros;
        this.total_pages = data.nro_paginas;
      }
      this.data_loaded = true;
    },
  },
  watch: {
    // isBottomFavorito(){
    //   console.log('is bottom state',this.isBottomFavorito)
    // },
    length_page() {
      if (this.init != "") {
        if(this.page != 1) this.is_searching = true;
        this.page = 1;
        this[this.init]();
      }
    },
    async search() {
      if (this.init != "") {
        if(this.page != 1) this.is_searching = true;
        console.log('is searching in search',this.is_searching)
        this.page = 1;
        await this[this.init]();
      }
    },
    page: {
      handler(newVal,oldVal) {
        console.log('is searching',this.is_searching)
        if (!this.is_mobile && this.init != "" && !this.is_searching) {
          this[this.init]();
        }
        this.is_searching = false
        console.log('is searching after omit page watch',this.is_searching)
      },
    },

  },
  computed:{
    // ...mapState({
    //   isBottomFavorito:state => state.favorito.producto.isBottom
    // })
  },
  async mounted() {
    if(!this.disableListener){
      window.addEventListener("scroll", () => {
        this.bottom = this.isBottom();
        // this.setIsBottom({entity:'producto',value:this.bottom})
        // this.setIsBottomBusqueda(this.bottom)
        console.log('in listener scroll',this.bottom)
      });
    }
  },
};

