"use client";

import { HTMLProps } from "react";
import { cn } from "../utils/cn";
import { Icon, IconName } from "./Icon";
import { cva } from "class-variance-authority";

interface EmptyStateBaseProps extends HTMLProps<HTMLDivElement> {
  title: string;
  description?: string;
  "data-test-id"?: string;
}

interface EmptyStateWithIcon extends EmptyStateBaseProps {
  icon?: IconName;
  image?: string;
}

interface EmptyStateWithImage extends EmptyStateBaseProps {
  icon?: never;
  image: string;
}

export type EmptyStateProps = EmptyStateWithIcon | EmptyStateWithImage;

const iconVariants = cva(
  "flex h-16 w-16 items-center justify-center rounded-2xl border-[1.5px] bg-white text-gray-900 border-gray-200 [box-shadow:0px_-5px_0px_0px_var(--color-gray-100)_inset]"
);

const IconCard = ({
  icon,
  className,
}: {
  icon?: IconName;
  className?: string;
}) => (
  <div className={cn(iconVariants({}), className)}>
    {icon && <Icon name={icon} className="h-8 w-8" />}
  </div>
);

const IconGroup = ({ icon }: { icon: IconName }) => (
  <div className="relative isolate flex items-center">
    <IconCard className="z-0 -mr-12 scale-90 -rotate-12" />
    <IconCard icon={icon} className="z-10" />
    <IconCard className="z-0 -ml-12 scale-90 rotate-12" />
  </div>
);

const backgroundVariants = cva(
  "flex flex-col items-center justify-center gap-6 rounded-xl px-6 py-20 text-center text-subtle bg-default border"
);

const titleVariants = cva("font-semibold text-emphasis text-lg");

const descriptionVariants = cva("font-normal text-subtle text-sm");

/**
 * A component for displaying empty or zero-state content areas. {@link https://compass-ui.dev/?path=/docs/display-emptystate |  **Storybook docs**}
 * @param title - The main heading text for the empty state.
 * @param description - Optional descriptive text explaining the empty state.
 * @param icon - Optional icon to display (mutually exclusive with image).
 * @param image - Optional image URL to display (mutually exclusive with icon).
 * @param children - Optional actions or content to display below the description.
 * @param variant - Optional visual variant to apply to the component.
 * @param styles - Custom styles to apply to different parts of the component.
 */
export function EmptyState({
  icon,
  image,
  className,
  children,
  title,
  description,
  "data-test-id": dataTestId,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-test-id={dataTestId}
      className={cn(backgroundVariants({}), className)}
      {...props}
    >
      {icon && <IconGroup icon={icon} />}
      {image && <img src={image} className="h-28" />}
      <div className="max-w-lg space-y-2">
        <h2 className={titleVariants({})}>{title}</h2>
        {description && (
          <p className={descriptionVariants({})}>{description}</p>
        )}
      </div>
      {children && <div className="flex justify-center">{children}</div>}
    </div>
  );
}
