"use client";
import React, { useEffect, useId, useMemo, useRef, useState } from "react";

export interface LogoItem {
  name: string;
  subText?: string;
  badge?: string;
  image?: string;
  logoUrl?: string;
  link?: string;
}

interface LogoRailProps {
  items: LogoItem[];
  dir: number;
  cfg: {
    speed: number;
    hoverMul: number;
    drag: boolean;
    decay: number;
    momentum: boolean;
    running: boolean;
  };
  startOffset: number;
  pillClass: string;
  logoClass: string;
  itemGap: number;
  pillStyle: React.CSSProperties;
  logoHeight: number;
  pillMinWidth: number;
  newTab?: boolean;
  label: string;
  onItemClick?: (item: LogoItem) => void;
}

function LogoRail({
  items,
  dir,
  cfg,
  startOffset,
  pillClass,
  logoClass,
  itemGap,
  pillStyle,
  logoHeight,
  pillMinWidth,
  newTab,
  label,
  onItemClick,
}: LogoRailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(3);

  const cfgRef = useRef(cfg);
  cfgRef.current = cfg;

  const copiesRef = useRef(copies);
  copiesRef.current = copies;

  const xRef = useRef(startOffset);
  const velRef = useRef(0);
  const mulRef = useRef(1);
  const hoverRef = useRef(false);
  const visibleRef = useRef(true);
  const setWidthRef = useRef(0);
  const movedRef = useRef(0);
  const dragRef = useRef({ active: false, id: -1, lastX: 0, lastT: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const set = setRef.current;
    if (!container || !set) return;

    const measure = () => {
      const w = set.offsetWidth;
      const cw = container.offsetWidth;
      setWidthRef.current = w;
      if (w > 0) {
        const need = Math.max(2, Math.ceil(cw / w) + 1);
        if (need !== copiesRef.current) {
          setCopies(need);
        }
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    ro.observe(set);
    window.addEventListener("resize", measure, { passive: true });
    const t = window.setTimeout(measure, 200);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, [items, itemGap, logoHeight, pillMinWidth]);

  useEffect(() => {
    const track = trackRef.current;
    const el = containerRef.current;
    if (!track || !el) return;

    let raf = 0;
    let last = performance.now();
    let isRunning = false;

    const tick = (now: number) => {
      if (!visibleRef.current && !dragRef.current.active) {
        isRunning = false;
        return;
      }

      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.064, (now - last) / 1000);
      last = now;

      const w = setWidthRef.current;
      if (!w) return;

      const c = cfgRef.current;
      if (!dragRef.current.active) {
        if (Math.abs(velRef.current) > 2) {
          xRef.current += velRef.current * dt;
          velRef.current *= Math.pow(c.decay, dt * 60);
        } else {
          velRef.current = 0;
        }

        const target = !c.running ? 0 : hoverRef.current ? c.hoverMul : 1;
        mulRef.current += (target - mulRef.current) * (1 - Math.pow(0.0015, dt));
        xRef.current += dir * c.speed * mulRef.current * dt;
      }

      let x = xRef.current % w;
      if (x < 0) x += w;
      xRef.current = x;
      track.style.transform = `translate3d(${-x}px, 0, 0)`;
    };

    const startRaf = () => {
      if (!isRunning) {
        isRunning = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startRaf();
        }
      },
      { rootMargin: "100px" }
    );
    io.observe(el);

    startRaf();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      isRunning = false;
    };
  }, [dir]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!cfgRef.current.drag) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    movedRef.current = 0;
    velRef.current = 0;
    dragRef.current = {
      active: true,
      id: e.pointerId,
      lastX: e.clientX,
      lastT: performance.now(),
    };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active || d.id !== e.pointerId) return;
    const now = performance.now();
    const dx = e.clientX - d.lastX;
    const dt = Math.max(8, now - d.lastT) / 1000;
    xRef.current -= dx;
    velRef.current = (-dx / dt) * 0.65 + velRef.current * 0.35;
    d.lastX = e.clientX;
    d.lastT = now;
    movedRef.current += Math.abs(dx);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active) return;
    d.active = false;
    if (!cfgRef.current.momentum) velRef.current = 0;
    velRef.current = Math.max(-7000, Math.min(7000, velRef.current));
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const guardClick = (e: React.MouseEvent, item: LogoItem) => {
    if (movedRef.current > 6) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (onItemClick) {
      e.preventDefault();
      onItemClick(item);
    }
  };

  const setStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: `${itemGap}px`,
    paddingRight: `${itemGap}px`,
    flex: "0 0 auto",
  };

  const renderItem = (item: LogoItem, key: string, clone: boolean) => {
    const logoSrc = item.logoUrl || item.image;
    const inner = (
      <div 
        className="flex items-center justify-center h-full px-1"
        title={item.name}
      >
        {logoSrc ? (
          <img
            className={`${logoClass} object-contain transition-all duration-300`}
            src={logoSrc}
            alt={clone ? "" : item.name || ""}
            draggable={false}
            loading="lazy"
            style={{ 
              height: `${logoHeight}px`,
              maxWidth: "160px",
              width: "auto"
            }}
          />
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00A3FF] to-blue-700 text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
              {item.name.substring(0, 2).toUpperCase()}
            </div>
            <span className="font-bold text-slate-800 text-xs whitespace-nowrap font-heading">
              {item.name}
            </span>
          </div>
        )}
      </div>
    );


    const style: React.CSSProperties = {
      ...pillStyle,
      minWidth: pillMinWidth > 0 ? `${pillMinWidth}px` : undefined,
    };

    if (item.link && !clone) {
      return (
        <a
          className={pillClass}
          style={style}
          href={item.link}
          target={newTab ? "_blank" : undefined}
          rel="noopener noreferrer"
          onClick={(e) => guardClick(e, item)}
          draggable={false}
          key={key}
        >
          {inner}
        </a>
      );
    }

    return (
      <div
        className={pillClass}
        style={style}
        onClick={(e) => guardClick(e, item)}
        key={key}
      >
        {inner}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label={label}
      style={{
        width: "100%",
        overflow: "hidden",
        cursor: cfg.drag ? "grab" : "default",
        touchAction: "pan-y",
        userSelect: "none",
      }}
      onPointerEnter={() => {
        hoverRef.current = true;
      }}
      onPointerLeave={() => {
        hoverRef.current = false;
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          alignItems: "center",
          willChange: "transform",
          width: "max-content",
        }}
      >
        {Array.from({ length: copies }).map((_, ci) => (
          <div
            ref={ci === 0 ? setRef : undefined}
            style={setStyle}
            aria-hidden={ci > 0}
            key={ci}
          >
            {items.map((item, i) => renderItem(item, `${ci}-${i}`, ci > 0))}
          </div>
        ))}
      </div>
    </div>
  );
}

