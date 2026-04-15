import { notFound } from "next/navigation"

import { mockProducts } from "@/entities/product/api/mockProducts"
import { CompareBoard } from "@/widgets/compare-board/ui/CompareBoard"
import { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const [slugA, slugB] = slug.split("-vs-")

  // 슬러그에서 제품명을 예쁘게 변환 (예: lg-c6 -> LG C6)
  const nameA = slugA
    .split("-")
    .map((s) => s.toUpperCase())
    .join(" ")
  const nameB = slugB
    .split("-")
    .map((s) => s.toUpperCase())
    .join(" ")

  return {
    title: `${nameA} vs ${nameB} Comparison`,
    description: `Detailed technical specification comparison between ${nameA} and ${nameB}. Which one wins? Check our AI-driven verdict.`,
    openGraph: {
      title: `${nameA} vs ${nameB}: Detailed Side-by-Side Analysis`,
      description: `Compare ${nameA} and ${nameB} specs, features, and pricing.`,
    },
  }
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params

  // URL 예시: lg-c6-oled-77-vs-samsung-s95f-oled-77
  // "vs"를 기준으로 두 제품의 슬러그를 분리합니다.
  const [slugA, slugB] = slug.split("-vs-")

  const productA = mockProducts.find((p) => p.slug === slugA)
  const productB = mockProducts.find((p) => p.slug === slugB)

  // 데이터가 없으면 404 페이지로 보냅니다.
  if (!productA || !productB) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-slate-50/30 py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Header */}
        <section className="text-center space-y-6">
          <div className="flex justify-center items-center gap-4">
            <span className="h-px w-12 bg-slate-200" />
            <div className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-tighter">
              2026 Technical Duel
            </div>
            <span className="h-px w-12 bg-slate-200" />
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-none">
            {productA.name} <br className="md:hidden" />
            <span className="text-indigo-600 px-4">vs</span>
            {productB.name}
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            AI-driven specs analysis between {productA.brand}
            {"'"}s flagship and {productB.brand}
            {"'"}s challenger.
          </p>
        </section>

        {/* The Core Widget */}
        <CompareBoard productA={productA} productB={productB} />
      </div>
    </main>
  )
}
