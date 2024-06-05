

import { MainNav } from "@/components/navbar/main-nav"
import { MobileNav } from "@/components/navbar/mobile-nav"
import { ModeToggle } from "@/components/navbar/mode-toggle"


export function SiteHeader() {
 
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container -ml-2 flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex -mr-16 md:mr-0 flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
      
          </div>

          <div className="mr-10">


          <nav className="flex items-center">
            <ModeToggle />
          </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
