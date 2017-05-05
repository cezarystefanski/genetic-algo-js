function losujBaze(dane) {
  const { suwakPokolen: liczbaPokolen } = dane;
  const limit = liczbaPokolen * 4;
  const randLimit = 1000000;
  const tablicaBazowa = [];
  let i = 0;
  for (i; i < limit; i += 1) {
    tablicaBazowa[i] = Math.floor((Math.random() * randLimit) % 256);
  }
  return tablicaBazowa;
}

export default losujBaze;
