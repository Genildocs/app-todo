import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.scss',
})
export class DarkModeComponent implements OnInit {
  private renderer: Renderer2;
  darkModeOn: boolean = false;
  root!: HTMLElement;
  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }
  ngOnInit(): void {
    this.root = this.renderer.selectRootElement(document.documentElement, true);
    this.renderer.setAttribute(
      this.root,
      'data-mode',
      localStorage.getItem('data-mode') || 'light'
    );
  }

  darkMode() {
    if (localStorage.getItem('data-mode') !== 'dark') {
      this.renderer.setAttribute(this.root, 'data-mode', 'dark');
      localStorage.setItem('data-mode', 'dark');
      this.darkModeOn = !this.darkModeOn;
    } else {
      this.renderer.setAttribute(this.root, 'data-mode', 'light');
      localStorage.setItem('data-mode', 'light');
      this.darkModeOn = !this.darkModeOn;
    }
  }
}
