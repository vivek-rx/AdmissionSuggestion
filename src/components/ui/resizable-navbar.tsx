"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  showActions?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  activePath?: string;
  onItemClick?: (link: string) => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  showActions?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);
  const [showActions, setShowActions] = useState<boolean>(true);
  const lastScrollYRef = useRef<number>(0);
  const visibleRef = useRef<boolean>(false);
  const showActionsRef = useRef<boolean>(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollYRef.current;
    
    // Set compact pill state when scrolled past 60px
    const nextVisible = latest > 60;
    if (nextVisible !== visibleRef.current) {
      visibleRef.current = nextVisible;
      setVisible(nextVisible);
    }

    // Scroll Down -> Smoothly hide action buttons ("Sign In" & "Book a call")
    // Scroll Up or Near Top -> Smoothly reveal action buttons back
    let nextShowActions = showActionsRef.current;
    if (latest < 40) {
      nextShowActions = true;
    } else if (latest > previous + 8 && latest > 80) {
      // Scrolling down
      nextShowActions = false;
    } else if (latest < previous - 8) {
      // Scrolling up
      nextShowActions = true;
    }

    if (nextShowActions !== showActionsRef.current) {
      showActionsRef.current = nextShowActions;
      setShowActions(nextShowActions);
    }

    lastScrollYRef.current = latest;
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-0 z-50 w-full transition-all duration-300", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean; showActions?: boolean }>,
              { visible, showActions },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible, showActions = true }: NavBodyProps) => {
  return (
    <div
      className={cn(
        "relative z-[60] mx-auto hidden flex-row items-center justify-between self-start rounded-full px-5 py-2 lg:flex transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width,transform,background-color]",
        visible 
          ? "bg-white/90 backdrop-blur-xl border border-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] translate-y-2" 
          : "bg-white/70 backdrop-blur-md border border-slate-200/80 translate-y-0 w-full max-w-7xl",
        visible && showActions ? "w-[92%] max-w-7xl" : "",
        visible && !showActions ? "w-[78%] max-w-5xl" : "",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean; showActions?: boolean }>,
              { visible, showActions },
            )
          : child,
      )}
    </div>
  );
};

export const NavItems = ({ items, className, activePath, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative flex flex-1 flex-row items-center justify-center space-x-1 text-xs font-semibold text-slate-700 transition duration-200 lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isActive = activePath === item.link;
        return (
          <a
            key={`link-${idx}`}
            href={item.link}
            onMouseEnter={() => setHovered(idx)}
            onClick={(e) => {
              if (onItemClick) {
                e.preventDefault();
                onItemClick(item.link);
              }
            }}
            className={cn(
              "relative px-3 py-1.5 transition-colors rounded-full text-xs font-bold whitespace-nowrap",
              isActive ? "text-[#00A3FF]" : "text-slate-700 hover:text-[#00A3FF]"
            )}
          >
            {(hovered === idx || isActive) && (
              <motion.div
                layoutId="navItemHighlight"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className={cn(
                  "absolute inset-0 h-full w-full rounded-full",
                  isActive ? "bg-blue-50 border border-blue-200/80" : "bg-slate-100/80"
                )}
              />
            )}
            <span className="relative z-20">{item.name}</span>
          </a>
        );
      })}
    </motion.div>
  );
};

export const NavbarActions = ({
  children,
  className,
  showActions = true,
}: {
  children: React.ReactNode;
  className?: string;
  showActions?: boolean;
}) => {
  return (
    <AnimatePresence mode="wait">
      {showActions && (
        <motion.div
          key="navbar-actions-container"
          initial={{ opacity: 0, scale: 0.85, x: 15, width: 0 }}
          animate={{ opacity: 1, scale: 1, x: 0, width: "auto" }}
          exit={{ opacity: 0, scale: 0.85, x: 15, width: 0 }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 25,
            opacity: { duration: 0.2 }
          }}
          className={cn("flex items-center gap-2 shrink-0 overflow-hidden", className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNav = ({ children, className, visible, showActions = true }: MobileNavProps) => {
  return (
    <div
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between px-4 py-2.5 lg:hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width,transform,background-color,border-radius]",
        visible 
          ? "bg-white/95 backdrop-blur-xl border border-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] translate-y-1.5 w-[94%] max-w-[calc(100vw-2rem)] rounded-[1.25rem]" 
          : "bg-white/90 backdrop-blur-md border-b border-slate-200 translate-y-0 w-full max-w-[calc(100vw-1rem)] rounded-none",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-3 rounded-2xl bg-white p-5 shadow-2xl border border-slate-200",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle Navigation Menu"
      className="p-2 rounded-xl bg-slate-100 text-slate-800 hover:text-[#00A3FF] hover:bg-blue-50 transition-colors"
    >
      {isOpen ? <IconX className="w-5 h-5" /> : <IconMenu2 className="w-5 h-5" />}
    </button>
  );
};

export const NavbarLogo = ({
  logoSrc,
  brandText,
  href = "/",
  onClick,
}: {
  logoSrc?: string;
  brandText?: string;
  href?: string;
  onClick?: () => void;
}) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="relative z-20 mr-2 flex items-center space-x-2.5 px-1 py-1 text-slate-900 group shrink-0"
    >
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={brandText || "Admission Suggestion"}
          className="h-8.5 w-auto object-contain transition-transform group-hover:scale-105"
        />
      ) : (
        <span className="font-bold text-base text-slate-900 tracking-tight font-heading">
          {brandText || "Admission Suggestion"}
        </span>
      )}
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "button",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-3.5 py-1.5 rounded-xl text-xs font-bold relative cursor-pointer hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center justify-center gap-1.5 shadow-xs whitespace-nowrap font-heading";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#00A3FF] to-[#0284C7] text-white hover:shadow-md hover:shadow-blue-500/25 border border-blue-400/30",
    secondary:
      "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 shadow-none",
    dark:
      "bg-slate-900 hover:bg-slate-800 text-white border border-slate-800",
    gradient:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
