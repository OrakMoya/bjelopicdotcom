import ne from "deepmerge";
import u from "nprogress";
import cloneDeep from "lodash.clonedeep";
import isEqual from "lodash.isequal";
import "dequal";
import { nanoid } from "nanoid/non-secure";
import { CalendarDateTime, CalendarDate, ZonedDateTime, parseZonedDateTime, parseDateTime, parseDate, toCalendar, getLocalTimeZone, getDayOfWeek, DateFormatter, startOfMonth, endOfMonth, isSameMonth, isSameDay, isToday } from "@internationalized/date";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import AutoScroll from "embla-carousel-auto-scroll";
import "chart.js/auto";
import _ from "axios";
import * as O from "qs";
import { createFocusTrap as createFocusTrap$1 } from "focus-trap";
import { flip, offset, shift, arrow, size, autoUpdate, computePosition } from "@floating-ui/dom";
import { createServer } from "http";
import * as s from "process";
function noop$1() {
}
const identity = (x2) => x2;
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b2) {
  return a != a ? b2 == b2 : a !== b2 || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store2, ...callbacks) {
  if (store2 == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop$1;
  }
  const unsub = store2.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store2) {
  let value;
  subscribe(store2, (_2) => value = _2)();
  return value;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k2 in props) if (!keys.has(k2) && k2[0] !== "$") rest[k2] = props[k2];
  return rest;
}
function set_store_value(store2, ret, value) {
  store2.set(value);
  return ret;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type,
        detail,
        { cancelable }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
function hasContext(key) {
  return get_current_component().$$.context.has(key);
}
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick$1() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function ensure_array_like(array_like_or_iterator) {
  return (array_like_or_iterator == null ? void 0 : array_like_or_iterator.length) !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
const _boolean_attributes = (
  /** @type {const} */
  [
    "allowfullscreen",
    "allowpaymentrequest",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "hidden",
    "inert",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected"
  ]
);
const boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name2) {
  return void_element_names.test(name2) || name2.toLowerCase() === "!doctype";
}
const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(
          merge_ssr_styles(attributes.style, styles_to_add)
        );
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name2) => {
    if (invalid_attribute_name_character.test(name2)) return;
    const value = attributes[name2];
    if (value === true) str += " " + name2;
    else if (boolean_attributes.has(name2.toLowerCase())) {
      if (value) str += " " + name2;
    } else if (value != null) {
      str += ` ${name2}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name2 = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name2) continue;
    style_object[name2] = value;
  }
  for (const name2 in style_directive) {
    const value = style_directive[name2];
    if (value) {
      style_object[name2] = value;
    } else {
      delete style_object[name2];
    }
  }
  return style_object;
}
const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped = "";
  let last2 = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last2, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last2 = i + 1;
  }
  return escaped + str.substring(last2);
}
function escape_attribute_value(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key in obj) {
    result[key] = escape_attribute_value(obj[key]);
  }
  return result;
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name2) {
  if (!component || !component.$$render) {
    if (name2 === "svelte:component") name2 += " this={...}";
    throw new Error(
      `<${name2}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name2}>.`
    );
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name2, value, boolean) {
  if (value == null || boolean) return "";
  const assignment = `="${escape(value, true)}"`;
  return ` ${name2}${assignment}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key) => style_object[key] != null && style_object[key] !== "").map((key) => `${key}: ${escape_attribute_value(style_object[key])};`).join(" ");
}
function add_styles(style_object) {
  const styles = style_object_to_string(style_object);
  return styles ? ` style="${styles}"` : "";
}
const TheBjeloPIC = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<span class="${"font-bjelopic font-normal text-white " + escape($$restProps.class, true)}">Bjelo<span class="text-bjelopic-red-1 font-bold font-sans" data-svelte-h="svelte-11bhgsh">PIC</span></span>`;
});
const TheBjeloPICLogo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<div${add_attribute("class", $$restProps.class, 0)}><img src="/bjelopic_logo.png" alt="bjelopic"></div>`;
});
function L(t, e) {
  let i;
  return function(...n) {
    clearTimeout(i), i = setTimeout(() => t.apply(this, n), e);
  };
}
function m(t, e) {
  return document.dispatchEvent(new CustomEvent(`inertia:${t}`, e));
}
var M = (t) => m("before", { cancelable: true, detail: { visit: t } }), H = (t) => m("error", { detail: { errors: t } }), $ = (t) => m("exception", { cancelable: true, detail: { exception: t } }), N = (t) => m("finish", { detail: { visit: t } }), q = (t) => m("invalid", { cancelable: true, detail: { response: t } }), x = (t) => m("navigate", { detail: { page: t } }), W = (t) => m("progress", { detail: { progress: t } }), X$1 = (t) => m("start", { detail: { visit: t } }), K = (t) => m("success", { detail: { page: t } });
function I(t) {
  return t instanceof File || t instanceof Blob || t instanceof FileList && t.length > 0 || t instanceof FormData && Array.from(t.values()).some((e) => I(e)) || typeof t == "object" && t !== null && Object.values(t).some((e) => I(e));
}
function A(t, e = new FormData(), i = null) {
  t = t || {};
  for (let n in t) Object.prototype.hasOwnProperty.call(t, n) && z(e, J(i, n), t[n]);
  return e;
}
function J(t, e) {
  return t ? t + "[" + e + "]" : e;
}
function z(t, e, i) {
  if (Array.isArray(i)) return Array.from(i.keys()).forEach((n) => z(t, J(e, n.toString()), i[n]));
  if (i instanceof Date) return t.append(e, i.toISOString());
  if (i instanceof File) return t.append(e, i, i.name);
  if (i instanceof Blob) return t.append(e, i);
  if (typeof i == "boolean") return t.append(e, i ? "1" : "0");
  if (typeof i == "string") return t.append(e, i);
  if (typeof i == "number") return t.append(e, `${i}`);
  if (i == null) return t.append(e, "");
  A(i, t, e);
}
var B = { modal: null, listener: null, show(t) {
  typeof t == "object" && (t = `All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.<hr>${JSON.stringify(t)}`);
  let e = document.createElement("html");
  e.innerHTML = t, e.querySelectorAll("a").forEach((n) => n.setAttribute("target", "_top")), this.modal = document.createElement("div"), this.modal.style.position = "fixed", this.modal.style.width = "100vw", this.modal.style.height = "100vh", this.modal.style.padding = "50px", this.modal.style.boxSizing = "border-box", this.modal.style.backgroundColor = "rgba(0, 0, 0, .6)", this.modal.style.zIndex = 2e5, this.modal.addEventListener("click", () => this.hide());
  let i = document.createElement("iframe");
  if (i.style.backgroundColor = "white", i.style.borderRadius = "5px", i.style.width = "100%", i.style.height = "100%", this.modal.appendChild(i), document.body.prepend(this.modal), document.body.style.overflow = "hidden", !i.contentWindow) throw new Error("iframe not yet ready.");
  i.contentWindow.document.open(), i.contentWindow.document.write(e.outerHTML), i.contentWindow.document.close(), this.listener = this.hideOnEscape.bind(this), document.addEventListener("keydown", this.listener);
}, hide() {
  this.modal.outerHTML = "", this.modal = null, document.body.style.overflow = "visible", document.removeEventListener("keydown", this.listener);
}, hideOnEscape(t) {
  t.keyCode === 27 && this.hide();
} };
function b(t) {
  return new URL(t.toString(), window.location.toString());
}
function k(t, e, i, n = "brackets") {
  let s2 = /^https?:\/\//.test(e.toString()), l = s2 || e.toString().startsWith("/"), h2 = !l && !e.toString().startsWith("#") && !e.toString().startsWith("?"), g2 = e.toString().includes("?") || t === "get" && Object.keys(i).length, f = e.toString().includes("#"), c = new URL(e.toString(), "http://localhost");
  return t === "get" && Object.keys(i).length && (c.search = O.stringify(ne(O.parse(c.search, { ignoreQueryPrefix: true }), i), { encodeValuesOnly: true, arrayFormat: n }), i = {}), [[s2 ? `${c.protocol}//${c.host}` : "", l ? c.pathname : "", h2 ? c.pathname.substring(1) : "", g2 ? c.search : "", f ? c.hash : ""].join(""), i];
}
function w(t) {
  return t = new URL(t.href), t.hash = "", t;
}
var Q = typeof window > "u", C = class {
  constructor() {
    this.visitId = null;
  }
  init({ initialPage: e, resolveComponent: i, swapComponent: n }) {
    this.page = e, this.resolveComponent = i, this.swapComponent = n, this.setNavigationType(), this.clearRememberedStateOnReload(), this.isBackForwardVisit() ? this.handleBackForwardVisit(this.page) : this.isLocationVisit() ? this.handleLocationVisit(this.page) : this.handleInitialPageVisit(this.page), this.setupEventListeners();
  }
  setNavigationType() {
    this.navigationType = window.performance && window.performance.getEntriesByType("navigation").length > 0 ? window.performance.getEntriesByType("navigation")[0].type : "navigate";
  }
  clearRememberedStateOnReload() {
    var _a;
    this.navigationType === "reload" && ((_a = window.history.state) == null ? void 0 : _a.rememberedState) && delete window.history.state.rememberedState;
  }
  handleInitialPageVisit(e) {
    this.page.url += window.location.hash, this.setPage(e, { preserveState: true }).then(() => x(e));
  }
  setupEventListeners() {
    window.addEventListener("popstate", this.handlePopstateEvent.bind(this)), document.addEventListener("scroll", L(this.handleScrollEvent.bind(this), 100), true);
  }
  scrollRegions() {
    return document.querySelectorAll("[scroll-region]");
  }
  handleScrollEvent(e) {
    typeof e.target.hasAttribute == "function" && e.target.hasAttribute("scroll-region") && this.saveScrollPositions();
  }
  saveScrollPositions() {
    this.replaceState({ ...this.page, scrollRegions: Array.from(this.scrollRegions()).map((e) => ({ top: e.scrollTop, left: e.scrollLeft })) });
  }
  resetScrollPositions() {
    window.scrollTo(0, 0), this.scrollRegions().forEach((e) => {
      typeof e.scrollTo == "function" ? e.scrollTo(0, 0) : (e.scrollTop = 0, e.scrollLeft = 0);
    }), this.saveScrollPositions(), window.location.hash && setTimeout(() => {
      var _a;
      return (_a = document.getElementById(window.location.hash.slice(1))) == null ? void 0 : _a.scrollIntoView();
    });
  }
  restoreScrollPositions() {
    this.page.scrollRegions && this.scrollRegions().forEach((e, i) => {
      let n = this.page.scrollRegions[i];
      if (n) typeof e.scrollTo == "function" ? e.scrollTo(n.left, n.top) : (e.scrollTop = n.top, e.scrollLeft = n.left);
      else return;
    });
  }
  isBackForwardVisit() {
    return window.history.state && this.navigationType === "back_forward";
  }
  handleBackForwardVisit(e) {
    window.history.state.version = e.version, this.setPage(window.history.state, { preserveScroll: true, preserveState: true }).then(() => {
      this.restoreScrollPositions(), x(e);
    });
  }
  locationVisit(e, i) {
    try {
      let n = { preserveScroll: i };
      window.sessionStorage.setItem("inertiaLocationVisit", JSON.stringify(n)), window.location.href = e.href, w(window.location).href === w(e).href && window.location.reload();
    } catch {
      return false;
    }
  }
  isLocationVisit() {
    try {
      return window.sessionStorage.getItem("inertiaLocationVisit") !== null;
    } catch {
      return false;
    }
  }
  handleLocationVisit(e) {
    var _a, _b;
    let i = JSON.parse(window.sessionStorage.getItem("inertiaLocationVisit") || "");
    window.sessionStorage.removeItem("inertiaLocationVisit"), e.url += window.location.hash, e.rememberedState = ((_a = window.history.state) == null ? void 0 : _a.rememberedState) ?? {}, e.scrollRegions = ((_b = window.history.state) == null ? void 0 : _b.scrollRegions) ?? [], this.setPage(e, { preserveScroll: i.preserveScroll, preserveState: true }).then(() => {
      i.preserveScroll && this.restoreScrollPositions(), x(e);
    });
  }
  isLocationVisitResponse(e) {
    return !!(e && e.status === 409 && e.headers["x-inertia-location"]);
  }
  isInertiaResponse(e) {
    return !!(e == null ? void 0 : e.headers["x-inertia"]);
  }
  createVisitId() {
    return this.visitId = {}, this.visitId;
  }
  cancelVisit(e, { cancelled: i = false, interrupted: n = false }) {
    e && !e.completed && !e.cancelled && !e.interrupted && (e.cancelToken.abort(), e.onCancel(), e.completed = false, e.cancelled = i, e.interrupted = n, N(e), e.onFinish(e));
  }
  finishVisit(e) {
    !e.cancelled && !e.interrupted && (e.completed = true, e.cancelled = false, e.interrupted = false, N(e), e.onFinish(e));
  }
  resolvePreserveOption(e, i) {
    return typeof e == "function" ? e(i) : e === "errors" ? Object.keys(i.props.errors || {}).length > 0 : e;
  }
  cancel() {
    this.activeVisit && this.cancelVisit(this.activeVisit, { cancelled: true });
  }
  visit(e, { method: i = "get", data: n = {}, replace: s2 = false, preserveScroll: l = false, preserveState: h2 = false, only: g2 = [], except: f = [], headers: c = {}, errorBag: o = "", forceFormData: v = false, onCancelToken: T = () => {
  }, onBefore: d2 = () => {
  }, onStart: p = () => {
  }, onProgress: P = () => {
  }, onFinish: y = () => {
  }, onCancel: ie = () => {
  }, onSuccess: D = () => {
  }, onError: U = () => {
  }, queryStringArrayFormat: F = "brackets" } = {}) {
    let S = typeof e == "string" ? b(e) : e;
    if ((I(n) || v) && !(n instanceof FormData) && (n = A(n)), !(n instanceof FormData)) {
      let [r, a] = k(i, S, n, F);
      S = b(r), n = a;
    }
    let R = { url: S, method: i, data: n, replace: s2, preserveScroll: l, preserveState: h2, only: g2, except: f, headers: c, errorBag: o, forceFormData: v, queryStringArrayFormat: F, cancelled: false, completed: false, interrupted: false };
    if (d2(R) === false || !M(R)) return;
    this.activeVisit && this.cancelVisit(this.activeVisit, { interrupted: true }), this.saveScrollPositions();
    let G = this.createVisitId();
    this.activeVisit = { ...R, onCancelToken: T, onBefore: d2, onStart: p, onProgress: P, onFinish: y, onCancel: ie, onSuccess: D, onError: U, queryStringArrayFormat: F, cancelToken: new AbortController() }, T({ cancel: () => {
      this.activeVisit && this.cancelVisit(this.activeVisit, { cancelled: true });
    } }), X$1(R), p(R);
    let j = !!(g2.length || f.length);
    _({ method: i, url: w(S).href, data: i === "get" ? {} : n, params: i === "get" ? n : {}, signal: this.activeVisit.cancelToken.signal, headers: { ...c, Accept: "text/html, application/xhtml+xml", "X-Requested-With": "XMLHttpRequest", "X-Inertia": true, ...j ? { "X-Inertia-Partial-Component": this.page.component } : {}, ...g2.length ? { "X-Inertia-Partial-Data": g2.join(",") } : {}, ...f.length ? { "X-Inertia-Partial-Except": f.join(",") } : {}, ...o && o.length ? { "X-Inertia-Error-Bag": o } : {}, ...this.page.version ? { "X-Inertia-Version": this.page.version } : {} }, onUploadProgress: (r) => {
      n instanceof FormData && (r.percentage = r.progress ? Math.round(r.progress * 100) : 0, W(r), P(r));
    } }).then((r) => {
      var _a;
      if (!this.isInertiaResponse(r)) return Promise.reject({ response: r });
      let a = r.data;
      j && a.component === this.page.component && (a.props = { ...this.page.props, ...a.props }), l = this.resolvePreserveOption(l, a), h2 = this.resolvePreserveOption(h2, a), h2 && ((_a = window.history.state) == null ? void 0 : _a.rememberedState) && a.component === this.page.component && (a.rememberedState = window.history.state.rememberedState);
      let E = S, V = b(a.url);
      return E.hash && !V.hash && w(E).href === V.href && (V.hash = E.hash, a.url = V.href), this.setPage(a, { visitId: G, replace: s2, preserveScroll: l, preserveState: h2 });
    }).then(() => {
      let r = this.page.props.errors || {};
      if (Object.keys(r).length > 0) {
        let a = o ? r[o] ? r[o] : {} : r;
        return H(a), U(a);
      }
      return K(this.page), D(this.page);
    }).catch((r) => {
      if (this.isInertiaResponse(r.response)) return this.setPage(r.response.data, { visitId: G });
      if (this.isLocationVisitResponse(r.response)) {
        let a = b(r.response.headers["x-inertia-location"]), E = S;
        E.hash && !a.hash && w(E).href === a.href && (a.hash = E.hash), this.locationVisit(a, l === true);
      } else if (r.response) q(r.response) && B.show(r.response.data);
      else return Promise.reject(r);
    }).then(() => {
      this.activeVisit && this.finishVisit(this.activeVisit);
    }).catch((r) => {
      if (!_.isCancel(r)) {
        let a = $(r);
        if (this.activeVisit && this.finishVisit(this.activeVisit), a) return Promise.reject(r);
      }
    });
  }
  setPage(e, { visitId: i = this.createVisitId(), replace: n = false, preserveScroll: s2 = false, preserveState: l = false } = {}) {
    return Promise.resolve(this.resolveComponent(e.component)).then((h2) => {
      i === this.visitId && (e.scrollRegions = e.scrollRegions || [], e.rememberedState = e.rememberedState || {}, n = n || b(e.url).href === window.location.href, n ? this.replaceState(e) : this.pushState(e), this.swapComponent({ component: h2, page: e, preserveState: l }).then(() => {
        s2 || this.resetScrollPositions(), n || x(e);
      }));
    });
  }
  pushState(e) {
    this.page = e, window.history.pushState(e, "", e.url);
  }
  replaceState(e) {
    this.page = e, window.history.replaceState(e, "", e.url);
  }
  handlePopstateEvent(e) {
    if (e.state !== null) {
      let i = e.state, n = this.createVisitId();
      Promise.resolve(this.resolveComponent(i.component)).then((s2) => {
        n === this.visitId && (this.page = i, this.swapComponent({ component: s2, page: i, preserveState: false }).then(() => {
          this.restoreScrollPositions(), x(i);
        }));
      });
    } else {
      let i = b(this.page.url);
      i.hash = window.location.hash, this.replaceState({ ...this.page, url: i.href }), this.resetScrollPositions();
    }
  }
  get(e, i = {}, n = {}) {
    return this.visit(e, { ...n, method: "get", data: i });
  }
  reload(e = {}) {
    return this.visit(window.location.href, { ...e, preserveScroll: true, preserveState: true });
  }
  replace(e, i = {}) {
    return console.warn(`Inertia.replace() has been deprecated and will be removed in a future release. Please use Inertia.${i.method ?? "get"}() instead.`), this.visit(e, { preserveState: true, ...i, replace: true });
  }
  post(e, i = {}, n = {}) {
    return this.visit(e, { preserveState: true, ...n, method: "post", data: i });
  }
  put(e, i = {}, n = {}) {
    return this.visit(e, { preserveState: true, ...n, method: "put", data: i });
  }
  patch(e, i = {}, n = {}) {
    return this.visit(e, { preserveState: true, ...n, method: "patch", data: i });
  }
  delete(e, i = {}) {
    return this.visit(e, { preserveState: true, ...i, method: "delete" });
  }
  remember(e, i = "default") {
    var _a;
    Q || this.replaceState({ ...this.page, rememberedState: { ...(_a = this.page) == null ? void 0 : _a.rememberedState, [i]: e } });
  }
  restore(e = "default") {
    var _a, _b;
    if (!Q) return (_b = (_a = window.history.state) == null ? void 0 : _a.rememberedState) == null ? void 0 : _b[e];
  }
  on(e, i) {
    let n = (s2) => {
      let l = i(s2);
      s2.cancelable && !s2.defaultPrevented && l === false && s2.preventDefault();
    };
    return document.addEventListener(`inertia:${e}`, n), () => document.removeEventListener(`inertia:${e}`, n);
  }
};
var Z = null;
function oe(t) {
  document.addEventListener("inertia:start", se.bind(null, t)), document.addEventListener("inertia:progress", ae), document.addEventListener("inertia:finish", le);
}
function se(t) {
  Z = setTimeout(() => u.start(), t);
}
function ae(t) {
  var _a;
  u.isStarted() && ((_a = t.detail.progress) == null ? void 0 : _a.percentage) && u.set(Math.max(u.status, t.detail.progress.percentage / 100 * 0.9));
}
function le(t) {
  if (clearTimeout(Z), u.isStarted()) t.detail.visit.completed ? u.done() : t.detail.visit.interrupted ? u.set(0) : t.detail.visit.cancelled && (u.done(), u.remove());
  else return;
}
function ce(t) {
  let e = document.createElement("style");
  e.type = "text/css", e.textContent = `
    #nprogress {
      pointer-events: none;
    }

    #nprogress .bar {
      background: ${t};

      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;
    }

    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${t}, 0 0 5px ${t};
      opacity: 1.0;

      -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
              transform: rotate(3deg) translate(0px, -4px);
    }

    #nprogress .spinner {
      display: block;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px;
    }

    #nprogress .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;

      border: solid 2px transparent;
      border-top-color: ${t};
      border-left-color: ${t};
      border-radius: 50%;

      -webkit-animation: nprogress-spinner 400ms linear infinite;
              animation: nprogress-spinner 400ms linear infinite;
    }

    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
      position: absolute;
    }

    @-webkit-keyframes nprogress-spinner {
      0%   { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes nprogress-spinner {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `, document.head.appendChild(e);
}
function ee({ delay: t = 250, color: e = "#29d", includeCSS: i = true, showSpinner: n = false } = {}) {
  oe(t), u.configure({ showSpinner: n }), i && ce(e);
}
var Fe = new C();
function onMount() {
}
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "href",
    "as",
    "data",
    "method",
    "replace",
    "preserveScroll",
    "preserveState",
    "only",
    "except",
    "headers",
    "queryStringArrayFormat"
  ]);
  let { href } = $$props;
  let { as = "a" } = $$props;
  let { data = {} } = $$props;
  let { method = "get" } = $$props;
  let { replace = false } = $$props;
  let { preserveScroll = false } = $$props;
  let { preserveState = null } = $$props;
  let { only = [] } = $$props;
  let { except = [] } = $$props;
  let { headers = {} } = $$props;
  let { queryStringArrayFormat = "brackets" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0) $$bindings.as(as);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.method === void 0 && $$bindings.method && method !== void 0) $$bindings.method(method);
  if ($$props.replace === void 0 && $$bindings.replace && replace !== void 0) $$bindings.replace(replace);
  if ($$props.preserveScroll === void 0 && $$bindings.preserveScroll && preserveScroll !== void 0) $$bindings.preserveScroll(preserveScroll);
  if ($$props.preserveState === void 0 && $$bindings.preserveState && preserveState !== void 0) $$bindings.preserveState(preserveState);
  if ($$props.only === void 0 && $$bindings.only && only !== void 0) $$bindings.only(only);
  if ($$props.except === void 0 && $$bindings.except && except !== void 0) $$bindings.except(except);
  if ($$props.headers === void 0 && $$bindings.headers && headers !== void 0) $$bindings.headers(headers);
  if ($$props.queryStringArrayFormat === void 0 && $$bindings.queryStringArrayFormat && queryStringArrayFormat !== void 0) $$bindings.queryStringArrayFormat(queryStringArrayFormat);
  return ` ${((tag) => {
    return tag ? `<${as}${spread([escape_object(as === "a" ? { href } : {}), escape_object($$restProps)], {})}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(as)}`;
});
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop$1) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop$1) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update2) || noop$1;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set, update2) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop$1;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set, update2);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop$1;
      }
    };
    const unsubscribers = stores_array.map(
      (store2, i) => subscribe(
        store2,
        (value) => {
          values[i] = value;
          pending &= ~(1 << i);
          if (started) {
            sync();
          }
        },
        () => {
          pending |= 1 << i;
        }
      )
    );
    started = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
function readonly(store2) {
  return {
    subscribe: store2.subscribe.bind(store2)
  };
}
const store = writable({
  component: null,
  layout: [],
  page: {},
  key: null
});
const h = (component, props, children) => {
  return {
    component,
    ...props ? { props } : {},
    ...children ? { children } : {}
  };
};
const Render = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $store, $$unsubscribe_store;
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  let { component } = $$props;
  let { props = {} } = $$props;
  let { children = [] } = $$props;
  if ($$props.component === void 0 && $$bindings.component && component !== void 0) $$bindings.component(component);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.children === void 0 && $$bindings.children && children !== void 0) $$bindings.children(children);
  $$unsubscribe_store();
  return `${$store.component ? `${validate_component(component || missing_component, "svelte:component").$$render($$result, Object.assign({}, props), {}, {
    default: () => {
      return `${each(children, (child, index) => {
        return `${validate_component(Render, "svelte:self").$$render($$result, Object.assign({}, child), {}, {})}`;
      })}`;
    }
  })}` : ``}`;
});
const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let child;
  let layout;
  let components;
  let $store, $$unsubscribe_store;
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  child = $store.component && h($store.component.default, $store.page.props);
  layout = $store.component && $store.component.layout;
  components = layout ? Array.isArray(layout) ? layout.concat(child).reverse().reduce((child2, layout2) => h(layout2, $store.page.props, [child2])) : h(layout, $store.page.props, [child]) : child;
  $$unsubscribe_store();
  return `${validate_component(Render, "Render").$$render($$result, Object.assign({}, components), {}, {})}`;
});
const SSR = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id, initialPage } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.initialPage === void 0 && $$bindings.initialPage && initialPage !== void 0) $$bindings.initialPage(initialPage);
  return `<div data-server-rendered="true"${add_attribute("id", id, 0)}${add_attribute("data-page", JSON.stringify(initialPage), 0)}>${validate_component(App, "App").$$render($$result, {}, {}, {})}</div>`;
});
async function createInertiaApp({ id = "app", resolve, setup, progress = {}, page: page2 }) {
  const isServer = typeof window === "undefined";
  const el = isServer ? null : document.getElementById(id);
  const initialPage = page2 || JSON.parse(el.dataset.page);
  const resolveComponent = (name2) => Promise.resolve(resolve(name2));
  await resolveComponent(initialPage.component).then((initialComponent) => {
    store.set({
      component: initialComponent,
      page: initialPage
    });
  });
  if (!isServer) {
    Fe.init({
      initialPage,
      resolveComponent,
      swapComponent: async ({ component, page: page3, preserveState }) => {
        store.update((current) => ({
          component,
          page: page3,
          key: preserveState ? current.key : Date.now()
        }));
      }
    });
    if (progress) {
      ee(progress);
    }
    return setup({
      el,
      App,
      props: {
        initialPage,
        resolveComponent
      }
    });
  }
  if (isServer) {
    const { html, head } = SSR.render({ id, initialPage });
    return {
      body: html,
      head: [head]
    };
  }
}
const page = derived(store, ($store) => $store.page);
function useForm(...args) {
  const rememberKey = typeof args[0] === "string" ? args[0] : null;
  const data = (typeof args[0] === "string" ? args[1] : args[0]) || {};
  const restored = rememberKey ? Fe.restore(rememberKey) : null;
  let defaults2 = cloneDeep(data);
  let cancelToken = null;
  let recentlySuccessfulTimeoutId = null;
  let transform = (data2) => data2;
  const store2 = writable({
    ...restored ? restored.data : data,
    isDirty: false,
    errors: restored ? restored.errors : {},
    hasErrors: false,
    progress: null,
    wasSuccessful: false,
    recentlySuccessful: false,
    processing: false,
    setStore(key, value) {
      store2.update((store3) => {
        return Object.assign(store3, typeof key === "string" ? { [key]: value } : key);
      });
    },
    data() {
      return Object.keys(data).reduce((carry, key) => {
        carry[key] = this[key];
        return carry;
      }, {});
    },
    transform(callback) {
      transform = callback;
      return this;
    },
    defaults(key, value) {
      if (typeof key === "undefined") {
        defaults2 = Object.assign(defaults2, cloneDeep(this.data()));
        return this;
      }
      defaults2 = Object.assign(defaults2, cloneDeep(value ? { [key]: value } : key));
      return this;
    },
    reset(...fields) {
      let clonedDefaults = cloneDeep(defaults2);
      if (fields.length === 0) {
        this.setStore(clonedDefaults);
      } else {
        this.setStore(
          Object.keys(clonedDefaults).filter((key) => fields.includes(key)).reduce((carry, key) => {
            carry[key] = clonedDefaults[key];
            return carry;
          }, {})
        );
      }
      return this;
    },
    setError(key, value) {
      this.setStore("errors", {
        ...this.errors,
        ...value ? { [key]: value } : key
      });
      return this;
    },
    clearErrors(...fields) {
      this.setStore(
        "errors",
        Object.keys(this.errors).reduce(
          (carry, field) => ({
            ...carry,
            ...fields.length > 0 && !fields.includes(field) ? { [field]: this.errors[field] } : {}
          }),
          {}
        )
      );
      return this;
    },
    submit(method, url, options = {}) {
      const data2 = transform(this.data());
      const _options = {
        ...options,
        onCancelToken: (token) => {
          cancelToken = token;
          if (options.onCancelToken) {
            return options.onCancelToken(token);
          }
        },
        onBefore: (visit) => {
          this.setStore("wasSuccessful", false);
          this.setStore("recentlySuccessful", false);
          clearTimeout(recentlySuccessfulTimeoutId);
          if (options.onBefore) {
            return options.onBefore(visit);
          }
        },
        onStart: (visit) => {
          this.setStore("processing", true);
          if (options.onStart) {
            return options.onStart(visit);
          }
        },
        onProgress: (event) => {
          this.setStore("progress", event);
          if (options.onProgress) {
            return options.onProgress(event);
          }
        },
        onSuccess: async (page2) => {
          this.setStore("processing", false);
          this.setStore("progress", null);
          this.clearErrors();
          this.setStore("wasSuccessful", true);
          this.setStore("recentlySuccessful", true);
          recentlySuccessfulTimeoutId = setTimeout(() => this.setStore("recentlySuccessful", false), 2e3);
          if (options.onSuccess) {
            return options.onSuccess(page2);
          }
        },
        onError: (errors) => {
          this.setStore("processing", false);
          this.setStore("progress", null);
          this.clearErrors().setError(errors);
          if (options.onError) {
            return options.onError(errors);
          }
        },
        onCancel: () => {
          this.setStore("processing", false);
          this.setStore("progress", null);
          if (options.onCancel) {
            return options.onCancel();
          }
        },
        onFinish: () => {
          this.setStore("processing", false);
          this.setStore("progress", null);
          cancelToken = null;
          if (options.onFinish) {
            return options.onFinish();
          }
        }
      };
      if (method === "delete") {
        Fe.delete(url, { ..._options, data: data2 });
      } else {
        Fe[method](url, data2, _options);
      }
    },
    get(url, options) {
      this.submit("get", url, options);
    },
    post(url, options) {
      this.submit("post", url, options);
    },
    put(url, options) {
      this.submit("put", url, options);
    },
    patch(url, options) {
      this.submit("patch", url, options);
    },
    delete(url, options) {
      this.submit("delete", url, options);
    },
    cancel() {
      if (cancelToken) {
        cancelToken.cancel();
      }
    }
  });
  store2.subscribe((form) => {
    if (form.isDirty === isEqual(form.data(), defaults2)) {
      form.setStore("isDirty", !form.isDirty);
    }
    const hasErrors = Object.keys(form.errors).length > 0;
    if (form.hasErrors !== hasErrors) {
      form.setStore("hasErrors", !form.hasErrors);
    }
    if (rememberKey) {
      Fe.remember({ data: form.data(), errors: form.errors }, rememberKey);
    }
  });
  return store2;
}
function next(array, index, loop = true) {
  if (index === array.length - 1) {
    return loop ? array[0] : array[index];
  }
  return array[index + 1];
}
function prev(array, currentIndex, loop = true) {
  if (currentIndex <= 0) {
    return loop ? array[array.length - 1] : array[0];
  }
  return array[currentIndex - 1];
}
function last(array) {
  return array[array.length - 1];
}
function chunk(arr, size2) {
  const result = [];
  for (let i = 0; i < arr.length; i += size2) {
    result.push(arr.slice(i, i + size2));
  }
  return result;
}
function isValidIndex(index, arr) {
  return index >= 0 && index < arr.length;
}
function styleToString$3(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
function disabledAttr(disabled) {
  return disabled ? true : void 0;
}
({
  type: "hidden",
  "aria-hidden": true,
  hidden: true,
  tabIndex: -1,
  style: styleToString$3({
    position: "absolute",
    opacity: 0,
    "pointer-events": "none",
    margin: 0,
    transform: "translateX(-100%)"
  })
});
function portalAttr(portal) {
  if (portal !== null) {
    return "";
  }
  return void 0;
}
function lightable(value) {
  function subscribe2(run2) {
    run2(value);
    return () => {
    };
  }
  return { subscribe: subscribe2 };
}
function getElementByMeltId(id) {
  if (!isBrowser$3)
    return null;
  const el = document.querySelector(`[data-melt-id="${id}"]`);
  return isHTMLElement(el) ? el : null;
}
const hiddenAction = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => key !== "action");
    }
  });
};
const isFunctionWithParams = (fn) => {
  return typeof fn === "function";
};
makeElement("empty");
function makeElement(name2, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction({
              ...result(...args2),
              [`data-melt-${name2}`]: "",
              action: action ?? noop
            });
          };
          fn.action = action ?? noop;
          return fn;
        }
        return hiddenAction({
          ...result,
          [`data-melt-${name2}`]: "",
          action: action ?? noop
        });
      });
    } else {
      const returnedFn = returned;
      const result = returnedFn == null ? void 0 : returnedFn();
      if (isFunctionWithParams(result)) {
        const resultFn = (...args2) => {
          return hiddenAction({
            ...result(...args2),
            [`data-melt-${name2}`]: "",
            action: action ?? noop
          });
        };
        resultFn.action = action ?? noop;
        return lightable(resultFn);
      }
      return lightable(hiddenAction({
        ...result,
        [`data-melt-${name2}`]: "",
        action: action ?? noop
      }));
    }
  })();
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = derivedStore.subscribe;
  return actionFn;
}
function createElHelpers(prefix) {
  const name2 = (part) => part ? `${prefix}-${part}` : prefix;
  const attribute = (part) => `data-melt-${prefix}${part ? `-${part}` : ""}`;
  const selector2 = (part) => `[data-melt-${prefix}${part ? `-${part}` : ""}]`;
  const getEl = (part) => document.querySelector(selector2(part));
  return {
    name: name2,
    attribute,
    selector: selector2,
    getEl
  };
}
const isBrowser$3 = typeof document !== "undefined";
const isFunction = (v) => typeof v === "function";
function isElement(element) {
  return element instanceof Element;
}
function isHTMLElement(element) {
  return element instanceof HTMLElement;
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isReadable(value) {
  return isObject(value) && "subscribe" in value;
}
function executeCallbacks$1(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function noop() {
}
function addEventListener$3(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function addMeltEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  if (typeof handler === "function") {
    const handlerWithMelt = withMelt((_event) => handler(_event));
    events.forEach((_event) => target.addEventListener(_event, handlerWithMelt, options));
    return () => {
      events.forEach((_event) => target.removeEventListener(_event, handlerWithMelt, options));
    };
  }
  return () => noop();
}
function dispatchMeltEvent(originalEvent) {
  const node = originalEvent.currentTarget;
  if (!isHTMLElement(node))
    return null;
  const customMeltEvent = new CustomEvent(`m-${originalEvent.type}`, {
    detail: {
      originalEvent
    },
    cancelable: true
  });
  node.dispatchEvent(customMeltEvent);
  return customMeltEvent;
}
function withMelt(handler) {
  return (event) => {
    const customEvent = dispatchMeltEvent(event);
    if (customEvent == null ? void 0 : customEvent.defaultPrevented)
      return;
    return handler(event);
  };
}
const safeOnMount = (fn) => {
  try {
    onMount(fn);
  } catch {
    return fn;
  }
};
const safeOnDestroy = (fn) => {
  try {
    onDestroy(fn);
  } catch {
    return fn;
  }
};
function getElemDirection(elem) {
  const style = window.getComputedStyle(elem);
  const direction = style.getPropertyValue("direction");
  return direction;
}
function omit$1(obj, ...keys) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
function withGet(store2) {
  return {
    ...store2,
    get: () => get_store_value(store2)
  };
}
withGet.writable = function(initial) {
  const internal = writable(initial);
  let value = initial;
  return {
    subscribe: internal.subscribe,
    set(newValue) {
      internal.set(newValue);
      value = newValue;
    },
    update(updater) {
      const newValue = updater(value);
      internal.set(newValue);
      value = newValue;
    },
    get() {
      return value;
    }
  };
};
withGet.derived = function(stores, fn) {
  const subscribers = /* @__PURE__ */ new Map();
  const get = () => {
    const values = Array.isArray(stores) ? stores.map((store2) => store2.get()) : stores.get();
    return fn(values);
  };
  const subscribe2 = (subscriber) => {
    const unsubscribers = [];
    const storesArr = Array.isArray(stores) ? stores : [stores];
    storesArr.forEach((store2) => {
      unsubscribers.push(store2.subscribe(() => {
        subscriber(get());
      }));
    });
    subscriber(get());
    subscribers.set(subscriber, unsubscribers);
    return () => {
      const unsubscribers2 = subscribers.get(subscriber);
      if (unsubscribers2) {
        for (const unsubscribe of unsubscribers2) {
          unsubscribe();
        }
      }
      subscribers.delete(subscriber);
    };
  };
  return {
    get,
    subscribe: subscribe2
  };
};
const overridable = (_store, onChange) => {
  const store2 = withGet(_store);
  const update2 = (updater, sideEffect) => {
    store2.update((curr) => {
      const next2 = updater(curr);
      let res = next2;
      if (onChange) {
        res = onChange({ curr, next: next2 });
      }
      sideEffect == null ? void 0 : sideEffect(res);
      return res;
    });
  };
  const set = (curr) => {
    update2(() => curr);
  };
  return {
    ...store2,
    update: update2,
    set
  };
};
function sleep$1(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function generateId$1() {
  return nanoid(10);
}
function generateIds(args) {
  return args.reduce((acc, curr) => {
    acc[curr] = generateId$1();
    return acc;
  }, {});
}
const kbd$2 = {
  ALT: "Alt",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  BACKSPACE: "Backspace",
  CAPS_LOCK: "CapsLock",
  CONTROL: "Control",
  DELETE: "Delete",
  END: "End",
  ENTER: "Enter",
  ESCAPE: "Escape",
  F1: "F1",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  HOME: "Home",
  META: "Meta",
  PAGE_DOWN: "PageDown",
  PAGE_UP: "PageUp",
  SHIFT: "Shift",
  SPACE: " ",
  TAB: "Tab",
  CTRL: "Control",
  ASTERISK: "*",
  A: "a",
  P: "p"
};
const getNextKey = (dir = "ltr", orientation = "horizontal") => {
  return {
    horizontal: dir === "rtl" ? kbd$2.ARROW_LEFT : kbd$2.ARROW_RIGHT,
    vertical: kbd$2.ARROW_DOWN
  }[orientation];
};
const getPrevKey = (dir = "ltr", orientation = "horizontal") => {
  return {
    horizontal: dir === "rtl" ? kbd$2.ARROW_RIGHT : kbd$2.ARROW_LEFT,
    vertical: kbd$2.ARROW_UP
  }[orientation];
};
const getDirectionalKeys = (dir = "ltr", orientation = "horizontal") => {
  return {
    nextKey: getNextKey(dir, orientation),
    prevKey: getPrevKey(dir, orientation)
  };
};
const isDom = () => typeof window !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return (agent == null ? void 0 : agent.platform) ?? navigator.platform;
}
const pt = (v) => isDom() && v.test(getPlatform().toLowerCase());
const isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
const isMac = () => pt(/^mac/) && !isTouchDevice();
const isApple = () => pt(/mac|iphone|ipad|ipod/i);
const isIos = () => isApple() && !isMac();
const LOCK_CLASSNAME = "data-melt-scroll-lock";
function assignStyle(el, style) {
  if (!el)
    return;
  const previousStyle = el.style.cssText;
  Object.assign(el.style, style);
  return () => {
    el.style.cssText = previousStyle;
  };
}
function setCSSProperty(el, property, value) {
  if (!el)
    return;
  const previousValue = el.style.getPropertyValue(property);
  el.style.setProperty(property, value);
  return () => {
    if (previousValue) {
      el.style.setProperty(property, previousValue);
    } else {
      el.style.removeProperty(property);
    }
  };
}
function getPaddingProperty(documentElement) {
  const documentLeft = documentElement.getBoundingClientRect().left;
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
  return scrollbarX ? "paddingLeft" : "paddingRight";
}
function removeScroll(_document) {
  const doc = document;
  const win = doc.defaultView ?? window;
  const { documentElement, body } = doc;
  const locked = body.hasAttribute(LOCK_CLASSNAME);
  if (locked)
    return noop;
  body.setAttribute(LOCK_CLASSNAME, "");
  const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
  const setScrollbarWidthProperty = () => setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);
  const paddingProperty = getPaddingProperty(documentElement);
  const scrollbarSidePadding = win.getComputedStyle(body)[paddingProperty];
  const setStyle = () => assignStyle(body, {
    overflow: "hidden",
    [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
  });
  const setIOSStyle = () => {
    const { scrollX, scrollY, visualViewport } = win;
    const offsetLeft = (visualViewport == null ? void 0 : visualViewport.offsetLeft) ?? 0;
    const offsetTop = (visualViewport == null ? void 0 : visualViewport.offsetTop) ?? 0;
    const restoreStyle = assignStyle(body, {
      position: "fixed",
      overflow: "hidden",
      top: `${-(scrollY - Math.floor(offsetTop))}px`,
      left: `${-(scrollX - Math.floor(offsetLeft))}px`,
      right: "0",
      [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
    });
    return () => {
      restoreStyle == null ? void 0 : restoreStyle();
      win.scrollTo(scrollX, scrollY);
    };
  };
  const cleanups = [setScrollbarWidthProperty(), isIos() ? setIOSStyle() : setStyle()];
  return () => {
    cleanups.forEach((fn) => fn == null ? void 0 : fn());
    body.removeAttribute(LOCK_CLASSNAME);
  };
}
function derivedVisible(obj) {
  const { open, forceVisible, activeTrigger } = obj;
  return derived([open, forceVisible, activeTrigger], ([$open, $forceVisible, $activeTrigger]) => ($open || $forceVisible) && $activeTrigger !== null);
}
function effect$1(stores, fn) {
  let cb = void 0;
  const destroy = derived(stores, (stores2) => {
    cb == null ? void 0 : cb();
    cb = fn(stores2);
  }).subscribe(noop);
  const unsub = () => {
    destroy();
    cb == null ? void 0 : cb();
  };
  safeOnDestroy(unsub);
  return unsub;
}
function toWritableStores$1(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = withGet(writable(value));
  });
  return result;
}
function getPortalParent(node) {
  let parent = node.parentElement;
  while (isHTMLElement(parent) && !parent.hasAttribute("data-portal")) {
    parent = parent.parentElement;
  }
  return parent || "body";
}
function getPortalDestination(node, portalProp) {
  if (portalProp !== void 0)
    return portalProp;
  const portalParent = getPortalParent(node);
  if (portalParent === "body")
    return document.body;
  return null;
}
async function handleFocus(args) {
  const { prop, defaultEl } = args;
  await Promise.all([sleep$1(1), tick$1]);
  if (prop === void 0) {
    defaultEl == null ? void 0 : defaultEl.focus();
    return;
  }
  const returned = isFunction(prop) ? prop(defaultEl) : prop;
  if (typeof returned === "string") {
    const el = document.querySelector(returned);
    if (!isHTMLElement(el))
      return;
    el.focus();
  } else if (isHTMLElement(returned)) {
    returned.focus();
  }
}
const { name: name$4, selector: selector$1 } = createElHelpers("accordion");
const defaults$6 = {
  multiple: false,
  disabled: false,
  forceVisible: false
};
const createAccordion = (props) => {
  const withDefaults = { ...defaults$6, ...props };
  const options = toWritableStores$1(omit$1(withDefaults, "value", "onValueChange", "defaultValue"));
  const meltIds = generateIds(["root"]);
  const { disabled, forceVisible } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults == null ? void 0 : withDefaults.onValueChange);
  const isSelected = (key, v) => {
    if (v === void 0)
      return false;
    if (typeof v === "string")
      return v === key;
    return v.includes(key);
  };
  const isSelectedStore = derived(value, ($value) => {
    return (key) => isSelected(key, $value);
  });
  const root = makeElement(name$4(), {
    returned: () => ({
      "data-melt-id": meltIds.root
    })
  });
  const parseItemProps = (props2) => {
    if (typeof props2 === "string") {
      return { value: props2 };
    } else {
      return props2;
    }
  };
  const parseHeadingProps = (props2) => {
    if (typeof props2 === "number") {
      return { level: props2 };
    } else {
      return props2;
    }
  };
  const item = makeElement(name$4("item"), {
    stores: value,
    returned: ($value) => {
      return (props2) => {
        const { value: itemValue, disabled: disabled2 } = parseItemProps(props2);
        return {
          "data-state": isSelected(itemValue, $value) ? "open" : "closed",
          "data-disabled": disabledAttr(disabled2)
        };
      };
    }
  });
  const trigger = makeElement(name$4("trigger"), {
    stores: [value, disabled],
    returned: ([$value, $disabled]) => {
      return (props2) => {
        const { value: itemValue, disabled: disabled2 } = parseItemProps(props2);
        return {
          disabled: disabledAttr($disabled || disabled2),
          "aria-expanded": isSelected(itemValue, $value) ? true : false,
          "aria-disabled": disabled2 ? true : false,
          "data-disabled": disabledAttr(disabled2),
          "data-value": itemValue,
          "data-state": isSelected(itemValue, $value) ? "open" : "closed"
        };
      };
    },
    action: (node) => {
      const unsub = executeCallbacks$1(addMeltEventListener(node, "click", () => {
        const disabled2 = node.dataset.disabled === "true";
        const itemValue = node.dataset.value;
        if (disabled2 || !itemValue)
          return;
        handleValueUpdate(itemValue);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (![kbd$2.ARROW_DOWN, kbd$2.ARROW_UP, kbd$2.HOME, kbd$2.END].includes(e.key)) {
          return;
        }
        e.preventDefault();
        if (e.key === kbd$2.SPACE || e.key === kbd$2.ENTER) {
          const disabled2 = node.dataset.disabled === "true";
          const itemValue = node.dataset.value;
          if (disabled2 || !itemValue)
            return;
          handleValueUpdate(itemValue);
          return;
        }
        const el = e.target;
        const rootEl = getElementByMeltId(meltIds.root);
        if (!rootEl || !isHTMLElement(el))
          return;
        const items = Array.from(rootEl.querySelectorAll(selector$1("trigger")));
        const candidateItems = items.filter((item2) => {
          if (!isHTMLElement(item2))
            return false;
          return item2.dataset.disabled !== "true";
        });
        if (!candidateItems.length)
          return;
        const elIdx = candidateItems.indexOf(el);
        if (e.key === kbd$2.ARROW_DOWN) {
          candidateItems[(elIdx + 1) % candidateItems.length].focus();
        }
        if (e.key === kbd$2.ARROW_UP) {
          candidateItems[(elIdx - 1 + candidateItems.length) % candidateItems.length].focus();
        }
        if (e.key === kbd$2.HOME) {
          candidateItems[0].focus();
        }
        if (e.key === kbd$2.END) {
          candidateItems[candidateItems.length - 1].focus();
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const content = makeElement(name$4("content"), {
    stores: [value, disabled, forceVisible],
    returned: ([$value, $disabled, $forceVisible]) => {
      return (props2) => {
        const { value: itemValue } = parseItemProps(props2);
        const isVisible = isSelected(itemValue, $value) || $forceVisible;
        return {
          "data-state": isVisible ? "open" : "closed",
          "data-disabled": disabledAttr($disabled),
          "data-value": itemValue,
          hidden: isVisible ? void 0 : true,
          style: styleToString$3({
            display: isVisible ? void 0 : "none"
          })
        };
      };
    },
    action: (node) => {
      tick$1().then(() => {
        const contentId = generateId$1();
        const triggerId = generateId$1();
        const parentTrigger = document.querySelector(`${selector$1("trigger")}, [data-value="${node.dataset.value}"]`);
        if (!isHTMLElement(parentTrigger))
          return;
        node.id = contentId;
        parentTrigger.setAttribute("aria-controls", contentId);
        parentTrigger.id = triggerId;
      });
    }
  });
  const heading = makeElement(name$4("heading"), {
    returned: () => {
      return (props2) => {
        const { level } = parseHeadingProps(props2);
        return {
          role: "heading",
          "aria-level": level,
          "data-heading-level": level
        };
      };
    }
  });
  function handleValueUpdate(itemValue) {
    value.update(($value) => {
      if ($value === void 0) {
        return withDefaults.multiple ? [itemValue] : itemValue;
      }
      if (Array.isArray($value)) {
        if ($value.includes(itemValue)) {
          return $value.filter((v) => v !== itemValue);
        }
        $value.push(itemValue);
        return $value;
      }
      return $value === itemValue ? void 0 : itemValue;
    });
  }
  return {
    ids: meltIds,
    elements: {
      root,
      item,
      trigger,
      content,
      heading
    },
    states: {
      value
    },
    helpers: {
      isSelected: isSelectedStore
    },
    options
  };
};
const defaults$5 = {
  disabled: false,
  required: false,
  name: void 0,
  value: "on",
  defaultChecked: false
};
function createCheckbox(props) {
  const withDefaults = { ...defaults$5, ...props };
  const options = toWritableStores$1(omit$1(withDefaults, "checked", "defaultChecked"));
  const { disabled, name: name2, required, value } = options;
  const checkedWritable = withDefaults.checked ?? writable(withDefaults.defaultChecked);
  const checked = overridable(checkedWritable, withDefaults == null ? void 0 : withDefaults.onCheckedChange);
  const root = makeElement("checkbox", {
    stores: [checked, disabled, required],
    returned: ([$checked, $disabled, $required]) => {
      return {
        "data-disabled": disabledAttr($disabled),
        disabled: disabledAttr($disabled),
        "data-state": $checked === "indeterminate" ? "indeterminate" : $checked ? "checked" : "unchecked",
        type: "button",
        role: "checkbox",
        "aria-checked": $checked === "indeterminate" ? "mixed" : $checked,
        "aria-required": $required
      };
    },
    action: (node) => {
      const unsub = executeCallbacks$1(addMeltEventListener(node, "keydown", (e) => {
        if (e.key === kbd$2.ENTER)
          e.preventDefault();
      }), addMeltEventListener(node, "click", () => {
        if (disabled.get())
          return;
        checked.update((value2) => {
          if (value2 === "indeterminate")
            return true;
          return !value2;
        });
      }));
      return {
        destroy: unsub
      };
    }
  });
  const input = makeElement("checkbox-input", {
    stores: [checked, name2, value, required, disabled],
    returned: ([$checked, $name, $value, $required, $disabled]) => {
      return {
        type: "checkbox",
        "aria-hidden": true,
        hidden: true,
        tabindex: -1,
        name: $name,
        value: $value,
        checked: $checked === "indeterminate" ? false : $checked,
        required: $required,
        disabled: disabledAttr($disabled),
        style: styleToString$3({
          position: "absolute",
          opacity: 0,
          "pointer-events": "none",
          margin: 0,
          transform: "translateX(-100%)"
        })
      };
    }
  });
  const isIndeterminate = derived(checked, ($checked) => $checked === "indeterminate");
  const isChecked = derived(checked, ($checked) => $checked === true);
  return {
    elements: {
      root,
      input
    },
    states: {
      checked
    },
    helpers: {
      isIndeterminate,
      isChecked
    },
    options
  };
}
readable(void 0, (set) => {
  function clicked(event) {
    set(event);
    set(void 0);
  }
  const unsubscribe = addEventListener$3(document, "pointerup", clicked, {
    passive: false,
    capture: true
  });
  return unsubscribe;
});
const documentEscapeKeyStore = readable(void 0, (set) => {
  function keydown(event) {
    if (event && event.key === kbd$2.ESCAPE) {
      set(event);
    }
    set(void 0);
  }
  const unsubscribe = addEventListener$3(document, "keydown", keydown, {
    passive: false
  });
  return unsubscribe;
});
const useEscapeKeydown = (node, config = {}) => {
  let unsub = noop;
  function update2(config2 = {}) {
    unsub();
    const options = { enabled: true, ...config2 };
    const enabled = isReadable(options.enabled) ? options.enabled : readable(options.enabled);
    unsub = executeCallbacks$1(
      // Handle escape keydowns
      documentEscapeKeyStore.subscribe((e) => {
        var _a;
        if (!e || !get_store_value(enabled))
          return;
        const target = e.target;
        if (!isHTMLElement(target) || target.closest("[data-escapee]") !== node) {
          return;
        }
        e.preventDefault();
        if (options.ignore) {
          if (isFunction(options.ignore)) {
            if (options.ignore(e))
              return;
          } else if (Array.isArray(options.ignore)) {
            if (options.ignore.length > 0 && options.ignore.some((ignoreEl) => {
              return ignoreEl && target === ignoreEl;
            }))
              return;
          }
        }
        (_a = options.handler) == null ? void 0 : _a.call(options, e);
      }),
      effect$1(enabled, ($enabled) => {
        if ($enabled) {
          node.dataset.escapee = "";
        } else {
          delete node.dataset.escapee;
        }
      })
    );
  }
  update2(config);
  return {
    update: update2,
    destroy() {
      node.removeAttribute("data-escapee");
      unsub();
    }
  };
};
const defaultConfig$1 = {
  strategy: "absolute",
  placement: "top",
  gutter: 5,
  flip: true,
  sameWidth: false,
  overflowPadding: 8
};
const ARROW_TRANSFORM = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)"
};
function useFloating(reference, floating, opts = {}) {
  if (!floating || !reference || opts === null)
    return {
      destroy: noop
    };
  const options = { ...defaultConfig$1, ...opts };
  const arrowEl = floating.querySelector("[data-arrow=true]");
  const middleware = [];
  if (options.flip) {
    middleware.push(flip({
      boundary: options.boundary,
      padding: options.overflowPadding
    }));
  }
  const arrowOffset = isHTMLElement(arrowEl) ? arrowEl.offsetHeight / 2 : 0;
  if (options.gutter || options.offset) {
    const data = options.gutter ? { mainAxis: options.gutter } : options.offset;
    if ((data == null ? void 0 : data.mainAxis) != null) {
      data.mainAxis += arrowOffset;
    }
    middleware.push(offset(data));
  }
  middleware.push(shift({
    boundary: options.boundary,
    crossAxis: options.overlap,
    padding: options.overflowPadding
  }));
  if (arrowEl) {
    middleware.push(arrow({ element: arrowEl, padding: 8 }));
  }
  middleware.push(size({
    padding: options.overflowPadding,
    apply({ rects, availableHeight, availableWidth }) {
      if (options.sameWidth) {
        Object.assign(floating.style, {
          width: `${Math.round(rects.reference.width)}px`,
          minWidth: "unset"
        });
      }
      if (options.fitViewport) {
        Object.assign(floating.style, {
          maxWidth: `${availableWidth}px`,
          maxHeight: `${availableHeight}px`
        });
      }
    }
  }));
  function compute() {
    if (!reference || !floating)
      return;
    if (isHTMLElement(reference) && !reference.ownerDocument.documentElement.contains(reference))
      return;
    const { placement, strategy } = options;
    computePosition(reference, floating, {
      placement,
      middleware,
      strategy
    }).then((data) => {
      const x2 = Math.round(data.x);
      const y = Math.round(data.y);
      const [side, align] = getSideAndAlignFromPlacement(data.placement);
      floating.setAttribute("data-side", side);
      floating.setAttribute("data-align", align);
      Object.assign(floating.style, {
        position: options.strategy,
        top: `${y}px`,
        left: `${x2}px`
      });
      if (isHTMLElement(arrowEl) && data.middlewareData.arrow) {
        const { x: x3, y: y2 } = data.middlewareData.arrow;
        const dir = data.placement.split("-")[0];
        arrowEl.setAttribute("data-side", dir);
        Object.assign(arrowEl.style, {
          position: "absolute",
          left: x3 != null ? `${x3}px` : "",
          top: y2 != null ? `${y2}px` : "",
          [dir]: `calc(100% - ${arrowOffset}px)`,
          transform: ARROW_TRANSFORM[dir],
          backgroundColor: "inherit",
          zIndex: "inherit"
        });
      }
      return data;
    });
  }
  Object.assign(floating.style, {
    position: options.strategy
  });
  return {
    destroy: autoUpdate(reference, floating, compute)
  };
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
function createFocusTrap(config = {}) {
  let trap;
  const { immediate, ...focusTrapOptions } = config;
  const hasFocus = writable(false);
  const isPaused = writable(false);
  const activate = (opts) => trap == null ? void 0 : trap.activate(opts);
  const deactivate = (opts) => {
    trap == null ? void 0 : trap.deactivate(opts);
  };
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.set(true);
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.set(false);
    }
  };
  const useFocusTrap = (node) => {
    trap = createFocusTrap$1(node, {
      ...focusTrapOptions,
      onActivate() {
        var _a;
        hasFocus.set(true);
        (_a = config.onActivate) == null ? void 0 : _a.call(config);
      },
      onDeactivate() {
        var _a;
        hasFocus.set(false);
        (_a = config.onDeactivate) == null ? void 0 : _a.call(config);
      }
    });
    if (immediate) {
      activate();
    }
    return {
      destroy() {
        deactivate();
        trap = void 0;
      }
    };
  };
  return {
    useFocusTrap,
    hasFocus: readonly(hasFocus),
    isPaused: readonly(isPaused),
    activate,
    deactivate,
    pause,
    unpause
  };
}
const visibleModals = [];
const useModal = (node, config) => {
  let unsubInteractOutside = noop;
  function removeNodeFromVisibleModals() {
    const index = visibleModals.indexOf(node);
    if (index >= 0) {
      visibleModals.splice(index, 1);
    }
  }
  function update2(config2) {
    unsubInteractOutside();
    const { open, onClose, shouldCloseOnInteractOutside, closeOnInteractOutside } = config2;
    sleep$1(100).then(() => {
      if (open) {
        visibleModals.push(node);
      } else {
        removeNodeFromVisibleModals();
      }
    });
    function isLastModal() {
      return last(visibleModals) === node;
    }
    function closeModal() {
      if (isLastModal() && onClose) {
        onClose();
        removeNodeFromVisibleModals();
      }
    }
    function onInteractOutsideStart(e) {
      const target = e.target;
      if (!isElement(target))
        return;
      if (target && isLastModal()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
    function onInteractOutside(e) {
      if ((shouldCloseOnInteractOutside == null ? void 0 : shouldCloseOnInteractOutside(e)) && isLastModal()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        closeModal();
      }
    }
    unsubInteractOutside = useInteractOutside(node, {
      onInteractOutsideStart,
      onInteractOutside: closeOnInteractOutside ? onInteractOutside : void 0,
      enabled: open
    }).destroy;
  }
  update2(config);
  return {
    update: update2,
    destroy() {
      removeNodeFromVisibleModals();
      unsubInteractOutside();
    }
  };
};
const defaultConfig = {
  floating: {},
  focusTrap: {},
  modal: {},
  escapeKeydown: {},
  portal: "body"
};
const usePopper = (popperElement, args) => {
  popperElement.dataset.escapee = "";
  const { anchorElement, open, options } = args;
  if (!anchorElement || !open || !options) {
    return { destroy: noop };
  }
  const opts = { ...defaultConfig, ...options };
  const callbacks = [];
  if (opts.portal !== null) {
    callbacks.push(usePortal(popperElement, opts.portal).destroy);
  }
  callbacks.push(useFloating(anchorElement, popperElement, opts.floating).destroy);
  if (opts.focusTrap !== null) {
    const { useFocusTrap } = createFocusTrap({
      immediate: true,
      escapeDeactivates: false,
      allowOutsideClick: true,
      returnFocusOnDeactivate: false,
      fallbackFocus: popperElement,
      ...opts.focusTrap
    });
    callbacks.push(useFocusTrap(popperElement).destroy);
  }
  if (opts.modal !== null) {
    callbacks.push(useModal(popperElement, {
      onClose: () => {
        if (isHTMLElement(anchorElement)) {
          open.set(false);
          anchorElement.focus();
        }
      },
      shouldCloseOnInteractOutside: (e) => {
        if (e.defaultPrevented)
          return false;
        if (isHTMLElement(anchorElement) && anchorElement.contains(e.target)) {
          return false;
        }
        return true;
      },
      ...opts.modal
    }).destroy);
  }
  if (opts.escapeKeydown !== null) {
    callbacks.push(useEscapeKeydown(popperElement, {
      enabled: open,
      handler: () => {
        open.set(false);
      },
      ...opts.escapeKeydown
    }).destroy);
  }
  const unsubscribe = executeCallbacks$1(...callbacks);
  return {
    destroy() {
      unsubscribe();
    }
  };
};
const usePortal = (el, target = "body") => {
  let targetEl;
  if (!isHTMLElement(target) && typeof target !== "string") {
    return {
      destroy: noop
    };
  }
  async function update2(newTarget) {
    target = newTarget;
    if (typeof target === "string") {
      targetEl = document.querySelector(target);
      if (targetEl === null) {
        await tick$1();
        targetEl = document.querySelector(target);
      }
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    } else {
      throw new TypeError(`Unknown portal target type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
    }
    el.dataset.portal = "";
    targetEl.appendChild(el);
    el.hidden = false;
  }
  function destroy() {
    el.remove();
  }
  update2(target);
  return {
    update: update2,
    destroy
  };
};
const useInteractOutside = (node, config) => {
  let unsub = noop;
  let unsubClick = noop;
  let isPointerDown = false;
  let isPointerDownInside = false;
  let ignoreEmulatedMouseEvents = false;
  function update2(config2) {
    unsub();
    unsubClick();
    const { onInteractOutside, onInteractOutsideStart, enabled } = config2;
    if (!enabled)
      return;
    function onPointerDown(e) {
      if (onInteractOutside && isValidEvent(e, node)) {
        onInteractOutsideStart == null ? void 0 : onInteractOutsideStart(e);
      }
      const target = e.target;
      if (isElement(target) && isOrContainsTarget(node, target)) {
        isPointerDownInside = true;
      }
      isPointerDown = true;
    }
    function triggerInteractOutside(e) {
      onInteractOutside == null ? void 0 : onInteractOutside(e);
    }
    const documentObj = getOwnerDocument(node);
    if (typeof PointerEvent !== "undefined") {
      const onPointerUp = (e) => {
        unsubClick();
        const handler = (e2) => {
          if (shouldTriggerInteractOutside(e2)) {
            triggerInteractOutside(e2);
          }
          resetPointerState();
        };
        if (e.pointerType === "touch") {
          unsubClick = addEventListener$3(documentObj, "click", handler, {
            capture: true,
            once: true
          });
          return;
        }
        handler(e);
      };
      unsub = executeCallbacks$1(addEventListener$3(documentObj, "pointerdown", onPointerDown, true), addEventListener$3(documentObj, "pointerup", onPointerUp, true));
    } else {
      const onMouseUp = (e) => {
        if (ignoreEmulatedMouseEvents) {
          ignoreEmulatedMouseEvents = false;
        } else if (shouldTriggerInteractOutside(e)) {
          triggerInteractOutside(e);
        }
        resetPointerState();
      };
      const onTouchEnd = (e) => {
        ignoreEmulatedMouseEvents = true;
        if (shouldTriggerInteractOutside(e)) {
          triggerInteractOutside(e);
        }
        resetPointerState();
      };
      unsub = executeCallbacks$1(addEventListener$3(documentObj, "mousedown", onPointerDown, true), addEventListener$3(documentObj, "mouseup", onMouseUp, true), addEventListener$3(documentObj, "touchstart", onPointerDown, true), addEventListener$3(documentObj, "touchend", onTouchEnd, true));
    }
  }
  function shouldTriggerInteractOutside(e) {
    if (isPointerDown && !isPointerDownInside && isValidEvent(e, node)) {
      return true;
    }
    return false;
  }
  function resetPointerState() {
    isPointerDown = false;
    isPointerDownInside = false;
  }
  update2(config);
  return {
    update: update2,
    destroy() {
      unsub();
      unsubClick();
    }
  };
};
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0)
    return false;
  const target = e.target;
  if (!isElement(target))
    return false;
  const ownerDocument = target.ownerDocument;
  if (!ownerDocument || !ownerDocument.documentElement.contains(target)) {
    return false;
  }
  return node && !isOrContainsTarget(node, target);
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return (el == null ? void 0 : el.ownerDocument) ?? document;
}
({
  prefix: "",
  disabled: readable(false),
  required: readable(false),
  name: readable(void 0)
});
function createLabel() {
  const root = makeElement("label", {
    action: (node) => {
      const mouseDown = addMeltEventListener(node, "mousedown", (e) => {
        if (!e.defaultPrevented && e.detail > 1) {
          e.preventDefault();
        }
      });
      return {
        destroy: mouseDown
      };
    }
  });
  return {
    elements: {
      root
    }
  };
}
const defaultDateDefaults = {
  defaultValue: void 0,
  defaultPlaceholder: void 0,
  granularity: "day"
};
function getDefaultDate(props) {
  const withDefaults = { ...defaultDateDefaults, ...props };
  const { defaultValue, defaultPlaceholder, granularity } = withDefaults;
  if (Array.isArray(defaultValue) && defaultValue.length) {
    return defaultValue[defaultValue.length - 1];
  }
  if (defaultValue && !Array.isArray(defaultValue)) {
    return defaultValue;
  } else if (defaultPlaceholder) {
    return defaultPlaceholder;
  } else {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const calendarDateTimeGranularities = ["hour", "minute", "second"];
    if (calendarDateTimeGranularities.includes(granularity ?? "day")) {
      return new CalendarDateTime(year, month, day, 0, 0, 0);
    }
    return new CalendarDate(year, month, day);
  }
}
function parseStringToDateValue(dateStr, referenceVal) {
  let dateValue;
  if (referenceVal instanceof ZonedDateTime) {
    dateValue = parseZonedDateTime(dateStr);
  } else if (referenceVal instanceof CalendarDateTime) {
    dateValue = parseDateTime(dateStr);
  } else {
    dateValue = parseDate(dateStr);
  }
  return dateValue.calendar !== referenceVal.calendar ? toCalendar(dateValue, referenceVal.calendar) : dateValue;
}
function toDate(dateValue, tz = getLocalTimeZone()) {
  if (dateValue instanceof ZonedDateTime) {
    return dateValue.toDate();
  } else {
    return dateValue.toDate(tz);
  }
}
function isCalendarDateTime(dateValue) {
  return dateValue instanceof CalendarDateTime;
}
function isZonedDateTime(dateValue) {
  return dateValue instanceof ZonedDateTime;
}
function hasTime(dateValue) {
  return isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
}
function getDaysInMonth(date) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  } else {
    return date.set({ day: 100 }).day;
  }
}
function isBefore(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) < 0;
}
function isAfter(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) > 0;
}
function getLastFirstDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  if (firstDayOfWeek > day) {
    return date.subtract({ days: day + 7 - firstDayOfWeek });
  }
  if (firstDayOfWeek === day) {
    return date;
  }
  return date.subtract({ days: day - firstDayOfWeek });
}
function getNextLastDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  if (day === lastDayOfWeek) {
    return date;
  }
  if (day > lastDayOfWeek) {
    return date.add({ days: 7 - day + lastDayOfWeek });
  }
  return date.add({ days: lastDayOfWeek - day });
}
function createFormatter(initialLocale) {
  let locale = initialLocale;
  function setLocale(newLocale) {
    locale = newLocale;
  }
  function getLocale() {
    return locale;
  }
  function custom(date, options) {
    return new DateFormatter(locale, options).format(date);
  }
  function selectedDate(date, includeTime = true) {
    if (hasTime(date) && includeTime) {
      return custom(toDate(date), {
        dateStyle: "long",
        timeStyle: "long"
      });
    } else {
      return custom(toDate(date), {
        dateStyle: "long"
      });
    }
  }
  function fullMonthAndYear(date) {
    return new DateFormatter(locale, { month: "long", year: "numeric" }).format(date);
  }
  function fullMonth(date) {
    return new DateFormatter(locale, { month: "long" }).format(date);
  }
  function fullYear(date) {
    return new DateFormatter(locale, { year: "numeric" }).format(date);
  }
  function toParts(date, options) {
    if (isZonedDateTime(date)) {
      return new DateFormatter(locale, {
        ...options,
        timeZone: date.timeZone
      }).formatToParts(toDate(date));
    } else {
      return new DateFormatter(locale, options).formatToParts(toDate(date));
    }
  }
  function dayOfWeek(date, length = "narrow") {
    return new DateFormatter(locale, { weekday: length }).format(date);
  }
  function dayPeriod(date) {
    var _a;
    const parts = new DateFormatter(locale, {
      hour: "numeric",
      minute: "numeric"
    }).formatToParts(date);
    const value = (_a = parts.find((p) => p.type === "dayPeriod")) == null ? void 0 : _a.value;
    if (value === "PM") {
      return "PM";
    }
    return "AM";
  }
  const defaultPartOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
  function part(dateObj, type, options = {}) {
    const opts = { ...defaultPartOptions, ...options };
    const parts = toParts(dateObj, opts);
    const part2 = parts.find((p) => p.type === type);
    return part2 ? part2.value : "";
  }
  return {
    setLocale,
    getLocale,
    fullMonth,
    fullYear,
    fullMonthAndYear,
    toParts,
    custom,
    part,
    dayPeriod,
    selectedDate,
    dayOfWeek
  };
}
function dateStore(store2, defaultValue) {
  const { set, update: update2, subscribe: subscribe2, get } = withGet(store2);
  function add(duration) {
    update2((d2) => {
      return d2.add(duration);
    });
  }
  function nextPage(amount) {
    update2((d2) => {
      return d2.set({ day: 1 }).add({ months: amount });
    });
  }
  function prevPage(amount) {
    update2((d2) => {
      return d2.set({ day: 1 }).subtract({ months: amount });
    });
  }
  function subtract(duration) {
    update2((d2) => {
      return d2.subtract(duration);
    });
  }
  function setDate(fields, disambiguation) {
    if (disambiguation) {
      update2((d2) => {
        return d2.set(fields, disambiguation);
      });
      return;
    }
    update2((d2) => {
      return d2.set(fields);
    });
  }
  function reset() {
    update2(() => {
      return defaultValue;
    });
  }
  function toWritable() {
    return {
      set,
      subscribe: subscribe2,
      update: update2,
      get
    };
  }
  return {
    get,
    set,
    update: update2,
    subscribe: subscribe2,
    add,
    subtract,
    setDate,
    reset,
    toWritable,
    nextPage,
    prevPage
  };
}
function initAnnouncer() {
  if (!isBrowser$3)
    return null;
  let el = document.querySelector("[data-melt-announcer]");
  if (!isHTMLElement(el)) {
    const div = document.createElement("div");
    div.style.cssText = styleToString$3({
      border: "0px",
      clip: "rect(0px, 0px, 0px, 0px)",
      "clip-path": "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0px",
      position: "absolute",
      "white-space": "nowrap",
      width: "1px"
    });
    div.setAttribute("data-melt-announcer", "");
    div.appendChild(createLog("assertive"));
    div.appendChild(createLog("polite"));
    el = div;
    document.body.insertBefore(el, document.body.firstChild);
  }
  function createLog(kind) {
    const log = document.createElement("div");
    log.role = "log";
    log.ariaLive = kind;
    log.setAttribute("aria-relevant", "additions");
    return log;
  }
  function getLog(kind) {
    if (!isHTMLElement(el))
      return null;
    const log = el.querySelector(`[aria-live="${kind}"]`);
    if (!isHTMLElement(log))
      return null;
    return log;
  }
  return {
    getLog
  };
}
function getAnnouncer() {
  const announcer = initAnnouncer();
  function announce(value, kind = "assertive", timeout = 7500) {
    if (!announcer || !isBrowser$3)
      return;
    const log = announcer.getLog(kind);
    const content = document.createElement("div");
    if (typeof value === "number") {
      value = value.toString();
    } else if (value === null) {
      value = "Empty";
    } else {
      value = value.trim();
    }
    content.innerText = value;
    if (kind === "assertive") {
      log == null ? void 0 : log.replaceChildren(content);
    } else {
      log == null ? void 0 : log.appendChild(content);
    }
    return setTimeout(() => {
      content.remove();
    }, timeout);
  }
  return {
    announce
  };
}
function isCalendarCell(node) {
  if (!isHTMLElement(node))
    return false;
  if (!node.hasAttribute("data-melt-calendar-cell"))
    return false;
  return true;
}
function getDaysBetween(start, end) {
  const days = [];
  let dCurrent = start.add({ days: 1 });
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    days.push(dCurrent);
    dCurrent = dCurrent.add({ days: 1 });
  }
  return days;
}
function createMonth(props) {
  const { dateObj, weekStartsOn, fixedWeeks, locale } = props;
  const daysInMonth = getDaysInMonth(dateObj);
  const datesArray = Array.from({ length: daysInMonth }, (_2, i) => dateObj.set({ day: i + 1 }));
  const firstDayOfMonth = startOfMonth(dateObj);
  const lastDayOfMonth = endOfMonth(dateObj);
  const lastSunday = getLastFirstDayOfWeek(firstDayOfMonth, weekStartsOn, locale);
  const nextSaturday = getNextLastDayOfWeek(lastDayOfMonth, weekStartsOn, locale);
  const lastMonthDays = getDaysBetween(lastSunday.subtract({ days: 1 }), firstDayOfMonth);
  const nextMonthDays = getDaysBetween(lastDayOfMonth, nextSaturday.add({ days: 1 }));
  const totalDays = lastMonthDays.length + datesArray.length + nextMonthDays.length;
  if (fixedWeeks && totalDays < 42) {
    const extraDays = 42 - totalDays;
    let startFrom = nextMonthDays[nextMonthDays.length - 1];
    if (!startFrom) {
      startFrom = dateObj.add({ months: 1 }).set({ day: 1 });
    }
    const extraDaysArray = Array.from({ length: extraDays }, (_2, i) => {
      const incr = i + 1;
      return startFrom.add({ days: incr });
    });
    nextMonthDays.push(...extraDaysArray);
  }
  const allDays = lastMonthDays.concat(datesArray, nextMonthDays);
  const weeks = chunk(allDays, 7);
  return {
    value: dateObj,
    dates: allDays,
    weeks
  };
}
function createMonths(props) {
  const { numberOfMonths, dateObj, ...monthProps } = props;
  const months = [];
  if (!numberOfMonths || numberOfMonths === 1) {
    months.push(createMonth({
      ...monthProps,
      dateObj
    }));
    return months;
  }
  months.push(createMonth({
    ...monthProps,
    dateObj
  }));
  for (let i = 1; i < numberOfMonths; i++) {
    const nextMonth = dateObj.add({ months: i });
    months.push(createMonth({
      ...monthProps,
      dateObj: nextMonth
    }));
  }
  return months;
}
function getSelectableCells(calendarId) {
  const node = document.getElementById(calendarId);
  if (!node)
    return [];
  const selectableSelector = `[data-melt-calendar-cell]:not([data-disabled]):not([data-outside-visible-months])`;
  return Array.from(node.querySelectorAll(selectableSelector)).filter((el) => isHTMLElement(el));
}
function setPlaceholderToNodeValue(node, placeholder) {
  const cellValue = node.getAttribute("data-value");
  if (!cellValue)
    return;
  placeholder.set(parseStringToDateValue(cellValue, get_store_value(placeholder)));
}
const defaults$4 = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
const { name: name$3 } = createElHelpers("calendar");
const calendarIdParts = ["calendar", "accessibleHeading"];
function createCalendar(props) {
  const withDefaults = { ...defaults$4, ...props };
  const options = toWritableStores$1({
    ...omit$1(withDefaults, "value", "placeholder", "multiple", "ids"),
    multiple: withDefaults.multiple ?? false
  });
  const { preventDeselect, numberOfMonths, pagedNavigation, weekStartsOn, fixedWeeks, calendarLabel, locale, minValue, maxValue, multiple, isDateUnavailable, disabled, readonly: readonly2, weekdayFormat } = options;
  const ids = toWritableStores$1({ ...generateIds(calendarIdParts), ...withDefaults.ids });
  const defaultDate = getDefaultDate({
    defaultPlaceholder: withDefaults.defaultPlaceholder,
    defaultValue: withDefaults.defaultValue
  });
  const formatter = createFormatter(withDefaults.locale);
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults.onValueChange);
  const placeholderWritable = withDefaults.placeholder ?? writable(withDefaults.defaultPlaceholder ?? defaultDate);
  const placeholder = dateStore(overridable(placeholderWritable, withDefaults.onPlaceholderChange), withDefaults.defaultPlaceholder ?? defaultDate);
  const months = withGet(writable(createMonths({
    dateObj: placeholder.get(),
    weekStartsOn: withDefaults.weekStartsOn,
    locale: withDefaults.locale,
    fixedWeeks: withDefaults.fixedWeeks,
    numberOfMonths: withDefaults.numberOfMonths
  })));
  const visibleMonths = withGet.derived([months], ([$months]) => {
    return $months.map((month) => {
      return month.value;
    });
  });
  const isOutsideVisibleMonths = derived([visibleMonths], ([$visibleMonths]) => {
    return (date) => {
      return !$visibleMonths.some((month) => isSameMonth(date, month));
    };
  });
  const isNextButtonDisabled = withGet.derived([months, maxValue, disabled], ([$months, $maxValue, $disabled]) => {
    if (!$maxValue || !$months.length)
      return false;
    if ($disabled)
      return true;
    const lastMonthInView = $months[$months.length - 1].value;
    const firstMonthOfNextPage = lastMonthInView.add({ months: 1 }).set({ day: 1 });
    return isAfter(firstMonthOfNextPage, $maxValue);
  });
  const isPrevButtonDisabled = withGet.derived([months, minValue, disabled], ([$months, $minValue, $disabled]) => {
    if (!$minValue || !$months.length)
      return false;
    if ($disabled)
      return true;
    const firstMonthInView = $months[0].value;
    const lastMonthOfPrevPage = firstMonthInView.subtract({ months: 1 }).set({ day: 35 });
    return isBefore(lastMonthOfPrevPage, $minValue);
  });
  const isDateDisabled = withGet.derived([options.isDateDisabled, minValue, maxValue, disabled], ([$isDateDisabled, $minValue, $maxValue, $disabled]) => {
    return (date) => {
      if (($isDateDisabled == null ? void 0 : $isDateDisabled(date)) || $disabled)
        return true;
      if ($minValue && isBefore(date, $minValue))
        return true;
      if ($maxValue && isBefore($maxValue, date))
        return true;
      return false;
    };
  });
  const isDateSelected = derived([value], ([$value]) => {
    return (date) => {
      if (Array.isArray($value)) {
        return $value.some((d2) => isSameDay(d2, date));
      } else if (!$value) {
        return false;
      } else {
        return isSameDay($value, date);
      }
    };
  });
  const isInvalid = derived([value, isDateDisabled, options.isDateUnavailable], ([$value, $isDateDisabled, $isDateUnavailable]) => {
    if (Array.isArray($value)) {
      if (!$value.length)
        return false;
      for (const date of $value) {
        if ($isDateDisabled == null ? void 0 : $isDateDisabled(date))
          return true;
        if ($isDateUnavailable == null ? void 0 : $isDateUnavailable(date))
          return true;
      }
    } else {
      if (!$value)
        return false;
      if ($isDateDisabled == null ? void 0 : $isDateDisabled($value))
        return true;
      if ($isDateUnavailable == null ? void 0 : $isDateUnavailable($value))
        return true;
    }
    return false;
  });
  let announcer = getAnnouncer();
  const headingValue = withGet.derived([months, locale], ([$months, $locale]) => {
    if (!$months.length)
      return "";
    if ($locale !== formatter.getLocale()) {
      formatter.setLocale($locale);
    }
    if ($months.length === 1) {
      const month = $months[0].value;
      return `${formatter.fullMonthAndYear(toDate(month))}`;
    }
    const startMonth = toDate($months[0].value);
    const endMonth = toDate($months[$months.length - 1].value);
    const startMonthName = formatter.fullMonth(startMonth);
    const endMonthName = formatter.fullMonth(endMonth);
    const startMonthYear = formatter.fullYear(startMonth);
    const endMonthYear = formatter.fullYear(endMonth);
    const content = startMonthYear === endMonthYear ? `${startMonthName} - ${endMonthName} ${endMonthYear}` : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
    return content;
  });
  const fullCalendarLabel = withGet.derived([headingValue, calendarLabel], ([$headingValue, $calendarLabel]) => {
    return `${$calendarLabel}, ${$headingValue}`;
  });
  const calendar = makeElement(name$3(), {
    stores: [fullCalendarLabel, isInvalid, disabled, readonly2, ids.calendar],
    returned: ([$fullCalendarLabel, $isInvalid, $disabled, $readonly, $calendarId]) => {
      return {
        id: $calendarId,
        role: "application",
        "aria-label": $fullCalendarLabel,
        "data-invalid": $isInvalid ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0,
        "data-readonly": $readonly ? "" : void 0
      };
    },
    action: (node) => {
      createAccessibleHeading(node, fullCalendarLabel.get());
      announcer = getAnnouncer();
      const unsubKb = addMeltEventListener(node, "keydown", handleCalendarKeydown);
      return {
        destroy() {
          unsubKb();
        }
      };
    }
  });
  const heading = makeElement(name$3("heading"), {
    stores: [disabled],
    returned: ([$disabled]) => {
      return {
        "aria-hidden": true,
        "data-disabled": $disabled ? "" : void 0
      };
    }
  });
  const grid = makeElement(name$3("grid"), {
    stores: [readonly2, disabled],
    returned: ([$readonly, $disabled]) => {
      return {
        tabindex: -1,
        role: "grid",
        "aria-readonly": $readonly ? "true" : void 0,
        "aria-disabled": $disabled ? "true" : void 0,
        "data-readonly": $readonly ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0
      };
    }
  });
  const prevButton = makeElement(name$3("prevButton"), {
    stores: [isPrevButtonDisabled],
    returned: ([$isPrevButtonDisabled]) => {
      const disabled2 = $isPrevButtonDisabled;
      return {
        role: "button",
        type: "button",
        "aria-label": "Previous",
        "aria-disabled": disabled2 ? "true" : void 0,
        "data-disabled": disabled2 ? "" : void 0,
        disabled: disabled2 ? true : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks$1(addMeltEventListener(node, "click", () => {
        if (isPrevButtonDisabled.get())
          return;
        prevPage();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const nextButton = makeElement(name$3("nextButton"), {
    stores: [isNextButtonDisabled],
    returned: ([$isNextButtonDisabled]) => {
      const disabled2 = $isNextButtonDisabled;
      return {
        role: "button",
        type: "button",
        "aria-label": "Next",
        "aria-disabled": disabled2 ? "true" : void 0,
        "data-disabled": disabled2 ? "" : void 0,
        disabled: disabled2 ? true : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks$1(addMeltEventListener(node, "click", () => {
        if (isNextButtonDisabled.get())
          return;
        nextPage();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const cell = makeElement(name$3("cell"), {
    stores: [
      isDateSelected,
      isDateDisabled,
      isDateUnavailable,
      isOutsideVisibleMonths,
      placeholder
    ],
    returned: ([$isDateSelected, $isDateDisabled, $isDateUnavailable, $isOutsideVisibleMonths, $placeholder]) => {
      return (cellValue, monthValue) => {
        const cellDate = toDate(cellValue);
        const isDisabled = $isDateDisabled == null ? void 0 : $isDateDisabled(cellValue);
        const isUnavailable = $isDateUnavailable == null ? void 0 : $isDateUnavailable(cellValue);
        const isDateToday = isToday(cellValue, getLocalTimeZone());
        const isOutsideMonth = !isSameMonth(cellValue, monthValue);
        const isOutsideVisibleMonths2 = $isOutsideVisibleMonths(cellValue);
        const isFocusedDate = isSameDay(cellValue, $placeholder);
        const isSelectedDate = $isDateSelected(cellValue);
        const labelText = formatter.custom(cellDate, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        });
        return {
          role: "button",
          "aria-label": labelText,
          "aria-selected": isSelectedDate ? true : void 0,
          "aria-disabled": isOutsideMonth || isDisabled || isUnavailable ? true : void 0,
          "data-selected": isSelectedDate ? true : void 0,
          "data-value": cellValue.toString(),
          "data-disabled": isDisabled || isOutsideMonth ? "" : void 0,
          "data-unavailable": isUnavailable ? "" : void 0,
          "data-today": isDateToday ? "" : void 0,
          "data-outside-month": isOutsideMonth ? "" : void 0,
          "data-outside-visible-months": isOutsideVisibleMonths2 ? "" : void 0,
          "data-focused": isFocusedDate ? "" : void 0,
          tabindex: isFocusedDate ? 0 : isOutsideMonth || isDisabled ? void 0 : -1
        };
      };
    },
    action: (node) => {
      const getElArgs = () => {
        const value2 = node.getAttribute("data-value");
        const label = node.getAttribute("data-label");
        const disabled2 = node.hasAttribute("data-disabled");
        return {
          value: value2,
          label: label ?? node.textContent ?? null,
          disabled: disabled2 ? true : false
        };
      };
      const unsub = executeCallbacks$1(addMeltEventListener(node, "click", () => {
        const args = getElArgs();
        if (args.disabled)
          return;
        if (!args.value)
          return;
        handleCellClick(parseStringToDateValue(args.value, placeholder.get()));
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect$1([locale], ([$locale]) => {
    if (formatter.getLocale() === $locale)
      return;
    formatter.setLocale($locale);
  });
  effect$1([placeholder], ([$placeholder]) => {
    if (!isBrowser$3 || !$placeholder)
      return;
    const $visibleMonths = visibleMonths.get();
    if ($visibleMonths.some((month) => isSameMonth(month, $placeholder))) {
      return;
    }
    const $weekStartsOn = weekStartsOn.get();
    const $locale = locale.get();
    const $fixedWeeks = fixedWeeks.get();
    const $numberOfMonths = numberOfMonths.get();
    const defaultMonthProps = {
      weekStartsOn: $weekStartsOn,
      locale: $locale,
      fixedWeeks: $fixedWeeks,
      numberOfMonths: $numberOfMonths
    };
    months.set(createMonths({
      ...defaultMonthProps,
      dateObj: $placeholder
    }));
  });
  effect$1([weekStartsOn, locale, fixedWeeks, numberOfMonths], ([$weekStartsOn, $locale, $fixedWeeks, $numberOfMonths]) => {
    const $placeholder = placeholder.get();
    if (!isBrowser$3 || !$placeholder)
      return;
    const defaultMonthProps = {
      weekStartsOn: $weekStartsOn,
      locale: $locale,
      fixedWeeks: $fixedWeeks,
      numberOfMonths: $numberOfMonths
    };
    months.set(createMonths({
      ...defaultMonthProps,
      dateObj: $placeholder
    }));
  });
  effect$1([fullCalendarLabel], ([$fullCalendarLabel]) => {
    if (!isBrowser$3)
      return;
    const node = document.getElementById(ids.accessibleHeading.get());
    if (!isHTMLElement(node))
      return;
    node.textContent = $fullCalendarLabel;
  });
  effect$1([value], ([$value]) => {
    if (Array.isArray($value) && $value.length) {
      const lastValue = $value[$value.length - 1];
      if (lastValue && placeholder.get() !== lastValue) {
        placeholder.set(lastValue);
      }
    } else if (!Array.isArray($value) && $value && placeholder.get() !== $value) {
      placeholder.set($value);
    }
  });
  const weekdays = derived([months, weekdayFormat, locale], ([$months, $weekdayFormat, _2]) => {
    if (!$months.length)
      return [];
    return $months[0].weeks[0].map((date) => {
      return formatter.dayOfWeek(toDate(date), $weekdayFormat);
    });
  });
  function createAccessibleHeading(node, label) {
    if (!isBrowser$3)
      return;
    const div = document.createElement("div");
    div.style.cssText = styleToString$3({
      border: "0px",
      clip: "rect(0px, 0px, 0px, 0px)",
      "clip-path": "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0px",
      position: "absolute",
      "white-space": "nowrap",
      width: "1px"
    });
    const h2 = document.createElement("div");
    h2.textContent = label;
    h2.id = ids.accessibleHeading.get();
    h2.role = "heading";
    h2.ariaLevel = "2";
    node.insertBefore(div, node.firstChild);
    div.appendChild(h2);
  }
  function nextPage() {
    const $months = months.get();
    const $numberOfMonths = numberOfMonths.get();
    if (pagedNavigation.get()) {
      const firstMonth = $months[0].value;
      placeholder.set(firstMonth.add({ months: $numberOfMonths }));
    } else {
      const firstMonth = $months[0].value;
      const newMonths = createMonths({
        dateObj: firstMonth.add({ months: 1 }),
        weekStartsOn: weekStartsOn.get(),
        locale: locale.get(),
        fixedWeeks: fixedWeeks.get(),
        numberOfMonths: $numberOfMonths
      });
      months.set(newMonths);
      placeholder.set(newMonths[0].value.set({ day: 1 }));
    }
  }
  function prevPage() {
    const $months = months.get();
    const $numberOfMonths = numberOfMonths.get();
    if (pagedNavigation.get()) {
      const firstMonth = $months[0].value;
      placeholder.set(firstMonth.subtract({ months: $numberOfMonths }));
    } else {
      const firstMonth = $months[0].value;
      const newMonths = createMonths({
        dateObj: firstMonth.subtract({ months: 1 }),
        weekStartsOn: weekStartsOn.get(),
        locale: locale.get(),
        fixedWeeks: fixedWeeks.get(),
        numberOfMonths: $numberOfMonths
      });
      months.set(newMonths);
      placeholder.set(newMonths[0].value.set({ day: 1 }));
    }
  }
  function nextYear() {
    placeholder.add({ years: 1 });
  }
  function prevYear() {
    placeholder.subtract({ years: 1 });
  }
  const ARROW_KEYS = [kbd$2.ARROW_DOWN, kbd$2.ARROW_UP, kbd$2.ARROW_LEFT, kbd$2.ARROW_RIGHT];
  function setYear(year) {
    placeholder.setDate({ year });
  }
  function setMonth(month) {
    placeholder.setDate({ month });
  }
  function handleCellClick(date) {
    const $readonly = readonly2.get();
    if ($readonly)
      return;
    const $isDateDisabled = isDateDisabled.get();
    const $isUnavailable = options.isDateUnavailable.get();
    if (($isDateDisabled == null ? void 0 : $isDateDisabled(date)) || ($isUnavailable == null ? void 0 : $isUnavailable(date)))
      return;
    value.update((prev2) => {
      const $multiple = multiple.get();
      if ($multiple) {
        return handleMultipleUpdate(prev2, date);
      } else {
        const next2 = handleSingleUpdate(prev2, date);
        if (!next2) {
          announcer.announce("Selected date is now empty.", "polite", 5e3);
        } else {
          announcer.announce(`Selected Date: ${formatter.selectedDate(next2, false)}`, "polite");
        }
        return next2;
      }
    });
  }
  function handleSingleUpdate(prev2, date) {
    if (Array.isArray(prev2))
      throw new Error("Invalid value for multiple prop.");
    if (!prev2)
      return date;
    const $preventDeselect = preventDeselect.get();
    if (!$preventDeselect && isSameDay(prev2, date)) {
      placeholder.set(date);
      return void 0;
    }
    return date;
  }
  function handleMultipleUpdate(prev2, date) {
    if (!prev2)
      return [date];
    if (!Array.isArray(prev2))
      throw new Error("Invalid value for multiple prop.");
    const index = prev2.findIndex((d2) => isSameDay(d2, date));
    const $preventDeselect = preventDeselect.get();
    if (index === -1) {
      return [...prev2, date];
    } else if ($preventDeselect) {
      return prev2;
    } else {
      const next2 = prev2.filter((d2) => !isSameDay(d2, date));
      if (!next2.length) {
        placeholder.set(date);
        return void 0;
      }
      return next2;
    }
  }
  const SELECT_KEYS = [kbd$2.ENTER, kbd$2.SPACE];
  function handleCalendarKeydown(e) {
    const currentCell = e.target;
    if (!isCalendarCell(currentCell))
      return;
    if (!ARROW_KEYS.includes(e.key) && !SELECT_KEYS.includes(e.key))
      return;
    e.preventDefault();
    if (e.key === kbd$2.ARROW_DOWN) {
      shiftFocus(currentCell, 7);
    }
    if (e.key === kbd$2.ARROW_UP) {
      shiftFocus(currentCell, -7);
    }
    if (e.key === kbd$2.ARROW_LEFT) {
      shiftFocus(currentCell, -1);
    }
    if (e.key === kbd$2.ARROW_RIGHT) {
      shiftFocus(currentCell, 1);
    }
    if (e.key === kbd$2.SPACE || e.key === kbd$2.ENTER) {
      const cellValue = currentCell.getAttribute("data-value");
      if (!cellValue)
        return;
      handleCellClick(parseStringToDateValue(cellValue, placeholder.get()));
    }
  }
  function shiftFocus(node, add) {
    const candidateCells = getSelectableCells(ids.calendar.get());
    if (!candidateCells.length)
      return;
    const index = candidateCells.indexOf(node);
    const nextIndex = index + add;
    if (isValidIndex(nextIndex, candidateCells)) {
      const nextCell = candidateCells[nextIndex];
      setPlaceholderToNodeValue(nextCell, placeholder);
      return nextCell.focus();
    }
    if (nextIndex < 0) {
      if (isPrevButtonDisabled.get())
        return;
      const $months = months.get();
      const firstMonth = $months[0].value;
      const $numberOfMonths = numberOfMonths.get();
      placeholder.set(firstMonth.subtract({ months: $numberOfMonths }));
      tick$1().then(() => {
        const newCandidateCells = getSelectableCells(ids.calendar.get());
        if (!newCandidateCells.length) {
          return;
        }
        const newIndex = newCandidateCells.length - Math.abs(nextIndex);
        if (isValidIndex(newIndex, newCandidateCells)) {
          const newCell = newCandidateCells[newIndex];
          setPlaceholderToNodeValue(newCell, placeholder);
          return newCell.focus();
        }
      });
    }
    if (nextIndex >= candidateCells.length) {
      if (isNextButtonDisabled.get())
        return;
      const $months = months.get();
      const firstMonth = $months[0].value;
      const $numberOfMonths = numberOfMonths.get();
      placeholder.set(firstMonth.add({ months: $numberOfMonths }));
      tick$1().then(() => {
        const newCandidateCells = getSelectableCells(ids.calendar.get());
        if (!newCandidateCells.length) {
          return;
        }
        const newIndex = nextIndex - candidateCells.length;
        if (isValidIndex(newIndex, newCandidateCells)) {
          const nextCell = newCandidateCells[newIndex];
          return nextCell.focus();
        }
      });
    }
  }
  const _isDateDisabled = derived([isDateDisabled, placeholder, minValue, maxValue, disabled], ([$isDateDisabled, $placeholder, $minValue, $maxValue, $disabled]) => {
    return (date) => {
      if (($isDateDisabled == null ? void 0 : $isDateDisabled(date)) || $disabled)
        return true;
      if ($minValue && isBefore(date, $minValue))
        return true;
      if ($maxValue && isAfter(date, $maxValue))
        return true;
      if (!isSameMonth(date, $placeholder))
        return true;
      return false;
    };
  });
  const _isDateUnavailable = derived(isDateUnavailable, ($isDateUnavailable) => {
    return (date) => $isDateUnavailable == null ? void 0 : $isDateUnavailable(date);
  });
  return {
    elements: {
      calendar,
      heading,
      grid,
      cell,
      nextButton,
      prevButton
    },
    states: {
      placeholder: placeholder.toWritable(),
      months,
      value,
      weekdays,
      headingValue
    },
    helpers: {
      nextPage,
      prevPage,
      nextYear,
      prevYear,
      setYear,
      setMonth,
      isDateDisabled: _isDateDisabled,
      isDateSelected,
      isDateUnavailable: _isDateUnavailable
    },
    options,
    ids
  };
}
({
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  positioning: {
    placement: "bottom"
  },
  closeOnEscape: true,
  closeOnOutsideClick: true,
  onOutsideClick: void 0,
  preventScroll: false,
  forceVisible: false,
  locale: "en",
  granularity: void 0,
  disabled: false,
  readonly: false,
  minValue: void 0,
  maxValue: void 0,
  weekdayFormat: "narrow",
  ...omit$1(defaults$4, "isDateDisabled", "isDateUnavailable", "value", "locale", "disabled", "readonly", "minValue", "maxValue", "weekdayFormat")
});
const { name: name$2 } = createElHelpers("dialog");
const defaults$3 = {
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  role: "dialog",
  defaultOpen: false,
  portal: void 0,
  forceVisible: false,
  openFocus: void 0,
  closeFocus: void 0,
  onOutsideClick: void 0
};
const dialogIdParts = ["content", "title", "description"];
function createDialog(props) {
  const withDefaults = { ...defaults$3, ...props };
  const options = toWritableStores$1(omit$1(withDefaults, "ids"));
  const { preventScroll, closeOnEscape, closeOnOutsideClick, role, portal, forceVisible, openFocus, closeFocus, onOutsideClick } = options;
  const activeTrigger = withGet.writable(null);
  const ids = toWritableStores$1({
    ...generateIds(dialogIdParts),
    ...withDefaults.ids
  });
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults == null ? void 0 : withDefaults.onOpenChange);
  const isVisible = derived([open, forceVisible], ([$open, $forceVisible]) => {
    return $open || $forceVisible;
  });
  let unsubScroll = noop;
  function handleOpen(e) {
    const el = e.currentTarget;
    const triggerEl = e.currentTarget;
    if (!isHTMLElement(el) || !isHTMLElement(triggerEl))
      return;
    open.set(true);
    activeTrigger.set(triggerEl);
  }
  function handleClose() {
    open.set(false);
    handleFocus({
      prop: closeFocus.get(),
      defaultEl: activeTrigger.get()
    });
  }
  const trigger = makeElement(name$2("trigger"), {
    stores: [open],
    returned: ([$open]) => {
      return {
        "aria-haspopup": "dialog",
        "aria-expanded": $open,
        type: "button"
      };
    },
    action: (node) => {
      const unsub = executeCallbacks$1(addMeltEventListener(node, "click", (e) => {
        handleOpen(e);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd$2.ENTER && e.key !== kbd$2.SPACE)
          return;
        e.preventDefault();
        handleOpen(e);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const overlay = makeElement(name$2("overlay"), {
    stores: [isVisible, open],
    returned: ([$isVisible, $open]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString$3({
          display: $isVisible ? void 0 : "none"
        }),
        "aria-hidden": true,
        "data-state": $open ? "open" : "closed"
      };
    },
    action: (node) => {
      let unsubEscapeKeydown = noop;
      if (closeOnEscape.get()) {
        const escapeKeydown = useEscapeKeydown(node, {
          handler: () => {
            handleClose();
          }
        });
        if (escapeKeydown && escapeKeydown.destroy) {
          unsubEscapeKeydown = escapeKeydown.destroy;
        }
      }
      return {
        destroy() {
          unsubEscapeKeydown();
        }
      };
    }
  });
  const content = makeElement(name$2("content"), {
    stores: [isVisible, ids.content, ids.description, ids.title, open],
    returned: ([$isVisible, $contentId, $descriptionId, $titleId, $open]) => {
      return {
        id: $contentId,
        role: role.get(),
        "aria-describedby": $descriptionId,
        "aria-labelledby": $titleId,
        "aria-modal": $isVisible ? "true" : void 0,
        "data-state": $open ? "open" : "closed",
        tabindex: -1,
        hidden: $isVisible ? void 0 : true,
        style: styleToString$3({
          display: $isVisible ? void 0 : "none"
        })
      };
    },
    action: (node) => {
      let activate = noop;
      let deactivate = noop;
      const destroy = executeCallbacks$1(effect$1([open, closeOnOutsideClick, closeOnEscape], ([$open, $closeOnOutsideClick, $closeOnEscape]) => {
        if (!$open)
          return;
        const focusTrap = createFocusTrap({
          immediate: false,
          escapeDeactivates: $closeOnEscape,
          clickOutsideDeactivates: $closeOnOutsideClick,
          allowOutsideClick: true,
          returnFocusOnDeactivate: false,
          fallbackFocus: node
        });
        activate = focusTrap.activate;
        deactivate = focusTrap.deactivate;
        const ac = focusTrap.useFocusTrap(node);
        if (ac && ac.destroy) {
          return ac.destroy;
        } else {
          return focusTrap.deactivate;
        }
      }), effect$1([closeOnOutsideClick, open], ([$closeOnOutsideClick, $open]) => {
        return useModal(node, {
          open: $open,
          closeOnInteractOutside: $closeOnOutsideClick,
          onClose() {
            handleClose();
          },
          shouldCloseOnInteractOutside(e) {
            var _a;
            (_a = onOutsideClick.get()) == null ? void 0 : _a(e);
            if (e.defaultPrevented)
              return false;
            return true;
          }
        }).destroy;
      }), effect$1([closeOnEscape], ([$closeOnEscape]) => {
        if (!$closeOnEscape)
          return noop;
        return useEscapeKeydown(node, { handler: handleClose }).destroy;
      }), effect$1([isVisible], ([$isVisible]) => {
        tick$1().then(() => {
          if (!$isVisible) {
            deactivate();
          } else {
            activate();
          }
        });
      }));
      return {
        destroy: () => {
          unsubScroll();
          destroy();
        }
      };
    }
  });
  const portalled = makeElement(name$2("portalled"), {
    stores: portal,
    returned: ($portal) => ({
      "data-portal": portalAttr($portal)
    }),
    action: (node) => {
      const unsubPortal = effect$1([portal], ([$portal]) => {
        if ($portal === null)
          return noop;
        const portalDestination = getPortalDestination(node, $portal);
        if (portalDestination === null)
          return noop;
        return usePortal(node, portalDestination).destroy;
      });
      return {
        destroy() {
          unsubPortal();
        }
      };
    }
  });
  const title = makeElement(name$2("title"), {
    stores: [ids.title],
    returned: ([$titleId]) => ({
      id: $titleId
    })
  });
  const description = makeElement(name$2("description"), {
    stores: [ids.description],
    returned: ([$descriptionId]) => ({
      id: $descriptionId
    })
  });
  const close = makeElement(name$2("close"), {
    returned: () => ({
      type: "button"
    }),
    action: (node) => {
      const unsub = executeCallbacks$1(addMeltEventListener(node, "click", () => {
        handleClose();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd$2.SPACE && e.key !== kbd$2.ENTER)
          return;
        e.preventDefault();
        handleClose();
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect$1([open, preventScroll], ([$open, $preventScroll]) => {
    if (!isBrowser$3)
      return;
    if ($preventScroll && $open)
      unsubScroll = removeScroll();
    if ($open) {
      const contentEl = document.getElementById(ids.content.get());
      handleFocus({ prop: openFocus.get(), defaultEl: contentEl });
    }
    return () => {
      if (!forceVisible.get()) {
        unsubScroll();
      }
    };
  });
  return {
    ids,
    elements: {
      content,
      trigger,
      title,
      description,
      overlay,
      close,
      portalled
    },
    states: {
      open
    },
    options
  };
}
const defaults$2 = {
  positioning: {
    placement: "bottom"
  },
  arrowSize: 8,
  defaultOpen: false,
  disableFocusTrap: false,
  closeOnEscape: true,
  preventScroll: false,
  onOpenChange: void 0,
  closeOnOutsideClick: true,
  portal: void 0,
  forceVisible: false,
  openFocus: void 0,
  closeFocus: void 0,
  onOutsideClick: void 0
};
const { name: name$1 } = createElHelpers("popover");
const popoverIdParts = ["trigger", "content"];
function createPopover(args) {
  const withDefaults = { ...defaults$2, ...args };
  const options = toWritableStores$1(omit$1(withDefaults, "open", "ids"));
  const { positioning, arrowSize, disableFocusTrap, preventScroll, closeOnEscape, closeOnOutsideClick, portal, forceVisible, openFocus, closeFocus, onOutsideClick } = options;
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults == null ? void 0 : withDefaults.onOpenChange);
  const activeTrigger = withGet.writable(null);
  const ids = toWritableStores$1({ ...generateIds(popoverIdParts), ...withDefaults.ids });
  safeOnMount(() => {
    activeTrigger.set(document.getElementById(ids.trigger.get()));
  });
  function handleClose() {
    open.set(false);
    const triggerEl = document.getElementById(ids.trigger.get());
    handleFocus({ prop: closeFocus.get(), defaultEl: triggerEl });
  }
  const isVisible = derivedVisible({ open, activeTrigger, forceVisible });
  const content = makeElement(name$1("content"), {
    stores: [isVisible, portal, ids.content],
    returned: ([$isVisible, $portal, $contentId]) => {
      return {
        hidden: $isVisible && isBrowser$3 ? void 0 : true,
        tabindex: -1,
        style: styleToString$3({
          display: $isVisible ? void 0 : "none"
        }),
        id: $contentId,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": portalAttr($portal)
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubDerived = effect$1([
        isVisible,
        activeTrigger,
        positioning,
        disableFocusTrap,
        closeOnEscape,
        closeOnOutsideClick,
        portal
      ], ([$isVisible, $activeTrigger, $positioning, $disableFocusTrap, $closeOnEscape, $closeOnOutsideClick, $portal]) => {
        unsubPopper();
        if (!$isVisible || !$activeTrigger)
          return;
        tick$1().then(() => {
          unsubPopper();
          unsubPopper = usePopper(node, {
            anchorElement: $activeTrigger,
            open,
            options: {
              floating: $positioning,
              focusTrap: $disableFocusTrap ? null : {
                returnFocusOnDeactivate: false,
                clickOutsideDeactivates: $closeOnOutsideClick,
                allowOutsideClick: true,
                escapeDeactivates: $closeOnEscape
              },
              modal: {
                shouldCloseOnInteractOutside,
                onClose: handleClose,
                open: $isVisible,
                closeOnInteractOutside: $closeOnOutsideClick
              },
              escapeKeydown: $closeOnEscape ? {
                handler: () => {
                  handleClose();
                }
              } : null,
              portal: getPortalDestination(node, $portal)
            }
          }).destroy;
        });
      });
      return {
        destroy() {
          unsubDerived();
          unsubPopper();
        }
      };
    }
  });
  function toggleOpen(triggerEl) {
    open.update((prev2) => {
      return !prev2;
    });
    if (triggerEl && triggerEl !== activeTrigger.get()) {
      activeTrigger.set(triggerEl);
    }
  }
  function shouldCloseOnInteractOutside(e) {
    var _a;
    (_a = onOutsideClick.get()) == null ? void 0 : _a(e);
    if (e.defaultPrevented)
      return false;
    const target = e.target;
    const triggerEl = document.getElementById(ids.trigger.get());
    if (triggerEl && isElement(target)) {
      if (target === triggerEl || triggerEl.contains(target))
        return false;
    }
    return true;
  }
  const trigger = makeElement(name$1("trigger"), {
    stores: [isVisible, ids.content, ids.trigger],
    returned: ([$isVisible, $contentId, $triggerId]) => {
      return {
        role: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": $isVisible ? "true" : "false",
        "data-state": stateAttr($isVisible),
        "aria-controls": $contentId,
        id: $triggerId
      };
    },
    action: (node) => {
      const unsub = executeCallbacks$1(addMeltEventListener(node, "click", () => {
        toggleOpen(node);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd$2.ENTER && e.key !== kbd$2.SPACE)
          return;
        e.preventDefault();
        toggleOpen(node);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const overlay = makeElement(name$1("overlay"), {
    stores: [isVisible],
    returned: ([$isVisible]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString$3({
          display: $isVisible ? void 0 : "none"
        }),
        "aria-hidden": "true",
        "data-state": stateAttr($isVisible)
      };
    },
    action: (node) => {
      let unsubEscapeKeydown = noop;
      let unsubDerived = noop;
      let unsubPortal = noop;
      if (closeOnEscape.get()) {
        const escapeKeydown = useEscapeKeydown(node, {
          handler: () => {
            handleClose();
          }
        });
        if (escapeKeydown && escapeKeydown.destroy) {
          unsubEscapeKeydown = escapeKeydown.destroy;
        }
      }
      unsubDerived = effect$1([portal], ([$portal]) => {
        unsubPortal();
        if ($portal === null)
          return;
        const portalDestination = getPortalDestination(node, $portal);
        if (portalDestination === null)
          return;
        unsubPortal = usePortal(node, portalDestination).destroy;
      });
      return {
        destroy() {
          unsubEscapeKeydown();
          unsubDerived();
          unsubPortal();
        }
      };
    }
  });
  const arrow2 = makeElement(name$1("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString$3({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  const close = makeElement(name$1("close"), {
    returned: () => ({
      type: "button"
    }),
    action: (node) => {
      const unsub = executeCallbacks$1(addMeltEventListener(node, "click", (e) => {
        if (e.defaultPrevented)
          return;
        handleClose();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.defaultPrevented)
          return;
        if (e.key !== kbd$2.ENTER && e.key !== kbd$2.SPACE)
          return;
        e.preventDefault();
        toggleOpen();
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect$1([open, activeTrigger, preventScroll], ([$open, $activeTrigger, $preventScroll]) => {
    if (!isBrowser$3)
      return;
    const unsubs = [];
    if ($open) {
      if (!$activeTrigger) {
        tick$1().then(() => {
          const triggerEl2 = document.getElementById(ids.trigger.get());
          if (!isHTMLElement(triggerEl2))
            return;
          activeTrigger.set(triggerEl2);
        });
      }
      if ($preventScroll) {
        unsubs.push(removeScroll());
      }
      const triggerEl = $activeTrigger ?? document.getElementById(ids.trigger.get());
      handleFocus({ prop: openFocus.get(), defaultEl: triggerEl });
    }
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  return {
    ids,
    elements: {
      trigger,
      content,
      arrow: arrow2,
      close,
      overlay
    },
    states: {
      open
    },
    options
  };
}
function stateAttr(open) {
  return open ? "open" : "closed";
}
const defaults$1 = {
  orientation: "horizontal",
  activateOnFocus: true,
  loop: true,
  autoSet: true
};
const { name, selector } = createElHelpers("tabs");
function createTabs(props) {
  const withDefaults = { ...defaults$1, ...props };
  const options = toWritableStores$1(omit$1(withDefaults, "defaultValue", "value", "onValueChange", "autoSet"));
  const { orientation, activateOnFocus, loop } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults == null ? void 0 : withDefaults.onValueChange);
  let ssrValue = withDefaults.defaultValue ?? value.get();
  const root = makeElement(name(), {
    stores: orientation,
    returned: ($orientation) => {
      return {
        "data-orientation": $orientation
      };
    }
  });
  const list = makeElement(name("list"), {
    stores: orientation,
    returned: ($orientation) => {
      return {
        role: "tablist",
        "aria-orientation": $orientation,
        "data-orientation": $orientation
      };
    }
  });
  const parseTriggerProps = (props2) => {
    if (typeof props2 === "string") {
      return { value: props2 };
    } else {
      return props2;
    }
  };
  const trigger = makeElement(name("trigger"), {
    stores: [value, orientation],
    returned: ([$value, $orientation]) => {
      return (props2) => {
        const { value: tabValue, disabled } = parseTriggerProps(props2);
        if (!$value && !ssrValue && withDefaults.autoSet) {
          ssrValue = tabValue;
          $value = tabValue;
          value.set(tabValue);
        }
        const sourceOfTruth = isBrowser$3 ? $value : ssrValue;
        const isActive = sourceOfTruth === tabValue;
        return {
          type: "button",
          role: "tab",
          "data-state": isActive ? "active" : "inactive",
          tabindex: isActive ? 0 : -1,
          "data-value": tabValue,
          "data-orientation": $orientation,
          "data-disabled": disabledAttr(disabled),
          disabled: disabledAttr(disabled)
        };
      };
    },
    action: (node) => {
      const unsub = executeCallbacks$1(addMeltEventListener(node, "focus", () => {
        const disabled = node.dataset.disabled === "true";
        const tabValue = node.dataset.value;
        if (activateOnFocus.get() && !disabled && tabValue !== void 0) {
          value.set(tabValue);
        }
      }), addMeltEventListener(node, "click", (e) => {
        node.focus();
        e.preventDefault();
        const disabled = node.dataset.disabled === "true";
        if (disabled)
          return;
        const tabValue = node.dataset.value;
        node.focus();
        if (tabValue !== void 0) {
          value.set(tabValue);
        }
      }), addMeltEventListener(node, "keydown", (e) => {
        const tabValue = node.dataset.value;
        if (!tabValue)
          return;
        const el = e.currentTarget;
        if (!isHTMLElement(el))
          return;
        const rootEl = el.closest(selector());
        if (!isHTMLElement(rootEl))
          return;
        const $loop = loop.get();
        const triggers = Array.from(rootEl.querySelectorAll('[role="tab"]')).filter((trigger2) => isHTMLElement(trigger2));
        const enabledTriggers = triggers.filter((el2) => !el2.hasAttribute("data-disabled"));
        const triggerIdx = enabledTriggers.findIndex((el2) => el2 === e.target);
        const dir = getElemDirection(rootEl);
        const { nextKey, prevKey } = getDirectionalKeys(dir, orientation.get());
        if (e.key === nextKey) {
          e.preventDefault();
          const nextEl = next(enabledTriggers, triggerIdx, $loop);
          nextEl.focus();
        } else if (e.key === prevKey) {
          e.preventDefault();
          const prevEl = prev(enabledTriggers, triggerIdx, $loop);
          prevEl.focus();
        } else if (e.key === kbd$2.ENTER || e.key === kbd$2.SPACE) {
          e.preventDefault();
          value.set(tabValue);
        } else if (e.key === kbd$2.HOME) {
          e.preventDefault();
          const firstTrigger = enabledTriggers[0];
          firstTrigger.focus();
        } else if (e.key === kbd$2.END) {
          e.preventDefault();
          const lastTrigger = last(enabledTriggers);
          lastTrigger.focus();
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const content = makeElement(name("content"), {
    stores: value,
    returned: ($value) => {
      return (tabValue) => {
        return {
          role: "tabpanel",
          // TODO: improve
          "aria-labelledby": tabValue,
          hidden: isBrowser$3 ? $value === tabValue ? void 0 : true : ssrValue === tabValue ? void 0 : true,
          tabindex: 0
        };
      };
    }
  });
  return {
    elements: {
      root,
      list,
      trigger,
      content
    },
    states: {
      value
    },
    options
  };
}
function createBitAttrs$1(bit, parts) {
  const attrs = {};
  parts.forEach((part) => {
    attrs[part] = {
      [`data-${bit}-${part}`]: ""
    };
  });
  return (part) => attrs[part];
}
function createDispatcher() {
  const dispatch = createEventDispatcher();
  return (e) => {
    const { originalEvent } = e.detail;
    const { cancelable } = e;
    const type = originalEvent.type;
    const shouldContinue = dispatch(type, { originalEvent, currentTarget: originalEvent.currentTarget }, { cancelable });
    if (!shouldContinue) {
      e.preventDefault();
    }
  };
}
function removeUndefined$1(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function getOptionUpdater(options) {
  return function(key, value) {
    if (value === void 0)
      return;
    const store2 = options[key];
    if (store2) {
      store2.set(value);
    }
  };
}
function getAccordionData() {
  const NAME2 = "accordion";
  const ITEM_NAME = "accordion-item";
  const PARTS2 = ["root", "content", "header", "item", "trigger"];
  return { NAME: NAME2, ITEM_NAME, PARTS: PARTS2 };
}
function setCtx$5(props) {
  const initAccordion = createAccordion(removeUndefined$1(props));
  const { NAME: NAME2, PARTS: PARTS2 } = getAccordionData();
  const getAttrs2 = createBitAttrs$1(NAME2, PARTS2);
  const accordion = {
    ...initAccordion,
    getAttrs: getAttrs2,
    updateOption: getOptionUpdater(initAccordion.options)
  };
  setContext(NAME2, accordion);
  return accordion;
}
function getCtx$6() {
  const { NAME: NAME2 } = getAccordionData();
  return getContext(NAME2);
}
function setItem(props) {
  const { ITEM_NAME } = getAccordionData();
  setContext(ITEM_NAME, { ...props });
  const ctx = getCtx$6();
  return { ...ctx, props };
}
function getItemProps() {
  const { ITEM_NAME } = getAccordionData();
  return getContext(ITEM_NAME);
}
function getContent() {
  const ctx = getCtx$6();
  const { value: props } = getItemProps();
  return {
    ...ctx,
    props
  };
}
function getTrigger() {
  const ctx = getCtx$6();
  const { value, disabled } = getItemProps();
  return {
    ...ctx,
    props: { value, disabled }
  };
}
function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((value, index) => value === arr2[index]);
}
const Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["multiple", "value", "onValueChange", "disabled", "asChild", "el"]);
  let $root, $$unsubscribe_root;
  let { multiple = false } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { disabled = false } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, states: { value: localValue }, updateOption, getAttrs: getAttrs2 } = setCtx$5({
    multiple,
    disabled,
    defaultValue: value,
    onValueChange: ({ next: next2 }) => {
      if (Array.isArray(next2)) {
        if (!Array.isArray(value) || !arraysAreEqual(value, next2)) {
          onValueChange == null ? void 0 : onValueChange(next2);
          value = next2;
          return next2;
        }
        return next2;
      }
      if (value !== next2) {
        onValueChange == null ? void 0 : onValueChange(next2);
        value = next2;
      }
      return next2;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  const attrs = getAttrs2("root");
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0) $$bindings.multiple(multiple);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0) $$bindings.onValueChange(onValueChange);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  value !== void 0 && localValue.set(Array.isArray(value) ? [...value] : value);
  {
    updateOption("multiple", multiple);
  }
  {
    updateOption("disabled", disabled);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Accordion_item$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["value", "disabled", "asChild", "el"]);
  let $item, $$unsubscribe_item;
  let { value } = $$props;
  let { disabled = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { item }, props, getAttrs: getAttrs2 } = setItem({ value, disabled });
  $$unsubscribe_item = subscribe(item, (value2) => $item = value2);
  const attrs = getAttrs2("item");
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $item(props);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_item();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Accordion_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["level", "asChild", "el"]);
  let $header, $$unsubscribe_header;
  let { level = 3 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { heading: header }, getAttrs: getAttrs2 } = getCtx$6();
  $$unsubscribe_header = subscribe(header, (value) => $header = value);
  const attrs = getAttrs2("header");
  if ($$props.level === void 0 && $$bindings.level && level !== void 0) $$bindings.level(level);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $header(level);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_header();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Accordion_trigger$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, props, getAttrs: getAttrs2 } = getTrigger();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs2("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $trigger(props);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Accordion_content$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "el"
  ]);
  let $content, $$unsubscribe_content;
  let $isSelected, $$unsubscribe_isSelected;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { content }, helpers: { isSelected }, props, getAttrs: getAttrs2 } = getContent();
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_isSelected = subscribe(isSelected, (value) => $isSelected = value);
  const attrs = getAttrs2("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $content(props);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_content();
  $$unsubscribe_isSelected();
  return `${asChild && $isSelected(props) ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $isSelected(props) ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $isSelected(props) ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $isSelected(props) ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $isSelected(props) ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$isSelected(props) ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Aspect_ratio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ratio", "el"]);
  let { ratio = 1 / 1 } = $$props;
  let { el = void 0 } = $$props;
  const attrs = { "data-aspect-ratio-root": "" };
  if ($$props.ratio === void 0 && $$bindings.ratio && ratio !== void 0) $$bindings.ratio(ratio);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  return `<div${add_styles({
    "position": `relative`,
    "width": `100%`,
    "padding-bottom": `${ratio ? 100 / ratio : 0}%`
  })}><div${spread([escape_object($$restProps), escape_object(attrs)], {
    styles: {
      "position": `absolute`,
      "top": `0`,
      "right": `0`,
      "bottom": `0`,
      "left": `0`
    }
  })}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
function getAttrs(builders) {
  const attrs = {};
  builders.forEach((builder) => {
    Object.keys(builder).forEach((key) => {
      if (key !== "action") {
        attrs[key] = builder[key];
      }
    });
  });
  return attrs;
}
const Button$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "type", "builders", "el"]);
  let { href = void 0 } = $$props;
  let { type = void 0 } = $$props;
  let { builders = [] } = $$props;
  let { el = void 0 } = $$props;
  const attrs = { "data-button-root": "" };
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0) $$bindings.builders(builders);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  return `${builders && builders.length ? ` ${((tag) => {
    return tag ? `<${href ? "a" : "button"}${spread(
      [
        {
          type: escape_attribute_value(href ? void 0 : type)
        },
        { href: escape_attribute_value(href) },
        { tabindex: "0" },
        escape_object(getAttrs(builders)),
        escape_object($$restProps),
        escape_object(attrs)
      ],
      {}
    )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "button")}` : ` ${((tag) => {
    return tag ? `<${href ? "a" : "button"}${spread(
      [
        {
          type: escape_attribute_value(href ? void 0 : type)
        },
        { href: escape_attribute_value(href) },
        { tabindex: "0" },
        escape_object($$restProps),
        escape_object(attrs)
      ],
      {}
    )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "button")}`}`;
});
function getCalendarData() {
  const NAME2 = "calendar";
  const PARTS2 = [
    "root",
    "prev-button",
    "next-button",
    "heading",
    "grid",
    "day",
    "header",
    "grid-head",
    "head-cell",
    "grid-body",
    "cell",
    "grid-row"
  ];
  return { NAME: NAME2, PARTS: PARTS2 };
}
function setCtx$4(props) {
  const { NAME: NAME2, PARTS: PARTS2 } = getCalendarData();
  const getCalendarAttrs = createBitAttrs$1(NAME2, PARTS2);
  const calendar = { ...createCalendar(removeUndefined$1(props)), getCalendarAttrs };
  setContext(NAME2, calendar);
  return {
    ...calendar,
    updateOption: getOptionUpdater(calendar.options)
  };
}
function getCtx$5() {
  const { NAME: NAME2 } = getCalendarData();
  const ctx = getContext(NAME2);
  return ctx;
}
const Calendar$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "placeholder",
    "onPlaceholderChange",
    "value",
    "onValueChange",
    "preventDeselect",
    "minValue",
    "maxValue",
    "pagedNavigation",
    "weekStartsOn",
    "locale",
    "isDateUnavailable",
    "isDateDisabled",
    "disabled",
    "readonly",
    "fixedWeeks",
    "calendarLabel",
    "weekdayFormat",
    "multiple",
    "asChild",
    "id",
    "numberOfMonths",
    "initialFocus",
    "el"
  ]);
  let $localMonths, $$unsubscribe_localMonths;
  let $calendar, $$unsubscribe_calendar;
  let $weekdays, $$unsubscribe_weekdays;
  let { placeholder = void 0 } = $$props;
  let { onPlaceholderChange = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { preventDeselect = void 0 } = $$props;
  let { minValue = void 0 } = $$props;
  let { maxValue = void 0 } = $$props;
  let { pagedNavigation = void 0 } = $$props;
  let { weekStartsOn = void 0 } = $$props;
  let { locale = void 0 } = $$props;
  let { isDateUnavailable = void 0 } = $$props;
  let { isDateDisabled = void 0 } = $$props;
  let { disabled = void 0 } = $$props;
  let { readonly: readonly2 = void 0 } = $$props;
  let { fixedWeeks = void 0 } = $$props;
  let { calendarLabel = void 0 } = $$props;
  let { weekdayFormat = void 0 } = $$props;
  let { multiple = false } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { numberOfMonths = void 0 } = $$props;
  let { initialFocus = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { calendar }, states: { value: localValue, placeholder: localPlaceholder, months: localMonths, weekdays }, updateOption, ids, getCalendarAttrs } = setCtx$4({
    defaultPlaceholder: placeholder,
    defaultValue: value,
    preventDeselect,
    minValue,
    maxValue,
    pagedNavigation,
    weekStartsOn,
    locale,
    isDateUnavailable,
    isDateDisabled,
    disabled,
    readonly: readonly2,
    fixedWeeks,
    calendarLabel,
    weekdayFormat,
    multiple,
    numberOfMonths,
    onPlaceholderChange: ({ next: next2 }) => {
      if (placeholder !== next2) {
        onPlaceholderChange == null ? void 0 : onPlaceholderChange(next2);
        placeholder = next2;
      }
      return next2;
    },
    onValueChange: ({ next: next2 }) => {
      if (Array.isArray(next2)) {
        if (!Array.isArray(value) || !arraysAreEqual(value, next2)) {
          onValueChange == null ? void 0 : onValueChange(next2);
          value = next2;
          return next2;
        }
        return next2;
      }
      if (value !== next2) {
        onValueChange == null ? void 0 : onValueChange(next2);
        value = next2;
      }
      return next2;
    }
  });
  $$unsubscribe_calendar = subscribe(calendar, (value2) => $calendar = value2);
  $$unsubscribe_localMonths = subscribe(localMonths, (value2) => $localMonths = value2);
  $$unsubscribe_weekdays = subscribe(weekdays, (value2) => $weekdays = value2);
  const attrs = getCalendarAttrs("root");
  createDispatcher();
  let months = $localMonths;
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.onPlaceholderChange === void 0 && $$bindings.onPlaceholderChange && onPlaceholderChange !== void 0) $$bindings.onPlaceholderChange(onPlaceholderChange);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0) $$bindings.onValueChange(onValueChange);
  if ($$props.preventDeselect === void 0 && $$bindings.preventDeselect && preventDeselect !== void 0) $$bindings.preventDeselect(preventDeselect);
  if ($$props.minValue === void 0 && $$bindings.minValue && minValue !== void 0) $$bindings.minValue(minValue);
  if ($$props.maxValue === void 0 && $$bindings.maxValue && maxValue !== void 0) $$bindings.maxValue(maxValue);
  if ($$props.pagedNavigation === void 0 && $$bindings.pagedNavigation && pagedNavigation !== void 0) $$bindings.pagedNavigation(pagedNavigation);
  if ($$props.weekStartsOn === void 0 && $$bindings.weekStartsOn && weekStartsOn !== void 0) $$bindings.weekStartsOn(weekStartsOn);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0) $$bindings.locale(locale);
  if ($$props.isDateUnavailable === void 0 && $$bindings.isDateUnavailable && isDateUnavailable !== void 0) $$bindings.isDateUnavailable(isDateUnavailable);
  if ($$props.isDateDisabled === void 0 && $$bindings.isDateDisabled && isDateDisabled !== void 0) $$bindings.isDateDisabled(isDateDisabled);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly2 !== void 0) $$bindings.readonly(readonly2);
  if ($$props.fixedWeeks === void 0 && $$bindings.fixedWeeks && fixedWeeks !== void 0) $$bindings.fixedWeeks(fixedWeeks);
  if ($$props.calendarLabel === void 0 && $$bindings.calendarLabel && calendarLabel !== void 0) $$bindings.calendarLabel(calendarLabel);
  if ($$props.weekdayFormat === void 0 && $$bindings.weekdayFormat && weekdayFormat !== void 0) $$bindings.weekdayFormat(weekdayFormat);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0) $$bindings.multiple(multiple);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.numberOfMonths === void 0 && $$bindings.numberOfMonths && numberOfMonths !== void 0) $$bindings.numberOfMonths(numberOfMonths);
  if ($$props.initialFocus === void 0 && $$bindings.initialFocus && initialFocus !== void 0) $$bindings.initialFocus(initialFocus);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.calendar.set(id);
    }
  }
  value !== void 0 && localValue.set(Array.isArray(value) ? [...value] : value);
  placeholder !== void 0 && localPlaceholder.set(placeholder);
  {
    updateOption("preventDeselect", preventDeselect);
  }
  {
    updateOption("minValue", minValue);
  }
  {
    updateOption("maxValue", maxValue);
  }
  {
    updateOption("pagedNavigation", pagedNavigation);
  }
  {
    updateOption("weekStartsOn", weekStartsOn);
  }
  {
    updateOption("locale", locale);
  }
  {
    updateOption("isDateUnavailable", isDateUnavailable);
  }
  {
    updateOption("isDateDisabled", isDateDisabled);
  }
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("readonly", readonly2);
  }
  {
    updateOption("fixedWeeks", fixedWeeks);
  }
  {
    updateOption("calendarLabel", calendarLabel);
  }
  {
    updateOption("weekdayFormat", weekdayFormat);
  }
  {
    updateOption("numberOfMonths", numberOfMonths);
  }
  builder = $calendar;
  {
    Object.assign(builder, attrs);
  }
  months = $localMonths;
  $$unsubscribe_localMonths();
  $$unsubscribe_calendar();
  $$unsubscribe_weekdays();
  return `${asChild ? `${slots.default ? slots.default({ months, weekdays: $weekdays, builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ months, weekdays: $weekdays, builder }) : ``}</div>`}`;
});
const Calendar_day$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let disabled;
  let unavailable;
  let selected;
  let $$restProps = compute_rest_props($$props, ["date", "month", "asChild", "el"]);
  let $isDateSelected, $$unsubscribe_isDateSelected;
  let $isDateUnavailable, $$unsubscribe_isDateUnavailable;
  let $isDateDisabled, $$unsubscribe_isDateDisabled;
  let $cell, $$unsubscribe_cell;
  let { date } = $$props;
  let { month } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { cell }, helpers: { isDateDisabled, isDateUnavailable, isDateSelected }, getCalendarAttrs } = getCtx$5();
  $$unsubscribe_cell = subscribe(cell, (value) => $cell = value);
  $$unsubscribe_isDateDisabled = subscribe(isDateDisabled, (value) => $isDateDisabled = value);
  $$unsubscribe_isDateUnavailable = subscribe(isDateUnavailable, (value) => $isDateUnavailable = value);
  $$unsubscribe_isDateSelected = subscribe(isDateSelected, (value) => $isDateSelected = value);
  const attrs = getCalendarAttrs("day");
  createDispatcher();
  if ($$props.date === void 0 && $$bindings.date && date !== void 0) $$bindings.date(date);
  if ($$props.month === void 0 && $$bindings.month && month !== void 0) $$bindings.month(month);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $cell(date, month);
  {
    Object.assign(builder, attrs);
  }
  disabled = $isDateDisabled(date);
  unavailable = $isDateUnavailable(date);
  selected = $isDateSelected(date);
  $$unsubscribe_isDateSelected();
  $$unsubscribe_isDateUnavailable();
  $$unsubscribe_isDateDisabled();
  $$unsubscribe_cell();
  return `${asChild ? `${slots.default ? slots.default({ builder, disabled, unavailable, selected }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder, disabled, unavailable, selected }) : ` ${escape(date.day)} `}</div>`}`;
});
const Calendar_grid$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $grid, $$unsubscribe_grid;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { grid }, getCalendarAttrs } = getCtx$5();
  $$unsubscribe_grid = subscribe(grid, (value) => $grid = value);
  const attrs = getCalendarAttrs("grid");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $grid;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_grid();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<table${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</table>`}`;
});
const Calendar_grid_body$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { getCalendarAttrs } = getCtx$5();
  const attrs = getCalendarAttrs("grid-body");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<tbody${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</tbody>`}`;
});
const Calendar_cell$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attrs;
  let $$restProps = compute_rest_props($$props, ["date", "asChild", "el"]);
  let $isDateDisabled, $$unsubscribe_isDateDisabled;
  let $isDateUnavailable, $$unsubscribe_isDateUnavailable;
  let { date } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { helpers: { isDateDisabled, isDateUnavailable }, getCalendarAttrs } = getCtx$5();
  $$unsubscribe_isDateDisabled = subscribe(isDateDisabled, (value) => $isDateDisabled = value);
  $$unsubscribe_isDateUnavailable = subscribe(isDateUnavailable, (value) => $isDateUnavailable = value);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0) $$bindings.date(date);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  attrs = {
    ...getCalendarAttrs("cell"),
    "aria-disabled": $isDateDisabled(date) || $isDateUnavailable(date),
    "data-disabled": $isDateDisabled(date) ? "" : void 0,
    role: "gridcell"
  };
  $$unsubscribe_isDateDisabled();
  $$unsubscribe_isDateUnavailable();
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<td${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</td>`}`;
});
const Calendar_grid_head$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { getCalendarAttrs } = getCtx$5();
  const attrs = {
    ...getCalendarAttrs("grid-head"),
    "aria-hidden": true
  };
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<thead${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</thead>`}`;
});
const Calendar_head_cell$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { getCalendarAttrs } = getCtx$5();
  const attrs = getCalendarAttrs("head-cell");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<th${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</th>`}`;
});
const Calendar_grid_row$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { getCalendarAttrs } = getCtx$5();
  const attrs = getCalendarAttrs("grid-row");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<tr${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</tr>`}`;
});
const Calendar_header$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { getCalendarAttrs } = getCtx$5();
  const attrs = getCalendarAttrs("header");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<header${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</header>`}`;
});
const Calendar_heading$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $heading, $$unsubscribe_heading;
  let $headingValue, $$unsubscribe_headingValue;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { heading }, states: { headingValue }, getCalendarAttrs } = getCtx$5();
  $$unsubscribe_heading = subscribe(heading, (value) => $heading = value);
  $$unsubscribe_headingValue = subscribe(headingValue, (value) => $headingValue = value);
  const attrs = getCalendarAttrs("heading");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $heading;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_heading();
  $$unsubscribe_headingValue();
  return `${asChild ? `${slots.default ? slots.default({ builder, headingValue: $headingValue }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder, headingValue: $headingValue }) : ` ${escape($headingValue)} `}</div>`}`;
});
const Calendar_next_button$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $nextButton, $$unsubscribe_nextButton;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { nextButton }, getCalendarAttrs } = getCtx$5();
  $$unsubscribe_nextButton = subscribe(nextButton, (value) => $nextButton = value);
  const attrs = getCalendarAttrs("next-button");
  createDispatcher();
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $nextButton;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_nextButton();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Calendar_prev_button$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $prevButton, $$unsubscribe_prevButton;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { prevButton }, getCalendarAttrs } = getCtx$5();
  $$unsubscribe_prevButton = subscribe(prevButton, (value) => $prevButton = value);
  const attrs = getCalendarAttrs("prev-button");
  createDispatcher();
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $prevButton;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_prevButton();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
function getCheckboxData() {
  const NAME2 = "checkbox";
  const PARTS2 = ["root", "input", "indicator"];
  return {
    NAME: NAME2,
    PARTS: PARTS2
  };
}
function setCtx$3(props) {
  const { NAME: NAME2, PARTS: PARTS2 } = getCheckboxData();
  const getAttrs2 = createBitAttrs$1(NAME2, PARTS2);
  const checkbox = { ...createCheckbox(removeUndefined$1(props)), getAttrs: getAttrs2 };
  setContext(NAME2, checkbox);
  return {
    ...checkbox,
    updateOption: getOptionUpdater(checkbox.options)
  };
}
function getCtx$4() {
  const { NAME: NAME2 } = getCheckboxData();
  return getContext(NAME2);
}
const Checkbox$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attrs;
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "checked",
    "disabled",
    "name",
    "required",
    "value",
    "onCheckedChange",
    "asChild",
    "el"
  ]);
  let $root, $$unsubscribe_root;
  let { checked = false } = $$props;
  let { disabled = void 0 } = $$props;
  let { name: name2 = void 0 } = $$props;
  let { required = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { onCheckedChange = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, states: { checked: localChecked }, updateOption, getAttrs: getAttrs2 } = setCtx$3({
    defaultChecked: checked,
    disabled,
    name: name2,
    required,
    value,
    onCheckedChange: ({ next: next2 }) => {
      if (checked !== next2) {
        onCheckedChange == null ? void 0 : onCheckedChange(next2);
        checked = next2;
      }
      return next2;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  createDispatcher();
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.name === void 0 && $$bindings.name && name2 !== void 0) $$bindings.name(name2);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.onCheckedChange === void 0 && $$bindings.onCheckedChange && onCheckedChange !== void 0) $$bindings.onCheckedChange(onCheckedChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  attrs = {
    ...getAttrs2("root"),
    disabled: disabled ? true : void 0
  };
  checked !== void 0 && localChecked.set(checked);
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("name", name2);
  }
  {
    updateOption("required", required);
  }
  {
    updateOption("value", value);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
function getStateAttr(state) {
  if (state === "indeterminate") return "indeterminate";
  if (state) return "checked";
  return "unchecked";
}
const Checkbox_indicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attrs;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $checked, $$unsubscribe_checked;
  let $isChecked, $$unsubscribe_isChecked;
  let $isIndeterminate, $$unsubscribe_isIndeterminate;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { helpers: { isChecked, isIndeterminate }, states: { checked }, getAttrs: getAttrs2 } = getCtx$4();
  $$unsubscribe_isChecked = subscribe(isChecked, (value) => $isChecked = value);
  $$unsubscribe_isIndeterminate = subscribe(isIndeterminate, (value) => $isIndeterminate = value);
  $$unsubscribe_checked = subscribe(checked, (value) => $checked = value);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  attrs = {
    ...getAttrs2("indicator"),
    "data-state": getStateAttr($checked)
  };
  $$unsubscribe_checked();
  $$unsubscribe_isChecked();
  $$unsubscribe_isIndeterminate();
  return `${asChild ? `${slots.default ? slots.default({
    attrs,
    isChecked: $isChecked,
    isIndeterminate: $isIndeterminate
  }) : ``}` : `<div${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({
    attrs,
    isChecked: $isChecked,
    isIndeterminate: $isIndeterminate
  }) : ``}</div>`}`;
});
function getPositioningUpdater(store2) {
  return (props = {}) => {
    return updatePositioning$1(store2, props);
  };
}
function updatePositioning$1(store2, props) {
  const defaultPositioningProps = {
    side: "bottom",
    align: "center",
    sideOffset: 0,
    alignOffset: 0,
    sameWidth: false,
    avoidCollisions: true,
    collisionPadding: 8,
    fitViewport: false,
    strategy: "absolute",
    overlap: false
  };
  const withDefaults = { ...defaultPositioningProps, ...props };
  store2.update((prev2) => {
    return {
      ...prev2,
      placement: joinPlacement(withDefaults.side, withDefaults.align),
      offset: {
        ...prev2.offset,
        mainAxis: withDefaults.sideOffset,
        crossAxis: withDefaults.alignOffset
      },
      gutter: 0,
      sameWidth: withDefaults.sameWidth,
      flip: withDefaults.avoidCollisions,
      overflowPadding: withDefaults.collisionPadding,
      boundary: withDefaults.collisionBoundary,
      fitViewport: withDefaults.fitViewport,
      strategy: withDefaults.strategy,
      overlap: withDefaults.overlap
    };
  });
}
function joinPlacement(side, align) {
  if (align === "center")
    return side;
  return `${side}-${align}`;
}
function getPopoverData() {
  const NAME2 = "popover";
  const PARTS2 = ["arrow", "close", "content", "trigger"];
  return {
    NAME: NAME2,
    PARTS: PARTS2
  };
}
function setCtx$2(props) {
  const { NAME: NAME2, PARTS: PARTS2 } = getPopoverData();
  const getAttrs2 = createBitAttrs$1(NAME2, PARTS2);
  const popover = {
    ...createPopover({
      positioning: {
        placement: "bottom",
        gutter: 0
      },
      ...removeUndefined$1(props),
      forceVisible: true
    }),
    getAttrs: getAttrs2
  };
  setContext(NAME2, popover);
  return {
    ...popover,
    updateOption: getOptionUpdater(popover.options)
  };
}
function getCtx$3() {
  const { NAME: NAME2 } = getPopoverData();
  return getContext(NAME2);
}
function updatePositioning(props) {
  const defaultPlacement = {
    side: "bottom",
    align: "center"
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx$3();
  const updater = getPositioningUpdater(positioning);
  updater(withDefaults);
}
function getDialogData() {
  const NAME2 = "dialog";
  const PARTS2 = [
    "close",
    "content",
    "description",
    "overlay",
    "portal",
    "title",
    "trigger"
  ];
  return {
    NAME: NAME2,
    PARTS: PARTS2
  };
}
function setCtx$1(props) {
  const { NAME: NAME2, PARTS: PARTS2 } = getDialogData();
  const getAttrs2 = createBitAttrs$1(NAME2, PARTS2);
  const dialog = {
    ...createDialog({ ...removeUndefined$1(props), role: "dialog", forceVisible: true }),
    getAttrs: getAttrs2
  };
  setContext(NAME2, dialog);
  return {
    ...dialog,
    updateOption: getOptionUpdater(dialog.options)
  };
}
function getCtx$2() {
  const { NAME: NAME2 } = getDialogData();
  return getContext(NAME2);
}
const Dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { preventScroll = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { closeOnOutsideClick = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { openFocus = void 0 } = $$props;
  let { closeFocus = void 0 } = $$props;
  let { onOutsideClick = void 0 } = $$props;
  const { states: { open: localOpen }, updateOption, ids } = setCtx$1({
    closeOnEscape,
    preventScroll,
    closeOnOutsideClick,
    portal,
    forceVisible: true,
    defaultOpen: open,
    openFocus,
    closeFocus,
    onOutsideClick,
    onOpenChange: ({ next: next2 }) => {
      if (open !== next2) {
        onOpenChange == null ? void 0 : onOpenChange(next2);
        open = next2;
      }
      return next2;
    }
  });
  const idValues = derived([ids.content, ids.description, ids.title], ([$contentId, $descriptionId, $titleId]) => ({
    content: $contentId,
    description: $descriptionId,
    title: $titleId
  }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.preventScroll === void 0 && $$bindings.preventScroll && preventScroll !== void 0) $$bindings.preventScroll(preventScroll);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0) $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0) $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0) $$bindings.portal(portal);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0) $$bindings.onOpenChange(onOpenChange);
  if ($$props.openFocus === void 0 && $$bindings.openFocus && openFocus !== void 0) $$bindings.openFocus(openFocus);
  if ($$props.closeFocus === void 0 && $$bindings.closeFocus && closeFocus !== void 0) $$bindings.closeFocus(closeFocus);
  if ($$props.onOutsideClick === void 0 && $$bindings.onOutsideClick && onOutsideClick !== void 0) $$bindings.onOutsideClick(onOutsideClick);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("preventScroll", preventScroll);
  }
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("closeOnOutsideClick", closeOnOutsideClick);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("openFocus", openFocus);
  }
  {
    updateOption("closeFocus", closeFocus);
  }
  {
    updateOption("onOutsideClick", onOutsideClick);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const Dialog_title$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["level", "asChild", "id", "el"]);
  let $title, $$unsubscribe_title;
  let { level = "h2" } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { title }, ids, getAttrs: getAttrs2 } = getCtx$2();
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  const attrs = getAttrs2("title");
  if ($$props.level === void 0 && $$bindings.level && level !== void 0) $$bindings.level(level);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.title.set(id);
    }
  }
  builder = $title;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_title();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `${((tag) => {
    return tag ? `<${level}${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({ builder }) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(level)}`}`;
});
const Dialog_close = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $close, $$unsubscribe_close;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { close }, getAttrs: getAttrs2 } = getCtx$2();
  $$unsubscribe_close = subscribe(close, (value) => $close = value);
  createDispatcher();
  const attrs = getAttrs2("close");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $close;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_close();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Dialog_portal$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $portalled, $$unsubscribe_portalled;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { portalled }, getAttrs: getAttrs2 } = getCtx$2();
  $$unsubscribe_portalled = subscribe(portalled, (value) => $portalled = value);
  const attrs = getAttrs2("portal");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $portalled;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_portalled();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Dialog_content$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "el"
  ]);
  let $content, $$unsubscribe_content;
  let $open, $$unsubscribe_open;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { content }, states: { open }, ids, getAttrs: getAttrs2 } = getCtx$2();
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  const attrs = getAttrs2("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.content.set(id);
    }
  }
  builder = $content;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_content();
  $$unsubscribe_open();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Dialog_overlay$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "el"
  ]);
  let $overlay, $$unsubscribe_overlay;
  let $open, $$unsubscribe_open;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { overlay }, states: { open }, getAttrs: getAttrs2 } = getCtx$2();
  $$unsubscribe_overlay = subscribe(overlay, (value) => $overlay = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  const attrs = getAttrs2("overlay");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $overlay;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_overlay();
  $$unsubscribe_open();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${inTransition && outTransition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${inTransition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${outTransition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${$open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : ``}`}`}`}`}`}`;
});
function getLabelData() {
  const NAME2 = "label";
  const PARTS2 = ["root"];
  const getAttrs2 = createBitAttrs$1(NAME2, PARTS2);
  return {
    NAME: NAME2,
    getAttrs: getAttrs2
  };
}
const Label$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $root, $$unsubscribe_root;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root } } = createLabel();
  $$unsubscribe_root = subscribe(root, (value) => $root = value);
  createDispatcher();
  const { getAttrs: getAttrs2 } = getLabelData();
  const attrs = getAttrs2("root");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<label${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</label>`}`;
});
const Popover = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { disableFocusTrap = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { closeOnOutsideClick = void 0 } = $$props;
  let { preventScroll = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { openFocus = void 0 } = $$props;
  let { closeFocus = void 0 } = $$props;
  let { onOutsideClick = void 0 } = $$props;
  const { updateOption, states: { open: localOpen }, ids } = setCtx$2({
    disableFocusTrap,
    closeOnEscape,
    closeOnOutsideClick,
    preventScroll,
    portal,
    defaultOpen: open,
    openFocus,
    closeFocus,
    onOutsideClick,
    onOpenChange: ({ next: next2 }) => {
      if (open !== next2) {
        onOpenChange == null ? void 0 : onOpenChange(next2);
        open = next2;
      }
      return next2;
    },
    positioning: { gutter: 0, offset: { mainAxis: 1 } }
  });
  const idValues = derived([ids.content, ids.trigger], ([$contentId, $triggerId]) => ({ content: $contentId, trigger: $triggerId }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.disableFocusTrap === void 0 && $$bindings.disableFocusTrap && disableFocusTrap !== void 0) $$bindings.disableFocusTrap(disableFocusTrap);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0) $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0) $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.preventScroll === void 0 && $$bindings.preventScroll && preventScroll !== void 0) $$bindings.preventScroll(preventScroll);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0) $$bindings.portal(portal);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0) $$bindings.onOpenChange(onOpenChange);
  if ($$props.openFocus === void 0 && $$bindings.openFocus && openFocus !== void 0) $$bindings.openFocus(openFocus);
  if ($$props.closeFocus === void 0 && $$bindings.closeFocus && closeFocus !== void 0) $$bindings.closeFocus(closeFocus);
  if ($$props.onOutsideClick === void 0 && $$bindings.onOutsideClick && onOutsideClick !== void 0) $$bindings.onOutsideClick(onOutsideClick);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("disableFocusTrap", disableFocusTrap);
  }
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("closeOnOutsideClick", closeOnOutsideClick);
  }
  {
    updateOption("preventScroll", preventScroll);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("openFocus", openFocus);
  }
  {
    updateOption("closeFocus", closeFocus);
  }
  {
    updateOption("onOutsideClick", onOutsideClick);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const Popover_content$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "sameWidth",
    "fitViewport",
    "strategy",
    "overlap",
    "el"
  ]);
  let $open, $$unsubscribe_open;
  let $content, $$unsubscribe_content;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { side = "bottom" } = $$props;
  let { align = "center" } = $$props;
  let { sideOffset = 0 } = $$props;
  let { alignOffset = 0 } = $$props;
  let { collisionPadding = 8 } = $$props;
  let { avoidCollisions = true } = $$props;
  let { collisionBoundary = void 0 } = $$props;
  let { sameWidth = false } = $$props;
  let { fitViewport = false } = $$props;
  let { strategy = "absolute" } = $$props;
  let { overlap = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { content }, states: { open }, ids, getAttrs: getAttrs2 } = getCtx$3();
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  const attrs = getAttrs2("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.side === void 0 && $$bindings.side && side !== void 0) $$bindings.side(side);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0) $$bindings.align(align);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0) $$bindings.sideOffset(sideOffset);
  if ($$props.alignOffset === void 0 && $$bindings.alignOffset && alignOffset !== void 0) $$bindings.alignOffset(alignOffset);
  if ($$props.collisionPadding === void 0 && $$bindings.collisionPadding && collisionPadding !== void 0) $$bindings.collisionPadding(collisionPadding);
  if ($$props.avoidCollisions === void 0 && $$bindings.avoidCollisions && avoidCollisions !== void 0) $$bindings.avoidCollisions(avoidCollisions);
  if ($$props.collisionBoundary === void 0 && $$bindings.collisionBoundary && collisionBoundary !== void 0) $$bindings.collisionBoundary(collisionBoundary);
  if ($$props.sameWidth === void 0 && $$bindings.sameWidth && sameWidth !== void 0) $$bindings.sameWidth(sameWidth);
  if ($$props.fitViewport === void 0 && $$bindings.fitViewport && fitViewport !== void 0) $$bindings.fitViewport(fitViewport);
  if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0) $$bindings.strategy(strategy);
  if ($$props.overlap === void 0 && $$bindings.overlap && overlap !== void 0) $$bindings.overlap(overlap);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.content.set(id);
    }
  }
  builder = $content;
  {
    Object.assign(builder, attrs);
  }
  {
    if ($open) {
      updatePositioning({
        side,
        align,
        sideOffset,
        alignOffset,
        collisionPadding,
        avoidCollisions,
        collisionBoundary,
        sameWidth,
        fitViewport,
        strategy,
        overlap
      });
    }
  }
  $$unsubscribe_open();
  $$unsubscribe_content();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Popover_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attrs;
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let $open, $$unsubscribe_open;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, states: { open }, ids, getAttrs: getAttrs2 } = getCtx$3();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  createDispatcher();
  const bitsAttrs = getAttrs2("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.trigger.set(id);
    }
  }
  attrs = {
    ...bitsAttrs,
    "aria-controls": $open ? ids.content : void 0
  };
  builder = $trigger;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_trigger();
  $$unsubscribe_open();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
function getTabsData() {
  const NAME2 = "tabs";
  const PARTS2 = ["root", "content", "list", "trigger"];
  return {
    NAME: NAME2,
    PARTS: PARTS2
  };
}
function setCtx(props) {
  const { NAME: NAME2, PARTS: PARTS2 } = getTabsData();
  const getAttrs2 = createBitAttrs$1(NAME2, PARTS2);
  const tabs = { ...createTabs(removeUndefined$1(props)), getAttrs: getAttrs2 };
  setContext(NAME2, tabs);
  return {
    ...tabs,
    updateOption: getOptionUpdater(tabs.options)
  };
}
function getCtx$1() {
  const { NAME: NAME2 } = getTabsData();
  return getContext(NAME2);
}
const Tabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "orientation",
    "activateOnFocus",
    "loop",
    "autoSet",
    "value",
    "onValueChange",
    "asChild",
    "el"
  ]);
  let $root, $$unsubscribe_root;
  let $localValue, $$unsubscribe_localValue;
  let { orientation = void 0 } = $$props;
  let { activateOnFocus = void 0 } = $$props;
  let { loop = void 0 } = $$props;
  let { autoSet = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, states: { value: localValue }, updateOption, getAttrs: getAttrs2 } = setCtx({
    orientation,
    activateOnFocus,
    loop,
    autoSet,
    defaultValue: value,
    onValueChange: ({ next: next2 }) => {
      if (value !== next2) {
        onValueChange == null ? void 0 : onValueChange(next2);
        value = next2;
      }
      return next2;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  $$unsubscribe_localValue = subscribe(localValue, (value2) => $localValue = value2);
  const attrs = getAttrs2("root");
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0) $$bindings.orientation(orientation);
  if ($$props.activateOnFocus === void 0 && $$bindings.activateOnFocus && activateOnFocus !== void 0) $$bindings.activateOnFocus(activateOnFocus);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0) $$bindings.loop(loop);
  if ($$props.autoSet === void 0 && $$bindings.autoSet && autoSet !== void 0) $$bindings.autoSet(autoSet);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0) $$bindings.onValueChange(onValueChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  value !== void 0 && localValue.set(value);
  {
    updateOption("orientation", orientation);
  }
  {
    updateOption("activateOnFocus", activateOnFocus);
  }
  {
    updateOption("loop", loop);
  }
  {
    updateOption("autoSet", autoSet);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  $$unsubscribe_localValue();
  return `${asChild ? `${slots.default ? slots.default({ builder, value: $localValue }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder, value: $localValue }) : ``}</div>`}`;
});
const Tabs_content$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["value", "asChild", "el"]);
  let $content, $$unsubscribe_content;
  let { value } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { content }, getAttrs: getAttrs2 } = getCtx$1();
  $$unsubscribe_content = subscribe(content, (value2) => $content = value2);
  const attrs = getAttrs2("content");
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $content(value);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_content();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Tabs_list$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $list, $$unsubscribe_list;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { list }, getAttrs: getAttrs2 } = getCtx$1();
  $$unsubscribe_list = subscribe(list, (value) => $list = value);
  const attrs = getAttrs2("list");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $list;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_list();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Tabs_trigger$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["value", "disabled", "asChild", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { value } = $$props;
  let { disabled = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, getAttrs: getAttrs2 } = getCtx$1();
  $$unsubscribe_trigger = subscribe(trigger, (value2) => $trigger = value2);
  createDispatcher();
  const attrs = getAttrs2("trigger");
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $trigger({ value, disabled });
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function slide(node, { delay = 0, duration = 400, easing = cubicOut, axis = "y" } = {}) {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const primary_property = axis === "y" ? "height" : "width";
  const primary_property_value = parseFloat(style[primary_property]);
  const secondary_properties = axis === "y" ? ["top", "bottom"] : ["left", "right"];
  const capitalized_secondary_properties = secondary_properties.map(
    (e) => `${e[0].toUpperCase()}${e.slice(1)}`
  );
  const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
  const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
  const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
  const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
  const border_width_start_value = parseFloat(
    style[`border${capitalized_secondary_properties[0]}Width`]
  );
  const border_width_end_value = parseFloat(
    style[`border${capitalized_secondary_properties[1]}Width`]
  );
  return {
    delay,
    duration,
    easing,
    css: (t) => `overflow: hidden;opacity: ${Math.min(t * 20, 1) * opacity};${primary_property}: ${t * primary_property_value}px;padding-${secondary_properties[0]}: ${t * padding_start_value}px;padding-${secondary_properties[1]}: ${t * padding_end_value}px;margin-${secondary_properties[0]}: ${t * margin_start_value}px;margin-${secondary_properties[1]}: ${t * margin_end_value}px;border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
  };
}
function cn$1(...inputs) {
  return twMerge(clsx(inputs));
}
const flyAndScale = (node, params = { y: -8, x: 0, start: 0.95, duration: 150 }) => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;
  const scaleConversion = (valueA, scaleA, scaleB) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;
    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;
    return valueB;
  };
  const styleToString2 = (style2) => {
    return Object.keys(style2).reduce((str, key) => {
      if (style2[key] === void 0) return str;
      return str + `${key}:${style2[key]};`;
    }, "");
  };
  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x2 = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);
      return styleToString2({
        transform: `${transform} translate3d(${x2}px, ${y}px, 0) scale(${scale})`,
        opacity: t
      });
    },
    easing: cubicOut
  };
};
const Accordion_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { transition = slide } = $$props;
  let { transitionConfig = { duration: 200 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Accordion_content$1, "AccordionPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn$1("overflow-hidden text-sm transition-all", className)
      },
      { transition },
      { transitionConfig },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `<div class="pb-4 pt-0">${slots.default ? slots.default({}) : ``}</div>`;
      }
    }
  )}`;
});
const Accordion_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  return `${validate_component(Accordion_item$1, "AccordionPrimitive.Item").$$render($$result, Object.assign({}, { value }, { class: cn$1("border-b", className) }, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
/**
 * @license lucide-svelte v0.399.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const Icon$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["name", "color", "size", "strokeWidth", "absoluteStrokeWidth", "iconNode"]);
  let { name: name2 = void 0 } = $$props;
  let { color = "currentColor" } = $$props;
  let { size: size2 = 24 } = $$props;
  let { strokeWidth = 2 } = $$props;
  let { absoluteStrokeWidth = false } = $$props;
  let { iconNode = [] } = $$props;
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  if ($$props.name === void 0 && $$bindings.name && name2 !== void 0) $$bindings.name(name2);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size2 !== void 0) $$bindings.size(size2);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  if ($$props.absoluteStrokeWidth === void 0 && $$bindings.absoluteStrokeWidth && absoluteStrokeWidth !== void 0) $$bindings.absoluteStrokeWidth(absoluteStrokeWidth);
  if ($$props.iconNode === void 0 && $$bindings.iconNode && iconNode !== void 0) $$bindings.iconNode(iconNode);
  return `<svg${spread(
    [
      escape_object(defaultAttributes),
      escape_object($$restProps),
      { width: escape_attribute_value(size2) },
      { height: escape_attribute_value(size2) },
      { stroke: escape_attribute_value(color) },
      {
        "stroke-width": escape_attribute_value(absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size2) : strokeWidth)
      },
      {
        class: escape_attribute_value(mergeClasses("lucide-icon", "lucide", name2 ? `lucide-${name2}` : "", $$props.class))
      }
    ],
    {}
  )}>${each(iconNode, ([tag, attrs]) => {
    return `${((tag$1) => {
      return tag$1 ? `<${tag}${spread([escape_object(attrs)], {})}>${is_void(tag$1) ? "" : ``}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)}`;
  })}${slots.default ? slots.default({}) : ``}</svg>`;
});
const Chevron_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "chevron-down" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Accordion_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "level"]);
  let { class: className = void 0 } = $$props;
  let { level = 3 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.level === void 0 && $$bindings.level && level !== void 0) $$bindings.level(level);
  return `${validate_component(Accordion_header, "AccordionPrimitive.Header").$$render($$result, { level, class: "flex" }, {}, {
    default: () => {
      return `${validate_component(Accordion_trigger$1, "AccordionPrimitive.Trigger").$$render(
        $$result,
        Object.assign(
          {},
          {
            class: cn$1("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", className)
          },
          $$restProps
        ),
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``} ${validate_component(Chevron_down, "ChevronDown").$$render(
              $$result,
              {
                class: "h-4 w-4 transition-transform duration-200"
              },
              {},
              {}
            )}`;
          }
        }
      )}`;
    }
  })}`;
});
const Root$3 = Accordion;
const Link_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "target", "xhr"]);
  let { href } = $$props;
  let { target = "" } = $$props;
  let { xhr = false } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0) $$bindings.target(target);
  if ($$props.xhr === void 0 && $$bindings.xhr && xhr !== void 0) $$bindings.xhr(xhr);
  return `${xhr ? `${validate_component(Link, "Link").$$render(
    $$result,
    {
      href,
      target,
      class: "md:hover:font-semibold md:transition-all " + $$restProps.class
    },
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}` : `<a${add_attribute("href", href, 0)}${add_attribute("target", target, 0)} class="${"md:hover:font-semibold md:transition-all " + escape($$restProps.class, true)}">${slots.default ? slots.default({}) : ``}</a>`}`;
});
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Link_1
}, Symbol.toStringTag, { value: "Module" }));
const FooterInfoLinks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Link_1, "FooterLink").$$render($$result, { href: "/gallery", xhr: true }, {}, {
    default: () => {
      return `Galerija`;
    }
  })} ${validate_component(Link_1, "FooterLink").$$render($$result, { href: "/webtools", xhr: true }, {}, {
    default: () => {
      return `Webtools`;
    }
  })} ${validate_component(Link_1, "FooterLink").$$render($$result, { href: "https://blog.bjelopic.com" }, {}, {
    default: () => {
      return `Blog`;
    }
  })} ${validate_component(Link_1, "FooterLink").$$render(
    $$result,
    {
      href: "https://blog.bjelopic.com/kontakt/"
    },
    {},
    {
      default: () => {
        return `Kontakt`;
      }
    }
  )}`;
});
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FooterInfoLinks
}, Symbol.toStringTag, { value: "Module" }));
const FooterSocials = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Link_1, "FooterLink").$$render(
    $$result,
    {
      href: "https://www.youtube.com/@bjelopic",
      target: "_blank"
    },
    {},
    {
      default: () => {
        return `YouTube`;
      }
    }
  )} ${validate_component(Link_1, "FooterLink").$$render(
    $$result,
    {
      href: "https://www.facebook.com/bjelopic",
      target: "_blank"
    },
    {},
    {
      default: () => {
        return `Facebook`;
      }
    }
  )} ${validate_component(Link_1, "FooterLink").$$render(
    $$result,
    {
      href: "https://www.instagram.com/bjelopic/",
      target: "_blank"
    },
    {},
    {
      default: () => {
        return `Instagram`;
      }
    }
  )} ${validate_component(Link_1, "FooterLink").$$render(
    $$result,
    {
      href: "https://github.com/OrakMoya/bjelopic",
      target: "_blank"
    },
    {},
    {
      default: () => {
        return `Github`;
      }
    }
  )}`;
});
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FooterSocials
}, Symbol.toStringTag, { value: "Module" }));
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` <footer class="px-4 py-8 bg-black text-white w-full border-t border-t-neutral-800"><div class="max-w-screen-lg mx-auto flex flex-col gap-y-4 justify-center items-center md:items-start md:justify-between md:flex-row"><div class="flex flex-col items-center md:items-start gap-y-1 md:basis-1/2">${validate_component(Link, "Link").$$render($$result, { href: "/" }, {}, {
    default: () => {
      return `${validate_component(TheBjeloPICLogo, "TheBjeloPicLogo").$$render($$result, { class: "w-10 h-10 md:w-8 md:h-8" }, {}, {})}`;
    }
  })} ${validate_component(Link, "Link").$$render($$result, { href: "/", class: "mb-1" }, {}, {
    default: () => {
      return `${validate_component(TheBjeloPIC, "TheBjeloPic").$$render($$result, { class: "text-3xl md:text-2xl" }, {}, {})}`;
    }
  })} <span class="text-lg md:text-base" data-svelte-h="svelte-oiwjpz">Bjelovarski filmski studio</span></div> <div class="w-full max-w-96 md:basis-1/2 flex">${`${validate_component(Root$3, "Accordion.Root").$$render(
    $$result,
    {
      multiple: true,
      class: "flex flex-col justify-center w-full"
    },
    {},
    {
      default: () => {
        return `${validate_component(Accordion_item, "Accordion.Item").$$render($$result, { value: "info_links", class: "border-0" }, {}, {
          default: () => {
            return `${validate_component(Accordion_trigger, "Accordion.Trigger").$$render($$result, { class: "py-2" }, {}, {
              default: () => {
                return `<h2 class="text-lg font-bold" data-svelte-h="svelte-azy5w6">Informacije</h2>`;
              }
            })} ${validate_component(Accordion_content, "Accordion.Content").$$render($$result, {}, {}, {
              default: () => {
                return `<div class="flex flex-col gap-y-2 text-lg">${validate_component(FooterInfoLinks, "FooterInfoLinks").$$render($$result, {}, {}, {})}</div>`;
              }
            })}`;
          }
        })} ${validate_component(Accordion_item, "Accordion.Item").$$render($$result, { value: "socials", class: "border-0" }, {}, {
          default: () => {
            return `${validate_component(Accordion_trigger, "Accordion.Trigger").$$render($$result, { class: "py-2" }, {}, {
              default: () => {
                return `<h2 class="text-lg font-bold" data-svelte-h="svelte-1lsr8s0">Društvene mreže</h2>`;
              }
            })} ${validate_component(Accordion_content, "Accordion.Content").$$render($$result, {}, {}, {
              default: () => {
                return `<div class="flex flex-col gap-y-2 text-lg">${validate_component(FooterSocials, "FooterSocials").$$render($$result, {}, {}, {})}</div>`;
              }
            })}`;
          }
        })}`;
      }
    }
  )}`}</div></div> <span class="font-semibold block w-fit mx-auto my-4" data-svelte-h="svelte-5fatlj">© BjeloPIC | Sva prava pridržana</span></footer>`;
});
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Footer
}, Symbol.toStringTag, { value: "Module" }));
const TheSubtitle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  let subtitles = [
    'Producenti "ORIGINALNIH BJELOVARSKIH BLOCKBUSTERA"',
    "Jednostavno superiorniji",
    "NK Bjelovar nam još nije isplatio"
  ];
  function pickSubtitle() {
    let random = Math.random();
    if (random < 0.9) return subtitles[0];
    if (random >= 0.9 && random < 0.99) return subtitles[1];
    else return subtitles[2];
  }
  return `<span${add_attribute("class", $$restProps.class, 0)}>${escape(pickSubtitle())}</span>`;
});
const Header$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<header class="bg-black p-4 border-b border-b-neutral-800"><div class="max-w-screen-lg gap-y-2 mx-auto flex justify-between items-center flex-col md:flex-row">${validate_component(Link, "Link").$$render($$result, { href: "/" }, {}, {
    default: () => {
      return `<div class="h-20 flex gap-x-4 items-center" data-svelte-h="svelte-ixsntw"><img class="h-full object-contain" src="/bjelopic_banner.png" alt="BjeloPIC"></div>`;
    }
  })} <div class="text-center"><span class="text-center text-xs sm:text-base md:text-lg lg:text-xl text-white uppercase font-semibold">${validate_component(TheSubtitle, "TheSubtitle").$$render(
    $$result,
    {
      class: "tracking-tight whitespace-nowrap"
    },
    {},
    {}
  )}</span></div></div></header>`;
});
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Header$1
}, Symbol.toStringTag, { value: "Module" }));
const EMBLA_CAROUSEL_CONTEXT = Symbol("EMBLA_CAROUSEL_CONTEXT");
function setEmblaContext(config) {
  setContext(EMBLA_CAROUSEL_CONTEXT, config);
  return config;
}
function getEmblaContext(name2 = "This component") {
  if (!hasContext(EMBLA_CAROUSEL_CONTEXT)) {
    throw new Error(`${name2} must be used within a <Carousel.Root> component`);
  }
  return getContext(EMBLA_CAROUSEL_CONTEXT);
}
const Carousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["opts", "plugins", "api", "orientation", "class"]);
  let { opts = {} } = $$props;
  let { plugins = [] } = $$props;
  let { api = void 0 } = $$props;
  let { orientation = "horizontal" } = $$props;
  let { class: className = void 0 } = $$props;
  const apiStore = writable(void 0);
  const orientationStore = writable(orientation);
  const canScrollPrev = writable(false);
  const canScrollNext = writable(false);
  const optionsStore = writable(opts);
  const pluginStore = writable(plugins);
  const scrollSnapsStore = writable([]);
  const selectedIndexStore = writable(0);
  function scrollPrev() {
    api == null ? void 0 : api.scrollPrev();
  }
  function scrollNext() {
    api == null ? void 0 : api.scrollNext();
  }
  function scrollTo(index, jump) {
    api == null ? void 0 : api.scrollTo(index, jump);
  }
  function onSelect(api2) {
    if (!api2) return;
    canScrollPrev.set(api2.canScrollPrev());
    canScrollNext.set(api2.canScrollNext());
  }
  function handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  }
  setEmblaContext({
    api: apiStore,
    scrollPrev,
    scrollNext,
    orientation: orientationStore,
    canScrollNext,
    canScrollPrev,
    handleKeyDown,
    options: optionsStore,
    plugins: pluginStore,
    onInit,
    scrollSnaps: scrollSnapsStore,
    selectedIndex: selectedIndexStore,
    scrollTo
  });
  function onInit(event) {
    api = event.detail;
    apiStore.set(api);
    scrollSnapsStore.set(api.scrollSnapList());
  }
  onDestroy(() => {
    api == null ? void 0 : api.off("select", onSelect);
  });
  if ($$props.opts === void 0 && $$bindings.opts && opts !== void 0) $$bindings.opts(opts);
  if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0) $$bindings.plugins(plugins);
  if ($$props.api === void 0 && $$bindings.api && api !== void 0) $$bindings.api(api);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0) $$bindings.orientation(orientation);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  {
    orientationStore.set(orientation);
  }
  {
    pluginStore.set(plugins);
  }
  {
    optionsStore.set(opts);
  }
  {
    if (api) {
      onSelect(api);
      api.on("select", onSelect);
      api.on("reInit", onSelect);
    }
  }
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn$1("relative", className))
      },
      { role: "region" },
      { "aria-roledescription": "carousel" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Carousel_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let $$unsubscribe_options;
  let $orientation, $$unsubscribe_orientation;
  let $$unsubscribe_plugins;
  let { class: className = void 0 } = $$props;
  const { orientation, options, plugins, onInit } = getEmblaContext("<Carousel.Content/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  $$unsubscribe_options = subscribe(options, (value) => value);
  $$unsubscribe_plugins = subscribe(plugins, (value) => value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  $$unsubscribe_options();
  $$unsubscribe_orientation();
  $$unsubscribe_plugins();
  return `<div class="overflow-visible"><div${spread(
    [
      {
        class: escape_attribute_value(cn$1(
          "flex",
          $orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        ))
      },
      { "data-embla-container": "" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
const Carousel_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let $orientation, $$unsubscribe_orientation;
  let { class: className = void 0 } = $$props;
  const { orientation } = getEmblaContext("<Carousel.Item/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  $$unsubscribe_orientation();
  return `<div${spread(
    [
      { role: "group" },
      { "aria-roledescription": "slide" },
      {
        class: escape_attribute_value(cn$1("min-w-0 shrink-0 grow-0 basis-full", $orientation === "horizontal" ? "pl-4" : "pt-4", className))
      },
      { "data-embla-slide": "" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size", "builders"]);
  let { class: className = void 0 } = $$props;
  let { variant = "default" } = $$props;
  let { size: size2 = "default" } = $$props;
  let { builders = [] } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size2 !== void 0) $$bindings.size(size2);
  if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0) $$bindings.builders(builders);
  return `${validate_component(Button$1, "ButtonPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      { builders },
      {
        class: cn$1(buttonVariants({ variant, size: size2, className }))
      },
      { type: "button" },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const buttonVariants = tv({
  base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
const FilmReel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width = 24 } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  return `<div class="flex w-full h-4 md:h-6 bg-repeat relative " style="${"background-image: url('rect1.svg'); background-size: auto " + escape(width, true) + "px; background-repeat: repeat;"}"></div>`;
});
const Badge_x = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    [
      "line",
      {
        "x1": "15",
        "x2": "9",
        "y1": "9",
        "y2": "15"
      }
    ],
    [
      "line",
      {
        "x1": "9",
        "x2": "15",
        "y1": "9",
        "y2": "15"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "badge-x" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Calendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M8 2v4" }],
    ["path", { "d": "M16 2v4" }],
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "4",
        "rx": "2"
      }
    ],
    ["path", { "d": "M3 10h18" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "calendar" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "check" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Chevron_left = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m15 18-6-6 6-6" }]];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "chevron-left" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Chevron_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "chevron-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Eye = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
      }
    ],
    ["circle", { "cx": "12", "cy": "12", "r": "3" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "eye" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "6",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "18",
        "y2": "18"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "menu" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Minus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M5 12h14" }]];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "minus" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M5 12h14" }], ["path", { "d": "M12 5v14" }]];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "plus" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "11", "cy": "11", "r": "8" }],
    ["path", { "d": "m21 21-4.3-4.3" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "search" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Square_arrow_out_up_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"
      }
    ],
    ["path", { "d": "m21 3-9 9" }],
    ["path", { "d": "M15 3h6v6" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "square-arrow-out-up-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Trash = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M3 6h18" }],
    [
      "path",
      {
        "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
      }
    ],
    [
      "path",
      {
        "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "trash" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const X = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M18 6 6 18" }], ["path", { "d": "m6 6 12 12" }]];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "x" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Layout$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col h-screen font-sans"><div class="flex-grow bg-black text-white">${slots.default ? slots.default({}) : ``}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout$2
}, Symbol.toStringTag, { value: "Module" }));
let autoscroll_resume_delay = 3e3;
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { videos } = $$props;
  const autoscroll = AutoScroll({
    speed: 0.3,
    startDelay: 0,
    stopOnMouseEnter: true
  });
  let autoplay_resume_timeout_id = 0;
  let carousel_api;
  let window_scrolled = false;
  let arrows_shown = false;
  setTimeout(() => arrows_shown = true, 4e3);
  let carousel_opts = { loop: true, dragFree: true };
  if ($$props.videos === void 0 && $$bindings.videos && videos !== void 0) $$bindings.videos(videos);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (carousel_api) {
        carousel_api.on("pointerDown", () => {
          autoscroll.stop();
          clearTimeout(autoplay_resume_timeout_id);
        });
        carousel_api.on("pointerUp", () => {
          autoplay_resume_timeout_id = setTimeout(() => autoscroll.play(), autoscroll_resume_delay);
        });
      }
    }
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-ajh58f_START -->${$$result.title = `<title>BjeloPIC</title>`, ""}<!-- HEAD_svelte-ajh58f_END -->`, ""}  <main class="max-w-screen-xl h-screen mx-auto"><div class="absolute top-0 left-0 overflow-clip w-screen h-full flex justify-center items-center" data-svelte-h="svelte-7nl56u"><div class="brightness-50 w-full h-full object-cover"><video class="w-full h-full object-cover" autoplay loop muted><source src="/hero.webm" type="video/webm"></video></div></div> ${arrows_shown && !window_scrolled ? `<div class="absolute left-0 bottom-0 mx-8 my-6 hidden md:block">${validate_component(Chevron_down, "ChevronDown").$$render(
      $$result,
      {
        class: "drop-shadow w-8 h-8 animate-bounce "
      },
      {},
      {}
    )}</div> <div class="absolute right-0 bottom-0 mx-8 my-6 hidden md:block">${validate_component(Chevron_down, "ChevronDown").$$render(
      $$result,
      {
        class: "drop-shadow w-8 h-8 animate-bounce"
      },
      {},
      {}
    )}</div> <div class="absolute left-0 bottom-0 right-0 w-8 mx-auto mb-6">${validate_component(Chevron_down, "ChevronDown").$$render(
      $$result,
      {
        class: "drop-shadow w-8 h-8 animate-bounce  md:hidden"
      },
      {},
      {}
    )}</div>` : ``} <section class="w-full h-full flex flex-col justify-center items-center relative gap-y-4"><div class="basis-1/3 flex place-items-end"><div class="flex flex-col items-center">${validate_component(TheBjeloPIC, "TheBjeloPic").$$render(
      $$result,
      {
        class: "drop-shadow-lg text-7xl sm:text-8xl md:text-9xl transition-all duration-500 mb-4 sm:mb-6"
      },
      {},
      {}
    )} <div class="flex justify-evenly items-center transition-all duration-500 align-middle w-full gap-x-2 md:px-3 mb-2 sm:mb-5"><div class="border-b border-white w-full h-min"></div> ${validate_component(TheSubtitle, "TheSubtitle").$$render(
      $$result,
      {
        class: "font-semibold  uppercase text-xs transition-all duration-500 md:text-sm w-fit whitespace-nowrap tracking-tighter"
      },
      {},
      {}
    )} <div class="bg-white w-full h-[1px]"></div></div></div></div> <div class="${"flex w-screen basis-1/3 overflow-x-clip overflow-y-visible drop-shadow-glow-sm " + escape("", true) + " transition duration-300"}">${validate_component(Carousel, "Carousel.Root").$$render(
      $$result,
      {
        plugins: [autoscroll],
        opts: carousel_opts,
        class: "w-auto max-w-full mx-auto overflow-visible",
        api: carousel_api
      },
      {
        api: ($$value) => {
          carousel_api = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Carousel_content, "Carousel.Content").$$render($$result, { class: "overflow-visible" }, {}, {
            default: () => {
              return `${each(videos, (video) => {
                return `${validate_component(Carousel_item, "Carousel.Item").$$render(
                  $$result,
                  {
                    class: " basis-auto z-0 relative md:hover:z-10 overflow-visible p-0 outline outline-black outline-1"
                  },
                  {},
                  {
                    default: () => {
                      return `${validate_component(FilmReel, "FilmReel").$$render(
                        $$result,
                        {
                          width: 16
                        },
                        {},
                        {}
                      )} <div class="overflow-visible"> <div class="p-1 w-48 md:w-72 bg-black overflow-visible"><div class="${"w-full h-full relative transition md:hover:drop-shadow-glow-md md:hover:scale-105 " + escape("", true) + " md:hover:brightness-100 overflow-visible"}">${validate_component(Aspect_ratio, "AspectRatio.Root").$$render($$result, { ratio: 16 / 9 }, {}, {
                        default: () => {
                          return `${validate_component(Link, "Link").$$render(
                            $$result,
                            {
                              href: "/gallery?focus=" + video.uuid,
                              target: "_blank"
                            },
                            {},
                            {
                              default: () => {
                                return `<img${add_attribute("src", video.thumbnail_path, 0)} class="w-full h-full rounded-md overflow-clip relative z-50 md:hover:drop-shadow-lg transition duration-300" alt="${escape(video.title, true) + " thumbnail"}"> `;
                              }
                            }
                          )} `;
                        }
                      })} </div></div> ${validate_component(FilmReel, "FilmReel").$$render(
                        $$result,
                        {
                          width: 16
                        },
                        {},
                        {}
                      )}</div> `;
                    }
                  }
                )}`;
              })}`;
            }
          })}`;
        }
      }
    )}</div></section></main>`;
  } while (!$$settled);
  return $$rendered;
});
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hero,
  layout: Layout$2
}, Symbol.toStringTag, { value: "Module" }));
const Layout$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col h-screen">${validate_component(Header$1, "Header").$$render($$result, {}, {}, {})} <div class="flex-grow bg-black text-white">${slots.default ? slots.default({}) : ``}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout$1
}, Symbol.toStringTag, { value: "Module" }));
const GalleryVideo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let focused;
  let $$restProps = compute_rest_props($$props, [
    "preview_src",
    "thumbnail_src",
    "alt",
    "selected_id",
    "this_id",
    "href",
    "poster_src",
    "title",
    "year"
  ]);
  let { preview_src = null } = $$props;
  let { thumbnail_src = null } = $$props;
  let { alt = "" } = $$props;
  let { selected_id = "" } = $$props;
  let { this_id = "" } = $$props;
  let { href = "" } = $$props;
  let { poster_src = "" } = $$props;
  let { title = "" } = $$props;
  let { year = "" } = $$props;
  let poster_shown = false;
  if ($$props.preview_src === void 0 && $$bindings.preview_src && preview_src !== void 0) $$bindings.preview_src(preview_src);
  if ($$props.thumbnail_src === void 0 && $$bindings.thumbnail_src && thumbnail_src !== void 0) $$bindings.thumbnail_src(thumbnail_src);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0) $$bindings.alt(alt);
  if ($$props.selected_id === void 0 && $$bindings.selected_id && selected_id !== void 0) $$bindings.selected_id(selected_id);
  if ($$props.this_id === void 0 && $$bindings.this_id && this_id !== void 0) $$bindings.this_id(this_id);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.poster_src === void 0 && $$bindings.poster_src && poster_src !== void 0) $$bindings.poster_src(poster_src);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.year === void 0 && $$bindings.year && year !== void 0) $$bindings.year(year);
  focused = this_id === selected_id;
  poster_shown = focused && poster_shown;
  return `  <div class="${escape(focused ? "scale-[104%]" : "", true) + " transition-all duration-300 w-full h-full"}"><div class="${"w-full h-full overflow-hidden relative bg-black " + escape($$restProps.class, true)}">${focused && preview_src ? `<div class="absolute flex items-center align-middle w-full h-full top-0"><a${add_attribute("href", href, 0)} target="_blank" class="block object-cover"><video muted autoplay loop><source${add_attribute("src", preview_src, 0)}></video></a></div>` : `<div class="absolute w-full h-full">${focused ? `<a${add_attribute("href", href, 0)} target="_blank" class="block absolute"><img${add_attribute("src", thumbnail_src, 0)}${add_attribute("alt", alt, 0)} class="object-cover"></a>` : `<img${add_attribute("src", thumbnail_src, 0)}${add_attribute("alt", alt, 0)} class="absolute">`}</div>`} ${focused && title ? `<div class="absolute font-semibold w-full bottom-0 bg-black/80 p-2 text-left">${escape(title)} <span class="text-bjelopic-blue-1">(${escape(year)})</span></div>` : ``} ${!poster_shown && poster_src && focused ? `<button class="absolute top-[15%] transition-all hover:pr-4 right-0 bg-black/80 rounded-tl-2xl rounded-bl-2xl p-2 z-10 block">${validate_component(Chevron_left, "ChevronLeft").$$render($$result, { class: "w-6 h-6" }, {}, {})}</button>` : ``} ${focused && poster_src && poster_shown ? `<button class="w-1/3 p-4 z-10 hover:cursor-pointer block absolute right-0 top-0">${validate_component(Aspect_ratio, "AspectRatio.Root").$$render($$result, { ratio: 707 / 1e3 }, {}, {
    default: () => {
      return `<img${add_attribute("src", poster_src, 0)} alt="">`;
    }
  })}</button>` : ``}</div></div>`;
});
const Gallery = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { by_collection } = $$props;
  let { focus = "" } = $$props;
  let selected_video_uuid = focus;
  Promise.all(Array.from(document.images).filter((img) => !img.complete).map((img) => new Promise((resolve) => {
    img.onload = img.onerror = resolve;
  }))).then(() => {
    if (focus) {
      const yOffset = -30;
      const el = document.getElementById(focus);
      if (el) {
        const y = el.getBoundingClientRect().top + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  });
  if ($$props.by_collection === void 0 && $$bindings.by_collection && by_collection !== void 0) $$bindings.by_collection(by_collection);
  if ($$props.focus === void 0 && $$bindings.focus && focus !== void 0) $$bindings.focus(focus);
  return `${$$result.head += `<!-- HEAD_svelte-1fyhqyy_START -->${$$result.title = `<title>Gallery - BjeloPIC</title>`, ""}<!-- HEAD_svelte-1fyhqyy_END -->`, ""} ${each(by_collection, (collection, i) => {
    return `<section class="${"mx-auto " + escape(
      i % 2 ? "bg-bjelopic-neutral-8" : "bg-bjelopic-neutral-7",
      true
    ) + " py-4 px-4 relative"}" role="none"><div class="max-w-screen-lg mx-auto px-4">${collection.videos[0].collection ? `<div class="flex w-full justify-center mb-4 items-center gap-x-4 mx-auto transition-all duration-500 drop-shadow"><div class="h-[1px] relative top-[2px] bg-white min-w-8 grow"></div> <div class="whitespace-normal w-auto max-w-[570px] font-bold text-2xl md:text-4xl text-center">${escape(collection.collection)}</div> <div class="h-[1px] relative top-[2px] bg-white min-w-8 grow"></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4" role="none">${each(collection.videos, (video) => {
      return `<div class="drop-shadow-lg"${add_attribute("id", video.uuid, 0)}> <button class="w-full block">${validate_component(Aspect_ratio, "AspectRatio.Root").$$render($$result, { ratio: 16 / 9 }, {}, {
        default: () => {
          return `${validate_component(GalleryVideo, "GalleryVideo").$$render(
            $$result,
            {
              title: video.title,
              year: new Date(video.publication_date).getUTCFullYear().toString(),
              class: "rounded-md transition-all overflow-clip",
              href: video.link,
              this_id: video.uuid,
              selected_id: selected_video_uuid,
              thumbnail_src: video.thumbnail_path,
              preview_src: video.preview_path,
              poster_src: video.poster_path
            },
            {},
            {}
          )} `;
        }
      })}</button> </div>`;
    })} </div>` : `${each(collection.videos, (video) => {
      return `<div role="none"${add_attribute("id", video.uuid, 0)} class="${"w-full flex-col-reverse text-center flex gap-x-4 " + escape(
        i % 2 ? "md:flex-row-reverse md:text-right" : "md:flex-row md:text-left",
        true
      )}"> <button class="w-full block basis-3/5">${validate_component(Aspect_ratio, "AspectRatio.Root").$$render($$result, { ratio: 16 / 9 }, {}, {
        default: () => {
          return `${validate_component(GalleryVideo, "GalleryVideo").$$render(
            $$result,
            {
              class: "rounded-md md:rounded-sm md:hover:rounded-none transition-all overflow-clip",
              href: video.link,
              this_id: video.uuid,
              selected_id: selected_video_uuid,
              thumbnail_src: video.thumbnail_path,
              preview_src: video.preview_path,
              poster_src: video.poster_path
            },
            {},
            {}
          )} `;
        }
      })}</button> <div class="w-full basis-2/5 flex flex-col justify-center md:justify-start drop-shadow"><span class="text-bjelopic-blue-1 font-semibold text-2xl md:text-3xl">${video.subject === "BjeloPIC" ? `${validate_component(TheBjeloPIC, "TheBjeloPic").$$render($$result, {}, {}, {})}` : `${escape(video.subject)}`} -
                                <span class="text-white">${escape(video.title)} </span>(${escape(new Date(video.publication_date).getUTCFullYear())})</span> ${video.category ? `<span class="md:text-lg mb-2">${escape(video.category)}</span>` : ``} <div class="${"flex justify-center md:justify-start " + escape(i % 2 == 0 ? "flex-row" : "flex-row-reverse", true) + " mb-2 flex-wrap gap-x-2 gap-y-2"}">${each(video.roles, (role) => {
        return `<div class="bg-bjelopic-orange-3 rounded-lg py-1 px-2"><span class="drop-shadow text-base">${escape(role)}</span> </div>`;
      })} </div></div> </div>`;
    })}`}</div> </section>`;
  })}`;
});
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gallery
}, Symbol.toStringTag, { value: "Module" }));
const DashboardChart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canvas;
  let { type } = $$props;
  let { options = {
    plugins: { legend: { display: false } },
    scales: {
      y: {
        grid: { color: "#444444", display: false },
        beginAtZero: true
      },
      x: {
        grid: { color: "#444444", display: false }
      }
    }
  } } = $$props;
  let { data } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="w-full h-full"><canvas${add_attribute("this", canvas, 0)}></canvas></div>`;
});
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DashboardChart
}, Symbol.toStringTag, { value: "Module" }));
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["clientHeight", "dontHide"]);
  let scrollY = 0;
  let previous_scrollY = 1;
  let header_shown = true;
  let { clientHeight = 0 } = $$props;
  let { dontHide = false } = $$props;
  function setHeaderVisibility(scrollY2) {
    header_shown = scrollY2 < previous_scrollY;
    previous_scrollY = scrollY2;
  }
  if ($$props.clientHeight === void 0 && $$bindings.clientHeight && clientHeight !== void 0) $$bindings.clientHeight(clientHeight);
  if ($$props.dontHide === void 0 && $$bindings.dontHide && dontHide !== void 0) $$bindings.dontHide(dontHide);
  {
    setHeaderVisibility(scrollY);
  }
  return ` ${header_shown || dontHide ? `<header class="${"bg-black w-full p-4 border-t md:border-t-0 md:border-b border-neutral-800 fixed bottom-0 md:relative " + escape($$restProps.class, true)}"><div class="flex w-full justify-between">${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "/webtools",
      class: "max-w-screen-lg gap-y-2 md:gap-x-2 flex items-center justify-start gap-x-4"
    },
    {},
    {
      default: () => {
        return `<div class="h-12 md:h-20 flex gap-x-4 items-center"><img class="h-full object-contain"${add_attribute(
          "src",
          "/bjelopic_logo.png",
          0
        )} alt="BjeloPIC"></div> <span class="text-white text-2xl md:text-[36px] relative bottom-[2px] italic" data-svelte-h="svelte-m5w96j">Webtools</span>`;
      }
    }
  )} ${slots.default ? slots.default({}) : ``}</div></header>` : ``}`;
});
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Header
}, Symbol.toStringTag, { value: "Module" }));
const NavLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { href: hrefLink = "/" } = $$props;
  let { method: methodName = "get" } = $$props;
  let { xhr = true } = $$props;
  if ($$props.href === void 0 && $$bindings.href && hrefLink !== void 0) $$bindings.href(hrefLink);
  if ($$props.method === void 0 && $$bindings.method && methodName !== void 0) $$bindings.method(methodName);
  if ($$props.xhr === void 0 && $$bindings.xhr && xhr !== void 0) $$bindings.xhr(xhr);
  $$unsubscribe_page();
  return `${xhr ? `${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: hrefLink,
      class: " " + ($page.url.endsWith(hrefLink) ? "font-bold" : "font-light hover:font-normal"),
      method: methodName
    },
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}` : `<a${add_attribute("href", hrefLink, 0)} class="${"" + escape(
    $page.url.endsWith(hrefLink) ? "font-bold" : "font-light hover:font-normal",
    true
  )}"${add_attribute("method", methodName, 0)}>${slots.default ? slots.default({}) : ``}</a>`}`;
});
const LayoutLinks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let show_telescope = false;
  show_telescope = $page.props.show_telescope;
  $$unsubscribe_page();
  return `<div class="${"flex flex-col text-2xl gap-y-2 " + escape($$restProps.class, true) + " h-full"}">${validate_component(NavLink, "NavLink").$$render($$result, { href: "/" }, {}, {
    default: () => {
      return `<span class="flex items-baseline">Website${validate_component(Square_arrow_out_up_right, "SquareArrowOutUpRight").$$render($$result, { class: "w-5 h-5 ml-2 relative top-[2px]" }, {}, {})}</span>`;
    }
  })} ${validate_component(NavLink, "NavLink").$$render($$result, { href: "/webtools" }, {}, {
    default: () => {
      return `Dashboard`;
    }
  })} ${validate_component(NavLink, "NavLink").$$render($$result, { href: "/webtools/videos" }, {}, {
    default: () => {
      return `Videos`;
    }
  })} ${show_telescope ? `${validate_component(NavLink, "NavLink").$$render($$result, { xhr: false, href: "/telescope" }, {}, {
    default: () => {
      return `Telescope`;
    }
  })}` : ``} <div class="grow h-full"></div> ${validate_component(NavLink, "NavLink").$$render($$result, { href: "/webtools/logout" }, {}, {
    default: () => {
      return `Logout`;
    }
  })}</div>`;
});
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LayoutLinks
}, Symbol.toStringTag, { value: "Module" }));
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type = "success" } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  return `${type === "success" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>` : `${type === "error" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>` : `${type === "info" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg>` : `${type === "warning" ? `<svg viewBox="0 0 64 64" fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M32.427,7.987c2.183,0.124 4,1.165 5.096,3.281l17.936,36.208c1.739,3.66 -0.954,8.585 -5.373,8.656l-36.119,0c-4.022,-0.064 -7.322,-4.631 -5.352,-8.696l18.271,-36.207c0.342,-0.65 0.498,-0.838 0.793,-1.179c1.186,-1.375 2.483,-2.111 4.748,-2.063Zm-0.295,3.997c-0.687,0.034 -1.316,0.419 -1.659,1.017c-6.312,11.979 -12.397,24.081 -18.301,36.267c-0.546,1.225 0.391,2.797 1.762,2.863c12.06,0.195 24.125,0.195 36.185,0c1.325,-0.064 2.321,-1.584 1.769,-2.85c-5.793,-12.184 -11.765,-24.286 -17.966,-36.267c-0.366,-0.651 -0.903,-1.042 -1.79,-1.03Z"></path><path d="M33.631,40.581l-3.348,0l-0.368,-16.449l4.1,0l-0.384,16.449Zm-3.828,5.03c0,-0.609 0.197,-1.113 0.592,-1.514c0.396,-0.4 0.935,-0.601 1.618,-0.601c0.684,0 1.223,0.201 1.618,0.601c0.395,0.401 0.593,0.905 0.593,1.514c0,0.587 -0.193,1.078 -0.577,1.473c-0.385,0.395 -0.929,0.593 -1.634,0.593c-0.705,0 -1.249,-0.198 -1.634,-0.593c-0.384,-0.395 -0.576,-0.886 -0.576,-1.473Z"></path></svg>` : ``}`}`}`}`;
});
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { visible } = $$props;
  const bars = Array(12).fill(0);
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0) $$bindings.visible(visible);
  return `<div class="sonner-loading-wrapper"${add_attribute("data-visible", visible, 0)}><div class="sonner-spinner">${each(bars, (_2, i) => {
    return `<div class="sonner-loading-bar"></div>`;
  })}</div></div>`;
});
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
const isBrowser$2 = typeof document !== "undefined";
function clientWritable(initialValue) {
  const store2 = writable(initialValue);
  function set(value) {
    if (isBrowser$2) {
      store2.set(value);
    }
  }
  function update2(updater) {
    if (isBrowser$2) {
      store2.update(updater);
    }
  }
  return {
    subscribe: store2.subscribe,
    set,
    update: update2
  };
}
let toastsCounter = 0;
function createToastState() {
  const toasts = clientWritable([]);
  const heights = clientWritable([]);
  function addToast(data) {
    toasts.update((prev2) => [data, ...prev2]);
  }
  function create(data) {
    var _a;
    const { message: message2, ...rest } = data;
    const id = typeof (data == null ? void 0 : data.id) === "number" || data.id && ((_a = data.id) == null ? void 0 : _a.length) > 0 ? data.id : toastsCounter++;
    const dismissable = data.dismissable === void 0 ? true : data.dismissable;
    const type = data.type === void 0 ? "default" : data.type;
    const $toasts = get_store_value(toasts);
    const alreadyExists = $toasts.find((toast2) => {
      return toast2.id === id;
    });
    if (alreadyExists) {
      toasts.update((prev2) => prev2.map((toast2) => {
        if (toast2.id === id) {
          return {
            ...toast2,
            ...data,
            id,
            title: message2,
            dismissable,
            type,
            updated: true
          };
        }
        return {
          ...toast2,
          updated: false
        };
      }));
    } else {
      addToast({ ...rest, id, title: message2, dismissable, type });
    }
    return id;
  }
  function dismiss(id) {
    if (id === void 0) {
      toasts.update((prev2) => prev2.map((toast2) => ({ ...toast2, dismiss: true })));
      return;
    }
    toasts.update((prev2) => prev2.map((toast2) => toast2.id === id ? { ...toast2, dismiss: true } : toast2));
    return id;
  }
  function remove(id) {
    if (id === void 0) {
      toasts.set([]);
      return;
    }
    toasts.update((prev2) => prev2.filter((toast2) => toast2.id !== id));
    return id;
  }
  function message(message2, data) {
    return create({ ...data, type: "default", message: message2 });
  }
  function error(message2, data) {
    return create({ ...data, type: "error", message: message2 });
  }
  function success(message2, data) {
    return create({ ...data, type: "success", message: message2 });
  }
  function info(message2, data) {
    return create({ ...data, type: "info", message: message2 });
  }
  function warning(message2, data) {
    return create({ ...data, type: "warning", message: message2 });
  }
  function loading(message2, data) {
    return create({ ...data, type: "loading", message: message2 });
  }
  function promise(promise2, data) {
    if (!data) {
      return;
    }
    let id = void 0;
    if (data.loading !== void 0) {
      id = create({
        ...data,
        promise: promise2,
        type: "loading",
        message: data.loading
      });
    }
    const p = promise2 instanceof Promise ? promise2 : promise2();
    let shouldDismiss = id !== void 0;
    p.then((response) => {
      if (response && typeof response.ok === "boolean" && !response.ok) {
        shouldDismiss = false;
        const message2 = typeof data.error === "function" ? (
          // @ts-expect-error: Incorrect response type
          data.error(`HTTP error! status: ${response.status}`)
        ) : data.error;
        create({ id, type: "error", message: message2 });
      } else if (data.success !== void 0) {
        shouldDismiss = false;
        const message2 = (
          // @ts-expect-error: TODO: Better function checking
          typeof data.success === "function" ? data.success(response) : data.success
        );
        create({ id, type: "success", message: message2 });
      }
    }).catch((error2) => {
      if (data.error !== void 0) {
        shouldDismiss = false;
        const message2 = (
          // @ts-expect-error: TODO: Better function checking
          typeof data.error === "function" ? data.error(error2) : data.error
        );
        create({ id, type: "error", message: message2 });
      }
    }).finally(() => {
      var _a;
      if (shouldDismiss) {
        dismiss(id);
        id = void 0;
      }
      (_a = data.finally) == null ? void 0 : _a.call(data);
    });
    return id;
  }
  function custom(component, data) {
    const id = (data == null ? void 0 : data.id) || toastsCounter++;
    create({ component, id, ...data });
    return id;
  }
  function removeHeight(id) {
    heights.update((prev2) => prev2.filter((height) => height.toastId !== id));
  }
  function setHeight(data) {
    const exists = get_store_value(heights).find((el) => el.toastId === data.toastId);
    if (exists === void 0) {
      heights.update((prev2) => [data, ...prev2]);
      return;
    }
    heights.update((prev2) => prev2.map((el) => {
      if (el.toastId === data.toastId) {
        return data;
      } else {
        return el;
      }
    }));
  }
  function reset() {
    toasts.set([]);
    heights.set([]);
  }
  return {
    // methods
    create,
    addToast,
    dismiss,
    remove,
    message,
    error,
    success,
    info,
    warning,
    loading,
    promise,
    custom,
    removeHeight,
    setHeight,
    reset,
    // stores
    toasts,
    heights
  };
}
const toastState = createToastState();
function toastFunction(message, data) {
  return toastState.create({
    message,
    ...data
  });
}
const basicToast = toastFunction;
const toast = Object.assign(basicToast, {
  success: toastState.success,
  info: toastState.info,
  warning: toastState.warning,
  error: toastState.error,
  custom: toastState.custom,
  message: toastState.message,
  promise: toastState.promise,
  dismiss: toastState.dismiss,
  loading: toastState.loading
});
const useEffect = (subscribe2) => ({ subscribe: subscribe2 });
const TOAST_LIFETIME = 4e3;
const GAP$1 = 14;
const TIME_BEFORE_UNMOUNT = 200;
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var _a, _b, _c, _d, _e, _f, _g;
  let isFront;
  let isVisible;
  let toastType;
  let toastClass;
  let toastDescriptionClass;
  let heightIndex;
  let coords;
  let toastsHeightBefore;
  let disabled;
  let isPromiseLoadingOrInfiniteDuration;
  let $$unsubscribe_effect = noop$1, $$subscribe_effect = () => ($$unsubscribe_effect(), $$unsubscribe_effect = subscribe(effect2, ($$value) => $$value), effect2);
  let $heights, $$unsubscribe_heights;
  let $toasts, $$unsubscribe_toasts;
  const defaultClasses = {
    toast: "",
    title: "",
    description: "",
    loader: "",
    closeButton: "",
    cancelButton: "",
    actionButton: "",
    action: "",
    warning: "",
    error: "",
    success: "",
    default: "",
    info: "",
    loading: ""
  };
  const { toasts, heights, removeHeight, setHeight, remove } = toastState;
  $$unsubscribe_toasts = subscribe(toasts, (value) => $toasts = value);
  $$unsubscribe_heights = subscribe(heights, (value) => $heights = value);
  let { toast: toast2 } = $$props;
  let { index } = $$props;
  let { expanded } = $$props;
  let { invert } = $$props;
  let { position } = $$props;
  let { visibleToasts } = $$props;
  let { expandByDefault } = $$props;
  let { closeButton } = $$props;
  let { interacting } = $$props;
  let { cancelButtonStyle = "" } = $$props;
  let { actionButtonStyle = "" } = $$props;
  let { duration = 4e3 } = $$props;
  let { descriptionClass = "" } = $$props;
  let { classes = {} } = $$props;
  let { unstyled = false } = $$props;
  let mounted = false;
  let removed = false;
  let swiping = false;
  let swipeOut = false;
  let offsetBeforeRemove = 0;
  let initialHeight = 0;
  let toastRef;
  let offset2 = 0;
  let closeTimerStartTimeRef = 0;
  let lastCloseTimerStartTimeRef = 0;
  async function updateHeights() {
    {
      return;
    }
  }
  function deleteToast() {
    removed = true;
    offsetBeforeRemove = offset2;
    removeHeight(toast2.id);
    setTimeout(
      () => {
        remove(toast2.id);
      },
      TIME_BEFORE_UNMOUNT
    );
  }
  let timeoutId;
  let remainingTime = toast2.duration || duration || TOAST_LIFETIME;
  function pauseTimer() {
    if (lastCloseTimerStartTimeRef < closeTimerStartTimeRef) {
      const elapsedTime = (/* @__PURE__ */ new Date()).getTime() - closeTimerStartTimeRef;
      remainingTime = remainingTime - elapsedTime;
    }
    lastCloseTimerStartTimeRef = (/* @__PURE__ */ new Date()).getTime();
  }
  function startTimer() {
    closeTimerStartTimeRef = (/* @__PURE__ */ new Date()).getTime();
    timeoutId = setTimeout(
      () => {
        var _a2;
        (_a2 = toast2.onAutoClose) == null ? void 0 : _a2.call(toast2, toast2);
        deleteToast();
      },
      remainingTime
    );
  }
  let effect2;
  if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0) $$bindings.toast(toast2);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0) $$bindings.expanded(expanded);
  if ($$props.invert === void 0 && $$bindings.invert && invert !== void 0) $$bindings.invert(invert);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
  if ($$props.visibleToasts === void 0 && $$bindings.visibleToasts && visibleToasts !== void 0) $$bindings.visibleToasts(visibleToasts);
  if ($$props.expandByDefault === void 0 && $$bindings.expandByDefault && expandByDefault !== void 0) $$bindings.expandByDefault(expandByDefault);
  if ($$props.closeButton === void 0 && $$bindings.closeButton && closeButton !== void 0) $$bindings.closeButton(closeButton);
  if ($$props.interacting === void 0 && $$bindings.interacting && interacting !== void 0) $$bindings.interacting(interacting);
  if ($$props.cancelButtonStyle === void 0 && $$bindings.cancelButtonStyle && cancelButtonStyle !== void 0) $$bindings.cancelButtonStyle(cancelButtonStyle);
  if ($$props.actionButtonStyle === void 0 && $$bindings.actionButtonStyle && actionButtonStyle !== void 0) $$bindings.actionButtonStyle(actionButtonStyle);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
  if ($$props.descriptionClass === void 0 && $$bindings.descriptionClass && descriptionClass !== void 0) $$bindings.descriptionClass(descriptionClass);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0) $$bindings.classes(classes);
  if ($$props.unstyled === void 0 && $$bindings.unstyled && unstyled !== void 0) $$bindings.unstyled(unstyled);
  classes = { ...defaultClasses, ...classes };
  isFront = index === 0;
  isVisible = index + 1 <= visibleToasts;
  toast2.title;
  toast2.description;
  toastType = toast2.type;
  toastClass = toast2.class || "";
  toastDescriptionClass = toast2.descriptionClass || "";
  heightIndex = $heights.findIndex((height) => height.toastId === toast2.id) || 0;
  coords = position.split("-");
  toastsHeightBefore = $heights.reduce(
    (prev2, curr, reducerIndex) => {
      if (reducerIndex >= heightIndex) return prev2;
      return prev2 + curr.height;
    },
    0
  );
  invert = toast2.invert || invert;
  disabled = toastType === "loading";
  offset2 = Math.round(heightIndex * GAP$1 + toastsHeightBefore);
  {
    updateHeights();
  }
  {
    if (toast2.updated) {
      clearTimeout(timeoutId);
      remainingTime = toast2.duration || duration || TOAST_LIFETIME;
      startTimer();
    }
  }
  isPromiseLoadingOrInfiniteDuration = toast2.promise && toastType === "loading" || toast2.duration === Number.POSITIVE_INFINITY;
  $$subscribe_effect(effect2 = useEffect(() => {
    if (!isPromiseLoadingOrInfiniteDuration) {
      if (expanded || interacting) {
        pauseTimer();
      } else {
        startTimer();
      }
    }
    return () => clearTimeout(timeoutId);
  }));
  {
    if (toast2.delete) {
      deleteToast();
    }
  }
  $$unsubscribe_effect();
  $$unsubscribe_heights();
  $$unsubscribe_toasts();
  return `   <li${add_attribute("aria-live", toast2.important ? "assertive" : "polite", 0)} aria-atomic="true" role="status"${add_attribute("tabindex", 0, 0)}${add_attribute("class", cn($$props.class, toastClass, classes == null ? void 0 : classes.toast, (_a = toast2 == null ? void 0 : toast2.classes) == null ? void 0 : _a.toast, classes == null ? void 0 : classes[toastType], (_b = toast2 == null ? void 0 : toast2.classes) == null ? void 0 : _b[toastType]), 0)} data-sonner-toast=""${add_attribute("data-styled", !(toast2.component || (toast2 == null ? void 0 : toast2.unstyled) || unstyled), 0)}${add_attribute("data-mounted", mounted, 0)}${add_attribute("data-promise", Boolean(toast2.promise), 0)}${add_attribute("data-removed", removed, 0)}${add_attribute("data-visible", isVisible, 0)}${add_attribute("data-y-position", coords[0], 0)}${add_attribute("data-x-position", coords[1], 0)}${add_attribute("data-index", index, 0)}${add_attribute("data-front", isFront, 0)}${add_attribute("data-swiping", swiping, 0)}${add_attribute("data-type", toastType, 0)}${add_attribute("data-invert", invert, 0)}${add_attribute("data-swipe-out", swipeOut, 0)}${add_attribute("data-expanded", Boolean(expanded || expandByDefault && mounted), 0)}${add_styles(merge_ssr_styles(escape(`${$$props.style} ${toast2.style}`, true), {
    "--index": index,
    "--toasts-before": index,
    "--z-index": $toasts.length - index,
    "--offset": `${removed ? offsetBeforeRemove : offset2}px`,
    "--initial-height": `${initialHeight}px`
  }))}${add_attribute("this", toastRef, 0)}>${closeButton && !toast2.component ? `<button aria-label="Close toast"${add_attribute("data-disabled", disabled, 0)} data-close-button${add_attribute("class", cn(classes == null ? void 0 : classes.closeButton, (_c = toast2 == null ? void 0 : toast2.classes) == null ? void 0 : _c.closeButton), 0)}><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>` : ``} ${toast2.component ? `${validate_component(toast2.component || missing_component, "svelte:component").$$render($$result, Object.assign({}, toast2.componentProps), {}, {})}` : `${toastType !== "default" || toast2.icon || toast2.promise ? `<div data-icon="">${(toast2.promise || toastType === "loading") && !toast2.icon ? `${slots["loading-icon"] ? slots["loading-icon"]({}) : ``}` : ``} ${toast2.icon ? `${validate_component(toast2.icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}` : `${toastType === "success" ? `${slots["success-icon"] ? slots["success-icon"]({}) : ``}` : `${toastType === "error" ? `${slots["error-icon"] ? slots["error-icon"]({}) : ``}` : `${toastType === "warning" ? `${slots["warning-icon"] ? slots["warning-icon"]({}) : ``}` : `${toastType === "info" ? `${slots["info-icon"] ? slots["info-icon"]({}) : ``}` : ``}`}`}`}`}</div>` : ``} <div data-content="">${toast2.title ? `<div data-title=""${add_attribute("class", cn(classes == null ? void 0 : classes.title, (_d = toast2 == null ? void 0 : toast2.classes) == null ? void 0 : _d.title), 0)}>${typeof toast2.title !== "string" ? `${validate_component(toast2.title || missing_component, "svelte:component").$$render($$result, Object.assign({}, toast2.componentProps), {}, {})}` : `${escape(toast2.title)}`}</div>` : ``} ${toast2.description ? `<div data-description=""${add_attribute("class", cn(descriptionClass, toastDescriptionClass, classes == null ? void 0 : classes.description, (_e = toast2.classes) == null ? void 0 : _e.description), 0)}>${typeof toast2.description !== "string" ? `${validate_component(toast2.description || missing_component, "svelte:component").$$render($$result, Object.assign({}, toast2.componentProps), {}, {})}` : `${escape(toast2.description)}`}</div>` : ``}</div> ${toast2.cancel ? `<button data-button data-cancel${add_attribute("style", cancelButtonStyle, 0)}${add_attribute("class", cn(classes == null ? void 0 : classes.cancelButton, (_f = toast2 == null ? void 0 : toast2.classes) == null ? void 0 : _f.cancelButton), 0)}>${escape(toast2.cancel.label)}</button>` : ``} ${toast2.action ? `<button data-button=""${add_attribute("style", actionButtonStyle, 0)}${add_attribute("class", cn(classes == null ? void 0 : classes.actionButton, (_g = toast2 == null ? void 0 : toast2.classes) == null ? void 0 : _g.actionButton), 0)}>${escape(toast2.action.label)}</button>` : ``}`}</li>`;
});
const css = {
  code: ":where(html[dir='ltr']),:where([data-sonner-toaster][dir='ltr']){--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}:where(html[dir='rtl']),:where([data-sonner-toaster][dir='rtl']){--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,\n			system-ui,\n			-apple-system,\n			BlinkMacSystemFont,\n			Segoe UI,\n			Roboto,\n			Helvetica Neue,\n			Arial,\n			Noto Sans,\n			sans-serif,\n			Apple Color Emoji,\n			Segoe UI Emoji,\n			Segoe UI Symbol,\n			Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999}:where([data-sonner-toaster][data-x-position='right']){right:max(var(--offset), env(safe-area-inset-right))}:where([data-sonner-toaster][data-x-position='left']){left:max(var(--offset), env(safe-area-inset-left))}:where([data-sonner-toaster][data-x-position='center']){left:50%;transform:translateX(-50%)}:where([data-sonner-toaster][data-y-position='top']){top:max(var(--offset), env(safe-area-inset-top))}:where([data-sonner-toaster][data-y-position='bottom']){bottom:max(var(--offset), env(safe-area-inset-bottom))}:where([data-sonner-toast]){--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform 400ms,\n			opacity 400ms,\n			height 400ms,\n			box-shadow 200ms;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled='true']){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0px 4px 12px rgba(0, 0, 0, 0.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0px 4px 12px rgba(0, 0, 0, 0.1),\n			0 0 0 2px rgba(0, 0, 0, 0.2)}:where([data-sonner-toast][data-y-position='top']){top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position='bottom']){bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise='true']) :where([data-icon])>svg{opacity:0;transform:scale(0.8);transform-origin:center;animation:sonner-fade-in 300ms ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled='true'] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity 400ms,\n			box-shadow 200ms}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px rgba(0, 0, 0, 0.4)}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0, 0, 0, 0.08)}:where([data-sonner-toast][data-theme='dark']) :where([data-cancel]){background:rgba(255, 255, 255, 0.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;background:var(--gray1);color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity 100ms,\n			background 200ms,\n			border-color 200ms}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0px 4px 12px rgba(0, 0, 0, 0.1),\n			0 0 0 2px rgba(0, 0, 0, 0.2)}:where([data-sonner-toast]) :where([data-disabled='true']){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping='true'])::before{content:'';position:absolute;left:0;right:0;height:100%;z-index:-1}:where(\n			[data-sonner-toast][data-y-position='top'][data-swiping='true']\n		)::before{bottom:50%;transform:scaleY(3) translateY(50%)}:where(\n			[data-sonner-toast][data-y-position='bottom'][data-swiping='true']\n		)::before{top:50%;transform:scaleY(3) translateY(-50%)}:where(\n			[data-sonner-toast][data-swiping='false'][data-removed='true']\n		)::before{content:'';position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast])::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted='true']){--y:translateY(0);opacity:1}:where([data-sonner-toast][data-expanded='false'][data-front='false']){--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before)))\n			scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity 400ms}:where(\n			[data-sonner-toast][data-expanded='false'][data-front='false'][data-styled='true']\n		)\n		>*{opacity:0}:where([data-sonner-toast][data-visible='false']){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted='true'][data-expanded='true']){--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where(\n			[data-sonner-toast][data-removed='true'][data-front='true'][data-swipe-out='false']\n		){--y:translateY(calc(var(--lift) * -100%));opacity:0}:where(\n			[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='true']\n		){--y:translateY(\n			calc(var(--lift) * var(--offset) + var(--lift) * -100%)\n		);opacity:0}:where(\n			[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='false']\n		){--y:translateY(40%);opacity:0;transition:transform 500ms,\n			opacity 200ms}:where(\n			[data-sonner-toast][data-removed='true'][data-front='false']\n		)::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping='true']{transform:var(--y) translateY(var(--swipe-amount, 0px));transition:none}[data-sonner-toast][data-swipe-out='true'][data-y-position='bottom'],[data-sonner-toast][data-swipe-out='true'][data-y-position='top']{animation:swipe-out 200ms ease-out forwards}@keyframes swipe-out{from{transform:translateY(\n				calc(var(--lift) * var(--offset) + var(--swipe-amount))\n			);opacity:1}to{transform:translateY(\n				calc(\n					var(--lift) * var(--offset) + var(--swipe-amount) +\n						var(--lift) * -100%\n				)\n			);opacity:0}}@media(max-width: 600px){[data-sonner-toaster]{position:fixed;--mobile-offset:16px;right:var(--mobile-offset);left:var(--mobile-offset);width:100%}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset) * 2)}[data-sonner-toaster][data-x-position='left']{left:var(--mobile-offset)}[data-sonner-toaster][data-y-position='bottom']{bottom:20px}[data-sonner-toaster][data-y-position='top']{top:20px}[data-sonner-toaster][data-x-position='center']{left:var(--mobile-offset);right:var(--mobile-offset);transform:none}}[data-sonner-toaster][data-theme='light']{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 91%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 91%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 91%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme='light']\n		[data-sonner-toast][data-invert='true']{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-theme='dark']\n		[data-sonner-toast][data-invert='true']{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-theme='dark']{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 100%, 12%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 12%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-rich-colors='true'] [data-sonner-toast][data-type='success']{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-theme='dark']\n		[data-sonner-toast][data-type='default']\n		[data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-rich-colors='true']\n		[data-sonner-toast][data-type='success']\n		[data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors='true'] [data-sonner-toast][data-type='info']{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors='true']\n		[data-sonner-toast][data-type='info']\n		[data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors='true'] [data-sonner-toast][data-type='warning']{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors='true']\n		[data-sonner-toast][data-type='warning']\n		[data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors='true'] [data-sonner-toast][data-type='error']{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors='true']\n		[data-sonner-toast][data-type='error']\n		[data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible='false']{transform-origin:center;animation:sonner-fade-out 0.2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(0.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-0.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-0.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-0.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-0.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-0.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-0.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-0.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-0.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-0.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:0.15}}@media(prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none !important;animation:none !important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);transform-origin:center;transition:opacity 200ms,\n			transform 200ms}.sonner-loader[data-visible='false']{opacity:0;transform:scale(0.8) translate(-50%, -50%)}",
  map: `{"version":3,"file":"Toaster.svelte","sources":["Toaster.svelte"],"sourcesContent":["<script>import { onDestroy, onMount } from 'svelte';\\nimport { toastState } from './state.js';\\nimport Toast from './Toast.svelte';\\nimport Loader from './Loader.svelte';\\nimport Icon from './Icon.svelte';\\n// Visible toasts amount\\nconst VISIBLE_TOASTS_AMOUNT = 3;\\n// Viewport padding\\nconst VIEWPORT_OFFSET = '32px';\\n// Default toast width\\nconst TOAST_WIDTH = 356;\\n// Default gap between toasts\\nconst GAP = 14;\\nconst DARK = 'dark';\\nconst LIGHT = 'light';\\nfunction getInitialTheme(t) {\\n    if (t !== 'system') {\\n        return t;\\n    }\\n    if (typeof window !== 'undefined') {\\n        if (window.matchMedia &&\\n            window.matchMedia('(prefers-color-scheme: dark)').matches) {\\n            return DARK;\\n        }\\n        return LIGHT;\\n    }\\n    return LIGHT;\\n}\\nfunction getDocumentDirection() {\\n    if (typeof window === 'undefined')\\n        return 'ltr';\\n    if (typeof document === 'undefined')\\n        return 'ltr'; // For Fresh purpose\\n    const dirAttribute = document.documentElement.getAttribute('dir');\\n    if (dirAttribute === 'auto' || !dirAttribute) {\\n        return window.getComputedStyle(document.documentElement)\\n            .direction;\\n    }\\n    return dirAttribute;\\n}\\nexport let invert = false;\\nexport let theme = 'light';\\nexport let position = 'bottom-right';\\nexport let hotkey = ['altKey', 'KeyT'];\\nexport let richColors = false;\\nexport let expand = false;\\nexport let duration = 4000;\\nexport let visibleToasts = VISIBLE_TOASTS_AMOUNT;\\nexport let closeButton = false;\\nexport let toastOptions = {};\\nexport let offset = null;\\nexport let dir = getDocumentDirection();\\nconst { toasts, heights, reset } = toastState;\\n$: possiblePositions = Array.from(new Set([\\n    position,\\n    ...$toasts\\n        .filter((toast) => toast.position)\\n        .map((toast) => toast.position)\\n].filter(Boolean)));\\nlet expanded = false;\\nlet interacting = false;\\nlet actualTheme = getInitialTheme(theme);\\nlet listRef;\\nlet lastFocusedElementRef = null;\\nlet isFocusWithinRef = false;\\n$: hotkeyLabel = hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, '');\\n$: if ($toasts.length <= 1) {\\n    expanded = false;\\n}\\n// Check for dismissed toasts and remove them. We need to do this to have dismiss animation.\\n$: {\\n    const toastsToDismiss = $toasts.filter((toast) => toast.dismiss && !toast.delete);\\n    if (toastsToDismiss.length > 0) {\\n        const updatedToasts = $toasts.map((toast) => {\\n            const matchingToast = toastsToDismiss.find((dismissToast) => dismissToast.id === toast.id);\\n            if (matchingToast) {\\n                return { ...toast, delete: true };\\n            }\\n            return toast;\\n        });\\n        toasts.set(updatedToasts);\\n    }\\n}\\nonDestroy(() => {\\n    if (listRef && lastFocusedElementRef) {\\n        lastFocusedElementRef.focus({ preventScroll: true });\\n        lastFocusedElementRef = null;\\n        isFocusWithinRef = false;\\n    }\\n});\\nonMount(() => {\\n    reset();\\n    const handleKeydown = (event) => {\\n        const isHotkeyPressed = hotkey.every((key) => \\n        // eslint-disable-next-line @typescript-eslint/no-explicit-any\\n        event[key] || event.code === key);\\n        if (isHotkeyPressed) {\\n            expanded = true;\\n            listRef?.focus();\\n        }\\n        if (event.code === 'Escape' &&\\n            (document.activeElement === listRef ||\\n                listRef?.contains(document.activeElement))) {\\n            expanded = false;\\n        }\\n    };\\n    document.addEventListener('keydown', handleKeydown);\\n    return () => {\\n        document.removeEventListener('keydown', handleKeydown);\\n    };\\n});\\n$: {\\n    if (theme !== 'system') {\\n        actualTheme = theme;\\n    }\\n    if (typeof window !== 'undefined') {\\n        if (theme === 'system') {\\n            // check if current preference is dark\\n            if (window.matchMedia &&\\n                window.matchMedia('(prefers-color-scheme: dark)').matches) {\\n                // it's currently dark\\n                actualTheme = DARK;\\n            }\\n            else {\\n                // it's not dark\\n                actualTheme = LIGHT;\\n            }\\n        }\\n        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');\\n        const changeHandler = ({ matches }) => {\\n            actualTheme = matches ? DARK : LIGHT;\\n        };\\n        if ('addEventListener' in mediaQueryList) {\\n            mediaQueryList.addEventListener('change', changeHandler);\\n        }\\n        else {\\n            // @ts-expect-error deprecated API\\n            mediaQueryList.addListener(changeHandler);\\n        }\\n    }\\n}\\nfunction handleBlur(event) {\\n    if (isFocusWithinRef &&\\n        !event.currentTarget.contains(event.relatedTarget)) {\\n        isFocusWithinRef = false;\\n        if (lastFocusedElementRef) {\\n            lastFocusedElementRef.focus({ preventScroll: true });\\n            lastFocusedElementRef = null;\\n        }\\n    }\\n}\\nfunction handleFocus(event) {\\n    if (!isFocusWithinRef) {\\n        isFocusWithinRef = true;\\n        lastFocusedElementRef = event.relatedTarget;\\n    }\\n}\\n<\/script>\\n\\n{#if $toasts.length > 0}\\n\\t<section aria-label={\`Notifications \${hotkeyLabel}\`} tabIndex={-1}>\\n\\t\\t{#each possiblePositions as position, index}\\n\\t\\t\\t<ol\\n\\t\\t\\t\\ttabIndex={-1}\\n\\t\\t\\t\\tbind:this={listRef}\\n\\t\\t\\t\\tclass={$$props.class}\\n\\t\\t\\t\\tdata-sonner-toaster\\n\\t\\t\\t\\tdata-theme={actualTheme}\\n\\t\\t\\t\\tdata-rich-colors={richColors}\\n\\t\\t\\t\\tdir={dir === 'auto' ? getDocumentDirection() : dir}\\n\\t\\t\\t\\tdata-y-position={position.split('-')[0]}\\n\\t\\t\\t\\tdata-x-position={position.split('-')[1]}\\n\\t\\t\\t\\ton:blur={handleBlur}\\n\\t\\t\\t\\ton:focus={handleFocus}\\n\\t\\t\\t\\ton:mouseenter={() => (expanded = true)}\\n\\t\\t\\t\\ton:mousemove={() => (expanded = true)}\\n\\t\\t\\t\\ton:mouseleave={() => {\\n\\t\\t\\t\\t\\tif (!interacting) {\\n\\t\\t\\t\\t\\t\\texpanded = false;\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}}\\n\\t\\t\\t\\ton:pointerdown={() => (interacting = true)}\\n\\t\\t\\t\\ton:pointerup={() => (interacting = false)}\\n\\t\\t\\t\\tstyle:--front-toast-height={\`\${$heights[0]?.height}px\`}\\n\\t\\t\\t\\tstyle:--offset={typeof offset === 'number'\\n\\t\\t\\t\\t\\t? \`\${offset}px\`\\n\\t\\t\\t\\t\\t: offset || VIEWPORT_OFFSET}\\n\\t\\t\\t\\tstyle:--width={\`\${TOAST_WIDTH}px\`}\\n\\t\\t\\t\\tstyle:--gap={\`\${GAP}px\`}\\n\\t\\t\\t\\tstyle={$$props.style}\\n\\t\\t\\t\\t{...$$restProps}\\n\\t\\t\\t>\\n\\t\\t\\t\\t{#each $toasts.filter((toast) => (!toast.position && index === 0) || toast.position === position) as toast, index (toast.id)}\\n\\t\\t\\t\\t\\t<Toast\\n\\t\\t\\t\\t\\t\\t{index}\\n\\t\\t\\t\\t\\t\\t{toast}\\n\\t\\t\\t\\t\\t\\t{invert}\\n\\t\\t\\t\\t\\t\\t{visibleToasts}\\n\\t\\t\\t\\t\\t\\t{closeButton}\\n\\t\\t\\t\\t\\t\\t{interacting}\\n\\t\\t\\t\\t\\t\\t{position}\\n\\t\\t\\t\\t\\t\\texpandByDefault={expand}\\n\\t\\t\\t\\t\\t\\t{expanded}\\n\\t\\t\\t\\t\\t\\tactionButtonStyle={toastOptions?.actionButtonStyle ||\\n\\t\\t\\t\\t\\t\\t\\t''}\\n\\t\\t\\t\\t\\t\\tcancelButtonStyle={toastOptions?.cancelButtonStyle ||\\n\\t\\t\\t\\t\\t\\t\\t''}\\n\\t\\t\\t\\t\\t\\tclass={toastOptions?.class || ''}\\n\\t\\t\\t\\t\\t\\tdescriptionClass={toastOptions?.descriptionClass || ''}\\n\\t\\t\\t\\t\\t\\tclasses={toastOptions.classes || {}}\\n\\t\\t\\t\\t\\t\\tduration={toastOptions?.duration ?? duration}\\n\\t\\t\\t\\t\\t\\tunstyled={toastOptions.unstyled || false}\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t<slot name=\\"loading-icon\\" slot=\\"loading-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t<Loader visible={toast.type === 'loading'} />\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t\\t<slot name=\\"success-icon\\" slot=\\"success-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t<Icon type=\\"success\\" />\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t\\t<slot name=\\"error-icon\\" slot=\\"error-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t<Icon type=\\"error\\" />\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t\\t<slot name=\\"warning-icon\\" slot=\\"warning-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t<Icon type=\\"warning\\" />\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t\\t<slot name=\\"info-icon\\" slot=\\"info-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t<Icon type=\\"info\\" />\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t</Toast>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</ol>\\n\\t\\t{/each}\\n\\t</section>\\n{/if}\\n\\n<style global>\\n\\t:global(:where(html[dir='ltr'])),\\n\\t:global(:where([data-sonner-toaster][dir='ltr'])) {\\n\\t\\t--toast-icon-margin-start: -3px;\\n\\t\\t--toast-icon-margin-end: 4px;\\n\\t\\t--toast-svg-margin-start: -1px;\\n\\t\\t--toast-svg-margin-end: 0px;\\n\\t\\t--toast-button-margin-start: auto;\\n\\t\\t--toast-button-margin-end: 0;\\n\\t\\t--toast-close-button-start: 0;\\n\\t\\t--toast-close-button-end: unset;\\n\\t\\t--toast-close-button-transform: translate(-35%, -35%);\\n\\t}\\n\\n\\t:global(:where(html[dir='rtl'])),\\n\\t:global(:where([data-sonner-toaster][dir='rtl'])) {\\n\\t\\t--toast-icon-margin-start: 4px;\\n\\t\\t--toast-icon-margin-end: -3px;\\n\\t\\t--toast-svg-margin-start: 0px;\\n\\t\\t--toast-svg-margin-end: -1px;\\n\\t\\t--toast-button-margin-start: 0;\\n\\t\\t--toast-button-margin-end: auto;\\n\\t\\t--toast-close-button-start: unset;\\n\\t\\t--toast-close-button-end: 0;\\n\\t\\t--toast-close-button-transform: translate(35%, -35%);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster])) {\\n\\t\\tposition: fixed;\\n\\t\\twidth: var(--width);\\n\\t\\tfont-family:\\n\\t\\t\\tui-sans-serif,\\n\\t\\t\\tsystem-ui,\\n\\t\\t\\t-apple-system,\\n\\t\\t\\tBlinkMacSystemFont,\\n\\t\\t\\tSegoe UI,\\n\\t\\t\\tRoboto,\\n\\t\\t\\tHelvetica Neue,\\n\\t\\t\\tArial,\\n\\t\\t\\tNoto Sans,\\n\\t\\t\\tsans-serif,\\n\\t\\t\\tApple Color Emoji,\\n\\t\\t\\tSegoe UI Emoji,\\n\\t\\t\\tSegoe UI Symbol,\\n\\t\\t\\tNoto Color Emoji;\\n\\t\\t--gray1: hsl(0, 0%, 99%);\\n\\t\\t--gray2: hsl(0, 0%, 97.3%);\\n\\t\\t--gray3: hsl(0, 0%, 95.1%);\\n\\t\\t--gray4: hsl(0, 0%, 93%);\\n\\t\\t--gray5: hsl(0, 0%, 90.9%);\\n\\t\\t--gray6: hsl(0, 0%, 88.7%);\\n\\t\\t--gray7: hsl(0, 0%, 85.8%);\\n\\t\\t--gray8: hsl(0, 0%, 78%);\\n\\t\\t--gray9: hsl(0, 0%, 56.1%);\\n\\t\\t--gray10: hsl(0, 0%, 52.3%);\\n\\t\\t--gray11: hsl(0, 0%, 43.5%);\\n\\t\\t--gray12: hsl(0, 0%, 9%);\\n\\t\\t--border-radius: 8px;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tpadding: 0;\\n\\t\\tmargin: 0;\\n\\t\\tlist-style: none;\\n\\t\\toutline: none;\\n\\t\\tz-index: 999999999;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster][data-x-position='right'])) {\\n\\t\\tright: max(var(--offset), env(safe-area-inset-right));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster][data-x-position='left'])) {\\n\\t\\tleft: max(var(--offset), env(safe-area-inset-left));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster][data-x-position='center'])) {\\n\\t\\tleft: 50%;\\n\\t\\ttransform: translateX(-50%);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster][data-y-position='top'])) {\\n\\t\\ttop: max(var(--offset), env(safe-area-inset-top));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster][data-y-position='bottom'])) {\\n\\t\\tbottom: max(var(--offset), env(safe-area-inset-bottom));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) {\\n\\t\\t--y: translateY(100%);\\n\\t\\t--lift-amount: calc(var(--lift) * var(--gap));\\n\\t\\tz-index: var(--z-index);\\n\\t\\tposition: absolute;\\n\\t\\topacity: 0;\\n\\t\\ttransform: var(--y);\\n\\t\\tfilter: blur(0);\\n\\t\\t/* https://stackoverflow.com/questions/48124372/pointermove-event-not-working-with-touch-why-not */\\n\\t\\ttouch-action: none;\\n\\t\\ttransition:\\n\\t\\t\\ttransform 400ms,\\n\\t\\t\\topacity 400ms,\\n\\t\\t\\theight 400ms,\\n\\t\\t\\tbox-shadow 200ms;\\n\\t\\tbox-sizing: border-box;\\n\\t\\toutline: none;\\n\\t\\toverflow-wrap: anywhere;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-styled='true'])) {\\n\\t\\tpadding: 16px;\\n\\t\\tbackground: var(--normal-bg);\\n\\t\\tborder: 1px solid var(--normal-border);\\n\\t\\tcolor: var(--normal-text);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tbox-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);\\n\\t\\twidth: var(--width);\\n\\t\\tfont-size: 13px;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tgap: 6px;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast]:focus-visible)) {\\n\\t\\tbox-shadow:\\n\\t\\t\\t0px 4px 12px rgba(0, 0, 0, 0.1),\\n\\t\\t\\t0 0 0 2px rgba(0, 0, 0, 0.2);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-y-position='top'])) {\\n\\t\\ttop: 0;\\n\\t\\t--y: translateY(-100%);\\n\\t\\t--lift: 1;\\n\\t\\t--lift-amount: calc(1 * var(--gap));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-y-position='bottom'])) {\\n\\t\\tbottom: 0;\\n\\t\\t--y: translateY(100%);\\n\\t\\t--lift: -1;\\n\\t\\t--lift-amount: calc(var(--lift) * var(--gap));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-description])) {\\n\\t\\tfont-weight: 400;\\n\\t\\tline-height: 1.4;\\n\\t\\tcolor: inherit;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-title])) {\\n\\t\\tfont-weight: 500;\\n\\t\\tline-height: 1.5;\\n\\t\\tcolor: inherit;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-icon])) {\\n\\t\\tdisplay: flex;\\n\\t\\theight: 16px;\\n\\t\\twidth: 16px;\\n\\t\\tposition: relative;\\n\\t\\tjustify-content: flex-start;\\n\\t\\talign-items: center;\\n\\t\\tflex-shrink: 0;\\n\\t\\tmargin-left: var(--toast-icon-margin-start);\\n\\t\\tmargin-right: var(--toast-icon-margin-end);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-promise='true'])) :global(:where([data-icon])) > :global(svg) {\\n\\t\\topacity: 0;\\n\\t\\ttransform: scale(0.8);\\n\\t\\ttransform-origin: center;\\n\\t\\tanimation: sonner-fade-in 300ms ease forwards;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-icon])) > :global(*) {\\n\\t\\tflex-shrink: 0;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-icon])) :global(svg) {\\n\\t\\tmargin-left: var(--toast-svg-margin-start);\\n\\t\\tmargin-right: var(--toast-svg-margin-end);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-content])) {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: 2px;\\n\\t}\\n\\n\\t:global([data-sonner-toast][data-styled='true']) :global([data-button]) {\\n\\t\\tborder-radius: 4px;\\n\\t\\tpadding-left: 8px;\\n\\t\\tpadding-right: 8px;\\n\\t\\theight: 24px;\\n\\t\\tfont-size: 12px;\\n\\t\\tcolor: var(--normal-bg);\\n\\t\\tbackground: var(--normal-text);\\n\\t\\tmargin-left: var(--toast-button-margin-start);\\n\\t\\tmargin-right: var(--toast-button-margin-end);\\n\\t\\tborder: none;\\n\\t\\tcursor: pointer;\\n\\t\\toutline: none;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tflex-shrink: 0;\\n\\t\\ttransition:\\n\\t\\t\\topacity 400ms,\\n\\t\\t\\tbox-shadow 200ms;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-button]):focus-visible) {\\n\\t\\tbox-shadow: 0 0 0 2px rgba(0, 0, 0, 0.4);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-button]):first-of-type) {\\n\\t\\tmargin-left: var(--toast-button-margin-start);\\n\\t\\tmargin-right: var(--toast-button-margin-end);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-cancel])) {\\n\\t\\tcolor: var(--normal-text);\\n\\t\\tbackground: rgba(0, 0, 0, 0.08);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-theme='dark'])) :global(:where([data-cancel])) {\\n\\t\\tbackground: rgba(255, 255, 255, 0.3);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-close-button])) {\\n\\t\\tposition: absolute;\\n\\t\\tleft: var(--toast-close-button-start);\\n\\t\\tright: var(--toast-close-button-end);\\n\\t\\ttop: 0;\\n\\t\\theight: 20px;\\n\\t\\twidth: 20px;\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\talign-items: center;\\n\\t\\tpadding: 0;\\n\\t\\tbackground: var(--gray1);\\n\\t\\tcolor: var(--gray12);\\n\\t\\tborder: 1px solid var(--gray4);\\n\\t\\ttransform: var(--toast-close-button-transform);\\n\\t\\tborder-radius: 50%;\\n\\t\\tcursor: pointer;\\n\\t\\tz-index: 1;\\n\\t\\ttransition:\\n\\t\\t\\topacity 100ms,\\n\\t\\t\\tbackground 200ms,\\n\\t\\t\\tborder-color 200ms;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-close-button]):focus-visible) {\\n\\t\\tbox-shadow:\\n\\t\\t\\t0px 4px 12px rgba(0, 0, 0, 0.1),\\n\\t\\t\\t0 0 0 2px rgba(0, 0, 0, 0.2);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-disabled='true'])) {\\n\\t\\tcursor: not-allowed;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast]):hover) :global(:where([data-close-button]):hover) {\\n\\t\\tbackground: var(--gray2);\\n\\t\\tborder-color: var(--gray5);\\n\\t}\\n\\n\\t/* Leave a ghost div to avoid setting hover to false when swiping out */\\n\\t:global(:where([data-sonner-toast][data-swiping='true'])::before) {\\n\\t\\tcontent: '';\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\tright: 0;\\n\\t\\theight: 100%;\\n\\t\\tz-index: -1;\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-y-position='top'][data-swiping='true']\\n\\t\\t)::before) {\\n\\t\\t/* y 50% needed to distribute height additional height evenly */\\n\\t\\tbottom: 50%;\\n\\t\\ttransform: scaleY(3) translateY(50%);\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-y-position='bottom'][data-swiping='true']\\n\\t\\t)::before) {\\n\\t\\t/* y -50% needed to distribute height additional height evenly */\\n\\t\\ttop: 50%;\\n\\t\\ttransform: scaleY(3) translateY(-50%);\\n\\t}\\n\\n\\t/* Leave a ghost div to avoid setting hover to false when transitioning out */\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-swiping='false'][data-removed='true']\\n\\t\\t)::before) {\\n\\t\\tcontent: '';\\n\\t\\tposition: absolute;\\n\\t\\tinset: 0;\\n\\t\\ttransform: scaleY(2);\\n\\t}\\n\\n\\t/* Needed to avoid setting hover to false when inbetween toasts */\\n\\t:global(:where([data-sonner-toast])::after) {\\n\\t\\tcontent: '';\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\theight: calc(var(--gap) + 1px);\\n\\t\\tbottom: 100%;\\n\\t\\twidth: 100%;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-mounted='true'])) {\\n\\t\\t--y: translateY(0);\\n\\t\\topacity: 1;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-expanded='false'][data-front='false'])) {\\n\\t\\t--scale: var(--toasts-before) * 0.05 + 1;\\n\\t\\t--y: translateY(calc(var(--lift-amount) * var(--toasts-before)))\\n\\t\\t\\tscale(calc(-1 * var(--scale)));\\n\\t\\theight: var(--front-toast-height);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) > :global(*) {\\n\\t\\ttransition: opacity 400ms;\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-expanded='false'][data-front='false'][data-styled='true']\\n\\t\\t)\\n\\t\\t)> :global(*) {\\n\\t\\topacity: 0;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-visible='false'])) {\\n\\t\\topacity: 0;\\n\\t\\tpointer-events: none;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-mounted='true'][data-expanded='true'])) {\\n\\t\\t--y: translateY(calc(var(--lift) * var(--offset)));\\n\\t\\theight: var(--initial-height);\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-removed='true'][data-front='true'][data-swipe-out='false']\\n\\t\\t)) {\\n\\t\\t--y: translateY(calc(var(--lift) * -100%));\\n\\t\\topacity: 0;\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='true']\\n\\t\\t)) {\\n\\t\\t--y: translateY(\\n\\t\\t\\tcalc(var(--lift) * var(--offset) + var(--lift) * -100%)\\n\\t\\t);\\n\\t\\topacity: 0;\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='false']\\n\\t\\t)) {\\n\\t\\t--y: translateY(40%);\\n\\t\\topacity: 0;\\n\\t\\ttransition:\\n\\t\\t\\ttransform 500ms,\\n\\t\\t\\topacity 200ms;\\n\\t}\\n\\n\\t/* Bump up the height to make sure hover state doesn't get set to false */\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-removed='true'][data-front='false']\\n\\t\\t)::before) {\\n\\t\\theight: calc(var(--initial-height) + 20%);\\n\\t}\\n\\n\\t:global([data-sonner-toast][data-swiping='true']) {\\n\\t\\ttransform: var(--y) translateY(var(--swipe-amount, 0px));\\n\\t\\ttransition: none;\\n\\t}\\n\\n\\t:global([data-sonner-toast][data-swipe-out='true'][data-y-position='bottom']),\\n\\t:global([data-sonner-toast][data-swipe-out='true'][data-y-position='top']) {\\n\\t\\tanimation: swipe-out 200ms ease-out forwards;\\n\\t}\\n\\n\\t@keyframes -global-swipe-out {\\n\\t\\tfrom {\\n\\t\\t\\ttransform: translateY(\\n\\t\\t\\t\\tcalc(var(--lift) * var(--offset) + var(--swipe-amount))\\n\\t\\t\\t);\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\n\\t\\tto {\\n\\t\\t\\ttransform: translateY(\\n\\t\\t\\t\\tcalc(\\n\\t\\t\\t\\t\\tvar(--lift) * var(--offset) + var(--swipe-amount) +\\n\\t\\t\\t\\t\\t\\tvar(--lift) * -100%\\n\\t\\t\\t\\t)\\n\\t\\t\\t);\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t}\\n\\n\\t@media (max-width: 600px) {\\n\\t\\t:global([data-sonner-toaster]) {\\n\\t\\t\\tposition: fixed;\\n\\t\\t\\t--mobile-offset: 16px;\\n\\t\\t\\tright: var(--mobile-offset);\\n\\t\\t\\tleft: var(--mobile-offset);\\n\\t\\t\\twidth: 100%;\\n\\t\\t}\\n\\n\\t\\t:global([data-sonner-toaster]) :global([data-sonner-toast]) {\\n\\t\\t\\tleft: 0;\\n\\t\\t\\tright: 0;\\n\\t\\t\\twidth: calc(100% - var(--mobile-offset) * 2);\\n\\t\\t}\\n\\n\\t\\t:global([data-sonner-toaster][data-x-position='left']) {\\n\\t\\t\\tleft: var(--mobile-offset);\\n\\t\\t}\\n\\n\\t\\t:global([data-sonner-toaster][data-y-position='bottom']) {\\n\\t\\t\\tbottom: 20px;\\n\\t\\t}\\n\\n\\t\\t:global([data-sonner-toaster][data-y-position='top']) {\\n\\t\\t\\ttop: 20px;\\n\\t\\t}\\n\\n\\t\\t:global([data-sonner-toaster][data-x-position='center']) {\\n\\t\\t\\tleft: var(--mobile-offset);\\n\\t\\t\\tright: var(--mobile-offset);\\n\\t\\t\\ttransform: none;\\n\\t\\t}\\n\\t}\\n\\n\\t:global([data-sonner-toaster][data-theme='light']) {\\n\\t\\t--normal-bg: #fff;\\n\\t\\t--normal-border: var(--gray4);\\n\\t\\t--normal-text: var(--gray12);\\n\\n\\t\\t--success-bg: hsl(143, 85%, 96%);\\n\\t\\t--success-border: hsl(145, 92%, 91%);\\n\\t\\t--success-text: hsl(140, 100%, 27%);\\n\\n\\t\\t--info-bg: hsl(208, 100%, 97%);\\n\\t\\t--info-border: hsl(221, 91%, 91%);\\n\\t\\t--info-text: hsl(210, 92%, 45%);\\n\\n\\t\\t--warning-bg: hsl(49, 100%, 97%);\\n\\t\\t--warning-border: hsl(49, 91%, 91%);\\n\\t\\t--warning-text: hsl(31, 92%, 45%);\\n\\n\\t\\t--error-bg: hsl(359, 100%, 97%);\\n\\t\\t--error-border: hsl(359, 100%, 94%);\\n\\t\\t--error-text: hsl(360, 100%, 45%);\\n\\t}\\n\\n\\t:global([data-sonner-toaster][data-theme='light']\\n\\t\\t[data-sonner-toast][data-invert='true']) {\\n\\t\\t--normal-bg: #000;\\n\\t\\t--normal-border: hsl(0, 0%, 20%);\\n\\t\\t--normal-text: var(--gray1);\\n\\t}\\n\\n\\t:global([data-sonner-toaster][data-theme='dark']\\n\\t\\t[data-sonner-toast][data-invert='true']) {\\n\\t\\t--normal-bg: #fff;\\n\\t\\t--normal-border: var(--gray3);\\n\\t\\t--normal-text: var(--gray12);\\n\\t}\\n\\n\\t:global([data-sonner-toaster][data-theme='dark']) {\\n\\t\\t--normal-bg: #000;\\n\\t\\t--normal-border: hsl(0, 0%, 20%);\\n\\t\\t--normal-text: var(--gray1);\\n\\n\\t\\t--success-bg: hsl(150, 100%, 6%);\\n\\t\\t--success-border: hsl(147, 100%, 12%);\\n\\t\\t--success-text: hsl(150, 86%, 65%);\\n\\n\\t\\t--info-bg: hsl(215, 100%, 6%);\\n\\t\\t--info-border: hsl(223, 100%, 12%);\\n\\t\\t--info-text: hsl(216, 87%, 65%);\\n\\n\\t\\t--warning-bg: hsl(64, 100%, 6%);\\n\\t\\t--warning-border: hsl(60, 100%, 12%);\\n\\t\\t--warning-text: hsl(46, 87%, 65%);\\n\\n\\t\\t--error-bg: hsl(358, 76%, 10%);\\n\\t\\t--error-border: hsl(357, 89%, 16%);\\n\\t\\t--error-text: hsl(358, 100%, 81%);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']) :global([data-sonner-toast][data-type='success']) {\\n\\t\\tbackground: var(--success-bg);\\n\\t\\tborder-color: var(--success-border);\\n\\t\\tcolor: var(--success-text);\\n\\t}\\n\\n\\t:global([data-theme='dark']\\n\\t\\t[data-sonner-toast][data-type='default']\\n\\t\\t[data-close-button]) {\\n\\t\\tbackground: var(--normal-bg);\\n\\t\\tborder-color: var(--normal-border);\\n\\t\\tcolor: var(--normal-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']\\n\\t\\t[data-sonner-toast][data-type='success']\\n\\t\\t[data-close-button]) {\\n\\t\\tbackground: var(--success-bg);\\n\\t\\tborder-color: var(--success-border);\\n\\t\\tcolor: var(--success-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']) :global([data-sonner-toast][data-type='info']) {\\n\\t\\tbackground: var(--info-bg);\\n\\t\\tborder-color: var(--info-border);\\n\\t\\tcolor: var(--info-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']\\n\\t\\t[data-sonner-toast][data-type='info']\\n\\t\\t[data-close-button]) {\\n\\t\\tbackground: var(--info-bg);\\n\\t\\tborder-color: var(--info-border);\\n\\t\\tcolor: var(--info-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']) :global([data-sonner-toast][data-type='warning']) {\\n\\t\\tbackground: var(--warning-bg);\\n\\t\\tborder-color: var(--warning-border);\\n\\t\\tcolor: var(--warning-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']\\n\\t\\t[data-sonner-toast][data-type='warning']\\n\\t\\t[data-close-button]) {\\n\\t\\tbackground: var(--warning-bg);\\n\\t\\tborder-color: var(--warning-border);\\n\\t\\tcolor: var(--warning-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']) :global([data-sonner-toast][data-type='error']) {\\n\\t\\tbackground: var(--error-bg);\\n\\t\\tborder-color: var(--error-border);\\n\\t\\tcolor: var(--error-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']\\n\\t\\t[data-sonner-toast][data-type='error']\\n\\t\\t[data-close-button]) {\\n\\t\\tbackground: var(--error-bg);\\n\\t\\tborder-color: var(--error-border);\\n\\t\\tcolor: var(--error-text);\\n\\t}\\n\\n\\t:global(.sonner-loading-wrapper) {\\n\\t\\t--size: 16px;\\n\\t\\theight: var(--size);\\n\\t\\twidth: var(--size);\\n\\t\\tposition: absolute;\\n\\t\\tinset: 0;\\n\\t\\tz-index: 10;\\n\\t}\\n\\n\\t:global(.sonner-loading-wrapper[data-visible='false']) {\\n\\t\\ttransform-origin: center;\\n\\t\\tanimation: sonner-fade-out 0.2s ease forwards;\\n\\t}\\n\\n\\t:global(.sonner-spinner) {\\n\\t\\tposition: relative;\\n\\t\\ttop: 50%;\\n\\t\\tleft: 50%;\\n\\t\\theight: var(--size);\\n\\t\\twidth: var(--size);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar) {\\n\\t\\tanimation: sonner-spin 1.2s linear infinite;\\n\\t\\tbackground: var(--gray11);\\n\\t\\tborder-radius: 6px;\\n\\t\\theight: 8%;\\n\\t\\tleft: -10%;\\n\\t\\tposition: absolute;\\n\\t\\ttop: -3.9%;\\n\\t\\twidth: 24%;\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(1)) {\\n\\t\\tanimation-delay: -1.2s;\\n\\t\\ttransform: rotate(0.0001deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(2)) {\\n\\t\\tanimation-delay: -1.1s;\\n\\t\\ttransform: rotate(30deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(3)) {\\n\\t\\tanimation-delay: -1s;\\n\\t\\ttransform: rotate(60deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(4)) {\\n\\t\\tanimation-delay: -0.9s;\\n\\t\\ttransform: rotate(90deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(5)) {\\n\\t\\tanimation-delay: -0.8s;\\n\\t\\ttransform: rotate(120deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(6)) {\\n\\t\\tanimation-delay: -0.7s;\\n\\t\\ttransform: rotate(150deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(7)) {\\n\\t\\tanimation-delay: -0.6s;\\n\\t\\ttransform: rotate(180deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(8)) {\\n\\t\\tanimation-delay: -0.5s;\\n\\t\\ttransform: rotate(210deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(9)) {\\n\\t\\tanimation-delay: -0.4s;\\n\\t\\ttransform: rotate(240deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(10)) {\\n\\t\\tanimation-delay: -0.3s;\\n\\t\\ttransform: rotate(270deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(11)) {\\n\\t\\tanimation-delay: -0.2s;\\n\\t\\ttransform: rotate(300deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(12)) {\\n\\t\\tanimation-delay: -0.1s;\\n\\t\\ttransform: rotate(330deg) translate(146%);\\n\\t}\\n\\n\\t@keyframes -global-sonner-fade-in {\\n\\t\\t0% {\\n\\t\\t\\topacity: 0;\\n\\t\\t\\ttransform: scale(0.8);\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\topacity: 1;\\n\\t\\t\\ttransform: scale(1);\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes -global-sonner-fade-out {\\n\\t\\t0% {\\n\\t\\t\\topacity: 1;\\n\\t\\t\\ttransform: scale(1);\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\topacity: 0;\\n\\t\\t\\ttransform: scale(0.8);\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes -global-sonner-spin {\\n\\t\\t0% {\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\topacity: 0.15;\\n\\t\\t}\\n\\t}\\n\\n\\t@media (prefers-reduced-motion) {\\n\\t\\t:global([data-sonner-toast]),\\n\\t\\t:global([data-sonner-toast]) > :global(*),\\n\\t\\t:global(.sonner-loading-bar) {\\n\\t\\t\\ttransition: none !important;\\n\\t\\t\\tanimation: none !important;\\n\\t\\t}\\n\\t}\\n\\n\\t:global(.sonner-loader) {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 50%;\\n\\t\\tleft: 50%;\\n\\t\\ttransform: translate(-50%, -50%);\\n\\t\\ttransform-origin: center;\\n\\t\\ttransition:\\n\\t\\t\\topacity 200ms,\\n\\t\\t\\ttransform 200ms;\\n\\t}\\n\\n\\t:global(.sonner-loader[data-visible='false']) {\\n\\t\\topacity: 0;\\n\\t\\ttransform: scale(0.8) translate(-50%, -50%);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA4OS,uBAAwB,CACxB,wCAA0C,CACjD,yBAAyB,CAAE,IAAI,CAC/B,uBAAuB,CAAE,GAAG,CAC5B,wBAAwB,CAAE,IAAI,CAC9B,sBAAsB,CAAE,GAAG,CAC3B,2BAA2B,CAAE,IAAI,CACjC,yBAAyB,CAAE,CAAC,CAC5B,0BAA0B,CAAE,CAAC,CAC7B,wBAAwB,CAAE,KAAK,CAC/B,8BAA8B,CAAE,qBACjC,CAEQ,uBAAwB,CACxB,wCAA0C,CACjD,yBAAyB,CAAE,GAAG,CAC9B,uBAAuB,CAAE,IAAI,CAC7B,wBAAwB,CAAE,GAAG,CAC7B,sBAAsB,CAAE,IAAI,CAC5B,2BAA2B,CAAE,CAAC,CAC9B,yBAAyB,CAAE,IAAI,CAC/B,0BAA0B,CAAE,KAAK,CACjC,wBAAwB,CAAE,CAAC,CAC3B,8BAA8B,CAAE,oBACjC,CAEQ,6BAA+B,CACtC,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,IAAI,OAAO,CAAC,CACnB,WAAW,CACV,aAAa,CAAC;AACjB,GAAG,SAAS,CAAC;AACb,GAAG,aAAa,CAAC;AACjB,GAAG,kBAAkB,CAAC;AACtB,GAAG,KAAK,CAAC,EAAE,CAAC;AACZ,GAAG,MAAM,CAAC;AACV,GAAG,SAAS,CAAC,IAAI,CAAC;AAClB,GAAG,KAAK,CAAC;AACT,GAAG,IAAI,CAAC,IAAI,CAAC;AACb,GAAG,UAAU,CAAC;AACd,GAAG,KAAK,CAAC,KAAK,CAAC,KAAK,CAAC;AACrB,GAAG,KAAK,CAAC,EAAE,CAAC,KAAK,CAAC;AAClB,GAAG,KAAK,CAAC,EAAE,CAAC,MAAM,CAAC;AACnB,GAAG,IAAI,CAAC,KAAK,CAAC,KAAK,CACjB,OAAO,CAAE,eAAe,CACxB,OAAO,CAAE,iBAAiB,CAC1B,OAAO,CAAE,iBAAiB,CAC1B,OAAO,CAAE,eAAe,CACxB,OAAO,CAAE,iBAAiB,CAC1B,OAAO,CAAE,iBAAiB,CAC1B,OAAO,CAAE,iBAAiB,CAC1B,OAAO,CAAE,eAAe,CACxB,OAAO,CAAE,iBAAiB,CAC1B,QAAQ,CAAE,iBAAiB,CAC3B,QAAQ,CAAE,iBAAiB,CAC3B,QAAQ,CAAE,cAAc,CACxB,eAAe,CAAE,GAAG,CACpB,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,SACV,CAEQ,sDAAwD,CAC/D,KAAK,CAAE,IAAI,IAAI,QAAQ,CAAC,CAAC,CAAC,IAAI,qBAAqB,CAAC,CACrD,CAEQ,qDAAuD,CAC9D,IAAI,CAAE,IAAI,IAAI,QAAQ,CAAC,CAAC,CAAC,IAAI,oBAAoB,CAAC,CACnD,CAEQ,uDAAyD,CAChE,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,WAAW,IAAI,CAC3B,CAEQ,oDAAsD,CAC7D,GAAG,CAAE,IAAI,IAAI,QAAQ,CAAC,CAAC,CAAC,IAAI,mBAAmB,CAAC,CACjD,CAEQ,uDAAyD,CAChE,MAAM,CAAE,IAAI,IAAI,QAAQ,CAAC,CAAC,CAAC,IAAI,sBAAsB,CAAC,CACvD,CAEQ,2BAA6B,CACpC,GAAG,CAAE,gBAAgB,CACrB,aAAa,CAAE,8BAA8B,CAC7C,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,IAAI,GAAG,CAAC,CACnB,MAAM,CAAE,KAAK,CAAC,CAAC,CAEf,YAAY,CAAE,IAAI,CAClB,UAAU,CACT,SAAS,CAAC,KAAK,CAAC;AACnB,GAAG,OAAO,CAAC,KAAK,CAAC;AACjB,GAAG,MAAM,CAAC,KAAK,CAAC;AAChB,GAAG,UAAU,CAAC,KAAK,CACjB,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,QAChB,CAEQ,+CAAiD,CACxD,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,WAAW,CAAC,CAC5B,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,eAAe,CAAC,CACtC,KAAK,CAAE,IAAI,aAAa,CAAC,CACzB,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC3C,KAAK,CAAE,IAAI,OAAO,CAAC,CACnB,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,GACN,CAEQ,yCAA2C,CAClD,UAAU,CACT,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC;AACnC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAC7B,CAEQ,kDAAoD,CAC3D,GAAG,CAAE,CAAC,CACN,GAAG,CAAE,iBAAiB,CACtB,MAAM,CAAE,CAAC,CACT,aAAa,CAAE,oBAChB,CAEQ,qDAAuD,CAC9D,MAAM,CAAE,CAAC,CACT,GAAG,CAAE,gBAAgB,CACrB,MAAM,CAAE,EAAE,CACV,aAAa,CAAE,8BAChB,CAEQ,2BAA4B,CAAS,0BAA4B,CACxE,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,OACR,CAEQ,2BAA4B,CAAS,oBAAsB,CAClE,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,OACR,CAEQ,2BAA4B,CAAS,mBAAqB,CACjE,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QAAQ,CAClB,eAAe,CAAE,UAAU,CAC3B,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,CAAC,CACd,WAAW,CAAE,IAAI,yBAAyB,CAAC,CAC3C,YAAY,CAAE,IAAI,uBAAuB,CAC1C,CAEQ,gDAAiD,CAAS,mBAAoB,CAAW,GAAK,CACrG,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,gBAAgB,CAAE,MAAM,CACxB,SAAS,CAAE,cAAc,CAAC,KAAK,CAAC,IAAI,CAAC,QACtC,CAEQ,2BAA4B,CAAS,mBAAoB,CAAW,CAAG,CAC9E,WAAW,CAAE,CACd,CAEQ,2BAA4B,CAAS,mBAAoB,CAAS,GAAK,CAC9E,WAAW,CAAE,IAAI,wBAAwB,CAAC,CAC1C,YAAY,CAAE,IAAI,sBAAsB,CACzC,CAEQ,2BAA4B,CAAS,sBAAwB,CACpE,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,GACN,CAEQ,uCAAwC,CAAS,aAAe,CACvE,aAAa,CAAE,GAAG,CAClB,YAAY,CAAE,GAAG,CACjB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,UAAU,CAAE,IAAI,aAAa,CAAC,CAC9B,WAAW,CAAE,IAAI,2BAA2B,CAAC,CAC7C,YAAY,CAAE,IAAI,yBAAyB,CAAC,CAC5C,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,CAAC,CACd,UAAU,CACT,OAAO,CAAC,KAAK,CAAC;AACjB,GAAG,UAAU,CAAC,KACb,CAEQ,2BAA4B,CAAS,mCAAqC,CACjF,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CACxC,CAEQ,2BAA4B,CAAS,mCAAqC,CACjF,WAAW,CAAE,IAAI,2BAA2B,CAAC,CAC7C,YAAY,CAAE,IAAI,yBAAyB,CAC5C,CAEQ,2BAA4B,CAAS,qBAAuB,CACnE,KAAK,CAAE,IAAI,aAAa,CAAC,CACzB,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAC/B,CAEQ,8CAA+C,CAAS,qBAAuB,CACtF,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CACpC,CAEQ,2BAA4B,CAAS,2BAA6B,CACzE,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,IAAI,0BAA0B,CAAC,CACrC,KAAK,CAAE,IAAI,wBAAwB,CAAC,CACpC,GAAG,CAAE,CAAC,CACN,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,IAAI,OAAO,CAAC,CACxB,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,OAAO,CAAC,CAC9B,SAAS,CAAE,IAAI,8BAA8B,CAAC,CAC9C,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,CAAC,CACV,UAAU,CACT,OAAO,CAAC,KAAK,CAAC;AACjB,GAAG,UAAU,CAAC,KAAK,CAAC;AACpB,GAAG,YAAY,CAAC,KACf,CAEQ,2BAA4B,CAAS,yCAA2C,CACvF,UAAU,CACT,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC;AACnC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAC7B,CAEQ,2BAA4B,CAAS,8BAAgC,CAC5E,MAAM,CAAE,WACT,CAEQ,iCAAkC,CAAS,iCAAmC,CACrF,UAAU,CAAE,IAAI,OAAO,CAAC,CACxB,YAAY,CAAE,IAAI,OAAO,CAC1B,CAGQ,wDAA0D,CACjE,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,EACV,CAEQ;AACT;AACA,WAAa,CAEX,MAAM,CAAE,GAAG,CACX,SAAS,CAAE,OAAO,CAAC,CAAC,CAAC,WAAW,GAAG,CACpC,CAEQ;AACT;AACA,WAAa,CAEX,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,OAAO,CAAC,CAAC,CAAC,WAAW,IAAI,CACrC,CAGQ;AACT;AACA,WAAa,CACX,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,SAAS,CAAE,OAAO,CAAC,CACpB,CAGQ,kCAAoC,CAC3C,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,KAAK,IAAI,KAAK,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC9B,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IACR,CAEQ,gDAAkD,CACzD,GAAG,CAAE,aAAa,CAClB,OAAO,CAAE,CACV,CAEQ,sEAAwE,CAC/E,OAAO,CAAE,+BAA+B,CACxC,GAAG,CAAE;AACP,iCAAiC,CAC/B,MAAM,CAAE,IAAI,oBAAoB,CACjC,CAEQ,2BAA4B,CAAW,CAAG,CACjD,UAAU,CAAE,OAAO,CAAC,KACrB,CAEQ;AACT;AACA;AACA,EAAG,CAAU,CAAG,CACd,OAAO,CAAE,CACV,CAEQ,iDAAmD,CAC1D,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,IACjB,CAEQ,sEAAwE,CAC/E,GAAG,CAAE,6CAA6C,CAClD,MAAM,CAAE,IAAI,gBAAgB,CAC7B,CAEQ;AACT;AACA,GAAK,CACH,GAAG,CAAE,qCAAqC,CAC1C,OAAO,CAAE,CACV,CAEQ;AACT;AACA,GAAK,CACH,GAAG,CAAE;AACP;AACA,GAAG,CACD,OAAO,CAAE,CACV,CAEQ;AACT;AACA,GAAK,CACH,GAAG,CAAE,eAAe,CACpB,OAAO,CAAE,CAAC,CACV,UAAU,CACT,SAAS,CAAC,KAAK,CAAC;AACnB,GAAG,OAAO,CAAC,KACV,CAGQ;AACT;AACA,WAAa,CACX,MAAM,CAAE,KAAK,IAAI,gBAAgB,CAAC,CAAC,CAAC,CAAC,GAAG,CACzC,CAEQ,wCAA0C,CACjD,SAAS,CAAE,IAAI,GAAG,CAAC,CAAC,WAAW,IAAI,cAAc,CAAC,IAAI,CAAC,CAAC,CACxD,UAAU,CAAE,IACb,CAEQ,oEAAqE,CACrE,iEAAmE,CAC1E,SAAS,CAAE,SAAS,CAAC,KAAK,CAAC,QAAQ,CAAC,QACrC,CAEA,WAAmB,SAAU,CAC5B,IAAK,CACJ,SAAS,CAAE;AACd,IAAI,KAAK,IAAI,MAAM,CAAC,CAAC,CAAC,CAAC,IAAI,QAAQ,CAAC,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,CAAC;AAC3D,IAAI,CACD,OAAO,CAAE,CACV,CAEA,EAAG,CACF,SAAS,CAAE;AACd,IAAI;AACJ,KAAK,IAAI,MAAM,CAAC,CAAC,CAAC,CAAC,IAAI,QAAQ,CAAC,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,CAAC,CAAC;AACxD,MAAM,IAAI,MAAM,CAAC,CAAC,CAAC,CAAC,KAAK;AACzB,KAAK;AACL,IAAI,CACD,OAAO,CAAE,CACV,CACD,CAEA,MAAO,YAAY,KAAK,CAAE,CACjB,qBAAuB,CAC9B,QAAQ,CAAE,KAAK,CACf,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,IAAI,eAAe,CAAC,CAC3B,IAAI,CAAE,IAAI,eAAe,CAAC,CAC1B,KAAK,CAAE,IACR,CAEQ,qBAAsB,CAAS,mBAAqB,CAC3D,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,CAAC,CAAC,CAAC,CAC5C,CAEQ,6CAA+C,CACtD,IAAI,CAAE,IAAI,eAAe,CAC1B,CAEQ,+CAAiD,CACxD,MAAM,CAAE,IACT,CAEQ,4CAA8C,CACrD,GAAG,CAAE,IACN,CAEQ,+CAAiD,CACxD,IAAI,CAAE,IAAI,eAAe,CAAC,CAC1B,KAAK,CAAE,IAAI,eAAe,CAAC,CAC3B,SAAS,CAAE,IACZ,CACD,CAEQ,yCAA2C,CAClD,WAAW,CAAE,IAAI,CACjB,eAAe,CAAE,YAAY,CAC7B,aAAa,CAAE,aAAa,CAE5B,YAAY,CAAE,kBAAkB,CAChC,gBAAgB,CAAE,kBAAkB,CACpC,cAAc,CAAE,mBAAmB,CAEnC,SAAS,CAAE,mBAAmB,CAC9B,aAAa,CAAE,kBAAkB,CACjC,WAAW,CAAE,kBAAkB,CAE/B,YAAY,CAAE,kBAAkB,CAChC,gBAAgB,CAAE,iBAAiB,CACnC,cAAc,CAAE,iBAAiB,CAEjC,UAAU,CAAE,mBAAmB,CAC/B,cAAc,CAAE,mBAAmB,CACnC,YAAY,CAAE,mBACf,CAEQ;AACT,yCAA2C,CACzC,WAAW,CAAE,IAAI,CACjB,eAAe,CAAE,eAAe,CAChC,aAAa,CAAE,YAChB,CAEQ;AACT,yCAA2C,CACzC,WAAW,CAAE,IAAI,CACjB,eAAe,CAAE,YAAY,CAC7B,aAAa,CAAE,aAChB,CAEQ,wCAA0C,CACjD,WAAW,CAAE,IAAI,CACjB,eAAe,CAAE,eAAe,CAChC,aAAa,CAAE,YAAY,CAE3B,YAAY,CAAE,kBAAkB,CAChC,gBAAgB,CAAE,mBAAmB,CACrC,cAAc,CAAE,kBAAkB,CAElC,SAAS,CAAE,kBAAkB,CAC7B,aAAa,CAAE,mBAAmB,CAClC,WAAW,CAAE,kBAAkB,CAE/B,YAAY,CAAE,iBAAiB,CAC/B,gBAAgB,CAAE,kBAAkB,CACpC,cAAc,CAAE,iBAAiB,CAEjC,UAAU,CAAE,kBAAkB,CAC9B,cAAc,CAAE,kBAAkB,CAClC,YAAY,CAAE,mBACf,CAEQ,yBAA0B,CAAS,wCAA0C,CACpF,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,YAAY,CAAE,IAAI,gBAAgB,CAAC,CACnC,KAAK,CAAE,IAAI,cAAc,CAC1B,CAEQ;AACT;AACA,qBAAuB,CACrB,UAAU,CAAE,IAAI,WAAW,CAAC,CAC5B,YAAY,CAAE,IAAI,eAAe,CAAC,CAClC,KAAK,CAAE,IAAI,aAAa,CACzB,CAEQ;AACT;AACA,qBAAuB,CACrB,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,YAAY,CAAE,IAAI,gBAAgB,CAAC,CACnC,KAAK,CAAE,IAAI,cAAc,CAC1B,CAEQ,yBAA0B,CAAS,qCAAuC,CACjF,UAAU,CAAE,IAAI,SAAS,CAAC,CAC1B,YAAY,CAAE,IAAI,aAAa,CAAC,CAChC,KAAK,CAAE,IAAI,WAAW,CACvB,CAEQ;AACT;AACA,qBAAuB,CACrB,UAAU,CAAE,IAAI,SAAS,CAAC,CAC1B,YAAY,CAAE,IAAI,aAAa,CAAC,CAChC,KAAK,CAAE,IAAI,WAAW,CACvB,CAEQ,yBAA0B,CAAS,wCAA0C,CACpF,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,YAAY,CAAE,IAAI,gBAAgB,CAAC,CACnC,KAAK,CAAE,IAAI,cAAc,CAC1B,CAEQ;AACT;AACA,qBAAuB,CACrB,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,YAAY,CAAE,IAAI,gBAAgB,CAAC,CACnC,KAAK,CAAE,IAAI,cAAc,CAC1B,CAEQ,yBAA0B,CAAS,sCAAwC,CAClF,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,YAAY,CAAE,IAAI,cAAc,CAAC,CACjC,KAAK,CAAE,IAAI,YAAY,CACxB,CAEQ;AACT;AACA,qBAAuB,CACrB,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,YAAY,CAAE,IAAI,cAAc,CAAC,CACjC,KAAK,CAAE,IAAI,YAAY,CACxB,CAEQ,uBAAyB,CAChC,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,KAAK,CAAE,IAAI,MAAM,CAAC,CAClB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,EACV,CAEQ,6CAA+C,CACtD,gBAAgB,CAAE,MAAM,CACxB,SAAS,CAAE,eAAe,CAAC,IAAI,CAAC,IAAI,CAAC,QACtC,CAEQ,eAAiB,CACxB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,KAAK,CAAE,IAAI,MAAM,CAClB,CAEQ,mBAAqB,CAC5B,SAAS,CAAE,WAAW,CAAC,IAAI,CAAC,MAAM,CAAC,QAAQ,CAC3C,UAAU,CAAE,IAAI,QAAQ,CAAC,CACzB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,EAAE,CACV,IAAI,CAAE,IAAI,CACV,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,CACV,KAAK,CAAE,GACR,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,SAAS,CAAC,CAAC,UAAU,IAAI,CAC5C,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,KAAK,CAAC,CAAC,UAAU,IAAI,CACxC,CAEQ,gCAAkC,CACzC,eAAe,CAAE,GAAG,CACpB,SAAS,CAAE,OAAO,KAAK,CAAC,CAAC,UAAU,IAAI,CACxC,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,KAAK,CAAC,CAAC,UAAU,IAAI,CACxC,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEQ,iCAAmC,CAC1C,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEQ,iCAAmC,CAC1C,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEQ,iCAAmC,CAC1C,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEA,WAAmB,cAAe,CACjC,EAAG,CACF,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,GAAG,CACrB,CACA,IAAK,CACJ,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,CAAC,CACnB,CACD,CAEA,WAAmB,eAAgB,CAClC,EAAG,CACF,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,CAAC,CACnB,CACA,IAAK,CACJ,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,GAAG,CACrB,CACD,CAEA,WAAmB,WAAY,CAC9B,EAAG,CACF,OAAO,CAAE,CACV,CACA,IAAK,CACJ,OAAO,CAAE,IACV,CACD,CAEA,MAAO,wBAAyB,CACvB,mBAAoB,CACpB,mBAAoB,CAAW,CAAE,CACjC,mBAAqB,CAC5B,UAAU,CAAE,IAAI,CAAC,UAAU,CAC3B,SAAS,CAAE,IAAI,CAAC,UACjB,CACD,CAEQ,cAAgB,CACvB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,gBAAgB,CAAE,MAAM,CACxB,UAAU,CACT,OAAO,CAAC,KAAK,CAAC;AACjB,GAAG,SAAS,CAAC,KACZ,CAEQ,oCAAsC,CAC7C,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,GAAG,CAAC,CAAC,UAAU,IAAI,CAAC,CAAC,IAAI,CAC3C"}`
};
const VISIBLE_TOASTS_AMOUNT = 3;
const VIEWPORT_OFFSET = "32px";
const TOAST_WIDTH = 356;
const GAP = 14;
const DARK = "dark";
const LIGHT = "light";
function getInitialTheme(t) {
  if (t !== "system") {
    return t;
  }
  if (typeof window !== "undefined") {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return DARK;
    }
    return LIGHT;
  }
  return LIGHT;
}
function getDocumentDirection() {
  if (typeof window === "undefined") return "ltr";
  if (typeof document === "undefined") return "ltr";
  const dirAttribute = document.documentElement.getAttribute("dir");
  if (dirAttribute === "auto" || !dirAttribute) {
    return window.getComputedStyle(document.documentElement).direction;
  }
  return dirAttribute;
}
const Toaster = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let possiblePositions;
  let hotkeyLabel;
  let $$restProps = compute_rest_props($$props, [
    "invert",
    "theme",
    "position",
    "hotkey",
    "richColors",
    "expand",
    "duration",
    "visibleToasts",
    "closeButton",
    "toastOptions",
    "offset",
    "dir"
  ]);
  let $toasts, $$unsubscribe_toasts;
  let $heights, $$unsubscribe_heights;
  let { invert = false } = $$props;
  let { theme: theme2 = "light" } = $$props;
  let { position = "bottom-right" } = $$props;
  let { hotkey = ["altKey", "KeyT"] } = $$props;
  let { richColors = false } = $$props;
  let { expand = false } = $$props;
  let { duration = 4e3 } = $$props;
  let { visibleToasts = VISIBLE_TOASTS_AMOUNT } = $$props;
  let { closeButton = false } = $$props;
  let { toastOptions = {} } = $$props;
  let { offset: offset2 = null } = $$props;
  let { dir = getDocumentDirection() } = $$props;
  const { toasts, heights, reset } = toastState;
  $$unsubscribe_toasts = subscribe(toasts, (value) => $toasts = value);
  $$unsubscribe_heights = subscribe(heights, (value) => $heights = value);
  let expanded = false;
  let interacting = false;
  let actualTheme = getInitialTheme(theme2);
  let listRef;
  onDestroy(() => {
  });
  if ($$props.invert === void 0 && $$bindings.invert && invert !== void 0) $$bindings.invert(invert);
  if ($$props.theme === void 0 && $$bindings.theme && theme2 !== void 0) $$bindings.theme(theme2);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
  if ($$props.hotkey === void 0 && $$bindings.hotkey && hotkey !== void 0) $$bindings.hotkey(hotkey);
  if ($$props.richColors === void 0 && $$bindings.richColors && richColors !== void 0) $$bindings.richColors(richColors);
  if ($$props.expand === void 0 && $$bindings.expand && expand !== void 0) $$bindings.expand(expand);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
  if ($$props.visibleToasts === void 0 && $$bindings.visibleToasts && visibleToasts !== void 0) $$bindings.visibleToasts(visibleToasts);
  if ($$props.closeButton === void 0 && $$bindings.closeButton && closeButton !== void 0) $$bindings.closeButton(closeButton);
  if ($$props.toastOptions === void 0 && $$bindings.toastOptions && toastOptions !== void 0) $$bindings.toastOptions(toastOptions);
  if ($$props.offset === void 0 && $$bindings.offset && offset2 !== void 0) $$bindings.offset(offset2);
  if ($$props.dir === void 0 && $$bindings.dir && dir !== void 0) $$bindings.dir(dir);
  $$result.css.add(css);
  possiblePositions = Array.from(new Set([
    position,
    ...$toasts.filter((toast2) => toast2.position).map((toast2) => toast2.position)
  ].filter(Boolean)));
  hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
  {
    if ($toasts.length <= 1) {
      expanded = false;
    }
  }
  {
    {
      const toastsToDismiss = $toasts.filter((toast2) => toast2.dismiss && !toast2.delete);
      if (toastsToDismiss.length > 0) {
        const updatedToasts = $toasts.map((toast2) => {
          const matchingToast = toastsToDismiss.find((dismissToast) => dismissToast.id === toast2.id);
          if (matchingToast) {
            return { ...toast2, delete: true };
          }
          return toast2;
        });
        toasts.set(updatedToasts);
      }
    }
  }
  {
    {
      if (theme2 !== "system") {
        actualTheme = theme2;
      }
      if (typeof window !== "undefined") {
        if (theme2 === "system") {
          if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            actualTheme = DARK;
          } else {
            actualTheme = LIGHT;
          }
        }
        const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
        const changeHandler = ({ matches }) => {
          actualTheme = matches ? DARK : LIGHT;
        };
        if ("addEventListener" in mediaQueryList) {
          mediaQueryList.addEventListener("change", changeHandler);
        } else {
          mediaQueryList.addListener(changeHandler);
        }
      }
    }
  }
  $$unsubscribe_toasts();
  $$unsubscribe_heights();
  return `${$toasts.length > 0 ? `<section${add_attribute("aria-label", `Notifications ${hotkeyLabel}`, 0)}${add_attribute("tabindex", -1, 0)}>${each(possiblePositions, (position2, index) => {
    var _a;
    return `<ol${spread(
      [
        { tabindex: escape_attribute_value(-1) },
        {
          class: escape_attribute_value($$props.class)
        },
        { "data-sonner-toaster": true },
        {
          "data-theme": escape_attribute_value(actualTheme)
        },
        {
          "data-rich-colors": escape_attribute_value(richColors)
        },
        {
          dir: escape_attribute_value(dir === "auto" ? getDocumentDirection() : dir)
        },
        {
          "data-y-position": escape_attribute_value(position2.split("-")[0])
        },
        {
          "data-x-position": escape_attribute_value(position2.split("-")[1])
        },
        {
          style: escape_attribute_value($$props.style)
        },
        escape_object($$restProps)
      ],
      {
        styles: {
          "--front-toast-height": `${(_a = $heights[0]) == null ? void 0 : _a.height}px`,
          "--offset": typeof offset2 === "number" ? `${offset2}px` : offset2 || VIEWPORT_OFFSET,
          "--width": `${TOAST_WIDTH}px`,
          "--gap": `${GAP}px`
        }
      }
    )}${add_attribute("this", listRef, 0)}>${each($toasts.filter((toast2) => !toast2.position && index === 0 || toast2.position === position2), (toast2, index2) => {
      return `${validate_component(Toast, "Toast").$$render(
        $$result,
        {
          index: index2,
          toast: toast2,
          invert,
          visibleToasts,
          closeButton,
          interacting,
          position: position2,
          expandByDefault: expand,
          expanded,
          actionButtonStyle: (toastOptions == null ? void 0 : toastOptions.actionButtonStyle) || "",
          cancelButtonStyle: (toastOptions == null ? void 0 : toastOptions.cancelButtonStyle) || "",
          class: (toastOptions == null ? void 0 : toastOptions.class) || "",
          descriptionClass: (toastOptions == null ? void 0 : toastOptions.descriptionClass) || "",
          classes: toastOptions.classes || {},
          duration: (toastOptions == null ? void 0 : toastOptions.duration) ?? duration,
          unstyled: toastOptions.unstyled || false
        },
        {},
        {
          "info-icon": () => {
            return `${slots["info-icon"] ? slots["info-icon"]({ slot: "info-icon" }) : ` ${validate_component(Icon, "Icon").$$render($$result, { type: "info" }, {}, {})} `}`;
          },
          "warning-icon": () => {
            return `${slots["warning-icon"] ? slots["warning-icon"]({ slot: "warning-icon" }) : ` ${validate_component(Icon, "Icon").$$render($$result, { type: "warning" }, {}, {})} `}`;
          },
          "error-icon": () => {
            return `${slots["error-icon"] ? slots["error-icon"]({ slot: "error-icon" }) : ` ${validate_component(Icon, "Icon").$$render($$result, { type: "error" }, {}, {})} `}`;
          },
          "success-icon": () => {
            return `${slots["success-icon"] ? slots["success-icon"]({ slot: "success-icon" }) : ` ${validate_component(Icon, "Icon").$$render($$result, { type: "success" }, {}, {})} `}`;
          },
          "loading-icon": () => {
            return `${slots["loading-icon"] ? slots["loading-icon"]({ slot: "loading-icon" }) : ` ${validate_component(Loader, "Loader").$$render($$result, { visible: toast2.type === "loading" }, {}, {})} `}`;
          }
        }
      )}`;
    })} </ol>`;
  })}</section>` : ``}`;
});
let timeoutAction;
let timeoutEnable;
function withoutTransition(action) {
  if (typeof document === "undefined")
    return;
  clearTimeout(timeoutAction);
  clearTimeout(timeoutEnable);
  const style = document.createElement("style");
  const css2 = document.createTextNode(`* {
     -webkit-transition: none !important;
     -moz-transition: none !important;
     -o-transition: none !important;
     -ms-transition: none !important;
     transition: none !important;
  }`);
  style.appendChild(css2);
  const disable = () => document.head.appendChild(style);
  const enable = () => document.head.removeChild(style);
  if (typeof window.getComputedStyle !== "undefined") {
    disable();
    action();
    window.getComputedStyle(style).opacity;
    enable();
    return;
  }
  if (typeof window.requestAnimationFrame !== "undefined") {
    disable();
    action();
    window.requestAnimationFrame(enable);
    return;
  }
  disable();
  timeoutAction = window.setTimeout(() => {
    action();
    timeoutEnable = window.setTimeout(enable, 120);
  }, 120);
}
function sanitizeClassNames(classNames) {
  return classNames.filter((className) => className.length > 0);
}
const noopStorage = {
  getItem: (_key) => null,
  setItem: (_key, _value) => {
  }
};
const isBrowser$1 = typeof document !== "undefined";
const modes = ["dark", "light", "system"];
const modeStorageKey = writable("mode-watcher-mode");
const themeStorageKey = writable("mode-watcher-theme");
const userPrefersMode = createUserPrefersMode();
const systemPrefersMode = createSystemMode();
const themeColors = writable(void 0);
const theme = createCustomTheme();
const disableTransitions = writable(true);
const darkClassNames = writable([]);
const lightClassNames = writable([]);
const derivedMode = createDerivedMode();
createDerivedTheme();
function createUserPrefersMode() {
  const defaultValue = "system";
  const storage = isBrowser$1 ? localStorage : noopStorage;
  const initialValue = storage.getItem(getModeStorageKey());
  let value = isValidMode(initialValue) ? initialValue : defaultValue;
  function getModeStorageKey() {
    return get_store_value(modeStorageKey);
  }
  const { subscribe: subscribe2, set: _set } = writable(value, () => {
    if (!isBrowser$1)
      return;
    const handler = (e) => {
      if (e.key !== getModeStorageKey())
        return;
      const newValue = e.newValue;
      if (isValidMode(newValue)) {
        _set(value = newValue);
      } else {
        _set(value = defaultValue);
      }
    };
    addEventListener("storage", handler);
    return () => removeEventListener("storage", handler);
  });
  function set(v) {
    _set(value = v);
    storage.setItem(getModeStorageKey(), value);
  }
  return {
    subscribe: subscribe2,
    set
  };
}
function createCustomTheme() {
  const storage = isBrowser$1 ? localStorage : noopStorage;
  const initialValue = storage.getItem(getThemeStorageKey());
  let value = initialValue === null || initialValue === void 0 ? "" : initialValue;
  function getThemeStorageKey() {
    return get_store_value(themeStorageKey);
  }
  const { subscribe: subscribe2, set: _set } = writable(value, () => {
    if (!isBrowser$1)
      return;
    const handler = (e) => {
      if (e.key !== getThemeStorageKey())
        return;
      const newValue = e.newValue;
      if (newValue === null) {
        _set(value = "");
      } else {
        _set(value = newValue);
      }
    };
    addEventListener("storage", handler);
    return () => removeEventListener("storage", handler);
  });
  function set(v) {
    _set(value = v);
    storage.setItem(getThemeStorageKey(), value);
  }
  return {
    subscribe: subscribe2,
    set
  };
}
function createSystemMode() {
  const defaultValue = void 0;
  let track = true;
  const { subscribe: subscribe2, set } = writable(defaultValue, () => {
    if (!isBrowser$1)
      return;
    const handler = (e) => {
      if (!track)
        return;
      set(e.matches ? "light" : "dark");
    };
    const mediaQueryState = window.matchMedia("(prefers-color-scheme: light)");
    mediaQueryState.addEventListener("change", handler);
    return () => mediaQueryState.removeEventListener("change", handler);
  });
  function query() {
    if (!isBrowser$1)
      return;
    const mediaQueryState = window.matchMedia("(prefers-color-scheme: light)");
    set(mediaQueryState.matches ? "light" : "dark");
  }
  function tracking(active) {
    track = active;
  }
  return {
    subscribe: subscribe2,
    query,
    tracking
  };
}
function createDerivedMode() {
  const { subscribe: subscribe2 } = derived([
    userPrefersMode,
    systemPrefersMode,
    themeColors,
    disableTransitions,
    darkClassNames,
    lightClassNames
  ], ([$userPrefersMode, $systemPrefersMode, $themeColors, $disableTransitions, $darkClassNames, $lightClassNames]) => {
    if (!isBrowser$1)
      return void 0;
    const derivedMode2 = $userPrefersMode === "system" ? $systemPrefersMode : $userPrefersMode;
    const sanitizedDarkClassNames = sanitizeClassNames($darkClassNames);
    const sanitizedLightClassNames = sanitizeClassNames($lightClassNames);
    function update2() {
      const htmlEl = document.documentElement;
      const themeColorEl = document.querySelector('meta[name="theme-color"]');
      if (derivedMode2 === "light") {
        if (sanitizedDarkClassNames.length)
          htmlEl.classList.remove(...sanitizedDarkClassNames);
        if (sanitizedLightClassNames.length)
          htmlEl.classList.add(...sanitizedLightClassNames);
        htmlEl.style.colorScheme = "light";
        if (themeColorEl && $themeColors) {
          themeColorEl.setAttribute("content", $themeColors.light);
        }
      } else {
        if (sanitizedLightClassNames.length)
          htmlEl.classList.remove(...sanitizedLightClassNames);
        if (sanitizedDarkClassNames.length)
          htmlEl.classList.add(...sanitizedDarkClassNames);
        htmlEl.style.colorScheme = "dark";
        if (themeColorEl && $themeColors) {
          themeColorEl.setAttribute("content", $themeColors.dark);
        }
      }
    }
    if ($disableTransitions) {
      withoutTransition(update2);
    } else {
      update2();
    }
    return derivedMode2;
  });
  return {
    subscribe: subscribe2
  };
}
function createDerivedTheme() {
  const { subscribe: subscribe2 } = derived([theme, disableTransitions], ([$theme, $disableTransitions]) => {
    if (!isBrowser$1)
      return void 0;
    function update2() {
      const htmlEl = document.documentElement;
      htmlEl.setAttribute("data-theme", $theme);
    }
    if ($disableTransitions) {
      withoutTransition(update2);
    } else {
      update2();
    }
    return $theme;
  });
  return {
    subscribe: subscribe2
  };
}
function isValidMode(value) {
  if (typeof value !== "string")
    return false;
  return modes.includes(value);
}
const Sonner_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  let $mode, $$unsubscribe_mode;
  $$unsubscribe_mode = subscribe(derivedMode, (value) => $mode = value);
  $$unsubscribe_mode();
  return `${validate_component(Toaster, "Sonner").$$render(
    $$result,
    Object.assign(
      {},
      { theme: $mode },
      { class: "toaster group" },
      {
        toastOptions: {
          classes: {
            toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-muted-foreground",
            actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
          }
        }
      },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const MassToaster = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  function process(props) {
    let status = props.status;
    if (status) toast.success(status);
    let errors = props.errors;
    if (JSON.stringify(errors) !== "{}") {
      toast.error(errors[Object.keys(errors)[0]]);
    }
  }
  console.log("mount");
  {
    process($page.props);
  }
  $$unsubscribe_page();
  return `${validate_component(Sonner_1, "Toaster").$$render($$result, { richColors: true, theme: "dark" }, {}, {})}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let menubar_open = false;
  let header_height = 0;
  let effective_header_height = header_height;
  let append_absolute = false;
  let scrollY = 0;
  let logged_in = $page.props.logged_in;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    logged_in = $page.props.logged_in;
    menubar_open = menubar_open && logged_in;
    append_absolute = append_absolute;
    effective_header_height = header_height - scrollY < 0 ? 0 : header_height - scrollY;
    $$rendered = `${menubar_open ? `<style data-svelte-h="svelte-1i7ucoz">body {
            overflow: hidden;
        }</style>` : ``}  ${validate_component(MassToaster, "MassToaster").$$render($$result, {}, {}, {})} <div class="flex flex-col h-screen">${`${validate_component(Header, "Header").$$render(
      $$result,
      {
        dontHide: menubar_open,
        class: "z-40",
        clientHeight: header_height
      },
      {
        clientHeight: ($$value) => {
          header_height = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${logged_in ? `<button class="mx-4">${validate_component(Menu, "Menu").$$render($$result, { class: "w-8 h-8" }, {}, {})}</button>` : ``}`;
        }
      }
    )} <div>${menubar_open ? `   <div class="w-screen h-screen fixed bg-black/80 z-30 top-0"></div>` : ``} ${menubar_open ? ` <div class="h-full relative w-full z-30"><div class="flex fixed w-full pl-8 py-4 pr-20 bg-black border-t border-l-neutral-800 rounded-tl-xl rounded-tr-xl" style="${"bottom: " + escape(header_height, true) + "px;"}">${validate_component(LayoutLinks, "LayoutLinks").$$render($$result, { class: "flex-col-reverse" }, {}, {})}</div></div>` : `${menubar_open ? ` <div class="h-full relative w-full z-30"><div class="flex fixed right-0 min-w-72 pl-8 py-4 pr-20 bg-black border-l border-l-neutral-800" style="${"height: calc(100vh - " + escape(effective_header_height, true) + "px); top: " + escape(effective_header_height, true) + "px;"}">${validate_component(LayoutLinks, "LayoutLinks").$$render($$result, {}, {}, {})}</div></div>` : ``}`}</div>`} ${append_absolute ? ` <style data-svelte-h="svelte-142huri">html {
                overflow: hidden;
            }</style>` : ``} <div class="flex flex-grow bg-black text-white"><div class="${"min-w-72 px-8 py-6 border-r border-r-neutral-800 " + escape("hidden", true)}" style="${"height: calc(100vh - " + escape(header_height, true) + "px);"}">${validate_component(LayoutLinks, "LayoutLinks").$$render($$result, {}, {}, {})}</div>  <div style="${escape(
      "",
      true
    ) + ""}" class="${"overflow-x-clip w-full " + escape(
      "overflow-visible h-auto",
      true
    ) + " " + escape(
      append_absolute ? "overflow-y-hidden" : "overflow-y-scroll",
      true
    )}"><div class="w-full h-full relative"><div class="${escape(append_absolute ? "absolute overflow-hidden" : "", true) + " w-full h-full bg-black"}" style="top: 0px;">${slots.default ? slots.default({}) : ``}</div></div></div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout
}, Symbol.toStringTag, { value: "Module" }));
const Dashboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { distinct_visitor_count_by_date } = $$props;
  let data = {
    labels: distinct_visitor_count_by_date.data.map(
      /** @type {{ date: any; }} */
      (element) => element.date
    ),
    datasets: [
      {
        label: "Test",
        data: distinct_visitor_count_by_date.data.map(
          /** @type {{ total: any; }} */
          (element) => element.total
        ),
        backgroundColor: ["rgb(53, 132, 228, 0.3)"],
        borderColor: ["rgb(53, 132, 228)"],
        borderWidth: 2
      }
    ]
  };
  if ($$props.distinct_visitor_count_by_date === void 0 && $$bindings.distinct_visitor_count_by_date && distinct_visitor_count_by_date !== void 0) $$bindings.distinct_visitor_count_by_date(distinct_visitor_count_by_date);
  return `${$$result.head += `<!-- HEAD_svelte-szznqt_START -->${$$result.title = `<title>Webtools - BjeloPIC</title>`, ""}<!-- HEAD_svelte-szznqt_END -->`, ""} <main class="max-w-screen-lg mx-auto p-4"><div class="flex flex-col space-y-4"><div class="p-4 bg-neutral-900 border rounded-md border-neutral-800">${validate_component(DashboardChart, "DashboardChart").$$render($$result, { data, type: "bar" }, {}, {})}</div></div></main>`;
});
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard,
  layout: Layout
}, Symbol.toStringTag, { value: "Module" }));
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value", "readonly"]);
  let { class: className = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { readonly: readonly2 = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly2 !== void 0) $$bindings.readonly(readonly2);
  return `<input${spread(
    [
      {
        class: escape_attribute_value(cn$1("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className))
      },
      { readonly: readonly2 || null },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("value", value, 0)}>`;
});
const Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Label$1, "LabelPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn$1("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn$1("rounded-lg border bg-card text-card-foreground shadow-sm", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn$1("p-6 pt-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn$1("flex items-center p-6 pt-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn$1("flex flex-col space-y-1.5 p-6", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "tag"]);
  let { class: className = void 0 } = $$props;
  let { tag = "h3" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
  return `${((tag$1) => {
    return tag$1 ? `<${tag}${spread(
      [
        {
          class: escape_attribute_value(cn$1("text-lg font-semibold leading-none tracking-tight", className))
        },
        escape_object($$restProps)
      ],
      {}
    )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`;
});
const Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "checked"]);
  let { class: className = void 0 } = $$props;
  let { checked = false } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Checkbox$1, "CheckboxPrimitive.Root").$$render(
      $$result,
      Object.assign(
        {},
        {
          class: cn$1("peer box-content h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[disabled=true]:opacity-50", className)
        },
        $$restProps,
        { checked }
      ),
      {
        checked: ($$value) => {
          checked = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Checkbox_indicator, "CheckboxPrimitive.Indicator").$$render(
            $$result,
            {
              class: cn$1("flex h-4 w-4 items-center justify-center text-current")
            },
            {},
            {
              default: ({ isChecked, isIndeterminate }) => {
                return `${isChecked ? `${validate_component(Check, "Check").$$render($$result, { class: "h-3.5 w-3.5" }, {}, {})}` : `${isIndeterminate ? `${validate_component(Minus, "Minus").$$render($$result, { class: "h-3.5 w-3.5" }, {}, {})}` : ``}`}`;
              }
            }
          )}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $form, $$unsubscribe_form;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let form = useForm({
    email: null,
    password: null,
    remember: false
  });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  function processRefresh(props) {
    if (JSON.stringify(props.errors) !== "{}") {
      toast.error(props.errors.email);
    }
  }
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      processRefresh($page.props);
    }
    $$rendered = `${validate_component(Toaster, "Toaster").$$render($$result, { theme: "dark", richColors: true }, {}, {})} <main class="max-w-screen-lg mx-auto p-4"><form>${validate_component(Card, "Card.Root").$$render($$result, { class: "w-[350px] mx-auto" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `Login`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
              default: () => {
                return `Email`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "email",
                required: true,
                name: "email",
                value: $form.email
              },
              {
                value: ($$value) => {
                  $form.email = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Label, "Label").$$render($$result, { for: "password" }, {}, {
              default: () => {
                return `Password`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "password",
                required: true,
                name: "password",
                value: $form.password
              },
              {
                value: ($$value) => {
                  $form.password = $$value;
                  $$settled = false;
                }
              },
              {}
            )} <div class="flex gap-x-2 items-center mt-2">${validate_component(Checkbox, "Checkbox").$$render(
              $$result,
              {
                id: "rememberme",
                checked: $form.remember
              },
              {
                checked: ($$value) => {
                  $form.remember = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Label, "Label").$$render($$result, { for: "rememberme" }, {}, {
              default: () => {
                return `Remember me`;
              }
            })}</div>`;
          }
        })} ${validate_component(Card_footer, "Card.Footer").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Button, "Button").$$render($$result, { variant: "outline", type: "submit" }, {}, {
              default: () => {
                return `Login`;
              }
            })}`;
          }
        })}`;
      }
    })}</form></main>`;
  } while (!$$settled);
  $$unsubscribe_page();
  $$unsubscribe_form();
  return $$rendered;
});
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login,
  layout: Layout
}, Symbol.toStringTag, { value: "Module" }));
const Users = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Users
}, Symbol.toStringTag, { value: "Module" }));
const Dialog_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Dialog_title$1, "DialogPrimitive.Title").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn$1("text-lg font-semibold leading-none tracking-tight", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Dialog_portal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `${validate_component(Dialog_portal$1, "DialogPrimitive.Portal").$$render($$result, Object.assign({}, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Dialog_footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn$1("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Dialog_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn$1("flex flex-col space-y-1.5 text-center sm:text-left", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Dialog_overlay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { transition = fade } = $$props;
  let { transitionConfig = { duration: 150 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Dialog_overlay$1, "DialogPrimitive.Overlay").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      {
        class: cn$1("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm", className)
      },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Dialog_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { transition = flyAndScale } = $$props;
  let { transitionConfig = { duration: 200 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Dialog_portal, "Dialog.Portal").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Dialog_overlay, "Dialog.Overlay").$$render($$result, {}, {}, {})} ${validate_component(Dialog_content$1, "DialogPrimitive.Content").$$render(
        $$result,
        Object.assign(
          {},
          { transition },
          { transitionConfig },
          {
            class: cn$1("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full", className)
          },
          $$restProps
        ),
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``} ${validate_component(Dialog_close, "DialogPrimitive.Close").$$render(
              $$result,
              {
                class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              },
              {},
              {
                default: () => {
                  return `${validate_component(X, "X").$$render($$result, { class: "h-4 w-4" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-1pewzs3">Close</span>`;
                }
              }
            )}`;
          }
        }
      )}`;
    }
  })}`;
});
const Root$2 = Dialog;
const Tabs_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  return `${validate_component(Tabs_content$1, "TabsPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn$1("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)
      },
      { value },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Tabs_list = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Tabs_list$1, "TabsPrimitive.List").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn$1("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Tabs_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  return `${validate_component(Tabs_trigger$1, "TabsPrimitive.Trigger").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn$1("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", className)
      },
      { value },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Root$1 = Tabs;
const Textarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value", "readonly"]);
  let { class: className = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { readonly: readonly2 = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly2 !== void 0) $$bindings.readonly(readonly2);
  return `<textarea${spread(
    [
      {
        class: escape_attribute_value(cn$1("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className))
      },
      { readonly: readonly2 || null },
      escape_object($$restProps)
    ],
    {}
  )}>${escape(value || "")}</textarea>`;
});
const Popover_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { transition = flyAndScale } = $$props;
  let { transitionConfig = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Popover_content$1, "PopoverPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      {
        class: cn$1("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Root = Popover;
const Trigger = Popover_trigger;
const Calendar_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value", "placeholder", "weekdayFormat", "class"]);
  let { value = void 0 } = $$props;
  let { placeholder = void 0 } = $$props;
  let { weekdayFormat = "short" } = $$props;
  let { class: className = void 0 } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.weekdayFormat === void 0 && $$bindings.weekdayFormat && weekdayFormat !== void 0) $$bindings.weekdayFormat(weekdayFormat);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Calendar$1, "CalendarPrimitive.Root").$$render(
      $$result,
      Object.assign({}, { weekdayFormat }, { class: cn$1("p-3", className) }, $$restProps, { value }, { placeholder }),
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        },
        placeholder: ($$value) => {
          placeholder = $$value;
          $$settled = false;
        }
      },
      {
        default: ({ months, weekdays }) => {
          return `${validate_component(Calendar_header, "Calendar.Header").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Calendar_prev_button, "Calendar.PrevButton").$$render($$result, {}, {}, {})} ${validate_component(Calendar_heading, "Calendar.Heading").$$render($$result, {}, {}, {})} ${validate_component(Calendar_next_button, "Calendar.NextButton").$$render($$result, {}, {}, {})}`;
            }
          })} ${validate_component(Calendar_months, "Calendar.Months").$$render($$result, {}, {}, {
            default: () => {
              return `${each(months, (month) => {
                return `${validate_component(Calendar_grid, "Calendar.Grid").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Calendar_grid_head, "Calendar.GridHead").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Calendar_grid_row, "Calendar.GridRow").$$render($$result, { class: "flex" }, {}, {
                          default: () => {
                            return `${each(weekdays, (weekday) => {
                              return `${validate_component(Calendar_head_cell, "Calendar.HeadCell").$$render($$result, {}, {}, {
                                default: () => {
                                  return `${escape(weekday.slice(0, 2))} `;
                                }
                              })}`;
                            })} `;
                          }
                        })} `;
                      }
                    })} ${validate_component(Calendar_grid_body, "Calendar.GridBody").$$render($$result, {}, {}, {
                      default: () => {
                        return `${each(month.weeks, (weekDates) => {
                          return `${validate_component(Calendar_grid_row, "Calendar.GridRow").$$render($$result, { class: "mt-2 w-full" }, {}, {
                            default: () => {
                              return `${each(weekDates, (date) => {
                                return `${validate_component(Calendar_cell, "Calendar.Cell").$$render($$result, { date }, {}, {
                                  default: () => {
                                    return `${validate_component(Calendar_day, "Calendar.Day").$$render($$result, { date, month: month.value }, {}, {})} `;
                                  }
                                })}`;
                              })} `;
                            }
                          })}`;
                        })} `;
                      }
                    })} `;
                  }
                })}`;
              })}`;
            }
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Calendar_cell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["date", "class"]);
  let { date } = $$props;
  let { class: className = void 0 } = $$props;
  if ($$props.date === void 0 && $$bindings.date && date !== void 0) $$bindings.date(date);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Calendar_cell$1, "CalendarPrimitive.Cell").$$render(
    $$result,
    Object.assign(
      {},
      { date },
      {
        class: cn$1("relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-accent [&:has([data-selected][data-outside-month])]:bg-accent/50", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Calendar_day = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["date", "month", "class"]);
  let { date } = $$props;
  let { month } = $$props;
  let { class: className = void 0 } = $$props;
  if ($$props.date === void 0 && $$bindings.date && date !== void 0) $$bindings.date(date);
  if ($$props.month === void 0 && $$bindings.month && month !== void 0) $$bindings.month(month);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Calendar_day$1, "CalendarPrimitive.Day").$$render(
    $$result,
    Object.assign(
      {},
      { date },
      { month },
      {
        class: cn$1(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal ",
          "[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground",
          // Selected
          "data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:opacity-100 data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground",
          // Disabled
          "data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
          // Unavailable
          "data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through",
          // Outside months
          "data-[outside-month]:pointer-events-none data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground [&[data-outside-month][data-selected]]:opacity-30",
          className
        )
      },
      $$restProps
    ),
    {},
    {
      default: ({ selected, disabled, unavailable, builder }) => {
        return `${slots.default ? slots.default({ selected, disabled, unavailable, builder }) : ` ${escape(date.day)} `}`;
      }
    }
  )}`;
});
const Calendar_grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Calendar_grid$1, "CalendarPrimitive.Grid").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn$1("w-full border-collapse space-y-1", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Calendar_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Calendar_header$1, "CalendarPrimitive.Header").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn$1("relative flex w-full items-center justify-between pt-1", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Calendar_months = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn$1("mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Calendar_grid_row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Calendar_grid_row$1, "CalendarPrimitive.GridRow").$$render($$result, Object.assign({}, { class: cn$1("flex", className) }, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Calendar_heading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Calendar_heading$1, "CalendarPrimitive.Heading").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn$1("text-sm font-medium", className)
      },
      $$restProps
    ),
    {},
    {
      default: ({ headingValue }) => {
        return `${slots.default ? slots.default({ headingValue }) : ` ${escape(headingValue)} `}`;
      }
    }
  )}`;
});
const Calendar_grid_body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Calendar_grid_body$1, "CalendarPrimitive.GridBody").$$render($$result, Object.assign({}, { class: cn$1(className) }, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Calendar_grid_head = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Calendar_grid_head$1, "CalendarPrimitive.GridHead").$$render($$result, Object.assign({}, { class: cn$1(className) }, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Calendar_head_cell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Calendar_head_cell$1, "CalendarPrimitive.HeadCell").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn$1("w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Calendar_next_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Calendar_next_button$1, "CalendarPrimitive.NextButton").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn$1(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100", className)
      },
      $$restProps
    ),
    {},
    {
      default: ({ builder }) => {
        return `${slots.default ? slots.default({ builder }) : ` ${validate_component(Chevron_right, "ChevronRight").$$render($$result, { class: "h-4 w-4" }, {}, {})} `}`;
      }
    }
  )}`;
});
const Calendar_prev_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Calendar_prev_button$1, "CalendarPrimitive.PrevButton").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn$1(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100", className)
      },
      $$restProps
    ),
    {},
    {
      default: ({ builder }) => {
        return `${slots.default ? slots.default({ builder }) : ` ${validate_component(Chevron_left, "ChevronLeft").$$render($$result, { class: "h-4 w-4" }, {}, {})} `}`;
      }
    }
  )}`;
});
const SCORE_CONTINUE_MATCH = 1, SCORE_SPACE_WORD_JUMP = 0.9, SCORE_NON_SPACE_WORD_JUMP = 0.8, SCORE_CHARACTER_JUMP = 0.17, SCORE_TRANSPOSITION = 0.1, PENALTY_SKIPPED = 0.999, PENALTY_CASE_MISMATCH = 0.9999, PENALTY_NOT_COMPLETE = 0.99;
const IS_GAP_REGEXP = /[\\/_+.#"@[({&]/, COUNT_GAPS_REGEXP = /[\\/_+.#"@[({&]/g, IS_SPACE_REGEXP = /[\s-]/, COUNT_SPACE_REGEXP = /[\s-]/g;
function commandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, stringIndex, abbreviationIndex, memoizedResults) {
  if (abbreviationIndex === abbreviation.length) {
    if (stringIndex === string.length) {
      return SCORE_CONTINUE_MATCH;
    }
    return PENALTY_NOT_COMPLETE;
  }
  const memoizeKey = `${stringIndex},${abbreviationIndex}`;
  if (memoizedResults[memoizeKey] !== void 0) {
    return memoizedResults[memoizeKey];
  }
  const abbreviationChar = lowerAbbreviation.charAt(abbreviationIndex);
  let index = lowerString.indexOf(abbreviationChar, stringIndex);
  let highScore = 0;
  let score, transposedScore, wordBreaks, spaceBreaks;
  while (index >= 0) {
    score = commandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, index + 1, abbreviationIndex + 1, memoizedResults);
    if (score > highScore) {
      if (index === stringIndex) {
        score *= SCORE_CONTINUE_MATCH;
      } else if (IS_GAP_REGEXP.test(string.charAt(index - 1))) {
        score *= SCORE_NON_SPACE_WORD_JUMP;
        wordBreaks = string.slice(stringIndex, index - 1).match(COUNT_GAPS_REGEXP);
        if (wordBreaks && stringIndex > 0) {
          score *= Math.pow(PENALTY_SKIPPED, wordBreaks.length);
        }
      } else if (IS_SPACE_REGEXP.test(string.charAt(index - 1))) {
        score *= SCORE_SPACE_WORD_JUMP;
        spaceBreaks = string.slice(stringIndex, index - 1).match(COUNT_SPACE_REGEXP);
        if (spaceBreaks && stringIndex > 0) {
          score *= Math.pow(PENALTY_SKIPPED, spaceBreaks.length);
        }
      } else {
        score *= SCORE_CHARACTER_JUMP;
        if (stringIndex > 0) {
          score *= Math.pow(PENALTY_SKIPPED, index - stringIndex);
        }
      }
      if (string.charAt(index) !== abbreviation.charAt(abbreviationIndex)) {
        score *= PENALTY_CASE_MISMATCH;
      }
    }
    if (score < SCORE_TRANSPOSITION && lowerString.charAt(index - 1) === lowerAbbreviation.charAt(abbreviationIndex + 1) || lowerAbbreviation.charAt(abbreviationIndex + 1) === lowerAbbreviation.charAt(abbreviationIndex) && // allow duplicate letters. Ref #7428
    lowerString.charAt(index - 1) !== lowerAbbreviation.charAt(abbreviationIndex)) {
      transposedScore = commandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, index + 1, abbreviationIndex + 2, memoizedResults);
      if (transposedScore * SCORE_TRANSPOSITION > score) {
        score = transposedScore * SCORE_TRANSPOSITION;
      }
    }
    if (score > highScore) {
      highScore = score;
    }
    index = lowerString.indexOf(abbreviationChar, index + 1);
  }
  memoizedResults[memoizeKey] = highScore;
  return highScore;
}
function formatInput(string) {
  return string.toLowerCase().replace(COUNT_SPACE_REGEXP, " ");
}
function commandScore(string, abbreviation) {
  return commandScoreInner(string, abbreviation, formatInput(string), formatInput(abbreviation), 0, 0, {});
}
const isBrowser = typeof document !== "undefined";
function isUndefined(value) {
  return value === void 0;
}
function generateId() {
  return nanoid(10);
}
const kbd$1 = {
  ALT: "Alt",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  BACKSPACE: "Backspace",
  CAPS_LOCK: "CapsLock",
  CONTROL: "Control",
  DELETE: "Delete",
  END: "End",
  ENTER: "Enter",
  ESCAPE: "Escape",
  F1: "F1",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  HOME: "Home",
  META: "Meta",
  PAGE_DOWN: "PageDown",
  PAGE_UP: "PageUp",
  SHIFT: "Shift",
  SPACE: " ",
  TAB: "Tab",
  CTRL: "Control",
  ASTERISK: "*"
};
function omit(obj, ...keys) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = writable(value);
  });
  return result;
}
function effect(stores, fn) {
  const unsub = derivedWithUnsubscribe(stores, (stores2, onUnsubscribe) => {
    return {
      stores: stores2,
      onUnsubscribe
    };
  }).subscribe(({ stores: stores2, onUnsubscribe }) => {
    const returned = fn(stores2);
    if (returned) {
      onUnsubscribe(returned);
    }
  });
  onDestroy(unsub);
  return unsub;
}
function derivedWithUnsubscribe(stores, fn) {
  let unsubscribers = [];
  const onUnsubscribe = (cb) => {
    unsubscribers.push(cb);
  };
  const unsubscribe = () => {
    unsubscribers.forEach((fn2) => fn2());
    unsubscribers = [];
  };
  const derivedStore = derived(stores, ($storeValues) => {
    unsubscribe();
    return fn($storeValues, onUnsubscribe);
  });
  onDestroy(unsubscribe);
  const subscribe2 = (...args) => {
    const unsub = derivedStore.subscribe(...args);
    return () => {
      unsub();
      unsubscribe();
    };
  };
  return {
    ...derivedStore,
    subscribe: subscribe2
  };
}
function styleToString$2(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
const srOnlyStyles = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0"
};
function addEventListener$2(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
const NAME$m = "Command";
const STATE_NAME = "CommandState";
const GROUP_NAME = "CommandGroup";
const LIST_SELECTOR = `[data-cmdk-list-sizer]`;
const GROUP_SELECTOR = `[data-cmdk-group]`;
const GROUP_ITEMS_SELECTOR = `[data-cmdk-group-items]`;
const GROUP_HEADING_SELECTOR = `[data-cmdk-group-heading]`;
const ITEM_SELECTOR = `[data-cmdk-item]`;
const VALID_ITEM_SELECTOR = `${ITEM_SELECTOR}:not([aria-disabled="true"])`;
const VALUE_ATTR = `data-value`;
const defaultFilter = (value, search) => commandScore(value, search);
function getCtx() {
  return getContext(NAME$m);
}
function getState() {
  return getContext(STATE_NAME);
}
function createGroup(alwaysRender) {
  const id = generateId();
  setContext(GROUP_NAME, {
    id,
    alwaysRender: isUndefined(alwaysRender) ? false : alwaysRender
  });
  return { id };
}
function getGroup() {
  const context = getContext(GROUP_NAME);
  if (!context)
    return void 0;
  return context;
}
function createState(initialValues) {
  const defaultState = {
    search: "",
    value: "",
    filtered: {
      count: 0,
      items: /* @__PURE__ */ new Map(),
      groups: /* @__PURE__ */ new Set()
    }
  };
  const state = writable(initialValues ? { ...defaultState, ...removeUndefined(initialValues) } : defaultState);
  return state;
}
const defaults = {
  label: "Command menu",
  shouldFilter: true,
  loop: false,
  onValueChange: void 0,
  value: void 0,
  filter: defaultFilter,
  ids: {
    root: generateId(),
    list: generateId(),
    label: generateId(),
    input: generateId()
  }
};
function createCommand(props) {
  const ids = {
    root: generateId(),
    list: generateId(),
    label: generateId(),
    input: generateId(),
    ...props.ids
  };
  const withDefaults = {
    ...defaults,
    ...removeUndefined(props)
  };
  const state = props.state ?? createState({
    value: withDefaults.value
  });
  const allItems = writable(/* @__PURE__ */ new Set());
  const allGroups = writable(/* @__PURE__ */ new Map());
  const allIds = writable(/* @__PURE__ */ new Map());
  const commandEl = writable(null);
  const options = toWritableStores(omit(withDefaults, "value", "ids"));
  let $allItems = get_store_value(allItems);
  let $allGroups = get_store_value(allGroups);
  let $allIds = get_store_value(allIds);
  let shouldFilter = get_store_value(options.shouldFilter);
  let loop = get_store_value(options.loop);
  let label = get_store_value(options.label);
  let filter = get_store_value(options.filter);
  effect(options.shouldFilter, ($shouldFilter) => {
    shouldFilter = $shouldFilter;
  });
  effect(options.loop, ($loop) => {
    loop = $loop;
  });
  effect(options.filter, ($filter) => {
    filter = $filter;
  });
  effect(options.label, ($label) => {
    label = $label;
  });
  effect(allItems, (v) => {
    $allItems = v;
  });
  effect(allGroups, (v) => {
    $allGroups = v;
  });
  effect(allIds, (v) => {
    $allIds = v;
  });
  const context = {
    value: (id, value) => {
      if (value !== $allIds.get(id)) {
        allIds.update(($allIds2) => {
          $allIds2.set(id, value);
          return $allIds2;
        });
        state.update(($state) => {
          $state.filtered.items.set(id, score(value, $state.search));
          return $state;
        });
      }
    },
    // Track item lifecycle (add/remove)
    item: (id, groupId) => {
      allItems.update(($allItems2) => $allItems2.add(id));
      if (groupId) {
        allGroups.update(($allGroups2) => {
          var _a;
          if (!$allGroups2.has(groupId)) {
            $allGroups2.set(groupId, /* @__PURE__ */ new Set([id]));
          } else {
            (_a = $allGroups2.get(groupId)) == null ? void 0 : _a.add(id);
          }
          return $allGroups2;
        });
      }
      state.update(($state) => {
        const filteredState = filterItems($state, shouldFilter);
        if (!filteredState.value) {
          const value = selectFirstItem();
          filteredState.value = value ?? "";
        }
        return filteredState;
      });
      return () => {
        allIds.update(($allIds2) => {
          $allIds2.delete(id);
          return $allIds2;
        });
        allItems.update(($allItems2) => {
          $allItems2.delete(id);
          return $allItems2;
        });
        state.update(($state) => {
          $state.filtered.items.delete(id);
          const selectedItem = getSelectedItem();
          const filteredState = filterItems($state);
          if ((selectedItem == null ? void 0 : selectedItem.getAttribute("id")) === id) {
            filteredState.value = selectFirstItem() ?? "";
          }
          return $state;
        });
      };
    },
    group: (id) => {
      allGroups.update(($allGroups2) => {
        if (!$allGroups2.has(id)) {
          $allGroups2.set(id, /* @__PURE__ */ new Set());
        }
        return $allGroups2;
      });
      return () => {
        allIds.update(($allIds2) => {
          $allIds2.delete(id);
          return $allIds2;
        });
        allGroups.update(($allGroups2) => {
          $allGroups2.delete(id);
          return $allGroups2;
        });
      };
    },
    filter: () => {
      return shouldFilter;
    },
    label: label || props["aria-label"] || "",
    commandEl,
    ids,
    updateState
  };
  function updateState(key, value, preventScroll) {
    state.update((curr) => {
      var _a;
      if (Object.is(curr[key], value))
        return curr;
      curr[key] = value;
      if (key === "search") {
        const filteredState = filterItems(curr, shouldFilter);
        curr = filteredState;
        const sortedState = sort(curr, shouldFilter);
        curr = sortedState;
        tick$1().then(() => state.update((curr2) => {
          curr2.value = selectFirstItem() ?? "";
          return curr2;
        }));
      } else if (key === "value") {
        (_a = props.onValueChange) == null ? void 0 : _a.call(props, curr.value);
        if (!preventScroll) {
          tick$1().then(() => scrollSelectedIntoView());
        }
      }
      return curr;
    });
  }
  function filterItems(state2, shouldFilterVal) {
    const $shouldFilter = shouldFilterVal ?? shouldFilter;
    if (!state2.search || !$shouldFilter) {
      state2.filtered.count = $allItems.size;
      return state2;
    }
    state2.filtered.groups = /* @__PURE__ */ new Set();
    let itemCount = 0;
    for (const id of $allItems) {
      const value = $allIds.get(id);
      const rank = score(value, state2.search);
      state2.filtered.items.set(id, rank);
      if (rank > 0) {
        itemCount++;
      }
    }
    for (const [groupId, group] of $allGroups) {
      for (const itemId of group) {
        const rank = state2.filtered.items.get(itemId);
        if (rank && rank > 0) {
          state2.filtered.groups.add(groupId);
        }
      }
    }
    state2.filtered.count = itemCount;
    return state2;
  }
  function sort(state2, shouldFilterVal) {
    var _a;
    const $shouldFilter = shouldFilterVal ?? shouldFilter;
    if (!state2.search || !$shouldFilter) {
      return state2;
    }
    const scores = state2.filtered.items;
    const groups = [];
    for (const value of state2.filtered.groups) {
      const items = $allGroups.get(value);
      if (!items)
        continue;
      let max = 0;
      for (const item of items) {
        const score2 = scores.get(item);
        if (isUndefined(score2))
          continue;
        max = Math.max(score2, max);
      }
      groups.push([value, max]);
    }
    const rootEl = document.getElementById(ids.root);
    if (!rootEl)
      return state2;
    const list = rootEl.querySelector(LIST_SELECTOR);
    const validItems = getValidItems(rootEl).sort((a, b2) => {
      const valueA = a.getAttribute(VALUE_ATTR) ?? "";
      const valueB = b2.getAttribute(VALUE_ATTR) ?? "";
      return (scores.get(valueA) ?? 0) - (scores.get(valueB) ?? 0);
    });
    for (const item of validItems) {
      const group = item.closest(GROUP_ITEMS_SELECTOR);
      const closest = item.closest(`${GROUP_ITEMS_SELECTOR} > *`);
      if (group) {
        if (item.parentElement === group) {
          group.appendChild(item);
        } else {
          if (!closest)
            continue;
          group.appendChild(closest);
        }
      } else {
        if (item.parentElement === list) {
          list == null ? void 0 : list.appendChild(item);
        } else {
          if (!closest)
            continue;
          list == null ? void 0 : list.appendChild(closest);
        }
      }
    }
    groups.sort((a, b2) => b2[1] - a[1]);
    for (const group of groups) {
      const el = rootEl.querySelector(`${GROUP_SELECTOR}[${VALUE_ATTR}="${group[0]}"]`);
      (_a = el == null ? void 0 : el.parentElement) == null ? void 0 : _a.appendChild(el);
    }
    return state2;
  }
  function selectFirstItem() {
    const item = getValidItems().find((item2) => !item2.ariaDisabled);
    if (!item)
      return;
    const value = item.getAttribute(VALUE_ATTR);
    if (!value)
      return;
    return value;
  }
  function score(value, search) {
    const lowerCaseAndTrimmedValue = value == null ? void 0 : value.toLowerCase().trim();
    const filterFn = filter;
    if (!filterFn) {
      return lowerCaseAndTrimmedValue ? defaultFilter(lowerCaseAndTrimmedValue, search) : 0;
    }
    return lowerCaseAndTrimmedValue ? filterFn(lowerCaseAndTrimmedValue, search) : 0;
  }
  function scrollSelectedIntoView() {
    var _a;
    const item = getSelectedItem();
    if (!item) {
      return;
    }
    if (((_a = item.parentElement) == null ? void 0 : _a.firstChild) === item) {
      tick$1().then(() => {
        var _a2, _b;
        return (_b = (_a2 = item.closest(GROUP_SELECTOR)) == null ? void 0 : _a2.querySelector(GROUP_HEADING_SELECTOR)) == null ? void 0 : _b.scrollIntoView({
          block: "nearest"
        });
      });
    }
    tick$1().then(() => item.scrollIntoView({ block: "nearest" }));
  }
  function getValidItems(rootElement) {
    const rootEl = rootElement ?? document.getElementById(ids.root);
    if (!rootEl)
      return [];
    return Array.from(rootEl.querySelectorAll(VALID_ITEM_SELECTOR)).filter((el) => el ? true : false);
  }
  function getSelectedItem(rootElement) {
    const rootEl = document.getElementById(ids.root);
    if (!rootEl)
      return;
    const selectedEl = rootEl.querySelector(`${VALID_ITEM_SELECTOR}[aria-selected="true"]`);
    if (!selectedEl)
      return;
    return selectedEl;
  }
  function updateSelectedToIndex(index) {
    const rootEl = document.getElementById(ids.root);
    if (!rootEl)
      return;
    const items = getValidItems(rootEl);
    const item = items[index];
    if (!item)
      return;
  }
  function updateSelectedByChange(change) {
    const selected = getSelectedItem();
    const items = getValidItems();
    const index = items.findIndex((item) => item === selected);
    let newSelected = items[index + change];
    if (loop) {
      if (index + change < 0) {
        newSelected = items[items.length - 1];
      } else if (index + change === items.length) {
        newSelected = items[0];
      } else {
        newSelected = items[index + change];
      }
    }
    if (newSelected) {
      updateState("value", newSelected.getAttribute(VALUE_ATTR) ?? "");
    }
  }
  function updateSelectedToGroup(change) {
    const selected = getSelectedItem();
    let group = selected == null ? void 0 : selected.closest(GROUP_SELECTOR);
    let item = void 0;
    while (group && !item) {
      group = change > 0 ? findNextSibling(group, GROUP_SELECTOR) : findPreviousSibling(group, GROUP_SELECTOR);
      item = group == null ? void 0 : group.querySelector(VALID_ITEM_SELECTOR);
    }
    if (item) {
      updateState("value", item.getAttribute(VALUE_ATTR) ?? "");
    } else {
      updateSelectedByChange(change);
    }
  }
  function last2() {
    return updateSelectedToIndex(getValidItems().length - 1);
  }
  function next2(e) {
    e.preventDefault();
    if (e.metaKey) {
      last2();
    } else if (e.altKey) {
      updateSelectedToGroup(1);
    } else {
      updateSelectedByChange(1);
    }
  }
  function prev2(e) {
    e.preventDefault();
    if (e.metaKey) {
      updateSelectedToIndex(0);
    } else if (e.altKey) {
      updateSelectedToGroup(-1);
    } else {
      updateSelectedByChange(-1);
    }
  }
  function handleRootKeydown(e) {
    switch (e.key) {
      case kbd$1.ARROW_DOWN:
        next2(e);
        break;
      case kbd$1.ARROW_UP:
        prev2(e);
        break;
      case kbd$1.HOME:
        e.preventDefault();
        updateSelectedToIndex(0);
        break;
      case kbd$1.END:
        e.preventDefault();
        last2();
        break;
      case kbd$1.ENTER: {
        e.preventDefault();
        const item = getSelectedItem();
        if (item) {
          item == null ? void 0 : item.click();
        }
      }
    }
  }
  setContext(NAME$m, context);
  const stateStore = {
    subscribe: state.subscribe,
    update: state.update,
    set: state.set,
    updateState
  };
  setContext(STATE_NAME, stateStore);
  return {
    state: stateStore,
    handleRootKeydown,
    commandEl,
    ids
  };
}
function findNextSibling(el, selector2) {
  let sibling = el.nextElementSibling;
  while (sibling) {
    if (sibling.matches(selector2))
      return sibling;
    sibling = sibling.nextElementSibling;
  }
}
function findPreviousSibling(el, selector2) {
  let sibling = el.previousElementSibling;
  while (sibling) {
    if (sibling.matches(selector2))
      return sibling;
    sibling = sibling.previousElementSibling;
  }
}
const Command$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let slotProps;
  let $$restProps = compute_rest_props($$props, [
    "label",
    "shouldFilter",
    "filter",
    "value",
    "onValueChange",
    "loop",
    "onKeydown",
    "state",
    "ids",
    "asChild"
  ]);
  let $stateStore, $$unsubscribe_stateStore;
  let { label = void 0 } = $$props;
  let { shouldFilter = true } = $$props;
  let { filter = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { loop = void 0 } = $$props;
  let { onKeydown = void 0 } = $$props;
  let { state = void 0 } = $$props;
  let { ids = void 0 } = $$props;
  let { asChild = false } = $$props;
  const { commandEl, handleRootKeydown, ids: commandIds, state: stateStore } = createCommand({
    label,
    shouldFilter,
    filter,
    value,
    onValueChange: (next2) => {
      if (next2 !== value) {
        value = next2;
        onValueChange == null ? void 0 : onValueChange(next2);
      }
    },
    loop,
    state,
    ids
  });
  $$unsubscribe_stateStore = subscribe(stateStore, (value2) => $stateStore = value2);
  function syncValueAndState(value2) {
    if (value2 && value2 !== $stateStore.value) {
      set_store_value(stateStore, $stateStore.value = value2, $stateStore);
    }
  }
  function rootAction(node) {
    commandEl.set(node);
    const unsubEvents = executeCallbacks(addEventListener$2(node, "keydown", handleKeydown));
    return { destroy: unsubEvents };
  }
  const rootAttrs = {
    role: "application",
    id: commandIds.root,
    "data-cmdk-root": ""
  };
  const labelAttrs = {
    "data-cmdk-label": "",
    for: commandIds.input,
    id: commandIds.label,
    style: styleToString$2(srOnlyStyles)
  };
  function handleKeydown(e) {
    onKeydown == null ? void 0 : onKeydown(e);
    if (e.defaultPrevented) return;
    handleRootKeydown(e);
  }
  const root = { action: rootAction, attrs: rootAttrs };
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.shouldFilter === void 0 && $$bindings.shouldFilter && shouldFilter !== void 0) $$bindings.shouldFilter(shouldFilter);
  if ($$props.filter === void 0 && $$bindings.filter && filter !== void 0) $$bindings.filter(filter);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0) $$bindings.onValueChange(onValueChange);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0) $$bindings.loop(loop);
  if ($$props.onKeydown === void 0 && $$bindings.onKeydown && onKeydown !== void 0) $$bindings.onKeydown(onKeydown);
  if ($$props.state === void 0 && $$bindings.state && state !== void 0) $$bindings.state(state);
  if ($$props.ids === void 0 && $$bindings.ids && ids !== void 0) $$bindings.ids(ids);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  {
    syncValueAndState(value);
  }
  slotProps = {
    root,
    label: { attrs: labelAttrs },
    stateStore,
    state: $stateStore
  };
  $$unsubscribe_stateStore();
  return `${asChild ? `${slots.default ? slots.default({ ...slotProps }) : ``}` : `<div${spread([escape_object(rootAttrs), escape_object($$restProps)], {})}> <label${spread([escape_object(labelAttrs)], {})}>${escape(label ?? "")}</label> ${slots.default ? slots.default({ ...slotProps }) : ``}</div>`}`;
});
function styleToString$1(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
({
  type: "hidden",
  "aria-hidden": true,
  hidden: true,
  tabIndex: -1,
  style: styleToString$1({
    position: "absolute",
    opacity: 0,
    "pointer-events": "none",
    margin: 0,
    transform: "translateX(-100%)"
  })
});
function addEventListener$1(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
const kbd = {
  ALT: "Alt",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  BACKSPACE: "Backspace",
  CAPS_LOCK: "CapsLock",
  CONTROL: "Control",
  DELETE: "Delete",
  END: "End",
  ENTER: "Enter",
  ESCAPE: "Escape",
  F1: "F1",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  HOME: "Home",
  META: "Meta",
  PAGE_DOWN: "PageDown",
  PAGE_UP: "PageUp",
  SHIFT: "Shift",
  SPACE: " ",
  TAB: "Tab",
  CTRL: "Control",
  ASTERISK: "*",
  A: "a",
  P: "p"
};
readable(void 0, (set) => {
  function clicked(event) {
    set(event);
    set(void 0);
  }
  const unsubscribe = addEventListener$1(document, "pointerup", clicked, {
    passive: false,
    capture: true
  });
  return unsubscribe;
});
readable(void 0, (set) => {
  function keydown(event) {
    if (event && event.key === kbd.ESCAPE) {
      set(event);
    }
    set(void 0);
  }
  const unsubscribe = addEventListener$1(document, "keydown", keydown, {
    passive: false,
    capture: true
  });
  return unsubscribe;
});
function createBitAttrs(bit, parts) {
  const attrs = {};
  parts.forEach((part) => {
    attrs[part] = {
      [`data-bits-${bit}-${part}`]: ""
    };
  });
  return (part) => attrs[part];
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
styleToString({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0"
});
styleToString({
  position: "absolute",
  width: "25px",
  height: "25px",
  opacity: "0",
  margin: "0px",
  pointerEvents: "none",
  transform: "translateX(-100%)"
});
const NAME$l = "accordion";
const PARTS$l = ["root", "content", "header", "item", "trigger"];
createBitAttrs(NAME$l, PARTS$l);
const NAME$k = "alert-dialog";
const PARTS$k = [
  "action",
  "cancel",
  "content",
  "description",
  "overlay",
  "portal",
  "title",
  "trigger"
];
createBitAttrs(NAME$k, PARTS$k);
const NAME$j = "avatar";
const PARTS$j = ["root", "image", "fallback"];
createBitAttrs(NAME$j, PARTS$j);
const NAME$i = "checkbox";
const PARTS$i = ["root", "input", "indicator"];
createBitAttrs(NAME$i, PARTS$i);
const NAME$h = "collapsible";
const PARTS$h = ["root", "content", "trigger"];
createBitAttrs(NAME$h, PARTS$h);
const NAME$g = "context-menu";
const PARTS$g = [
  "arrow",
  "checkbox-indicator",
  "checkbox-item",
  "content",
  "group",
  "item",
  "label",
  "radio-group",
  "radio-item",
  "separator",
  "sub-content",
  "sub-trigger",
  "trigger"
];
createBitAttrs(NAME$g, PARTS$g);
const NAME$f = "dialog";
const PARTS$f = ["close", "content", "description", "overlay", "portal", "title", "trigger"];
createBitAttrs(NAME$f, PARTS$f);
const NAME$e = "dropdown-menu";
const PARTS$e = [
  "arrow",
  "checkbox-indicator",
  "checkbox-item",
  "content",
  "group",
  "item",
  "label",
  "radio-group",
  "radio-item",
  "separator",
  "sub-content",
  "sub-trigger",
  "trigger"
];
createBitAttrs(NAME$e, PARTS$e);
const NAME$d = "link-preview";
const PARTS$d = ["arrow", "content", "trigger"];
createBitAttrs(NAME$d, PARTS$d);
const NAME$c = "label";
const PARTS$c = ["root"];
createBitAttrs(NAME$c, PARTS$c);
const NAME$b = "menubar";
const PARTS$b = [
  "root",
  "arrow",
  "checkbox-indicator",
  "checkbox-item",
  "content",
  "group",
  "item",
  "label",
  "radio-group",
  "radio-item",
  "separator",
  "sub-content",
  "sub-trigger",
  "trigger"
];
createBitAttrs(NAME$b, PARTS$b);
const NAME$a = "popover";
const PARTS$a = ["arrow", "close", "content", "trigger"];
createBitAttrs(NAME$a, PARTS$a);
const NAME$9 = "progress";
const PARTS$9 = ["root"];
createBitAttrs(NAME$9, PARTS$9);
const NAME$8 = "radio-group";
const PARTS$8 = ["root", "item", "input"];
createBitAttrs(NAME$8, PARTS$8);
const NAME$7 = "select";
const PARTS$7 = ["arrow", "content", "group", "item", "input", "label", "trigger", "value"];
createBitAttrs(NAME$7, PARTS$7);
const NAME$6 = "separator";
const PARTS$6 = ["root"];
createBitAttrs(NAME$6, PARTS$6);
const NAME$5 = "slider";
const PARTS$5 = ["root", "input", "range", "thumb", "tick"];
createBitAttrs(NAME$5, PARTS$5);
const NAME$4 = "switch";
const PARTS$4 = ["root", "input", "thumb"];
createBitAttrs(NAME$4, PARTS$4);
const NAME$3 = "tabs";
const PARTS$3 = ["root", "content", "list", "trigger"];
createBitAttrs(NAME$3, PARTS$3);
const NAME$2 = "toggle";
const PARTS$2 = ["root", "input"];
createBitAttrs(NAME$2, PARTS$2);
const NAME$1 = "toggle-group";
const PARTS$1 = ["root", "item"];
createBitAttrs(NAME$1, PARTS$1);
const NAME = "tooltip";
const PARTS = ["arrow", "content", "trigger"];
createBitAttrs(NAME, PARTS);
const CommandEmpty = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  compute_rest_props($$props, ["asChild"]);
  let $state, $$unsubscribe_state;
  let { asChild = false } = $$props;
  const state = getState();
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  $state.filtered.count === 0;
  $$unsubscribe_state();
  return `${``}`;
});
const CommandGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let containerAttrs;
  let groupAttrs;
  let container;
  let group;
  let $$restProps = compute_rest_props($$props, ["heading", "value", "alwaysRender", "asChild"]);
  let $render, $$unsubscribe_render;
  let { heading = void 0 } = $$props;
  let { value = "" } = $$props;
  let { alwaysRender = false } = $$props;
  let { asChild = false } = $$props;
  const { id } = createGroup(alwaysRender);
  const context = getCtx();
  const state = getState();
  const headingId = generateId();
  const render = derived(state, ($state) => {
    if (alwaysRender) return true;
    if (context.filter() === false) return true;
    if (!$state.search) return true;
    return $state.filtered.groups.has(id);
  });
  $$unsubscribe_render = subscribe(render, (value2) => $render = value2);
  function containerAction(node) {
    if (value) {
      context.value(id, value);
      node.setAttribute(VALUE_ATTR, value);
      return;
    }
    if (heading) {
      value = heading.trim().toLowerCase();
    } else if (node.textContent) {
      value = node.textContent.trim().toLowerCase();
    }
    context.value(id, value);
    node.setAttribute(VALUE_ATTR, value);
  }
  const headingAttrs = {
    "data-cmdk-group-heading": "",
    "aria-hidden": true,
    id: headingId
  };
  if ($$props.heading === void 0 && $$bindings.heading && heading !== void 0) $$bindings.heading(heading);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.alwaysRender === void 0 && $$bindings.alwaysRender && alwaysRender !== void 0) $$bindings.alwaysRender(alwaysRender);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  containerAttrs = {
    "data-cmdk-group": "",
    role: "presentation",
    hidden: $render ? void 0 : true,
    "data-value": value
  };
  groupAttrs = {
    "data-cmdk-group-items": "",
    role: "group",
    "aria-labelledby": heading ? headingId : void 0
  };
  container = {
    action: containerAction,
    attrs: containerAttrs
  };
  group = { attrs: groupAttrs };
  $$unsubscribe_render();
  return `${asChild ? `${slots.default ? slots.default({
    container,
    group,
    heading: { attrs: headingAttrs }
  }) : ``}` : `<div${spread([escape_object(containerAttrs), escape_object($$restProps)], {})}>${heading ? `<div${spread([escape_object(headingAttrs)], {})}>${escape(heading)}</div>` : ``} <div${spread([escape_object(groupAttrs)], {})}>${slots.default ? slots.default({
    container,
    group,
    heading: { attrs: headingAttrs }
  }) : ``}</div></div>`}`;
});
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const CommandInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["autofocus", "value", "asChild", "el"]);
  let $selectedItemId, $$unsubscribe_selectedItemId;
  const { ids, commandEl } = getCtx();
  const state = getState();
  const search = derived(state, ($state) => $state.search);
  const valueStore = derived(state, ($state) => $state.value);
  let { autofocus = void 0 } = $$props;
  let { value = get_store_value(search) } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const selectedItemId = derived([valueStore, commandEl], ([$value, $commandEl]) => {
    if (!isBrowser) return void 0;
    const item = $commandEl == null ? void 0 : $commandEl.querySelector(`${ITEM_SELECTOR}[${VALUE_ATTR}="${$value}"]`);
    return item == null ? void 0 : item.getAttribute("id");
  });
  $$unsubscribe_selectedItemId = subscribe(selectedItemId, (value2) => $selectedItemId = value2);
  function handleValueUpdate(v) {
    state.updateState("search", v);
  }
  function action(node) {
    if (autofocus) {
      sleep(10).then(() => node.focus());
    }
    if (asChild) {
      const unsubEvents = addEventListener$2(node, "change", (e) => {
        const currTarget = e.currentTarget;
        state.updateState("search", currTarget.value);
      });
      return { destroy: unsubEvents };
    }
  }
  let attrs;
  if ($$props.autofocus === void 0 && $$bindings.autofocus && autofocus !== void 0) $$bindings.autofocus(autofocus);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    handleValueUpdate(value);
  }
  attrs = {
    type: "text",
    "data-cmdk-input": "",
    autocomplete: "off",
    autocorrect: "off",
    spellcheck: false,
    "aria-autocomplete": "list",
    role: "combobox",
    "aria-expanded": true,
    "aria-controls": ids.list,
    "aria-labelledby": ids.label,
    "aria-activedescendant": $selectedItemId ?? void 0,
    id: ids.input
  };
  $$unsubscribe_selectedItemId();
  return `${asChild ? `${slots.default ? slots.default({ action, attrs }) : ``}` : `<input${spread([escape_object(attrs), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}${add_attribute("value", value, 0)}>`}`;
});
const CommandItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attrs;
  let $$restProps = compute_rest_props($$props, ["disabled", "value", "onSelect", "alwaysRender", "asChild", "id"]);
  let $selected, $$unsubscribe_selected;
  let $render, $$unsubscribe_render;
  let { disabled = false } = $$props;
  let { value = "" } = $$props;
  let { onSelect = void 0 } = $$props;
  let { alwaysRender = false } = $$props;
  let { asChild = false } = $$props;
  let { id = generateId() } = $$props;
  const groupContext = getGroup();
  const context = getCtx();
  const state = getState();
  const trueAlwaysRender = alwaysRender ?? (groupContext == null ? void 0 : groupContext.alwaysRender);
  const render = derived(state, ($state) => {
    if (trueAlwaysRender || context.filter() === false || !$state.search) return true;
    const currentScore = $state.filtered.items.get(id);
    if (isUndefined(currentScore)) return false;
    return currentScore > 0;
  });
  $$unsubscribe_render = subscribe(render, (value2) => $render = value2);
  let isFirstRender = true;
  const selected = derived(state, ($state) => $state.value === value);
  $$unsubscribe_selected = subscribe(selected, (value2) => $selected = value2);
  function action(node) {
    if (!value && node.textContent) {
      value = node.textContent.trim().toLowerCase();
    }
    context.value(id, value);
    node.setAttribute(VALUE_ATTR, value);
    const unsubEvents = executeCallbacks(
      addEventListener$2(node, "pointermove", () => {
        if (disabled) return;
        select();
      }),
      addEventListener$2(node, "click", () => {
        if (disabled) return;
        handleItemClick();
      })
    );
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleItemClick() {
    select();
    onSelect == null ? void 0 : onSelect(value);
  }
  function select() {
    state.updateState("value", value, true);
  }
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.onSelect === void 0 && $$bindings.onSelect && onSelect !== void 0) $$bindings.onSelect(onSelect);
  if ($$props.alwaysRender === void 0 && $$bindings.alwaysRender && alwaysRender !== void 0) $$bindings.alwaysRender(alwaysRender);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  attrs = {
    "aria-disabled": disabled ? true : void 0,
    "aria-selected": $selected ? true : void 0,
    "data-disabled": disabled ? true : void 0,
    "data-selected": $selected ? true : void 0,
    "data-cmdk-item": "",
    "data-value": value,
    role: "option",
    id
  };
  $$unsubscribe_selected();
  $$unsubscribe_render();
  return `${$render || isFirstRender ? `${asChild ? `${slots.default ? slots.default({ action, attrs }) : ``}` : `<div${spread([escape_object(attrs), escape_object($$restProps)], {})}>${slots.default ? slots.default({ action, attrs }) : ``}</div>`}` : ``}`;
});
const Command = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value", "class"]);
  let { value = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Command$1, "CommandPrimitive.Root").$$render(
      $$result,
      Object.assign(
        {},
        {
          class: cn$1("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className)
        },
        $$restProps,
        { value }
      ),
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Command_empty = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(CommandEmpty, "CommandPrimitive.Empty").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn$1("py-6 text-center text-sm", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Command_group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(CommandGroup, "CommandPrimitive.Group").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn$1("overflow-hidden p-1 text-foreground [&_[data-cmdk-group-heading]]:px-2 [&_[data-cmdk-group-heading]]:py-1.5 [&_[data-cmdk-group-heading]]:text-xs [&_[data-cmdk-group-heading]]:font-medium [&_[data-cmdk-group-heading]]:text-muted-foreground", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Command_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "class"]);
  let { asChild = false } = $$props;
  let { class: className = void 0 } = $$props;
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(CommandItem, "CommandPrimitive.Item").$$render(
    $$result,
    Object.assign(
      {},
      { asChild },
      {
        class: cn$1("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)
      },
      $$restProps
    ),
    {},
    {
      default: ({ action, attrs }) => {
        return `${slots.default ? slots.default({ action, attrs }) : ``}`;
      }
    }
  )}`;
});
const Command_input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex items-center border-b px-2" data-cmdk-input-wrapper="">${validate_component(Search, "Search").$$render(
      $$result,
      {
        class: "mr-2 h-4 w-4 shrink-0 opacity-50"
      },
      {},
      {}
    )} ${validate_component(CommandInput, "CommandPrimitive.Input").$$render(
      $$result,
      Object.assign(
        {},
        {
          class: cn$1("flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)
        },
        $$restProps,
        { value }
      ),
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Videos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $new_video_form, $$unsubscribe_new_video_form;
  let { videos } = $$props;
  let { collections } = $$props;
  let { available_roles } = $$props;
  let new_video_dialog_open = false;
  let collections_open = false;
  let new_collection_open = false;
  let new_collection_name = "";
  let currently_edited_video;
  let new_video_form = useForm({
    id: null,
    title: null,
    description: null,
    subject: null,
    poster: null,
    poster_deleted: false,
    preview: null,
    preview_deleted: false,
    thumbnail: null,
    link: null,
    publication_date: null,
    collection: "",
    category: null,
    roles: []
  });
  $$unsubscribe_new_video_form = subscribe(new_video_form, (value) => $new_video_form = value);
  const df = new DateFormatter("en-US", { dateStyle: "long" });
  function closeAndFocusTrigger(triggerId) {
    collections_open = false;
    tick().then(() => {
      var _a;
      (_a = document.getElementById(triggerId)) == null ? void 0 : _a.focus();
    });
  }
  if ($$props.videos === void 0 && $$bindings.videos && videos !== void 0) $$bindings.videos(videos);
  if ($$props.collections === void 0 && $$bindings.collections && collections !== void 0) $$bindings.collections(collections);
  if ($$props.available_roles === void 0 && $$bindings.available_roles && available_roles !== void 0) $$bindings.available_roles(available_roles);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<main class="max-w-screen-xl mx-auto p-4 px-4 md:px-8 w-full overflow-scroll-y"> <div class="flex justify-end">${validate_component(Root$2, "Dialog.Root").$$render(
      $$result,
      { open: new_video_dialog_open },
      {
        open: ($$value) => {
          new_video_dialog_open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<form>${validate_component(Dialog_content, "Dialog.Content").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Dialog_header, "Dialog.Header").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Dialog_title, "Dialog.Title").$$render($$result, { class: "text-2xl" }, {}, {
                    default: () => {
                      return `${$new_video_form.title ? `${escape($new_video_form.title)}` : `New video`} ${$new_video_form.publication_date ? `<span class="text-bjelopic-blue-1">(${escape(new Date($new_video_form.publication_date).getFullYear())})</span>` : ``}`;
                    }
                  })}`;
                }
              })}  ${validate_component(Root$1, "Tabs.Root").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Tabs_list, "Tabs.List").$$render($$result, { class: "grid grid-cols-2 w-full" }, {}, {
                    default: () => {
                      return `${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "info" }, {}, {
                        default: () => {
                          return `Info`;
                        }
                      })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "media" }, {}, {
                        default: () => {
                          return `Media`;
                        }
                      })}`;
                    }
                  })} ${validate_component(Tabs_content, "Tabs.Content").$$render(
                    $$result,
                    {
                      value: "info",
                      class: "h-[450px] overflow-x-clip overflow-y-scroll"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(Label, "Label").$$render($$result, { for: "new-video-title" }, {}, {
                          default: () => {
                            return `Title*`;
                          }
                        })} ${validate_component(Input, "Input").$$render(
                          $$result,
                          {
                            id: "new-video-title",
                            type: "text",
                            required: true,
                            value: $new_video_form.title
                          },
                          {
                            value: ($$value) => {
                              $new_video_form.title = $$value;
                              $$settled = false;
                            }
                          },
                          {}
                        )} ${validate_component(Label, "Label").$$render($$result, { for: "new-video-description" }, {}, {
                          default: () => {
                            return `Description*`;
                          }
                        })} ${validate_component(Textarea, "Textarea").$$render(
                          $$result,
                          {
                            id: "new-video-description",
                            required: true,
                            value: $new_video_form.description
                          },
                          {
                            value: ($$value) => {
                              $new_video_form.description = $$value;
                              $$settled = false;
                            }
                          },
                          {}
                        )} ${validate_component(Label, "Label").$$render($$result, { for: "new-video-category" }, {}, {
                          default: () => {
                            return `Category*`;
                          }
                        })} ${validate_component(Input, "Input").$$render(
                          $$result,
                          {
                            type: "text",
                            id: "new-video-category",
                            required: true,
                            value: $new_video_form.category
                          },
                          {
                            value: ($$value) => {
                              $new_video_form.category = $$value;
                              $$settled = false;
                            }
                          },
                          {}
                        )} ${validate_component(Label, "Label").$$render($$result, { for: "new-video-subject" }, {}, {
                          default: () => {
                            return `Subject*`;
                          }
                        })} ${validate_component(Input, "Input").$$render(
                          $$result,
                          {
                            type: "text",
                            id: "new-video-subject",
                            required: true,
                            value: $new_video_form.subject
                          },
                          {
                            value: ($$value) => {
                              $new_video_form.subject = $$value;
                              $$settled = false;
                            }
                          },
                          {}
                        )} ${validate_component(Label, "Label").$$render($$result, { for: "new-video-publication-date" }, {}, {
                          default: () => {
                            return `Publication date*`;
                          }
                        })}<br> ${validate_component(Root, "Popover.Root").$$render($$result, { openFocus: true }, {}, {
                          default: () => {
                            return `${validate_component(Trigger, "Popover.Trigger").$$render($$result, { asChild: true }, {}, {
                              default: ({ builder }) => {
                                return `${validate_component(Button, "Button").$$render(
                                  $$result,
                                  {
                                    variant: "outline",
                                    class: cn$1("w-[280px] justify-start text-left font-normal", !$new_video_form.publication_date && "text-muted-foreground"),
                                    id: "new-video-publication-date",
                                    builders: [builder]
                                  },
                                  {},
                                  {
                                    default: () => {
                                      return `${validate_component(Calendar, "CalendarIcon").$$render($$result, { class: "mr-2 h-4 w-4" }, {}, {})} ${escape($new_video_form.publication_date ? df.format($new_video_form.publication_date.toDate(getLocalTimeZone())) : "Select a date")}`;
                                    }
                                  }
                                )}`;
                              }
                            })} ${validate_component(Popover_content, "Popover.Content").$$render($$result, { class: "w-auto p-0" }, {}, {
                              default: () => {
                                return `${validate_component(Calendar_1, "Calendar").$$render(
                                  $$result,
                                  {
                                    initialFocus: true,
                                    value: $new_video_form.publication_date
                                  },
                                  {
                                    value: ($$value) => {
                                      $new_video_form.publication_date = $$value;
                                      $$settled = false;
                                    }
                                  },
                                  {}
                                )}`;
                              }
                            })}`;
                          }
                        })} <br> ${validate_component(Label, "Label").$$render($$result, { for: "link" }, {}, {
                          default: () => {
                            return `Link`;
                          }
                        })} ${validate_component(Input, "Input").$$render(
                          $$result,
                          {
                            type: "text",
                            required: true,
                            value: $new_video_form.link
                          },
                          {
                            value: ($$value) => {
                              $new_video_form.link = $$value;
                              $$settled = false;
                            }
                          },
                          {}
                        )} ${validate_component(Root$3, "Accordion.Root").$$render($$result, { multiple: true, class: "mt-4" }, {}, {
                          default: () => {
                            return ` ${validate_component(Accordion_item, "Accordion.Item").$$render($$result, { value: "collections", class: "border-0" }, {}, {
                              default: () => {
                                return `${validate_component(Accordion_trigger, "Accordion.Trigger").$$render($$result, { class: "py-2" }, {}, {
                                  default: () => {
                                    return `Collection`;
                                  }
                                })} ${validate_component(Accordion_content, "Accordion.Content").$$render($$result, {}, {}, {
                                  default: () => {
                                    return `<div class="flex gap-x-2 align-middle items-center">${validate_component(Root, "Popover.Root").$$render(
                                      $$result,
                                      { open: collections_open },
                                      {
                                        open: ($$value) => {
                                          collections_open = $$value;
                                          $$settled = false;
                                        }
                                      },
                                      {
                                        default: ({ ids }) => {
                                          return `${validate_component(Trigger, "Popover.Trigger").$$render($$result, { asChild: true }, {}, {
                                            default: ({ builder }) => {
                                              return `${validate_component(Button, "Button").$$render(
                                                $$result,
                                                {
                                                  builders: [builder],
                                                  variant: "outline",
                                                  role: "combobox",
                                                  "aria-expanded": collections_open,
                                                  class: "w-[222px] overflow-hidden justify-between " + ($new_video_form.collection ? "" : "text-muted-foreground")
                                                },
                                                {},
                                                {
                                                  default: () => {
                                                    return `${escape($new_video_form.collection ? $new_video_form.collection : "Select")}`;
                                                  }
                                                }
                                              )}`;
                                            }
                                          })} ${validate_component(Popover_content, "Popover.Content").$$render($$result, { class: "w-[222px] p-0" }, {}, {
                                            default: () => {
                                              return `${validate_component(Command, "Command.Root").$$render($$result, {}, {}, {
                                                default: () => {
                                                  return `${validate_component(Command_input, "Command.Input").$$render($$result, { placeholder: "Search collections..." }, {}, {})} ${validate_component(Command_empty, "Command.Empty").$$render($$result, {}, {}, {
                                                    default: () => {
                                                      return `Collection not
                                                            found.`;
                                                    }
                                                  })} ${validate_component(Command_group, "Command.Group").$$render($$result, {}, {}, {
                                                    default: () => {
                                                      return `${each(collections, (collection) => {
                                                        return `${validate_component(Command_item, "Command.Item").$$render(
                                                          $$result,
                                                          {
                                                            value: collection,
                                                            onSelect: (currentValue) => {
                                                              $new_video_form.collection = currentValue;
                                                              closeAndFocusTrigger(ids.trigger);
                                                            }
                                                          },
                                                          {},
                                                          {
                                                            default: () => {
                                                              return `${escape(collection)}`;
                                                            }
                                                          }
                                                        )}`;
                                                      })}`;
                                                    }
                                                  })}`;
                                                }
                                              })}`;
                                            }
                                          })}`;
                                        }
                                      }
                                    )} ${$new_video_form.collection ? `${validate_component(Button, "Button").$$render($$result, { variant: "destructive" }, {}, {
                                      default: () => {
                                        return `${validate_component(Badge_x, "BadgeXIcon").$$render($$result, { class: "w-4 h-4" }, {}, {})}`;
                                      }
                                    })}` : ``} ${validate_component(Root, "Popover.Root").$$render(
                                      $$result,
                                      { open: new_collection_open },
                                      {
                                        open: ($$value) => {
                                          new_collection_open = $$value;
                                          $$settled = false;
                                        }
                                      },
                                      {
                                        default: () => {
                                          return `${validate_component(Trigger, "Popover.Trigger").$$render($$result, { asChild: true }, {}, {
                                            default: ({ builder }) => {
                                              return `${validate_component(Button, "Button").$$render($$result, { variant: "outline", builders: [builder] }, {}, {
                                                default: () => {
                                                  return `${validate_component(Plus, "PlusIcon").$$render($$result, { class: "w-4 h-4" }, {}, {})}`;
                                                }
                                              })}`;
                                            }
                                          })} ${validate_component(Popover_content, "Popover.Content").$$render($$result, { class: "drop-shadow-md" }, {}, {
                                            default: () => {
                                              return `<form class="flex gap-x-2" ${collections.find((element) => element === new_collection_name) ? "disabled" : ""}>${validate_component(Input, "Input").$$render(
                                                $$result,
                                                { type: "text", value: new_collection_name },
                                                {
                                                  value: ($$value) => {
                                                    new_collection_name = $$value;
                                                    $$settled = false;
                                                  }
                                                },
                                                {}
                                              )} ${validate_component(Button, "Button").$$render(
                                                $$result,
                                                {
                                                  type: "submit",
                                                  disabled: collections.find((element) => element === new_collection_name)
                                                },
                                                {},
                                                {
                                                  default: () => {
                                                    return `Add`;
                                                  }
                                                }
                                              )}</form>`;
                                            }
                                          })}`;
                                        }
                                      }
                                    )}</div>`;
                                  }
                                })}`;
                              }
                            })}  ${validate_component(Accordion_item, "Accordion.Item").$$render($$result, { value: "roles", class: "border-0" }, {}, {
                              default: () => {
                                return `${validate_component(Accordion_trigger, "Accordion.Trigger").$$render($$result, { class: "py-2" }, {}, {
                                  default: () => {
                                    return `Roles`;
                                  }
                                })} ${validate_component(Accordion_content, "Accordion.Content").$$render($$result, {}, {}, {
                                  default: () => {
                                    return `<div class="flex flex-col space-y-2">${each(available_roles, (role) => {
                                      let checked = $new_video_form.roles.includes(role.role);
                                      return ` <div class="flex gap-x-2 align-middle items-center">${validate_component(Checkbox, "Checkbox").$$render(
                                        $$result,
                                        {
                                          checked,
                                          id: role.id + "-" + role.role,
                                          onCheckedChange: (v) => {
                                            if (v) {
                                              $new_video_form.roles = [
                                                ...$new_video_form.roles,
                                                role.role
                                              ];
                                            } else $new_video_form.roles = $new_video_form.roles.filter(
                                              /** @type {string} */
                                              (item) => item !== role.role
                                            );
                                          }
                                        },
                                        {},
                                        {}
                                      )} ${validate_component(Label, "Label").$$render(
                                        $$result,
                                        {
                                          class: "hover:cursor-pointer",
                                          for: role.id + "-" + role.role
                                        },
                                        {},
                                        {
                                          default: () => {
                                            return `${escape(role.role)} `;
                                          }
                                        }
                                      )} </div>`;
                                    })}</div>`;
                                  }
                                })}`;
                              }
                            })}`;
                          }
                        })}`;
                      }
                    }
                  )} ${validate_component(Tabs_content, "Tabs.Content").$$render(
                    $$result,
                    {
                      value: "media",
                      class: "h-[450px] overflow-x-clip overflow-y-scroll"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(Label, "Label").$$render($$result, { for: "new-video-thumbnail" }, {}, {
                          default: () => {
                            return `Thumbnail (16:9)*`;
                          }
                        })} <input type="file" class="hidden" id="new-video-thumbnail" required accept="image/*"> <label for="new-video-thumbnail" class="hover:brightness-110 transition">${validate_component(Aspect_ratio, "AspectRatio.Root").$$render(
                          $$result,
                          {
                            ratio: 16 / 9,
                            class: "bg-muted rounded-md overflow-clip"
                          },
                          {},
                          {
                            default: () => {
                              return `${$new_video_form.thumbnail || currently_edited_video ? `<img${add_attribute(
                                "src",
                                URL.createObjectURL($new_video_form.thumbnail),
                                0
                              )} alt="New video thumbnail">` : ``}`;
                            }
                          }
                        )}</label> ${validate_component(Label, "Label").$$render($$result, { for: "new-video-preview" }, {}, {
                          default: () => {
                            return `Preview (.mp4, 16:9)`;
                          }
                        })} <input type="file" class="hidden" id="new-video-preview" accept="video/mp4"> <label for="new-video-preview" class="md:hover:brightness-110 transition">${validate_component(Aspect_ratio, "AspectRatio.Root").$$render(
                          $$result,
                          {
                            ratio: 16 / 9,
                            class: "bg-muted rounded-md overflow-clip"
                          },
                          {},
                          {
                            default: () => {
                              return `${$new_video_form.preview || currently_edited_video ? `${validate_component(Button, "Button").$$render(
                                $$result,
                                {
                                  class: "absolute top-0 left-0 m-2 opacity-25 md:hover:opacity-100 transition-opacity "
                                },
                                {},
                                {
                                  default: () => {
                                    return `${validate_component(Trash, "TrashIcon").$$render($$result, { class: "w-4 h-4" }, {}, {})}`;
                                  }
                                }
                              )}  <video class="w-full h-full object-contain"${add_attribute(
                                "src",
                                URL.createObjectURL($new_video_form.preview),
                                0
                              )} alt="New video thumbnail" controls></video>` : ``}`;
                            }
                          }
                        )}</label> ${validate_component(Label, "Label").$$render($$result, { for: "new-video-poster" }, {}, {
                          default: () => {
                            return `Poster (707:1000)`;
                          }
                        })} <input type="file" class="hidden" id="new-video-poster" accept="image/*"> <label for="new-video-poster" class="md:hover:brightness-110 transition">${validate_component(Aspect_ratio, "AspectRatio.Root").$$render(
                          $$result,
                          {
                            ratio: 707 / 1e3,
                            class: "bg-muted rounded-md overflow-clip"
                          },
                          {},
                          {
                            default: () => {
                              return `${$new_video_form.poster || currently_edited_video ? `${validate_component(Button, "Button").$$render(
                                $$result,
                                {
                                  class: "absolute top-0 left-0 m-2 opacity-25 md:hover:opacity-100 transition-opacity"
                                },
                                {},
                                {
                                  default: () => {
                                    return `${validate_component(Trash, "TrashIcon").$$render($$result, { class: "w-4 h-4" }, {}, {})}`;
                                  }
                                }
                              )}  <img class="w-full h-full object-cover"${add_attribute(
                                "src",
                                URL.createObjectURL($new_video_form.poster),
                                0
                              )} alt="New video poster">` : ``}`;
                            }
                          }
                        )}</label>`;
                      }
                    }
                  )}`;
                }
              })} ${validate_component(Dialog_footer, "Dialog.Footer").$$render($$result, {}, {}, {
                default: () => {
                  return `<div class="flex justify-between flex-row-reverse w-full">${validate_component(Button, "Button").$$render($$result, {}, {}, {
                    default: () => {
                      return `Save`;
                    }
                  })} ${``}</div>`;
                }
              })}`;
            }
          })}</form>`;
        }
      }
    )}</div> <div class="grid grid-cols-1 max-w-[450px] mx-auto md:max-w-none md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-6 w-full"><button class="bg-bjelopic-neutral-8 w-full h-full rounded-md overflow-clip text-neutral-500 hover:text-white transition-colors">${validate_component(Aspect_ratio, "AspectRatio.Root").$$render($$result, { ratio: 2.35 }, {}, {
      default: () => {
        return `<div class="w-full h-full flex justify-center items-center">${validate_component(Plus, "PlusIcon").$$render($$result, { class: "w-12 h-12" }, {}, {})}</div>`;
      }
    })}</button> ${each(videos, (video) => {
      return `<button class="text-left"><div class="flex flex-col box-content w-full rounded-md overflow-clip md:hover:scale-[101%] transition duration-500 md:hover:drop-shadow-glow hover:z-10 border border-neutral-800">${validate_component(Aspect_ratio, "AspectRatio.Root").$$render($$result, { ratio: 16 / 9 }, {}, {
        default: () => {
          return `<img${add_attribute("src", video.thumbnail_path, 0)} alt="${escape(video.title, true) + " thumbnail"}"> `;
        }
      })} <div class="px-2 py-1 md:py-2 bg-neutral-900 border-t-0"><span class="text-lg md:text-xl block w-full whitespace-nowrap overflow-hidden text-ellipsis">${escape(video.title)}</span> <div class="flex justify-between items-center align-middle"><span class="text-neutral-500">${escape(video.subject)} (${escape(new Date(video.publication_date).getFullYear())})</span> <a${add_attribute("href", video.link, 0)} target="_blank" class="mr-1">${validate_component(Eye, "EyeIcon").$$render(
        $$result,
        {
          class: "w-6 h-6 text-neutral-500 hover:text-white transition"
        },
        {},
        {}
      )}</a></div> </div></div> </button>`;
    })}</div></main>`;
  } while (!$$settled);
  $$unsubscribe_new_video_form();
  return $$rendered;
});
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Videos,
  layout: Layout
}, Symbol.toStringTag, { value: "Module" }));
var g = (t) => new Promise((o, n) => {
  let r = "";
  t.on("data", (e) => r += e), t.on("end", () => o(r)), t.on("error", (e) => n(e));
}), d = (t, o) => {
  let n = 13714, r = { "/health": async () => ({ status: "OK", timestamp: Date.now() }), "/shutdown": () => s.exit(), "/render": async (e) => t(JSON.parse(await g(e))), "/404": async () => ({ status: "NOT_FOUND", timestamp: Date.now() }) };
  createServer(async (e, a) => {
    let i = r[e.url] || r["/404"];
    try {
      a.writeHead(200, { "Content-Type": "application/json", Server: "Inertia.js SSR" }), a.write(JSON.stringify(await i(e)));
    } catch (p) {
      console.error(p);
    }
    a.end();
  }).listen(n, () => console.log("Inertia SSR server started.")), console.log(`Starting SSR server on port ${n}...`);
};
d(
  (page2) => createInertiaApp({
    page: page2,
    resolve: (name2) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Footer.svelte": __vite_glob_0_0, "./Pages/FooterInfoLinks.svelte": __vite_glob_0_1, "./Pages/FooterSocials.svelte": __vite_glob_0_2, "./Pages/Header.svelte": __vite_glob_0_3, "./Pages/Hero/Hero.svelte": __vite_glob_0_4, "./Pages/Hero/Layout.svelte": __vite_glob_0_5, "./Pages/Layout.svelte": __vite_glob_0_6, "./Pages/Link.svelte": __vite_glob_0_7, "./Pages/Subpages/Gallery.svelte": __vite_glob_0_8, "./Pages/Webtools/Dashboard.svelte": __vite_glob_0_9, "./Pages/Webtools/DashboardChart.svelte": __vite_glob_0_10, "./Pages/Webtools/Header.svelte": __vite_glob_0_11, "./Pages/Webtools/Layout.svelte": __vite_glob_0_12, "./Pages/Webtools/LayoutLinks.svelte": __vite_glob_0_13, "./Pages/Webtools/Login.svelte": __vite_glob_0_14, "./Pages/Webtools/Users.svelte": __vite_glob_0_15, "./Pages/Webtools/Videos.svelte": __vite_glob_0_16 });
      let page3 = pages[`./Pages/${name2}.svelte`];
      return { default: page3.default, layout: page3.layout || Layout$1 };
    }
  })
);
