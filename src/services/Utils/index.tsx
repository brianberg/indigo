export class UtilService {

  calculateIV(pokemon : any) {
    return (
      pokemon.individual_attack +
      pokemon.individual_defense +
      pokemon.individual_stamina
    ) / 45 * 100;
  }

}