import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://prouct-explorer-931631ff5a91.herokuapp.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
