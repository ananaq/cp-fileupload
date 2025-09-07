"use client";

import {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cva } from "class-variance-authority";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "../utils/cn";
import { NvSize } from "../utils/types";
import { FieldSet, FieldSetProps } from "./FieldSet";
import { Icon, IconName } from "./Icon";

export interface InputProps<T = string>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "readOnly" | "disabled" | "required" | "value" | "defaultValue"
  > {
  pills?: React.ReactNode;
  elementLeft?: React.ReactNode;
  elementRight?: React.ReactNode;
  iconLeft?: IconName | React.ReactNode;
  iconRight?: IconName | React.ReactNode;

  isReadOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isOptional?: boolean;

  label?: FieldSetProps["label"];
  description?: FieldSetProps["description"];
  error?: FieldSetProps["promptText"];
  help?: FieldSetProps["promptText"];

  size?: NvSize;
  variant?: "default" | "subtle";
  autoResize?: boolean;
  minResizeWidth?: number;
  maxResizeWidth?: number;

  /** Current value */
  value?: T;
  /** Default value */
  defaultValue?: T;
  /** Called with the new value */
  onValueChange?: (value: T) => void;
  /** Called after input has stopped for the debounce period */
  onChangeDebounced?: (value: T) => void;
  /** Debounce delay in milliseconds */
  debounceMs?: number;

  /** @internal Converts string input to T */
  parse?: (value: string) => T;
  /** @internal Converts T to string */
  format?: (value: T) => string;

  inputClassName?: string;
}

const wrapperVariants = cva(
  [
    "flex items-center justify-between border border-gray-300 font-normal leading-5 p-0",
    "transition-all",
    "rounded-lg text-sm",
    "peer-focus-within/input:outline-1 peer-focus-within/input:outline-offset-1 peer-focus-within/input:outline-gray-900/10",
  ],
  {
    variants: {
      isDisabled: {
        true: "cursor-not-allowed opacity-50 border-default bg-subtle",
        false: "",
      },
      error: {
        true: "focus-within:ring-1 focus-within:ring-red-500/20 focus-within:ring-offset-1",
        false: "",
      },
      variant: {
        subtle:
          "border-transparent hover:bg-subtle focus-within:bg-subtle focus-within:ring-1 focus-within:ring-gray-900/10 focus-within:ring-offset-1",
        default:
          "bg-default shadow-xs border-default enabled:hover:shadow-sm focus-within:ring-1 focus-within:ring-gray-900/10 focus-within:ring-offset-1",
      },
      size: {
        xs: "",
        sm: "text-sm h-7",
        md: "text-base h-8",
        lg: "text-base h-10",
      },
    },
  }
);

const inputVariants = cva(
  "h-full w-full grow bg-transparent truncate outline-hidden peer/input rounded-lg disabled:border-default disabled:bg-subtle enabled:bg-default enabled:text-gray-700 enabled:focus-within:text-gray-900 rounded-lg",
  {
    variants: {
      variant: {
        subtle: "pl-1",
        default: "px-2",
      },
      iconLeft: {
        true: "",
        false: "",
      },
      iconRight: {
        true: "",
        false: "",
      },
      size: {
        xs: "text-xs font-medium",
        sm: "text-sm font-medium",
        md: "text-sm font-medium",
        lg: "text-base font-medium",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        iconLeft: true,
        className: "pl-0",
      },
      {
        variant: "default",
        iconLeft: false,
        className: "pl-2",
      },
      {
        variant: "default",
        iconRight: true,
        className: "pr-0",
      },
      {
        variant: "default",
        iconRight: false,
        className: "pr-2",
      },
    ],
  }
);

const iconVariants = cva(
  ["flex items-center pointer-events-none text-subtle"],
  {
    variants: {
      left: {
        true: "pl-2",
        false: "",
      },
      right: {
        true: "pr-2",
        false: "",
      },
      size: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
      },
    },
  }
);

