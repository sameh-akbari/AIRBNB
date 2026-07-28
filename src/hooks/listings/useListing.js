import { queryKeys } from "@/data";
import {
  fetchMyBookings,
  fetchPropertyDetails,
  fetchPropertyReview,
  reservePropertyToCart,
  sendMessageToHost,
} from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProperty(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.property(id),
    queryFn: () => fetchPropertyDetails(id),
    enabled: !!id,
    ...options,
  });
}

export function usePropertyReview(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.propertyReview(id),
    queryFn: () => fetchPropertyReview(id),
    enabled: !!id,
    ...options,
  });
}

export function useMyBookingsForListing(userId, propertyId, options = {}) {
  return useQuery({
    queryKey: queryKeys.myBookingsForProperty(userId, propertyId),
    queryFn: () => fetchMyBookings({ page: 1, per_page: 50 }),
    enabled: !!userId && !!propertyId,
    ...options,
  });
}

export function useReserveToCartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reservePropertyToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
  });
}

export function useMessageHostMutation() {
  return useMutation({
    mutationFn: sendMessageToHost,
  });
}
