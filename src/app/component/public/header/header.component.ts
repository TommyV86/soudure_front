import { Component, HostListener } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  ngOnInit(): void {
    this.setupNavbarCollapse();
  }

  public setupNavbarCollapse(): void {
    const navItems = document.querySelectorAll('.nav-item');
    const navbarCollapse = document.getElementById('navbarSupportedContent');

    navItems.forEach(item => {
      item.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;

        // Vérifie si l'élément cliqué est dans un dropdown
        if (target.classList.contains('dropdown-toggle') || target.closest('.dropdown-menu')) {
          return;
        }

        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
          });
          bsCollapse.hide();
        }
      });
    });

    // Ajoutez un écouteur de clic pour fermer le menu burger quand on clique dans un dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
          });
          bsCollapse.hide();
        }
      });
    });
  }
  

  @HostListener('document:click', ['$event'])
  public onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Vérifie si l'élément cliqué est à l'extérieur du menu burger
    if (!target.closest('.navbar-collapse') && !target.closest('.navbar-toggler')) {
      const navbarCollapse = document.getElementById('navbarSupportedContent');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();
      }
    }
  }

}
