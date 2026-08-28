import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ products: [], suppliers: [], prices: [] });
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.trim().length < 2) {
                setResults({ products: [], suppliers: [], prices: [] });
                setIsOpen(false);
                return;
            }

            setIsLoading(true);
            setIsOpen(true);
            try {
                const data = await api.search(query);
                setResults(data);
            } catch (err) {
                console.error('Search error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchResults, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleSelect = (item) => {
        setIsOpen(false);
        setQuery('');
        
        if (item.type === 'product') {
            navigate('/analytics', { state: { product_id: item.id } });
        } else if (item.type === 'supplier') {
            navigate('/analytics', { state: { supplier_id: item.id } });
        } else if (item.type === 'price') {
            navigate('/daily-analysis');
        }
    };

    const totalResults = results.products.length + results.suppliers.length + results.prices.length;

    return (
        <div className="search-wrapper" ref={wrapperRef}>
            <Search className="search-icon" size={18} />
            <input
                type="text"
                className="search-input"
                placeholder="Search products, suppliers..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => { if (query.trim().length >= 2) setIsOpen(true); }}
            />
            {isLoading && (
                <Loader2 className="search-icon" size={16} style={{ left: 'auto', right: '14px', animation: 'spin 1s linear infinite' }} />
            )}
            
            {isOpen && query.trim().length >= 2 && (
                <div className="search-dropdown">
                    {totalResults === 0 && !isLoading ? (
                        <div className="search-no-results">No results found for "{query}"</div>
                    ) : (
                        <>
                            {results.products.length > 0 && (
                                <div>
                                    <div className="search-category">Products</div>
                                    {results.products.map(p => (
                                        <div key={`p-${p.id}`} className="search-result-item" onClick={() => handleSelect(p)}>
                                            {p.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {results.suppliers.length > 0 && (
                                <div>
                                    <div className="search-category">Suppliers</div>
                                    {results.suppliers.map(s => (
                                        <div key={`s-${s.id}`} className="search-result-item" onClick={() => handleSelect(s)}>
                                            {s.name}
                                            <div className="search-result-sub">{s.location}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {results.prices.length > 0 && (
                                <div>
                                    <div className="search-category">Recent Prices</div>
                                    {results.prices.map(pr => (
                                        <div key={`pr-${pr.id}`} className="search-result-item" onClick={() => handleSelect(pr)}>
                                            ₹{pr.price} - {pr.product_name}
                                            <div className="search-result-sub">{pr.supplier_name} • {pr.entry_date}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
