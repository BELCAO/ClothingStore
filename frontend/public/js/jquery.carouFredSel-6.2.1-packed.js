!(function ($) {
  function sc_setScroll(t, e, s) {
    return (
      "transition" == s.transition && "swing" == e && (e = "ease"),
      {
        anims: [],
        duration: t,
        orgDuration: t,
        easing: e,
        startTime: getTime(),
      }
    );
  }
  function sc_startScroll(t, e) {
    for (var s = 0, i = t.anims.length; i > s; s++) {
      var o = t.anims[s];
      o && o[0][e.transition](o[1], t.duration, t.easing, o[2]);
    }
  }
  function sc_stopScroll(t, e) {
    is_boolean(e) || (e = !0), is_object(t.pre) && sc_stopScroll(t.pre, e);
    for (var s = 0, i = t.anims.length; i > s; s++) {
      var o = t.anims[s];
      o[0].stop(!0), e && (o[0].css(o[1]), is_function(o[2]) && o[2]());
    }
    is_object(t.post) && sc_stopScroll(t.post, e);
  }
  function sc_afterScroll(t, e, s) {
    switch ((e && e.remove(), s.fx)) {
      case "fade":
      case "crossfade":
      case "cover-fade":
      case "uncover-fade":
        t.css("opacity", 1), t.css("filter", "");
    }
  }
  function sc_fireCallbacks(t, e, s, i, o) {
    if ((e[s] && e[s].call(t, i), o[s].length))
      for (var n = 0, r = o[s].length; r > n; n++) o[s][n].call(t, i);
    return [];
  }
  function sc_fireQueue(t, e, s) {
    return e.length && (t.trigger(cf_e(e[0][0], s), e[0][1]), e.shift()), e;
  }
  function sc_hideHiddenItems(t) {
    t.each(function () {
      var t = $(this);
      t.data("_cfs_isHidden", t.is(":hidden")).hide();
    });
  }
  function sc_showHiddenItems(t) {
    t &&
      t.each(function () {
        var t = $(this);
        t.data("_cfs_isHidden") || t.show();
      });
  }
  function sc_clearTimers(t) {
    return (
      t.auto && clearTimeout(t.auto), t.progress && clearInterval(t.progress), t
    );
  }
  function sc_mapCallbackArguments(t, e, s, i, o, n, r) {
    return {
      width: r.width,
      height: r.height,
      items: { old: t, skipped: e, visible: s },
      scroll: { items: i, direction: o, duration: n },
    };
  }
  function sc_getDuration(t, e, s, i) {
    var o = t.duration;
    return "none" == t.fx
      ? 0
      : ("auto" == o
          ? (o = (e.scroll.duration / e.scroll.items) * s)
          : 10 > o && (o = i / o),
        1 > o ? 0 : ("fade" == t.fx && (o /= 2), Math.round(o)));
  }
  function nv_showNavi(t, e, s) {
    var i = is_number(t.items.minimum) ? t.items.minimum : t.items.visible + 1;
    if ("show" == e || "hide" == e) var o = e;
    else if (i > e) {
      debug(
        s,
        "Not enough items (" +
          e +
          " total, " +
          i +
          " needed): Hiding navigation."
      );
      var o = "hide";
    } else var o = "show";
    var n = "show" == o ? "removeClass" : "addClass",
      r = cf_c("hidden", s);
    t.auto.button && t.auto.button[o]()[n](r),
      t.prev.button && t.prev.button[o]()[n](r),
      t.next.button && t.next.button[o]()[n](r),
      t.pagination.container && t.pagination.container[o]()[n](r);
  }
  function nv_enableNavi(t, e, s) {
    if (!t.circular && !t.infinite) {
      var i = "removeClass" == e || "addClass" == e ? e : !1,
        o = cf_c("disabled", s);
      if ((t.auto.button && i && t.auto.button[i](o), t.prev.button)) {
        var n = i || 0 == e ? "addClass" : "removeClass";
        t.prev.button[n](o);
      }
      if (t.next.button) {
        var n = i || e == t.items.visible ? "addClass" : "removeClass";
        t.next.button[n](o);
      }
    }
  }
  function go_getObject(t, e) {
    return is_function(e) ? (e = e.call(t)) : is_undefined(e) && (e = {}), e;
  }
  function go_getItemsObject(t, e) {
    return (
      (e = go_getObject(t, e)),
      is_number(e)
        ? (e = { visible: e })
        : "variable" == e
        ? (e = { visible: e, width: e, height: e })
        : is_object(e) || (e = {}),
      e
    );
  }
  function go_getScrollObject(t, e) {
    return (
      (e = go_getObject(t, e)),
      is_number(e)
        ? (e = 50 >= e ? { items: e } : { duration: e })
        : is_string(e)
        ? (e = { easing: e })
        : is_object(e) || (e = {}),
      e
    );
  }
  function go_getNaviObject(t, e) {
    if (((e = go_getObject(t, e)), is_string(e))) {
      var s = cf_getKeyCode(e);
      e = -1 == s ? $(e) : s;
    }
    return e;
  }
  function go_getAutoObject(t, e) {
    return (
      (e = go_getNaviObject(t, e)),
      is_jquery(e)
        ? (e = { button: e })
        : is_boolean(e)
        ? (e = { play: e })
        : is_number(e) && (e = { timeoutDuration: e }),
      e.progress &&
        (is_string(e.progress) || is_jquery(e.progress)) &&
        (e.progress = { bar: e.progress }),
      e
    );
  }
  function go_complementAutoObject(t, e) {
    return (
      is_function(e.button) && (e.button = e.button.call(t)),
      is_string(e.button) && (e.button = $(e.button)),
      is_boolean(e.play) || (e.play = !0),
      is_number(e.delay) || (e.delay = 0),
      is_undefined(e.pauseOnEvent) && (e.pauseOnEvent = !0),
      is_boolean(e.pauseOnResize) || (e.pauseOnResize = !0),
      is_number(e.timeoutDuration) ||
        (e.timeoutDuration = 10 > e.duration ? 2500 : 5 * e.duration),
      e.progress &&
        (is_function(e.progress.bar) &&
          (e.progress.bar = e.progress.bar.call(t)),
        is_string(e.progress.bar) && (e.progress.bar = $(e.progress.bar)),
        e.progress.bar
          ? (is_function(e.progress.updater) ||
              (e.progress.updater = $.fn.carouFredSel.progressbarUpdater),
            is_number(e.progress.interval) || (e.progress.interval = 50))
          : (e.progress = !1)),
      e
    );
  }
  function go_getPrevNextObject(t, e) {
    return (
      (e = go_getNaviObject(t, e)),
      is_jquery(e) ? (e = { button: e }) : is_number(e) && (e = { key: e }),
      e
    );
  }
  function go_complementPrevNextObject(t, e) {
    return (
      is_function(e.button) && (e.button = e.button.call(t)),
      is_string(e.button) && (e.button = $(e.button)),
      is_string(e.key) && (e.key = cf_getKeyCode(e.key)),
      e
    );
  }
  function go_getPaginationObject(t, e) {
    return (
      (e = go_getNaviObject(t, e)),
      is_jquery(e)
        ? (e = { container: e })
        : is_boolean(e) && (e = { keys: e }),
      e
    );
  }
  function go_complementPaginationObject(t, e) {
    return (
      is_function(e.container) && (e.container = e.container.call(t)),
      is_string(e.container) && (e.container = $(e.container)),
      is_number(e.items) || (e.items = !1),
      is_boolean(e.keys) || (e.keys = !1),
      is_function(e.anchorBuilder) ||
        is_false(e.anchorBuilder) ||
        (e.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder),
      is_number(e.deviation) || (e.deviation = 0),
      e
    );
  }
  function go_getSwipeObject(t, e) {
    return (
      is_function(e) && (e = e.call(t)),
      is_undefined(e) && (e = { onTouch: !1 }),
      is_true(e) ? (e = { onTouch: e }) : is_number(e) && (e = { items: e }),
      e
    );
  }
  function go_complementSwipeObject(t, e) {
    return (
      is_boolean(e.onTouch) || (e.onTouch = !0),
      is_boolean(e.onMouse) || (e.onMouse = !1),
      is_object(e.options) || (e.options = {}),
      is_boolean(e.options.triggerOnTouchEnd) ||
        (e.options.triggerOnTouchEnd = !1),
      e
    );
  }
  function go_getMousewheelObject(t, e) {
    return (
      is_function(e) && (e = e.call(t)),
      is_true(e)
        ? (e = {})
        : is_number(e)
        ? (e = { items: e })
        : is_undefined(e) && (e = !1),
      e
    );
  }
  function go_complementMousewheelObject(t, e) {
    return e;
  }
  function gn_getItemIndex(t, e, s, i, o) {
    if (
      (is_string(t) && (t = $(t, o)),
      is_object(t) && (t = $(t, o)),
      is_jquery(t)
        ? ((t = o.children().index(t)), is_boolean(s) || (s = !1))
        : is_boolean(s) || (s = !0),
      is_number(t) || (t = 0),
      is_number(e) || (e = 0),
      s && (t += i.first),
      (t += e),
      i.total > 0)
    ) {
      for (; t >= i.total; ) t -= i.total;
      for (; 0 > t; ) t += i.total;
    }
    return t;
  }
  function gn_getVisibleItemsPrev(t, e, s) {
    for (var i = 0, o = 0, n = s; n >= 0; n--) {
      var r = t.eq(n);
      if (
        ((i += r.is(":visible") ? r[e.d.outerWidth](!0) : 0),
        i > e.maxDimension)
      )
        return o;
      0 == n && (n = t.length), o++;
    }
  }
  function gn_getVisibleItemsPrevFilter(t, e, s) {
    return gn_getItemsPrevFilter(t, e.items.filter, e.items.visibleConf.org, s);
  }
  function gn_getScrollItemsPrevFilter(t, e, s, i) {
    return gn_getItemsPrevFilter(t, e.items.filter, i, s);
  }
  function gn_getItemsPrevFilter(t, e, s, i) {
    for (var o = 0, n = 0, r = i, c = t.length; r >= 0; r--) {
      if ((n++, n == c)) return n;
      var a = t.eq(r);
      if (a.is(e) && (o++, o == s)) return n;
      0 == r && (r = c);
    }
  }
  function gn_getVisibleOrg(t, e) {
    return (
      e.items.visibleConf.org ||
      t.children().slice(0, e.items.visible).filter(e.items.filter).length
    );
  }
  function gn_getVisibleItemsNext(t, e, s) {
    for (var i = 0, o = 0, n = s, r = t.length - 1; r >= n; n++) {
      var c = t.eq(n);
      if (
        ((i += c.is(":visible") ? c[e.d.outerWidth](!0) : 0),
        i > e.maxDimension)
      )
        return o;
      if ((o++, o == r + 1)) return o;
      n == r && (n = -1);
    }
  }
  function gn_getVisibleItemsNextTestCircular(t, e, s, i) {
    var o = gn_getVisibleItemsNext(t, e, s);
    return e.circular || (s + o > i && (o = i - s)), o;
  }
  function gn_getVisibleItemsNextFilter(t, e, s) {
    return gn_getItemsNextFilter(
      t,
      e.items.filter,
      e.items.visibleConf.org,
      s,
      e.circular
    );
  }
  function gn_getScrollItemsNextFilter(t, e, s, i) {
    return gn_getItemsNextFilter(t, e.items.filter, i + 1, s, e.circular) - 1;
  }
  function gn_getItemsNextFilter(t, e, s, i) {
    for (var o = 0, n = 0, r = i, c = t.length - 1; c >= r; r++) {
      if ((n++, n >= c)) return n;
      var a = t.eq(r);
      if (a.is(e) && (o++, o == s)) return n;
      r == c && (r = -1);
    }
  }
  function gi_getCurrentItems(t, e) {
    return t.slice(0, e.items.visible);
  }
  function gi_getOldItemsPrev(t, e, s) {
    return t.slice(s, e.items.visibleConf.old + s);
  }
  function gi_getNewItemsPrev(t, e) {
    return t.slice(0, e.items.visible);
  }
  function gi_getOldItemsNext(t, e) {
    return t.slice(0, e.items.visibleConf.old);
  }
  function gi_getNewItemsNext(t, e, s) {
    return t.slice(s, e.items.visible + s);
  }
  function sz_storeMargin(t, e, s) {
    e.usePadding &&
      (is_string(s) || (s = "_cfs_origCssMargin"),
      t.each(function () {
        var t = $(this),
          i = parseInt(t.css(e.d.marginRight), 10);
        is_number(i) || (i = 0), t.data(s, i);
      }));
  }
  function sz_resetMargin(t, e, s) {
    if (e.usePadding) {
      var i = is_boolean(s) ? s : !1;
      is_number(s) || (s = 0),
        sz_storeMargin(t, e, "_cfs_tempCssMargin"),
        t.each(function () {
          var t = $(this);
          t.css(
            e.d.marginRight,
            i ? t.data("_cfs_tempCssMargin") : s + t.data("_cfs_origCssMargin")
          );
        });
    }
  }
  function sz_storeOrigCss(t) {
    t.each(function () {
      var t = $(this);
      t.data("_cfs_origCss", t.attr("style") || "");
    });
  }
  function sz_restoreOrigCss(t) {
    t.each(function () {
      var t = $(this);
      t.attr("style", t.data("_cfs_origCss") || "");
    });
  }
  function sz_setResponsiveSizes(t, e) {
    var s = (t.items.visible, t.items[t.d.width]),
      i = t[t.d.height],
      o = is_percentage(i);
    e.each(function () {
      var e = $(this),
        n = s - ms_getPaddingBorderMargin(e, t, "Width");
      e[t.d.width](n), o && e[t.d.height](ms_getPercentage(n, i));
    });
  }
  function sz_setSizes(t, e) {
    var s = t.parent(),
      i = t.children(),
      o = gi_getCurrentItems(i, e),
      n = cf_mapWrapperSizes(ms_getSizes(o, e, !0), e, !1);
    if ((s.css(n), e.usePadding)) {
      var r = e.padding,
        c = r[e.d[1]];
      e.align && 0 > c && (c = 0);
      var a = o.last();
      a.css(e.d.marginRight, a.data("_cfs_origCssMargin") + c),
        t.css(e.d.top, r[e.d[0]]),
        t.css(e.d.left, r[e.d[3]]);
    }
    return (
      t.css(e.d.width, n[e.d.width] + 2 * ms_getTotalSize(i, e, "width")),
      t.css(e.d.height, ms_getLargestSize(i, e, "height")),
      n
    );
  }
  function ms_getSizes(t, e, s) {
    return [
      ms_getTotalSize(t, e, "width", s),
      ms_getLargestSize(t, e, "height", s),
    ];
  }
  function ms_getLargestSize(t, e, s, i) {
    return (
      is_boolean(i) || (i = !1),
      is_number(e[e.d[s]]) && i
        ? e[e.d[s]]
        : is_number(e.items[e.d[s]])
        ? e.items[e.d[s]]
        : ((s =
            s.toLowerCase().indexOf("width") > -1
              ? "outerWidth"
              : "outerHeight"),
          ms_getTrueLargestSize(t, e, s))
    );
  }
  function ms_getTrueLargestSize(t, e, s) {
    for (var i = 0, o = 0, n = t.length; n > o; o++) {
      var r = t.eq(o),
        c = r.is(":visible") ? r[e.d[s]](!0) : 0;
      c > i && (i = c);
    }
    return i;
  }
  function ms_getTotalSize(t, e, s, i) {
    if ((is_boolean(i) || (i = !1), is_number(e[e.d[s]]) && i))
      return e[e.d[s]];
    if (is_number(e.items[e.d[s]])) return e.items[e.d[s]] * t.length;
    for (
      var o =
          s.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight",
        n = 0,
        r = 0,
        c = t.length;
      c > r;
      r++
    ) {
      var a = t.eq(r);
      n += a.is(":visible") ? a[e.d[o]](!0) : 0;
    }
    return n;
  }
  function ms_getParentSize(t, e, s) {
    var i = t.is(":visible");
    i && t.hide();
    var o = t.parent()[e.d[s]]();
    return i && t.show(), o;
  }
  function ms_getMaxDimension(t, e) {
    return is_number(t[t.d.width]) ? t[t.d.width] : e;
  }
  function ms_hasVariableSizes(t, e, s) {
    for (var i = !1, o = !1, n = 0, r = t.length; r > n; n++) {
      var c = t.eq(n),
        a = c.is(":visible") ? c[e.d[s]](!0) : 0;
      i === !1 ? (i = a) : i != a && (o = !0), 0 == i && (o = !0);
    }
    return o;
  }
  function ms_getPaddingBorderMargin(t, e, s) {
    return t[e.d["outer" + s]](!0) - t[e.d[s.toLowerCase()]]();
  }
  function ms_getPercentage(t, e) {
    if (is_percentage(e)) {
      if (((e = parseInt(e.slice(0, -1), 10)), !is_number(e))) return t;
      t *= e / 100;
    }
    return t;
  }
  function cf_e(t, e, s, i, o) {
    return (
      is_boolean(s) || (s = !0),
      is_boolean(i) || (i = !0),
      is_boolean(o) || (o = !1),
      s && (t = e.events.prefix + t),
      i && (t = t + "." + e.events.namespace),
      i && o && (t += e.serialNumber),
      t
    );
  }
  function cf_c(t, e) {
    return is_string(e.classnames[t]) ? e.classnames[t] : t;
  }
  function cf_mapWrapperSizes(t, e, s) {
    is_boolean(s) || (s = !0);
    var i = e.usePadding && s ? e.padding : [0, 0, 0, 0],
      o = {};
    return (
      (o[e.d.width] = t[0] + i[1] + i[3]),
      (o[e.d.height] = t[1] + i[0] + i[2]),
      o
    );
  }
  function cf_sortParams(t, e) {
    for (var s = [], i = 0, o = t.length; o > i; i++)
      for (var n = 0, r = e.length; r > n; n++)
        if (e[n].indexOf(typeof t[i]) > -1 && is_undefined(s[n])) {
          s[n] = t[i];
          break;
        }
    return s;
  }
  function cf_getPadding(t) {
    if (is_undefined(t)) return [0, 0, 0, 0];
    if (is_number(t)) return [t, t, t, t];
    if (
      (is_string(t) &&
        (t = t.split("px").join("").split("em").join("").split(" ")),
      !is_array(t))
    )
      return [0, 0, 0, 0];
    for (var e = 0; 4 > e; e++) t[e] = parseInt(t[e], 10);
    switch (t.length) {
      case 0:
        return [0, 0, 0, 0];
      case 1:
        return [t[0], t[0], t[0], t[0]];
      case 2:
        return [t[0], t[1], t[0], t[1]];
      case 3:
        return [t[0], t[1], t[2], t[1]];
      default:
        return [t[0], t[1], t[2], t[3]];
    }
  }
  function cf_getAlignPadding(t, e) {
    var s = is_number(e[e.d.width])
      ? Math.ceil(e[e.d.width] - ms_getTotalSize(t, e, "width"))
      : 0;
    switch (e.align) {
      case "left":
        return [0, s];
      case "right":
        return [s, 0];
      case "center":
      default:
        return [Math.ceil(s / 2), Math.floor(s / 2)];
    }
  }
  function cf_getDimensions(t) {
    for (
      var e = [
          [
            "width",
            "innerWidth",
            "outerWidth",
            "height",
            "innerHeight",
            "outerHeight",
            "left",
            "top",
            "marginRight",
            0,
            1,
            2,
            3,
          ],
          [
            "height",
            "innerHeight",
            "outerHeight",
            "width",
            "innerWidth",
            "outerWidth",
            "top",
            "left",
            "marginBottom",
            3,
            2,
            1,
            0,
          ],
        ],
        s = e[0].length,
        i = "right" == t.direction || "left" == t.direction ? 0 : 1,
        o = {},
        n = 0;
      s > n;
      n++
    )
      o[e[0][n]] = e[i][n];
    return o;
  }
  function cf_getAdjust(t, e, s, i) {
    var o = t;
    if (is_function(s)) o = s.call(i, o);
    else if (is_string(s)) {
      var n = s.split("+"),
        r = s.split("-");
      if (r.length > n.length)
        var c = !0,
          a = r[0],
          f = r[1];
      else
        var c = !1,
          a = n[0],
          f = n[1];
      switch (a) {
        case "even":
          o = 1 == t % 2 ? t - 1 : t;
          break;
        case "odd":
          o = 0 == t % 2 ? t - 1 : t;
          break;
        default:
          o = t;
      }
      (f = parseInt(f, 10)), is_number(f) && (c && (f = -f), (o += f));
    }
    return (!is_number(o) || 1 > o) && (o = 1), o;
  }
  function cf_getItemsAdjust(t, e, s, i) {
    return cf_getItemAdjustMinMax(
      cf_getAdjust(t, e, s, i),
      e.items.visibleConf
    );
  }
  function cf_getItemAdjustMinMax(t, e) {
    return (
      is_number(e.min) && e.min > t && (t = e.min),
      is_number(e.max) && t > e.max && (t = e.max),
      1 > t && (t = 1),
      t
    );
  }
  function cf_getSynchArr(t) {
    is_array(t) || (t = [[t]]), is_array(t[0]) || (t = [t]);
    for (var e = 0, s = t.length; s > e; e++)
      is_string(t[e][0]) && (t[e][0] = $(t[e][0])),
        is_boolean(t[e][1]) || (t[e][1] = !0),
        is_boolean(t[e][2]) || (t[e][2] = !0),
        is_number(t[e][3]) || (t[e][3] = 0);
    return t;
  }
  function cf_getKeyCode(t) {
    return "right" == t
      ? 39
      : "left" == t
      ? 37
      : "up" == t
      ? 38
      : "down" == t
      ? 40
      : -1;
  }
  function cf_setCookie(t, e, s) {
    if (t) {
      var i = e.triggerHandler(cf_e("currentPosition", s));
      $.fn.carouFredSel.cookie.set(t, i);
    }
  }
  function cf_getCookie(t) {
    var e = $.fn.carouFredSel.cookie.get(t);
    return "" == e ? 0 : e;
  }
  function in_mapCss(t, e) {
    for (var s = {}, i = 0, o = e.length; o > i; i++) s[e[i]] = t.css(e[i]);
    return s;
  }
  function in_complementItems(t, e, s, i) {
    return (
      is_object(t.visibleConf) || (t.visibleConf = {}),
      is_object(t.sizesConf) || (t.sizesConf = {}),
      0 == t.start && is_number(i) && (t.start = i),
      is_object(t.visible)
        ? ((t.visibleConf.min = t.visible.min),
          (t.visibleConf.max = t.visible.max),
          (t.visible = !1))
        : is_string(t.visible)
        ? ("variable" == t.visible
            ? (t.visibleConf.variable = !0)
            : (t.visibleConf.adjust = t.visible),
          (t.visible = !1))
        : is_function(t.visible) &&
          ((t.visibleConf.adjust = t.visible), (t.visible = !1)),
      is_string(t.filter) ||
        (t.filter = s.filter(":hidden").length > 0 ? ":visible" : "*"),
      t[e.d.width] ||
        (e.responsive
          ? (debug(!0, "Set a " + e.d.width + " for the items!"),
            (t[e.d.width] = ms_getTrueLargestSize(s, e, "outerWidth")))
          : (t[e.d.width] = ms_hasVariableSizes(s, e, "outerWidth")
              ? "variable"
              : s[e.d.outerWidth](!0))),
      t[e.d.height] ||
        (t[e.d.height] = ms_hasVariableSizes(s, e, "outerHeight")
          ? "variable"
          : s[e.d.outerHeight](!0)),
      (t.sizesConf.width = t.width),
      (t.sizesConf.height = t.height),
      t
    );
  }
  function in_complementVisibleItems(t, e) {
    return (
      "variable" == t.items[t.d.width] && (t.items.visibleConf.variable = !0),
      t.items.visibleConf.variable ||
        (is_number(t[t.d.width])
          ? (t.items.visible = Math.floor(t[t.d.width] / t.items[t.d.width]))
          : ((t.items.visible = Math.floor(e / t.items[t.d.width])),
            (t[t.d.width] = t.items.visible * t.items[t.d.width]),
            t.items.visibleConf.adjust || (t.align = !1)),
        ("Infinity" == t.items.visible || 1 > t.items.visible) &&
          (debug(!0, 'Not a valid number of visible items: Set to "variable".'),
          (t.items.visibleConf.variable = !0))),
      t
    );
  }
  function in_complementPrimarySize(t, e, s) {
    return "auto" == t && (t = ms_getTrueLargestSize(s, e, "outerWidth")), t;
  }
  function in_complementSecondarySize(t, e, s) {
    return (
      "auto" == t && (t = ms_getTrueLargestSize(s, e, "outerHeight")),
      t || (t = e.items[e.d.height]),
      t
    );
  }
  function in_getAlignPadding(t, e) {
    var s = cf_getAlignPadding(gi_getCurrentItems(e, t), t);
    return (t.padding[t.d[1]] = s[1]), (t.padding[t.d[3]] = s[0]), t;
  }
  function in_getResponsiveValues(t, e) {
    var s = cf_getItemAdjustMinMax(
      Math.ceil(t[t.d.width] / t.items[t.d.width]),
      t.items.visibleConf
    );
    s > e.length && (s = e.length);
    var i = Math.floor(t[t.d.width] / s);
    return (
      (t.items.visible = s), (t.items[t.d.width] = i), (t[t.d.width] = s * i), t
    );
  }
  function bt_pauseOnHoverConfig(t) {
    if (is_string(t))
      var e = t.indexOf("immediate") > -1 ? !0 : !1,
        s = t.indexOf("resume") > -1 ? !0 : !1;
    else var e = (s = !1);
    return [e, s];
  }
  function bt_mousesheelNumber(t) {
    return is_number(t) ? t : null;
  }
  function is_null(t) {
    return null === t;
  }
  function is_undefined(t) {
    return is_null(t) || void 0 === t || "" === t || "undefined" === t;
  }
  function is_array(t) {
    return t instanceof Array;
  }
  function is_jquery(t) {
    return t instanceof jQuery;
  }
  function is_object(t) {
    return (
      (t instanceof Object || "object" == typeof t) &&
      !is_null(t) &&
      !is_jquery(t) &&
      !is_array(t) &&
      !is_function(t)
    );
  }
  function is_number(t) {
    return (t instanceof Number || "number" == typeof t) && !isNaN(t);
  }
  function is_string(t) {
    return (
      (t instanceof String || "string" == typeof t) &&
      !is_undefined(t) &&
      !is_true(t) &&
      !is_false(t)
    );
  }
  function is_function(t) {
    return t instanceof Function || "function" == typeof t;
  }
  function is_boolean(t) {
    return (
      t instanceof Boolean || "boolean" == typeof t || is_true(t) || is_false(t)
    );
  }
  function is_true(t) {
    return t === !0 || "true" === t;
  }
  function is_false(t) {
    return t === !1 || "false" === t;
  }
  function is_percentage(t) {
    return is_string(t) && "%" == t.slice(-1);
  }
  function getTime() {
    return new Date().getTime();
  }
  function deprecated(t, e) {
    debug(
      !0,
      t +
        " is DEPRECATED, support for it will be removed. Use " +
        e +
        " instead."
    );
  }
  function debug(t, e) {
    if (!is_undefined(window.console) && !is_undefined(window.console.log)) {
      if (is_object(t)) {
        var s = " (" + t.selector + ")";
        t = t.debug;
      } else var s = "";
      if (!t) return !1;
      (e = is_string(e)
        ? "carouFredSel" + s + ": " + e
        : ["carouFredSel" + s + ":", e]),
        window.console.log(e);
    }
    return !1;
  }
  $.fn.carouFredSel ||
    (($.fn.caroufredsel = $.fn.carouFredSel =
      function (options, configs) {
        if (0 == this.length)
          return (
            debug(!0, 'No element found for "' + this.selector + '".'), this
          );
        if (this.length > 1)
          return this.each(function () {
            $(this).carouFredSel(options, configs);
          });
        var $cfs = this,
          $tt0 = this[0],
          starting_position = !1;
        $cfs.data("_cfs_isCarousel") &&
          ((starting_position = $cfs.triggerHandler(
            "_cfs_triggerEvent",
            "currentPosition"
          )),
          $cfs.trigger("_cfs_triggerEvent", ["destroy", !0]));
        var FN = {};
        (FN._init = function (t, e, s) {
          (t = go_getObject($tt0, t)),
            (t.items = go_getItemsObject($tt0, t.items)),
            (t.scroll = go_getScrollObject($tt0, t.scroll)),
            (t.auto = go_getAutoObject($tt0, t.auto)),
            (t.prev = go_getPrevNextObject($tt0, t.prev)),
            (t.next = go_getPrevNextObject($tt0, t.next)),
            (t.pagination = go_getPaginationObject($tt0, t.pagination)),
            (t.swipe = go_getSwipeObject($tt0, t.swipe)),
            (t.mousewheel = go_getMousewheelObject($tt0, t.mousewheel)),
            e && (opts_orig = $.extend(!0, {}, $.fn.carouFredSel.defaults, t)),
            (opts = $.extend(!0, {}, $.fn.carouFredSel.defaults, t)),
            (opts.d = cf_getDimensions(opts)),
            (crsl.direction =
              "up" == opts.direction || "left" == opts.direction
                ? "next"
                : "prev");
          var i = $cfs.children(),
            o = ms_getParentSize($wrp, opts, "width");
          if (
            (is_true(opts.cookie) &&
              (opts.cookie = "caroufredsel_cookie_" + conf.serialNumber),
            (opts.maxDimension = ms_getMaxDimension(opts, o)),
            (opts.items = in_complementItems(opts.items, opts, i, s)),
            (opts[opts.d.width] = in_complementPrimarySize(
              opts[opts.d.width],
              opts,
              i
            )),
            (opts[opts.d.height] = in_complementSecondarySize(
              opts[opts.d.height],
              opts,
              i
            )),
            opts.responsive &&
              (is_percentage(opts[opts.d.width]) ||
                (opts[opts.d.width] = "100%")),
            is_percentage(opts[opts.d.width]) &&
              ((crsl.upDateOnWindowResize = !0),
              (crsl.primarySizePercentage = opts[opts.d.width]),
              (opts[opts.d.width] = ms_getPercentage(
                o,
                crsl.primarySizePercentage
              )),
              opts.items.visible || (opts.items.visibleConf.variable = !0)),
            opts.responsive
              ? ((opts.usePadding = !1),
                (opts.padding = [0, 0, 0, 0]),
                (opts.align = !1),
                (opts.items.visibleConf.variable = !1))
              : (opts.items.visible ||
                  (opts = in_complementVisibleItems(opts, o)),
                opts[opts.d.width] ||
                  (!opts.items.visibleConf.variable &&
                  is_number(opts.items[opts.d.width]) &&
                  "*" == opts.items.filter
                    ? ((opts[opts.d.width] =
                        opts.items.visible * opts.items[opts.d.width]),
                      (opts.align = !1))
                    : (opts[opts.d.width] = "variable")),
                is_undefined(opts.align) &&
                  (opts.align = is_number(opts[opts.d.width]) ? "center" : !1),
                opts.items.visibleConf.variable &&
                  (opts.items.visible = gn_getVisibleItemsNext(i, opts, 0))),
            "*" == opts.items.filter ||
              opts.items.visibleConf.variable ||
              ((opts.items.visibleConf.org = opts.items.visible),
              (opts.items.visible = gn_getVisibleItemsNextFilter(i, opts, 0))),
            (opts.items.visible = cf_getItemsAdjust(
              opts.items.visible,
              opts,
              opts.items.visibleConf.adjust,
              $tt0
            )),
            (opts.items.visibleConf.old = opts.items.visible),
            opts.responsive)
          )
            opts.items.visibleConf.min ||
              (opts.items.visibleConf.min = opts.items.visible),
              opts.items.visibleConf.max ||
                (opts.items.visibleConf.max = opts.items.visible),
              (opts = in_getResponsiveValues(opts, i, o));
          else
            switch (
              ((opts.padding = cf_getPadding(opts.padding)),
              "top" == opts.align
                ? (opts.align = "left")
                : "bottom" == opts.align && (opts.align = "right"),
              opts.align)
            ) {
              case "center":
              case "left":
              case "right":
                "variable" != opts[opts.d.width] &&
                  ((opts = in_getAlignPadding(opts, i)),
                  (opts.usePadding = !0));
                break;
              default:
                (opts.align = !1),
                  (opts.usePadding =
                    0 == opts.padding[0] &&
                    0 == opts.padding[1] &&
                    0 == opts.padding[2] &&
                    0 == opts.padding[3]
                      ? !1
                      : !0);
            }
          is_number(opts.scroll.duration) || (opts.scroll.duration = 500),
            is_undefined(opts.scroll.items) &&
              (opts.scroll.items =
                opts.responsive ||
                opts.items.visibleConf.variable ||
                "*" != opts.items.filter
                  ? "visible"
                  : opts.items.visible),
            (opts.auto = $.extend(!0, {}, opts.scroll, opts.auto)),
            (opts.prev = $.extend(!0, {}, opts.scroll, opts.prev)),
            (opts.next = $.extend(!0, {}, opts.scroll, opts.next)),
            (opts.pagination = $.extend(!0, {}, opts.scroll, opts.pagination)),
            (opts.auto = go_complementAutoObject($tt0, opts.auto)),
            (opts.prev = go_complementPrevNextObject($tt0, opts.prev)),
            (opts.next = go_complementPrevNextObject($tt0, opts.next)),
            (opts.pagination = go_complementPaginationObject(
              $tt0,
              opts.pagination
            )),
            (opts.swipe = go_complementSwipeObject($tt0, opts.swipe)),
            (opts.mousewheel = go_complementMousewheelObject(
              $tt0,
              opts.mousewheel
            )),
            opts.synchronise &&
              (opts.synchronise = cf_getSynchArr(opts.synchronise)),
            opts.auto.onPauseStart &&
              ((opts.auto.onTimeoutStart = opts.auto.onPauseStart),
              deprecated("auto.onPauseStart", "auto.onTimeoutStart")),
            opts.auto.onPausePause &&
              ((opts.auto.onTimeoutPause = opts.auto.onPausePause),
              deprecated("auto.onPausePause", "auto.onTimeoutPause")),
            opts.auto.onPauseEnd &&
              ((opts.auto.onTimeoutEnd = opts.auto.onPauseEnd),
              deprecated("auto.onPauseEnd", "auto.onTimeoutEnd")),
            opts.auto.pauseDuration &&
              ((opts.auto.timeoutDuration = opts.auto.pauseDuration),
              deprecated("auto.pauseDuration", "auto.timeoutDuration"));
        }),
          (FN._build = function () {
            $cfs.data("_cfs_isCarousel", !0);
            var t = $cfs.children(),
              e = in_mapCss($cfs, [
                "textAlign",
                "float",
                "position",
                "top",
                "right",
                "bottom",
                "left",
                "zIndex",
                "width",
                "height",
                "marginTop",
                "marginRight",
                "marginBottom",
                "marginLeft",
              ]),
              s = "relative";
            switch (e.position) {
              case "absolute":
              case "fixed":
                s = e.position;
            }
            "parent" == conf.wrapper ? sz_storeOrigCss($wrp) : $wrp.css(e),
              $wrp.css({ overflow: "hidden", position: s }),
              sz_storeOrigCss($cfs),
              $cfs.data("_cfs_origCssZindex", e.zIndex),
              $cfs.css({
                textAlign: "left",
                float: "none",
                position: "absolute",
                top: 0,
                right: "auto",
                bottom: "auto",
                left: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0,
              }),
              sz_storeMargin(t, opts),
              sz_storeOrigCss(t),
              opts.responsive && sz_setResponsiveSizes(opts, t);
          }),
          (FN._bind_events = function () {
            FN._unbind_events(),
              $cfs.bind(cf_e("stop", conf), function (t, e) {
                return (
                  t.stopPropagation(),
                  crsl.isStopped ||
                    (opts.auto.button &&
                      opts.auto.button.addClass(cf_c("stopped", conf))),
                  (crsl.isStopped = !0),
                  opts.auto.play &&
                    ((opts.auto.play = !1),
                    $cfs.trigger(cf_e("pause", conf), e)),
                  !0
                );
              }),
              $cfs.bind(cf_e("finish", conf), function (t) {
                return (
                  t.stopPropagation(),
                  crsl.isScrolling && sc_stopScroll(scrl),
                  !0
                );
              }),
              $cfs.bind(cf_e("pause", conf), function (t, e, s) {
                if (
                  (t.stopPropagation(),
                  (tmrs = sc_clearTimers(tmrs)),
                  e && crsl.isScrolling)
                ) {
                  scrl.isStopped = !0;
                  var i = getTime() - scrl.startTime;
                  (scrl.duration -= i),
                    scrl.pre && (scrl.pre.duration -= i),
                    scrl.post && (scrl.post.duration -= i),
                    sc_stopScroll(scrl, !1);
                }
                if (
                  (crsl.isPaused ||
                    crsl.isScrolling ||
                    (s && (tmrs.timePassed += getTime() - tmrs.startTime)),
                  crsl.isPaused ||
                    (opts.auto.button &&
                      opts.auto.button.addClass(cf_c("paused", conf))),
                  (crsl.isPaused = !0),
                  opts.auto.onTimeoutPause)
                ) {
                  var o = opts.auto.timeoutDuration - tmrs.timePassed,
                    n = 100 - Math.ceil((100 * o) / opts.auto.timeoutDuration);
                  opts.auto.onTimeoutPause.call($tt0, n, o);
                }
                return !0;
              }),
              $cfs.bind(cf_e("play", conf), function (t, e, s, i) {
                t.stopPropagation(), (tmrs = sc_clearTimers(tmrs));
                var o = [e, s, i],
                  n = ["string", "number", "boolean"],
                  r = cf_sortParams(o, n);
                if (
                  ((e = r[0]),
                  (s = r[1]),
                  (i = r[2]),
                  "prev" != e && "next" != e && (e = crsl.direction),
                  is_number(s) || (s = 0),
                  is_boolean(i) || (i = !1),
                  i && ((crsl.isStopped = !1), (opts.auto.play = !0)),
                  !opts.auto.play)
                )
                  return (
                    t.stopImmediatePropagation(),
                    debug(conf, "Carousel stopped: Not scrolling.")
                  );
                crsl.isPaused &&
                  opts.auto.button &&
                  (opts.auto.button.removeClass(cf_c("stopped", conf)),
                  opts.auto.button.removeClass(cf_c("paused", conf))),
                  (crsl.isPaused = !1),
                  (tmrs.startTime = getTime());
                var c = opts.auto.timeoutDuration + s;
                return (
                  (dur2 = c - tmrs.timePassed),
                  (perc = 100 - Math.ceil((100 * dur2) / c)),
                  opts.auto.progress &&
                    (tmrs.progress = setInterval(function () {
                      var t = getTime() - tmrs.startTime + tmrs.timePassed,
                        e = Math.ceil((100 * t) / c);
                      opts.auto.progress.updater.call(
                        opts.auto.progress.bar[0],
                        e
                      );
                    }, opts.auto.progress.interval)),
                  (tmrs.auto = setTimeout(function () {
                    opts.auto.progress &&
                      opts.auto.progress.updater.call(
                        opts.auto.progress.bar[0],
                        100
                      ),
                      opts.auto.onTimeoutEnd &&
                        opts.auto.onTimeoutEnd.call($tt0, perc, dur2),
                      crsl.isScrolling
                        ? $cfs.trigger(cf_e("play", conf), e)
                        : $cfs.trigger(cf_e(e, conf), opts.auto);
                  }, dur2)),
                  opts.auto.onTimeoutStart &&
                    opts.auto.onTimeoutStart.call($tt0, perc, dur2),
                  !0
                );
              }),
              $cfs.bind(cf_e("resume", conf), function (t) {
                return (
                  t.stopPropagation(),
                  scrl.isStopped
                    ? ((scrl.isStopped = !1),
                      (crsl.isPaused = !1),
                      (crsl.isScrolling = !0),
                      (scrl.startTime = getTime()),
                      sc_startScroll(scrl, conf))
                    : $cfs.trigger(cf_e("play", conf)),
                  !0
                );
              }),
              $cfs.bind(
                cf_e("prev", conf) + " " + cf_e("next", conf),
                function (t, e, s, i, o) {
                  if (
                    (t.stopPropagation(), crsl.isStopped || $cfs.is(":hidden"))
                  )
                    return (
                      t.stopImmediatePropagation(),
                      debug(conf, "Carousel stopped or hidden: Not scrolling.")
                    );
                  var n = is_number(opts.items.minimum)
                    ? opts.items.minimum
                    : opts.items.visible + 1;
                  if (n > itms.total)
                    return (
                      t.stopImmediatePropagation(),
                      debug(
                        conf,
                        "Not enough items (" +
                          itms.total +
                          " total, " +
                          n +
                          " needed): Not scrolling."
                      )
                    );
                  var r = [e, s, i, o],
                    c = ["object", "number/string", "function", "boolean"],
                    a = cf_sortParams(r, c);
                  (e = a[0]), (s = a[1]), (i = a[2]), (o = a[3]);
                  var f = t.type.slice(conf.events.prefix.length);
                  if (
                    (is_object(e) || (e = {}),
                    is_function(i) && (e.onAfter = i),
                    is_boolean(o) && (e.queue = o),
                    (e = $.extend(!0, {}, opts[f], e)),
                    e.conditions && !e.conditions.call($tt0, f))
                  )
                    return (
                      t.stopImmediatePropagation(),
                      debug(conf, 'Callback "conditions" returned false.')
                    );
                  if (!is_number(s)) {
                    if ("*" != opts.items.filter) s = "visible";
                    else
                      for (
                        var l = [s, e.items, opts[f].items],
                          a = 0,
                          u = l.length;
                        u > a;
                        a++
                      )
                        if (
                          is_number(l[a]) ||
                          "page" == l[a] ||
                          "visible" == l[a]
                        ) {
                          s = l[a];
                          break;
                        }
                    switch (s) {
                      case "page":
                        return (
                          t.stopImmediatePropagation(),
                          $cfs.triggerHandler(cf_e(f + "Page", conf), [e, i])
                        );
                      case "visible":
                        opts.items.visibleConf.variable ||
                          "*" != opts.items.filter ||
                          (s = opts.items.visible);
                    }
                  }
                  if (scrl.isStopped)
                    return (
                      $cfs.trigger(cf_e("resume", conf)),
                      $cfs.trigger(cf_e("queue", conf), [f, [e, s, i]]),
                      t.stopImmediatePropagation(),
                      debug(conf, "Carousel resumed scrolling.")
                    );
                  if (e.duration > 0 && crsl.isScrolling)
                    return (
                      e.queue &&
                        ("last" == e.queue && (queu = []),
                        ("first" != e.queue || 0 == queu.length) &&
                          $cfs.trigger(cf_e("queue", conf), [f, [e, s, i]])),
                      t.stopImmediatePropagation(),
                      debug(conf, "Carousel currently scrolling.")
                    );
                  if (
                    ((tmrs.timePassed = 0),
                    $cfs.trigger(cf_e("slide_" + f, conf), [e, s]),
                    opts.synchronise)
                  )
                    for (
                      var p = opts.synchronise, d = [e, s], g = 0, u = p.length;
                      u > g;
                      g++
                    ) {
                      var m = f;
                      p[g][2] || (m = "prev" == m ? "next" : "prev"),
                        p[g][1] ||
                          (d[0] = p[g][0].triggerHandler("_cfs_triggerEvent", [
                            "configuration",
                            m,
                          ])),
                        (d[1] = s + p[g][3]),
                        p[g][0].trigger("_cfs_triggerEvent", ["slide_" + m, d]);
                    }
                  return !0;
                }
              ),
              $cfs.bind(cf_e("slide_prev", conf), function (t, e, s) {
                t.stopPropagation();
                var i = $cfs.children();
                if (!opts.circular && 0 == itms.first)
                  return (
                    opts.infinite &&
                      $cfs.trigger(cf_e("next", conf), itms.total - 1),
                    t.stopImmediatePropagation()
                  );
                if ((sz_resetMargin(i, opts), !is_number(s))) {
                  if (opts.items.visibleConf.variable)
                    s = gn_getVisibleItemsPrev(i, opts, itms.total - 1);
                  else if ("*" != opts.items.filter) {
                    var o = is_number(e.items)
                      ? e.items
                      : gn_getVisibleOrg($cfs, opts);
                    s = gn_getScrollItemsPrevFilter(i, opts, itms.total - 1, o);
                  } else s = opts.items.visible;
                  s = cf_getAdjust(s, opts, e.items, $tt0);
                }
                if (
                  (opts.circular ||
                    (itms.total - s < itms.first &&
                      (s = itms.total - itms.first)),
                  (opts.items.visibleConf.old = opts.items.visible),
                  opts.items.visibleConf.variable)
                ) {
                  var n = cf_getItemsAdjust(
                    gn_getVisibleItemsNext(i, opts, itms.total - s),
                    opts,
                    opts.items.visibleConf.adjust,
                    $tt0
                  );
                  n >= opts.items.visible + s &&
                    itms.total > s &&
                    (s++,
                    (n = cf_getItemsAdjust(
                      gn_getVisibleItemsNext(i, opts, itms.total - s),
                      opts,
                      opts.items.visibleConf.adjust,
                      $tt0
                    ))),
                    (opts.items.visible = n);
                } else if ("*" != opts.items.filter) {
                  var n = gn_getVisibleItemsNextFilter(i, opts, itms.total - s);
                  opts.items.visible = cf_getItemsAdjust(
                    n,
                    opts,
                    opts.items.visibleConf.adjust,
                    $tt0
                  );
                }
                if ((sz_resetMargin(i, opts, !0), 0 == s))
                  return (
                    t.stopImmediatePropagation(),
                    debug(conf, "0 items to scroll: Not scrolling.")
                  );
                for (
                  debug(conf, "Scrolling " + s + " items backward."),
                    itms.first += s;
                  itms.first >= itms.total;

                )
                  itms.first -= itms.total;
                opts.circular ||
                  (0 == itms.first && e.onEnd && e.onEnd.call($tt0, "prev"),
                  opts.infinite || nv_enableNavi(opts, itms.first, conf)),
                  $cfs
                    .children()
                    .slice(itms.total - s, itms.total)
                    .prependTo($cfs),
                  itms.total < opts.items.visible + s &&
                    $cfs
                      .children()
                      .slice(0, opts.items.visible + s - itms.total)
                      .clone(!0)
                      .appendTo($cfs);
                var i = $cfs.children(),
                  r = gi_getOldItemsPrev(i, opts, s),
                  c = gi_getNewItemsPrev(i, opts),
                  a = i.eq(s - 1),
                  f = r.last(),
                  l = c.last();
                sz_resetMargin(i, opts);
                var u = 0,
                  p = 0;
                if (opts.align) {
                  var d = cf_getAlignPadding(c, opts);
                  (u = d[0]), (p = d[1]);
                }
                var g = 0 > u ? opts.padding[opts.d[3]] : 0,
                  m = !1,
                  _ = $();
                if (
                  s > opts.items.visible &&
                  ((_ = i.slice(opts.items.visibleConf.old, s)),
                  "directscroll" == e.fx)
                ) {
                  var b = opts.items[opts.d.width];
                  (m = _),
                    (a = l),
                    sc_hideHiddenItems(m),
                    (opts.items[opts.d.width] = "variable");
                }
                var v = !1,
                  h = ms_getTotalSize(i.slice(0, s), opts, "width"),
                  w = cf_mapWrapperSizes(
                    ms_getSizes(c, opts, !0),
                    opts,
                    !opts.usePadding
                  ),
                  P = 0,
                  C = {},
                  x = {},
                  S = {},
                  y = {},
                  I = {},
                  z = {},
                  j = {},
                  N = sc_getDuration(e, opts, s, h);
                switch (e.fx) {
                  case "cover":
                  case "cover-fade":
                    P = ms_getTotalSize(
                      i.slice(0, opts.items.visible),
                      opts,
                      "width"
                    );
                }
                m && (opts.items[opts.d.width] = b),
                  sz_resetMargin(i, opts, !0),
                  p >= 0 && sz_resetMargin(f, opts, opts.padding[opts.d[1]]),
                  u >= 0 && sz_resetMargin(a, opts, opts.padding[opts.d[3]]),
                  opts.align &&
                    ((opts.padding[opts.d[1]] = p),
                    (opts.padding[opts.d[3]] = u)),
                  (z[opts.d.left] = -(h - g)),
                  (j[opts.d.left] = -(P - g)),
                  (x[opts.d.left] = w[opts.d.width]);
                var k = function () {},
                  O = function () {},
                  T = function () {},
                  M = function () {},
                  F = function () {},
                  A = function () {},
                  H = function () {},
                  q = function () {},
                  D = function () {},
                  V = function () {},
                  R = function () {};
                switch (e.fx) {
                  case "crossfade":
                  case "cover":
                  case "cover-fade":
                  case "uncover":
                  case "uncover-fade":
                    v = $cfs.clone(!0).appendTo($wrp);
                }
                switch (e.fx) {
                  case "crossfade":
                  case "uncover":
                  case "uncover-fade":
                    v.children().slice(0, s).remove(),
                      v.children().slice(opts.items.visibleConf.old).remove();
                    break;
                  case "cover":
                  case "cover-fade":
                    v.children().slice(opts.items.visible).remove(), v.css(j);
                }
                if (
                  ($cfs.css(z),
                  (scrl = sc_setScroll(N, e.easing, conf)),
                  (C[opts.d.left] = opts.usePadding
                    ? opts.padding[opts.d[3]]
                    : 0),
                  ("variable" == opts[opts.d.width] ||
                    "variable" == opts[opts.d.height]) &&
                    ((k = function () {
                      $wrp.css(w);
                    }),
                    (O = function () {
                      scrl.anims.push([$wrp, w]);
                    })),
                  opts.usePadding)
                ) {
                  switch (
                    (l.not(a).length &&
                      ((S[opts.d.marginRight] = a.data("_cfs_origCssMargin")),
                      0 > u
                        ? a.css(S)
                        : ((H = function () {
                            a.css(S);
                          }),
                          (q = function () {
                            scrl.anims.push([a, S]);
                          }))),
                    e.fx)
                  ) {
                    case "cover":
                    case "cover-fade":
                      v.children()
                        .eq(s - 1)
                        .css(S);
                  }
                  l.not(f).length &&
                    ((y[opts.d.marginRight] = f.data("_cfs_origCssMargin")),
                    (T = function () {
                      f.css(y);
                    }),
                    (M = function () {
                      scrl.anims.push([f, y]);
                    })),
                    p >= 0 &&
                      ((I[opts.d.marginRight] =
                        l.data("_cfs_origCssMargin") + opts.padding[opts.d[1]]),
                      (F = function () {
                        l.css(I);
                      }),
                      (A = function () {
                        scrl.anims.push([l, I]);
                      }));
                }
                R = function () {
                  $cfs.css(C);
                };
                var E = opts.items.visible + s - itms.total;
                V = function () {
                  if (
                    (E > 0 &&
                      ($cfs.children().slice(itms.total).remove(),
                      (r = $(
                        $cfs
                          .children()
                          .slice(itms.total - (opts.items.visible - E))
                          .get()
                          .concat($cfs.children().slice(0, E).get())
                      ))),
                    sc_showHiddenItems(m),
                    opts.usePadding)
                  ) {
                    var t = $cfs.children().eq(opts.items.visible + s - 1);
                    t.css(opts.d.marginRight, t.data("_cfs_origCssMargin"));
                  }
                };
                var W = sc_mapCallbackArguments(r, _, c, s, "prev", N, w);
                switch (
                  ((D = function () {
                    sc_afterScroll($cfs, v, e),
                      (crsl.isScrolling = !1),
                      (clbk.onAfter = sc_fireCallbacks(
                        $tt0,
                        e,
                        "onAfter",
                        W,
                        clbk
                      )),
                      (queu = sc_fireQueue($cfs, queu, conf)),
                      crsl.isPaused || $cfs.trigger(cf_e("play", conf));
                  }),
                  (crsl.isScrolling = !0),
                  (tmrs = sc_clearTimers(tmrs)),
                  (clbk.onBefore = sc_fireCallbacks(
                    $tt0,
                    e,
                    "onBefore",
                    W,
                    clbk
                  )),
                  e.fx)
                ) {
                  case "none":
                    $cfs.css(C), k(), T(), F(), H(), R(), V(), D();
                    break;
                  case "fade":
                    scrl.anims.push([
                      $cfs,
                      { opacity: 0 },
                      function () {
                        k(),
                          T(),
                          F(),
                          H(),
                          R(),
                          V(),
                          (scrl = sc_setScroll(N, e.easing, conf)),
                          scrl.anims.push([$cfs, { opacity: 1 }, D]),
                          sc_startScroll(scrl, conf);
                      },
                    ]);
                    break;
                  case "crossfade":
                    $cfs.css({ opacity: 0 }),
                      scrl.anims.push([v, { opacity: 0 }]),
                      scrl.anims.push([$cfs, { opacity: 1 }, D]),
                      O(),
                      T(),
                      F(),
                      H(),
                      R(),
                      V();
                    break;
                  case "cover":
                    scrl.anims.push([
                      v,
                      C,
                      function () {
                        T(), F(), H(), R(), V(), D();
                      },
                    ]),
                      O();
                    break;
                  case "cover-fade":
                    scrl.anims.push([$cfs, { opacity: 0 }]),
                      scrl.anims.push([
                        v,
                        C,
                        function () {
                          T(), F(), H(), R(), V(), D();
                        },
                      ]),
                      O();
                    break;
                  case "uncover":
                    scrl.anims.push([v, x, D]), O(), T(), F(), H(), R(), V();
                    break;
                  case "uncover-fade":
                    $cfs.css({ opacity: 0 }),
                      scrl.anims.push([$cfs, { opacity: 1 }]),
                      scrl.anims.push([v, x, D]),
                      O(),
                      T(),
                      F(),
                      H(),
                      R(),
                      V();
                    break;
                  default:
                    scrl.anims.push([
                      $cfs,
                      C,
                      function () {
                        V(), D();
                      },
                    ]),
                      O(),
                      M(),
                      A(),
                      q();
                }
                return (
                  sc_startScroll(scrl, conf),
                  cf_setCookie(opts.cookie, $cfs, conf),
                  $cfs.trigger(cf_e("updatePageStatus", conf), [!1, w]),
                  !0
                );
              }),
              $cfs.bind(cf_e("slide_next", conf), function (t, e, s) {
                t.stopPropagation();
                var i = $cfs.children();
                if (!opts.circular && itms.first == opts.items.visible)
                  return (
                    opts.infinite &&
                      $cfs.trigger(cf_e("prev", conf), itms.total - 1),
                    t.stopImmediatePropagation()
                  );
                if ((sz_resetMargin(i, opts), !is_number(s))) {
                  if ("*" != opts.items.filter) {
                    var o = is_number(e.items)
                      ? e.items
                      : gn_getVisibleOrg($cfs, opts);
                    s = gn_getScrollItemsNextFilter(i, opts, 0, o);
                  } else s = opts.items.visible;
                  s = cf_getAdjust(s, opts, e.items, $tt0);
                }
                var n = 0 == itms.first ? itms.total : itms.first;
                if (!opts.circular) {
                  if (opts.items.visibleConf.variable)
                    var r = gn_getVisibleItemsNext(i, opts, s),
                      o = gn_getVisibleItemsPrev(i, opts, n - 1);
                  else
                    var r = opts.items.visible,
                      o = opts.items.visible;
                  s + r > n && (s = n - o);
                }
                if (
                  ((opts.items.visibleConf.old = opts.items.visible),
                  opts.items.visibleConf.variable)
                ) {
                  for (
                    var r = cf_getItemsAdjust(
                      gn_getVisibleItemsNextTestCircular(i, opts, s, n),
                      opts,
                      opts.items.visibleConf.adjust,
                      $tt0
                    );
                    opts.items.visible - s >= r && itms.total > s;

                  )
                    s++,
                      (r = cf_getItemsAdjust(
                        gn_getVisibleItemsNextTestCircular(i, opts, s, n),
                        opts,
                        opts.items.visibleConf.adjust,
                        $tt0
                      ));
                  opts.items.visible = r;
                } else if ("*" != opts.items.filter) {
                  var r = gn_getVisibleItemsNextFilter(i, opts, s);
                  opts.items.visible = cf_getItemsAdjust(
                    r,
                    opts,
                    opts.items.visibleConf.adjust,
                    $tt0
                  );
                }
                if ((sz_resetMargin(i, opts, !0), 0 == s))
                  return (
                    t.stopImmediatePropagation(),
                    debug(conf, "0 items to scroll: Not scrolling.")
                  );
                for (
                  debug(conf, "Scrolling " + s + " items forward."),
                    itms.first -= s;
                  0 > itms.first;

                )
                  itms.first += itms.total;
                opts.circular ||
                  (itms.first == opts.items.visible &&
                    e.onEnd &&
                    e.onEnd.call($tt0, "next"),
                  opts.infinite || nv_enableNavi(opts, itms.first, conf)),
                  itms.total < opts.items.visible + s &&
                    $cfs
                      .children()
                      .slice(0, opts.items.visible + s - itms.total)
                      .clone(!0)
                      .appendTo($cfs);
                var i = $cfs.children(),
                  c = gi_getOldItemsNext(i, opts),
                  a = gi_getNewItemsNext(i, opts, s),
                  f = i.eq(s - 1),
                  l = c.last(),
                  u = a.last();
                sz_resetMargin(i, opts);
                var p = 0,
                  d = 0;
                if (opts.align) {
                  var g = cf_getAlignPadding(a, opts);
                  (p = g[0]), (d = g[1]);
                }
                var m = !1,
                  _ = $();
                if (
                  s > opts.items.visibleConf.old &&
                  ((_ = i.slice(opts.items.visibleConf.old, s)),
                  "directscroll" == e.fx)
                ) {
                  var b = opts.items[opts.d.width];
                  (m = _),
                    (f = l),
                    sc_hideHiddenItems(m),
                    (opts.items[opts.d.width] = "variable");
                }
                var v = !1,
                  h = ms_getTotalSize(i.slice(0, s), opts, "width"),
                  w = cf_mapWrapperSizes(
                    ms_getSizes(a, opts, !0),
                    opts,
                    !opts.usePadding
                  ),
                  P = 0,
                  C = {},
                  x = {},
                  S = {},
                  y = {},
                  I = {},
                  z = sc_getDuration(e, opts, s, h);
                switch (e.fx) {
                  case "uncover":
                  case "uncover-fade":
                    P = ms_getTotalSize(
                      i.slice(0, opts.items.visibleConf.old),
                      opts,
                      "width"
                    );
                }
                m && (opts.items[opts.d.width] = b),
                  opts.align &&
                    0 > opts.padding[opts.d[1]] &&
                    (opts.padding[opts.d[1]] = 0),
                  sz_resetMargin(i, opts, !0),
                  sz_resetMargin(l, opts, opts.padding[opts.d[1]]),
                  opts.align &&
                    ((opts.padding[opts.d[1]] = d),
                    (opts.padding[opts.d[3]] = p)),
                  (I[opts.d.left] = opts.usePadding
                    ? opts.padding[opts.d[3]]
                    : 0);
                var j = function () {},
                  N = function () {},
                  k = function () {},
                  O = function () {},
                  T = function () {},
                  M = function () {},
                  F = function () {},
                  A = function () {},
                  H = function () {};
                switch (e.fx) {
                  case "crossfade":
                  case "cover":
                  case "cover-fade":
                  case "uncover":
                  case "uncover-fade":
                    (v = $cfs.clone(!0).appendTo($wrp)),
                      v.children().slice(opts.items.visibleConf.old).remove();
                }
                switch (e.fx) {
                  case "crossfade":
                  case "cover":
                  case "cover-fade":
                    $cfs.css("zIndex", 1), v.css("zIndex", 0);
                }
                if (
                  ((scrl = sc_setScroll(z, e.easing, conf)),
                  (C[opts.d.left] = -h),
                  (x[opts.d.left] = -P),
                  0 > p && (C[opts.d.left] += p),
                  ("variable" == opts[opts.d.width] ||
                    "variable" == opts[opts.d.height]) &&
                    ((j = function () {
                      $wrp.css(w);
                    }),
                    (N = function () {
                      scrl.anims.push([$wrp, w]);
                    })),
                  opts.usePadding)
                ) {
                  var q = u.data("_cfs_origCssMargin");
                  d >= 0 && (q += opts.padding[opts.d[1]]),
                    u.css(opts.d.marginRight, q),
                    f.not(l).length &&
                      (y[opts.d.marginRight] = l.data("_cfs_origCssMargin")),
                    (k = function () {
                      l.css(y);
                    }),
                    (O = function () {
                      scrl.anims.push([l, y]);
                    });
                  var D = f.data("_cfs_origCssMargin");
                  p > 0 && (D += opts.padding[opts.d[3]]),
                    (S[opts.d.marginRight] = D),
                    (T = function () {
                      f.css(S);
                    }),
                    (M = function () {
                      scrl.anims.push([f, S]);
                    });
                }
                H = function () {
                  $cfs.css(I);
                };
                var V = opts.items.visible + s - itms.total;
                A = function () {
                  V > 0 && $cfs.children().slice(itms.total).remove();
                  var t = $cfs.children().slice(0, s).appendTo($cfs).last();
                  if (
                    (V > 0 && (a = gi_getCurrentItems(i, opts)),
                    sc_showHiddenItems(m),
                    opts.usePadding)
                  ) {
                    if (itms.total < opts.items.visible + s) {
                      var e = $cfs.children().eq(opts.items.visible - 1);
                      e.css(
                        opts.d.marginRight,
                        e.data("_cfs_origCssMargin") + opts.padding[opts.d[1]]
                      );
                    }
                    t.css(opts.d.marginRight, t.data("_cfs_origCssMargin"));
                  }
                };
                var R = sc_mapCallbackArguments(c, _, a, s, "next", z, w);
                switch (
                  ((F = function () {
                    $cfs.css("zIndex", $cfs.data("_cfs_origCssZindex")),
                      sc_afterScroll($cfs, v, e),
                      (crsl.isScrolling = !1),
                      (clbk.onAfter = sc_fireCallbacks(
                        $tt0,
                        e,
                        "onAfter",
                        R,
                        clbk
                      )),
                      (queu = sc_fireQueue($cfs, queu, conf)),
                      crsl.isPaused || $cfs.trigger(cf_e("play", conf));
                  }),
                  (crsl.isScrolling = !0),
                  (tmrs = sc_clearTimers(tmrs)),
                  (clbk.onBefore = sc_fireCallbacks(
                    $tt0,
                    e,
                    "onBefore",
                    R,
                    clbk
                  )),
                  e.fx)
                ) {
                  case "none":
                    $cfs.css(C), j(), k(), T(), H(), A(), F();
                    break;
                  case "fade":
                    scrl.anims.push([
                      $cfs,
                      { opacity: 0 },
                      function () {
                        j(),
                          k(),
                          T(),
                          H(),
                          A(),
                          (scrl = sc_setScroll(z, e.easing, conf)),
                          scrl.anims.push([$cfs, { opacity: 1 }, F]),
                          sc_startScroll(scrl, conf);
                      },
                    ]);
                    break;
                  case "crossfade":
                    $cfs.css({ opacity: 0 }),
                      scrl.anims.push([v, { opacity: 0 }]),
                      scrl.anims.push([$cfs, { opacity: 1 }, F]),
                      N(),
                      k(),
                      T(),
                      H(),
                      A();
                    break;
                  case "cover":
                    $cfs.css(opts.d.left, $wrp[opts.d.width]()),
                      scrl.anims.push([$cfs, I, F]),
                      N(),
                      k(),
                      T(),
                      A();
                    break;
                  case "cover-fade":
                    $cfs.css(opts.d.left, $wrp[opts.d.width]()),
                      scrl.anims.push([v, { opacity: 0 }]),
                      scrl.anims.push([$cfs, I, F]),
                      N(),
                      k(),
                      T(),
                      A();
                    break;
                  case "uncover":
                    scrl.anims.push([v, x, F]), N(), k(), T(), H(), A();
                    break;
                  case "uncover-fade":
                    $cfs.css({ opacity: 0 }),
                      scrl.anims.push([$cfs, { opacity: 1 }]),
                      scrl.anims.push([v, x, F]),
                      N(),
                      k(),
                      T(),
                      H(),
                      A();
                    break;
                  default:
                    scrl.anims.push([
                      $cfs,
                      C,
                      function () {
                        H(), A(), F();
                      },
                    ]),
                      N(),
                      O(),
                      M();
                }
                return (
                  sc_startScroll(scrl, conf),
                  cf_setCookie(opts.cookie, $cfs, conf),
                  $cfs.trigger(cf_e("updatePageStatus", conf), [!1, w]),
                  !0
                );
              }),
              $cfs.bind(cf_e("slideTo", conf), function (t, e, s, i, o, n, r) {
                t.stopPropagation();
                var c = [e, s, i, o, n, r],
                  a = [
                    "string/number/object",
                    "number",
                    "boolean",
                    "object",
                    "string",
                    "function",
                  ],
                  f = cf_sortParams(c, a);
                return (
                  (o = f[3]),
                  (n = f[4]),
                  (r = f[5]),
                  (e = gn_getItemIndex(f[0], f[1], f[2], itms, $cfs)),
                  0 == e
                    ? !1
                    : (is_object(o) || (o = !1),
                      "prev" != n &&
                        "next" != n &&
                        (n = opts.circular
                          ? itms.total / 2 >= e
                            ? "next"
                            : "prev"
                          : 0 == itms.first || itms.first > e
                          ? "next"
                          : "prev"),
                      "prev" == n && (e = itms.total - e),
                      $cfs.trigger(cf_e(n, conf), [o, e, r]),
                      !0)
                );
              }),
              $cfs.bind(cf_e("prevPage", conf), function (t, e, s) {
                t.stopPropagation();
                var i = $cfs.triggerHandler(cf_e("currentPage", conf));
                return $cfs.triggerHandler(cf_e("slideToPage", conf), [
                  i - 1,
                  e,
                  "prev",
                  s,
                ]);
              }),
              $cfs.bind(cf_e("nextPage", conf), function (t, e, s) {
                t.stopPropagation();
                var i = $cfs.triggerHandler(cf_e("currentPage", conf));
                return $cfs.triggerHandler(cf_e("slideToPage", conf), [
                  i + 1,
                  e,
                  "next",
                  s,
                ]);
              }),
              $cfs.bind(cf_e("slideToPage", conf), function (t, e, s, i, o) {
                t.stopPropagation(),
                  is_number(e) ||
                    (e = $cfs.triggerHandler(cf_e("currentPage", conf)));
                var n = opts.pagination.items || opts.items.visible,
                  r = Math.ceil(itms.total / n) - 1;
                return (
                  0 > e && (e = r),
                  e > r && (e = 0),
                  $cfs.triggerHandler(cf_e("slideTo", conf), [
                    e * n,
                    0,
                    !0,
                    s,
                    i,
                    o,
                  ])
                );
              }),
              $cfs.bind(cf_e("jumpToStart", conf), function (t, e) {
                if (
                  (t.stopPropagation(),
                  (e = e ? gn_getItemIndex(e, 0, !0, itms, $cfs) : 0),
                  (e += itms.first),
                  0 != e)
                ) {
                  if (itms.total > 0) for (; e > itms.total; ) e -= itms.total;
                  $cfs.prepend($cfs.children().slice(e, itms.total));
                }
                return !0;
              }),
              $cfs.bind(cf_e("synchronise", conf), function (t, e) {
                if ((t.stopPropagation(), e)) e = cf_getSynchArr(e);
                else {
                  if (!opts.synchronise)
                    return debug(conf, "No carousel to synchronise.");
                  e = opts.synchronise;
                }
                for (
                  var s = $cfs.triggerHandler(cf_e("currentPosition", conf)),
                    i = !0,
                    o = 0,
                    n = e.length;
                  n > o;
                  o++
                )
                  e[o][0].triggerHandler(cf_e("slideTo", conf), [
                    s,
                    e[o][3],
                    !0,
                  ]) || (i = !1);
                return i;
              }),
              $cfs.bind(cf_e("queue", conf), function (t, e, s) {
                return (
                  t.stopPropagation(),
                  is_function(e)
                    ? e.call($tt0, queu)
                    : is_array(e)
                    ? (queu = e)
                    : is_undefined(e) || queu.push([e, s]),
                  queu
                );
              }),
              $cfs.bind(cf_e("insertItem", conf), function (t, e, s, i, o) {
                t.stopPropagation();
                var n = [e, s, i, o],
                  r = [
                    "string/object",
                    "string/number/object",
                    "boolean",
                    "number",
                  ],
                  c = cf_sortParams(n, r);
                if (
                  ((e = c[0]),
                  (s = c[1]),
                  (i = c[2]),
                  (o = c[3]),
                  is_object(e) && !is_jquery(e)
                    ? (e = $(e))
                    : is_string(e) && (e = $(e)),
                  !is_jquery(e) || 0 == e.length)
                )
                  return debug(conf, "Not a valid object.");
                is_undefined(s) && (s = "end"),
                  sz_storeMargin(e, opts),
                  sz_storeOrigCss(e);
                var a = s,
                  f = "before";
                "end" == s
                  ? i
                    ? (0 == itms.first
                        ? ((s = itms.total - 1), (f = "after"))
                        : ((s = itms.first), (itms.first += e.length)),
                      0 > s && (s = 0))
                    : ((s = itms.total - 1), (f = "after"))
                  : (s = gn_getItemIndex(s, o, i, itms, $cfs));
                var l = $cfs.children().eq(s);
                return (
                  l.length
                    ? l[f](e)
                    : (debug(
                        conf,
                        "Correct insert-position not found! Appending item to the end."
                      ),
                      $cfs.append(e)),
                  "end" == a ||
                    i ||
                    (itms.first > s && (itms.first += e.length)),
                  (itms.total = $cfs.children().length),
                  itms.first >= itms.total && (itms.first -= itms.total),
                  $cfs.trigger(cf_e("updateSizes", conf)),
                  $cfs.trigger(cf_e("linkAnchors", conf)),
                  !0
                );
              }),
              $cfs.bind(cf_e("removeItem", conf), function (t, e, s, i) {
                t.stopPropagation();
                var o = [e, s, i],
                  n = ["string/number/object", "boolean", "number"],
                  r = cf_sortParams(o, n);
                if (
                  ((e = r[0]),
                  (s = r[1]),
                  (i = r[2]),
                  e instanceof $ && e.length > 1)
                )
                  return (
                    (c = $()),
                    e.each(function () {
                      var t = $cfs.trigger(cf_e("removeItem", conf), [
                        $(this),
                        s,
                        i,
                      ]);
                      t && (c = c.add(t));
                    }),
                    c
                  );
                if (is_undefined(e) || "end" == e) c = $cfs.children().last();
                else {
                  e = gn_getItemIndex(e, i, s, itms, $cfs);
                  var c = $cfs.children().eq(e);
                  c.length && itms.first > e && (itms.first -= c.length);
                }
                return (
                  c &&
                    c.length &&
                    (c.detach(),
                    (itms.total = $cfs.children().length),
                    $cfs.trigger(cf_e("updateSizes", conf))),
                  c
                );
              }),
              $cfs.bind(
                cf_e("onBefore", conf) + " " + cf_e("onAfter", conf),
                function (t, e) {
                  t.stopPropagation();
                  var s = t.type.slice(conf.events.prefix.length);
                  return (
                    is_array(e) && (clbk[s] = e),
                    is_function(e) && clbk[s].push(e),
                    clbk[s]
                  );
                }
              ),
              $cfs.bind(cf_e("currentPosition", conf), function (t, e) {
                if ((t.stopPropagation(), 0 == itms.first)) var s = 0;
                else var s = itms.total - itms.first;
                return is_function(e) && e.call($tt0, s), s;
              }),
              $cfs.bind(cf_e("currentPage", conf), function (t, e) {
                t.stopPropagation();
                var s,
                  i = opts.pagination.items || opts.items.visible,
                  o = Math.ceil(itms.total / i - 1);
                return (
                  (s =
                    0 == itms.first
                      ? 0
                      : itms.first < itms.total % i
                      ? 0
                      : itms.first != i || opts.circular
                      ? Math.round((itms.total - itms.first) / i)
                      : o),
                  0 > s && (s = 0),
                  s > o && (s = o),
                  is_function(e) && e.call($tt0, s),
                  s
                );
              }),
              $cfs.bind(cf_e("currentVisible", conf), function (t, e) {
                t.stopPropagation();
                var s = gi_getCurrentItems($cfs.children(), opts);
                return is_function(e) && e.call($tt0, s), s;
              }),
              $cfs.bind(cf_e("slice", conf), function (t, e, s, i) {
                if ((t.stopPropagation(), 0 == itms.total)) return !1;
                var o = [e, s, i],
                  n = ["number", "number", "function"],
                  r = cf_sortParams(o, n);
                if (
                  ((e = is_number(r[0]) ? r[0] : 0),
                  (s = is_number(r[1]) ? r[1] : itms.total),
                  (i = r[2]),
                  (e += itms.first),
                  (s += itms.first),
                  items.total > 0)
                ) {
                  for (; e > itms.total; ) e -= itms.total;
                  for (; s > itms.total; ) s -= itms.total;
                  for (; 0 > e; ) e += itms.total;
                  for (; 0 > s; ) s += itms.total;
                }
                var c,
                  a = $cfs.children();
                return (
                  (c =
                    s > e
                      ? a.slice(e, s)
                      : $(
                          a
                            .slice(e, itms.total)
                            .get()
                            .concat(a.slice(0, s).get())
                        )),
                  is_function(i) && i.call($tt0, c),
                  c
                );
              }),
              $cfs.bind(
                cf_e("isPaused", conf) +
                  " " +
                  cf_e("isStopped", conf) +
                  " " +
                  cf_e("isScrolling", conf),
                function (t, e) {
                  t.stopPropagation();
                  var s = t.type.slice(conf.events.prefix.length),
                    i = crsl[s];
                  return is_function(e) && e.call($tt0, i), i;
                }
              ),
              $cfs.bind(cf_e("configuration", conf), function (e, a, b, c) {
                e.stopPropagation();
                var reInit = !1;
                if (is_function(a)) a.call($tt0, opts);
                else if (is_object(a))
                  (opts_orig = $.extend(!0, {}, opts_orig, a)),
                    b !== !1
                      ? (reInit = !0)
                      : (opts = $.extend(!0, {}, opts, a));
                else if (!is_undefined(a))
                  if (is_function(b)) {
                    var val = eval("opts." + a);
                    is_undefined(val) && (val = ""), b.call($tt0, val);
                  } else {
                    if (is_undefined(b)) return eval("opts." + a);
                    "boolean" != typeof c && (c = !0),
                      eval("opts_orig." + a + " = b"),
                      c !== !1 ? (reInit = !0) : eval("opts." + a + " = b");
                  }
                if (reInit) {
                  sz_resetMargin($cfs.children(), opts),
                    FN._init(opts_orig),
                    FN._bind_buttons();
                  var sz = sz_setSizes($cfs, opts);
                  $cfs.trigger(cf_e("updatePageStatus", conf), [!0, sz]);
                }
                return opts;
              }),
              $cfs.bind(cf_e("linkAnchors", conf), function (t, e, s) {
                return (
                  t.stopPropagation(),
                  is_undefined(e)
                    ? (e = $("body"))
                    : is_string(e) && (e = $(e)),
                  is_jquery(e) && 0 != e.length
                    ? (is_string(s) || (s = "a.caroufredsel"),
                      e.find(s).each(function () {
                        var t = this.hash || "";
                        t.length > 0 &&
                          -1 != $cfs.children().index($(t)) &&
                          $(this)
                            .unbind("click")
                            .click(function (e) {
                              e.preventDefault(),
                                $cfs.trigger(cf_e("slideTo", conf), t);
                            });
                      }),
                      !0)
                    : debug(conf, "Not a valid object.")
                );
              }),
              $cfs.bind(cf_e("updatePageStatus", conf), function (t, e) {
                if ((t.stopPropagation(), opts.pagination.container)) {
                  var s = opts.pagination.items || opts.items.visible,
                    i = Math.ceil(itms.total / s);
                  e &&
                    (opts.pagination.anchorBuilder &&
                      (opts.pagination.container.children().remove(),
                      opts.pagination.container.each(function () {
                        for (var t = 0; i > t; t++) {
                          var e = $cfs
                            .children()
                            .eq(gn_getItemIndex(t * s, 0, !0, itms, $cfs));
                          $(this).append(
                            opts.pagination.anchorBuilder.call(e[0], t + 1)
                          );
                        }
                      })),
                    opts.pagination.container.each(function () {
                      $(this)
                        .children()
                        .unbind(opts.pagination.event)
                        .each(function (t) {
                          $(this).bind(opts.pagination.event, function (e) {
                            e.preventDefault(),
                              $cfs.trigger(cf_e("slideTo", conf), [
                                t * s,
                                -opts.pagination.deviation,
                                !0,
                                opts.pagination,
                              ]);
                          });
                        });
                    }));
                  var o =
                    $cfs.triggerHandler(cf_e("currentPage", conf)) +
                    opts.pagination.deviation;
                  return (
                    o >= i && (o = 0),
                    0 > o && (o = i - 1),
                    opts.pagination.container.each(function () {
                      $(this)
                        .children()
                        .removeClass(cf_c("selected", conf))
                        .eq(o)
                        .addClass(cf_c("selected", conf));
                    }),
                    !0
                  );
                }
              }),
              $cfs.bind(cf_e("updateSizes", conf), function () {
                var t = opts.items.visible,
                  e = $cfs.children(),
                  s = ms_getParentSize($wrp, opts, "width");
                if (
                  ((itms.total = e.length),
                  crsl.primarySizePercentage
                    ? ((opts.maxDimension = s),
                      (opts[opts.d.width] = ms_getPercentage(
                        s,
                        crsl.primarySizePercentage
                      )))
                    : (opts.maxDimension = ms_getMaxDimension(opts, s)),
                  opts.responsive
                    ? ((opts.items.width = opts.items.sizesConf.width),
                      (opts.items.height = opts.items.sizesConf.height),
                      (opts = in_getResponsiveValues(opts, e, s)),
                      (t = opts.items.visible),
                      sz_setResponsiveSizes(opts, e))
                    : opts.items.visibleConf.variable
                    ? (t = gn_getVisibleItemsNext(e, opts, 0))
                    : "*" != opts.items.filter &&
                      (t = gn_getVisibleItemsNextFilter(e, opts, 0)),
                  !opts.circular && 0 != itms.first && t > itms.first)
                ) {
                  if (opts.items.visibleConf.variable)
                    var i =
                      gn_getVisibleItemsPrev(e, opts, itms.first) - itms.first;
                  else if ("*" != opts.items.filter)
                    var i =
                      gn_getVisibleItemsPrevFilter(e, opts, itms.first) -
                      itms.first;
                  else var i = opts.items.visible - itms.first;
                  debug(
                    conf,
                    "Preventing non-circular: sliding " + i + " items backward."
                  ),
                    $cfs.trigger(cf_e("prev", conf), i);
                }
                (opts.items.visible = cf_getItemsAdjust(
                  t,
                  opts,
                  opts.items.visibleConf.adjust,
                  $tt0
                )),
                  (opts.items.visibleConf.old = opts.items.visible),
                  (opts = in_getAlignPadding(opts, e));
                var o = sz_setSizes($cfs, opts);
                return (
                  $cfs.trigger(cf_e("updatePageStatus", conf), [!0, o]),
                  nv_showNavi(opts, itms.total, conf),
                  nv_enableNavi(opts, itms.first, conf),
                  o
                );
              }),
              $cfs.bind(cf_e("destroy", conf), function (t, e) {
                return (
                  t.stopPropagation(),
                  (tmrs = sc_clearTimers(tmrs)),
                  $cfs.data("_cfs_isCarousel", !1),
                  $cfs.trigger(cf_e("finish", conf)),
                  e && $cfs.trigger(cf_e("jumpToStart", conf)),
                  sz_restoreOrigCss($cfs.children()),
                  sz_restoreOrigCss($cfs),
                  FN._unbind_events(),
                  FN._unbind_buttons(),
                  "parent" == conf.wrapper
                    ? sz_restoreOrigCss($wrp)
                    : $wrp.replaceWith($cfs),
                  !0
                );
              }),
              $cfs.bind(cf_e("debug", conf), function () {
                return (
                  debug(conf, "Carousel width: " + opts.width),
                  debug(conf, "Carousel height: " + opts.height),
                  debug(conf, "Item widths: " + opts.items.width),
                  debug(conf, "Item heights: " + opts.items.height),
                  debug(conf, "Number of items visible: " + opts.items.visible),
                  opts.auto.play &&
                    debug(
                      conf,
                      "Number of items scrolled automatically: " +
                        opts.auto.items
                    ),
                  opts.prev.button &&
                    debug(
                      conf,
                      "Number of items scrolled backward: " + opts.prev.items
                    ),
                  opts.next.button &&
                    debug(
                      conf,
                      "Number of items scrolled forward: " + opts.next.items
                    ),
                  conf.debug
                );
              }),
              $cfs.bind("_cfs_triggerEvent", function (t, e, s) {
                return (
                  t.stopPropagation(), $cfs.triggerHandler(cf_e(e, conf), s)
                );
              });
          }),
          (FN._unbind_events = function () {
            $cfs.unbind(cf_e("", conf)),
              $cfs.unbind(cf_e("", conf, !1)),
              $cfs.unbind("_cfs_triggerEvent");
          }),
          (FN._bind_buttons = function () {
            if (
              (FN._unbind_buttons(),
              nv_showNavi(opts, itms.total, conf),
              nv_enableNavi(opts, itms.first, conf),
              opts.auto.pauseOnHover)
            ) {
              var t = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
              $wrp
                .bind(cf_e("mouseenter", conf, !1), function () {
                  $cfs.trigger(cf_e("pause", conf), t);
                })
                .bind(cf_e("mouseleave", conf, !1), function () {
                  $cfs.trigger(cf_e("resume", conf));
                });
            }
            if (
              (opts.auto.button &&
                opts.auto.button.bind(
                  cf_e(opts.auto.event, conf, !1),
                  function (t) {
                    t.preventDefault();
                    var e = !1,
                      s = null;
                    crsl.isPaused
                      ? (e = "play")
                      : opts.auto.pauseOnEvent &&
                        ((e = "pause"),
                        (s = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent))),
                      e && $cfs.trigger(cf_e(e, conf), s);
                  }
                ),
              opts.prev.button &&
                (opts.prev.button.bind(
                  cf_e(opts.prev.event, conf, !1),
                  function (t) {
                    t.preventDefault(), $cfs.trigger(cf_e("prev", conf));
                  }
                ),
                opts.prev.pauseOnHover))
            ) {
              var t = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
              opts.prev.button
                .bind(cf_e("mouseenter", conf, !1), function () {
                  $cfs.trigger(cf_e("pause", conf), t);
                })
                .bind(cf_e("mouseleave", conf, !1), function () {
                  $cfs.trigger(cf_e("resume", conf));
                });
            }
            if (
              opts.next.button &&
              (opts.next.button.bind(
                cf_e(opts.next.event, conf, !1),
                function (t) {
                  t.preventDefault(), $cfs.trigger(cf_e("next", conf));
                }
              ),
              opts.next.pauseOnHover)
            ) {
              var t = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
              opts.next.button
                .bind(cf_e("mouseenter", conf, !1), function () {
                  $cfs.trigger(cf_e("pause", conf), t);
                })
                .bind(cf_e("mouseleave", conf, !1), function () {
                  $cfs.trigger(cf_e("resume", conf));
                });
            }
            if (opts.pagination.container && opts.pagination.pauseOnHover) {
              var t = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
              opts.pagination.container
                .bind(cf_e("mouseenter", conf, !1), function () {
                  $cfs.trigger(cf_e("pause", conf), t);
                })
                .bind(cf_e("mouseleave", conf, !1), function () {
                  $cfs.trigger(cf_e("resume", conf));
                });
            }
            if (
              ((opts.prev.key || opts.next.key) &&
                $(document).bind(cf_e("keyup", conf, !1, !0, !0), function (t) {
                  var e = t.keyCode;
                  e == opts.next.key &&
                    (t.preventDefault(), $cfs.trigger(cf_e("next", conf))),
                    e == opts.prev.key &&
                      (t.preventDefault(), $cfs.trigger(cf_e("prev", conf)));
                }),
              opts.pagination.keys &&
                $(document).bind(cf_e("keyup", conf, !1, !0, !0), function (t) {
                  var e = t.keyCode;
                  e >= 49 &&
                    58 > e &&
                    ((e = (e - 49) * opts.items.visible),
                    itms.total >= e &&
                      (t.preventDefault(),
                      $cfs.trigger(cf_e("slideTo", conf), [
                        e,
                        0,
                        !0,
                        opts.pagination,
                      ])));
                }),
              $.fn.swipe)
            ) {
              var e = "ontouchstart" in window;
              if ((e && opts.swipe.onTouch) || (!e && opts.swipe.onMouse)) {
                var s = $.extend(!0, {}, opts.prev, opts.swipe),
                  i = $.extend(!0, {}, opts.next, opts.swipe),
                  o = function () {
                    $cfs.trigger(cf_e("prev", conf), [s]);
                  },
                  n = function () {
                    $cfs.trigger(cf_e("next", conf), [i]);
                  };
                switch (opts.direction) {
                  case "up":
                  case "down":
                    (opts.swipe.options.swipeUp = n),
                      (opts.swipe.options.swipeDown = o);
                    break;
                  default:
                    (opts.swipe.options.swipeLeft = n),
                      (opts.swipe.options.swipeRight = o);
                }
                crsl.swipe && $cfs.swipe("destroy"),
                  $wrp.swipe(opts.swipe.options),
                  $wrp.css("cursor", "move"),
                  (crsl.swipe = !0);
              }
            }
            if ($.fn.mousewheel && opts.mousewheel) {
              var r = $.extend(!0, {}, opts.prev, opts.mousewheel),
                c = $.extend(!0, {}, opts.next, opts.mousewheel);
              crsl.mousewheel && $wrp.unbind(cf_e("mousewheel", conf, !1)),
                $wrp.bind(cf_e("mousewheel", conf, !1), function (t, e) {
                  t.preventDefault(),
                    e > 0
                      ? $cfs.trigger(cf_e("prev", conf), [r])
                      : $cfs.trigger(cf_e("next", conf), [c]);
                }),
                (crsl.mousewheel = !0);
            }
            if (
              (opts.auto.play &&
                $cfs.trigger(cf_e("play", conf), opts.auto.delay),
              crsl.upDateOnWindowResize)
            ) {
              var a = function () {
                  $cfs.trigger(cf_e("finish", conf)),
                    opts.auto.pauseOnResize &&
                      !crsl.isPaused &&
                      $cfs.trigger(cf_e("play", conf)),
                    sz_resetMargin($cfs.children(), opts),
                    $cfs.trigger(cf_e("updateSizes", conf));
                },
                f = $(window),
                l = null;
              if ($.debounce && "debounce" == conf.onWindowResize)
                l = $.debounce(200, a);
              else if ($.throttle && "throttle" == conf.onWindowResize)
                l = $.throttle(300, a);
              else {
                var u = 0,
                  p = 0;
                l = function () {
                  var t = f.width(),
                    e = f.height();
                  (t != u || e != p) && (a(), (u = t), (p = e));
                };
              }
              f.bind(cf_e("resize", conf, !1, !0, !0), l);
            }
          }),
          (FN._unbind_buttons = function () {
            var t = (cf_e("", conf), cf_e("", conf, !1));
            (ns3 = cf_e("", conf, !1, !0, !0)),
              $(document).unbind(ns3),
              $(window).unbind(ns3),
              $wrp.unbind(t),
              opts.auto.button && opts.auto.button.unbind(t),
              opts.prev.button && opts.prev.button.unbind(t),
              opts.next.button && opts.next.button.unbind(t),
              opts.pagination.container &&
                (opts.pagination.container.unbind(t),
                opts.pagination.anchorBuilder &&
                  opts.pagination.container.children().remove()),
              crsl.swipe &&
                ($cfs.swipe("destroy"),
                $wrp.css("cursor", "default"),
                (crsl.swipe = !1)),
              crsl.mousewheel && (crsl.mousewheel = !1),
              nv_showNavi(opts, "hide", conf),
              nv_enableNavi(opts, "removeClass", conf);
          }),
          is_boolean(configs) && (configs = { debug: configs });
        var crsl = {
            direction: "next",
            isPaused: !0,
            isScrolling: !1,
            isStopped: !1,
            mousewheel: !1,
            swipe: !1,
          },
          itms = { total: $cfs.children().length, first: 0 },
          tmrs = {
            auto: null,
            progress: null,
            startTime: getTime(),
            timePassed: 0,
          },
          scrl = {
            isStopped: !1,
            duration: 0,
            startTime: 0,
            easing: "",
            anims: [],
          },
          clbk = { onBefore: [], onAfter: [] },
          queu = [],
          conf = $.extend(!0, {}, $.fn.carouFredSel.configs, configs),
          opts = {},
          opts_orig = $.extend(!0, {}, options),
          $wrp =
            "parent" == conf.wrapper
              ? $cfs.parent()
              : $cfs
                  .wrap(
                    "<" +
                      conf.wrapper.element +
                      ' class="' +
                      conf.wrapper.classname +
                      '" />'
                  )
                  .parent();
        if (
          ((conf.selector = $cfs.selector),
          (conf.serialNumber = $.fn.carouFredSel.serialNumber++),
          (conf.transition =
            conf.transition && $.fn.transition ? "transition" : "animate"),
          FN._init(opts_orig, !0, starting_position),
          FN._build(),
          FN._bind_events(),
          FN._bind_buttons(),
          is_array(opts.items.start))
        )
          var start_arr = opts.items.start;
        else {
          var start_arr = [];
          0 != opts.items.start && start_arr.push(opts.items.start);
        }
        if (
          (opts.cookie &&
            start_arr.unshift(parseInt(cf_getCookie(opts.cookie), 10)),
          start_arr.length > 0)
        )
          for (var a = 0, l = start_arr.length; l > a; a++) {
            var s = start_arr[a];
            if (0 != s) {
              if (s === !0) {
                if (((s = window.location.hash), 1 > s.length)) continue;
              } else
                "random" === s && (s = Math.floor(Math.random() * itms.total));
              if (
                $cfs.triggerHandler(cf_e("slideTo", conf), [
                  s,
                  0,
                  !0,
                  { fx: "none" },
                ])
              )
                break;
            }
          }
        var siz = sz_setSizes($cfs, opts),
          itm = gi_getCurrentItems($cfs.children(), opts);
        return (
          opts.onCreate &&
            opts.onCreate.call($tt0, {
              width: siz.width,
              height: siz.height,
              items: itm,
            }),
          $cfs.trigger(cf_e("updatePageStatus", conf), [!0, siz]),
          $cfs.trigger(cf_e("linkAnchors", conf)),
          conf.debug && $cfs.trigger(cf_e("debug", conf)),
          $cfs
        );
      }),
    ($.fn.carouFredSel.serialNumber = 1),
    ($.fn.carouFredSel.defaults = {
      synchronise: !1,
      infinite: !0,
      circular: !0,
      responsive: !1,
      direction: "left",
      items: { start: 0 },
      scroll: {
        easing: "swing",
        duration: 500,
        pauseOnHover: !1,
        event: "click",
        queue: !1,
      },
    }),
    ($.fn.carouFredSel.configs = {
      debug: !1,
      transition: !1,
      onWindowResize: "throttle",
      events: { prefix: "", namespace: "cfs" },
      wrapper: { element: "div", classname: "caroufredsel_wrapper" },
      classnames: {},
    }),
    ($.fn.carouFredSel.pageAnchorBuilder = function (t) {
      return '<a href="#"><span>' + t + "</span></a>";
    }),
    ($.fn.carouFredSel.progressbarUpdater = function (t) {
      $(this).css("width", t + "%");
    }),
    ($.fn.carouFredSel.cookie = {
      get: function (t) {
        t += "=";
        for (
          var e = document.cookie.split(";"), s = 0, i = e.length;
          i > s;
          s++
        ) {
          for (var o = e[s]; " " == o.charAt(0); ) o = o.slice(1);
          if (0 == o.indexOf(t)) return o.slice(t.length);
        }
        return 0;
      },
      set: function (t, e, s) {
        var i = "";
        if (s) {
          var o = new Date();
          o.setTime(o.getTime() + 864e5 * s),
            (i = "; expires=" + o.toGMTString());
        }
        document.cookie = t + "=" + e + i + "; path=/";
      },
      remove: function (t) {
        $.fn.carouFredSel.cookie.set(t, "", -1);
      },
    }),
    $.extend($.easing, {
      quadratic: function (t) {
        var e = t * t;
        return t * (-e * t + 4 * e - 6 * t + 4);
      },
      cubic: function (t) {
        return t * (4 * t * t - 9 * t + 6);
      },
      elastic: function (t) {
        var e = t * t;
        return t * (33 * e * e - 106 * e * t + 126 * e - 67 * t + 15);
      },
    }));
})(jQuery);
