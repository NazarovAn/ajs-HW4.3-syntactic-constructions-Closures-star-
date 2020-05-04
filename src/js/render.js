import setUpAttacks from './app';

const creteCharBtn = document.querySelector('.create_characters_button');
const attackBtn = document.querySelector('.attack');
const closeBtn = document.querySelector('.closeBtn');
const addShieldBtn = document.querySelector('.add_shield');
const addCharBtn = document.querySelector('.add_char');
const tooltip = document.querySelector('.tooltip');
const charBox = document.querySelector('.render_characters');
const createForm = document.querySelector('.create_characters');
const nameInput = document.getElementById('name');
const healthInput = document.getElementById('health');
const charArr = [];
let shieldOnOff = true;

creteCharBtn.addEventListener('click', (elem) => {
  elem.preventDefault();
  const charHealth = parseInt(healthInput.value, 0);
  const id = Math.random().toString(36).substring(2, 10);
  if (Number.isNaN(charHealth) || charHealth < 0 || charHealth > 100) {
    tooltip.textContent = 'Здоровье персонажа должно быть числом от 0 до 100';
    tooltip.classList.remove('hidden');
    throw new Error('Incorrect health');
  } else if (!tooltip.classList.contains('hidden')) {
    tooltip.classList.add('hidden');
  }

  charArr.push({ name: nameInput.value, health: charHealth, id });
  charBox.insertAdjacentHTML('beforeend', `
  <div class="char_wrapper" data-id="${id}">
    <div class="char_name">Имя: <span class="name_span">${nameInput.value}</span></div>
    <div class="char_name">Здоровье: <span class="health_span">${charHealth}</span></div>
    <div class="attack_wrapper"><input class="attack_input" placeholder="урон персонажу"></div>
    <a class="remove_char">x</a>
  </div>`);
  const charWrappersList = Array.from(document.querySelectorAll('.char_wrapper'));
  const lastWrapper = charWrappersList.filter((item) => item.dataset.id === id)[0];
  const removeCharBtn = lastWrapper.querySelector('.remove_char');
  removeCharBtn.addEventListener('click', () => {
    lastWrapper.remove();
  });
});

addShieldBtn.addEventListener('click', () => {
  if (shieldOnOff === true) {
    shieldOnOff = false;
    addShieldBtn.style.backgroundColor = 'white';
    addShieldBtn.textContent = 'Щит выключен';
  } else {
    shieldOnOff = true;
    addShieldBtn.style.backgroundColor = 'lightblue';
    addShieldBtn.textContent = 'Щит включен';
  }
});

closeBtn.addEventListener('click', (elem) => {
  elem.preventDefault();
  createForm.classList.add('hidden');
});

addCharBtn.addEventListener('click', (e) => {
  e.preventDefault();
  createForm.classList.remove('hidden');
});

attackBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (charArr.length === 0) {
    tooltip.textContent = 'Нет персонажей для атаки';
    tooltip.classList.remove('hidden');
    throw new Error('No characters to attack');
  }
  const attack = setUpAttacks(charArr);
  const CharList = document.querySelectorAll('.char_wrapper');
  let attackForce = 0;
  let attackIndex = 0;

  CharList.forEach((item, index) => {
    const attackInputValue = item.querySelector('.attack_input').value;
    if (attackInputValue !== '') {
      attackForce = attackInputValue;
      attackIndex = index;
      attack[attackIndex](attackForce, shieldOnOff);
    }
  });
  charArr.forEach((item) => {
    const activeCharList = Array.from(document.querySelectorAll('.char_wrapper'));
    const activeCharWrapper = activeCharList.filter((obj) => obj.dataset.id === item.id)[0];
    const healthSpan = activeCharWrapper.querySelector('.health_span');
    healthSpan.textContent = item.health;

    if (item.health === 0) {
      activeCharWrapper.classList.add('dead_char');
    }
  });
});
