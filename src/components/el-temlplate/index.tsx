"use client";
import { forwardRef, useEffect } from "react";

interface AdTemplateProps {
  id: string;
  className?: string;
  adUnitPath?: string;
  sizes?: [number, number] | Array<[number, number]>;
  "data-ad-client"?: string;
  "data-ad-slot"?: string;
  "data-ad-format"?: string;
  "data-full-width-responsive"?: boolean | string;
  "data-ad-channel"?: string;
  style?: React.CSSProperties;
  channelId?: string;
}

const ElTemplate = forwardRef<HTMLDivElement, AdTemplateProps>(function AdTemplate(props, ref) {
  const { id, className, style } = props;
  const minHeight = style?.minHeight ?? 50;

  useEffect(() => {
    const w = window as unknown as {
      googletag?: { cmd: Array<() => void> } & Record<string, unknown>;
      __gptSlots?: Record<string, unknown>;
      __gptRefreshed?: Record<string, boolean>;
    };

    w.googletag = w.googletag || { cmd: [] };
    w.googletag.cmd.push(() => {
      const googletag = w.googletag as any;
      googletag.display(id);
      const slot = w.__gptSlots?.[id];
      if (slot) {
        w.__gptRefreshed = w.__gptRefreshed || {};
        if (!w.__gptRefreshed[id] && googletag.pubads) {
          w.__gptRefreshed[id] = true;
          try {
            googletag.pubads().refresh([slot]);
          } catch (_) {}
        }
      }
    });
  }, [id]);

  return (
    <div className="ad-placeholder" style={{ textAlign: "center", paddingBlock: 12, minHeight }}>
      <div
        id={id}
        ref={ref}
        className={["gpt-slot", className].filter(Boolean).join(" ")}
        style={style}
      />
    </div>
  );
});

export default ElTemplate;
