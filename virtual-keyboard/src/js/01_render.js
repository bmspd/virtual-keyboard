let currentLang = 'en';
let capsLockStatus = false;
let shiftStatus = false;
const invisibleSymbols = ['Control', 'CapsLock', 'Alt', 'Shift', 'Delete', 'Backspace', 'Tab', 'Meta'];
const keys1 = [['§', '±', '>', '<'], ['1', '!'], ['2', '@', '"'], ['3', '#', '№'],
  ['4', '$', '%'], ['5', '%', ':'], ['6', '^', ','], ['7', '&', '.'],
  ['8', '*', ';'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Backspace', 'Backspace']];

const keys2 = [['Tab', 'Tab'], ['q', 'Q', 'й', 'Й'], ['w', 'W', 'ц', 'Ц'], ['e', 'E', 'у', 'У'],
  ['r', 'R', 'к', 'К'], ['t', 'T', 'е', 'Е'], ['y', 'Y', 'н', 'Н'], ['u', 'U', 'г', 'Г'],
  ['i', 'I', 'ш', 'Ш'], ['o', 'O', 'щ', 'Щ'], ['p', 'P', 'з', 'З'], ['[', '{', 'х', 'Х'],
  [']', '}', 'ъ', 'Ъ'], ['Delete', 'Delete']];
const keys3 = [['CapsLock', 'CapsLock'], ['a', 'A', 'ф', 'Ф'], ['s', 'S', 'ы', 'Ы'],
  ['d', 'D', 'в', 'В'], ['f', 'F', 'а', 'А'], ['g', 'G', 'п', 'П'], ['h', 'H', 'р', 'Р'],
  ['j', 'J', 'о', 'О'], ['k', 'K', 'л', 'Л'], ['l', 'L', 'д', 'Д'], [';', ':', 'ж', 'Ж'],
  ['\'', '"', 'э', 'Э'], ['\\', '|', 'ё', 'Ё'], ['Enter', 'Enter']];
const keys4 = [['Shift', 'Shift'], ['`', '~', ']', '['], ['z', 'Z', 'я', 'Я'], ['x', 'X', 'ч', 'Ч'],
  ['c', 'C', 'с', 'С'], ['v', 'V', 'м', 'М'], ['b', 'B', 'и', 'И'], ['n', 'N', 'т', 'Т'],
  ['m', 'M', 'ь', 'Ь'], [',', '<', 'б', 'Б'], ['.', '>', 'ю', 'Ю'], ['/', '?', '/', '?'],
  ['Shift', 'Shift']];
const keys5 = [['Control', 'Control'], ['Alt', 'Alt'], ['Meta', 'Meta'],
  ['Spacebar', 'Spacebar'], ['Meta', 'Meta'], ['Alt', 'Alt'], ['Control', 'Control']];
const keysAll = [keys1, keys2, keys3, keys4, keys5];
const flatKeysAll = keysAll.flat();
function transliterate(symbol) {
  // TODO If user changes language not as CTRL + ALT

  const res = flatKeysAll.filter((r) => r.includes(symbol));
}
function createNewElement(tag, className, target, innerText) {
  const element = document.createElement(tag);
  if (className) element.classList.add(...className);
  if (target) target.append(element);
  if (innerText) element.innerText = innerText;
  return element;
}
function appendKeys(key, row) {
  const [lower, upper, ruFirst, ruSecond] = key;
  const formattedClassNames = key.map((el) => `_${el === ' ' ? 'Spacebar' : el}_`);
  const elClasses = ['__key', `_${currentLang}`, ...formattedClassNames];
  const element = createNewElement('div', elClasses, row);
  const text = createNewElement('h2', null, element);
  createNewElement('span', ['_lower'], text, lower);
  if (upper) createNewElement('span', ['_upper', 'invisible'], text, upper);
  if (ruFirst) createNewElement('span', ['_ruF', 'invisible'], text, ruFirst);
  if (ruSecond) createNewElement('span', ['_ruS', 'invisible'], text, ruSecond);
}
function chooseButton(buttons, event) {
  if (buttons.length === 1) return buttons;
  const indexes = [];
  buttons.forEach((button) => {
    const index = Array.from(button.classList).indexOf(`_${event.key}_`);
    indexes.push(index);
  });
  const earlierIndex = Math.min(...indexes);
  const res = buttons.find((button) => Array.from(button.classList)[earlierIndex] === `_${event.key}_`);
  return [res];
}
function keyboardLangChanger(keyboard) {
  const keyboardKeys = Array.from(keyboard.querySelectorAll('.__key'));
  keyboardKeys.forEach((key) => {
    const lowerSpan = key.querySelector('._lower');
    const upperSpan = key.querySelector('._upper');
    const ruFirst = key.querySelector('._ruF');
    const ruSecond = key.querySelector('._ruS');
    if (currentLang === 'en') {
      if (ruFirst && ruSecond) {
        ruFirst.classList.add('invisible');
        ruSecond.classList.add('invisible');
        if (shiftStatus) upperSpan.classList.remove('invisible');
        else lowerSpan.classList.remove('invisible');
      } else if (ruFirst && shiftStatus) {
        ruFirst.classList.add('invisible');
        upperSpan.classList.remove('invisible');
      }
    } else if (ruFirst && ruSecond) {
      lowerSpan.classList.add('invisible');
      upperSpan.classList.add('invisible');
      if (shiftStatus) ruSecond.classList.remove('invisible');
      else ruFirst.classList.remove('invisible');
    } else if (ruFirst && shiftStatus) {
      ruFirst.classList.remove('invisible');
      upperSpan.classList.add('invisible');
    }
  });
}
function capsLockChanger(keyboard) {
  // TODO CAPSLOCK FUNCTIONALITY
  console.log('!!!!');
}
function languageChanger(key, symbolKit) {
  if (invisibleSymbols.includes(key)) return '';
  if (currentLang === 'en') return key;
  return 'test';
}
function shiftButtonHandler(event, keyboard) {
  const keyboardKeys = Array.from(keyboard.querySelectorAll('.__key'));
  keyboardKeys.forEach((key) => {
    const lowerSpan = key.querySelector('._lower');
    const upperSpan = key.querySelector('._upper');
    const ruFirst = key.querySelector('._ruF');
    const ruSecond = key.querySelector('._ruS');
    if (currentLang === 'en') {
      if (lowerSpan && upperSpan) {
        lowerSpan.classList.toggle('invisible');
        upperSpan.classList.toggle('invisible');
      }
    } else if (ruFirst && ruSecond) {
      ruFirst.classList.toggle('invisible');
      ruSecond.classList.toggle('invisible');
    } else if (lowerSpan && ruFirst) {
      lowerSpan.classList.toggle('invisible');
      ruFirst.classList.toggle('invisible');
    } else {
      lowerSpan.classList.toggle('invisible');
      upperSpan.classList.toggle('invisible');
    }
  });
}
const body = document.querySelector('body');

const h1 = document.createElement('h1');
h1.innerText = 'VIRTUAL KEYBOARD';
body.append(h1);

const textarea = document.createElement('textarea');
textarea.addEventListener('keydown', (event) => {
  event.preventDefault();
});
body.append(textarea);

const keyboard = document.createElement('div');
keyboard.classList.add('__keyboard');
body.append(keyboard);

keysAll.forEach((keys) => {
  const row = createNewElement('div', ['__row']);
  keys.forEach((key) => appendKeys(key, row));
  keyboard.append(row);
});

const keyCaps = Array.from(keyboard.querySelectorAll('.__key'));
document.addEventListener('keydown', (event) => {
  console.log('1keydown', event.key);
  const test = transliterate(event.key);
  // const variousEventKey = flatKeysAll.find(
  if (event.ctrlKey && event.altKey) {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    keyboardLangChanger(keyboard);
  }
  let current = keyCaps.filter((el) => el.classList.value.includes(`_${event.key === ' ' ? 'Spacebar' : event.key}_`));
  if (!current.length) return;
  current = chooseButton(current, event);
  current.forEach((cur) => cur.classList.add('active'));
  if (event.key === 'Backspace') {
    textarea.value = textarea.value.slice(0, -1);
    return;
  }
  if (event.key === 'Tab') {
    event.preventDefault();
    return;
  }
  if (event.key === 'CapsLock') {
    capsLockStatus = !capsLockStatus;
    capsLockChanger(event, keyboard);
  }
  if (event.key === 'Shift') {
    shiftStatus = !shiftStatus;
    shiftButtonHandler(event, keyboard);
  }
  if (event.key === 'Delete' || event.key === 'Shift') return;
  textarea.value += languageChanger(event.key, current);
});
document.addEventListener('keyup', (event) => {
  console.log('keyup', event.key);
  if (event.key === 'CapsLock') {
    capsLockStatus = !capsLockStatus;
    capsLockChanger(event, keyboard);
  }
  if (event.key === 'Shift') {
    shiftStatus = !shiftStatus;
    shiftButtonHandler(event, keyboard);
  }
  let current = keyCaps.filter((el) => el.classList.value.includes(`_${event.key === ' ' ? 'Spacebar' : event.key}_`));
  if (!current.length) return;
  current = chooseButton(current, event);
  current.forEach((cur) => cur.classList.remove('active'));
});
