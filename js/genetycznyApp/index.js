import {
  losujBaze,
  pokazPopulacje,
  bootstrapSliders,
  bootstrapButton,
  visualizeData,
  bootstrapReset
} from './helpers/';

import {
  losujPopulacja,
  obliczFenotypy,
  obliczDostosowanie,
  pokazDostosowanieSrednie,
  dostosowanieNormalizacja,
  ruletka,
  krzyzowanie,
  mutacje
} from './metody/';

import * as defaults from './defaults/';

const runApp = (store, rootNode, nrBadania) => {
  let numerPokolenia = 1;
  const storeKeys = Object.keys(store);
  const dane = storeKeys.reduce((accumulator, key) => {
    if (store[key].getAttribute('type') === 'checkbox') {
      accumulator[key] = store[key].checked;
      return accumulator;
    }
    accumulator[key] = store[key].value;
    return accumulator;
  }, {});
  console.log(dane);

  const div = document.createElement('div');
  const table = document.createElement('table');
  div.id = `wyniki_${nrBadania}`;
  div.appendChild(table);
  const wynikiNode = document.getElementById('wyniki');
  wynikiNode.appendChild(div);
  const wyniki = [];
  const baza = losujBaze(dane);
  const populacja = losujPopulacja(dane);
  const fenotypy = obliczFenotypy(populacja, dane);
  const dostosowanie = obliczDostosowanie(fenotypy, dane);
  wyniki.push(pokazDostosowanieSrednie(numerPokolenia, rootNode, dostosowanie, dane, table, nrBadania));
  let populacjaCykl = populacja;
  let dostosowanieCykl = dostosowanie;
  while(numerPokolenia < dane.suwakPokolen) {
    const noweDostosowanie = dostosowanieNormalizacja(dostosowanieCykl, dane);
    const {nowaPopulacja, nowePokolenie} = ruletka(noweDostosowanie, dane, populacjaCykl);
    const populacjaPoKrzyzowaniu = krzyzowanie(nowaPopulacja, dane);
    const populacjaPoMutacji = mutacje(populacjaPoKrzyzowaniu, dane);
    populacjaCykl = populacjaPoMutacji;
    const noweFenotypy = obliczFenotypy(populacjaPoMutacji, dane);
    const dostosowaniePoMutacji = obliczDostosowanie(noweFenotypy, dane);
    dostosowanieCykl = dostosowaniePoMutacji;
    numerPokolenia += 1;
    wyniki.push(pokazDostosowanieSrednie(numerPokolenia, rootNode, dostosowaniePoMutacji, dane, table, nrBadania));
  }
  visualizeData(wyniki, nrBadania, defaults);
  console.log(wyniki);
  return wyniki;
}

const App = () => {
  const suwaki = bootstrapSliders(defaults);
  const button = bootstrapButton(defaults);
  const reset = bootstrapReset(defaults);
  const { rootNode } = defaults;
  button.addEventListener('click', () => {
    let nrBadania = 1;
    const wynikiBadan = [];
    const wyniki = document.getElementById('wyniki');
    wyniki.innerHTML = '';
    for (nrBadania; nrBadania <= suwaki.suwakBadan.value; nrBadania++) {
      wynikiBadan.push(runApp(suwaki, rootNode, nrBadania));
    }
    console.log(wynikiBadan);
    if (suwaki.suwakBadan.value > 1) {
      for (let i = 0; i < suwaki.suwakPokolen.value; i++) {
        <
      }
      wynikiBadan.reduce((wyniki) => {

      });
    }
  });
  reset.addEventListener('click', () => document.location.reload());
}

export default App;
