import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/data/constants/queryKeys";
import { fetchFavoritePropertyIds, toggleFavoriteProperty } from "@/services/home.service";
import { removeFavoriteProperty } from "@/services/profile.service";

function invalidateFavoriteQueries(queryClient) {
  queryClient.invalidateQueries({ queryKey: queryKeys.favorites });
  queryClient.invalidateQueries({ queryKey: queryKeys.favoritesList });
}

export function useFavoriteIds(options = {}) {
  return useQuery({
    queryKey: queryKeys.favorites,
    queryFn: fetchFavoritePropertyIds,
    ...options,
  });
}

export function useToggleFavoriteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ propertyId, isCurrentlySaved }) =>
      toggleFavoriteProperty(propertyId, isCurrentlySaved),
    onSuccess: () => invalidateFavoriteQueries(queryClient),
  });
}

export function useRemoveFavoriteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFavoriteProperty,
    onSuccess: () => invalidateFavoriteQueries(queryClient),
  });
}
