"use client"

import { Product } from "@/entities/product/model/product.type"
import { SpecTable } from "@/entities/product/ui/SpecTable"
import { AiSummaryBox } from "@/features/ai-summary/ui/AiSummaryBox"

interface CompareBoardProps {
  productA: Product
  productB: Product
}

export const CompareBoard = ({ productA, productB }: CompareBoardProps) => {
  return (
    <div className="space-y-12">
      {/* 1. AI Summary Section (Features) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AiSummaryBox product={productA} />
        <AiSummaryBox product={productB} />
      </div>

      {/* 2. Detailed Spec Table Section (Entities) */}
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold tracking-tight">
            Technical Specifications
          </h3>
          <p className="text-slate-500 text-sm">
            Detailed side-by-side comparison of hardware and features.
          </p>
        </div>
        <SpecTable productA={productA} productB={productB} />
      </div>
    </div>
  )
}
