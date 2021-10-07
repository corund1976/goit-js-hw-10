import './css/styles.css';

import Notiflix from 'notiflix';

import { debounce } from 'lodash';

import { fetchCountries } from './js/fetchCountries';

// ====================================================

const DEBOUNCE_DELAY = 300;

const countriesList = document.querySelector('.country-list');
const countryItem = document.querySelector('.country-info');
const inputNode = document.querySelector('#search-box');

function onInput() {
    const inputText = inputNode.value.trim();

    countriesList.innerHTML = '';
    countryItem.innerHTML = '';

    if (!inputText) {
        return;
    }

    fetchCountries(inputText)
        .then((countries) => {
            if (countries.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
                return;
            }
            if (countries.length > 1) {
                renderCountriesList(countries);
                return;
            }
            renderCountryInfo(countries);
        })
        .catch((error) => Notiflix.Notify.failure('Oops, there is no country with that name'));
};

inputNode.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function renderCountriesList(countries) {
  countryItem.innerHTML = '';

  const markup = countries
    .map((country) => {
      return `
        <li class="country-list-item">
          <img src='${country.flag}' alt='${country.name} flag' width='40' />
          <p>${country.name}</p>
        </li>
        `;
    })
    .join("");
    
  countriesList.innerHTML = markup;
};

function renderCountryInfo(country) {
  countriesList.innerHTML = '';

  const markup = country
    .map((country) => {
      return `
        <div class="renderCountryInfo-firstString">
          <img src='${country.flag}' alt='${country.name} flag' width='40' />
          <h2>${country.name}</h2>
        </div>
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages</b>: ${country.languages.map(item => ` ${item.name}`)}</p>
        `;
    })
    .join("");
    
  countryItem.innerHTML = markup;
};