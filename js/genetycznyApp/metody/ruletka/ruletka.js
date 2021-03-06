function ruletka(dostosowanie, dane, populacja) {
  const { suwakGenow: liczbaGenow, suwakPuli: pula } = dane;
  //console.log(dostosowanie);
  const sumaDostosowanie = dostosowanie.reduce((acc, val) => {return acc + val}, 0);
  //console.log(sumaDostosowanie);
  const tablicaNi = dostosowanie.map((elem) => elem / sumaDostosowanie * Math.pow(2, liczbaGenow));
  //console.log(tablicaNi);
  let i = 0;
  const losowe = [];
  const ruletka = [];
  let pozycja = 0;
  for (i; i < pula; i += 1) {
    losowe[i] = Math.random() * 10000 % Math.pow(2, liczbaGenow);
    pozycja += tablicaNi[i];
    ruletka[i] = pozycja;
  }

  const nowePokolenie = [];

  let l1 = 0;
  for (l1; l1 < pula; l1 += 1) {
    nowePokolenie[l1] = [];
    let l2 = 0;
    while (losowe[l1] > ruletka[l2]) {
      l2 += 1;
    }
    let l3 = 0;
    for (l3; l3 < liczbaGenow; l3 += 1) {
      nowePokolenie[l1][l3] = populacja[l2][l3];
    }
  }

  const nowaPopulacja = [];
  
  let k1 = 0;
  for(k1; k1 < pula; k1 += 1) {
    nowaPopulacja[k1] = [];
    let k2 = 0;
    for(k2; k2 < liczbaGenow; k2 += 1) {
      nowaPopulacja[k1][k2] = nowePokolenie[k1][k2];
    }
  }
  return { nowaPopulacja, nowePokolenie };
}

export default ruletka;
