// constants/index.ts
import { Scissors, PaintBucket, Diamond, Heart, Star, Users, HelpCircle } from "lucide-react";

// Static data (no translation needed)
export const heroImages = [
  {
    id: 1,
    url: {
      mobile: '/AAA02646.jpg',
      desktop: '/AAA02646.jpg',
    },
    alt: "Hoodxhub display board",
  },
  {
    id: 2,
    url: {
      mobile: '/AAA02685.jpg',
      desktop: '/AAA02685.jpg',
    },
    alt: "Hoodxhub display board",
  },
  {
    id: 3,
    url: {
      mobile: '/AAA03207.jpg',
      desktop: '/AAA03211.jpg',
    },
    alt: "Hoodxhub display board",
  },
  {
    id: 4,
    url: {
      mobile: '/AAA03036.jpg',
      desktop: '/AAA03036.jpg',
    },
    alt: "Hoodxhub display board",
  },
  {
    id: 5,
    url: {
      mobile: '/AAA03311.jpg',
      desktop: '/AAA03336.jpg',
    },
    alt: "Hoodxhub display board",
  },
];

// About data with dictionary keys
export const aboutData = [
  {
    id: 1,
    src: "/AAA02648.jpg",
    titleKey: "about.masterCraftsmanship",
    categoryKey: "about.barbing",
    link: "/barbing",
  },
  {
    id: 2,
    src: "/AAA02932.jpg",
    titleKey: "about.artisticExcellence",
    categoryKey: "about.tattoo",
    link: "/tattoo",
  },
  {
    id: 3,
    src: "/AAA03009.jpg",
    titleKey: "about.premiumExperience",
    categoryKey: "about.lifestyle",
    link: "/lifestyle",
  },
  {
    id: 4,
    src: "/AAA02778.jpg",
    titleKey: "about.hairArtistry",
    categoryKey: "about.braids&locks",
    link: "/braids-locs",
  },
  {
    id: 5,
    src: "/AAA02963.jpg",
    titleKey: "about.clothingStore",
    categoryKey: "about.hoodskoolStore",
    link: "https://hoodskool.com/",
  },
  {
    id: 6,
    src: "/AAA03311.jpg",
    titleKey: "about.creativeVision",
    categoryKey: "about.design",
    link: "/our-story",
  },
];

// Static image data
export const barbingImages = [
  {
    id: 1,
    url: "/AAA02648.jpg",
    alt: "Classic barbershop interior with vintage chair",
  },
  {
    id: 2,
    url: "/AAA03036.jpg",
    alt: "Professional barber cutting hair with precision",
  },
  {
    id: 3,
    url: "/AAA03207.jpg",
    alt: "Professional barber tools and accessories",
  },
];

export const tattooImages = [
  {
    id: 1,
    url: "/AAA02932.jpg",
    alt: "Tattoo artist creating detailed artwork",
  },
  {
    id: 2,
    url: "/AAA02958.jpg",
    alt: "Professional tattoo equipment and inks",
  },
  {
    id: 3,
    url: "/AAA03313.jpg",
    alt: "Detailed tattoo artwork in progress",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1483821887769-386524ee82cd?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Modern tattoo studio interior",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1563305589-e4995799dba3?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Artistic tattoo design sketches",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1530938347017-ab7acdeb8d3e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Tattoo artist working with precision",
  },
];

// Services with dictionary keys
export const maleServices = [
  {
    id: 1,
    titleKey: "services.male.executiveGrooming.title",
    descriptionKey: "services.male.executiveGrooming.description",
    image: "/AAA03036.jpg",
  },
  {
    id: 2,
    titleKey: "services.male.spaWellness.title",
    descriptionKey: "services.male.spaWellness.description",
    image: "/AAA02647.jpg",
  },
  {
    id: 3,
    titleKey: "services.male.styleConsultation.title",
    descriptionKey: "services.male.styleConsultation.description",
    image: "/AAA02963.jpg",
  },
];
 
export const femaleServices = [
  {
    id: 1,
    titleKey: "services.female.beautyMakeup.title",
    descriptionKey: "services.female.beautyMakeup.description",
    image: "/AAA03009.jpg",
  },
  {
    id: 2,
    titleKey: "services.female.hairStyling.title",
    descriptionKey: "services.female.hairStyling.description",
    image: "/AAA03275.jpg",
  },
  {
    id: 3,
    titleKey: "services.female.nailArtistry.title",
    descriptionKey: "services.female.nailArtistry.description",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2340&auto=format&fit=crop",
  },
];

