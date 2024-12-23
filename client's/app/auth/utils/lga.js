export const toggleLGA = (target) => {
  switch (target) {
    case "ICI":
      return [
        "BTIT",
        "BSIT",
        "BSCS",
      ];

    case "Physics & Mathematics":
      return [
        "BSSCS",
        "MSMCS",
        "BTP",
      ];

    case "Engineering":
      return [
        "BSEEE",
        "BSCE",
        "MSME",
      ];
    default:
      return [];
  }
};
