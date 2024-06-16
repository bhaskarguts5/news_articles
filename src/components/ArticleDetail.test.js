/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleDetail from './ArticleDetail';

const mockArticle = {
  title: 'Article 1',
  byline: 'Author 1',
  abstract: 'Abstract 1',
  url: 'http://example.com/1'
};

test('renders message when no article is selected', () => {
  render(<ArticleDetail article={null} />);
  expect(screen.getByText('Select an article to see details')).toBeInTheDocument();
});

test('renders article details when article is selected', () => {
  render(<ArticleDetail article={mockArticle} />);

  expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
  expect(screen.getByText(`By ${mockArticle.byline}`)).toBeInTheDocument();
  expect(screen.getByText(mockArticle.abstract)).toBeInTheDocument();
  expect(screen.getByText('Read more').closest('a')).toHaveAttribute('href', mockArticle.url);
});

