import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../../redux/recipesSlice';
import { RecipeCard } from '../../components/RecipeCard/RecipeCard';
import { Pagination } from '../../components/Pagination/Pagination';
import { RootState, AppDispatch } from '../../redux/store';
import { CategoryFilter } from '../../components/CategoryFilter/CategoryFilter';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import "./style.css";

export const AllRecipesPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const recipes = useSelector((state: RootState) => state.recipes.items);
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const [page, setPage] = useState<number>(Number(params.get('page')) || 1);
    const [category, setCategory] = useState<string>(params.get('category') || '');
    const [searchTerm, setSearchTerm] = useState<string>(params.get('search') || '');
    const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
    const itemsPerPage = 10;

    useEffect(() => {
        const categoryParam = category || 'All';
        dispatch(fetchRecipes({ category: categoryParam }));

        // Оновлення URL параметрів
        const newParams = new URLSearchParams();
        newParams.set('page', page.toString());
        newParams.set('category', category);
        newParams.set('search', searchTerm);
        navigate({ search: newParams.toString() });
    }, [dispatch, category, searchTerm, page]);

    useEffect(() => {
        if (category) {
            setPage(1);
        }
    }, [category]);

    const filteredRecipes = recipes.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const validRecipes = Array.isArray(filteredRecipes) ? filteredRecipes : [];
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
            <Link to="/selected-recipes" className="selected-recipes-link">Go to Selected Recipes</Link>

            {/* Додана кнопка */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <a
                    href="https://vladbirchin.github.io/map-markers-app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-link-button"
                    style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                    }}
                >
                    Map
                </a>
            </div>
        </div>
    );
};
