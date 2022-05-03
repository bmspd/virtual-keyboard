let currentLang = 'en';
let capsLockStatus = false;
let shiftStatus = false;
const invisibleSymbols = ['Control', 'CapsLock', 'Alt', 'Shift', 'Delete', 'Backspace', 'Tab', 'Meta'];
const enAlphabet = 'qwertyuiopasdfghjklzxcvbnm';
const ruAlphabet = 'йцукенгшщзхъфывапролджэёячсмитьбю';
const ruKeyboardDict = '>1234567890-=йцукенгшщзхъфывапролджэё]ячсмитьбю/<!"№%:,.;()_+ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЁ[ЯЧСМИТЬБЮ?';
const enKeyboardDict = "§1234567890-=qwertyuiop[]asdfghjkl;'\\`zxcvbnm,./±!@#$%^&*()_+QWERTYUIOP{}ASDFGHJKL:\"|~ZXCVBNM<>?";
const keys1 = [['§', '±', '>', '<'], ['1', '!'], ['2', '@', '"'], ['3', '#', '№'],
  ['4', '$', '%'], ['5', '%', ':'], ['6', '^', ','], ['7', '&', '.'],
  ['8', '*', ';'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Backspace', 'Backspace']];
const codeKeys1 = ['Backquote', 'Digit1', 'Digit2',
  'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7',
  'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'];
const keys2 = [['Tab', 'Tab'], ['q', 'Q', 'й', 'Й'], ['w', 'W', 'ц', 'Ц'], ['e', 'E', 'у', 'У'],
  ['r', 'R', 'к', 'К'], ['t', 'T', 'е', 'Е'], ['y', 'Y', 'н', 'Н'], ['u', 'U', 'г', 'Г'],
  ['i', 'I', 'ш', 'Ш'], ['o', 'O', 'щ', 'Щ'], ['p', 'P', 'з', 'З'], ['[', '{', 'х', 'Х'],
  [']', '}', 'ъ', 'Ъ'], ['Delete', 'Delete']];
const codeKeys2 = ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR',
  'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete'];
const keys3 = [['CapsLock', 'CapsLock'], ['a', 'A', 'ф', 'Ф'], ['s', 'S', 'ы', 'Ы'],
  ['d', 'D', 'в', 'В'], ['f', 'F', 'а', 'А'], ['g', 'G', 'п', 'П'], ['h', 'H', 'р', 'Р'],
  ['j', 'J', 'о', 'О'], ['k', 'K', 'л', 'Л'], ['l', 'L', 'д', 'Д'], [';', ':', 'ж', 'Ж'],
  ['\'', '"', 'э', 'Э'], ['\\', '|', 'ё', 'Ё'], ['Enter', 'Enter']];
const codeKeys3 = ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF',
  'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'];
const keys4 = [['LShift', 'LShift'], ['`', '~', ']', '['], ['z', 'Z', 'я', 'Я'], ['x', 'X', 'ч', 'Ч'],
  ['c', 'C', 'с', 'С'], ['v', 'V', 'м', 'М'], ['b', 'B', 'и', 'И'], ['n', 'N', 'т', 'Т'],
  ['m', 'M', 'ь', 'Ь'], [',', '<', 'б', 'Б'], ['.', '>', 'ю', 'Ю'], ['/', '?', '/', '?'],
  ['RShift', 'RShift']];
const codeKeys4 = ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC',
  'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'];
const keys5 = [['LControl', 'LControl'], ['LAlt', 'LAlt'], ['LMeta', 'LMeta'],
  ['Spacebar', 'Spacebar'], ['RMeta', 'RMeta'], ['RAlt', 'RAlt'], ['RControl', 'RControl']];
const codeKeys5 = ['ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AtlRight', 'ControlRight'];
const keysAll = [keys1, keys2, keys3, keys4, keys5];
const codeKeysAll = [codeKeys1, codeKeys2, codeKeys3, codeKeys4, codeKeys5];
const flatKeysAll = keysAll.flat();

