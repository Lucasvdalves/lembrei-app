import axios from 'axios';

axios.get('http://localhost:8080/api/events')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Erro ao buscar eventos:', error);
  });
