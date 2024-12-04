import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('technology');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
        setNews(res.data.articles);
      } catch (error) {
        console.error("Error fetching the news:", error);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h1>AI News Aggregator</h1>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="technology">Technology</option>
        <option value="sports">Sports</option>
        <option value="business">Business</option>
      </select>
     <ul>
        {news.map((article, index) => (
          <li key={index}>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h2>{article.title}</h2>
          </a>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
