export type JewelryCategory =
  | "Rings"
  | "Necklaces"
  | "Bracelets"
  | "Earrings"
  | "Pendants"
  | "Sets";

export interface DemoProduct {
  id: string;
  name: string;
  description: string;
  price: number; // USD cents
  category: JewelryCategory;
  imageUrl: string;
  featured: boolean;
}

export const JEWELRY_CATEGORIES: { id: JewelryCategory; name: string }[] = [
  { id: "Rings", name: "Rings" },
  { id: "Necklaces", name: "Necklaces" },
  { id: "Bracelets", name: "Bracelets" },
  { id: "Earrings", name: "Earrings" },
  { id: "Pendants", name: "Pendants" },
  { id: "Sets", name: "Sets" },
];

export const JEWELRY_PRODUCTS: DemoProduct[] = [
  {
    id: "ring-sapphire-halo",
    name: "Celestial Sapphire Halo Ring",
    description:
      "A stunning oval-cut sapphire surrounded by a delicate halo of pavé diamonds set in 18k white gold. A timeless symbol of elegance and devotion.",
    price: 580000,
    category: "Rings",
    imageUrl: "https://picsum.photos/seed/ring1/600/600",
    featured: true,
  },
  {
    id: "necklace-emerald-drop",
    name: "Verdant Emerald Drop Necklace",
    description:
      "A pear-shaped Colombian emerald suspended on a fine 18k gold chain. Rich verdant color with exceptional clarity, each piece uniquely formed by nature.",
    price: 420000,
    category: "Necklaces",
    imageUrl: "https://picsum.photos/seed/necklace1/600/600",
    featured: true,
  },
  {
    id: "earrings-ruby-cluster",
    name: "Crimson Ruby Cluster Earrings",
    description:
      "Deep Burmese ruby clusters in a vintage-inspired floral setting. Each earring is hand-crafted in 18k rose gold with brilliant-cut diamond accents.",
    price: 320000,
    category: "Earrings",
    imageUrl: "https://picsum.photos/seed/earrings1/600/600",
    featured: true,
  },
  {
    id: "bracelet-diamond-tennis",
    name: "Luminous Diamond Tennis Bracelet",
    description:
      "A continuous line of round brilliant diamonds totaling 5.2 carats, set in a refined 18k white gold prong setting for maximum brilliance and security.",
    price: 950000,
    category: "Bracelets",
    imageUrl: "https://picsum.photos/seed/bracelet1/600/600",
    featured: false,
  },
  {
    id: "pendant-sapphire-cross",
    name: "Midnight Sapphire Cross Pendant",
    description:
      "An heirloom-quality cross pendant adorned with deep blue sapphires and brilliant diamond borders set in 18k yellow gold. A piece of enduring spiritual beauty.",
    price: 185000,
    category: "Pendants",
    imageUrl: "https://picsum.photos/seed/pendant1/600/600",
    featured: false,
  },
  {
    id: "set-emerald-parure",
    name: "Imperial Emerald Parure Set",
    description:
      "A magnificent three-piece suite — necklace, earrings, and ring — featuring matched Colombian emeralds with diamond accents. A true collector's treasure.",
    price: 895000,
    category: "Sets",
    imageUrl: "https://picsum.photos/seed/set1/600/600",
    featured: true,
  },
  {
    id: "ring-diamond-solitaire",
    name: "Eternal Diamond Solitaire Ring",
    description:
      "A classic round brilliant solitaire of 2.1 carats in a cathedral setting. Crafted in platinum for a lifetime of wear with uncompromising elegance.",
    price: 750000,
    category: "Rings",
    imageUrl: "https://picsum.photos/seed/ring2/600/600",
    featured: false,
  },
  {
    id: "necklace-ruby-cabochon",
    name: "Scarlet Cabochon Ruby Necklace",
    description:
      "A bold cabochon-cut Mozambique ruby of 8 carats set in a hand-engraved 22k gold bezel. Inspired by ancient Mughal jewelry traditions.",
    price: 680000,
    category: "Necklaces",
    imageUrl: "https://picsum.photos/seed/necklace2/600/600",
    featured: false,
  },
  {
    id: "earrings-diamond-drops",
    name: "Aurora Diamond Drop Earrings",
    description:
      "Graceful pear-cut diamond drops totaling 3.4 carats, suspended from delicate diamond studs. A masterclass in refined movement and light.",
    price: 520000,
    category: "Earrings",
    imageUrl: "https://picsum.photos/seed/earrings2/600/600",
    featured: false,
  },
  {
    id: "bracelet-sapphire-bangle",
    name: "Oceanic Sapphire Bangle",
    description:
      "A sleek 18k white gold bangle encrusted with alternating sapphires and brilliant diamonds across its full circumference. Effortlessly worn day to night.",
    price: 390000,
    category: "Bracelets",
    imageUrl: "https://picsum.photos/seed/bracelet2/600/600",
    featured: false,
  },
];
