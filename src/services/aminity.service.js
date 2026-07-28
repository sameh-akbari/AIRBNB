import { getAminitiesApi } from "@/api";

export async function getAminities(category) {
  return getAminitiesApi(category);
}
