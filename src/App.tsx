import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AllRecipesPage } from './pages/AllRecipesPage/AllRecipesPage';
import { RecipeDetailsPage } from './pages/RecipeDetailsPage/RecipeDetailsPage';
import { SelectedRecipesPage } from './pages/SelectedRecipesPage/SelectedRecipesPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AllRecipesPage />} />
                <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
                <Route path="/selected-recipes" element={<SelectedRecipesPage />} />
            </Routes>
        </Router>
    );
};

export default App;