export interface PillMarkProProps {
  logos: LogoItem[];
  rowSplit?: "shifted" | "alternate" | "half" | "same";
  showSecondRow?: boolean;
  oppositeDirection?: boolean;
  direction?: "left" | "right";
  speed?: number;
  hoverBehavior?: "slow" | "pause" | "none";
  hoverSpeed?: number;
  dragEnabled?: boolean;
  momentum?: boolean;
  friction?: number;
  secondRowOffset?: number;
  rowGap?: number;
  itemGap?: number;
  pillPadX?: number;
  pillPadY?: number;
  pillRadius?: number;
  pillMinWidth?: number;
  pillColor?: string;
  borderWidth?: number;
  borderColor?: string;
  shadow?: boolean;
  shadowColor?: string;
  shadowBlur?: number;
  shadowY?: number;
  logoHeight?: number;
  hoverLift?: number;
  background?: boolean;
  bgColor?: string;
  fadeEdges?: boolean;
  fadeWidth?: number;
  newTab?: boolean;
  onItemClick?: (item: LogoItem) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const PillMarkPro: React.FC<PillMarkProProps> = ({
  logos = [],
  rowSplit = "shifted",
  showSecondRow = true,
  oppositeDirection = true,
  direction = "left",
  speed = 36,
  hoverBehavior = "slow",
  hoverSpeed = 0.2,
  dragEnabled = true,
  momentum = true,
  friction = 0.06,
  secondRowOffset = 140,
  rowGap = 16,
  itemGap = 20,
  pillPadX = 24,
  pillPadY = 12,
  pillRadius = 14,
  pillMinWidth = 120,
  pillColor = "#FFFFFF",
  borderWidth = 1,
  borderColor = "rgba(226, 232, 240, 0.9)",
  shadow = true,
  shadowColor = "rgba(15, 23, 42, 0.06)",
  shadowBlur = 16,
  shadowY = 4,
  logoHeight = 38,
  hoverLift = 4,
  background = false,
  bgColor = "transparent",
  fadeEdges = true,
  fadeWidth = 100,
  newTab = true,
  onItemClick,
  className,
  style,
}) => {
  const raw = useId();
  const uid = raw.replace(/[^a-zA-Z0-9]/g, "");
  const pillClass = `pmp-pill-${uid}`;
  const logoClass = `pmp-logo-${uid}`;

  const [rowA, rowB] = useMemo(() => {
    const list = (logos || []).filter(Boolean);
    if (list.length === 0) return [[], []];
    if (list.length === 1) return [list, list];

    if (rowSplit === "alternate") {
      const a = list.filter((_, i) => i % 2 === 0);
      const b = list.filter((_, i) => i % 2 === 1);
      return [a.length ? a : list, b.length ? b : list];
    }
    if (rowSplit === "half") {
      const mid = Math.ceil(list.length / 2);
      const a = list.slice(0, mid);
      const b = list.slice(mid);
      return [a, b.length ? b : list];
    }
    if (rowSplit === "shifted") {
      const k = Math.floor(list.length / 2);
      return [list, [...list.slice(k), ...list.slice(0, k)]];
    }
    return [list, list];
  }, [logos, rowSplit]);

  const cfg = {
    speed,
    hoverMul: hoverBehavior === "pause" ? 0 : hoverBehavior === "slow" ? hoverSpeed : 1,
    drag: dragEnabled,
    decay: 1 - Math.min(0.4, Math.max(0.01, friction)),
    momentum,
    running: true,
  };

  const baseDir = direction === "right" ? -1 : 1;

  const pillStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",
    padding: `${pillPadY}px ${pillPadX}px`,
    borderRadius: `${pillRadius}px`,
    background: pillColor,
    border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
    boxShadow: shadow ? `0 ${shadowY}px ${shadowBlur}px ${shadowColor}` : "none",
    textDecoration: "none",
    userSelect: "none",
    WebkitUserSelect: "none",
    cursor: "pointer",
    boxSizing: "border-box",
  };

