import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Recipe } from '../redux/recipesSlice';
import "./style.css"

export const SelectedRecipes: React.FC = () => {
    const selectedRecipes = useSelector((state: RootState) => state.recipes.selectedRecipes);

    const ingredientsMap: { [key: string]: string } = {};

    selectedRecipes.forEach((recipe: Recipe) => {
        for (let i = 1; i <= 20; i++) {  // Assuming up to 20 ingredients
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
        <div>
            <h2>Selected Recipes</h2>
            <div className="recipes-grid">
                {selectedRecipes.map((recipe: Recipe) => (
                    <div key={recipe.idMeal}>
                        <h3>{recipe.strMeal}</h3>
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                        <p>{recipe.strInstructions || 'No instructions available'}</p>
                    </div>
                ))}
            </div>

            <h2>Ingredients Summary</h2>
            <ul>
                {Object.keys(ingredientsMap).map(ingredient => (
                    <li key={ingredient}>{ingredient}: {ingredientsMap[ingredient]}</li>
                ))}
            </ul>
        </div>
    );
};
