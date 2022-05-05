let currentLang = window.localStorage.getItem('lang') ?? 'en';
let capsLockStatus = false;
let shiftStatus = false;
const GitURL = 'https://github.com/bmspd';
const invisibleSymbols = ['Control', 'CapsLock', 'Alt',
  'Shift', 'Delete', 'Backspace', 'Tab', 'Meta', 'ArrowUp',
  'ArrowLeft', 'ArrowDown', 'ArrowRight'];
const enAlphabet = 'qwertyuiopasdfghjklzxcvbnm';
const ruAlphabet = 'йцукенгшщзхъфывапролджэёячсмитьбю';
const keys1 = [['§', '±', '>', '<'], ['1', '!'], ['2', '@', '"'], ['3', '#', '№'],
  ['4', '$', '%'], ['5', '%', ':'], ['6', '^', ','], ['7', '&', '.'],
  ['8', '*', ';'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Backspace', 'Backspace'], ['Git', 'Git']];
const codeKeys1 = ['Backquote', 'Digit1', 'Digit2',
  'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7',
  'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Git'];
const keys2 = [['Tab', 'Tab'], ['q', 'Q', 'й', 'Й'], ['w', 'W', 'ц', 'Ц'], ['e', 'E', 'у', 'У'],
  ['r', 'R', 'к', 'К'], ['t', 'T', 'е', 'Е'], ['y', 'Y', 'н', 'Н'], ['u', 'U', 'г', 'Г'],
  ['i', 'I', 'ш', 'Ш'], ['o', 'O', 'щ', 'Щ'], ['p', 'P', 'з', 'З'], ['[', '{', 'х', 'Х'],
  [']', '}', 'ъ', 'Ъ'], ['Delete', 'Delete'], ['Lan', 'Lan']];
const codeKeys2 = ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR',
  'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete', 'Lan'];
const keys3 = [['CapsLock', 'CapsLock'], ['a', 'A', 'ф', 'Ф'], ['s', 'S', 'ы', 'Ы'],
  ['d', 'D', 'в', 'В'], ['f', 'F', 'а', 'А'], ['g', 'G', 'п', 'П'], ['h', 'H', 'р', 'Р'],
  ['j', 'J', 'о', 'О'], ['k', 'K', 'л', 'Л'], ['l', 'L', 'д', 'Д'], [';', ':', 'ж', 'Ж'],
  ['\'', '"', 'э', 'Э'], ['\\', '|', 'ё', 'Ё'], ['Enter', 'Enter']];
const codeKeys3 = ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF',
  'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'];
const keys4 = [['Shift', 'Shift'], ['`', '~', ']', '['], ['z', 'Z', 'я', 'Я'], ['x', 'X', 'ч', 'Ч'],
  ['c', 'C', 'с', 'С'], ['v', 'V', 'м', 'М'], ['b', 'B', 'и', 'И'], ['n', 'N', 'т', 'Т'],
  ['m', 'M', 'ь', 'Ь'], [',', '<', 'б', 'Б'], ['.', '>', 'ю', 'Ю'], ['/', '?', '/', '?'],
  ['Shift', 'Shift'], ['⤒', '⤒'], ['♺', '♺']];
const codeKeys4 = ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC',
  'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ArrowUp'];
const keys5 = [['Ctrl', 'Ctrl'], ['⌥', '⌥'], ['⌘', '⌘'],
  ['Spacebar', 'Spacebar'], ['⌘', '⌘'], ['⌥', '⌥'], ['Ctrl', 'Ctrl'],
  ['➜', '➜'], ['⤓', '⤓'], ['➜', '➜']];
