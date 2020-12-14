import Vuex from 'vuex'
import general from './modules/general'



const debug = process.env.NODE_ENV !== 'production'

// export default new Vuex.Store({
//   modules: {
//     general
//   },
//   strict: debug,
// })
const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      general
    }
  });
};

export default createStore
