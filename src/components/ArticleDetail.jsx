import React from 'react';

const ArticleDetail = ({ article }) => {
  if (!article) {
    return <div>Select an article to see details</div>;
  }

  return (
    <div data-testid="article-detail">
      <h2>{article.title}</h2>
      <p><strong>By {article.byline}</strong></p>
      <p>{article.abstract}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
    </div>
  );
};

export default ArticleDetail;