const sideVariants = cva(
  ["flex h-full items-center whitespace-nowrap font-medium"],
  {
    variants: {
      side: {
        left: "border-r",
        right: "border-l",
      },
      size: {
        xs: "px-1.5 text-xs",
        sm: "px-2 text-sm",
        md: "px-2.5 text-sm",
        lg: "px-3 text-base ",
      },
      error: {
        true: "text-error bg-red-50 border-red-300",
        false: "bg-gray-50 text-gray-700 border-gray-300",
      },
    },
    compoundVariants: [
      {
        side: "left",
        size: ["xs", "sm", "md"],
        className: "rounded-l-lg",
      },
      {
        side: "left",
        size: "lg",
        className: "rounded-l-xl",
      },

      {
        side: "right",
        size: ["xs", "sm", "md"],
        className: "rounded-r-lg",
      },
      {
        side: "right",
        size: "lg",
        className: "rounded-r-xl",
      },
    ],
  }
);

const ElementLeft = ({
  error,
  size,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { error: boolean; size: NvSize }) => {
  return (
    <div
      className={cn(sideVariants({ error, size, side: "left" }))}
      {...rest}
    />
  );
};

const ElementRight = ({
  error,
  size,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { error: boolean; size: NvSize }) => {
  return (
    <div
      className={cn(sideVariants({ error, size, side: "right" }))}
      {...rest}
    />
  );
};

/**
 * A native input element that defaults to type of text with various states and decorations. {@link https://compass-ui.dev/?path=docs/inputs-input |  **Storybook docs**}
 * @param value - The current value of the input.
 * @param defaultValue - The default value for uncontrolled input.
 * @param onValueChange - Callback when the input value changes.
 * @param onChangeDebounced - Callback fired after user stops typing (with delay).
 * @param size - The size of the input ('xs', 'sm', 'md', 'lg').
 * @param variant - The visual style of the input ('default' or 'subtle').
 * @param iconLeft - Optional icon or element to display at the start of the input.
 * @param iconRight - Optional icon or element to display at the end of the input.
 * @param elementLeft - Optional custom element to display at the start of the input.
 * @param elementRight - Optional custom element to display at the end of the input.
 * @param isDisabled - Whether the input is disabled.
 * @param isReadOnly - Whether the input is read-only.
 * @param isRequired - Whether the input is required.
 * @param isOptional - Whether the input is optional (displays 'optional' text).
 * @param label - Label text or component to display above the input.
 * @param description - Description text to display below the label.
 * @param error - Error message to display below the input.
 * @param help - Help text to display below the input.
 * @param isThemable - Whether the input should use themeable styles.
 * @param styles - Custom styles to apply to different parts of the component.
 */
export const Input = forwardRef<HTMLInputElement, InputProps<string>>(
  function Input<T = string>(
    {
      className,
      elementLeft,
      elementRight,
      iconLeft,
      iconRight,
      pills,
      isReadOnly,
      isDisabled,
      isRequired,
      isOptional,
      label,
      description,
      error: inputError,
      help,
      size = "md",
      variant = "default",
      onClick,
      onBlur,
      autoResize,
      minResizeWidth = 60,
      maxResizeWidth = 300,
      inputClassName,
      type = "text",

      value,
      defaultValue,
      onValueChange,
      onChangeDebounced,
      parse = (v: string) => v as unknown as T,
      format = (v: T) => String(v),
      onChange,

      debounceMs = 300,
      ...rest
    }: InputProps<T>,
    outerRef: React.ForwardedRef<HTMLInputElement>
  ) {
    const [internalValue, setInternalValue] = useState(
      defaultValue !== undefined ? format(defaultValue) : ""
    );

    // Handle external value changes
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(format(value));
      }
    }, [value, format]);

    const [validationError, setValidationError] = useState<string | null>(null);
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(outerRef, () => innerRef.current!, []);

    const generatedId = useId();
    const uniqueId = rest.id || generatedId;
    const debouncedCallback = useDebouncedCallback(
      (value: T) => onChangeDebounced?.(value),
      debounceMs
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const stringValue = e.target.value;
      const parsedValue = parse(stringValue);

      setInternalValue(stringValue);
      onValueChange?.(parsedValue);
      onChange?.(e);

      // Handle debounced changes with parsed value
      if (onChangeDebounced) {
        if (debounceMs > 0) {
          debouncedCallback(parsedValue);
        } else {
          onChangeDebounced(parsedValue);
        }
      }
    };

    // Cleanup for debounce
    useEffect(() => {
      return () => {
        debouncedCallback.cancel();
      };
    }, [debouncedCallback]);

    const error = inputError || validationError;

    useEffect(() => {
      if (autoResize) {
        const resizeInput = () => {
          const input = innerRef?.current;
          if (input) {
            // First set to minimum width to get accurate scrollWidth reading
            input.style.width = `${minResizeWidth}px`;
            const bufferWidth = 1;
            input.style.width = `${Math.min(
              maxResizeWidth,
              input.scrollWidth + bufferWidth
            )}px`;
          }
        };

        // Initial resize
        resizeInput();

        // Try multiple times to account for different rendering scenarios
        // First, immediately after this effect runs
        const rafId = requestAnimationFrame(resizeInput);

        // Then after a short delay to ensure all styles/fonts are applied
        const timeoutId = setTimeout(() => {
          requestAnimationFrame(resizeInput);
        }, 10);

        // And finally after a longer delay to catch any late renderings
        const longTimeoutId = setTimeout(() => {
          requestAnimationFrame(resizeInput);
        }, 100);

        return () => {
          clearTimeout(timeoutId);
          clearTimeout(longTimeoutId);
          cancelAnimationFrame(rafId);
        };
      }
    }, [
      autoResize,
      value,
      defaultValue,
      minResizeWidth,
      maxResizeWidth,
      innerRef,
    ]);

    return (
      <FieldSet
        // @ts-expect-error this is already a discriminated union - it's fine
        label={
          label &&
          (typeof label === "string"
            ? { children: label, htmlFor: uniqueId, isRequired, isOptional }
            : { ...label, htmlFor: uniqueId, isRequired, isOptional })
        }
        variant="default"
        state={error ? "error" : "default"}
        description={description}
        promptText={error || help}
        isDisabled={isDisabled}
        className={cn(className)}
      >
        <div
          className={cn(
            wrapperVariants({
              size,
              variant,
              error: Boolean(error),
              isDisabled,
            })
          )}
          onClick={onClick}
        >
          {/* Prefix. */}
          {elementLeft && (
            <ElementLeft size={size} error={Boolean(error)}>
              {elementLeft}
            </ElementLeft>
          )}

          <div className="flex h-full w-full items-center gap-2">
            {/* Left icon */}
            {iconLeft && typeof iconLeft === "string" ? (
              <span className={cn(iconVariants({ left: true }))}>
                <Icon name={iconLeft as IconName} size={size} />
              </span>
            ) : (
              iconLeft
            )}

            {pills ? <div className="flex gap-1 pl-2">{pills}</div> : null}

            {/* Input. */}
            <input
              id={uniqueId}
              readOnly={isReadOnly}
              disabled={isDisabled}
              required={isRequired}
              type={type}
              className={cn(
                inputVariants({
                  iconLeft: Boolean(iconLeft),
                  iconRight: Boolean(iconRight),
                  variant,
                  size,
                }),
                inputClassName
              )}
              value={internalValue}
              onChange={handleChange}
              {...rest}
              onBlur={(e) => {
                setValidationError(e.target.validationMessage || null);
                onBlur?.(e);
              }}
              ref={innerRef}
            />

            {/* Right icon */}
            {iconRight && typeof iconRight === "string" ? (
              <span className={cn(iconVariants({ right: true }))}>
                <Icon name={iconRight as IconName} size={size} />
              </span>
            ) : (
              iconRight
            )}
          </div>

          {/* Suffix. */}
          {elementRight && (
            <ElementRight size={size} error={Boolean(error)}>
              {elementRight}
            </ElementRight>
          )}
        </div>
      </FieldSet>
    );
  }
) as <T = string>(
  props: InputProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => React.ReactElement;
