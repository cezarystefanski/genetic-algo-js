import { rootNode } from '../../defaults/';

function addConsoleLine(text) {
  const root = document.getElementById(rootNode);
  const p = document.createElement('p');
  p.textContent = text;
  root.appendChild(p);
  console.log(text);
}

export default addConsoleLine;
