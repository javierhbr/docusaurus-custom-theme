import React, {
  type ChangeEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from '@docusaurus/Link';

type SearchItem = {
  title: string;
  description: string;
  section: string;
  to: string;
  keywords: string[];
};

const SEARCH_ITEMS: SearchItem[] = [
  {
    title: 'Overview',
    description: 'Theme structure, layout model, and token system.',
    section: 'Learn',
    to: '/',
    keywords: ['docs', 'layout', 'theme', 'overview'],
  },
  {
    title: 'API Reference',
    description: 'Reference-first index for hooks and patterns.',
    section: 'Reference',
    to: '/api-reference',
    keywords: ['api', 'reference', 'hooks'],
  },
  {
    title: 'useCallback',
    description: 'Memoize a function when its identity matters.',
    section: 'Hooks',
    to: '/api-reference/use-callback',
    keywords: ['callback', 'memoize', 'performance'],
  },
  {
    title: 'useActionState',
    description: 'Coordinate async form actions and pending state.',
    section: 'Hooks',
    to: '/api-reference/use-action-state',
    keywords: ['forms', 'async', 'pending'],
  },
  {
    title: 'State Patterns',
    description: 'Recommended defaults for async and optimistic UI.',
    section: 'States',
    to: '/state-patterns',
    keywords: ['state', 'derived', 'optimistic'],
  },
  {
    title: 'Callback Patterns',
    description: 'Design callback APIs without over-memoizing.',
    section: 'Callbacks',
    to: '/callback-patterns',
    keywords: ['callbacks', 'events', 'memoization'],
  },
  {
    title: 'Community',
    description: 'Explore the supporting community page shell.',
    section: 'Community',
    to: '/community',
    keywords: ['community', 'links', 'feedback'],
  },
  {
    title: 'Blog',
    description: 'Read and customize the default blog section.',
    section: 'Blog',
    to: '/blog',
    keywords: ['blog', 'posts', 'updates'],
  },
];

function SearchIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M10.5 4.75a5.75 5.75 0 1 0 0 11.5 5.75 5.75 0 0 0 0-11.5Zm0 13a7.25 7.25 0 1 1 4.58-12.86 7.25 7.25 0 0 1-4.58 12.86Zm10.22 1.16-4.37-4.37 1.06-1.06 4.37 4.37-1.06 1.06Z"
        fill="currentColor"
      />
    </svg>
  );
}

function closeOnShortcut(
  event: KeyboardEvent,
  onOpen: () => void,
  onClose: () => void,
) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    onOpen();
  }

  if (event.key === 'Escape') {
    onClose();
  }
}

export default function SearchBar(): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) {
      return SEARCH_ITEMS;
    }

    return SEARCH_ITEMS.filter((item) =>
      [item.title, item.description, item.section, ...item.keywords]
        .join(' ')
        .toLowerCase()
        .includes(search),
    );
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) =>
      closeOnShortcut(event, () => setIsOpen(true), () => setIsOpen(false));

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty('overflow');
      setQuery('');
      return;
    }

    document.body.style.setProperty('overflow', 'hidden');
    inputRef.current?.focus();

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [isOpen]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="theme-search-trigger"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}>
        <SearchIcon />
        <span className="theme-search-trigger__label">Search anything...</span>
        <span className="theme-search-trigger__shortcut" aria-hidden="true">
          <kbd>⌘</kbd>
          <kbd>K</kbd>
        </span>
      </button>

      {isOpen && (
        <div
          className="theme-search-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Search the documentation"
          onClick={() => setIsOpen(false)}>
          <div
            className="theme-search-modal__panel"
            onClick={(event) => event.stopPropagation()}>
            <div className="theme-search-modal__header">
              <div className="theme-search-modal__input-wrap">
                <SearchIcon />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  className="theme-search-modal__input"
                  placeholder="Search docs, patterns, and pages"
                />
              </div>
              <button
                type="button"
                className="theme-search-modal__close"
                onClick={() => setIsOpen(false)}>
                Esc
              </button>
            </div>

            <div className="theme-search-results" role="list">
              {results.length > 0 ? (
                results.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="theme-search-result"
                    onClick={() => setIsOpen(false)}>
                    <div className="theme-search-result__meta">{item.section}</div>
                    <div className="theme-search-result__title">{item.title}</div>
                    <div className="theme-search-result__description">
                      {item.description}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="theme-search-empty">
                  <p>No matches found for “{query}”.</p>
                  <span>Try a hook name, a page title, or a keyword like state or blog.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
