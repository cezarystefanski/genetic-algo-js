function dostosowanieNormalizacja(dostosowanie, dane) {
  const { suwakPuli: pula, suwakGenow: liczbaGenow } = dane;
  let min = dostosowanie[0];
  let max = dostosowanie[0];
  let i = 1;
  for (i; i < pula; i += 1) {
    const dost = dostosowanie[i];
    min = dost < min ? dost : min;
    max = dost > max ? dost : max;
  }
  const offset = (max - min) / (liczbaGenow - 1) - min;
  const noweDostosowanie = dostosowanie.map(val => val + offset);
  return noweDostosowanie;
}

export default dostosowanieNormalizacja;
