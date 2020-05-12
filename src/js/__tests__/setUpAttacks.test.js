import setUpAttacks from '../setUpAttacks';

let characters = [
  { name: 'маг', health: 100 },
  { name: 'лучник', health: 80 },
  { name: 'мечник', health: 10 },
];

let attacks = setUpAttacks(characters);

beforeEach(() => {
  characters = [
    { name: 'маг', health: 100 },
    { name: 'лучник', health: 80 },
    { name: 'мечник', health: 10 },
  ];

  attacks = setUpAttacks(characters);
});

test('setUpAttacks shield off damage 9', () => {
  const expected = [{ name: 'маг', health: 100 }, { name: 'лучник', health: 71 }, { name: 'мечник', health: 10 }];
  attacks[1](9, false);
  expect(characters).toEqual(expected);
});

test('setUpAttacks shield off damage 100', () => {
  const expected = [{ name: 'маг', health: 0 }, { name: 'лучник', health: 80 }, { name: 'мечник', health: 10 }];
  attacks[0](100, false);
  expect(characters).toEqual(expected);
});

test('setUpAttacks shield off damage 200', () => {
  const expected = [{ name: 'маг', health: 100 }, { name: 'лучник', health: 80 }, { name: 'мечник', health: 0 }];
  attacks[2](200, false);
  expect(characters).toEqual(expected);
});

test('setUpAttacks shield on damage 9', () => {
  const expected = [{ name: 'маг', health: 97 }, { name: 'лучник', health: 77 }, { name: 'мечник', health: 7 }];
  attacks[1](9, true);
  expect(characters).toEqual(expected);
});

test('setUpAttacks shield on damage 100', () => {
  const expected = [{ name: 'маг', health: 66 }, { name: 'лучник', health: 47 }, { name: 'мечник', health: 0 }];
  attacks[0](100, true);
  expect(characters).toEqual(expected);
});

test('setUpAttacks shield on damage 300', () => {
  const expected = [{ name: 'маг', health: 0 }, { name: 'лучник', health: 0 }, { name: 'мечник', health: 0 }];
  attacks[2](300, true);
  expect(characters).toEqual(expected);
});

test('setUpAttacks shield on damage 1000', () => {
  const expected = [{ name: 'маг', health: 0 }, { name: 'лучник', health: 0 }, { name: 'мечник', health: 0 }];
  attacks[1](1000, true);
  expect(characters).toEqual(expected);
});
