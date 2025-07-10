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
    src: "/AAA02778.jpg",
    titleKey: "about.hairArtistry",
    categoryKey: "about.braids&locks",
    link: "/braids-locs",
  },
  {
    id: 3,
    src: "/AAA02932.jpg",
    titleKey: "about.artisticExcellence",
    categoryKey: "about.tattoo",
    link: "/tattoo",
  },
  {
    id: 4,
    src: "/AAA03009.jpg",
    titleKey: "about.premiumExperience",
    categoryKey: "about.lifestyle",
    link: "/lifestyle",
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
    src: "https://hoodskool.com/wp-content/uploads/2024/12/HoodSkool_1711202451400.jpg",
    titleKey: "products.pants1",
    price: "14,999.00 ₽",
    categoryKey: "products.categories.pants",
    link: "https://hoodskool.com/product/hood-signature-pant-in-coffee-brown-x-black-lining/"
  },
  {
    id: "hsk-002",
    src: "https://hoodskool.com/wp-content/uploads/2024/12/HoodSkool_1711202451914.jpg",
    titleKey: "products.hoodies1",
    price: "26,950.00 ₽",
    categoryKey: "products.categories.hoodies",
    link: "https://hoodskool.com/product/vintage-hoodie-in-black/"
  },
  {
    id: "hsk-003",
    src: "https://hoodskool.com/wp-content/uploads/2024/12/DSC04297.jpg",
    titleKey: "products.shirt1",
    price: "8,999.00 ₽",
    categoryKey: "products.categories.shirts",
    link: "https://hoodskool.com/product/t-shirt-with-hood-silicone-in-graphite-black/"
  },
  {
    id: "hsk-004",
    src: "https://hoodskool.com/wp-content/uploads/2024/09/HoodSkool_Catalog_0408202313154-scaled.jpg",
    titleKey: "products.pants2",
    price: "15,250.00 ₽",
    categoryKey: "products.categories.pants",
    link: "https://hoodskool.com/product/hood-signature-pant-with-split-bottom/"
  },
  {
    id: "hsk-005",
    src: "https://hoodskool.com/wp-content/uploads/2024/12/HoodSkool_1711202451763.jpg",
    titleKey: "products.hoodies2",
    price: "22,500.00 ₽",
    categoryKey: "products.categories.hoodies",
    link: "https://hoodskool.com/product/vintage-hoodie-in-black-2/"
  },
  {
    id: "hsk-006",
    src: "https://hoodskool.com/wp-content/uploads/2024/12/DSC03659-1.jpg",
    titleKey: "products.shirt2",
    price: "10,999.00 ₽",
    categoryKey: "products.categories.shirts",
    link: "https://hoodskool.com/product/hoodskool-t-shirt-in-black/"
  },
  {
    id: "hsk-007",
    src: "https://hoodskool.com/wp-content/uploads/2024/09/DSC08968.jpg",
    titleKey: "products.shirt3",
    price: "3,500.00 ₽",
    categoryKey: "products.categories.shirts",
    link: "https://hoodskool.com/product/hoodskool-plain-white-ts/"
  },
  {
    id: "hsk-008",
    src: "https://hoodskool.com/wp-content/uploads/2024/09/HoodSkool_Catalog_0408202313111-scaled.jpg",
    titleKey: "products.vest1",
    price: "6,999.00 ₽",
    categoryKey: "products.categories.vest",
    link: "https://hoodskool.com/product/hood-signature-vest-in-black-checkers/"
  },
  {
    id: "hsk-009",
    src: "https://hoodskool.com/wp-content/uploads/2024/09/DSC08958.jpg",
    titleKey: "products.socks1",
    price: "500.00 ₽",
    categoryKey: "products.categories.accessories",
    link: "https://hoodskool.com/product/hoodskool-socks-in-white-x-black/"
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
    nameKey: "team.antonio.name",
    roleKey: "team.antonio.role",
    image: "/AAA03178.jpg",
    bioKey: "team.antonio.bio",
    social: {
      instagram: "anthony.tattoo_ink",
    }
  },
  {
    id: 2,
    nameKey: "team.mikkie.name",
    roleKey: "team.mikkie.role",
    image: "/AAA03421.jpg",
    bioKey: "team.mikkie.bio",
    social: {
      instagram: "mikkies_hair",
      tiktok: "staycute03",
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
    nameKey: "team.antonio.name",
    specialtyKey: "team.antonio.role",
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
