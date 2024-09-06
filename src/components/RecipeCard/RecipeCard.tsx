import React from 'react';
import {useDispatch} from 'react-redux';
import {selectRecipe, removeRecipe} from '../../redux/recipesSlice';
import {Recipe} from '../../redux/recipesSlice';
import "./style.css"


type RecipeCardProps = {
    recipe: Recipe;
    isSelected: boolean;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isSelected }) => {
    const dispatch = useDispatch();

    const handleSelect = () => {
        if (isSelected) {
            dispatch(removeRecipe(recipe));
        } else {
            dispatch(selectRecipe(recipe));
        }
    };

    return (
        <div className="recipe-card">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-card__image" />
            <div className="recipe-card__details">
                <h3 className="recipe-card__title">{recipe.strMeal}</h3>
                <p className="recipe-card__category">{recipe.strCategory}</p>
                <p className="recipe-card__origin">{recipe.strArea}</p>
                <button className="recipe-card__button" onClick={handleSelect}>
                    {isSelected ? 'Deselect' : 'Select'}
                </button>
                <a href={`/recipe/${recipe.idMeal}`}>View Details</a>
            </div>
        </div>
    );
};


