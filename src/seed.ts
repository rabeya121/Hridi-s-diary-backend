import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db";
import Product from "./models/Product";
import Combo from "./models/Combo";

dotenv.config();

const products = [
  // ---------- SKINCARE (9) ----------
  {
    title: "Rose Water Face Toner",
    category: "skincare",
    shortDescription: "Alcohol-free rose water toner for daily glow",
    fullDescription:
      "A gentle, alcohol-free toner made with pure rose water to hydrate, soothe, and refresh your skin. Suitable for all skin types, helps minimize pores and balance skin pH after cleansing.",
    price: 450,
    images: ["https://picsum.photos/seed/hd-toner1/600/750"],
    specs: { skinType: "All skin types", brand: "Hridi's Diary" },
    stock: 60,
  },
  {
    title: "Vitamin C Brightening Serum",
    category: "skincare",
    shortDescription: "20% Vitamin C serum for radiant, even-toned skin",
    fullDescription:
      "Powerful antioxidant serum formulated with 20% Vitamin C and Vitamin E to fade dark spots, brighten complexion, and protect against environmental damage. Lightweight, fast-absorbing formula for daily use.",
    price: 890,
    images: ["https://picsum.photos/seed/hd-vitc2/600/750"],
    specs: { skinType: "All skin types", brand: "Hridi's Diary" },
    stock: 45,
  },
  {
    title: "Hyaluronic Acid Moisture Serum",
    category: "skincare",
    shortDescription: "Deep hydration serum with multi-weight hyaluronic acid",
    fullDescription:
      "Delivers intense, long-lasting hydration by drawing moisture into the skin at multiple layers. Plumps fine lines and restores a dewy, healthy glow. Ideal for dry and dehydrated skin.",
    price: 750,
    images: ["https://picsum.photos/seed/hd-hyal3/600/750"],
    specs: { skinType: "Dry & dehydrated", brand: "Hridi's Diary" },
    stock: 50,
  },
  {
    title: "Charcoal Deep Cleanse Face Wash",
    category: "skincare",
    shortDescription: "Detoxifying charcoal cleanser for oily & acne-prone skin",
    fullDescription:
      "Activated charcoal and tea tree oil work together to draw out impurities, excess oil, and pollutants without stripping the skin. Leaves face feeling clean, matte, and refreshed.",
    price: 380,
    images: ["https://picsum.photos/seed/hd-charcoal4/600/750"],
    specs: { skinType: "Oily & acne-prone", brand: "Hridi's Diary" },
    stock: 70,
  },
  {
    title: "Aloe Vera Soothing Gel",
    category: "skincare",
    shortDescription: "99% pure aloe gel for calming and hydrating skin",
    fullDescription:
      "A multipurpose soothing gel made from 99% pure aloe vera extract. Calms sunburn, irritation, and redness while providing lightweight hydration. Can also be used on hair and body.",
    price: 320,
    images: ["https://picsum.photos/seed/hd-aloe5/600/750"],
    specs: { skinType: "All skin types", brand: "Hridi's Diary" },
    stock: 80,
  },
  {
    title: "Niacinamide 10% Pore Refining Serum",
    category: "skincare",
    shortDescription: "Minimizes pores and controls oil production",
    fullDescription:
      "A high-strength Niacinamide serum that visibly reduces the appearance of enlarged pores, regulates sebum production, and improves overall skin texture with consistent use.",
    price: 680,
    images: ["https://picsum.photos/seed/hd-niacin6/600/750"],
    specs: { skinType: "Oily & combination", brand: "Hridi's Diary" },
    stock: 55,
  },
  {
    title: "SPF 50+ Matte Sunscreen",
    category: "skincare",
    shortDescription: "Broad-spectrum sunscreen with a lightweight matte finish",
    fullDescription:
      "Non-greasy, broad-spectrum SPF 50+ sunscreen that protects against UVA/UVB rays while leaving a matte, no-white-cast finish. Perfect for daily wear under makeup.",
    price: 590,
    images: ["https://picsum.photos/seed/hd-spf7/600/750"],
    specs: { skinType: "All skin types", brand: "Hridi's Diary" },
    stock: 65,
  },
  {
    title: "Overnight Repair Sleeping Mask",
    category: "skincare",
    shortDescription: "Nourishing night mask for skin renewal while you sleep",
    fullDescription:
      "A rich, non-sticky overnight mask infused with ceramides and peptides that work while you sleep to repair the skin barrier and restore softness by morning.",
    price: 820,
    images: ["https://picsum.photos/seed/hd-sleepmask8/600/750"],
    specs: { skinType: "Dry & normal", brand: "Hridi's Diary" },
    stock: 40,
  },
  {
    title: "Under Eye Brightening Cream",
    category: "skincare",
    shortDescription: "Reduces dark circles and puffiness around the eyes",
    fullDescription:
      "A cooling under-eye cream enriched with caffeine and vitamin K to visibly reduce dark circles, puffiness, and fine lines around the delicate eye area.",
    price: 560,
    images: ["https://picsum.photos/seed/hd-eyecream9/600/750"],
    specs: { skinType: "All skin types", brand: "Hridi's Diary" },
    stock: 48,
  },

  // ---------- HAIRCARE (9) ----------
  {
    title: "Argan Oil Nourishing Shampoo",
    category: "haircare",
    shortDescription: "Sulfate-free shampoo enriched with Moroccan argan oil",
    fullDescription:
      "A sulfate-free, gentle cleansing shampoo infused with argan oil to nourish dry and damaged hair, restoring softness and shine without stripping natural oils.",
    price: 480,
    images: ["https://picsum.photos/seed/hd-shampoo1/600/750"],
    specs: { size: "300ml", brand: "Hridi's Diary" },
    stock: 60,
  },
  {
    title: "Keratin Smooth Conditioner",
    category: "haircare",
    shortDescription: "Smoothing conditioner for frizz-free, silky hair",
    fullDescription:
      "A deep conditioning treatment infused with keratin protein to repair damaged strands, reduce frizz, and leave hair silky smooth and manageable.",
    price: 520,
    images: ["https://picsum.photos/seed/hd-conditioner2/600/750"],
    specs: { size: "300ml", brand: "Hridi's Diary" },
    stock: 55,
  },
  {
    title: "Onion Black Seed Hair Oil",
    category: "haircare",
    shortDescription: "Traditional hair oil blend to reduce hair fall",
    fullDescription:
      "A traditional blend of onion extract and black seed oil, known for strengthening hair roots, reducing hair fall, and promoting healthy hair growth with regular use.",
    price: 350,
    images: ["https://picsum.photos/seed/hd-onionoil3/600/750"],
    specs: { size: "200ml", brand: "Hridi's Diary" },
    stock: 70,
  },
  {
    title: "Deep Repair Hair Mask",
    category: "haircare",
    shortDescription: "Weekly hair mask for chemically treated & damaged hair",
    fullDescription:
      "An intensive weekly treatment mask formulated with shea butter and protein complex to repair split ends, restore elasticity, and revive dull, damaged hair.",
    price: 620,
    images: ["https://picsum.photos/seed/hd-hairmask4/600/750"],
    specs: { size: "250ml", brand: "Hridi's Diary" },
    stock: 42,
  },
  {
    title: "Anti-Dandruff Scalp Shampoo",
    category: "haircare",
    shortDescription: "Medicated shampoo for flake-free, healthy scalp",
    fullDescription:
      "A gentle medicated formula with zinc pyrithione that effectively controls dandruff and soothes an itchy scalp, while keeping hair soft and manageable.",
    price: 440,
    images: ["https://picsum.photos/seed/hd-antidandruff5/600/750"],
    specs: { size: "300ml", brand: "Hridi's Diary" },
    stock: 58,
  },
  {
    title: "Heat Protectant Hair Serum",
    category: "haircare",
    shortDescription: "Lightweight serum to shield hair from heat styling",
    fullDescription:
      "A lightweight, non-greasy serum that forms a protective barrier against heat damage from straighteners and blow dryers, while adding shine and reducing frizz.",
    price: 490,
    images: ["https://picsum.photos/seed/hd-heatserum6/600/750"],
    specs: { size: "100ml", brand: "Hridi's Diary" },
    stock: 50,
  },
  {
    title: "Rice Water Hair Growth Tonic",
    category: "haircare",
    shortDescription: "Fermented rice water tonic for stronger, fuller hair",
    fullDescription:
      "Inspired by traditional Asian hair rituals, this fermented rice water tonic is packed with amino acids and vitamins to strengthen hair follicles and support natural growth.",
    price: 410,
    images: ["https://picsum.photos/seed/hd-ricewater7/600/750"],
    specs: { size: "200ml", brand: "Hridi's Diary" },
    stock: 52,
  },
  {
    title: "Silk Wrap Hair Turban Towel",
    category: "haircare",
    shortDescription: "Gentle microfiber turban for damage-free hair drying",
    fullDescription:
      "A super-absorbent microfiber hair towel designed in a comfortable turban wrap style, reducing friction and breakage compared to regular cotton towels.",
    price: 390,
    images: ["https://picsum.photos/seed/hd-turban8/600/750"],
    specs: { material: "Microfiber", brand: "Hridi's Diary" },
    stock: 45,
  },
  {
    title: "Wide-Tooth Detangling Comb",
    category: "haircare",
    shortDescription: "Anti-static wooden comb for gentle detangling",
    fullDescription:
      "Handcrafted wide-tooth wooden comb designed to gently detangle wet or dry hair without causing breakage, while reducing static and frizz.",
    price: 180,
    images: ["https://picsum.photos/seed/hd-comb9/600/750"],
    specs: { material: "Neem wood", brand: "Hridi's Diary" },
    stock: 90,
  },

  // ---------- UNDERGARMENTS (9) ----------
  {
    title: "Cotton Comfort Everyday Bra",
    category: "undergarments",
    shortDescription: "Breathable cotton bra for all-day comfort",
    fullDescription:
      "Made from soft, breathable cotton blend fabric with wire-free support, designed for everyday comfort without compromising on shape and coverage.",
    price: 650,
    images: ["https://picsum.photos/seed/hd-bra1/600/750"],
    specs: { size: "32B-38D", material: "Cotton blend" },
    stock: 40,
  },
  {
    title: "Seamless Wire-Free Bralette",
    category: "undergarments",
    shortDescription: "Ultra-soft seamless bralette for a natural fit",
    fullDescription:
      "A lightweight, seamless bralette made with stretch fabric for a barely-there feel. Perfect for lounging or light everyday wear, with no visible lines under clothing.",
    price: 590,
    images: ["https://picsum.photos/seed/hd-bralette2/600/750"],
    specs: { size: "S-XL", material: "Nylon-spandex blend" },
    stock: 48,
  },
  {
    title: "High-Waist Cotton Panties (Pack of 3)",
    category: "undergarments",
    shortDescription: "Full coverage cotton panties, pack of 3",
    fullDescription:
      "Soft, breathable cotton panties with a high-waist design for full coverage and comfort. Includes a pack of 3 in assorted colors, perfect for daily wear.",
    price: 480,
    images: ["https://picsum.photos/seed/hd-panty3/600/750"],
    specs: { size: "S-XXL", material: "100% Cotton" },
    stock: 65,
  },
  {
    title: "Lace Trim Bikini Panties (Pack of 3)",
    category: "undergarments",
    shortDescription: "Elegant lace-trim bikini style, pack of 3",
    fullDescription:
      "A delicate lace-trim bikini panty set combining comfort and elegance. Breathable fabric with a flattering fit, available in a pack of 3 assorted colors.",
    price: 520,
    images: ["https://picsum.photos/seed/hd-lacepanty4/600/750"],
    specs: { size: "S-XL", material: "Cotton-lace blend" },
    stock: 55,
  },
  {
    title: "Padded T-Shirt Bra",
    category: "undergarments",
    shortDescription: "Smooth padded bra ideal for fitted outfits",
    fullDescription:
      "A lightly padded, seamless T-shirt bra designed to give a smooth silhouette under fitted tops and dresses, with breathable moisture-wicking fabric.",
    price: 720,
    images: ["https://picsum.photos/seed/hd-tshirtbra5/600/750"],
    specs: { size: "32B-40D", material: "Microfiber blend" },
    stock: 38,
  },
  {
    title: "Shapewear Tummy Control Slip",
    category: "undergarments",
    shortDescription: "Comfortable shapewear for a smooth silhouette",
    fullDescription:
      "A firm-control shapewear slip that smooths the tummy and hips for a seamless look under fitted outfits, while remaining breathable for all-day wear.",
    price: 890,
    images: ["https://picsum.photos/seed/hd-shapewear6/600/750"],
    specs: { size: "M-XXL", material: "Nylon-spandex" },
    stock: 30,
  },
  {
    title: "Cotton Boyshort Panties (Pack of 3)",
    category: "undergarments",
    shortDescription: "Full coverage boyshort style, pack of 3",
    fullDescription:
      "Soft cotton boyshort panties offering extra coverage and a comfortable, no-ride-up fit. Pack of 3 in classic neutral shades, great for everyday wear.",
    price: 500,
    images: ["https://picsum.photos/seed/hd-boyshort7/600/750"],
    specs: { size: "S-XXL", material: "100% Cotton" },
    stock: 60,
  },
  {
    title: "Sports Bra for Everyday Activity",
    category: "undergarments",
    shortDescription: "Medium-support sports bra for workouts & daily wear",
    fullDescription:
      "A medium-support sports bra made with moisture-wicking, stretch fabric that keeps you comfortable during workouts, yoga, or everyday activities.",
    price: 680,
    images: ["https://picsum.photos/seed/hd-sportsbra8/600/750"],
    specs: { size: "S-XL", material: "Polyester-spandex" },
    stock: 42,
  },
  {
    title: "Silk-Feel Camisole Slip",
    category: "undergarments",
    shortDescription: "Smooth camisole slip for layering under outfits",
    fullDescription:
      "A silky-smooth camisole slip designed for comfortable layering under sheer or fitted tops, with adjustable straps and a breathable, lightweight feel.",
    price: 550,
    images: ["https://picsum.photos/seed/hd-camisole9/600/750"],
    specs: { size: "S-XL", material: "Satin blend" },
    stock: 46,
  },
];

