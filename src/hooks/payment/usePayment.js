import { queryKeys } from "@/data";
import { setCart } from "@/redux/slices/cartSlice";
import { fetchPaymentCart, submitBookingRequest } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function usePaymentCart(user, options = {}) {
  const dispatch = useDispatch();
  const query = useQuery({
    queryKey: queryKeys.cart,
    queryFn: fetchPaymentCart,
    enabled: !!user,
    ...options,
  });

  useEffect(() => {
    dispatch(setCart(query.data));
  }, [query.data]);

  return query;
}

export function usePaymentBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitBookingRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
      queryClient.invalidateQueries({ queryKey: queryKeys.myBookingsPage });
      if (variables?.property_id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.property(String(variables.property_id)),
        });
      }
    },
  });
}
