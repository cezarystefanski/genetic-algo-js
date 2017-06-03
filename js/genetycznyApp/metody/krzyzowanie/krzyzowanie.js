function krzyzowanie(populacja, dane) {
  const { suwakPuli: pula, suwakGenow: liczbaGenow, suwakKrzyzowania: pk, checkerKrzyzowania: disable } = dane;
  const liczbaPar = pula / 2;
  const krzyzowanie = disable ? 0 : pk;
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
  for (para; para < liczbaPar; para += 1) {
    populacjaPoKrzyzowaniu[pierwszy] = populacja[pierwszy];
    populacjaPoKrzyzowaniu[pierwszy + 1] = populacja[pierwszy + 1];
    if (losowePary[para] < krzyzowanie * 100) {
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
