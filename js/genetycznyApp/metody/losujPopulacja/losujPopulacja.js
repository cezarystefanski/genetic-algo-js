import losujChromosom from '../losujChromosom/';

function losujPopulacja(dane) {
  const { suwakPuli: pula, suwakGenow: liczbaGenow } = dane;
  let i = 0;
  let populacja = [];
  for (i; i < pula; i+= 1) {
    populacja[i] = losujChromosom(liczbaGenow);
  }
  return populacja;
}

export default losujPopulacja;