  const css = `
    .${pillClass} {
      transition: transform 260ms cubic-bezier(.2,.8,.2,1), box-shadow 260ms cubic-bezier(.2,.8,.2,1), border-color 260ms ease;
    }
    .${pillClass}:hover {
      transform: translateY(-${hoverLift}px);
      box-shadow: 0 12px 24px -6px rgba(0, 163, 255, 0.16), 0 4px 12px rgba(15, 23, 42, 0.06);
      border-color: rgba(0, 163, 255, 0.4);
    }
    .${logoClass} {
      display: block;
      width: auto;
      object-fit: contain;
      pointer-events: none;
    }
  `;

  const mask = fadeEdges
    ? `linear-gradient(90deg, transparent 0px, #000 ${fadeWidth}px, #000 calc(100% - ${fadeWidth}px), transparent 100%)`
    : undefined;

  const rowBItems = showSecondRow ? (rowB.length ? rowB : rowA) : [];
  const dirB = oppositeDirection ? -baseDir : baseDir;

  return (
    <div
      className={className}
      style={{
        ...style,
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: background ? bgColor : "transparent",
        boxSizing: "border-box",
      }}
    >
      <style>{css}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: `${rowGap}px`,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      >
        <LogoRail
          items={rowA}
          dir={baseDir}
          cfg={cfg}
          startOffset={0}
          pillClass={pillClass}
          logoClass={logoClass}
          itemGap={itemGap}
          pillStyle={pillStyle}
          logoHeight={logoHeight}
          pillMinWidth={pillMinWidth}
          newTab={newTab}
          label="Top college logos, first row"
          onItemClick={onItemClick}
        />
        {showSecondRow && rowBItems.length > 0 && (
          <LogoRail
            items={rowBItems}
            dir={dirB}
            cfg={cfg}
            startOffset={secondRowOffset}
            pillClass={pillClass}
            logoClass={logoClass}
            itemGap={itemGap}
            pillStyle={pillStyle}
            logoHeight={logoHeight}
            pillMinWidth={pillMinWidth}
            newTab={newTab}
            label="Top college logos, second row"
            onItemClick={onItemClick}
          />
        )}
      </div>
    </div>
  );
};

export default PillMarkPro;
