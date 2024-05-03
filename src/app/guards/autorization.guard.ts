import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot, UrlTree
} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class autorizationGuard {
constructor(private authService:AuthService,private route:Router) {
}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree
    {
      if(this.authService.roles.includes("ADMIN")){
        return true;
      }
else {
  this.route.navigateByUrl("/admin/notAuthorized");
        return false;
      }
    }


}





@Injectable({
  providedIn: 'root'
})
export class authentificationGuard {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuth) return true;
    else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }


}
