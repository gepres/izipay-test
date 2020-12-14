import jwt_decode from "jwt-decode";
export default function ({ $auth, route,redirect }) {
//  console.log('$auth',$auth);
 if(!$auth.$state.loggedIn){
  return redirect('/seguridad/login')
 }
 let token = $auth.$storage._state['_token.local']
 const decoded = jwt_decode(token);
 console.log('decoded',decoded.rol);

 if(!decoded.rol.includes('admin')){
    const authorizationLevels = route.meta.map((meta) => {
      if (meta.auth && typeof meta.auth.authority !== 'undefined'){
        // return meta.auth.authority
        if(!decoded.rol.includes(meta.auth.authority)){
          return redirect('/')
        }
        // console.log('meta.auth.authority',meta.auth.authority);
      }
      return 0
    })
 }
//  if(decoded.email !== 'genaropretill@gmail.com' ){
//   return redirect('/seguridad/login')
//  }
// console.log('meta.auth.authority',meta.auth.authority);

}
