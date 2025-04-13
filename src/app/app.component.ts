import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  RendererFactory2,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private renderer: Renderer2;
  constructor(
    private rendererFactory: RendererFactory2,
    private el: ElementRef
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit(): void {
    this.showLoaderWhileLoading();
  }

  showLoaderWhileLoading() {
    const appRoot = this.renderer.selectRootElement('app-root', true);
    const loaderContainer = this.renderer.createElement('div');
    const loader = this.renderer.createElement('div');

    // Adiciona classes ao loader
    this.renderer.addClass(loader, 'loader');
    this.renderer.addClass(loaderContainer, 'loader-container');

    // Anexa o loader ao container
    this.renderer.appendChild(loaderContainer, loader);
    this.renderer.insertBefore(appRoot, loaderContainer, appRoot.firstChild);

    // Verifica o estado do documento e espera o carregamento completo
    if (document.readyState === 'complete') {
      loaderContainer.classList.add('!hidden');
    } else {
      // Escuta o evento 'load' para remover o loader
      this.renderer.listen(window, 'load', () => {
        this.renderer.addClass(loaderContainer, '!hidden');
      });
    }
  }
}
