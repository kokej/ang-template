import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable()
export class RouteHistoryClass implements OnDestroy {
  public previousRoute: string;
  public currentRoute: string;
  public tempRoute: string;
  private routeHistory: string[] = [];
  private subs = new Subscription();

  constructor(private router: Router) {
    console.log();
    const routeHistorySub = this.router.events.subscribe((event: Event) => {
      this.routerEventsHandler(event);
    });
    this.subs.add(routeHistorySub);
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private routerEventsHandler(event: any) {
    if (event instanceof NavigationStart) {
      this.tempRoute = event.url;
      this.currentRoute = event.url;
      this.previousRoute = this.routeHistory[1];
    }
    if (event instanceof NavigationEnd) {
      this.routeHistory.unshift(event.url);
      this.currentRoute = event.url;
      this.previousRoute = this.routeHistory[1];
    }
  }
}
