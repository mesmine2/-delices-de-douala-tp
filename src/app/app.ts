import { Component, computed, signal } from '@angular/core';
import { Restaurant } from './models/restaurant';
import { Header } from './components/header/header';
import { RestaurantList } from './components/restaurant-list/restaurant-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RestaurantList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  restaurants = signal<Restaurant[]>([
    { id: 1, name: 'Le Calao Doré', district: 'Akwa',
      specialty: 'Ndolé aux crevettes', currentRating: 0 },
    { id: 2, name: 'Chez Madame Ngono', district: 'Bonapriso',
      specialty: 'Eru aux pieds de bœuf', currentRating: 0 },
    { id: 3, name: 'La Fourchette Camerounaise', district: 'Bonanjo',
      specialty: 'Poulet DG', currentRating: 0 },
    { id: 4, name: 'Saveurs du Wouri', district: 'Bonamoussadi',
      specialty: 'Poisson braisé', currentRating: 0 },
    { id: 5, name: "L'Akwa Gourmand", district: 'Akwa',
      specialty: 'Bobolo et sauce arachide', currentRating: 0 },
    { id: 6, name: 'Le Royal de Bali', district: 'Bali',
      specialty: 'Koki et plantain', currentRating: 0 },
  ]);

  showOnlyHighRated = signal<boolean>(false);
  sortByRatingDesc = signal<boolean>(false);

  // fonction executer a chaque fois que restaurants change
  ratedCount = computed(
    // si currentRatting change, alors ratedCount change aussi, pour le compter comme restaurant noter
   //ici sa effectue un filtre et on considere juste les restaurants dont leur notes actuelle > 0
   //puis on compte leur nombre avec .length (nombre de restaurant dont la note>0) 
   () => this.restaurants().filter((r) => r.currentRating > 0).length
    // le (r) est comme pour dire prend la valeur actuelle (restaurants()) et modifie en lui cet elt(apres la fleche)
  );

  // nombre d'elt total de restaurants (ici 6)
  totalCount = computed(() => this.restaurants().length);

  //avarageRating sera la moyenne des notes
  averageRating = computed<number | null>(() => {
    const rated = this.restaurants().filter((r) => r.currentRating > 0); //ici, considere les restaurant dont la note>0 
    if (rated.length === 0) return null; //rated.lenght donne le nombre de ces restaurant apres filtre
   //reduce parourt le tableau de restaurant et additione le currentRatting de chaque restaurant a acc
    const sum = rated.reduce((acc, r) => acc + r.currentRating, 0);
    //enfin sum/nombre d'elt(rated.lenght) , puis on arrondi
    return Math.round((sum / rated.length) * 10) / 10;
  });

  displayedRestaurants = computed(() => {
    let list = this.restaurants();

    if (this.showOnlyHighRated()) { //si showOnlyHighRated est true, on execute
      //on considere les element dont la note est>=4
      list = list.filter((r) => r.currentRating >= 4);
    }

    if (this.sortByRatingDesc()) { //si sortByRatingDesc() est true, on execute,[...list] crée d'abord une copie (grâce au spread operator), puis on trie cette copie. Le tableau source (restaurants) reste intact.
      //ceci est un peu comme une difference, si b-a<0 alors c'est a le plus grand, on l'affiche d'abord(EX:3-5) 
      list = [...list].sort((a, b) => b.currentRating - a.currentRating);
    }
    return list;
  });

  //methode appeler quand StarRating envoie le signal jusqu'au parent
  onRestaurantRated(event: { id: number; rating: number }): void {
    //current indexe le tableau restaurant actuel, on prend chacun pour une modification, s'il na pas ete cliquer, on ne modifie rien, on le retourne comme sa
    //et map dis que pour chaque restaurant,on compare son id avec celui qui a ete cliquer
    this.restaurants.update((current) =>
      current.map((r) => // ici r designe le restaurant actuel plus le tableau
    //...r recopie toutes les propriétés existantes (id, name, district, specialty), du restaurant actuel
    //puis currentRating: event.rating écrase juste cette propriété avec la nouvelle note
        r.id === event.id ? { ...r, currentRating: event.rating } : r
      )
    );
  }

  //Ici .update((v) => !v) prend la valeur actuelle du booléen (v) et renvoie son inverse (!v)
  //fonction des filtres
  toggleHighRatedFilter(): void {
    this.showOnlyHighRated.update((v) => !v);
  }

  toggleSort(): void {
    this.sortByRatingDesc.update((v) => !v);
  }
}