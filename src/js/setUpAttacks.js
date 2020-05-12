/**
 * @param items - массив, с объектами ваших персонажей
 * @param shield - включена общая защита или нет
 */
export default function setUpAttacks(items) {
  function checkHealth(whom, damage) {
    const char = whom;
    char.health -= damage;
    if (char.health < 0 || Number.isNaN(char.health)) {
      char.health = 0;
    }
  }
  return items.map((item) => {
    const character = item;
    const hitFunc = function hit(damage, shieldOnOf) {
      const shield = shieldOnOf;
      if (!shield) {
        checkHealth(character, damage);
      } else {
        const charactersAlive = items.filter((char) => char.health > 0);
        const damageRemainder = damage % charactersAlive.length;

        charactersAlive.forEach((elem) => {
          const shieldedCharacter = elem;
          if (damage % charactersAlive.length === 0) {
            const equalDamage = damage / charactersAlive.length;
            checkHealth(shieldedCharacter, equalDamage);
          } else {
            const equalDamage = (damage - damageRemainder) / charactersAlive.length;
            checkHealth(shieldedCharacter, equalDamage);
          }
        });
        checkHealth(character, damageRemainder);
      }
    };
    return hitFunc;
  });
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
