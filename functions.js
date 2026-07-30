// Fn for change keys 'commonName' to 'name' in the array of objects with border countries:
export const changeKeysInBorderCountries = borderCountries => {
  const fixedBorderCountries = borderCountries.map(({ commonName, countryCode }) => ({
    name: commonName,
    countryCode,
  }));

  return fixedBorderCountries;
};

// Fn to fix mismatches of country names between 2 sources:
export const fixNamesMismatch = name => {
  const correspondingNames = [
    { name: 'Bahamas', correspondingName: 'Bahamas, The' },
    { name: 'Czechia', correspondingName: 'Czech Republic' },
    { name: 'Russia', correspondingName: 'Russian Federation' },
    { name: 'Egypt', correspondingName: 'Egypt, Arab Rep.' },
    { name: 'Gambia', correspondingName: 'Gambia, The' },
    { name: 'Hong Kong', correspondingName: 'Hong Kong SAR, China' },
    { name: 'South Korea', correspondingName: 'Korea, Dem. People’s Rep.' },
    { name: 'Slovakia', correspondingName: 'Slovak Republic' },
    { name: 'Venezuela', correspondingName: 'Venezuela, RB' },
  ];

  const match = correspondingNames.find(item => item.name === name);

  return match ? match.correspondingName : name;
};
