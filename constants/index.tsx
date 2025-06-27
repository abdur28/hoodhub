// constants/index.ts
import { Scissors, PaintBucket, Diamond, Heart, Star, Users, HelpCircle } from "lucide-react";

// Static data (no translation needed)
export const heroImages = [
  {
    id: 1,
    url: {
      mobile: '/Hoodxhub-display-board.jpg',
      desktop: '/Hoodxhub-display-board-2.jpg',
    },
    alt: "Hoodxhub display board",
  }
];

// About data with dictionary keys
export const aboutData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2340&auto=format&fit=crop",
    titleKey: "about.masterCraftsmanship",
    categoryKey: "about.barbing",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1586243287039-23f4c8e2e7ab?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    titleKey: "about.artisticExcellence",
    categoryKey: "about.tattoo",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1612887390768-fb02affea7a6?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    titleKey: "about.premiumExperience",
    categoryKey: "about.lifestyle",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?q=80&w=2340&auto=format&fit=crop",
    titleKey: "about.modernTechniques",
    categoryKey: "about.innovation",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1604449325317-4967c715538a?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    titleKey: "about.attentionToDetail",
    categoryKey: "about.precision",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?q=80&w=3094&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    titleKey: "about.creativeVision",
    categoryKey: "about.design",
  },
];

// Static image data
export const barbingImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?q=80&w=3044&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Classic barbershop interior with vintage chair",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2340&auto=format&fit=crop",
    alt: "Professional barber cutting hair with precision",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2340&auto=format&fit=crop",
    alt: "Professional barber tools and accessories",
  },
];

export const tattooImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Tattoo artist creating detailed artwork",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1604374376934-2df6fad6519b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Professional tattoo equipment and inks",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1724343163782-52276ca2e6c2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://images.unsplash.com/photo-1733995471058-3d6ff2013de3?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    titleKey: "services.male.spaWellness.title",
    descriptionKey: "services.male.spaWellness.description",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2340&auto=format&fit=crop",
  },
  {
    id: 3,
    titleKey: "services.male.styleConsultation.title",
    descriptionKey: "services.male.styleConsultation.description",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2340&auto=format&fit=crop",
  },
];
 
export const femaleServices = [
  {
    id: 1,
    titleKey: "services.female.beautyMakeup.title",
    descriptionKey: "services.female.beautyMakeup.description",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2340&auto=format&fit=crop",
  },
  {
    id: 2,
    titleKey: "services.female.hairStyling.title",
    descriptionKey: "services.female.hairStyling.description",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2340&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2340&auto=format&fit=crop",
    icon: Star,
    color: "from-yellow-400/20 to-yellow-600/10"
  },
  {
    id: 2,
    titleKey: "story.craft.title",
    subtitleKey: "story.craft.year",
    contentKey: "story.craft.content",
    image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=2340&auto=format&fit=crop",
    icon: Scissors,
    color: "from-amber-400/20 to-amber-600/10"
  },
  {
    id: 3,
    titleKey: "story.art.title",
    subtitleKey: "story.art.year",
    contentKey: "story.art.content",
    image: "https://images.unsplash.com/photo-1604374376934-2df6fad6519b?q=80&w=2940&auto=format&fit=crop",
    icon: PaintBucket,
    color: "from-rose-400/20 to-rose-600/10"
  },
  {
    id: 4,
    titleKey: "story.community.title",
    subtitleKey: "story.community.year",
    contentKey: "story.community.content",
    image: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?q=80&w=3094&auto=format&fit=crop",
    icon: Users,
    color: "from-emerald-400/20 to-emerald-600/10"
  },
  {
    id: 5,
    titleKey: "story.legacy.title",
    subtitleKey: "story.legacy.year",
    contentKey: "story.legacy.content",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2340&auto=format&fit=crop",
    icon: Heart,
    color: "from-purple-400/20 to-purple-600/10"
  },
];

// Team members with dictionary keys
export const teamMembers = [
  {
    id: 1,
    nameKey: "team.marcus.name",
    roleKey: "team.marcus.role",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop",
    bioKey: "team.marcus.bio",
    social: {
      instagram: "#",
      twitter: "#",
      whatsapp: "#",
    }
  },
  {
    id: 2,
    nameKey: "team.isabella.name",
    roleKey: "team.isabella.role",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
    bioKey: "team.isabella.bio",
    social: {
      instagram: "#",
      twitter: "#",
      whatsapp: "#"
    }
  },
  {
    id: 3,
    nameKey: "team.jamal.name",
    roleKey: "team.jamal.role",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop",
    bioKey: "team.jamal.bio",
    social: {
      instagram: "#",
      twitter: "#",
      whatsapp: "#"
    }
  },
  {
    id: 4,
    nameKey: "team.sophie.name",
    roleKey: "team.sophie.role",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop",
    bioKey: "team.sophie.bio",
    social: {
      instagram: "#",
      twitter: "#",
      whatsapp: "#"
    }
  },
  {
    id: 5,
    nameKey: "team.diego.name",
    roleKey: "team.diego.role",
    image: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?q=80&w=2574&auto=format&fit=crop",
    bioKey: "team.diego.bio",
    social: {
      instagram: "#",
      twitter: "#",
      whatsapp: "#"
    }
  },
  {
    id: 6,
    nameKey: "team.aisha.name",
    roleKey: "team.aisha.role",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2564&auto=format&fit=crop",
    bioKey: "team.aisha.bio",
    social: {
      instagram: "#",
      twitter: "#",
      whatsapp: "#"
    }
  },
  {
    id: 7,
    nameKey: "team.tyrone.name",
    roleKey: "team.tyrone.role",
    image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2576&auto=format&fit=crop",
    bioKey: "team.tyrone.bio",
    social: {
      instagram: "#",
      twitter: "#",
      whatsapp: "#"
    }
  },
  {
    id: 8,
    nameKey: "team.elena.name",
    roleKey: "team.elena.role",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop",
    bioKey: "team.elena.bio",
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
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
  },
  {
    nameKey: "tattooArtists.aisha.name",
    specialtyKey: "tattooArtists.aisha.specialty",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2564&auto=format&fit=crop"
  },
  {
    nameKey: "tattooArtists.diego.name",
    specialtyKey: "tattooArtists.diego.specialty",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=2598&auto=format&fit=crop"
  },
  {
    nameKey: "tattooArtists.nikolai.name",
    specialtyKey: "tattooArtists.nikolai.specialty",
    image: "https://images.unsplash.com/photo-1570158268183-d296b2892211?q=80&w=2574&auto=format&fit=crop"
  }
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
