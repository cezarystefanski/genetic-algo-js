const fenotyp = (chrom, liczbaGenow) => {
  let fen = 0;
  let rat = 1;
  let i = 0;
  for (i; i < liczbaGenow; i += 1) {
    fen = fen + chrom[i] * rat;
    rat = rat * 2
  }
  return fen;
};

export default fenotyp;
