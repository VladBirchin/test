import React from 'react';
import "./style.css";

type PaginationProps = {
    currentPage: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange, totalItems, itemsPerPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            for (let i = 1; i <= 7; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    };

    // Перевірка, чи є лише одна сторінка
    if (totalPages === 1) {
        return null;
    }

    return (
        <div className="pagination">
            <button
                className="left_button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            <div className="pagination-buttons">
                {getPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && onPageChange(page)}
                        className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <button
                className="right_button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};
