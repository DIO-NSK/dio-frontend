"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SwiperContainerProps } from "./SwiperContainer.types";

export const SwiperContainer = ({ outOfScreen, children, hasLoop }: SwiperContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  const handleUpdateHeight = () => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();

      setHeight(height);
    }
  };

  // Следим за изменением высоты и обновляем ее значение.
  useEffect(() => {
    if (ref.current) {
      window.addEventListener("resize", handleUpdateHeight);
    }

    return () => {
      window.removeEventListener("resize", handleUpdateHeight);
    };
  }, [ref]);

  // Устанавливаем высоту по умолчанию.
  useLayoutEffect(() => {
    if (ref.current && height == 0) {
      handleUpdateHeight();
    }
  }, [ref]);

  if (outOfScreen && hasLoop) {
    return (
      <section className="w-full relative" style={{ height: height }}>
        <div ref={ref} className={"hidden md:flex md:w-screen absolute left-0"}>
          {children}
        </div>
      </section>
    );
  }

  return <div className={"hidden md:flex md:w-full"}>{children}</div>;
};
