"use client";
import useAdDisplay from "@/hooks/useAdDisplay";
import Script from "next/script";
import { forwardRef } from "react";

interface AdTemplateProps {
  id: string;
  className?: string;
  "data-ad-client": string;
  "data-ad-slot": string;
  "data-ad-format": string;
  "data-full-width-responsive"?: boolean | string;
  "data-ad-channel"?: string;
  style?: React.CSSProperties;
  channelId?: string;
}

const ElTemplate = forwardRef<HTMLModElement, AdTemplateProps>(function AdTemplate(props, ref) {
  useAdDisplay(`#${props.id}`);
  const { id, ...rest } = props;
  return (
    <div className="ad-placeholder" style={{ textAlign: "center", paddingBlock: 12, minHeight: 90 }}>
      <ins
        id={id}
        ref={ref}
        {...rest}
        {...(process.env.NODE_ENV === "development" ? { "data-adtest": "on" } : {})}
      />
      <Script
        id={`adsbygoogle-push-${id}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(){ try{ (window.adsbygoogle=window.adsbygoogle||[]).push({}); }catch(e){} })();`,
        }}
      />
    </div>
  );
});

export default ElTemplate;
