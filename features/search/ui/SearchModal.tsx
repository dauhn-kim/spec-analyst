"use client"

import { ChevronRight, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import * as React from "react"

import { mockProducts } from "@/entities/product/api/mockProducts"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command"
import Image from "next/image"

export function SearchModal() {
  const router = useRouter()

  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("") // 1. 검색어 상태 추가

  // 1. 단축키 (Cmd+K / Ctrl+K) 이벤트 리스너
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-transparent hover:border-indigo-200 transition-all text-slate-400 text-sm w-64 justify-between"
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          <span>Search products...</span>
        </div>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v)
          if (!v) setSearch("")
        }}
      >
        <Command
          filter={(value, search) => {
            if (value.toLowerCase().includes(search.toLowerCase())) return 1
            return 0
          }}
        >
          <CommandInput
            placeholder="Search products or categories..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-112.5">
            {search.length > 0 ? (
              <>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Products">
                  {mockProducts.map((product) => (
                    <CommandItem
                      key={product.id}
                      value={`${product.name} ${product.brand} ${product.categories.map((c) => c.name).join(" ")}`}
                      onSelect={() =>
                        runCommand(() =>
                          router.push(`/compare/${product.slug}-vs-default`),
                        )
                      }
                      className="flex items-center gap-4 p-3 cursor-pointer"
                    >
                      {/* 1. 제품 썸네일 */}
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill // 부모 컨테이너(w-12 h-12)에 맞게 채움
                            sizes="48px" // 이미지 크기 힌트를 주어 불필요한 큰 이미지 로드 방지
                            className="object-contain p-1" // 비율 유지하며 안으로 맞춤
                            priority={false} // 검색 결과는 초기 로딩 시 보이지 않으므로 지연 로딩
                          />
                        ) : (
                          <Search className="w-5 h-5 text-slate-400" />
                        )}
                      </div>

                      <div className="flex flex-col flex-1 overflow-hidden">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className="font-bold text-slate-900 truncate">
                            {product.name}
                          </span>
                        </div>

                        {/* 2. 확장된 카테고리 계층 (Breadcrumb) 표시 */}
                        <div className="flex items-center text-[10px] text-slate-400 font-medium whitespace-nowrap overflow-hidden">
                          {product.categories.map((cat, idx) => (
                            <React.Fragment key={cat.id}>
                              <span
                                className={
                                  idx === product.categories.length - 1
                                    ? "text-indigo-500 font-bold"
                                    : ""
                                }
                              >
                                {cat.name}
                              </span>
                              {idx < product.categories.length - 1 && (
                                <ChevronRight className="w-3 h-3 mx-0.5 text-slate-300" />
                              )}
                            </React.Fragment>
                          ))}
                          <span className="mx-2 text-slate-200">|</span>
                          <span className="text-slate-500">
                            {product.brand}
                          </span>
                        </div>
                      </div>

                      {/* 3. 가격 정보 (Apify 데이터 반영) */}
                      <div className="text-right shrink-0">
                        <span className="text-sm font-black text-slate-900">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: product.price.currency,
                          }).format(product.price.amount)}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                <Search className="w-10 h-10 mb-3 opacity-20" />
                <p className="text-sm font-medium">
                  Type to find the best tech specs
                </p>
                <p className="text-xs opacity-70 mt-1">
                  Try OLED, LG, or Laptop
                </p>
              </div>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
