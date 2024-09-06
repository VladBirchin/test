import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Recipe } from '../../redux/recipesSlice';
import "./style.css"

export const SelectedRecipes: React.FC = () => {
    const selectedRecipes = useSelector((state: RootState) => state.recipes.selectedRecipes);

    const uniqueRecipes = Array.from(new Set(selectedRecipes.map(recipe => recipe.idMeal)))
        .map(idMeal => {
            return selectedRecipes.find(recipe => recipe.idMeal === idMeal);
        })
        .filter((recipe): recipe is Recipe => recipe !== undefined);

    const ingredientsMap: { [key: string]: string } = {};

    uniqueRecipes.forEach((recipe: Recipe) => {
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}` as keyof Recipe] as string | undefined;
            const measure = recipe[`strMeasure${i}` as keyof Recipe] as string | undefined;
            if (ingredient) {
                ingredientsMap[ingredient] = ingredientsMap[ingredient]
                    ? `${ingredientsMap[ingredient]}, ${measure || ''}`
                    : measure || '';
            }
        }
    });

    return (
        <div className="selected-recipes">

            <div className="recipes-grid">
                {uniqueRecipes.map((recipe: Recipe) => (
                    <div key={recipe.idMeal} className="recipe-cards">
                        <h3>{recipe.strMeal}</h3>
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                        <p>{recipe.strInstructions || 'No instructions available'}</p>
                    </div>
                ))}
            </div>
            <div className="ingredient">
                <h2>Ingredients Summary</h2>
                <ul>
                    {Object.keys(ingredientsMap).map(ingredient => (
                        <li key={ingredient}>{ingredient}: {ingredientsMap[ingredient]}</li>
                    ))}
                </ul>
            </div>

        </div>
    );
};
