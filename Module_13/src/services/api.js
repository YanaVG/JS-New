// import axios from 'axios';

const API_KEY = '5b807541e4e21c6f92a0838596bf1aac964af6c1c09cc';
const URL = 'https://www.linkpreview.net/';

export const fetchUrl = ({ query }) => {
  const url = `${URL}?key=${API_KEY}&q=${query}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
};
