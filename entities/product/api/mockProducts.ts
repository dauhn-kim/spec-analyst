import { Product } from "../model/product.type"

export const mockProducts: Product[] = [
  {
    id: "p1",
    slug: "lg-c6-oled-77",
    name: "LG OLED C6 77-Inch",
    brand: "LG",
    price: 2499,
    specs: {
      Display: "OLED",
      Brightness: 1000,
      "Refresh Rate": 120,
      "HDMI Ports": 4,
      Weight: 25.4,
    },
    ai_summary: {
      verdict: "The benchmark for high-end home cinema in 2026.",
      pros: ["Infinite contrast", "Superb AI upscaling"],
      cons: ["Brightness still lags behind QD-OLED"],
    },
    affiliate_url: "https://amazon.com/example-lg",
  },
  {
    id: "p2",
    slug: "samsung-s95f-oled-77",
    name: "Samsung S95F QD-OLED 77-Inch",
    brand: "Samsung",
    price: 2699,
    specs: {
      Display: "QD-OLED",
      Brightness: 1500,
      "Refresh Rate": 144,
      "HDMI Ports": 4,
      Weight: 24.1,
    },
    ai_summary: {
      verdict: "Vibrant colors and unmatched peak brightness.",
      pros: ["QD-OLED brilliance", "Game-ready 144Hz"],
      cons: ["Lack of Dolby Vision support"],
    },
    affiliate_url: "https://amazon.com/example-samsung",
  },
]
