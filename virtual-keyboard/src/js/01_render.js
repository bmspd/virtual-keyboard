const body = document.querySelector('body');

const h1 = document.createElement('h1');
h1.innerText = 'VIRTUAL KEYBOARD';
body.append(h1);

const textarea = document.createElement('textarea');
body.append(textarea);


console.log(body);