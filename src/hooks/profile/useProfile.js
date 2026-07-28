import { queryKeys } from "@/data";
import {
  fetchProfileUser,
  saveProfileUser,
  fetchMyTrips,
  fetchFavoritesPage,
  fetchConversations,
  fetchConversationMessage,
} from "@/services";
import { useQuery } from "@tanstack/react-query";

export function useProfile(userId, option = {}) {
  return useQuery({
    queryKey: queryKeys.profile(userId),
    queryFn: () => fetchProfileUser(userId),
    ...option,
  });
}

export function useProfileTrips(page, user, options = {}) {
  return useQuery({
    queryKey: queryKeys.myBookingsPage(page),
    queryFn: () => fetchMyTrips({ page, per_page: 10 }),
    enabled: !!user,
    ...options,
  });
}

export function useProfileFavorites(page, user, options = {}) {
  return useQuery({
    queryKey: queryKeys.favoritesListPage(page),
    queryFn: () => fetchFavoritesPage({ page, per_page: 10 }),
    enabled: !!user,
    ...options,
  });
}

export function useProfileConversations(page, user, options = {}) {
  return useQuery({
    queryKey: queryKeys.conversationsPage(page),
    queryFn: () => fetchConversations({ page, per_page: 20 }),
    enabled: !!user,
    ...options,
  });
}

export function updateProfile(handler) {
  return saveProfileUser(handler);
}

export function useProfileMessage(
  { conversationId, otherUserId, page },
  options = {},
) {
  return useQuery({
    queryKey: queryKeys.message(conversationId, otherUserId),
    queryFn: () =>
      fetchConversationMessage({
        conversationId,
        otherUserId,
        page,
        per_page: 20,
      }),
    ...options,
  });
}
