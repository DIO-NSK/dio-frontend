"use client";

import Text from "@/components/atoms/Text/Text";
import { Tooltip } from "@/components/ui/tooltip";
import Image from "next/image";
import { useToggle } from "usehooks-ts";
import { size } from "./IconButton.constants";
import { IconButtonProps } from "./IconButton.types";

const contentProps = { background: "#FFFFFF", padding: "20px", borderRadius: "10px" };

export const IconButton = ({ activeUrl, inactiveUrl, header, description, offset }: IconButtonProps) => {
  const [isActive, toggle] = useToggle();

  const centerY = Math.floor(screen.width / 2);
  const { centerLeft, centerRight, top } = offset;
  const offsetX = centerLeft ? centerY + centerLeft : centerY - (centerRight ?? 0);

  return (
    <Tooltip
      positioning={{ placement: "bottom-start" }}
      contentProps={contentProps}
      open={isActive}
      content={
        <div className="flex flex-col gap-1">
          <Text className="text-base text-black font-medium">{header}</Text>
          {description}
        </div>
      }
    >
      <Image
        style={{ right: offsetX, top: top }}
        src={isActive ? activeUrl : inactiveUrl}
        className="absolute z-10"
        onClick={toggle}
        {...size}
        alt=""
      />
    </Tooltip>
  );
};
