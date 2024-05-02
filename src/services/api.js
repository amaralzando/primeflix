import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
//URL DA API: https://developer.themoviedb.org/reference/search-movie
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWYzOTAzNTlkN2Q4MTYxY2Q0YzliNjJkN2E2MDk0OSIsInN1YiI6IjY2MzNlYTI0YTFjNTlkMDEyNmU2ZWNmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aid2EdSqhhMsffAU7mVGQA-jAMxhNFb9tl7UihFmWGU',
    Accept: 'application/json'
  }
});

export default api;