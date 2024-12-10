import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.css";

interface Category {
    strCategory: string;
}

interface CategoriesResponse {
    categories: Category[];
}

type CategoryFilterProps = {
    onCategorySelect: (category: string) => void;
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        axios.get<CategoriesResponse>('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(response => {
                const categoriesData = response.data.categories.map(cat => cat.strCategory);
                setCategories(categoriesData);
            });
    }, []);

    return (
        <div className="category-filter-container">
            <label htmlFor="category-select" className="category-label">Choose a Category:</label>
            <select id="category-select" className="category-select" onChange={(e) => onCategorySelect(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};
