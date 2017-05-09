import { losujBaze, pokazPopulacje, bootstrapSliders, bootstrapButton } from './helpers/';
import { losujPopulacja, obliczFenotypy, obliczDostosowanie, pokazDostosowanieSrednie, dostosowanieNormalizacja, ruletka, krzyzowanie } from './metody/';
import * as defaults from './defaults/';

const runApp = (store, rootNode) => {
  let numerPokolenia = 1;
  const storeKeys = Object.keys(store);
  const dane = storeKeys.reduce((accumulator, key) => {
    accumulator[key] = store[key].value;
    return accumulator;
  }, {});

  console.info(dane);

  const baza = losujBaze(dane);
  debugger;
  const populacja = losujPopulacja(dane);
  const fenotypy = obliczFenotypy(populacja, dane);
  const dostosowanie = obliczDostosowanie(fenotypy, dane);
  pokazDostosowanieSrednie(numerPokolenia, rootNode, dostosowanie, dane);
  while(numerPokolenia < dane.suwakPokolen) {
    const noweDostosowanie = dostosowanieNormalizacja(dostosowanie, dane);
    const {nowaPopulacja, nowePokolenie} = ruletka(noweDostosowanie, dane, populacja);
    const populacjaPoKrzyzowaniu = krzyzowanie(nowaPopulacja, dane);
    console.log(populacjaPoKrzyzowaniu);
    numerPokolenia += 1;
  }
}

const App = () => {
  const suwaki = bootstrapSliders(defaults);
  const button = bootstrapButton(defaults);
  const { rootNode } = defaults;
  button.addEventListener('click', () => runApp(suwaki, rootNode));
}

export default App;
