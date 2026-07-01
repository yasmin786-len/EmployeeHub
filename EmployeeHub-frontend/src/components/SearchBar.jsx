import { useState, useEffect } from 'react';
import './SearchBar.css';

function SearchBar({ value, onSearch, placeholder = 'Search employees…' }) {
  const [term, setTerm] = useState(value || '');

  useEffect(() => {
    setTerm(value || '');
  }, [value]);

  // Debounce search-as-you-type
  useEffect(() => {
    const handle = setTimeout(() => {
      onSearch(term);
    }, 350);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  const handleClear = () => {
    setTerm('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <svg
        className="search-bar-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="6.5" />
        <path d="M20 20l-4.4-4.4" />
      </svg>
      <input
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        aria-label="Search employees"
      />
      {term && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;
