export interface Category {
  id: string
  slug: string // URL용 (예: electronics, displays, oled-tvs)
  name: string // 표시 이름
  parentId?: string // 상위 카테고리 ID (없으면 최상위)
  depth: number // 0: Root, 1: Main, 2: Sub...

  // Apify 데이터 매핑용 (스크래퍼가 가져온 원본 카테고리 이름들과 매칭)
  sourceNames?: string[]
}
