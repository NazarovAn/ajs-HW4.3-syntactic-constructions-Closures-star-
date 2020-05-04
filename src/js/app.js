/**
 * @param items - массив, с объектами ваших персонажей
 * @param shield - включена общая защита или нет
 */
export default function setUpAttacks(items) {
  const result = [];

  items.forEach((item) => {
    const character = item;
    const hitFunc = function hit(damage, shieldOnOf) {
      const shield = shieldOnOf;
      if (!shield) {
        character.health -= damage;
        if (character.health <= 0) {
          character.health = 0;
        }
      } else {
        const charactersAlive = items.filter((char) => char.health > 0);
        const damageRemainder = damage % charactersAlive.length;

        charactersAlive.forEach((elem) => {
          const shieldedCharacter = elem;
          if (damage % charactersAlive.length === 0) {
            const equalDamage = damage / charactersAlive.length;

            shieldedCharacter.health -= equalDamage;
            if (shieldedCharacter.health < 0) {
              shieldedCharacter.health = 0;
            }
          } else {
            const equalDamage = (damage - damageRemainder) / charactersAlive.length;
            shieldedCharacter.health -= equalDamage;
            if (shieldedCharacter.health <= 0) {
              shieldedCharacter.health = 0;
            }
          }
        });
        character.health -= damageRemainder;
        if (character.health < 0 || Number.isNaN(character.health)) {
          character.health = 0;
        }
      }
    };
    result.push(hitFunc);
  });

  return result;
}

const characters = [
  { name: 'маг', health: 100 },
  { name: 'лучник', health: 80 },
  { name: 'мечник', health: 10 },
];

const attacks = setUpAttacks(characters);

attacks[1](9, true); // атакуем лучника  97 97 7
attacks[1](99, true); // атакуем лучника  64 44 0
attacks[1](61, true); // атакуем лучника  34 13 0
attacks[0](100, false); // // атакуем мага  0 13 0

console.log(characters);
