import { PropsWithChildren } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ThemeToggle = ({ children }: PropsWithChildren) => {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="outline" size="icon" aria-label="Toggle theme" onClick={toggle}>
      {children}
    </Button>
  );
};

export default ThemeToggle;