const seedDatabase = async (): Promise<void> => {
  try {
    await connectDB();

    console.log("🧹 Clearing existing products and combos...");
    await Product.deleteMany({});
    await Combo.deleteMany({});

    console.log("🌱 Seeding products...");
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ ${createdProducts.length} products created`);

    const findId = (title: string) =>
      createdProducts.find((p) => p.title === title)?._id;

    const combos = [
      {
        title: "Valentine's Glow & Grace Combo",
        occasion: "valentines",
        products: [
          findId("Rose Water Face Toner"),
          findId("Vitamin C Brightening Serum"),
          findId("Silk-Feel Camisole Slip"),
        ],
        description:
          "A romantic self-care set featuring a glow-boosting skincare duo paired with a silky camisole slip — the perfect Valentine's gift for someone special.",
        images: ["https://picsum.photos/seed/hd-combo-valentine/700/500"],
        originalPrice: 450 + 890 + 550,
        comboPrice: 1520,
        discountPercent: 20,
        validFrom: new Date("2027-01-20"),
        validTo: new Date("2027-02-20"),
      },
      {
        title: "Eid Radiance Gift Box",
        occasion: "eid",
        products: [
          findId("Hyaluronic Acid Moisture Serum"),
          findId("Argan Oil Nourishing Shampoo"),
          findId("Keratin Smooth Conditioner"),
        ],
        description:
          "Celebrate Eid with radiant skin and silky hair. This gift box combines a deep-hydration serum with a nourishing shampoo-conditioner duo, beautifully packaged for gifting.",
        images: ["https://picsum.photos/seed/hd-combo-eid/700/500"],
        originalPrice: 750 + 480 + 520,
        comboPrice: 1450,
        discountPercent: 18,
        validFrom: new Date("2027-03-01"),
        validTo: new Date("2027-04-15"),
      },
      {
        title: "Christmas Sparkle Self-Care Set",
        occasion: "christmas",
        products: [
          findId("Overnight Repair Sleeping Mask"),
          findId("Under Eye Brightening Cream"),
          findId("Rice Water Hair Growth Tonic"),
        ],
        description:
          "Wrap up the festive season with this cozy self-care trio — an overnight repair mask, brightening eye cream, and hair growth tonic, packaged for holiday gifting.",
        images: ["https://picsum.photos/seed/hd-combo-christmas/700/500"],
        originalPrice: 820 + 560 + 410,
        comboPrice: 1450,
        discountPercent: 19,
        validFrom: new Date("2026-12-01"),
        validTo: new Date("2026-12-31"),
      },
      {
        title: "Puja Festive Beauty Hamper",
        occasion: "puja",
        products: [
          findId("Charcoal Deep Cleanse Face Wash"),
          findId("Niacinamide 10% Pore Refining Serum"),
          findId("Onion Black Seed Hair Oil"),
        ],
        description:
          "A festive beauty hamper crafted for Puja celebrations — deep cleansing, pore-refining, and hair-strengthening essentials in one elegant gift set.",
        images: ["https://picsum.photos/seed/hd-combo-puja/700/500"],
        originalPrice: 380 + 680 + 350,
        comboPrice: 1150,
        discountPercent: 20,
        validFrom: new Date("2026-09-15"),
        validTo: new Date("2026-10-31"),
      },
    ];

    console.log("🌱 Seeding combos...");
    const createdCombos = await Combo.insertMany(combos);
    console.log(`✅ ${createdCombos.length} combos created`);

    console.log("🎉 Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();