# 📐 SpecAnalyst.ai - FSD Architecture Guide

## 🎯 Overview

SpecAnalyst.ai는 단순한 비교 사이트가 아닌,
**데이터 기반으로 페이지가 자동 생성되는 pSEO 시스템**입니다.

이를 위해 확장성과 유지보수성을 보장하는
**Feature-Sliced Design (FSD)** 아키텍처를 사용합니다.

---

## 🏗️ Directory Structure

```
app/                # Next.js App Router (라우팅 전용)
widgets/            # 페이지 단위 UI 조합
features/           # 사용자 인터랙션
entities/           # 도메인 모델 (핵심)
shared/             # 공통 모듈 (UI, util, api)
```

### 📁 상세 구조

```
app/
  layout.tsx
  page.tsx
  compare/[slug]/page.tsx
  category/[slug]/page.tsx

widgets/
  header/
    ui/Header.tsx
  compare-board/
    ui/CompareBoard.tsx

features/
  search/
    ui/SearchBar.tsx
    model/useSearch.ts
  ai-summary/
    ui/AiSummaryBox.tsx

entities/
  product/
    model/product.types.ts
    api/mockProducts.ts
    ui/ProductCard.tsx
    ui/SpecTable.tsx

shared/
  ui/                # shadcn/ui 기반 컴포넌트
  lib/               # utils (cn, helpers)
  api/               # fetch/axios client
  types/             # 공통 타입
```

---

## 🧩 Layer Responsibilities

### 1️⃣ app (Routing Layer)

- Next.js App Router 전용
- 페이지 진입점 역할
- **비즈니스 로직 금지**

```tsx
// app/compare/[slug]/page.tsx
import { CompareBoard } from "@/widgets/compare-board/ui/CompareBoard"

export default function Page() {
  return <CompareBoard />
}
```

---

### 2️⃣ widgets (Page Composition)

- 여러 feature / entity를 조합
- 페이지 단위 UI 구성

```tsx
export const CompareBoard = () => {
  return (
    <>
      <AiSummaryBox />
      <SpecTable />
    </>
  )
}
```

---

### 3️⃣ features (User Interaction)

- 사용자 행동 처리
- 상태 관리 및 이벤트 로직

예:

- 검색
- 비교 토글
- 필터링

---

### 4️⃣ entities (Domain Layer) ⭐ 핵심

- 비즈니스 데이터 중심
- Product, User 등 도메인 모델 관리

```ts
// entities/product/model/product.types.ts
export interface Product {
  id: string
  name: string
  price: number
}
```

---

### 5️⃣ shared (Foundation Layer)

- 완전 공통 코드
- 프로젝트 전역에서 재사용

#### 포함 대상

- shadcn/ui 컴포넌트
- utils (cn, format)
- API client
- 공통 타입

---

## 🎨 UI Architecture (shadcn)

- 모든 UI primitive는 `shared/ui`에 위치
- entities에서 조합하여 사용

```tsx
import { Card } from "@/shared/ui/card"

export const ProductCard = () => {
  return <Card>...</Card>
}
```

---

## 🔄 Import Rules (중요)

```
shared → entities → features → widgets → app
```

### ✅ 가능

- features → entities
- widgets → features

### ❌ 금지

- entities → features
- shared → entities 참조 ❌

---

## 🧠 Type Strategy

| 위치         | 용도                     |
| ------------ | ------------------------ |
| entities     | 도메인 타입 (Product 등) |
| features     | 기능 전용 타입           |
| shared/types | 공통 타입                |

---

## 🚀 Development Flow

1. mock 데이터 정의 (`entities/product/api`)
2. 도메인 타입 정의 (`entities/product/model`)
3. UI 구현 (`entities/product/ui`)
4. feature 추가
5. widget 조합
6. app 연결

---

## 💡 Key Principles

- app은 “껍데기”
- entities는 “데이터 중심”
- shared는 “진짜 공통만”
- UI는 반드시 조합 구조로 설계

---

## 🏁 Goal

이 구조는 다음을 보장합니다:

- pSEO 확장성
- 유지보수성
- 기능 독립성
- 빠른 개발 속도

---

> “데이터가 페이지를 만든다.
> 구조가 개발자를 살린다.”
