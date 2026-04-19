"use client";

import React, { useCallback, useEffect, useRef } from "react";

type TrackedAdContext = {
  adContainerId: string | null;
  googleQueryId: string | null;
  adClickTime: number;
  publisherId: string | null;
  adk: string | null;
  adf: string | null;
  slotname: string | null;
  adSize: string | null;
};

type LastAdInteraction = {
  ts: number;
  data: TrackedAdContext;
};

function useEffectEvent(
  target: Window | Document,
  eventType: string,
  callback: (event: Event) => void,
  options?: AddEventListenerOptions
) {
  useEffect(() => {
    target.addEventListener(eventType, callback, options);
    return () => {
      target.removeEventListener(eventType, callback, options);
    };
  }, [callback, eventType, options, target]);
}

const ElClick: React.FC = () => {
  const lastAdInteractionRef = useRef<LastAdInteraction | null>(null);
  const lastTrackedAtRef = useRef<number>(0);
  const captureOptionsRef = useRef<AddEventListenerOptions>({ capture: true });

  const getContainerId = useCallback((container: Element | null) => {
    if (!container) return null;
    return (
      container.getAttribute("id") ??
      (container.querySelector?.(".gpt-slot[id]") as HTMLElement | null)?.getAttribute("id") ??
      null
    );
  }, []);

  const parseIframeSrc = useCallback((iframeSrc: string | null) => {
    if (!iframeSrc) return null;
    const parsedUrl = new URL(iframeSrc);
    const searchParams = new URLSearchParams(parsedUrl.search);
    return {
      publisherId: searchParams.get("client"),
      adk: searchParams.get("adk"),
      adf: searchParams.get("adf"),
      slotname: searchParams.get("slotname"),
      adSize: searchParams.get("format"),
    };
  }, []);

  const collectAdDataFromElement = useCallback(
    (el: Element | null) => {
      if (!el) return null;
      const adContainer = el.closest(".gpt-slot, .adsbygoogle, .ad-placeholder");
      if (!adContainer) return null;

      const iframeEl =
        el.tagName === "IFRAME"
          ? (el as HTMLIFrameElement)
          : (adContainer.querySelector("iframe") as HTMLIFrameElement | null);
      const sourceData = parseIframeSrc(iframeEl?.getAttribute("src") ?? null);

      return {
        adContainerId: getContainerId(adContainer),
        googleQueryId: iframeEl?.getAttribute("data-google-query-id") ?? null,
        adClickTime: Date.now(),
        publisherId: sourceData?.publisherId ?? null,
        adk: sourceData?.adk ?? null,
        adf: sourceData?.adf ?? null,
        slotname: sourceData?.slotname ?? null,
        adSize: sourceData?.adSize ?? null,
      };
    },
    [getContainerId, parseIframeSrc]
  );

  const collectAdDataFromActiveIframe = useCallback(() => {
    try {
      const activeElement = document.activeElement as HTMLIFrameElement | null;
      if (!activeElement || activeElement.tagName !== "IFRAME") return null;
      return collectAdDataFromElement(activeElement);
    } catch (error) {
      console.error("Error collecting ad data:", error);
      return null;
    }
  }, [collectAdDataFromElement]);

  const setLastAdInteraction = useCallback(
    (data: TrackedAdContext | null) => {
      if (!data) return;
      lastAdInteractionRef.current = {
        ts: Date.now(),
        data,
      };
    },
    []
  );

  const trackAdClick = useCallback(
    (source: string) => {
      const now = Date.now();
      // 1. 避免多事件链路中的重复上报（例如 blur + hidden + pagehide）
      if (now - lastTrackedAtRef.current < 1500) return;

      const latest = lastAdInteractionRef.current;
      // 2. 只对最近一次广告交互进行上报，减少误报
      if (!latest || now - latest.ts > 2500) return;

      // window.umami.track((props) => ({
      //   ...props,
      //   name: "adClick",
      //   event: source,
      //   data: {
      //     ...latest.data,
      //   },
      // }));
      window.ttq.track("ClickButton");
      console.log(`[ad-click][${source}]`, JSON.stringify(latest.data));
      lastTrackedAtRef.current = now;
    },
    []
  );

  const handlePointerDown = useCallback(
    (event: Event) => {
      const target = event.target as Element | null;
      if (!target) return;
      const adData = collectAdDataFromElement(target);
      setLastAdInteraction(adData);
    },
    [collectAdDataFromElement, setLastAdInteraction]
  );

  const handleBlur = useCallback(() => {
    const adDataFromFocus = collectAdDataFromActiveIframe();
    if (adDataFromFocus) {
      setLastAdInteraction(adDataFromFocus);
      trackAdClick("blur");
    }
  }, [collectAdDataFromActiveIframe, setLastAdInteraction, trackAdClick]);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "hidden") {
      trackAdClick("visibilitychange");
    }
  }, [trackAdClick]);

  const handlePageHide = useCallback(() => {
    trackAdClick("pagehide");
  }, [trackAdClick]);

  const handleBeforeUnload = useCallback(() => {
    trackAdClick("beforeunload");
  }, [trackAdClick]);

  useEffectEvent(document, "pointerdown", handlePointerDown, captureOptionsRef.current);
  useEffectEvent(window, "blur", handleBlur);
  useEffectEvent(document, "visibilitychange", handleVisibilityChange);
  useEffectEvent(window, "pagehide", handlePageHide);
  useEffectEvent(window, "beforeunload", handleBeforeUnload);
  return null; // This component does not render anything
};


export default ElClick;
