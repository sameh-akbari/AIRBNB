import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/data/constants/queryKeys";
import {
  getUsers,
  getPropertiesList,
  getAdminBookings,
  getAllAmenitiesApi,
  createAdminUser,
  updateAdminUser,
  createAdminAmenity,
  updateAdminAmenity,
  deleteAdminAmenity,
} from "@/services/admin.service";
import { createCity, createCountry } from "@/services";

export function useAdminUsers(
  { page, perPage, sortBy, sortDir },
  options = {},
) {
  return useQuery({
    queryKey: queryKeys.adminUsers(page, perPage, sortBy, sortDir),
    queryFn: () =>
      getUsers({ page, per_page: perPage, sort_by: sortBy, sort_dir: sortDir }),
    ...options,
  });
}

export function useAdminProperties(page, perPage = 10, options = {}) {
  return useQuery({
    queryKey: queryKeys.adminProperties(page, perPage),
    queryFn: () => getPropertiesList({ page, per_page: perPage }),
    ...options,
  });
}

export function useAdminBookings(params, options = {}) {
  const { page, perPage, propertyId, order, sortBy, status } = params;
  return useQuery({
    queryKey: queryKeys.adminBookingsList(
      page,
      perPage,
      propertyId,
      order,
      sortBy,
      status,
    ),
    queryFn: () =>
      getAdminBookings({
        page,
        per_page: perPage,
        property_id: propertyId ? Number(propertyId) : undefined,
        order: order || undefined,
        sort_by: sortBy || undefined,
        status: status || undefined,
      }),
    ...options,
  });
}

export function useAdminAmenities(options = {}) {
  return useQuery({
    queryKey: queryKeys.adminAmenities,
    queryFn: () => getAllAmenitiesApi(),
    ...options,
  });
}

export function useAdminUserMutations() {
  const queryClient = useQueryClient();
  const createUserMutation = useMutation({
    mutationFn: createAdminUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.users }),
  });
  const updateUserMutation = useMutation({
    mutationFn: updateAdminUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.users }),
  });
  return { createUserMutation, updateUserMutation };
}

export function useAdminAmenityMutations() {
  const queryClient = useQueryClient();
  const createAmenityMutation = useMutation({
    mutationFn: createAdminAmenity,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.adminAmenities }),
  });
  const updateAmenityMutation = useMutation({
    mutationFn: updateAdminAmenity,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.adminAmenities }),
  });
  const deleteAmenityMutation = useMutation({
    mutationFn: deleteAdminAmenity,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.adminAmenities }),
  });
  return {
    createAmenityMutation,
    updateAmenityMutation,
    deleteAmenityMutation,
  };
}

export function useAdminLocationMutation() {
  const queryClient = useQueryClient();
  const createCountryMutation = useMutation({
    mutationFn: createCountry,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.countries }),
  });

  const createCityMutation = useMutation({
    mutationFn: createCity,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cities"] }),
  });
  return { createCountryMutation, createCityMutation };
}
