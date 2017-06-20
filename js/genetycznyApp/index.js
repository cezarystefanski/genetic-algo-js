import {
  losujBaze,
  pokazPopulacje,
  bootstrapSliders,
  bootstrapButton,
  visualizeData,
  bootstrapReset,
  uruchomBadania,
  dodajKontener
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

  const { table, div } = dodajKontener(defaults, nrBadania);
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
  visualizeData(wyniki, div, nrBadania);
  return wyniki;
}

const App = () => {
  const suwaki = bootstrapSliders(defaults);
  const button = bootstrapButton(defaults);
  const reset = bootstrapReset(defaults);
  const { rootNode } = defaults;
  button.addEventListener('click', () => {
    const srednieWyniki = uruchomBadania(suwaki, defaults, runApp);
    const { div } = dodajKontener(defaults);
    visualizeData(srednieWyniki, div);
  });
  reset.addEventListener('click', () => document.location.reload());
}

export default App;
