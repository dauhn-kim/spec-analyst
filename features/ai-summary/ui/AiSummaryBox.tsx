"use client"

import { Product } from "@/entities/product/model/product.type"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { AlertCircle, CheckCircle2, Sparkles } from "lucide-react"

interface AiSummaryBoxProps {
  product: Product
}

export const AiSummaryBox = ({ product }: AiSummaryBoxProps) => {
  return (
    <Card className="border-none shadow-md bg-linear-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
            AI Analyst
          </span>
        </div>
        <CardTitle className="text-xl font-bold leading-tight">
          {product.brand} Verdict
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Verdict 한 줄 평 */}
        <p className="text-slate-700 dark:text-slate-300 font-medium italic border-l-4 border-indigo-500 pl-4 py-1">
          {product.ai_summary.verdict}
        </p>

        <div className="grid grid-cols-1 gap-4 pt-2">
          {/* Pros Section */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Pros
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
              {product.ai_summary.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          {/* Cons Section */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-amber-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> Cons
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
              {product.ai_summary.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
