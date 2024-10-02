// src/hooks/useFetchBooks.js

import { useState, useEffect } from 'react';

const useFetchBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                console.log('Fetching books from API...');
                const response = await fetch('http://localhost:4000/books');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Books fetched successfully:', data);
                setBooks(data);
            } catch (error) {
                console.error('Error occurred while fetching books:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchBooks();
    }, []);
    
    return { books, loading, error };
};

export default useFetchBooks;
