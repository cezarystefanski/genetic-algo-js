// Globalne struktury danych
const liczbaPokolen = 60;
const wartoscPoczatkowa = 0.5;
const wartoscKoncowa = 2.5;
const liczbaGenow = 11;
const power2N = Math.pow(2, liczbaGenow);
const pula = 20;
const prawdKrzyzowania = 0.75;
const prawdMutacji = 0.01;
const populacja = [];
const nowePokolenie = [];
const fenotypy = [];
const dostosowanie = [];
const rootNode = 'app';

let numerPokolenia = 1;

export {
  liczbaPokolen,
  wartoscPoczatkowa,
  wartoscKoncowa,
  liczbaGenow,
  power2N,
  pula,
  prawdKrzyzowania,
  prawdMutacji,
  populacja,
  nowePokolenie,
  fenotypy,
  dostosowanie,
  numerPokolenia,
  rootNode
};
