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

const keys = [['1'], ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8'], ['9'], ['0']];
const row = document.createElement('div');
row.classList.add('__row');
keys.forEach((key) => {
  const element = document.createElement('div');
  element.classList.add('__key', `_${key}`);
  const text = document.createElement('h2');
  text.innerText = key[0];
  element.append(text);
  row.append(element);
});
keyboard.append(row);

const keyCaps = Array.from(keyboard.querySelectorAll('.__key'));
console.log(keyCaps[0].classList.value);
document.addEventListener('keydown', (event) => {
  console.log(event.key);
  const current = keyCaps.find((el) => el.classList.value.includes(`_${event.key}`));
  if (!current) return;
  current.classList.add('active');
  if (event.altKey) {
    console.log('hello');
  }
  if (event.shiftKey) {
    console.log('shift');
  }
  if (event.key === 'Tab') event.preventDefault();
  if (event.key === 'Backspace') {
    textarea.value = textarea.value.slice(0, -1);
    return;
  }
  textarea.value += event.key;
});
document.addEventListener('keyup', (event) => {
  const current = keyCaps.find((el) => el.classList.value.includes(`_${event.key}`));
  if (!current) return;
  current.classList.remove('active');
});
