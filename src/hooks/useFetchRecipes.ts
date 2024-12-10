// hooks/useFetchRecipes.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Recipe } from '../redux/recipesSlice';

interface FetchRecipesParams {
    category: string;
}

export const fetchRecipes = async ({ category }: FetchRecipesParams): Promise<Recipe[]> => {
    const url = category === 'All'
        ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : `https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`;

    const response = await axios.get<{ meals: Recipe[] }>(url);
    return response.data.meals || [];
};


export const useFetchRecipes = (category: string) => {
    return useQuery<Recipe[], Error>({
        queryKey: ['recipes', category],
        queryFn: () => fetchRecipes({ category }),
        staleTime: 1000 * 60 * 5,
        retry: false,
    });
};
