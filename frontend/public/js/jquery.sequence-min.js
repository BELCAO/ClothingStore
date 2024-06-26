!(function (e) {
  function n(n, r, s, c) {
    function d() {
      g.afterLoaded(),
        g.settings.hideFramesUntilPreloaded &&
          void 0 !== g.settings.preloader &&
          g.settings.preloader !== !1 &&
          g.frames.show(),
        void 0 !== g.settings.preloader && g.settings.preloader !== !1
          ? g.settings.hidePreloaderUsingCSS && g.transitionsSupported
            ? ((g.prependPreloadingCompleteTo =
                g.settings.prependPreloadingComplete === !0
                  ? g.settings.preloader
                  : e(g.settings.prependPreloadingComplete)),
              g.prependPreloadingCompleteTo.addClass("preloading-complete"),
              setTimeout(p, g.settings.hidePreloaderDelay))
            : g.settings.preloader.fadeOut(
                g.settings.hidePreloaderDelay,
                function () {
                  clearInterval(g.defaultPreloader), p();
                }
              )
          : p();
    }
    function l(n, t) {
      var a = [];
      if (t)
        for (var i = n; i > 0; i--)
          a.push(
            e("body").find(
              'img[src="' + g.settings.preloadTheseImages[i - 1] + '"]'
            )
          );
      else
        for (var r = n; r > 0; r--)
          g.frames
            .eq(g.settings.preloadTheseFrames[r - 1] - 1)
            .find("img")
            .each(function () {
              a.push(e(this)[0]);
            });
      return a;
    }
    function m(n, t) {
      function a() {
        var n = e(l),
          a = e(m);
        o && (m.length ? o.reject(c, n, a) : o.resolve(c)),
          e.isFunction(t) && t.call(s, c, n, a);
      }
      function i(n, t) {
        n.src !== r &&
          -1 === e.inArray(n, d) &&
          (d.push(n),
          t ? m.push(n) : l.push(n),
          e.data(n, "imagesLoaded", { isBroken: t, src: n.src }),
          u && o.notifyWith(e(n), [t, c, e(l), e(m)]),
          c.length === d.length && (setTimeout(a), c.unbind(".imagesLoaded")));
      }
      var r =
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
        s = n,
        o = e.isFunction(e.Deferred) ? e.Deferred() : 0,
        u = e.isFunction(o.notify),
        c = s.find("img").add(s.filter("img")),
        d = [],
        l = [],
        m = [];
      e.isPlainObject(t) &&
        e.each(t, function (e, n) {
          "callback" === e ? (t = n) : o && o[e](n);
        }),
        c.length
          ? c
              .bind("load.imagesLoaded error.imagesLoaded", function (e) {
                i(e.target, "error" === e.type);
              })
              .each(function (n, t) {
                var a = t.src,
                  s = e.data(t, "imagesLoaded");
                return s && s.src === a
                  ? (i(t, s.isBroken), void 0)
                  : t.complete && void 0 !== t.naturalWidth
                  ? (i(t, 0 === t.naturalWidth || 0 === t.naturalHeight),
                    void 0)
                  : ((t.readyState || t.complete) && ((t.src = r), (t.src = a)),
                    void 0);
              })
          : a();
    }
    function p() {
      function n(e, n) {
        var t, i;
        for (i in n)
          (t = "left" === i || "right" === i ? c[i] : i),
            e === parseFloat(t) && a(g, n[i]);
      }
      function t() {
        g.canvas.on("touchmove.sequence", r), (d = null), (m = !1);
      }
      function r(e) {
        if ((g.settings.swipePreventsDefault && e.preventDefault(), m)) {
          var n = e.originalEvent.touches[0].pageX,
            i = e.originalEvent.touches[0].pageY,
            r = d - n,
            s = l - i;
          Math.abs(r) >= g.settings.swipeThreshold
            ? (t(),
              r > 0
                ? a(g, g.settings.swipeEvents.left)
                : a(g, g.settings.swipeEvents.right))
            : Math.abs(s) >= g.settings.swipeThreshold &&
              (t(),
              s > 0
                ? a(g, g.settings.swipeEvents.down)
                : a(g, g.settings.swipeEvents.up));
        }
      }
      function s(e) {
        1 === e.originalEvent.touches.length &&
          ((d = e.originalEvent.touches[0].pageX),
          (l = e.originalEvent.touches[0].pageY),
          (m = !0),
          g.canvas.on("touchmove.sequence", r));
      }
      if (
        (e(g.settings.preloader).remove(),
        (g.nextButton = u(g, g.settings.nextButton, ".sequence-next")),
        (g.prevButton = u(g, g.settings.prevButton, ".sequence-prev")),
        (g.pauseButton = u(g, g.settings.pauseButton, ".sequence-pause")),
        (g.pagination = u(g, g.settings.pagination, ".sequence-pagination")),
        void 0 !== g.nextButton &&
          g.nextButton !== !1 &&
          g.settings.showNextButtonOnInit === !0 &&
          g.nextButton.show(),
        void 0 !== g.prevButton &&
          g.prevButton !== !1 &&
          g.settings.showPrevButtonOnInit === !0 &&
          g.prevButton.show(),
        void 0 !== g.pauseButton &&
          g.pauseButton !== !1 &&
          g.settings.showPauseButtonOnInit === !0 &&
          g.pauseButton.show(),
        g.settings.pauseIcon !== !1
          ? ((g.pauseIcon = u(g, g.settings.pauseIcon, ".sequence-pause-icon")),
            void 0 !== g.pauseIcon && g.pauseIcon.hide())
          : (g.pauseIcon = void 0),
        void 0 !== g.pagination &&
          g.pagination !== !1 &&
          ((g.paginationLinks = g.pagination.children()),
          g.paginationLinks.on("click.sequence", function () {
            var n = e(this).index() + 1;
            g.goTo(n);
          }),
          g.settings.showPaginationOnInit === !0 && g.pagination.show()),
        (g.nextFrameID = g.settings.startingFrameID),
        g.settings.hashTags === !0 &&
          (g.frames.each(function () {
            g.frameHashID.push(e(this).prop(g.getHashTagFrom));
          }),
          (g.currentHashTag = location.hash.replace("#", "")),
          void 0 === g.currentHashTag || "" === g.currentHashTag
            ? (g.nextFrameID = g.settings.startingFrameID)
            : ((g.frameHashIndex = e.inArray(g.currentHashTag, g.frameHashID)),
              (g.nextFrameID =
                -1 !== g.frameHashIndex
                  ? g.frameHashIndex + 1
                  : g.settings.startingFrameID))),
        (g.nextFrame = g.frames.eq(g.nextFrameID - 1)),
        (g.nextFrameChildren = g.nextFrame.children()),
        void 0 !== g.pagination &&
          e(g.paginationLinks[g.settings.startingFrameID - 1]).addClass(
            "current"
          ),
        g.transitionsSupported
          ? g.settings.animateStartingFrameIn
            ? g.settings.reverseAnimationsWhenNavigatingBackwards &&
              g.settings.autoPlayDirection - 1 &&
              g.settings.animateStartingFrameIn
              ? (i(g.prefix, g.nextFrameChildren, "0s"),
                g.nextFrame.addClass("animate-out"),
                g.goTo(g.nextFrameID, -1, !0))
              : g.goTo(g.nextFrameID, 1, !0)
            : ((g.currentFrameID = g.nextFrameID),
              g.settings.moveActiveFrameToTop &&
                g.nextFrame.css("z-index", g.numberOfFrames),
              i(g.prefix, g.nextFrameChildren, "0s"),
              g.nextFrame.addClass("animate-in"),
              g.settings.hashTags &&
                g.settings.hashChangesOnFirstFrame &&
                ((g.currentHashTag = g.nextFrame.prop(g.getHashTagFrom)),
                (document.location.hash = "#" + g.currentHashTag)),
              setTimeout(function () {
                i(g.prefix, g.nextFrameChildren, "");
              }, 100),
              o(g, !0, g.settings.autoPlayDelay))
          : (g.container.addClass("sequence-fallback"),
            (g.currentFrameID = g.nextFrameID),
            g.settings.hashTags &&
              g.settings.hashChangesOnFirstFrame &&
              ((g.currentHashTag = g.nextFrame.prop(g.getHashTagFrom)),
              (document.location.hash = "#" + g.currentHashTag)),
            g.frames.addClass("animate-in"),
            g.frames
              .not(":eq(" + (g.nextFrameID - 1) + ")")
              .css({ display: "none", opacity: 0 }),
            o(g, !0, g.settings.autoPlayDelay)),
        void 0 !== g.nextButton &&
          g.nextButton.bind("click.sequence", function () {
            g.next();
          }),
        void 0 !== g.prevButton &&
          g.prevButton.bind("click.sequence", function () {
            g.prev();
          }),
        void 0 !== g.pauseButton &&
          g.pauseButton.bind("click.sequence", function () {
            g.pause(!0);
          }),
        g.settings.keyNavigation)
      ) {
        var c = { left: 37, right: 39 };
        e(document).bind("keydown.sequence", function (e) {
          var t = String.fromCharCode(e.keyCode);
          t > 0 &&
            t <= g.numberOfFrames &&
            g.settings.numericKeysGoToFrames &&
            ((g.nextFrameID = t), g.goTo(g.nextFrameID)),
            n(e.keyCode, g.settings.keyEvents),
            n(e.keyCode, g.settings.customKeyEvents);
        });
      }
      if (
        (g.settings.pauseOnHover &&
          g.settings.autoPlay &&
          !g.hasTouch &&
          g.canvas.on({
            "mouseenter.sequence": function () {
              (g.isBeingHoveredOver = !0), g.isHardPaused || g.pause();
            },
            "mouseleave.sequence": function () {
              (g.isBeingHoveredOver = !1), g.isHardPaused || g.unpause();
            },
          }),
        g.settings.hashTags &&
          e(window).bind("hashchange.sequence", function () {
            var n = location.hash.replace("#", "");
            g.currentHashTag !== n &&
              ((g.currentHashTag = n),
              (g.frameHashIndex = e.inArray(g.currentHashTag, g.frameHashID)),
              -1 !== g.frameHashIndex &&
                ((g.nextFrameID = g.frameHashIndex + 1),
                g.goTo(g.nextFrameID)));
          }),
        g.settings.swipeNavigation && g.hasTouch)
      ) {
        var d,
          l,
          m = !1;
        g.canvas.on("touchstart.sequence", s);
      }
    }
    var g = this;
    (g.container = e(n)),
      (g.canvas = g.container.children(".sequence-canvas")),
      (g.frames = g.canvas.children("li"));
    try {
      if ((Modernizr.prefixed, void 0 === Modernizr.prefixed))
        throw "undefined";
    } catch (h) {
      c.modernizr();
    }
    var f = {
        WebkitTransition: "-webkit-",
        MozTransition: "-moz-",
        OTransition: "-o-",
        msTransition: "-ms-",
        transition: "",
      },
      v = {
        WebkitTransition:
          "webkitTransitionEnd.sequence webkitAnimationEnd.sequence",
        MozTransition: "transitionend.sequence animationend.sequence",
        OTransition: "otransitionend.sequence oanimationend.sequence",
        msTransition: "MSTransitionEnd.sequence MSAnimationEnd.sequence",
        transition: "transitionend.sequence animationend.sequence",
      };
    (g.prefix = f[Modernizr.prefixed("transition")]),
      (g.transitionProperties = {}),
      (g.transitionEnd = v[Modernizr.prefixed("transition")]),
      (g.numberOfFrames = g.frames.length),
      (g.transitionsSupported = void 0 !== g.prefix ? !0 : !1),
      (g.hasTouch = "ontouchstart" in window ? !0 : !1),
      (g.isPaused = !1),
      (g.isBeingHoveredOver = !1),
      g.container.removeClass("sequence-destroyed"),
      (g.paused = function () {}),
      (g.unpaused = function () {}),
      (g.beforeNextFrameAnimatesIn = function () {}),
      (g.afterNextFrameAnimatesIn = function () {}),
      (g.beforeCurrentFrameAnimatesOut = function () {}),
      (g.afterCurrentFrameAnimatesOut = function () {}),
      (g.afterLoaded = function () {}),
      (g.destroyed = function () {}),
      (g.settings = e.extend({}, s, r)),
      (g.settings.preloader = u(
        g,
        g.settings.preloader,
        ".sequence-preloader"
      )),
      (g.isStartingFrame = g.settings.animateStartingFrameIn ? !0 : !1),
      (g.settings.unpauseDelay =
        null === g.settings.unpauseDelay
          ? g.settings.autoPlayDelay
          : g.settings.unpauseDelay),
      (g.getHashTagFrom = g.settings.hashDataAttribute
        ? "data-sequence-hashtag"
        : "id"),
      (g.frameHashID = []),
      (g.direction = g.settings.autoPlayDirection),
      g.settings.hideFramesUntilPreloaded &&
        void 0 !== g.settings.preloader &&
        g.settings.preloader !== !1 &&
        g.frames.hide(),
      "-o-" === g.prefix && (g.transitionsSupported = c.operaTest()),
      g.frames.removeClass("animate-in");
    var F = g.settings.preloadTheseFrames.length,
      x = g.settings.preloadTheseImages.length;
    if (
      void 0 === g.settings.preloader ||
      g.settings.preloader === !1 ||
      (0 === F && 0 === x)
    )
      t === !0
        ? (d(), e(this).unbind("load.sequence"))
        : e(window).bind("load.sequence", function () {
            d(), e(this).unbind("load.sequence");
          });
    else {
      var y = l(F),
        T = l(x, !0),
        I = e(y.concat(T));
      m(I, d);
    }
  }
  var t = !1;
  e(window).bind("load", function () {
    t = !0;
  }),
    (n.prototype = {
      startAutoPlay: function (e) {
        var n = this;
        (e = void 0 === e ? n.settings.autoPlayDelay : e),
          n.unpause(),
          o(n),
          (n.autoPlayTimer = setTimeout(function () {
            1 === n.settings.autoPlayDirection ? n.next() : n.prev();
          }, e));
      },
      stopAutoPlay: function () {
        var e = this;
        e.pause(!0), clearTimeout(e.autoPlayTimer);
      },
      pause: function (e) {
        var n = this;
        n.isSoftPaused
          ? n.unpause()
          : (void 0 !== n.pauseButton &&
              (n.pauseButton.addClass("paused"),
              void 0 !== n.pauseIcon && n.pauseIcon.show()),
            n.paused(),
            (n.isSoftPaused = !0),
            (n.isHardPaused = e ? !0 : !1),
            (n.isPaused = !0),
            o(n));
      },
      unpause: function (e) {
        var n = this;
        void 0 !== n.pauseButton &&
          (n.pauseButton.removeClass("paused"),
          void 0 !== n.pauseIcon && n.pauseIcon.hide()),
          (n.isSoftPaused = !1),
          (n.isHardPaused = !1),
          (n.isPaused = !1),
          n.active
            ? (n.delayUnpause = !0)
            : (e !== !1 && n.unpaused(), o(n, !0, n.settings.unpauseDelay));
      },
      next: function () {
        var e = this;
        (e.nextFrameID =
          e.currentFrameID !== e.numberOfFrames ? e.currentFrameID + 1 : 1),
          e.active === !1 || void 0 === e.active
            ? e.goTo(e.nextFrameID, 1)
            : e.goTo(e.nextFrameID, 1, !0);
      },
      prev: function () {
        var e = this;
        (e.nextFrameID =
          1 === e.currentFrameID ? e.numberOfFrames : e.currentFrameID - 1),
          e.active === !1 || void 0 === e.active
            ? e.goTo(e.nextFrameID, -1)
            : e.goTo(e.nextFrameID, -1, !0);
      },
      goTo: function (n, t, a) {
        function s() {
          d(u), (u.active = !1), o(u, !0, u.settings.autoPlayDelay);
        }
        var u = this;
        n = parseFloat(n);
        var l = a === !0 ? 0 : u.settings.transitionThreshold;
        if (
          n === u.currentFrameID ||
          (u.settings.navigationSkip && u.navigationSkipThresholdActive) ||
          (!u.settings.navigationSkip && u.active) ||
          (!u.transitionsSupported && u.active) ||
          (!u.settings.cycle &&
            1 === t &&
            u.currentFrameID === u.numberOfFrames) ||
          (!u.settings.cycle && -1 === t && 1 === u.currentFrameID) ||
          (u.settings.preventReverseSkipping && u.direction !== t && u.active)
        )
          return !1;
        if (
          (u.settings.navigationSkip &&
            u.active &&
            ((u.navigationSkipThresholdActive = !0),
            u.settings.fadeFrameWhenSkipped &&
              u.nextFrame
                .stop()
                .animate({ opacity: 0 }, u.settings.fadeFrameTime),
            clearTimeout(u.transitionThresholdTimer),
            setTimeout(function () {
              u.navigationSkipThresholdActive = !1;
            }, u.settings.navigationSkipThreshold)),
          !u.active || u.settings.navigationSkip)
        ) {
          if (
            ((u.active = !0),
            o(u),
            (u.direction = void 0 === t ? (n > u.currentFrameID ? 1 : -1) : t),
            (u.currentFrame = u.canvas.children(".animate-in")),
            (u.nextFrame = u.frames.eq(n - 1)),
            (u.currentFrameChildren = u.currentFrame.children()),
            (u.nextFrameChildren = u.nextFrame.children()),
            void 0 !== u.pagination &&
              (u.paginationLinks.removeClass("current"),
              e(u.paginationLinks[n - 1]).addClass("current")),
            u.transitionsSupported)
          )
            void 0 !== u.currentFrame.length
              ? (u.beforeCurrentFrameAnimatesOut(),
                u.settings.moveActiveFrameToTop &&
                  u.currentFrame.css("z-index", 1),
                i(u.prefix, u.nextFrameChildren, "0s"),
                u.settings.reverseAnimationsWhenNavigatingBackwards &&
                1 !== u.direction
                  ? u.settings.reverseAnimationsWhenNavigatingBackwards &&
                    -1 === u.direction &&
                    (u.nextFrame.addClass("animate-out"), r(u))
                  : (u.nextFrame.removeClass("animate-out"),
                    i(u.prefix, u.currentFrameChildren, "")))
              : (u.isStartingFrame = !1),
              (u.active = !0),
              u.currentFrame.unbind(u.transitionEnd),
              u.nextFrame.unbind(u.transitionEnd),
              u.settings.fadeFrameWhenSkipped &&
                u.settings.navigationSkip &&
                u.nextFrame.css("opacity", 1),
              u.beforeNextFrameAnimatesIn(),
              u.settings.moveActiveFrameToTop &&
                u.nextFrame.css("z-index", u.numberOfFrames),
              u.settings.reverseAnimationsWhenNavigatingBackwards &&
              1 !== u.direction
                ? u.settings.reverseAnimationsWhenNavigatingBackwards &&
                  -1 === u.direction &&
                  (setTimeout(function () {
                    i(u.prefix, u.currentFrameChildren, ""),
                      i(u.prefix, u.nextFrameChildren, ""),
                      r(u),
                      c(u, u.nextFrame, u.nextFrameChildren, "in"),
                      ("function () {}" !== u.afterCurrentFrameAnimatesOut ||
                        (u.settings.transitionThreshold === !0 && a !== !0)) &&
                        c(
                          u,
                          u.currentFrame,
                          u.currentFrameChildren,
                          "out",
                          !0,
                          -1
                        );
                  }, 50),
                  setTimeout(function () {
                    u.settings.transitionThreshold === !1 ||
                    0 === u.settings.transitionThreshold ||
                    a === !0
                      ? (u.currentFrame.removeClass("animate-in"),
                        u.nextFrame.toggleClass("animate-out animate-in"))
                      : (u.currentFrame.removeClass("animate-in"),
                        u.settings.transitionThreshold !== !0 &&
                          (u.transitionThresholdTimer = setTimeout(function () {
                            u.nextFrame.toggleClass("animate-out animate-in");
                          }, l)));
                  }, 50))
                : (setTimeout(function () {
                    i(u.prefix, u.nextFrameChildren, ""),
                      c(u, u.nextFrame, u.nextFrameChildren, "in"),
                      ("function () {}" !== u.afterCurrentFrameAnimatesOut ||
                        (u.settings.transitionThreshold === !0 && a !== !0)) &&
                        c(
                          u,
                          u.currentFrame,
                          u.currentFrameChildren,
                          "out",
                          !0,
                          1
                        );
                  }, 50),
                  setTimeout(function () {
                    u.settings.transitionThreshold === !1 ||
                    0 === u.settings.transitionThreshold ||
                    a === !0
                      ? (u.currentFrame.toggleClass("animate-out animate-in"),
                        u.nextFrame.addClass("animate-in"))
                      : (u.currentFrame.toggleClass("animate-out animate-in"),
                        u.settings.transitionThreshold !== !0 &&
                          (u.transitionThresholdTimer = setTimeout(function () {
                            u.nextFrame.addClass("animate-in");
                          }, l)));
                  }, 50));
          else
            switch (u.settings.fallback.theme) {
              case "fade":
                u.frames.css({ position: "relative" }),
                  u.beforeCurrentFrameAnimatesOut(),
                  (u.currentFrame = u.frames.eq(u.currentFrameID - 1)),
                  u.currentFrame.animate(
                    { opacity: 0 },
                    u.settings.fallback.speed,
                    function () {
                      u.currentFrame.css({ display: "none", "z-index": "1" }),
                        u.afterCurrentFrameAnimatesOut(),
                        u.beforeNextFrameAnimatesIn(),
                        u.nextFrame
                          .css({
                            display: "block",
                            "z-index": u.numberOfFrames,
                          })
                          .animate({ opacity: 1 }, 500, function () {
                            u.afterNextFrameAnimatesIn();
                          }),
                        s();
                    }
                  ),
                  u.frames.css({ position: "relative" });
                break;
              case "slide":
              default:
                var m = {},
                  p = {},
                  g = {};
                1 === u.direction
                  ? ((m.left = "-100%"), (p.left = "100%"))
                  : ((m.left = "100%"), (p.left = "-100%")),
                  (g.left = "0"),
                  (g.opacity = 1),
                  (u.currentFrame = u.frames.eq(u.currentFrameID - 1)),
                  u.beforeCurrentFrameAnimatesOut(),
                  u.currentFrame.animate(
                    m,
                    u.settings.fallback.speed,
                    function () {
                      u.currentFrame.css({ display: "none", "z-index": "1" }),
                        u.afterCurrentFrameAnimatesOut();
                    }
                  ),
                  u.beforeNextFrameAnimatesIn(),
                  u.nextFrame.show().css(p),
                  u.nextFrame
                    .css({ display: "block", "z-index": u.numberOfFrames })
                    .animate(g, u.settings.fallback.speed, function () {
                      s(), u.afterNextFrameAnimatesIn();
                    });
            }
          u.currentFrameID = n;
        }
      },
      destroy: function (n) {
        var t = this;
        t.container.addClass("sequence-destroyed"),
          void 0 !== t.nextButton && t.nextButton.unbind("click.sequence"),
          void 0 !== t.prevButton && t.prevButton.unbind("click.sequence"),
          void 0 !== t.pauseButton && t.pauseButton.unbind("click.sequence"),
          void 0 !== t.pagination && t.paginationLinks.unbind("click.sequence"),
          e(document).unbind("keydown.sequence"),
          t.canvas.unbind(
            "mouseenter.sequence, mouseleave.sequence, touchstart.sequence, touchmove.sequence"
          ),
          e(window).unbind("hashchange.sequence"),
          t.stopAutoPlay(),
          clearTimeout(t.transitionThresholdTimer),
          t.canvas.children("li").remove(),
          t.canvas.prepend(t.frames),
          t.frames.removeClass("animate-in animate-out").removeAttr("style"),
          t.frames.eq(t.currentFrameID - 1).addClass("animate-in"),
          void 0 !== t.nextButton && t.nextButton !== !1 && t.nextButton.hide(),
          void 0 !== t.prevButton && t.prevButton !== !1 && t.prevButton.hide(),
          void 0 !== t.pauseButton &&
            t.pauseButton !== !1 &&
            t.pauseButton.hide(),
          void 0 !== t.pauseIcon && t.pauseIcon !== !1 && t.pauseIcon.hide(),
          void 0 !== t.pagination && t.pagination !== !1 && t.pagination.hide(),
          void 0 !== n && n(),
          t.destroyed(),
          t.container.removeData();
      },
    });
  var a = function (e, n) {
      switch (n) {
        case "next":
          e.next();
          break;
        case "prev":
          e.prev();
          break;
        case "pause":
          e.pause(!0);
      }
    },
    i = function (e, n, t) {
      n.css(
        s(e, {
          "transition-duration": t,
          "transition-delay": t,
          "transition-timing-function": "",
        })
      );
    },
    r = function (n) {
      var t = [],
        a = [];
      n.currentFrameChildren.each(function () {
        t.push(
          parseFloat(
            e(this)
              .css(n.prefix + "transition-duration")
              .replace("s", "")
          ) +
            parseFloat(
              e(this)
                .css(n.prefix + "transition-delay")
                .replace("s", "")
            )
        );
      }),
        n.nextFrameChildren.each(function () {
          a.push(
            parseFloat(
              e(this)
                .css(n.prefix + "transition-duration")
                .replace("s", "")
            ) +
              parseFloat(
                e(this)
                  .css(n.prefix + "transition-delay")
                  .replace("s", "")
              )
          );
        });
      var i = Math.max.apply(Math, t),
        r = Math.max.apply(Math, a),
        o = i - r,
        u = 0,
        c = 0;
      0 > o && !n.settings.preventDelayWhenReversingAnimations
        ? (u = Math.abs(o))
        : o > 0 && (c = Math.abs(o));
      var d = function (t, a, i, r) {
        a.each(function () {
          var a = parseFloat(
              e(this)
                .css(n.prefix + "transition-duration")
                .replace("s", "")
            ),
            o = parseFloat(
              e(this)
                .css(n.prefix + "transition-delay")
                .replace("s", "")
            ),
            u = e(this).css(n.prefix + "transition-timing-function");
          if (u.indexOf("cubic-bezier") >= 0) {
            var c = u.replace("cubic-bezier(", "").replace(")", "").split(",");
            e.each(c, function (e, n) {
              c[e] = parseFloat(n);
            });
            var d = [1 - c[2], 1 - c[3], 1 - c[0], 1 - c[1]];
            u = "cubic-bezier(" + d + ")";
          } else u = "linear";
          var l = a + o;
          (t["transition-duration"] = a + "s"),
            (t["transition-delay"] = i - l + r + "s"),
            (t["transition-timing-function"] = u),
            e(this).css(s(n.prefix, t));
        });
      };
      d(n.transitionProperties, n.currentFrameChildren, i, u),
        d(n.transitionProperties, n.nextFrameChildren, r, c);
    },
    s = function (e, n) {
      var t = {};
      for (var a in n) t[e + a] = n[a];
      return t;
    },
    o = function (e, n, t) {
      n === !0
        ? e.settings.autoPlay &&
          !e.isSoftPaused &&
          (clearTimeout(e.autoPlayTimer),
          (e.autoPlayTimer = setTimeout(function () {
            1 === e.settings.autoPlayDirection ? e.next() : e.prev();
          }, t)))
        : clearTimeout(e.autoPlayTimer);
    },
    u = function (n, t, a) {
      switch (t) {
        case !1:
          return void 0;
        case !0:
          return (
            ".sequence-preloader" === a &&
              l.defaultPreloader(n.container, n.transitionsSupported, n.prefix),
            e(a)
          );
        default:
          return e(t);
      }
    },
    c = function (n, t, a, i, r, s) {
      if ("out" === i)
        var o = function () {
          n.afterCurrentFrameAnimatesOut(),
            n.settings.transitionThreshold === !0 &&
              (1 === s
                ? n.nextFrame.addClass("animate-in")
                : -1 === s &&
                  n.nextFrame.toggleClass("animate-out animate-in"));
        };
      else if ("in" === i)
        var o = function () {
          n.afterNextFrameAnimatesIn(),
            d(n),
            (n.active = !1),
            n.isHardPaused ||
              n.isBeingHoveredOver ||
              (n.delayUnpause
                ? ((n.delayUnpause = !1), n.unpause())
                : n.unpause(!1));
        };
      a.data("animationEnded", !1),
        t.bind(n.transitionEnd, function (i) {
          e(i.target).data("animationEnded", !0);
          var r = !0;
          a.each(function () {
            return e(this).data("animationEnded") === !1
              ? ((r = !1), !1)
              : void 0;
          }),
            r && (t.unbind(n.transitionEnd), o());
        });
    },
    d = function (n) {
      n.settings.hashTags &&
        ((n.currentHashTag = n.nextFrame.prop(n.getHashTagFrom)),
        (n.frameHashIndex = e.inArray(n.currentHashTag, n.frameHashID)),
        -1 === n.frameHashIndex ||
        (!n.settings.hashChangesOnFirstFrame &&
          n.isStartingFrame &&
          n.transitionsSupported)
          ? ((n.nextFrameID = n.settings.startingFrameID),
            (n.isStartingFrame = !1))
          : ((n.nextFrameID = n.frameHashIndex + 1),
            (document.location.hash = "#" + n.currentHashTag)));
    },
    l = {
      modernizr: function () {
        window.Modernizr = (function (e, n, t) {
          function a(e) {
            v.cssText = e;
          }
          function i(e, n) {
            return typeof e === n;
          }
          function r(e, n) {
            return !!~("" + e).indexOf(n);
          }
          function s(e, n) {
            for (var a in e) {
              var i = e[a];
              if (!r(i, "-") && v[i] !== t) return "pfx" == n ? i : !0;
            }
            return !1;
          }
          function o(e, n, a) {
            for (var r in e) {
              var s = n[e[r]];
              if (s !== t)
                return a === !1 ? e[r] : i(s, "function") ? s.bind(a || n) : s;
            }
            return !1;
          }
          function u(e, n, t) {
            var a = e.charAt(0).toUpperCase() + e.slice(1),
              r = (e + " " + x.join(a + " ") + a).split(" ");
            return i(n, "string") || i(n, "undefined")
              ? s(r, n)
              : ((r = (e + " " + y.join(a + " ") + a).split(" ")), o(r, n, t));
          }
          var c,
            d,
            l,
            m = "2.6.1",
            p = {},
            g = n.documentElement,
            h = "modernizr",
            f = n.createElement(h),
            v = f.style,
            F = ({}.toString, "Webkit Moz O ms"),
            x = F.split(" "),
            y = F.toLowerCase().split(" "),
            T = { svg: "http://www.w3.org/2000/svg" },
            I = {},
            b = [],
            w = b.slice,
            C = {}.hasOwnProperty;
          (l =
            i(C, "undefined") || i(C.call, "undefined")
              ? function (e, n) {
                  return n in e && i(e.constructor.prototype[n], "undefined");
                }
              : function (e, n) {
                  return C.call(e, n);
                }),
            Function.prototype.bind ||
              (Function.prototype.bind = function (e) {
                var n = self;
                if ("function" != typeof n) throw new TypeError();
                var t = w.call(arguments, 1),
                  a = function () {
                    if (self instanceof a) {
                      var i = function () {};
                      i.prototype = n.prototype;
                      var r = new i(),
                        s = n.apply(r, t.concat(w.call(arguments)));
                      return Object(s) === s ? s : r;
                    }
                    return n.apply(e, t.concat(w.call(arguments)));
                  };
                return a;
              }),
            (I.svg = function () {
              return (
                !!n.createElementNS &&
                !!n.createElementNS(T.svg, "svg").createSVGRect
              );
            });
          for (var D in I)
            l(I, D) &&
              ((d = D.toLowerCase()),
              (p[d] = I[D]()),
              b.push((p[d] ? "" : "no-") + d));
          return (
            (p.addTest = function (e, n) {
              if ("object" == typeof e)
                for (var a in e) l(e, a) && p.addTest(a, e[a]);
              else {
                if (((e = e.toLowerCase()), p[e] !== t)) return p;
                (n = "function" == typeof n ? n() : n),
                  enableClasses && (g.className += " " + (n ? "" : "no-") + e),
                  (p[e] = n);
              }
              return p;
            }),
            a(""),
            (f = c = null),
            (p._version = m),
            (p._domPrefixes = y),
            (p._cssomPrefixes = x),
            (p.testProp = function (e) {
              return s([e]);
            }),
            (p.testAllProps = u),
            (p.prefixed = function (e, n, t) {
              return n ? u(e, n, t) : u(e, "pfx");
            }),
            p
          );
        })(self, self.document);
      },
      defaultPreloader: function (n, t, a) {
        var i =
          '<div class="sequence-preloader"><svg class="preloading" xmlns="http://www.w3.org/2000/svg"><circle class="circle" cx="6" cy="6" r="6" /><circle class="circle" cx="22" cy="6" r="6" /><circle class="circle" cx="38" cy="6" r="6" /></svg></div>';
        e("head").append(
          "<style>.sequence-preloader{height: 100%;position: absolute;width: 100%;z-index: 999999;}@" +
            a +
            "keyframes preload{0%{opacity: 1;}50%{opacity: 0;}100%{opacity: 1;}}.sequence-preloader .preloading .circle{fill: #fff;display: inline-block;height: 12px;position: relative;top: -50%;width: 12px;" +
            a +
            "animation: preload 1s infinite; animation: preload 1s infinite;}.preloading{display:block;height: 12px;margin: 0 auto;top: 50%;margin-top:-6px;position: relative;width: 48px;}.sequence-preloader .preloading .circle:nth-child(2){" +
            a +
            "animation-delay: .15s; animation-delay: .15s;}.sequence-preloader .preloading .circle:nth-child(3){" +
            a +
            "animation-delay: .3s; animation-delay: .3s;}.preloading-complete{opacity: 0;visibility: hidden;" +
            a +
            "transition-duration: 1s; transition-duration: 1s;}div.inline{background-color: #fff; margin-right: 4px; float: left;}</style>"
        ),
          n.prepend(i),
          Modernizr.svg || t
            ? t ||
              setInterval(function () {
                e(".sequence-preloader").fadeToggle(500);
              }, 500)
            : (e(".sequence-preloader").prepend(
                '<div class="preloading"><div class="circle inline"></div><div class="circle inline"></div><div class="circle inline"></div></div>'
              ),
              setInterval(function () {
                e(".sequence-preloader .circle").fadeToggle(500);
              }, 500));
      },
      operaTest: function () {
        e("body").append('<span id="sequence-opera-test"></span>');
        var n = e("#sequence-opera-test");
        return (
          n.css("-o-transition", "1s"),
          "1s" !== n.css("-o-transition") ? !1 : !0
        );
      },
    },
    m = {
      startingFrameID: 1,
      cycle: !0,
      animateStartingFrameIn: !1,
      transitionThreshold: !1,
      reverseAnimationsWhenNavigatingBackwards: !0,
      preventDelayWhenReversingAnimations: !1,
      moveActiveFrameToTop: !0,
      autoPlay: !1,
      autoPlayDirection: 1,
      autoPlayDelay: 5e3,
      navigationSkip: !0,
      navigationSkipThreshold: 250,
      fadeFrameWhenSkipped: !0,
      fadeFrameTime: 150,
      preventReverseSkipping: !1,
      nextButton: !1,
      showNextButtonOnInit: !0,
      prevButton: !1,
      showPrevButtonOnInit: !0,
      pauseButton: !1,
      unpauseDelay: null,
      pauseOnHover: !0,
      pauseIcon: !1,
      showPauseButtonOnInit: !0,
      pagination: !1,
      showPaginationOnInit: !0,
      preloader: !1,
      preloadTheseFrames: [1],
      preloadTheseImages: [],
      hideFramesUntilPreloaded: !0,
      prependPreloadingComplete: !0,
      hidePreloaderUsingCSS: !0,
      hidePreloaderDelay: 0,
      keyNavigation: !0,
      numericKeysGoToFrames: !0,
      keyEvents: { left: "prev", right: "next" },
      customKeyEvents: {},
      swipeNavigation: !0,
      swipeThreshold: 20,
      swipePreventsDefault: !1,
      swipeEvents: { left: "prev", right: "next", up: !1, down: !1 },
      hashTags: !1,
      hashDataAttribute: !1,
      hashChangesOnFirstFrame: !1,
      fallback: { theme: "slide", speed: 500 },
    };
  e.fn.sequence = function (t) {
    return this.each(function () {
      e.data(this, "sequence") ||
        e.data(this, "sequence", new n(e(this), t, m, l));
    });
  };
})(jQuery);
