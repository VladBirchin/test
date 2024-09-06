import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ApiResponse } from '../../redux/recipesSlice';
import "./style.css";
export const RecipeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<any>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get<ApiResponse>(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                setRecipe(response.data.meals[0]);
            } catch (error) {
                console.error('Failed to fetch recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="recipe-details">
            <h1>{recipe.strMeal}</h1>
            <div className="recipe-details-content">
                <img className="card-img" src={recipe.strMealThumb} alt={recipe.strMeal}/>
                <div className="recipe-card-description">
                    <div className="recipe-card-ingredient">
                        <h3>Ingredients:</h3>
                        <ul>
                            {Object.keys(recipe)
                                .filter(key => key.includes('Ingredient') && recipe[key])
                                .map(ingredientKey => (
                                    <li key={ingredientKey}>{recipe[ingredientKey]}</li>
                                ))}
                        </ul>
                    </div>

                    {recipe.strYoutube && (
                        <iframe
                            title="recipe-video"
                            src={`https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}`}
                            frameBorder="0"
                            allowFullScreen
                        />
                    )}
                </div>

                <p>{recipe.strInstructions}</p>

            </div>

        </div>
    );
};
