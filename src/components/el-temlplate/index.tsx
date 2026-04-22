"use client";
import useAdDisplay from "@/hooks/useAdDisplay";
import Script from "next/script";
import {forwardRef } from "react";

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
  return (
    <div className="ad-placeholder" style={{ height: "auto !important", textAlign: "center", paddingBlock: 12 }}>
      <p>AD</p>
      <ins 
        ref={ref}
        {...props}
        {...process.env.NODE_ENV === 'development' ? { "data-adtest": "on" } : {}}
      />
      <Script 
        id={props["data-ad-slot"]}
        dangerouslySetInnerHTML={{
        __html: `(window.adsbygoogle = window.adsbygoogle || []).push({});`
      }} />
    </div>
  );
});

export default ElTemplate;
