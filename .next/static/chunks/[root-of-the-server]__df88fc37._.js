(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s({
    "connect": ()=>connect,
    "setHooks": ()=>setHooks,
    "subscribeToUpdate": ()=>subscribeToUpdate
});
function connect(param) {
    let { addMessageListener, sendMessage, onUpdateError = console.error } = param;
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: (param)=>{
            let [chunkPath, callback] = param;
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        var _updateA_modules;
        const deletedModules = new Set((_updateA_modules = updateA.modules) !== null && _updateA_modules !== void 0 ? _updateA_modules : []);
        var _updateB_modules;
        const addedModules = new Set((_updateB_modules = updateB.modules) !== null && _updateB_modules !== void 0 ? _updateB_modules : []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        var _updateA_added, _updateB_added;
        const added = new Set([
            ...(_updateA_added = updateA.added) !== null && _updateA_added !== void 0 ? _updateA_added : [],
            ...(_updateB_added = updateB.added) !== null && _updateB_added !== void 0 ? _updateB_added : []
        ]);
        var _updateA_deleted, _updateB_deleted;
        const deleted = new Set([
            ...(_updateA_deleted = updateA.deleted) !== null && _updateA_deleted !== void 0 ? _updateA_deleted : [],
            ...(_updateB_deleted = updateB.deleted) !== null && _updateB_deleted !== void 0 ? _updateB_deleted : []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        var _updateA_modules1, _updateB_added1;
        const modules = new Set([
            ...(_updateA_modules1 = updateA.modules) !== null && _updateA_modules1 !== void 0 ? _updateA_modules1 : [],
            ...(_updateB_added1 = updateB.added) !== null && _updateB_added1 !== void 0 ? _updateB_added1 : []
        ]);
        var _updateB_deleted1;
        for (const moduleId of (_updateB_deleted1 = updateB.deleted) !== null && _updateB_deleted1 !== void 0 ? _updateB_deleted1 : []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        var _updateB_modules1;
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set((_updateB_modules1 = updateB.modules) !== null && _updateB_modules1 !== void 0 ? _updateB_modules1 : []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error("Invariant: ".concat(message));
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/src/utils/cn.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": ()=>cn
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [client] (ecmascript)");
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Icon.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Icon": ()=>Icon,
    "iconVariants": ()=>iconVariants
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cn.ts [client] (ecmascript)");
"use client";
;
;
;
;
const iconVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["cva"])([
    "inline shrink-0 self-center"
], {
    variants: {
        size: {
            xs: "w-3 h-3",
            sm: "w-3.5 h-3.5",
            md: "w-4 h-4",
            lg: "w-5 h-5"
        }
    }
});
const Icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = (param, ref)=>{
    let { size = "md", name, className, "aria-label": ariaLabel, "data-test-id": dataTestId, slot, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...props,
        ref: ref,
        "aria-label": ariaLabel || name,
        "data-test-id": dataTestId,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])(iconVariants({
            size
        }), name === "loader" && "animate-spin", className),
        // @ts-expect-error https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots#adding_flexibility_with_slots
        slot: slot,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("use", {
            href: "/icons/sprite.svg#".concat(name)
        }, void 0, false, {
            fileName: "[project]/src/components/Icon.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Icon.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Icon;
Icon.displayName = "Icon";
var _c, _c1;
__turbopack_context__.k.register(_c, "Icon$forwardRef");
__turbopack_context__.k.register(_c1, "Icon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/utils/get-string-from-children-prop.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getStringFromChildrenProp": ()=>getStringFromChildrenProp
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
const getStringFromChildrenProp = (children)=>{
    if (typeof children === "string" || typeof children === "number") {
        return children.toString();
    }
    if (/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidElement"])(children)) {
        const props = children.props;
        return getStringFromChildrenProp(props.children);
    }
    if (Array.isArray(children)) {
        return children.map(getStringFromChildrenProp).join("");
    }
    return "";
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Button.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Button": ()=>Button,
    "buttonVariants": ()=>buttonVariants
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cn.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Icon.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$get$2d$string$2d$from$2d$children$2d$prop$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/get-string-from-children-prop.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["cva"])([
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
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])([
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
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])([
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
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])([
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
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])([
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
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])([
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
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])([
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
const contentWrapperVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["cva"])("flex items-center justify-center", {
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
const iconVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["cva"])([], {
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
const ButtonContent = (param)=>{
    let { iconLeft, iconRight, children, size, variant, colorScheme, iconLeftClassName, iconRightClassName } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            typeof iconLeft === "string" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
                name: iconLeft,
                size: size,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])(iconVariants({
                    variant,
                    colorScheme
                }), iconLeftClassName)
            }, void 0, false, {
                fileName: "[project]/src/components/Button.tsx",
                lineNumber: 286,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : iconLeft,
            children,
            typeof iconRight === "string" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
                name: iconRight,
                size: size,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])(iconVariants({
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
_c = ButtonContent;
const Button = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c1 = _s((param, ref)=>{
    let { variant = "solid", iconLeft, iconRight, children, size = "md", colorScheme = "gray", asChild = false, isLoading = false, isDisabled = false, loadingText, isActive, className, "aria-label": ariaLabel, "data-test-id": dataTestId, ...props } = param;
    _s();
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    const icon = iconLeft && iconRight ? "both" : iconLeft ? "left" : iconRight ? "right" : undefined;
    const contentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [minWidth, setMinWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Button.useEffect": ()=>{
            if (contentRef.current) {
                setMinWidth(contentRef.current.offsetWidth);
            }
        }
    }["Button.useEffect"], [
        children,
        iconLeft,
        iconRight,
        size
    ]);
    const contentKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Button.useMemo[contentKey]": ()=>{
            const childrenString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$get$2d$string$2d$from$2d$children$2d$prop$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getStringFromChildrenProp"])(children);
            return "".concat(childrenString, "-").concat(iconLeft, "-").concat(iconRight, "-").concat(variant, "-").concat(colorScheme, "-").concat(size);
        }
    }["Button.useMemo[contentKey]"], [
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
    const buttonState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Button.useMemo[buttonState]": ()=>{
            switch(true){
                case isLoading:
                    return "Loading";
                case isDisabled:
                    return "Disabled";
                default:
                    return "Idle";
            }
        }
    }["Button.useMemo[buttonState]"], [
        isDisabled,
        isLoading
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            colorScheme
        }), classNames.root),
        style: {
            minWidth: minWidth ? "".concat(minWidth, "px") : undefined
        },
        disabled: isDisabled || isLoading,
        "data-active": isActive,
        "aria-label": ariaLabel || (typeof children === "string" ? children : children === null || children === void 0 ? void 0 : children.toString()),
        ref: ref,
        "data-test-id": dataTestId,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                initial: false,
                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].span, {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 flex items-center justify-center", classNames.loader),
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
                            name: "loader",
                            className: "animate-spin",
                            size: size
                        }, void 0, false, {
                            fileName: "[project]/src/components/Button.tsx",
                            lineNumber: 423,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        loadingText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ml-2",
                            children: loadingText
                        }, void 0, false, {
                            fileName: "[project]/src/components/Button.tsx",
                            lineNumber: 424,
                            columnNumber: 31
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, "loader-".concat(buttonState), true, {
                    fileName: "[project]/src/components/Button.tsx",
                    lineNumber: 411,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].span, {
                    ref: contentRef,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 overflow-hidden", contentWrapperVariants({
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
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ButtonContent, {
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
                }, "content-".concat(contentKey, "-").concat(buttonState), false, {
                    fileName: "[project]/src/components/Button.tsx",
                    lineNumber: 427,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/Button.tsx",
                lineNumber: 409,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])("invisible overflow-hidden opacity-0", contentWrapperVariants({
                    size,
                    icon
                }), classNames.contentWrapper),
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ButtonContent, {
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
}, "xyPWF2MToBS+ygeRHoRZN7GhYQM=")), "xyPWF2MToBS+ygeRHoRZN7GhYQM=");
_c2 = Button;
Button.displayName = "Button";
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ButtonContent");
__turbopack_context__.k.register(_c1, "Button$forwardRef");
__turbopack_context__.k.register(_c2, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Tooltip.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Tooltip": ()=>Tooltip,
    "TooltipProvider": ()=>TooltipProvider
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-tooltip/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cn.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Icon.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [client] (ecmascript)");
"use client";
;
;
;
;
;
;
const tooltipVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["cva"])([
    "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
    "data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade",
    "data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade",
    "data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
    "z-50 w-full max-w-60 select-none rounded-lg border",
    "text-xs font-normal"
], {
    variants: {
        appearance: {
            dark: "border-gray-900 bg-gray-800 text-gray-300 shadow-[0px_4px_11px_2px_rgba(0,0,0,0.2),0px_-1px_1px_0px_rgba(7,10,13,0.14)_inset,0px_1px_2px_0px_rgba(246,248,249,0.5)_inset]",
            light: "border-gray-200 bg-white text-gray-700 shadow-[inset_0px_1px_2px_0px_rgba(246,248,249,0.50),inset_0px_-1px_1px_0px_rgba(7,10,13,0.14),0px_5px_20px_0px_rgba(0,0,0,0.10),0px_10px_40px_0px_rgba(0,0,0,0.03)]"
        },
        isRichContent: {
            true: "p-2",
            false: "px-2 py-1"
        }
    }
});
function Tooltip(param) {
    let { children = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
        name: "info",
        className: "cursor-help text-gray-500"
    }, void 0, false, {
        fileName: "[project]/src/components/Tooltip.tsx",
        lineNumber: 67,
        columnNumber: 14
    }, this), side = "top", offset = 8, align = "center", title, content, appearance = "dark", delayDuration = 300, withArrow = false, open, onOpenChange, className, "data-test-id": dataTestId, ...rest } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Root"], {
        delayDuration: delayDuration,
        open: open,
        onOpenChange: onOpenChange,
        ...rest,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Trigger"], {
                asChild: true,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/Tooltip.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Portal"], {
                children: content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Content"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])(tooltipVariants({
                        appearance,
                        isRichContent: typeof content !== "string"
                    }), className),
                    side: side,
                    sideOffset: offset,
                    align: align,
                    "data-test-id": dataTestId,
                    children: [
                        title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])("mb-1 text-xs font-medium", {
                                "text-white": appearance === "dark",
                                "text-gray-900": appearance !== "dark"
                            }),
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/components/Tooltip.tsx",
                            lineNumber: 107,
                            columnNumber: 15
                        }, this) : null,
                        content,
                        withArrow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Arrow"], {
                            asChild: true,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])({
                                "fill-gray-900": appearance === "dark",
                                "fill-white": appearance !== "dark"
                            }),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "16",
                                height: "14",
                                viewBox: "0 0 24 12",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                className: "-translate-y-px",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M24 1C20 1 18 5 12 5C6 5 4 1 0 1",
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])({
                                        "fill-gray-900": appearance === "dark",
                                        "fill-white": appearance !== "dark"
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Tooltip.tsx",
                                    lineNumber: 133,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Tooltip.tsx",
                                lineNumber: 125,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Tooltip.tsx",
                            lineNumber: 118,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Tooltip.tsx",
                    lineNumber: 93,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Tooltip.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Tooltip.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_c = Tooltip;
function TooltipProvider(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/Tooltip.tsx",
        lineNumber: 157,
        columnNumber: 10
    }, this);
}
_c1 = TooltipProvider;
var _c, _c1;
__turbopack_context__.k.register(_c, "Tooltip");
__turbopack_context__.k.register(_c1, "TooltipProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/FieldSet.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "FieldSet": ()=>FieldSet,
    "FieldSetDescription": ()=>FieldSetDescription,
    "Label": ()=>Label,
    "Prompt": ()=>Prompt
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cn.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Icon.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Tooltip$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Tooltip.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const FieldSet = (param)=>{
    let { children, state = "default", variant = "default", className, label, description, promptText, isDisabled = false, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])("group/field flex min-w-0 shrink-0 flex-col gap-2.5", {
            disabled: isDisabled
        }, className),
        ...props,
        children: [
            (label || description) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1",
                children: [
                    label && (typeof label === "string" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                        variant: variant,
                        isDisabled: isDisabled,
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/FieldSet.tsx",
                        lineNumber: 60,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)) : label.children && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                        variant: variant,
                        isDisabled: isDisabled,
                        ...label,
                        children: label.children
                    }, void 0, false, {
                        fileName: "[project]/src/components/FieldSet.tsx",
                        lineNumber: 65,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldSetDescription, {
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
            promptText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Prompt, {
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
_c = FieldSet;
const labelVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["cva"])("flex items-center gap-1.5 transition-colors text-sm font-medium leading-none", {
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
const auxiliaryLabelVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["cva"])("", {
    variants: {
        variant: {
            default: "text-gray-500",
            themable: "text-ct-dialog-text/50"
        }
    }
});
const Label = (param)=>{
    let { children, htmlFor, tooltip, isRequired, isOptional, isDisabled = false, variant = "default", className, "data-test-id": dataTestId, ...props } = param;
    _s();
    const containsText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Label.useCallback[containsText]": (node)=>{
            if (typeof node === "string") {
                return node.trim() !== "";
            }
            if (/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].isValidElement(node)) {
                const props = node.props;
                if (props.label && typeof props.label === "string") {
                    return props.label.trim() !== "";
                }
                if (props.dangerouslySetInnerHTML && typeof props.dangerouslySetInnerHTML === "object" && props.dangerouslySetInnerHTML !== null && "__html" in props.dangerouslySetInnerHTML) {
                    return String(props.dangerouslySetInnerHTML.__html).trim() !== "";
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].Children.toArray(props.children).some(containsText);
            }
            if (Array.isArray(node)) {
                return node.some(containsText);
            }
            return false;
        }
    }["Label.useCallback[containsText]"], []);
    const hasVisibleLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Label.useMemo[hasVisibleLabel]": ()=>{
            const result = containsText(children);
            return result;
        }
    }["Label.useMemo[hasVisibleLabel]"], [
        children,
        containsText
    ]);
    const subLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Label.useMemo[subLabel]": ()=>{
            if (isDisabled) {
                return null;
            } else if (isRequired) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Tooltip$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                    content: "Required",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        title: "Required",
                        className: "bg-ct-button-bg text-ct-button-text flex h-2.5 w-2.5 items-center justify-center rounded-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
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
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])("text-sm leading-none font-normal text-gray-500"),
                    children: "optional"
                }, void 0, false, {
                    fileName: "[project]/src/components/FieldSet.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0));
            } else {
                return null;
            }
        }
    }["Label.useMemo[subLabel]"], [
        isDisabled,
        isRequired,
        isOptional
    ]);
    if (!hasVisibleLabel) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Root"], {
        htmlFor: htmlFor,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])(labelVariants({
            variant,
            isDisabled,
            clickable: Boolean(htmlFor)
        }), className),
        "data-test-id": dataTestId,
        ...props,
        children: [
            children,
            tooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Tooltip$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                content: tooltip,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
                    name: "info",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])("cursor-default text-gray-500", auxiliaryLabelVariants({
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
_s(Label, "uwMVuMNlgvSVjQ0Ve3nE6sN7aXE=");
_c1 = Label;
const descriptionVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["cva"])("select-none text-xs leading-4", {
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
const FieldSetDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].forwardRef((param, ref)=>{
    let { isDisabled, variant = "default", "data-test-id": dataTestId, children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])(descriptionVariants({
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
_c2 = FieldSetDescription;
FieldSetDescription.displayName = "FieldSetDescription";
const promptVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["cva"])("flex items-center gap-1 text-xs", {
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
const Prompt = (param)=>{
    let { state = "help", icon, showIcon = true, isDisabled, children, "data-test-id": dataTestId } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])(promptVariants({
            state,
            isDisabled
        })),
        "data-test-id": dataTestId,
        children: [
            showIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
                name: icon || (state === "help" ? "info" : "circle-x"),
                size: "xs"
            }, void 0, false, {
                fileName: "[project]/src/components/FieldSet.tsx",
                lineNumber: 323,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_c3 = Prompt;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "FieldSet");
__turbopack_context__.k.register(_c1, "Label");
__turbopack_context__.k.register(_c2, "FieldSetDescription");
__turbopack_context__.k.register(_c3, "Prompt");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/FileUpload.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "FileUpload": ()=>FileUpload
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file.js [client] (ecmascript) <export default as File>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cn.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FieldSet$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FieldSet.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Button.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const containerVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["cva"])([
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
const dropZoneVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["cva"])([
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
const fileListVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["cva"])("flex flex-col gap-2", {
    variants: {
        variant: {
            primary: "mt-4",
            inline: "mt-3"
        }
    }
});
const fileItemVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["cva"])([
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
    if (file.type.startsWith("image/")) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/src/components/FileUpload.tsx",
        lineNumber: 168,
        columnNumber: 46
    }, ("TURBOPACK compile-time value", void 0));
    if (file.type.startsWith("video/")) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/src/components/FileUpload.tsx",
        lineNumber: 169,
        columnNumber: 46
    }, ("TURBOPACK compile-time value", void 0));
    if (file.type.startsWith("audio/")) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/src/components/FileUpload.tsx",
        lineNumber: 170,
        columnNumber: 46
    }, ("TURBOPACK compile-time value", void 0));
    if (file.type.includes("pdf")) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/src/components/FileUpload.tsx",
        lineNumber: 171,
        columnNumber: 41
    }, ("TURBOPACK compile-time value", void 0));
    if (file.type.includes("text")) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/src/components/FileUpload.tsx",
        lineNumber: 172,
        columnNumber: 42
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
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
        return "File type not allowed. Accepted types: ".concat(accept);
    }
    // Check file size
    if (maxSize && file.size > maxSize) {
        return "File too large. Maximum size: ".concat(formatFileSize(maxSize));
    }
    if (minSize && file.size < minSize) {
        return "File too small. Minimum size: ".concat(formatFileSize(minSize));
    }
    return null;
};
const FileUpload = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s((param, ref)=>{
    let { value, defaultValue = [], onChange, onDrop, accept, maxFiles = 10, maxSize, minSize, size = "md", variant = "primary", multiple = true, disabled = false, label, description, uploadText = "Choose file", dragText = "or drag and drop", isUploading = false, error, help, uploadIcon, className, "data-test-id": dataTestId, ...props } = param;
    _s();
    const [internalFiles, setInternalFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(defaultValue.map({
        "FileUpload.useState": (file)=>({
                ...file,
                id: Math.random().toString(36)
            })
    }["FileUpload.useState"]));
    const [isDragActive, setIsDragActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dragCounter, setDragCounter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const generatedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useId"])();
    const uniqueId = props.id || generatedId;
    const files = value !== undefined ? value : internalFiles;
    const handleFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FileUpload.useCallback[handleFiles]": (newFiles)=>{
            const validatedFiles = [];
            const errors = [];
            newFiles.forEach({
                "FileUpload.useCallback[handleFiles]": (file)=>{
                    const error = validateFile(file, accept, maxSize, minSize);
                    if (error) {
                        errors.push("".concat(file.name, ": ").concat(error));
                    } else {
                        const uploadedFile = {
                            id: Math.random().toString(36),
                            file,
                            status: "idle"
                        };
                        // Create preview for images
                        if (file.type.startsWith("image/")) {
                            const reader = new FileReader();
                            reader.onload = ({
                                "FileUpload.useCallback[handleFiles]": (e)=>{
                                    var _e_target;
                                    uploadedFile.preview = (_e_target = e.target) === null || _e_target === void 0 ? void 0 : _e_target.result;
                                    setInternalFiles({
                                        "FileUpload.useCallback[handleFiles]": (prev)=>[
                                                ...prev
                                            ]
                                    }["FileUpload.useCallback[handleFiles]"]);
                                    onChange === null || onChange === void 0 ? void 0 : onChange(files);
                                }
                            })["FileUpload.useCallback[handleFiles]"];
                            reader.readAsDataURL(file);
                        }
                        validatedFiles.push(uploadedFile);
                    }
                }
            }["FileUpload.useCallback[handleFiles]"]);
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
                onChange === null || onChange === void 0 ? void 0 : onChange(updatedFiles);
                onDrop === null || onDrop === void 0 ? void 0 : onDrop(validatedFiles.map({
                    "FileUpload.useCallback[handleFiles]": (f)=>f.file
                }["FileUpload.useCallback[handleFiles]"]));
            }
        }
    }["FileUpload.useCallback[handleFiles]"], [
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
    const removeFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FileUpload.useCallback[removeFile]": (fileId)=>{
            const updatedFiles = files.filter({
                "FileUpload.useCallback[removeFile].updatedFiles": (f)=>f.id !== fileId
            }["FileUpload.useCallback[removeFile].updatedFiles"]);
            if (value === undefined) {
                setInternalFiles(updatedFiles);
            }
            onChange === null || onChange === void 0 ? void 0 : onChange(updatedFiles);
        }
    }["FileUpload.useCallback[removeFile]"], [
        files,
        onChange,
        value
    ]);
    const handleDragEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FileUpload.useCallback[handleDragEnter]": (e)=>{
            e.preventDefault();
            e.stopPropagation();
            setDragCounter({
                "FileUpload.useCallback[handleDragEnter]": (prev)=>prev + 1
            }["FileUpload.useCallback[handleDragEnter]"]);
            if (dragCounter === 0) {
                setIsDragActive(true);
            }
        }
    }["FileUpload.useCallback[handleDragEnter]"], [
        dragCounter
    ]);
    const handleDragLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FileUpload.useCallback[handleDragLeave]": (e)=>{
            e.preventDefault();
            e.stopPropagation();
            setDragCounter({
                "FileUpload.useCallback[handleDragLeave]": (prev)=>prev - 1
            }["FileUpload.useCallback[handleDragLeave]"]);
            if (dragCounter <= 1) {
                setIsDragActive(false);
            }
        }
    }["FileUpload.useCallback[handleDragLeave]"], [
        dragCounter
    ]);
    const handleDragOver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FileUpload.useCallback[handleDragOver]": (e)=>{
            e.preventDefault();
            e.stopPropagation();
        }
    }["FileUpload.useCallback[handleDragOver]"], []);
    const handleDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FileUpload.useCallback[handleDrop]": (e)=>{
            e.preventDefault();
            e.stopPropagation();
            setIsDragActive(false);
            setDragCounter(0);
            if (disabled) return;
            const droppedFiles = Array.from(e.dataTransfer.files);
            handleFiles(droppedFiles);
        }
    }["FileUpload.useCallback[handleDrop]"], [
        disabled,
        handleFiles
    ]);
    const handleFileInputChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FileUpload.useCallback[handleFileInputChange]": (e)=>{
            if (!e.target.files) return;
            const selectedFiles = Array.from(e.target.files);
            handleFiles(selectedFiles);
            // Reset file input
            e.target.value = "";
        }
    }["FileUpload.useCallback[handleFileInputChange]"], [
        handleFiles
    ]);
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FileUpload.useCallback[handleClick]": ()=>{
            if (!disabled) {
                var _fileInputRef_current;
                (_fileInputRef_current = fileInputRef.current) === null || _fileInputRef_current === void 0 ? void 0 : _fileInputRef_current.click();
            }
        }
    }["FileUpload.useCallback[handleClick]"], [
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
    const defaultUploadIcon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
        className: "w-6 h-6"
    }, void 0, false, {
        fileName: "[project]/src/components/FileUpload.tsx",
        lineNumber: 381,
        columnNumber: 31
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FieldSet$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["FieldSet"], {
        label: label,
        description: description,
        state: error ? "error" : "default",
        promptText: error || help,
        isDisabled: disabled,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])(containerVariants({
            variant,
            disabled
        }), className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])(dropZoneVariants({
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
                "aria-label": "Upload files".concat(accept ? " (".concat(accept, ")") : ""),
                "data-test-id": dataTestId,
                onKeyDown: (e)=>{
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleClick();
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        mode: "wait",
                        children: files.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors",
                                    children: uploadIcon || defaultUploadIcon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FileUpload.tsx",
                                    lineNumber: 442,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-gray-700",
                                            children: getUploadText()
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FileUpload.tsx",
                                            lineNumber: 446,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        getDragText() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 rounded-full bg-blue-100",
                                    children: uploadIcon || defaultUploadIcon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FileUpload.tsx",
                                    lineNumber: 462,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    isDragActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])(fileListVariants({
                    variant
                })),
                children: files.map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])(fileItemVariants({
                            status: file.status
                        })),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 flex-1 min-w-0",
                                children: [
                                    file.preview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: file.preview,
                                        alt: file.file.name,
                                        className: "w-8 h-8 object-cover rounded border border-gray-200"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FileUpload.tsx",
                                        lineNumber: 506,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 bg-gray-100 rounded flex items-center justify-center",
                                        children: getFileIcon(file.file)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FileUpload.tsx",
                                        lineNumber: 512,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-gray-900 truncate",
                                                children: file.file.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FileUpload.tsx",
                                                lineNumber: 518,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                    file.status === "uploading" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-4 h-4 text-blue-500 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FileUpload.tsx",
                                        lineNumber: 527,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    file.status === "success" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        className: "w-4 h-4 text-green-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FileUpload.tsx",
                                        lineNumber: 531,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    file.status === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "xs",
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    removeFile(file.id);
                                },
                                "aria-label": "Remove ".concat(file.file.name),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
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
}, "t3cbeWmAWdgEFrLN/q9SvtbgiM0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useId"]
    ];
})), "t3cbeWmAWdgEFrLN/q9SvtbgiM0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c1 = FileUpload;
FileUpload.displayName = "FileUpload";
var _c, _c1;
__turbopack_context__.k.register(_c, "FileUpload$forwardRef");
__turbopack_context__.k.register(_c1, "FileUpload");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/internal/font/google/inter_c269c61a.module.css [client] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "inter_c269c61a-module__abudsG__className",
  "variable": "inter_c269c61a-module__abudsG__variable",
});
}),
"[next]/internal/font/google/inter_c269c61a.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_c269c61a$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_c269c61a.module.css [client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_c269c61a$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Inter', 'Inter Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_c269c61a$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_c269c61a$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/src/pages/index.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>Home
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Button.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FileUpload$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FileUpload.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_c269c61a$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_c269c61a.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file.js [client] (ecmascript) <export default as File>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [client] (ecmascript) <export default as Image>");
;
;
;
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "".concat(__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_c269c61a$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].className, " font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex flex-col gap-8 max-w-4xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-gray-900 mb-4",
                            children: "Navattic Take Home Task"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/index.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold text-gray-900",
                            children: "New File Upload Component"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/index.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-gray-800",
                                    children: "Primary Upload (Multiple Files)"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/index.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FileUpload$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["FileUpload"], {
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
                                    uploadIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-gray-800",
                                    children: "Inline Upload (Single File)"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/index.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FileUpload$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["FileUpload"], {
                                            variant: "inline",
                                            multiple: false,
                                            accept: "image/*",
                                            label: "Profile Picture",
                                            description: "Upload your profile picture",
                                            uploadText: "Choose image",
                                            help: "JPG, PNG, or GIF format",
                                            uploadIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FileUpload$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["FileUpload"], {
                                            variant: "inline",
                                            multiple: false,
                                            accept: ".pdf,.doc,.docx",
                                            label: "Resume",
                                            description: "Upload your resume",
                                            uploadText: "Choose file",
                                            help: "PDF or Word document",
                                            uploadIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold text-gray-900",
                            children: "Demo Pages"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/index.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/file-upload-demo",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
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
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/src/pages/index.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/src/pages/index\" }": ((__turbopack_context__) => {
"use strict";

var { m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__df88fc37._.js.map