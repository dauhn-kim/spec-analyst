"use client"

import Link from "next/link"

import { BarChart3, Laptop, Menu, Tv } from "lucide-react"

import { SearchModal } from "@/features/search/ui/SearchModal"
import { Button } from "@/shared/ui/button"

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 1. Logo & Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-500 transition-colors">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">
              SpecAnalyst<span className="text-indigo-600">.ai</span>
            </span>
          </Link>

          {/* 2. Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/category/tv"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <Tv className="w-4 h-4" /> TVs
            </Link>
            <Link
              href="/category/laptop"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <Laptop className="w-4 h-4" /> Laptops
            </Link>
          </nav>
        </div>

        {/* 3. Search & Actions */}
        <div className="flex items-center gap-3">
          <SearchModal />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-600"
          >
            <Menu className="w-6 h-6" />
          </Button>

          <Button
            variant="default"
            className="hidden md:flex bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 text-xs font-bold"
          >
            Get Pro
          </Button>
        </div>
      </div>
    </header>
  )
}
