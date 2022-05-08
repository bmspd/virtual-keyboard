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
/**
 * Creating new element in DOM-tree
 * @param {string} tag - tag of the new element(h1,div, etc...)
 * @param {string[] | null } [className] - list of classes which will appear at new element
 * @param {HTMLElement | null } [target] - where we should append our element
 * @param {string | null} [innerText] - inner text inside element tags
 * @return {HTMLElement}
 * */
function createNewElement(tag, className, target, innerText) {
  const element = document.createElement(tag);
  if (className) element.classList.add(...className);
  if (target) target.append(element);
  if (innerText) element.innerText = innerText;
  return element;
}
/**
 * Appending all our keyboard keys for needed row
 * @param {string[]} key - associative array of symbols on one key
 * @param {HTMLElement} row - row element
 * @param {number[]} indexes - indexes to help associate with prepared keyCodes array
 * */
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
/**
 * Choosing current button if there can be intersections in symbols
 * e.g. ru: SHIFT + 2 = " and en: SHIFT + ' = "
 * @param {HTMLElement[]} buttons - elements which should be reduced to one correct
 * @param {KeyboardEvent} event - keyboard event which occurred
 * @return {HTMLElement[]} - still returning array but only with one element
 *                            (looks like bad code implementation)
 * */
function chooseButton(buttons, event) {
  if (buttons.length === 1) return buttons;
  const res = buttons.find((button) => Array.from(button.classList).includes(`code_${event.code}`));
  return [res];
}
/**
 * Searching pressed key on our virtual keyboard
 * @param {KeyboardEvent} event - keyboard event which occurred
 * @param {HTMLElement[]} keyCaps - keyboard keys HTML elements
 * @return {HTMLElement[] | null} - array with one element or nothing if failed to find
* */
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
  else current = keyCaps.filter((el) => el.classList.value.includes(`_${event.key === ' ' ? 'Spacebar' : event.key}_`));
  if (!current.length) return null;
  current = chooseButton(current, event);
  return current;
}
/**
 * Changing current keyboard language
 * @param {HTMLElement} keyboard
 * */
