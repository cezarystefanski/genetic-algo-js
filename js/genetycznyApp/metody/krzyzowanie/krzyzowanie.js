function krzyzowanie(populacja, dane) {
  // srand(pobierz_baze());
  //    //losowanie par osobników do krzy¿owania
  //    int liczba_par=pula/2;
  //    int losowe_pary[liczba_par];
  //    for(int i=0;i<liczba_par;i++)
  //      losowe_pary[i]=rand()%100;
  //    //losowanie miejsc krzy¿owania dla par
  //    int losowe_miejsca[liczba_par];
  //    for(int i=0;i<liczba_par;i++)
  //      losowe_miejsca[i]=rand()%(N-2);
  //    //proces krzy¿owania genów w parach
  //    int pierwszy=0; //indeks pierwszego osobnika w ka¿dej parze
  //    int bufor;
  //    for(int para=0;para<liczba_par;para++)
  //      { if(losowe_pary[para]<pk*100)
  //          for(int i=losowe_miejsca[para];i<N;i++)
  //            { bufor=POPULACJA[pierwszy][i];
  //              POPULACJA[pierwszy][i]=POPULACJA[pierwszy+1][i];
  //              POPULACJA[pierwszy+1][i]=bufor;
  //            }
  //        pierwszy+=2;
  //      } 
  const { suwakPuli: pula, suwakGenow: liczbaGenow, suwakKrzyzowania: pk } = dane;
  const liczbaPar = pula / 2;
  let i = 0;
  const losowePary = [];
  for (i; i < liczbaPar; i += 1) {
    losowePary[i] = Math.random() * 10000 % 100;
  }
  const losoweMiejsca = [];
  let j = 0;
  for (j; j < liczbaPar; j += 1) {
    losoweMiejsca[j] = Math.random() * 10000 % (liczbaGenow - 2);
  }
  let pierwszy = 0;
  let para = 0;
  let bufor;
  const populacjaPoKrzyzowaniu = [];
  //debugger;
  for (para; para < liczbaPar; para += 1) {
    populacjaPoKrzyzowaniu[pierwszy] = populacja[pierwszy];
    populacjaPoKrzyzowaniu[pierwszy + 1] = populacja[pierwszy + 1];
    if (losowePary[para] < pk * 100) {
      let k = Math.floor(losoweMiejsca[para]);
      for (k; k < liczbaGenow; k += 1) {
        bufor = populacja[pierwszy][k];
        populacjaPoKrzyzowaniu[pierwszy][k] = populacja[pierwszy + 1][k];
        populacjaPoKrzyzowaniu[pierwszy + 1][k] = bufor;
      }
    }
    pierwszy += 2;
  }
  return populacjaPoKrzyzowaniu;
}

export default krzyzowanie;