function createNewElement(tag, className, target, innerText) {
  const element = document.createElement(tag);
  if (className) element.classList.add(...className);
  if (target) target.append(element);
  if (innerText) element.innerText = innerText;
  return element;
}
function appendKeys(key, row, indexes) {
  const [i, j] = indexes;
  const [lower, upper, ruFirst, ruSecond] = key;
  const formattedClassNames = key.map((el) => `_${el === ' ' ? 'Spacebar' : el}_`);
  const elClasses = ['__key', ...formattedClassNames, `code_${codeKeysAll[i][j]}`];
  const element = createNewElement('div', elClasses, row);
  const text = createNewElement('h2', null, element);
  createNewElement('span', ['_lower'], text, lower);
  if (upper) createNewElement('span', ['_upper', 'invisible'], text, upper);
  if (ruFirst) createNewElement('span', ['_ruF', 'invisible'], text, ruFirst);
  if (ruSecond) createNewElement('span', ['_ruS', 'invisible'], text, ruSecond);
}
function chooseButton(buttons, event) {
  if (buttons.length === 1) return buttons;
  const res = buttons.find((button) => Array.from(button.classList).includes(`code_${event.code}`));
  return [res];
}
function findPressedButton(event, keyCaps) {
  let current;
  if (event.code === 'ShiftLeft') current = [keyCaps.find((el) => el.classList.value.includes('_LShift_'))];
  else if (event.code === 'ShiftRight') current = [keyCaps.find((el) => el.classList.value.includes('_RShift_'))];
  else if (event.code === 'AltLeft') current = [keyCaps.find((el) => el.classList.value.includes('_LAlt_'))];
  else if (event.code === 'AltRight') current = [keyCaps.find((el) => el.classList.value.includes('_RAlt_'))];
  else if (event.code === 'ControlLeft') current = [keyCaps.find((el) => el.classList.value.includes('_LControl_'))];
  else if (event.code === 'ControlRight') current = [keyCaps.find((el) => el.classList.value.includes('_RControl_'))];
  else if (event.code === 'MetaLeft') current = [keyCaps.find((el) => el.classList.value.includes('_LMeta_'))];
  else if (event.code === 'MetaRight') current = [keyCaps.find((el) => el.classList.value.includes('_RMeta_'))];
  else current = keyCaps.filter((el) => el.classList.value.includes(`_${event.key === ' ' ? 'Spacebar' : event.key}_`));
  if (!current.length) return null;
  current = chooseButton(current, event);
  return current;
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
        if (shiftStatus && capsLockStatus) lowerSpan.classList.remove('invisible');
        else if (shiftStatus || capsLockStatus) upperSpan.classList.remove('invisible');
        else lowerSpan.classList.remove('invisible');
      } else if (ruFirst && shiftStatus) {
        ruFirst.classList.add('invisible');
        upperSpan.classList.remove('invisible');
      }
    } else if (ruFirst && ruSecond) {
      lowerSpan.classList.add('invisible');
      upperSpan.classList.add('invisible');
      if (shiftStatus && capsLockStatus) ruFirst.classList.remove('invisible');
      else if (shiftStatus || capsLockStatus) ruSecond.classList.remove('invisible');
      else ruFirst.classList.remove('invisible');
    } else if (ruFirst && shiftStatus) {
      ruFirst.classList.remove('invisible');
      upperSpan.classList.add('invisible');
    }
  });
}
function capsLockChanger(event, keyboard) {
  capsLockStatus = !capsLockStatus;
  if (currentLang === 'en') {
    const lowerSpans = Array.from(keyboard.querySelectorAll('._lower'))
      .filter((key) => enAlphabet.includes(key.innerText));
    const upperSpans = Array.from(keyboard.querySelectorAll('._upper'))
      .filter((key) => enAlphabet.includes(key.innerText.toLowerCase()));
    const total = [...lowerSpans, ...upperSpans];
    total.forEach((key) => key.classList.toggle('invisible'));
  } else {
    const ruFirst = Array.from(keyboard.querySelectorAll('._ruF'))
      .filter((key) => ruAlphabet.includes(key.innerText));
    const ruSecond = Array.from(keyboard.querySelectorAll('._ruS'))
      .filter((key) => ruAlphabet.includes(key.innerText.toLowerCase()));
    const total = [...ruFirst, ...ruSecond];
    total.forEach((key) => key.classList.toggle('invisible'));
  }
}
function languageChanger(key, symbolKit) {
  const [kit] = symbolKit;
  if (key === 'Tab') return '\t';
  if (key === 'Enter') return '\n';
  if (invisibleSymbols.includes(key)) return '';
  const span = Array.from(kit.querySelectorAll('span'));
  const activeSpan = span.find((el) => !el.classList.value.includes('invisible'));
  return activeSpan.innerText;
  return 'test';
}
function shiftButtonHandler(event, keyboard, status) {
  if (shiftStatus === 2 && status === 'down') return;
  if (shiftStatus === 1 && status === 'up') return;
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
/* LANGUAGE BAR */
const languageBar = document.createElement('h1');
languageBar.innerText = currentLang;
body.append(languageBar);
keysAll.forEach((keys, index) => {
  const row = createNewElement('div', ['__row']);
  keys.forEach((key, i) => appendKeys(key, row, [index, i]));
  keyboard.append(row);
});

const keyCaps = Array.from(keyboard.querySelectorAll('.__key'));
document.addEventListener('keydown', (event) => {
  console.log('1keydown', event.key);
  if (event.ctrlKey && event.altKey) {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    languageBar.innerText = currentLang;
    keyboardLangChanger(keyboard);
  }
  const current = findPressedButton(event, keyCaps);
  if (current === null) return;
  current.forEach((cur) => cur.classList.add('active'));
  if (event.key === 'Backspace') {
    textarea.value = textarea.value.slice(0, -1);
    return;
  }
  if (event.key === 'Tab') { event.preventDefault(); }
  if (event.key === 'CapsLock') capsLockChanger(event, keyboard);
  if (event.key === 'Shift') {
    shiftStatus += 1;
    shiftButtonHandler(event, keyboard, 'down');
  }
  if (event.key === 'Delete' || event.key === 'Shift') return;
  textarea.value += languageChanger(event.key, current);
});
document.addEventListener('keyup', (event) => {
  console.log('keyup', event.key);
  if (event.key === 'CapsLock') {
    capsLockChanger(event, keyboard);
  }
  if (event.key === 'Shift') {
    shiftStatus -= 1;
    shiftButtonHandler(event, keyboard, 'up');
  }
  const current = findPressedButton(event, keyCaps);
  if (current === null) return;
  current.forEach((cur) => cur.classList.remove('active'));
});
