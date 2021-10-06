import './css/styles.css';

import Notiflix from 'notiflix';

import { debounce } from 'lodash';

import fetchCountries from './js/fetchCountries';

// ====================================================

const DEBOUNCE_DELAY = 300;

const countriesList = document.querySelector('.country-list');
const countryItem = document.querySelector('.country-info');
const inputNode = document.querySelector('#search-box');

function onInput(event) {
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
            renderCountry(countries);
        })
        .catch((error) => Notiflix.Notify.failure('Oops, there is no country with that name'));
};

inputNode.addEventListener('input', debounce(onInput, 300));

function renderCountriesList(countries) {
    console.log(countries);
    const markup = countries
        .map((country) => {
            console.log(country.flag);
            console.log(country.name);
            return `
                <li class="country-list-item">
                    <img src='${country.flag}' alt='${country.name} flag' width='40' />
                    <p>${country.name}</p>
                </li>
                `;
    })
      .join("");
  console.log(markup);
  countriesList.innerHTML = markup;
}

function renderCountry(country) {
  const markup = country
    .map((country) => {
        return `
            <img src='${country.flag}' alt='${country.name} flag' width='40' />
            <p>${country.name}</p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languauges</b>: ${country.languages}</p>
            `;
    })
    .join("");
  countryItem.innerHTML = markup;
}


        //   
