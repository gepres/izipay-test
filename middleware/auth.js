import Vue from 'vue'
// if (!window) {
// import 'localstorage-polyfill'
// }
export default ({ store,route, redirect }) => {
  // console.log('store',store);
  if (!store.getters['user/user'].isAuthenticated) return redirect('/login')
  // redirect('/seguridad/login')

}
