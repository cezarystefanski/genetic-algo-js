import createSlider from './createSlider';

function bootstrapSliders(options) {
  const {
    rootNode,
    liczbaPokolen,
    wartoscPoczatkowa,
    wartoscKoncowa,
    liczbaGenow,
    prawdKrzyzowania,
    prawdMutacji,
    pula
  } = options;

  const context = document.getElementById(rootNode);
  const names = {
    liczbaPokolen: 'Liczba pokoleń',
    wartoscPoczatkowa: 'Wartość początkowa',
    wartoscKoncowa: 'Wartość końcowa',
    liczbaGenow: 'Liczba genów',
    prawdKrzyzowania: 'Prawdopodobieństwo krzyżowania',
    prawdMutacji: 'Prawdopodobieństwo mutacji',
    pula: 'Pula'
  }

  const suwakPokolen = createSlider(liczbaPokolen, 10, 100, 1, context, names.liczbaPokolen);
  const suwakWartoscPoczatkowa = createSlider(wartoscPoczatkowa, 0.5, 1, 0.1, context, names.wartoscPoczatkowa);
  const suwakWartoscKoncowa = createSlider(wartoscKoncowa, 2, 3, 0.1, context, names.wartoscKoncowa);
  const suwakGenow = createSlider(liczbaGenow, 10, 20, 1, context, names.liczbaGenow);
  const suwakKrzyzowania = createSlider(prawdKrzyzowania, 0.5, 1, 0.01, context, names.prawdKrzyzowania);
  const suwakMutacji = createSlider(prawdMutacji, 0.01, 0.5, 0.01, context, names.prawdMutacji);
  const suwakPuli = createSlider(pula, 10, 30, 1, context, names.pula);

  return {
    suwakPokolen,
    suwakWartoscPoczatkowa,
    suwakWartoscKoncowa,
    suwakGenow,
    suwakKrzyzowania,
    suwakMutacji,
    suwakPuli
  };
}

export default bootstrapSliders;
