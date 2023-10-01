import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

const  isAuthenticatedAuth= ():boolean| Observable<boolean>=>{
  const authService:AuthService = inject(AuthService);
  const router:Router = inject(Router);


  return authService.checkAuthentication()
  .pipe(
    tap(isAuthenticated=>{
      if(isAuthenticated){
        router.navigate(['./'])
      }
    }),
    map( isAuthenticated => !isAuthenticated)
  )
}


export const canActivateAuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean | Observable<boolean> => {
  return isAuthenticatedAuth();
};

export const canMatchAuthGuard: CanMatchFn = (route:Route, segments:UrlSegment[]):boolean| Observable<boolean> => {
  return isAuthenticatedAuth();
};
