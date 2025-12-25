
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  activeTab?: string
  onTabChange?: (name: string) => void
}

export function NavBar({ items, className, activeTab: externalActiveTab, onTabChange }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(externalActiveTab || items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (externalActiveTab) {
      setActiveTab(externalActiveTab)
    }
  }, [externalActiveTab])

  const handleClick = (item: NavItem) => {
    setActiveTab(item.name)
    if (onTabChange) onTabChange(item.name)
    
    // Smooth scroll for anchors
    if (item.url.startsWith('#')) {
      const el = document.querySelector(item.url);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-2 md:gap-3 bg-slate-950/20 border border-white/10 backdrop-blur-xl py-1.5 px-1.5 rounded-full shadow-2xl">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <button
              key={item.name}
              onClick={() => handleClick(item)}
              className={cn(
                "relative cursor-pointer text-xs md:text-sm font-semibold px-4 md:px-6 py-2 rounded-full transition-all duration-300 uppercase tracking-widest",
                isActive ? "text-blue-400" : "text-white/60 hover:text-white/90",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-blue-600/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-blue-600/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-blue-600/30 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-blue-600/30 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
