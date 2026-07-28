import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useFavoriteIds, useToggleFavoriteMutation } from "@/hooks/favorites";

export function useHomeFavorites() {
  const { isAuthenticated } = useAuth();
  const [savedItems, setSavedItems] = useState(new Set());

  const { data: favoritesIds, isSuccess: favoritesLoaded } = useFavoriteIds({
    enabled: !!isAuthenticated,
  });

  const toggleMutation = useToggleFavoriteMutation();

  useEffect(() => {
    if (!isAuthenticated) {
      setSavedItems(new Set());
      return;
    }
    if (favoritesLoaded && Array.isArray(favoritesIds)) {
      setSavedItems(new Set(favoritesIds.map(Number).filter((n) => !Number.isNaN(n))));
    }
  }, [isAuthenticated, favoritesLoaded, favoritesIds]);

  const toggleSave = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    if (toggleMutation.isPending && toggleMutation.variables?.propertyId === id) return;

    const isCurrentlySaved = savedItems.has(id);
    toggleMutation.mutate(
      { propertyId: id, isCurrentlySaved },
      {
        onSuccess: () => {
          setSavedItems((prev) => {
            const next = new Set(prev);
            if (isCurrentlySaved) {
              next.delete(id);
            } else {
              next.add(id);
            }
            return next;
          });
        },
      },
    );
  };

  const favoriteLoadingId = toggleMutation.isPending
    ? toggleMutation.variables?.propertyId
    : null;

  return { savedItems, favoriteLoadingId, toggleSave, isAuthenticated };
}
