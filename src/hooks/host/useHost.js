import { queryKeys } from "@/data";
import {
  fetchHostProfile,
  fetchHostPropertiesList,
  fetchHostBookings,
  fetchHostReviews,
  fetchHostConversations,
  fetchHostConversationMessages,
  confirmBooking,
  rejectBooking,
  propertyDelete,
  addHostProperty,
} from "@/services/host.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useHostProfile(userId, options = {}) {
  return useQuery({
    queryKey: queryKeys.profile(userId),
    queryFn: () => fetchHostProfile(userId),
    enabled: !!userId,
    ...options,
  });
}

export function useHostProperties(page, user, options = {}) {
  return useQuery({
    queryKey: queryKeys.myPropertiesList(page),
    queryFn: () => fetchHostPropertiesList({ page, per_page: 10 }),
    enabled: !!user,
    ...options,
  });
}

export function useHostBookings(page, user, options = {}) {
  return useQuery({
    queryKey: queryKeys.hostBookings(page),
    queryFn: () => fetchHostBookings({ page, per_page: 10 }),
    enabled: !!user,
    ...options,
  });
}

export function useHostReviews(user, options = {}) {
  return useQuery({
    queryKey: queryKeys.myPropertiesReviews,
    queryFn: () => fetchHostReviews({ per_property: 50 }),
    enabled: !!user,
    ...options,
  });
}

export function useHostConversations(page, user, options = {}) {
  return useQuery({
    queryKey: queryKeys.conversationsPage(page),
    queryFn: () => fetchHostConversations({ page, per_page: 20 }),
    enabled: !!user,
    ...options,
  });
}

export function useHostMessages(
  { conversationId, otherUserId, page },
  options = {},
) {
  return useQuery({
    queryKey: queryKeys.message(conversationId, otherUserId),
    queryFn: () =>
      fetchHostConversationMessages({
        conversationId,
        otherUserId,
        page,
        per_page: 20,
      }),
    enabled: !!conversationId && !!otherUserId,
    ...options,
  });
}

export function useHostBookingMutations() {
  const queryClient = useQueryClient();
  const confirmMutation = useMutation({
    mutationFn: confirmBooking,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.hostBookingsRoot }),
  });
  const rejectMutation = useMutation({
    mutationFn: rejectBooking,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.hostBookingsRoot }),
  });

  return { confirmMutation, rejectMutation };
}
function invalidateHostProperties(queryClient) {
  queryClient.invalidateQueries({ queryKey: ["my-properties-list"] });
}

export function useHostPropertyMutations() {
  const queryClient = useQueryClient();

  const addPropertyMutation = useMutation({
    mutationFn: addHostProperty,
    onSuccess: () => invalidateHostProperties(queryClient),
  });

  const deletePropertyMutation = useMutation({
    mutationFn: propertyDelete,
    onSuccess: () => invalidateHostProperties(queryClient),
  });
  return { deletePropertyMutation, addPropertyMutation };
}
