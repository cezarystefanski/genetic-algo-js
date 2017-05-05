function obliczDostosowanie(fenotypy, dane) {
  const { suwakPuli: pula } = dane;
  const dostosowanie = [];
  let i = 0;
  for(i; i < pula; i += 1) {
    const x = fenotypy[i];
    dostosowanie[i] = (Math.exp(x) * Math.sin(Math.PI * x) + 1) / x;
  }
  return dostosowanie;
}

export default obliczDostosowanie;
