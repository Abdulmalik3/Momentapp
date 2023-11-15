import { Injectable } from '@angular/core';
import {  CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiService,
    private router: Router) { 

  }

  canActivate(): Observable<boolean | UrlTree>  {
    return  this.apiService.currentUser.pipe(

      map((isAuthenticated) => {
        console.log("isAuthenticated:", isAuthenticated)
        if (!isAuthenticated) {
          return this.router.parseUrl('/login');
        }
        return true
      }))
        
  }
  
  
}
