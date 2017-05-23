function obliczDostosowanie(fenotypy, dane) {
  const { suwakPuli: pula } = dane;
  const dostosowanie = [];
  let i = 0;
  for(i; i < pula; i += 1) {
    const x = fenotypy[i];
    dostosowanie[i] = + ((Math.exp(x) * Math.sin(Math.PI * x) + 1) / x).toFixed(4);
    // console.log(dostosowanie[i]);
  }
  // console.log('');
  return dostosowanie;
}

export default obliczDostosowanie;
