import fenotyp from './fenotyp';

function obliczFenotypy(populacja, dane) {
  const {
    suwakPuli: pula,
    suwakWartoscPoczatkowa: a,
    suwakWartoscKoncowa: b,
    suwakGenow: liczbaGenow
  } = dane;

  let i = 0;
  const fenotypy = [];
  for (i; i < pula; i += 1) {
    fenotypy[i] = + (+ a + (b - a) * fenotyp(populacja[i], liczbaGenow) / Math.pow(2, liczbaGenow)).toFixed(4);
  }
  return fenotypy;
}

export default obliczFenotypy;
