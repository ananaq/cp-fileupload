"use client";

import { forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { type IconName } from "../icons/generated/icon-name";
import { cn } from "../utils/cn";

export { IconName };

export const iconVariants = cva(["inline shrink-0 self-center"], {
  variants: {
    size: {
      xs: "w-3 h-3",
      sm: "w-3.5 h-3.5",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    },
  },
});

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: VariantProps<typeof iconVariants>["size"];
  "data-test-id"?: string;
  slot?: string;
}

/**
 * A component for displaying SVG icons from the icon library. {@link https://compass-ui.dev/?path=/docs/media-icon |  **Storybook docs**}
 * @param name - Name of the icon to display from the icon library.
 * @param size - Size of the icon ('xs', 'sm', 'md', 'lg', default: 'md').
 * @param slot - A slot indicates an element that will be projected into the shadow DOM of a custom element. {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots#adding_flexibility_with_slots}
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      size = "md",
      name,
      className,
      "aria-label": ariaLabel,
      "data-test-id": dataTestId,
      slot,
      ...props
    },
    ref
  ) => (
    <svg
      {...props}
      ref={ref}
      aria-label={ariaLabel || name}
      data-test-id={dataTestId}
      className={cn(
        iconVariants({ size }),
        name === "loader" && "animate-spin",
        className
      )}
      // @ts-expect-error https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots#adding_flexibility_with_slots
      slot={slot}
    >
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  )
);
Icon.displayName = "Icon";

export type IconType = typeof Icon;
