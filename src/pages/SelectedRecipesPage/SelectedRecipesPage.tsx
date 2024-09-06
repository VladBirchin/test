import React from 'react';
import { SelectedRecipes } from '../../components/SelectedRecipes/SelectedRecipes';
import "./style.css"

export const SelectedRecipesPage: React.FC = () => {
    return (
        <div className="content">
            <h1>Selected Recipes</h1>
            <SelectedRecipes />
        </div>
    );
};
