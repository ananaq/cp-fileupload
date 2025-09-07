module.exports = {

"[externals]/@radix-ui/react-slot [external] (@radix-ui/react-slot, esm_import)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@radix-ui/react-slot");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/motion/react [external] (motion/react, esm_import)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("motion/react");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/utils/get-string-from-children-prop.ts [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getStringFromChildrenProp": ()=>getStringFromChildrenProp
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
const getStringFromChildrenProp = (children)=>{
    if (typeof children === "string" || typeof children === "number") {
        return children.toString();
    }
    if (/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["isValidElement"])(children)) {
        const props = children.props;
        return getStringFromChildrenProp(props.children);
    }
    if (Array.isArray(children)) {
        return children.map(getStringFromChildrenProp).join("");
    }
    return "";
};
}),
"[project]/src/components/Button.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "Button": ()=>Button,
    "buttonVariants": ()=>buttonVariants
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$radix$2d$ui$2f$react$2d$slot__$5b$external$5d$__$2840$radix$2d$ui$2f$react$2d$slot$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@radix-ui/react-slot [external] (@radix-ui/react-slot, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/class-variance-authority [external] (class-variance-authority, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$motion$2f$react__$5b$external$5d$__$28$motion$2f$react$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/motion/react [external] (motion/react, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cn.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Icon.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$get$2d$string$2d$from$2d$children$2d$prop$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/get-string-from-children-prop.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$radix$2d$ui$2f$react$2d$slot__$5b$external$5d$__$2840$radix$2d$ui$2f$react$2d$slot$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$motion$2f$react__$5b$external$5d$__$28$motion$2f$react$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$radix$2d$ui$2f$react$2d$slot__$5b$external$5d$__$2840$radix$2d$ui$2f$react$2d$slot$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$motion$2f$react__$5b$external$5d$__$28$motion$2f$react$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
"use client";
;
;
;
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__["cva"])([
    "relative flex items-center justify-center whitespace-nowrap transition-all border outline-hidden focus-visible:outline-hidden group shrink-0 w-fit",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "font-medium leading-none"
], {
    variants: {
        variant: {
            solid: "light text-white",
            outline: "bg-default",
            ghost: "border-transparent bg-transparent text-gray-600"
        },
        colorScheme: {
            gray: "",
            brand: "",
            red: ""
        },
        size: {
            xs: "h-6 rounded-lg text-xs",
            sm: "h-7 rounded-lg text-sm",
            md: "h-8 rounded-lg text-sm",
            lg: "h-10 rounded-[10px] text-md"
        }
    },
    defaultVariants: {
        variant: "solid",
        size: "md"
    },
    compoundVariants: [
        {
            variant: "solid",
            colorScheme: "gray",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])([
                // default
                "border-gray-900 bg-gray-800 shadow-solid-gray-button-default",
                // hover
                "enabled:hover:bg-gray-700",
                // active
                "enabled:active:shadow-solid-button-active enabled:data-[active=true]:shadow-solid-button-active data-[state=on]:shadow-solid-button-active",
                // focus
                "focus-visible:shadow-solid-button-gray-focus focus-outline-emphasized"
            ])
        },
        {
            variant: "solid",
            colorScheme: "brand",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])([
                // default
                "bg-blue-500 border-blue-600 shadow-solid-blue-button-default",
                // hover
                "enabled:hover:bg-blue-600",
                // active
                "enabled:active:shadow-solid-button-active enabled:data-[active=true]:shadow-solid-button-active data-[state=on]:shadow-solid-button-active",
                // focus
                "focus-visible:shadow-solid-button-blue-focus focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-blue-500/50"
            ])
        },
        {
            variant: "solid",
            colorScheme: "red",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])([
                // default
                "bg-red-500 border-red-600 shadow-solid-red-button-default",
                // hover
                "enabled:hover:bg-red-600",
                // active
                "enabled:active:shadow-solid-button-active enabled:data-[active=true]:shadow-solid-button-active data-[state=on]:shadow-solid-button-active",
                // focus
                "focus-visible:shadow-solid-button-red-focus focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-red-500/50"
            ])
        },
        {
            variant: "outline",
            colorScheme: "gray",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])([
                // default
                "border-gray-300 shadow-button-elevated text-gray-700",
                // hover
                "enabled:hover:bg-gray-50 enabled:hover:text-gray-900",
                // active
                "enabled:active:text-gray-900 enabled:data-[active=true]:text-gray-900 enabled:active:shadow-button-shallow-inset-indented enabled:data-[active=true]:shadow-button-shallow-inset-indented data-[state=on]:shadow-button-shallow-inset-indented data-[state=on]:text-gray-900 data-[state=on]:bg-gray-50",
                // focus
                "focus-visible:text-gray-900 focus-outline"
            ])
        },
        {
            variant: "outline",
            colorScheme: "red",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])([
                // default
                "text-red-900 border-gray-300 shadow-button-elevated",
                // hover
                "enabled:hover:bg-red-200/50 enabled:hover:border-red-200",
                // active
                "enabled:active:bg-red-200/50 enabled:data-[active=true]:bg-red-200/50 enabled:active:border-red-200 enabled:data-[active=true]:border-red-200 enabled:active:shadow-button-shallow-inset-indented enabled:data-[active=true]:shadow-button-shallow-inset-indented data-[state=on]:shadow-button-shallow-inset-indented data-[state=on]:text-red-900 data-[state=on]:border-red-200 data-[state=on]:bg-red-200/50",
                // focus
                "focus-visible:bg-red-200/50 focus-visible:border-red-200 focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-red-500/10"
            ])
        },
        {
            variant: "ghost",
            colorScheme: "gray",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])([
                // hover
                "enabled:hover:text-gray-900 enabled:hover:border-gray-200 enabled:hover:bg-gray-100",
                // active
                "enabled:active:text-gray-900 enabled:data-[active=true]:text-gray-900 enabled:active:border-gray-100 enabled:data-[active=true]:border-gray-100 enabled:active:bg-gray-200 enabled:data-[active=true]:bg-gray-200 enabled:active:shadow-ghost-button-active enabled:data-[active=true]:shadow-ghost-button-active data-[state=on]:shadow-ghost-button-active data-[state=on]:text-gray-900 data-[state=on]:border-gray-100 data-[state=on]:bg-gray-200",
                // focus
                "focus-visible:text-gray-900 focus-visible:bg-gray-100 focus-outline"
            ])
        }
    ]
});
const contentWrapperVariants = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__["cva"])("flex items-center justify-center", {
    variants: {
        size: {
            xs: "gap-x-1.5 px-2.5",
            sm: "gap-x-1.5 px-2.5",
            md: "gap-x-1.5 px-3",
            lg: "gap-x-2 px-3.5"
        },
        icon: {
            left: "pr-2.5",
            right: "pl-2.5",
            both: "px-2.5"
        }
    },
    defaultVariants: {
        size: "md",
        icon: null
    },
    compoundVariants: [
        {
            size: "xs",
            icon: "left",
            className: "pr-2"
        },
        {
            size: "xs",
            icon: "right",
            className: "pl-2"
        },
        {
            size: "xs",
            icon: "both",
            className: "px-2"
        },
        {
            size: "sm",
            icon: "left",
            className: "pr-2"
        },
        {
            size: "sm",
            icon: "right",
            className: "pl-2"
        },
        {
            size: "sm",
            icon: "both",
            className: "px-2"
        },
        {
            size: "lg",
            icon: "left",
            className: "pr-3"
        },
        {
            size: "lg",
            icon: "right",
            className: "pl-3"
        },
        {
            size: "lg",
            icon: "both",
            className: "px-3"
        }
    ]
});
const iconVariants = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__["cva"])([], {
    variants: {
        variant: {
            solid: "text-white",
            outline: "",
            ghost: "text-gray-600 group-hover:enabled:text-gray-900 group-active:enabled:text-gray-900 group-data-[active=true]:enabled:text-gray-900 group-focus-visible:enabled:text-gray-900"
        },
        colorScheme: {
            gray: "",
            brand: "",
            red: ""
        }
    },
    compoundVariants: [
        {
            variant: "outline",
            colorScheme: "gray",
            className: "text-gray-600 group-hover:enabled:text-gray-800 group-active:enabled:text-gray-800 group-data-[active=true]:enabled:text-gray-800 group-focus-visible:enabled:text-gray-800"
        },
        {
            variant: "outline",
            colorScheme: "red",
            className: "text-red-800 group-hover:enabled:text-red-900 group-active:enabled:text-red-900 group-data-[active=true]:enabled:text-red-900 group-focus-visible:enabled:text-red-900"
        }
    ]
});
const ButtonContent = ({ iconLeft, iconRight, children, size, variant, colorScheme, iconLeftClassName, iconRightClassName })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            typeof iconLeft === "string" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                name: iconLeft,
                size: size,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])(iconVariants({
                    variant,
                    colorScheme
                }), iconLeftClassName)
            }, void 0, false, {
                fileName: "[project]/src/components/Button.tsx",
                lineNumber: 286,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : iconLeft,
            children,
            typeof iconRight === "string" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                name: iconRight,
                size: size,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])(iconVariants({
                    variant,
                    colorScheme
                }), iconRightClassName)
            }, void 0, false, {
                fileName: "[project]/src/components/Button.tsx",
                lineNumber: 299,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : iconRight
        ]
    }, void 0, true);
};
const Button = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["forwardRef"])(({ variant = "solid", iconLeft, iconRight, children, size = "md", colorScheme = "gray", asChild = false, isLoading = false, isDisabled = false, loadingText, isActive, className, "aria-label": ariaLabel, "data-test-id": dataTestId, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$externals$5d2f40$radix$2d$ui$2f$react$2d$slot__$5b$external$5d$__$2840$radix$2d$ui$2f$react$2d$slot$2c$__esm_import$29$__["Slot"] : "button";
    const icon = iconLeft && iconRight ? "both" : iconLeft ? "left" : iconRight ? "right" : undefined;
    const contentRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [minWidth, setMinWidth] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(undefined);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (contentRef.current) {
            setMinWidth(contentRef.current.offsetWidth);
        }
    }, [
        children,
        iconLeft,
        iconRight,
        size
    ]);
    const contentKey = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const childrenString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$get$2d$string$2d$from$2d$children$2d$prop$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getStringFromChildrenProp"])(children);
        return `${childrenString}-${iconLeft}-${iconRight}-${variant}-${colorScheme}-${size}`;
    }, [
        children,
        iconLeft,
        iconRight,
        variant,
        colorScheme,
        size
    ]);
    const classNames = typeof className === "string" ? {
        root: className
    } : className || {};
    const buttonState = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        switch(true){
            case isLoading:
                return "Loading";
            case isDisabled:
                return "Disabled";
            default:
                return "Idle";
        }
    }, [
        isDisabled,
        isLoading
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            colorScheme
        }), classNames.root),
        style: {
            minWidth: minWidth ? `${minWidth}px` : undefined
        },
        disabled: isDisabled || isLoading,
        "data-active": isActive,
        "aria-label": ariaLabel || (typeof children === "string" ? children : children?.toString()),
        ref: ref,
        "data-test-id": dataTestId,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$motion$2f$react__$5b$external$5d$__$28$motion$2f$react$2c$__esm_import$29$__["AnimatePresence"], {
                mode: "wait",
                initial: false,
                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$motion$2f$react__$5b$external$5d$__$28$motion$2f$react$2c$__esm_import$29$__["motion"].span, {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 flex items-center justify-center", classNames.loader),
                    initial: {
                        opacity: 0,
                        y: -10,
                        filter: "blur(5px)"
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)"
                    },
                    exit: {
                        opacity: 0,
                        y: 10,
                        filter: "blur(5px)"
                    },
                    transition: {
                        duration: 0.15
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                            name: "loader",
                            className: "animate-spin",
                            size: size
                        }, void 0, false, {
                            fileName: "[project]/src/components/Button.tsx",
                            lineNumber: 423,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        loadingText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "ml-2",
                            children: loadingText
                        }, void 0, false, {
                            fileName: "[project]/src/components/Button.tsx",
                            lineNumber: 424,
                            columnNumber: 31
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, `loader-${buttonState}`, true, {
                    fileName: "[project]/src/components/Button.tsx",
                    lineNumber: 411,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$motion$2f$react__$5b$external$5d$__$28$motion$2f$react$2c$__esm_import$29$__["motion"].span, {
                    ref: contentRef,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 overflow-hidden", contentWrapperVariants({
                        size,
                        icon
                    }), classNames.contentWrapper),
                    initial: {
                        opacity: 0,
                        y: -10,
                        filter: "blur(5px)"
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)"
                    },
                    exit: {
                        opacity: 0,
                        y: 10,
                        filter: "blur(5px)"
                    },
                    transition: {
                        duration: 0.15
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ButtonContent, {
                        iconLeft: iconLeft,
                        iconRight: iconRight,
                        size: size,
                        variant: variant,
                        colorScheme: colorScheme,
                        iconLeftClassName: classNames.iconLeft,
                        iconRightClassName: classNames.iconRight,
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/Button.tsx",
                        lineNumber: 441,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                }, `content-${contentKey}-${buttonState}`, false, {
                    fileName: "[project]/src/components/Button.tsx",
                    lineNumber: 427,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/Button.tsx",
                lineNumber: 409,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])("invisible overflow-hidden opacity-0", contentWrapperVariants({
                    size,
                    icon
                }), classNames.contentWrapper),
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ButtonContent, {
                    iconLeft: iconLeft,
                    iconRight: iconRight,
                    size: size,
                    variant: variant,
                    colorScheme: colorScheme,
                    iconLeftClassName: classNames.iconLeft,
                    iconRightClassName: classNames.iconRight,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/components/Button.tsx",
                    lineNumber: 464,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/Button.tsx",
                lineNumber: 456,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Button.tsx",
        lineNumber: 389,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Button.displayName = "Button";
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/@radix-ui/react-label [external] (@radix-ui/react-label, esm_import)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@radix-ui/react-label");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/components/FieldSet.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "FieldSet": ()=>FieldSet,
    "FieldSetDescription": ()=>FieldSetDescription,
    "Label": ()=>Label,
    "Prompt": ()=>Prompt
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$radix$2d$ui$2f$react$2d$label__$5b$external$5d$__$2840$radix$2d$ui$2f$react$2d$label$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@radix-ui/react-label [external] (@radix-ui/react-label, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/class-variance-authority [external] (class-variance-authority, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cn.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Icon.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Tooltip$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Tooltip.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$radix$2d$ui$2f$react$2d$label__$5b$external$5d$__$2840$radix$2d$ui$2f$react$2d$label$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Tooltip$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$radix$2d$ui$2f$react$2d$label__$5b$external$5d$__$2840$radix$2d$ui$2f$react$2d$label$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Tooltip$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
"use client";
;
;
;
;
;
;
;
const FieldSet = ({ children, state = "default", variant = "default", className, label, description, promptText, isDisabled = false, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("fieldset", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])("group/field flex min-w-0 shrink-0 flex-col gap-2.5", {
            disabled: isDisabled
        }, className),
        ...props,
        children: [
            (label || description) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1",
                children: [
                    label && (typeof label === "string" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Label, {
                        variant: variant,
                        isDisabled: isDisabled,
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/FieldSet.tsx",
                        lineNumber: 60,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)) : label.children && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Label, {
                        variant: variant,
                        isDisabled: isDisabled,
                        ...label,
                        children: label.children
                    }, void 0, false, {
                        fileName: "[project]/src/components/FieldSet.tsx",
                        lineNumber: 65,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FieldSetDescription, {
                        isDisabled: isDisabled,
                        variant: variant,
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/src/components/FieldSet.tsx",
                        lineNumber: 71,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FieldSet.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            children,
            promptText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Prompt, {
                isDisabled: isDisabled,
                state: state === "default" ? "help" : "error",
                children: promptText
            }, void 0, false, {
                fileName: "[project]/src/components/FieldSet.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/FieldSet.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const labelVariants = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__["cva"])("flex items-center gap-1.5 transition-colors text-sm font-medium leading-none", {
    variants: {
        variant: {
            default: "text-gray-700 group-focus-within/field:text-gray-900 group-hover/field:text-gray-800",
            themable: "text-ct-dialog-text/90 group-focus-within/field:text-ct-dialog-text group-hover/field:text-ct-dialog-text text-ct-dialog-font-size! font-ct-dialog-font-family text-ct-dialog-text!"
        },
        clickable: {
            true: "cursor-pointer",
            false: ""
        },
        isDisabled: {
            true: "cursor-not-allowed opacity-50",
            false: ""
        }
    }
});
const auxiliaryLabelVariants = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__["cva"])("", {
    variants: {
        variant: {
            default: "text-gray-500",
            themable: "text-ct-dialog-text/50"
        }
    }
});
const Label = ({ children, htmlFor, tooltip, isRequired, isOptional, isDisabled = false, variant = "default", className, "data-test-id": dataTestId, ...props })=>{
    const containsText = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((node)=>{
        if (typeof node === "string") {
            return node.trim() !== "";
        }
        if (/*#__PURE__*/ __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].isValidElement(node)) {
            const props = node.props;
            if (props.label && typeof props.label === "string") {
                return props.label.trim() !== "";
            }
            if (props.dangerouslySetInnerHTML && typeof props.dangerouslySetInnerHTML === "object" && props.dangerouslySetInnerHTML !== null && "__html" in props.dangerouslySetInnerHTML) {
                return String(props.dangerouslySetInnerHTML.__html).trim() !== "";
            }
            return __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].Children.toArray(props.children).some(containsText);
        }
        if (Array.isArray(node)) {
            return node.some(containsText);
        }
        return false;
    }, []);
    const hasVisibleLabel = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const result = containsText(children);
        return result;
    }, [
        children,
        containsText
    ]);
    const subLabel = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        if (isDisabled) {
            return null;
        } else if (isRequired) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Tooltip$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                content: "Required",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    title: "Required",
                    className: "bg-ct-button-bg text-ct-button-text flex h-2.5 w-2.5 items-center justify-center rounded-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                        name: "asterisk",
                        className: "h-2.5 w-2.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/FieldSet.tsx",
                        lineNumber: 196,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/FieldSet.tsx",
                    lineNumber: 192,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/FieldSet.tsx",
                lineNumber: 191,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        } else if (isOptional) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm leading-none font-normal text-gray-500"),
                children: "optional"
            }, void 0, false, {
                fileName: "[project]/src/components/FieldSet.tsx",
                lineNumber: 202,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        } else {
            return null;
        }
    }, [
        isDisabled,
        isRequired,
        isOptional
    ]);
    if (!hasVisibleLabel) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$radix$2d$ui$2f$react$2d$label__$5b$external$5d$__$2840$radix$2d$ui$2f$react$2d$label$2c$__esm_import$29$__["Root"], {
        htmlFor: htmlFor,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])(labelVariants({
            variant,
            isDisabled,
            clickable: Boolean(htmlFor)
        }), className),
        "data-test-id": dataTestId,
        ...props,
        children: [
            children,
            tooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Tooltip$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                content: tooltip,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                    name: "info",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])("cursor-default text-gray-500", auxiliaryLabelVariants({
                        variant
                    }))
                }, void 0, false, {
                    fileName: "[project]/src/components/FieldSet.tsx",
                    lineNumber: 226,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/FieldSet.tsx",
                lineNumber: 225,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            subLabel
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/FieldSet.tsx",
        lineNumber: 214,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const descriptionVariants = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__["cva"])("select-none text-xs leading-4", {
    variants: {
        variant: {
            default: "text-gray-500",
            themable: "text-ct-dialog-text/50"
        },
        isDisabled: {
            true: "cursor-not-allowed opacity-50",
            false: ""
        }
    }
});
const FieldSetDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].forwardRef(({ isDisabled, variant = "default", "data-test-id": dataTestId, children, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])(descriptionVariants({
            variant,
            isDisabled
        })),
        "data-test-id": dataTestId,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/FieldSet.tsx",
        lineNumber: 275,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
FieldSetDescription.displayName = "FieldSetDescription";
const promptVariants = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__["cva"])("flex items-center gap-1 text-xs", {
    variants: {
        state: {
            help: "text-gray-500",
            error: "text-red-600"
        },
        isDisabled: {
            true: "opacity-50 cursor-not-allowed"
        }
    }
});
const Prompt = ({ state = "help", icon, showIcon = true, isDisabled, children, "data-test-id": dataTestId })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])(promptVariants({
            state,
            isDisabled
        })),
        "data-test-id": dataTestId,
        children: [
            showIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                name: icon || (state === "help" ? "info" : "circle-x"),
                size: "xs"
            }, void 0, false, {
                fileName: "[project]/src/components/FieldSet.tsx",
                lineNumber: 323,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "line-clamp-2",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/FieldSet.tsx",
                lineNumber: 328,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/FieldSet.tsx",
        lineNumber: 318,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/components/FileUpload.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "FileUpload": ()=>FileUpload
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/class-variance-authority [external] (class-variance-authority, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$motion$2f$react__$5b$external$5d$__$28$motion$2f$react$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/motion/react [external] (motion/react, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file.js [ssr] (ecmascript) <export default as File>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [ssr] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cn.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FieldSet$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FieldSet.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Button.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$motion$2f$react__$5b$external$5d$__$28$motion$2f$react$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FieldSet$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$motion$2f$react__$5b$external$5d$__$28$motion$2f$react$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FieldSet$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
"use client";
;
;
;
;
;
;
;
;
const containerVariants = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__["cva"])([
    "relative flex flex-col gap-3 transition-all duration-200"
], {
    variants: {
        variant: {
            primary: "w-full",
            inline: "w-full max-w-md"
        },
        disabled: {
            true: "opacity-50 pointer-events-none",
            false: ""
        }
    },
    defaultVariants: {
        variant: "primary",
        disabled: false
    }
});
const dropZoneVariants = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__["cva"])([
    "relative flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer group",
    "hover:border-gray-400 hover:bg-gray-50",
    "focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500"
], {
    variants: {
        variant: {
            primary: "min-h-[200px]",
            inline: "min-h-[120px] py-4"
        },
        isDragActive: {
            true: "border-blue-500 bg-blue-50",
            false: "border-gray-300"
        },
        hasFiles: {
            true: "border-gray-200 bg-gray-50",
            false: ""
        },
        error: {
            true: "border-red-300 bg-red-50",
            false: ""
        },
        disabled: {
            true: "cursor-not-allowed opacity-50",
            false: ""
        }
    },
    compoundVariants: [
        {
            variant: "primary",
            isDragActive: true,
            className: "min-h-[220px]"
        }
    ]
});
const fileListVariants = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__["cva"])("flex flex-col gap-2", {
    variants: {
        variant: {
            primary: "mt-4",
            inline: "mt-3"
        }
    }
});
const fileItemVariants = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$class$2d$variance$2d$authority__$5b$external$5d$__$28$class$2d$variance$2d$authority$2c$__esm_import$29$__["cva"])([
    "flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg transition-all duration-200",
    "hover:border-gray-300 hover:shadow-sm"
], {
    variants: {
        status: {
            idle: "",
            uploading: "border-blue-200 bg-blue-50",
            success: "border-green-200 bg-green-50",
            error: "border-red-200 bg-red-50"
        }
    }
});
const getFileIcon = (file)=>{
    if (file.type.startsWith("image/")) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/src/components/FileUpload.tsx",
        lineNumber: 168,
        columnNumber: 46
    }, ("TURBOPACK compile-time value", void 0));
    if (file.type.startsWith("video/")) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/src/components/FileUpload.tsx",
        lineNumber: 169,
        columnNumber: 46
    }, ("TURBOPACK compile-time value", void 0));
    if (file.type.startsWith("audio/")) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/src/components/FileUpload.tsx",
        lineNumber: 170,
        columnNumber: 46
    }, ("TURBOPACK compile-time value", void 0));
    if (file.type.includes("pdf")) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/src/components/FileUpload.tsx",
        lineNumber: 171,
        columnNumber: 41
    }, ("TURBOPACK compile-time value", void 0));
    if (file.type.includes("text")) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/src/components/FileUpload.tsx",
        lineNumber: 172,
        columnNumber: 42
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/src/components/FileUpload.tsx",
        lineNumber: 173,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const formatFileSize = (bytes)=>{
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
const validateFile = (file, accept, maxSize, minSize)=>{
    // Check file type
    if (accept && !file.type.match(accept.replace(/\*/g, ".*"))) {
        return `File type not allowed. Accepted types: ${accept}`;
    }
    // Check file size
    if (maxSize && file.size > maxSize) {
        return `File too large. Maximum size: ${formatFileSize(maxSize)}`;
    }
    if (minSize && file.size < minSize) {
        return `File too small. Minimum size: ${formatFileSize(minSize)}`;
    }
    return null;
};
const FileUpload = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["forwardRef"])(({ value, defaultValue = [], onChange, onDrop, accept, maxFiles = 10, maxSize, minSize, size = "md", variant = "primary", multiple = true, disabled = false, label, description, uploadText = "Choose file", dragText = "or drag and drop", isUploading = false, error, help, uploadIcon, className, "data-test-id": dataTestId, ...props }, ref)=>{
    const [internalFiles, setInternalFiles] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(defaultValue.map((file)=>({
            ...file,
            id: Math.random().toString(36)
        })));
    const [isDragActive, setIsDragActive] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [dragCounter, setDragCounter] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const generatedId = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useId"])();
    const uniqueId = props.id || generatedId;
    const files = value !== undefined ? value : internalFiles;
    const handleFiles = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((newFiles)=>{
        const validatedFiles = [];
        const errors = [];
        newFiles.forEach((file)=>{
            const error = validateFile(file, accept, maxSize, minSize);
            if (error) {
                errors.push(`${file.name}: ${error}`);
            } else {
                const uploadedFile = {
                    id: Math.random().toString(36),
                    file,
                    status: "idle"
                };
                // Create preview for images
                if (file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = (e)=>{
                        uploadedFile.preview = e.target?.result;
                        setInternalFiles((prev)=>[
                                ...prev
                            ]);
                        onChange?.(files);
                    };
                    reader.readAsDataURL(file);
                }
                validatedFiles.push(uploadedFile);
            }
        });
        if (errors.length > 0) {
            console.warn("File validation errors:", errors);
        }
        if (validatedFiles.length > 0) {
            const updatedFiles = multiple ? [
                ...files,
                ...validatedFiles
            ].slice(0, maxFiles) : validatedFiles.slice(0, 1);
            if (value === undefined) {
                setInternalFiles(updatedFiles);
            }
            onChange?.(updatedFiles);
            onDrop?.(validatedFiles.map((f)=>f.file));
        }
    }, [
        files,
        accept,
        maxSize,
        minSize,
        multiple,
        maxFiles,
        onChange,
        onDrop,
        value
    ]);
    const removeFile = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((fileId)=>{
        const updatedFiles = files.filter((f)=>f.id !== fileId);
        if (value === undefined) {
            setInternalFiles(updatedFiles);
        }
        onChange?.(updatedFiles);
    }, [
        files,
        onChange,
        value
    ]);
    const handleDragEnter = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((e)=>{
        e.preventDefault();
        e.stopPropagation();
        setDragCounter((prev)=>prev + 1);
        if (dragCounter === 0) {
            setIsDragActive(true);
        }
    }, [
        dragCounter
    ]);
    const handleDragLeave = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((e)=>{
        e.preventDefault();
        e.stopPropagation();
        setDragCounter((prev)=>prev - 1);
        if (dragCounter <= 1) {
            setIsDragActive(false);
        }
    }, [
        dragCounter
    ]);
    const handleDragOver = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((e)=>{
        e.preventDefault();
        e.stopPropagation();
    }, []);
    const handleDrop = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((e)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        setDragCounter(0);
        if (disabled) return;
        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles(droppedFiles);
    }, [
        disabled,
        handleFiles
    ]);
    const handleFileInputChange = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((e)=>{
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);
        handleFiles(selectedFiles);
        // Reset file input
        e.target.value = "";
    }, [
        handleFiles
    ]);
    const handleClick = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        if (!disabled) {
            fileInputRef.current?.click();
        }
    }, [
        disabled
    ]);
    const getUploadText = ()=>{
        if (variant === "inline") {
            return files.length > 0 ? "Change file" : uploadText;
        }
        return uploadText;
    };
    const getDragText = ()=>{
        if (variant === "inline" || files.length > 0) {
            return "";
        }
        return dragText;
    };
    const defaultUploadIcon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
        className: "w-6 h-6"
    }, void 0, false, {
        fileName: "[project]/src/components/FileUpload.tsx",
        lineNumber: 381,
        columnNumber: 31
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FieldSet$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["FieldSet"], {
        label: label,
        description: description,
        state: error ? "error" : "default",
        promptText: error || help,
        isDisabled: disabled,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])(containerVariants({
            variant,
            disabled
        }), className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])(dropZoneVariants({
                    variant,
                    isDragActive,
                    hasFiles: files.length > 0,
                    error: Boolean(error),
                    disabled
                })),
                onDragEnter: handleDragEnter,
                onDragLeave: handleDragLeave,
                onDragOver: handleDragOver,
                onDrop: handleDrop,
                onClick: handleClick,
                role: "button",
                tabIndex: disabled ? -1 : 0,
                "aria-label": `Upload files${accept ? ` (${accept})` : ""}`,
                "data-test-id": dataTestId,
                onKeyDown: (e)=>{
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleClick();
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        ref: fileInputRef,
                        type: "file",
                        accept: accept,
                        multiple: multiple,
                        onChange: handleFileInputChange,
                        className: "sr-only",
                        "aria-hidden": "true",
                        id: uniqueId
                    }, void 0, false, {
                        fileName: "[project]/src/components/FileUpload.tsx",
                        lineNumber: 422,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$motion$2f$react__$5b$external$5d$__$28$motion$2f$react$2c$__esm_import$29$__["AnimatePresence"], {
                        mode: "wait",
                        children: files.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$motion$2f$react__$5b$external$5d$__$28$motion$2f$react$2c$__esm_import$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 10
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -10
                            },
                            className: "flex flex-col items-center gap-3 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors",
                                    children: uploadIcon || defaultUploadIcon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FileUpload.tsx",
                                    lineNumber: 442,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-gray-700",
                                            children: getUploadText()
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FileUpload.tsx",
                                            lineNumber: 446,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        getDragText() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500",
                                            children: getDragText()
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FileUpload.tsx",
                                            lineNumber: 450,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/FileUpload.tsx",
                                    lineNumber: 445,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, "empty-state", true, {
                            fileName: "[project]/src/components/FileUpload.tsx",
                            lineNumber: 435,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$motion$2f$react__$5b$external$5d$__$28$motion$2f$react$2c$__esm_import$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 10
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -10
                            },
                            className: "flex flex-col items-center gap-3 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "p-3 rounded-full bg-blue-100",
                                    children: uploadIcon || defaultUploadIcon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FileUpload.tsx",
                                    lineNumber: 462,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-gray-700",
                                            children: [
                                                files.length,
                                                " file",
                                                files.length !== 1 ? "s" : "",
                                                " selected"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/FileUpload.tsx",
                                            lineNumber: 466,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500",
                                            children: "Click to change"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FileUpload.tsx",
                                            lineNumber: 469,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/FileUpload.tsx",
                                    lineNumber: 465,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, "files-state", true, {
                            fileName: "[project]/src/components/FileUpload.tsx",
                            lineNumber: 455,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/FileUpload.tsx",
                        lineNumber: 433,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    isDragActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$motion$2f$react__$5b$external$5d$__$28$motion$2f$react$2c$__esm_import$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        className: "absolute inset-0 flex items-center justify-center bg-blue-500/10 rounded-lg pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-blue-700",
                                children: "Drop files here"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FileUpload.tsx",
                                lineNumber: 483,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/FileUpload.tsx",
                            lineNumber: 482,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/FileUpload.tsx",
                        lineNumber: 476,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FileUpload.tsx",
                lineNumber: 395,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$motion$2f$react__$5b$external$5d$__$28$motion$2f$react$2c$__esm_import$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    height: 0
                },
                animate: {
                    opacity: 1,
                    height: "auto"
                },
                exit: {
                    opacity: 0,
                    height: 0
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])(fileListVariants({
                    variant
                })),
                children: files.map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$motion$2f$react__$5b$external$5d$__$28$motion$2f$react$2c$__esm_import$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            x: -20
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 20
                        },
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])(fileItemVariants({
                            status: file.status
                        })),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 flex-1 min-w-0",
                                children: [
                                    file.preview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: file.preview,
                                        alt: file.file.name,
                                        className: "w-8 h-8 object-cover rounded border border-gray-200"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FileUpload.tsx",
                                        lineNumber: 506,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 bg-gray-100 rounded flex items-center justify-center",
                                        children: getFileIcon(file.file)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FileUpload.tsx",
                                        lineNumber: 512,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-gray-900 truncate",
                                                children: file.file.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FileUpload.tsx",
                                                lineNumber: 518,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500",
                                                children: formatFileSize(file.file.size)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FileUpload.tsx",
                                                lineNumber: 521,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/FileUpload.tsx",
                                        lineNumber: 517,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    file.status === "uploading" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-4 h-4 text-blue-500 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FileUpload.tsx",
                                        lineNumber: 527,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    file.status === "success" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        className: "w-4 h-4 text-green-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FileUpload.tsx",
                                        lineNumber: 531,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    file.status === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                        className: "w-4 h-4 text-red-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FileUpload.tsx",
                                        lineNumber: 535,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FileUpload.tsx",
                                lineNumber: 504,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "xs",
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    removeFile(file.id);
                                },
                                "aria-label": `Remove ${file.file.name}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FileUpload.tsx",
                                    lineNumber: 548,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/FileUpload.tsx",
                                lineNumber: 539,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, file.id, true, {
                        fileName: "[project]/src/components/FileUpload.tsx",
                        lineNumber: 497,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/components/FileUpload.tsx",
                lineNumber: 490,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/FileUpload.tsx",
        lineNumber: 384,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
FileUpload.displayName = "FileUpload";
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[next]/internal/font/google/inter_c269c61a.module.css [ssr] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "inter_c269c61a-module__abudsG__className",
  "variable": "inter_c269c61a-module__abudsG__variable",
});
}),
"[next]/internal/font/google/inter_c269c61a.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_c269c61a$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_c269c61a.module.css [ssr] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_c269c61a$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Inter', 'Inter Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_c269c61a$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_c269c61a$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/src/pages/index.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": ()=>Home
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Button.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FileUpload$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FileUpload.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_c269c61a$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_c269c61a.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file.js [ssr] (ecmascript) <export default as File>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [ssr] (ecmascript) <export default as Image>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FileUpload$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FileUpload$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_c269c61a$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].className} font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
            className: "flex flex-col gap-8 max-w-4xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-gray-900 mb-4",
                            children: "Navattic Take Home Task"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/index.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: "By Viya Qu"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/index.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/index.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold text-gray-900",
                            children: "New File Upload Component"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/index.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-gray-800",
                                    children: "Primary Upload (Multiple Files)"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/index.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FileUpload$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["FileUpload"], {
                                    variant: "primary",
                                    multiple: true,
                                    maxFiles: 3,
                                    maxSize: 5 * 1024 * 1024,
                                    accept: "image/*,application/pdf",
                                    label: "Upload Files",
                                    description: "Upload up to 3 files. Supported formats: Images and PDFs. Max size: 5MB per file.",
                                    uploadText: "Choose files to upload",
                                    dragText: "or drag and drop files here",
                                    help: "Files will be processed after upload",
                                    uploadIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        className: "w-6 h-6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/index.tsx",
                                        lineNumber: 47,
                                        columnNumber: 27
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/index.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/index.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-gray-800",
                                    children: "Inline Upload (Single File)"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/index.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FileUpload$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["FileUpload"], {
                                            variant: "inline",
                                            multiple: false,
                                            accept: "image/*",
                                            label: "Profile Picture",
                                            description: "Upload your profile picture",
                                            uploadText: "Choose image",
                                            help: "JPG, PNG, or GIF format",
                                            uploadIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/index.tsx",
                                                lineNumber: 63,
                                                columnNumber: 29
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/index.tsx",
                                            lineNumber: 55,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FileUpload$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["FileUpload"], {
                                            variant: "inline",
                                            multiple: false,
                                            accept: ".pdf,.doc,.docx",
                                            label: "Resume",
                                            description: "Upload your resume",
                                            uploadText: "Choose file",
                                            help: "PDF or Word document",
                                            uploadIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/index.tsx",
                                                lineNumber: 73,
                                                columnNumber: 29
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/index.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/index.tsx",
                                    lineNumber: 54,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/index.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/index.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold text-gray-900",
                            children: "Demo Pages"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/index.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/file-upload-demo",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    className: "w-full",
                                    children: "View Complete Demo"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/index.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/index.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/index.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/index.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/index.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/index.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__fad82a3c._.js.map