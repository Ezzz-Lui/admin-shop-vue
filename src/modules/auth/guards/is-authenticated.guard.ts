import type { RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric, NavigationGuardNext } from "vue-router";

const isAuthenticated = (
  to:   RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext
) => {

  const userId = localStorage.getItem('userId')
  localStorage.setItem('lastPath', to.path)

  if(!userId){
     return next({
      name: 'Login'
    })
  }


  return next();
}

export default isAuthenticated;
