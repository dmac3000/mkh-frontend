import React from 'react';
import { useLocation } from 'react-router-dom';
import CarouselContainer from '../components/CarouselContainer';

export default function SearchResults() {
  const location = useLocation();
  const results = location.state.results;
  const term = location.state.term; // Access the search term from the state

  return (
    <CarouselContainer
      title={`Search Results:`}
      text={`${term}`}
      items={results}
    />
  );
}
