!function(t) {
    var e = {};
    function i(n) {
        if (e[n])
            return e[n].exports;
        var s = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(s.exports, s, s.exports, i),
        s.l = !0,
        s.exports
    }
    i.m = t,
    i.c = e,
    i.d = function(t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }
    ,
    i.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    i.t = function(t, e) {
        if (1 & e && (t = i(t)),
        8 & e)
            return t;
        if (4 & e && "object" == typeof t && t && t.__esModule)
            return t;
        var n = Object.create(null);
        if (i.r(n),
        Object.defineProperty(n, "default", {
            enumerable: !0,
            value: t
        }),
        2 & e && "string" != typeof t)
            for (var s in t)
                i.d(n, s, function(e) {
                    return t[e]
                }
                .bind(null, s));
        return n
    }
    ,
    i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return i.d(e, "a", e),
        e
    }
    ,
    i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    ,
    i.p = "",
    i(i.s = 5)
}([function(t, e) {
    function i(t) {
        Object.freeze(t);
        var e = "function" == typeof t;
        return Object.getOwnPropertyNames(t).forEach((function(n) {
            !t.hasOwnProperty(n) || null === t[n] || "object" != typeof t[n] && "function" != typeof t[n] || e && ("caller" === n || "callee" === n || "arguments" === n) || Object.isFrozen(t[n]) || i(t[n])
        }
        )),
        t
    }
    function n(t) {
        return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    function s(t) {
        var e, i = {}, n = Array.prototype.slice.call(arguments, 1);
        for (e in t)
            i[e] = t[e];
        return n.forEach((function(t) {
            for (e in t)
                i[e] = t[e]
        }
        )),
        i
    }
    function a(t) {
        return t.nodeName.toLowerCase()
    }
    var r = Object.freeze({
        __proto__: null,
        escapeHTML: n,
        inherit: s,
        nodeStream: function(t) {
            var e = [];
            return function t(i, n) {
                for (var s = i.firstChild; s; s = s.nextSibling)
                    3 === s.nodeType ? n += s.nodeValue.length : 1 === s.nodeType && (e.push({
                        event: "start",
                        offset: n,
                        node: s
                    }),
                    n = t(s, n),
                    a(s).match(/br|hr|img|input/) || e.push({
                        event: "stop",
                        offset: n,
                        node: s
                    }));
                return n
            }(t, 0),
            e
        },
        mergeStreams: function(t, e, i) {
            var s = 0
              , r = ""
              , o = [];
            function h() {
                return t.length && e.length ? t[0].offset !== e[0].offset ? t[0].offset < e[0].offset ? t : e : "start" === e[0].event ? t : e : t.length ? t : e
            }
            function l(t) {
                r += "<" + a(t) + [].map.call(t.attributes, (function(t) {
                    return " " + t.nodeName + '="' + n(t.value).replace(/"/g, "&quot;") + '"'
                }
                )).join("") + ">"
            }
            function c(t) {
                r += "</" + a(t) + ">"
            }
            function d(t) {
                ("start" === t.event ? l : c)(t.node)
            }
            for (; t.length || e.length; ) {
                var g = h();
                if (r += n(i.substring(s, g[0].offset)),
                s = g[0].offset,
                g === t) {
                    o.reverse().forEach(c);
                    do {
                        d(g.splice(0, 1)[0]),
                        g = h()
                    } while (g === t && g.length && g[0].offset === s);
                    o.reverse().forEach(l)
                } else
                    "start" === g[0].event ? o.push(g[0].node) : o.pop(),
                    d(g.splice(0, 1)[0])
            }
            return r + n(i.substr(s))
        }
    });
    const o = t=>!!t.kind;
    class h {
        constructor(t, e) {
            this.buffer = "",
            this.classPrefix = e.classPrefix,
            t.walk(this)
        }
        addText(t) {
            this.buffer += n(t)
        }
        openNode(t) {
            if (!o(t))
                return;
            let e = t.kind;
            t.sublanguage || (e = `${this.classPrefix}${e}`),
            this.span(e)
        }
        closeNode(t) {
            o(t) && (this.buffer += "</span>")
        }
        span(t) {
            this.buffer += `<span class="${t}">`
        }
        value() {
            return this.buffer
        }
    }
    class l {
        constructor() {
            this.rootNode = {
                children: []
            },
            this.stack = [this.rootNode]
        }
        get top() {
            return this.stack[this.stack.length - 1]
        }
        get root() {
            return this.rootNode
        }
        add(t) {
            this.top.children.push(t)
        }
        openNode(t) {
            let e = {
                kind: t,
                children: []
            };
            this.add(e),
            this.stack.push(e)
        }
        closeNode() {
            if (this.stack.length > 1)
                return this.stack.pop()
        }
        closeAllNodes() {
            for (; this.closeNode(); )
                ;
        }
        toJSON() {
            return JSON.stringify(this.rootNode, null, 4)
        }
        walk(t) {
            return this.constructor._walk(t, this.rootNode)
        }
        static _walk(t, e) {
            return "string" == typeof e ? t.addText(e) : e.children && (t.openNode(e),
            e.children.forEach(e=>this._walk(t, e)),
            t.closeNode(e)),
            t
        }
        static _collapse(t) {
            t.children && (t.children.every(t=>"string" == typeof t) ? (t.text = t.children.join(""),
            delete t.children) : t.children.forEach(t=>{
                "string" != typeof t && l._collapse(t)
            }
            ))
        }
    }
    class c extends l {
        constructor(t) {
            super(),
            this.options = t
        }
        addKeyword(t, e) {
            "" !== t && (this.openNode(e),
            this.addText(t),
            this.closeNode())
        }
        addText(t) {
            "" !== t && this.add(t)
        }
        addSublanguage(t, e) {
            let i = t.root;
            i.kind = e,
            i.sublanguage = !0,
            this.add(i)
        }
        toHTML() {
            return new h(this,this.options).value()
        }
        finalize() {}
    }
    function d(t) {
        return t && t.source || t
    }
    const g = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)"
      , p = {
        begin: "\\\\[\\s\\S]",
        relevance: 0
    }
      , u = {
        className: "string",
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [p]
    }
      , m = {
        className: "string",
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [p]
    }
      , f = {
        begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
    }
      , b = function(t, e, i) {
        var n = s({
            className: "comment",
            begin: t,
            end: e,
            contains: []
        }, i || {});
        return n.contains.push(f),
        n.contains.push({
            className: "doctag",
            begin: "(?:TODO|FIXME|NOTE|BUG|XXX):",
            relevance: 0
        }),
        n
    }
      , w = b("//", "$")
      , y = b("/\\*", "\\*/")
      , x = b("#", "$")
      , v = {
        className: "number",
        begin: "\\b\\d+(\\.\\d+)?",
        relevance: 0
    }
      , S = {
        className: "number",
        begin: g,
        relevance: 0
    }
      , P = {
        className: "number",
        begin: "\\b(0b[01]+)",
        relevance: 0
    }
      , E = {
        className: "number",
        begin: "\\b\\d+(\\.\\d+)?(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        relevance: 0
    }
      , _ = {
        begin: /(?=\/[^\/\n]*\/)/,
        contains: [{
            className: "regexp",
            begin: /\//,
            end: /\/[gimuy]*/,
            illegal: /\n/,
            contains: [p, {
                begin: /\[/,
                end: /\]/,
                relevance: 0,
                contains: [p]
            }]
        }]
    }
      , I = {
        className: "title",
        begin: "[a-zA-Z]\\w*",
        relevance: 0
    }
      , R = {
        className: "title",
        begin: "[a-zA-Z_]\\w*",
        relevance: 0
    }
      , M = {
        begin: "\\.\\s*[a-zA-Z_]\\w*",
        relevance: 0
    };
    var T = Object.freeze({
        __proto__: null,
        IDENT_RE: "[a-zA-Z]\\w*",
        UNDERSCORE_IDENT_RE: "[a-zA-Z_]\\w*",
        NUMBER_RE: "\\b\\d+(\\.\\d+)?",
        C_NUMBER_RE: g,
        BINARY_NUMBER_RE: "\\b(0b[01]+)",
        RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
        BACKSLASH_ESCAPE: p,
        APOS_STRING_MODE: u,
        QUOTE_STRING_MODE: m,
        PHRASAL_WORDS_MODE: f,
        COMMENT: b,
        C_LINE_COMMENT_MODE: w,
        C_BLOCK_COMMENT_MODE: y,
        HASH_COMMENT_MODE: x,
        NUMBER_MODE: v,
        C_NUMBER_MODE: S,
        BINARY_NUMBER_MODE: P,
        CSS_NUMBER_MODE: E,
        REGEXP_MODE: _,
        TITLE_MODE: I,
        UNDERSCORE_TITLE_MODE: R,
        METHOD_GUARD: M
    })
      , k = "of and for in not or if then".split(" ");
    function L(t) {
        function e(e, i) {
            return new RegExp(d(e),"m" + (t.case_insensitive ? "i" : "") + (i ? "g" : ""))
        }
        class i {
            constructor() {
                this.matchIndexes = {},
                this.regexes = [],
                this.matchAt = 1,
                this.position = 0
            }
            addRule(t, e) {
                e.position = this.position++,
                this.matchIndexes[this.matchAt] = e,
                this.regexes.push([e, t]),
                this.matchAt += function(t) {
                    return new RegExp(t.toString() + "|").exec("").length - 1
                }(t) + 1
            }
            compile() {
                0 === this.regexes.length && (this.exec = ()=>null);
                let t = this.regexes.map(t=>t[1]);
                this.matcherRe = e(function(t, e) {
                    for (var i = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./, n = 0, s = "", a = 0; a < t.length; a++) {
                        var r = n += 1
                          , o = d(t[a]);
                        for (a > 0 && (s += e),
                        s += "("; o.length > 0; ) {
                            var h = i.exec(o);
                            if (null == h) {
                                s += o;
                                break
                            }
                            s += o.substring(0, h.index),
                            o = o.substring(h.index + h[0].length),
                            "\\" == h[0][0] && h[1] ? s += "\\" + String(Number(h[1]) + r) : (s += h[0],
                            "(" == h[0] && n++)
                        }
                        s += ")"
                    }
                    return s
                }(t, "|"), !0),
                this.lastIndex = 0
            }
            exec(t) {
                this.matcherRe.lastIndex = this.lastIndex;
                let e = this.matcherRe.exec(t);
                if (!e)
                    return null;
                let i = e.findIndex((t,e)=>e > 0 && null != t)
                  , n = this.matchIndexes[i];
                return Object.assign(e, n)
            }
        }
        class n {
            constructor() {
                this.rules = [],
                this.multiRegexes = [],
                this.count = 0,
                this.lastIndex = 0,
                this.regexIndex = 0
            }
            getMatcher(t) {
                if (this.multiRegexes[t])
                    return this.multiRegexes[t];
                let e = new i;
                return this.rules.slice(t).forEach(([t,i])=>e.addRule(t, i)),
                e.compile(),
                this.multiRegexes[t] = e,
                e
            }
            considerAll() {
                this.regexIndex = 0
            }
            addRule(t, e) {
                this.rules.push([t, e]),
                "begin" === e.type && this.count++
            }
            exec(t) {
                let e = this.getMatcher(this.regexIndex);
                e.lastIndex = this.lastIndex;
                let i = e.exec(t);
                return i && (this.regexIndex += i.position + 1,
                this.regexIndex === this.count && (this.regexIndex = 0)),
                i
            }
        }
        function a(t) {
            let e = t.input[t.index - 1]
              , i = t.input[t.index + t[0].length];
            if ("." === e || "." === i)
                return {
                    ignoreMatch: !0
                }
        }
        if (t.contains && t.contains.includes("self"))
            throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
        !function i(r, o) {
            r.compiled || (r.compiled = !0,
            r.__onBegin = null,
            r.keywords = r.keywords || r.beginKeywords,
            r.keywords && (r.keywords = function(t, e) {
                var i = {};
                "string" == typeof t ? n("keyword", t) : Object.keys(t).forEach((function(e) {
                    n(e, t[e])
                }
                ));
                return i;
                function n(t, n) {
                    e && (n = n.toLowerCase()),
                    n.split(" ").forEach((function(e) {
                        var n = e.split("|");
                        i[n[0]] = [t, C(n[0], n[1])]
                    }
                    ))
                }
            }(r.keywords, t.case_insensitive)),
            r.lexemesRe = e(r.lexemes || /\w+/, !0),
            o && (r.beginKeywords && (r.begin = "\\b(" + r.beginKeywords.split(" ").join("|") + ")(?=\\b|\\s)",
            r.__onBegin = a),
            r.begin || (r.begin = /\B|\b/),
            r.beginRe = e(r.begin),
            r.endSameAsBegin && (r.end = r.begin),
            r.end || r.endsWithParent || (r.end = /\B|\b/),
            r.end && (r.endRe = e(r.end)),
            r.terminator_end = d(r.end) || "",
            r.endsWithParent && o.terminator_end && (r.terminator_end += (r.end ? "|" : "") + o.terminator_end)),
            r.illegal && (r.illegalRe = e(r.illegal)),
            null == r.relevance && (r.relevance = 1),
            r.contains || (r.contains = []),
            r.contains = [].concat(...r.contains.map((function(t) {
                return function(t) {
                    t.variants && !t.cached_variants && (t.cached_variants = t.variants.map((function(e) {
                        return s(t, {
                            variants: null
                        }, e)
                    }
                    )));
                    return t.cached_variants ? t.cached_variants : function t(e) {
                        return !!e && (e.endsWithParent || t(e.starts))
                    }(t) ? s(t, {
                        starts: t.starts ? s(t.starts) : null
                    }) : Object.isFrozen(t) ? s(t) : t
                }("self" === t ? r : t)
            }
            ))),
            r.contains.forEach((function(t) {
                i(t, r)
            }
            )),
            r.starts && i(r.starts, o),
            r.matcher = function(t) {
                let e = new n;
                return t.contains.forEach(t=>e.addRule(t.begin, {
                    rule: t,
                    type: "begin"
                })),
                t.terminator_end && e.addRule(t.terminator_end, {
                    type: "end"
                }),
                t.illegal && e.addRule(t.illegal, {
                    type: "illegal"
                }),
                e
            }(r))
        }(t)
    }
    function C(t, e) {
        return e ? Number(e) : (i = t,
        k.includes(i.toLowerCase()) ? 0 : 1);
        var i
    }
    const D = n
      , A = s
      , {nodeStream: N, mergeStreams: O} = r;
    var B = function(t) {
        var e = []
          , n = {}
          , s = {}
          , a = []
          , r = !0
          , o = /((^(<[^>]+>|\t|)+|(?:\n)))/gm
          , h = "Could not find the language '{}', did you forget to load/include a language module?"
          , l = {
            noHighlightRe: /^(no-?highlight)$/i,
            languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
            classPrefix: "hljs-",
            tabReplace: null,
            useBR: !1,
            languages: void 0,
            __emitter: c
        };
        function d(t) {
            return l.noHighlightRe.test(t)
        }
        function g(t, e, i, n) {
            var s = {
                code: e,
                language: t
            };
            v("before:highlight", s);
            var a = s.result ? s.result : p(s.language, s.code, i, n);
            return a.code = s.code,
            v("after:highlight", a),
            a
        }
        function p(t, e, i, s) {
            var a = e;
            function o(t, e) {
                var i = w.case_insensitive ? e[0].toLowerCase() : e[0];
                return t.keywords.hasOwnProperty(i) && t.keywords[i]
            }
            function c() {
                null != v.subLanguage ? function() {
                    if ("" !== I) {
                        var t = "string" == typeof v.subLanguage;
                        if (!t || n[v.subLanguage]) {
                            var e = t ? p(v.subLanguage, I, !0, S[v.subLanguage]) : u(I, v.subLanguage.length ? v.subLanguage : void 0);
                            v.relevance > 0 && (R += e.relevance),
                            t && (S[v.subLanguage] = e.top),
                            P.addSublanguage(e.emitter, e.language)
                        } else
                            P.addText(I)
                    }
                }() : function() {
                    var t, e, i, n;
                    if (v.keywords) {
                        for (e = 0,
                        v.lexemesRe.lastIndex = 0,
                        i = v.lexemesRe.exec(I),
                        n = ""; i; ) {
                            n += I.substring(e, i.index);
                            var s = null;
                            (t = o(v, i)) ? (P.addText(n),
                            n = "",
                            R += t[1],
                            s = t[0],
                            P.addKeyword(i[0], s)) : n += i[0],
                            e = v.lexemesRe.lastIndex,
                            i = v.lexemesRe.exec(I)
                        }
                        n += I.substr(e),
                        P.addText(n)
                    } else
                        P.addText(I)
                }(),
                I = ""
            }
            function d(t) {
                t.className && P.openNode(t.className),
                v = Object.create(t, {
                    parent: {
                        value: v
                    }
                })
            }
            function g(t) {
                var e = t[0]
                  , i = t.rule;
                if (i.__onBegin) {
                    if ((i.__onBegin(t) || {}).ignoreMatch)
                        return function(t) {
                            return 0 === v.matcher.regexIndex ? (I += t[0],
                            1) : (k = !0,
                            0)
                        }(e)
                }
                return i && i.endSameAsBegin && (i.endRe = new RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),"m")),
                i.skip ? I += e : (i.excludeBegin && (I += e),
                c(),
                i.returnBegin || i.excludeBegin || (I = e)),
                d(i),
                i.returnBegin ? 0 : e.length
            }
            function m(t) {
                var e = t[0]
                  , i = a.substr(t.index)
                  , n = function t(e, i) {
                    if (function(t, e) {
                        var i = t && t.exec(e);
                        return i && 0 === i.index
                    }(e.endRe, i)) {
                        for (; e.endsParent && e.parent; )
                            e = e.parent;
                        return e
                    }
                    if (e.endsWithParent)
                        return t(e.parent, i)
                }(v, i);
                if (n) {
                    var s = v;
                    s.skip ? I += e : (s.returnEnd || s.excludeEnd || (I += e),
                    c(),
                    s.excludeEnd && (I = e));
                    do {
                        v.className && P.closeNode(),
                        v.skip || v.subLanguage || (R += v.relevance),
                        v = v.parent
                    } while (v !== n.parent);
                    return n.starts && (n.endSameAsBegin && (n.starts.endRe = n.endRe),
                    d(n.starts)),
                    s.returnEnd ? 0 : e.length
                }
            }
            var f = {};
            function b(e, n) {
                var s, o = n && n[0];
                if (I += e,
                null == o)
                    return c(),
                    0;
                if ("begin" == f.type && "end" == n.type && f.index == n.index && "" === o) {
                    if (I += a.slice(n.index, n.index + 1),
                    !r)
                        throw (s = new Error("0 width match regex")).languageName = t,
                        s.badRule = f.rule,
                        s;
                    return 1
                }
                if (f = n,
                "begin" === n.type)
                    return g(n);
                if ("illegal" === n.type && !i)
                    throw (s = new Error('Illegal lexeme "' + o + '" for mode "' + (v.className || "<unnamed>") + '"')).mode = v,
                    s;
                if ("end" === n.type) {
                    var h = m(n);
                    if (null != h)
                        return h
                }
                if ("illegal" === n.type && "" === o)
                    return 1;
                if (T > 1e5 && T > 3 * n.index) {
                    throw new Error("potential infinite loop, way more iterations than matches")
                }
                return I += o,
                o.length
            }
            var w = y(t);
            if (!w)
                throw console.error(h.replace("{}", t)),
                new Error('Unknown language: "' + t + '"');
            L(w);
            var x, v = s || w, S = {}, P = new l.__emitter(l);
            !function() {
                for (var t = [], e = v; e !== w; e = e.parent)
                    e.className && t.unshift(e.className);
                t.forEach(t=>P.openNode(t))
            }();
            var E, _, I = "", R = 0, M = 0, T = 0, k = !1;
            try {
                for (v.matcher.considerAll(); T++,
                k ? k = !1 : (v.matcher.lastIndex = M,
                v.matcher.considerAll()),
                E = v.matcher.exec(a); ) {
                    _ = b(a.substring(M, E.index), E),
                    M = E.index + _
                }
                return b(a.substr(M)),
                P.closeAllNodes(),
                P.finalize(),
                x = P.toHTML(),
                {
                    relevance: R,
                    value: x,
                    language: t,
                    illegal: !1,
                    emitter: P,
                    top: v
                }
            } catch (e) {
                if (e.message && e.message.includes("Illegal"))
                    return {
                        illegal: !0,
                        illegalBy: {
                            msg: e.message,
                            context: a.slice(M - 100, M + 100),
                            mode: e.mode
                        },
                        sofar: x,
                        relevance: 0,
                        value: D(a),
                        emitter: P
                    };
                if (r)
                    return {
                        relevance: 0,
                        value: D(a),
                        emitter: P,
                        language: t,
                        top: v,
                        errorRaised: e
                    };
                throw e
            }
        }
        function u(t, e) {
            e = e || l.languages || Object.keys(n);
            var i = function(t) {
                const e = {
                    relevance: 0,
                    emitter: new l.__emitter(l),
                    value: D(t),
                    illegal: !1,
                    top: w
                };
                return e.emitter.addText(t),
                e
            }(t)
              , s = i;
            return e.filter(y).filter(x).forEach((function(e) {
                var n = p(e, t, !1);
                n.language = e,
                n.relevance > s.relevance && (s = n),
                n.relevance > i.relevance && (s = i,
                i = n)
            }
            )),
            s.language && (i.second_best = s),
            i
        }
        function m(t) {
            return l.tabReplace || l.useBR ? t.replace(o, (function(t, e) {
                return l.useBR && "\n" === t ? "<br>" : l.tabReplace ? e.replace(/\t/g, l.tabReplace) : ""
            }
            )) : t
        }
        function f(t) {
            var e, i, n, a, r, o = function(t) {
                var e, i = t.className + " ";
                if (i += t.parentNode ? t.parentNode.className : "",
                e = l.languageDetectRe.exec(i)) {
                    var n = y(e[1]);
                    return n || (console.warn(h.replace("{}", e[1])),
                    console.warn("Falling back to no-highlight mode for this block.", t)),
                    n ? e[1] : "no-highlight"
                }
                return i.split(/\s+/).find(t=>d(t) || y(t))
            }(t);
            d(o) || (v("before:highlightBlock", {
                block: t,
                language: o
            }),
            l.useBR ? (e = document.createElement("div")).innerHTML = t.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n") : e = t,
            r = e.textContent,
            n = o ? g(o, r, !0) : u(r),
            (i = N(e)).length && ((a = document.createElement("div")).innerHTML = n.value,
            n.value = O(i, N(a), r)),
            n.value = m(n.value),
            v("after:highlightBlock", {
                block: t,
                result: n
            }),
            t.innerHTML = n.value,
            t.className = function(t, e, i) {
                var n = e ? s[e] : i
                  , a = [t.trim()];
                return t.match(/\bhljs\b/) || a.push("hljs"),
                t.includes(n) || a.push(n),
                a.join(" ").trim()
            }(t.className, o, n.language),
            t.result = {
                language: n.language,
                re: n.relevance
            },
            n.second_best && (t.second_best = {
                language: n.second_best.language,
                re: n.second_best.relevance
            }))
        }
        function b() {
            if (!b.called) {
                b.called = !0;
                var t = document.querySelectorAll("pre code");
                e.forEach.call(t, f)
            }
        }
        const w = {
            disableAutodetect: !0,
            name: "Plain text"
        };
        function y(t) {
            return t = (t || "").toLowerCase(),
            n[t] || n[s[t]]
        }
        function x(t) {
            var e = y(t);
            return e && !e.disableAutodetect
        }
        function v(t, e) {
            var i = t;
            a.forEach((function(t) {
                t[i] && t[i](e)
            }
            ))
        }
        Object.assign(t, {
            highlight: g,
            highlightAuto: u,
            fixMarkup: m,
            highlightBlock: f,
            configure: function(t) {
                l = A(l, t)
            },
            initHighlighting: b,
            initHighlightingOnLoad: function() {
                window.addEventListener("DOMContentLoaded", b, !1)
            },
            registerLanguage: function(e, i) {
                var a;
                try {
                    a = i(t)
                } catch (t) {
                    if (console.error("Language definition for '{}' could not be registered.".replace("{}", e)),
                    !r)
                        throw t;
                    console.error(t),
                    a = w
                }
                a.name || (a.name = e),
                n[e] = a,
                a.rawDefinition = i.bind(null, t),
                a.aliases && a.aliases.forEach((function(t) {
                    s[t] = e
                }
                ))
            },
            listLanguages: function() {
                return Object.keys(n)
            },
            getLanguage: y,
            requireLanguage: function(t) {
                var e = y(t);
                if (e)
                    return e;
                throw new Error("The '{}' language is required, but not loaded.".replace("{}", t))
            },
            autoDetection: x,
            inherit: A,
            addPlugin: function(t, e) {
                a.push(t)
            }
        }),
        t.debugMode = function() {
            r = !1
        }
        ,
        t.safeMode = function() {
            r = !0
        }
        ,
        t.versionString = "10.0.3";
        for (const t in T)
            "object" == typeof T[t] && i(T[t]);
        return Object.assign(t, T),
        t
    }({});
    t.exports = B
}
, function(t, e) {
    t.exports = function(t) {
        var e = "<>"
          , i = "</>"
          , n = {
            begin: /<[A-Za-z0-9\\._:-]+/,
            end: /\/[A-Za-z0-9\\._:-]+>|\/>/
        }
          , s = "[A-Za-z$_][0-9A-Za-z$_]*"
          , a = {
            keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",
            literal: "true false null undefined NaN Infinity",
            built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
        }
          , r = {
            className: "number",
            variants: [{
                begin: "\\b(0[bB][01]+)n?"
            }, {
                begin: "\\b(0[oO][0-7]+)n?"
            }, {
                begin: t.C_NUMBER_RE + "n?"
            }],
            relevance: 0
        }
          , o = {
            className: "subst",
            begin: "\\$\\{",
            end: "\\}",
            keywords: a,
            contains: []
        }
          , h = {
            begin: "html`",
            end: "",
            starts: {
                end: "`",
                returnEnd: !1,
                contains: [t.BACKSLASH_ESCAPE, o],
                subLanguage: "xml"
            }
        }
          , l = {
            begin: "css`",
            end: "",
            starts: {
                end: "`",
                returnEnd: !1,
                contains: [t.BACKSLASH_ESCAPE, o],
                subLanguage: "css"
            }
        }
          , c = {
            className: "string",
            begin: "`",
            end: "`",
            contains: [t.BACKSLASH_ESCAPE, o]
        };
        o.contains = [t.APOS_STRING_MODE, t.QUOTE_STRING_MODE, h, l, c, r, t.REGEXP_MODE];
        var d = o.contains.concat([t.C_BLOCK_COMMENT_MODE, t.C_LINE_COMMENT_MODE])
          , g = {
            className: "params",
            begin: /\(/,
            end: /\)/,
            excludeBegin: !0,
            excludeEnd: !0,
            contains: d
        };
        return {
            name: "JavaScript",
            aliases: ["js", "jsx", "mjs", "cjs"],
            keywords: a,
            contains: [{
                className: "meta",
                relevance: 10,
                begin: /^\s*['"]use (strict|asm)['"]/
            }, {
                className: "meta",
                begin: /^#!/,
                end: /$/
            }, t.APOS_STRING_MODE, t.QUOTE_STRING_MODE, h, l, c, t.C_LINE_COMMENT_MODE, t.COMMENT("/\\*\\*", "\\*/", {
                relevance: 0,
                contains: [{
                    className: "doctag",
                    begin: "@[A-Za-z]+",
                    contains: [{
                        className: "type",
                        begin: "\\{",
                        end: "\\}",
                        relevance: 0
                    }, {
                        className: "variable",
                        begin: s + "(?=\\s*(-)|$)",
                        endsParent: !0,
                        relevance: 0
                    }, {
                        begin: /(?=[^\n])\s/,
                        relevance: 0
                    }]
                }]
            }), t.C_BLOCK_COMMENT_MODE, r, {
                begin: /[{,\n]\s*/,
                relevance: 0,
                contains: [{
                    begin: s + "\\s*:",
                    returnBegin: !0,
                    relevance: 0,
                    contains: [{
                        className: "attr",
                        begin: s,
                        relevance: 0
                    }]
                }]
            }, {
                begin: "(" + t.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
                keywords: "return throw case",
                contains: [t.C_LINE_COMMENT_MODE, t.C_BLOCK_COMMENT_MODE, t.REGEXP_MODE, {
                    className: "function",
                    begin: "(\\(.*?\\)|" + s + ")\\s*=>",
                    returnBegin: !0,
                    end: "\\s*=>",
                    contains: [{
                        className: "params",
                        variants: [{
                            begin: s
                        }, {
                            begin: /\(\s*\)/
                        }, {
                            begin: /\(/,
                            end: /\)/,
                            excludeBegin: !0,
                            excludeEnd: !0,
                            keywords: a,
                            contains: d
                        }]
                    }]
                }, {
                    begin: /,/,
                    relevance: 0
                }, {
                    className: "",
                    begin: /\s/,
                    end: /\s*/,
                    skip: !0
                }, {
                    variants: [{
                        begin: e,
                        end: i
                    }, {
                        begin: n.begin,
                        end: n.end
                    }],
                    subLanguage: "xml",
                    contains: [{
                        begin: n.begin,
                        end: n.end,
                        skip: !0,
                        contains: ["self"]
                    }]
                }],
                relevance: 0
            }, {
                className: "function",
                beginKeywords: "function",
                end: /\{/,
                excludeEnd: !0,
                contains: [t.inherit(t.TITLE_MODE, {
                    begin: s
                }), g],
                illegal: /\[|%/
            }, {
                begin: /\$[(.]/
            }, t.METHOD_GUARD, {
                className: "class",
                beginKeywords: "class",
                end: /[{;=]/,
                excludeEnd: !0,
                illegal: /[:"\[\]]/,
                contains: [{
                    beginKeywords: "extends"
                }, t.UNDERSCORE_TITLE_MODE]
            }, {
                beginKeywords: "constructor",
                end: /\{/,
                excludeEnd: !0
            }, {
                begin: "(get|set)\\s+(?=" + s + "\\()",
                end: /{/,
                keywords: "get set",
                contains: [t.inherit(t.TITLE_MODE, {
                    begin: s
                }), {
                    begin: /\(\)/
                }, g]
            }],
            illegal: /#(?!!)/
        }
    }
}
, function(t, e) {
    t.exports = function(t) {
        return {
            name: "Plain text",
            aliases: ["text", "txt"],
            disableAutodetect: !0
        }
    }
}
, function(t, e) {
    t.exports = function(t) {
        var e = {
            className: "symbol",
            begin: "&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;"
        }
          , i = {
            begin: "\\s",
            contains: [{
                className: "meta-keyword",
                begin: "#?[a-z_][a-z1-9_-]+",
                illegal: "\\n"
            }]
        }
          , n = t.inherit(i, {
            begin: "\\(",
            end: "\\)"
        })
          , s = t.inherit(t.APOS_STRING_MODE, {
            className: "meta-string"
        })
          , a = t.inherit(t.QUOTE_STRING_MODE, {
            className: "meta-string"
        })
          , r = {
            endsWithParent: !0,
            illegal: /</,
            relevance: 0,
            contains: [{
                className: "attr",
                begin: "[A-Za-z0-9\\._:-]+",
                relevance: 0
            }, {
                begin: /=\s*/,
                relevance: 0,
                contains: [{
                    className: "string",
                    endsParent: !0,
                    variants: [{
                        begin: /"/,
                        end: /"/,
                        contains: [e]
                    }, {
                        begin: /'/,
                        end: /'/,
                        contains: [e]
                    }, {
                        begin: /[^\s"'=<>`]+/
                    }]
                }]
            }]
        };
        return {
            name: "HTML, XML",
            aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist", "wsf", "svg"],
            case_insensitive: !0,
            contains: [{
                className: "meta",
                begin: "<![a-z]",
                end: ">",
                relevance: 10,
                contains: [i, a, s, n, {
                    begin: "\\[",
                    end: "\\]",
                    contains: [{
                        className: "meta",
                        begin: "<![a-z]",
                        end: ">",
                        contains: [i, n, a, s]
                    }]
                }]
            }, t.COMMENT("\x3c!--", "--\x3e", {
                relevance: 10
            }), {
                begin: "<\\!\\[CDATA\\[",
                end: "\\]\\]>",
                relevance: 10
            }, e, {
                className: "meta",
                begin: /<\?xml/,
                end: /\?>/,
                relevance: 10
            }, {
                className: "tag",
                begin: "<style(?=\\s|>)",
                end: ">",
                keywords: {
                    name: "style"
                },
                contains: [r],
                starts: {
                    end: "</style>",
                    returnEnd: !0,
                    subLanguage: ["css", "xml"]
                }
            }, {
                className: "tag",
                begin: "<script(?=\\s|>)",
                end: ">",
                keywords: {
                    name: "script"
                },
                contains: [r],
                starts: {
                    end: "<\/script>",
                    returnEnd: !0,
                    subLanguage: ["javascript", "handlebars", "xml"]
                }
            }, {
                className: "tag",
                begin: "</?",
                end: "/?>",
                contains: [{
                    className: "name",
                    begin: /[^\/><\s]+/,
                    relevance: 0
                }, r]
            }]
        }
    }
}
, function(t, e) {
    t.exports = function(t) {
        var e = {
            className: "variable",
            begin: "(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b"
        }
          , i = {
            className: "number",
            begin: "#[0-9A-Fa-f]+"
        };
        return t.CSS_NUMBER_MODE,
        t.QUOTE_STRING_MODE,
        t.APOS_STRING_MODE,
        t.C_BLOCK_COMMENT_MODE,
        {
            name: "SCSS",
            case_insensitive: !0,
            illegal: "[=/|']",
            contains: [t.C_LINE_COMMENT_MODE, t.C_BLOCK_COMMENT_MODE, {
                className: "selector-id",
                begin: "\\#[A-Za-z0-9_-]+",
                relevance: 0
            }, {
                className: "selector-class",
                begin: "\\.[A-Za-z0-9_-]+",
                relevance: 0
            }, {
                className: "selector-attr",
                begin: "\\[",
                end: "\\]",
                illegal: "$"
            }, {
                className: "selector-tag",
                begin: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
                relevance: 0
            }, {
                className: "selector-pseudo",
                begin: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
            }, {
                className: "selector-pseudo",
                begin: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
            }, e, {
                className: "attribute",
                begin: "\\b(src|z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
                illegal: "[^\\s]"
            }, {
                begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
            }, {
                begin: ":",
                end: ";",
                contains: [e, i, t.CSS_NUMBER_MODE, t.QUOTE_STRING_MODE, t.APOS_STRING_MODE, {
                    className: "meta",
                    begin: "!important"
                }]
            }, {
                begin: "@(page|font-face)",
                lexemes: "@[a-z-]+",
                keywords: "@page @font-face"
            }, {
                begin: "@",
                end: "[{;]",
                returnBegin: !0,
                keywords: "and or not only",
                contains: [{
                    begin: "@[a-z-]+",
                    className: "keyword"
                }, e, t.QUOTE_STRING_MODE, t.APOS_STRING_MODE, i, t.CSS_NUMBER_MODE]
            }]
        }
    }
}
, function(t, e, i) {
    i(11),
    t.exports = i(10)
}
, function(t, e, i) {
    var n = i(7)
      , s = i(8);
    "string" == typeof (s = s.__esModule ? s.default : s) && (s = [[t.i, s, ""]]);
    var a = {
        insert: "head",
        singleton: !1
    };
    n(s, a);
    t.exports = s.locals || {}
}
, function(t, e, i) {
    "use strict";
    var n, s = function() {
        return void 0 === n && (n = Boolean(window && document && document.all && !window.atob)),
        n
    }, a = function() {
        var t = {};
        return function(e) {
            if (void 0 === t[e]) {
                var i = document.querySelector(e);
                if (window.HTMLIFrameElement && i instanceof window.HTMLIFrameElement)
                    try {
                        i = i.contentDocument.head
                    } catch (t) {
                        i = null
                    }
                t[e] = i
            }
            return t[e]
        }
    }(), r = [];
    function o(t) {
        for (var e = -1, i = 0; i < r.length; i++)
            if (r[i].identifier === t) {
                e = i;
                break
            }
        return e
    }
    function h(t, e) {
        for (var i = {}, n = [], s = 0; s < t.length; s++) {
            var a = t[s]
              , h = e.base ? a[0] + e.base : a[0]
              , l = i[h] || 0
              , c = "".concat(h, " ").concat(l);
            i[h] = l + 1;
            var d = o(c)
              , g = {
                css: a[1],
                media: a[2],
                sourceMap: a[3]
            };
            -1 !== d ? (r[d].references++,
            r[d].updater(g)) : r.push({
                identifier: c,
                updater: f(g, e),
                references: 1
            }),
            n.push(c)
        }
        return n
    }
    function l(t) {
        var e = document.createElement("style")
          , n = t.attributes || {};
        if (void 0 === n.nonce) {
            var s = i.nc;
            s && (n.nonce = s)
        }
        if (Object.keys(n).forEach((function(t) {
            e.setAttribute(t, n[t])
        }
        )),
        "function" == typeof t.insert)
            t.insert(e);
        else {
            var r = a(t.insert || "head");
            if (!r)
                throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            r.appendChild(e)
        }
        return e
    }
    var c, d = (c = [],
    function(t, e) {
        return c[t] = e,
        c.filter(Boolean).join("\n")
    }
    );
    function g(t, e, i, n) {
        var s = i ? "" : n.media ? "@media ".concat(n.media, " {").concat(n.css, "}") : n.css;
        if (t.styleSheet)
            t.styleSheet.cssText = d(e, s);
        else {
            var a = document.createTextNode(s)
              , r = t.childNodes;
            r[e] && t.removeChild(r[e]),
            r.length ? t.insertBefore(a, r[e]) : t.appendChild(a)
        }
    }
    function p(t, e, i) {
        var n = i.css
          , s = i.media
          , a = i.sourceMap;
        if (s ? t.setAttribute("media", s) : t.removeAttribute("media"),
        a && btoa && (n += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a)))), " */")),
        t.styleSheet)
            t.styleSheet.cssText = n;
        else {
            for (; t.firstChild; )
                t.removeChild(t.firstChild);
            t.appendChild(document.createTextNode(n))
        }
    }
    var u = null
      , m = 0;
    function f(t, e) {
        var i, n, s;
        if (e.singleton) {
            var a = m++;
            i = u || (u = l(e)),
            n = g.bind(null, i, a, !1),
            s = g.bind(null, i, a, !0)
        } else
            i = l(e),
            n = p.bind(null, i, e),
            s = function() {
                !function(t) {
                    if (null === t.parentNode)
                        return !1;
                    t.parentNode.removeChild(t)
                }(i)
            }
            ;
        return n(t),
        function(e) {
            if (e) {
                if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap)
                    return;
                n(t = e)
            } else
                s()
        }
    }
    t.exports = function(t, e) {
        (e = e || {}).singleton || "boolean" == typeof e.singleton || (e.singleton = s());
        var i = h(t = t || [], e);
        return function(t) {
            if (t = t || [],
            "[object Array]" === Object.prototype.toString.call(t)) {
                for (var n = 0; n < i.length; n++) {
                    var s = o(i[n]);
                    r[s].references--
                }
                for (var a = h(t, e), l = 0; l < i.length; l++) {
                    var c = o(i[l]);
                    0 === r[c].references && (r[c].updater(),
                    r.splice(c, 1))
                }
                i = a
            }
        }
    }
}
, function(t, e, i) {
    (e = i(9)(!1)).push([t.i, "/*\n\ngithub.com style (c) Vasily Polovnyov <vast@whiteants.net>\n\n*/\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  color: #333;\n  background: #f8f8f8;\n}\n\n.hljs-comment,\n.hljs-quote {\n  color: #998;\n  font-style: italic;\n}\n\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-subst {\n  color: #333;\n  font-weight: bold;\n}\n\n.hljs-number,\n.hljs-literal,\n.hljs-variable,\n.hljs-template-variable,\n.hljs-tag .hljs-attr {\n  color: #008080;\n}\n\n.hljs-string,\n.hljs-doctag {\n  color: #d14;\n}\n\n.hljs-title,\n.hljs-section,\n.hljs-selector-id {\n  color: #900;\n  font-weight: bold;\n}\n\n.hljs-subst {\n  font-weight: normal;\n}\n\n.hljs-type,\n.hljs-class .hljs-title {\n  color: #458;\n  font-weight: bold;\n}\n\n.hljs-tag,\n.hljs-name,\n.hljs-attribute {\n  color: #000080;\n  font-weight: normal;\n}\n\n.hljs-regexp,\n.hljs-link {\n  color: #009926;\n}\n\n.hljs-symbol,\n.hljs-bullet {\n  color: #990073;\n}\n\n.hljs-built_in,\n.hljs-builtin-name {\n  color: #0086b3;\n}\n\n.hljs-meta {\n  color: #999;\n  font-weight: bold;\n}\n\n.hljs-deletion {\n  background: #fdd;\n}\n\n.hljs-addition {\n  background: #dfd;\n}\n\n.hljs-emphasis {\n  font-style: italic;\n}\n\n.hljs-strong {\n  font-weight: bold;\n}\n", ""]),
    t.exports = e
}
, function(t, e, i) {
    "use strict";
    t.exports = function(t) {
        var e = [];
        return e.toString = function() {
            return this.map((function(e) {
                var i = function(t, e) {
                    var i = t[1] || ""
                      , n = t[3];
                    if (!n)
                        return i;
                    if (e && "function" == typeof btoa) {
                        var s = (r = n,
                        o = btoa(unescape(encodeURIComponent(JSON.stringify(r)))),
                        h = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),
                        "/*# ".concat(h, " */"))
                          , a = n.sources.map((function(t) {
                            return "/*# sourceURL=".concat(n.sourceRoot || "").concat(t, " */")
                        }
                        ));
                        return [i].concat(a).concat([s]).join("\n")
                    }
                    var r, o, h;
                    return [i].join("\n")
                }(e, t);
                return e[2] ? "@media ".concat(e[2], " {").concat(i, "}") : i
            }
            )).join("")
        }
        ,
        e.i = function(t, i, n) {
            "string" == typeof t && (t = [[null, t, ""]]);
            var s = {};
            if (n)
                for (var a = 0; a < this.length; a++) {
                    var r = this[a][0];
                    null != r && (s[r] = !0)
                }
            for (var o = 0; o < t.length; o++) {
                var h = [].concat(t[o]);
                n && s[h[0]] || (i && (h[2] ? h[2] = "".concat(i, " and ").concat(h[2]) : h[2] = i),
                e.push(h))
            }
        }
        ,
        e
    }
}
, function(t, e, i) {}
, function(t, e, i) {
    "use strict";
    i.r(e);
    class n {
        constructor(t, e) {
            this.state = {
                angle: 0,
                area: [],
                position: {
                    x: 0,
                    y: 0
                },
                hardAngle: 0,
                hardDrawingAngle: 0
            },
            this.createdDensity = e,
            this.nowDrawingDensity = this.createdDensity,
            this.render = t
        }
        setDensity(t) {
            this.createdDensity = t,
            this.nowDrawingDensity = t
        }
        setDrawingDensity(t) {
            this.nowDrawingDensity = t
        }
        setPosition(t) {
            this.state.position = t
        }
        setAngle(t) {
            this.state.angle = t
        }
        setArea(t) {
            this.state.area = t
        }
        setHardDrawingAngle(t) {
            this.state.hardDrawingAngle = t
        }
        setHardAngle(t) {
            this.state.hardAngle = t,
            this.state.hardDrawingAngle = t
        }
        setOrientation(t) {
            this.orientation = t
        }
        getDrawingDensity() {
            return this.nowDrawingDensity
        }
        getDensity() {
            return this.createdDensity
        }
        getHardAngle() {
            return this.state.hardAngle
        }
    }
    class s extends n {
        constructor(t, e, i) {
            super(t, i),
            this.image = null,
            this.isLoad = !1,
            this.loadingAngle = 0,
            this.image = new Image,
            this.image.src = e
        }
        draw(t) {
            const e = this.render.getContext()
              , i = this.render.convertToGlobal(this.state.position)
              , n = this.render.getRect().pageWidth
              , s = this.render.getRect().height;
            e.save(),
            e.translate(i.x, i.y),
            e.beginPath();
            for (let t of this.state.area)
                null !== t && (t = this.render.convertToGlobal(t),
                e.lineTo(t.x - i.x, t.y - i.y));
            e.rotate(this.state.angle),
            e.clip(),
            this.isLoad ? e.drawImage(this.image, 0, 0, n, s) : this.drawLoader(e, {
                x: 0,
                y: 0
            }, n, s),
            e.restore()
        }
        simpleDraw(t) {
            const e = this.render.getRect()
              , i = this.render.getContext()
              , n = e.pageWidth
              , s = e.height
              , a = 1 === t ? e.left + e.pageWidth : e.left
              , r = e.top;
            this.isLoad ? i.drawImage(this.image, a, r, n, s) : this.drawLoader(i, {
                x: a,
                y: r
            }, n, s)
        }
        drawLoader(t, e, i, n) {
            t.beginPath(),
            t.strokeStyle = "rgb(200, 200, 200)",
            t.fillStyle = "rgb(255, 255, 255)",
            t.lineWidth = 1,
            t.rect(e.x + 1, e.y + 1, i - 1, n - 1),
            t.stroke(),
            t.fill();
            const s = {
                x: e.x + i / 2,
                y: e.y + n / 2
            };
            t.beginPath(),
            t.lineWidth = 10,
            t.arc(s.x, s.y, 20, this.loadingAngle, 3 * Math.PI / 2 + this.loadingAngle),
            t.stroke(),
            t.closePath(),
            this.loadingAngle += .07,
            this.loadingAngle >= 2 * Math.PI && (this.loadingAngle = 0)
        }
        load() {
            this.isLoad || (this.image.onload = ()=>{
                this.isLoad = !0
            }
            )
        }
    }
    class a {
        constructor(t, e) {
            this.pages = [],
            this.currentPageIndex = 0,
            this.currentSpreadIndex = 0,
            this.landscapeSpread = [],
            this.portraitSpread = [],
            this.render = e,
            this.app = t,
            this.currentPageIndex = 0,
            this.isShowCover = this.app.getSettings().showCover
        }
        destroy() {
            this.pages = []
        }
        createSpread() {
            this.landscapeSpread = [],
            this.portraitSpread = [];
            for (let t = 0; t < this.pages.length; t++)
                this.portraitSpread.push([t]);
            let t = 0;
            this.isShowCover && (this.pages[0].setDensity("hard"),
            this.landscapeSpread.push([t]),
            t++);
            for (let e = t; e < this.pages.length; e += 2)
                e < this.pages.length - 1 ? this.landscapeSpread.push([e, e + 1]) : (this.landscapeSpread.push([e]),
                this.pages[e].setDensity("hard"))
        }
        getSpread() {
            return "landscape" === this.render.getOrientation() ? this.landscapeSpread : this.portraitSpread
        }
        getSpreadIndexByPage(t) {
            const e = this.getSpread();
            for (let i = 0; i < e.length; i++)
                if (t === e[i][0] || t === e[i][1])
                    return i;
            return null
        }
        getPageCount() {
            return this.pages.length
        }
        getPages() {
            return this.pages
        }
        getPage(t) {
            if (t >= 0 && t < this.pages.length)
                return this.pages[t];
            throw new Error("Invalid page number")
        }
        nextBy(t) {
            const e = this.pages.indexOf(t);
            return e < this.pages.length - 1 ? this.pages[e + 1] : null
        }
        prevBy(t) {
            const e = this.pages.indexOf(t);
            return e > 0 ? this.pages[e - 1] : null
        }
        getFlippingPage(t) {
            const e = this.currentSpreadIndex;
            if ("portrait" === this.render.getOrientation())
                return 0 === t ? this.pages[e] : this.pages[e - 1];
            {
                const i = 0 === t ? this.getSpread()[e + 1] : this.getSpread()[e - 1];
                return 1 === i.length || 0 === t ? this.pages[i[0]] : this.pages[i[1]]
            }
        }
        getBottomPage(t) {
            const e = this.currentSpreadIndex;
            if ("portrait" === this.render.getOrientation())
                return 0 === t ? this.pages[e + 1] : this.pages[e - 1];
            {
                const i = 0 === t ? this.getSpread()[e + 1] : this.getSpread()[e - 1];
                return 1 === i.length ? this.pages[i[0]] : 0 === t ? this.pages[i[1]] : this.pages[i[0]]
            }
        }
        showNext() {
            this.currentSpreadIndex < this.getSpread().length && (this.currentSpreadIndex++,
            this.showSpread())
        }
        showPrev() {
            this.currentSpreadIndex > 0 && (this.currentSpreadIndex--,
            this.showSpread())
        }
        getCurrentPageIndex() {
            return this.currentPageIndex
        }
        show(t=null) {
            if (null === t && (t = this.currentPageIndex),
            t < 0 || t >= this.pages.length)
                return;
            const e = this.getSpreadIndexByPage(t);
            null !== e && (this.currentSpreadIndex = e,
            this.showSpread())
        }
        getCurrentSpreadIndex() {
            return this.currentSpreadIndex
        }
        setCurrentSpreadIndex(t) {
            if (!(t >= 0 && t < this.getSpread().length))
                throw new Error("Invalid page");
            this.currentSpreadIndex = t
        }
        showSpread() {
            const t = this.getSpread()[this.currentSpreadIndex];
            2 === t.length ? (this.render.setLeftPage(this.pages[t[0]]),
            this.render.setRightPage(this.pages[t[1]])) : "landscape" === this.render.getOrientation() && t[0] === this.pages.length - 1 ? (this.render.setLeftPage(this.pages[t[0]]),
            this.render.setRightPage(null)) : (this.render.setLeftPage(null),
            this.render.setRightPage(this.pages[t[0]])),
            this.currentPageIndex = t[0],
            this.app.updatePageIndex(this.currentPageIndex)
        }
    }
    class r extends a {
        constructor(t, e, i) {
            super(t, e),
            this.imagesHref = i
        }
        load() {
            for (const t of this.imagesHref) {
                const e = new s(this.render,t,"soft");
                e.load(),
                this.pages.push(e)
            }
            this.createSpread()
        }
    }
    class o {
        static GetDistanceBetweenTwoPoint(t, e) {
            return null === t || null === e ? 1 / 0 : Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
        }
        static GetSegmentLength(t) {
            return o.GetDistanceBetweenTwoPoint(t[0], t[1])
        }
        static GetAngleBetweenTwoLine(t, e) {
            const i = t[0].y - t[1].y
              , n = e[0].y - e[1].y
              , s = t[1].x - t[0].x
              , a = e[1].x - e[0].x;
            return Math.acos((i * n + s * a) / (Math.sqrt(i * i + s * s) * Math.sqrt(n * n + a * a)))
        }
        static PointInRect(t, e) {
            return null === e ? null : e.x >= t.left && e.x <= t.width + t.left && e.y >= t.top && e.y <= t.top + t.height ? e : null
        }
        static GetRotatedPoint(t, e, i) {
            return {
                x: t.x * Math.cos(i) + t.y * Math.sin(i) + e.x,
                y: t.y * Math.cos(i) - t.x * Math.sin(i) + e.y
            }
        }
        static LimitPointToCircle(t, e, i) {
            if (o.GetDistanceBetweenTwoPoint(t, i) <= e)
                return i;
            const n = t.x
              , s = t.y
              , a = i.x
              , r = i.y;
            let h = Math.sqrt(Math.pow(e, 2) * Math.pow(n - a, 2) / (Math.pow(n - a, 2) + Math.pow(s - r, 2))) + n;
            i.x < 0 && (h *= -1);
            let l = (h - n) * (s - r) / (n - a) + s;
            return n - a + s === 0 && (l = e),
            {
                x: h,
                y: l
            }
        }
        static GetIntersectBetweenTwoSegment(t, e, i) {
            return o.PointInRect(t, o.GetIntersectBeetwenTwoLine(e, i))
        }
        static GetIntersectBeetwenTwoLine(t, e) {
            const i = t[0].y - t[1].y
              , n = e[0].y - e[1].y
              , s = t[1].x - t[0].x
              , a = e[1].x - e[0].x
              , r = t[0].x * t[1].y - t[1].x * t[0].y
              , o = e[0].x * e[1].y - e[1].x * e[0].y
              , h = i * o - n * r
              , l = s * o - a * r
              , c = -(r * a - o * s) / (i * a - n * s)
              , d = -(i * o - n * r) / (i * a - n * s);
            if (isFinite(c) && isFinite(d))
                return {
                    x: c,
                    y: d
                };
            if (Math.abs(h - l) < .1)
                throw new Error("Segment included");
            return null
        }
        static GetCordsFromTwoPoint(t, e) {
            const i = Math.abs(t.x - e.x)
              , n = Math.abs(t.y - e.y)
              , s = Math.max(i, n)
              , a = [t];
            function r(t, e, i, n, s) {
                return e > t ? t + s * (i / n) : e < t ? t - s * (i / n) : t
            }
            for (let o = 1; o <= s; o += 1)
                a.push({
                    x: r(t.x, e.x, i, s, o),
                    y: r(t.y, e.y, n, s, o)
                });
            return a
        }
    }
    class h extends n {
        constructor(t, e, i) {
            super(t, i),
            this.copiedElement = null,
            this.isLoad = !1,
            this.element = e,
            this.element.classList.add("stf__item"),
            this.element.classList.add("--" + i)
        }
        draw(t) {
            const e = t || this.nowDrawingDensity
              , i = this.render.convertToGlobal(this.state.position)
              , n = this.render.getRect().pageWidth
              , s = this.render.getRect().height;
            this.element.classList.remove("--simple"),
            this.element.style.display = "block",
            this.element.style.left = "0",
            this.element.style.top = "0",
            this.element.style.width = n + "px",
            this.element.style.height = s + "px",
            "hard" === e ? this.drawHard() : this.drawSoft(i)
        }
        drawHard() {
            const t = this.render.getRect().left + this.render.getRect().width / 2;
            this.element.style.backfaceVisibility = "hidden",
            this.element.style.setProperty("-webkit-backface-visibility", "hidden");
            const e = this.state.hardDrawingAngle;
            0 === this.orientation ? (this.element.style.transformOrigin = this.render.getRect().pageWidth + "px 0",
            this.element.style.transform = "translate3d(0px, 0px, 0) rotateY(" + e + "deg)") : (this.element.style.transformOrigin = "0 0",
            this.element.style.transform = "translate3d(" + t + "px, 0px, 0) rotateY(" + e + "deg)"),
            this.element.style.clipPath = "none",
            this.element.style.setProperty("-webkit-clip-path", "none")
        }
        drawSoft(t) {
            this.element.style.transformOrigin = "0 0";
            let e = "polygon( ";
            for (const t of this.state.area)
                if (null !== t) {
                    let i = 1 === this.render.getDirection() ? {
                        x: -t.x + this.state.position.x,
                        y: t.y - this.state.position.y
                    } : {
                        x: t.x - this.state.position.x,
                        y: t.y - this.state.position.y
                    };
                    i = o.GetRotatedPoint(i, {
                        x: 0,
                        y: 0
                    }, this.state.angle),
                    e += i.x + "px " + i.y + "px, "
                }
            e = e.slice(0, -2),
            e += ")",
            this.render.isSafari() && 0 === this.state.angle ? this.element.style.transform = "translate(" + t.x + "px, " + t.y + "px)" : this.element.style.transform = "translate3d(" + t.x + "px, " + t.y + "px, 0) rotate(" + this.state.angle + "rad)",
            this.element.style.clipPath = e,
            this.element.style.setProperty("-webkit-clip-path", e)
        }
        simpleDraw(t) {
            if (this.element.classList.contains("--simple"))
                return;
            null === this.copiedElement && (this.copiedElement = this.element.cloneNode(!0),
            this.element.parentElement.appendChild(this.copiedElement));
            const e = this.render.getRect()
              , i = e.pageWidth
              , n = e.height
              , s = 1 === t ? e.left + e.pageWidth : e.left
              , a = e.top;
            this.element.classList.add("--simple"),
            this.copiedElement.style.cssText = "position: absolute; display: block; height: " + n + "px; left: " + s + "px; top: " + a + "px; width: " + i + "px; z-index: " + (this.render.getSettings().startZIndex + 1) + ";",
            this.element.style.cssText = "display: none"
        }
        clearSaved() {
            this.element.classList.remove("--simple"),
            null !== this.copiedElement && (this.copiedElement.remove(),
            this.copiedElement = null)
        }
        getElement() {
            return this.element
        }
        load() {
            this.isLoad = !0
        }
        setOrientation(t) {
            super.setOrientation(t),
            this.element.classList.remove("--left", "--right"),
            this.element.classList.add(1 === t ? "--right" : "--left")
        }
        setDrawingDensity(t) {
            this.element.classList.remove("--soft", "--hard"),
            this.element.classList.add("--" + t),
            super.setDrawingDensity(t)
        }
    }
    class l extends a {
        constructor(t, e, i, n) {
            super(t, e),
            this.element = i,
            this.pagesElement = n
        }
        load() {
            for (const t of this.pagesElement) {
                const e = new h(this.render,t,"hard" === t.dataset.density ? "hard" : "soft");
                e.load(),
                this.pages.push(e)
            }
            this.createSpread()
        }
    }
    class c {
        constructor(t, e, i, n) {
            this.direction = t,
            this.corner = e,
            this.topIntersectPoint = null,
            this.sideIntersectPoint = null,
            this.bottomIntersectPoint = null,
            this.pageWidth = parseInt(i, 10),
            this.pageHeight = parseInt(n, 10)
        }
        calc(t) {
            try {
                return this.position = this.calcAngleAndPosition(t),
                this.calculateIntersectPoint(this.position),
                !0
            } catch (t) {
                return !1
            }
        }
        getFlippingClipArea() {
            const t = [];
            let e = !1;
            return t.push(this.rect.topLeft),
            t.push(this.topIntersectPoint),
            null === this.sideIntersectPoint ? e = !0 : (t.push(this.sideIntersectPoint),
            null === this.bottomIntersectPoint && (e = !1)),
            t.push(this.bottomIntersectPoint),
            (e || "bottom" === this.corner) && t.push(this.rect.bottomLeft),
            t
        }
        getBottomClipArea() {
            const t = [];
            return t.push(this.topIntersectPoint),
            "top" === this.corner ? t.push({
                x: this.pageWidth,
                y: 0
            }) : (null !== this.topIntersectPoint && t.push({
                x: this.pageWidth,
                y: 0
            }),
            t.push({
                x: this.pageWidth,
                y: this.pageHeight
            })),
            null !== this.sideIntersectPoint ? o.GetDistanceBetweenTwoPoint(this.sideIntersectPoint, this.topIntersectPoint) >= 10 && t.push(this.sideIntersectPoint) : "top" === this.corner && t.push({
                x: this.pageWidth,
                y: this.pageHeight
            }),
            t.push(this.bottomIntersectPoint),
            t.push(this.topIntersectPoint),
            t
        }
        getAngle() {
            return 0 === this.direction ? -this.angle : this.angle
        }
        getRect() {
            return this.rect
        }
        getPosition() {
            return this.position
        }
        getActiveCorner() {
            return 0 === this.direction ? this.rect.topLeft : this.rect.topRight
        }
        getDirection() {
            return this.direction
        }
        getFlippingProgress() {
            return Math.abs((this.position.x - this.pageWidth) / (2 * this.pageWidth) * 100)
        }
        getCorner() {
            return this.corner
        }
        getBottomPagePosition() {
            return 1 === this.direction ? {
                x: this.pageWidth,
                y: 0
            } : {
                x: 0,
                y: 0
            }
        }
        getShadowStartPoint() {
            return "top" === this.corner ? this.topIntersectPoint : null !== this.sideIntersectPoint ? this.sideIntersectPoint : this.topIntersectPoint
        }
        getShadowAngle() {
            const t = o.GetAngleBetweenTwoLine(this.getSegmentToShadowLine(), [{
                x: 0,
                y: 0
            }, {
                x: this.pageWidth,
                y: 0
            }]);
            return 0 === this.direction ? t : Math.PI - t
        }
        calcAngleAndPosition(t) {
            let e = t;
            if (this.updateAngleAndGeometry(e),
            e = "top" === this.corner ? this.checkPositionAtCenterLine(e, {
                x: 0,
                y: 0
            }, {
                x: 0,
                y: this.pageHeight
            }) : this.checkPositionAtCenterLine(e, {
                x: 0,
                y: this.pageHeight
            }, {
                x: 0,
                y: 0
            }),
            Math.abs(e.x - this.pageWidth) < 1 && Math.abs(e.y) < 1)
                throw new Error("Point is too small");
            return e
        }
        updateAngleAndGeometry(t) {
            this.angle = this.calculateAngle(t),
            this.rect = this.getPageRect(t)
        }
        calculateAngle(t) {
            const e = this.pageWidth - t.x + 1
              , i = "bottom" === this.corner ? this.pageHeight - t.y : t.y;
            let n = 2 * Math.acos(e / Math.sqrt(i * i + e * e));
            i < 0 && (n = -n);
            const s = Math.PI - n;
            if (!isFinite(n) || s >= 0 && s < .003)
                throw new Error("The G point is too small");
            return "bottom" === this.corner && (n = -n),
            n
        }
        getPageRect(t) {
            return "top" === this.corner ? this.getRectFromBasePoint([{
                x: 0,
                y: 0
            }, {
                x: this.pageWidth,
                y: 0
            }, {
                x: 0,
                y: this.pageHeight
            }, {
                x: this.pageWidth,
                y: this.pageHeight
            }], t) : this.getRectFromBasePoint([{
                x: 0,
                y: -this.pageHeight
            }, {
                x: this.pageWidth,
                y: -this.pageHeight
            }, {
                x: 0,
                y: 0
            }, {
                x: this.pageWidth,
                y: 0
            }], t)
        }
        getRectFromBasePoint(t, e) {
            return {
                topLeft: this.getRotatedPoint(t[0], e),
                topRight: this.getRotatedPoint(t[1], e),
                bottomLeft: this.getRotatedPoint(t[2], e),
                bottomRight: this.getRotatedPoint(t[3], e)
            }
        }
        getRotatedPoint(t, e) {
            return {
                x: t.x * Math.cos(this.angle) + t.y * Math.sin(this.angle) + e.x,
                y: t.y * Math.cos(this.angle) - t.x * Math.sin(this.angle) + e.y
            }
        }
        calculateIntersectPoint(t) {
            const e = {
                left: -1,
                top: -1,
                width: this.pageWidth + 2,
                height: this.pageHeight + 2
            };
            "top" === this.corner ? (this.topIntersectPoint = o.GetIntersectBetweenTwoSegment(e, [t, this.rect.topRight], [{
                x: 0,
                y: 0
            }, {
                x: this.pageWidth,
                y: 0
            }]),
            this.sideIntersectPoint = o.GetIntersectBetweenTwoSegment(e, [t, this.rect.bottomLeft], [{
                x: this.pageWidth,
                y: 0
            }, {
                x: this.pageWidth,
                y: this.pageHeight
            }]),
            this.bottomIntersectPoint = o.GetIntersectBetweenTwoSegment(e, [this.rect.bottomLeft, this.rect.bottomRight], [{
                x: 0,
                y: this.pageHeight
            }, {
                x: this.pageWidth,
                y: this.pageHeight
            }])) : (this.topIntersectPoint = o.GetIntersectBetweenTwoSegment(e, [this.rect.topLeft, this.rect.topRight], [{
                x: 0,
                y: 0
            }, {
                x: this.pageWidth,
                y: 0
            }]),
            this.sideIntersectPoint = o.GetIntersectBetweenTwoSegment(e, [t, this.rect.topLeft], [{
                x: this.pageWidth,
                y: 0
            }, {
                x: this.pageWidth,
                y: this.pageHeight
            }]),
            this.bottomIntersectPoint = o.GetIntersectBetweenTwoSegment(e, [this.rect.bottomLeft, this.rect.bottomRight], [{
                x: 0,
                y: this.pageHeight
            }, {
                x: this.pageWidth,
                y: this.pageHeight
            }]))
        }
        checkPositionAtCenterLine(t, e, i) {
            let n = t;
            const s = o.LimitPointToCircle(e, this.pageWidth, n);
            n !== s && (n = s,
            this.updateAngleAndGeometry(n));
            const a = Math.sqrt(Math.pow(this.pageWidth, 2) + Math.pow(this.pageHeight, 2));
            let r = this.rect.bottomRight
              , h = this.rect.topLeft;
            if ("bottom" === this.corner && (r = this.rect.topRight,
            h = this.rect.bottomLeft),
            r.x <= 0) {
                const t = o.LimitPointToCircle(i, a, h);
                t !== n && (n = t,
                this.updateAngleAndGeometry(n))
            }
            return n
        }
        getSegmentToShadowLine() {
            const t = this.getShadowStartPoint();
            return [t, t !== this.sideIntersectPoint && null !== this.sideIntersectPoint ? this.sideIntersectPoint : this.bottomIntersectPoint]
        }
    }
    class d {
        constructor(t, e) {
            this.flippingPage = null,
            this.bottomPage = null,
            this.calc = null,
            this.state = "read",
            this.render = t,
            this.app = e
        }
        fold(t) {
            this.setState("user_fold"),
            null === this.calc && this.start(t),
            this.do(this.render.convertToPage(t))
        }
        flip(t) {
            if (null !== this.calc && this.render.finishAnimation(),
            !this.start(t))
                return;
            const e = this.getBoundsRect();
            this.setState("flipping");
            const i = e.height / 10
              , n = "bottom" === this.calc.getCorner() ? e.height - i : i
              , s = "bottom" === this.calc.getCorner() ? e.height : 0;
            this.calc.calc({
                x: e.pageWidth - i,
                y: n
            }),
            this.animateFlippingTo({
                x: e.pageWidth - i,
                y: n
            }, {
                x: -e.pageWidth,
                y: s
            }, !0)
        }
        start(t) {
            this.reset();
            const e = this.render.convertToBook(t)
              , i = this.getBoundsRect()
              , n = this.getDirectionByPoint(e)
              , s = e.y >= i.height / 2 ? "bottom" : "top";
            if (!this.checkDirection(n))
                return !1;
            try {
                if (this.flippingPage = this.app.getPageCollection().getFlippingPage(n),
                this.bottomPage = this.app.getPageCollection().getBottomPage(n),
                "landscape" === this.render.getOrientation())
                    if (1 === n) {
                        const t = this.app.getPageCollection().nextBy(this.flippingPage);
                        null !== t && this.flippingPage.getDensity() !== t.getDensity() && (this.flippingPage.setDrawingDensity("hard"),
                        t.setDrawingDensity("hard"))
                    } else {
                        const t = this.app.getPageCollection().prevBy(this.flippingPage);
                        null !== t && this.flippingPage.getDensity() !== t.getDensity() && (this.flippingPage.setDrawingDensity("hard"),
                        t.setDrawingDensity("hard"))
                    }
                return this.render.setDirection(n),
                this.calc = new c(n,s,i.pageWidth.toString(10),i.height.toString(10)),
                !0
            } catch (t) {
                return !1
            }
        }
        do(t) {
            if (null !== this.calc && this.calc.calc(t)) {
                const t = this.calc.getFlippingProgress();
                this.bottomPage.setArea(this.calc.getBottomClipArea()),
                this.bottomPage.setPosition(this.calc.getBottomPagePosition()),
                this.bottomPage.setAngle(0),
                this.bottomPage.setHardAngle(0),
                this.flippingPage.setArea(this.calc.getFlippingClipArea()),
                this.flippingPage.setPosition(this.calc.getActiveCorner()),
                this.flippingPage.setAngle(this.calc.getAngle()),
                0 === this.calc.getDirection() ? this.flippingPage.setHardAngle(90 * (200 - 2 * t) / 100) : this.flippingPage.setHardAngle(-90 * (200 - 2 * t) / 100),
                this.render.setPageRect(this.calc.getRect()),
                this.render.setBottomPage(this.bottomPage),
                this.render.setFlippingPage(this.flippingPage),
                this.render.setShadowData(this.calc.getShadowStartPoint(), this.calc.getShadowAngle(), t, this.calc.getDirection())
            }
        }
        flipToPage(t, e) {
            const i = this.app.getPageCollection().getCurrentSpreadIndex()
              , n = this.app.getPageCollection().getSpreadIndexByPage(t);
            try {
                n > i && (this.app.getPageCollection().setCurrentSpreadIndex(n - 1),
                this.flipNext(e)),
                n < i && (this.app.getPageCollection().setCurrentSpreadIndex(n + 1),
                this.flipPrev(e))
            } catch (t) {}
        }
        flipNext(t) {
            this.flip({
                x: this.render.getRect().left + 2 * this.render.getRect().pageWidth,
                y: "top" === t ? 1 : this.render.getRect().height - 2
            })
        }
        flipPrev(t) {
            this.flip({
                x: 10,
                y: "top" === t ? 1 : this.render.getRect().height - 2
            })
        }
        stopMove() {
            if (null === this.calc)
                return;
            const t = this.calc.getPosition()
              , e = this.getBoundsRect()
              , i = "bottom" === this.calc.getCorner() ? e.height : 0;
            t.x <= 0 ? this.animateFlippingTo(t, {
                x: -e.pageWidth,
                y: i
            }, !0) : this.animateFlippingTo(t, {
                x: e.pageWidth,
                y: i
            }, !1)
        }
        showCorner(t) {
            if (!this.checkState("read", "fold_corner"))
                return;
            const e = this.getBoundsRect()
              , i = e.pageWidth
              , n = Math.sqrt(Math.pow(i, 2) + Math.pow(e.height, 2)) / 5
              , s = this.render.convertToBook(t);
            if (s.x > 0 && s.y > 0 && s.x < e.width && s.y < e.height && (s.x < n || s.x > e.width - n) && (s.y < n || s.y > e.height - n))
                if (null === this.calc) {
                    if (!this.start(t))
                        return;
                    this.setState("fold_corner"),
                    this.calc.calc({
                        x: i - 1,
                        y: 1
                    });
                    const n = 50
                      , s = "bottom" === this.calc.getCorner() ? e.height - 1 : 1
                      , a = "bottom" === this.calc.getCorner() ? e.height - n : n;
                    this.animateFlippingTo({
                        x: i - 1,
                        y: s
                    }, {
                        x: i - n,
                        y: a
                    }, !1, !1)
                } else
                    this.do(this.render.convertToPage(t));
            else
                this.setState("read"),
                this.render.finishAnimation(),
                this.stopMove()
        }
        animateFlippingTo(t, e, i, n=!0) {
            const s = o.GetCordsFromTwoPoint(t, e)
              , a = [];
            for (const t of s)
                a.push(()=>this.do(t));
            const r = this.getAnimationDuration(s.length);
            this.render.startAnimation(a, r, ()=>{
                this.calc && (i && (1 === this.calc.getDirection() ? this.app.turnToPrevPage() : this.app.turnToNextPage()),
                n && (this.render.setBottomPage(null),
                this.render.setFlippingPage(null),
                this.render.clearShadow(),
                this.setState("read"),
                this.reset()))
            }
            )
        }
        getCalculation() {
            return this.calc
        }
        getState() {
            return this.state
        }
        setState(t) {
            this.state !== t && (this.app.updateState(t),
            this.state = t)
        }
        getDirectionByPoint(t) {
            const e = this.getBoundsRect();
            if ("portrait" === this.render.getOrientation()) {
                if (t.x - e.pageWidth <= e.width / 5)
                    return 1
            } else if (t.x < e.width / 2)
                return 1;
            return 0
        }
        getAnimationDuration(t) {
            const e = this.app.getSettings().flippingTime;
            return t >= 1e3 ? e : t / 1e3 * e
        }
        checkDirection(t) {
            return 0 === t ? this.app.getCurrentPageIndex() < this.app.getPageCount() - 1 : this.app.getCurrentPageIndex() >= 1
        }
        reset() {
            this.calc = null,
            this.flippingPage = null,
            this.bottomPage = null
        }
        getBoundsRect() {
            return this.render.getRect()
        }
        checkState(...t) {
            for (const e of t)
                if (this.state === e)
                    return !0;
            return !1
        }
    }
    class g {
        constructor(t, e) {
            this.leftPage = null,
            this.rightPage = null,
            this.flippingPage = null,
            this.bottomPage = null,
            this.direction = null,
            this.orientation = null,
            this.shadow = null,
            this.animation = null,
            this.pageRect = null,
            this.boundsRect = null,
            this.timer = 0,
            this.safari = !1,
            this.setting = e,
            this.app = t;
            const i = new RegExp("Version\\/[\\d\\.]+.*Safari/");
            this.safari = null !== i.exec(window.navigator.userAgent)
        }
        render(t) {
            if (null !== this.animation) {
                const e = Math.round((t - this.animation.startedAt) / this.animation.durationFrame);
                e < this.animation.frames.length ? this.animation.frames[e]() : (this.animation.onAnimateEnd(),
                this.animation = null)
            }
            this.timer = t,
            this.drawFrame()
        }
        start() {
            this.update();
            const t = e=>{
                this.render(e),
                requestAnimationFrame(t)
            }
            ;
            requestAnimationFrame(t)
        }
        startAnimation(t, e, i) {
            this.finishAnimation(),
            this.animation = {
                frames: t,
                duration: e,
                durationFrame: e / t.length,
                onAnimateEnd: i,
                startedAt: this.timer
            }
        }
        finishAnimation() {
            null !== this.animation && (this.animation.frames[this.animation.frames.length - 1](),
            null !== this.animation.onAnimateEnd && this.animation.onAnimateEnd()),
            this.animation = null
        }
        update() {
            this.boundsRect = null;
            const t = this.calculateBoundsRect();
            this.orientation !== t && (this.orientation = t,
            this.app.updateOrientation(t))
        }
        calculateBoundsRect() {
            let t = "landscape";
            const e = this.getBlockWidth()
              , i = e / 2
              , n = this.getBlockHeight() / 2
              , s = this.setting.width / this.setting.height;
            let a = this.setting.width
              , r = this.setting.height
              , o = i - a;
            return "stretch" === this.setting.size ? (e < 2 * this.setting.minWidth && this.app.getSettings().usePortrait && (t = "portrait"),
            a = "portrait" === t ? this.getBlockWidth() : this.getBlockWidth() / 2,
            a > this.setting.maxWidth && (a = this.setting.maxWidth),
            r = a / s,
            r > this.getBlockHeight() && (r = this.getBlockHeight(),
            a = r * s),
            o = "portrait" === t ? i - a / 2 - a : i - a) : e < 2 * a && this.app.getSettings().usePortrait && (t = "portrait",
            o = i - a / 2 - a),
            this.boundsRect = {
                left: o,
                top: n - r / 2,
                width: 2 * a,
                height: r,
                pageWidth: a
            },
            t
        }
        setShadowData(t, e, i, n) {
            if (!this.app.getSettings().drawShadow)
                return;
            const s = 100 * this.getSettings().maxShadowOpacity;
            this.shadow = {
                pos: t,
                angle: e,
                width: 3 * this.getRect().pageWidth / 4 * i / 100,
                opacity: (100 - i) * s / 100 / 100,
                direction: n,
                progress: 2 * i
            }
        }
        clearShadow() {
            this.shadow = null
        }
        getBlockWidth() {
            return this.app.getUI().getDistElement().offsetWidth
        }
        getBlockHeight() {
            return this.app.getUI().getDistElement().offsetHeight
        }
        getDirection() {
            return this.direction
        }
        getRect() {
            return null === this.boundsRect && this.calculateBoundsRect(),
            this.boundsRect
        }
        getSettings() {
            return this.app.getSettings()
        }
        getOrientation() {
            return this.orientation
        }
        setPageRect(t) {
            this.pageRect = t
        }
        setDirection(t) {
            this.direction = t
        }
        setRightPage(t) {
            null !== t && t.setOrientation(1),
            this.rightPage = t
        }
        setLeftPage(t) {
            null !== t && t.setOrientation(0),
            this.leftPage = t
        }
        setBottomPage(t) {
            null !== t && t.setOrientation(1 === this.direction ? 0 : 1),
            this.bottomPage = t
        }
        setFlippingPage(t) {
            null !== t && t.setOrientation(0 === this.direction && "portrait" !== this.orientation ? 0 : 1),
            this.flippingPage = t
        }
        convertToBook(t) {
            const e = this.getRect();
            return {
                x: t.x - e.left,
                y: t.y - e.top
            }
        }
        isSafari() {
            return this.safari
        }
        convertToPage(t, e) {
            e || (e = this.direction);
            const i = this.getRect();
            return {
                x: 0 === e ? t.x - i.left - i.width / 2 : i.width / 2 - t.x + i.left,
                y: t.y - i.top
            }
        }
        convertToGlobal(t, e) {
            if (e || (e = this.direction),
            null == t)
                return null;
            const i = this.getRect();
            return {
                x: 0 === e ? t.x + i.left + i.width / 2 : i.width / 2 - t.x + i.left,
                y: t.y + i.top
            }
        }
        convertRectToGlobal(t, e) {
            return e || (e = this.direction),
            {
                topLeft: this.convertToGlobal(t.topLeft, e),
                topRight: this.convertToGlobal(t.topRight, e),
                bottomLeft: this.convertToGlobal(t.bottomLeft, e),
                bottomRight: this.convertToGlobal(t.bottomRight, e)
            }
        }
    }
    class p extends g {
        constructor(t, e, i) {
            super(t, e),
            this.canvas = i,
            this.ctx = i.getContext("2d")
        }
        getContext() {
            return this.ctx
        }
        drawFrame() {
            this.clear(),
            "portrait" !== this.orientation && null != this.leftPage && this.leftPage.simpleDraw(0),
            null != this.rightPage && this.rightPage.simpleDraw(1),
            null != this.bottomPage && this.bottomPage.draw(),
            this.drawBookShadow(),
            null != this.flippingPage && this.flippingPage.draw(),
            null != this.shadow && (this.drawOuterShadow(),
            this.drawInnerShadow());
            const t = this.getRect();
            "portrait" === this.orientation && (this.ctx.beginPath(),
            this.ctx.rect(t.left + t.pageWidth, t.top, t.width, t.height),
            this.ctx.clip())
        }
        drawBookShadow() {
            const t = this.getRect();
            this.ctx.save(),
            this.ctx.beginPath();
            const e = t.width / 20;
            this.ctx.rect(t.left, t.top, t.width, t.height);
            const i = {
                x: t.left + t.width / 2 - e / 2,
                y: 0
            };
            this.ctx.translate(i.x, i.y);
            const n = this.ctx.createLinearGradient(0, 0, e, 0);
            n.addColorStop(0, "rgba(0, 0, 0, 0)"),
            n.addColorStop(.4, "rgba(0, 0, 0, 0.2)"),
            n.addColorStop(.49, "rgba(0, 0, 0, 0.1)"),
            n.addColorStop(.5, "rgba(0, 0, 0, 0.5)"),
            n.addColorStop(.51, "rgba(0, 0, 0, 0.4)"),
            n.addColorStop(1, "rgba(0, 0, 0, 0)"),
            this.ctx.clip(),
            this.ctx.fillStyle = n,
            this.ctx.fillRect(0, 0, e, 2 * t.height),
            this.ctx.restore()
        }
        drawOuterShadow() {
            const t = this.getRect();
            this.ctx.save(),
            this.ctx.beginPath(),
            this.ctx.rect(t.left, t.top, t.width, t.height);
            const e = this.convertToGlobal({
                x: this.shadow.pos.x,
                y: this.shadow.pos.y
            });
            this.ctx.translate(e.x, e.y),
            this.ctx.rotate(Math.PI + this.shadow.angle + Math.PI / 2);
            const i = this.ctx.createLinearGradient(0, 0, this.shadow.width, 0);
            0 === this.shadow.direction ? (this.ctx.translate(0, -100),
            i.addColorStop(0, "rgba(0, 0, 0, " + this.shadow.opacity + ")"),
            i.addColorStop(1, "rgba(0, 0, 0, 0)")) : (this.ctx.translate(-this.shadow.width, -100),
            i.addColorStop(0, "rgba(0, 0, 0, 0)"),
            i.addColorStop(1, "rgba(0, 0, 0, " + this.shadow.opacity + ")")),
            this.ctx.clip(),
            this.ctx.fillStyle = i,
            this.ctx.fillRect(0, 0, this.shadow.width, 2 * t.height),
            this.ctx.restore()
        }
        drawInnerShadow() {
            const t = this.getRect();
            this.ctx.save(),
            this.ctx.beginPath();
            const e = this.convertToGlobal({
                x: this.shadow.pos.x,
                y: this.shadow.pos.y
            })
              , i = this.convertRectToGlobal(this.pageRect);
            this.ctx.moveTo(i.topLeft.x, i.topLeft.y),
            this.ctx.lineTo(i.topRight.x, i.topRight.y),
            this.ctx.lineTo(i.bottomRight.x, i.bottomRight.y),
            this.ctx.lineTo(i.bottomLeft.x, i.bottomLeft.y),
            this.ctx.translate(e.x, e.y),
            this.ctx.rotate(Math.PI + this.shadow.angle + Math.PI / 2);
            const n = 3 * this.shadow.width / 4
              , s = this.ctx.createLinearGradient(0, 0, n, 0);
            0 === this.shadow.direction ? (this.ctx.translate(-n, -100),
            s.addColorStop(1, "rgba(0, 0, 0, " + this.shadow.opacity + ")"),
            s.addColorStop(.9, "rgba(0, 0, 0, 0.05)"),
            s.addColorStop(.7, "rgba(0, 0, 0, " + this.shadow.opacity + ")"),
            s.addColorStop(0, "rgba(0, 0, 0, 0)")) : (this.ctx.translate(0, -100),
            s.addColorStop(0, "rgba(0, 0, 0, " + this.shadow.opacity + ")"),
            s.addColorStop(.1, "rgba(0, 0, 0, 0.05)"),
            s.addColorStop(.3, "rgba(0, 0, 0, " + this.shadow.opacity + ")"),
            s.addColorStop(1, "rgba(0, 0, 0, 0)")),
            this.ctx.clip(),
            this.ctx.fillStyle = s,
            this.ctx.fillRect(0, 0, n, 2 * t.height),
            this.ctx.restore()
        }
        clear() {
            this.ctx.fillStyle = "white",
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }
    class u {
        constructor(t, e, i) {
            this.touchPoint = null,
            this.swipeTimeout = 250,
            this.onResize = ()=>{
                this.update()
            }
            ,
            this.onMouseDown = t=>{
                const e = this.getMousePos(t.clientX, t.clientY);
                this.app.startUserTouch(e),
                t.preventDefault()
            }
            ,
            this.onTouchStart = t=>{
                if (t.changedTouches.length > 0) {
                    const e = t.changedTouches[0]
                      , i = this.getMousePos(e.clientX, e.clientY);
                    this.touchPoint = {
                        point: i,
                        time: Date.now()
                    },
                    setTimeout(()=>{
                        null !== this.touchPoint && this.app.startUserTouch(i)
                    }
                    , this.swipeTimeout),
                    this.app.getSettings().mobileScrollSupport || t.preventDefault()
                }
            }
            ,
            this.onMouseUp = t=>{
                const e = this.getMousePos(t.clientX, t.clientY);
                this.app.userStop(e)
            }
            ,
            this.onMouseMove = t=>{
                const e = this.getMousePos(t.clientX, t.clientY);
                this.app.userMove(e, !1)
            }
            ,
            this.onTouchMove = t=>{
                if (t.changedTouches.length > 0) {
                    const e = t.changedTouches[0]
                      , i = this.getMousePos(e.clientX, e.clientY);
                    this.app.getSettings().mobileScrollSupport ? (null !== this.touchPoint && (Math.abs(this.touchPoint.point.x - i.x) > 10 || "read" !== this.app.getState()) && t.cancelable && this.app.userMove(i, !0),
                    "read" !== this.app.getState() && t.preventDefault()) : this.app.userMove(i, !0)
                }
            }
            ,
            this.onTouchEnd = t=>{
                if (t.changedTouches.length > 0) {
                    const e = t.changedTouches[0]
                      , i = this.getMousePos(e.clientX, e.clientY);
                    let n = !1;
                    if (null !== this.touchPoint) {
                        const t = i.x - this.touchPoint.point.x
                          , e = Math.abs(i.y - this.touchPoint.point.y);
                        Math.abs(t) > this.swipeDistance && e < 2 * this.swipeDistance && Date.now() - this.touchPoint.time < this.swipeTimeout && (t > 0 ? this.app.flipPrev(this.touchPoint.point.y < this.app.getRender().getRect().height / 2 ? "top" : "bottom") : this.app.flipNext(this.touchPoint.point.y < this.app.getRender().getRect().height / 2 ? "top" : "bottom"),
                        n = !0),
                        this.touchPoint = null
                    }
                    this.app.userStop(i, n)
                }
            }
            ,
            t.classList.add("stf__parent"),
            t.insertAdjacentHTML("afterbegin", '<div class="stf__wrapper"></div>'),
            this.wrapper = t.querySelector(".stf__wrapper"),
            this.app = e;
            const n = this.app.getSettings().usePortrait ? 1 : 2;
            t.style.minWidth = i.minWidth * n + "px",
            t.style.minHeight = i.minHeight * n + "px",
            "fixed" === i.size && (t.style.minWidth = i.width * n + "px",
            t.style.minHeight = i.height * n + "px"),
            i.autoSize && (t.style.width = "100%",
            t.style.maxWidth = 2 * i.maxWidth + "px"),
            t.style.display = "block",
            window.addEventListener("resize", this.onResize, !1),
            this.swipeDistance = i.swipeDistance
        }
        destroy() {
            this.removeHandlers(),
            this.distElement.remove(),
            this.wrapper.remove()
        }
        getDistElement() {
            return this.distElement
        }
        getWrapper() {
            return this.wrapper
        }
        setOrientationStyle(t) {
            this.wrapper.classList.remove("--portrait", "--landscape"),
            "portrait" === t ? (this.app.getSettings().autoSize && (this.wrapper.style.paddingBottom = this.app.getSettings().height / this.app.getSettings().width * 100 + "%"),
            this.wrapper.classList.add("--portrait")) : (this.app.getSettings().autoSize && (this.wrapper.style.paddingBottom = this.app.getSettings().height / (2 * this.app.getSettings().width) * 100 + "%"),
            this.wrapper.classList.add("--landscape")),
            this.update()
        }
        removeHandlers() {
            window.removeEventListener("resize", this.onResize),
            this.distElement.removeEventListener("mousedown", this.onMouseDown),
            this.distElement.removeEventListener("touchstart", this.onTouchStart),
            window.removeEventListener("mousemove", this.onMouseMove),
            window.removeEventListener("touchmove", this.onTouchMove),
            window.removeEventListener("mouseup", this.onMouseUp),
            window.removeEventListener("touchend", this.onTouchEnd)
        }
        setHandlers() {
            this.distElement.addEventListener("mousedown", this.onMouseDown),
            this.distElement.addEventListener("touchstart", this.onTouchStart),
            window.addEventListener("mousemove", this.onMouseMove),
            window.addEventListener("touchmove", this.onTouchMove, {
                passive: !this.app.getSettings().mobileScrollSupport
            }),
            window.addEventListener("mouseup", this.onMouseUp),
            window.addEventListener("touchend", this.onTouchEnd)
        }
        getMousePos(t, e) {
            const i = this.distElement.getBoundingClientRect();
            return {
                x: t - i.left,
                y: e - i.top
            }
        }
    }
    class m extends u {
        constructor(t, e, i, n) {
            super(t, e, i),
            this.wrapper.insertAdjacentHTML("afterbegin", '<div class="stf__block"></div>'),
            this.distElement = t.querySelector(".stf__block");
            for (const t of n)
                this.distElement.appendChild(t);
            this.setHandlers()
        }
        updateItems(t) {
            this.removeHandlers(),
            this.distElement.innerHTML = "";
            for (const e of t)
                this.distElement.appendChild(e);
            this.setHandlers()
        }
        update() {
            this.app.getRender().update()
        }
    }
    class f extends u {
        constructor(t, e, i) {
            super(t, e, i),
            this.wrapper.innerHTML = '<canvas class="stf__canvas"></canvas>',
            this.canvas = t.querySelectorAll("canvas")[0],
            this.distElement = this.canvas,
            this.resizeCanvas(),
            this.setHandlers()
        }
        resizeCanvas() {
            const t = getComputedStyle(this.canvas)
              , e = parseInt(t.getPropertyValue("width"), 10)
              , i = parseInt(t.getPropertyValue("height"), 10);
            this.canvas.width = e,
            this.canvas.height = i
        }
        getCanvas() {
            return this.canvas
        }
        update() {
            this.resizeCanvas(),
            this.app.getRender().update()
        }
    }
    class b extends g {
        constructor(t, e, i, n) {
            super(t, e),
            this.outerShadow = null,
            this.innerShadow = null,
            this.hardShadow = null,
            this.hardInnerShadow = null,
            this.element = i,
            this.items = n
        }
        clearShadow() {
            super.clearShadow(),
            this.outerShadow.remove(),
            this.innerShadow.remove(),
            this.hardShadow.remove(),
            this.hardInnerShadow.remove(),
            this.outerShadow = null,
            this.innerShadow = null,
            this.hardShadow = null,
            this.hardInnerShadow = null
        }
        setShadowData(t, e, i, n) {
            super.setShadowData(t, e, i, n),
            null === this.outerShadow && (this.element.insertAdjacentHTML("beforeend", '<div class="stf__outerShadow"></div>'),
            this.outerShadow = this.element.querySelector(".stf__outerShadow"),
            this.outerShadow.style.zIndex = (this.getSettings().startZIndex + 10).toString(10)),
            null === this.innerShadow && (this.element.insertAdjacentHTML("beforeend", '<div class="stf__innerShadow"></div>'),
            this.innerShadow = this.element.querySelector(".stf__innerShadow"),
            this.innerShadow.style.zIndex = (this.getSettings().startZIndex + 10).toString(10)),
            null === this.hardShadow && (this.element.insertAdjacentHTML("beforeend", '<div class="stf__hardShadow"></div>'),
            this.hardShadow = this.element.querySelector(".stf__hardShadow"),
            this.hardShadow.style.zIndex = (this.getSettings().startZIndex + 4).toString(10)),
            null === this.hardInnerShadow && (this.element.insertAdjacentHTML("beforeend", '<div class="stf__hardInnerShadow"></div>'),
            this.hardInnerShadow = this.element.querySelector(".stf__hardInnerShadow"),
            this.hardInnerShadow.style.zIndex = (this.getSettings().startZIndex + 4).toString(10))
        }
        drawHardInnerShadow() {
            const t = this.getRect()
              , e = this.shadow.progress > 100 ? 200 - this.shadow.progress : this.shadow.progress;
            let i = (100 - e) * (2.5 * t.pageWidth) / 100 + 20;
            i > t.pageWidth && (i = t.pageWidth),
            this.hardInnerShadow.style.width = i + "px",
            this.hardInnerShadow.style.height = t.height + "px",
            this.hardInnerShadow.style.background = `linear-gradient(to right,\n            rgba(0, 0, 0, ${this.shadow.opacity * e / 100}) 5%,\n            rgba(0, 0, 0, 0) 100%)`,
            this.hardInnerShadow.style.left = t.left + t.width / 2 + "px",
            this.hardInnerShadow.style.transformOrigin = "0 0",
            this.hardInnerShadow.style.transform = 0 === this.getDirection() && this.shadow.progress > 100 || 1 === this.getDirection() && this.shadow.progress <= 100 ? "translate3d(0, 0, 0)" : "translate3d(0, 0, 0) rotateY(180deg)"
        }
        drawHardOuterShadow() {
            const t = this.getRect();
            let e = (100 - (this.shadow.progress > 100 ? 200 - this.shadow.progress : this.shadow.progress)) * (2.5 * t.pageWidth) / 100 + 20;
            e > t.pageWidth && (e = t.pageWidth),
            this.hardShadow.style.width = e + "px",
            this.hardShadow.style.height = t.height + "px",
            this.hardShadow.style.background = `linear-gradient(to left,\n            rgba(0, 0, 0, ${this.shadow.opacity}) 5%, rgba(0, 0, 0, 0) 100%)`,
            this.hardShadow.style.left = t.left + t.width / 2 + "px",
            this.hardShadow.style.transformOrigin = "0 0",
            this.hardShadow.style.transform = 0 === this.getDirection() && this.shadow.progress > 100 || 1 === this.getDirection() && this.shadow.progress <= 100 ? "translate3d(0, 0, 0) rotateY(180deg)" : "translate3d(0, 0, 0)"
        }
        drawInnerShadow() {
            const t = this.getRect()
              , e = 3 * this.shadow.width / 4
              , i = 0 === this.getDirection() ? e : 0
              , n = 0 === this.getDirection() ? "to left" : "to right"
              , s = this.convertToGlobal(this.shadow.pos)
              , a = this.shadow.angle + 3 * Math.PI / 2;
            this.innerShadow.style.width = e + "px",
            this.innerShadow.style.height = 2 * t.height + "px",
            this.innerShadow.style.background = `linear-gradient(${n},\n            rgba(0, 0, 0, ${this.shadow.opacity}) 5%,\n            rgba(0, 0, 0, 0.05) 15%,\n            rgba(0, 0, 0, ${this.shadow.opacity}) 35%,\n            rgba(0, 0, 0, 0) 100%)`,
            this.innerShadow.style.transformOrigin = i + "px 100px",
            this.innerShadow.style.transform = `translate3d(${s.x - i}px, ${s.y - 100}px, 0) rotate(${a}rad)`;
            const r = [this.pageRect.topLeft, this.pageRect.topRight, this.pageRect.bottomRight, this.pageRect.bottomLeft];
            let h = "polygon( ";
            for (const t of r) {
                let e = 1 === this.getDirection() ? {
                    x: -t.x + this.shadow.pos.x,
                    y: t.y - this.shadow.pos.y
                } : {
                    x: t.x - this.shadow.pos.x,
                    y: t.y - this.shadow.pos.y
                };
                e = o.GetRotatedPoint(e, {
                    x: i,
                    y: 100
                }, a),
                h += e.x + "px " + e.y + "px, "
            }
            h = h.slice(0, -2),
            h += ")",
            this.innerShadow.style.clipPath = h,
            this.innerShadow.style.setProperty("-webkit-clip-path", h)
        }
        drawOuterShadow() {
            const t = this.getRect()
              , e = this.convertToGlobal({
                x: this.shadow.pos.x,
                y: this.shadow.pos.y
            })
              , i = this.shadow.angle + 3 * Math.PI / 2
              , n = 1 === this.getDirection() ? this.shadow.width : 0
              , s = 0 === this.getDirection() ? "to right" : "to left";
            this.outerShadow.style.width = this.shadow.width + "px",
            this.outerShadow.style.height = 2 * t.height + "px",
            this.outerShadow.style.background = `linear-gradient(${s}, rgba(0, 0, 0, ${this.shadow.opacity}), rgba(0, 0, 0, 0))`,
            this.outerShadow.style.transformOrigin = n + "px 100px",
            this.outerShadow.style.transform = `translate3d(${e.x - n}px, ${e.y - 100}px, 0) rotate(${i}rad)`;
            const a = [];
            a.push({
                x: 0,
                y: 0
            }, {
                x: t.pageWidth,
                y: 0
            }, {
                x: t.pageWidth,
                y: t.height
            }, {
                x: 0,
                y: t.height
            });
            let r = "polygon( ";
            for (const t of a)
                if (null !== t) {
                    let e = 1 === this.getDirection() ? {
                        x: -t.x + this.shadow.pos.x,
                        y: t.y - this.shadow.pos.y
                    } : {
                        x: t.x - this.shadow.pos.x,
                        y: t.y - this.shadow.pos.y
                    };
                    e = o.GetRotatedPoint(e, {
                        x: n,
                        y: 100
                    }, i),
                    r += e.x + "px " + e.y + "px, "
                }
            r = r.slice(0, -2),
            r += ")",
            this.outerShadow.style.clipPath = r,
            this.outerShadow.style.setProperty("-webkit-clip-path", r)
        }
        drawLeftPage() {
            null !== this.leftPage && ("portrait" !== this.orientation ? 1 === this.direction && null !== this.flippingPage && "hard" === this.flippingPage.getDrawingDensity() ? (this.leftPage.getElement().style.zIndex = (this.getSettings().startZIndex + 5).toString(10),
            this.flippingPage === this.bottomPage && this.leftPage.clearSaved(),
            this.leftPage.setHardDrawingAngle(180 + this.flippingPage.getHardAngle()),
            this.leftPage.draw(this.flippingPage.getDrawingDensity())) : this.leftPage.simpleDraw(0) : this.leftPage.clearSaved())
        }
        drawRightPage() {
            null !== this.rightPage && (0 === this.direction && null !== this.flippingPage && "hard" === this.flippingPage.getDrawingDensity() ? (this.rightPage.getElement().style.zIndex = (this.getSettings().startZIndex + 5).toString(10),
            this.flippingPage === this.bottomPage && this.rightPage.clearSaved(),
            this.rightPage.setHardDrawingAngle(180 + this.flippingPage.getHardAngle()),
            this.rightPage.draw(this.flippingPage.getDrawingDensity())) : this.rightPage.simpleDraw(1))
        }
        drawBottomPage() {
            if (null === this.bottomPage)
                return;
            const t = null != this.flippingPage ? this.flippingPage.getDrawingDensity() : null;
            "portrait" === this.orientation && 1 === this.direction || (this.bottomPage.getElement().style.zIndex = (this.getSettings().startZIndex + 3).toString(10),
            this.bottomPage.draw(t))
        }
        drawFrame() {
            this.clear(),
            this.drawLeftPage(),
            this.drawRightPage(),
            this.drawBottomPage(),
            null != this.flippingPage && (this.flippingPage.getElement().style.zIndex = (this.getSettings().startZIndex + 5).toString(10),
            this.flippingPage.draw()),
            null != this.shadow && null !== this.flippingPage && ("soft" === this.flippingPage.getDrawingDensity() ? (this.drawOuterShadow(),
            this.drawInnerShadow()) : (this.drawHardOuterShadow(),
            this.drawHardInnerShadow()))
        }
        clear() {
            const t = [];
            this.leftPage && t.push(this.leftPage.getElement()),
            this.rightPage && t.push(this.rightPage.getElement()),
            this.flippingPage && t.push(this.flippingPage.getElement()),
            this.bottomPage && t.push(this.bottomPage.getElement());
            for (const e of this.items)
                t.includes(e) || (e.style.display = "none",
                e.style.zIndex = (this.getSettings().startZIndex + 1).toString(10),
                e.style.transform = "")
        }
        setRightPage(t) {
            null !== this.rightPage && t !== this.rightPage && this.rightPage.clearSaved(),
            super.setRightPage(t)
        }
        setLeftPage(t) {
            null !== this.leftPage && t !== this.rightPage && this.leftPage.clearSaved(),
            super.setLeftPage(t)
        }
        update() {
            super.update(),
            null !== this.rightPage && (this.rightPage.setOrientation(1),
            this.rightPage.clearSaved()),
            null !== this.leftPage && (this.leftPage.setOrientation(0),
            this.leftPage.clearSaved())
        }
    }
    class w {
        constructor() {
            this._default = {
                startPage: 0,
                size: "fixed",
                width: 0,
                height: 0,
                minWidth: 0,
                maxWidth: 0,
                minHeight: 0,
                maxHeight: 0,
                drawShadow: !0,
                flippingTime: 1e3,
                usePortrait: !0,
                startZIndex: 0,
                autoSize: !0,
                maxShadowOpacity: 1,
                showCover: !1,
                mobileScrollSupport: !0,
                swipeDistance: 30
            }
        }
        getSettings(t) {
            const e = this._default;
            if (Object.assign(e, t),
            "stretch" !== e.size && "fixed" !== e.size)
                throw new Error('Invalid size type. Available only "fixed" and "stretch" value');
            if (e.width <= 0 || e.height <= 0)
                throw new Error("Invalid width or height");
            if (e.flippingTime <= 0)
                throw new Error("Invalid flipping time");
            return "stretch" === e.size ? (e.minWidth <= 0 && (e.minWidth = 100),
            e.maxWidth < e.minWidth && (e.maxWidth = 2e3),
            e.minHeight <= 0 && (e.minHeight = 100),
            e.maxHeight < e.minHeight && (e.maxHeight = 2e3)) : (e.minWidth = e.width,
            e.maxWidth = e.width,
            e.minHeight = e.height,
            e.maxHeight = e.height),
            e
        }
    }
    !function(t, e) {
        void 0 === e && (e = {});
        var i = e.insertAt;
        if ("undefined" != typeof document) {
            var n = document.head || document.getElementsByTagName("head")[0]
              , s = document.createElement("style");
            s.type = "text/css",
            "top" === i && n.firstChild ? n.insertBefore(s, n.firstChild) : n.appendChild(s),
            s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(document.createTextNode(t))
        }
    }(".stf__parent {\n  position: relative;\n  display: block;\n  box-sizing: border-box;\n  transform: translateZ(0);\n\n  -ms-touch-action: pan-y;\n  touch-action: pan-y;\n}\n\n.sft__wrapper {\n  position: relative;\n  width: 100%;\n  box-sizing: border-box;\n}\n\n.stf__parent canvas {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n}\n\n.stf__block {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  perspective: 2000px;\n}\n\n.stf__item {\n  display: none;\n  position: absolute;\n  transform-style: preserve-3d;\n}\n\n.stf__outerShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.stf__innerShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.stf__hardShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.stf__hardInnerShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}");
    class y extends class {
        constructor() {
            this.events = new Map
        }
        on(t, e) {
            return this.events.has(t) ? this.events.get(t).push(e) : this.events.set(t, [e]),
            this
        }
        off(t) {
            this.events.delete(t)
        }
        trigger(t, e, i=null) {
            if (this.events.has(t))
                for (const n of this.events.get(t))
                    n({
                        data: i,
                        object: e
                    })
        }
    }
    {
        constructor(t, e) {
            super(),
            this.isUserTouch = !1,
            this.isUserMove = !1,
            this.setting = null,
            this.pages = null,
            this.setting = (new w).getSettings(e),
            this.block = t
        }
        destroy() {
            this.ui.destroy(),
            this.block.remove()
        }
        update() {
            this.render.update(),
            this.pages.show()
        }
        loadFromImages(t) {
            this.ui = new f(this.block,this,this.setting);
            const e = this.ui.getCanvas();
            this.render = new p(this,this.setting,e),
            this.flipController = new d(this.render,this),
            this.pages = new r(this,this.render,t),
            this.pages.load(),
            this.render.start(),
            this.pages.show(this.setting.startPage),
            setTimeout(()=>this.ui.update(), 1)
        }
        loadFromHTML(t) {
            this.ui = new m(this.block,this,this.setting,t),
            this.render = new b(this,this.setting,this.ui.getDistElement(),t),
            this.flipController = new d(this.render,this),
            this.pages = new l(this,this.render,this.ui.getDistElement(),t),
            this.pages.load(),
            this.render.start(),
            this.pages.show(this.setting.startPage),
            setTimeout(()=>this.ui.update(), 1)
        }
        updateFromImages(t) {
            const e = this.pages.getCurrentPageIndex();
            this.pages.destroy(),
            this.pages = new r(this,this.render,t),
            this.pages.load(),
            this.pages.show(e)
        }
        updateFromHtml(t) {
            const e = this.pages.getCurrentPageIndex();
            this.pages.destroy(),
            this.pages = new l(this,this.render,this.ui.getDistElement(),t),
            this.pages.load(),
            this.ui.updateItems(t),
            this.pages.show(e)
        }
        turnToPrevPage() {
            this.pages.showPrev()
        }
        turnToNextPage() {
            this.pages.showNext()
        }
        turnToPage(t) {
            this.pages.show(t)
        }
        flipNext(t="top") {
            this.flipController.flipNext(t)
        }
        flipPrev(t="top") {
            this.flipController.flipPrev(t)
        }
        flip(t, e="top") {
            this.flipController.flipToPage(t, e)
        }
        updateState(t) {
            this.trigger("changeState", this, t)
        }
        updatePageIndex(t) {
            this.trigger("flip", this, t)
        }
        updateOrientation(t) {
            this.ui.setOrientationStyle(t),
            this.update(),
            this.trigger("changeOrientation", this, t)
        }
        getPageCount() {
            return this.pages.getPageCount()
        }
        getCurrentPageIndex() {
            return this.pages.getCurrentPageIndex()
        }
        getPage(t) {
            return this.pages.getPage(t)
        }
        getRender() {
            return this.render
        }
        getFlipController() {
            return this.flipController
        }
        getOrientation() {
            return this.render.getOrientation()
        }
        getBoundsRect() {
            return this.render.getRect()
        }
        getSettings() {
            return this.setting
        }
        getUI() {
            return this.ui
        }
        getState() {
            return this.flipController.getState()
        }
        getPageCollection() {
            return this.pages
        }
        startUserTouch(t) {
            this.mousePosition = t,
            this.isUserTouch = !0,
            this.isUserMove = !1
        }
        userMove(t, e) {
            this.isUserTouch || e ? this.isUserTouch && o.GetDistanceBetweenTwoPoint(this.mousePosition, t) > 5 && (this.isUserMove = !0,
            this.flipController.fold(t)) : this.flipController.showCorner(t)
        }
        userStop(t, e=!1) {
            this.isUserTouch && (this.isUserTouch = !1,
            e || (this.isUserMove ? this.flipController.stopMove() : this.flipController.flip(t)))
        }
    }
    var x = i(0)
      , v = i.n(x)
      , S = i(1)
      , P = i.n(S)
      , E = i(2)
      , _ = i.n(E)
      , I = i(3)
      , R = i.n(I)
      , M = i(4)
      , T = i.n(M);
    i(6);
    v.a.registerLanguage("javascript", P.a),
    v.a.registerLanguage("plaintext", _.a),
    v.a.registerLanguage("xml", R.a),
    v.a.registerLanguage("scss", T.a),
    document.addEventListener("DOMContentLoaded", (function() {
        document.getElementById("demoBookExample") && function() {
            const t = document.querySelectorAll(".source-block")
              , e = new y(document.getElementById("demoBookExample"),{
                width: 550,
                height: 733,
                size: "stretch",
                minWidth: 315,
                maxWidth: 1e3,
                minHeight: 400,
                maxHeight: 1533,
                maxShadowOpacity: .5,
                showCover: !0,
                mobileScrollSupport: !1
            })
              , i = document.querySelectorAll(".btn__source");
            for (const n of i)
                n.addEventListener("click", s=>{
                    if (n.classList.contains("btn-primary"))
                        document.querySelector(".source").style.display = "none",
                        document.querySelector(".flip-book").style.display = "block",
                        n.classList.remove("btn-primary"),
                        n.classList.add("btn-secondary");
                    else {
                        for (const t of i)
                            t.classList.remove("btn-primary"),
                            t.classList.add("btn-secondary");
                        n.classList.add("btn-primary"),
                        n.classList.remove("btn-secondary"),
                        document.querySelector(".source").style.display = "block",
                        document.querySelector(".flip-book").style.display = "none";
                        for (const e of t)
                            e.classList.contains("source-" + n.dataset.dest) ? e.style.display = "block" : e.style.display = "none"
                    }
                    "block" === document.querySelector(".flip-book").style.display && e.update()
                }
                );
            e.loadFromHTML(document.querySelectorAll(".page")),
            document.querySelector(".page-total").innerText = e.getPageCount(),
            document.querySelector(".page-orientation").innerText = e.getOrientation(),
            document.querySelector(".btn-prev").addEventListener("click", ()=>{
                e.flipPrev()
            }
            ),
            document.querySelector(".btn-next").addEventListener("click", ()=>{
                e.flipNext()
            }
            ),
            e.on("flip", t=>{
                document.querySelector(".page-current").innerText = t.data + 1
            }
            ),
            e.on("changeState", t=>{
                document.querySelector(".page-state").innerText = t.data
            }
            ),
            e.on("changeOrientation", t=>{
                document.querySelector(".page-orientation").innerText = t.data
            }
            )
        }(),
        document.getElementById("canvasBookExample") && function() {
            $(".mode").tooltip();
            const t = new y(document.getElementById("canvasBookExample"),{
                width: 550,
                height: 733,
                size: "stretch",
                minWidth: 315,
                maxWidth: 1e3,
                minHeight: 400,
                maxHeight: 1533
            });
            t.loadFromImages(["images/canvas/0.jpg", "images/canvas/1.jpg", "images/canvas/1-2.jpg", "images/canvas/1-2_.jpg", "images/canvas/2.jpg", "images/canvas/3.jpg", "images/canvas/3-4.jpg", "images/canvas/3-4_.jpg", "images/canvas/4.jpg", "images/canvas/5.jpg", "images/canvas/6.jpg", "images/canvas/7.jpg", "images/canvas/8.jpg", "images/canvas/9.jpg"]);
            const e = new y(document.getElementById("htmlBookExample"),{
                width: 550,
                height: 733,
                size: "stretch",
                minWidth: 315,
                maxWidth: 1e3,
                minHeight: 400,
                maxHeight: 1533,
                maxShadowOpacity: .5,
                showCover: !0,
                mobileScrollSupport: !0
            })
              , i = document.getElementById("htmlBook")
              , n = document.getElementById("canvasBook")
              , s = document.getElementById("buttonDemoSelection")
              , a = s.querySelectorAll("button");
            e.loadFromHTML(document.querySelectorAll(".page"));
            let r = e;
            const o = [3, 6, 10, 15, 19];
            e.on("flip", t=>{
                document.querySelector(".page-count").innerHTML = t.data + 1,
                document.querySelector(".page-total").innerHTML = e.getPageCount()
            }
            ),
            t.on("flip", e=>{
                document.querySelector(".page-count").innerHTML = e.data + 1,
                document.querySelector(".page-total").innerHTML = t.getPageCount()
            }
            ),
            document.querySelector(".page-total").innerHTML = r.getPageCount();
            const h = document.querySelectorAll(".btn-bookmark");
            for (const t of h)
                t.addEventListener("click", t=>{
                    const i = t.target;
                    e.flip(o[i.dataset.dest])
                }
                );
            for (const o of a)
                o.addEventListener("click", a=>{
                    const o = s.querySelector(".btn-primary");
                    o.classList.remove("btn-primary"),
                    o.classList.add("btn-secondary");
                    const h = a.target;
                    h.classList.add("btn-primary"),
                    h.classList.remove("btn-secondary");
                    "html" === h.dataset.dest ? (r = e,
                    n.style.display = "none",
                    i.style.display = "block",
                    e.getUI().update(),
                    e.update()) : (r = t,
                    n.style.display = "block",
                    i.style.display = "none",
                    t.getUI().update(),
                    t.update())
                }
                );
            document.querySelector(".btn-book-prev").addEventListener("click", ()=>{
                r.flipPrev()
            }
            ),
            document.querySelector(".btn-book-next").addEventListener("click", ()=>{
                r.flipNext()
            }
            ),
            $(".mode").on("click", (function() {
                return $(".mode").removeClass("mode--selected"),
                $(this).addClass("mode--selected"),
                $("#bookParent").removeClass("pBlock--mobile  pBlock--tablet  pBlock--tablet-l  pBlock--desktop"),
                $("#bookParent").addClass("pBlock--" + $(this).data("dest")),
                r.update(),
                setTimeout(()=>{
                    r.getUI().update(),
                    r.update()
                }
                , 2),
                $(".mode__title").text($(this).find("img").attr("title")),
                !1
            }
            ))
        }();
        const t = document.querySelectorAll("code");
        for (const e of t)
            v.a.highlightBlock(e)
    }
    ))
}
]);
