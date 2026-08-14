import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  ratedCount = input<number>(0); // lui c'est le nombre de restaurant noter
  totalCount = input<number>(0); // nombre total de restaurant 
  
  //avarageRating est la note moyenne de tout les restaurants
  averageRating = input<number | null>(null); //soit c'est un nombre, soit il est null (valeur de depart)
}