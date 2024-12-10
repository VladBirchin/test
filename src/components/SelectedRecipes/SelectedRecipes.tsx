import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Recipe } from '../../redux/recipesSlice';
import { useNavigate } from 'react-router-dom';
import "./style.css";

export const SelectedRecipes: React.FC = () => {
    const navigate = useNavigate();
    const selectedRecipes = useSelector((state: RootState) => state.recipes.selectedRecipes);

    const uniqueRecipes = useMemo(() => {
        const uniqueIds = Array.from(new Set(selectedRecipes.map(recipe => recipe.idMeal)));
        return uniqueIds.map(idMeal => {
            return selectedRecipes.find(recipe => recipe.idMeal === idMeal);
        }).filter((recipe): recipe is Recipe => recipe !== undefined);
    }, [selectedRecipes]);

    const ingredientsMap: { [key: string]: string } = useMemo(() => {
        const map: { [key: string]: string } = {};

        uniqueRecipes.forEach((recipe: Recipe) => {
            for (let i = 1; i <= 20; i++) {
                const ingredient = recipe[`strIngredient${i}` as keyof Recipe] as string | undefined;
                const measure = recipe[`strMeasure${i}` as keyof Recipe] as string | undefined;
                if (ingredient) {
                    map[ingredient] = map[ingredient]
                        ? `${map[ingredient]}, ${measure || ''}`
                        : measure || '';
                }
            }
        });

        return map;
    }, [uniqueRecipes]);

    return (
        <div className="selected-recipes">
            <button className="back-button" onClick={() => navigate(-1)}>Menu</button>

            {uniqueRecipes.length === 0 ? (
                <p className="no-recipes">No selected recipes</p>
            ) : (
                <>
                    <div className="recipes-grid">
                        {uniqueRecipes.map((recipe: Recipe) => (
                            <div key={recipe.idMeal} className="recipe-card">
                                <h3>{recipe.strMeal}</h3>
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                                <p>{recipe.strInstructions || 'No instructions'}</p>
                            </div>
                        ))}
                    </div>
                    <div className="ingredient-summary">
                        <h2>Ingredients</h2>
                        <ul>
                            {Object.keys(ingredientsMap).map(ingredient => (
                                <li key={ingredient}>{ingredient}: {ingredientsMap[ingredient]}</li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};
