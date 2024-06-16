import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

// Mock the API key
jest.mock('./config', () => 'mock-api-key');

// Mock articles data
const mockArticles = [
  { id: 1, title: 'Article 1', byline: 'Author 1', abstract: 'Abstract 1', url: 'https://example.com/article1' },
  { id: 2, title: 'Article 2', byline: 'Author 2', abstract: 'Abstract 2', url: 'https://example.com/article2' },
  { id: 3, title: 'Article 3', byline: 'Author 3', abstract: 'Abstract 3', url: 'https://example.com/article3' }
];

// Mock fetch function globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ results: mockArticles })
  })
);

describe('App', () => {
  it('renders ArticleList and ArticleDetail components', async () => {
    render(<App />);

    // Assert that both ArticleList and ArticleDetail are rendered
    const articleListElement = screen.getByTestId('article-list');
    const articleDetailElement = await screen.findByTestId('article-detail');

    expect(articleListElement).toBeInTheDocument();
    expect(articleDetailElement).toBeInTheDocument();
    expect(screen.getByText(/Select an article to see details/i)).toBeInTheDocument();
  });

  it('selects an article from ArticleList and displays its details in ArticleDetail', async () => {
    render(<App />);

    // Wait for the articles to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText(/Article 1/i)).toBeInTheDocument();
    });

    // Simulate selecting an article (assuming Article 1 is clicked)
    const articleButton = screen.getByText(/Article 1/i);
    fireEvent.click(articleButton);

    // Wait for ArticleDetail to display the selected article details
    await waitFor(() => {
      expect(screen.getByText(/Article 1/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Author 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Abstract 1/i)).toBeInTheDocument();

    // Additional checks if needed, e.g., check the 'Read more' link
    const readMoreLink = screen.getByRole('link', { name: /Read more/i });
    expect(readMoreLink).toHaveAttribute('href', 'https://example.com/article1');
    expect(readMoreLink).toHaveAttribute('target', '_blank');
    expect(readMoreLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
