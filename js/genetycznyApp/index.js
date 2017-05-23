import {
  losujBaze,
  pokazPopulacje,
  bootstrapSliders,
  bootstrapButton
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

const runApp = (store, rootNode) => {
  let numerPokolenia = 1;
  const storeKeys = Object.keys(store);
  const dane = storeKeys.reduce((accumulator, key) => {
    accumulator[key] = store[key].value;
    return accumulator;
  }, {});

  //console.info(dane);

  const wyniki = [];
  const baza = losujBaze(dane);
  // debugger;
  const populacja = losujPopulacja(dane);
  //console.log(populacja);
  const fenotypy = obliczFenotypy(populacja, dane);
  //console.log(fenotypy);
  const dostosowanie = obliczDostosowanie(fenotypy, dane);
  //console.log(dostosowanie);
  wyniki.push(pokazDostosowanieSrednie(numerPokolenia, rootNode, dostosowanie, dane));
  let populacjaCykl = populacja;
  let dostosowanieCykl = dostosowanie;
  while(numerPokolenia < dane.suwakPokolen) {
    const noweDostosowanie = dostosowanieNormalizacja(dostosowanieCykl, dane);
    // console.warn(populacjaCykl);
    const {nowaPopulacja, nowePokolenie} = ruletka(noweDostosowanie, dane, populacjaCykl);
    const populacjaPoKrzyzowaniu = krzyzowanie(nowaPopulacja, dane);
    const populacjaPoMutacji = mutacje(populacjaPoKrzyzowaniu, dane);
    populacjaCykl = populacjaPoMutacji;
    const noweFenotypy = obliczFenotypy(populacjaPoMutacji, dane);
    const dostosowaniePoMutacji = obliczDostosowanie(noweFenotypy, dane);
    dostosowanieCykl = dostosowaniePoMutacji
    numerPokolenia += 1;
    wyniki.push(pokazDostosowanieSrednie(numerPokolenia, rootNode, dostosowaniePoMutacji, dane));
  }
  console.log(wyniki);
}

const App = () => {
  const suwaki = bootstrapSliders(defaults);
  const button = bootstrapButton(defaults);
  const { rootNode } = defaults;
  button.addEventListener('click', () => runApp(suwaki, rootNode));
}

export default App;
