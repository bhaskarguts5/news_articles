import React, { useState } from 'react';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import './App.css';

const App = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="App">
      <div className="article-list">
        <ArticleList onSelectArticle={setSelectedArticle} />
      </div>
      <div className="article-detail">
        <ArticleDetail article={selectedArticle} />
      </div>
    </div>
  );
};

export default App;
