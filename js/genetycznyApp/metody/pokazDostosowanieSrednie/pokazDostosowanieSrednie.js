const createRow = (isHead, values) => {
  const elemName = isHead ? 'th' : 'td';
  const tr = document.createElement('tr');
  const c1 = document.createElement(elemName);
  const c2 = document.createElement(elemName);
  const elems = {c1, c2};
  values.forEach((value, idx) => elems[`c${idx + 1}`].textContent = value);
  Object.keys(elems).forEach(elem => tr.appendChild(elems[elem]));
  return tr;
}

function pokazDostosowanieSrednie(nrPokolenia, rootNode, dostosowanie, dane, table, nrBadania) {
  const { suwakPuli: pula } = dane;
  const context = document.getElementById(`wyniki_${nrBadania}`);
  if (nrPokolenia === 1) {
    const thead = document.createElement('thead');
    const headNames = ['Nr pokolenia', 'Średnia wartość funkcji dostosowania']
    const row = createRow(true, headNames);
    thead.appendChild(row);
    table.appendChild(thead);
  }
  let srednia = 0;
  let j = 0;
  for (j; j < pula; j++) {
    srednia += dostosowanie[j];
  }
  const wynik = + (srednia / pula).toFixed(4);
  const names = [nrPokolenia, wynik];
  const row = createRow(false, names);
  table.appendChild(row);
  context.appendChild(table);
  return wynik;
}

export default pokazDostosowanieSrednie;
