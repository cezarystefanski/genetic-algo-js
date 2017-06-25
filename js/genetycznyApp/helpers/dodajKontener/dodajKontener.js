function dodajKontener(defaults, nrBadania = 'srednia') {
  const { wynikiNode } = defaults;
  const div = document.createElement('div');
  const table = document.createElement('table');
  div.id = `wyniki_${nrBadania}`;
  div.classList.add('tabcontent')
  div.appendChild(table);
  const wyniki = document.getElementById(wynikiNode);
  wyniki.appendChild(div);

  return {
    table,
    div
  };
}

export default dodajKontener;
