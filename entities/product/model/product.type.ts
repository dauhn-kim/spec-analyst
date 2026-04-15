export interface Product {
  id: string
  slug: string // URL에 사용될 고유 이름 (예: lg-c6-oled-77)
  name: string
  brand: string
  price: number
  specs: Record<string, string | number> // 스펙 데이터 (예: { "Brightness": 1000, "HDMI": 4 })
  ai_summary: {
    verdict: string // AI 한 줄 평
    pros: string[] // 장점 리스트
    cons: string[] // 단점 리스트
  }
  affiliate_url: string // 수익화 링크
  imageUrl?: string // 상품 이미지 경로
}
