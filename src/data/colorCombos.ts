export interface ColorCombo {
  name: string;
  colors: string[];
  nickname: string;
  gradient: string;
}

export const guildCombos: ColorCombo[] = [
  {
    name: "Blue-Red",
    colors: ["U", "R"],
    nickname: "Izzet",
    gradient: "from-blue-600 to-red-600"
  },
  {
    name: "Red-Green",
    colors: ["R", "G"],
    nickname: "Gruul",
    gradient: "from-red-600 to-green-600"
  },
  {
    name: "White-Blue",
    colors: ["W", "U"],
    nickname: "Azorius",
    gradient: "from-slate-200 to-blue-600"
  },
  {
    name: "Black-Red",
    colors: ["B", "R"],
    nickname: "Rakdos",
    gradient: "from-gray-900 to-red-600"
  },
  {
    name: "Green-White",
    colors: ["G", "W"],
    nickname: "Selesnya",
    gradient: "from-green-600 to-slate-200"
  },
  {
    name: "White-Black",
    colors: ["W", "B"],
    nickname: "Orzhov",
    gradient: "from-slate-200 to-gray-900"
  },
  {
    name: "Blue-Black",
    colors: ["U", "B"],
    nickname: "Dimir",
    gradient: "from-blue-600 to-gray-900"
  },
  {
    name: "Red-White",
    colors: ["R", "W"],
    nickname: "Boros",
    gradient: "from-red-600 to-slate-200"
  },
  {
    name: "Black-Green",
    colors: ["B", "G"],
    nickname: "Golgari",
    gradient: "from-gray-900 to-green-600"
  },
  {
    name: "Green-Blue",
    colors: ["G", "U"],
    nickname: "Simic",
    gradient: "from-green-600 to-blue-600"
  }
];

export const shardCombos: ColorCombo[] = [
  {
    name: "White-Blue-Black",
    colors: ["W", "U", "B"],
    nickname: "Esper",
    gradient: "from-slate-200 via-blue-600 to-gray-900"
  },
  {
    name: "Blue-Black-Red",
    colors: ["U", "B", "R"],
    nickname: "Grixis",
    gradient: "from-blue-600 via-gray-900 to-red-600"
  },
  {
    name: "Black-Red-Green",
    colors: ["B", "R", "G"],
    nickname: "Jund",
    gradient: "from-gray-900 via-red-600 to-green-600"
  },
  {
    name: "Red-Green-White",
    colors: ["R", "G", "W"],
    nickname: "Naya",
    gradient: "from-red-600 via-green-600 to-slate-200"
  },
  {
    name: "Green-White-Blue",
    colors: ["G", "W", "U"],
    nickname: "Bant",
    gradient: "from-green-600 via-slate-200 to-blue-600"
  },
  {
    name: "White-Black-Green",
    colors: ["W", "B", "G"],
    nickname: "Abzan",
    gradient: "from-slate-200 via-gray-900 to-green-600"
  },
  {
    name: "Blue-Red-White",
    colors: ["U", "R", "W"],
    nickname: "Jeskai",
    gradient: "from-blue-600 via-red-600 to-slate-200"
  },
  {
    name: "Black-Green-Blue",
    colors: ["B", "G", "U"],
    nickname: "Sultai",
    gradient: "from-gray-900 via-green-600 to-blue-600"
  },
  {
    name: "Red-White-Black",
    colors: ["R", "W", "B"],
    nickname: "Mardu",
    gradient: "from-red-600 via-slate-200 to-gray-900"
  },
  {
    name: "Green-Blue-Red",
    colors: ["G", "U", "R"],
    nickname: "Temur",
    gradient: "from-green-600 via-blue-600 to-red-600"
  }
];

export const nephilimCombos: ColorCombo[] = [
  {
    name: "White-Blue-Black-Red",
    colors: ["W", "U", "B", "R"],
    nickname: "Chaos",
    gradient: "from-slate-200 via-blue-600 via-gray-900 to-red-600"
  },
  {
    name: "Blue-Black-Red-Green",
    colors: ["U", "B", "R", "G"],
    nickname: "Glint",
    gradient: "from-blue-600 via-gray-900 via-red-600 to-green-600"
  },
  {
    name: "Black-Red-Green-White",
    colors: ["B", "R", "G", "W"],
    nickname: "Dune",
    gradient: "from-gray-900 via-red-600 via-green-600 to-slate-200"
  },
  {
    name: "Red-Green-White-Blue",
    colors: ["R", "G", "W", "U"],
    nickname: "Ink",
    gradient: "from-red-600 via-green-600 via-slate-200 to-blue-600"
  },
  {
    name: "Green-White-Blue-Black",
    colors: ["G", "W", "U", "B"],
    nickname: "Witch",
    gradient: "from-green-600 via-slate-200 via-blue-600 to-gray-900"
  }
];