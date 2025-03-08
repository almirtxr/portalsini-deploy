import axios from 'axios';

const API_URL = 'https://api-portalsini.onrender.com';

const getArticles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    throw error;
  }
};

const getArticleByID = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar artigo:', error);
    throw error;
  }
}

const getArticleByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}?category=${category}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar artigo:', error);
    throw error;
  }
}

export { getArticles, getArticleByID, getArticleByCategory };