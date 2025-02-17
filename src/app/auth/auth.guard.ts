import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      // ⛔ SSR: Nie odwołujemy się do localStorage na serwerze
      return false;
    }

    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole')?.trim();

    console.log("🔍 Sprawdzanie AuthGuard...");
    console.log("🔹 Token w LocalStorage:", token);
    console.log("🔹 Rola użytkownika w LocalStorage:", userRole);

    if (!token) {
      console.warn("⛔ Brak tokena - przekierowanie do logowania.");
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRoles: string[] = route.data['roles'];
    if (!requiredRoles || requiredRoles.length === 0) {
      console.warn("⚠️ Brak wymaganych ról w trasie - dostęp domyślnie przyznany.");
      return true;
    }

    console.log("🔹 Wymagane role:", requiredRoles);
    console.log("🔹 Finalna rola użytkownika:", userRole);

    if (!userRole || !requiredRoles.includes(userRole)) {
      console.warn("⛔ Brak uprawnień - przekierowanie na stronę główną.");
      alert('⛔ Brak uprawnień do tej strony.');
      this.router.navigate(['/']);
      return false;
    }

    console.log("✅ Użytkownik ma uprawnienia, dostęp przyznany.");
    return true;
  }
}
