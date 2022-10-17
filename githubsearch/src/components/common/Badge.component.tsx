import { Badge, BadgeProps } from "@nextui-org/react";
import React, { FC } from "react";

interface IBadge extends BadgeProps {
  state: "OPEN" | "CLOSED";
}

export const BadgeComponent: FC<IBadge> = ({ state, ...props }) => {
  return (
    <div>
      {state === "CLOSED" ? (
        <Badge color="error" variant="default" size="xs" {...props}>
          {state}
        </Badge>
      ) : (
        <Badge color="success" variant="default" size="xs" {...props}>
          {state}
        </Badge>
      )}
    </div>
  );
};
