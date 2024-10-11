import React, { useState, useEffect } from "react";
import styled from "styled-components";

const NewsContainer = styled.div`
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
`;

const NewsTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const NewsText = styled.p`
  font-size: 1rem;
  color: #555;
`;

const NewsItem = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #e5e5ea;
  padding-bottom: 10px;
  display: flex;
  align-items: flex-start;
  &:last-child {
    border-bottom: none;
  }
`;

const NewsImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 16px;
  border-radius: 8px;
`;

const NewsLink = styled.a`
  color: #007aff;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    color: #005bb5;
  }
`;

const NewsContent = styled.div`
  flex: 1;
`;

function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/v2/news/?categories=Cryptocurrency"
        );
        if (!response.ok) {
          throw new Error(`Error fetching news: ${response.statusText}`);
        }
        const data = await response.json();
        setNews(data.Data);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <NewsContainer>Loading...</NewsContainer>;

  if (error) return <NewsContainer>Error: {error}</NewsContainer>;

  return (
    <NewsContainer>
      <NewsTitle>Crypto News</NewsTitle>
      {news.length > 0 ? (
        news.map((article, index) => (
          <NewsItem key={index}>
            <NewsImage src={article.imageurl} alt="Article" />
            <NewsContent>
              <NewsLink
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {article.title}
              </NewsLink>
              <NewsText>{article.body}</NewsText>
              <small>
                {article.source_info.name} -{" "}
                {new Date(article.published_on * 1000).toLocaleDateString()}
              </small>
            </NewsContent>
          </NewsItem>
        ))
      ) : (
        <NewsText>No news available.</NewsText>
      )}
    </NewsContainer>
  );
}

export default NewsPage;
