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
}

export interface ApiResponse {
    meals: Recipe[];
}

export const fetchRecipes = createAsyncThunk<Recipe[], FetchRecipesParams>(
    'recipes/fetchRecipes',
    async ({ category }: FetchRecipesParams) => {
        const url = category === 'All'
            ? 'https://www. .com/api/json/v1/1/search.php?s=' // Запит на всі рецепти
            : `https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`; // Запит для категорії

        const response = await axios.get<ApiResponse>(url);
        return response.data.meals || [];
    }
);

const initialState = {
    items: [] as Recipe[],
    selectedRecipes: [] as Recipe[],
    categories: [] as string[],
    selectedCategory: '' as string,
    loading: false, // Додати стан завантаження
    error: null as string | null, // Додати стан помилки
};

interface RecipesState {
    items: Recipe[];
    selectedRecipes: Recipe[];
    categories: string[];
    selectedCategory: string;
    loading: boolean; // Стан завантаження
    error: string | null; // Стан помилки
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
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true; // Початок завантаження
                state.error = null; // Скинути помилку
            })
            .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
                state.loading = false; // Завантаження завершено
                state.items = action.payload; // Отримані рецепти
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false; // Завантаження завершено з помилкою
                state.error = action.error.message || 'Failed to fetch recipes'; // Зберегти помилку
            });
    },
});

export const { selectRecipe, removeRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
