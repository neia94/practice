import { useState, useEffect } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

function SearchBar({
  onSearch,
  placeholder = "포스트 검색...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    // 디바운싱: 300ms 후에 검색 실행
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className="clear-button" onClick={handleClear}>
            ✕
          </button>
        )}
      </div>
      {query && (
        <div className="search-info">
          검색어: <strong>{query}</strong>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
