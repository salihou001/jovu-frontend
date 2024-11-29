import { Component, ElementRef, ViewChild } from '@angular/core';
import { createSwapy } from 'swapy';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('container', { static: true }) container!: ElementRef;

  private swapyInstance: any;

  ngAfterViewInit(): void {
    this.initializeSwapy();
  }

  initializeSwapy(): void {
    this.swapyInstance = createSwapy(this.container.nativeElement, {
      animation: 'dynamic',  // Configure l'animation ici
      continuousMode: false, // Désactive le mode continu
      autoScrollOnDrag: true // Active le défilement automatique
    });

    this.swapyInstance.onSwap((event: any) => {
      console.log('Nouvel ordre:', event.data.array);
    });
  }

  // Détruire l'instance de Swapy quand le composant est détruit pour éviter les fuites de mémoire
  ngOnDestroy(): void {
    if (this.swapyInstance) {
      this.swapyInstance.destroy();
    }
  }
}
