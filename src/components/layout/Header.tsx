import { Link, NavLink } from "react-router-dom";
import { Menu, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/components/ThemeToggle";

const navLinkCls = ({ isActive }: { isActive: boolean }) =>
  `px-2 py-1 ${isActive ? "text-foreground" : "text-foreground/80 hover:text-foreground"} uppercase tracking-wider`;

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="mx-auto max-w-3xl px-4">
        <div className="h-14 flex items-center justify-between">
          <Link to="/" className="font-semibold uppercase tracking-wider">
            Vinicius Motta
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink to="/blog" className={navLinkCls} end>
              BLOG
            </NavLink>
            <NavLink to="/about" className={navLinkCls} end>
              ABOUT
            </NavLink>
            <ThemeToggle>
              <Sun className="h-4 w-4 dark:hidden" />
              <Moon className="h-4 w-4 hidden dark:block" />
            </ThemeToggle>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle>
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="h-5 w-5 hidden dark:block" />
            </ThemeToggle>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-4 mt-8">
                  <NavLink to="/blog" onClick={() => setOpen(false)} className={({isActive})=>`uppercase ${isActive? 'text-foreground':'text-foreground/80 hover:text-foreground'}`}>
                    BLOG
                  </NavLink>
                  <Separator />
                  <NavLink to="/about" onClick={() => setOpen(false)} className={({isActive})=>`uppercase ${isActive? 'text-foreground':'text-foreground/80 hover:text-foreground'}`}>
                    ABOUT
                  </NavLink>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