const codeKeys5 = ['ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight',
  'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
const keysAll = [keys1, keys2, keys3, keys4, keys5];
const codeKeysAll = [codeKeys1, codeKeys2, codeKeys3, codeKeys4, codeKeys5];

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
  if (event.code === 'ShiftLeft') current = [keyCaps.filter((el) => el.classList.value.includes('_Shift_'))[0]];
  else if (event.code === 'ShiftRight') current = [keyCaps.filter((el) => el.classList.value.includes('_Shift_'))[1]];
  else if (event.code === 'AltLeft') current = [keyCaps.filter((el) => el.classList.value.includes('_⌥_'))[0]];
  else if (event.code === 'AltRight') current = [keyCaps.filter((el) => el.classList.value.includes('_⌥_'))[1]];
  else if (event.code === 'ControlLeft') current = [keyCaps.filter((el) => el.classList.value.includes('_Ctrl_'))[0]];
  else if (event.code === 'ControlRight') current = [keyCaps.filter((el) => el.classList.value.includes('_Ctrl_'))[1]];
  else if (event.code === 'MetaLeft') current = [keyCaps.filter((el) => el.classList.value.includes('⌘'))[0]];
  else if (event.code === 'MetaRight') current = [keyCaps.filter((el) => el.classList.value.includes('⌘'))[1]];
  else if (event.code === 'ArrowUp') current = [keyCaps.find((el) => el.classList.value.includes('_⤒_'))];
  else if (event.code === 'ArrowLeft') current = [keyCaps.filter((el) => el.classList.value.includes('_➜_'))[0]];
  else if (event.code === 'ArrowDown') current = [keyCaps.find((el) => el.classList.value.includes('_⤓_'))];
  else if (event.code === 'ArrowRight') current = [keyCaps.filter((el) => el.classList.value.includes('_➜_'))[1]];
  else if (event.code === '♺') console.log('hello');
  else current = keyCaps.filter((el) => el.classList.value.includes(`_${event.key === ' ' ? 'Spacebar' : event.key}_`));
  if (!current.length) return null;
  current = chooseButton(current, event);
  return current;
}
function keyboardLangChanger(keyboard) {
  const keyboardKeys = Array.from(keyboard.querySelectorAll('.__key'));
  const flag = keyboardKeys.find((el) => el.classList.contains('_Lan_'));
  keyboardKeys.forEach((key) => {
    const lowerSpan = key.querySelector('._lower');
    const upperSpan = key.querySelector('._upper');
    const ruFirst = key.querySelector('._ruF');
    const ruSecond = key.querySelector('._ruS');
    if (currentLang === 'ru') flag.style.backgroundImage = 'url("/img/russia.png")';
    if (currentLang === 'en') {
      flag.style.backgroundImage = 'url("/img/united-kingdom.png")';
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
  if (key === ' ') return ' ';
  if (invisibleSymbols.includes(key)) return '';
  const span = Array.from(kit.querySelectorAll('span'));
  const activeSpan = span.find((el) => !el.classList.value.includes('invisible'));
  return activeSpan.innerText;
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
languageBar.classList.add('__lang-bar');
languageBar.innerText = `Current language is ${currentLang}`;
body.append(languageBar);
createNewElement('h1', '', body, 'Keyboard was made in MacOS system');
createNewElement('h1', '', body, 'To switch language press CONTROL + OPTION\nor CTRL + ALT on WIN');
createNewElement('h2', '', body, 'Click on ♺ if you want to clear textarea field');
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
    window.localStorage.setItem('lang', currentLang);
    languageBar.innerText = `Current language is ${currentLang}`;
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
  const newSymbol = languageChanger(event.key, current);
  if (newSymbol === '♺') textarea.value = '';
  else if (newSymbol === 'Lan') {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    window.localStorage.setItem('lang', currentLang);
    languageBar.innerText = `Current language is ${currentLang}`;
    keyboardLangChanger(keyboard);
  } else if (newSymbol === 'Git') window.open(GitURL, 'blank');
  else textarea.value += newSymbol;
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
keyboardLangChanger(keyboard);
const keyDivs = document.querySelectorAll('.__key');
keyDivs.forEach((key) => {
  const code = Array.from(key.classList).find((el) => el.includes('code')).slice(5);
  let customKey = '';
  if (code === 'ShiftLeft' || code === 'ShiftRight') customKey = 'Shift';
  else if (code === 'CapsLock') customKey = 'CapsLock';
  else if (code === 'Tab') customKey = 'Tab';
  else if (code === 'Backspace') customKey = 'Backspace';
  else if (code === 'ControlLeft' || code === 'ControlRight') customKey = 'Control';
  else if (code === 'AltLeft' || code === 'AltRight') customKey = 'Alt';
  else if (code === 'MetaLeft' || code === 'MetaRight') customKey = 'Meta';
  else if (code === 'Delete') customKey = 'Delete';
  else if (code === 'Enter') customKey = 'Enter';
  else if (code === 'ArrowRight') customKey = 'ArrowRight';
  else if (code === 'ArrowLeft') customKey = 'ArrowLeft';
  else if (code === 'ArrowDown') customKey = 'ArrowDown';
  else if (code === 'ArrowUp') customKey = 'ArrowUp';
  else customKey = undefined;
  const keyDown = new KeyboardEvent('keydown', { code, key: customKey });
  const keyUp = new KeyboardEvent('keyup', { code, key: customKey });
  key.addEventListener('mousedown', () => {
    if (code === 'CapsLock' && key.classList.contains('active')) {
      document.dispatchEvent(keyUp);
      return;
    }
    document.dispatchEvent(keyDown);
  });
  key.addEventListener('mouseup', () => {
    if (code === 'CapsLock') return;
    document.dispatchEvent(keyUp);
  });
});
