import React, { useState, useEffect } from 'react';
import API_KEY from '../config';

const ArticleList = ({ onSelectArticle }) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data.results);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div data-testid="article-list">
      <h1>Most Popular Articles</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id} onClick={() => onSelectArticle(article)}>
            {article.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
