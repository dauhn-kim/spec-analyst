"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { Product } from "../model/product.type"

interface SpecTableProps {
  productA: Product
  productB: Product
}

export const SpecTable = ({ productA, productB }: SpecTableProps) => {
  // 1. 두 제품의 모든 스펙 키를 추출하여 중복 제거 (비교 항목 생성)
  const allSpecKeys = Array.from(
    new Set([...Object.keys(productA.specs), ...Object.keys(productB.specs)]),
  )

  // 2. 수치 비교 및 하이라이트 로직
  // 2026년형 분석: 숫자가 높을수록 좋은 스펙(주사율, 밝기 등)에 녹색 하이라이트 적용
  const getHighlightClass = (
    val: string | number,
    compareVal: string | number,
  ) => {
    const numVal = typeof val === "number" ? val : parseFloat(String(val))
    const numCompare =
      typeof compareVal === "number"
        ? compareVal
        : parseFloat(String(compareVal))

    if (!isNaN(numVal) && !isNaN(numCompare) && numVal > numCompare) {
      return "text-emerald-600 font-bold bg-emerald-50/50 dark:bg-emerald-950/20"
    }
    return ""
  }

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="w-1/3 font-semibold text-slate-900">
              Specs
            </TableHead>
            <TableHead className="w-1/3 text-center font-bold text-slate-900 border-l border-slate-200">
              {productA.name}
            </TableHead>
            <TableHead className="w-1/3 text-center font-bold text-slate-900 border-l border-slate-200">
              {productB.name}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allSpecKeys.map((key) => {
            const valA = productA.specs[key] ?? "-"
            const valB = productB.specs[key] ?? "-"

            return (
              <TableRow
                key={key}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <TableCell className="font-medium text-slate-500 bg-slate-50/30">
                  {key}
                </TableCell>
                <TableCell
                  className={`text-center border-l border-slate-100 ${getHighlightClass(valA, valB)}`}
                >
                  {valA}
                </TableCell>
                <TableCell
                  className={`text-center border-l border-slate-100 ${getHighlightClass(valB, valA)}`}
                >
                  {valB}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
