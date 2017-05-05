function losujChromosom(liczbaGenow) {
  const chrom = [];
  let i = 0;
  for (i; i < liczbaGenow; i += 1) {
    chrom[i] = Math.round(Math.random());
  }
  return chrom;
}

export default losujChromosom;
