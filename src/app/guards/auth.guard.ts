import { Injectable } from '@angular/core';
import {  CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map,filter, take } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiService,
    private router: Router) { 

  }

  canActivate(): Observable<boolean | UrlTree>  {
    console.log("auth guard canactivate",this.apiService.currentUser )
    
    return  this.apiService.currentUser.pipe(
      filter((val)=> val !== null),
      take(1),
      map((isAuthenticated) => {
        console.log("isAuthenticated:", isAuthenticated)
        if (isAuthenticated) {
          return true
        }else{
          this.router.createUrlTree(['/login'])
        }

      }))
        
  }
  
  
}