function keyboardLangChanger(keyboard) {
  const keyboardKeys = Array.from(keyboard.querySelectorAll('.__key'));
  const flag = keyboardKeys.find((el) => el.classList.contains('_Lan_'));
  keyboardKeys.forEach((key) => {
    const lowerSpan = key.querySelector('._lower');
    const upperSpan = key.querySelector('._upper');
    const ruFirst = key.querySelector('._ruF');
    const ruSecond = key.querySelector('._ruS');
    if (currentLang === 'ru') flag.style.backgroundImage = 'url("./img/russia.png")';
    if (currentLang === 'en') {
      flag.style.backgroundImage = 'url("./img/united-kingdom.png")';
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
/**
 * Handle CAPSLOCK button, changes ONLY letters at keyboard
 * @param {HTMLElement} keyboard - keyboard HTML element
 * */
function capsLockChanger(keyboard) {
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
/**
 * this foo is transliterating our symbols,
 * e.g. user system language is RUSSIAN, but keyboard is ENGLISH
 * @param {string} key - event.key
 * @param {HTMLElement[]} symbolKit - array with one element (not as good as could be)
 * @returns {string} - needed symbol wich will appear in textarea
 * */
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
/**
 * handle pressing SHIFT, there all symbols should change, not only letters
 * @param {KeyboardEvent} event - keyboard event which occurred
 * @param {HTMLElement} keyboard - keyboard HTML element
 * @param {string} status - keydown or keyup occurred
 * */
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
  const codes = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
  if (codes.includes(event.code)) return;
  event.preventDefault();
});
body.append(textarea);
textarea.focus();
const keyboard = document.createElement('div');
keyboard.classList.add('__keyboard');
body.append(keyboard);
/* LANGUAGE BAR */
const languageBar = document.createElement('h1');
languageBar.classList.add('__lang-bar');
languageBar.innerText = `Current language is ${currentLang}`;
body.append(languageBar);
createNewElement('h2', null, body, 'Keyboard was made in MacOS system');
createNewElement('h2', null, body, 'To switch language press CONTROL + OPTION(⌥) or CTRL + ALT on WIN');
createNewElement('h2', null, body, 'Also to change current language click on flag button');
createNewElement('h2', null, body, 'Click on ♺ if you want to clear textarea field');
createNewElement('h2', null, body, 'Optimal screen width should start from 1240 px :)');

keysAll.forEach((keys, index) => {
  const row = createNewElement('div', ['__row']);
  keys.forEach((key, i) => appendKeys(key, row, [index, i]));
  keyboard.append(row);
});

const keyCaps = Array.from(keyboard.querySelectorAll('.__key'));
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.altKey) {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    window.localStorage.setItem('lang', currentLang);
    languageBar.innerText = `Current language is ${currentLang}`;
    keyboardLangChanger(keyboard);
  }
  const current = findPressedButton(event, keyCaps);
  if (current === null) return;
  current.forEach((cur) => cur.classList.add('active'));
  if (event.key === 'Backspace' && textarea.selectionStart) {
    const start = textarea.selectionStart - 1;
    const currentCharArray = textarea.value.split('');
    currentCharArray.splice(textarea.selectionStart - 1, 1);
    textarea.value = currentCharArray.join('');
    textarea.setSelectionRange(start, start);
    return;
  }
  if (event.key === 'Delete') {
    const start = textarea.selectionStart;
    const currentCharArray = textarea.value.split('');
    currentCharArray.splice(textarea.selectionStart, 1);
    textarea.value = currentCharArray.join('');
    textarea.setSelectionRange(start, start);
    return;
  }
  if (event.code === 'Space') {
    textarea.value += ' ';
    return;
  }
  if (event.key === 'Tab') { event.preventDefault(); }
  if (event.key === 'CapsLock') capsLockChanger(keyboard);
  if (event.key === 'Shift') {
    shiftStatus += 1;
    shiftButtonHandler(event, keyboard, 'down');
  }
  if (event.key === 'Delete' || event.key === 'Shift'
      || event.code === 'ArrowLeft' || event.code === 'ArrowRight'
    || event.code === 'ArrowUp' || event.code === 'ArrowDown') return;
  const newSymbol = languageChanger(event.key, current);

  if (newSymbol === '♺') textarea.value = '';
  else if (newSymbol === 'Lan') {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    window.localStorage.setItem('lang', currentLang);
    languageBar.innerText = `Current language is ${currentLang}`;
    keyboardLangChanger(keyboard);
  } else if (newSymbol === 'Git') window.open(GitURL, 'blank');
  else {
    const start = textarea.selectionStart + 1;
    textarea.value = textarea.value.slice(0, start - 1)
        + newSymbol + textarea.value.slice(start - 1);
    textarea.setSelectionRange(start, start);
    // textarea.value += newSymbol;
  }
});
document.addEventListener('keyup', (event) => {
  if (event.key === 'CapsLock') {
    capsLockChanger(keyboard);
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
  let customKey;
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
  key.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const fakePress = Array.from(keyDivs).find(el => el.classList.contains(`code_${code}`))
    fakePress.classList.add('fake-active')
    if (code === 'CapsLock' && key.classList.contains('active')) {
      document.dispatchEvent(keyUp);
      return;
    }
    if (keyDown.code === 'ArrowLeft' && textarea.selectionStart) {
      textarea.setSelectionRange(textarea.selectionStart - 1, textarea.selectionStart - 1);
    }
    if (keyDown.code === 'ArrowRight') {
      textarea.setSelectionRange(textarea.selectionStart + 1, textarea.selectionStart + 1);
    }
    if (keyDown.code === 'ArrowUp') {
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
    if (keyDown.code === 'ArrowDown') {
      textarea.setSelectionRange(0, 0);
    }
    document.dispatchEvent(keyDown);
  });
  key.addEventListener('mouseup', () => {
    if (code === 'CapsLock') return;
    document.dispatchEvent(keyUp);
  });
});
document.addEventListener('mouseup', () => {
  const fakePress = Array.from(keyDivs).find(el => el.classList.contains(`fake-active`))
  if (!fakePress) return
  if (fakePress.classList.contains('code_CapsLock')) return
  fakePress.classList.remove('fake-active')
  fakePress.classList.remove('active')
})