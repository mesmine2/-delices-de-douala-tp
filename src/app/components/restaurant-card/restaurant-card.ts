import { Component , input, output} from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { StarRating } from '../star-rating/star-rating';
@Component({
  selector: 'app-restaurant-card',
  imports: [StarRating],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.css',
})
export class RestaurantCard {
  // reception des informations des restaurant
  restaurant = input.required<Restaurant>();

  // renvoie du signal au parent(restaurant-list)
  // mais la donnee que StarRating l'envoie, il la transforme en id et rating car app doit savoir les etoiles de quel composant ont ete cliquer
  //et le numero de l'etoile cliquer (recu grace a emit)
 restaurantRated = output<{ id: number; rating: number }>();

  setRating(newRating: number): void {
    this.restaurantRated.emit({
      id: this.restaurant().id, // id du restaurant dont ses etoiles sont cliquer
      rating: newRating, // numero de l'etoile cliquer
    });
  }
}