// HoodSkool products with dictionary keys
export const hoodskoolProducts = [
  {
    id: "hsk-001",
    src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2340&auto=format&fit=crop",
    titleKey: "products.urbanTee",
    price: "6,450.00 ₽",
    categoryKey: "products.categories.streetwear",
    link: "https://hoodskool.com/"
  },
  {
    id: "hsk-002",
    src: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=2340&auto=format&fit=crop",
    titleKey: "products.leatherJacket",
    price: "10,250.00 ₽",
    categoryKey: "products.categories.outerwear",
    link: "https://hoodskool.com/"
  },
  {
    id: "hsk-003",
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2340&auto=format&fit=crop",
    titleKey: "products.goldChain",
    price: "3,750.00 ₽",
    categoryKey: "products.categories.accessories",
    link: "https://hoodskool.com/"
  },
  {
    id: "hsk-004",
    src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2340&auto=format&fit=crop",
    titleKey: "products.sneakers",
    price: "12,500.00 ₽",
    categoryKey: "products.categories.footwear",
    link: "https://hoodskool.com/"
  },
  {
    id: "hsk-005",
    src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2340&auto=format&fit=crop",
    titleKey: "products.hoodie",
    price: "9,000.00 ₽",
    categoryKey: "products.categories.streetwear",
    link: "https://hoodskool.com/"
  },
  {
    id: "hsk-006",
    src: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?q=80&w=2340&auto=format&fit=crop",
    titleKey: "products.snapback",
    price: "2,500.00 ₽",
    categoryKey: "products.categories.headwear",
    link: "https://hoodskool.com/"
  },
  {
    id: "hsk-007",
    src: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2340&auto=format&fit=crop",
    titleKey: "products.tracksuit",
    price: "7,500.00 ₽",
    categoryKey: "products.categories.athleisure",
    link: "https://hoodskool.com/"
  },
  {
    id: "hsk-008",
    src: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=2340&auto=format&fit=crop",
    titleKey: "products.canvasShoes",
    price: "5,000.00 ₽",
    categoryKey: "products.categories.footwear",
    link: "https://hoodskool.com/"
  },
  {
    id: "hsk-009",
    src: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2340&auto=format&fit=crop",
    titleKey: "products.watch",
    price: "23,000.00 ₽",
    categoryKey: "products.categories.accessories",
    link: "https://hoodskool.com/"
  },
  {
    id: "hsk-010",
    src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2340&auto=format&fit=crop",
    titleKey: "products.crossbodyBag",
    price: "6,000.00 ₽",
    categoryKey: "products.categories.accessories",
    link: "https://hoodskool.com/"
  },
];

// Story phases with dictionary keys
export const storyPhases = [
  {
    id: 1,
    titleKey: "story.vision.title",
    subtitleKey: "story.vision.year",
    contentKey: "story.vision.content",
    image: "/AAA02646.jpg",
    icon: Star,
  },
  {
    id: 2,
    titleKey: "story.craft.title",
    subtitleKey: "story.craft.year",
    contentKey: "story.craft.content",
    image: "/AAA02821.jpg",
    icon: Scissors,
  },
  {
    id: 3,
    titleKey: "story.art.title",
    subtitleKey: "story.art.year",
    contentKey: "story.art.content",
    image: "/AAA02909.jpg",
    icon: PaintBucket,
  },
  {
    id: 4,
    titleKey: "story.community.title",
    subtitleKey: "story.community.year",
    contentKey: "story.community.content",
    image: "/AAA03258.jpg",
    icon: Users,
  },
  {
    id: 5,
    titleKey: "story.legacy.title",
    subtitleKey: "story.legacy.year",
    contentKey: "story.legacy.content",
    image: "/AAA02688.jpg",
    icon: Heart,
  },
];

// Team members with dictionary keys
export const teamMembers = [
  {
    id: 1,
    nameKey: "team.marcus.name",
    roleKey: "team.marcus.role",
    image: "/AAA03178.jpg",
    bioKey: "team.marcus.bio",
    social: {
      instagram: "#",
      twitter: "#",
      whatsapp: "#",
    }
  },
  {
    id: 2,
    nameKey: "team.jamal.name",
    roleKey: "team.jamal.role",
    image: "/AAA03421.jpg",
    bioKey: "team.jamal.bio",
    social: {
      instagram: "#",
      twitter: "#",
      whatsapp: "#"
    }
  },
];

// Barbing services with dictionary keys
export const barbingServices = [
  {
    titleKey: "barbingServices.signatureCut.title",
    descriptionKey: "barbingServices.signatureCut.description"
  },
  {
    titleKey: "barbingServices.executiveGrooming.title",
    descriptionKey: "barbingServices.executiveGrooming.description"
  },
  {
    titleKey: "barbingServices.luxuryShave.title",
    descriptionKey: "barbingServices.luxuryShave.description"
  },
  {
    titleKey: "barbingServices.beardSculpting.title",
    descriptionKey: "barbingServices.beardSculpting.description"
  },
  {
    titleKey: "barbingServices.premiumTreatment.title",
    descriptionKey: "barbingServices.premiumTreatment.description"
  }
];

