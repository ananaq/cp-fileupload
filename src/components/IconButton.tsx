"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../utils/cn";
import { NvSize } from "../utils/types";
import { Button, ButtonClassNameProp, ButtonProps } from "./Button";
import { Icon, IconName } from "./Icon";
import { Tooltip } from "./Tooltip";

type IconButtonClassNameProp =
  | string
  | {
      root?: string;
      contentWrapper?: string;
      loader?: string;
    };
export interface IconButtonProps
  extends Omit<
    ButtonProps,
    | "icon"
    | "iconLeft"
    | "children"
    | "iconRight"
    | "loadingText"
    | "className"
    | "size"
  > {
  tooltip?: string;
  tooltipSide?: "top" | "bottom" | "left" | "right";
  tooltipTitle?: string;
  icon: IconName;
  className?: IconButtonClassNameProp;
  size?: NvSize;
}

const iconButtonVariants = cva("p-0 inline-flex", {
  variants: {
    size: {
      xs: "h-6 w-6",
      sm: "h-7 w-7",
      md: "h-8 w-8",
      lg: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * A button that displays only an icon. {@link https://compass-ui.dev/?path=/docs/inputs-iconbutton |  **Storybook docs**}
 * @param icon - The icon to display within the button.
 * @param tooltip - Optional tooltip text to display on hover.
 * @param tooltipSide - The position of the tooltip relative to the button ('top', 'bottom', 'left', 'right').
 * @param tooltipTitle - Optional title for the tooltip.
 * @param size - The size of the button ('xs', 'sm', 'md', 'lg').
 * @param variant - The visual style of the button ('solid', 'outline', 'ghost', etc.).
 * @param colorScheme - The color scheme of the button ('gray', 'brand', 'green', etc.).
 * @param isActive - Whether the button is in an active/selected state.
 * @param isLoading - Whether the button is in a loading state.
 * @param isDisabled - Whether the button is disabled.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      tooltipSide = "top",
      size = "md",
      variant = "outline",
      colorScheme = "gray",
      tooltip,
      tooltipTitle,
      isActive,
      isLoading,
      isDisabled,
      className,
      ...props
    },
    ref
  ) => {
    const baseIconButtonClasses = iconButtonVariants({ size });

    let iconButtonClassNames: ButtonClassNameProp;

    if (typeof className === "string") {
      iconButtonClassNames = cn(baseIconButtonClasses, className);
    } else if (className && typeof className === "object") {
      iconButtonClassNames = {
        root: cn(baseIconButtonClasses, className.root),
        contentWrapper: cn("p-0", className.contentWrapper),
        loader: className.loader,
      };
    } else {
      iconButtonClassNames = baseIconButtonClasses;
    }

    return (
      <Tooltip content={tooltip} side={tooltipSide} title={tooltipTitle}>
        <Button
          ref={ref}
          data-active={isActive}
          isLoading={isLoading}
          isDisabled={isDisabled}
          variant={variant}
          className={iconButtonClassNames}
          colorScheme={colorScheme}
          size={size}
          key={icon}
          {...props}
        >
          <Icon name={icon} size={size} />
        </Button>
      </Tooltip>
    );
  }
);
IconButton.displayName = "IconButton";
