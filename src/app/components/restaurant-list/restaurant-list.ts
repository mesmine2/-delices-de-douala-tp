import { Component, input, output } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantCard } from '../restaurant-card/restaurant-card';

@Component({
  selector: 'app-restaurant-list',
  imports: [RestaurantCard],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.css',
})
export class RestaurantList {
  restaurant = input.required<Restaurant[]>();

  // renvoie du signal au parent(App)
  //il retransmet juste exactement ce que restaurantCard lui a donner
  restaurantRated = output<{ id: number; rating: number }>();

  setRated(event: { id: number; rating: number }): void {
    this.restaurantRated.emit(event);
  }
}
