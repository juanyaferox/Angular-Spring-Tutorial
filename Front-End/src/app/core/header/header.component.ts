import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    MatIconModule, // Importacion de modulos con la estitica "google"
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true
})
export class HeaderComponent {

}
