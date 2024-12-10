import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ApiResponse } from '../../redux/recipesSlice';
import "./style.css";

export const RecipeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
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

    if (!recipe) return <div className="loading">Loading...</div>;

    return (
        <div className="recipe-details">
            <button className="back-button" onClick={() => navigate(-1)}>Menu</button>
            <h1 className="recipe-title">{recipe.strMeal}</h1>
            <div className="recipe-details-content">
                <img className="card-img" src={recipe.strMealThumb} alt={recipe.strMeal} />
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

                <p className="recipe-instructions">{recipe.strInstructions}</p>
            </div>
        </div>
    );
};
