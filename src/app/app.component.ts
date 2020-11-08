import {Component, ElementRef, HostListener, Inject, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import {DOCUMENT, Location} from '@angular/common';

let lastScrollTop = 0;
const delta = 5;
const navbarHeight = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _router: Subscription;

  constructor(private renderer: Renderer2, private router: Router, @Inject(DOCUMENT,) private document: any, private element: ElementRef, public location: Location) {
  }

  @HostListener('window:scroll', ['$event'])
  hasScrolled(): void {
    const st = window.pageYOffset;
    if (Math.abs(lastScrollTop - st) <= delta) {
      return;
    }

    const navbar = document.getElementsByTagName('nav')[0];

    if (st > lastScrollTop && st > navbarHeight) {
      if (navbar.classList.contains('headroom--pinned')) {
        navbar.classList.remove('headroom--pinned');
        navbar.classList.add('headroom--unpinned');
      }
    } else {
      if (st + window.innerHeight < document.body.scrollHeight) {
        if (navbar.classList.contains('headroom--unpinned')) {
          navbar.classList.remove('headroom--unpinned');
          navbar.classList.add('headroom--pinned');
        }
      }
    }

    lastScrollTop = st;
  };

  ngOnInit(): void {
    const navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      if (window.outerWidth > 991) {
        window.document.children[0].scrollTop = 0;
      } else {
        window.document.activeElement.scrollTop = 0;
      }
      this.renderer.listen('window', 'scroll', (event) => {
        const number: number = window.scrollY;
        if (number > 150 || window.pageYOffset > 150) {
          navbar.classList.add('headroom--not-top');
        } else {
          navbar.classList.remove('headroom--not-top');
        }
      });
    });
    this.hasScrolled();
  }
}
