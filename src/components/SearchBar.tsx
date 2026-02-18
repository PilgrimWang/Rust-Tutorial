import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { rustTutorialData } from '@/data/rustTutorial';

interface SearchBarProps {
  onSelect: (sectionId: string, contentId: string) => void;
}

interface SearchResult {
  sectionId: string;
  sectionTitle: string;
  contentId: string;
  contentTitle: string;
  preview: string;
}

export function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    
    const searchQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];
    
    rustTutorialData.forEach(section => {
      section.content.forEach(content => {
        const titleMatch = content.title.toLowerCase().includes(searchQuery);
        const explanationMatch = content.explanation.toLowerCase().includes(searchQuery);
        
        if (titleMatch || explanationMatch) {
          // 提取预览文本
          let preview = content.explanation.slice(0, 100);
          if (content.explanation.length > 100) {
            preview += '...';
          }
          
          searchResults.push({
            sectionId: section.id,
            sectionTitle: section.title,
            contentId: content.id,
            contentTitle: content.title,
            preview,
          });
        }
      });
    });
    
    return searchResults.slice(0, 8);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    onSelect(result.sectionId, result.contentId);
    setQuery('');
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <Search className="search-icon w-4 h-4" />
        <Input
          type="text"
          placeholder="搜索教程内容..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="search-input"
        />
        {query && (
          <button 
            className="clear-button"
            onClick={clearSearch}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="search-results">
          <div className="results-header">
            <span>找到 {results.length} 个结果</span>
          </div>
          <ul className="results-list">
            {results.map((result, index) => (
              <li key={index}>
                <button
                  className="result-item"
                  onClick={() => handleSelect(result)}
                >
                  <div className="result-title">
                    <span className="result-content-title">{result.contentTitle}</span>
                    <span className="result-section-title">{result.sectionTitle}</span>
                  </div>
                  <p className="result-preview">{result.preview}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isOpen && query && results.length === 0 && (
        <div className="search-results empty">
          <p>未找到相关结果</p>
        </div>
      )}
    </div>
  );
}
