export default function fetchCountry(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.error('Error: ', error);
    });
}
