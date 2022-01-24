/*
// WASM Part
const go = new Go(); // Defined in wasm_exec.js
const WASM_URL = '../../common/test1.wasm';

var wasm;

if ('instantiateStreaming' in WebAssembly) {
	WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(function (obj) {
		wasm = obj.instance;
		go.run(wasm);
	})
} else {
	fetch(WASM_URL).then(resp =>
		resp.arrayBuffer()
	).then(bytes =>
		WebAssembly.instantiate(bytes, go.importObject).then(function (obj) {
			wasm = obj.instance;
			go.run(wasm);
		})
	)
}
*/
/**
 * export { BaseTransition, Comment, EffectScope, Fragment, KeepAlive, ReactiveEffect, Static, Suspense, Teleport, Text, Transition, TransitionGroup, VueElement, callWithAsyncErrorHandling, callWithErrorHandling, camelize, capitalize, cloneVNode, compatUtils, compileToFunction as compile, computed, createApp, createBlock, createCommentVNode, createElementBlock, createBaseVNode as createElementVNode, createHydrationRenderer, createRenderer, createSSRApp, createSlots, createStaticVNode, createTextVNode, createVNode, customRef, defineAsyncComponent, defineComponent, defineCustomElement, defineEmits, defineExpose, defineProps, defineSSRCustomElement, devtools, effect, effectScope, getCurrentInstance, getCurrentScope, getTransitionRawChildren, guardReactiveProps, h, handleError, hydrate, initCustomFormatter, inject, isMemoSame, isProxy, isReactive, isReadonly, isRef, isRuntimeOnly, isVNode, markRaw, mergeDefaults, mergeProps, nextTick, normalizeClass, normalizeProps, normalizeStyle, onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onRenderTracked, onRenderTriggered, onScopeDispose, onServerPrefetch, onUnmounted, onUpdated, openBlock, popScopeId, provide, proxyRefs, pushScopeId, queuePostFlushCb, reactive, readonly, ref, registerRuntimeCompiler, render, renderList, renderSlot, resolveComponent, resolveDirective, resolveDynamicComponent, resolveFilter, resolveTransitionHooks, setBlockTracking, setDevtoolsHook, setTransitionHooks, shallowReactive, shallowReadonly, shallowRef, ssrContextKey, ssrUtils, stop, toDisplayString, toHandlerKey, toHandlers, toRaw, toRef, toRefs, transformVNodeArgs, triggerRef, unref, useAttrs, useCssModule, useCssVars, useSSRContext, useSlots, useTransitionState, vModelCheckbox, vModelDynamic, vModelRadio, vModelSelect, vModelText, vShow, version, warn$1 as warn, watch, watchEffect, watchPostEffect, watchSyncEffect, withAsyncContext, withCtx, withDefaults, withDirectives, withKeys, withMemo, withModifiers, withScopeId };
 */

import { createApp } from "../../common/experimental/vue.esm-browser.js"
export default function load() {
	window.addEventListener("load", () => {
		const vm = createApp({
			data() {
				return {
					title: "123"
				}
			}
		})
		vm.mount("#app")
	})
}

load()