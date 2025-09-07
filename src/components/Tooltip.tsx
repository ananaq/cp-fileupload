"use client";

import * as RTooltip from "@radix-ui/react-tooltip";
import {
  TooltipProvider as RadixTooltipProvider,
  TooltipProviderProps as RadixTooltipProviderProps,
} from "@radix-ui/react-tooltip";
import { cn } from "../utils/cn";
import { NvSide } from "../utils/types";
import { Info } from "lucide-react";
import { cva } from "class-variance-authority";

export interface TooltipProps {
  children: React.ReactNode;
  /* Label to the tooltip content */
  title?: string | React.ReactNode;
  /* Primary content of the tooltip */
  content: string | React.ReactNode;
  appearance?: "dark" | "light";
  side?: NvSide;
  offset?: number;
  withArrow?: boolean;
  align?: RTooltip.TooltipContentProps["align"];
  "data-test-id"?: string;
  className?: string;
  delayDuration?: number;
  defaultOpen?: boolean;
  disableHoverableContent?: boolean;
  open?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
}

const tooltipVariants = cva(
  [
    "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
    "data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade",
    "data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade",
    "data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
    "z-50 w-full max-w-60 select-none rounded-lg border",
    "text-xs font-normal",
  ],
  {
    variants: {
      appearance: {
        dark: "border-gray-900 bg-gray-800 text-gray-300 shadow-[0px_4px_11px_2px_rgba(0,0,0,0.2),0px_-1px_1px_0px_rgba(7,10,13,0.14)_inset,0px_1px_2px_0px_rgba(246,248,249,0.5)_inset]",
        light:
          "border-gray-200 bg-white text-gray-700 shadow-[inset_0px_1px_2px_0px_rgba(246,248,249,0.50),inset_0px_-1px_1px_0px_rgba(7,10,13,0.14),0px_5px_20px_0px_rgba(0,0,0,0.10),0px_10px_40px_0px_rgba(0,0,0,0.03)]",
      },
      isRichContent: {
        true: "p-2",
        false: "px-2 py-1",
      },
    },
  }
);

/**
 * A popup that displays additional information when hovering over or focusing on an element. {@link https://compass-ui.dev/?path=/docs/overlay-tooltip |  **Storybook docs**}
 * @param content - The content to display in the tooltip.
 * @param title - Optional title displayed above the content.
 * @param children - The trigger element that the tooltip appears from.
 * @param appearance - Visual style of the tooltip ('dark' or 'light').
 * @param side - Preferred placement of the tooltip ('top', 'right', 'bottom', 'left').
 * @param align - Alignment of the tooltip relative to the trigger ('start', 'center', 'end').
 * @param offset - Distance in pixels between the tooltip and its trigger.
 * @param delayDuration - Delay in milliseconds before the tooltip appears.
 * @param withArrow - Whether to show an arrow pointing to the trigger.
 * @param open - Controls whether the tooltip is open when controlled.
 * @param onOpenChange - Callback fired when the open state changes.
 * @param styles - Custom styles to apply to different parts of the component.
 */
export function Tooltip({
  children = <Info className="cursor-help text-gray-500 w-4 h-4" />,
  side = "top",
  offset = 8,
  align = "center",
  title,
  content,
  appearance = "dark",
  delayDuration = 300,
  withArrow = false,
  open,
  onOpenChange,
  className,
  "data-test-id": dataTestId,
  ...rest
}: TooltipProps) {
  return (
    <RTooltip.Root
      delayDuration={delayDuration}
      open={open}
      onOpenChange={onOpenChange}
      {...rest}
    >
      <RTooltip.Trigger asChild>{children}</RTooltip.Trigger>

      <RTooltip.Portal>
        {content && (
          <RTooltip.Content
            className={cn(
              tooltipVariants({
                appearance,
                isRichContent: typeof content !== "string",
              }),
              className
            )}
            side={side}
            sideOffset={offset}
            align={align}
            data-test-id={dataTestId}
          >
            {title ? (
              <p
                className={cn("mb-1 text-xs font-medium", {
                  "text-white": appearance === "dark",
                  "text-gray-900": appearance !== "dark",
                })}
              >
                {title}
              </p>
            ) : null}
            {content}
            {withArrow && (
              <RTooltip.Arrow
                asChild
                className={cn({
                  "fill-gray-900": appearance === "dark",
                  "fill-white": appearance !== "dark",
                })}
              >
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 24 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="-translate-y-px"
                >
                  <path
                    d="M24 1C20 1 18 5 12 5C6 5 4 1 0 1"
                    className={cn({
                      "fill-gray-900": appearance === "dark",
                      "fill-white": appearance !== "dark",
                    })}
                  />
                </svg>
              </RTooltip.Arrow>
            )}
          </RTooltip.Content>
        )}
      </RTooltip.Portal>
    </RTooltip.Root>
  );
}

export type TooltipProviderProps = RadixTooltipProviderProps;

/**
 * Aliasing the Radix tooltip provider here so that we don't have to add
 * dependencies to the main project.
 */
export function TooltipProvider(props: TooltipProviderProps) {
  return <RadixTooltipProvider {...props} />;
}