// Tattoo styles with dictionary keys
export const tattooStyles = [
  {
    nameKey: "tattooStyles.realism.name",
    descriptionKey: "tattooStyles.realism.description"
  },
  {
    nameKey: "tattooStyles.geometric.name",
    descriptionKey: "tattooStyles.geometric.description"
  },
  {
    nameKey: "tattooStyles.watercolor.name",
    descriptionKey: "tattooStyles.watercolor.description"
  },
  {
    nameKey: "tattooStyles.japanese.name",
    descriptionKey: "tattooStyles.japanese.description"
  },
  {
    nameKey: "tattooStyles.blackGray.name",
    descriptionKey: "tattooStyles.blackGray.description"
  },
  {
    nameKey: "tattooStyles.minimalist.name",
    descriptionKey: "tattooStyles.minimalist.description"
  },
  {
    nameKey: "tattooStyles.neoTraditional.name",
    descriptionKey: "tattooStyles.neoTraditional.description"
  },
  {
    nameKey: "tattooStyles.tribal.name",
    descriptionKey: "tattooStyles.tribal.description"
  }
];

// Tattoo artists with dictionary keys
export const tattooArtists = [
  {
    nameKey: "tattooArtists.isabella.name",
    specialtyKey: "tattooArtists.isabella.specialty",
    image: "/AAA03178.jpg"
  },
];

// FAQ sections with dictionary keys
export const faqSections = [
  {
    id: "general",
    titleKey: "faq.general.title",
    icon: HelpCircle,
    color: "text-yellow-500",
    questionsKey: "faq.general.questions"
  },
  {
    id: "barbing",
    titleKey: "faq.barbing.title",
    icon: Scissors,
    color: "text-blue-500",
    questionsKey: "faq.barbing.questions"
  },
  {
    id: "tattoo",
    titleKey: "faq.tattoo.title",
    icon: PaintBucket,
    color: "text-red-500",
    questionsKey: "faq.tattoo.questions"
  },
  {
    id: "lifestyle",
    titleKey: "faq.lifestyle.title",
    icon: Diamond,
    color: "text-purple-500",
    questionsKey: "faq.lifestyle.questions"
  }
];

export const braidsLocsImages = [
  {
    id: 1,
    url: "/AAA03211.jpg",
    alt: "Beautiful braids and locs styling"
  },
  {
    id: 2,
    url: "/AAA02821.jpg",
    alt: "Professional braiding technique"
  }
];

// Helper function to get localized data
export const getLocalizedData = (data: any[], dictionary: any, titleKey?: string, descriptionKey?: string, nameKey?: string) => {
  return data.map(item => {
    const localizedItem = { ...item };
    if (titleKey && item.titleKey) {
      const keys = item.titleKey.split(".");
      let value = dictionary;
      for (const key of keys) {
        value = value[key];
      }
      localizedItem.title = value;
    }
    if (descriptionKey && item.descriptionKey) {
      const keys = item.descriptionKey.split(".");
      let value = dictionary;
      for (const key of keys) {
        value = value[key];
      }
      localizedItem.description = value;
    }
    if (nameKey && item.nameKey) {
      console.log(item.nameKey);
      const keys = item.nameKey.split(".");
      let value = dictionary;
      for (const key of keys) {
        value = value[key];
      }
      localizedItem.name = value;
    }
    if (item.categoryKey) {
      const keys = item.categoryKey.split(".");
      let value = dictionary;
      for (const key of keys) {
        value = value[key];
      }
      localizedItem.category = value;
    }
    if (item.roleKey) {
      const keys = item.roleKey.split(".");
      let value = dictionary;
      for (const key of keys) {
        value = value[key];
      }
      localizedItem.role = value;
    }
    if (item.bioKey) {
      const keys = item.bioKey.split(".");
      let value = dictionary;
      for (const key of keys) {
        value = value[key];
      }
      localizedItem.bio = value;
    }
    if (item.specialtyKey) {
      const keys = item.specialtyKey.split(".");
      let value = dictionary;
      for (const key of keys) {
        value = value[key];
      }
      localizedItem.specialty = value;
    }
    if (item.contentKey) {
      const keys = item.contentKey.split(".");
      let value = dictionary;
      for (const key of keys) {
        value = value[key];
      }
      localizedItem.content = value;
    }
    if (item.subtitleKey) {
      const keys = item.subtitleKey.split(".");
      let value = dictionary;
      for (const key of keys) {
        value = value[key];
      }
      localizedItem.subtitle = value;
    }
    return localizedItem;
  });
};
