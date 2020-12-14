import axios from 'axios'
const state = () => ({
  titleStore:'hola a todos desde el stor 2e',
  session:null,
});

const getters = {};

const actions = {
};

const mutations = {
  set_session(state,data){
    console.log('session data store',data);
    state.session = data
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
