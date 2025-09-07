"use client";

import {
  ButtonHTMLAttributes,
  forwardRef,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../utils/cn";
import { NvSize } from "../utils/types";
import { Icon, IconName } from "./Icon";
import { getStringFromChildrenProp } from "@/utils/get-string-from-children-prop";

export const buttonVariants = cva(
  [
    "relative flex items-center justify-center whitespace-nowrap transition-all border outline-hidden focus-visible:outline-hidden group shrink-0 w-fit",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "font-medium leading-none",
  ],
  {
    variants: {
      variant: {
        solid: "light text-white",
        outline: "bg-default",
        ghost: "border-transparent bg-transparent text-gray-600",
      },
      colorScheme: {
        gray: "",
        brand: "",
        red: "",
      },
      size: {
        xs: "h-6 rounded-lg text-xs", // 24px
        sm: "h-7 rounded-lg text-sm", // 28px
        md: "h-8 rounded-lg text-sm", // 32px
        lg: "h-10 rounded-[10px] text-md", // 40px
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
    compoundVariants: [
      {
        variant: "solid",
        colorScheme: "gray",
        className: cn([
          // default
          "border-gray-900 bg-gray-800 shadow-solid-gray-button-default",
          // hover
          "enabled:hover:bg-gray-700",
          // active
          "enabled:active:shadow-solid-button-active enabled:data-[active=true]:shadow-solid-button-active data-[state=on]:shadow-solid-button-active",
          // focus
          "focus-visible:shadow-solid-button-gray-focus focus-outline-emphasized",
        ]),
      },
      {
        variant: "solid",
        colorScheme: "brand",
        className: cn([
          // default
          "bg-blue-500 border-blue-600 shadow-solid-blue-button-default",
          // hover
          "enabled:hover:bg-blue-600",
          // active
          "enabled:active:shadow-solid-button-active enabled:data-[active=true]:shadow-solid-button-active data-[state=on]:shadow-solid-button-active",
          // focus
          "focus-visible:shadow-solid-button-blue-focus focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-blue-500/50",
        ]),
      },
      {
        variant: "solid",
        colorScheme: "red",
        className: cn([
          // default
          "bg-red-500 border-red-600 shadow-solid-red-button-default",
          // hover
          "enabled:hover:bg-red-600",
          // active
          "enabled:active:shadow-solid-button-active enabled:data-[active=true]:shadow-solid-button-active data-[state=on]:shadow-solid-button-active",
          // focus
          "focus-visible:shadow-solid-button-red-focus focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-red-500/50",
        ]),
      },
      {
        variant: "outline",
        colorScheme: "gray",
        className: cn([
          // default
          "border-gray-300 shadow-button-elevated text-gray-700",
          // hover
          "enabled:hover:bg-gray-50 enabled:hover:text-gray-900",
          // active
          "enabled:active:text-gray-900 enabled:data-[active=true]:text-gray-900 enabled:active:shadow-button-shallow-inset-indented enabled:data-[active=true]:shadow-button-shallow-inset-indented data-[state=on]:shadow-button-shallow-inset-indented data-[state=on]:text-gray-900 data-[state=on]:bg-gray-50",
          // focus
          "focus-visible:text-gray-900 focus-outline",
        ]),
      },
      {
        variant: "outline",
        colorScheme: "red",
        className: cn([
          // default
          "text-red-900 border-gray-300 shadow-button-elevated",
          // hover
          "enabled:hover:bg-red-200/50 enabled:hover:border-red-200",
          // active
          "enabled:active:bg-red-200/50 enabled:data-[active=true]:bg-red-200/50 enabled:active:border-red-200 enabled:data-[active=true]:border-red-200 enabled:active:shadow-button-shallow-inset-indented enabled:data-[active=true]:shadow-button-shallow-inset-indented data-[state=on]:shadow-button-shallow-inset-indented data-[state=on]:text-red-900 data-[state=on]:border-red-200 data-[state=on]:bg-red-200/50",
          // focus
          "focus-visible:bg-red-200/50 focus-visible:border-red-200 focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-red-500/10",
        ]),
      },
      {
        variant: "ghost",
        colorScheme: "gray",
        className: cn([
          // hover
          "enabled:hover:text-gray-900 enabled:hover:border-gray-200 enabled:hover:bg-gray-100",
          // active
          "enabled:active:text-gray-900 enabled:data-[active=true]:text-gray-900 enabled:active:border-gray-100 enabled:data-[active=true]:border-gray-100 enabled:active:bg-gray-200 enabled:data-[active=true]:bg-gray-200 enabled:active:shadow-ghost-button-active enabled:data-[active=true]:shadow-ghost-button-active data-[state=on]:shadow-ghost-button-active data-[state=on]:text-gray-900 data-[state=on]:border-gray-100 data-[state=on]:bg-gray-200",
          // focus
          "focus-visible:text-gray-900 focus-visible:bg-gray-100 focus-outline",
        ]),
      },
    ],
  }
);

const contentWrapperVariants = cva("flex items-center justify-center", {
  variants: {
    size: {
      xs: "gap-x-1.5 px-2.5", // 24px
      sm: "gap-x-1.5 px-2.5", // 28px
      md: "gap-x-1.5 px-3", // 32px
      lg: "gap-x-2 px-3.5", // 40px
    },
    icon: {
      left: "pr-2.5",
      right: "pl-2.5",
      both: "px-2.5",
    },
  },
  defaultVariants: {
    size: "md",
    icon: null,
  },
  compoundVariants: [
    {
      size: "xs",
      icon: "left",
      className: "pr-2",
    },
    {
      size: "xs",
      icon: "right",
      className: "pl-2",
    },
    {
      size: "xs",
      icon: "both",
      className: "px-2",
    },
    {
      size: "sm",
      icon: "left",
      className: "pr-2",
    },
    {
      size: "sm",
      icon: "right",
      className: "pl-2",
    },
    {
      size: "sm",
      icon: "both",
      className: "px-2",
    },
    {
      size: "lg",
      icon: "left",
      className: "pr-3",
    },
    {
      size: "lg",
      icon: "right",
      className: "pl-3",
    },
    {
      size: "lg",
      icon: "both",
      className: "px-3",
    },
  ],
});

const iconVariants = cva([], {
  variants: {
    variant: {
      solid: "text-white",
      outline: "",
      ghost:
        "text-gray-600 group-hover:enabled:text-gray-900 group-active:enabled:text-gray-900 group-data-[active=true]:enabled:text-gray-900 group-focus-visible:enabled:text-gray-900",
    },
    colorScheme: {
      gray: "",
      brand: "",
      red: "",
    },
  },
  compoundVariants: [
    {
      variant: "outline",
      colorScheme: "gray",
      className:
        "text-gray-600 group-hover:enabled:text-gray-800 group-active:enabled:text-gray-800 group-data-[active=true]:enabled:text-gray-800 group-focus-visible:enabled:text-gray-800",
    },
    {
      variant: "outline",
      colorScheme: "red",
      className:
        "text-red-800 group-hover:enabled:text-red-900 group-active:enabled:text-red-900 group-data-[active=true]:enabled:text-red-900 group-focus-visible:enabled:text-red-900",
    },
  ],
});

export type ButtonClassNameProp =
  | string
  | {
      root?: string;
      contentWrapper?: string;
      iconLeft?: string;
      iconRight?: string;
      loader?: string;
    };

export interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "disabled" | "className"
  > {
  asChild?: boolean;
  iconRight?: Exclude<ReactNode, string> | IconName;
  iconLeft?: Exclude<ReactNode, string> | IconName;
  size?: NvSize;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  colorScheme?: VariantProps<typeof buttonVariants>["colorScheme"];
  isActive?: boolean;
  /** A boolean property that will overlay the content with an animated spinner and disable the button */
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingText?: string;
  className?: ButtonClassNameProp;
  "data-test-id"?: string;
}

const ButtonContent: React.FC<{
  iconLeft?: ButtonProps["iconLeft"];
  iconRight?: ButtonProps["iconRight"];
  children: ButtonProps["children"];
  size: ButtonProps["size"];
  variant: ButtonProps["variant"];
  colorScheme: ButtonProps["colorScheme"];

  iconRightClassName?: string;
  iconLeftClassName?: string;
}> = ({
  iconLeft,
  iconRight,
  children,
  size,
  variant,
  colorScheme,
  iconLeftClassName,
  iconRightClassName,
}) => {
  return (
    <>
      {typeof iconLeft === "string" ? (
        <Icon
          name={iconLeft as IconName}
          size={size}
          className={cn(
            iconVariants({ variant, colorScheme }),
            iconLeftClassName
          )}
        />
      ) : (
        iconLeft
      )}
      {children}
      {typeof iconRight === "string" ? (
        <Icon
          name={iconRight as IconName}
          size={size}
          className={cn(
            iconVariants({ variant, colorScheme }),
            iconRightClassName
          )}
        />
      ) : (
        iconRight
      )}
    </>
  );
};

/**
 * Allow users to take actions, and make choices, with a single click. {@link https://compass-ui.dev/?path=/docs/inputs-button |  **Storybook docs**}
 * @param variant - The visual style of the button ('solid', 'outline', 'ghost').
 * @param iconLeft - Optional icon to display on the left side of the button text.
 * @param iconRight - Optional icon to display on the right side of the button text.
 * @param children - The content to display inside the button.
 * @param size - The size of the button (xs, sm, md, lg).
 * @param colorScheme - The color theme of the button (gray, brand, red).
 * @param asChild - Whether to render the button as a child component using Radix UI's Slot primitive.
 * @param isLoading - Whether the button is in a loading state.
 * @param isDisabled - Whether the button is disabled.
 * @param loadingText - Optional text to display when the button is loading.
 * @param isActive - Whether the button is in an active state.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      iconLeft,
      iconRight,
      children,
      size = "md",
      colorScheme = "gray",
      asChild = false,
      isLoading = false,
      isDisabled = false,
      loadingText,
      isActive,
      className,
      "aria-label": ariaLabel,
      "data-test-id": dataTestId,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const icon =
      iconLeft && iconRight
        ? "both"
        : iconLeft
        ? "left"
        : iconRight
        ? "right"
        : undefined;

    const contentRef = useRef<HTMLSpanElement>(null);
    const [minWidth, setMinWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
      if (contentRef.current) {
        setMinWidth(contentRef.current.offsetWidth);
      }
    }, [children, iconLeft, iconRight, size]);

    const contentKey = useMemo(() => {
      const childrenString = getStringFromChildrenProp(children);
      return `${childrenString}-${iconLeft}-${iconRight}-${variant}-${colorScheme}-${size}`;
    }, [children, iconLeft, iconRight, variant, colorScheme, size]);

    const classNames =
      typeof className === "string" ? { root: className } : className || {};

    const buttonState = useMemo(() => {
      switch (true) {
        case isLoading:
          return "Loading";
        case isDisabled:
          return "Disabled";
        default:
          return "Idle";
      }
    }, [isDisabled, isLoading]);

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            colorScheme,
          }),
          classNames.root
        )}
        style={{ minWidth: minWidth ? `${minWidth}px` : undefined }}
        disabled={isDisabled || isLoading}
        data-active={isActive}
        aria-label={
          ariaLabel ||
          (typeof children === "string" ? children : children?.toString())
        }
        ref={ref}
        data-test-id={dataTestId}
        {...props}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLoading ? (
            <motion.span
              // The motion span doesn't unmount between renders which means framer motion doesn't know to animate our element. To force it to unmount, we can use a key here.
              key={`loader-${buttonState}`}
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                classNames.loader
              )}
              initial={{ opacity: 0, y: -10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              transition={{ duration: 0.15 }}
            >
              <Icon name="loader" className="animate-spin" size={size} />
              {loadingText && <span className="ml-2">{loadingText}</span>}
            </motion.span>
          ) : (
            <motion.span
              // Inside of this one, we want to trigger rerenders when the content changes as well, not just the state.
              key={`content-${contentKey}-${buttonState}`}
              ref={contentRef}
              className={cn(
                "absolute inset-0 overflow-hidden",
                contentWrapperVariants({ size, icon }),
                classNames.contentWrapper
              )}
              initial={{ opacity: 0, y: -10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              transition={{ duration: 0.15 }}
            >
              <ButtonContent
                iconLeft={iconLeft}
                iconRight={iconRight}
                size={size}
                variant={variant}
                colorScheme={colorScheme}
                iconLeftClassName={classNames.iconLeft}
                iconRightClassName={classNames.iconRight}
              >
                {children}
              </ButtonContent>
            </motion.span>
          )}
        </AnimatePresence>
        {/* Placeholder that retains min width */}
        <span
          className={cn(
            "invisible overflow-hidden opacity-0",
            contentWrapperVariants({ size, icon }),
            classNames.contentWrapper
          )}
          aria-hidden="true"
        >
          <ButtonContent
            iconLeft={iconLeft}
            iconRight={iconRight}
            size={size}
            variant={variant}
            colorScheme={colorScheme}
            iconLeftClassName={classNames.iconLeft}
            iconRightClassName={classNames.iconRight}
          >
            {children}
          </ButtonContent>
        </span>
      </Comp>
    );
  }
);
Button.displayName = "Button";
