import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../../redux/recipesSlice';
import { RecipeCard } from '../../components/RecipeCard/RecipeCard';
import { Pagination } from '../../components/Pagination/Pagination';
import { RootState, AppDispatch } from '../../redux/store';
import { CategoryFilter } from '../../components/CategoryFilter/CategoryFilter';
import { Link } from 'react-router-dom';
import "./style.css";

export const AllRecipesPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const recipes = useSelector((state: RootState) => state.recipes.items);

    const [page, setPage] = useState<number>(1);
    const [category, setCategory] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);
    const itemsPerPage = 10;


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);


    useEffect(() => {
        dispatch(fetchRecipes({ category: debouncedSearchTerm || category }));
    }, [dispatch, debouncedSearchTerm, category]);

    const handlePageChange = (page: number) => {
        setPage(page);
    };


    const validRecipes = Array.isArray(recipes) ? recipes : [];

    const startIndex = (page - 1) * itemsPerPage;
    const currentItems = validRecipes.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="content">
            <h1>All Recipes</h1>
            <input
                type="text"
                placeholder="Search a recipe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <CategoryFilter onCategorySelect={setCategory} />

            {currentItems.length > 0 ? (
                <div className="recipes-grid">
                    {currentItems.map((recipe) => (
                        <RecipeCard key={recipe.idMeal} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <p>No matching recipes found.</p>
            )}

            <Pagination
                currentPage={page}
                onPageChange={handlePageChange}
                totalItems={validRecipes.length}
                itemsPerPage={itemsPerPage}
            />
            <Link to="/selected-recipes">Go to Selected Recipes</Link>
        </div>
    );
};
