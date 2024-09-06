import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ApiResponse } from '../redux/recipesSlice'; // Імплементуйте тип ApiResponse з файлу recipesSlice

export const RecipeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<any>(null);

    useEffect(() => {
        // Оголосіть асинхронну функцію всередині useEffect
        const fetchRecipe = async () => {
            try {
                const response = await axios.get<ApiResponse>(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                setRecipe(response.data.meals[0]); // Оновлюємо стан з першим рецептом з отриманих даних
            } catch (error) {
                console.error('Failed to fetch recipe:', error);
            }
        };

        fetchRecipe(); // Викликаємо асинхронну функцію
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div>
            <h1>{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>Ingredients:</h3>
            <ul>
                {Object.keys(recipe)
                    .filter(key => key.includes('Ingredient') && recipe[key])
                    .map(ingredientKey => (
                        <li key={ingredientKey}>{recipe[ingredientKey]}</li>
                    ))}
            </ul>
            <p>{recipe.strInstructions}</p>
            {recipe.strYoutube && (
                <iframe
                    title="recipe-video"
                    src={`https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}`}
                    frameBorder="0"
                    allowFullScreen
                />
            )}
        </div>
    );
};
