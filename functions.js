export function compareNames(a, b) {
  if (a.name < b.name) {
    return -1;
  } else {
    return 1;
  }
}

export function changeKeysInBorderCountries(borders) {
  const borderCountries = borders.map((country) => {
    const { commonName, countryCode } = country;
    return { name: commonName, countryCode };
  });
  return borderCountries;
}

export function fixNamesMismatch(name) {
  const correcpondingNames = [
    { name: 'Bahamas', correcpondingName: 'Bahamas, The' },
    { name: 'Czechia', correcpondingName: 'Czech Republic' },
    { name: 'Russia', correcpondingName: 'Russian Federation' },
    { name: 'Egypt', correcpondingName: 'Egypt, Arab Rep.' },
    { name: 'Gambia', correcpondingName: 'Gambia, The' },
    { name: 'Hong Kong', correcpondingName: 'Hong Kong SAR, China' },
    { name: 'South Korea', correcpondingName: 'Korea, Dem. People’s Rep.' },
    { name: 'Slovakia', correcpondingName: 'Slovak Republic' },
    { name: 'Venezuela', correcpondingName: 'Venezuela, RB' },
  ];

  const match = correcpondingNames.find((item) => item.name === name);

  if (match) {
    return match.correcpondingName;
  } else {
    return name;
  }
}
