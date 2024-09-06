import React from 'react';
import { RecipeDetails } from '../../components/RecipeDetails/RecipeDetails';

export const RecipeDetailsPage: React.FC = () => {
    return (
        <div className="content">
            <h1>Recipe Details</h1>
            <RecipeDetails />
        </div>
    );
};
