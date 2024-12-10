import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { selectRecipe, removeRecipe } from '../../redux/recipesSlice';
import { Recipe } from '../../redux/recipesSlice';
import "./style.css";

type RecipeCardProps = {
    recipe: Recipe;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    const dispatch = useDispatch();
    const selectedRecipes = useSelector((state: RootState) => state.recipes.selectedRecipes);
    const isSelected = selectedRecipes.some(r => r.idMeal === recipe.idMeal);

    const handleSelect = () => {
        if (isSelected) {
            dispatch(removeRecipe(recipe));
        } else {
            dispatch(selectRecipe(recipe));
        }
    };

    return (
        <div className={`recipe-card ${isSelected ? 'selected' : ''}`}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-card__image" />
            <div className="recipe-card__details">
                <h3 className="recipe-card__title">{recipe.strMeal}</h3>
                <p className="recipe-card__category">{recipe.strCategory}</p>
                <p className="recipe-card__origin">{recipe.strArea}</p>
                <button className={`recipe-card__button ${isSelected ? 'selected' : ''}`} onClick={handleSelect}>
                    {isSelected ? 'Selected' : 'Select'}
                </button>
            </div>
            <a href={`/recipe/${recipe.idMeal}`}>View Details</a>
        </div>
    );
};
