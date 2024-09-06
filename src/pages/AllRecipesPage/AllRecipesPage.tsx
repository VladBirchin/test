import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../../redux/recipesSlice';
import { RecipeCard } from '../../components/recipe_card/RecipeCard';
import { Pagination } from '../../components/Pagination';
import { CategoryFilter } from '../../components/CategoryFilter';
import { RootState, AppDispatch } from '../../redux/store'; // Імпортуємо RootState і AppDispatch

export const AllRecipesPage: React.FC = () => {
    // Правильно типізовані dispatch та state
    const dispatch: AppDispatch = useDispatch();
    const recipes = useSelector((state: RootState) => state.recipes.items);

    const [page, setPage] = useState<number>(1);
    const [category, setCategory] = useState<string>('');

    useEffect(() => {
        dispatch(fetchRecipes({ category, page }));
    }, [dispatch, category, page]);

    return (
        <div>
            <h1>All Recipes</h1>
            <CategoryFilter onCategorySelect={setCategory} />
            <div className="recipes-grid">
                {recipes.map((recipe: any) => (
                    <RecipeCard key={recipe.idMeal} recipe={recipe} />
                ))}
            </div>
            <Pagination currentPage={page} onPageChange={setPage} totalPages={10} />
        </div>
    );
};
