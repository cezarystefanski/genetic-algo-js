import { losujBaze, pokazPopulacje, bootstrapSliders, bootstrapButton } from './helpers/';
import { losujPopulacja, obliczFenotypy, obliczDostosowanie } from './metody/';
import * as defaults from './defaults/';

const runApp = (store) => {
  let numerPokolenia = 1;
  const storeKeys = Object.keys(store);
  const dane = storeKeys.reduce((accumulator, key) => {
    accumulator[key] = store[key].value;
    return accumulator;
  }, {});

  const baza = losujBaze(dane);
  const populacja = losujPopulacja(dane);
  const fenotypy = obliczFenotypy(populacja, dane);
  const dostosowanie = obliczDostosowanie(fenotypy, dane);
  console.log(dostosowanie);
}

const App = () => {
  const suwaki = bootstrapSliders(defaults);
  const button = bootstrapButton(defaults);
  button.addEventListener('click', () => runApp(suwaki));
}

export default App;
