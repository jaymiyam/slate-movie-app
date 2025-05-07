import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const TRANSLATE_AMOUNT = 176;

export default function MoviesGrid({ children, title }) {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current == null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;

      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });

    // perform the above callback function when container.ref is resized
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [children, translate]);

  return (
    <section className="w-full max-w-[1200px] px-8 py-6 mx-auto">
      <h2 className="font-display text-emerald-400 text-3xl mb-4">{title}</h2>
      <div ref={containerRef} className="overflow-x-hidden relative rounded-md">
        <div
          className={`flex gap-4 transition-transform w-[max-content]`}
          style={{ transform: `translateX(-${translate}px)` }}
        >
          {children}
        </div>
        {isLeftVisible && (
          <div
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_AMOUNT;
                if (newTranslate <= 0) return 0;
                return newTranslate;
              });
            }}
            className="cursor-pointer absolute left-0 top-0 bottom-0 bg-linear-to-r from-neutral-900/50 to-transparent w-16 md:w-28 flex flex-col justify-center px-4 lg:opacity-0 lg:hover:opacity-100"
          >
            <button className="text-emerald-300 text-xl cursor-pointer">
              <Icon icon="mdi:chevron-left-circle" width="36" height="36" />
            </button>
          </div>
        )}
        {isRightVisible && (
          <div
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate + TRANSLATE_AMOUNT;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                if (newTranslate + width >= edge) {
                  return edge - width;
                }
                return newTranslate;
              });
            }}
            className="cursor-pointer absolute right-0 top-0 bottom-0 bg-linear-to-l from-neutral-900/50 to-transparent w-16 md:w-28 flex flex-col justify-center px-4 lg:opacity-0 lg:hover:opacity-100"
          >
            <button className="text-emerald-300 text-xl self-end cursor-pointer">
              <Icon icon="mdi:chevron-right-circle" width="36" height="36" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
