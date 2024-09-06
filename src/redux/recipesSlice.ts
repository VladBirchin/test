import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Recipe {
    key: string;
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string | null;
    strYoutube: string;
    strIngredient1: string;
    strIngredient2: string;
    [key: string]: string | null | undefined;
}

interface FetchRecipesParams {
    category: string;
    searchTerm?: string;
}

export interface ApiResponse {
    meals: Recipe[];
}

interface FetchRecipesParams {
    category: string;
}

export const fetchRecipes = createAsyncThunk<Recipe[], FetchRecipesParams>(
    'recipes/fetchRecipes',
    async ({ category }: FetchRecipesParams) => {
        const response = await axios.get<ApiResponse>(`https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`);
        return response.data.meals;
    }
);

const initialState = {
    items: [] as Recipe[],
    selectedRecipes: [] as Recipe[],
    categories: [] as string[],
    selectedCategory: '' as string,
};

interface RecipesState {
    items: Recipe[];
    selectedRecipes: Recipe[];
    categories: string[];
    selectedCategory: string;
}

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        selectRecipe: (state, action: PayloadAction<Recipe>) => {
            const recipe = action.payload;
            if (!state.selectedRecipes.some(r => r.idMeal === recipe.idMeal)) {
                state.selectedRecipes.push(recipe);
            }
        },
        removeRecipe: (state, action: PayloadAction<Recipe>) => {
            state.selectedRecipes = state.selectedRecipes.filter(recipe => recipe.idMeal !== action.payload.idMeal);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
            state.items = action.payload;
        });
    },
});




export const { selectRecipe, removeRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
