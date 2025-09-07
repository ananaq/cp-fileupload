import { isValidElement, ReactNode } from "react";

export const getStringFromChildrenProp = (children: ReactNode): string => {
  if (typeof children === "string" || typeof children === "number") {
    return children.toString();
  }
  if (isValidElement(children)) {
    const props = children.props as Record<string, unknown>;
    return getStringFromChildrenProp(props.children as ReactNode)
  }
  if (Array.isArray(children)) {
    return children.map(getStringFromChildrenProp).join("");
  }
  return "";
};
