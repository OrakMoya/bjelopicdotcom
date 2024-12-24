var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _size, _id, _ref, _loop, _props, _value, _value2, _id2, _ref2, _isActive, _isDisabled, _props2, _ref3, _disabled, _id3, _root, _itemState, _isDisabled2, _props3, _ref4, _id4, _originalStyles, _isMountAnimationPrevented, _width, _height, _forceMount, _present, _snippetProps, _props4, _id5, _ref5, _level, _item, _props5, _attrs, _sharedProps, _id6, _ref6, _root2, _disabled2, _props6, _id7, _ref7, _root3, _variant, _disabled3, _attr, _props7, _id8, _ref8, _root4, _attr2, _props8, _id9, _ref9, _root5, _level2, _props9, _id10, _ref10, _snippetProps2, _props10, _id11, _ref11, _snippetProps3, _props11, _id12, _ref12, _root6, _disabled4, _props12, _interactOutsideProp, _behaviorType, _interceptedEvents, _isResponsibleLayer, _documentObj, _enabled, _isFocusInsideDOMTree, _onFocusOutside, _isValidEventProp, _unsubClickListener, _handleFocus, _DismissibleLayerState_instances, addEventListeners_fn, _handleDismiss, _handleInteractOutside, _markInterceptedEvent, _markNonInterceptedEvent, _markResponsibleLayer, _isTargetWithinLayer, _resetState, isAnyEventIntercepted_fn, _onfocuscapture, _onblurcapture, _onEscapeProp, _behaviorType2, _enabled2, _addEventListener, _onkeydown, _id13, _onPointerDownProp, _onPointerUpProp, _enabled3, _unsubSelectionLock, _ref13, _TextSelectionLayerState_instances, addEventListeners_fn2, _pointerdown, _resetSelectionLock, _ref14, _id14, _ratio, _wrapperProps, _props13, _visibleMonths, _weekdays, _isNextButtonDisabled, _isPrevButtonDisabled, _isInvalid, _headingValue, _fullCalendarLabel, _snippetProps4, _props14, _headingValue2, _props15, _cellDate, _isDisabled3, _isUnavailable, _isDateToday, _isOutsideMonth, _isOutsideVisibleMonths, _isFocusedDate, _isSelectedDate, _labelText, _snippetProps5, _ariaDisabled, _sharedDataAttrs, _props16, _tabindex, _snippetProps6, _props17, _isDisabled4, _props18, _isDisabled5, _props19, _props20, _props21, _props22, _props23, _props24, _props25, _id15, _ref15, _type, _disabled5, _required, _name, _trueName, _trueRequired, _trueDisabled, _CheckboxRootState_instances, toggle_fn, _snippetProps7, _props26, _trueChecked, _shouldRender, _props27, _transformedStyle, _dir, _side, _sideOffset, _align, _alignOffset, _arrowPadding, _avoidCollisions, _collisionBoundary, _collisionPadding, _sticky, _hideWhenDetached, _strategy, _updatePositionStrategy, _arrowSize, _arrowWidth, _arrowHeight, _desiredPlacement, _boundary, _hasExplicitBoundaries, _detectOverflowOptions, _availableWidth, _availableHeight, _anchorWidth, _anchorHeight, _middleware, _placedSide, _placedAlign, _arrowX, _arrowY, _cannotCenterArrow, _arrowBaseSide, _wrapperProps2, _props28, _arrowStyle, _updateScheduled, _vimBindings, _CommandRootState_instances, snapshot_fn, scheduleUpdate_fn, score_fn, sort_fn, selectFirstItem_fn, filterItems_fn, getValidItems_fn, getSelectedItem_fn, scrollSelectedIntoView_fn, updateSelectedToIndex_fn, updateSelectedByItem_fn, updateSelectedByGroup_fn, last_fn, next_fn, prev_fn, _props29, _ref16, _id16, _root7, _forceMount2, _isInitialRender, _shouldRender2, _props30, _ref17, _value3, _root8, _shouldRender3, _props31, _ref18, _id17, _group, _props32, _ref19, _id18, _group2, _props33, _ref20, _id19, _root9, _value4, _autofocus, _selectedItemId, _props34, _ref21, _value5, _disabled6, _onSelectProp, _forceMount3, _group3, _trueForceMount, _shouldRender4, _isSelected, _CommandItemState_instances, onSelect_fn, select_fn, _props35, _ref22, _id20, _root10, _for, _props36, _id21, _ref23, _disabled7, _root11, _PopoverTriggerState_instances, getAriaControls_fn, _props37, _id22, _ref24, _snippetProps8, _props38, _id23, _ref25, _props39, _id24, _props40, _id25, _ref26, _root12, _isDisabled6, _props41, _root13, _id26, _ref27, _disabled8, _value6, _isActive2, _isDisabled7, _tabIndex, _ariaControls, _TabsTriggerState_instances, activate_fn, _props42, _root14, _id27, _ref28, _value7, _isActive3, _ariaLabelledBy, _props43;
import { DEV } from "esm-env";
import { router, setupProgress } from "@inertiajs/core";
import escape from "html-escape";
import cloneDeep from "lodash/cloneDeep.js";
import isEqual from "lodash/isEqual.js";
import { clsx } from "clsx";
import parse from "style-to-object";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import AutoScroll from "embla-carousel-auto-scroll";
import "chart.js/auto";
import Resumable from "resumablejs";
import { CalendarDateTime, CalendarDate, ZonedDateTime, parseZonedDateTime, parseDateTime, parseDate, toCalendar, getLocalTimeZone, getDayOfWeek, DateFormatter, startOfMonth, endOfMonth, isSameMonth, isSameDay, isToday, today } from "@internationalized/date";
import { computePosition, offset, shift, limitShift, flip, size, arrow, hide, autoUpdate } from "@floating-ui/dom";
import createServer from "@inertiajs/core/server";
const HYDRATION_START = "[";
const HYDRATION_END = "]";
const ELEMENT_IS_NAMESPACED = 1;
const ELEMENT_PRESERVE_ATTRIBUTE_CASE = 1 << 1;
const UNINITIALIZED = Symbol();
const ATTR_REGEX = /[&"<]/g;
const CONTENT_REGEX = /[&<]/g;
function escape_html(value, is_attr) {
  const str = String(value ?? "");
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped + str.substring(last);
}
const replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (value == null || !value && is_boolean || value === "" && name === "class") return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
var is_array = Array.isArray;
var object_prototype = Object.prototype;
var get_prototype_of = Object.getPrototypeOf;
const noop$1 = () => {
};
function run$1(fn) {
  return fn();
}
function run_all(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i]();
  }
}
function fallback(value, fallback2, lazy = false) {
  return value === void 0 ? lazy ? (
    /** @type {() => V} */
    fallback2()
  ) : (
    /** @type {V} */
    fallback2
  ) : value;
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function rune_outside_svelte(rune) {
  if (DEV) {
    const error = new Error(`rune_outside_svelte
The \`${rune}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files
https://svelte.dev/e/rune_outside_svelte`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/rune_outside_svelte`);
  }
}
var bold = "font-weight: bold";
var normal = "font-weight: normal";
function state_snapshot_uncloneable(properties) {
  if (DEV) {
    console.warn(`%c[svelte] state_snapshot_uncloneable
%c${properties ? `The following properties cannot be cloned with \`$state.snapshot\` — the return value contains the originals:

${properties}` : "Value cannot be cloned with `$state.snapshot` — the original value was returned"}
https://svelte.dev/e/state_snapshot_uncloneable`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/state_snapshot_uncloneable`);
  }
}
const empty = [];
function snapshot(value, skip_warning = false) {
  if (DEV && !skip_warning) {
    const paths = [];
    const copy = clone(value, /* @__PURE__ */ new Map(), "", paths);
    if (paths.length === 1 && paths[0] === "") {
      state_snapshot_uncloneable();
    } else if (paths.length > 0) {
      const slice = paths.length > 10 ? paths.slice(0, 7) : paths.slice(0, 10);
      const excess = paths.length - slice.length;
      let uncloned = slice.map((path) => `- <value>${path}`).join("\n");
      if (excess > 0) uncloned += `
- ...and ${excess} more`;
      state_snapshot_uncloneable(uncloned);
    }
    return copy;
  }
  return clone(value, /* @__PURE__ */ new Map(), "", empty);
}
function clone(value, cloned, path, paths, original = null) {
  if (typeof value === "object" && value !== null) {
    var unwrapped = cloned.get(value);
    if (unwrapped !== void 0) return unwrapped;
    if (value instanceof Map) return (
      /** @type {Snapshot<T>} */
      new Map(value)
    );
    if (value instanceof Set) return (
      /** @type {Snapshot<T>} */
      new Set(value)
    );
    if (is_array(value)) {
      var copy = (
        /** @type {Snapshot<any>} */
        Array(value.length)
      );
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var i = 0; i < value.length; i += 1) {
        var element2 = value[i];
        if (i in value) {
          copy[i] = clone(element2, cloned, DEV ? `${path}[${i}]` : path, paths);
        }
      }
      return copy;
    }
    if (get_prototype_of(value) === object_prototype) {
      copy = {};
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var key in value) {
        copy[key] = clone(value[key], cloned, DEV ? `${path}.${key}` : path, paths);
      }
      return copy;
    }
    if (value instanceof Date) {
      return (
        /** @type {Snapshot<T>} */
        structuredClone(value)
      );
    }
    if (typeof /** @type {T & { toJSON?: any } } */
    value.toJSON === "function") {
      return clone(
        /** @type {T & { toJSON(): any } } */
        value.toJSON(),
        cloned,
        DEV ? `${path}.toJSON()` : path,
        paths,
        // Associate the instance with the toJSON clone
        value
      );
    }
  }
  if (value instanceof EventTarget) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
  try {
    return (
      /** @type {Snapshot<T>} */
      structuredClone(value)
    );
  } catch (e) {
    if (DEV) {
      paths.push(path);
    }
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
}
function lifecycle_outside_component(name) {
  if (DEV) {
    const error = new Error(`lifecycle_outside_component
\`${name}(...)\` can only be used during component initialisation
https://svelte.dev/e/lifecycle_outside_component`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
  }
}
function store_invalid_shape(name) {
  if (DEV) {
    const error = new Error(`store_invalid_shape
\`${name}\` is not a store with a \`subscribe\` method
https://svelte.dev/e/store_invalid_shape`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/store_invalid_shape`);
  }
}
let active_reaction = null;
function untrack(fn) {
  const previous_reaction = active_reaction;
  try {
    active_reaction = null;
    return fn();
  } finally {
    active_reaction = previous_reaction;
  }
}
if (DEV) {
  let throw_rune_error = function(rune) {
    if (!(rune in globalThis)) {
      let value;
      Object.defineProperty(globalThis, rune, {
        configurable: true,
        // eslint-disable-next-line getter-return
        get: () => {
          if (value !== void 0) {
            return value;
          }
          rune_outside_svelte(rune);
        },
        set: (v) => {
          value = v;
        }
      });
    }
  };
  throw_rune_error("$state");
  throw_rune_error("$effect");
  throw_rune_error("$derived");
  throw_rune_error("$inspect");
  throw_rune_error("$props");
  throw_rune_error("$bindable");
}
const VOID_ELEMENT_NAMES = [
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
function is_void(name) {
  return VOID_ELEMENT_NAMES.includes(name) || name.toLowerCase() === "!doctype";
}
const DOM_BOOLEAN_ATTRIBUTES = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "hidden",
  "indeterminate",
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
  "seamless",
  "selected",
  "webkitdirectory"
];
function is_boolean_attribute(name) {
  return DOM_BOOLEAN_ATTRIBUTES.includes(name);
}
const RAW_TEXT_ELEMENTS = (
  /** @type {const} */
  ["textarea", "script", "style", "title"]
);
function is_raw_text_element(name) {
  return RAW_TEXT_ELEMENTS.includes(
    /** @type {RAW_TEXT_ELEMENTS[number]} */
    name
  );
}
function validate_store(store, name) {
  if (store != null && typeof store.subscribe !== "function") {
    store_invalid_shape(name);
  }
}
function subscribe_to_store(store, run2, invalidate) {
  if (store == null) {
    run2(void 0);
    if (invalidate) invalidate(void 0);
    return noop$1;
  }
  const unsub = untrack(
    () => store.subscribe(
      run2,
      // @ts-expect-error
      invalidate
    )
  );
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
var current_component = null;
function getContext$1(key) {
  const context_map = get_or_init_context_map("getContext");
  const result = (
    /** @type {T} */
    context_map.get(key)
  );
  return result;
}
function setContext$1(key, context) {
  get_or_init_context_map("setContext").set(key, context);
  return context;
}
function hasContext(key) {
  return get_or_init_context_map("hasContext").has(key);
}
function getAllContexts() {
  return get_or_init_context_map("getAllContexts");
}
function get_or_init_context_map(name) {
  if (current_component === null) {
    lifecycle_outside_component(name);
  }
  return current_component.c ?? (current_component.c = new Map(get_parent_context(current_component) || void 0));
}
function push(fn) {
  current_component = { p: current_component, c: null, d: null };
  if (DEV) {
    current_component.function = fn;
  }
}
function pop() {
  var component = (
    /** @type {Component} */
    current_component
  );
  var ondestroy = component.d;
  if (ondestroy) {
    on_destroy.push(...ondestroy);
  }
  current_component = component.p;
}
function get_parent_context(component_context) {
  let parent = component_context.p;
  while (parent !== null) {
    const context_map = parent.c;
    if (context_map !== null) {
      return context_map;
    }
    parent = parent.p;
  }
  return null;
}
const BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
const BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;
const EMPTY_COMMENT = `<!---->`;
function reset_elements() {
  return () => {
  };
}
const INVALID_ATTR_NAME_CHAR_REGEX = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function copy_payload({ out, css, head: head2 }) {
  return {
    out,
    css: new Set(css),
    head: {
      title: head2.title,
      out: head2.out
    }
  };
}
function assign_payload(p1, p2) {
  p1.out = p2.out;
  p1.head = p2.head;
}
function element(payload, tag, attributes_fn = noop$1, children_fn = noop$1) {
  payload.out += "<!---->";
  if (tag) {
    payload.out += `<${tag}`;
    attributes_fn();
    payload.out += `>`;
    if (!is_void(tag)) {
      children_fn();
      if (!is_raw_text_element(tag)) {
        payload.out += EMPTY_COMMENT;
      }
      payload.out += `</${tag}>`;
    }
  }
  payload.out += "<!---->";
}
let on_destroy = [];
function render(component, options = {}) {
  const payload = { out: "", css: /* @__PURE__ */ new Set(), head: { title: "", out: "" } };
  const prev_on_destroy = on_destroy;
  on_destroy = [];
  payload.out += BLOCK_OPEN;
  let reset_reset_element;
  if (DEV) {
    reset_reset_element = reset_elements();
  }
  if (options.context) {
    push();
    current_component.c = options.context;
  }
  component(payload, options.props ?? {}, {}, {});
  if (options.context) {
    pop();
  }
  if (reset_reset_element) {
    reset_reset_element();
  }
  payload.out += BLOCK_CLOSE;
  for (const cleanup of on_destroy) cleanup();
  on_destroy = prev_on_destroy;
  let head2 = payload.head.out + payload.head.title;
  for (const { hash, code } of payload.css) {
    head2 += `<style id="${hash}">${code}</style>`;
  }
  return {
    head: head2,
    html: payload.out,
    body: payload.out
  };
}
function head(payload, fn) {
  const head_payload = payload.head;
  head_payload.out += BLOCK_OPEN;
  fn(head_payload);
  head_payload.out += BLOCK_CLOSE;
}
function spread_attributes(attrs, classes, styles, flags = 0) {
  if (styles) {
    attrs.style = attrs.style ? style_object_to_string(merge_styles(
      /** @type {string} */
      attrs.style,
      styles
    )) : style_object_to_string(styles);
  }
  if (classes) {
    const classlist = attrs.class ? [attrs.class] : [];
    for (const key in classes) {
      if (classes[key]) {
        classlist.push(key);
      }
    }
    attrs.class = classlist.join(" ");
  }
  let attr_str = "";
  let name;
  const is_html = (flags & ELEMENT_IS_NAMESPACED) === 0;
  const lowercase = (flags & ELEMENT_PRESERVE_ATTRIBUTE_CASE) === 0;
  for (name in attrs) {
    if (typeof attrs[name] === "function") continue;
    if (name[0] === "$" && name[1] === "$") continue;
    if (INVALID_ATTR_NAME_CHAR_REGEX.test(name)) continue;
    var value = attrs[name];
    if (lowercase) {
      name = name.toLowerCase();
    }
    attr_str += attr(name, value, is_html && is_boolean_attribute(name));
  }
  return attr_str;
}
function spread_props(props) {
  const merged_props = {};
  let key;
  for (let i = 0; i < props.length; i++) {
    const obj = props[i];
    for (key in obj) {
      const desc = Object.getOwnPropertyDescriptor(obj, key);
      if (desc) {
        Object.defineProperty(merged_props, key, desc);
      } else {
        merged_props[key] = obj[key];
      }
    }
  }
  return merged_props;
}
function stringify(value) {
  return typeof value === "string" ? value : value == null ? "" : value + "";
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter(
    /** @param {any} key */
    (key) => style_object[key] != null && style_object[key] !== ""
  ).map(
    /** @param {any} key */
    (key) => `${key}: ${escape_html(style_object[key], true)};`
  ).join(" ");
}
function add_styles(style_object) {
  const styles = style_object_to_string(style_object);
  return styles ? ` style="${styles}"` : "";
}
function merge_styles(attribute, styles) {
  var merged = {};
  if (attribute) {
    for (var declaration of attribute.split(";")) {
      var i = declaration.indexOf(":");
      var name = declaration.slice(0, i).trim();
      var value = declaration.slice(i + 1).trim();
      if (name !== "") merged[name] = value;
    }
  }
  for (name in styles) {
    merged[name] = styles[name];
  }
  return merged;
}
function store_get(store_values, store_name, store) {
  var _a;
  if (DEV) {
    validate_store(store, store_name.slice(1));
  }
  if (store_name in store_values && store_values[store_name][0] === store) {
    return store_values[store_name][2];
  }
  (_a = store_values[store_name]) == null ? void 0 : _a[1]();
  store_values[store_name] = [store, null, void 0];
  const unsub = subscribe_to_store(
    store,
    /** @param {any} v */
    (v) => store_values[store_name][2] = v
  );
  store_values[store_name][1] = unsub;
  return store_values[store_name][2];
}
function store_set(store, value) {
  store.set(value);
  return value;
}
function store_mutate(store_values, store_name, store, expression) {
  store_set(store, store_get(store_values, store_name, store));
  return expression;
}
function unsubscribe_stores(store_values) {
  for (const store_name in store_values) {
    store_values[store_name][1]();
  }
}
function slot(payload, $$props, name, slot_props, fallback_fn) {
  var _a;
  var slot_fn = (_a = $$props.$$slots) == null ? void 0 : _a[name];
  if (slot_fn === true) {
    slot_fn = $$props[name === "default" ? "children" : name];
  }
  if (slot_fn !== void 0) {
    slot_fn(payload, slot_props);
  } else {
    fallback_fn == null ? void 0 : fallback_fn();
  }
}
function rest_props(props, rest) {
  const rest_props2 = {};
  let key;
  for (key in props) {
    if (!rest.includes(key)) {
      rest_props2[key] = props[key];
    }
  }
  return rest_props2;
}
function sanitize_props(props) {
  const { children, $$slots, ...sanitized } = props;
  return sanitized;
}
function bind_props(props_parent, props_now) {
  var _a;
  for (const key in props_now) {
    const initial_value = props_parent[key];
    const value = props_now[key];
    if (initial_value === void 0 && value !== void 0 && ((_a = Object.getOwnPropertyDescriptor(props_parent, key)) == null ? void 0 : _a.set)) {
      props_parent[key] = value;
    }
  }
}
function ensure_array_like(array_like_or_iterator) {
  if (array_like_or_iterator) {
    return array_like_or_iterator.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
  }
  return [];
}
function once(get_value) {
  let value = (
    /** @type {V} */
    UNINITIALIZED
  );
  return () => {
    if (value === UNINITIALIZED) {
      value = get_value();
    }
    return value;
  };
}
function TheBjeloPIC($$payload, $$props) {
  push();
  let { $$slots, $$events, ...rest } = $$props;
  $$payload.out += `<span${attr("class", `font-bjelopic text-white ${stringify(rest.class)}`)}>Bjelo<span class="text-bjelopic-red-1 font-bold font-sans">PIC</span></span>`;
  pop();
}
function TheBjeloPICLogo($$payload, $$props) {
  push();
  let { $$slots, $$events, ...rest } = $$props;
  $$payload.out += `<div${attr("class", rest.class)}><img src="/bjelopic_logo.png" alt="bjelopic"></div>`;
  pop();
}
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ?? (context.d = [])).push(fn);
}
async function tick() {
}
function Link($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
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
    "queryStringArrayFormat",
    "async",
    "prefetch",
    "cacheFor"
  ]);
  push();
  let asProp, elProps;
  let href = $$props["href"];
  let as = fallback($$props["as"], "a");
  let data = fallback($$props["data"], () => ({}), true);
  let method = fallback($$props["method"], "get");
  let replace = fallback($$props["replace"], false);
  let preserveScroll = fallback($$props["preserveScroll"], false);
  let preserveState = fallback($$props["preserveState"], null);
  let only = fallback($$props["only"], () => [], true);
  let except = fallback($$props["except"], () => [], true);
  let headers = fallback($$props["headers"], () => ({}), true);
  let queryStringArrayFormat = fallback($$props["queryStringArrayFormat"], "brackets");
  let async = fallback($$props["async"], false);
  let prefetch = fallback($$props["prefetch"], false);
  let cacheFor = fallback($$props["cacheFor"], 0);
  asProp = method !== "get" ? "button" : as.toLowerCase();
  elProps = { a: { href }, button: { type: "button" } }[asProp] || {};
  element(
    $$payload,
    asProp,
    () => {
      $$payload.out += `${spread_attributes({ ...$$restProps, ...elProps })}`;
    },
    () => {
      $$payload.out += `<!---->`;
      slot($$payload, $$props, "default", {}, null);
      $$payload.out += `<!---->`;
    }
  );
  bind_props($$props, {
    href,
    as,
    data,
    method,
    replace,
    preserveScroll,
    preserveState,
    only,
    except,
    headers,
    queryStringArrayFormat,
    async,
    prefetch,
    cacheFor
  });
  pop();
}
const h = (component, propsOrChildren, childrenOrKey, key = null) => {
  const hasProps = typeof propsOrChildren === "object" && propsOrChildren !== null && !Array.isArray(propsOrChildren);
  return {
    component,
    key: hasProps ? key : typeof childrenOrKey === "number" ? childrenOrKey : null,
    props: hasProps ? propsOrChildren : {},
    children: hasProps ? Array.isArray(childrenOrKey) ? childrenOrKey : childrenOrKey !== null ? [childrenOrKey] : [] : Array.isArray(propsOrChildren) ? propsOrChildren : propsOrChildren !== null ? [propsOrChildren] : []
  };
};
function Render($$payload, $$props) {
  push();
  let component = $$props["component"];
  let props = fallback($$props["props"], () => ({}), true);
  let children = fallback($$props["children"], () => [], true);
  let key = fallback($$props["key"], null);
  if (component) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    {
      if (children.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<!---->`;
        component == null ? void 0 : component($$payload, spread_props([
          props,
          {
            children: ($$payload2) => {
              const each_array = ensure_array_like(children);
              $$payload2.out += `<!--[-->`;
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let child = each_array[$$index];
                Render($$payload2, spread_props([child]));
                $$payload2.out += `<!---->`;
              }
              $$payload2.out += `<!--]-->`;
            },
            $$slots: { default: true }
          }
        ]));
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<!---->`;
        component == null ? void 0 : component($$payload, spread_props([props]));
        $$payload.out += `<!---->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { component, props, children, key });
  pop();
}
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop$1) {
  let stop = null;
  const subscribers = /* @__PURE__ */ new Set();
  function set2(new_value) {
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
  function update(fn) {
    set2(fn(
      /** @type {T} */
      value
    ));
  }
  function subscribe2(run2, invalidate = noop$1) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2, update) || noop$1;
    }
    run2(
      /** @type {T} */
      value
    );
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set: set2, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set2, update) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop$1;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set2, update);
      if (auto) {
        set2(result);
      } else {
        cleanup = typeof result === "function" ? result : noop$1;
      }
    };
    const unsubscribers = stores_array.map(
      (store, i) => subscribe_to_store(
        store,
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
function get$1(store) {
  let value;
  subscribe_to_store(store, (_) => value = _)();
  return value;
}
const { set, subscribe } = writable();
const setPage = set;
const page = { subscribe };
function App($$payload, $$props) {
  push();
  let initialComponent = $$props["initialComponent"];
  let initialPage = $$props["initialPage"];
  let resolveComponent = $$props["resolveComponent"];
  let component = initialComponent;
  let key = null;
  let page2 = initialPage;
  let renderProps = resolveRenderProps(component, page2, key);
  setPage(page2);
  const isServer = typeof window === "undefined";
  if (!isServer) {
    router.init({
      initialPage,
      resolveComponent,
      swapComponent: async (args) => {
        component = args.component;
        page2 = args.page;
        key = args.preserveState ? key : Date.now();
        renderProps = resolveRenderProps(component, page2, key);
        setPage(page2);
      }
    });
  }
  function resolveRenderProps(component2, page22, key2 = null) {
    const child = h(component2.default, page22.props, [], key2);
    const layout = component2.layout;
    return layout ? resolveLayout(layout, child, page22.props, key2) : child;
  }
  function resolveLayout(layout, child, pageProps, key2) {
    if (isLayoutFunction(layout)) {
      return layout(h, child);
    }
    if (Array.isArray(layout)) {
      return layout.slice().reverse().reduce((currentRender, layoutComponent) => h(layoutComponent, pageProps, [currentRender], key2), child);
    }
    return h(layout, pageProps, [child], key2);
  }
  function isLayoutFunction(layout) {
    return typeof layout === "function" && layout.length === 2 && typeof layout.prototype === "undefined";
  }
  Render($$payload, spread_props([renderProps]));
  bind_props($$props, {
    initialComponent,
    initialPage,
    resolveComponent
  });
  pop();
}
async function createInertiaApp({ id = "app", resolve, setup, progress = {}, page: page2 }) {
  const isServer = typeof window === "undefined";
  const el = isServer ? null : document.getElementById(id);
  const initialPage = page2 || JSON.parse((el == null ? void 0 : el.dataset.page) || "{}");
  const resolveComponent = (name) => Promise.resolve(resolve(name));
  const [initialComponent] = await Promise.all([
    resolveComponent(initialPage.component),
    router.decryptHistory().catch(() => {
    })
  ]);
  const props = { initialPage, initialComponent, resolveComponent };
  const svelteApp = setup({
    el,
    App,
    props
  });
  if (isServer) {
    const { html, head: head2, css } = svelteApp;
    return {
      body: `<div data-server-rendered="true" id="${id}" data-page="${escape(JSON.stringify(initialPage))}">${html}</div>`,
      head: [head2, css ? `<style data-vite-css>${css.code}</style>` : ""]
    };
  }
  if (progress) {
    setupProgress(progress);
  }
}
function useForm(rememberKeyOrData, maybeData) {
  const rememberKey = typeof rememberKeyOrData === "string" ? rememberKeyOrData : null;
  const inputData = typeof rememberKeyOrData === "string" ? maybeData : rememberKeyOrData;
  const data = typeof inputData === "function" ? inputData() : inputData;
  const restored = rememberKey ? router.restore(rememberKey) : null;
  let defaults = cloneDeep(data);
  let cancelToken = null;
  let recentlySuccessfulTimeoutId = null;
  let transform = (data2) => data2;
  const store = writable({
    ...restored ? restored.data : data,
    isDirty: false,
    errors: restored ? restored.errors : {},
    hasErrors: false,
    progress: null,
    wasSuccessful: false,
    recentlySuccessful: false,
    processing: false,
    setStore(keyOrData, maybeValue = void 0) {
      store.update((store2) => {
        return Object.assign(store2, typeof keyOrData === "string" ? { [keyOrData]: maybeValue } : keyOrData);
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
    defaults(fieldOrFields, maybeValue) {
      defaults = typeof fieldOrFields === "undefined" ? cloneDeep(this.data()) : Object.assign(cloneDeep(defaults), typeof fieldOrFields === "string" ? { [fieldOrFields]: maybeValue } : fieldOrFields);
      return this;
    },
    reset(...fields) {
      const clonedData = cloneDeep(defaults);
      if (fields.length === 0) {
        this.setStore(clonedData);
      } else {
        this.setStore(Object.keys(clonedData).filter((key) => fields.includes(key)).reduce((carry, key) => {
          carry[key] = clonedData[key];
          return carry;
        }, {}));
      }
      return this;
    },
    setError(fieldOrFields, maybeValue) {
      this.setStore("errors", {
        ...this.errors,
        ...typeof fieldOrFields === "string" ? { [fieldOrFields]: maybeValue } : fieldOrFields
      });
      return this;
    },
    clearErrors(...fields) {
      this.setStore("errors", Object.keys(this.errors).reduce((carry, field) => ({
        ...carry,
        ...fields.length > 0 && !fields.includes(field) ? { [field]: this.errors[field] } : {}
      }), {}));
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
          if (recentlySuccessfulTimeoutId) {
            clearTimeout(recentlySuccessfulTimeoutId);
          }
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
        onFinish: (visit) => {
          this.setStore("processing", false);
          this.setStore("progress", null);
          cancelToken = null;
          if (options.onFinish) {
            return options.onFinish(visit);
          }
        }
      };
      if (method === "delete") {
        router.delete(url, { ..._options, data: data2 });
      } else {
        router[method](url, data2, _options);
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
      cancelToken == null ? void 0 : cancelToken.cancel();
    }
  });
  store.subscribe((form) => {
    if (form.isDirty === isEqual(form.data(), defaults)) {
      form.setStore("isDirty", !form.isDirty);
    }
    const hasErrors = Object.keys(form.errors).length > 0;
    if (form.hasErrors !== hasErrors) {
      form.setStore("hasErrors", !form.hasErrors);
    }
    if (rememberKey) {
      router.remember({ data: form.data(), errors: form.errors }, rememberKey);
    }
  });
  return store;
}
function isFunction(value) {
  return typeof value === "function";
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
const BoxSymbol = Symbol("box");
const isWritableSymbol = Symbol("is-writable");
function isBox(value) {
  return isObject(value) && BoxSymbol in value;
}
function isWritableBox(value) {
  return box.isBox(value) && isWritableSymbol in value;
}
function box(initialValue) {
  let current = initialValue;
  return {
    [BoxSymbol]: true,
    [isWritableSymbol]: true,
    get current() {
      return current;
    },
    set current(v) {
      current = v;
    }
  };
}
function boxWith(getter, setter) {
  const derived2 = getter();
  if (setter) {
    return {
      [BoxSymbol]: true,
      [isWritableSymbol]: true,
      get current() {
        return derived2;
      },
      set current(v) {
        setter(v);
      }
    };
  }
  return {
    [BoxSymbol]: true,
    get current() {
      return getter();
    }
  };
}
function boxFrom(value) {
  if (box.isBox(value)) return value;
  if (isFunction(value)) return box.with(value);
  return box(value);
}
function boxFlatten(boxes) {
  return Object.entries(boxes).reduce(
    (acc, [key, b]) => {
      if (!box.isBox(b)) {
        return Object.assign(acc, { [key]: b });
      }
      if (box.isWritableBox(b)) {
        Object.defineProperty(acc, key, {
          get() {
            return b.current;
          },
          set(v) {
            b.current = v;
          }
        });
      } else {
        Object.defineProperty(acc, key, {
          get() {
            return b.current;
          }
        });
      }
      return acc;
    },
    {}
  );
}
function toReadonlyBox(b) {
  if (!box.isWritableBox(b)) return b;
  return {
    [BoxSymbol]: true,
    get current() {
      return b.current;
    }
  };
}
box.from = boxFrom;
box.with = boxWith;
box.flatten = boxFlatten;
box.readonly = toReadonlyBox;
box.isBox = isBox;
box.isWritableBox = isWritableBox;
function composeHandlers(...handlers) {
  return function(e) {
    var _a;
    for (const handler of handlers) {
      if (!handler)
        continue;
      if (e.defaultPrevented)
        return;
      if (typeof handler === "function") {
        handler.call(this, e);
      } else {
        (_a = handler.current) == null ? void 0 : _a.call(this, e);
      }
    }
  };
}
const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char))
    return void 0;
  return char !== char.toLowerCase();
}
function splitByCase(str) {
  const parts = [];
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = STR_SPLITTERS.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function pascalCase(str) {
  if (!str)
    return "";
  return splitByCase(str).map((p2) => upperFirst(p2)).join("");
}
function camelCase(str) {
  return lowerFirst(pascalCase(str || ""));
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function lowerFirst(str) {
  return str ? str[0].toLowerCase() + str.slice(1) : "";
}
function cssToStyleObj(css) {
  if (!css)
    return {};
  const styleObj = {};
  function iterator(name, value) {
    if (name.startsWith("-moz-") || name.startsWith("-webkit-") || name.startsWith("-ms-") || name.startsWith("-o-")) {
      styleObj[pascalCase(name)] = value;
      return;
    }
    if (name.startsWith("--")) {
      styleObj[name] = value;
      return;
    }
    styleObj[camelCase(name)] = value;
  }
  parse(css, iterator);
  return styleObj;
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
function createParser(matcher, replacer) {
  const regex = RegExp(matcher, "g");
  return (str) => {
    if (typeof str !== "string") {
      throw new TypeError(`expected an argument of type string, but got ${typeof str}`);
    }
    if (!str.match(regex))
      return str;
    return str.replace(regex, replacer);
  };
}
const camelToKebab = createParser(/[A-Z]/, (match) => `-${match.toLowerCase()}`);
function styleToCSS(styleObj) {
  if (!styleObj || typeof styleObj !== "object" || Array.isArray(styleObj)) {
    throw new TypeError(`expected an argument of type object, but got ${typeof styleObj}`);
  }
  return Object.keys(styleObj).map((property) => `${camelToKebab(property)}: ${styleObj[property]};`).join("\n");
}
function styleToString(style = {}) {
  return styleToCSS(style).replace("\n", " ");
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
  borderWidth: "0",
  transform: "translateX(-100%)"
};
const srOnlyStylesString = styleToString(srOnlyStyles);
function isEventHandler(key) {
  var _a;
  return key.length > 2 && key.startsWith("on") && key[2] === ((_a = key[2]) == null ? void 0 : _a.toLowerCase());
}
function mergeProps(...args) {
  const result = { ...args[0] };
  for (let i = 1; i < args.length; i++) {
    const props = args[i];
    for (const key in props) {
      const a = result[key];
      const b = props[key];
      const aIsFunction = typeof a === "function";
      const bIsFunction = typeof b === "function";
      if (aIsFunction && typeof bIsFunction && isEventHandler(key)) {
        const aHandler = a;
        const bHandler = b;
        result[key] = composeHandlers(aHandler, bHandler);
      } else if (aIsFunction && bIsFunction) {
        result[key] = executeCallbacks(a, b);
      } else if (key === "class" && typeof a === "string" && typeof b === "string") {
        result[key] = clsx(a, b);
      } else if (key === "style") {
        const aIsObject = typeof a === "object";
        const bIsObject = typeof b === "object";
        const aIsString = typeof a === "string";
        const bIsString = typeof b === "string";
        if (aIsObject && bIsObject) {
          result[key] = { ...a, ...b };
        } else if (aIsObject && bIsString) {
          const parsedStyle = cssToStyleObj(b);
          result[key] = { ...a, ...parsedStyle };
        } else if (aIsString && bIsObject) {
          const parsedStyle = cssToStyleObj(a);
          result[key] = { ...parsedStyle, ...b };
        } else if (aIsString && bIsString) {
          const parsedStyleA = cssToStyleObj(a);
          const parsedStyleB = cssToStyleObj(b);
          result[key] = { ...parsedStyleA, ...parsedStyleB };
        } else if (aIsObject) {
          result[key] = a;
        } else if (bIsObject) {
          result[key] = b;
        }
      } else {
        result[key] = b !== void 0 ? b : a;
      }
    }
  }
  if (typeof result.style === "object") {
    result.style = styleToString(result.style).replaceAll("\n", " ");
  }
  if (result.hidden !== true) {
    result.hidden = void 0;
  }
  if (result.disabled !== true) {
    result.disabled = void 0;
  }
  return result;
}
function useRefById({
  id,
  ref,
  deps = () => true,
  onRefChange = () => {
  },
  getRootNode = () => typeof document !== "undefined" ? document : void 0
}) {
  (() => deps())();
  (() => getRootNode())();
}
function afterSleep(ms, cb) {
  setTimeout(cb, ms);
}
function afterTick(fn) {
  tick().then(fn);
}
class ElementSize {
  constructor(node, options = { box: "border-box" }) {
    __privateAdd(this, _size, { width: 0, height: 0 });
    var _a, _b;
    __privateSet(this, _size, {
      width: ((_a = options.initialSize) == null ? void 0 : _a.width) ?? 0,
      height: ((_b = options.initialSize) == null ? void 0 : _b.height) ?? 0
    });
  }
  get width() {
    return __privateGet(this, _size).width;
  }
  get height() {
    return __privateGet(this, _size).height;
  }
}
_size = new WeakMap();
function getDataOpenClosed(condition) {
  return condition ? "open" : "closed";
}
function getAriaDisabled(condition) {
  return condition ? "true" : "false";
}
function getAriaReadonly(condition) {
  return condition ? "true" : "false";
}
function getAriaExpanded(condition) {
  return condition ? "true" : "false";
}
function getDataDisabled(condition) {
  return condition ? "" : void 0;
}
function getAriaRequired(condition) {
  return condition ? "true" : "false";
}
function getAriaSelected(condition) {
  return condition ? "true" : "false";
}
function getAriaChecked(checked, indeterminate) {
  if (indeterminate) {
    return "mixed";
  }
  return checked ? "true" : "false";
}
function getAriaOrientation(orientation) {
  return orientation;
}
function getAriaHidden(condition) {
  return condition ? "true" : void 0;
}
function getDataOrientation(orientation) {
  return orientation;
}
function getDataInvalid(condition) {
  return condition ? "" : void 0;
}
function getDataReadonly(condition) {
  return condition ? "" : void 0;
}
function getDataSelected(condition) {
  return condition ? "" : void 0;
}
function getDataUnavailable(condition) {
  return condition ? "" : void 0;
}
function getHidden(condition) {
  return condition ? true : void 0;
}
function getDisabled(condition) {
  return condition ? true : void 0;
}
const ARROW_DOWN = "ArrowDown";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";
const ARROW_UP = "ArrowUp";
const END = "End";
const ENTER = "Enter";
const ESCAPE = "Escape";
const HOME = "Home";
const SPACE = " ";
const TAB = "Tab";
const p = "p";
const n = "n";
const j = "j";
const k = "k";
function getElemDirection(elem) {
  const style = window.getComputedStyle(elem);
  const direction = style.getPropertyValue("direction");
  return direction;
}
function getNextKey(dir = "ltr", orientation = "horizontal") {
  return {
    horizontal: dir === "rtl" ? ARROW_LEFT : ARROW_RIGHT,
    vertical: ARROW_DOWN
  }[orientation];
}
function getPrevKey(dir = "ltr", orientation = "horizontal") {
  return {
    horizontal: dir === "rtl" ? ARROW_RIGHT : ARROW_LEFT,
    vertical: ARROW_UP
  }[orientation];
}
function getDirectionalKeys(dir = "ltr", orientation = "horizontal") {
  if (!["ltr", "rtl"].includes(dir))
    dir = "ltr";
  if (!["horizontal", "vertical"].includes(orientation))
    orientation = "horizontal";
  return {
    nextKey: getNextKey(dir, orientation),
    prevKey: getPrevKey(dir, orientation)
  };
}
const isBrowser$2 = typeof document !== "undefined";
function isHTMLElement(element2) {
  return element2 instanceof HTMLElement;
}
function isElement(element2) {
  return element2 instanceof Element;
}
function isNotNull(value) {
  return value !== null;
}
function isSelectableInput(element2) {
  return element2 instanceof HTMLInputElement && "select" in element2;
}
function isElementHidden(node, stopAt) {
  if (getComputedStyle(node).visibility === "hidden")
    return true;
  while (node) {
    if (stopAt !== void 0 && node === stopAt)
      return false;
    if (getComputedStyle(node).display === "none")
      return true;
    node = node.parentElement;
  }
  return false;
}
function useRovingFocus(props) {
  const currentTabStopId = props.currentTabStopId ? props.currentTabStopId : box(null);
  function getCandidateNodes() {
    if (!isBrowser$2) return [];
    const node = document.getElementById(props.rootNodeId.current);
    if (!node) return [];
    if (props.candidateSelector) {
      const candidates = Array.from(node.querySelectorAll(props.candidateSelector));
      return candidates;
    } else {
      const candidates = Array.from(node.querySelectorAll(`[${props.candidateAttr}]:not([data-disabled])`));
      return candidates;
    }
  }
  function focusFirstCandidate() {
    var _a;
    const items = getCandidateNodes();
    if (!items.length) return;
    (_a = items[0]) == null ? void 0 : _a.focus();
  }
  function handleKeydown(node, e, both = false) {
    var _a;
    const rootNode = document.getElementById(props.rootNodeId.current);
    if (!rootNode || !node) return;
    const items = getCandidateNodes();
    if (!items.length) return;
    const currentIndex = items.indexOf(node);
    const dir = getElemDirection(rootNode);
    const { nextKey, prevKey } = getDirectionalKeys(dir, props.orientation.current);
    const loop = props.loop.current;
    const keyToIndex = {
      [nextKey]: currentIndex + 1,
      [prevKey]: currentIndex - 1,
      [HOME]: 0,
      [END]: items.length - 1
    };
    if (both) {
      const altNextKey = nextKey === ARROW_DOWN ? ARROW_RIGHT : ARROW_DOWN;
      const altPrevKey = prevKey === ARROW_UP ? ARROW_LEFT : ARROW_UP;
      keyToIndex[altNextKey] = currentIndex + 1;
      keyToIndex[altPrevKey] = currentIndex - 1;
    }
    let itemIndex = keyToIndex[e.key];
    if (itemIndex === void 0) return;
    e.preventDefault();
    if (itemIndex < 0 && loop) {
      itemIndex = items.length - 1;
    } else if (itemIndex === items.length && loop) {
      itemIndex = 0;
    }
    const itemToFocus = items[itemIndex];
    if (!itemToFocus) return;
    itemToFocus.focus();
    currentTabStopId.current = itemToFocus.id;
    (_a = props.onCandidateFocus) == null ? void 0 : _a.call(props, itemToFocus);
    return itemToFocus;
  }
  function getTabIndex(node) {
    const items = getCandidateNodes();
    const anyActive = currentTabStopId.current !== null;
    if (node && !anyActive && items[0] === node) {
      currentTabStopId.current = node.id;
      return 0;
    } else if ((node == null ? void 0 : node.id) === currentTabStopId.current) {
      return 0;
    }
    return -1;
  }
  return {
    setCurrentTabStopId(id) {
      currentTabStopId.current = id;
    },
    getTabIndex,
    handleKeydown,
    focusFirstCandidate,
    currentTabStopId
  };
}
function setContext(key, value) {
  return setContext$1(key, value);
}
function getContext(key, fallback2) {
  const trueKey = typeof key === "symbol" ? key : key;
  const description = typeof key === "symbol" ? key.description : key;
  if (!hasContext(trueKey)) {
    if (fallback2 === void 0) {
      throw new Error(`Missing context dependency: ${description} and no fallback was provided.`);
    }
    return fallback2;
  }
  return getContext$1(key);
}
function getSymbolDescription(providerComponentName, contextName) {
  if (contextName !== void 0)
    return contextName;
  if (typeof providerComponentName === "string" && contextName === void 0) {
    return `${providerComponentName}Context`;
  } else if (Array.isArray(providerComponentName) && contextName === void 0) {
    return `${providerComponentName[0]}Context`;
  } else {
    if (contextName !== void 0)
      return contextName;
    return `${providerComponentName}Context`;
  }
}
function createContext(providerComponentName, contextName, useSymbol = true) {
  const symbolDescription = getSymbolDescription(providerComponentName, contextName);
  const symbol = Symbol.for(`bits-ui.${symbolDescription}`);
  const key = symbolDescription;
  function getCtx(fallback2) {
    const context = getContext(useSymbol ? symbol : key, fallback2);
    if (context === void 0) {
      throw new Error(`Context \`${symbolDescription}\` not found. Component must be used within ${Array.isArray(providerComponentName) ? `one of the following components: ${providerComponentName.join(", ")}` : `\`${providerComponentName}\``}`);
    }
    if (context === null)
      return context;
    return context;
  }
  function setCtx(value) {
    if (useSymbol) {
      return setContext(symbol, value);
    } else {
      return setContext(key, value);
    }
  }
  return [setCtx, getCtx];
}
const ACCORDION_ROOT_ATTR = "data-accordion-root";
const ACCORDION_TRIGGER_ATTR = "data-accordion-trigger";
const ACCORDION_CONTENT_ATTR = "data-accordion-content";
const ACCORDION_ITEM_ATTR = "data-accordion-item";
const ACCORDION_HEADER_ATTR = "data-accordion-header";
class AccordionBaseState {
  constructor(props) {
    __privateAdd(this, _id);
    __privateAdd(this, _ref);
    __publicField(this, "disabled");
    __privateAdd(this, _loop);
    __publicField(this, "orientation");
    __publicField(this, "rovingFocusGroup");
    __privateAdd(this, _props, once(() => ({
      id: __privateGet(this, _id).current,
      "data-orientation": getDataOrientation(this.orientation.current),
      "data-disabled": getDataDisabled(this.disabled.current),
      [ACCORDION_ROOT_ATTR]: ""
    })));
    __privateSet(this, _id, props.id);
    this.disabled = props.disabled;
    __privateSet(this, _ref, props.ref);
    useRefById({ id: props.id, ref: __privateGet(this, _ref) });
    this.orientation = props.orientation;
    __privateSet(this, _loop, props.loop);
    this.rovingFocusGroup = useRovingFocus({
      rootNodeId: __privateGet(this, _id),
      candidateAttr: ACCORDION_TRIGGER_ATTR,
      loop: __privateGet(this, _loop),
      orientation: this.orientation
    });
  }
  get props() {
    return __privateGet(this, _props).call(this);
  }
}
_id = new WeakMap();
_ref = new WeakMap();
_loop = new WeakMap();
_props = new WeakMap();
class AccordionSingleState extends AccordionBaseState {
  constructor(props) {
    super(props);
    __privateAdd(this, _value);
    __publicField(this, "isMulti", false);
    __privateSet(this, _value, props.value);
    this.includesItem = this.includesItem.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
  }
  includesItem(item) {
    return __privateGet(this, _value).current === item;
  }
  toggleItem(item) {
    __privateGet(this, _value).current = this.includesItem(item) ? "" : item;
  }
}
_value = new WeakMap();
class AccordionMultiState extends AccordionBaseState {
  constructor(props) {
    super(props);
    __privateAdd(this, _value2);
    __publicField(this, "isMulti", true);
    __privateSet(this, _value2, props.value);
    this.includesItem = this.includesItem.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
  }
  includesItem(item) {
    return __privateGet(this, _value2).current.includes(item);
  }
  toggleItem(item) {
    if (this.includesItem(item)) {
      __privateGet(this, _value2).current = __privateGet(this, _value2).current.filter((v) => v !== item);
    } else {
      __privateGet(this, _value2).current = [...__privateGet(this, _value2).current, item];
    }
  }
}
_value2 = new WeakMap();
class AccordionItemState {
  constructor(props) {
    __privateAdd(this, _id2);
    __privateAdd(this, _ref2);
    __publicField(this, "value");
    __publicField(this, "disabled");
    __publicField(this, "root");
    __privateAdd(this, _isActive, once(() => this.root.includesItem(this.value.current)));
    __privateAdd(this, _isDisabled, once(() => this.disabled.current || this.root.disabled.current));
    __privateAdd(this, _props2, once(() => ({
      id: __privateGet(this, _id2).current,
      "data-state": getDataOpenClosed(this.isActive),
      "data-disabled": getDataDisabled(this.isDisabled),
      "data-orientation": getDataOrientation(this.root.orientation.current),
      [ACCORDION_ITEM_ATTR]: ""
    })));
    this.value = props.value;
    this.disabled = props.disabled;
    this.root = props.rootState;
    __privateSet(this, _id2, props.id);
    __privateSet(this, _ref2, props.ref);
    this.updateValue = this.updateValue.bind(this);
    useRefById({
      id: __privateGet(this, _id2),
      ref: __privateGet(this, _ref2),
      deps: () => this.isActive
    });
  }
  get isActive() {
    return __privateGet(this, _isActive).call(this);
  }
  get isDisabled() {
    return __privateGet(this, _isDisabled).call(this);
  }
  updateValue() {
    this.root.toggleItem(this.value.current);
  }
  get props() {
    return __privateGet(this, _props2).call(this);
  }
}
_id2 = new WeakMap();
_ref2 = new WeakMap();
_isActive = new WeakMap();
_isDisabled = new WeakMap();
_props2 = new WeakMap();
class AccordionTriggerState {
  constructor(props, itemState) {
    __privateAdd(this, _ref3);
    __privateAdd(this, _disabled);
    __privateAdd(this, _id3);
    __privateAdd(this, _root);
    __privateAdd(this, _itemState);
    __privateAdd(this, _isDisabled2, once(() => __privateGet(this, _disabled).current || __privateGet(this, _itemState).disabled.current || __privateGet(this, _root).disabled.current));
    __privateAdd(this, _props3, once(() => ({
      id: __privateGet(this, _id3).current,
      disabled: __privateGet(this, _isDisabled2).call(this),
      "aria-expanded": getAriaExpanded(__privateGet(this, _itemState).isActive),
      "aria-disabled": getAriaDisabled(__privateGet(this, _isDisabled2).call(this)),
      "data-disabled": getDataDisabled(__privateGet(this, _isDisabled2).call(this)),
      "data-state": getDataOpenClosed(__privateGet(this, _itemState).isActive),
      "data-orientation": getDataOrientation(__privateGet(this, _root).orientation.current),
      [ACCORDION_TRIGGER_ATTR]: "",
      tabindex: 0,
      //
      onclick: this.onclick,
      onkeydown: this.onkeydown
    })));
    __privateSet(this, _disabled, props.disabled);
    __privateSet(this, _itemState, itemState);
    __privateSet(this, _root, itemState.root);
    __privateSet(this, _id3, props.id);
    __privateSet(this, _ref3, props.ref);
    this.onkeydown = this.onkeydown.bind(this);
    this.onclick = this.onclick.bind(this);
    useRefById({ id: props.id, ref: __privateGet(this, _ref3) });
  }
  onclick(e) {
    if (__privateGet(this, _isDisabled2).call(this)) return;
    if (e.button !== 0) return e.preventDefault();
    __privateGet(this, _itemState).updateValue();
  }
  onkeydown(e) {
    if (__privateGet(this, _isDisabled2).call(this)) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      __privateGet(this, _itemState).updateValue();
      return;
    }
    __privateGet(this, _root).rovingFocusGroup.handleKeydown(__privateGet(this, _ref3).current, e);
  }
  get props() {
    return __privateGet(this, _props3).call(this);
  }
}
_ref3 = new WeakMap();
_disabled = new WeakMap();
_id3 = new WeakMap();
_root = new WeakMap();
_itemState = new WeakMap();
_isDisabled2 = new WeakMap();
_props3 = new WeakMap();
class AccordionContentState {
  constructor(props, item) {
    __publicField(this, "item");
    __privateAdd(this, _ref4);
    __privateAdd(this, _id4);
    __privateAdd(this, _originalStyles);
    __privateAdd(this, _isMountAnimationPrevented, false);
    __privateAdd(this, _width, 0);
    __privateAdd(this, _height, 0);
    __privateAdd(this, _forceMount);
    __privateAdd(this, _present, once(() => __privateGet(this, _forceMount).current || this.item.isActive));
    __privateAdd(this, _snippetProps, once(() => ({ open: this.item.isActive })));
    __privateAdd(this, _props4, once(() => ({
      id: __privateGet(this, _id4).current,
      "data-state": getDataOpenClosed(this.item.isActive),
      "data-disabled": getDataDisabled(this.item.isDisabled),
      "data-orientation": getDataOrientation(this.item.root.orientation.current),
      [ACCORDION_CONTENT_ATTR]: "",
      style: {
        "--bits-accordion-content-height": `${__privateGet(this, _height)}px`,
        "--bits-accordion-content-width": `${__privateGet(this, _width)}px`
      }
    })));
    this.item = item;
    __privateSet(this, _forceMount, props.forceMount);
    __privateSet(this, _isMountAnimationPrevented, this.item.isActive);
    __privateSet(this, _id4, props.id);
    __privateSet(this, _ref4, props.ref);
    useRefById({ id: __privateGet(this, _id4), ref: __privateGet(this, _ref4) });
  }
  get present() {
    return __privateGet(this, _present).call(this);
  }
  get snippetProps() {
    return __privateGet(this, _snippetProps).call(this);
  }
  get props() {
    return __privateGet(this, _props4).call(this);
  }
}
_ref4 = new WeakMap();
_id4 = new WeakMap();
_originalStyles = new WeakMap();
_isMountAnimationPrevented = new WeakMap();
_width = new WeakMap();
_height = new WeakMap();
_forceMount = new WeakMap();
_present = new WeakMap();
_snippetProps = new WeakMap();
_props4 = new WeakMap();
class AccordionHeaderState {
  constructor(props, item) {
    __privateAdd(this, _id5);
    __privateAdd(this, _ref5);
    __privateAdd(this, _level);
    __privateAdd(this, _item);
    __privateAdd(this, _props5, once(() => ({
      id: __privateGet(this, _id5).current,
      role: "heading",
      "aria-level": __privateGet(this, _level).current,
      "data-heading-level": __privateGet(this, _level).current,
      "data-state": getDataOpenClosed(__privateGet(this, _item).isActive),
      "data-orientation": getDataOrientation(__privateGet(this, _item).root.orientation.current),
      [ACCORDION_HEADER_ATTR]: ""
    })));
    __privateSet(this, _level, props.level);
    __privateSet(this, _id5, props.id);
    __privateSet(this, _ref5, props.ref);
    useRefById({ id: __privateGet(this, _id5), ref: __privateGet(this, _ref5) });
    __privateSet(this, _item, item);
  }
  get props() {
    return __privateGet(this, _props5).call(this);
  }
}
_id5 = new WeakMap();
_ref5 = new WeakMap();
_level = new WeakMap();
_item = new WeakMap();
_props5 = new WeakMap();
const [
  setAccordionRootContext,
  getAccordionRootContext
] = createContext("Accordion.Root");
const [
  setAccordionItemContext,
  getAccordionItemContext
] = createContext("Accordion.Item");
function useAccordionRoot(props) {
  const { type, ...rest } = props;
  const rootState = type === "single" ? new AccordionSingleState(rest) : new AccordionMultiState(rest);
  return setAccordionRootContext(rootState);
}
function useAccordionItem(props) {
  const rootState = getAccordionRootContext();
  return setAccordionItemContext(new AccordionItemState({ ...props, rootState }));
}
function useAccordionTrigger(props) {
  const item = getAccordionItemContext();
  return new AccordionTriggerState(props, item);
}
function useAccordionContent(props) {
  const item = getAccordionItemContext();
  return new AccordionContentState(props, item);
}
function useAccordionHeader(props) {
  const item = getAccordionItemContext();
  return new AccordionHeaderState(props, item);
}
globalThis.bitsIdCounter ?? (globalThis.bitsIdCounter = { current: 0 });
function useId(prefix = "bits") {
  globalThis.bitsIdCounter.current++;
  return `${prefix}-${globalThis.bitsIdCounter.current}`;
}
function noop() {
}
function Accordion($$payload, $$props) {
  push();
  let {
    disabled = false,
    children,
    child,
    type,
    value = void 0,
    ref = null,
    id = useId(),
    onValueChange = noop,
    loop = true,
    orientation = "vertical",
    controlledValue = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  value === void 0 && (value = type === "single" ? "" : []);
  const rootState = useAccordionRoot({
    type,
    value: box.with(() => value, (v) => {
      if (controlledValue) {
        onValueChange(v);
      } else {
        value = v;
        onValueChange(v);
      }
    }),
    id: box.with(() => id),
    disabled: box.with(() => disabled),
    loop: box.with(() => loop),
    orientation: box.with(() => orientation),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { value, ref });
  pop();
}
function Accordion_item$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    disabled = false,
    value = useId(),
    children,
    child,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const itemState = useAccordionItem({
    value: box.with(() => value),
    disabled: box.with(() => disabled),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, itemState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Accordion_header($$payload, $$props) {
  push();
  let {
    id = useId(),
    level = 2,
    children,
    child,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const headerState = useAccordionHeader({
    id: box.with(() => id),
    level: box.with(() => level),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, headerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Accordion_trigger$1($$payload, $$props) {
  push();
  let {
    disabled = false,
    ref = null,
    id = useId(),
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = useAccordionTrigger({
    disabled: box.with(() => disabled),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, triggerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ type: "button", ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function useStateMachine(initialState, machine) {
  const state = box(initialState);
  function reducer(event) {
    const nextState = machine[state.current][event];
    return nextState ?? state.current;
  }
  const dispatch = (event) => {
    state.current = reducer(event);
  };
  return { state, dispatch };
}
function usePresence(present, id) {
  const initialState = present.current ? "mounted" : "unmounted";
  const { state, dispatch } = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
    unmounted: { MOUNT: "mounted" }
  });
  const isPresentDerived = ["mounted", "unmountSuspended"].includes(state.current);
  return {
    get current() {
      return isPresentDerived;
    }
  };
}
function Presence_layer($$payload, $$props) {
  push();
  let { present, forceMount, presence, id } = $$props;
  const isPresent = usePresence(box.with(() => present), box.with(() => id));
  if (forceMount || present || isPresent.current) {
    $$payload.out += "<!--[-->";
    presence == null ? void 0 : presence($$payload, { present: isPresent });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Accordion_content$1($$payload, $$props) {
  push();
  let {
    child,
    ref = null,
    id = useId(),
    forceMount = false,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useAccordionContent({
    forceMount: box.with(() => forceMount),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  {
    let presence = function($$payload2, { present }) {
      const mergedProps = mergeProps(restProps, contentState.props, {
        hidden: forceMount ? void 0 : !present.current
      });
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, {
          props: mergedProps,
          ...contentState.snippetProps
        });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div${spread_attributes({ ...mergedProps })}>`;
        children == null ? void 0 : children($$payload2);
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]-->`;
    };
    Presence_layer($$payload, {
      forceMount: true,
      present: contentState.present,
      id,
      presence,
      $$slots: { presence: true }
    });
  }
  bind_props($$props, { ref });
  pop();
}
function createAttrs(variant) {
  return {
    content: `data-${variant}-content`,
    trigger: `data-${variant}-trigger`,
    overlay: `data-${variant}-overlay`,
    title: `data-${variant}-title`,
    description: `data-${variant}-description`,
    close: `data-${variant}-close`,
    cancel: `data-${variant}-cancel`,
    action: `data-${variant}-action`
  };
}
class DialogRootState {
  constructor(props) {
    __publicField(this, "open");
    __publicField(this, "variant");
    __publicField(this, "triggerNode", null);
    __publicField(this, "titleNode", null);
    __publicField(this, "contentNode", null);
    __publicField(this, "descriptionNode", null);
    __publicField(this, "contentId");
    __publicField(this, "titleId");
    __publicField(this, "triggerId");
    __publicField(this, "descriptionId");
    __publicField(this, "cancelNode", null);
    __privateAdd(this, _attrs, once(() => createAttrs(this.variant.current)));
    __privateAdd(this, _sharedProps, once(() => ({
      "data-state": getDataOpenClosed(this.open.current)
    })));
    this.open = props.open;
    this.variant = props.variant;
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  get attrs() {
    return __privateGet(this, _attrs).call(this);
  }
  handleOpen() {
    if (this.open.current) return;
    this.open.current = true;
  }
  handleClose() {
    if (!this.open.current) return;
    this.open.current = false;
  }
  get sharedProps() {
    return __privateGet(this, _sharedProps).call(this);
  }
}
_attrs = new WeakMap();
_sharedProps = new WeakMap();
class DialogTriggerState {
  constructor(props, root) {
    __privateAdd(this, _id6);
    __privateAdd(this, _ref6);
    __privateAdd(this, _root2);
    __privateAdd(this, _disabled2);
    __publicField(this, "onclick", (e) => {
      if (__privateGet(this, _disabled2).current) return;
      if (e.button > 0) return;
      __privateGet(this, _root2).handleOpen();
    });
    __publicField(this, "onpointerdown", (e) => {
      if (__privateGet(this, _disabled2).current) return;
      if (e.button > 0) return;
      e.preventDefault();
    });
    __publicField(this, "onkeydown", (e) => {
      if (__privateGet(this, _disabled2).current) return;
      if (e.key === SPACE || e.key === ENTER) {
        e.preventDefault();
        __privateGet(this, _root2).handleOpen();
      }
    });
    __privateAdd(this, _props6, once(() => ({
      id: __privateGet(this, _id6).current,
      "aria-haspopup": "dialog",
      "aria-expanded": getAriaExpanded(__privateGet(this, _root2).open.current),
      "aria-controls": __privateGet(this, _root2).contentId,
      [__privateGet(this, _root2).attrs.trigger]: "",
      onpointerdown: this.onpointerdown,
      onkeydown: this.onkeydown,
      onclick: this.onclick,
      ...__privateGet(this, _root2).sharedProps
    })));
    __privateSet(this, _id6, props.id);
    __privateSet(this, _root2, root);
    __privateSet(this, _ref6, props.ref);
    __privateSet(this, _disabled2, props.disabled);
    this.onclick = this.onclick.bind(this);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    useRefById({
      id: __privateGet(this, _id6),
      ref: __privateGet(this, _ref6),
      onRefChange: (node) => {
        __privateGet(this, _root2).triggerNode = node;
        __privateGet(this, _root2).triggerId = node == null ? void 0 : node.id;
      }
    });
  }
  get props() {
    return __privateGet(this, _props6).call(this);
  }
}
_id6 = new WeakMap();
_ref6 = new WeakMap();
_root2 = new WeakMap();
_disabled2 = new WeakMap();
_props6 = new WeakMap();
class DialogCloseState {
  constructor(props, root) {
    __privateAdd(this, _id7);
    __privateAdd(this, _ref7);
    __privateAdd(this, _root3);
    __privateAdd(this, _variant);
    __privateAdd(this, _disabled3);
    __privateAdd(this, _attr, once(() => __privateGet(this, _root3).attrs[__privateGet(this, _variant).current]));
    __privateAdd(this, _props7, once(() => ({
      id: __privateGet(this, _id7).current,
      [__privateGet(this, _attr).call(this)]: "",
      onpointerdown: this.onpointerdown,
      onclick: this.onclick,
      onkeydown: this.onkeydown,
      ...__privateGet(this, _root3).sharedProps
    })));
    __privateSet(this, _root3, root);
    __privateSet(this, _ref7, props.ref);
    __privateSet(this, _id7, props.id);
    __privateSet(this, _variant, props.variant);
    __privateSet(this, _disabled3, props.disabled);
    this.onclick = this.onclick.bind(this);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    useRefById({
      id: __privateGet(this, _id7),
      ref: __privateGet(this, _ref7),
      deps: () => __privateGet(this, _root3).open.current
    });
  }
  onclick(e) {
    if (__privateGet(this, _disabled3).current) return;
    if (e.button > 0) return;
    __privateGet(this, _root3).handleClose();
  }
  onpointerdown(e) {
    if (__privateGet(this, _disabled3).current) return;
    if (e.button > 0) return;
    e.preventDefault();
    __privateGet(this, _root3).handleClose();
  }
  onkeydown(e) {
    if (__privateGet(this, _disabled3).current) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      __privateGet(this, _root3).handleClose();
    }
  }
  get props() {
    return __privateGet(this, _props7).call(this);
  }
}
_id7 = new WeakMap();
_ref7 = new WeakMap();
_root3 = new WeakMap();
_variant = new WeakMap();
_disabled3 = new WeakMap();
_attr = new WeakMap();
_props7 = new WeakMap();
class DialogActionState {
  constructor(props, root) {
    __privateAdd(this, _id8);
    __privateAdd(this, _ref8);
    __privateAdd(this, _root4);
    __privateAdd(this, _attr2, once(() => __privateGet(this, _root4).attrs.action));
    __privateAdd(this, _props8, once(() => ({
      id: __privateGet(this, _id8).current,
      [__privateGet(this, _attr2).call(this)]: "",
      ...__privateGet(this, _root4).sharedProps
    })));
    __privateSet(this, _id8, props.id);
    __privateSet(this, _ref8, props.ref);
    __privateSet(this, _root4, root);
    useRefById({ id: __privateGet(this, _id8), ref: __privateGet(this, _ref8) });
  }
  get props() {
    return __privateGet(this, _props8).call(this);
  }
}
_id8 = new WeakMap();
_ref8 = new WeakMap();
_root4 = new WeakMap();
_attr2 = new WeakMap();
_props8 = new WeakMap();
class DialogTitleState {
  constructor(props, root) {
    __privateAdd(this, _id9);
    __privateAdd(this, _ref9);
    __privateAdd(this, _root5);
    __privateAdd(this, _level2);
    __privateAdd(this, _props9, once(() => ({
      id: __privateGet(this, _id9).current,
      role: "heading",
      "aria-level": __privateGet(this, _level2).current,
      [__privateGet(this, _root5).attrs.title]: "",
      ...__privateGet(this, _root5).sharedProps
    })));
    __privateSet(this, _id9, props.id);
    __privateSet(this, _root5, root);
    __privateSet(this, _ref9, props.ref);
    __privateSet(this, _level2, props.level);
    useRefById({
      id: __privateGet(this, _id9),
      ref: __privateGet(this, _ref9),
      onRefChange: (node) => {
        __privateGet(this, _root5).titleNode = node;
        __privateGet(this, _root5).titleId = node == null ? void 0 : node.id;
      },
      deps: () => __privateGet(this, _root5).open.current
    });
  }
  get props() {
    return __privateGet(this, _props9).call(this);
  }
}
_id9 = new WeakMap();
_ref9 = new WeakMap();
_root5 = new WeakMap();
_level2 = new WeakMap();
_props9 = new WeakMap();
class DialogContentState {
  constructor(props, root) {
    __privateAdd(this, _id10);
    __privateAdd(this, _ref10);
    __publicField(this, "root");
    __privateAdd(this, _snippetProps2, once(() => ({ open: this.root.open.current })));
    __privateAdd(this, _props10, once(() => ({
      id: __privateGet(this, _id10).current,
      role: this.root.variant.current === "alert-dialog" ? "alertdialog" : "dialog",
      "aria-describedby": this.root.descriptionId,
      "aria-labelledby": this.root.titleId,
      [this.root.attrs.content]: "",
      style: { pointerEvents: "auto" },
      ...this.root.sharedProps
    })));
    __privateSet(this, _id10, props.id);
    this.root = root;
    __privateSet(this, _ref10, props.ref);
    useRefById({
      id: __privateGet(this, _id10),
      ref: __privateGet(this, _ref10),
      deps: () => this.root.open.current,
      onRefChange: (node) => {
        this.root.contentNode = node;
        this.root.contentId = node == null ? void 0 : node.id;
      }
    });
  }
  get snippetProps() {
    return __privateGet(this, _snippetProps2).call(this);
  }
  get props() {
    return __privateGet(this, _props10).call(this);
  }
}
_id10 = new WeakMap();
_ref10 = new WeakMap();
_snippetProps2 = new WeakMap();
_props10 = new WeakMap();
class DialogOverlayState {
  constructor(props, root) {
    __privateAdd(this, _id11);
    __privateAdd(this, _ref11);
    __publicField(this, "root");
    __privateAdd(this, _snippetProps3, once(() => ({ open: this.root.open.current })));
    __privateAdd(this, _props11, once(() => ({
      id: __privateGet(this, _id11).current,
      [this.root.attrs.overlay]: "",
      style: { pointerEvents: "auto" },
      ...this.root.sharedProps
    })));
    __privateSet(this, _id11, props.id);
    __privateSet(this, _ref11, props.ref);
    this.root = root;
    useRefById({
      id: __privateGet(this, _id11),
      ref: __privateGet(this, _ref11),
      deps: () => this.root.open.current
    });
  }
  get snippetProps() {
    return __privateGet(this, _snippetProps3).call(this);
  }
  get props() {
    return __privateGet(this, _props11).call(this);
  }
}
_id11 = new WeakMap();
_ref11 = new WeakMap();
_snippetProps3 = new WeakMap();
_props11 = new WeakMap();
class AlertDialogCancelState {
  constructor(props, root) {
    __privateAdd(this, _id12);
    __privateAdd(this, _ref12);
    __privateAdd(this, _root6);
    __privateAdd(this, _disabled4);
    __privateAdd(this, _props12, once(() => ({
      id: __privateGet(this, _id12).current,
      [__privateGet(this, _root6).attrs.cancel]: "",
      onpointerdown: this.onpointerdown,
      onclick: this.onclick,
      onkeydown: this.onkeydown,
      ...__privateGet(this, _root6).sharedProps
    })));
    __privateSet(this, _id12, props.id);
    __privateSet(this, _ref12, props.ref);
    __privateSet(this, _root6, root);
    __privateSet(this, _disabled4, props.disabled);
    this.onclick = this.onclick.bind(this);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    useRefById({
      id: __privateGet(this, _id12),
      ref: __privateGet(this, _ref12),
      deps: () => __privateGet(this, _root6).open.current,
      onRefChange: (node) => {
        __privateGet(this, _root6).cancelNode = node;
      }
    });
  }
  onclick(e) {
    if (__privateGet(this, _disabled4).current) return;
    if (e.button > 0) return;
    __privateGet(this, _root6).handleClose();
  }
  onpointerdown(e) {
    if (__privateGet(this, _disabled4).current) return;
    if (e.pointerType === "touch") return e.preventDefault();
    if (e.button > 0) return;
    e.preventDefault();
    __privateGet(this, _root6).handleClose();
  }
  onkeydown(e) {
    if (__privateGet(this, _disabled4).current) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      __privateGet(this, _root6).handleClose();
    }
  }
  get props() {
    return __privateGet(this, _props12).call(this);
  }
}
_id12 = new WeakMap();
_ref12 = new WeakMap();
_root6 = new WeakMap();
_disabled4 = new WeakMap();
_props12 = new WeakMap();
const [setDialogRootContext, getDialogRootContext] = createContext("Dialog.Root");
function useDialogRoot(props) {
  return setDialogRootContext(new DialogRootState(props));
}
function useDialogTrigger(props) {
  const root = getDialogRootContext();
  return new DialogTriggerState(props, root);
}
function useDialogTitle(props) {
  return new DialogTitleState(props, getDialogRootContext());
}
function useDialogContent(props) {
  return new DialogContentState(props, getDialogRootContext());
}
function useDialogOverlay(props) {
  return new DialogOverlayState(props, getDialogRootContext());
}
function useDialogClose(props) {
  return new DialogCloseState(props, getDialogRootContext());
}
function useAlertDialogCancel(props) {
  return new AlertDialogCancelState(props, getDialogRootContext());
}
function useAlertDialogAction(props) {
  return new DialogActionState(props, getDialogRootContext());
}
function Alert_dialog($$payload, $$props) {
  push();
  let {
    open = false,
    onOpenChange = noop,
    controlledOpen = false,
    children
  } = $$props;
  useDialogRoot({
    variant: box.with(() => "alert-dialog"),
    open: box.with(() => open, (v) => {
      if (controlledOpen) {
        onOpenChange(v);
      } else {
        open = v;
        onOpenChange(v);
      }
    })
  });
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { open });
  pop();
}
function Dialog_title$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    child,
    children,
    level = 2,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const titleState = useDialogTitle({
    id: box.with(() => id),
    level: box.with(() => level),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, titleState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_action$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId(),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const actionState = useAlertDialogAction({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, actionState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_cancel$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    children,
    child,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const cancelState = useAlertDialogCancel({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, cancelState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Portal$1($$payload, $$props) {
  push();
  let { to = "body", children, disabled } = $$props;
  getAllContexts();
  getTarget();
  function getTarget() {
    if (!isBrowser$2 || disabled) return null;
    let localTarget = null;
    if (typeof to === "string") {
      localTarget = document.querySelector(to);
      if (localTarget === null) {
        if (DEV) {
          throw new Error(`Target element "${to}" not found.`);
        }
      }
    } else if (to instanceof HTMLElement || to instanceof DocumentFragment) {
      localTarget = to;
    } else {
      if (DEV) {
        throw new TypeError(`Unknown portal target type: ${to === null ? "null" : typeof to}. Allowed types: string (query selector), HTMLElement, or DocumentFragment.`);
      }
    }
    return localTarget;
  }
  if (disabled) {
    $$payload.out += "<!--[-->";
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function addEventListener$1(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function debounce(fn, wait = 500) {
  let timeout = null;
  const debounced = (...args) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, wait);
  };
  debounced.destroy = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  return debounced;
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return (el == null ? void 0 : el.ownerDocument) ?? document;
}
globalThis.bitsDismissableLayers ?? (globalThis.bitsDismissableLayers = /* @__PURE__ */ new Map());
class DismissibleLayerState {
  constructor(props) {
    __privateAdd(this, _DismissibleLayerState_instances);
    __privateAdd(this, _interactOutsideProp);
    __privateAdd(this, _behaviorType);
    __privateAdd(this, _interceptedEvents, { pointerdown: false });
    __privateAdd(this, _isResponsibleLayer, false);
    __publicField(this, "node", box(null));
    __privateAdd(this, _documentObj);
    __privateAdd(this, _enabled);
    __privateAdd(this, _isFocusInsideDOMTree, false);
    __privateAdd(this, _onFocusOutside);
    __publicField(this, "currNode", null);
    __privateAdd(this, _isValidEventProp);
    __privateAdd(this, _unsubClickListener, noop);
    __privateAdd(this, _handleFocus, (event) => {
      if (event.defaultPrevented) return;
      if (!this.currNode) return;
      afterTick(() => {
        var _a, _b;
        if (!this.currNode || __privateGet(this, _isTargetWithinLayer).call(this, event.target)) return;
        if (event.target && !__privateGet(this, _isFocusInsideDOMTree)) {
          (_b = (_a = __privateGet(this, _onFocusOutside)).current) == null ? void 0 : _b.call(_a, event);
        }
      });
    });
    __privateAdd(this, _handleDismiss, (e) => {
      let event = e;
      if (event.defaultPrevented) {
        event = createWrappedEvent(e);
      }
      __privateGet(this, _interactOutsideProp).current(e);
    });
    __privateAdd(this, _handleInteractOutside, debounce(
      (e) => {
        if (!this.currNode) {
          __privateGet(this, _unsubClickListener).call(this);
          return;
        }
        const isEventValid = __privateGet(this, _isValidEventProp).current(e, this.currNode) || isValidEvent(e, this.currNode);
        if (!__privateGet(this, _isResponsibleLayer) || __privateMethod(this, _DismissibleLayerState_instances, isAnyEventIntercepted_fn).call(this) || !isEventValid) {
          __privateGet(this, _unsubClickListener).call(this);
          return;
        }
        let event = e;
        if (event.defaultPrevented) {
          event = createWrappedEvent(event);
        }
        if (__privateGet(this, _behaviorType).current !== "close" && __privateGet(this, _behaviorType).current !== "defer-otherwise-close") {
          __privateGet(this, _unsubClickListener).call(this);
          return;
        }
        if (e.pointerType === "touch") {
          __privateGet(this, _unsubClickListener).call(this);
          __privateSet(this, _unsubClickListener, addEventListener$1(__privateGet(this, _documentObj), "click", __privateGet(this, _handleDismiss), { once: true }));
        } else {
          __privateGet(this, _interactOutsideProp).current(event);
        }
      },
      10
    ));
    __privateAdd(this, _markInterceptedEvent, (e) => {
      __privateGet(this, _interceptedEvents)[e.type] = true;
    });
    __privateAdd(this, _markNonInterceptedEvent, (e) => {
      __privateGet(this, _interceptedEvents)[e.type] = false;
    });
    __privateAdd(this, _markResponsibleLayer, () => {
      if (!this.node.current) return;
      __privateSet(this, _isResponsibleLayer, isResponsibleLayer(this.node.current));
    });
    __privateAdd(this, _isTargetWithinLayer, (target) => {
      if (!this.node.current) return false;
      return isOrContainsTarget(this.node.current, target);
    });
    __privateAdd(this, _resetState, debounce(
      () => {
        for (const eventType in __privateGet(this, _interceptedEvents)) {
          __privateGet(this, _interceptedEvents)[eventType] = false;
        }
        __privateSet(this, _isResponsibleLayer, false);
      },
      20
    ));
    __privateAdd(this, _onfocuscapture, () => {
      __privateSet(this, _isFocusInsideDOMTree, true);
    });
    __privateAdd(this, _onblurcapture, () => {
      __privateSet(this, _isFocusInsideDOMTree, false);
    });
    __publicField(this, "props", {
      onfocuscapture: __privateGet(this, _onfocuscapture),
      onblurcapture: __privateGet(this, _onblurcapture)
    });
    __privateSet(this, _enabled, props.enabled);
    __privateSet(this, _isValidEventProp, props.isValidEvent);
    useRefById({
      id: props.id,
      ref: this.node,
      deps: () => __privateGet(this, _enabled).current,
      onRefChange: (node) => {
        this.currNode = node;
      }
    });
    __privateSet(this, _behaviorType, props.interactOutsideBehavior);
    __privateSet(this, _interactOutsideProp, props.onInteractOutside);
    __privateSet(this, _onFocusOutside, props.onFocusOutside);
  }
}
_interactOutsideProp = new WeakMap();
_behaviorType = new WeakMap();
_interceptedEvents = new WeakMap();
_isResponsibleLayer = new WeakMap();
_documentObj = new WeakMap();
_enabled = new WeakMap();
_isFocusInsideDOMTree = new WeakMap();
_onFocusOutside = new WeakMap();
_isValidEventProp = new WeakMap();
_unsubClickListener = new WeakMap();
_handleFocus = new WeakMap();
_DismissibleLayerState_instances = new WeakSet();
addEventListeners_fn = function() {
  return executeCallbacks(
    /**
    * CAPTURE INTERACTION START
    * mark interaction-start event as intercepted.
    * mark responsible layer during interaction start
    * to avoid checking if is responsible layer during interaction end
    * when a new floating element may have been opened.
    */
    addEventListener$1(__privateGet(this, _documentObj), "pointerdown", executeCallbacks(__privateGet(this, _markInterceptedEvent), __privateGet(this, _markResponsibleLayer)), true),
    /**
    * BUBBLE INTERACTION START
    * Mark interaction-start event as non-intercepted. Debounce `onInteractOutsideStart`
    * to avoid prematurely checking if other events were intercepted.
    */
    addEventListener$1(__privateGet(this, _documentObj), "pointerdown", executeCallbacks(__privateGet(this, _markNonInterceptedEvent), __privateGet(this, _handleInteractOutside))),
    /**
    * HANDLE FOCUS OUTSIDE
    */
    addEventListener$1(__privateGet(this, _documentObj), "focusin", __privateGet(this, _handleFocus))
  );
};
_handleDismiss = new WeakMap();
_handleInteractOutside = new WeakMap();
_markInterceptedEvent = new WeakMap();
_markNonInterceptedEvent = new WeakMap();
_markResponsibleLayer = new WeakMap();
_isTargetWithinLayer = new WeakMap();
_resetState = new WeakMap();
isAnyEventIntercepted_fn = function() {
  const i = Object.values(__privateGet(this, _interceptedEvents)).some(Boolean);
  return i;
};
_onfocuscapture = new WeakMap();
_onblurcapture = new WeakMap();
function useDismissibleLayer(props) {
  return new DismissibleLayerState(props);
}
function getTopMostLayer(layersArr) {
  return layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
}
function isResponsibleLayer(node) {
  const layersArr = [...globalThis.bitsDismissableLayers];
  const topMostLayer = getTopMostLayer(layersArr);
  if (topMostLayer) return topMostLayer[0].node.current === node;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode.node.current === node;
}
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0) return false;
  const target = e.target;
  if (!isElement(target)) return false;
  const ownerDocument = getOwnerDocument(target);
  const isValid = ownerDocument.documentElement.contains(target) && !isOrContainsTarget(node, target);
  return isValid;
}
function createWrappedEvent(e) {
  const capturedCurrentTarget = e.currentTarget;
  const capturedTarget = e.target;
  let newEvent;
  if (e instanceof PointerEvent) {
    newEvent = new PointerEvent(e.type, e);
  } else {
    newEvent = new PointerEvent("pointerdown", e);
  }
  let isPrevented = false;
  const wrappedEvent = new Proxy(newEvent, {
    get: (target, prop) => {
      if (prop === "currentTarget") {
        return capturedCurrentTarget;
      }
      if (prop === "target") {
        return capturedTarget;
      }
      if (prop === "preventDefault") {
        return () => {
          isPrevented = true;
          if (typeof target.preventDefault === "function") {
            target.preventDefault();
          }
        };
      }
      if (prop === "defaultPrevented") {
        return isPrevented;
      }
      if (prop in target) {
        return target[prop];
      }
      return e[prop];
    }
  });
  return wrappedEvent;
}
function Dismissible_layer($$payload, $$props) {
  push();
  let {
    interactOutsideBehavior = "close",
    onInteractOutside = noop,
    onFocusOutside = noop,
    id,
    children,
    enabled,
    isValidEvent: isValidEvent2 = () => false
  } = $$props;
  const dismissibleLayerState = useDismissibleLayer({
    id: box.with(() => id),
    interactOutsideBehavior: box.with(() => interactOutsideBehavior),
    onInteractOutside: box.with(() => onInteractOutside),
    enabled: box.with(() => enabled),
    onFocusOutside: box.with(() => onFocusOutside),
    isValidEvent: box.with(() => isValidEvent2)
  });
  children == null ? void 0 : children($$payload, { props: dismissibleLayerState.props });
  $$payload.out += `<!---->`;
  pop();
}
globalThis.bitsEscapeLayers ?? (globalThis.bitsEscapeLayers = /* @__PURE__ */ new Map());
class EscapeLayerState {
  constructor(props) {
    __privateAdd(this, _onEscapeProp);
    __privateAdd(this, _behaviorType2);
    __privateAdd(this, _enabled2);
    __privateAdd(this, _addEventListener, () => {
      return addEventListener$1(document, "keydown", __privateGet(this, _onkeydown), { passive: false });
    });
    __privateAdd(this, _onkeydown, (e) => {
      if (e.key !== ESCAPE || !isResponsibleEscapeLayer(this)) return;
      const clonedEvent = new KeyboardEvent(e.type, e);
      e.preventDefault();
      const behaviorType = __privateGet(this, _behaviorType2).current;
      if (behaviorType !== "close" && behaviorType !== "defer-otherwise-close") return;
      __privateGet(this, _onEscapeProp).current(clonedEvent);
    });
    __privateSet(this, _behaviorType2, props.escapeKeydownBehavior);
    __privateSet(this, _onEscapeProp, props.onEscapeKeydown);
    __privateSet(this, _enabled2, props.enabled);
  }
}
_onEscapeProp = new WeakMap();
_behaviorType2 = new WeakMap();
_enabled2 = new WeakMap();
_addEventListener = new WeakMap();
_onkeydown = new WeakMap();
function useEscapeLayer(props) {
  return new EscapeLayerState(props);
}
function isResponsibleEscapeLayer(instance) {
  const layersArr = [...globalThis.bitsEscapeLayers];
  const topMostLayer = layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
  if (topMostLayer) return topMostLayer[0] === instance;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode === instance;
}
function Escape_layer($$payload, $$props) {
  push();
  let {
    escapeKeydownBehavior = "close",
    onEscapeKeydown = noop,
    children,
    enabled
  } = $$props;
  useEscapeLayer({
    escapeKeydownBehavior: box.with(() => escapeKeydownBehavior),
    onEscapeKeydown: box.with(() => onEscapeKeydown),
    enabled: box.with(() => enabled)
  });
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function createFocusScopeAPI() {
  let paused = false;
  return {
    id: useId(),
    get paused() {
      return paused;
    },
    pause() {
      paused = true;
    },
    resume() {
      paused = false;
    }
  };
}
function focus(element2, { select = false } = {}) {
  if (!(element2 && element2.focus))
    return;
  const previouslyFocusedElement = document.activeElement;
  element2.focus({ preventScroll: true });
  if (element2 !== previouslyFocusedElement && isSelectableInput(element2) && select) {
    element2.select();
  }
}
function findVisible(elements, container) {
  for (const element2 of elements) {
    if (!isElementHidden(element2, container))
      return element2;
  }
}
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    // eslint-disable-next-line ts/no-explicit-any
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last];
}
function useFocusScope({
  id,
  loop,
  enabled,
  onOpenAutoFocus,
  onCloseAutoFocus,
  forceMount
}) {
  const focusScope = createFocusScopeAPI();
  const ref = box(null);
  useRefById({ id, ref, deps: () => enabled.current });
  function handleKeydown(e) {
    if (!enabled.current) return;
    if (!loop.current && !enabled.current) return;
    if (focusScope.paused) return;
    const isTabKey = e.key === TAB && !e.ctrlKey && !e.altKey && !e.metaKey;
    const focusedElement = document.activeElement;
    if (!(isTabKey && focusedElement)) return;
    const container = ref.current;
    if (!container) return;
    const [first, last] = getTabbableEdges(container);
    const hasTabbableElementsInside = first && last;
    if (!hasTabbableElementsInside) {
      if (focusedElement === container) {
        e.preventDefault();
      }
    } else {
      if (!e.shiftKey && focusedElement === last) {
        e.preventDefault();
        if (loop.current) focus(first, { select: true });
      } else if (e.shiftKey && focusedElement === first) {
        e.preventDefault();
        if (loop.current) focus(last, { select: true });
      }
    }
  }
  const props = (() => ({
    id: id.current,
    tabindex: -1,
    onkeydown: handleKeydown
  }))();
  return {
    get props() {
      return props;
    }
  };
}
function Focus_scope($$payload, $$props) {
  push();
  let {
    id,
    trapFocus = false,
    loop = false,
    onCloseAutoFocus = noop,
    onOpenAutoFocus = noop,
    focusScope,
    forceMount = false
  } = $$props;
  const focusScopeState = useFocusScope({
    enabled: box.with(() => trapFocus),
    loop: box.with(() => loop),
    onCloseAutoFocus: box.with(() => onCloseAutoFocus),
    onOpenAutoFocus: box.with(() => onOpenAutoFocus),
    id: box.with(() => id),
    forceMount: box.with(() => forceMount)
  });
  focusScope == null ? void 0 : focusScope($$payload, { props: focusScopeState.props });
  $$payload.out += `<!---->`;
  pop();
}
globalThis.bitsTextSelectionLayers ?? (globalThis.bitsTextSelectionLayers = /* @__PURE__ */ new Map());
class TextSelectionLayerState {
  constructor(props) {
    __privateAdd(this, _TextSelectionLayerState_instances);
    __privateAdd(this, _id13);
    __privateAdd(this, _onPointerDownProp);
    __privateAdd(this, _onPointerUpProp);
    __privateAdd(this, _enabled3);
    __privateAdd(this, _unsubSelectionLock, noop);
    __privateAdd(this, _ref13, box(null));
    __privateAdd(this, _pointerdown, (e) => {
      const node = __privateGet(this, _ref13).current;
      const target = e.target;
      if (!isHTMLElement(node) || !isHTMLElement(target) || !__privateGet(this, _enabled3).current) return;
      if (!isHighestLayer(this) || !isOrContainsTarget(node, target)) return;
      __privateGet(this, _onPointerDownProp).current(e);
      if (e.defaultPrevented) return;
      __privateSet(this, _unsubSelectionLock, preventTextSelectionOverflow(node));
    });
    __privateAdd(this, _resetSelectionLock, () => {
      __privateGet(this, _unsubSelectionLock).call(this);
      __privateSet(this, _unsubSelectionLock, noop);
    });
    __privateSet(this, _id13, props.id);
    __privateSet(this, _enabled3, props.preventOverflowTextSelection);
    __privateSet(this, _onPointerDownProp, props.onPointerDown);
    __privateSet(this, _onPointerUpProp, props.onPointerUp);
    useRefById({
      id: __privateGet(this, _id13),
      ref: __privateGet(this, _ref13),
      deps: () => __privateGet(this, _enabled3).current
    });
  }
}
_id13 = new WeakMap();
_onPointerDownProp = new WeakMap();
_onPointerUpProp = new WeakMap();
_enabled3 = new WeakMap();
_unsubSelectionLock = new WeakMap();
_ref13 = new WeakMap();
_TextSelectionLayerState_instances = new WeakSet();
addEventListeners_fn2 = function() {
  return executeCallbacks(addEventListener$1(document, "pointerdown", __privateGet(this, _pointerdown)), addEventListener$1(document, "pointerup", composeHandlers(__privateGet(this, _resetSelectionLock), __privateGet(this, _onPointerUpProp))));
};
_pointerdown = new WeakMap();
_resetSelectionLock = new WeakMap();
function useTextSelectionLayer(props) {
  return new TextSelectionLayerState(props);
}
const getUserSelect = (node) => node.style.userSelect || node.style.webkitUserSelect;
function preventTextSelectionOverflow(node) {
  const body = document.body;
  const originalBodyUserSelect = getUserSelect(body);
  const originalNodeUserSelect = getUserSelect(node);
  setUserSelect(body, "none");
  setUserSelect(node, "text");
  return () => {
    setUserSelect(body, originalBodyUserSelect);
    setUserSelect(node, originalNodeUserSelect);
  };
}
function setUserSelect(node, value) {
  node.style.userSelect = value;
  node.style.webkitUserSelect = value;
}
function isHighestLayer(instance) {
  const layersArr = [...globalThis.bitsTextSelectionLayers];
  if (!layersArr.length) return false;
  const highestLayer = layersArr.at(-1);
  if (!highestLayer) return false;
  return highestLayer[0] === instance;
}
function Text_selection_layer($$payload, $$props) {
  push();
  let {
    preventOverflowTextSelection = true,
    onPointerDown = noop,
    onPointerUp = noop,
    id,
    children,
    enabled
  } = $$props;
  useTextSelectionLayer({
    id: box.with(() => id),
    preventOverflowTextSelection: box.with(() => preventOverflowTextSelection),
    onPointerDown: box.with(() => onPointerDown),
    onPointerUp: box.with(() => onPointerUp),
    enabled: box.with(() => enabled)
  });
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!---->`;
  pop();
}
const SvelteMap = globalThis.Map;
function createSharedHook(factory) {
  let state = void 0;
  return (...args) => {
    return state;
  };
}
const useBodyLockStackCount = createSharedHook();
function useBodyScrollLock(initialState, restoreScrollDelay = () => null) {
  const id = useId();
  const countState = useBodyLockStackCount();
  restoreScrollDelay();
  countState.map.set(id, initialState ?? false);
  const locked = box.with(() => countState.map.get(id) ?? false, (v) => countState.map.set(id, v));
  return locked;
}
function Scroll_lock($$payload, $$props) {
  push();
  let {
    preventScroll = true,
    restoreScrollDelay = null
  } = $$props;
  useBodyScrollLock(preventScroll, () => restoreScrollDelay);
  pop();
}
function shouldTrapFocus({ forceMount, present, trapFocus, open }) {
  if (forceMount) {
    return open && trapFocus;
  }
  return present && trapFocus && open;
}
function Alert_dialog_content$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    children,
    child,
    ref = null,
    forceMount = false,
    interactOutsideBehavior = "ignore",
    onCloseAutoFocus = noop,
    onEscapeKeydown = noop,
    onOpenAutoFocus = noop,
    onInteractOutside = noop,
    preventScroll = true,
    trapFocus = true,
    restoreScrollDelay = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useDialogContent({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  {
    let presence = function($$payload2, { present }) {
      {
        let focusScope = function($$payload3, { props: focusScopeProps }) {
          Escape_layer($$payload3, spread_props([
            mergedProps,
            {
              enabled: present.current,
              onEscapeKeydown: (e) => {
                onEscapeKeydown(e);
                if (e.defaultPrevented) return;
                contentState.root.handleClose();
              },
              children: ($$payload4) => {
                Dismissible_layer($$payload4, spread_props([
                  mergedProps,
                  {
                    enabled: present.current,
                    interactOutsideBehavior,
                    onInteractOutside: (e) => {
                      onInteractOutside(e);
                      if (e.defaultPrevented) return;
                      contentState.root.handleClose();
                    },
                    children: ($$payload5) => {
                      Text_selection_layer($$payload5, spread_props([
                        mergedProps,
                        {
                          enabled: present.current,
                          children: ($$payload6) => {
                            if (child) {
                              $$payload6.out += "<!--[-->";
                              if (contentState.root.open.current) {
                                $$payload6.out += "<!--[-->";
                                Scroll_lock($$payload6, { preventScroll, restoreScrollDelay });
                              } else {
                                $$payload6.out += "<!--[!-->";
                              }
                              $$payload6.out += `<!--]--> `;
                              child($$payload6, {
                                props: mergeProps(mergedProps, focusScopeProps),
                                ...contentState.snippetProps
                              });
                              $$payload6.out += `<!---->`;
                            } else {
                              $$payload6.out += "<!--[!-->";
                              Scroll_lock($$payload6, { preventScroll });
                              $$payload6.out += `<!----> <div${spread_attributes({
                                ...mergeProps(mergedProps, focusScopeProps)
                              })}>`;
                              children == null ? void 0 : children($$payload6);
                              $$payload6.out += `<!----></div>`;
                            }
                            $$payload6.out += `<!--]-->`;
                          },
                          $$slots: { default: true }
                        }
                      ]));
                    },
                    $$slots: { default: true }
                  }
                ]));
              },
              $$slots: { default: true }
            }
          ]));
        };
        Focus_scope($$payload2, spread_props([
          {
            loop: true,
            trapFocus: shouldTrapFocus({
              forceMount,
              present: present.current,
              trapFocus,
              open: contentState.root.open.current
            })
          },
          mergedProps,
          {
            onCloseAutoFocus: (e) => {
              var _a;
              onCloseAutoFocus(e);
              if (e.defaultPrevented) return;
              (_a = contentState.root.triggerNode) == null ? void 0 : _a.focus();
            },
            onOpenAutoFocus: (e) => {
              var _a;
              onOpenAutoFocus(e);
              if (e.defaultPrevented) return;
              e.preventDefault();
              (_a = contentState.root.cancelNode) == null ? void 0 : _a.focus();
            },
            focusScope,
            $$slots: { focusScope: true }
          }
        ]));
      }
    };
    Presence_layer($$payload, spread_props([
      mergedProps,
      {
        forceMount,
        present: contentState.root.open.current || forceMount,
        presence,
        $$slots: { presence: true }
      }
    ]));
  }
  bind_props($$props, { ref });
  pop();
}
function Dialog_overlay$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    forceMount = false,
    child,
    children,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const overlayState = useDialogOverlay({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, overlayState.props);
  {
    let presence = function($$payload2) {
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, {
          props: mergeProps(mergedProps),
          ...overlayState.snippetProps
        });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div${spread_attributes({ ...mergeProps(mergedProps) })}>`;
        children == null ? void 0 : children($$payload2, overlayState.snippetProps);
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]-->`;
    };
    Presence_layer($$payload, {
      id,
      present: overlayState.root.open.current || forceMount,
      presence,
      $$slots: { presence: true }
    });
  }
  bind_props($$props, { ref });
  pop();
}
function Dialog_trigger($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    children,
    child,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = useDialogTrigger({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, triggerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
const ASPECT_RATIO_ROOT_ATTR = "data-aspect-ratio-root";
class AspectRatioRootState {
  constructor(props) {
    __privateAdd(this, _ref14);
    __privateAdd(this, _id14);
    __privateAdd(this, _ratio);
    __privateAdd(this, _wrapperProps, once(() => ({
      style: {
        position: "relative",
        width: "100%",
        paddingBottom: `${__privateGet(this, _ratio).current ? 100 / __privateGet(this, _ratio).current : 0}%}`
      }
    })));
    __privateAdd(this, _props13, once(() => ({
      id: __privateGet(this, _id14).current,
      style: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      [ASPECT_RATIO_ROOT_ATTR]: ""
    })));
    __privateSet(this, _ref14, props.ref);
    __privateSet(this, _id14, props.id);
    __privateSet(this, _ratio, props.ratio);
    useRefById({ id: __privateGet(this, _id14), ref: __privateGet(this, _ref14) });
  }
  get wrapperProps() {
    return __privateGet(this, _wrapperProps).call(this);
  }
  get props() {
    return __privateGet(this, _props13).call(this);
  }
}
_ref14 = new WeakMap();
_id14 = new WeakMap();
_ratio = new WeakMap();
_wrapperProps = new WeakMap();
_props13 = new WeakMap();
function useAspectRatioRoot(props) {
  return new AspectRatioRootState(props);
}
function Aspect_ratio($$payload, $$props) {
  push();
  let {
    ref = null,
    id = useId(),
    ratio = 1,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useAspectRatioRoot({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    ratio: box.with(() => ratio)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  $$payload.out += `<div${add_styles({
    position: "relative",
    width: "100%",
    "padding-bottom": `${stringify(ratio ? 100 / ratio : 0)}%`
  })}>`;
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { ref });
  pop();
}
function initAnnouncer() {
  if (!isBrowser$2)
    return null;
  let el = document.querySelector("[data-bits-announcer]");
  if (!isHTMLElement(el)) {
    const div = document.createElement("div");
    div.style.cssText = srOnlyStylesString;
    div.setAttribute("data-bits-announcer", "");
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
    if (!announcer || !isBrowser$2)
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
const defaultPartOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
};
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
  function dayPeriod(date, hourCycle = void 0) {
    var _a;
    const parts = new DateFormatter(locale, {
      hour: "numeric",
      minute: "numeric",
      hourCycle: hourCycle === 24 ? "h23" : void 0
    }).formatToParts(date);
    const value = (_a = parts.find((p2) => p2.type === "dayPeriod")) == null ? void 0 : _a.value;
    if (value === "PM") {
      return "PM";
    }
    return "AM";
  }
  function part(dateObj, type, options = {}) {
    const opts = { ...defaultPartOptions, ...options };
    const parts = toParts(dateObj, opts);
    const part2 = parts.find((p2) => p2.type === type);
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
function isCalendarDayNode(node) {
  if (!isHTMLElement(node)) return false;
  if (!node.hasAttribute("data-bits-day")) return false;
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
  const datesArray = Array.from({ length: daysInMonth }, (_, i) => dateObj.set({ day: i + 1 }));
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
    let length = extraDays;
    if (nextMonthDays.length === 0) {
      length = extraDays - 1;
      nextMonthDays.push(startFrom);
    }
    const extraDaysArray = Array.from({ length }, (_, i) => {
      const incr = i + 1;
      return startFrom.add({ days: incr });
    });
    nextMonthDays.push(...extraDaysArray);
  }
  const allDays = lastMonthDays.concat(datesArray, nextMonthDays);
  const weeks = chunk(allDays, 7);
  return { value: dateObj, dates: allDays, weeks };
}
function createMonths(props) {
  const { numberOfMonths, dateObj, ...monthProps } = props;
  const months = [];
  if (!numberOfMonths || numberOfMonths === 1) {
    months.push(createMonth({ ...monthProps, dateObj }));
    return months;
  }
  months.push(createMonth({ ...monthProps, dateObj }));
  for (let i = 1; i < numberOfMonths; i++) {
    const nextMonth = dateObj.add({ months: i });
    months.push(createMonth({ ...monthProps, dateObj: nextMonth }));
  }
  return months;
}
function getSelectableCells(calendarNode) {
  if (!calendarNode) return [];
  const selectableSelector = `[data-bits-day]:not([data-disabled]):not([data-outside-visible-months])`;
  return Array.from(calendarNode.querySelectorAll(selectableSelector)).filter((el) => isHTMLElement(el));
}
function setPlaceholderToNodeValue(node, placeholder) {
  const cellValue = node.getAttribute("data-value");
  if (!cellValue) return;
  placeholder.current = parseStringToDateValue(cellValue, placeholder.current);
}
function shiftCalendarFocus({
  node,
  add,
  placeholder,
  calendarNode,
  isPrevButtonDisabled,
  isNextButtonDisabled,
  months,
  numberOfMonths
}) {
  var _a, _b;
  const candidateCells = getSelectableCells(calendarNode);
  if (!candidateCells.length) return;
  const index = candidateCells.indexOf(node);
  const nextIndex = index + add;
  if (isValidIndex(nextIndex, candidateCells)) {
    const nextCell = candidateCells[nextIndex];
    setPlaceholderToNodeValue(nextCell, placeholder);
    return nextCell.focus();
  }
  if (nextIndex < 0) {
    if (isPrevButtonDisabled) return;
    const firstMonth = (_a = months[0]) == null ? void 0 : _a.value;
    if (!firstMonth) return;
    placeholder.current = firstMonth.subtract({ months: numberOfMonths });
    afterTick(() => {
      const newCandidateCells = getSelectableCells(calendarNode);
      if (!newCandidateCells.length) return;
      const newIndex = newCandidateCells.length - Math.abs(nextIndex);
      if (isValidIndex(newIndex, newCandidateCells)) {
        const newCell = newCandidateCells[newIndex];
        setPlaceholderToNodeValue(newCell, placeholder);
        return newCell.focus();
      }
    });
  }
  if (nextIndex >= candidateCells.length) {
    if (isNextButtonDisabled) return;
    const firstMonth = (_b = months[0]) == null ? void 0 : _b.value;
    if (!firstMonth) return;
    placeholder.current = firstMonth.add({ months: numberOfMonths });
    afterTick(() => {
      const newCandidateCells = getSelectableCells(calendarNode);
      if (!newCandidateCells.length) return;
      const newIndex = nextIndex - candidateCells.length;
      if (isValidIndex(newIndex, newCandidateCells)) {
        const nextCell = newCandidateCells[newIndex];
        return nextCell.focus();
      }
    });
  }
}
const ARROW_KEYS = [
  ARROW_DOWN,
  ARROW_UP,
  ARROW_LEFT,
  ARROW_RIGHT
];
const SELECT_KEYS = [ENTER, SPACE];
function handleCalendarKeydown({
  event,
  handleCellClick,
  shiftFocus,
  placeholderValue
}) {
  const currentCell = event.target;
  if (!isCalendarDayNode(currentCell)) return;
  if (!ARROW_KEYS.includes(event.key) && !SELECT_KEYS.includes(event.key)) return;
  event.preventDefault();
  const kbdFocusMap = {
    [ARROW_DOWN]: 7,
    [ARROW_UP]: -7,
    [ARROW_LEFT]: -1,
    [ARROW_RIGHT]: 1
  };
  if (ARROW_KEYS.includes(event.key)) {
    const add = kbdFocusMap[event.key];
    if (add !== void 0) {
      shiftFocus(currentCell, add);
    }
  }
  if (SELECT_KEYS.includes(event.key)) {
    const cellValue = currentCell.getAttribute("data-value");
    if (!cellValue) return;
    handleCellClick(event, parseStringToDateValue(cellValue, placeholderValue));
  }
}
function handleCalendarNextPage({
  months,
  setMonths,
  numberOfMonths,
  pagedNavigation,
  weekStartsOn,
  locale,
  fixedWeeks,
  setPlaceholder
}) {
  var _a;
  const firstMonth = (_a = months[0]) == null ? void 0 : _a.value;
  if (!firstMonth) return;
  if (pagedNavigation) {
    setPlaceholder(firstMonth.add({ months: numberOfMonths }));
  } else {
    const newMonths = createMonths({
      dateObj: firstMonth.add({ months: 1 }),
      weekStartsOn,
      locale,
      fixedWeeks,
      numberOfMonths
    });
    setMonths(newMonths);
    const firstNewMonth = newMonths[0];
    if (!firstNewMonth) return;
    setPlaceholder(firstNewMonth.value.set({ day: 1 }));
  }
}
function handleCalendarPrevPage({
  months,
  setMonths,
  numberOfMonths,
  pagedNavigation,
  weekStartsOn,
  locale,
  fixedWeeks,
  setPlaceholder
}) {
  var _a;
  const firstMonth = (_a = months[0]) == null ? void 0 : _a.value;
  if (!firstMonth) return;
  if (pagedNavigation) {
    setPlaceholder(firstMonth.subtract({ months: numberOfMonths }));
  } else {
    const newMonths = createMonths({
      dateObj: firstMonth.subtract({ months: 1 }),
      weekStartsOn,
      locale,
      fixedWeeks,
      numberOfMonths
    });
    setMonths(newMonths);
    const firstNewMonth = newMonths[0];
    if (!firstNewMonth) return;
    setPlaceholder(firstNewMonth.value.set({ day: 1 }));
  }
}
function getWeekdays({ months, formatter, weekdayFormat }) {
  if (!months.length) return [];
  const firstMonth = months[0];
  const firstWeek = firstMonth.weeks[0];
  if (!firstWeek) return [];
  return firstWeek.map((date) => formatter.dayOfWeek(toDate(date), weekdayFormat));
}
function useMonthViewOptionsSync(props) {
  const weekStartsOn = props.weekStartsOn.current;
  const locale = props.locale.current;
  const fixedWeeks = props.fixedWeeks.current;
  const numberOfMonths = props.numberOfMonths.current;
  run$1(() => {
    const placeholder = props.placeholder.current;
    if (!placeholder) return;
    const defaultMonthProps = {
      weekStartsOn,
      locale,
      fixedWeeks,
      numberOfMonths
    };
    props.setMonths(createMonths({ ...defaultMonthProps, dateObj: placeholder }));
  });
}
function useMonthViewPlaceholderSync({
  placeholder,
  getVisibleMonths,
  weekStartsOn,
  locale,
  fixedWeeks,
  numberOfMonths,
  setMonths
}) {
}
function getIsNextButtonDisabled({ maxValue, months, disabled }) {
  var _a;
  if (!maxValue || !months.length) return false;
  if (disabled) return true;
  const lastMonthInView = (_a = months[months.length - 1]) == null ? void 0 : _a.value;
  if (!lastMonthInView) return false;
  const firstMonthOfNextPage = lastMonthInView.add({ months: 1 }).set({ day: 1 });
  return isAfter(firstMonthOfNextPage, maxValue);
}
function getIsPrevButtonDisabled({ minValue, months, disabled }) {
  var _a;
  if (!minValue || !months.length) return false;
  if (disabled) return true;
  const firstMonthInView = (_a = months[0]) == null ? void 0 : _a.value;
  if (!firstMonthInView) return false;
  const lastMonthOfPrevPage = firstMonthInView.subtract({ months: 1 }).set({ day: 35 });
  return isBefore(lastMonthOfPrevPage, minValue);
}
function getCalendarHeadingValue({ months, locale, formatter }) {
  if (!months.length) return "";
  if (locale !== formatter.getLocale()) {
    formatter.setLocale(locale);
  }
  if (months.length === 1) {
    const month = toDate(months[0].value);
    return `${formatter.fullMonthAndYear(month)}`;
  }
  const startMonth = toDate(months[0].value);
  const endMonth = toDate(months[months.length - 1].value);
  const startMonthName = formatter.fullMonth(startMonth);
  const endMonthName = formatter.fullMonth(endMonth);
  const startMonthYear = formatter.fullYear(startMonth);
  const endMonthYear = formatter.fullYear(endMonth);
  const content = startMonthYear === endMonthYear ? `${startMonthName} - ${endMonthName} ${endMonthYear}` : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
  return content;
}
function getCalendarElementProps({
  fullCalendarLabel,
  id,
  isInvalid,
  disabled,
  readonly
}) {
  return {
    id,
    role: "application",
    "aria-label": fullCalendarLabel,
    "data-invalid": getDataInvalid(isInvalid),
    "data-disabled": getDataDisabled(disabled),
    "data-readonly": getDataReadonly(readonly)
  };
}
class CalendarRootState {
  constructor(props) {
    __publicField(this, "ref");
    __publicField(this, "id");
    __publicField(this, "value");
    __publicField(this, "placeholder");
    __publicField(this, "preventDeselect");
    __publicField(this, "minValue");
    __publicField(this, "maxValue");
    __publicField(this, "disabled");
    __publicField(this, "pagedNavigation");
    __publicField(this, "weekStartsOn");
    __publicField(this, "weekdayFormat");
    __publicField(this, "isDateDisabledProp");
    __publicField(this, "isDateUnavailableProp");
    __publicField(this, "fixedWeeks");
    __publicField(this, "numberOfMonths");
    __publicField(this, "locale");
    __publicField(this, "calendarLabel");
    __publicField(this, "type");
    __publicField(this, "readonly");
    __publicField(this, "disableDaysOutsideMonth");
    __publicField(this, "onDateSelect");
    __publicField(this, "initialFocus");
    __publicField(this, "months", []);
    __privateAdd(this, _visibleMonths, once(() => this.months.map((month) => month.value)));
    __publicField(this, "announcer");
    __publicField(this, "formatter");
    __publicField(this, "accessibleHeadingId", useId());
    __privateAdd(this, _weekdays, once(() => {
      return getWeekdays({
        months: this.months,
        formatter: this.formatter,
        weekdayFormat: this.weekdayFormat.current
      });
    }));
    __privateAdd(this, _isNextButtonDisabled, once(() => {
      return getIsNextButtonDisabled({
        maxValue: this.maxValue.current,
        months: this.months,
        disabled: this.disabled.current
      });
    }));
    __privateAdd(this, _isPrevButtonDisabled, once(() => {
      return getIsPrevButtonDisabled({
        minValue: this.minValue.current,
        months: this.months,
        disabled: this.disabled.current
      });
    }));
    __privateAdd(this, _isInvalid, once(() => {
      const value = this.value.current;
      const isDateDisabled = this.isDateDisabledProp.current;
      const isDateUnavailable = this.isDateUnavailableProp.current;
      if (Array.isArray(value)) {
        if (!value.length) return false;
        for (const date of value) {
          if (isDateDisabled(date)) return true;
          if (isDateUnavailable(date)) return true;
        }
      } else {
        if (!value) return false;
        if (isDateDisabled(value)) return true;
        if (isDateUnavailable(value)) return true;
      }
      return false;
    }));
    __privateAdd(this, _headingValue, once(() => {
      return getCalendarHeadingValue({
        months: this.months,
        formatter: this.formatter,
        locale: this.locale.current
      });
    }));
    __privateAdd(this, _fullCalendarLabel, once(() => {
      return `${this.calendarLabel.current} ${this.headingValue}`;
    }));
    __privateAdd(this, _snippetProps4, once(() => ({ months: this.months, weekdays: this.weekdays })));
    __privateAdd(this, _props14, once(() => ({
      ...getCalendarElementProps({
        fullCalendarLabel: this.fullCalendarLabel,
        id: this.id.current,
        isInvalid: this.isInvalid,
        disabled: this.disabled.current,
        readonly: this.readonly.current
      }),
      [this.getBitsAttr("root")]: "",
      //
      onkeydown: this.onkeydown
    })));
    this.value = props.value;
    this.placeholder = props.placeholder;
    this.preventDeselect = props.preventDeselect;
    this.minValue = props.minValue;
    this.maxValue = props.maxValue;
    this.disabled = props.disabled;
    this.pagedNavigation = props.pagedNavigation;
    this.weekStartsOn = props.weekStartsOn;
    this.weekdayFormat = props.weekdayFormat;
    this.isDateDisabledProp = props.isDateDisabled;
    this.isDateUnavailableProp = props.isDateUnavailable;
    this.fixedWeeks = props.fixedWeeks;
    this.numberOfMonths = props.numberOfMonths;
    this.locale = props.locale;
    this.calendarLabel = props.calendarLabel;
    this.type = props.type;
    this.readonly = props.readonly;
    this.id = props.id;
    this.ref = props.ref;
    this.disableDaysOutsideMonth = props.disableDaysOutsideMonth;
    this.onDateSelect = props.onDateSelect;
    this.initialFocus = props.initialFocus;
    this.announcer = getAnnouncer();
    this.formatter = createFormatter(this.locale.current);
    this.setMonths = this.setMonths.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.prevYear = this.prevYear.bind(this);
    this.nextYear = this.nextYear.bind(this);
    this.setYear = this.setYear.bind(this);
    this.setMonth = this.setMonth.bind(this);
    this.isOutsideVisibleMonths = this.isOutsideVisibleMonths.bind(this);
    this.isDateDisabled = this.isDateDisabled.bind(this);
    this.isDateSelected = this.isDateSelected.bind(this);
    this.shiftFocus = this.shiftFocus.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleMultipleUpdate = this.handleMultipleUpdate.bind(this);
    this.handleSingleUpdate = this.handleSingleUpdate.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    this.getBitsAttr = this.getBitsAttr.bind(this);
    useRefById({ id: this.id, ref: this.ref });
    this.months = createMonths({
      dateObj: this.placeholder.current,
      weekStartsOn: this.weekStartsOn.current,
      locale: this.locale.current,
      fixedWeeks: this.fixedWeeks.current,
      numberOfMonths: this.numberOfMonths.current
    });
    useMonthViewPlaceholderSync({
      placeholder: this.placeholder,
      getVisibleMonths: () => this.visibleMonths,
      weekStartsOn: this.weekStartsOn,
      locale: this.locale,
      fixedWeeks: this.fixedWeeks,
      numberOfMonths: this.numberOfMonths,
      setMonths: (months) => this.months = months
    });
    useMonthViewOptionsSync({
      fixedWeeks: this.fixedWeeks,
      locale: this.locale,
      numberOfMonths: this.numberOfMonths,
      placeholder: this.placeholder,
      setMonths: this.setMonths,
      weekStartsOn: this.weekStartsOn
    });
  }
  get visibleMonths() {
    return __privateGet(this, _visibleMonths).call(this);
  }
  setMonths(months) {
    this.months = months;
  }
  get weekdays() {
    return __privateGet(this, _weekdays).call(this);
  }
  /**
   * Navigates to the next page of the calendar.
   */
  nextPage() {
    handleCalendarNextPage({
      fixedWeeks: this.fixedWeeks.current,
      locale: this.locale.current,
      numberOfMonths: this.numberOfMonths.current,
      pagedNavigation: this.pagedNavigation.current,
      setMonths: this.setMonths,
      setPlaceholder: (date) => this.placeholder.current = date,
      weekStartsOn: this.weekStartsOn.current,
      months: this.months
    });
  }
  /**
   * Navigates to the previous page of the calendar.
   */
  prevPage() {
    handleCalendarPrevPage({
      fixedWeeks: this.fixedWeeks.current,
      locale: this.locale.current,
      numberOfMonths: this.numberOfMonths.current,
      pagedNavigation: this.pagedNavigation.current,
      setMonths: this.setMonths,
      setPlaceholder: (date) => this.placeholder.current = date,
      weekStartsOn: this.weekStartsOn.current,
      months: this.months
    });
  }
  nextYear() {
    this.placeholder.current = this.placeholder.current.add({ years: 1 });
  }
  prevYear() {
    this.placeholder.current = this.placeholder.current.subtract({ years: 1 });
  }
  setYear(year) {
    this.placeholder.current = this.placeholder.current.set({ year });
  }
  setMonth(month) {
    this.placeholder.current = this.placeholder.current.set({ month });
  }
  get isNextButtonDisabled() {
    return __privateGet(this, _isNextButtonDisabled).call(this);
  }
  get isPrevButtonDisabled() {
    return __privateGet(this, _isPrevButtonDisabled).call(this);
  }
  get isInvalid() {
    return __privateGet(this, _isInvalid).call(this);
  }
  get headingValue() {
    return __privateGet(this, _headingValue).call(this);
  }
  get fullCalendarLabel() {
    return __privateGet(this, _fullCalendarLabel).call(this);
  }
  isOutsideVisibleMonths(date) {
    return !this.visibleMonths.some((month) => isSameMonth(date, month));
  }
  isDateDisabled(date) {
    if (this.isDateDisabledProp.current(date) || this.disabled.current) return true;
    const minValue = this.minValue.current;
    const maxValue = this.maxValue.current;
    if (minValue && isBefore(date, minValue)) return true;
    if (maxValue && isBefore(maxValue, date)) return true;
    return false;
  }
  isDateSelected(date) {
    const value = this.value.current;
    if (Array.isArray(value)) {
      return value.some((d) => isSameDay(d, date));
    } else if (!value) {
      return false;
    } else {
      return isSameDay(value, date);
    }
  }
  shiftFocus(node, add) {
    return shiftCalendarFocus({
      node,
      add,
      placeholder: this.placeholder,
      calendarNode: this.ref.current,
      isPrevButtonDisabled: this.isPrevButtonDisabled,
      isNextButtonDisabled: this.isNextButtonDisabled,
      months: this.months,
      numberOfMonths: this.numberOfMonths.current
    });
  }
  handleCellClick(_, date) {
    var _a, _b;
    const readonly = this.readonly.current;
    if (readonly) return;
    const isDateDisabled = this.isDateDisabledProp.current;
    const isDateUnavailable = this.isDateUnavailableProp.current;
    if ((isDateDisabled == null ? void 0 : isDateDisabled(date)) || (isDateUnavailable == null ? void 0 : isDateUnavailable(date))) return;
    const prev = this.value.current;
    const multiple = this.type.current === "multiple";
    if (multiple) {
      if (Array.isArray(prev) || prev === void 0) {
        this.value.current = this.handleMultipleUpdate(prev, date);
      }
    } else {
      if (!Array.isArray(prev)) {
        const next = this.handleSingleUpdate(prev, date);
        if (!next) {
          this.announcer.announce("Selected date is now empty.", "polite", 5e3);
        } else {
          this.announcer.announce(`Selected Date: ${this.formatter.selectedDate(next, false)}`, "polite");
        }
        this.value.current = next;
        if (next !== void 0) {
          (_b = (_a = this.onDateSelect) == null ? void 0 : _a.current) == null ? void 0 : _b.call(_a);
        }
      }
    }
  }
  handleMultipleUpdate(prev, date) {
    if (!prev) return [date];
    if (!Array.isArray(prev)) {
      if (DEV) throw new Error("Invalid value for multiple prop.");
      return;
    }
    const index = prev.findIndex((d) => isSameDay(d, date));
    const preventDeselect = this.preventDeselect.current;
    if (index === -1) {
      return [...prev, date];
    } else if (preventDeselect) {
      return prev;
    } else {
      const next = prev.filter((d) => !isSameDay(d, date));
      if (!next.length) {
        this.placeholder.current = date;
        return void 0;
      }
      return next;
    }
  }
  handleSingleUpdate(prev, date) {
    if (Array.isArray(prev)) {
      if (DEV) throw new Error("Invalid value for single prop.");
    }
    if (!prev) return date;
    const preventDeselect = this.preventDeselect.current;
    if (!preventDeselect && isSameDay(prev, date)) {
      this.placeholder.current = date;
      return void 0;
    }
    return date;
  }
  onkeydown(event) {
    handleCalendarKeydown({
      event,
      handleCellClick: this.handleCellClick,
      shiftFocus: this.shiftFocus,
      placeholderValue: this.placeholder.current
    });
  }
  get snippetProps() {
    return __privateGet(this, _snippetProps4).call(this);
  }
  getBitsAttr(part) {
    return `data-bits-calendar-${part}`;
  }
  get props() {
    return __privateGet(this, _props14).call(this);
  }
}
_visibleMonths = new WeakMap();
_weekdays = new WeakMap();
_isNextButtonDisabled = new WeakMap();
_isPrevButtonDisabled = new WeakMap();
_isInvalid = new WeakMap();
_headingValue = new WeakMap();
_fullCalendarLabel = new WeakMap();
_snippetProps4 = new WeakMap();
_props14 = new WeakMap();
class CalendarHeadingState {
  constructor(props, root) {
    __publicField(this, "root");
    __publicField(this, "id");
    __publicField(this, "ref");
    __privateAdd(this, _headingValue2, once(() => this.root.headingValue));
    __privateAdd(this, _props15, once(() => ({
      id: this.id.current,
      "aria-hidden": getAriaHidden(true),
      "data-disabled": getDataDisabled(this.root.disabled.current),
      "data-readonly": getDataReadonly(this.root.readonly.current),
      [this.root.getBitsAttr("heading")]: ""
    })));
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({ id: this.id, ref: this.ref });
  }
  get headingValue() {
    return __privateGet(this, _headingValue2).call(this);
  }
  get props() {
    return __privateGet(this, _props15).call(this);
  }
}
_headingValue2 = new WeakMap();
_props15 = new WeakMap();
class CalendarCellState {
  constructor(props, root) {
    __publicField(this, "root");
    __publicField(this, "id");
    __publicField(this, "ref");
    __publicField(this, "date");
    __publicField(this, "month");
    __privateAdd(this, _cellDate, once(() => toDate(this.date.current)));
    __privateAdd(this, _isDisabled3, once(() => this.root.isDateDisabled(this.date.current)));
    __privateAdd(this, _isUnavailable, once(() => this.root.isDateUnavailableProp.current(this.date.current)));
    __privateAdd(this, _isDateToday, once(() => isToday(this.date.current, getLocalTimeZone())));
    __privateAdd(this, _isOutsideMonth, once(() => !isSameMonth(this.date.current, this.month.current)));
    __privateAdd(this, _isOutsideVisibleMonths, once(() => this.root.isOutsideVisibleMonths(this.date.current)));
    __privateAdd(this, _isFocusedDate, once(() => isSameDay(this.date.current, this.root.placeholder.current)));
    __privateAdd(this, _isSelectedDate, once(() => this.root.isDateSelected(this.date.current)));
    __privateAdd(this, _labelText, once(() => this.root.formatter.custom(this.cellDate, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    })));
    __privateAdd(this, _snippetProps5, once(() => ({
      disabled: this.isDisabled,
      unavailable: this.isUnavailable,
      selected: this.isSelectedDate
    })));
    __privateAdd(this, _ariaDisabled, once(() => {
      return this.isDisabled || this.isOutsideMonth && this.root.disableDaysOutsideMonth.current || this.isUnavailable;
    }));
    __privateAdd(this, _sharedDataAttrs, once(() => ({
      "data-unavailable": getDataUnavailable(this.isUnavailable),
      "data-today": this.isDateToday ? "" : void 0,
      "data-outside-month": this.isOutsideMonth ? "" : void 0,
      "data-outside-visible-months": this.isOutsideVisibleMonths ? "" : void 0,
      "data-focused": this.isFocusedDate ? "" : void 0,
      "data-selected": getDataSelected(this.isSelectedDate),
      "data-value": this.date.current.toString(),
      "data-disabled": getDataDisabled(this.isDisabled || this.isOutsideMonth && this.root.disableDaysOutsideMonth.current)
    })));
    __privateAdd(this, _props16, once(() => ({
      id: this.id.current,
      role: "gridcell",
      "aria-selected": getAriaSelected(this.isSelectedDate),
      "aria-disabled": getAriaDisabled(this.ariaDisabled),
      ...this.sharedDataAttrs,
      [this.root.getBitsAttr("cell")]: ""
    })));
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    this.date = props.date;
    this.month = props.month;
    useRefById({ id: this.id, ref: this.ref });
  }
  get cellDate() {
    return __privateGet(this, _cellDate).call(this);
  }
  get isDisabled() {
    return __privateGet(this, _isDisabled3).call(this);
  }
  get isUnavailable() {
    return __privateGet(this, _isUnavailable).call(this);
  }
  get isDateToday() {
    return __privateGet(this, _isDateToday).call(this);
  }
  get isOutsideMonth() {
    return __privateGet(this, _isOutsideMonth).call(this);
  }
  get isOutsideVisibleMonths() {
    return __privateGet(this, _isOutsideVisibleMonths).call(this);
  }
  get isFocusedDate() {
    return __privateGet(this, _isFocusedDate).call(this);
  }
  get isSelectedDate() {
    return __privateGet(this, _isSelectedDate).call(this);
  }
  get labelText() {
    return __privateGet(this, _labelText).call(this);
  }
  get snippetProps() {
    return __privateGet(this, _snippetProps5).call(this);
  }
  get ariaDisabled() {
    return __privateGet(this, _ariaDisabled).call(this);
  }
  get sharedDataAttrs() {
    return __privateGet(this, _sharedDataAttrs).call(this);
  }
  get props() {
    return __privateGet(this, _props16).call(this);
  }
}
_cellDate = new WeakMap();
_isDisabled3 = new WeakMap();
_isUnavailable = new WeakMap();
_isDateToday = new WeakMap();
_isOutsideMonth = new WeakMap();
_isOutsideVisibleMonths = new WeakMap();
_isFocusedDate = new WeakMap();
_isSelectedDate = new WeakMap();
_labelText = new WeakMap();
_snippetProps5 = new WeakMap();
_ariaDisabled = new WeakMap();
_sharedDataAttrs = new WeakMap();
_props16 = new WeakMap();
class CalendarDayState {
  constructor(props, cell) {
    __publicField(this, "cell");
    __publicField(this, "id");
    __publicField(this, "ref");
    __privateAdd(this, _tabindex, once(() => this.cell.isFocusedDate ? 0 : this.cell.isOutsideMonth && this.cell.root.disableDaysOutsideMonth.current || this.cell.isDisabled ? void 0 : -1));
    __privateAdd(this, _snippetProps6, once(() => ({
      disabled: this.cell.isDisabled,
      unavailable: this.cell.isUnavailable,
      selected: this.cell.isSelectedDate,
      day: `${this.cell.date.current.day}`
    })));
    __privateAdd(this, _props17, once(() => ({
      id: this.id.current,
      role: "button",
      "aria-label": this.cell.labelText,
      "aria-disabled": getAriaDisabled(this.cell.ariaDisabled),
      ...this.cell.sharedDataAttrs,
      tabindex: __privateGet(this, _tabindex).call(this),
      [this.cell.root.getBitsAttr("day")]: "",
      // Shared logic for range calendar and calendar
      "data-bits-day": "",
      //
      onclick: this.onclick
    })));
    this.cell = cell;
    this.id = props.id;
    this.ref = props.ref;
    this.onclick = this.onclick.bind(this);
    useRefById({ id: this.id, ref: this.ref });
  }
  onclick(e) {
    if (this.cell.isDisabled) return;
    this.cell.root.handleCellClick(e, this.cell.date.current);
  }
  get snippetProps() {
    return __privateGet(this, _snippetProps6).call(this);
  }
  get props() {
    return __privateGet(this, _props17).call(this);
  }
}
_tabindex = new WeakMap();
_snippetProps6 = new WeakMap();
_props17 = new WeakMap();
class CalendarNextButtonState {
  constructor(props, root) {
    __publicField(this, "root");
    __publicField(this, "id");
    __publicField(this, "ref");
    __privateAdd(this, _isDisabled4, once(() => this.root.isNextButtonDisabled));
    __privateAdd(this, _props18, once(() => ({
      id: this.id.current,
      role: "button",
      type: "button",
      "aria-label": "Next",
      "aria-disabled": getAriaDisabled(this.isDisabled),
      "data-disabled": getDataDisabled(this.isDisabled),
      disabled: this.isDisabled,
      [this.root.getBitsAttr("next-button")]: "",
      //
      onclick: this.onclick
    })));
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    this.onclick = this.onclick.bind(this);
    useRefById({ id: this.id, ref: this.ref });
  }
  get isDisabled() {
    return __privateGet(this, _isDisabled4).call(this);
  }
  onclick(_) {
    if (this.isDisabled) return;
    this.root.nextPage();
  }
  get props() {
    return __privateGet(this, _props18).call(this);
  }
}
_isDisabled4 = new WeakMap();
_props18 = new WeakMap();
class CalendarPrevButtonState {
  constructor(props, root) {
    __publicField(this, "root");
    __publicField(this, "id");
    __publicField(this, "ref");
    __privateAdd(this, _isDisabled5, once(() => this.root.isPrevButtonDisabled));
    __privateAdd(this, _props19, once(() => ({
      id: this.id.current,
      role: "button",
      type: "button",
      "aria-label": "Previous",
      "aria-disabled": getAriaDisabled(this.isDisabled),
      "data-disabled": getDataDisabled(this.isDisabled),
      disabled: this.isDisabled,
      [this.root.getBitsAttr("prev-button")]: "",
      //
      onclick: this.onclick
    })));
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    this.onclick = this.onclick.bind(this);
    useRefById({ id: this.id, ref: this.ref });
  }
  get isDisabled() {
    return __privateGet(this, _isDisabled5).call(this);
  }
  onclick(_) {
    if (this.isDisabled) return;
    this.root.prevPage();
  }
  get props() {
    return __privateGet(this, _props19).call(this);
  }
}
_isDisabled5 = new WeakMap();
_props19 = new WeakMap();
class CalendarGridState {
  constructor(props, root) {
    __publicField(this, "root");
    __publicField(this, "id");
    __publicField(this, "ref");
    __privateAdd(this, _props20, once(() => ({
      id: this.id.current,
      tabindex: -1,
      role: "grid",
      "aria-readonly": getAriaReadonly(this.root.readonly.current),
      "aria-disabled": getAriaDisabled(this.root.disabled.current),
      "data-readonly": getDataReadonly(this.root.readonly.current),
      "data-disabled": getDataDisabled(this.root.disabled.current),
      [this.root.getBitsAttr("grid")]: ""
    })));
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({ id: this.id, ref: this.ref });
  }
  get props() {
    return __privateGet(this, _props20).call(this);
  }
}
_props20 = new WeakMap();
class CalendarGridBodyState {
  constructor(props, root) {
    __publicField(this, "root");
    __publicField(this, "id");
    __publicField(this, "ref");
    __privateAdd(this, _props21, once(() => ({
      id: this.id.current,
      "data-disabled": getDataDisabled(this.root.disabled.current),
      "data-readonly": getDataReadonly(this.root.readonly.current),
      [this.root.getBitsAttr("grid-body")]: ""
    })));
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({ id: this.id, ref: this.ref });
  }
  get props() {
    return __privateGet(this, _props21).call(this);
  }
}
_props21 = new WeakMap();
class CalendarGridHeadState {
  constructor(props, root) {
    __publicField(this, "root");
    __publicField(this, "id");
    __publicField(this, "ref");
    __privateAdd(this, _props22, once(() => ({
      id: this.id.current,
      "data-disabled": getDataDisabled(this.root.disabled.current),
      "data-readonly": getDataReadonly(this.root.readonly.current),
      [this.root.getBitsAttr("grid-head")]: ""
    })));
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({ id: this.id, ref: this.ref });
  }
  get props() {
    return __privateGet(this, _props22).call(this);
  }
}
_props22 = new WeakMap();
class CalendarGridRowState {
  constructor(props, root) {
    __publicField(this, "root");
    __publicField(this, "id");
    __publicField(this, "ref");
    __privateAdd(this, _props23, once(() => ({
      id: this.id.current,
      "data-disabled": getDataDisabled(this.root.disabled.current),
      "data-readonly": getDataReadonly(this.root.readonly.current),
      [this.root.getBitsAttr("grid-row")]: ""
    })));
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({ id: this.id, ref: this.ref });
  }
  get props() {
    return __privateGet(this, _props23).call(this);
  }
}
_props23 = new WeakMap();
class CalendarHeadCellState {
  constructor(props, root) {
    __publicField(this, "root");
    __publicField(this, "id");
    __publicField(this, "ref");
    __privateAdd(this, _props24, once(() => ({
      id: this.id.current,
      "data-disabled": getDataDisabled(this.root.disabled.current),
      "data-readonly": getDataReadonly(this.root.readonly.current),
      [this.root.getBitsAttr("head-cell")]: ""
    })));
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({ id: this.id, ref: this.ref });
  }
  get props() {
    return __privateGet(this, _props24).call(this);
  }
}
_props24 = new WeakMap();
class CalendarHeaderState {
  constructor(props, root) {
    __publicField(this, "root");
    __publicField(this, "id");
    __publicField(this, "ref");
    __privateAdd(this, _props25, once(() => ({
      id: this.id.current,
      "data-disabled": getDataDisabled(this.root.disabled.current),
      "data-readonly": getDataReadonly(this.root.readonly.current),
      [this.root.getBitsAttr("header")]: ""
    })));
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({ id: this.id, ref: this.ref });
  }
  get props() {
    return __privateGet(this, _props25).call(this);
  }
}
_props25 = new WeakMap();
const [
  setCalendarRootContext,
  getCalendarRootContext
] = createContext(["Calendar.Root", "RangeCalendar.Root"], "Calendar.Root", false);
const [
  setCalendarCellContext,
  getCalendarCellContext
] = createContext("Calendar.Cell");
function useCalendarRoot(props) {
  return setCalendarRootContext(new CalendarRootState(props));
}
function useCalendarGrid(props) {
  const root = getCalendarRootContext();
  return new CalendarGridState(props, root);
}
function useCalendarCell(props) {
  const root = getCalendarRootContext();
  return setCalendarCellContext(new CalendarCellState(props, root));
}
function useCalendarNextButton(props) {
  const root = getCalendarRootContext();
  return new CalendarNextButtonState(props, root);
}
function useCalendarPrevButton(props) {
  const root = getCalendarRootContext();
  return new CalendarPrevButtonState(props, root);
}
function useCalendarDay(props) {
  const cell = getCalendarCellContext();
  return new CalendarDayState(props, cell);
}
function useCalendarGridBody(props) {
  const root = getCalendarRootContext();
  return new CalendarGridBodyState(props, root);
}
function useCalendarGridHead(props) {
  const root = getCalendarRootContext();
  return new CalendarGridHeadState(props, root);
}
function useCalendarGridRow(props) {
  const root = getCalendarRootContext();
  return new CalendarGridRowState(props, root);
}
function useCalendarHeadCell(props) {
  const root = getCalendarRootContext();
  return new CalendarHeadCellState(props, root);
}
function useCalendarHeader(props) {
  const root = getCalendarRootContext();
  return new CalendarHeaderState(props, root);
}
function useCalendarHeading(props) {
  const root = getCalendarRootContext();
  return new CalendarHeadingState(props, root);
}
function Calendar$1($$payload, $$props) {
  push();
  let {
    child,
    children,
    id = useId(),
    ref = null,
    value = void 0,
    onValueChange = noop,
    placeholder = void 0,
    onPlaceholderChange = noop,
    weekdayFormat = "narrow",
    weekStartsOn = 0,
    pagedNavigation = false,
    isDateDisabled = () => false,
    isDateUnavailable = () => false,
    fixedWeeks = false,
    numberOfMonths = 1,
    locale = "en",
    calendarLabel = "Event",
    disabled = false,
    readonly = false,
    minValue = void 0,
    maxValue = void 0,
    preventDeselect = false,
    type,
    disableDaysOutsideMonth = true,
    initialFocus = false,
    controlledValue = false,
    controlledPlaceholder = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (placeholder === void 0) {
    const defaultPlaceholder = getDefaultDate({
      defaultPlaceholder: void 0,
      defaultValue: value
    });
    if (controlledPlaceholder) {
      onPlaceholderChange(defaultPlaceholder);
    } else {
      placeholder = defaultPlaceholder;
    }
  }
  if (value === void 0) {
    const defaultValue = type === "single" ? "" : [];
    if (controlledValue) {
      onValueChange(defaultValue);
    } else {
      value = defaultValue;
    }
  }
  value === void 0 && (value = type === "single" ? void 0 : []);
  const rootState = useCalendarRoot({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    weekdayFormat: box.with(() => weekdayFormat),
    weekStartsOn: box.with(() => weekStartsOn),
    pagedNavigation: box.with(() => pagedNavigation),
    isDateDisabled: box.with(() => isDateDisabled),
    isDateUnavailable: box.with(() => isDateUnavailable),
    fixedWeeks: box.with(() => fixedWeeks),
    numberOfMonths: box.with(() => numberOfMonths),
    locale: box.with(() => locale),
    calendarLabel: box.with(() => calendarLabel),
    readonly: box.with(() => readonly),
    disabled: box.with(() => disabled),
    minValue: box.with(() => minValue),
    maxValue: box.with(() => maxValue),
    disableDaysOutsideMonth: box.with(() => disableDaysOutsideMonth),
    initialFocus: box.with(() => initialFocus),
    placeholder: box.with(() => placeholder, (v) => {
      if (controlledPlaceholder) {
        onPlaceholderChange(v);
      } else {
        placeholder = v;
        onPlaceholderChange(v);
      }
    }),
    preventDeselect: box.with(() => preventDeselect),
    value: box.with(() => value, (v) => {
      if (controlledValue) {
        onValueChange(v);
      } else {
        value = v;
        onValueChange(v);
      }
    }),
    type: box.with(() => type)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...rootState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload, rootState.snippetProps);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, value, placeholder });
  pop();
}
function Calendar_day$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const dayState = useCalendarDay({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, dayState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...dayState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    if (children) {
      $$payload.out += "<!--[-->";
      children == null ? void 0 : children($$payload, dayState.snippetProps);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(dayState.cell.date.current.day)}`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridState = useCalendarGrid({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<table${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></table>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_body$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridBodyState = useCalendarGridBody({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridBodyState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<tbody${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></tbody>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_cell$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId(),
    date,
    month,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const cellState = useCalendarCell({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    date: box.with(() => date),
    month: box.with(() => month)
  });
  const mergedProps = mergeProps(restProps, cellState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...cellState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<td${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload, cellState.snippetProps);
    $$payload.out += `<!----></td>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_head$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridHeadState = useCalendarGridHead({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridHeadState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<thead${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></thead>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_head_cell$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const headCellState = useCalendarHeadCell({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, headCellState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<th${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></th>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_row$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridRowState = useCalendarGridRow({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridRowState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<tr${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></tr>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_header$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const headerState = useCalendarHeader({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, headerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<header${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></header>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_heading$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const headingState = useCalendarHeading({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, headingState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, {
      props: mergedProps,
      headingValue: headingState.headingValue
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    if (children) {
      $$payload.out += "<!--[-->";
      children == null ? void 0 : children($$payload, { headingValue: headingState.headingValue });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(headingState.headingValue)}`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_next_button$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId(),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const nextButtonState = useCalendarNextButton({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, nextButtonState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_prev_button$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId(),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const prevButtonState = useCalendarPrevButton({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, prevButtonState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
const CHECKBOX_ROOT_ATTR = "data-checkbox-root";
class CheckboxRootState {
  constructor(props, group = null) {
    __privateAdd(this, _CheckboxRootState_instances);
    __privateAdd(this, _id15);
    __privateAdd(this, _ref15);
    __privateAdd(this, _type);
    __publicField(this, "checked");
    __privateAdd(this, _disabled5);
    __privateAdd(this, _required);
    __privateAdd(this, _name);
    __publicField(this, "value");
    __publicField(this, "indeterminate");
    __publicField(this, "group", null);
    __privateAdd(this, _trueName, once(() => {
      if (this.group && this.group.name.current) {
        return this.group.name.current;
      } else {
        return __privateGet(this, _name).current;
      }
    }));
    __privateAdd(this, _trueRequired, once(() => {
      if (this.group && this.group.required.current) {
        return true;
      }
      return __privateGet(this, _required).current;
    }));
    __privateAdd(this, _trueDisabled, once(() => {
      if (this.group && this.group.disabled.current) {
        return true;
      }
      return __privateGet(this, _disabled5).current;
    }));
    __privateAdd(this, _snippetProps7, once(() => ({
      checked: this.checked.current,
      indeterminate: this.indeterminate.current
    })));
    __privateAdd(this, _props26, once(() => ({
      id: __privateGet(this, _id15).current,
      role: "checkbox",
      type: __privateGet(this, _type).current,
      disabled: this.trueDisabled,
      "aria-checked": getAriaChecked(this.checked.current, this.indeterminate.current),
      "aria-required": getAriaRequired(this.trueRequired),
      "data-disabled": getDataDisabled(this.trueDisabled),
      "data-state": getCheckboxDataState(this.checked.current, this.indeterminate.current),
      [CHECKBOX_ROOT_ATTR]: "",
      //
      onclick: this.onclick,
      onkeydown: this.onkeydown
    })));
    this.checked = props.checked;
    __privateSet(this, _disabled5, props.disabled);
    __privateSet(this, _required, props.required);
    __privateSet(this, _name, props.name);
    this.value = props.value;
    __privateSet(this, _ref15, props.ref);
    __privateSet(this, _id15, props.id);
    this.indeterminate = props.indeterminate;
    __privateSet(this, _type, props.type);
    this.group = group;
    this.onkeydown = this.onkeydown.bind(this);
    this.onclick = this.onclick.bind(this);
    useRefById({ id: __privateGet(this, _id15), ref: __privateGet(this, _ref15) });
  }
  get trueName() {
    return __privateGet(this, _trueName).call(this);
  }
  get trueRequired() {
    return __privateGet(this, _trueRequired).call(this);
  }
  get trueDisabled() {
    return __privateGet(this, _trueDisabled).call(this);
  }
  onkeydown(e) {
    if (__privateGet(this, _disabled5).current) return;
    if (e.key === ENTER) e.preventDefault();
    if (e.key === SPACE) {
      e.preventDefault();
      __privateMethod(this, _CheckboxRootState_instances, toggle_fn).call(this);
    }
  }
  onclick(_) {
    if (__privateGet(this, _disabled5).current) return;
    __privateMethod(this, _CheckboxRootState_instances, toggle_fn).call(this);
  }
  get snippetProps() {
    return __privateGet(this, _snippetProps7).call(this);
  }
  get props() {
    return __privateGet(this, _props26).call(this);
  }
}
_id15 = new WeakMap();
_ref15 = new WeakMap();
_type = new WeakMap();
_disabled5 = new WeakMap();
_required = new WeakMap();
_name = new WeakMap();
_trueName = new WeakMap();
_trueRequired = new WeakMap();
_trueDisabled = new WeakMap();
_CheckboxRootState_instances = new WeakSet();
toggle_fn = function() {
  if (this.indeterminate.current) {
    this.indeterminate.current = false;
    this.checked.current = true;
  } else {
    this.checked.current = !this.checked.current;
  }
};
_snippetProps7 = new WeakMap();
_props26 = new WeakMap();
class CheckboxInputState {
  constructor(root) {
    __publicField(this, "root");
    __privateAdd(this, _trueChecked, once(() => {
      if (this.root.group) {
        if (this.root.value.current !== void 0 && this.root.group.value.current.includes(this.root.value.current)) {
          return true;
        }
        return false;
      }
      return this.root.checked.current;
    }));
    __privateAdd(this, _shouldRender, once(() => Boolean(this.root.trueName)));
    __privateAdd(this, _props27, once(() => ({
      type: "checkbox",
      checked: this.root.checked.current === true,
      disabled: this.root.trueDisabled,
      required: this.root.trueRequired,
      name: this.root.trueName,
      value: this.root.value.current,
      "aria-hidden": "true",
      style: styleToString(srOnlyStyles)
    })));
    this.root = root;
  }
  get trueChecked() {
    return __privateGet(this, _trueChecked).call(this);
  }
  get shouldRender() {
    return __privateGet(this, _shouldRender).call(this);
  }
  get props() {
    return __privateGet(this, _props27).call(this);
  }
}
_trueChecked = new WeakMap();
_shouldRender = new WeakMap();
_props27 = new WeakMap();
function getCheckboxDataState(checked, indeterminate) {
  if (indeterminate) {
    return "indeterminate";
  }
  return checked ? "checked" : "unchecked";
}
const [
  setCheckboxGroupContext,
  getCheckboxGroupContext
] = createContext("Checkbox.Group");
const [
  setCheckboxRootContext,
  getCheckboxRootContext
] = createContext("Checkbox.Root");
function useCheckboxRoot(props) {
  return setCheckboxRootContext(new CheckboxRootState(props, getCheckboxGroupContext(null)));
}
function useCheckboxInput() {
  const root = getCheckboxRootContext();
  return new CheckboxInputState(root);
}
function Visually_hidden($$payload, $$props) {
  push();
  let {
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const style = {
    position: "absolute",
    border: 0,
    width: "1px",
    display: "inline-block",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal"
  };
  const mergedProps = mergeProps(restProps, { style });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></span>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Checkbox_input($$payload, $$props) {
  push();
  const inputState = useCheckboxInput();
  if (inputState.shouldRender) {
    $$payload.out += "<!--[-->";
    Visually_hidden($$payload, {
      "aria-hidden": "true",
      children: ($$payload2) => {
        $$payload2.out += `<input${spread_attributes({
          ...inputState.props,
          type: "checkbox",
          style: "display: none !important;"
        })}>`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Checkbox$1($$payload, $$props) {
  push();
  let {
    checked = false,
    ref = null,
    onCheckedChange,
    children,
    disabled = false,
    required = false,
    name = void 0,
    value = "on",
    id = useId(),
    controlledChecked = false,
    indeterminate = false,
    controlledIndeterminate = false,
    onIndeterminateChange,
    child,
    type = "button",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useCheckboxRoot({
    checked: box.with(() => checked, (v) => {
      if (controlledChecked) {
        onCheckedChange == null ? void 0 : onCheckedChange(v);
      } else {
        checked = v;
        onCheckedChange == null ? void 0 : onCheckedChange(v);
      }
    }),
    disabled: box.with(() => disabled ?? false),
    required: box.with(() => required),
    name: box.with(() => name),
    value: box.with(() => value),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    indeterminate: box.with(() => indeterminate, (v) => {
      if (controlledIndeterminate) {
        onIndeterminateChange == null ? void 0 : onIndeterminateChange(v);
      } else {
        indeterminate = v;
        onIndeterminateChange == null ? void 0 : onIndeterminateChange(v);
      }
    }),
    type: box.with(() => type)
  });
  const mergedProps = mergeProps({ ...restProps }, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...rootState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload, rootState.snippetProps);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]--> `;
  Checkbox_input($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { checked, ref, indeterminate });
  pop();
}
function get(valueOrGetValue) {
  return typeof valueOrGetValue === "function" ? valueOrGetValue() : valueOrGetValue;
}
function getDPR(element2) {
  if (typeof window === "undefined") return 1;
  const win = element2.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element2, value) {
  const dpr = getDPR(element2);
  return Math.round(value * dpr) / dpr;
}
function getFloatingContentCSSVars(name) {
  return {
    [`--bits-${name}-content-transform-origin`]: `var(--bits-floating-transform-origin)`,
    [`--bits-${name}-content-available-width`]: `var(--bits-floating-available-width)`,
    [`--bits-${name}-content-available-height`]: `var(--bits-floating-available-height)`,
    [`--bits-${name}-anchor-width`]: `var(--bits-floating-anchor-width)`,
    [`--bits-${name}-anchor-height`]: `var(--bits-floating-anchor-height)`
  };
}
function useFloating(options) {
  get(options.open) ?? true;
  const middlewareOption = get(options.middleware);
  const transformOption = get(options.transform) ?? true;
  const placementOption = get(options.placement) ?? "bottom";
  const strategyOption = get(options.strategy) ?? "absolute";
  const reference = options.reference;
  let x = 0;
  let y = 0;
  const floating = box(null);
  let strategy = strategyOption;
  let placement = placementOption;
  let middlewareData = {};
  let isPositioned = false;
  const floatingStyles = (() => {
    const initialStyles = { position: strategy, left: "0", top: "0" };
    if (!floating.current) {
      return initialStyles;
    }
    const xVal = roundByDPR(floating.current, x);
    const yVal = roundByDPR(floating.current, y);
    if (transformOption) {
      return {
        ...initialStyles,
        transform: `translate(${xVal}px, ${yVal}px)`,
        ...getDPR(floating.current) >= 1.5 && { willChange: "transform" }
      };
    }
    return {
      position: strategy,
      left: `${xVal}px`,
      top: `${yVal}px`
    };
  })();
  function update() {
    if (reference.current === null || floating.current === null) return;
    computePosition(reference.current, floating.current, {
      middleware: middlewareOption,
      placement: placementOption,
      strategy: strategyOption
    }).then((position) => {
      x = position.x;
      y = position.y;
      strategy = position.strategy;
      placement = position.placement;
      middlewareData = position.middlewareData;
      isPositioned = true;
    });
  }
  return {
    floating,
    reference,
    get strategy() {
      return strategy;
    },
    get placement() {
      return placement;
    },
    get middlewareData() {
      return middlewareData;
    },
    get isPositioned() {
      return isPositioned;
    },
    get floatingStyles() {
      return floatingStyles;
    },
    get update() {
      return update;
    }
  };
}
const OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
class FloatingRootState {
  constructor() {
    __publicField(this, "anchorNode", box(null));
    __publicField(this, "customAnchorNode", box(null));
    __publicField(this, "triggerNode", box(null));
  }
}
class FloatingContentState {
  constructor(props, root) {
    // state
    __publicField(this, "root");
    // nodes
    __publicField(this, "contentRef", box(null));
    __publicField(this, "wrapperRef", box(null));
    __publicField(this, "arrowRef", box(null));
    // ids
    __publicField(this, "arrowId", box(useId()));
    __publicField(this, "id");
    __publicField(this, "wrapperId");
    __publicField(this, "style");
    __privateAdd(this, _transformedStyle, once(() => {
      if (typeof this.style === "string") return cssToStyleObj(this.style);
      if (!this.style) return {};
    }));
    __privateAdd(this, _dir);
    __privateAdd(this, _side);
    __privateAdd(this, _sideOffset);
    __privateAdd(this, _align);
    __privateAdd(this, _alignOffset);
    __privateAdd(this, _arrowPadding);
    __privateAdd(this, _avoidCollisions);
    __privateAdd(this, _collisionBoundary);
    __privateAdd(this, _collisionPadding);
    __privateAdd(this, _sticky);
    __privateAdd(this, _hideWhenDetached);
    __privateAdd(this, _strategy);
    __privateAdd(this, _updatePositionStrategy);
    __publicField(this, "onPlaced");
    __publicField(this, "enabled");
    __privateAdd(this, _arrowSize, new ElementSize(() => this.arrowRef.current ?? void 0));
    __privateAdd(this, _arrowWidth, once(() => {
      var _a;
      return ((_a = __privateGet(this, _arrowSize)) == null ? void 0 : _a.width) ?? 0;
    }));
    __privateAdd(this, _arrowHeight, once(() => {
      var _a;
      return ((_a = __privateGet(this, _arrowSize)) == null ? void 0 : _a.height) ?? 0;
    }));
    __privateAdd(this, _desiredPlacement, once(() => {
      var _a;
      return ((_a = __privateGet(this, _side)) == null ? void 0 : _a.current) + (__privateGet(this, _align).current !== "center" ? `-${__privateGet(this, _align).current}` : "");
    }));
    __privateAdd(this, _boundary, once(() => Array.isArray(__privateGet(this, _collisionBoundary).current) ? __privateGet(this, _collisionBoundary).current : [__privateGet(this, _collisionBoundary).current]));
    __privateAdd(this, _hasExplicitBoundaries, once(() => __privateGet(this, _boundary).call(this).length > 0));
    __privateAdd(this, _detectOverflowOptions, once(() => ({
      padding: __privateGet(this, _collisionPadding).current,
      boundary: __privateGet(this, _boundary).call(this).filter(isNotNull),
      altBoundary: this.hasExplicitBoundaries
    })));
    __privateAdd(this, _availableWidth);
    __privateAdd(this, _availableHeight);
    __privateAdd(this, _anchorWidth);
    __privateAdd(this, _anchorHeight);
    __privateAdd(this, _middleware, once(() => [
      offset({
        mainAxis: __privateGet(this, _sideOffset).current + __privateGet(this, _arrowHeight).call(this),
        alignmentAxis: __privateGet(this, _alignOffset).current
      }),
      __privateGet(this, _avoidCollisions).current && shift({
        mainAxis: true,
        crossAxis: false,
        limiter: __privateGet(this, _sticky).current === "partial" ? limitShift() : void 0,
        ...this.detectOverflowOptions
      }),
      __privateGet(this, _avoidCollisions).current && flip({ ...this.detectOverflowOptions }),
      size({
        ...this.detectOverflowOptions,
        apply: ({ rects, availableWidth, availableHeight }) => {
          const { width: anchorWidth, height: anchorHeight } = rects.reference;
          __privateSet(this, _availableWidth, availableWidth);
          __privateSet(this, _availableHeight, availableHeight);
          __privateSet(this, _anchorWidth, anchorWidth);
          __privateSet(this, _anchorHeight, anchorHeight);
        }
      }),
      this.arrowRef.current && arrow({
        element: this.arrowRef.current,
        padding: __privateGet(this, _arrowPadding).current
      }),
      transformOrigin({
        arrowWidth: __privateGet(this, _arrowWidth).call(this),
        arrowHeight: __privateGet(this, _arrowHeight).call(this)
      }),
      __privateGet(this, _hideWhenDetached).current && hide({
        strategy: "referenceHidden",
        ...this.detectOverflowOptions
      })
    ].filter(Boolean)));
    __publicField(this, "floating");
    __privateAdd(this, _placedSide, once(() => getSideFromPlacement(this.floating.placement)));
    __privateAdd(this, _placedAlign, once(() => getAlignFromPlacement(this.floating.placement)));
    __privateAdd(this, _arrowX, once(() => {
      var _a;
      return ((_a = this.floating.middlewareData.arrow) == null ? void 0 : _a.x) ?? 0;
    }));
    __privateAdd(this, _arrowY, once(() => {
      var _a;
      return ((_a = this.floating.middlewareData.arrow) == null ? void 0 : _a.y) ?? 0;
    }));
    __privateAdd(this, _cannotCenterArrow, once(() => {
      var _a;
      return ((_a = this.floating.middlewareData.arrow) == null ? void 0 : _a.centerOffset) !== 0;
    }));
    __publicField(this, "contentZIndex");
    __privateAdd(this, _arrowBaseSide, once(() => OPPOSITE_SIDE[this.placedSide]));
    __privateAdd(this, _wrapperProps2, once(() => {
      var _a, _b, _c;
      return {
        id: this.wrapperId.current,
        "data-bits-floating-content-wrapper": "",
        style: {
          ...this.floating.floatingStyles,
          // keep off page when measuring
          transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: this.contentZIndex,
          "--bits-floating-transform-origin": `${(_a = this.floating.middlewareData.transformOrigin) == null ? void 0 : _a.x} ${(_b = this.floating.middlewareData.transformOrigin) == null ? void 0 : _b.y}`,
          "--bits-floating-available-width": `${__privateGet(this, _availableWidth)}px`,
          "--bits-floating-available-height": `${__privateGet(this, _availableHeight)}px`,
          "--bits-floating-anchor-width": `${__privateGet(this, _anchorWidth)}px`,
          "--bits-floating-anchor-height": `${__privateGet(this, _anchorHeight)}px`,
          // hide the content if using the hide middleware and should be hidden
          ...((_c = this.floating.middlewareData.hide) == null ? void 0 : _c.referenceHidden) && {
            visibility: "hidden",
            "pointer-events": "none"
          },
          ...__privateGet(this, _transformedStyle).call(this)
        },
        // Floating UI calculates logical alignment based the `dir` attribute
        dir: __privateGet(this, _dir).current
      };
    }));
    __privateAdd(this, _props28, once(() => ({
      "data-side": this.placedSide,
      "data-align": this.placedAlign,
      style: styleToString({
        ...__privateGet(this, _transformedStyle).call(this)
        // if the FloatingContent hasn't been placed yet (not all measurements done)
      })
    })));
    __privateAdd(this, _arrowStyle, once(() => ({
      position: "absolute",
      left: this.arrowX ? `${this.arrowX}px` : void 0,
      top: this.arrowY ? `${this.arrowY}px` : void 0,
      [this.arrowBaseSide]: 0,
      "transform-origin": {
        top: "",
        right: "0 0",
        bottom: "center 0",
        left: "100% 0"
      }[this.placedSide],
      transform: {
        top: "translateY(100%)",
        right: "translateY(50%) rotate(90deg) translateX(-50%)",
        bottom: "rotate(180deg)",
        left: "translateY(50%) rotate(-90deg) translateX(50%)"
      }[this.placedSide],
      visibility: this.cannotCenterArrow ? "hidden" : void 0
    })));
    this.id = props.id;
    __privateSet(this, _side, props.side);
    __privateSet(this, _sideOffset, props.sideOffset);
    __privateSet(this, _align, props.align);
    __privateSet(this, _alignOffset, props.alignOffset);
    __privateSet(this, _arrowPadding, props.arrowPadding);
    __privateSet(this, _avoidCollisions, props.avoidCollisions);
    __privateSet(this, _collisionBoundary, props.collisionBoundary);
    __privateSet(this, _collisionPadding, props.collisionPadding);
    __privateSet(this, _sticky, props.sticky);
    __privateSet(this, _hideWhenDetached, props.hideWhenDetached);
    __privateSet(this, _updatePositionStrategy, props.updatePositionStrategy);
    this.onPlaced = props.onPlaced;
    __privateSet(this, _strategy, props.strategy);
    __privateSet(this, _dir, props.dir);
    this.style = props.style;
    this.root = root;
    this.enabled = props.enabled;
    this.wrapperId = props.wrapperId;
    if (props.customAnchor) {
      this.root.customAnchorNode.current = props.customAnchor.current;
    }
    useRefById({
      id: this.wrapperId,
      ref: this.wrapperRef,
      deps: () => this.enabled.current
    });
    useRefById({
      id: this.id,
      ref: this.contentRef,
      deps: () => this.enabled.current
    });
    this.floating = useFloating({
      strategy: () => __privateGet(this, _strategy).current,
      placement: () => __privateGet(this, _desiredPlacement).call(this),
      middleware: () => this.middleware,
      reference: this.root.anchorNode,
      whileElementsMounted: (...args) => {
        var _a;
        const cleanup = autoUpdate(...args, {
          animationFrame: ((_a = __privateGet(this, _updatePositionStrategy)) == null ? void 0 : _a.current) === "always"
        });
        return cleanup;
      },
      open: () => this.enabled.current
    });
  }
  get hasExplicitBoundaries() {
    return __privateGet(this, _hasExplicitBoundaries).call(this);
  }
  get detectOverflowOptions() {
    return __privateGet(this, _detectOverflowOptions).call(this);
  }
  get middleware() {
    return __privateGet(this, _middleware).call(this);
  }
  get placedSide() {
    return __privateGet(this, _placedSide).call(this);
  }
  get placedAlign() {
    return __privateGet(this, _placedAlign).call(this);
  }
  get arrowX() {
    return __privateGet(this, _arrowX).call(this);
  }
  get arrowY() {
    return __privateGet(this, _arrowY).call(this);
  }
  get cannotCenterArrow() {
    return __privateGet(this, _cannotCenterArrow).call(this);
  }
  get arrowBaseSide() {
    return __privateGet(this, _arrowBaseSide).call(this);
  }
  get wrapperProps() {
    return __privateGet(this, _wrapperProps2).call(this);
  }
  get props() {
    return __privateGet(this, _props28).call(this);
  }
  get arrowStyle() {
    return __privateGet(this, _arrowStyle).call(this);
  }
}
_transformedStyle = new WeakMap();
_dir = new WeakMap();
_side = new WeakMap();
_sideOffset = new WeakMap();
_align = new WeakMap();
_alignOffset = new WeakMap();
_arrowPadding = new WeakMap();
_avoidCollisions = new WeakMap();
_collisionBoundary = new WeakMap();
_collisionPadding = new WeakMap();
_sticky = new WeakMap();
_hideWhenDetached = new WeakMap();
_strategy = new WeakMap();
_updatePositionStrategy = new WeakMap();
_arrowSize = new WeakMap();
_arrowWidth = new WeakMap();
_arrowHeight = new WeakMap();
_desiredPlacement = new WeakMap();
_boundary = new WeakMap();
_hasExplicitBoundaries = new WeakMap();
_detectOverflowOptions = new WeakMap();
_availableWidth = new WeakMap();
_availableHeight = new WeakMap();
_anchorWidth = new WeakMap();
_anchorHeight = new WeakMap();
_middleware = new WeakMap();
_placedSide = new WeakMap();
_placedAlign = new WeakMap();
_arrowX = new WeakMap();
_arrowY = new WeakMap();
_cannotCenterArrow = new WeakMap();
_arrowBaseSide = new WeakMap();
_wrapperProps2 = new WeakMap();
_props28 = new WeakMap();
_arrowStyle = new WeakMap();
class FloatingAnchorState {
  constructor(props, root) {
    __publicField(this, "ref", box(null));
    if (props.virtualEl && props.virtualEl.current) {
      root.triggerNode = box.from(props.virtualEl.current);
    } else {
      useRefById({
        id: props.id,
        ref: this.ref,
        onRefChange: (node) => {
          root.triggerNode.current = node;
        }
      });
    }
  }
}
const [
  setFloatingRootContext,
  getFloatingRootContext
] = createContext("Floating.Root");
const [
  setFloatingContentContext,
  getFloatingContentContext
] = createContext("Floating.Content");
function useFloatingRootState() {
  return setFloatingRootContext(new FloatingRootState());
}
function useFloatingContentState(props) {
  return setFloatingContentContext(new FloatingContentState(props, getFloatingRootContext()));
}
function useFloatingAnchorState(props) {
  return new FloatingAnchorState(props, getFloatingRootContext());
}
function transformOrigin(options) {
  return {
    name: "transformOrigin",
    options,
    fn(data) {
      var _a, _b, _c;
      const { placement, rects, middlewareData } = data;
      const cannotCenterArrow = ((_a = middlewareData.arrow) == null ? void 0 : _a.centerOffset) !== 0;
      const isArrowHidden = cannotCenterArrow;
      const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
      const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
      const arrowXCenter = (((_b = middlewareData.arrow) == null ? void 0 : _b.x) ?? 0) + arrowWidth / 2;
      const arrowYCenter = (((_c = middlewareData.arrow) == null ? void 0 : _c.y) ?? 0) + arrowHeight / 2;
      let x = "";
      let y = "";
      if (placedSide === "bottom") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${-arrowHeight}px`;
      } else if (placedSide === "top") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${rects.floating.height + arrowHeight}px`;
      } else if (placedSide === "right") {
        x = `${-arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      } else if (placedSide === "left") {
        x = `${rects.floating.width + arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      }
      return { data: { x, y } };
    }
  };
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
function getSideFromPlacement(placement) {
  return getSideAndAlignFromPlacement(placement)[0];
}
function getAlignFromPlacement(placement) {
  return getSideAndAlignFromPlacement(placement)[1];
}
function Floating_layer($$payload, $$props) {
  push();
  let { children } = $$props;
  useFloatingRootState();
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function Floating_layer_anchor($$payload, $$props) {
  push();
  let { id, children, virtualEl } = $$props;
  useFloatingAnchorState({
    id: box.with(() => id),
    virtualEl: box.with(() => virtualEl)
  });
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function Floating_layer_content($$payload, $$props) {
  push();
  let {
    content,
    side = "bottom",
    sideOffset = 0,
    align = "center",
    alignOffset = 0,
    id,
    arrowPadding = 0,
    avoidCollisions = true,
    collisionBoundary = [],
    collisionPadding = 0,
    hideWhenDetached = false,
    onPlaced = () => {
    },
    sticky = "partial",
    updatePositionStrategy = "optimized",
    strategy = "fixed",
    dir = "ltr",
    style = {},
    wrapperId = useId(),
    customAnchor = null
  } = $$props;
  const contentState = useFloatingContentState({
    side: box.with(() => side),
    sideOffset: box.with(() => sideOffset),
    align: box.with(() => align),
    alignOffset: box.with(() => alignOffset),
    id: box.with(() => id),
    arrowPadding: box.with(() => arrowPadding),
    avoidCollisions: box.with(() => avoidCollisions),
    collisionBoundary: box.with(() => collisionBoundary),
    collisionPadding: box.with(() => collisionPadding),
    hideWhenDetached: box.with(() => hideWhenDetached),
    onPlaced: box.with(() => onPlaced),
    sticky: box.with(() => sticky),
    updatePositionStrategy: box.with(() => updatePositionStrategy),
    strategy: box.with(() => strategy),
    dir: box.with(() => dir),
    style: box.with(() => style),
    enabled: box.with(() => false),
    wrapperId: box.with(() => wrapperId),
    customAnchor: box.with(() => customAnchor)
  });
  const mergedProps = mergeProps(contentState.wrapperProps, { style: { pointerEvents: "auto" } });
  content == null ? void 0 : content($$payload, {
    props: contentState.props,
    wrapperProps: mergedProps
  });
  $$payload.out += `<!---->`;
  pop();
}
function Floating_layer_content_static($$payload, $$props) {
  push();
  let { content, onPlaced } = $$props;
  content == null ? void 0 : content($$payload, { props: {}, wrapperProps: {} });
  $$payload.out += `<!---->`;
  pop();
}
function Popper_content($$payload, $$props) {
  let {
    content,
    isStatic = false,
    onPlaced,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (isStatic) {
    $$payload.out += "<!--[-->";
    Floating_layer_content_static($$payload, { content, onPlaced });
  } else {
    $$payload.out += "<!--[!-->";
    Floating_layer_content($$payload, spread_props([{ content, onPlaced }, restProps]));
  }
  $$payload.out += `<!--]-->`;
}
function Popper_layer_inner($$payload, $$props) {
  push();
  let {
    popper,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    enabled,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  {
    let content = function($$payload2, { props: floatingProps, wrapperProps }) {
      if (restProps.forceMount && enabled) {
        $$payload2.out += "<!--[-->";
        Scroll_lock($$payload2, { preventScroll });
      } else {
        $$payload2.out += "<!--[!-->";
        if (!restProps.forceMount) {
          $$payload2.out += "<!--[-->";
          Scroll_lock($$payload2, { preventScroll });
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!--]--> `;
      {
        let focusScope = function($$payload3, { props: focusScopeProps }) {
          Escape_layer($$payload3, {
            onEscapeKeydown,
            escapeKeydownBehavior,
            enabled,
            children: ($$payload4) => {
              {
                let children = function($$payload5, { props: dismissibleProps }) {
                  Text_selection_layer($$payload5, {
                    id,
                    preventOverflowTextSelection,
                    onPointerDown,
                    onPointerUp,
                    enabled,
                    children: ($$payload6) => {
                      popper == null ? void 0 : popper($$payload6, {
                        props: mergeProps(restProps, floatingProps, dismissibleProps, focusScopeProps, { style: { pointerEvents: "auto" } }),
                        wrapperProps
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                };
                Dismissible_layer($$payload4, {
                  id,
                  onInteractOutside,
                  onFocusOutside,
                  interactOutsideBehavior,
                  isValidEvent: isValidEvent2,
                  enabled,
                  children,
                  $$slots: { default: true }
                });
              }
            },
            $$slots: { default: true }
          });
        };
        Focus_scope($$payload2, {
          id,
          onOpenAutoFocus,
          onCloseAutoFocus,
          loop,
          trapFocus: enabled && trapFocus,
          forceMount: restProps.forceMount,
          focusScope,
          $$slots: { focusScope: true }
        });
      }
      $$payload2.out += `<!---->`;
    };
    Popper_content($$payload, {
      isStatic,
      id,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      avoidCollisions,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      updatePositionStrategy,
      strategy,
      dir,
      wrapperId,
      style,
      onPlaced,
      customAnchor,
      content,
      $$slots: { content: true }
    });
  }
  pop();
}
function Popper_layer($$payload, $$props) {
  let {
    popper,
    present,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  {
    let presence = function($$payload2, { present: present2 }) {
      Popper_layer_inner($$payload2, spread_props([
        {
          popper,
          onEscapeKeydown,
          escapeKeydownBehavior,
          preventOverflowTextSelection,
          id,
          onPointerDown,
          onPointerUp,
          side,
          sideOffset,
          align,
          alignOffset,
          arrowPadding,
          avoidCollisions,
          collisionBoundary,
          collisionPadding,
          sticky,
          hideWhenDetached,
          updatePositionStrategy,
          strategy,
          dir,
          preventScroll,
          wrapperId,
          style,
          onPlaced,
          customAnchor,
          isStatic,
          enabled: present2.current,
          onInteractOutside,
          onCloseAutoFocus,
          onOpenAutoFocus,
          interactOutsideBehavior,
          loop,
          trapFocus,
          isValidEvent: isValidEvent2,
          onFocusOutside,
          forceMount: false
        },
        restProps
      ]));
    };
    Presence_layer($$payload, spread_props([
      { id, present },
      restProps,
      { presence, $$slots: { presence: true } }
    ]));
  }
}
function Popper_layer_force_mount($$payload, $$props) {
  let {
    popper,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    enabled,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  Popper_layer_inner($$payload, spread_props([
    {
      popper,
      onEscapeKeydown,
      escapeKeydownBehavior,
      preventOverflowTextSelection,
      id,
      onPointerDown,
      onPointerUp,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      avoidCollisions,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      updatePositionStrategy,
      strategy,
      dir,
      preventScroll,
      wrapperId,
      style,
      onPlaced,
      customAnchor,
      isStatic,
      enabled,
      onInteractOutside,
      onCloseAutoFocus,
      onOpenAutoFocus,
      interactOutsideBehavior,
      loop,
      trapFocus,
      isValidEvent: isValidEvent2,
      onFocusOutside
    },
    restProps,
    { forceMount: true }
  ]));
}
function findNextSibling(el, selector) {
  let sibling = el.nextElementSibling;
  while (sibling) {
    if (sibling.matches(selector))
      return sibling;
    sibling = sibling.nextElementSibling;
  }
}
function findPreviousSibling(el, selector) {
  let sibling = el.previousElementSibling;
  while (sibling) {
    if (sibling.matches(selector))
      return sibling;
    sibling = sibling.previousElementSibling;
  }
}
const SCORE_CONTINUE_MATCH = 1;
const SCORE_SPACE_WORD_JUMP = 0.9;
const SCORE_NON_SPACE_WORD_JUMP = 0.8;
const SCORE_CHARACTER_JUMP = 0.17;
const SCORE_TRANSPOSITION = 0.1;
const PENALTY_SKIPPED = 0.999;
const PENALTY_CASE_MISMATCH = 0.9999;
const PENALTY_NOT_COMPLETE = 0.99;
const IS_GAP_REGEXP = /[\\/_+.#"@[({&]/;
const COUNT_GAPS_REGEXP = /[\\/_+.#"@[({&]/g;
const IS_SPACE_REGEXP = /[\s-]/;
const COUNT_SPACE_REGEXP = /[\s-]/g;
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
          score *= PENALTY_SKIPPED ** wordBreaks.length;
        }
      } else if (IS_SPACE_REGEXP.test(string.charAt(index - 1))) {
        score *= SCORE_SPACE_WORD_JUMP;
        spaceBreaks = string.slice(stringIndex, index - 1).match(COUNT_SPACE_REGEXP);
        if (spaceBreaks && stringIndex > 0) {
          score *= PENALTY_SKIPPED ** spaceBreaks.length;
        }
      } else {
        score *= SCORE_CHARACTER_JUMP;
        if (stringIndex > 0) {
          score *= PENALTY_SKIPPED ** (index - stringIndex);
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
function commandScore(string, abbreviation, aliases) {
  string = aliases && aliases.length > 0 ? `${`${string} ${aliases == null ? void 0 : aliases.join(" ")}`}` : string;
  return commandScoreInner(string, abbreviation, formatInput(string), formatInput(abbreviation), 0, 0, {});
}
function getFirstNonCommentChild(element2) {
  if (!element2)
    return null;
  for (const child of element2.childNodes) {
    if (child.nodeType !== Node.COMMENT_NODE) {
      return child;
    }
  }
  return null;
}
const ROOT_ATTR$2 = "data-command-root";
const INPUT_ATTR = "data-command-input";
const EMPTY_ATTR = "data-command-empty";
const GROUP_ATTR = "data-command-group";
const GROUP_ITEMS_ATTR = "data-command-group-items";
const GROUP_HEADING_ATTR = "data-command-group-heading";
const ITEM_ATTR = "data-command-item";
const VALUE_ATTR = `data-value`;
const INPUT_LABEL_ATTR = "data-command-input-label";
const GROUP_SELECTOR = `[${GROUP_ATTR}]`;
const GROUP_ITEMS_SELECTOR = `[${GROUP_ITEMS_ATTR}]`;
const GROUP_HEADING_SELECTOR = `[${GROUP_HEADING_ATTR}]`;
const ITEM_SELECTOR = `[${ITEM_ATTR}]`;
const VALID_ITEM_SELECTOR = `${ITEM_SELECTOR}:not([aria-disabled="true"])`;
function defaultFilter(value, search, keywords) {
  return commandScore(value, search, keywords);
}
const [setCommandRootContext, getCommandRootContext] = createContext("Command.Root");
createContext("Command.List");
const [
  setCommandGroupContainerContext,
  getCommandGroupContainerContext
] = createContext("Command.Group");
class CommandRootState {
  constructor(props) {
    __privateAdd(this, _CommandRootState_instances);
    __privateAdd(this, _updateScheduled, false);
    __publicField(this, "allItems", /* @__PURE__ */ new Set());
    __publicField(this, "allGroups", /* @__PURE__ */ new Map());
    __publicField(this, "allIds", /* @__PURE__ */ new Map());
    __publicField(this, "id");
    __publicField(this, "ref");
    __publicField(this, "filter");
    __publicField(this, "shouldFilter");
    __publicField(this, "onStateChange");
    __publicField(this, "loop");
    // attempt to prevent the harsh delay when user is typing fast
    __publicField(this, "key", 0);
    __publicField(this, "viewportNode", null);
    __publicField(this, "inputNode", null);
    __publicField(this, "labelNode", null);
    __publicField(this, "valueProp");
    __privateAdd(this, _vimBindings);
    __publicField(this, "disablePointerSelection");
    // published state that the components and other things can react to
    __publicField(this, "commandState", null);
    // internal state that we mutate in batches and publish to the `state` at once
    __publicField(this, "_commandState", null);
    __privateAdd(this, _props29, once(() => ({
      id: this.id.current,
      role: "application",
      [ROOT_ATTR$2]: "",
      tabindex: -1,
      onkeydown: this.onkeydown
    })));
    this.id = props.id;
    this.ref = props.ref;
    this.filter = props.filter;
    this.shouldFilter = props.shouldFilter;
    this.loop = props.loop;
    this.valueProp = props.value;
    __privateSet(this, _vimBindings, props.vimBindings);
    this.disablePointerSelection = props.disablePointerSelection;
    this.onStateChange = props.onStateChange;
    const defaultState = {
      /** Value of the search query */
      search: "",
      /** Currently selected item value */
      value: this.valueProp.current ?? "",
      filtered: {
        /** The count of all visible items. */
        count: 0,
        /** Map from visible item id to its search store. */
        items: /* @__PURE__ */ new Map(),
        /** Set of groups with at least one visible item. */
        groups: /* @__PURE__ */ new Set()
      }
    };
    this._commandState = defaultState;
    this.commandState = defaultState;
    useRefById({ id: this.id, ref: this.ref });
    this.onkeydown = this.onkeydown.bind(this);
  }
  setState(key, value, opts) {
    if (Object.is(this._commandState[key], value)) return;
    this._commandState[key] = value;
    if (key === "search") {
      __privateMethod(this, _CommandRootState_instances, filterItems_fn).call(this);
      __privateMethod(this, _CommandRootState_instances, sort_fn).call(this);
      __privateMethod(this, _CommandRootState_instances, selectFirstItem_fn).call(this);
    } else if (key === "value") {
      if (!opts) {
        __privateMethod(this, _CommandRootState_instances, scrollSelectedIntoView_fn).call(this);
      }
    }
    __privateMethod(this, _CommandRootState_instances, scheduleUpdate_fn).call(this);
  }
  setValue(value, opts) {
    if (value !== this.valueProp.current && value === "") {
      afterTick(() => {
        this.key++;
      });
    }
    this.setState("value", value, opts);
    this.valueProp.current = value;
  }
  // keep id -> { value, keywords } mapping up to date
  registerValue(id, value, keywords) {
    var _a;
    if (value === ((_a = this.allIds.get(id)) == null ? void 0 : _a.value)) return;
    this.allIds.set(id, { value, keywords });
    this._commandState.filtered.items.set(id, __privateMethod(this, _CommandRootState_instances, score_fn).call(this, value, keywords));
    __privateMethod(this, _CommandRootState_instances, sort_fn).call(this);
    return () => {
      this.allIds.delete(id);
    };
  }
  registerItem(id, groupId) {
    this.allItems.add(id);
    if (groupId) {
      if (!this.allGroups.has(groupId)) {
        this.allGroups.set(groupId, /* @__PURE__ */ new Set([id]));
      } else {
        this.allGroups.get(groupId).add(id);
      }
    }
    __privateMethod(this, _CommandRootState_instances, filterItems_fn).call(this);
    __privateMethod(this, _CommandRootState_instances, sort_fn).call(this);
    __privateMethod(this, _CommandRootState_instances, scheduleUpdate_fn).call(this);
    return () => {
      this.allIds.delete(id);
      this.allItems.delete(id);
      this.commandState.filtered.items.delete(id);
      const selectedItem = __privateMethod(this, _CommandRootState_instances, getSelectedItem_fn).call(this);
      __privateMethod(this, _CommandRootState_instances, filterItems_fn).call(this);
      if ((selectedItem == null ? void 0 : selectedItem.getAttribute("id")) === id) __privateMethod(this, _CommandRootState_instances, selectFirstItem_fn).call(this);
      __privateMethod(this, _CommandRootState_instances, scheduleUpdate_fn).call(this);
    };
  }
  registerGroup(id) {
    if (!this.allGroups.has(id)) {
      this.allGroups.set(id, /* @__PURE__ */ new Set());
    }
    return () => {
      this.allIds.delete(id);
      this.allGroups.delete(id);
    };
  }
  onkeydown(e) {
    switch (e.key) {
      case n:
      case j: {
        if (__privateGet(this, _vimBindings).current && e.ctrlKey) {
          __privateMethod(this, _CommandRootState_instances, next_fn).call(this, e);
        }
        break;
      }
      case ARROW_DOWN:
        __privateMethod(this, _CommandRootState_instances, next_fn).call(this, e);
        break;
      case p:
      case k: {
        if (__privateGet(this, _vimBindings).current && e.ctrlKey) {
          __privateMethod(this, _CommandRootState_instances, prev_fn).call(this, e);
        }
        break;
      }
      case ARROW_UP:
        __privateMethod(this, _CommandRootState_instances, prev_fn).call(this, e);
        break;
      case HOME:
        e.preventDefault();
        __privateMethod(this, _CommandRootState_instances, updateSelectedToIndex_fn).call(this, 0);
        break;
      case END:
        e.preventDefault();
        __privateMethod(this, _CommandRootState_instances, last_fn).call(this);
        break;
      case ENTER: {
        if (!e.isComposing && e.keyCode !== 229) {
          e.preventDefault();
          const item = __privateMethod(this, _CommandRootState_instances, getSelectedItem_fn).call(this);
          if (item) {
            item == null ? void 0 : item.click();
          }
        }
      }
    }
  }
  get props() {
    return __privateGet(this, _props29).call(this);
  }
}
_updateScheduled = new WeakMap();
_vimBindings = new WeakMap();
_CommandRootState_instances = new WeakSet();
snapshot_fn = function() {
  return this._commandState;
};
scheduleUpdate_fn = function() {
  if (__privateGet(this, _updateScheduled)) return;
  __privateSet(this, _updateScheduled, true);
  afterTick(() => {
    var _a, _b;
    __privateSet(this, _updateScheduled, false);
    const currentState = __privateMethod(this, _CommandRootState_instances, snapshot_fn).call(this);
    const hasStateChanged = !Object.is(this.commandState, currentState);
    if (hasStateChanged) {
      this.commandState = currentState;
      (_b = (_a = this.onStateChange) == null ? void 0 : _a.current) == null ? void 0 : _b.call(_a, snapshot(currentState));
    }
  });
};
score_fn = function(value, keywords) {
  const filter = this.filter.current ?? defaultFilter;
  const score = value ? filter(value, this._commandState.search, keywords) : 0;
  return score;
};
sort_fn = function() {
  var _a;
  if (!this._commandState.search || this.shouldFilter.current === false) {
    if (!this.commandState.value) __privateMethod(this, _CommandRootState_instances, selectFirstItem_fn).call(this);
    return;
  }
  const scores = this._commandState.filtered.items;
  const groups = [];
  for (const value of this._commandState.filtered.groups) {
    const items = this.allGroups.get(value);
    let max = 0;
    if (!items) {
      groups.push([value, max]);
      continue;
    }
    for (const item of items) {
      const score = scores.get(item);
      max = Math.max(score ?? 0, max);
    }
    groups.push([value, max]);
  }
  const listInsertionElement = this.viewportNode;
  const sorted = __privateMethod(this, _CommandRootState_instances, getValidItems_fn).call(this).sort((a, b) => {
    const valueA = a.getAttribute("id");
    const valueB = b.getAttribute("id");
    const scoresA = scores.get(valueA) ?? 0;
    const scoresB = scores.get(valueB) ?? 0;
    return scoresB - scoresA;
  });
  for (const item of sorted) {
    const group = item.closest(GROUP_ITEMS_SELECTOR);
    if (group) {
      const itemToAppend = item.parentElement === group ? item : item.closest(`${GROUP_ITEMS_SELECTOR} > *`);
      if (itemToAppend) {
        group.appendChild(itemToAppend);
      }
    } else {
      const itemToAppend = item.parentElement === listInsertionElement ? item : item.closest(`${GROUP_ITEMS_SELECTOR} > *`);
      if (itemToAppend) {
        listInsertionElement == null ? void 0 : listInsertionElement.appendChild(itemToAppend);
      }
    }
  }
  const sortedGroups = groups.sort((a, b) => b[1] - a[1]);
  for (const group of sortedGroups) {
    const element2 = listInsertionElement == null ? void 0 : listInsertionElement.querySelector(`${GROUP_SELECTOR}[${VALUE_ATTR}="${encodeURIComponent(group[0])}"]`);
    (_a = element2 == null ? void 0 : element2.parentElement) == null ? void 0 : _a.appendChild(element2);
  }
};
selectFirstItem_fn = function() {
  afterTick(() => {
    const item = __privateMethod(this, _CommandRootState_instances, getValidItems_fn).call(this).find((item2) => item2.getAttribute("aria-disabled") !== "true");
    const value = item == null ? void 0 : item.getAttribute(VALUE_ATTR);
    this.setValue(value || "");
  });
};
filterItems_fn = function() {
  var _a, _b;
  if (!this._commandState.search || this.shouldFilter.current === false) {
    this._commandState.filtered.count = this.allItems.size;
    return;
  }
  this._commandState.filtered.groups = /* @__PURE__ */ new Set();
  let itemCount = 0;
  for (const id of this.allItems) {
    const value = ((_a = this.allIds.get(id)) == null ? void 0 : _a.value) ?? "";
    const keywords = ((_b = this.allIds.get(id)) == null ? void 0 : _b.keywords) ?? [];
    const rank = __privateMethod(this, _CommandRootState_instances, score_fn).call(this, value, keywords);
    this._commandState.filtered.items.set(id, rank);
    if (rank > 0) itemCount++;
  }
  for (const [groupId, group] of this.allGroups) {
    for (const itemId of group) {
      const currItem = this._commandState.filtered.items.get(itemId);
      if (currItem && currItem > 0) {
        this._commandState.filtered.groups.add(groupId);
        break;
      }
    }
  }
  this._commandState.filtered.count = itemCount;
};
getValidItems_fn = function() {
  const node = this.ref.current;
  if (!node) return [];
  const validItems = Array.from(node.querySelectorAll(VALID_ITEM_SELECTOR)).filter((el) => !!el);
  return validItems;
};
getSelectedItem_fn = function() {
  const node = this.ref.current;
  if (!node) return;
  const selectedNode = node.querySelector(`${VALID_ITEM_SELECTOR}[aria-selected="true"]`);
  if (!selectedNode) return;
  return selectedNode;
};
scrollSelectedIntoView_fn = function() {
  afterSleep(1, () => {
    var _a, _b, _c, _d, _e;
    const item = __privateMethod(this, _CommandRootState_instances, getSelectedItem_fn).call(this);
    if (!item) return;
    const grandparent = (_a = item.parentElement) == null ? void 0 : _a.parentElement;
    if (!grandparent) return;
    const firstChildOfParent = getFirstNonCommentChild(grandparent);
    if (firstChildOfParent && ((_b = firstChildOfParent.dataset) == null ? void 0 : _b.value) === ((_c = item.dataset) == null ? void 0 : _c.value)) {
      (_e = (_d = item == null ? void 0 : item.closest(GROUP_SELECTOR)) == null ? void 0 : _d.querySelector(GROUP_HEADING_SELECTOR)) == null ? void 0 : _e.scrollIntoView({ block: "nearest" });
      return;
    }
    item.scrollIntoView({ block: "nearest" });
  });
};
updateSelectedToIndex_fn = function(index) {
  const items = __privateMethod(this, _CommandRootState_instances, getValidItems_fn).call(this);
  const item = items[index];
  if (item) {
    this.setValue(item.getAttribute(VALUE_ATTR) ?? "");
  }
};
updateSelectedByItem_fn = function(change) {
  const selected = __privateMethod(this, _CommandRootState_instances, getSelectedItem_fn).call(this);
  const items = __privateMethod(this, _CommandRootState_instances, getValidItems_fn).call(this);
  const index = items.findIndex((item) => item === selected);
  let newSelected = items[index + change];
  if (this.loop.current) {
    newSelected = index + change < 0 ? items[items.length - 1] : index + change === items.length ? items[0] : items[index + change];
  }
  if (newSelected) {
    this.setValue(newSelected.getAttribute(VALUE_ATTR) ?? "");
  }
};
updateSelectedByGroup_fn = function(change) {
  const selected = __privateMethod(this, _CommandRootState_instances, getSelectedItem_fn).call(this);
  let group = selected == null ? void 0 : selected.closest(GROUP_SELECTOR);
  let item;
  while (group && !item) {
    group = change > 0 ? findNextSibling(group, GROUP_SELECTOR) : findPreviousSibling(group, GROUP_SELECTOR);
    item = group == null ? void 0 : group.querySelector(VALID_ITEM_SELECTOR);
  }
  if (item) {
    this.setValue(item.getAttribute(VALUE_ATTR) ?? "");
  } else {
    __privateMethod(this, _CommandRootState_instances, updateSelectedByItem_fn).call(this, change);
  }
};
last_fn = function() {
  return __privateMethod(this, _CommandRootState_instances, updateSelectedToIndex_fn).call(this, __privateMethod(this, _CommandRootState_instances, getValidItems_fn).call(this).length - 1);
};
next_fn = function(e) {
  e.preventDefault();
  if (e.metaKey) {
    __privateMethod(this, _CommandRootState_instances, last_fn).call(this);
  } else if (e.altKey) {
    __privateMethod(this, _CommandRootState_instances, updateSelectedByGroup_fn).call(this, 1);
  } else {
    __privateMethod(this, _CommandRootState_instances, updateSelectedByItem_fn).call(this, 1);
  }
};
prev_fn = function(e) {
  e.preventDefault();
  if (e.metaKey) {
    __privateMethod(this, _CommandRootState_instances, updateSelectedToIndex_fn).call(this, 0);
  } else if (e.altKey) {
    __privateMethod(this, _CommandRootState_instances, updateSelectedByGroup_fn).call(this, -1);
  } else {
    __privateMethod(this, _CommandRootState_instances, updateSelectedByItem_fn).call(this, -1);
  }
};
_props29 = new WeakMap();
class CommandEmptyState {
  constructor(props, root) {
    __privateAdd(this, _ref16);
    __privateAdd(this, _id16);
    __privateAdd(this, _root7);
    __privateAdd(this, _forceMount2);
    __privateAdd(this, _isInitialRender, true);
    __privateAdd(this, _shouldRender2, once(() => __privateGet(this, _root7)._commandState.filtered.count === 0 && __privateGet(this, _isInitialRender) === false || __privateGet(this, _forceMount2).current));
    __privateAdd(this, _props30, once(() => ({
      id: __privateGet(this, _id16).current,
      role: "presentation",
      [EMPTY_ATTR]: ""
    })));
    __privateSet(this, _ref16, props.ref);
    __privateSet(this, _id16, props.id);
    __privateSet(this, _root7, root);
    __privateSet(this, _forceMount2, props.forceMount);
    useRefById({
      id: __privateGet(this, _id16),
      ref: __privateGet(this, _ref16),
      deps: () => this.shouldRender
    });
  }
  get shouldRender() {
    return __privateGet(this, _shouldRender2).call(this);
  }
  get props() {
    return __privateGet(this, _props30).call(this);
  }
}
_ref16 = new WeakMap();
_id16 = new WeakMap();
_root7 = new WeakMap();
_forceMount2 = new WeakMap();
_isInitialRender = new WeakMap();
_shouldRender2 = new WeakMap();
_props30 = new WeakMap();
class CommandGroupContainerState {
  constructor(props, root) {
    __privateAdd(this, _ref17);
    __publicField(this, "id");
    __publicField(this, "forceMount");
    __privateAdd(this, _value3);
    __privateAdd(this, _root8);
    __publicField(this, "headingNode", null);
    __privateAdd(this, _shouldRender3, once(() => {
      if (this.forceMount.current) return true;
      if (__privateGet(this, _root8).shouldFilter.current === false) return true;
      if (!__privateGet(this, _root8).commandState.search) return true;
      return __privateGet(this, _root8).commandState.filtered.groups.has(this.id.current);
    }));
    __publicField(this, "trueValue", "");
    __privateAdd(this, _props31, once(() => ({
      id: this.id.current,
      role: "presentation",
      hidden: this.shouldRender ? void 0 : true,
      "data-value": this.trueValue,
      [GROUP_ATTR]: ""
    })));
    __privateSet(this, _ref17, props.ref);
    this.id = props.id;
    __privateSet(this, _root8, root);
    this.forceMount = props.forceMount;
    __privateSet(this, _value3, props.value);
    this.trueValue = props.value.current;
    useRefById({
      id: this.id,
      ref: __privateGet(this, _ref17),
      deps: () => this.shouldRender
    });
  }
  get shouldRender() {
    return __privateGet(this, _shouldRender3).call(this);
  }
  get props() {
    return __privateGet(this, _props31).call(this);
  }
}
_ref17 = new WeakMap();
_value3 = new WeakMap();
_root8 = new WeakMap();
_shouldRender3 = new WeakMap();
_props31 = new WeakMap();
class CommandGroupHeadingState {
  constructor(props, group) {
    __privateAdd(this, _ref18);
    __privateAdd(this, _id17);
    __privateAdd(this, _group);
    __privateAdd(this, _props32, once(() => ({
      id: __privateGet(this, _id17).current,
      [GROUP_HEADING_ATTR]: ""
    })));
    __privateSet(this, _ref18, props.ref);
    __privateSet(this, _id17, props.id);
    __privateSet(this, _group, group);
    useRefById({
      id: __privateGet(this, _id17),
      ref: __privateGet(this, _ref18),
      onRefChange: (node) => {
        __privateGet(this, _group).headingNode = node;
      }
    });
  }
  get props() {
    return __privateGet(this, _props32).call(this);
  }
}
_ref18 = new WeakMap();
_id17 = new WeakMap();
_group = new WeakMap();
_props32 = new WeakMap();
class CommandGroupItemsState {
  constructor(props, group) {
    __privateAdd(this, _ref19);
    __privateAdd(this, _id18);
    __privateAdd(this, _group2);
    __privateAdd(this, _props33, once(() => {
      var _a;
      return {
        id: __privateGet(this, _id18).current,
        role: "group",
        [GROUP_ITEMS_ATTR]: "",
        "aria-labelledby": ((_a = __privateGet(this, _group2).headingNode) == null ? void 0 : _a.id) ?? void 0
      };
    }));
    __privateSet(this, _ref19, props.ref);
    __privateSet(this, _id18, props.id);
    __privateSet(this, _group2, group);
    useRefById({ id: __privateGet(this, _id18), ref: __privateGet(this, _ref19) });
  }
  get props() {
    return __privateGet(this, _props33).call(this);
  }
}
_ref19 = new WeakMap();
_id18 = new WeakMap();
_group2 = new WeakMap();
_props33 = new WeakMap();
class CommandInputState {
  constructor(props, root) {
    __privateAdd(this, _ref20);
    __privateAdd(this, _id19);
    __privateAdd(this, _root9);
    __privateAdd(this, _value4);
    __privateAdd(this, _autofocus);
    __privateAdd(this, _selectedItemId, once(() => {
      var _a;
      const item = (_a = __privateGet(this, _root9).viewportNode) == null ? void 0 : _a.querySelector(`${ITEM_SELECTOR}[${VALUE_ATTR}="${encodeURIComponent(__privateGet(this, _value4).current)}"]`);
      if (!item) return;
      return (item == null ? void 0 : item.getAttribute("id")) ?? void 0;
    }));
    __privateAdd(this, _props34, once(() => {
      var _a, _b;
      return {
        id: __privateGet(this, _id19).current,
        type: "text",
        [INPUT_ATTR]: "",
        autocomplete: "off",
        autocorrect: "off",
        spellcheck: false,
        "aria-autocomplete": "list",
        role: "combobox",
        "aria-expanded": getAriaExpanded(true),
        "aria-controls": ((_a = __privateGet(this, _root9).viewportNode) == null ? void 0 : _a.id) ?? void 0,
        "aria-labelledby": ((_b = __privateGet(this, _root9).labelNode) == null ? void 0 : _b.id) ?? void 0,
        "aria-activedescendant": __privateGet(this, _selectedItemId).call(this)
      };
    }));
    __privateSet(this, _ref20, props.ref);
    __privateSet(this, _id19, props.id);
    __privateSet(this, _root9, root);
    __privateSet(this, _value4, props.value);
    __privateSet(this, _autofocus, props.autofocus);
    useRefById({
      id: __privateGet(this, _id19),
      ref: __privateGet(this, _ref20),
      onRefChange: (node) => {
        __privateGet(this, _root9).inputNode = node;
      }
    });
  }
  get props() {
    return __privateGet(this, _props34).call(this);
  }
}
_ref20 = new WeakMap();
_id19 = new WeakMap();
_root9 = new WeakMap();
_value4 = new WeakMap();
_autofocus = new WeakMap();
_selectedItemId = new WeakMap();
_props34 = new WeakMap();
class CommandItemState {
  constructor(props, root) {
    __privateAdd(this, _CommandItemState_instances);
    __privateAdd(this, _ref21);
    __publicField(this, "id");
    __publicField(this, "root");
    __privateAdd(this, _value5);
    __privateAdd(this, _disabled6);
    __privateAdd(this, _onSelectProp);
    __privateAdd(this, _forceMount3);
    __privateAdd(this, _group3, null);
    __privateAdd(this, _trueForceMount, once(() => {
      var _a;
      return __privateGet(this, _forceMount3).current || ((_a = __privateGet(this, _group3)) == null ? void 0 : _a.forceMount.current) === true;
    }));
    __publicField(this, "trueValue", "");
    __privateAdd(this, _shouldRender4, once(() => {
      if (__privateGet(this, _trueForceMount).call(this) || this.root.shouldFilter.current === false || !this.root.commandState.search) {
        return true;
      }
      const currentScore = this.root.commandState.filtered.items.get(this.id.current);
      if (currentScore === void 0) return false;
      return currentScore > 0;
    }));
    __privateAdd(this, _isSelected, once(() => this.root.valueProp.current === this.trueValue && this.trueValue !== ""));
    __privateAdd(this, _props35, once(() => ({
      id: this.id.current,
      "aria-disabled": getAriaDisabled(__privateGet(this, _disabled6).current),
      "aria-selected": getAriaSelected(this.isSelected),
      "data-disabled": getDataDisabled(__privateGet(this, _disabled6).current),
      "data-selected": getDataSelected(this.isSelected),
      "data-value": this.trueValue,
      [ITEM_ATTR]: "",
      role: "option",
      onpointermove: this.onpointermove,
      onclick: this.onclick
    })));
    __privateSet(this, _ref21, props.ref);
    this.id = props.id;
    this.root = root;
    __privateSet(this, _value5, props.value);
    __privateSet(this, _disabled6, props.disabled);
    __privateSet(this, _onSelectProp, props.onSelect);
    __privateSet(this, _forceMount3, props.forceMount);
    __privateSet(this, _group3, getCommandGroupContainerContext(null));
    this.trueValue = props.value.current;
    useRefById({
      id: this.id,
      ref: __privateGet(this, _ref21),
      deps: () => Boolean(this.root.commandState.search)
    });
    this.onclick = this.onclick.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
  }
  get shouldRender() {
    return __privateGet(this, _shouldRender4).call(this);
  }
  get isSelected() {
    return __privateGet(this, _isSelected).call(this);
  }
  onpointermove(_) {
    if (__privateGet(this, _disabled6).current || this.root.disablePointerSelection.current) return;
    __privateMethod(this, _CommandItemState_instances, select_fn).call(this);
  }
  onclick(_) {
    if (__privateGet(this, _disabled6).current) return;
    __privateMethod(this, _CommandItemState_instances, onSelect_fn).call(this);
  }
  get props() {
    return __privateGet(this, _props35).call(this);
  }
}
_ref21 = new WeakMap();
_value5 = new WeakMap();
_disabled6 = new WeakMap();
_onSelectProp = new WeakMap();
_forceMount3 = new WeakMap();
_group3 = new WeakMap();
_trueForceMount = new WeakMap();
_shouldRender4 = new WeakMap();
_isSelected = new WeakMap();
_CommandItemState_instances = new WeakSet();
onSelect_fn = function() {
  var _a;
  if (__privateGet(this, _disabled6).current) return;
  __privateMethod(this, _CommandItemState_instances, select_fn).call(this);
  (_a = __privateGet(this, _onSelectProp)) == null ? void 0 : _a.current();
};
select_fn = function() {
  if (__privateGet(this, _disabled6).current) return;
  this.root.setValue(this.trueValue, true);
};
_props35 = new WeakMap();
class CommandLabelState {
  constructor(props, root) {
    __privateAdd(this, _ref22);
    __privateAdd(this, _id20);
    __privateAdd(this, _root10);
    __privateAdd(this, _for);
    __privateAdd(this, _props36, once(() => {
      var _a;
      return {
        id: __privateGet(this, _id20).current,
        [INPUT_LABEL_ATTR]: "",
        for: (_a = __privateGet(this, _for)) == null ? void 0 : _a.current,
        style: srOnlyStyles
      };
    }));
    __privateSet(this, _ref22, props.ref);
    __privateSet(this, _id20, props.id);
    __privateSet(this, _root10, root);
    __privateSet(this, _for, props.for);
    useRefById({
      id: __privateGet(this, _id20),
      ref: __privateGet(this, _ref22),
      onRefChange: (node) => {
        __privateGet(this, _root10).labelNode = node;
      }
    });
  }
  get props() {
    return __privateGet(this, _props36).call(this);
  }
}
_ref22 = new WeakMap();
_id20 = new WeakMap();
_root10 = new WeakMap();
_for = new WeakMap();
_props36 = new WeakMap();
function useCommandRoot(props) {
  return setCommandRootContext(new CommandRootState(props));
}
function useCommandEmpty(props) {
  const root = getCommandRootContext();
  return new CommandEmptyState(props, root);
}
function useCommandItem(props) {
  const root = getCommandRootContext();
  return new CommandItemState(props, root);
}
function useCommandGroupContainer(props) {
  const root = getCommandRootContext();
  return setCommandGroupContainerContext(new CommandGroupContainerState(props, root));
}
function useCommandGroupHeading(props) {
  const groupContainer = getCommandGroupContainerContext();
  return new CommandGroupHeadingState(props, groupContainer);
}
function useCommandGroupItems(props) {
  const groupContainer = getCommandGroupContainerContext();
  return new CommandGroupItemsState(props, groupContainer);
}
function useCommandInput(props) {
  const root = getCommandRootContext();
  return new CommandInputState(props, root);
}
function useCommandLabel(props) {
  const root = getCommandRootContext();
  return new CommandLabelState(props, root);
}
function _command_label($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const labelState = useCommandLabel({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, labelState.props);
  $$payload.out += `<label${spread_attributes({ ...mergedProps })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></label>`;
  bind_props($$props, { ref });
  pop();
}
function Command$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    value = "",
    onValueChange = noop,
    onStateChange = noop,
    loop = false,
    shouldFilter = true,
    filter = defaultFilter,
    label = "",
    vimBindings = true,
    disablePointerSelection = false,
    controlledValue = false,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useCommandRoot({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    filter: box.with(() => filter),
    shouldFilter: box.with(() => shouldFilter),
    loop: box.with(() => loop),
    value: box.with(() => value, (v) => {
      if (controlledValue) {
        onValueChange(v);
      } else {
        value = v;
        onValueChange(v);
      }
    }),
    vimBindings: box.with(() => vimBindings),
    disablePointerSelection: box.with(() => disablePointerSelection),
    onStateChange: box.with(() => onStateChange)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  function Label2($$payload2) {
    _command_label($$payload2, {
      children: ($$payload3) => {
        $$payload3.out += `<!---->${escape_html(label)}`;
      },
      $$slots: { default: true }
    });
  }
  if (child) {
    $$payload.out += "<!--[-->";
    Label2($$payload);
    $$payload.out += `<!----> `;
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    Label2($$payload);
    $$payload.out += `<!----> `;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, value });
  pop();
}
function Command_empty$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    children,
    child,
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const emptyState = useCommandEmpty({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    forceMount: box.with(() => forceMount)
  });
  const mergedProps = mergeProps(emptyState.props, restProps);
  if (emptyState.shouldRender) {
    $$payload.out += "<!--[-->";
    if (child) {
      $$payload.out += "<!--[-->";
      child($$payload, { props: mergedProps });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
      children == null ? void 0 : children($$payload);
      $$payload.out += `<!----></div>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Command_group$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    value = "",
    forceMount = false,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const groupState = useCommandGroupContainer({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    forceMount: box.with(() => forceMount),
    value: box.with(() => value)
  });
  const mergedProps = mergeProps(restProps, groupState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Command_group_heading($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const headingState = useCommandGroupHeading({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, headingState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Command_group_items($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const groupItemsState = useCommandGroupItems({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, groupItemsState.props);
  $$payload.out += `<div style="display: contents;">`;
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { ref });
  pop();
}
function Command_input$1($$payload, $$props) {
  push();
  let {
    value = "",
    autofocus = false,
    id = useId(),
    ref = null,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const inputState = useCommandInput({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    value: box.with(() => value, (v) => {
      value = v;
    }),
    autofocus: box.with(() => autofocus ?? false)
  });
  const mergedProps = mergeProps(restProps, inputState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<input${spread_attributes({ ...mergedProps, value })}>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { value, ref });
  pop();
}
function Command_item$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    value = "",
    disabled = false,
    children,
    child,
    onSelect = noop,
    forceMount = false,
    keywords = [],
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const group = getCommandGroupContainerContext(null);
  const itemState = useCommandItem({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    value: box.with(() => value),
    disabled: box.with(() => disabled),
    onSelect: box.with(() => onSelect),
    forceMount: box.with(() => forceMount),
    keywords: box.with(() => keywords),
    group
  });
  const mergedProps = mergeProps(restProps, itemState.props);
  $$payload.out += `<!---->`;
  {
    $$payload.out += `<div style="display: contents;" data-item-wrapper=""${attr("data-value", value)}>`;
    if (itemState.shouldRender) {
      $$payload.out += "<!--[-->";
      if (child) {
        $$payload.out += "<!--[-->";
        child($$payload, { props: mergedProps });
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
        children == null ? void 0 : children($$payload);
        $$payload.out += `<!----></div>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!---->`;
  bind_props($$props, { ref });
  pop();
}
class PopoverRootState {
  constructor(props) {
    __publicField(this, "open");
    __publicField(this, "contentNode", null);
    __publicField(this, "contentId");
    __publicField(this, "triggerNode", null);
    this.open = props.open;
  }
  toggleOpen() {
    this.open.current = !this.open.current;
  }
  handleClose() {
    if (!this.open.current) return;
    this.open.current = false;
  }
}
class PopoverTriggerState {
  constructor(props, root) {
    __privateAdd(this, _PopoverTriggerState_instances);
    __privateAdd(this, _id21);
    __privateAdd(this, _ref23);
    __privateAdd(this, _disabled7);
    __privateAdd(this, _root11);
    __privateAdd(this, _props37, once(() => ({
      id: __privateGet(this, _id21).current,
      "aria-haspopup": "dialog",
      "aria-expanded": getAriaExpanded(__privateGet(this, _root11).open.current),
      "data-state": getDataOpenClosed(__privateGet(this, _root11).open.current),
      "aria-controls": __privateMethod(this, _PopoverTriggerState_instances, getAriaControls_fn).call(this),
      "data-popover-trigger": "",
      disabled: __privateGet(this, _disabled7).current,
      //
      onpointerdown: this.onpointerdown,
      onkeydown: this.onkeydown,
      onclick: this.onclick
    })));
    __privateSet(this, _id21, props.id);
    __privateSet(this, _root11, root);
    __privateSet(this, _ref23, props.ref);
    __privateSet(this, _disabled7, props.disabled);
    useRefById({
      id: __privateGet(this, _id21),
      ref: __privateGet(this, _ref23),
      onRefChange: (node) => {
        __privateGet(this, _root11).triggerNode = node;
      }
    });
    this.onclick = this.onclick.bind(this);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
  }
  onclick(e) {
    if (__privateGet(this, _disabled7).current) return;
    if (e.button !== 0) return;
    __privateGet(this, _root11).toggleOpen();
  }
  onpointerdown(e) {
    if (__privateGet(this, _disabled7).current) return;
    if (e.button !== 0) return;
    e.preventDefault();
  }
  onkeydown(e) {
    if (__privateGet(this, _disabled7).current) return;
    if (!(e.key === ENTER || e.key === SPACE)) return;
    e.preventDefault();
    __privateGet(this, _root11).toggleOpen();
  }
  get props() {
    return __privateGet(this, _props37).call(this);
  }
}
_id21 = new WeakMap();
_ref23 = new WeakMap();
_disabled7 = new WeakMap();
_root11 = new WeakMap();
_PopoverTriggerState_instances = new WeakSet();
getAriaControls_fn = function() {
  if (__privateGet(this, _root11).open.current && __privateGet(this, _root11).contentId) {
    return __privateGet(this, _root11).contentId;
  }
  return void 0;
};
_props37 = new WeakMap();
class PopoverContentState {
  constructor(props, root) {
    __privateAdd(this, _id22);
    __privateAdd(this, _ref24);
    __publicField(this, "root");
    __privateAdd(this, _snippetProps8, once(() => ({ open: this.root.open.current })));
    __privateAdd(this, _props38, once(() => ({
      id: __privateGet(this, _id22).current,
      tabindex: -1,
      "data-state": getDataOpenClosed(this.root.open.current),
      "data-popover-content": "",
      style: { pointerEvents: "auto" }
    })));
    __privateSet(this, _id22, props.id);
    this.root = root;
    __privateSet(this, _ref24, props.ref);
    useRefById({
      id: __privateGet(this, _id22),
      ref: __privateGet(this, _ref24),
      deps: () => this.root.open.current,
      onRefChange: (node) => {
        this.root.contentNode = node;
        this.root.contentId = node == null ? void 0 : node.id;
      }
    });
  }
  get snippetProps() {
    return __privateGet(this, _snippetProps8).call(this);
  }
  get props() {
    return __privateGet(this, _props38).call(this);
  }
}
_id22 = new WeakMap();
_ref24 = new WeakMap();
_snippetProps8 = new WeakMap();
_props38 = new WeakMap();
const [setPopoverRootContext, getPopoverRootContext] = createContext("Popover.Root");
function usePopoverRoot(props) {
  return setPopoverRootContext(new PopoverRootState(props));
}
function usePopoverTrigger(props) {
  return new PopoverTriggerState(props, getPopoverRootContext());
}
function usePopoverContent(props) {
  return new PopoverContentState(props, getPopoverRootContext());
}
function Popover_content$1($$payload, $$props) {
  push();
  let {
    child,
    children,
    ref = null,
    id = useId(),
    forceMount = false,
    onCloseAutoFocus = noop,
    onEscapeKeydown = noop,
    onInteractOutside = noop,
    trapFocus = true,
    preventScroll = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = usePopoverContent({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  function handleInteractOutside(e) {
    onInteractOutside(e);
    if (e.defaultPrevented) return;
    if (isHTMLElement(e.target) && e.target.closest("[data-popover-trigger")) return;
    contentState.root.handleClose();
  }
  function handleEscapeKeydown(e) {
    onEscapeKeydown(e);
    if (e.defaultPrevented) return;
    contentState.root.handleClose();
  }
  function handleCloseAutoFocus(e) {
    var _a;
    onCloseAutoFocus(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
    (_a = contentState.root.triggerNode) == null ? void 0 : _a.focus();
  }
  if (forceMount) {
    $$payload.out += "<!--[-->";
    {
      let popper = function($$payload2, { props, wrapperProps }) {
        const finalProps = mergeProps(props, {
          style: getFloatingContentCSSVars("popover")
        });
        if (child) {
          $$payload2.out += "<!--[-->";
          child($$payload2, {
            props: finalProps,
            wrapperProps,
            ...contentState.snippetProps
          });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div${spread_attributes({ ...wrapperProps })}><div${spread_attributes({ ...finalProps })}>`;
          children == null ? void 0 : children($$payload2);
          $$payload2.out += `<!----></div></div>`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Popper_layer_force_mount($$payload, spread_props([
        mergedProps,
        {
          enabled: contentState.root.open.current,
          id,
          onInteractOutside: handleInteractOutside,
          onEscapeKeydown: handleEscapeKeydown,
          onCloseAutoFocus: handleCloseAutoFocus,
          trapFocus,
          preventScroll,
          loop: true,
          forceMount: true,
          popper,
          $$slots: { popper: true }
        }
      ]));
    }
  } else {
    $$payload.out += "<!--[!-->";
    if (!forceMount) {
      $$payload.out += "<!--[-->";
      {
        let popper = function($$payload2, { props, wrapperProps }) {
          const finalProps = mergeProps(props, {
            style: getFloatingContentCSSVars("popover")
          });
          if (child) {
            $$payload2.out += "<!--[-->";
            child($$payload2, {
              props: finalProps,
              wrapperProps,
              ...contentState.snippetProps
            });
            $$payload2.out += `<!---->`;
          } else {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `<div${spread_attributes({ ...wrapperProps })}><div${spread_attributes({ ...finalProps })}>`;
            children == null ? void 0 : children($$payload2);
            $$payload2.out += `<!----></div></div>`;
          }
          $$payload2.out += `<!--]-->`;
        };
        Popper_layer($$payload, spread_props([
          mergedProps,
          {
            present: contentState.root.open.current,
            id,
            onInteractOutside: handleInteractOutside,
            onEscapeKeydown: handleEscapeKeydown,
            onCloseAutoFocus: handleCloseAutoFocus,
            trapFocus,
            preventScroll,
            loop: true,
            forceMount: false,
            popper,
            $$slots: { popper: true }
          }
        ]));
      }
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Popover_trigger($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId(),
    ref = null,
    type = "button",
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = usePopoverTrigger({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, triggerState.props, { type });
  Floating_layer_anchor($$payload, {
    id,
    children: ($$payload2) => {
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, { props: mergedProps });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<button${spread_attributes({ ...mergedProps })}>`;
        children == null ? void 0 : children($$payload2);
        $$payload2.out += `<!----></button>`;
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  bind_props($$props, { ref });
  pop();
}
function Dialog($$payload, $$props) {
  push();
  let {
    open = false,
    onOpenChange = noop,
    controlledOpen = false,
    children
  } = $$props;
  useDialogRoot({
    variant: box.with(() => "dialog"),
    open: box.with(() => open, (v) => {
      if (controlledOpen) {
        onOpenChange(v);
      } else {
        open = v;
        onOpenChange(v);
      }
    })
  });
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { open });
  pop();
}
function Dialog_close($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId(),
    ref = null,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const closeState = useDialogClose({
    variant: box.with(() => "close"),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, closeState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Dialog_content$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    children,
    child,
    ref = null,
    forceMount = false,
    onCloseAutoFocus = noop,
    onEscapeKeydown = noop,
    onInteractOutside = noop,
    trapFocus = true,
    preventScroll = true,
    restoreScrollDelay = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useDialogContent({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  {
    let presence = function($$payload2, { present }) {
      {
        let focusScope = function($$payload3, { props: focusScopeProps }) {
          Escape_layer($$payload3, spread_props([
            mergedProps,
            {
              enabled: present.current,
              onEscapeKeydown: (e) => {
                onEscapeKeydown(e);
                if (e.defaultPrevented) return;
                contentState.root.handleClose();
              },
              children: ($$payload4) => {
                Dismissible_layer($$payload4, spread_props([
                  mergedProps,
                  {
                    enabled: present.current,
                    onInteractOutside: (e) => {
                      onInteractOutside(e);
                      if (e.defaultPrevented) return;
                      contentState.root.handleClose();
                    },
                    children: ($$payload5) => {
                      Text_selection_layer($$payload5, spread_props([
                        mergedProps,
                        {
                          enabled: present.current,
                          children: ($$payload6) => {
                            if (child) {
                              $$payload6.out += "<!--[-->";
                              if (contentState.root.open.current) {
                                $$payload6.out += "<!--[-->";
                                Scroll_lock($$payload6, { preventScroll, restoreScrollDelay });
                              } else {
                                $$payload6.out += "<!--[!-->";
                              }
                              $$payload6.out += `<!--]--> `;
                              child($$payload6, {
                                props: mergeProps(mergedProps, focusScopeProps),
                                ...contentState.snippetProps
                              });
                              $$payload6.out += `<!---->`;
                            } else {
                              $$payload6.out += "<!--[!-->";
                              Scroll_lock($$payload6, { preventScroll });
                              $$payload6.out += `<!----> <div${spread_attributes({
                                ...mergeProps(mergedProps, focusScopeProps)
                              })}>`;
                              children == null ? void 0 : children($$payload6);
                              $$payload6.out += `<!----></div>`;
                            }
                            $$payload6.out += `<!--]-->`;
                          },
                          $$slots: { default: true }
                        }
                      ]));
                    },
                    $$slots: { default: true }
                  }
                ]));
              },
              $$slots: { default: true }
            }
          ]));
        };
        Focus_scope($$payload2, spread_props([
          {
            loop: true,
            trapFocus: shouldTrapFocus({
              forceMount,
              present: present.current,
              trapFocus,
              open: contentState.root.open.current
            })
          },
          mergedProps,
          {
            onCloseAutoFocus: (e) => {
              var _a;
              onCloseAutoFocus(e);
              if (e.defaultPrevented) return;
              (_a = contentState.root.triggerNode) == null ? void 0 : _a.focus();
            },
            focusScope,
            $$slots: { focusScope: true }
          }
        ]));
      }
    };
    Presence_layer($$payload, spread_props([
      mergedProps,
      {
        forceMount,
        present: contentState.root.open.current || forceMount,
        presence,
        $$slots: { presence: true }
      }
    ]));
  }
  bind_props($$props, { ref });
  pop();
}
const ROOT_ATTR$1 = "data-label-root";
class LabelRootState {
  constructor(props) {
    __privateAdd(this, _id23);
    __privateAdd(this, _ref25);
    __privateAdd(this, _props39, once(() => ({
      [ROOT_ATTR$1]: "",
      onmousedown: this.onmousedown
    })));
    __privateSet(this, _id23, props.id);
    __privateSet(this, _ref25, props.ref);
    this.onmousedown = this.onmousedown.bind(this);
    useRefById({ id: __privateGet(this, _id23), ref: __privateGet(this, _ref25) });
  }
  onmousedown(e) {
    if (e.detail > 1) e.preventDefault();
  }
  get props() {
    return __privateGet(this, _props39).call(this);
  }
}
_id23 = new WeakMap();
_ref25 = new WeakMap();
_props39 = new WeakMap();
function setLabelRootState(props) {
  return new LabelRootState(props);
}
function Label$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId(),
    ref = null,
    for: forProp,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = setLabelRootState({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, rootState.props, { for: forProp });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<label${spread_attributes({ ...mergedProps, for: forProp })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></label>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Popover($$payload, $$props) {
  push();
  let {
    open = false,
    onOpenChange = noop,
    controlledOpen = false,
    children
  } = $$props;
  usePopoverRoot({
    open: box.with(() => open, (v) => {
      if (controlledOpen) {
        onOpenChange(v);
      } else {
        open = v;
        onOpenChange(v);
      }
    })
  });
  Floating_layer($$payload, {
    children: ($$payload2) => {
      children == null ? void 0 : children($$payload2);
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  bind_props($$props, { open });
  pop();
}
const ROOT_ATTR = "data-tabs-root";
const LIST_ATTR = "data-tabs-list";
const TRIGGER_ATTR = "data-tabs-trigger";
const CONTENT_ATTR = "data-tabs-content";
class TabsRootState {
  constructor(props) {
    __privateAdd(this, _id24);
    __publicField(this, "ref");
    __publicField(this, "orientation");
    __publicField(this, "loop");
    __publicField(this, "activationMode");
    __publicField(this, "value");
    __publicField(this, "disabled");
    __publicField(this, "rovingFocusGroup");
    __publicField(this, "triggerIds", []);
    // holds the trigger ID for each value to associate it with the content
    __publicField(this, "valueToTriggerId", new SvelteMap());
    // holds the content ID for each value to associate it with the trigger
    __publicField(this, "valueToContentId", new SvelteMap());
    __privateAdd(this, _props40, once(() => ({
      id: __privateGet(this, _id24).current,
      "data-orientation": getDataOrientation(this.orientation.current),
      [ROOT_ATTR]: ""
    })));
    __privateSet(this, _id24, props.id);
    this.ref = props.ref;
    this.orientation = props.orientation;
    this.loop = props.loop;
    this.activationMode = props.activationMode;
    this.value = props.value;
    this.disabled = props.disabled;
    useRefById({ id: __privateGet(this, _id24), ref: this.ref });
    this.rovingFocusGroup = useRovingFocus({
      candidateAttr: TRIGGER_ATTR,
      rootNodeId: __privateGet(this, _id24),
      loop: this.loop,
      orientation: this.orientation
    });
  }
  registerTrigger(id, value) {
    this.triggerIds.push(id);
    this.valueToTriggerId.set(value, id);
    return () => {
      this.triggerIds = this.triggerIds.filter((triggerId) => triggerId !== id);
      this.valueToTriggerId.delete(value);
    };
  }
  registerContent(id, value) {
    this.valueToContentId.set(value, id);
    return () => {
      this.valueToContentId.delete(value);
    };
  }
  setValue(v) {
    this.value.current = v;
  }
  get props() {
    return __privateGet(this, _props40).call(this);
  }
}
_id24 = new WeakMap();
_props40 = new WeakMap();
class TabsListState {
  constructor(props, root) {
    __privateAdd(this, _id25);
    __privateAdd(this, _ref26);
    __privateAdd(this, _root12);
    __privateAdd(this, _isDisabled6, once(() => __privateGet(this, _root12).disabled.current));
    __privateAdd(this, _props41, once(() => ({
      id: __privateGet(this, _id25).current,
      role: "tablist",
      "aria-orientation": getAriaOrientation(__privateGet(this, _root12).orientation.current),
      "data-orientation": getDataOrientation(__privateGet(this, _root12).orientation.current),
      [LIST_ATTR]: "",
      "data-disabled": getDataDisabled(__privateGet(this, _isDisabled6).call(this))
    })));
    __privateSet(this, _root12, root);
    __privateSet(this, _id25, props.id);
    __privateSet(this, _ref26, props.ref);
    useRefById({ id: __privateGet(this, _id25), ref: __privateGet(this, _ref26) });
  }
  get props() {
    return __privateGet(this, _props41).call(this);
  }
}
_id25 = new WeakMap();
_ref26 = new WeakMap();
_root12 = new WeakMap();
_isDisabled6 = new WeakMap();
_props41 = new WeakMap();
class TabsTriggerState {
  constructor(props, root) {
    __privateAdd(this, _TabsTriggerState_instances);
    __privateAdd(this, _root13);
    __privateAdd(this, _id26);
    __privateAdd(this, _ref27);
    __privateAdd(this, _disabled8);
    __privateAdd(this, _value6);
    __privateAdd(this, _isActive2, once(() => __privateGet(this, _root13).value.current === __privateGet(this, _value6).current));
    __privateAdd(this, _isDisabled7, once(() => __privateGet(this, _disabled8).current || __privateGet(this, _root13).disabled.current));
    __privateAdd(this, _tabIndex, 0);
    __privateAdd(this, _ariaControls, once(() => __privateGet(this, _root13).valueToContentId.get(__privateGet(this, _value6).current)));
    __publicField(this, "onfocus", (_) => {
      if (__privateGet(this, _root13).activationMode.current !== "automatic" || __privateGet(this, _isDisabled7).call(this)) return;
      __privateMethod(this, _TabsTriggerState_instances, activate_fn).call(this);
    });
    __publicField(this, "onclick", (_) => {
      if (__privateGet(this, _isDisabled7).call(this)) return;
      __privateMethod(this, _TabsTriggerState_instances, activate_fn).call(this);
    });
    __publicField(this, "onkeydown", (e) => {
      if (__privateGet(this, _isDisabled7).call(this)) return;
      if (e.key === SPACE || e.key === ENTER) {
        e.preventDefault();
        __privateMethod(this, _TabsTriggerState_instances, activate_fn).call(this);
        return;
      }
      __privateGet(this, _root13).rovingFocusGroup.handleKeydown(__privateGet(this, _ref27).current, e);
    });
    __privateAdd(this, _props42, once(() => ({
      id: __privateGet(this, _id26).current,
      role: "tab",
      "data-state": getTabDataState(__privateGet(this, _isActive2).call(this)),
      "data-value": __privateGet(this, _value6).current,
      "data-orientation": getDataOrientation(__privateGet(this, _root13).orientation.current),
      "data-disabled": getDataDisabled(__privateGet(this, _isDisabled7).call(this)),
      "aria-selected": getAriaSelected(__privateGet(this, _isActive2).call(this)),
      "aria-controls": __privateGet(this, _ariaControls).call(this),
      [TRIGGER_ATTR]: "",
      disabled: getDisabled(__privateGet(this, _isDisabled7).call(this)),
      tabindex: __privateGet(this, _tabIndex),
      //
      onclick: this.onclick,
      onfocus: this.onfocus,
      onkeydown: this.onkeydown
    })));
    __privateSet(this, _root13, root);
    __privateSet(this, _id26, props.id);
    __privateSet(this, _ref27, props.ref);
    __privateSet(this, _value6, props.value);
    __privateSet(this, _disabled8, props.disabled);
    useRefById({ id: __privateGet(this, _id26), ref: __privateGet(this, _ref27) });
    this.onfocus = this.onfocus.bind(this);
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
  }
  get props() {
    return __privateGet(this, _props42).call(this);
  }
}
_root13 = new WeakMap();
_id26 = new WeakMap();
_ref27 = new WeakMap();
_disabled8 = new WeakMap();
_value6 = new WeakMap();
_isActive2 = new WeakMap();
_isDisabled7 = new WeakMap();
_tabIndex = new WeakMap();
_ariaControls = new WeakMap();
_TabsTriggerState_instances = new WeakSet();
activate_fn = function() {
  if (__privateGet(this, _root13).value.current === __privateGet(this, _value6).current) return;
  __privateGet(this, _root13).setValue(__privateGet(this, _value6).current);
};
_props42 = new WeakMap();
class TabsContentState {
  constructor(props, root) {
    __privateAdd(this, _root14);
    __privateAdd(this, _id27);
    __privateAdd(this, _ref28);
    __privateAdd(this, _value7);
    __privateAdd(this, _isActive3, once(() => __privateGet(this, _root14).value.current === __privateGet(this, _value7).current));
    __privateAdd(this, _ariaLabelledBy, once(() => __privateGet(this, _root14).valueToTriggerId.get(__privateGet(this, _value7).current)));
    __privateAdd(this, _props43, once(() => ({
      id: __privateGet(this, _id27).current,
      role: "tabpanel",
      hidden: getHidden(!__privateGet(this, _isActive3).call(this)),
      tabindex: 0,
      "data-value": __privateGet(this, _value7).current,
      "data-state": getTabDataState(__privateGet(this, _isActive3).call(this)),
      "aria-labelledby": __privateGet(this, _ariaLabelledBy).call(this),
      [CONTENT_ATTR]: ""
    })));
    __privateSet(this, _root14, root);
    __privateSet(this, _value7, props.value);
    __privateSet(this, _id27, props.id);
    __privateSet(this, _ref28, props.ref);
    useRefById({ id: __privateGet(this, _id27), ref: __privateGet(this, _ref28) });
  }
  get props() {
    return __privateGet(this, _props43).call(this);
  }
}
_root14 = new WeakMap();
_id27 = new WeakMap();
_ref28 = new WeakMap();
_value7 = new WeakMap();
_isActive3 = new WeakMap();
_ariaLabelledBy = new WeakMap();
_props43 = new WeakMap();
const [setTabsRootContext, getTabsRootContext] = createContext("Tabs.Root");
function useTabsRoot(props) {
  return setTabsRootContext(new TabsRootState(props));
}
function useTabsTrigger(props) {
  return new TabsTriggerState(props, getTabsRootContext());
}
function useTabsList(props) {
  return new TabsListState(props, getTabsRootContext());
}
function useTabsContent(props) {
  return new TabsContentState(props, getTabsRootContext());
}
function getTabDataState(condition) {
  return condition ? "active" : "inactive";
}
function Tabs($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    value = "",
    onValueChange = noop,
    orientation = "horizontal",
    loop = true,
    activationMode = "automatic",
    disabled = false,
    controlledValue = false,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useTabsRoot({
    id: box.with(() => id),
    value: box.with(() => value, (v) => {
      if (controlledValue) {
        onValueChange(v);
      } else {
        value = v;
        onValueChange(v);
      }
    }),
    orientation: box.with(() => orientation),
    loop: box.with(() => loop),
    activationMode: box.with(() => activationMode),
    disabled: box.with(() => disabled),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, value });
  pop();
}
function Tabs_content$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId(),
    ref = null,
    value,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useTabsContent({
    value: box.with(() => value),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Tabs_list$1($$payload, $$props) {
  push();
  let {
    child,
    children,
    id = useId(),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const listState = useTabsList({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, listState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Tabs_trigger$1($$payload, $$props) {
  push();
  let {
    child,
    children,
    disabled = false,
    id = useId(),
    type = "button",
    value,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = useTabsTrigger({
    id: box.with(() => id),
    disabled: box.with(() => disabled ?? false),
    value: box.with(() => value),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, triggerState.props, { type });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function cn$1(...inputs) {
  return twMerge(clsx(inputs));
}
function Accordion_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Accordion_content$1($$payload2, spread_props([
      {
        class: cn$1("data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          $$payload3.out += `<div class="pb-4 pt-0">`;
          children == null ? void 0 : children($$payload3);
          $$payload3.out += `<!----></div>`;
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Accordion_item($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Accordion_item$1($$payload2, spread_props([
      { class: cn$1("border-b", className) },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
/**
 * @license lucide-svelte v0.460.1 - ISC
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
function Icon$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode"
  ]);
  push();
  let name = fallback($$props["name"], void 0);
  let color = fallback($$props["color"], "currentColor");
  let size2 = fallback($$props["size"], 24);
  let strokeWidth = fallback($$props["strokeWidth"], 2);
  let absoluteStrokeWidth = fallback($$props["absoluteStrokeWidth"], false);
  let iconNode = fallback($$props["iconNode"], () => [], true);
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  const each_array = ensure_array_like(iconNode);
  $$payload.out += `<svg${spread_attributes(
    {
      ...defaultAttributes,
      ...$$restProps,
      width: size2,
      height: size2,
      stroke: color,
      "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size2) : strokeWidth,
      class: mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$sanitized_props.class)
    },
    void 0,
    void 0,
    3
  )}><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let [tag, attrs] = each_array[$$index];
    element($$payload, tag, () => {
      $$payload.out += `${spread_attributes({ ...attrs }, void 0, void 0, 3)}`;
    });
  }
  $$payload.out += `<!--]--><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></svg>`;
  bind_props($$props, {
    name,
    color,
    size: size2,
    strokeWidth,
    absoluteStrokeWidth,
    iconNode
  });
  pop();
}
function Chevron_down($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  Icon$1($$payload, spread_props([
    { name: "chevron-down" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Accordion_trigger($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    level = 3,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Accordion_header($$payload2, {
      level,
      class: "flex",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Accordion_trigger$1($$payload3, spread_props([
          {
            class: cn$1("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", className)
          },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            },
            children: ($$payload4) => {
              children == null ? void 0 : children($$payload4);
              $$payload4.out += `<!----> `;
              Chevron_down($$payload4, {
                class: "size-4 shrink-0 transition-transform duration-200"
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          }
        ]));
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const Root$5 = Accordion;
function Link_1($$payload, $$props) {
  push();
  let {
    href,
    target = "",
    xhr = false,
    children,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  if (xhr) {
    $$payload.out += "<!--[-->";
    Link($$payload, {
      href,
      target,
      class: `md:hover:font-semibold md:transition-all ${stringify(rest.class)}`,
      children: ($$payload2) => {
        children == null ? void 0 : children($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<a${attr("href", href)}${attr("target", target)}${attr("class", `md:hover:font-semibold md:transition-all ${stringify(rest.class)}`)}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></a>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Link_1
}, Symbol.toStringTag, { value: "Module" }));
function FooterInfoLinks($$payload) {
  Link_1($$payload, {
    href: "/gallery",
    xhr: true,
    children: ($$payload2) => {
      $$payload2.out += `<!---->Galerija`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Link_1($$payload, {
    href: "/webtools",
    xhr: true,
    children: ($$payload2) => {
      $$payload2.out += `<!---->Webtools`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Link_1($$payload, {
    href: "https://blog.bjelopic.com",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Blog`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Link_1($$payload, {
    href: "https://blog.bjelopic.com/kontakt/",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Kontakt`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FooterInfoLinks
}, Symbol.toStringTag, { value: "Module" }));
function FooterSocials($$payload) {
  Link_1($$payload, {
    href: "https://www.youtube.com/@bjelopic",
    target: "_blank",
    children: ($$payload2) => {
      $$payload2.out += `<!---->YouTube`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Link_1($$payload, {
    href: "https://www.facebook.com/bjelopic",
    target: "_blank",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Facebook`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Link_1($$payload, {
    href: "https://www.instagram.com/bjelopic/",
    target: "_blank",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Instagram`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Link_1($$payload, {
    href: "https://github.com/OrakMoya/bjelopicdotcom",
    target: "_blank",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Github`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FooterSocials
}, Symbol.toStringTag, { value: "Module" }));
function Footer($$payload, $$props) {
  push();
  $$payload.out += `<footer class="px-4 py-8 bg-black text-white w-full border-t border-t-neutral-800"><div class="max-w-screen-lg mx-auto flex flex-col gap-y-4 justify-center items-center md:items-start md:justify-between md:flex-row"><div class="flex flex-col items-center md:items-start gap-y-1 md:basis-1/2">`;
  Link($$payload, {
    href: "/",
    children: ($$payload2) => {
      TheBjeloPICLogo($$payload2, { class: "w-10 h-10 md:w-8 md:h-8" });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Link($$payload, {
    href: "/",
    class: "mb-1",
    children: ($$payload2) => {
      TheBjeloPIC($$payload2, { class: "text-3xl md:text-2xl" });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <span class="text-lg md:text-base">Bjelovarski filmski studio</span></div> <div class="w-full max-w-96 md:basis-1/2 flex">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    Root$5($$payload, {
      type: "multiple",
      class: "flex flex-col justify-center w-full",
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        Accordion_item($$payload2, {
          value: "info_links",
          class: "border-0",
          children: ($$payload3) => {
            $$payload3.out += `<!---->`;
            Accordion_trigger($$payload3, {
              class: "py-2",
              children: ($$payload4) => {
                $$payload4.out += `<h2 class="text-lg font-bold">Informacije</h2>`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!----> <!---->`;
            Accordion_content($$payload3, {
              children: ($$payload4) => {
                $$payload4.out += `<div class="flex flex-col gap-y-2 text-lg">`;
                FooterInfoLinks($$payload4);
                $$payload4.out += `<!----></div>`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> <!---->`;
        Accordion_item($$payload2, {
          value: "socials",
          class: "border-0",
          children: ($$payload3) => {
            $$payload3.out += `<!---->`;
            Accordion_trigger($$payload3, {
              class: "py-2",
              children: ($$payload4) => {
                $$payload4.out += `<h2 class="text-lg font-bold">Društvene mreže</h2>`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!----> <!---->`;
            Accordion_content($$payload3, {
              children: ($$payload4) => {
                $$payload4.out += `<div class="flex flex-col gap-y-2 text-lg">`;
                FooterSocials($$payload4);
                $$payload4.out += `<!----></div>`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></div></div> <span class="font-semibold block w-fit mx-auto my-4">© BjeloPIC ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} | Sva prava pridržana</span></footer>`;
  pop();
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Footer
}, Symbol.toStringTag, { value: "Module" }));
function TheSubtitle($$payload, $$props) {
  push();
  let { $$slots, $$events, ...rest } = $$props;
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
  $$payload.out += `<span${attr("class", rest.class)}>${escape_html(pickSubtitle())}</span>`;
  pop();
}
function Header$1($$payload) {
  $$payload.out += `<header class="bg-black p-4 border-b border-b-neutral-800"><div class="max-w-screen-lg gap-y-2 mx-auto flex justify-between items-center flex-col md:flex-row">`;
  Link($$payload, {
    href: "/",
    children: ($$payload2) => {
      $$payload2.out += `<div class="h-20 flex gap-x-4 items-center"><img class="h-full object-contain" src="/bjelopic_banner.png" alt="BjeloPIC"></div>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <div class="text-center"><span class="text-center text-xs sm:text-base md:text-lg lg:text-xl text-white uppercase font-semibold">`;
  TheSubtitle($$payload, { class: "tracking-tight whitespace-nowrap" });
  $$payload.out += `<!----></span></div></div></header>`;
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Header$1
}, Symbol.toStringTag, { value: "Module" }));
function Arrow_up($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "m5 12 7-7 7 7" }],
    ["path", { "d": "M12 19V5" }]
  ];
  Icon$1($$payload, spread_props([
    { name: "arrow-up" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Badge_x($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
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
  Icon$1($$payload, spread_props([
    { name: "badge-x" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Calendar($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
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
  Icon$1($$payload, spread_props([
    { name: "calendar" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Check($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
  Icon$1($$payload, spread_props([
    { name: "check" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Chevron_left($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m15 18-6-6 6-6" }]];
  Icon$1($$payload, spread_props([
    { name: "chevron-left" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Chevron_right($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  Icon$1($$payload, spread_props([
    { name: "chevron-right" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Copy($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "rect",
      {
        "width": "14",
        "height": "14",
        "x": "8",
        "y": "8",
        "rx": "2",
        "ry": "2"
      }
    ],
    [
      "path",
      {
        "d": "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
      }
    ]
  ];
  Icon$1($$payload, spread_props([
    { name: "copy" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Eye($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
      }
    ],
    [
      "circle",
      { "cx": "12", "cy": "12", "r": "3" }
    ]
  ];
  Icon$1($$payload, spread_props([
    { name: "eye" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function File($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
      }
    ],
    ["path", { "d": "M14 2v4a2 2 0 0 0 2 2h4" }]
  ];
  Icon$1($$payload, spread_props([
    { name: "file" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Image($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2",
        "ry": "2"
      }
    ],
    [
      "circle",
      { "cx": "9", "cy": "9", "r": "2" }
    ],
    [
      "path",
      {
        "d": "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"
      }
    ]
  ];
  Icon$1($$payload, spread_props([
    { name: "image" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Images($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M18 22H4a2 2 0 0 1-2-2V6" }],
    [
      "path",
      {
        "d": "m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18"
      }
    ],
    [
      "circle",
      { "cx": "12", "cy": "8", "r": "2" }
    ],
    [
      "rect",
      {
        "width": "16",
        "height": "16",
        "x": "6",
        "y": "2",
        "rx": "2"
      }
    ]
  ];
  Icon$1($$payload, spread_props([
    { name: "images" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Menu($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
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
      { "x1": "4", "x2": "20", "y1": "6", "y2": "6" }
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
  Icon$1($$payload, spread_props([
    { name: "menu" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Minus($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "M5 12h14" }]];
  Icon$1($$payload, spread_props([
    { name: "minus" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Plus($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M5 12h14" }],
    ["path", { "d": "M12 5v14" }]
  ];
  Icon$1($$payload, spread_props([
    { name: "plus" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Search($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "circle",
      { "cx": "11", "cy": "11", "r": "8" }
    ],
    ["path", { "d": "m21 21-4.3-4.3" }]
  ];
  Icon$1($$payload, spread_props([
    { name: "search" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Square_arrow_out_up_right($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
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
  Icon$1($$payload, spread_props([
    { name: "square-arrow-out-up-right" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Trash($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M3 6h18" }],
    [
      "path",
      { "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }
    ],
    [
      "path",
      { "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }
    ]
  ];
  Icon$1($$payload, spread_props([
    { name: "trash" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function X($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M18 6 6 18" }],
    ["path", { "d": "m6 6 12 12" }]
  ];
  Icon$1($$payload, spread_props([
    { name: "x" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
const EMBLA_CAROUSEL_CONTEXT = Symbol("EMBLA_CAROUSEL_CONTEXT");
function setEmblaContext(config) {
  setContext$1(EMBLA_CAROUSEL_CONTEXT, config);
  return config;
}
function getEmblaContext(name = "This component") {
  if (!hasContext(EMBLA_CAROUSEL_CONTEXT)) {
    throw new Error(`${name} must be used within a <Carousel.Root> component`);
  }
  return getContext$1(EMBLA_CAROUSEL_CONTEXT);
}
function Carousel($$payload, $$props) {
  push();
  let {
    opts = {},
    plugins = [],
    setApi = () => {
    },
    orientation = "horizontal",
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let carouselState = {
    api: void 0,
    scrollPrev,
    scrollNext,
    orientation,
    canScrollNext: false,
    canScrollPrev: false,
    handleKeyDown,
    options: opts,
    plugins,
    onInit,
    scrollSnaps: [],
    selectedIndex: 0,
    scrollTo
  };
  setEmblaContext(carouselState);
  function scrollPrev() {
    var _a;
    (_a = carouselState.api) == null ? void 0 : _a.scrollPrev();
  }
  function scrollNext() {
    var _a;
    (_a = carouselState.api) == null ? void 0 : _a.scrollNext();
  }
  function scrollTo(index, jump) {
    var _a;
    (_a = carouselState.api) == null ? void 0 : _a.scrollTo(index, jump);
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
  function onInit(event) {
    carouselState.api = event.detail;
    carouselState.scrollSnaps = carouselState.api.scrollSnapList();
  }
  $$payload.out += `<div${spread_attributes({
    class: cn$1("relative", className),
    role: "region",
    "aria-roledescription": "carousel",
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div>`;
  pop();
}
function Carousel_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const emblaCtx = getEmblaContext("<Carousel.Content/>");
  $$payload.out += `<div class="overflow-hidden"><div${spread_attributes({
    class: cn$1("flex", emblaCtx.orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className),
    "data-embla-container": "",
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div></div>`;
  bind_props($$props, { ref });
  pop();
}
function Carousel_item($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const emblaCtx = getEmblaContext("<Carousel.Item/>");
  $$payload.out += `<div${spread_attributes({
    role: "group",
    "aria-roledescription": "slide",
    class: cn$1("min-w-0 shrink-0 grow-0 basis-full", emblaCtx.orientation === "horizontal" ? "pl-4" : "pt-4", className),
    "data-embla-slide": "",
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
const buttonVariants = tv({
  base: "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border-input bg-background hover:bg-accent hover:text-accent-foreground border",
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
  defaultVariants: { variant: "default", size: "default" }
});
function Button($$payload, $$props) {
  push();
  let {
    class: className,
    variant = "default",
    size: size2 = "default",
    ref = null,
    href = void 0,
    type = "button",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (href) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a${spread_attributes({
      class: cn$1(buttonVariants({ variant, size: size2, className })),
      href,
      ...restProps
    })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></a>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({
      class: cn$1(buttonVariants({ variant, size: size2, className })),
      type,
      ...restProps
    })}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
const Root$4 = Aspect_ratio;
function FilmReel($$payload, $$props) {
  let { width = 24 } = $$props;
  $$payload.out += `<div class="flex w-full h-4 md:h-6 bg-repeat relative"${attr("style", ` background-image: url('rect1.svg'); background-size: auto ${stringify(width)}px; background-repeat: repeat; `)}></div>`;
}
function HeroCarousel($$payload, $$props) {
  push();
  let { videos } = $$props;
  const screensize_md = 768;
  const autoscroll = AutoScroll({
    speed: 0.3,
    startDelay: 0,
    stopOnMouseEnter: true
  });
  const carousel_opts = { loop: true, dragFree: true };
  let autoplay_resume_timeout_id = 0;
  let autoscroll_resume_delay = 3e3;
  $$payload.out += `<div${attr("class", `flex w-screen basis-1/3 overflow-x-clip overflow-y-visible drop-shadow-glow-xs ${stringify("")} transition duration-300`)}><!---->`;
  Carousel($$payload, {
    setApi: (emblaApi) => emblaApi,
    onmouseleave: () => autoplay_resume_timeout_id = setTimeout(() => autoscroll.play(), autoscroll_resume_delay),
    onmouseenter: () => clearTimeout(autoplay_resume_timeout_id),
    plugins: [autoscroll],
    opts: carousel_opts,
    class: "w-auto max-w-full mx-auto overflow-visible",
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Carousel_content($$payload2, {
        class: "overflow-visible",
        children: ($$payload3) => {
          const each_array = ensure_array_like(videos);
          $$payload3.out += `<!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let video = each_array[$$index];
            $$payload3.out += `<!---->`;
            Carousel_item($$payload3, {
              class: " basis-auto z-0 relative md:hover:z-10 overflow-visible p-0 outline outline-black outline-1",
              children: ($$payload4) => {
                FilmReel($$payload4, { width: innerWidth < screensize_md ? 16 : 24 });
                $$payload4.out += `<!----> <div class="overflow-visible"><div class="p-1 w-48 md:w-72 bg-black overflow-visible"><div${attr("class", `w-full h-full relative transition md:hover:drop-shadow-glow-md md:hover:scale-105 ${stringify("")} md:hover:brightness-100 overflow-visible `)}><!---->`;
                Root$4($$payload4, {
                  ratio: 16 / 9,
                  children: ($$payload5) => {
                    Link($$payload5, {
                      href: `/gallery?focus=${stringify(video.uuid)}`,
                      target: "_blank",
                      children: ($$payload6) => {
                        $$payload6.out += `<img${attr("src", video.thumbnail_url)} class="w-full h-full rounded-md overflow-clip relative z-50 md:hover:drop-shadow-lg transition duration-300 object-cover"${attr("alt", `${stringify(video.title)} thumbnail`)}>`;
                      },
                      $$slots: { default: true }
                    });
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----></div></div> `;
                FilmReel($$payload4, { width: innerWidth < screensize_md ? 16 : 24 });
                $$payload4.out += `<!----></div>`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
  pop();
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HeroCarousel
}, Symbol.toStringTag, { value: "Module" }));
function HeroLinks($$payload) {
  $$payload.out += `<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-1 text-sm sm:text-base items-center">`;
  Link($$payload, {
    href: "/gallery",
    class: "px-4 py-2 rounded-xl bg-bjelopic-red-2 transition duration-300 text-white hover:bg-bjelopic-red-1 drop-shadow-md text-center text-base",
    children: ($$payload2) => {
      $$payload2.out += `<span class="drop-shadow">Naši radovi</span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <div class="grid grid-cols-2 gap-4 sm:col-span-2"><a href="mailto:info@bjelopic.com" class="px-4 py-2 rounded-xl bg-black/50 drop-shadow-md transition duration-300 border border-neutral-700 text-white text-center hover:bg-neutral-800/75">Kontaktirajte nas</a> <a href="https://blog.bjelopic.com" class="px-4 py-2 rounded-xl bg-black/50 drop-shadow-md transition duration-300 border border-neutral-700 text-white text-center hover:bg-neutral-800/75">BjeloPIC Blog</a></div></div>`;
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HeroLinks
}, Symbol.toStringTag, { value: "Module" }));
function Layout$2($$payload, $$props) {
  push();
  let { children } = $$props;
  $$payload.out += `<div class="flex flex-col h-screen font-sans"><div class="flex-grow bg-black text-white relative">`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div> `;
  Footer($$payload);
  $$payload.out += `<!----></div>`;
  pop();
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout$2
}, Symbol.toStringTag, { value: "Module" }));
function Hero($$payload, $$props) {
  push();
  let { videos, heroUrl } = $$props;
  let window_scrolled = false;
  let arrows_shown = false;
  setTimeout(() => arrows_shown = true, 4e3);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>BjeloPIC</title>`;
  });
  $$payload.out += `<main class="max-w-screen-xl h-screen mx-auto"><div class="absolute top-0 left-0 overflow-clip w-screen h-full flex justify-center items-center"><div class="brightness-50 w-full h-full object-cover"><video class="w-full h-full object-cover" autoplay loop muted><source${attr("src", heroUrl)} type="video/webm"></video></div></div> `;
  if (arrows_shown && !window_scrolled) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="absolute left-0 bottom-0 mx-8 my-6 hidden md:block">`;
    Chevron_down($$payload, { class: "drop-shadow w-8 h-8 animate-bounce " });
    $$payload.out += `<!----></div> <div class="absolute right-0 bottom-0 mx-8 my-6 hidden md:block">`;
    Chevron_down($$payload, { class: "drop-shadow w-8 h-8 animate-bounce" });
    $$payload.out += `<!----></div> <div class="absolute left-0 bottom-0 right-0 w-8 mx-auto mb-6">`;
    Chevron_down($$payload, {
      class: "drop-shadow w-8 h-8 animate-bounce  md:hidden"
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <section class="w-full h-full flex flex-col justify-center items-center relative gap-y-4"><div class="basis-1/3 flex place-items-end"><div class="flex flex-col items-center">`;
  TheBjeloPIC($$payload, {
    class: "drop-shadow-lg text-7xl sm:text-8xl md:text-9xl transition-all duration-500 mb-4 sm:mb-6 text-center relative md:right-1 right-[2px]"
  });
  $$payload.out += `<!----> <div class="flex justify-evenly items-center transition-all duration-500 align-middle w-full gap-x-2 md:px-3"><div class="border-b border-white w-full h-min"></div> `;
  TheSubtitle($$payload, {
    class: "font-semibold  uppercase text-xs transition-all duration-500 md:text-sm w-fit whitespace-nowrap tracking-tighter"
  });
  $$payload.out += `<!----> <div class="border-b border-white w-full h-min"></div></div></div></div> `;
  HeroLinks($$payload);
  $$payload.out += `<!----> `;
  HeroCarousel($$payload, { videos });
  $$payload.out += `<!----></section></main>`;
  pop();
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hero,
  layout: Layout$2
}, Symbol.toStringTag, { value: "Module" }));
function Layout$1($$payload, $$props) {
  push();
  let { children } = $$props;
  $$payload.out += `<div class="flex flex-col h-screen">`;
  Header$1($$payload);
  $$payload.out += `<!----> <div class="flex-grow bg-black text-white">`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div> `;
  Footer($$payload);
  $$payload.out += `<!----></div>`;
  pop();
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout$1
}, Symbol.toStringTag, { value: "Module" }));
function run(fn) {
  fn();
}
function GalleryVideo($$payload, $$props) {
  push();
  let {
    preview_src = null,
    thumbnail_src = null,
    alt = "",
    selected_id,
    this_id = "",
    href = "",
    poster_src = "",
    title = "",
    year = "",
    stillsAvailable = false,
    uuid = "",
    $$slots,
    $$events,
    ...rest
  } = $$props;
  let focused = this_id === selected_id;
  $$payload.out += `<div${attr("class", `${stringify(focused ? "scale-[104%] md:scale-[102%]" : "")} transition-all duration-300 w-full h-full`)}><div${attr("class", `w-full h-full overflow-hidden relative bg-black ${stringify(rest.class)}`)}>`;
  if (focused && preview_src) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="absolute flex items-center align-middle w-full h-full top-0"><a aria-label="View video"${attr("href", href)} target="_blank" class="block w-full h-full object-cover"><video muted autoplay loop class="w-full h-full object-cover"><source${attr("src", preview_src)}></video></a></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="absolute w-full h-full">`;
    if (focused) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<a${attr("href", href)} target="_blank" class="block absolute w-full h-full"><img${attr("src", thumbnail_src)}${attr("alt", alt)} class="object-cover w-full h-full"></a>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<img${attr("src", thumbnail_src)}${attr("alt", alt)} class="absolute w-full h-full object-cover">`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--> `;
  if (focused && (title || stillsAvailable)) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="absolute flex items-center justify-between font-semibold w-full bottom-0 bg-black/80 p-1 text-left"><div${attr("class", title ? "" : "invisible")}>${escape_html(title)} <span class="text-bjelopic-blue-1">(${escape_html(year)})</span></div> <div${attr("class", stillsAvailable ? "" : "invisible")}>`;
    Link($$payload, {
      href: "/gallery/" + uuid,
      children: ($$payload2) => {
        Images($$payload2, { class: "w-5 h-5 m-2" });
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (poster_src && focused) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button class="absolute top-[15%] transition-all hover:pr-4 right-0 bg-black/80 rounded-tl-2xl rounded-bl-2xl p-2 z-10 block">`;
    Chevron_left($$payload, { class: "w-6 h-6" });
    $$payload.out += `<!----></button>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}
function GalleryVideoDescription($$payload, $$props) {
  push();
  let { children } = $$props;
  $$payload.out += `<div class="md:hidden lg:block">`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div>`;
  pop();
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GalleryVideoDescription
}, Symbol.toStringTag, { value: "Module" }));
function Gallery($$payload, $$props) {
  push();
  let { by_collection } = $$props;
  const params = new URLSearchParams(window.location.search);
  const focus2 = params.get("focus");
  let selected_video_uuid = focus2;
  Promise.all(Array.from(document.images).filter((img) => !img.complete).map((img) => new Promise((resolve) => {
    img.onload = img.onerror = resolve;
  }))).then(() => {
    if (focus2) {
      const el = document.getElementById(focus2);
      if (el) {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  });
  function getUniqueRoles(videos) {
    let set2 = /* @__PURE__ */ new Set();
    videos.forEach((video) => {
      video.roles.forEach((role) => set2.add(role));
    });
    return set2;
  }
  const each_array = ensure_array_like(by_collection);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Gallery - BjeloPIC</title>`;
  });
  $$payload.out += `<!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let collection = each_array[i];
    $$payload.out += `<section${attr("class", ` mx-auto ${stringify(i % 2 ? "bg-bjelopic-neutral-8" : "bg-bjelopic-neutral-7")} py-4 px-4 relative`)} role="none"><div class="max-w-screen-xl mx-auto px-4">`;
    if (collection.videos[0].collection) {
      $$payload.out += "<!--[-->";
      const firstVideo = collection.videos[0];
      const uniqueRoles = getUniqueRoles(collection.videos);
      const each_array_2 = ensure_array_like(collection.videos);
      $$payload.out += `<div class="flex w-full justify-center items-center gap-x-4 mx-auto transition-all duration-500 drop-shadow"><div class="h-[1px] relative top-[2px] bg-white min-w-8 grow"></div> <div class="whitespace-normal w-auto max-w-[570px] font-bold text-2xl md:text-4xl text-center">${escape_html(collection.collection)}</div> <div class="h-[1px] relative top-[2px] bg-white min-w-8 grow"></div></div> <div class="flex justify-center mb-2 text-lg lg:text-xl font-semibold">`;
      if (firstVideo.subject === "BjeloPIC") {
        $$payload.out += "<!--[-->";
        TheBjeloPIC($$payload, {});
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `${escape_html(firstVideo.subject)}`;
      }
      $$payload.out += `<!--]--></div> `;
      if (uniqueRoles.size) {
        $$payload.out += "<!--[-->";
        const each_array_1 = ensure_array_like(uniqueRoles);
        $$payload.out += `<div class="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 mb-4"><!--[-->`;
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let role = each_array_1[$$index];
          $$payload.out += `<div class="bg-bjelopic-neutral-1 text-black rounded-sm text-sm lg:text-base px-1 py-[0.5px]"><span class="drop-shadow">${escape_html(role)}</span></div>`;
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4" role="none"><!--[-->`;
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let video = each_array_2[$$index_1];
        $$payload.out += `<div class="drop-shadow-lg"${attr("id", video.uuid)}><button class="w-full block"><!---->`;
        Aspect_ratio($$payload, {
          ratio: 16 / 9,
          children: ($$payload2) => {
            GalleryVideo($$payload2, {
              title: video.title,
              year: new Date(video.publication_date).getUTCFullYear().toString(),
              class: "rounded-md md:rounded-sm md:hover:rounded-none transition-all overflow-clip",
              href: video.link,
              this_id: video.uuid,
              selected_id: selected_video_uuid,
              thumbnail_src: video.thumbnail_url,
              preview_src: video.preview_url,
              poster_src: video.poster_url,
              stillsAvailable: video.stillsAvailable,
              uuid: video.uuid
            });
          },
          $$slots: { default: true }
        });
        $$payload.out += `<!----></button></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array_3 = ensure_array_like(collection.videos);
      $$payload.out += `<!--[-->`;
      for (let $$index_3 = 0, $$length2 = each_array_3.length; $$index_3 < $$length2; $$index_3++) {
        let video = each_array_3[$$index_3];
        const each_array_4 = ensure_array_like(video.roles);
        $$payload.out += `<div role="none"${attr("id", video.uuid)}${attr("class", `w-full flex-col-reverse text-center flex gap-x-4 ${stringify(i % 2 ? "md:flex-row-reverse md:text-right" : "md:flex-row md:text-left")}`)}><button class="w-full block basis-3/5"><!---->`;
        Aspect_ratio($$payload, {
          ratio: 16 / 9,
          children: ($$payload2) => {
            GalleryVideo($$payload2, {
              class: "rounded-md md:rounded-sm md:hover:rounded-none transition-all overflow-clip",
              href: video.link,
              this_id: video.uuid,
              selected_id: selected_video_uuid,
              thumbnail_src: video.thumbnail_url,
              preview_src: video.preview_url,
              poster_src: video.poster_url,
              stillsAvailable: video.stillsAvailable,
              uuid: video.uuid
            });
          },
          $$slots: { default: true }
        });
        $$payload.out += `<!----></button> <div class="w-full basis-2/5 flex flex-col gap-y-1 justify-center md:justify-start drop-shadow mb-2 md:mb-0"><span class="font-semibold text-2xl lg:text-3xl">`;
        if (video.subject === "BjeloPIC") {
          $$payload.out += "<!--[-->";
          TheBjeloPIC($$payload, {});
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `${escape_html(video.subject)}`;
        }
        $$payload.out += `<!--]--> - <span class="text-white">${escape_html(video.title)}</span> (${escape_html(new Date(video.publication_date).getUTCFullYear())})</span> `;
        if (video.category) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span class="lg:text-lg mb-2">${escape_html(video.category)}</span>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div${attr("class", `flex justify-center md:justify-start ${stringify(i % 2 == 0 ? "flex-row" : "flex-row-reverse")} mb-2 flex-wrap gap-x-2 gap-y-2`)}><!--[-->`;
        for (let $$index_2 = 0, $$length3 = each_array_4.length; $$index_2 < $$length3; $$index_2++) {
          let role = each_array_4[$$index_2];
          $$payload.out += `<div class="bg-bjelopic-neutral-1 text-black rounded-sm text-sm lg:text-base px-1 py-[0.5px]"><span class="drop-shadow">${escape_html(role)}</span></div>`;
        }
        $$payload.out += `<!--]--></div> <div>`;
        GalleryVideoDescription($$payload, {
          children: ($$payload2) => {
            $$payload2.out += `<!---->${escape_html(video.description)}`;
          },
          $$slots: { default: true }
        });
        $$payload.out += `<!----></div></div></div>`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div></section>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gallery
}, Symbol.toStringTag, { value: "Module" }));
function Stills$1($$payload, $$props) {
  push();
  let { video, stills } = $$props;
  const each_array = ensure_array_like(stills);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(video.title)} (${escape_html(new Date(video.publication_date).getUTCFullYear())}) - BjeloPIC</title>`;
  });
  $$payload.out += `<section class="p-4 max-w-screen-xl mx-auto mb-2"><div class="flex justify-evenly items-center transition-all duration-500 align-middle w-full gap-x-2 md:gap-x-4 mx-auto mb-4 md:mb-6 md:mt-2 max-w-screen-md"><div class="border-b border-white w-full h-min opacity-0 sm:opacity-100 transition-opacity duration-500"></div> <span class="whitespace-nowrap transition-all duration-500 text-lg sm:text-2xl relative md:bottom-[2px] font-semibold tracking-tight">${escape_html(video.title)} (${escape_html(new Date(video.publication_date).getUTCFullYear())})</span> <div class="border-b border-white w-full h-min opacity-0 sm:opacity-100 transition-opacity duration-500"></div></div> <div class="grid grid-cols-1 gap-8"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let still = each_array[$$index];
    $$payload.out += `<a${attr("href", still.path)} target="_blank"><img class="w-full rounded-md drop-shadow-glow-xs"${attr("src", still.path)} alt="Still"></a>`;
  }
  $$payload.out += `<!--]--></div></section>`;
  pop();
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Stills$1
}, Symbol.toStringTag, { value: "Module" }));
function ViewTemporaryUpload($$payload, $$props) {
  push();
  let { temporary_upload } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(temporary_upload.original_name.substring(0, 12))} - BjeloPIC</title>`;
  });
  $$payload.out += `<main class="max-w-screen-lg mx-auto h-full flex flex-col items-center justify-center p-4 gap-y-2"><div class="bg-neutral-950 border border-neutral-800 rounded-xl w-fit p-8 relative flex flex-col sm:flex-row items-center gap-x-4 gap-y-4"><div class="flex items-center gap-x-4">`;
  File($$payload, { class: "w-10 h-10" });
  $$payload.out += `<!----> <div class="flex flex-col"><div class="text-lg max-w-72 text-nowrap overflow-hidden whitespace-nowrap text-ellipsis">${escape_html(temporary_upload.original_name)}</div> <div class="text-sm text-neutral-500">${escape_html(temporary_upload.size)} `;
  if (temporary_upload.expiry_datetime) {
    $$payload.out += "<!--[-->";
    $$payload.out += `- Expires on ${escape_html(temporary_upload.expiry_datetime)}`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `- Never expires`;
  }
  $$payload.out += `<!--]--></div></div></div> <a${attr("href", `/f/${stringify(temporary_upload.sqid)}/download`)} class="w-full sm:w-fit">`;
  Button($$payload, {
    class: "bg-bjelopic-red-1 w-full py-8 text-base sm:py-4 sm:text-sm sm:w-fit text-white hover:bg-bjelopic-red-2",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Download`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></a></div></main>`;
  pop();
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ViewTemporaryUpload
}, Symbol.toStringTag, { value: "Module" }));
function DashboardChart($$payload, $$props) {
  push();
  $$payload.out += `<div class="w-full h-full"><canvas></canvas></div>`;
  pop();
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DashboardChart
}, Symbol.toStringTag, { value: "Module" }));
function Header($$payload, $$props) {
  push();
  let {
    clientHeight = 0,
    dontHide = false,
    children,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<header${attr("class", `${stringify(dontHide ? "bg-black" : "bg-black/75")} md:bg-black w-full p-4 border-t md:border-t-0 md:border-b border-neutral-800 fixed bottom-0 md:relative ${stringify(rest.class)}`)}${attr("style", !dontHide ? "backdrop-filter: blur(20px)" : "")}><div class="flex w-full justify-between">`;
    Link($$payload, {
      href: "/webtools",
      class: "max-w-screen-lg gap-y-2 md:gap-x-2 flex items-center justify-start gap-x-4",
      children: ($$payload2) => {
        $$payload2.out += `<div class="h-12 md:h-20 flex gap-x-4 items-center"><img class="h-full object-contain"${attr("src", "/bjelopic_logo.png")} alt="BjeloPIC"></div> <span class="text-white text-2xl md:text-[36px] relative bottom-[2px] italic">Webtools</span>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></div></header>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { clientHeight });
  pop();
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Header
}, Symbol.toStringTag, { value: "Module" }));
function NavLink($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    href: hrefLink = "/",
    method: methodName = "get",
    xhr = true,
    children
  } = $$props;
  if (xhr) {
    $$payload.out += "<!--[-->";
    Link($$payload, {
      href: hrefLink,
      class: ` ${stringify(store_get($$store_subs ?? ($$store_subs = {}), "$page", page).url.endsWith(hrefLink) ? "font-bold" : "font-light hover:font-normal")}`,
      method: methodName,
      children: ($$payload2) => {
        children == null ? void 0 : children($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<a${attr("href", hrefLink)}${attr("class", ` ${stringify(store_get($$store_subs ?? ($$store_subs = {}), "$page", page).url.endsWith(hrefLink) ? "font-bold" : "font-light hover:font-normal")}`)}${attr("method", methodName)}>`;
    children == null ? void 0 : children($$payload);
    $$payload.out += `<!----></a>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function LayoutLinks($$payload, $$props) {
  push();
  var $$store_subs;
  let { $$slots, $$events, ...rest } = $$props;
  let show_telescope = false;
  run(() => {
    show_telescope = store_get($$store_subs ?? ($$store_subs = {}), "$page", page).props.show_telescope;
  });
  $$payload.out += `<div${attr("class", `flex flex-col text-2xl gap-y-2 ${stringify(rest.class)} h-full`)}>`;
  NavLink($$payload, {
    href: "/",
    children: ($$payload2) => {
      $$payload2.out += `<span class="flex items-baseline">Website`;
      Square_arrow_out_up_right($$payload2, { class: "w-5 h-5 ml-2 relative top-[2px]" });
      $$payload2.out += `<!----></span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  NavLink($$payload, {
    href: "/webtools",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Dashboard`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  NavLink($$payload, {
    href: "/webtools/hero",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Hero`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  NavLink($$payload, {
    href: "/webtools/videos",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Videos`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  NavLink($$payload, {
    href: "/webtools/uploads",
    children: ($$payload2) => {
      $$payload2.out += `<!---->File Upload`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  if (show_telescope) {
    $$payload.out += "<!--[-->";
    NavLink($$payload, {
      xhr: false,
      href: "/telescope",
      children: ($$payload2) => {
        $$payload2.out += `<!---->Telescope`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="grow h-full"></div> `;
  NavLink($$payload, {
    href: "/webtools/logout",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Logout`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LayoutLinks
}, Symbol.toStringTag, { value: "Module" }));
function Icon($$payload, $$props) {
  let type = fallback($$props["type"], "success");
  if (type === "success") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>`;
  } else {
    $$payload.out += "<!--[!-->";
    if (type === "error") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>`;
    } else {
      $$payload.out += "<!--[!-->";
      if (type === "info") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg>`;
      } else {
        $$payload.out += "<!--[!-->";
        if (type === "warning") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<svg viewBox="0 0 64 64" fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M32.427,7.987c2.183,0.124 4,1.165 5.096,3.281l17.936,36.208c1.739,3.66 -0.954,8.585 -5.373,8.656l-36.119,0c-4.022,-0.064 -7.322,-4.631 -5.352,-8.696l18.271,-36.207c0.342,-0.65 0.498,-0.838 0.793,-1.179c1.186,-1.375 2.483,-2.111 4.748,-2.063Zm-0.295,3.997c-0.687,0.034 -1.316,0.419 -1.659,1.017c-6.312,11.979 -12.397,24.081 -18.301,36.267c-0.546,1.225 0.391,2.797 1.762,2.863c12.06,0.195 24.125,0.195 36.185,0c1.325,-0.064 2.321,-1.584 1.769,-2.85c-5.793,-12.184 -11.765,-24.286 -17.966,-36.267c-0.366,-0.651 -0.903,-1.042 -1.79,-1.03Z"></path><path d="M33.631,40.581l-3.348,0l-0.368,-16.449l4.1,0l-0.384,16.449Zm-3.828,5.03c0,-0.609 0.197,-1.113 0.592,-1.514c0.396,-0.4 0.935,-0.601 1.618,-0.601c0.684,0 1.223,0.201 1.618,0.601c0.395,0.401 0.593,0.905 0.593,1.514c0,0.587 -0.193,1.078 -0.577,1.473c-0.385,0.395 -0.929,0.593 -1.634,0.593c-0.705,0 -1.249,-0.198 -1.634,-0.593c-0.384,-0.395 -0.576,-0.886 -0.576,-1.473Z"></path></svg>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { type });
}
function Loader($$payload, $$props) {
  push();
  let visible = $$props["visible"];
  const bars = Array(12).fill(0);
  const each_array = ensure_array_like(bars);
  $$payload.out += `<div class="sonner-loading-wrapper"${attr("data-visible", visible)}><div class="sonner-spinner"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    each_array[i];
    $$payload.out += `<div class="sonner-loading-bar"></div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  bind_props($$props, { visible });
  pop();
}
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
const isBrowser$1 = typeof document !== "undefined";
function clientWritable(initialValue) {
  const store = writable(initialValue);
  function set2(value) {
    if (isBrowser$1) {
      store.set(value);
    }
  }
  function update(updater) {
    if (isBrowser$1) {
      store.update(updater);
    }
  }
  return {
    subscribe: store.subscribe,
    set: set2,
    update
  };
}
let toastsCounter = 0;
function createToastState() {
  const toasts = clientWritable([]);
  const heights = clientWritable([]);
  function addToast(data) {
    toasts.update((prev) => [data, ...prev]);
  }
  function create(data) {
    var _a;
    const { message: message2, ...rest } = data;
    const id = typeof (data == null ? void 0 : data.id) === "number" || data.id && ((_a = data.id) == null ? void 0 : _a.length) > 0 ? data.id : toastsCounter++;
    const dismissable = data.dismissable === void 0 ? true : data.dismissable;
    const type = data.type === void 0 ? "default" : data.type;
    const $toasts = get$1(toasts);
    const alreadyExists = $toasts.find((toast2) => {
      return toast2.id === id;
    });
    if (alreadyExists) {
      toasts.update((prev) => prev.map((toast2) => {
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
      toasts.update((prev) => prev.map((toast2) => ({ ...toast2, dismiss: true })));
      return;
    }
    toasts.update((prev) => prev.map((toast2) => toast2.id === id ? { ...toast2, dismiss: true } : toast2));
    return id;
  }
  function remove(id) {
    if (id === void 0) {
      toasts.set([]);
      return;
    }
    toasts.update((prev) => prev.filter((toast2) => toast2.id !== id));
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
    const p2 = promise2 instanceof Promise ? promise2 : promise2();
    let shouldDismiss = id !== void 0;
    p2.then((response) => {
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
    heights.update((prev) => prev.filter((height) => height.toastId !== id));
  }
  function setHeight(data) {
    const exists = get$1(heights).find((el) => el.toastId === data.toastId);
    if (exists === void 0) {
      heights.update((prev) => [data, ...prev]);
      return;
    }
    heights.update((prev) => prev.map((el) => {
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
function Toast($$payload, $$props) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const $$sanitized_props = sanitize_props($$props);
  push();
  var $$store_subs;
  let isFront, isVisible, toastType, toastClass, toastDescriptionClass, heightIndex, coords, toastsHeightBefore, disabled, isPromiseLoadingOrInfiniteDuration;
  const TOAST_LIFETIME = 4e3;
  const GAP = 14;
  const TIME_BEFORE_UNMOUNT = 200;
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
  const {
    toasts,
    heights,
    removeHeight,
    setHeight,
    remove
  } = toastState;
  let toast2 = $$props["toast"];
  let index = $$props["index"];
  let expanded = $$props["expanded"];
  let invert = $$props["invert"];
  let position = $$props["position"];
  let visibleToasts = $$props["visibleToasts"];
  let expandByDefault = $$props["expandByDefault"];
  let closeButton = $$props["closeButton"];
  let interacting = $$props["interacting"];
  let cancelButtonStyle = fallback($$props["cancelButtonStyle"], "");
  let actionButtonStyle = fallback($$props["actionButtonStyle"], "");
  let duration = fallback($$props["duration"], 4e3);
  let descriptionClass = fallback($$props["descriptionClass"], "");
  let classes = fallback($$props["classes"], () => ({}), true);
  let unstyled = fallback($$props["unstyled"], false);
  let mounted = false;
  let removed = false;
  let swiping = false;
  let swipeOut = false;
  let offsetBeforeRemove = 0;
  let initialHeight = 0;
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
  let effect;
  classes = { ...defaultClasses, ...classes };
  isFront = index === 0;
  isVisible = index + 1 <= visibleToasts;
  toast2.title;
  toast2.description;
  toastType = toast2.type;
  toastClass = toast2.class || "";
  toastDescriptionClass = toast2.descriptionClass || "";
  heightIndex = store_get($$store_subs ?? ($$store_subs = {}), "$heights", heights).findIndex((height) => height.toastId === toast2.id) || 0;
  coords = position.split("-");
  toastsHeightBefore = store_get($$store_subs ?? ($$store_subs = {}), "$heights", heights).reduce(
    (prev, curr, reducerIndex) => {
      if (reducerIndex >= heightIndex) return prev;
      return prev + curr.height;
    },
    0
  );
  invert = toast2.invert || invert;
  disabled = toastType === "loading";
  offset2 = Math.round(heightIndex * GAP + toastsHeightBefore);
  updateHeights();
  if (toast2.updated) {
    clearTimeout(timeoutId);
    remainingTime = toast2.duration || duration || TOAST_LIFETIME;
    startTimer();
  }
  isPromiseLoadingOrInfiniteDuration = toast2.promise && toastType === "loading" || toast2.duration === Number.POSITIVE_INFINITY;
  effect = useEffect(() => {
    if (!isPromiseLoadingOrInfiniteDuration) {
      if (expanded || interacting) {
        pauseTimer();
      } else {
        startTimer();
      }
    }
    return () => clearTimeout(timeoutId);
  });
  store_get($$store_subs ?? ($$store_subs = {}), "$effect", effect);
  if (toast2.delete) {
    deleteToast();
  }
  $$payload.out += `<li${add_styles(merge_styles(`${$$sanitized_props.style} ${toast2.style}`, {
    "--index": index,
    "--toasts-before": index,
    "--z-index": store_get($$store_subs ?? ($$store_subs = {}), "$toasts", toasts).length - index,
    "--offset": `${removed ? offsetBeforeRemove : offset2}px`,
    "--initial-height": `${initialHeight}px`
  }))}${attr("aria-live", toast2.important ? "assertive" : "polite")} aria-atomic="true" role="status"${attr("tabindex", 0)}${attr("class", cn($$sanitized_props.class, toastClass, classes == null ? void 0 : classes.toast, (_a = toast2 == null ? void 0 : toast2.classes) == null ? void 0 : _a.toast, classes == null ? void 0 : classes[toastType], (_b = toast2 == null ? void 0 : toast2.classes) == null ? void 0 : _b[toastType]))} data-sonner-toast=""${attr("data-styled", !(toast2.component || (toast2 == null ? void 0 : toast2.unstyled) || unstyled))}${attr("data-mounted", mounted)}${attr("data-promise", Boolean(toast2.promise))}${attr("data-removed", removed)}${attr("data-visible", isVisible)}${attr("data-y-position", coords[0])}${attr("data-x-position", coords[1])}${attr("data-index", index)}${attr("data-front", isFront)}${attr("data-swiping", swiping)}${attr("data-type", toastType)}${attr("data-invert", invert)}${attr("data-swipe-out", swipeOut)}${attr("data-expanded", Boolean(expanded || expandByDefault && mounted))}>`;
  if (closeButton && !toast2.component) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button aria-label="Close toast"${attr("data-disabled", disabled)} data-close-button=""${attr("class", cn(classes == null ? void 0 : classes.closeButton, (_c = toast2 == null ? void 0 : toast2.classes) == null ? void 0 : _c.closeButton))}><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (toast2.component) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    (_d = toast2.component) == null ? void 0 : _d.call(toast2, $$payload, spread_props([toast2.componentProps]));
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    if (toastType !== "default" || toast2.icon || toast2.promise) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div data-icon="">`;
      if ((toast2.promise || toastType === "loading") && !toast2.icon) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<!---->`;
        slot($$payload, $$props, "loading-icon", {}, null);
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (toast2.icon) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<!---->`;
        (_e = toast2.icon) == null ? void 0 : _e.call(toast2, $$payload, {});
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        if (toastType === "success") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<!---->`;
          slot($$payload, $$props, "success-icon", {}, null);
          $$payload.out += `<!---->`;
        } else {
          $$payload.out += "<!--[!-->";
          if (toastType === "error") {
            $$payload.out += "<!--[-->";
            $$payload.out += `<!---->`;
            slot($$payload, $$props, "error-icon", {}, null);
            $$payload.out += `<!---->`;
          } else {
            $$payload.out += "<!--[!-->";
            if (toastType === "warning") {
              $$payload.out += "<!--[-->";
              $$payload.out += `<!---->`;
              slot($$payload, $$props, "warning-icon", {}, null);
              $$payload.out += `<!---->`;
            } else {
              $$payload.out += "<!--[!-->";
              if (toastType === "info") {
                $$payload.out += "<!--[-->";
                $$payload.out += `<!---->`;
                slot($$payload, $$props, "info-icon", {}, null);
                $$payload.out += `<!---->`;
              } else {
                $$payload.out += "<!--[!-->";
              }
              $$payload.out += `<!--]-->`;
            }
            $$payload.out += `<!--]-->`;
          }
          $$payload.out += `<!--]-->`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div data-content="">`;
    if (toast2.title) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div data-title=""${attr("class", cn(classes == null ? void 0 : classes.title, (_f = toast2 == null ? void 0 : toast2.classes) == null ? void 0 : _f.title))}>`;
      if (typeof toast2.title !== "string") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<!---->`;
        (_g = toast2.title) == null ? void 0 : _g.call(toast2, $$payload, spread_props([toast2.componentProps]));
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `${escape_html(toast2.title)}`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (toast2.description) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div data-description=""${attr("class", cn(descriptionClass, toastDescriptionClass, classes == null ? void 0 : classes.description, (_h = toast2.classes) == null ? void 0 : _h.description))}>`;
      if (typeof toast2.description !== "string") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<!---->`;
        (_i = toast2.description) == null ? void 0 : _i.call(toast2, $$payload, spread_props([toast2.componentProps]));
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `${escape_html(toast2.description)}`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> `;
    if (toast2.cancel) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button data-button="" data-cancel=""${attr("style", cancelButtonStyle)}${attr("class", cn(classes == null ? void 0 : classes.cancelButton, (_j = toast2 == null ? void 0 : toast2.classes) == null ? void 0 : _j.cancelButton))}>${escape_html(toast2.cancel.label)}</button>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (toast2.action) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button data-button=""${attr("style", actionButtonStyle)}${attr("class", cn(classes == null ? void 0 : classes.actionButton, (_k = toast2 == null ? void 0 : toast2.classes) == null ? void 0 : _k.actionButton))}>${escape_html(toast2.action.label)}</button>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></li>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    toast: toast2,
    index,
    expanded,
    invert,
    position,
    visibleToasts,
    expandByDefault,
    closeButton,
    interacting,
    cancelButtonStyle,
    actionButtonStyle,
    duration,
    descriptionClass,
    classes,
    unstyled
  });
  pop();
}
function Toaster($$payload, $$props) {
  var _a;
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "invert",
    "theme",
    "position",
    "hotkey",
    "containerAriaLabel",
    "richColors",
    "expand",
    "duration",
    "visibleToasts",
    "closeButton",
    "toastOptions",
    "offset",
    "dir"
  ]);
  push();
  var $$store_subs;
  let possiblePositions, hotkeyLabel;
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
  let invert = fallback($$props["invert"], false);
  let theme2 = fallback($$props["theme"], "light");
  let position = fallback($$props["position"], "bottom-right");
  let hotkey = fallback($$props["hotkey"], () => ["altKey", "KeyT"], true);
  let containerAriaLabel = fallback($$props["containerAriaLabel"], "Notifications");
  let richColors = fallback($$props["richColors"], false);
  let expand = fallback($$props["expand"], false);
  let duration = fallback($$props["duration"], 4e3);
  let visibleToasts = fallback($$props["visibleToasts"], VISIBLE_TOASTS_AMOUNT);
  let closeButton = fallback($$props["closeButton"], false);
  let toastOptions = fallback($$props["toastOptions"], () => ({}), true);
  let offset2 = fallback($$props["offset"], null);
  let dir = fallback($$props["dir"], getDocumentDirection, true);
  const { toasts, heights, reset } = toastState;
  let expanded = false;
  let interacting = false;
  let actualTheme = getInitialTheme(theme2);
  onDestroy(() => {
  });
  possiblePositions = Array.from(new Set([
    position,
    ...store_get($$store_subs ?? ($$store_subs = {}), "$toasts", toasts).filter((toast2) => toast2.position).map((toast2) => toast2.position)
  ].filter(Boolean)));
  hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
  if (store_get($$store_subs ?? ($$store_subs = {}), "$toasts", toasts).length <= 1) {
    expanded = false;
  }
  {
    const toastsToDismiss = store_get($$store_subs ?? ($$store_subs = {}), "$toasts", toasts).filter((toast2) => toast2.dismiss && !toast2.delete);
    if (toastsToDismiss.length > 0) {
      const updatedToasts = store_get($$store_subs ?? ($$store_subs = {}), "$toasts", toasts).map((toast2) => {
        const matchingToast = toastsToDismiss.find((dismissToast) => dismissToast.id === toast2.id);
        if (matchingToast) {
          return { ...toast2, delete: true };
        }
        return toast2;
      });
      toasts.set(updatedToasts);
    }
  }
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
  if (store_get($$store_subs ?? ($$store_subs = {}), "$toasts", toasts).length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(possiblePositions);
    $$payload.out += `<section${attr("aria-label", `${containerAriaLabel} ${hotkeyLabel}`)}${attr("tabindex", -1)} class="svelte-1fo5d1m"><!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let position2 = each_array[index];
      const each_array_1 = ensure_array_like(store_get($$store_subs ?? ($$store_subs = {}), "$toasts", toasts).filter((toast2) => !toast2.position && index === 0 || toast2.position === position2));
      $$payload.out += `<ol${spread_attributes(
        {
          tabindex: -1,
          class: $$sanitized_props.class,
          "data-sonner-toaster": true,
          "data-theme": actualTheme,
          "data-rich-colors": richColors,
          dir: dir === "auto" ? getDocumentDirection() : dir,
          "data-y-position": position2.split("-")[0],
          "data-x-position": position2.split("-")[1],
          style: $$sanitized_props.style,
          ...$$restProps
        },
        { "svelte-1fo5d1m": true },
        {
          "--front-toast-height": `${(_a = store_get($$store_subs ?? ($$store_subs = {}), "$heights", heights)[0]) == null ? void 0 : _a.height}px`,
          "--offset": typeof offset2 === "number" ? `${offset2}px` : offset2 || VIEWPORT_OFFSET,
          "--width": `${TOAST_WIDTH}px`,
          "--gap": `${GAP}px`
        }
      )}><!--[-->`;
      for (let index2 = 0, $$length2 = each_array_1.length; index2 < $$length2; index2++) {
        let toast2 = each_array_1[index2];
        Toast($$payload, {
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
          unstyled: toastOptions.unstyled || false,
          $$slots: {
            "loading-icon": ($$payload2) => {
              $$payload2.out += `<!---->`;
              slot($$payload2, $$props, "loading-icon", {}, () => {
                Loader($$payload2, { visible: toast2.type === "loading" });
              });
              $$payload2.out += `<!---->`;
            },
            "success-icon": ($$payload2) => {
              $$payload2.out += `<!---->`;
              slot($$payload2, $$props, "success-icon", {}, () => {
                Icon($$payload2, { type: "success" });
              });
              $$payload2.out += `<!---->`;
            },
            "error-icon": ($$payload2) => {
              $$payload2.out += `<!---->`;
              slot($$payload2, $$props, "error-icon", {}, () => {
                Icon($$payload2, { type: "error" });
              });
              $$payload2.out += `<!---->`;
            },
            "warning-icon": ($$payload2) => {
              $$payload2.out += `<!---->`;
              slot($$payload2, $$props, "warning-icon", {}, () => {
                Icon($$payload2, { type: "warning" });
              });
              $$payload2.out += `<!---->`;
            },
            "info-icon": ($$payload2) => {
              $$payload2.out += `<!---->`;
              slot($$payload2, $$props, "info-icon", {}, () => {
                Icon($$payload2, { type: "info" });
              });
              $$payload2.out += `<!---->`;
            }
          }
        });
      }
      $$payload.out += `<!--]--></ol>`;
    }
    $$payload.out += `<!--]--></section>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    invert,
    theme: theme2,
    position,
    hotkey,
    containerAriaLabel,
    richColors,
    expand,
    duration,
    visibleToasts,
    closeButton,
    toastOptions,
    offset: offset2,
    dir
  });
  pop();
}
let timeoutAction;
let timeoutEnable;
function withoutTransition(action) {
  if (typeof document === "undefined")
    return;
  clearTimeout(timeoutAction);
  clearTimeout(timeoutEnable);
  const style = document.createElement("style");
  const css = document.createTextNode(`* {
     -webkit-transition: none !important;
     -moz-transition: none !important;
     -o-transition: none !important;
     -ms-transition: none !important;
     transition: none !important;
  }`);
  style.appendChild(css);
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
  setItem: (_key, _value8) => {
  }
};
const isBrowser = typeof document !== "undefined";
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
  const storage = isBrowser ? localStorage : noopStorage;
  const initialValue = storage.getItem(getModeStorageKey());
  let value = isValidMode(initialValue) ? initialValue : defaultValue;
  function getModeStorageKey() {
    return get$1(modeStorageKey);
  }
  const { subscribe: subscribe2, set: _set } = writable(value, () => {
    if (!isBrowser)
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
  function set2(v) {
    _set(value = v);
    storage.setItem(getModeStorageKey(), value);
  }
  return {
    subscribe: subscribe2,
    set: set2
  };
}
function createCustomTheme() {
  const storage = isBrowser ? localStorage : noopStorage;
  const initialValue = storage.getItem(getThemeStorageKey());
  let value = initialValue === null || initialValue === void 0 ? "" : initialValue;
  function getThemeStorageKey() {
    return get$1(themeStorageKey);
  }
  const { subscribe: subscribe2, set: _set } = writable(value, () => {
    if (!isBrowser)
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
  function set2(v) {
    _set(value = v);
    storage.setItem(getThemeStorageKey(), value);
  }
  return {
    subscribe: subscribe2,
    set: set2
  };
}
function createSystemMode() {
  const defaultValue = void 0;
  let track = true;
  const { subscribe: subscribe2, set: set2 } = writable(defaultValue, () => {
    if (!isBrowser)
      return;
    const handler = (e) => {
      if (!track)
        return;
      set2(e.matches ? "light" : "dark");
    };
    const mediaQueryState = window.matchMedia("(prefers-color-scheme: light)");
    mediaQueryState.addEventListener("change", handler);
    return () => mediaQueryState.removeEventListener("change", handler);
  });
  function query() {
    if (!isBrowser)
      return;
    const mediaQueryState = window.matchMedia("(prefers-color-scheme: light)");
    set2(mediaQueryState.matches ? "light" : "dark");
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
    if (!isBrowser)
      return void 0;
    const derivedMode2 = $userPrefersMode === "system" ? $systemPrefersMode : $userPrefersMode;
    const sanitizedDarkClassNames = sanitizeClassNames($darkClassNames);
    const sanitizedLightClassNames = sanitizeClassNames($lightClassNames);
    function update() {
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
      withoutTransition(update);
    } else {
      update();
    }
    return derivedMode2;
  });
  return {
    subscribe: subscribe2
  };
}
function createDerivedTheme() {
  const { subscribe: subscribe2 } = derived([theme, disableTransitions], ([$theme, $disableTransitions]) => {
    if (!isBrowser)
      return void 0;
    function update() {
      const htmlEl = document.documentElement;
      htmlEl.setAttribute("data-theme", $theme);
    }
    if ($disableTransitions) {
      withoutTransition(update);
    } else {
      update();
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
function Sonner_1($$payload, $$props) {
  var $$store_subs;
  let { $$slots, $$events, ...restProps } = $$props;
  Toaster($$payload, spread_props([
    {
      theme: store_get($$store_subs ?? ($$store_subs = {}), "$mode", derivedMode),
      class: "toaster group",
      toastOptions: {
        classes: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      }
    },
    restProps
  ]));
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
function MassToaster($$payload, $$props) {
  push();
  var $$store_subs;
  function process(props) {
    let status = props.status;
    if (status) toast.success(status);
    let errors = props.errors;
    if (JSON.stringify(errors) !== "{}") {
      toast.error(errors[Object.keys(errors)[0]]);
    }
  }
  run(() => {
    process(store_get($$store_subs ?? ($$store_subs = {}), "$page", page).props);
  });
  Sonner_1($$payload, { richColors: true, theme: "dark" });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Layout($$payload, $$props) {
  push();
  var $$store_subs;
  let { children, logged_in } = $$props;
  let menubar_open = false;
  let header_height = 0;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    MassToaster($$payload2);
    $$payload2.out += `<!----> <div class="flex flex-col h-screen">`;
    {
      $$payload2.out += "<!--[-->";
      Header($$payload2, {
        dontHide: menubar_open,
        class: "z-40",
        get clientHeight() {
          return header_height;
        },
        set clientHeight($$value) {
          header_height = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          if (logged_in) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<button class="mx-4">`;
            Menu($$payload3, { class: "w-8 h-8" });
            $$payload3.out += `<!----></button>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <div>`;
      {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      {
        $$payload2.out += "<!--[!-->";
        {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!--]--></div>`;
    }
    $$payload2.out += `<!--]--> `;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div class="flex flex-grow bg-black text-white">`;
    if (store_get($$store_subs ?? ($$store_subs = {}), "$page", page).props.logged_in) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div${attr("class", `min-w-72 px-8 py-6 border-r border-r-neutral-800 ${stringify("hidden")}`)}${attr("style", `height: calc(100vh - ${stringify(header_height)}px);`)}>`;
      LayoutLinks($$payload2, {});
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div${attr("style", `${stringify("")} `)}${attr("class", ` overflow-x-clip w-full ${stringify("overflow-visible h-auto")} ${stringify("")}`)}><div class="w-full h-full relative"><!---->`;
    {
      $$payload2.out += `<div${attr("class", `${stringify("")} w-full h-full bg-black`)} style="top: 0px;">`;
      children == null ? void 0 : children($$payload2);
      $$payload2.out += `<!----></div>`;
    }
    $$payload2.out += `<!----></div></div></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout
}, Symbol.toStringTag, { value: "Module" }));
function Dashboard($$payload, $$props) {
  push();
  let { distinct_visitor_count_by_date } = $$props;
  ({
    labels: distinct_visitor_count_by_date.data.map((element2) => element2.date),
    datasets: [
      {
        label: "Test",
        data: distinct_visitor_count_by_date.data.map((element2) => element2.total),
        backgroundColor: ["rgb(53, 132, 228, 0.3)"],
        borderColor: ["rgb(53, 132, 228)"],
        borderWidth: 2
      }
    ]
  });
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Webtools - BjeloPIC</title>`;
  });
  $$payload.out += `<main class="max-w-screen-lg mx-auto p-4"><div class="flex flex-col space-y-4"><div class="p-4 bg-neutral-900 border rounded-md border-neutral-800">`;
  DashboardChart($$payload);
  $$payload.out += `<!----></div></div></main>`;
  pop();
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard,
  layout: Layout
}, Symbol.toStringTag, { value: "Module" }));
function HeroVideo($$payload, $$props) {
  push();
  var $$store_subs;
  let { heroUrl } = $$props;
  let form = useForm({ video: null });
  $$payload.out += `<main class="max-w-screen-lg mx-auto p-4 flex flex-col gap-y-4 mt-2"><form><input type="file" class="hidden" id="new-hero-video" accept="video/webm"> <div class="flex justify-center"><label for="new-hero-video"${attr("class", `px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-l-md ${stringify(store_get($$store_subs ?? ($$store_subs = {}), "$form", form).video ? "" : "rounded-r-md ")} hover:opacity-80 items-center content-center text-sm`)}>${escape_html(store_get($$store_subs ?? ($$store_subs = {}), "$form", form).video ? store_get($$store_subs ?? ($$store_subs = {}), "$form", form).video.name : "Select new hero video")}</label> `;
  if (store_get($$store_subs ?? ($$store_subs = {}), "$form", form).video) {
    $$payload.out += "<!--[-->";
    Button($$payload, {
      type: "submit",
      class: "rounded-l-none bg-green-600 hover:bg-green-600/90 text-primary-foreground",
      children: ($$payload2) => {
        Arrow_up($$payload2, {});
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></form> <video class="w-full rounded-md" controls><track kind="captions"> <source${attr("src", heroUrl)} type="video/webm"></video></main>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HeroVideo,
  layout: Layout
}, Symbol.toStringTag, { value: "Module" }));
function Input($$payload, $$props) {
  push();
  let {
    ref = null,
    value = void 0,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<input${spread_attributes({
    class: cn$1("border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
    value,
    ...restProps
  })}>`;
  bind_props($$props, { ref, value });
  pop();
}
function Label($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Label$1($$payload2, spread_props([
      {
        class: cn$1("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Card($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({
    class: cn$1("bg-card text-card-foreground rounded-lg border shadow-sm", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Card_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({ class: cn$1("p-6", className), ...restProps })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Card_footer($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({
    class: cn$1("flex items-center p-6 pt-0", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Card_header($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({
    class: cn$1("flex flex-col space-y-1.5 p-6 pb-0", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Card_title($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    level = 3,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({
    role: "heading",
    "aria-level": level,
    class: cn$1("text-2xl font-semibold leading-none tracking-tight", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Checkbox($$payload, $$props) {
  push();
  let {
    ref = null,
    checked = false,
    indeterminate = false,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    {
      let children = function($$payload3, { checked: checked2, indeterminate: indeterminate2 }) {
        $$payload3.out += `<div class="flex size-4 items-center justify-center text-current">`;
        if (indeterminate2) {
          $$payload3.out += "<!--[-->";
          Minus($$payload3, { class: "size-3.5" });
        } else {
          $$payload3.out += "<!--[!-->";
          Check($$payload3, {
            class: cn$1("size-3.5", !checked2 && "text-transparent")
          });
        }
        $$payload3.out += `<!--]--></div>`;
      };
      Checkbox$1($$payload2, spread_props([
        {
          class: cn$1("border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer box-content size-4 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50", className)
        },
        restProps,
        {
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          },
          get checked() {
            return checked;
          },
          set checked($$value) {
            checked = $$value;
            $$settled = false;
          },
          get indeterminate() {
            return indeterminate;
          },
          set indeterminate($$value) {
            indeterminate = $$value;
            $$settled = false;
          },
          children,
          $$slots: { default: true }
        }
      ]));
    }
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref, checked, indeterminate });
  pop();
}
function Login($$payload, $$props) {
  push();
  var $$store_subs;
  let form = useForm({ email: null, password: null, remember: false });
  function processRefresh(props) {
    if (JSON.stringify(props.errors) !== "{}") {
      toast.error(props.errors.email);
    }
  }
  run(() => {
    processRefresh(store_get($$store_subs ?? ($$store_subs = {}), "$page", page).props);
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Toaster($$payload2, { theme: "dark", richColors: true });
    $$payload2.out += `<!----> <main class="max-w-screen-lg mx-auto p-4"><form>`;
    Card($$payload2, {
      class: "w-[350px] mx-auto",
      children: ($$payload3) => {
        Card_header($$payload3, {
          children: ($$payload4) => {
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Login`;
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Card_content($$payload3, {
          children: ($$payload4) => {
            Label($$payload4, {
              for: "email",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Email`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              type: "email",
              required: true,
              name: "email",
              get value() {
                return store_get($$store_subs ?? ($$store_subs = {}), "$form", form).email;
              },
              set value($$value) {
                store_mutate($$store_subs ?? ($$store_subs = {}), "$form", form, store_get($$store_subs ?? ($$store_subs = {}), "$form", form).email = $$value);
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            Label($$payload4, {
              for: "password",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Password`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              type: "password",
              required: true,
              name: "password",
              get value() {
                return store_get($$store_subs ?? ($$store_subs = {}), "$form", form).password;
              },
              set value($$value) {
                store_mutate($$store_subs ?? ($$store_subs = {}), "$form", form, store_get($$store_subs ?? ($$store_subs = {}), "$form", form).password = $$value);
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> <div class="flex gap-x-2 items-center mt-2">`;
            Checkbox($$payload4, {
              id: "rememberme",
              get checked() {
                return store_get($$store_subs ?? ($$store_subs = {}), "$form", form).remember;
              },
              set checked($$value) {
                store_mutate($$store_subs ?? ($$store_subs = {}), "$form", form, store_get($$store_subs ?? ($$store_subs = {}), "$form", form).remember = $$value);
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            Label($$payload4, {
              for: "rememberme",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Remember me`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Card_footer($$payload3, {
          children: ($$payload4) => {
            Button($$payload4, {
              variant: "outline",
              type: "submit",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Login`;
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></form></main>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login,
  layout: Layout
}, Symbol.toStringTag, { value: "Module" }));
function Alert_dialog_title($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    level = 3,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog_title$1($$payload2, spread_props([
      {
        class: cn$1("text-lg font-semibold", className),
        level
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_action($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Alert_dialog_action$1($$payload2, spread_props([
      { class: cn$1(buttonVariants(), className) },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_cancel($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Alert_dialog_cancel$1($$payload2, spread_props([
      {
        class: cn$1(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_footer($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({
    class: cn$1("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_header($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({
    class: cn$1("flex flex-col space-y-2 text-center sm:text-left", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_overlay($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog_overlay$1($$payload2, spread_props([
      {
        class: cn$1("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50 bg-black/80", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    portalProps,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Portal$1($$payload2, spread_props([
      portalProps,
      {
        children: ($$payload3) => {
          Alert_dialog_overlay($$payload3, {});
          $$payload3.out += `<!----> <!---->`;
          Alert_dialog_content$1($$payload3, spread_props([
            {
              class: cn$1("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg", className)
            },
            restProps,
            {
              get ref() {
                return ref;
              },
              set ref($$value) {
                ref = $$value;
                $$settled = false;
              }
            }
          ]));
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const Root$3 = Alert_dialog;
const Trigger$2 = Dialog_trigger;
function Stills($$payload, $$props) {
  push();
  let { video, stills } = $$props;
  useForm({
    /** @type {File[]|null} */
    stills: null
  });
  let deleteTarget = null;
  let deleteDialogShown = false;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(stills);
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>${escape_html(video.title)} (${escape_html(new Date(video.publication_date).getUTCFullYear())}) - Webtools</title>`;
    });
    $$payload2.out += `<!---->`;
    Root$3($$payload2, {
      get open() {
        return deleteDialogShown;
      },
      set open($$value) {
        deleteDialogShown = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Alert_dialog_content($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Alert_dialog_header($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Are you sure?`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Alert_dialog_footer($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Alert_dialog_cancel($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Cancel`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <!---->`;
                {
                  let child = function($$payload6, props) {
                    Button($$payload6, spread_props([
                      {
                        variant: "destructive",
                        onclick: () => {
                          router.visit("/webtools/videos/stills/" + deleteTarget, {
                            method: "delete",
                            onSuccess: () => {
                              deleteTarget = null;
                              deleteDialogShown = false;
                            }
                          });
                        }
                      },
                      props,
                      {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->Delete`;
                        },
                        $$slots: { default: true }
                      }
                    ]));
                  };
                  Alert_dialog_action($$payload5, { child, $$slots: { child: true } });
                }
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <section class="px-8 py-4 flex flex-col gap-y-2 max-w-screen-sm md:max-w-screen-xl mx-auto"><h1 class="text-2xl mb-2 text-center md:text-left"><span>Stills of</span> <span class="font-semibold">${escape_html(video.title)} (${escape_html(new Date(video.publication_date).getUTCFullYear())})</span></h1> <input type="file" class="hidden" id="still-input" accept="image/*" multiple> <div class="grid grid-cols-1 md:grid-cols-2 xl:gap-6 gap-6 md:gap-4 mt-2 md:mt-0"><label class="bg-bjelopic-neutral-8 w-full h-full rounded-md overflow-clip text-neutral-500 hover:text-white transition-colors flex items-center justify-center" for="still-input">`;
    Root$4($$payload2, {
      ratio: stills.length > 0 ? 3 : 2.35,
      children: ($$payload3) => {
        $$payload3.out += `<div class="w-full h-full flex justify-center items-center">`;
        Plus($$payload3, { class: "w-12 h-12" });
        $$payload3.out += `<!----></div>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></label> <!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let still = each_array[i];
      Root$4($$payload2, {
        ratio: 16 / 9,
        class: "group rounded-md overflow-clip bg-background border border-accent drop-shadow-glow-sm",
        children: ($$payload3) => {
          $$payload3.out += `<img${attr("src", still.path)} class="object-contain w-full h-full"${attr("alt", "Still no. " + (i + 1) + " for " + video.title)}> `;
          Button($$payload3, {
            variant: "destructive",
            class: "absolute right-2 bottom-2 lg:hidden group-hover:block transition-all",
            onclick: () => {
              deleteTarget = still.id;
              deleteDialogShown = true;
            },
            children: ($$payload4) => {
              Trash($$payload4, { class: "w-4 h-4" });
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
    }
    $$payload2.out += `<!--]--></div></section>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Stills,
  layout: Layout
}, Symbol.toStringTag, { value: "Module" }));
function Calendar_1($$payload, $$props) {
  push();
  let {
    ref = null,
    value = void 0,
    placeholder = void 0,
    class: className,
    weekdayFormat = "short",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    {
      let children = function($$payload3, { months, weekdays }) {
        $$payload3.out += `<!---->`;
        Calendar_header($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Calendar_prev_button($$payload4, {});
            $$payload4.out += `<!----> <!---->`;
            Calendar_heading($$payload4, {});
            $$payload4.out += `<!----> <!---->`;
            Calendar_next_button($$payload4, {});
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Calendar_months($$payload3, {
          children: ($$payload4) => {
            const each_array = ensure_array_like(months);
            $$payload4.out += `<!--[-->`;
            for (let $$index_3 = 0, $$length = each_array.length; $$index_3 < $$length; $$index_3++) {
              let month = each_array[$$index_3];
              $$payload4.out += `<!---->`;
              Calendar_grid($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Calendar_grid_head($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Calendar_grid_row($$payload6, {
                        class: "flex",
                        children: ($$payload7) => {
                          const each_array_1 = ensure_array_like(weekdays);
                          $$payload7.out += `<!--[-->`;
                          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                            let weekday = each_array_1[$$index];
                            $$payload7.out += `<!---->`;
                            Calendar_head_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(weekday.slice(0, 2))}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!---->`;
                          }
                          $$payload7.out += `<!--]-->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> <!---->`;
                  Calendar_grid_body($$payload5, {
                    children: ($$payload6) => {
                      const each_array_2 = ensure_array_like(month.weeks);
                      $$payload6.out += `<!--[-->`;
                      for (let $$index_2 = 0, $$length2 = each_array_2.length; $$index_2 < $$length2; $$index_2++) {
                        let weekDates = each_array_2[$$index_2];
                        $$payload6.out += `<!---->`;
                        Calendar_grid_row($$payload6, {
                          class: "mt-2 w-full",
                          children: ($$payload7) => {
                            const each_array_3 = ensure_array_like(weekDates);
                            $$payload7.out += `<!--[-->`;
                            for (let $$index_1 = 0, $$length3 = each_array_3.length; $$index_1 < $$length3; $$index_1++) {
                              let date = each_array_3[$$index_1];
                              $$payload7.out += `<!---->`;
                              Calendar_cell($$payload7, {
                                date,
                                month: month.value,
                                children: ($$payload8) => {
                                  $$payload8.out += `<!---->`;
                                  Calendar_day($$payload8, {});
                                  $$payload8.out += `<!---->`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload7.out += `<!---->`;
                            }
                            $$payload7.out += `<!--]-->`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload6.out += `<!---->`;
                      }
                      $$payload6.out += `<!--]-->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      };
      Calendar$1($$payload2, spread_props([
        {
          weekdayFormat,
          class: cn$1("p-3", className)
        },
        restProps,
        {
          get value() {
            return value;
          },
          set value($$value) {
            value = $$value;
            $$settled = false;
          },
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          },
          get placeholder() {
            return placeholder;
          },
          set placeholder($$value) {
            placeholder = $$value;
            $$settled = false;
          },
          children,
          $$slots: { default: true }
        }
      ]));
    }
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref, value, placeholder });
  pop();
}
function Calendar_cell($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_cell$1($$payload2, spread_props([
      {
        class: cn$1("[&:has([data-selected])]:bg-accent [&:has([data-selected][data-outside-month])]:bg-accent/50 relative size-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_day($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_day$1($$payload2, spread_props([
      {
        class: cn$1(
          buttonVariants({ variant: "ghost" }),
          "size-9 p-0 font-normal",
          "[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground",
          // Selected
          "data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground data-[selected]:opacity-100",
          // Disabled
          "data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
          // Unavailable
          "data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through",
          // Outside months
          "data-[outside-month]:text-muted-foreground [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground data-[outside-month]:pointer-events-none data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:opacity-30",
          className
        )
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_grid$1($$payload2, spread_props([
      {
        class: cn$1("w-full border-collapse space-y-1", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_header($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_header$1($$payload2, spread_props([
      {
        class: cn$1("relative flex w-full items-center justify-between pt-1", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_months($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({
    class: cn$1("mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_row($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_grid_row$1($$payload2, spread_props([
      { class: cn$1("flex", className) },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_heading($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_heading$1($$payload2, spread_props([
      {
        class: cn$1("text-sm font-medium", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_body($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_grid_body$1($$payload2, spread_props([
      { class: cn$1(className) },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_head($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_grid_head$1($$payload2, spread_props([
      { class: cn$1(className) },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_head_cell($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_head_cell$1($$payload2, spread_props([
      {
        class: cn$1("text-muted-foreground w-9 rounded-md text-[0.8rem] font-normal", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Fallback$1($$payload) {
  Chevron_right($$payload, { class: "size-4" });
}
function Calendar_next_button($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_next_button$1($$payload2, spread_props([
      {
        class: cn$1(buttonVariants({ variant: "outline" }), "size-7 bg-transparent p-0 opacity-50 hover:opacity-100", className),
        children: children || Fallback$1
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Fallback($$payload) {
  Chevron_left($$payload, { class: "size-4" });
}
function Calendar_prev_button($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_prev_button$1($$payload2, spread_props([
      {
        class: cn$1(buttonVariants({ variant: "outline" }), "size-7 bg-transparent p-0 opacity-50 hover:opacity-100", className),
        children: children || Fallback
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Popover_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    sideOffset = 4,
    align = "center",
    portalProps,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Portal$1($$payload2, spread_props([
      portalProps,
      {
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Popover_content$1($$payload3, spread_props([
            {
              sideOffset,
              align,
              class: cn$1("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-none", className)
            },
            restProps,
            {
              get ref() {
                return ref;
              },
              set ref($$value) {
                ref = $$value;
                $$settled = false;
              }
            }
          ]));
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const Root$2 = Popover;
const Trigger$1 = Popover_trigger;
function DatePicker($$payload, $$props) {
  push();
  const df = new DateFormatter("en-US", { dateStyle: "long" });
  let {
    value = void 0,
    disabled = false,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Root$2($$payload2, {
      openFocus: true,
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { builder }) {
            Button($$payload4, {
              variant: "outline",
              class: `${stringify(cn$1("w-[280px] justify-start text-left font-normal", !value && "text-muted-foreground"))} ${stringify(rest.class)}`,
              builders: [builder],
              disabled,
              children: ($$payload5) => {
                Calendar($$payload5, { class: "mr-2 h-4 w-4" });
                $$payload5.out += `<!----> ${escape_html(value ? df.format(value.toDate(getLocalTimeZone())) : "Select a date")}`;
              },
              $$slots: { default: true }
            });
          };
          Trigger$1($$payload3, {
            asChild: true,
            children,
            $$slots: { default: true }
          });
        }
        $$payload3.out += `<!----> <!---->`;
        Popover_content($$payload3, {
          class: "w-auto p-0",
          children: ($$payload4) => {
            Calendar_1($$payload4, {
              initialFocus: true,
              get value() {
                return value;
              },
              set value($$value) {
                value = $$value;
                $$settled = false;
              }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { value });
  pop();
}
function Dialog_title($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog_title$1($$payload2, spread_props([
      {
        class: cn$1("text-lg font-semibold leading-none tracking-tight", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Dialog_footer($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({
    class: cn$1("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Dialog_header($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({
    class: cn$1("flex flex-col space-y-1.5 text-center sm:text-left", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Dialog_overlay($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog_overlay$1($$payload2, spread_props([
      {
        class: cn$1("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50 bg-black/80", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Dialog_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    portalProps,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Portal($$payload2, spread_props([
      portalProps,
      {
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Dialog_overlay($$payload3, {});
          $$payload3.out += `<!----> <!---->`;
          Dialog_content$1($$payload3, spread_props([
            {
              class: cn$1("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] bg-background fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg", className)
            },
            restProps,
            {
              get ref() {
                return ref;
              },
              set ref($$value) {
                ref = $$value;
                $$settled = false;
              },
              children: ($$payload4) => {
                children == null ? void 0 : children($$payload4);
                $$payload4.out += `<!----> <!---->`;
                Dialog_close($$payload4, {
                  class: "ring-offset-background focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none",
                  children: ($$payload5) => {
                    X($$payload5, { class: "size-4" });
                    $$payload5.out += `<!----> <span class="sr-only">Close</span>`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            }
          ]));
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const Root$1 = Dialog;
const Trigger = Dialog_trigger;
const Portal = Portal$1;
function TemporaryUploadDialog($$payload, $$props) {
  var _a;
  push();
  const csrf_token = (_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  if (csrf_token) {
    headers.append("X-CSRF-TOKEN", csrf_token);
  }
  let formData = {
    /** @type {string | CalendarDate | DateValue} */
    expiry_date: today(getLocalTimeZone()).add({ days: 1 }),
    expiry_hours: 12,
    expiry_minutes: 0,
    expiry_seconds: 0,
    expires: true,
    /** @type {?string} */
    resumable_identifier: null
  };
  let resumable = new Resumable({
    target: "/webtools/uploads/upload",
    query: {
      _token: csrf_token ?? "",
      temporaryUploadId: null
    },
    chunkSize: 10 * 1024 * 1024
  });
  let files = [];
  resumable.files = files;
  let uploading = false;
  let dialogOpen = false;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    var _a2;
    $$payload2.out += `<div class="flex flex-col"><input type="file" class="hidden" id="file-input-field"> `;
    {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<!---->`;
      Root$1($$payload2, {
        get open() {
          return dialogOpen;
        },
        set open($$value) {
          dialogOpen = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          {
            let child = function($$payload4, { props }) {
              {
                $$payload4.out += "<!--[-->";
                Button($$payload4, spread_props([
                  props,
                  {
                    disabled: uploading,
                    children: ($$payload5) => {
                      $$payload5.out += `<!---->Upload`;
                    },
                    $$slots: { default: true }
                  }
                ]));
              }
              $$payload4.out += `<!--]-->`;
            };
            Trigger($$payload3, { child, $$slots: { child: true } });
          }
          $$payload3.out += `<!----> <!---->`;
          Dialog_content($$payload3, {
            children: ($$payload4) => {
              var _a3;
              $$payload4.out += `<!---->`;
              Dialog_header($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Dialog_title($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Upload`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> <form class="flex flex-col items-left md:items-center gap-x-4 gap-y-2 mb-1}"><label class="hover:bg-accent hover:cursor-pointer text-sm px-4 py-2 border border-accent rounded-md text-ellipsis overflow-hidden text-nowrap" for="file-input-field">${escape_html(((_a3 = files[0]) == null ? void 0 : _a3.fileName) ?? "No file selected")}</label> <div class="flex items-center gap-x-2">`;
              Checkbox($$payload4, {
                id: "expires-box",
                get checked() {
                  return formData.expires;
                },
                set checked($$value) {
                  formData.expires = $$value;
                  $$settled = false;
                }
              });
              $$payload4.out += `<!----> `;
              Label($$payload4, {
                for: "expires-box",
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Expires`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----></div> <div${attr("class", `flex flex-row flex-wrap items-center justify-left gap-x-4 gap-y-2 ${stringify(!formData.expires ? "text-neutral-800" : "")}`)}>`;
              DatePicker($$payload4, {
                disabled: !formData.expires,
                get value() {
                  return formData.expiry_date;
                },
                set value($$value) {
                  formData.expiry_date = $$value;
                  $$settled = false;
                }
              });
              $$payload4.out += `<!----> <div class="flex items-center gap-x-2"><span>@</span> `;
              Input($$payload4, {
                disabled: !formData.expires,
                type: "number",
                class: "w-28",
                oninput: () => {
                  formData.expiry_hours = Math.min(Math.max(formData.expiry_hours, 0), 23);
                },
                get value() {
                  return formData.expiry_hours;
                },
                set value($$value) {
                  formData.expiry_hours = $$value;
                  $$settled = false;
                }
              });
              $$payload4.out += `<!----> <span>h</span></div></div> <!---->`;
              Dialog_footer($$payload4, {
                children: ($$payload5) => {
                  Button($$payload5, {
                    disabled: !resumable.files.length || uploading,
                    type: "submit",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Submit`;
                    },
                    $$slots: { default: true }
                  });
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----></form>`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    }
    $$payload2.out += `<!--]--> <div${attr("class", "hidden")}><form class="flex justify-center items-center gap-x-4 mb-1}"><label class="hover:bg-accent hover:cursor-pointer text-sm px-4 py-2 border border-accent rounded-md text-ellipsis overflow-hidden text-nowrap" for="file-input-field">${escape_html(((_a2 = files[0]) == null ? void 0 : _a2.fileName) ?? "No file selected")}</label> <div class="flex items-center gap-x-2">`;
    Checkbox($$payload2, {
      id: "expires-box",
      get checked() {
        return formData.expires;
      },
      set checked($$value) {
        formData.expires = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Label($$payload2, {
      for: "expires-box",
      children: ($$payload3) => {
        $$payload3.out += `<!---->Expires`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> `;
    DatePicker($$payload2, {
      disabled: !formData.expires,
      get value() {
        return formData.expiry_date;
      },
      set value($$value) {
        formData.expiry_date = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <span${attr("class", !formData.expires ? "text-neutral-800" : "")}>@</span> <div class="flex items-center gap-x-2">`;
    Input($$payload2, {
      disabled: !formData.expires,
      type: "number",
      class: "w-20",
      oninput: () => {
        formData.expiry_hours = Math.min(Math.max(formData.expiry_hours, 0), 23);
      },
      get value() {
        return formData.expiry_hours;
      },
      set value($$value) {
        formData.expiry_hours = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> `;
    {
      $$payload2.out += "<!--[-->";
      Button($$payload2, {
        type: "submit",
        disabled: !resumable.files.length || uploading,
        children: ($$payload3) => {
          $$payload3.out += `<!---->Upload`;
        },
        $$slots: { default: true }
      });
    }
    $$payload2.out += `<!--]--></form></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TemporaryUploadDialog
}, Symbol.toStringTag, { value: "Module" }));
function Table($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div class="relative w-full overflow-auto"><table${spread_attributes({
    class: cn$1("w-full caption-bottom text-sm", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></table></div>`;
  bind_props($$props, { ref });
  pop();
}
function Table_body($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<tbody${spread_attributes({
    class: cn$1("[&_tr:last-child]:border-0", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></tbody>`;
  bind_props($$props, { ref });
  pop();
}
function Table_caption($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<caption${spread_attributes({
    class: cn$1("text-muted-foreground mt-4 text-sm", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></caption>`;
  bind_props($$props, { ref });
  pop();
}
function Table_cell($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<td${spread_attributes({
    class: cn$1("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></td>`;
  bind_props($$props, { ref });
  pop();
}
function Table_head($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<th${spread_attributes({
    class: cn$1("text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></th>`;
  bind_props($$props, { ref });
  pop();
}
function Table_header($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<thead${spread_attributes({
    class: cn$1("[&_tr]:border-b", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></thead>`;
  bind_props($$props, { ref });
  pop();
}
function Table_row($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<tr${spread_attributes({
    class: cn$1("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className),
    ...restProps
  })}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></tr>`;
  bind_props($$props, { ref });
  pop();
}
function Uploads($$payload, $$props) {
  push();
  let delete_temporary_upload_dialog_open = false;
  let temporary_uploads = $$props["temporary_uploads"];
  let delete_candidate_temporary_upload_id = -1;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Uploads - Webtools</title>`;
    });
    $$payload2.out += `<main class="max-w-screen-xl mx-auto p-4"><!---->`;
    {
      TemporaryUploadDialog($$payload2);
    }
    $$payload2.out += `<!----> `;
    Root$3($$payload2, {
      get open() {
        return delete_temporary_upload_dialog_open;
      },
      set open($$value) {
        delete_temporary_upload_dialog_open = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Trigger$2($$payload3, {});
        $$payload3.out += `<!----> `;
        Alert_dialog_content($$payload3, {
          children: ($$payload4) => {
            Alert_dialog_header($$payload4, {
              children: ($$payload5) => {
                Alert_dialog_title($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Are you absolutely sure?`;
                  },
                  $$slots: { default: true }
                });
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Alert_dialog_footer($$payload4, {
              children: ($$payload5) => {
                Alert_dialog_cancel($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Cancel`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Button($$payload5, {
                  onclick: () => router.visit("/webtools/uploads/" + delete_candidate_temporary_upload_id, {
                    method: "delete",
                    onSuccess: () => delete_temporary_upload_dialog_open = false
                  }),
                  variant: "destructive",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Delete`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <section class="border border-neutral-800 rounded-xl overflow-clip">`;
    Table($$payload2, {
      children: ($$payload3) => {
        if (temporary_uploads.length === 0) {
          $$payload3.out += "<!--[-->";
          Table_caption($$payload3, {
            class: "mb-3",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Empty...`;
            },
            $$slots: { default: true }
          });
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> `;
        Table_header($$payload3, {
          children: ($$payload4) => {
            Table_row($$payload4, {
              children: ($$payload5) => {
                Table_head($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->User`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Table_head($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->File name`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Table_head($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Link`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Table_head($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Expires on`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Table_head($$payload5, { class: "w-8" });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Table_body($$payload3, {
          children: ($$payload4) => {
            const each_array = ensure_array_like(temporary_uploads);
            $$payload4.out += `<!--[-->`;
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let upload = each_array[$$index];
              Table_row($$payload4, {
                children: ($$payload5) => {
                  Table_cell($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->${escape_html(upload.user.name)}`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Table_cell($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->${escape_html(upload.original_name)}`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Table_cell($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<button class="p-2 hover:text-neutral-400 transition duration-200">`;
                      Copy($$payload6, { class: "w-5 h-5" });
                      $$payload6.out += `<!----></button>`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Table_cell($$payload5, {
                    children: ($$payload6) => {
                      if (upload.expiry_datetime) {
                        $$payload6.out += "<!--[-->";
                        $$payload6.out += `${escape_html(upload.expiry_datetime)}`;
                      } else {
                        $$payload6.out += "<!--[!-->";
                        $$payload6.out += `Never`;
                      }
                      $$payload6.out += `<!--]-->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Table_cell($$payload5, {
                    children: ($$payload6) => {
                      Button($$payload6, {
                        onclick: () => {
                          delete_candidate_temporary_upload_id = upload.id;
                          delete_temporary_upload_dialog_open = true;
                        },
                        variant: "ghost",
                        class: "text-red-500",
                        children: ($$payload7) => {
                          Trash($$payload7, { class: "w-4 h-4" });
                        },
                        $$slots: { default: true }
                      });
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></section></main>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { temporary_uploads });
  pop();
}
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Uploads,
  layout: Layout
}, Symbol.toStringTag, { value: "Module" }));
function Users($$payload) {
}
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Users
}, Symbol.toStringTag, { value: "Module" }));
function Tabs_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Tabs_content$1($$payload2, spread_props([
      {
        class: cn$1("ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Tabs_list($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Tabs_list$1($$payload2, spread_props([
      {
        class: cn$1("bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Tabs_trigger($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Tabs_trigger$1($$payload2, spread_props([
      {
        class: cn$1("ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const Root = Tabs;
function Textarea($$payload, $$props) {
  push();
  let {
    ref = null,
    value = void 0,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<textarea${spread_attributes({
    class: cn$1("border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
    ...restProps
  })}>`;
  const $$body = escape_html(value);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea>`;
  bind_props($$props, { ref, value });
  pop();
}
function Command($$payload, $$props) {
  push();
  let {
    ref = null,
    value = "",
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Command$1($$payload2, spread_props([
      {
        class: cn$1("bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md", className)
      },
      restProps,
      {
        get value() {
          return value;
        },
        set value($$value) {
          value = $$value;
          $$settled = false;
        },
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref, value });
  pop();
}
function Command_empty($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<!---->`;
  Command_empty$1($$payload, spread_props([
    {
      class: cn$1("py-6 text-center text-sm", className)
    },
    restProps
  ]));
  $$payload.out += `<!---->`;
  bind_props($$props, { ref });
  pop();
}
function Command_group($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    heading,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Command_group$1($$payload2, spread_props([
      {
        class: cn$1("text-foreground overflow-hidden p-1", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          if (heading) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<!---->`;
            Command_group_heading($$payload3, {
              class: "text-muted-foreground px-2 py-1.5 text-xs font-medium",
              children: ($$payload4) => {
                $$payload4.out += `<!---->${escape_html(heading)}`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <!---->`;
          Command_group_items($$payload3, { children });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Command_item($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Command_item$1($$payload2, spread_props([
      {
        class: cn$1("aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Command_input($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    value = "",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="flex items-center border-b px-2" data-command-input-wrapper="">`;
    Search($$payload2, { class: "mr-2 size-4 shrink-0 opacity-50" });
    $$payload2.out += `<!----> <!---->`;
    Command_input$1($$payload2, spread_props([
      {
        class: cn$1("placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        get value() {
          return value;
        },
        set value($$value) {
          value = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref, value });
  pop();
}
function Videos($$payload, $$props) {
  push();
  var $$store_subs;
  let { videos, collections, available_roles } = $$props;
  let new_video_dialog_open = false;
  let collections_open = false;
  let new_collection_open = false;
  let new_collection_name = "";
  let currently_edited_video = null;
  let new_video_form = useForm(
    /** @type {GalleryVideoProps} */
    {
      /** @type {number|null} */
      id: null,
      /** @type {string|null} */
      title: null,
      /** @type {string|null} */
      description: null,
      /** @type {string|null} */
      subject: null,
      /** @type {string|null} */
      poster: null,
      /** @type {boolean} */
      poster_deleted: false,
      /** @type {string|null} */
      preview: null,
      /** @type {boolean} */
      preview_deleted: false,
      /** @type {string|null} */
      thumbnail: null,
      /** @type {string|null} */
      link: null,
      /** @type {any} */
      publication_date: null,
      /** @type {string|null} */
      collection: "",
      /** @type {string|null} */
      category: null,
      /** @type {string[]} */
      roles: []
    }
  );
  const df = new DateFormatter("en-US", { dateStyle: "long" });
  function processSubmit() {
    let previous_date = store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).publication_date;
    if (store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).publication_date) {
      store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).publication_date = store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).publication_date.toString());
    }
    {
      store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).post("/webtools/videos", { onSuccess: () => new_video_dialog_open = false });
    }
    store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).publication_date = previous_date);
  }
  let collectionPopoverOpen = false;
  let triggerRef = null;
  function closeAndFocusTrigger() {
    collectionPopoverOpen = false;
    tick().then(() => {
      triggerRef == null ? void 0 : triggerRef.focus();
    });
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array_2 = ensure_array_like(videos);
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Videos - Webtools</title>`;
    });
    $$payload2.out += `<main class="max-w-screen-xl mx-auto p-4 px-4 md:px-8 w-full overflow-scroll-y"><div class="flex justify-end"><!---->`;
    Root$1($$payload2, {
      get open() {
        return new_video_dialog_open;
      },
      set open($$value) {
        new_video_dialog_open = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        $$payload3.out += `<form><!---->`;
        Dialog_content($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Dialog_header($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Dialog_title($$payload5, {
                  class: "text-2xl",
                  children: ($$payload6) => {
                    if (store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).title) {
                      $$payload6.out += "<!--[-->";
                      $$payload6.out += `${escape_html(store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).title)}`;
                    } else {
                      $$payload6.out += "<!--[!-->";
                      $$payload6.out += `New video`;
                    }
                    $$payload6.out += `<!--]--> `;
                    if (store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).publication_date) {
                      $$payload6.out += "<!--[-->";
                      $$payload6.out += `<span class="text-bjelopic-blue-1">(${escape_html(new Date(store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).publication_date).getFullYear())})</span>`;
                    } else {
                      $$payload6.out += "<!--[!-->";
                    }
                    $$payload6.out += `<!--]-->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Root($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Tabs_list($$payload5, {
                  class: "grid grid-cols-2 w-full",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Tabs_trigger($$payload6, {
                      value: "info",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Info`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Tabs_trigger($$payload6, {
                      value: "media",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Media`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <!---->`;
                Tabs_content($$payload5, {
                  value: "info",
                  class: "h-[450px] overflow-x-clip overflow-y-scroll",
                  children: ($$payload6) => {
                    Label($$payload6, {
                      for: "new-video-title",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Title*`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Input($$payload6, {
                      id: "new-video-title",
                      type: "text",
                      required: true,
                      get value() {
                        return store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).title;
                      },
                      set value($$value) {
                        store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).title = $$value);
                        $$settled = false;
                      }
                    });
                    $$payload6.out += `<!----> `;
                    Label($$payload6, {
                      for: "new-video-description",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Description`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Textarea($$payload6, {
                      id: "new-video-description",
                      get value() {
                        return store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).description;
                      },
                      set value($$value) {
                        store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).description = $$value);
                        $$settled = false;
                      }
                    });
                    $$payload6.out += `<!----> `;
                    Label($$payload6, {
                      for: "new-video-category",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Category*`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Input($$payload6, {
                      type: "text",
                      id: "new-video-category",
                      required: true,
                      get value() {
                        return store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).category;
                      },
                      set value($$value) {
                        store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).category = $$value);
                        $$settled = false;
                      }
                    });
                    $$payload6.out += `<!----> `;
                    Label($$payload6, {
                      for: "new-video-subject",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Subject*`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Input($$payload6, {
                      type: "text",
                      id: "new-video-subject",
                      required: true,
                      get value() {
                        return store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).subject;
                      },
                      set value($$value) {
                        store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).subject = $$value);
                        $$settled = false;
                      }
                    });
                    $$payload6.out += `<!----> `;
                    Label($$payload6, {
                      for: "new-video-publication-date",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Publication date*`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----><br> <!---->`;
                    Root$2($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->`;
                        {
                          let child = function($$payload8, { props }) {
                            Button($$payload8, spread_props([
                              {
                                variant: "outline",
                                class: cn$1("w-[280px] justify-start text-left font-normal", !store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).publication_date && "text-muted-foreground")
                              },
                              props,
                              {
                                children: ($$payload9) => {
                                  Calendar($$payload9, { class: "mr-2 h-4 w-4" });
                                  $$payload9.out += `<!----> ${escape_html(store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).publication_date ? df.format(store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).publication_date.toDate(getLocalTimeZone())) : "Select a date")}`;
                                },
                                $$slots: { default: true }
                              }
                            ]));
                          };
                          Trigger$1($$payload7, {
                            id: "new-video-publication-date",
                            child,
                            $$slots: { child: true }
                          });
                        }
                        $$payload7.out += `<!----> <!---->`;
                        Popover_content($$payload7, {
                          class: "w-auto p-0",
                          children: ($$payload8) => {
                            Calendar_1($$payload8, {
                              type: "single",
                              initialFocus: true,
                              get value() {
                                return store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).publication_date;
                              },
                              set value($$value) {
                                store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).publication_date = $$value);
                                $$settled = false;
                              }
                            });
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <br> `;
                    Label($$payload6, {
                      for: "link",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Link`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Input($$payload6, {
                      type: "text",
                      required: true,
                      get value() {
                        return store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).link;
                      },
                      set value($$value) {
                        store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).link = $$value);
                        $$settled = false;
                      }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Root$5($$payload6, {
                      type: "multiple",
                      class: "mt-4",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->`;
                        Accordion_item($$payload7, {
                          value: "collections",
                          class: "border-0",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->`;
                            Accordion_trigger($$payload8, {
                              class: "py-2",
                              children: ($$payload9) => {
                                $$payload9.out += `<!---->Collection`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload8.out += `<!----> <!---->`;
                            Accordion_content($$payload8, {
                              children: ($$payload9) => {
                                $$payload9.out += `<div class="flex gap-x-2 align-middle items-center"><!---->`;
                                Root$2($$payload9, {
                                  get open() {
                                    return collectionPopoverOpen;
                                  },
                                  set open($$value) {
                                    collectionPopoverOpen = $$value;
                                    $$settled = false;
                                  },
                                  children: ($$payload10) => {
                                    $$payload10.out += `<!---->`;
                                    {
                                      let child = function($$payload11, { props }) {
                                        Button($$payload11, spread_props([
                                          {
                                            variant: "outline",
                                            role: "combobox",
                                            "aria-expanded": collections_open,
                                            class: `w-[222px] overflow-hidden justify-between ${stringify(store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).collection ? "" : "text-muted-foreground")}`
                                          },
                                          props,
                                          {
                                            children: ($$payload12) => {
                                              $$payload12.out += `<!---->${escape_html(store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).collection ? store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).collection : "Select")}`;
                                            },
                                            $$slots: { default: true }
                                          }
                                        ]));
                                      };
                                      Trigger$1($$payload10, { child, $$slots: { child: true } });
                                    }
                                    $$payload10.out += `<!----> <!---->`;
                                    Popover_content($$payload10, {
                                      class: "w-[222px] p-0",
                                      children: ($$payload11) => {
                                        $$payload11.out += `<!---->`;
                                        Command($$payload11, {
                                          children: ($$payload12) => {
                                            $$payload12.out += `<!---->`;
                                            Command_input($$payload12, { placeholder: "Search collections..." });
                                            $$payload12.out += `<!----> <!---->`;
                                            Command_empty($$payload12, {
                                              children: ($$payload13) => {
                                                $$payload13.out += `<!---->Collection not
                                                            found.`;
                                              },
                                              $$slots: { default: true }
                                            });
                                            $$payload12.out += `<!----> <!---->`;
                                            Command_group($$payload12, {
                                              children: ($$payload13) => {
                                                const each_array = ensure_array_like(collections);
                                                $$payload13.out += `<!--[-->`;
                                                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                                                  let collection = each_array[$$index];
                                                  $$payload13.out += `<!---->`;
                                                  Command_item($$payload13, {
                                                    value: collection,
                                                    onSelect: () => {
                                                      store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).collection = collection);
                                                      closeAndFocusTrigger();
                                                    },
                                                    children: ($$payload14) => {
                                                      $$payload14.out += `<!---->${escape_html(collection)}`;
                                                    },
                                                    $$slots: { default: true }
                                                  });
                                                  $$payload13.out += `<!---->`;
                                                }
                                                $$payload13.out += `<!--]-->`;
                                              },
                                              $$slots: { default: true }
                                            });
                                            $$payload12.out += `<!---->`;
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$payload11.out += `<!---->`;
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$payload10.out += `<!---->`;
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload9.out += `<!----> `;
                                if (store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).collection) {
                                  $$payload9.out += "<!--[-->";
                                  Button($$payload9, {
                                    variant: "destructive",
                                    onclick: () => store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).collection = null),
                                    children: ($$payload10) => {
                                      Badge_x($$payload10, { class: "w-4 h-4" });
                                    },
                                    $$slots: { default: true }
                                  });
                                } else {
                                  $$payload9.out += "<!--[!-->";
                                }
                                $$payload9.out += `<!--]--> <!---->`;
                                Root$2($$payload9, {
                                  get open() {
                                    return new_collection_open;
                                  },
                                  set open($$value) {
                                    new_collection_open = $$value;
                                    $$settled = false;
                                  },
                                  children: ($$payload10) => {
                                    $$payload10.out += `<!---->`;
                                    {
                                      let child = function($$payload11, { props }) {
                                        Button($$payload11, spread_props([
                                          { variant: "outline" },
                                          props,
                                          {
                                            children: ($$payload12) => {
                                              Plus($$payload12, { class: "w-4 h-4" });
                                            },
                                            $$slots: { default: true }
                                          }
                                        ]));
                                      };
                                      Trigger$1($$payload10, {
                                        get ref() {
                                          return triggerRef;
                                        },
                                        set ref($$value) {
                                          triggerRef = $$value;
                                          $$settled = false;
                                        },
                                        child,
                                        $$slots: { child: true }
                                      });
                                    }
                                    $$payload10.out += `<!----> <!---->`;
                                    Popover_content($$payload10, {
                                      class: "drop-shadow-md",
                                      children: ($$payload11) => {
                                        $$payload11.out += `<form class="flex gap-x-2">`;
                                        Input($$payload11, {
                                          type: "text",
                                          get value() {
                                            return new_collection_name;
                                          },
                                          set value($$value) {
                                            new_collection_name = $$value;
                                            $$settled = false;
                                          }
                                        });
                                        $$payload11.out += `<!----> `;
                                        Button($$payload11, {
                                          type: "submit",
                                          disabled: collections.find((element2) => element2 === new_collection_name) != void 0,
                                          children: ($$payload12) => {
                                            $$payload12.out += `<!---->Add`;
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$payload11.out += `<!----></form>`;
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$payload10.out += `<!---->`;
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload9.out += `<!----></div>`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload8.out += `<!---->`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> <!---->`;
                        Accordion_item($$payload7, {
                          value: "roles",
                          class: "border-0",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->`;
                            Accordion_trigger($$payload8, {
                              class: "py-2",
                              children: ($$payload9) => {
                                $$payload9.out += `<!---->Roles`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload8.out += `<!----> <!---->`;
                            Accordion_content($$payload8, {
                              children: ($$payload9) => {
                                const each_array_1 = ensure_array_like(available_roles);
                                $$payload9.out += `<div class="flex flex-col space-y-2"><!--[-->`;
                                for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                                  let role = each_array_1[$$index_1];
                                  const checked = store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).roles.includes(role.role);
                                  $$payload9.out += `<div class="flex gap-x-2 align-middle items-center">`;
                                  Checkbox($$payload9, {
                                    checked,
                                    id: `${stringify(role.id)}-${stringify(role.role)}`,
                                    onCheckedChange: (v) => {
                                      if (v) {
                                        store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).roles = [
                                          ...store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).roles,
                                          role.role
                                        ]);
                                      } else store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).roles = store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).roles.filter((item) => item !== role.role));
                                    }
                                  });
                                  $$payload9.out += `<!----> `;
                                  Label($$payload9, {
                                    class: "hover:cursor-pointer",
                                    for: `${stringify(role.id)}-${stringify(role.role)}`,
                                    children: ($$payload10) => {
                                      $$payload10.out += `<!---->${escape_html(role.role)}`;
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$payload9.out += `<!----></div>`;
                                }
                                $$payload9.out += `<!--]--></div>`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload8.out += `<!---->`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <!---->`;
                Tabs_content($$payload5, {
                  value: "media",
                  class: "h-[450px] overflow-x-clip overflow-y-scroll",
                  children: ($$payload6) => {
                    Label($$payload6, {
                      for: "new-video-thumbnail",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Thumbnail (16:9)*`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <input type="file" class="hidden" id="new-video-thumbnail" required accept="image/*"> <label for="new-video-thumbnail" class="hover:brightness-110 transition"><!---->`;
                    Aspect_ratio($$payload6, {
                      ratio: 16 / 9,
                      class: "bg-muted rounded-md overflow-clip",
                      children: ($$payload7) => {
                        if (store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).thumbnail || currently_edited_video) {
                          $$payload7.out += "<!--[-->";
                          $$payload7.out += `<img class="w-full h-full object-cover"${attr("src", URL.createObjectURL(store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).thumbnail))} alt="New video thumbnail">`;
                        } else {
                          $$payload7.out += "<!--[!-->";
                        }
                        $$payload7.out += `<!--]-->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----></label> `;
                    Label($$payload6, {
                      for: "new-video-preview",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Preview (.mp4, 16:9)`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <input type="file" class="hidden" id="new-video-preview" accept="video/mp4"> <label for="new-video-preview" class="md:hover:brightness-110 transition"><!---->`;
                    Aspect_ratio($$payload6, {
                      ratio: 16 / 9,
                      class: "bg-muted rounded-md overflow-clip",
                      children: ($$payload7) => {
                        if (store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).preview || currently_edited_video) {
                          $$payload7.out += "<!--[-->";
                          $$payload7.out += `<div class="w-full h-full bg-black"><video class="w-full h-full object-contain"${attr("src", URL.createObjectURL(store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).preview))} controls></video> `;
                          Button($$payload7, {
                            class: "absolute top-0 left-0 m-2 opacity-25 md:hover:opacity-100 transition-opacity ",
                            onclick: (e) => {
                              store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).preview = null);
                              store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).preview_deleted = true);
                              e.preventDefault();
                              e.stopPropagation();
                            },
                            children: ($$payload8) => {
                              Trash($$payload8, { class: "w-4 h-4" });
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----></div>`;
                        } else {
                          $$payload7.out += "<!--[!-->";
                        }
                        $$payload7.out += `<!--]-->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----></label> `;
                    Label($$payload6, {
                      for: "new-video-poster",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Poster (707:1000)`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <input type="file" class="hidden" id="new-video-poster" accept="image/*"> <label for="new-video-poster" class="md:hover:brightness-110 transition"><!---->`;
                    Aspect_ratio($$payload6, {
                      ratio: 707 / 1e3,
                      class: "bg-muted rounded-md overflow-clip",
                      children: ($$payload7) => {
                        if (store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).poster || currently_edited_video) {
                          $$payload7.out += "<!--[-->";
                          $$payload7.out += `<img class="w-full h-full object-cover"${attr("src", URL.createObjectURL(store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).poster))} alt="New video poster"> `;
                          Button($$payload7, {
                            class: "absolute top-0 left-0 m-2 opacity-25 md:hover:opacity-100 transition-opacity",
                            onclick: (e) => {
                              store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).poster = null);
                              store_mutate($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form, store_get($$store_subs ?? ($$store_subs = {}), "$new_video_form", new_video_form).poster_deleted = true);
                              e.preventDefault();
                              e.stopPropagation();
                            },
                            children: ($$payload8) => {
                              Trash($$payload8, { class: "w-4 h-4" });
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        } else {
                          $$payload7.out += "<!--[!-->";
                        }
                        $$payload7.out += `<!--]-->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----></label>`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Dialog_footer($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<div class="flex justify-between flex-row-reverse w-full">`;
                Button($$payload5, {
                  onclick: processSubmit,
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Save`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]--></div>`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----></form>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> <div class="grid grid-cols-1 max-w-[450px] mx-auto md:max-w-none md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-6 w-full"><button class="bg-bjelopic-neutral-8 w-full h-full rounded-md overflow-clip text-neutral-500 hover:text-white transition-colors"><!---->`;
    Aspect_ratio($$payload2, {
      ratio: 2.35,
      children: ($$payload3) => {
        $$payload3.out += `<div class="w-full h-full flex justify-center items-center">`;
        Plus($$payload3, { class: "w-12 h-12" });
        $$payload3.out += `<!----></div>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></button> <!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let video = each_array_2[$$index_2];
      $$payload2.out += `<button class="text-left"><div class="flex flex-col box-content w-full rounded-md overflow-clip md:hover:scale-[101%] transition-all duration-500 md:hover:drop-shadow-glow-md hover:z-10 border border-neutral-800"><!---->`;
      Aspect_ratio($$payload2, {
        ratio: 16 / 9,
        class: "overflow-clip",
        children: ($$payload3) => {
          $$payload3.out += `<img class="w-full h-full object-cover"${attr("src", video.thumbnail_url)}${attr("alt", `${stringify(video.title)} thumbnail`)}>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <div class="px-2 py-1 md:py-2 bg-neutral-900 border-t-0"><span class="text-lg md:text-xl block w-full whitespace-nowrap overflow-hidden text-ellipsis">${escape_html(video.title)}</span> <div class="flex justify-between items-center align-middle"><span class="text-neutral-500">${escape_html(video.subject)} (${escape_html(new Date(video.publication_date).getFullYear())})</span> <div class="flex gap-2 align-middle"><a${attr("href", video.link)} target="_blank" class="mr-1">`;
      Eye($$payload2, {
        class: "w-6 h-6 text-neutral-500 hover:text-white transition"
      });
      $$payload2.out += `<!----></a> `;
      Link($$payload2, {
        as: "button",
        onclick: (e) => {
          e.stopPropagation();
        },
        href: "/webtools/videos/" + video.id + "/stills",
        children: ($$payload3) => {
          Image($$payload3, {
            class: "w-6 h-6 text-neutral-500 hover:text-white transition"
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----></div></div></div></div></button>`;
    }
    $$payload2.out += `<!--]--></div></main>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Videos,
  layout: Layout
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page2) => createInertiaApp({
    page: page2,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Footer.svelte": __vite_glob_0_0, "./Pages/FooterInfoLinks.svelte": __vite_glob_0_1, "./Pages/FooterSocials.svelte": __vite_glob_0_2, "./Pages/Header.svelte": __vite_glob_0_3, "./Pages/Hero/Hero.svelte": __vite_glob_0_4, "./Pages/Hero/HeroCarousel.svelte": __vite_glob_0_5, "./Pages/Hero/HeroLinks.svelte": __vite_glob_0_6, "./Pages/Hero/Layout.svelte": __vite_glob_0_7, "./Pages/Layout.svelte": __vite_glob_0_8, "./Pages/Link.svelte": __vite_glob_0_9, "./Pages/Subpages/Gallery.svelte": __vite_glob_0_10, "./Pages/Subpages/GalleryVideoDescription.svelte": __vite_glob_0_11, "./Pages/Subpages/Stills.svelte": __vite_glob_0_12, "./Pages/ViewTemporaryUpload.svelte": __vite_glob_0_13, "./Pages/Webtools/Dashboard.svelte": __vite_glob_0_14, "./Pages/Webtools/DashboardChart.svelte": __vite_glob_0_15, "./Pages/Webtools/Header.svelte": __vite_glob_0_16, "./Pages/Webtools/HeroVideo.svelte": __vite_glob_0_17, "./Pages/Webtools/Layout.svelte": __vite_glob_0_18, "./Pages/Webtools/LayoutLinks.svelte": __vite_glob_0_19, "./Pages/Webtools/Login.svelte": __vite_glob_0_20, "./Pages/Webtools/Stills.svelte": __vite_glob_0_21, "./Pages/Webtools/TemporaryUploadDialog.svelte": __vite_glob_0_22, "./Pages/Webtools/Uploads.svelte": __vite_glob_0_23, "./Pages/Webtools/Users.svelte": __vite_glob_0_24, "./Pages/Webtools/Videos.svelte": __vite_glob_0_25 });
      let page3 = pages[`./Pages/${name}.svelte`];
      return { default: page3.default, layout: page3.layout || Layout$1 };
    },
    setup({ App: App2, props }) {
      return render(App2, { props });
    }
  })
);
