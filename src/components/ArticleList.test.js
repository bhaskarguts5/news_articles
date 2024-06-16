// src/components/ArticleList.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ArticleList from './ArticleList';

// Mocking the fetch function globally
global.fetch = jest.fn();

describe('ArticleList', () => {
  afterEach(() => {
    // Clear fetch mock after each test
    jest.clearAllMocks();
  });

  it('renders article titles', async () => {
    const mockArticles = [
      { id: 1, title: 'Article 1', abstract: 'Abstract 1' },
      { id: 2, title: 'Article 2', abstract: 'Abstract 2' },
      { id: 3, title: 'Article 3', abstract: 'Abstract 3' }
    ];

    // Mocking a successful response from fetch
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: mockArticles })
    });

    render(<ArticleList onSelectArticle={() => {}} />);

    // Wait for all articles to be rendered
    await waitFor(() => {
      expect(screen.getByText('Article 1')).toBeInTheDocument();
    });
    expect(screen.getByText('Article 2')).toBeInTheDocument();
      expect(screen.getByText('Article 3')).toBeInTheDocument();
  });

  it('calls onSelectArticle when an article is clicked', async () => {
    const mockOnSelectArticle = jest.fn();
    const mockArticles = [
      { id: 1, title: 'Article 1', abstract: 'Abstract 1' },
      { id: 2, title: 'Article 2', abstract: 'Abstract 2' },
      { id: 3, title: 'Article 3', abstract: 'Abstract 3' }
    ];

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: mockArticles })
    });

    render(<ArticleList onSelectArticle={mockOnSelectArticle} />);

    // Wait for the first article to be rendered
    await waitFor(() => {
      expect(screen.getByText('Article 1')).toBeInTheDocument();
    });

    // Click on the first article
    fireEvent.click(screen.getByText('Article 1'));

    // Ensure onSelectArticle was called with the correct article
    expect(mockOnSelectArticle).toHaveBeenCalledTimes(1);
    expect(mockOnSelectArticle).toHaveBeenCalledWith(mockArticles[0]);
  });
});
