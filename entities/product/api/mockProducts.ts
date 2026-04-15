import { Category } from "@/entities/category/model/types"
import { Product } from "../model/product.type"

// 1. 카테고리 마스터 데이터 (계층 구조)
const categories: Record<string, Category> = {
  electronics: { id: "c1", slug: "electronics", name: "Electronics", depth: 0 },
  display: {
    id: "c2",
    slug: "display",
    name: "Display",
    parentId: "c1",
    depth: 1,
  },
  tvs: { id: "c3", slug: "tvs", name: "TVs", parentId: "c2", depth: 2 },
  oled_tvs: {
    id: "c4",
    slug: "oled-tvs",
    name: "OLED TVs",
    parentId: "c3",
    depth: 3,
  },
}

export const mockProducts: Product[] = [
  {
    id: "p1",
    slug: "lg-c6-oled-77",
    name: "LG OLED C6 77-Inch",
    brand: "LG",
    // 2. 카테고리 스택 (SEO 및 Breadcrumb용)
    categories: [
      categories.electronics,
      categories.display,
      categories.tvs,
      categories.oled_tvs,
    ],
    // 3. 실시간성을 고려한 가격 구조
    price: {
      amount: 2499.99,
      currency: "USD",
      lastUpdated: "2026-04-15T08:00:00Z", // Apify 스캔 타임스탬프
    },
    specs: {
      Display: "OLED",
      Brightness: "1300 nits (Peak)", // 숫자가 아닌 문자열로 올 가능성 대비
      "Refresh Rate": "120Hz",
      "HDMI Ports": 4,
      Weight: "25.4 kg",
    },
    ai_summary: {
      verdict:
        "The benchmark for high-end home cinema in 2026 with refined MLA technology.",
      pros: [
        "Exceptional 1300-nit peak brightness",
        "Near-infinite contrast ratio",
        "Industry-leading AI upscaling",
      ],
      cons: [
        "Relatively high price at launch",
        "Glossy screen prone to reflections",
      ],
    },
    affiliate_url: "https://amazon.com/example-lg",
    // 4. 성능 최적화를 위한 이미지 경로 (Next.js Image용)
    imageUrl: "https://images.example.com/lg-c6-77.webp",
  },
  {
    id: "p2",
    slug: "samsung-s95f-oled-77",
    name: "Samsung S95F QD-OLED 77-Inch",
    brand: "Samsung",
    categories: [
      categories.electronics,
      categories.display,
      categories.tvs,
      categories.oled_tvs,
    ],
    price: {
      amount: 2699.0,
      currency: "USD",
      lastUpdated: "2026-04-15T09:30:00Z",
    },
    specs: {
      Display: "QD-OLED",
      Brightness: "1600 nits (Peak)",
      "Refresh Rate": "144Hz",
      "HDMI Ports": 4,
      Weight: "24.1 kg",
    },
    ai_summary: {
      verdict:
        "Vibrant colors and unmatched peak brightness powered by 3rd-gen QD-OLED.",
      pros: [
        "Superior color volume",
        "Game-ready 144Hz support",
        "Unrivaled peak HDR brightness",
      ],
      cons: ["Still no Dolby Vision support", "Raised blacks in bright rooms"],
    },
    affiliate_url: "https://amazon.com/example-samsung",
    imageUrl: "https://images.example.com/samsung-s95f-77.webp",
  },
]
