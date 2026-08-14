import { Component, input, output, signal } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css',
})
export class StarRating {
  currentRating = input<number>(0); //note actuelle (0 si aucun clic)
  ratingChanged = output<number>(); // nouvelle note

  stars = [1, 2, 3, 4, 5];

  // Étoile actuellement survolée (0 = aucune)
  hoveredStar = signal<number>(0);

  onHover(star: number): void { //appelee lorsque une etoile est survolee , ceci est detecter avec mouseenter
    this.hoveredStar.set(star); // hoverdStar prend le numero de l'etoile survoler
  }

  onLeaveGroup(): void { //appeler lorsque il n'y a plus le curseur sur cet element
    this.hoveredStar.set(0); // quand le curseur quitte, le numero de l'etoile survoler est 0
  }

  //CETTE METHODE FAIS 2 TRUCS: COLORIE AU SURVOL ET COLORIE AU CLIC
  isFilled(star: number): boolean { // ici la condition est tester sur chacune des 5 etoiles a chaque fois
    if (this.hoveredStar() > 0) { // donc si le numero de l'etoile ou mon curseur survol est >0
      return star <= this.hoveredStar();// si l'etoile N1 est plus petit que celle que je survol(condition=true), alors la classe doree est appliquer a cet etoile
      //on va faire de meme pour les 4 autres etoiles, pour celle dont la condition sera fausse, on ne va pas appliquer la classe doree
    }
    return star <= this.currentRating();// es ce que l'etoile 1 est < au numero de celle ou j'ai cliquer? si oui classe doree
    // pareil pour les autres etoiles
  }

  setRating(star: number): void {
    // Bonus : recliquer sur la même étoile retire la note
    const newRating = this.currentRating() === star ? 0 : star; //si on reclique sur la meme etoile, sa efface notre note(0)
   // au clic, on envoie le numero de l'etoile cliquer. c'est comme sa que la valeur de currentRatting change, c'est app qui le modifie
    this.ratingChanged.emit(newRating);
  }
}
