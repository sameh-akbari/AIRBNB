export function buildCategorizedAmenities(allAmenities) {
  const categorizedAmenities = {
    "Scenic views": allAmenities.filter((a) =>
      a.toLowerCase().includes("view"),
    ),
    Bathroom: allAmenities.filter((a) =>
      ["hair dryer", "shampoo", "body soap", "hot water"].some((term) =>
        a.toLowerCase().includes(term),
      ),
    ),
    "Bedroom and laundry": allAmenities.filter((a) =>
      [
        "bed linens",
        "pillows",
        "blankets",
        "washer",
        "dryer",
        "iron",
        "hangers",
      ].some((term) => a.toLowerCase().includes(term)),
    ),
    Entertainment: allAmenities.filter((a) =>
      ["tv", "cable", "hd", "laptop"].some((term) =>
        a.toLowerCase().includes(term),
      ),
    ),
    "Heating and cooling": allAmenities.filter((a) =>
      a.toLowerCase().includes("heating"),
    ),
    "Home safety": allAmenities.filter((a) =>
      ["smoke alarm", "carbon monoxide"].some((term) =>
        a.toLowerCase().includes(term),
      ),
    ),
    "Internet and office": allAmenities.filter((a) =>
      ["wifi", "laptop friendly"].some((term) =>
        a.toLowerCase().includes(term),
      ),
    ),
    "Kitchen and dining": allAmenities.filter((a) =>
      [
        "kitchen",
        "refrigerator",
        "microwave",
        "dishes",
        "silverware",
        "coffee",
        "cooking",
        "dining",
        "freezer",
        "stove",
        "oven",
        "toaster",
      ].some((term) => a.toLowerCase().includes(term)),
    ),
    "Location features": allAmenities.filter((a) =>
      a.toLowerCase().includes("long term"),
    ),
    "Parking and facilities": allAmenities.filter((a) =>
      ["parking", "free parking"].some((term) =>
        a.toLowerCase().includes(term),
      ),
    ),
    Services: allAmenities.filter((a) => a.toLowerCase().includes("pets")),
  };

  if (
    !categorizedAmenities["Bedroom and laundry"].some((a) =>
      a.toLowerCase().includes("essentials"),
    )
  ) {
    categorizedAmenities["Bedroom and laundry"].unshift("Essentials");
  }

  return categorizedAmenities;
}
