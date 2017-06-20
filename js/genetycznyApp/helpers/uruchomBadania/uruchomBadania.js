import { zip as _zip } from 'lodash';

function uruchomBadania(suwaki, defaults, runApp) {
  const { rootNode } = defaults;
  const { suwakBadan: { value: iloscBadan } } = suwaki;
  let nrBadania = 1;
  const wynikiBadan = [];
  const wyniki = document.getElementById('wyniki');
  wyniki.innerHTML = '';
  for (nrBadania; nrBadania <= iloscBadan; nrBadania++) {
    wynikiBadan.push(runApp(suwaki, rootNode, nrBadania));
  }
  const zippedWyniki = _zip(...wynikiBadan);
  const srednieWyniki = zippedWyniki.map(wyniki => {
    return wyniki.reduce((acc, curr) => acc + curr, 0) / wyniki.length;
  });
  return srednieWyniki;
}

export default uruchomBadania;