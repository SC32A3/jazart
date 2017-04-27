(function() {
    var COMPILED = !0,
        goog = goog || {};
    goog.global = this;
    goog.DEBUG = !0;
    goog.LOCALE = "en";
    goog.provide = function(a) {
        if (!COMPILED) {
            if (goog.isProvided_(a)) throw Error('Namespace "' + a + '" already declared.');
            delete goog.implicitNamespaces_[a];
            for (var b = a;
                (b = b.substring(0, b.lastIndexOf("."))) && !goog.getObjectByName(b);) goog.implicitNamespaces_[b] = !0
        }
        goog.exportPath_(a)
    };
    goog.setTestOnly = function(a) {
        if (COMPILED && !goog.DEBUG) throw a = a || "", Error("Importing test-only code into non-debug environment" + a ? ": " + a : ".");
    };
    COMPILED || (goog.isProvided_ = function(a) {
        return !goog.implicitNamespaces_[a] && !!goog.getObjectByName(a)
    }, goog.implicitNamespaces_ = {});
    goog.exportPath_ = function(a, b, c) {
        a = a.split(".");
        c = c || goog.global;
        !(a[0] in c) && c.execScript && c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());) !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
    };
    goog.getObjectByName = function(a, b) {
        for (var c = a.split("."), d = b || goog.global, e; e = c.shift();)
            if (goog.isDefAndNotNull(d[e])) d = d[e];
            else return null;
        return d
    };
    goog.globalize = function(a, b) {
        var c = b || goog.global,
            d;
        for (d in a) c[d] = a[d]
    };
    goog.addDependency = function(a, b, c) {
        if (!COMPILED) {
            var d;
            a = a.replace(/\\/g, "/");
            for (var e = goog.dependencies_, f = 0; d = b[f]; f++) e.nameToPath[d] = a, a in e.pathToNames || (e.pathToNames[a] = {}), e.pathToNames[a][d] = !0;
            for (d = 0; b = c[d]; d++) a in e.requires || (e.requires[a] = {}), e.requires[a][b] = !0
        }
    };
    goog.ENABLE_DEBUG_LOADER = !0;
    goog.require = function(a) {
        if (!COMPILED && !goog.isProvided_(a)) {
            if (goog.ENABLE_DEBUG_LOADER) {
                var b = goog.getPathFromDeps_(a);
                if (b) {
                    goog.included_[b] = !0;
                    goog.writeScripts_();
                    return
                }
            }
            a = "goog.require could not find: " + a;
            goog.global.console && goog.global.console.error(a);
            throw Error(a);
        }
    };
    goog.basePath = "";
    goog.nullFunction = function() {};
    goog.identityFunction = function(a) {
        return a
    };
    goog.abstractMethod = function() {
        throw Error("unimplemented abstract method");
    };
    goog.addSingletonGetter = function(a) {
        a.getInstance = function() {
            if (a.instance_) return a.instance_;
            goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
            return a.instance_ = new a
        }
    };
    goog.instantiatedSingletons_ = [];
    !COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {}, goog.dependencies_ = {
        pathToNames: {},
        nameToPath: {},
        requires: {},
        visited: {},
        written: {}
    }, goog.inHtmlDocument_ = function() {
        var a = goog.global.document;
        return "undefined" != typeof a && "write" in a
    }, goog.findBasePath_ = function() {
        if (goog.global.CLOSURE_BASE_PATH) goog.basePath = goog.global.CLOSURE_BASE_PATH;
        else if (goog.inHtmlDocument_())
            for (var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1; 0 <= b; --b) {
                var c = a[b].src,
                    d = c.lastIndexOf("?"),
                    d = -1 == d ? c.length : d;
                if ("base.js" == c.substr(d - 7, 7)) {
                    goog.basePath = c.substr(0, d - 7);
                    break
                }
            }
    }, goog.importScript_ = function(a) {
        var b = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
        !goog.dependencies_.written[a] && b(a) && (goog.dependencies_.written[a] = !0)
    }, goog.writeScriptTag_ = function(a) {
        if (goog.inHtmlDocument_()) {
            var b = goog.global.document;
            if ("complete" == b.readyState) {
                if (/\bdeps.js$/.test(a)) return !1;
                throw Error('Cannot write "' + a + '" after document load');
            }
            b.write('<script type="text/javascript" src="' +
                a + '">\x3c/script>');
            return !0
        }
        return !1
    }, goog.writeScripts_ = function() {
        function a(e) {
            if (!(e in d.written)) {
                if (!(e in d.visited) && (d.visited[e] = !0, e in d.requires))
                    for (var g in d.requires[e])
                        if (!goog.isProvided_(g))
                            if (g in d.nameToPath) a(d.nameToPath[g]);
                            else throw Error("Undefined nameToPath for " + g);
                e in c || (c[e] = !0, b.push(e))
            }
        }
        var b = [],
            c = {},
            d = goog.dependencies_,
            e;
        for (e in goog.included_) d.written[e] || a(e);
        for (e = 0; e < b.length; e++)
            if (b[e]) goog.importScript_(goog.basePath + b[e]);
            else throw Error("Undefined script input");
    }, goog.getPathFromDeps_ = function(a) {
        return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
    }, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
    goog.typeOf = function(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array) return "array";
                if (a instanceof Object) return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c) return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
            } else return "null";
        else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b
    };
    goog.isDef = function(a) {
        return void 0 !== a
    };
    goog.isNull = function(a) {
        return null === a
    };
    goog.isDefAndNotNull = function(a) {
        return null != a
    };
    goog.isArray = function(a) {
        return "array" == goog.typeOf(a)
    };
    goog.isArrayLike = function(a) {
        var b = goog.typeOf(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    };
    goog.isDateLike = function(a) {
        return goog.isObject(a) && "function" == typeof a.getFullYear
    };
    goog.isString = function(a) {
        return "string" == typeof a
    };
    goog.isBoolean = function(a) {
        return "boolean" == typeof a
    };
    goog.isNumber = function(a) {
        return "number" == typeof a
    };
    goog.isFunction = function(a) {
        return "function" == goog.typeOf(a)
    };
    goog.isObject = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    };
    goog.getUid = function(a) {
        return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
    };
    goog.removeUid = function(a) {
        "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
        try {
            delete a[goog.UID_PROPERTY_]
        } catch (b) {}
    };
    goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36);
    goog.uidCounter_ = 0;
    goog.getHashCode = goog.getUid;
    goog.removeHashCode = goog.removeUid;
    goog.cloneObject = function(a) {
        var b = goog.typeOf(a);
        if ("object" == b || "array" == b) {
            if (a.clone) return a.clone();
            var b = "array" == b ? [] : {},
                c;
            for (c in a) b[c] = goog.cloneObject(a[c]);
            return b
        }
        return a
    };
    goog.bindNative_ = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    };
    goog.bindJs_ = function(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    };
    goog.bind = function(a, b, c) {
        goog.bind = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bindNative_ : goog.bindJs_;
        return goog.bind.apply(null, arguments)
    };
    goog.partial = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = Array.prototype.slice.call(arguments);
            b.unshift.apply(b, c);
            return a.apply(this, b)
        }
    };
    goog.mixin = function(a, b) {
        for (var c in b) a[c] = b[c]
    };
    goog.now = Date.now || function() {
        return +new Date
    };
    goog.globalEval = function(a) {
        if (goog.global.execScript) goog.global.execScript(a, "JavaScript");
        else if (goog.global.eval)
            if (null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) goog.global.eval(a);
            else {
                var b = goog.global.document,
                    c = b.createElement("script");
                c.type = "text/javascript";
                c.defer = !1;
                c.appendChild(b.createTextNode(a));
                b.body.appendChild(c);
                b.body.removeChild(c)
            }
        else throw Error("goog.globalEval not available");
    };
    goog.evalWorksForGlobals_ = null;
    goog.getCssName = function(a, b) {
        var c = function(a) {
                return goog.cssNameMapping_[a] || a
            },
            d = function(a) {
                a = a.split("-");
                for (var b = [], d = 0; d < a.length; d++) b.push(c(a[d]));
                return b.join("-")
            },
            d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
                return a
            };
        return b ? a + "-" + d(b) : d(a)
    };
    goog.setCssNameMapping = function(a, b) {
        goog.cssNameMapping_ = a;
        goog.cssNameMappingStyle_ = b
    };
    !COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
    goog.getMsg = function(a, b) {
        var c = b || {},
            d;
        for (d in c) {
            var e = ("" + c[d]).replace(/\$/g, "$$$$");
            a = a.replace(RegExp("\\{\\$" + d + "\\}", "gi"), e)
        }
        return a
    };
    goog.getMsgWithFallback = function(a) {
        return a
    };
    goog.exportSymbol = function(a, b, c) {
        goog.exportPath_(a, b, c)
    };
    goog.exportProperty = function(a, b, c) {
        a[b] = c
    };
    goog.inherits = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.superClass_ = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a
    };
    goog.base = function(a, b, c) {
        var d = arguments.callee.caller;
        if (d.superClass_) return d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1));
        for (var e = Array.prototype.slice.call(arguments, 2), f = !1, g = a.constructor; g; g = g.superClass_ && g.superClass_.constructor)
            if (g.prototype[b] === d) f = !0;
            else if (f) return g.prototype[b].apply(a, e);
        if (a[b] === d) return a.constructor.prototype[b].apply(a, e);
        throw Error("goog.base called from a method of one name to a method of a different name");
    };
    goog.scope = function(a) {
        a.call(goog.global)
    };
    goog.string = {};
    goog.string.Unicode = {
        NBSP: "\u00a0"
    };
    goog.string.startsWith = function(a, b) {
        return 0 == a.lastIndexOf(b, 0)
    };
    goog.string.endsWith = function(a, b) {
        var c = a.length - b.length;
        return 0 <= c && a.indexOf(b, c) == c
    };
    goog.string.caseInsensitiveStartsWith = function(a, b) {
        return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
    };
    goog.string.caseInsensitiveEndsWith = function(a, b) {
        return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
    };
    goog.string.subs = function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = String(arguments[c]).replace(/\$/g, "$$$$");
            a = a.replace(/\%s/, d)
        }
        return a
    };
    goog.string.collapseWhitespace = function(a) {
        return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
    };
    goog.string.isEmpty = function(a) {
        return /^[\s\xa0]*$/.test(a)
    };
    goog.string.isEmptySafe = function(a) {
        return goog.string.isEmpty(goog.string.makeSafe(a))
    };
    goog.string.isBreakingWhitespace = function(a) {
        return !/[^\t\n\r ]/.test(a)
    };
    goog.string.isAlpha = function(a) {
        return !/[^a-zA-Z]/.test(a)
    };
    goog.string.isNumeric = function(a) {
        return !/[^0-9]/.test(a)
    };
    goog.string.isAlphaNumeric = function(a) {
        return !/[^a-zA-Z0-9]/.test(a)
    };
    goog.string.isSpace = function(a) {
        return " " == a
    };
    goog.string.isUnicodeChar = function(a) {
        return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
    };
    goog.string.stripNewlines = function(a) {
        return a.replace(/(\r\n|\r|\n)+/g, " ")
    };
    goog.string.canonicalizeNewlines = function(a) {
        return a.replace(/(\r\n|\r|\n)/g, "\n")
    };
    goog.string.normalizeWhitespace = function(a) {
        return a.replace(/\xa0|\s/g, " ")
    };
    goog.string.normalizeSpaces = function(a) {
        return a.replace(/\xa0|[ \t]+/g, " ")
    };
    goog.string.collapseBreakingSpaces = function(a) {
        return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
    };
    goog.string.trim = function(a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    };
    goog.string.trimLeft = function(a) {
        return a.replace(/^[\s\xa0]+/, "")
    };
    goog.string.trimRight = function(a) {
        return a.replace(/[\s\xa0]+$/, "")
    };
    goog.string.caseInsensitiveCompare = function(a, b) {
        var c = String(a).toLowerCase(),
            d = String(b).toLowerCase();
        return c < d ? -1 : c == d ? 0 : 1
    };
    goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
    goog.string.numerateCompare = function(a, b) {
        if (a == b) return 0;
        if (!a) return -1;
        if (!b) return 1;
        for (var c = a.toLowerCase().match(goog.string.numerateCompareRegExp_), d = b.toLowerCase().match(goog.string.numerateCompareRegExp_), e = Math.min(c.length, d.length), f = 0; f < e; f++) {
            var g = c[f],
                h = d[f];
            if (g != h) return c = parseInt(g, 10), !isNaN(c) && (d = parseInt(h, 10), !isNaN(d) && c - d) ? c - d : g < h ? -1 : 1
        }
        return c.length != d.length ? c.length - d.length : a < b ? -1 : 1
    };
    goog.string.urlEncode = function(a) {
        return encodeURIComponent(String(a))
    };
    goog.string.urlDecode = function(a) {
        return decodeURIComponent(a.replace(/\+/g, " "))
    };
    goog.string.newLineToBr = function(a, b) {
        return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
    };
    goog.string.htmlEscape = function(a, b) {
        if (b) return a.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;");
        if (!goog.string.allRe_.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(goog.string.amperRe_, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(goog.string.ltRe_, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(goog.string.gtRe_, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(goog.string.quotRe_, "&quot;"));
        return a
    };
    goog.string.amperRe_ = /&/g;
    goog.string.ltRe_ = /</g;
    goog.string.gtRe_ = />/g;
    goog.string.quotRe_ = /\"/g;
    goog.string.allRe_ = /[&<>\"]/;
    goog.string.unescapeEntities = function(a) {
        return goog.string.contains(a, "&") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
    };
    goog.string.unescapeEntitiesUsingDom_ = function(a) {
        var b = {
                "&amp;": "&",
                "&lt;": "<",
                "&gt;": ">",
                "&quot;": '"'
            },
            c = document.createElement("div");
        return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, e) {
            var f = b[a];
            if (f) return f;
            if ("#" == e.charAt(0)) {
                var g = Number("0" + e.substr(1));
                isNaN(g) || (f = String.fromCharCode(g))
            }
            f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
            return b[a] = f
        })
    };
    goog.string.unescapePureXmlEntities_ = function(a) {
        return a.replace(/&([^;]+);/g, function(a, c) {
            switch (c) {
                case "amp":
                    return "&";
                case "lt":
                    return "<";
                case "gt":
                    return ">";
                case "quot":
                    return '"';
                default:
                    if ("#" == c.charAt(0)) {
                        var d = Number("0" + c.substr(1));
                        if (!isNaN(d)) return String.fromCharCode(d)
                    }
                    return a
            }
        })
    };
    goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
    goog.string.whitespaceEscape = function(a, b) {
        return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
    };
    goog.string.stripQuotes = function(a, b) {
        for (var c = b.length, d = 0; d < c; d++) {
            var e = 1 == c ? b : b.charAt(d);
            if (a.charAt(0) == e && a.charAt(a.length - 1) == e) return a.substring(1, a.length - 1)
        }
        return a
    };
    goog.string.truncate = function(a, b, c) {
        c && (a = goog.string.unescapeEntities(a));
        a.length > b && (a = a.substring(0, b - 3) + "...");
        c && (a = goog.string.htmlEscape(a));
        return a
    };
    goog.string.truncateMiddle = function(a, b, c, d) {
        c && (a = goog.string.unescapeEntities(a));
        if (d && a.length > b) {
            d > b && (d = b);
            var e = a.length - d;
            a = a.substring(0, b - d) + "..." + a.substring(e)
        } else a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
        c && (a = goog.string.htmlEscape(a));
        return a
    };
    goog.string.specialEscapeChars_ = {
        "\x00": "\\0",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\x0B",
        '"': '\\"',
        "\\": "\\\\"
    };
    goog.string.jsEscapeCache_ = {
        "'": "\\'"
    };
    goog.string.quote = function(a) {
        a = String(a);
        if (a.quote) return a.quote();
        for (var b = ['"'], c = 0; c < a.length; c++) {
            var d = a.charAt(c),
                e = d.charCodeAt(0);
            b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
        }
        b.push('"');
        return b.join("")
    };
    goog.string.escapeString = function(a) {
        for (var b = [], c = 0; c < a.length; c++) b[c] = goog.string.escapeChar(a.charAt(c));
        return b.join("")
    };
    goog.string.escapeChar = function(a) {
        if (a in goog.string.jsEscapeCache_) return goog.string.jsEscapeCache_[a];
        if (a in goog.string.specialEscapeChars_) return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
        var b = a,
            c = a.charCodeAt(0);
        if (31 < c && 127 > c) b = a;
        else {
            if (256 > c) {
                if (b = "\\x", 16 > c || 256 < c) b += "0"
            } else b = "\\u", 4096 > c && (b += "0");
            b += c.toString(16).toUpperCase()
        }
        return goog.string.jsEscapeCache_[a] = b
    };
    goog.string.toMap = function(a) {
        for (var b = {}, c = 0; c < a.length; c++) b[a.charAt(c)] = !0;
        return b
    };
    goog.string.contains = function(a, b) {
        return -1 != a.indexOf(b)
    };
    goog.string.countOf = function(a, b) {
        return a && b ? a.split(b).length - 1 : 0
    };
    goog.string.removeAt = function(a, b, c) {
        var d = a;
        0 <= b && (b < a.length && 0 < c) && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
        return d
    };
    goog.string.remove = function(a, b) {
        var c = RegExp(goog.string.regExpEscape(b), "");
        return a.replace(c, "")
    };
    goog.string.removeAll = function(a, b) {
        var c = RegExp(goog.string.regExpEscape(b), "g");
        return a.replace(c, "")
    };
    goog.string.regExpEscape = function(a) {
        return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
    };
    goog.string.repeat = function(a, b) {
        return Array(b + 1).join(a)
    };
    goog.string.padNumber = function(a, b, c) {
        a = goog.isDef(c) ? a.toFixed(c) : String(a);
        c = a.indexOf("."); - 1 == c && (c = a.length);
        return goog.string.repeat("0", Math.max(0, b - c)) + a
    };
    goog.string.makeSafe = function(a) {
        return null == a ? "" : String(a)
    };
    goog.string.buildString = function(a) {
        return Array.prototype.join.call(arguments, "")
    };
    goog.string.getRandomString = function() {
        return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
    };
    goog.string.compareVersions = function(a, b) {
        for (var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; 0 == c && g < f; g++) {
            var h = d[g] || "",
                j = e[g] || "",
                k = RegExp("(\\d*)(\\D*)", "g"),
                l = RegExp("(\\d*)(\\D*)", "g");
            do {
                var m = k.exec(h) || ["", "", ""],
                    p = l.exec(j) || ["", "", ""];
                if (0 == m[0].length && 0 == p[0].length) break;
                var c = 0 == m[1].length ? 0 : parseInt(m[1], 10),
                    r = 0 == p[1].length ? 0 : parseInt(p[1], 10),
                    c = goog.string.compareElements_(c, r) || goog.string.compareElements_(0 ==
                        m[2].length, 0 == p[2].length) || goog.string.compareElements_(m[2], p[2])
            } while (0 == c)
        }
        return c
    };
    goog.string.compareElements_ = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    goog.string.HASHCODE_MAX_ = 4294967296;
    goog.string.hashCode = function(a) {
        for (var b = 0, c = 0; c < a.length; ++c) b = 31 * b + a.charCodeAt(c), b %= goog.string.HASHCODE_MAX_;
        return b
    };
    goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
    goog.string.createUniqueString = function() {
        return "goog_" + goog.string.uniqueStringCounter_++
    };
    goog.string.toNumber = function(a) {
        var b = Number(a);
        return 0 == b && goog.string.isEmpty(a) ? NaN : b
    };
    goog.string.toCamelCase = function(a) {
        return String(a).replace(/\-([a-z])/g, function(a, c) {
            return c.toUpperCase()
        })
    };
    goog.string.toSelectorCase = function(a) {
        return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
    };
    goog.string.toTitleCase = function(a, b) {
        var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
        return a.replace(RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
            return b + c.toUpperCase()
        })
    };
    goog.string.parseInt = function(a) {
        isFinite(a) && (a = String(a));
        return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
    };
    goog.userAgent = {};
    goog.userAgent.ASSUME_IE = !1;
    goog.userAgent.ASSUME_GECKO = !1;
    goog.userAgent.ASSUME_WEBKIT = !1;
    goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
    goog.userAgent.ASSUME_OPERA = !1;
    goog.userAgent.ASSUME_ANY_VERSION = !1;
    goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
    goog.userAgent.getUserAgentString = function() {
        return goog.global.navigator ? goog.global.navigator.userAgent : null
    };
    goog.userAgent.getNavigator = function() {
        return goog.global.navigator
    };
    goog.userAgent.init_ = function() {
        goog.userAgent.detectedOpera_ = !1;
        goog.userAgent.detectedIe_ = !1;
        goog.userAgent.detectedWebkit_ = !1;
        goog.userAgent.detectedMobile_ = !1;
        goog.userAgent.detectedGecko_ = !1;
        var a;
        if (!goog.userAgent.BROWSER_KNOWN_ && (a = goog.userAgent.getUserAgentString())) {
            var b = goog.userAgent.getNavigator();
            goog.userAgent.detectedOpera_ = 0 == a.indexOf("Opera");
            goog.userAgent.detectedIe_ = !goog.userAgent.detectedOpera_ && -1 != a.indexOf("MSIE");
            goog.userAgent.detectedWebkit_ = !goog.userAgent.detectedOpera_ &&
                -1 != a.indexOf("WebKit");
            goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && -1 != a.indexOf("Mobile");
            goog.userAgent.detectedGecko_ = !goog.userAgent.detectedOpera_ && !goog.userAgent.detectedWebkit_ && "Gecko" == b.product
        }
    };
    goog.userAgent.BROWSER_KNOWN_ || goog.userAgent.init_();
    goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
    goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
    goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
    goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
    goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
    goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
    goog.userAgent.determinePlatform_ = function() {
        var a = goog.userAgent.getNavigator();
        return a && a.platform || ""
    };
    goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
    goog.userAgent.ASSUME_MAC = !1;
    goog.userAgent.ASSUME_WINDOWS = !1;
    goog.userAgent.ASSUME_LINUX = !1;
    goog.userAgent.ASSUME_X11 = !1;
    goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11;
    goog.userAgent.initPlatform_ = function() {
        goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
        goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
        goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
        goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11")
    };
    goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
    goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
    goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
    goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
    goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
    goog.userAgent.determineVersion_ = function() {
        var a = "",
            b;
        goog.userAgent.OPERA && goog.global.opera ? (a = goog.global.opera.version, a = "function" == typeof a ? a() : a) : (goog.userAgent.GECKO ? b = /rv\:([^\);]+)(\)|;)/ : goog.userAgent.IE ? b = /MSIE\s+([^\);]+)(\)|;)/ : goog.userAgent.WEBKIT && (b = /WebKit\/(\S+)/), b && (a = (a = b.exec(goog.userAgent.getUserAgentString())) ? a[1] : ""));
        return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), b > parseFloat(a)) ? String(b) : a
    };
    goog.userAgent.getDocumentMode_ = function() {
        var a = goog.global.document;
        return a ? a.documentMode : void 0
    };
    goog.userAgent.VERSION = goog.userAgent.determineVersion_();
    goog.userAgent.compare = function(a, b) {
        return goog.string.compareVersions(a, b)
    };
    goog.userAgent.isVersionCache_ = {};
    goog.userAgent.isVersion = function(a) {
        return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionCache_[a] || (goog.userAgent.isVersionCache_[a] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a))
    };
    goog.userAgent.isDocumentMode = function(a) {
        return goog.userAgent.IE && goog.userAgent.DOCUMENT_MODE >= a
    };
    goog.userAgent.DOCUMENT_MODE = function() {
        var a = goog.global.document;
        return !a || !goog.userAgent.IE ? void 0 : goog.userAgent.getDocumentMode_() || ("CSS1Compat" == a.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5)
    }();
    goog.structs = {};
    goog.structs.Collection = function() {};
    goog.object = {};
    goog.object.forEach = function(a, b, c) {
        for (var d in a) b.call(c, a[d], d, a)
    };
    goog.object.filter = function(a, b, c) {
        var d = {},
            e;
        for (e in a) b.call(c, a[e], e, a) && (d[e] = a[e]);
        return d
    };
    goog.object.map = function(a, b, c) {
        var d = {},
            e;
        for (e in a) d[e] = b.call(c, a[e], e, a);
        return d
    };
    goog.object.some = function(a, b, c) {
        for (var d in a)
            if (b.call(c, a[d], d, a)) return !0;
        return !1
    };
    goog.object.every = function(a, b, c) {
        for (var d in a)
            if (!b.call(c, a[d], d, a)) return !1;
        return !0
    };
    goog.object.getCount = function(a) {
        var b = 0,
            c;
        for (c in a) b++;
        return b
    };
    goog.object.getAnyKey = function(a) {
        for (var b in a) return b
    };
    goog.object.getAnyValue = function(a) {
        for (var b in a) return a[b]
    };
    goog.object.contains = function(a, b) {
        return goog.object.containsValue(a, b)
    };
    goog.object.getValues = function(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = a[d];
        return b
    };
    goog.object.getKeys = function(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = d;
        return b
    };
    goog.object.getValueByKeys = function(a, b) {
        for (var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1; c < d.length && !(a = a[d[c]], !goog.isDef(a)); c++);
        return a
    };
    goog.object.containsKey = function(a, b) {
        return b in a
    };
    goog.object.containsValue = function(a, b) {
        for (var c in a)
            if (a[c] == b) return !0;
        return !1
    };
    goog.object.findKey = function(a, b, c) {
        for (var d in a)
            if (b.call(c, a[d], d, a)) return d
    };
    goog.object.findValue = function(a, b, c) {
        return (b = goog.object.findKey(a, b, c)) && a[b]
    };
    goog.object.isEmpty = function(a) {
        for (var b in a) return !1;
        return !0
    };
    goog.object.clear = function(a) {
        for (var b in a) delete a[b]
    };
    goog.object.remove = function(a, b) {
        var c;
        (c = b in a) && delete a[b];
        return c
    };
    goog.object.add = function(a, b, c) {
        if (b in a) throw Error('The object already contains the key "' + b + '"');
        goog.object.set(a, b, c)
    };
    goog.object.get = function(a, b, c) {
        return b in a ? a[b] : c
    };
    goog.object.set = function(a, b, c) {
        a[b] = c
    };
    goog.object.setIfUndefined = function(a, b, c) {
        return b in a ? a[b] : a[b] = c
    };
    goog.object.clone = function(a) {
        var b = {},
            c;
        for (c in a) b[c] = a[c];
        return b
    };
    goog.object.unsafeClone = function(a) {
        var b = goog.typeOf(a);
        if ("object" == b || "array" == b) {
            if (a.clone) return a.clone();
            var b = "array" == b ? [] : {},
                c;
            for (c in a) b[c] = goog.object.unsafeClone(a[c]);
            return b
        }
        return a
    };
    goog.object.transpose = function(a) {
        var b = {},
            c;
        for (c in a) b[a[c]] = c;
        return b
    };
    goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    goog.object.extend = function(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < goog.object.PROTOTYPE_FIELDS_.length; f++) c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    goog.object.create = function(a) {
        var b = arguments.length;
        if (1 == b && goog.isArray(arguments[0])) return goog.object.create.apply(null, arguments[0]);
        if (b % 2) throw Error("Uneven number of arguments");
        for (var c = {}, d = 0; d < b; d += 2) c[arguments[d]] = arguments[d + 1];
        return c
    };
    goog.object.createSet = function(a) {
        var b = arguments.length;
        if (1 == b && goog.isArray(arguments[0])) return goog.object.createSet.apply(null, arguments[0]);
        for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
        return c
    };
    goog.object.createImmutableView = function(a) {
        var b = a;
        Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
        return b
    };
    goog.object.isImmutableView = function(a) {
        return !!Object.isFrozen && Object.isFrozen(a)
    };
    goog.debug = {};
    goog.debug.Error = function(a) {
        Error.captureStackTrace ? Error.captureStackTrace(this, goog.debug.Error) : this.stack = Error().stack || "";
        a && (this.message = String(a))
    };
    goog.inherits(goog.debug.Error, Error);
    goog.debug.Error.prototype.name = "CustomError";
    goog.asserts = {};
    goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
    goog.asserts.AssertionError = function(a, b) {
        b.unshift(a);
        goog.debug.Error.call(this, goog.string.subs.apply(null, b));
        b.shift();
        this.messagePattern = a
    };
    goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
    goog.asserts.AssertionError.prototype.name = "AssertionError";
    goog.asserts.doAssertFailure_ = function(a, b, c, d) {
        var e = "Assertion failed";
        if (c) var e = e + (": " + c),
            f = d;
        else a && (e += ": " + a, f = b);
        throw new goog.asserts.AssertionError("" + e, f || []);
    };
    goog.asserts.assert = function(a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
        return a
    };
    goog.asserts.fail = function(a, b) {
        if (goog.asserts.ENABLE_ASSERTS) throw new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
    };
    goog.asserts.assertNumber = function(a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    };
    goog.asserts.assertString = function(a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    };
    goog.asserts.assertFunction = function(a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    };
    goog.asserts.assertObject = function(a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    };
    goog.asserts.assertArray = function(a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    };
    goog.asserts.assertBoolean = function(a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    };
    goog.asserts.assertInstanceof = function(a, b, c, d) {
        goog.asserts.ENABLE_ASSERTS && !(a instanceof b) && goog.asserts.doAssertFailure_("instanceof check failed.", null, c, Array.prototype.slice.call(arguments, 3));
        return a
    };
    goog.array = {};
    goog.NATIVE_ARRAY_PROTOTYPES = !0;
    goog.array.peek = function(a) {
        return a[a.length - 1]
    };
    goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
    goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(a, b, c) {
        goog.asserts.assert(null != a.length);
        return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a, b, c)
    } : function(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (goog.isString(a)) return !goog.isString(b) || 1 != b.length ? -1 : a.indexOf(b, c);
        for (; c < a.length; c++)
            if (c in a && a[c] === b) return c;
        return -1
    };
    goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(a, b, c) {
        goog.asserts.assert(null != a.length);
        return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
    } : function(a, b, c) {
        c = null == c ? a.length - 1 : c;
        0 > c && (c = Math.max(0, a.length + c));
        if (goog.isString(a)) return !goog.isString(b) || 1 != b.length ? -1 : a.lastIndexOf(b, c);
        for (; 0 <= c; c--)
            if (c in a && a[c] === b) return c;
        return -1
    };
    goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(a, b, c) {
        goog.asserts.assert(null != a.length);
        goog.array.ARRAY_PROTOTYPE_.forEach.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
    };
    goog.array.forEachRight = function(a, b, c) {
        for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; --d) d in e && b.call(c, e[d], d, a)
    };
    goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(a, b, c) {
        goog.asserts.assert(null != a.length);
        return goog.array.ARRAY_PROTOTYPE_.filter.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0; h < d; h++)
            if (h in g) {
                var j = g[h];
                b.call(c, j, h, a) && (e[f++] = j)
            }
        return e
    };
    goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(a, b, c) {
        goog.asserts.assert(null != a.length);
        return goog.array.ARRAY_PROTOTYPE_.map.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
        return e
    };
    goog.array.reduce = function(a, b, c, d) {
        if (a.reduce) return d ? a.reduce(goog.bind(b, d), c) : a.reduce(b, c);
        var e = c;
        goog.array.forEach(a, function(c, g) {
            e = b.call(d, e, c, g, a)
        });
        return e
    };
    goog.array.reduceRight = function(a, b, c, d) {
        if (a.reduceRight) return d ? a.reduceRight(goog.bind(b, d), c) : a.reduceRight(b, c);
        var e = c;
        goog.array.forEachRight(a, function(c, g) {
            e = b.call(d, e, c, g, a)
        });
        return e
    };
    goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(a, b, c) {
        goog.asserts.assert(null != a.length);
        return goog.array.ARRAY_PROTOTYPE_.some.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a)) return !0;
        return !1
    };
    goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(a, b, c) {
        goog.asserts.assert(null != a.length);
        return goog.array.ARRAY_PROTOTYPE_.every.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && !b.call(c, e[f], f, a)) return !1;
        return !0
    };
    goog.array.count = function(a, b, c) {
        var d = 0;
        goog.array.forEach(a, function(a, f, g) {
            b.call(c, a, f, g) && ++d
        }, c);
        return d
    };
    goog.array.find = function(a, b, c) {
        b = goog.array.findIndex(a, b, c);
        return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
    };
    goog.array.findIndex = function(a, b, c) {
        for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a)) return f;
        return -1
    };
    goog.array.findRight = function(a, b, c) {
        b = goog.array.findIndexRight(a, b, c);
        return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
    };
    goog.array.findIndexRight = function(a, b, c) {
        for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; d--)
            if (d in e && b.call(c, e[d], d, a)) return d;
        return -1
    };
    goog.array.contains = function(a, b) {
        return 0 <= goog.array.indexOf(a, b)
    };
    goog.array.isEmpty = function(a) {
        return 0 == a.length
    };
    goog.array.clear = function(a) {
        if (!goog.isArray(a))
            for (var b = a.length - 1; 0 <= b; b--) delete a[b];
        a.length = 0
    };
    goog.array.insert = function(a, b) {
        goog.array.contains(a, b) || a.push(b)
    };
    goog.array.insertAt = function(a, b, c) {
        goog.array.splice(a, c, 0, b)
    };
    goog.array.insertArrayAt = function(a, b, c) {
        goog.partial(goog.array.splice, a, c, 0).apply(null, b)
    };
    goog.array.insertBefore = function(a, b, c) {
        var d;
        2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d)
    };
    goog.array.remove = function(a, b) {
        var c = goog.array.indexOf(a, b),
            d;
        (d = 0 <= c) && goog.array.removeAt(a, c);
        return d
    };
    goog.array.removeAt = function(a, b) {
        goog.asserts.assert(null != a.length);
        return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call(a, b, 1).length
    };
    goog.array.removeIf = function(a, b, c) {
        b = goog.array.findIndex(a, b, c);
        return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
    };
    goog.array.concat = function(a) {
        return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
    };
    goog.array.toArray = function(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    };
    goog.array.clone = goog.array.toArray;
    goog.array.extend = function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c],
                e;
            if (goog.isArray(d) || (e = goog.isArrayLike(d)) && Object.prototype.hasOwnProperty.call(d, "callee")) a.push.apply(a, d);
            else if (e)
                for (var f = a.length, g = d.length, h = 0; h < g; h++) a[f + h] = d[h];
            else a.push(d)
        }
    };
    goog.array.splice = function(a, b, c, d) {
        goog.asserts.assert(null != a.length);
        return goog.array.ARRAY_PROTOTYPE_.splice.apply(a, goog.array.slice(arguments, 1))
    };
    goog.array.slice = function(a, b, c) {
        goog.asserts.assert(null != a.length);
        return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call(a, b) : goog.array.ARRAY_PROTOTYPE_.slice.call(a, b, c)
    };
    goog.array.removeDuplicates = function(a, b) {
        for (var c = b || a, d = {}, e = 0, f = 0; f < a.length;) {
            var g = a[f++],
                h = goog.isObject(g) ? "o" + goog.getUid(g) : (typeof g).charAt(0) + g;
            Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, c[e++] = g)
        }
        c.length = e
    };
    goog.array.binarySearch = function(a, b, c) {
        return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
    };
    goog.array.binarySelect = function(a, b, c) {
        return goog.array.binarySearch_(a, b, !0, void 0, c)
    };
    goog.array.binarySearch_ = function(a, b, c, d, e) {
        for (var f = 0, g = a.length, h; f < g;) {
            var j = f + g >> 1,
                k;
            k = c ? b.call(e, a[j], j, a) : b(d, a[j]);
            0 < k ? f = j + 1 : (g = j, h = !k)
        }
        return h ? f : ~f
    };
    goog.array.sort = function(a, b) {
        goog.asserts.assert(null != a.length);
        goog.array.ARRAY_PROTOTYPE_.sort.call(a, b || goog.array.defaultCompare)
    };
    goog.array.stableSort = function(a, b) {
        for (var c = 0; c < a.length; c++) a[c] = {
            index: c,
            value: a[c]
        };
        var d = b || goog.array.defaultCompare;
        goog.array.sort(a, function(a, b) {
            return d(a.value, b.value) || a.index - b.index
        });
        for (c = 0; c < a.length; c++) a[c] = a[c].value
    };
    goog.array.sortObjectsByKey = function(a, b, c) {
        var d = c || goog.array.defaultCompare;
        goog.array.sort(a, function(a, c) {
            return d(a[b], c[b])
        })
    };
    goog.array.isSorted = function(a, b, c) {
        b = b || goog.array.defaultCompare;
        for (var d = 1; d < a.length; d++) {
            var e = b(a[d - 1], a[d]);
            if (0 < e || 0 == e && c) return !1
        }
        return !0
    };
    goog.array.equals = function(a, b, c) {
        if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) return !1;
        var d = a.length;
        c = c || goog.array.defaultCompareEquality;
        for (var e = 0; e < d; e++)
            if (!c(a[e], b[e])) return !1;
        return !0
    };
    goog.array.compare = function(a, b, c) {
        return goog.array.equals(a, b, c)
    };
    goog.array.compare3 = function(a, b, c) {
        c = c || goog.array.defaultCompare;
        for (var d = Math.min(a.length, b.length), e = 0; e < d; e++) {
            var f = c(a[e], b[e]);
            if (0 != f) return f
        }
        return goog.array.defaultCompare(a.length, b.length)
    };
    goog.array.defaultCompare = function(a, b) {
        return a > b ? 1 : a < b ? -1 : 0
    };
    goog.array.defaultCompareEquality = function(a, b) {
        return a === b
    };
    goog.array.binaryInsert = function(a, b, c) {
        c = goog.array.binarySearch(a, b, c);
        return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1
    };
    goog.array.binaryRemove = function(a, b, c) {
        b = goog.array.binarySearch(a, b, c);
        return 0 <= b ? goog.array.removeAt(a, b) : !1
    };
    goog.array.bucket = function(a, b) {
        for (var c = {}, d = 0; d < a.length; d++) {
            var e = a[d],
                f = b(e, d, a);
            goog.isDef(f) && (c[f] || (c[f] = [])).push(e)
        }
        return c
    };
    goog.array.toObject = function(a, b, c) {
        var d = {};
        goog.array.forEach(a, function(e, f) {
            d[b.call(c, e, f, a)] = e
        });
        return d
    };
    goog.array.repeat = function(a, b) {
        for (var c = [], d = 0; d < b; d++) c[d] = a;
        return c
    };
    goog.array.flatten = function(a) {
        for (var b = [], c = 0; c < arguments.length; c++) {
            var d = arguments[c];
            goog.isArray(d) ? b.push.apply(b, goog.array.flatten.apply(null, d)) : b.push(d)
        }
        return b
    };
    goog.array.rotate = function(a, b) {
        goog.asserts.assert(null != a.length);
        a.length && (b %= a.length, 0 < b ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(a, a.splice(-b, b)) : 0 > b && goog.array.ARRAY_PROTOTYPE_.push.apply(a, a.splice(0, -b)));
        return a
    };
    goog.array.zip = function(a) {
        if (!arguments.length) return [];
        for (var b = [], c = 0;; c++) {
            for (var d = [], e = 0; e < arguments.length; e++) {
                var f = arguments[e];
                if (c >= f.length) return b;
                d.push(f[c])
            }
            b.push(d)
        }
    };
    goog.array.shuffle = function(a, b) {
        for (var c = b || Math.random, d = a.length - 1; 0 < d; d--) {
            var e = Math.floor(c() * (d + 1)),
                f = a[d];
            a[d] = a[e];
            a[e] = f
        }
    };
    goog.structs.getCount = function(a) {
        return "function" == typeof a.getCount ? a.getCount() : goog.isArrayLike(a) || goog.isString(a) ? a.length : goog.object.getCount(a)
    };
    goog.structs.getValues = function(a) {
        if ("function" == typeof a.getValues) return a.getValues();
        if (goog.isString(a)) return a.split("");
        if (goog.isArrayLike(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b
        }
        return goog.object.getValues(a)
    };
    goog.structs.getKeys = function(a) {
        if ("function" == typeof a.getKeys) return a.getKeys();
        if ("function" != typeof a.getValues) {
            if (goog.isArrayLike(a) || goog.isString(a)) {
                var b = [];
                a = a.length;
                for (var c = 0; c < a; c++) b.push(c);
                return b
            }
            return goog.object.getKeys(a)
        }
    };
    goog.structs.contains = function(a, b) {
        return "function" == typeof a.contains ? a.contains(b) : "function" == typeof a.containsValue ? a.containsValue(b) : goog.isArrayLike(a) || goog.isString(a) ? goog.array.contains(a, b) : goog.object.containsValue(a, b)
    };
    goog.structs.isEmpty = function(a) {
        return "function" == typeof a.isEmpty ? a.isEmpty() : goog.isArrayLike(a) || goog.isString(a) ? goog.array.isEmpty(a) : goog.object.isEmpty(a)
    };
    goog.structs.clear = function(a) {
        "function" == typeof a.clear ? a.clear() : goog.isArrayLike(a) ? goog.array.clear(a) : goog.object.clear(a)
    };
    goog.structs.forEach = function(a, b, c) {
        if ("function" == typeof a.forEach) a.forEach(b, c);
        else if (goog.isArrayLike(a) || goog.isString(a)) goog.array.forEach(a, b, c);
        else
            for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++) b.call(c, e[g], d && d[g], a)
    };
    goog.structs.filter = function(a, b, c) {
        if ("function" == typeof a.filter) return a.filter(b, c);
        if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.filter(a, b, c);
        var d, e = goog.structs.getKeys(a),
            f = goog.structs.getValues(a),
            g = f.length;
        if (e) {
            d = {};
            for (var h = 0; h < g; h++) b.call(c, f[h], e[h], a) && (d[e[h]] = f[h])
        } else {
            d = [];
            for (h = 0; h < g; h++) b.call(c, f[h], void 0, a) && d.push(f[h])
        }
        return d
    };
    goog.structs.map = function(a, b, c) {
        if ("function" == typeof a.map) return a.map(b, c);
        if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.map(a, b, c);
        var d, e = goog.structs.getKeys(a),
            f = goog.structs.getValues(a),
            g = f.length;
        if (e) {
            d = {};
            for (var h = 0; h < g; h++) d[e[h]] = b.call(c, f[h], e[h], a)
        } else {
            d = [];
            for (h = 0; h < g; h++) d[h] = b.call(c, f[h], void 0, a)
        }
        return d
    };
    goog.structs.some = function(a, b, c) {
        if ("function" == typeof a.some) return a.some(b, c);
        if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.some(a, b, c);
        for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++)
            if (b.call(c, e[g], d && d[g], a)) return !0;
        return !1
    };
    goog.structs.every = function(a, b, c) {
        if ("function" == typeof a.every) return a.every(b, c);
        if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.every(a, b, c);
        for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++)
            if (!b.call(c, e[g], d && d[g], a)) return !1;
        return !0
    };
    goog.iter = {};
    goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : Error("StopIteration");
    goog.iter.Iterator = function() {};
    goog.iter.Iterator.prototype.next = function() {
        throw goog.iter.StopIteration;
    };
    goog.iter.Iterator.prototype.__iterator__ = function() {
        return this
    };
    goog.iter.toIterator = function(a) {
        if (a instanceof goog.iter.Iterator) return a;
        if ("function" == typeof a.__iterator__) return a.__iterator__(!1);
        if (goog.isArrayLike(a)) {
            var b = 0,
                c = new goog.iter.Iterator;
            c.next = function() {
                for (;;) {
                    if (b >= a.length) throw goog.iter.StopIteration;
                    if (b in a) return a[b++];
                    b++
                }
            };
            return c
        }
        throw Error("Not implemented");
    };
    goog.iter.forEach = function(a, b, c) {
        if (goog.isArrayLike(a)) try {
            goog.array.forEach(a, b, c)
        } catch (d) {
            if (d !== goog.iter.StopIteration) throw d;
        } else {
            a = goog.iter.toIterator(a);
            try {
                for (;;) b.call(c, a.next(), void 0, a)
            } catch (e) {
                if (e !== goog.iter.StopIteration) throw e;
            }
        }
    };
    goog.iter.filter = function(a, b, c) {
        var d = goog.iter.toIterator(a);
        a = new goog.iter.Iterator;
        a.next = function() {
            for (;;) {
                var a = d.next();
                if (b.call(c, a, void 0, d)) return a
            }
        };
        return a
    };
    goog.iter.range = function(a, b, c) {
        var d = 0,
            e = a,
            f = c || 1;
        1 < arguments.length && (d = a, e = b);
        if (0 == f) throw Error("Range step argument must not be zero");
        var g = new goog.iter.Iterator;
        g.next = function() {
            if (0 < f && d >= e || 0 > f && d <= e) throw goog.iter.StopIteration;
            var a = d;
            d += f;
            return a
        };
        return g
    };
    goog.iter.join = function(a, b) {
        return goog.iter.toArray(a).join(b)
    };
    goog.iter.map = function(a, b, c) {
        var d = goog.iter.toIterator(a);
        a = new goog.iter.Iterator;
        a.next = function() {
            for (;;) {
                var a = d.next();
                return b.call(c, a, void 0, d)
            }
        };
        return a
    };
    goog.iter.reduce = function(a, b, c, d) {
        var e = c;
        goog.iter.forEach(a, function(a) {
            e = b.call(d, e, a)
        });
        return e
    };
    goog.iter.some = function(a, b, c) {
        a = goog.iter.toIterator(a);
        try {
            for (;;)
                if (b.call(c, a.next(), void 0, a)) return !0
        } catch (d) {
            if (d !== goog.iter.StopIteration) throw d;
        }
        return !1
    };
    goog.iter.every = function(a, b, c) {
        a = goog.iter.toIterator(a);
        try {
            for (;;)
                if (!b.call(c, a.next(), void 0, a)) return !1
        } catch (d) {
            if (d !== goog.iter.StopIteration) throw d;
        }
        return !0
    };
    goog.iter.chain = function(a) {
        var b = arguments,
            c = b.length,
            d = 0,
            e = new goog.iter.Iterator;
        e.next = function() {
            try {
                if (d >= c) throw goog.iter.StopIteration;
                return goog.iter.toIterator(b[d]).next()
            } catch (a) {
                if (a !== goog.iter.StopIteration || d >= c) throw a;
                d++;
                return this.next()
            }
        };
        return e
    };
    goog.iter.dropWhile = function(a, b, c) {
        var d = goog.iter.toIterator(a);
        a = new goog.iter.Iterator;
        var e = !0;
        a.next = function() {
            for (;;) {
                var a = d.next();
                if (!e || !b.call(c, a, void 0, d)) return e = !1, a
            }
        };
        return a
    };
    goog.iter.takeWhile = function(a, b, c) {
        var d = goog.iter.toIterator(a);
        a = new goog.iter.Iterator;
        var e = !0;
        a.next = function() {
            for (;;)
                if (e) {
                    var a = d.next();
                    if (b.call(c, a, void 0, d)) return a;
                    e = !1
                } else throw goog.iter.StopIteration;
        };
        return a
    };
    goog.iter.toArray = function(a) {
        if (goog.isArrayLike(a)) return goog.array.toArray(a);
        a = goog.iter.toIterator(a);
        var b = [];
        goog.iter.forEach(a, function(a) {
            b.push(a)
        });
        return b
    };
    goog.iter.equals = function(a, b) {
        a = goog.iter.toIterator(a);
        b = goog.iter.toIterator(b);
        var c, d;
        try {
            for (;;) {
                c = d = !1;
                var e = a.next();
                c = !0;
                var f = b.next();
                d = !0;
                if (e != f) break
            }
        } catch (g) {
            if (g !== goog.iter.StopIteration) throw g;
            if (c && !d) return !1;
            if (!d) try {
                b.next()
            } catch (h) {
                if (h !== goog.iter.StopIteration) throw h;
                return !0
            }
        }
        return !1
    };
    goog.iter.nextOrValue = function(a, b) {
        try {
            return goog.iter.toIterator(a).next()
        } catch (c) {
            if (c != goog.iter.StopIteration) throw c;
            return b
        }
    };
    goog.iter.product = function(a) {
        if (goog.array.some(arguments, function(a) {
                return !a.length
            }) || !arguments.length) return new goog.iter.Iterator;
        var b = new goog.iter.Iterator,
            c = arguments,
            d = goog.array.repeat(0, c.length);
        b.next = function() {
            if (d) {
                for (var a = goog.array.map(d, function(a, b) {
                        return c[b][a]
                    }), b = d.length - 1; 0 <= b; b--) {
                    goog.asserts.assert(d);
                    if (d[b] < c[b].length - 1) {
                        d[b]++;
                        break
                    }
                    if (0 == b) {
                        d = null;
                        break
                    }
                    d[b] = 0
                }
                return a
            }
            throw goog.iter.StopIteration;
        };
        return b
    };
    goog.iter.cycle = function(a) {
        var b = goog.iter.toIterator(a),
            c = [],
            d = 0;
        a = new goog.iter.Iterator;
        var e = !1;
        a.next = function() {
            var a = null;
            if (!e) try {
                return a = b.next(), c.push(a), a
            } catch (g) {
                if (g != goog.iter.StopIteration || goog.array.isEmpty(c)) throw g;
                e = !0
            }
            a = c[d];
            d = (d + 1) % c.length;
            return a
        };
        return a
    };
    goog.structs.Map = function(a, b) {
        this.map_ = {};
        this.keys_ = [];
        var c = arguments.length;
        if (1 < c) {
            if (c % 2) throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
        } else a && this.addAll(a)
    };
    goog.structs.Map.prototype.count_ = 0;
    goog.structs.Map.prototype.version_ = 0;
    goog.structs.Map.prototype.getCount = function() {
        return this.count_
    };
    goog.structs.Map.prototype.getValues = function() {
        this.cleanupKeysArray_();
        for (var a = [], b = 0; b < this.keys_.length; b++) a.push(this.map_[this.keys_[b]]);
        return a
    };
    goog.structs.Map.prototype.getKeys = function() {
        this.cleanupKeysArray_();
        return this.keys_.concat()
    };
    goog.structs.Map.prototype.containsKey = function(a) {
        return goog.structs.Map.hasKey_(this.map_, a)
    };
    goog.structs.Map.prototype.containsValue = function(a) {
        for (var b = 0; b < this.keys_.length; b++) {
            var c = this.keys_[b];
            if (goog.structs.Map.hasKey_(this.map_, c) && this.map_[c] == a) return !0
        }
        return !1
    };
    goog.structs.Map.prototype.equals = function(a, b) {
        if (this === a) return !0;
        if (this.count_ != a.getCount()) return !1;
        var c = b || goog.structs.Map.defaultEquals;
        this.cleanupKeysArray_();
        for (var d, e = 0; d = this.keys_[e]; e++)
            if (!c(this.get(d), a.get(d))) return !1;
        return !0
    };
    goog.structs.Map.defaultEquals = function(a, b) {
        return a === b
    };
    goog.structs.Map.prototype.isEmpty = function() {
        return 0 == this.count_
    };
    goog.structs.Map.prototype.clear = function() {
        this.map_ = {};
        this.version_ = this.count_ = this.keys_.length = 0
    };
    goog.structs.Map.prototype.remove = function(a) {
        return goog.structs.Map.hasKey_(this.map_, a) ? (delete this.map_[a], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1
    };
    goog.structs.Map.prototype.cleanupKeysArray_ = function() {
        if (this.count_ != this.keys_.length) {
            for (var a = 0, b = 0; a < this.keys_.length;) {
                var c = this.keys_[a];
                goog.structs.Map.hasKey_(this.map_, c) && (this.keys_[b++] = c);
                a++
            }
            this.keys_.length = b
        }
        if (this.count_ != this.keys_.length) {
            for (var d = {}, b = a = 0; a < this.keys_.length;) c = this.keys_[a], goog.structs.Map.hasKey_(d, c) || (this.keys_[b++] = c, d[c] = 1), a++;
            this.keys_.length = b
        }
    };
    goog.structs.Map.prototype.get = function(a, b) {
        return goog.structs.Map.hasKey_(this.map_, a) ? this.map_[a] : b
    };
    goog.structs.Map.prototype.set = function(a, b) {
        goog.structs.Map.hasKey_(this.map_, a) || (this.count_++, this.keys_.push(a), this.version_++);
        this.map_[a] = b
    };
    goog.structs.Map.prototype.addAll = function(a) {
        var b;
        a instanceof goog.structs.Map ? (b = a.getKeys(), a = a.getValues()) : (b = goog.object.getKeys(a), a = goog.object.getValues(a));
        for (var c = 0; c < b.length; c++) this.set(b[c], a[c])
    };
    goog.structs.Map.prototype.clone = function() {
        return new goog.structs.Map(this)
    };
    goog.structs.Map.prototype.transpose = function() {
        for (var a = new goog.structs.Map, b = 0; b < this.keys_.length; b++) {
            var c = this.keys_[b];
            a.set(this.map_[c], c)
        }
        return a
    };
    goog.structs.Map.prototype.toObject = function() {
        this.cleanupKeysArray_();
        for (var a = {}, b = 0; b < this.keys_.length; b++) {
            var c = this.keys_[b];
            a[c] = this.map_[c]
        }
        return a
    };
    goog.structs.Map.prototype.getKeyIterator = function() {
        return this.__iterator__(!0)
    };
    goog.structs.Map.prototype.getValueIterator = function() {
        return this.__iterator__(!1)
    };
    goog.structs.Map.prototype.__iterator__ = function(a) {
        this.cleanupKeysArray_();
        var b = 0,
            c = this.keys_,
            d = this.map_,
            e = this.version_,
            f = this,
            g = new goog.iter.Iterator;
        g.next = function() {
            for (;;) {
                if (e != f.version_) throw Error("The map has changed since the iterator was created");
                if (b >= c.length) throw goog.iter.StopIteration;
                var g = c[b++];
                return a ? g : d[g]
            }
        };
        return g
    };
    goog.structs.Map.hasKey_ = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    goog.structs.Set = function(a) {
        this.map_ = new goog.structs.Map;
        a && this.addAll(a)
    };
    goog.structs.Set.getKey_ = function(a) {
        var b = typeof a;
        return "object" == b && a || "function" == b ? "o" + goog.getUid(a) : b.substr(0, 1) + a
    };
    goog.structs.Set.prototype.getCount = function() {
        return this.map_.getCount()
    };
    goog.structs.Set.prototype.add = function(a) {
        this.map_.set(goog.structs.Set.getKey_(a), a)
    };
    goog.structs.Set.prototype.addAll = function(a) {
        a = goog.structs.getValues(a);
        for (var b = a.length, c = 0; c < b; c++) this.add(a[c])
    };
    goog.structs.Set.prototype.removeAll = function(a) {
        a = goog.structs.getValues(a);
        for (var b = a.length, c = 0; c < b; c++) this.remove(a[c])
    };
    goog.structs.Set.prototype.remove = function(a) {
        return this.map_.remove(goog.structs.Set.getKey_(a))
    };
    goog.structs.Set.prototype.clear = function() {
        this.map_.clear()
    };
    goog.structs.Set.prototype.isEmpty = function() {
        return this.map_.isEmpty()
    };
    goog.structs.Set.prototype.contains = function(a) {
        return this.map_.containsKey(goog.structs.Set.getKey_(a))
    };
    goog.structs.Set.prototype.containsAll = function(a) {
        return goog.structs.every(a, this.contains, this)
    };
    goog.structs.Set.prototype.intersection = function(a) {
        var b = new goog.structs.Set;
        a = goog.structs.getValues(a);
        for (var c = 0; c < a.length; c++) {
            var d = a[c];
            this.contains(d) && b.add(d)
        }
        return b
    };
    goog.structs.Set.prototype.difference = function(a) {
        var b = this.clone();
        b.removeAll(a);
        return b
    };
    goog.structs.Set.prototype.getValues = function() {
        return this.map_.getValues()
    };
    goog.structs.Set.prototype.clone = function() {
        return new goog.structs.Set(this)
    };
    goog.structs.Set.prototype.equals = function(a) {
        return this.getCount() == goog.structs.getCount(a) && this.isSubsetOf(a)
    };
    goog.structs.Set.prototype.isSubsetOf = function(a) {
        var b = goog.structs.getCount(a);
        if (this.getCount() > b) return !1;
        !(a instanceof goog.structs.Set) && 5 < b && (a = new goog.structs.Set(a));
        return goog.structs.every(this, function(b) {
            return goog.structs.contains(a, b)
        })
    };
    goog.structs.Set.prototype.__iterator__ = function() {
        return this.map_.__iterator__(!1)
    };
    goog.debug.catchErrors = function(a, b, c) {
        c = c || goog.global;
        var d = c.onerror,
            e = !!b;
        goog.userAgent.WEBKIT && !goog.userAgent.isVersion("535.3") && (e = !e);
        c.onerror = function(b, c, h) {
            d && d(b, c, h);
            a({
                message: b,
                fileName: c,
                line: h
            });
            return e
        }
    };
    goog.debug.expose = function(a, b) {
        if ("undefined" == typeof a) return "undefined";
        if (null == a) return "NULL";
        var c = [],
            d;
        for (d in a)
            if (b || !goog.isFunction(a[d])) {
                var e = d + " = ";
                try {
                    e += a[d]
                } catch (f) {
                    e += "*** " + f + " ***"
                }
                c.push(e)
            }
        return c.join("\n")
    };
    goog.debug.deepExpose = function(a, b) {
        var c = new goog.structs.Set,
            d = [],
            e = function(a, g) {
                var h = g + "  ";
                try {
                    if (goog.isDef(a))
                        if (goog.isNull(a)) d.push("NULL");
                        else if (goog.isString(a)) d.push('"' + a.replace(/\n/g, "\n" + g) + '"');
                    else if (goog.isFunction(a)) d.push(String(a).replace(/\n/g, "\n" + g));
                    else if (goog.isObject(a))
                        if (c.contains(a)) d.push("*** reference loop detected ***");
                        else {
                            c.add(a);
                            d.push("{");
                            for (var j in a)
                                if (b || !goog.isFunction(a[j])) d.push("\n"), d.push(h), d.push(j + " = "), e(a[j], h);
                            d.push("\n" + g + "}")
                        }
                    else d.push(a);
                    else d.push("undefined")
                } catch (k) {
                    d.push("*** " + k + " ***")
                }
            };
        e(a, "");
        return d.join("")
    };
    goog.debug.exposeArray = function(a) {
        for (var b = [], c = 0; c < a.length; c++) goog.isArray(a[c]) ? b.push(goog.debug.exposeArray(a[c])) : b.push(a[c]);
        return "[ " + b.join(", ") + " ]"
    };
    goog.debug.exposeException = function(a, b) {
        try {
            var c = goog.debug.normalizeErrorObject(a);
            return "Message: " + goog.string.htmlEscape(c.message) + '\nUrl: <a href="view-source:' + c.fileName + '" target="_new">' + c.fileName + "</a>\nLine: " + c.lineNumber + "\n\nBrowser stack:\n" + goog.string.htmlEscape(c.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + goog.string.htmlEscape(goog.debug.getStacktrace(b) + "-> ")
        } catch (d) {
            return "Exception trying to expose exception! You win, we lose. " + d
        }
    };
    goog.debug.normalizeErrorObject = function(a) {
        var b = goog.getObjectByName("window.location.href");
        if (goog.isString(a)) return {
            message: a,
            name: "Unknown error",
            lineNumber: "Not available",
            fileName: b,
            stack: "Not available"
        };
        var c, d, e = !1;
        try {
            c = a.lineNumber || a.line || "Not available"
        } catch (f) {
            c = "Not available", e = !0
        }
        try {
            d = a.fileName || a.filename || a.sourceURL || b
        } catch (g) {
            d = "Not available", e = !0
        }
        return e || !a.lineNumber || !a.fileName || !a.stack ? {
                message: a.message,
                name: a.name,
                lineNumber: c,
                fileName: d,
                stack: a.stack || "Not available"
            } :
            a
    };
    goog.debug.enhanceError = function(a, b) {
        var c = "string" == typeof a ? Error(a) : a;
        c.stack || (c.stack = goog.debug.getStacktrace(arguments.callee.caller));
        if (b) {
            for (var d = 0; c["message" + d];) ++d;
            c["message" + d] = String(b)
        }
        return c
    };
    goog.debug.getStacktraceSimple = function(a) {
        for (var b = [], c = arguments.callee.caller, d = 0; c && (!a || d < a);) {
            b.push(goog.debug.getFunctionName(c));
            b.push("()\n");
            try {
                c = c.caller
            } catch (e) {
                b.push("[exception trying to get caller]\n");
                break
            }
            d++;
            if (d >= goog.debug.MAX_STACK_DEPTH) {
                b.push("[...long stack...]");
                break
            }
        }
        a && d >= a ? b.push("[...reached max depth limit...]") : b.push("[end]");
        return b.join("")
    };
    goog.debug.MAX_STACK_DEPTH = 50;
    goog.debug.getStacktrace = function(a) {
        return goog.debug.getStacktraceHelper_(a || arguments.callee.caller, [])
    };
    goog.debug.getStacktraceHelper_ = function(a, b) {
        var c = [];
        if (goog.array.contains(b, a)) c.push("[...circular reference...]");
        else if (a && b.length < goog.debug.MAX_STACK_DEPTH) {
            c.push(goog.debug.getFunctionName(a) + "(");
            for (var d = a.arguments, e = 0; e < d.length; e++) {
                0 < e && c.push(", ");
                var f;
                f = d[e];
                switch (typeof f) {
                    case "object":
                        f = f ? "object" : "null";
                        break;
                    case "string":
                        break;
                    case "number":
                        f = String(f);
                        break;
                    case "boolean":
                        f = f ? "true" : "false";
                        break;
                    case "function":
                        f = (f = goog.debug.getFunctionName(f)) ? f : "[fn]";
                        break;
                    default:
                        f =
                            typeof f
                }
                40 < f.length && (f = f.substr(0, 40) + "...");
                c.push(f)
            }
            b.push(a);
            c.push(")\n");
            try {
                c.push(goog.debug.getStacktraceHelper_(a.caller, b))
            } catch (g) {
                c.push("[exception trying to get caller]\n")
            }
        } else a ? c.push("[...long stack...]") : c.push("[end]");
        return c.join("")
    };
    goog.debug.setFunctionResolver = function(a) {
        goog.debug.fnNameResolver_ = a
    };
    goog.debug.getFunctionName = function(a) {
        if (goog.debug.fnNameCache_[a]) return goog.debug.fnNameCache_[a];
        if (goog.debug.fnNameResolver_) {
            var b = goog.debug.fnNameResolver_(a);
            if (b) return goog.debug.fnNameCache_[a] = b
        }
        a = String(a);
        goog.debug.fnNameCache_[a] || (b = /function ([^\(]+)/.exec(a), goog.debug.fnNameCache_[a] = b ? b[1] : "[Anonymous]");
        return goog.debug.fnNameCache_[a]
    };
    goog.debug.makeWhitespaceVisible = function(a) {
        return a.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
    };
    goog.debug.fnNameCache_ = {};
    goog.disposable = {};
    goog.disposable.IDisposable = function() {};
    goog.Disposable = function() {
        goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (this.creationStack = Error().stack, goog.Disposable.instances_[goog.getUid(this)] = this)
    };
    goog.Disposable.MonitoringMode = {
        OFF: 0,
        PERMANENT: 1,
        INTERACTIVE: 2
    };
    goog.Disposable.MONITORING_MODE = 0;
    goog.Disposable.instances_ = {};
    goog.Disposable.getUndisposedObjects = function() {
        var a = [],
            b;
        for (b in goog.Disposable.instances_) goog.Disposable.instances_.hasOwnProperty(b) && a.push(goog.Disposable.instances_[Number(b)]);
        return a
    };
    goog.Disposable.clearUndisposedObjects = function() {
        goog.Disposable.instances_ = {}
    };
    goog.Disposable.prototype.disposed_ = !1;
    goog.Disposable.prototype.isDisposed = function() {
        return this.disposed_
    };
    goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
    goog.Disposable.prototype.dispose = function() {
        if (!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
            var a = goog.getUid(this);
            if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(a)) throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
            delete goog.Disposable.instances_[a]
        }
    };
    goog.Disposable.prototype.registerDisposable = function(a) {
        this.dependentDisposables_ || (this.dependentDisposables_ = []);
        this.dependentDisposables_.push(a)
    };
    goog.Disposable.prototype.addOnDisposeCallback = function(a, b) {
        this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []);
        this.onDisposeCallbacks_.push(goog.bind(a, b))
    };
    goog.Disposable.prototype.disposeInternal = function() {
        this.dependentDisposables_ && goog.disposeAll.apply(null, this.dependentDisposables_);
        if (this.onDisposeCallbacks_)
            for (; this.onDisposeCallbacks_.length;) this.onDisposeCallbacks_.shift()()
    };
    goog.Disposable.isDisposed = function(a) {
        return a && "function" == typeof a.isDisposed ? a.isDisposed() : !1
    };
    goog.dispose = function(a) {
        a && "function" == typeof a.dispose && a.dispose()
    };
    goog.disposeAll = function(a) {
        for (var b = 0, c = arguments.length; b < c; ++b) {
            var d = arguments[b];
            goog.isArrayLike(d) ? goog.disposeAll.apply(null, d) : goog.dispose(d)
        }
    };
    goog.structs.SimplePool = function(a, b) {
        goog.Disposable.call(this);
        this.maxCount_ = b;
        this.freeQueue_ = [];
        this.createInitial_(a)
    };
    goog.inherits(goog.structs.SimplePool, goog.Disposable);
    goog.structs.SimplePool.prototype.createObjectFn_ = null;
    goog.structs.SimplePool.prototype.disposeObjectFn_ = null;
    goog.structs.SimplePool.prototype.setCreateObjectFn = function(a) {
        this.createObjectFn_ = a
    };
    goog.structs.SimplePool.prototype.setDisposeObjectFn = function(a) {
        this.disposeObjectFn_ = a
    };
    goog.structs.SimplePool.prototype.getObject = function() {
        return this.freeQueue_.length ? this.freeQueue_.pop() : this.createObject()
    };
    goog.structs.SimplePool.prototype.releaseObject = function(a) {
        this.freeQueue_.length < this.maxCount_ ? this.freeQueue_.push(a) : this.disposeObject(a)
    };
    goog.structs.SimplePool.prototype.createInitial_ = function(a) {
        if (a > this.maxCount_) throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");
        for (var b = 0; b < a; b++) this.freeQueue_.push(this.createObject())
    };
    goog.structs.SimplePool.prototype.createObject = function() {
        return this.createObjectFn_ ? this.createObjectFn_() : {}
    };
    goog.structs.SimplePool.prototype.disposeObject = function(a) {
        if (this.disposeObjectFn_) this.disposeObjectFn_(a);
        else if (goog.isObject(a))
            if (goog.isFunction(a.dispose)) a.dispose();
            else
                for (var b in a) delete a[b]
    };
    goog.structs.SimplePool.prototype.disposeInternal = function() {
        goog.structs.SimplePool.superClass_.disposeInternal.call(this);
        for (var a = this.freeQueue_; a.length;) this.disposeObject(a.pop());
        delete this.freeQueue_
    };
    goog.debug.LogRecord = function(a, b, c, d, e) {
        this.reset(a, b, c, d, e)
    };
    goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
    goog.debug.LogRecord.prototype.exception_ = null;
    goog.debug.LogRecord.prototype.exceptionText_ = null;
    goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0;
    goog.debug.LogRecord.nextSequenceNumber_ = 0;
    goog.debug.LogRecord.prototype.reset = function(a, b, c, d, e) {
        goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && (this.sequenceNumber_ = "number" == typeof e ? e : goog.debug.LogRecord.nextSequenceNumber_++);
        this.time_ = d || goog.now();
        this.level_ = a;
        this.msg_ = b;
        this.loggerName_ = c;
        delete this.exception_;
        delete this.exceptionText_
    };
    goog.debug.LogRecord.prototype.getLoggerName = function() {
        return this.loggerName_
    };
    goog.debug.LogRecord.prototype.getException = function() {
        return this.exception_
    };
    goog.debug.LogRecord.prototype.setException = function(a) {
        this.exception_ = a
    };
    goog.debug.LogRecord.prototype.getExceptionText = function() {
        return this.exceptionText_
    };
    goog.debug.LogRecord.prototype.setExceptionText = function(a) {
        this.exceptionText_ = a
    };
    goog.debug.LogRecord.prototype.setLoggerName = function(a) {
        this.loggerName_ = a
    };
    goog.debug.LogRecord.prototype.getLevel = function() {
        return this.level_
    };
    goog.debug.LogRecord.prototype.setLevel = function(a) {
        this.level_ = a
    };
    goog.debug.LogRecord.prototype.getMessage = function() {
        return this.msg_
    };
    goog.debug.LogRecord.prototype.setMessage = function(a) {
        this.msg_ = a
    };
    goog.debug.LogRecord.prototype.getMillis = function() {
        return this.time_
    };
    goog.debug.LogRecord.prototype.setMillis = function(a) {
        this.time_ = a
    };
    goog.debug.LogRecord.prototype.getSequenceNumber = function() {
        return this.sequenceNumber_
    };
    goog.debug.LogBuffer = function() {
        goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");
        this.clear()
    };
    goog.debug.LogBuffer.getInstance = function() {
        goog.debug.LogBuffer.instance_ || (goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer);
        return goog.debug.LogBuffer.instance_
    };
    goog.debug.LogBuffer.CAPACITY = 0;
    goog.debug.LogBuffer.prototype.addRecord = function(a, b, c) {
        var d = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
        this.curIndex_ = d;
        if (this.isFull_) return d = this.buffer_[d], d.reset(a, b, c), d;
        this.isFull_ = d == goog.debug.LogBuffer.CAPACITY - 1;
        return this.buffer_[d] = new goog.debug.LogRecord(a, b, c)
    };
    goog.debug.LogBuffer.isBufferingEnabled = function() {
        return 0 < goog.debug.LogBuffer.CAPACITY
    };
    goog.debug.LogBuffer.prototype.clear = function() {
        this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY);
        this.curIndex_ = -1;
        this.isFull_ = !1
    };
    goog.debug.LogBuffer.prototype.forEachRecord = function(a) {
        var b = this.buffer_;
        if (b[0]) {
            var c = this.curIndex_,
                d = this.isFull_ ? c : -1;
            do d = (d + 1) % goog.debug.LogBuffer.CAPACITY, a(b[d]); while (d != c)
        }
    };
    goog.debug.Logger = function(a) {
        this.name_ = a
    };
    goog.debug.Logger.prototype.parent_ = null;
    goog.debug.Logger.prototype.level_ = null;
    goog.debug.Logger.prototype.children_ = null;
    goog.debug.Logger.prototype.handlers_ = null;
    goog.debug.Logger.ENABLE_HIERARCHY = !0;
    goog.debug.Logger.ENABLE_HIERARCHY || (goog.debug.Logger.rootHandlers_ = []);
    goog.debug.Logger.Level = function(a, b) {
        this.name = a;
        this.value = b
    };
    goog.debug.Logger.Level.prototype.toString = function() {
        return this.name
    };
    goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
    goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
    goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
    goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
    goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
    goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
    goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
    goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
    goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
    goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
    goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
    goog.debug.Logger.Level.predefinedLevelsCache_ = null;
    goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
        goog.debug.Logger.Level.predefinedLevelsCache_ = {};
        for (var a = 0, b; b = goog.debug.Logger.Level.PREDEFINED_LEVELS[a]; a++) goog.debug.Logger.Level.predefinedLevelsCache_[b.value] = b, goog.debug.Logger.Level.predefinedLevelsCache_[b.name] = b
    };
    goog.debug.Logger.Level.getPredefinedLevel = function(a) {
        goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
        return goog.debug.Logger.Level.predefinedLevelsCache_[a] || null
    };
    goog.debug.Logger.Level.getPredefinedLevelByValue = function(a) {
        goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
        if (a in goog.debug.Logger.Level.predefinedLevelsCache_) return goog.debug.Logger.Level.predefinedLevelsCache_[a];
        for (var b = 0; b < goog.debug.Logger.Level.PREDEFINED_LEVELS.length; ++b) {
            var c = goog.debug.Logger.Level.PREDEFINED_LEVELS[b];
            if (c.value <= a) return c
        }
        return null
    };
    goog.debug.Logger.getLogger = function(a) {
        return goog.debug.LogManager.getLogger(a)
    };
    goog.debug.Logger.logToProfilers = function(a) {
        goog.global.console && (goog.global.console.timeStamp ? goog.global.console.timeStamp(a) : goog.global.console.markTimeline && goog.global.console.markTimeline(a));
        goog.global.msWriteProfilerMark && goog.global.msWriteProfilerMark(a)
    };
    goog.debug.Logger.prototype.getName = function() {
        return this.name_
    };
    goog.debug.Logger.prototype.addHandler = function(a) {
        goog.debug.Logger.ENABLE_HIERARCHY ? (this.handlers_ || (this.handlers_ = []), this.handlers_.push(a)) : (goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootHandlers_.push(a))
    };
    goog.debug.Logger.prototype.removeHandler = function(a) {
        var b = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
        return !!b && goog.array.remove(b, a)
    };
    goog.debug.Logger.prototype.getParent = function() {
        return this.parent_
    };
    goog.debug.Logger.prototype.getChildren = function() {
        this.children_ || (this.children_ = {});
        return this.children_
    };
    goog.debug.Logger.prototype.setLevel = function(a) {
        goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ = a : (goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootLevel_ = a)
    };
    goog.debug.Logger.prototype.getLevel = function() {
        return this.level_
    };
    goog.debug.Logger.prototype.getEffectiveLevel = function() {
        if (!goog.debug.Logger.ENABLE_HIERARCHY) return goog.debug.Logger.rootLevel_;
        if (this.level_) return this.level_;
        if (this.parent_) return this.parent_.getEffectiveLevel();
        goog.asserts.fail("Root logger has no level set.");
        return null
    };
    goog.debug.Logger.prototype.isLoggable = function(a) {
        return a.value >= this.getEffectiveLevel().value
    };
    goog.debug.Logger.prototype.log = function(a, b, c) {
        this.isLoggable(a) && this.doLogRecord_(this.getLogRecord(a, b, c))
    };
    goog.debug.Logger.prototype.getLogRecord = function(a, b, c) {
        var d = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord(a, b, this.name_) : new goog.debug.LogRecord(a, String(b), this.name_);
        c && (d.setException(c), d.setExceptionText(goog.debug.exposeException(c, arguments.callee.caller)));
        return d
    };
    goog.debug.Logger.prototype.shout = function(a, b) {
        this.log(goog.debug.Logger.Level.SHOUT, a, b)
    };
    goog.debug.Logger.prototype.severe = function(a, b) {
        this.log(goog.debug.Logger.Level.SEVERE, a, b)
    };
    goog.debug.Logger.prototype.warning = function(a, b) {
        this.log(goog.debug.Logger.Level.WARNING, a, b)
    };
    goog.debug.Logger.prototype.info = function(a, b) {
        this.log(goog.debug.Logger.Level.INFO, a, b)
    };
    goog.debug.Logger.prototype.config = function(a, b) {
        this.log(goog.debug.Logger.Level.CONFIG, a, b)
    };
    goog.debug.Logger.prototype.fine = function(a, b) {
        this.log(goog.debug.Logger.Level.FINE, a, b)
    };
    goog.debug.Logger.prototype.finer = function(a, b) {
        this.log(goog.debug.Logger.Level.FINER, a, b)
    };
    goog.debug.Logger.prototype.finest = function(a, b) {
        this.log(goog.debug.Logger.Level.FINEST, a, b)
    };
    goog.debug.Logger.prototype.logRecord = function(a) {
        this.isLoggable(a.getLevel()) && this.doLogRecord_(a)
    };
    goog.debug.Logger.prototype.doLogRecord_ = function(a) {
        goog.debug.Logger.logToProfilers("log:" + a.getMessage());
        if (goog.debug.Logger.ENABLE_HIERARCHY)
            for (var b = this; b;) b.callPublish_(a), b = b.getParent();
        else
            for (var b = 0, c; c = goog.debug.Logger.rootHandlers_[b++];) c(a)
    };
    goog.debug.Logger.prototype.callPublish_ = function(a) {
        if (this.handlers_)
            for (var b = 0, c; c = this.handlers_[b]; b++) c(a)
    };
    goog.debug.Logger.prototype.setParent_ = function(a) {
        this.parent_ = a
    };
    goog.debug.Logger.prototype.addChild_ = function(a, b) {
        this.getChildren()[a] = b
    };
    goog.debug.LogManager = {};
    goog.debug.LogManager.loggers_ = {};
    goog.debug.LogManager.rootLogger_ = null;
    goog.debug.LogManager.initialize = function() {
        goog.debug.LogManager.rootLogger_ || (goog.debug.LogManager.rootLogger_ = new goog.debug.Logger(""), goog.debug.LogManager.loggers_[""] = goog.debug.LogManager.rootLogger_, goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG))
    };
    goog.debug.LogManager.getLoggers = function() {
        return goog.debug.LogManager.loggers_
    };
    goog.debug.LogManager.getRoot = function() {
        goog.debug.LogManager.initialize();
        return goog.debug.LogManager.rootLogger_
    };
    goog.debug.LogManager.getLogger = function(a) {
        goog.debug.LogManager.initialize();
        return goog.debug.LogManager.loggers_[a] || goog.debug.LogManager.createLogger_(a)
    };
    goog.debug.LogManager.createFunctionForCatchErrors = function(a) {
        return function(b) {
            (a || goog.debug.LogManager.getRoot()).severe("Error: " + b.message + " (" + b.fileName + " @ Line: " + b.line + ")")
        }
    };
    goog.debug.LogManager.createLogger_ = function(a) {
        var b = new goog.debug.Logger(a);
        if (goog.debug.Logger.ENABLE_HIERARCHY) {
            var c = a.lastIndexOf("."),
                d = a.substr(0, c),
                c = a.substr(c + 1),
                d = goog.debug.LogManager.getLogger(d);
            d.addChild_(c, b);
            b.setParent_(d)
        }
        return goog.debug.LogManager.loggers_[a] = b
    };
    goog.debug.Trace_ = function() {
        this.events_ = [];
        this.outstandingEvents_ = new goog.structs.Map;
        this.tracerOverheadComment_ = this.tracerOverheadEnd_ = this.tracerOverheadStart_ = this.startTime_ = 0;
        this.stats_ = new goog.structs.Map;
        this.commentCount_ = this.tracerCount_ = 0;
        this.nextId_ = 1;
        this.eventPool_ = new goog.structs.SimplePool(0, 4E3);
        this.eventPool_.createObject = function() {
            return new goog.debug.Trace_.Event_
        };
        this.statPool_ = new goog.structs.SimplePool(0, 50);
        this.statPool_.createObject = function() {
            return new goog.debug.Trace_.Stat_
        };
        var a = this;
        this.idPool_ = new goog.structs.SimplePool(0, 2E3);
        this.idPool_.createObject = function() {
            return String(a.nextId_++)
        };
        this.idPool_.disposeObject = function() {};
        this.defaultThreshold_ = 3
    };
    goog.debug.Trace_.prototype.logger_ = goog.debug.Logger.getLogger("goog.debug.Trace");
    goog.debug.Trace_.prototype.MAX_TRACE_SIZE = 1E3;
    goog.debug.Trace_.EventType = {
        START: 0,
        STOP: 1,
        COMMENT: 2
    };
    goog.debug.Trace_.Stat_ = function() {
        this.varAlloc = this.time = this.count = 0
    };
    goog.debug.Trace_.Stat_.prototype.toString = function() {
        var a = [];
        a.push(this.type, " ", this.count, " (", Math.round(10 * this.time) / 10, " ms)");
        this.varAlloc && a.push(" [VarAlloc = ", this.varAlloc, "]");
        return a.join("")
    };
    goog.debug.Trace_.Event_ = function() {};
    goog.debug.Trace_.Event_.prototype.toTraceString = function(a, b, c) {
        var d = []; - 1 == b ? d.push("    ") : d.push(goog.debug.Trace_.longToPaddedString_(this.eventTime - b));
        d.push(" ", goog.debug.Trace_.formatTime_(this.eventTime - a));
        this.eventType == goog.debug.Trace_.EventType.START ? d.push(" Start        ") : this.eventType == goog.debug.Trace_.EventType.STOP ? (d.push(" Done "), d.push(goog.debug.Trace_.longToPaddedString_(this.stopTime - this.startTime), " ms ")) : d.push(" Comment      ");
        d.push(c, this);
        0 < this.totalVarAlloc &&
            d.push("[VarAlloc ", this.totalVarAlloc, "] ");
        return d.join("")
    };
    goog.debug.Trace_.Event_.prototype.toString = function() {
        return null == this.type ? this.comment : "[" + this.type + "] " + this.comment
    };
    goog.debug.Trace_.prototype.setStartTime = function(a) {
        this.startTime_ = a
    };
    goog.debug.Trace_.prototype.initCurrentTrace = function(a) {
        this.reset(a)
    };
    goog.debug.Trace_.prototype.clearCurrentTrace = function() {
        this.reset(0)
    };
    goog.debug.Trace_.prototype.reset = function(a) {
        this.defaultThreshold_ = a;
        for (a = 0; a < this.events_.length; a++) {
            var b = this.eventPool_.id;
            b && this.idPool_.releaseObject(b);
            this.eventPool_.releaseObject(this.events_[a])
        }
        this.events_.length = 0;
        this.outstandingEvents_.clear();
        this.startTime_ = goog.debug.Trace_.now();
        this.commentCount_ = this.tracerCount_ = this.tracerOverheadComment_ = this.tracerOverheadEnd_ = this.tracerOverheadStart_ = 0;
        b = this.stats_.getKeys();
        for (a = 0; a < b.length; a++) {
            var c = this.stats_.get(b[a]);
            c.count =
                0;
            c.time = 0;
            c.varAlloc = 0;
            this.statPool_.releaseObject(c)
        }
        this.stats_.clear()
    };
    goog.debug.Trace_.prototype.startTracer = function(a, b) {
        var c = goog.debug.Trace_.now(),
            d = this.getTotalVarAlloc(),
            e = this.outstandingEvents_.getCount();
        if (this.events_.length + e > this.MAX_TRACE_SIZE) {
            this.logger_.warning("Giant thread trace. Clearing to avoid memory leak.");
            if (this.events_.length > this.MAX_TRACE_SIZE / 2) {
                for (var f = 0; f < this.events_.length; f++) {
                    var g = this.events_[f];
                    g.id && this.idPool_.releaseObject(g.id);
                    this.eventPool_.releaseObject(g)
                }
                this.events_.length = 0
            }
            e > this.MAX_TRACE_SIZE / 2 && this.outstandingEvents_.clear()
        }
        goog.debug.Logger.logToProfilers("Start : " +
            a);
        g = this.eventPool_.getObject();
        g.totalVarAlloc = d;
        g.eventType = goog.debug.Trace_.EventType.START;
        g.id = Number(this.idPool_.getObject());
        g.comment = a;
        g.type = b;
        this.events_.push(g);
        this.outstandingEvents_.set(String(g.id), g);
        this.tracerCount_++;
        d = goog.debug.Trace_.now();
        g.startTime = g.eventTime = d;
        this.tracerOverheadStart_ += d - c;
        return g.id
    };
    goog.debug.Trace_.prototype.stopTracer = function(a, b) {
        var c = goog.debug.Trace_.now(),
            d;
        d = 0 === b ? 0 : b ? b : this.defaultThreshold_;
        var e = this.outstandingEvents_.get(String(a));
        if (null == e) return null;
        this.outstandingEvents_.remove(String(a));
        var f, g = c - e.startTime;
        if (g < d)
            for (d = this.events_.length - 1; 0 <= d; d--) {
                if (this.events_[d] == e) {
                    this.events_.splice(d, 1);
                    this.idPool_.releaseObject(e.id);
                    this.eventPool_.releaseObject(e);
                    break
                }
            } else f = this.eventPool_.getObject(), f.eventType = goog.debug.Trace_.EventType.STOP, f.startTime =
                e.startTime, f.comment = e.comment, f.type = e.type, f.stopTime = f.eventTime = c, this.events_.push(f);
        d = e.type;
        var h = null;
        d && (h = this.getStat_(d), h.count++, h.time += g);
        f && (goog.debug.Logger.logToProfilers("Stop : " + f.comment), f.totalVarAlloc = this.getTotalVarAlloc(), h && (h.varAlloc += f.totalVarAlloc - e.totalVarAlloc));
        e = goog.debug.Trace_.now();
        this.tracerOverheadEnd_ += e - c;
        return g
    };
    goog.debug.Trace_.prototype.setGcTracer = function(a) {
        this.gcTracer_ = a
    };
    goog.debug.Trace_.prototype.getTotalVarAlloc = function() {
        var a = this.gcTracer_;
        return a && a.isTracing() ? a.totalVarAlloc : -1
    };
    goog.debug.Trace_.prototype.addComment = function(a, b, c) {
        var d = goog.debug.Trace_.now(),
            e = c ? c : d,
            f = this.eventPool_.getObject();
        f.eventType = goog.debug.Trace_.EventType.COMMENT;
        f.eventTime = e;
        f.type = b;
        f.comment = a;
        f.totalVarAlloc = this.getTotalVarAlloc();
        this.commentCount_++;
        if (c) {
            a = this.events_.length;
            for (b = 0; b < a; b++)
                if (this.events_[b].eventTime > e) {
                    goog.array.insertAt(this.events_, f, b);
                    break
                }
            b == a && this.events_.push(f)
        } else this.events_.push(f);
        (e = f.type) && this.getStat_(e).count++;
        this.tracerOverheadComment_ +=
            goog.debug.Trace_.now() - d
    };
    goog.debug.Trace_.prototype.getStat_ = function(a) {
        var b = this.stats_.get(a);
        b || (b = this.statPool_.getObject(), b.type = a, this.stats_.set(a, b));
        return b
    };
    goog.debug.Trace_.prototype.getFormattedTrace = function() {
        return this.toString()
    };
    goog.debug.Trace_.prototype.toString = function() {
        for (var a = [], b = -1, c = [], d = 0; d < this.events_.length; d++) {
            var e = this.events_[d];
            e.eventType == goog.debug.Trace_.EventType.STOP && c.pop();
            a.push(" ", e.toTraceString(this.startTime_, b, c.join("")));
            b = e.eventTime;
            a.push("\n");
            e.eventType == goog.debug.Trace_.EventType.START && c.push("|  ")
        }
        if (0 != this.outstandingEvents_.getCount()) {
            var f = goog.debug.Trace_.now();
            a.push(" Unstopped timers:\n");
            goog.iter.forEach(this.outstandingEvents_, function(b) {
                a.push("  ", b, " (",
                    f - b.startTime, " ms, started at ", goog.debug.Trace_.formatTime_(b.startTime), ")\n")
            })
        }
        b = this.stats_.getKeys();
        for (d = 0; d < b.length; d++) c = this.stats_.get(b[d]), 1 < c.count && a.push(" TOTAL ", c, "\n");
        a.push("Total tracers created ", this.tracerCount_, "\n", "Total comments created ", this.commentCount_, "\n", "Overhead start: ", this.tracerOverheadStart_, " ms\n", "Overhead end: ", this.tracerOverheadEnd_, " ms\n", "Overhead comment: ", this.tracerOverheadComment_, " ms\n");
        return a.join("")
    };
    goog.debug.Trace_.longToPaddedString_ = function(a) {
        a = Math.round(a);
        var b = "";
        1E3 > a && (b = " ");
        100 > a && (b = "  ");
        10 > a && (b = "   ");
        return b + a
    };
    goog.debug.Trace_.formatTime_ = function(a) {
        a = Math.round(a);
        var b = a % 1E3;
        return String(100 + a / 1E3 % 60).substring(1, 3) + "." + String(1E3 + b).substring(1, 4)
    };
    goog.debug.Trace_.now = function() {
        return goog.now()
    };
    goog.debug.Trace = new goog.debug.Trace_;
    goog.debug.entryPointRegistry = {};
    goog.debug.EntryPointMonitor = function() {};
    goog.debug.entryPointRegistry.refList_ = [];
    goog.debug.entryPointRegistry.monitors_ = [];
    goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
    goog.debug.entryPointRegistry.register = function(a) {
        goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = a;
        if (goog.debug.entryPointRegistry.monitorsMayExist_)
            for (var b = goog.debug.entryPointRegistry.monitors_, c = 0; c < b.length; c++) a(goog.bind(b[c].wrap, b[c]))
    };
    goog.debug.entryPointRegistry.monitorAll = function(a) {
        goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
        for (var b = goog.bind(a.wrap, a), c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++) goog.debug.entryPointRegistry.refList_[c](b);
        goog.debug.entryPointRegistry.monitors_.push(a)
    };
    goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(a) {
        var b = goog.debug.entryPointRegistry.monitors_;
        goog.asserts.assert(a == b[b.length - 1], "Only the most recent monitor can be unwrapped.");
        a = goog.bind(a.unwrap, a);
        for (var c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++) goog.debug.entryPointRegistry.refList_[c](a);
        b.length--
    };
    goog.debug.ErrorHandler = function(a) {
        goog.Disposable.call(this);
        this.errorHandlerFn_ = a
    };
    goog.inherits(goog.debug.ErrorHandler, goog.Disposable);
    goog.debug.ErrorHandler.prototype.addTracersToProtectedFunctions_ = !1;
    goog.debug.ErrorHandler.prototype.setAddTracersToProtectedFunctions = function(a) {
        this.addTracersToProtectedFunctions_ = a
    };
    goog.debug.ErrorHandler.prototype.wrap = function(a) {
        return this.protectEntryPoint(goog.asserts.assertFunction(a))
    };
    goog.debug.ErrorHandler.prototype.unwrap = function(a) {
        goog.asserts.assertFunction(a);
        return a[this.getFunctionIndex_(!1)] || a
    };
    goog.debug.ErrorHandler.prototype.getStackTraceHolder_ = function(a) {
        var b = [];
        b.push("##PE_STACK_START##");
        b.push(a.replace(/(\r\n|\r|\n)/g, "##STACK_BR##"));
        b.push("##PE_STACK_END##");
        return b.join("")
    };
    goog.debug.ErrorHandler.prototype.getFunctionIndex_ = function(a) {
        return (a ? "__wrapper_" : "__protected_") + goog.getUid(this) + "__"
    };
    goog.debug.ErrorHandler.prototype.protectEntryPoint = function(a) {
        var b = this.getFunctionIndex_(!0);
        a[b] || ((a[b] = this.getProtectedFunction(a))[this.getFunctionIndex_(!1)] = a);
        return a[b]
    };
    goog.debug.ErrorHandler.prototype.getProtectedFunction = function(a) {
        var b = this,
            c = this.addTracersToProtectedFunctions_;
        if (c) var d = goog.debug.getStacktraceSimple(15);
        var e = function() {
            if (b.isDisposed()) return a.apply(this, arguments);
            if (c) var e = goog.debug.Trace.startTracer("protectedEntryPoint: " + b.getStackTraceHolder_(d));
            try {
                return a.apply(this, arguments)
            } catch (g) {
                throw b.errorHandlerFn_(g), new goog.debug.ErrorHandler.ProtectedFunctionError(g);
            } finally {
                c && goog.debug.Trace.stopTracer(e)
            }
        };
        e[this.getFunctionIndex_(!1)] =
            a;
        return e
    };
    goog.debug.ErrorHandler.prototype.protectWindowSetTimeout = function() {
        this.protectWindowFunctionsHelper_("setTimeout")
    };
    goog.debug.ErrorHandler.prototype.protectWindowSetInterval = function() {
        this.protectWindowFunctionsHelper_("setInterval")
    };
    goog.debug.ErrorHandler.prototype.protectWindowFunctionsHelper_ = function(a) {
        var b = goog.getObjectByName("window"),
            c = b[a],
            d = this;
        b[a] = function(a, b) {
            goog.isString(a) && (a = goog.partial(goog.globalEval, a));
            a = d.protectEntryPoint(a);
            return c.call ? c.call(this, a, b) : c(a, b)
        };
        b[a][this.getFunctionIndex_(!1)] = c
    };
    goog.debug.ErrorHandler.prototype.disposeInternal = function() {
        var a = goog.getObjectByName("window");
        a.setTimeout = this.unwrap(a.setTimeout);
        a.setInterval = this.unwrap(a.setInterval);
        goog.debug.ErrorHandler.superClass_.disposeInternal.call(this)
    };
    goog.debug.ErrorHandler.ProtectedFunctionError = function(a) {
        goog.debug.Error.call(this, goog.debug.ErrorHandler.ProtectedFunctionError.MESSAGE_PREFIX + (a && a.message ? String(a.message) : String(a)));
        if ((a = (this.cause = a) && a.stack) && goog.isString(a)) this.stack = a
    };
    goog.inherits(goog.debug.ErrorHandler.ProtectedFunctionError, goog.debug.Error);
    goog.debug.ErrorHandler.ProtectedFunctionError.MESSAGE_PREFIX = "Error in protected function: ";
    var pb = {
        IConnectableModel: function() {}
    };
    pb.IConnectableModel.prototype.connect = function() {};
    pb.IConnectableModel.prototype.disconnect = function() {};
    pb.IConnectableModel.prototype.setPrev = function() {};
    pb.IConnectableModel.prototype.getInput = function() {};
    pb.IConnectableModel.prototype.getOutput = function() {};
    pb.ConnectableModel = function(a) {
        goog.Disposable.call(this);
        this.context = a;
        this.inputBuffer = this.context.createGain();
        this.outputBuffer = this.context.createGain();
        this.chain = [];
        this.effects = []
    };
    goog.inherits(pb.ConnectableModel, goog.Disposable);
    pb.ConnectableModel.prototype.connect = function(a) {
        this.next = a;
        this.chain = [].concat(this.inputBuffer, this.effects, this.outputBuffer, this.next);
        this.routeInternal()
    };
    pb.ConnectableModel.prototype.getInput = function() {
        return this.inputBuffer
    };
    pb.ConnectableModel.prototype.getOutput = function() {
        return this.outputBuffer
    };
    pb.ConnectableModel.prototype.setPrev = function(a) {
        this.prev = a
    };
    pb.ConnectableModel.prototype.routeInternal = function() {
        for (var a = this.chain, b = 0, c = a.length - 1; b < c; b++) a[b].connect(a[b + 1])
    };
    pb.ConnectableModel.prototype.disconnect = function() {
        this.outputBuffer.disconnect()
    };
    pb.ConnectableModel.prototype.disposeInternal = function() {
        pb.ConnectableModel.superClass_.disposeInternal.call(this);
        this.disconnect()
    };
    pb.stomp = {};
    pb.stomp.BoxModel = function(a) {
        pb.ConnectableModel.call(this, a);
        this.level = this.context.createGain();
        this.effects.push(this.level)
    };
    goog.inherits(pb.stomp.BoxModel, pb.ConnectableModel);
    pb.stomp.BoxModel.prototype.setLevel = function(a) {
        a = Math.min(a, 10);
        this.level.gain.value = a / 10
    };
    pb.stomp.BoxModel.prototype.routeInternal = function() {
        for (var a = this.chain, b = 0, c = a.length - 1; b < c; b++) a[b].connect(a[b + 1]);
        this.nodes = [
            [this.effects[0], this.inputBuffer, this.outputBuffer],
            [this.outputBuffer, goog.array.peek(this.effects), null]
        ]
    };
    pb.stomp.VolumeModel = function(a) {
        pb.stomp.BoxModel.call(this, a)
    };
    goog.inherits(pb.stomp.VolumeModel, pb.stomp.BoxModel);
    goog.math = {};
    goog.math.randomInt = function(a) {
        return Math.floor(Math.random() * a)
    };
    goog.math.uniformRandom = function(a, b) {
        return a + Math.random() * (b - a)
    };
    goog.math.clamp = function(a, b, c) {
        return Math.min(Math.max(a, b), c)
    };
    goog.math.modulo = function(a, b) {
        var c = a % b;
        return 0 > c * b ? c + b : c
    };
    goog.math.lerp = function(a, b, c) {
        return a + c * (b - a)
    };
    goog.math.nearlyEquals = function(a, b, c) {
        return Math.abs(a - b) <= (c || 1E-6)
    };
    goog.math.standardAngle = function(a) {
        return goog.math.modulo(a, 360)
    };
    goog.math.toRadians = function(a) {
        return a * Math.PI / 180
    };
    goog.math.toDegrees = function(a) {
        return 180 * a / Math.PI
    };
    goog.math.angleDx = function(a, b) {
        return b * Math.cos(goog.math.toRadians(a))
    };
    goog.math.angleDy = function(a, b) {
        return b * Math.sin(goog.math.toRadians(a))
    };
    goog.math.angle = function(a, b, c, d) {
        return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)))
    };
    goog.math.angleDifference = function(a, b) {
        var c = goog.math.standardAngle(b) - goog.math.standardAngle(a);
        180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
        return c
    };
    goog.math.sign = function(a) {
        return 0 == a ? 0 : 0 > a ? -1 : 1
    };
    goog.math.longestCommonSubsequence = function(a, b, c, d) {
        c = c || function(a, b) {
            return a == b
        };
        d = d || function(b) {
            return a[b]
        };
        for (var e = a.length, f = b.length, g = [], h = 0; h < e + 1; h++) g[h] = [], g[h][0] = 0;
        for (var j = 0; j < f + 1; j++) g[0][j] = 0;
        for (h = 1; h <= e; h++)
            for (j = 1; j <= e; j++) g[h][j] = c(a[h - 1], b[j - 1]) ? g[h - 1][j - 1] + 1 : Math.max(g[h - 1][j], g[h][j - 1]);
        for (var k = [], h = e, j = f; 0 < h && 0 < j;) c(a[h - 1], b[j - 1]) ? (k.unshift(d(h - 1, j - 1)), h--, j--) : g[h - 1][j] > g[h][j - 1] ? h-- : j--;
        return k
    };
    goog.math.sum = function(a) {
        return goog.array.reduce(arguments, function(a, c) {
            return a + c
        }, 0)
    };
    goog.math.average = function(a) {
        return goog.math.sum.apply(null, arguments) / arguments.length
    };
    goog.math.standardDeviation = function(a) {
        var b = arguments.length;
        if (2 > b) return 0;
        var c = goog.math.average.apply(null, arguments),
            b = goog.math.sum.apply(null, goog.array.map(arguments, function(a) {
                return Math.pow(a - c, 2)
            })) / (b - 1);
        return Math.sqrt(b)
    };
    goog.math.isInt = function(a) {
        return isFinite(a) && 0 == a % 1
    };
    goog.math.isFiniteNumber = function(a) {
        return isFinite(a) && !isNaN(a)
    };
    goog.math.Coordinate = function(a, b) {
        this.x = goog.isDef(a) ? a : 0;
        this.y = goog.isDef(b) ? b : 0
    };
    goog.math.Coordinate.prototype.clone = function() {
        return new goog.math.Coordinate(this.x, this.y)
    };
    goog.DEBUG && (goog.math.Coordinate.prototype.toString = function() {
        return "(" + this.x + ", " + this.y + ")"
    });
    goog.math.Coordinate.equals = function(a, b) {
        return a == b ? !0 : !a || !b ? !1 : a.x == b.x && a.y == b.y
    };
    goog.math.Coordinate.distance = function(a, b) {
        var c = a.x - b.x,
            d = a.y - b.y;
        return Math.sqrt(c * c + d * d)
    };
    goog.math.Coordinate.magnitude = function(a) {
        return Math.sqrt(a.x * a.x + a.y * a.y)
    };
    goog.math.Coordinate.azimuth = function(a) {
        return goog.math.angle(0, 0, a.x, a.y)
    };
    goog.math.Coordinate.squaredDistance = function(a, b) {
        var c = a.x - b.x,
            d = a.y - b.y;
        return c * c + d * d
    };
    goog.math.Coordinate.difference = function(a, b) {
        return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
    };
    goog.math.Coordinate.sum = function(a, b) {
        return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
    };
    goog.dom = {};
    goog.dom.classes = {};
    goog.dom.classes.set = function(a, b) {
        a.className = b
    };
    goog.dom.classes.get = function(a) {
        a = a.className;
        return goog.isString(a) && a.match(/\S+/g) || []
    };
    goog.dom.classes.add = function(a, b) {
        var c = goog.dom.classes.get(a),
            d = goog.array.slice(arguments, 1),
            e = c.length + d.length;
        goog.dom.classes.add_(c, d);
        a.className = c.join(" ");
        return c.length == e
    };
    goog.dom.classes.remove = function(a, b) {
        var c = goog.dom.classes.get(a),
            d = goog.array.slice(arguments, 1),
            e = goog.dom.classes.getDifference_(c, d);
        a.className = e.join(" ");
        return e.length == c.length - d.length
    };
    goog.dom.classes.add_ = function(a, b) {
        for (var c = 0; c < b.length; c++) goog.array.contains(a, b[c]) || a.push(b[c])
    };
    goog.dom.classes.getDifference_ = function(a, b) {
        return goog.array.filter(a, function(a) {
            return !goog.array.contains(b, a)
        })
    };
    goog.dom.classes.swap = function(a, b, c) {
        for (var d = goog.dom.classes.get(a), e = !1, f = 0; f < d.length; f++) d[f] == b && (goog.array.splice(d, f--, 1), e = !0);
        e && (d.push(c), a.className = d.join(" "));
        return e
    };
    goog.dom.classes.addRemove = function(a, b, c) {
        var d = goog.dom.classes.get(a);
        goog.isString(b) ? goog.array.remove(d, b) : goog.isArray(b) && (d = goog.dom.classes.getDifference_(d, b));
        goog.isString(c) && !goog.array.contains(d, c) ? d.push(c) : goog.isArray(c) && goog.dom.classes.add_(d, c);
        a.className = d.join(" ")
    };
    goog.dom.classes.has = function(a, b) {
        return goog.array.contains(goog.dom.classes.get(a), b)
    };
    goog.dom.classes.enable = function(a, b, c) {
        c ? goog.dom.classes.add(a, b) : goog.dom.classes.remove(a, b)
    };
    goog.dom.classes.toggle = function(a, b) {
        var c = !goog.dom.classes.has(a, b);
        goog.dom.classes.enable(a, b, c);
        return c
    };
    goog.dom.TagName = {
        A: "A",
        ABBR: "ABBR",
        ACRONYM: "ACRONYM",
        ADDRESS: "ADDRESS",
        APPLET: "APPLET",
        AREA: "AREA",
        ARTICLE: "ARTICLE",
        ASIDE: "ASIDE",
        AUDIO: "AUDIO",
        B: "B",
        BASE: "BASE",
        BASEFONT: "BASEFONT",
        BDI: "BDI",
        BDO: "BDO",
        BIG: "BIG",
        BLOCKQUOTE: "BLOCKQUOTE",
        BODY: "BODY",
        BR: "BR",
        BUTTON: "BUTTON",
        CANVAS: "CANVAS",
        CAPTION: "CAPTION",
        CENTER: "CENTER",
        CITE: "CITE",
        CODE: "CODE",
        COL: "COL",
        COLGROUP: "COLGROUP",
        COMMAND: "COMMAND",
        DATA: "DATA",
        DATALIST: "DATALIST",
        DD: "DD",
        DEL: "DEL",
        DETAILS: "DETAILS",
        DFN: "DFN",
        DIALOG: "DIALOG",
        DIR: "DIR",
        DIV: "DIV",
        DL: "DL",
        DT: "DT",
        EM: "EM",
        EMBED: "EMBED",
        FIELDSET: "FIELDSET",
        FIGCAPTION: "FIGCAPTION",
        FIGURE: "FIGURE",
        FONT: "FONT",
        FOOTER: "FOOTER",
        FORM: "FORM",
        FRAME: "FRAME",
        FRAMESET: "FRAMESET",
        H1: "H1",
        H2: "H2",
        H3: "H3",
        H4: "H4",
        H5: "H5",
        H6: "H6",
        HEAD: "HEAD",
        HEADER: "HEADER",
        HGROUP: "HGROUP",
        HR: "HR",
        HTML: "HTML",
        I: "I",
        IFRAME: "IFRAME",
        IMG: "IMG",
        INPUT: "INPUT",
        INS: "INS",
        ISINDEX: "ISINDEX",
        KBD: "KBD",
        KEYGEN: "KEYGEN",
        LABEL: "LABEL",
        LEGEND: "LEGEND",
        LI: "LI",
        LINK: "LINK",
        MAP: "MAP",
        MARK: "MARK",
        MATH: "MATH",
        MENU: "MENU",
        META: "META",
        METER: "METER",
        NAV: "NAV",
        NOFRAMES: "NOFRAMES",
        NOSCRIPT: "NOSCRIPT",
        OBJECT: "OBJECT",
        OL: "OL",
        OPTGROUP: "OPTGROUP",
        OPTION: "OPTION",
        OUTPUT: "OUTPUT",
        P: "P",
        PARAM: "PARAM",
        PRE: "PRE",
        PROGRESS: "PROGRESS",
        Q: "Q",
        RP: "RP",
        RT: "RT",
        RUBY: "RUBY",
        S: "S",
        SAMP: "SAMP",
        SCRIPT: "SCRIPT",
        SECTION: "SECTION",
        SELECT: "SELECT",
        SMALL: "SMALL",
        SOURCE: "SOURCE",
        SPAN: "SPAN",
        STRIKE: "STRIKE",
        STRONG: "STRONG",
        STYLE: "STYLE",
        SUB: "SUB",
        SUMMARY: "SUMMARY",
        SUP: "SUP",
        SVG: "SVG",
        TABLE: "TABLE",
        TBODY: "TBODY",
        TD: "TD",
        TEXTAREA: "TEXTAREA",
        TFOOT: "TFOOT",
        TH: "TH",
        THEAD: "THEAD",
        TIME: "TIME",
        TITLE: "TITLE",
        TR: "TR",
        TRACK: "TRACK",
        TT: "TT",
        U: "U",
        UL: "UL",
        VAR: "VAR",
        VIDEO: "VIDEO",
        WBR: "WBR"
    };
    goog.math.Size = function(a, b) {
        this.width = a;
        this.height = b
    };
    goog.math.Size.equals = function(a, b) {
        return a == b ? !0 : !a || !b ? !1 : a.width == b.width && a.height == b.height
    };
    goog.math.Size.prototype.clone = function() {
        return new goog.math.Size(this.width, this.height)
    };
    goog.DEBUG && (goog.math.Size.prototype.toString = function() {
        return "(" + this.width + " x " + this.height + ")"
    });
    goog.math.Size.prototype.getLongest = function() {
        return Math.max(this.width, this.height)
    };
    goog.math.Size.prototype.getShortest = function() {
        return Math.min(this.width, this.height)
    };
    goog.math.Size.prototype.area = function() {
        return this.width * this.height
    };
    goog.math.Size.prototype.perimeter = function() {
        return 2 * (this.width + this.height)
    };
    goog.math.Size.prototype.aspectRatio = function() {
        return this.width / this.height
    };
    goog.math.Size.prototype.isEmpty = function() {
        return !this.area()
    };
    goog.math.Size.prototype.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    goog.math.Size.prototype.fitsInside = function(a) {
        return this.width <= a.width && this.height <= a.height
    };
    goog.math.Size.prototype.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    goog.math.Size.prototype.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    goog.math.Size.prototype.scale = function(a) {
        this.width *= a;
        this.height *= a;
        return this
    };
    goog.math.Size.prototype.scaleToFit = function(a) {
        a = this.aspectRatio() > a.aspectRatio() ? a.width / this.width : a.height / this.height;
        return this.scale(a)
    };
    goog.dom.BrowserFeature = {
        CAN_ADD_NAME_OR_TYPE_ATTRIBUTES: !goog.userAgent.IE || goog.userAgent.isDocumentMode(9),
        CAN_USE_CHILDREN_ATTRIBUTE: !goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentMode(9) || goog.userAgent.GECKO && goog.userAgent.isVersion("1.9.1"),
        CAN_USE_INNER_TEXT: goog.userAgent.IE && !goog.userAgent.isVersion("9"),
        CAN_USE_PARENT_ELEMENT_PROPERTY: goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT,
        INNER_HTML_NEEDS_SCOPED_ELEMENT: goog.userAgent.IE
    };
    goog.dom.ASSUME_QUIRKS_MODE = !1;
    goog.dom.ASSUME_STANDARDS_MODE = !1;
    goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
    goog.dom.NodeType = {
        ELEMENT: 1,
        ATTRIBUTE: 2,
        TEXT: 3,
        CDATA_SECTION: 4,
        ENTITY_REFERENCE: 5,
        ENTITY: 6,
        PROCESSING_INSTRUCTION: 7,
        COMMENT: 8,
        DOCUMENT: 9,
        DOCUMENT_TYPE: 10,
        DOCUMENT_FRAGMENT: 11,
        NOTATION: 12
    };
    goog.dom.getDomHelper = function(a) {
        return a ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
    };
    goog.dom.getDocument = function() {
        return document
    };
    goog.dom.getElement = function(a) {
        return goog.isString(a) ? document.getElementById(a) : a
    };
    goog.dom.$ = goog.dom.getElement;
    goog.dom.getElementsByTagNameAndClass = function(a, b, c) {
        return goog.dom.getElementsByTagNameAndClass_(document, a, b, c)
    };
    goog.dom.getElementsByClass = function(a, b) {
        var c = b || document;
        return goog.dom.canUseQuerySelector_(c) ? c.querySelectorAll("." + a) : c.getElementsByClassName ? c.getElementsByClassName(a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)
    };
    goog.dom.getElementByClass = function(a, b) {
        var c = b || document,
            d = null;
        return (d = goog.dom.canUseQuerySelector_(c) ? c.querySelector("." + a) : goog.dom.getElementsByClass(a, b)[0]) || null
    };
    goog.dom.canUseQuerySelector_ = function(a) {
        return !(!a.querySelectorAll || !a.querySelector)
    };
    goog.dom.getElementsByTagNameAndClass_ = function(a, b, c, d) {
        a = d || a;
        b = b && "*" != b ? b.toUpperCase() : "";
        if (goog.dom.canUseQuerySelector_(a) && (b || c)) return a.querySelectorAll(b + (c ? "." + c : ""));
        if (c && a.getElementsByClassName) {
            a = a.getElementsByClassName(c);
            if (b) {
                d = {};
                for (var e = 0, f = 0, g; g = a[f]; f++) b == g.nodeName && (d[e++] = g);
                d.length = e;
                return d
            }
            return a
        }
        a = a.getElementsByTagName(b || "*");
        if (c) {
            d = {};
            for (f = e = 0; g = a[f]; f++) b = g.className, "function" == typeof b.split && goog.array.contains(b.split(/\s+/), c) && (d[e++] = g);
            d.length =
                e;
            return d
        }
        return a
    };
    goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
    goog.dom.setProperties = function(a, b) {
        goog.object.forEach(b, function(b, d) {
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in goog.dom.DIRECT_ATTRIBUTE_MAP_ ? a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d], b) : goog.string.startsWith(d, "aria-") || goog.string.startsWith(d, "data-") ? a.setAttribute(d, b) : a[d] = b
        })
    };
    goog.dom.DIRECT_ATTRIBUTE_MAP_ = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };
    goog.dom.getViewportSize = function(a) {
        return goog.dom.getViewportSize_(a || window)
    };
    goog.dom.getViewportSize_ = function(a) {
        a = a.document;
        a = goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body;
        return new goog.math.Size(a.clientWidth, a.clientHeight)
    };
    goog.dom.getDocumentHeight = function() {
        return goog.dom.getDocumentHeight_(window)
    };
    goog.dom.getDocumentHeight_ = function(a) {
        var b = a.document,
            c = 0;
        if (b) {
            a = goog.dom.getViewportSize_(a).height;
            var c = b.body,
                d = b.documentElement;
            if (goog.dom.isCss1CompatMode_(b) && d.scrollHeight) c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight;
            else {
                var b = d.scrollHeight,
                    e = d.offsetHeight;
                d.clientHeight != e && (b = c.scrollHeight, e = c.offsetHeight);
                c = b > a ? b > e ? b : e : b < e ? b : e
            }
        }
        return c
    };
    goog.dom.getPageScroll = function(a) {
        return goog.dom.getDomHelper((a || goog.global || window).document).getDocumentScroll()
    };
    goog.dom.getDocumentScroll = function() {
        return goog.dom.getDocumentScroll_(document)
    };
    goog.dom.getDocumentScroll_ = function(a) {
        var b = goog.dom.getDocumentScrollElement_(a);
        a = goog.dom.getWindow_(a);
        return new goog.math.Coordinate(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
    };
    goog.dom.getDocumentScrollElement = function() {
        return goog.dom.getDocumentScrollElement_(document)
    };
    goog.dom.getDocumentScrollElement_ = function(a) {
        return !goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body
    };
    goog.dom.getWindow = function(a) {
        return a ? goog.dom.getWindow_(a) : window
    };
    goog.dom.getWindow_ = function(a) {
        return a.parentWindow || a.defaultView
    };
    goog.dom.createDom = function(a, b, c) {
        return goog.dom.createDom_(document, arguments)
    };
    goog.dom.createDom_ = function(a, b) {
        var c = b[0],
            d = b[1];
        if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
            c = ["<", c];
            d.name && c.push(' name="', goog.string.htmlEscape(d.name), '"');
            if (d.type) {
                c.push(' type="', goog.string.htmlEscape(d.type), '"');
                var e = {};
                goog.object.extend(e, d);
                delete e.type;
                d = e
            }
            c.push(">");
            c = c.join("")
        }
        c = a.createElement(c);
        d && (goog.isString(d) ? c.className = d : goog.isArray(d) ? goog.dom.classes.add.apply(null, [c].concat(d)) : goog.dom.setProperties(c, d));
        2 < b.length &&
            goog.dom.append_(a, c, b, 2);
        return c
    };
    goog.dom.append_ = function(a, b, c, d) {
        function e(c) {
            c && b.appendChild(goog.isString(c) ? a.createTextNode(c) : c)
        }
        for (; d < c.length; d++) {
            var f = c[d];
            goog.isArrayLike(f) && !goog.dom.isNodeLike(f) ? goog.array.forEach(goog.dom.isNodeList(f) ? goog.array.toArray(f) : f, e) : e(f)
        }
    };
    goog.dom.$dom = goog.dom.createDom;
    goog.dom.createElement = function(a) {
        return document.createElement(a)
    };
    goog.dom.createTextNode = function(a) {
        return document.createTextNode(a)
    };
    goog.dom.createTable = function(a, b, c) {
        return goog.dom.createTable_(document, a, b, !!c)
    };
    goog.dom.createTable_ = function(a, b, c, d) {
        for (var e = ["<tr>"], f = 0; f < c; f++) e.push(d ? "<td>&nbsp;</td>" : "<td></td>");
        e.push("</tr>");
        e = e.join("");
        c = ["<table>"];
        for (f = 0; f < b; f++) c.push(e);
        c.push("</table>");
        a = a.createElement(goog.dom.TagName.DIV);
        a.innerHTML = c.join("");
        return a.removeChild(a.firstChild)
    };
    goog.dom.htmlToDocumentFragment = function(a) {
        return goog.dom.htmlToDocumentFragment_(document, a)
    };
    goog.dom.htmlToDocumentFragment_ = function(a, b) {
        var c = a.createElement("div");
        goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (c.innerHTML = "<br>" + b, c.removeChild(c.firstChild)) : c.innerHTML = b;
        if (1 == c.childNodes.length) return c.removeChild(c.firstChild);
        for (var d = a.createDocumentFragment(); c.firstChild;) d.appendChild(c.firstChild);
        return d
    };
    goog.dom.getCompatMode = function() {
        return goog.dom.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
    };
    goog.dom.isCss1CompatMode = function() {
        return goog.dom.isCss1CompatMode_(document)
    };
    goog.dom.isCss1CompatMode_ = function(a) {
        return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == a.compatMode
    };
    goog.dom.canHaveChildren = function(a) {
        if (a.nodeType != goog.dom.NodeType.ELEMENT) return !1;
        switch (a.tagName) {
            case goog.dom.TagName.APPLET:
            case goog.dom.TagName.AREA:
            case goog.dom.TagName.BASE:
            case goog.dom.TagName.BR:
            case goog.dom.TagName.COL:
            case goog.dom.TagName.COMMAND:
            case goog.dom.TagName.EMBED:
            case goog.dom.TagName.FRAME:
            case goog.dom.TagName.HR:
            case goog.dom.TagName.IMG:
            case goog.dom.TagName.INPUT:
            case goog.dom.TagName.IFRAME:
            case goog.dom.TagName.ISINDEX:
            case goog.dom.TagName.KEYGEN:
            case goog.dom.TagName.LINK:
            case goog.dom.TagName.NOFRAMES:
            case goog.dom.TagName.NOSCRIPT:
            case goog.dom.TagName.META:
            case goog.dom.TagName.OBJECT:
            case goog.dom.TagName.PARAM:
            case goog.dom.TagName.SCRIPT:
            case goog.dom.TagName.SOURCE:
            case goog.dom.TagName.STYLE:
            case goog.dom.TagName.TRACK:
            case goog.dom.TagName.WBR:
                return !1
        }
        return !0
    };
    goog.dom.appendChild = function(a, b) {
        a.appendChild(b)
    };
    goog.dom.append = function(a, b) {
        goog.dom.append_(goog.dom.getOwnerDocument(a), a, arguments, 1)
    };
    goog.dom.removeChildren = function(a) {
        for (var b; b = a.firstChild;) a.removeChild(b)
    };
    goog.dom.insertSiblingBefore = function(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b)
    };
    goog.dom.insertSiblingAfter = function(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
    };
    goog.dom.insertChildAt = function(a, b, c) {
        a.insertBefore(b, a.childNodes[c] || null)
    };
    goog.dom.removeNode = function(a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null
    };
    goog.dom.replaceNode = function(a, b) {
        var c = b.parentNode;
        c && c.replaceChild(a, b)
    };
    goog.dom.flattenElement = function(a) {
        var b, c = a.parentNode;
        if (c && c.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
            if (a.removeNode) return a.removeNode(!1);
            for (; b = a.firstChild;) c.insertBefore(b, a);
            return goog.dom.removeNode(a)
        }
    };
    goog.dom.getChildren = function(a) {
        return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != a.children ? a.children : goog.array.filter(a.childNodes, function(a) {
            return a.nodeType == goog.dom.NodeType.ELEMENT
        })
    };
    goog.dom.getFirstElementChild = function(a) {
        return void 0 != a.firstElementChild ? a.firstElementChild : goog.dom.getNextElementNode_(a.firstChild, !0)
    };
    goog.dom.getLastElementChild = function(a) {
        return void 0 != a.lastElementChild ? a.lastElementChild : goog.dom.getNextElementNode_(a.lastChild, !1)
    };
    goog.dom.getNextElementSibling = function(a) {
        return void 0 != a.nextElementSibling ? a.nextElementSibling : goog.dom.getNextElementNode_(a.nextSibling, !0)
    };
    goog.dom.getPreviousElementSibling = function(a) {
        return void 0 != a.previousElementSibling ? a.previousElementSibling : goog.dom.getNextElementNode_(a.previousSibling, !1)
    };
    goog.dom.getNextElementNode_ = function(a, b) {
        for (; a && a.nodeType != goog.dom.NodeType.ELEMENT;) a = b ? a.nextSibling : a.previousSibling;
        return a
    };
    goog.dom.getNextNode = function(a) {
        if (!a) return null;
        if (a.firstChild) return a.firstChild;
        for (; a && !a.nextSibling;) a = a.parentNode;
        return a ? a.nextSibling : null
    };
    goog.dom.getPreviousNode = function(a) {
        if (!a) return null;
        if (!a.previousSibling) return a.parentNode;
        for (a = a.previousSibling; a && a.lastChild;) a = a.lastChild;
        return a
    };
    goog.dom.isNodeLike = function(a) {
        return goog.isObject(a) && 0 < a.nodeType
    };
    goog.dom.isElement = function(a) {
        return goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT
    };
    goog.dom.isWindow = function(a) {
        return goog.isObject(a) && a.window == a
    };
    goog.dom.getParentElement = function(a) {
        if (goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY) return a.parentElement;
        a = a.parentNode;
        return goog.dom.isElement(a) ? a : null
    };
    goog.dom.contains = function(a, b) {
        if (a.contains && b.nodeType == goog.dom.NodeType.ELEMENT) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition) return a == b || Boolean(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    };
    goog.dom.compareNodeOrder = function(a, b) {
        if (a == b) return 0;
        if (a.compareDocumentPosition) return a.compareDocumentPosition(b) & 2 ? 1 : -1;
        if (goog.userAgent.IE && !goog.userAgent.isDocumentMode(9)) {
            if (a.nodeType == goog.dom.NodeType.DOCUMENT) return -1;
            if (b.nodeType == goog.dom.NodeType.DOCUMENT) return 1
        }
        if ("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) {
            var c = a.nodeType == goog.dom.NodeType.ELEMENT,
                d = b.nodeType == goog.dom.NodeType.ELEMENT;
            if (c && d) return a.sourceIndex - b.sourceIndex;
            var e = a.parentNode,
                f =
                b.parentNode;
            return e == f ? goog.dom.compareSiblingOrder_(a, b) : !c && goog.dom.contains(e, b) ? -1 * goog.dom.compareParentsDescendantNodeIe_(a, b) : !d && goog.dom.contains(f, a) ? goog.dom.compareParentsDescendantNodeIe_(b, a) : (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex)
        }
        d = goog.dom.getOwnerDocument(a);
        c = d.createRange();
        c.selectNode(a);
        c.collapse(!0);
        d = d.createRange();
        d.selectNode(b);
        d.collapse(!0);
        return c.compareBoundaryPoints(goog.global.Range.START_TO_END, d)
    };
    goog.dom.compareParentsDescendantNodeIe_ = function(a, b) {
        var c = a.parentNode;
        if (c == b) return -1;
        for (var d = b; d.parentNode != c;) d = d.parentNode;
        return goog.dom.compareSiblingOrder_(d, a)
    };
    goog.dom.compareSiblingOrder_ = function(a, b) {
        for (var c = b; c = c.previousSibling;)
            if (c == a) return -1;
        return 1
    };
    goog.dom.findCommonAncestor = function(a) {
        var b, c = arguments.length;
        if (c) {
            if (1 == c) return arguments[0]
        } else return null;
        var d = [],
            e = Infinity;
        for (b = 0; b < c; b++) {
            for (var f = [], g = arguments[b]; g;) f.unshift(g), g = g.parentNode;
            d.push(f);
            e = Math.min(e, f.length)
        }
        f = null;
        for (b = 0; b < e; b++) {
            for (var g = d[0][b], h = 1; h < c; h++)
                if (g != d[h][b]) return f;
            f = g
        }
        return f
    };
    goog.dom.getOwnerDocument = function(a) {
        return a.nodeType == goog.dom.NodeType.DOCUMENT ? a : a.ownerDocument || a.document
    };
    goog.dom.getFrameContentDocument = function(a) {
        return a.contentDocument || a.contentWindow.document
    };
    goog.dom.getFrameContentWindow = function(a) {
        return a.contentWindow || goog.dom.getWindow_(goog.dom.getFrameContentDocument(a))
    };
    goog.dom.setTextContent = function(a, b) {
        if ("textContent" in a) a.textContent = b;
        else if (a.firstChild && a.firstChild.nodeType == goog.dom.NodeType.TEXT) {
            for (; a.lastChild != a.firstChild;) a.removeChild(a.lastChild);
            a.firstChild.data = b
        } else {
            goog.dom.removeChildren(a);
            var c = goog.dom.getOwnerDocument(a);
            a.appendChild(c.createTextNode(b))
        }
    };
    goog.dom.getOuterHtml = function(a) {
        if ("outerHTML" in a) return a.outerHTML;
        var b = goog.dom.getOwnerDocument(a).createElement("div");
        b.appendChild(a.cloneNode(!0));
        return b.innerHTML
    };
    goog.dom.findNode = function(a, b) {
        var c = [];
        return goog.dom.findNodes_(a, b, c, !0) ? c[0] : void 0
    };
    goog.dom.findNodes = function(a, b) {
        var c = [];
        goog.dom.findNodes_(a, b, c, !1);
        return c
    };
    goog.dom.findNodes_ = function(a, b, c, d) {
        if (null != a)
            for (a = a.firstChild; a;) {
                if (b(a) && (c.push(a), d) || goog.dom.findNodes_(a, b, c, d)) return !0;
                a = a.nextSibling
            }
        return !1
    };
    goog.dom.TAGS_TO_IGNORE_ = {
        SCRIPT: 1,
        STYLE: 1,
        HEAD: 1,
        IFRAME: 1,
        OBJECT: 1
    };
    goog.dom.PREDEFINED_TAG_VALUES_ = {
        IMG: " ",
        BR: "\n"
    };
    goog.dom.isFocusableTabIndex = function(a) {
        var b = a.getAttributeNode("tabindex");
        return b && b.specified ? (a = a.tabIndex, goog.isNumber(a) && 0 <= a && 32768 > a) : !1
    };
    goog.dom.setFocusableTabIndex = function(a, b) {
        b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"))
    };
    goog.dom.getTextContent = function(a) {
        if (goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in a) a = goog.string.canonicalizeNewlines(a.innerText);
        else {
            var b = [];
            goog.dom.getTextContent_(a, b, !0);
            a = b.join("")
        }
        a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
        a = a.replace(/\u200B/g, "");
        goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (a = a.replace(/ +/g, " "));
        " " != a && (a = a.replace(/^\s*/, ""));
        return a
    };
    goog.dom.getRawTextContent = function(a) {
        var b = [];
        goog.dom.getTextContent_(a, b, !1);
        return b.join("")
    };
    goog.dom.getTextContent_ = function(a, b, c) {
        if (!(a.nodeName in goog.dom.TAGS_TO_IGNORE_))
            if (a.nodeType == goog.dom.NodeType.TEXT) c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
            else if (a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName]);
        else
            for (a = a.firstChild; a;) goog.dom.getTextContent_(a, b, c), a = a.nextSibling
    };
    goog.dom.getNodeTextLength = function(a) {
        return goog.dom.getTextContent(a).length
    };
    goog.dom.getNodeTextOffset = function(a, b) {
        for (var c = b || goog.dom.getOwnerDocument(a).body, d = []; a && a != c;) {
            for (var e = a; e = e.previousSibling;) d.unshift(goog.dom.getTextContent(e));
            a = a.parentNode
        }
        return goog.string.trimLeft(d.join("")).replace(/ +/g, " ").length
    };
    goog.dom.getNodeAtOffset = function(a, b, c) {
        a = [a];
        for (var d = 0, e = null; 0 < a.length && d < b;)
            if (e = a.pop(), !(e.nodeName in goog.dom.TAGS_TO_IGNORE_))
                if (e.nodeType == goog.dom.NodeType.TEXT) var f = e.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "),
                    d = d + f.length;
                else if (e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) d += goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName].length;
        else
            for (f = e.childNodes.length - 1; 0 <= f; f--) a.push(e.childNodes[f]);
        goog.isObject(c) && (c.remainder = e ? e.nodeValue.length + b - d - 1 : 0, c.node = e);
        return e
    };
    goog.dom.isNodeList = function(a) {
        if (a && "number" == typeof a.length) {
            if (goog.isObject(a)) return "function" == typeof a.item || "string" == typeof a.item;
            if (goog.isFunction(a)) return "function" == typeof a.item
        }
        return !1
    };
    goog.dom.getAncestorByTagNameAndClass = function(a, b, c) {
        if (!b && !c) return null;
        var d = b ? b.toUpperCase() : null;
        return goog.dom.getAncestor(a, function(a) {
            return (!d || a.nodeName == d) && (!c || goog.dom.classes.has(a, c))
        }, !0)
    };
    goog.dom.getAncestorByClass = function(a, b) {
        return goog.dom.getAncestorByTagNameAndClass(a, null, b)
    };
    goog.dom.getAncestor = function(a, b, c, d) {
        c || (a = a.parentNode);
        c = null == d;
        for (var e = 0; a && (c || e <= d);) {
            if (b(a)) return a;
            a = a.parentNode;
            e++
        }
        return null
    };
    goog.dom.getActiveElement = function(a) {
        try {
            return a && a.activeElement
        } catch (b) {}
        return null
    };
    goog.dom.DomHelper = function(a) {
        this.document_ = a || goog.global.document || document
    };
    goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
    goog.dom.DomHelper.prototype.setDocument = function(a) {
        this.document_ = a
    };
    goog.dom.DomHelper.prototype.getDocument = function() {
        return this.document_
    };
    goog.dom.DomHelper.prototype.getElement = function(a) {
        return goog.isString(a) ? this.document_.getElementById(a) : a
    };
    goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
    goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(a, b, c) {
        return goog.dom.getElementsByTagNameAndClass_(this.document_, a, b, c)
    };
    goog.dom.DomHelper.prototype.getElementsByClass = function(a, b) {
        return goog.dom.getElementsByClass(a, b || this.document_)
    };
    goog.dom.DomHelper.prototype.getElementByClass = function(a, b) {
        return goog.dom.getElementByClass(a, b || this.document_)
    };
    goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
    goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
    goog.dom.DomHelper.prototype.getViewportSize = function(a) {
        return goog.dom.getViewportSize(a || this.getWindow())
    };
    goog.dom.DomHelper.prototype.getDocumentHeight = function() {
        return goog.dom.getDocumentHeight_(this.getWindow())
    };
    goog.dom.DomHelper.prototype.createDom = function(a, b, c) {
        return goog.dom.createDom_(this.document_, arguments)
    };
    goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
    goog.dom.DomHelper.prototype.createElement = function(a) {
        return this.document_.createElement(a)
    };
    goog.dom.DomHelper.prototype.createTextNode = function(a) {
        return this.document_.createTextNode(a)
    };
    goog.dom.DomHelper.prototype.createTable = function(a, b, c) {
        return goog.dom.createTable_(this.document_, a, b, !!c)
    };
    goog.dom.DomHelper.prototype.htmlToDocumentFragment = function(a) {
        return goog.dom.htmlToDocumentFragment_(this.document_, a)
    };
    goog.dom.DomHelper.prototype.getCompatMode = function() {
        return this.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
    };
    goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
        return goog.dom.isCss1CompatMode_(this.document_)
    };
    goog.dom.DomHelper.prototype.getWindow = function() {
        return goog.dom.getWindow_(this.document_)
    };
    goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
        return goog.dom.getDocumentScrollElement_(this.document_)
    };
    goog.dom.DomHelper.prototype.getDocumentScroll = function() {
        return goog.dom.getDocumentScroll_(this.document_)
    };
    goog.dom.DomHelper.prototype.getActiveElement = function(a) {
        return goog.dom.getActiveElement(a || this.document_)
    };
    goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
    goog.dom.DomHelper.prototype.append = goog.dom.append;
    goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
    goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
    goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
    goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
    goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
    goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
    goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
    goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
    goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
    goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
    goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
    goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
    goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
    goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
    goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
    goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
    goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
    goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
    goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
    goog.dom.DomHelper.prototype.contains = goog.dom.contains;
    goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
    goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
    goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
    goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
    goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
    goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
    goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
    goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
    goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
    goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
    goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
    goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
    goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
    goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
    goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
    goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
    goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
    goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
    goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
    goog.debug.errorHandlerWeakDep = {
        protectEntryPoint: function(a) {
            return a
        }
    };
    goog.events = {};
    goog.events.Listener = function() {
        goog.events.Listener.ENABLE_MONITORING && (this.creationStack = Error().stack)
    };
    goog.events.Listener.counter_ = 0;
    goog.events.Listener.ENABLE_MONITORING = !1;
    goog.events.Listener.prototype.key = 0;
    goog.events.Listener.prototype.removed = !1;
    goog.events.Listener.prototype.callOnce = !1;
    goog.events.Listener.prototype.init = function(a, b, c, d, e, f) {
        if (goog.isFunction(a)) this.isFunctionListener_ = !0;
        else if (a && a.handleEvent && goog.isFunction(a.handleEvent)) this.isFunctionListener_ = !1;
        else throw Error("Invalid listener argument");
        this.listener = a;
        this.proxy = b;
        this.src = c;
        this.type = d;
        this.capture = !!e;
        this.handler = f;
        this.callOnce = !1;
        this.key = ++goog.events.Listener.counter_;
        this.removed = !1
    };
    goog.events.Listener.prototype.handleEvent = function(a) {
        return this.isFunctionListener_ ? this.listener.call(this.handler || this.src, a) : this.listener.handleEvent.call(this.listener, a)
    };
    goog.events.BrowserFeature = {
        HAS_W3C_BUTTON: !goog.userAgent.IE || goog.userAgent.isDocumentMode(9),
        HAS_W3C_EVENT_SUPPORT: !goog.userAgent.IE || goog.userAgent.isDocumentMode(9),
        SET_KEY_CODE_TO_PREVENT_DEFAULT: goog.userAgent.IE && !goog.userAgent.isVersion("9"),
        HAS_NAVIGATOR_ONLINE_PROPERTY: !goog.userAgent.WEBKIT || goog.userAgent.isVersion("528"),
        HAS_HTML5_NETWORK_EVENT_SUPPORT: goog.userAgent.GECKO && goog.userAgent.isVersion("1.9b") || goog.userAgent.IE && goog.userAgent.isVersion("8") || goog.userAgent.OPERA && goog.userAgent.isVersion("9.5") ||
            goog.userAgent.WEBKIT && goog.userAgent.isVersion("528"),
        HTML5_NETWORK_EVENTS_FIRE_ON_BODY: goog.userAgent.GECKO && !goog.userAgent.isVersion("8") || goog.userAgent.IE && !goog.userAgent.isVersion("9"),
        TOUCH_ENABLED: "ontouchstart" in goog.global || !(!goog.global.document || !(document.documentElement && "ontouchstart" in document.documentElement)) || !(!goog.global.navigator || !goog.global.navigator.msMaxTouchPoints)
    };
    goog.events.EventWrapper = function() {};
    goog.events.EventWrapper.prototype.listen = function() {};
    goog.events.EventWrapper.prototype.unlisten = function() {};
    goog.events.EventType = {
        CLICK: "click",
        DBLCLICK: "dblclick",
        MOUSEDOWN: "mousedown",
        MOUSEUP: "mouseup",
        MOUSEOVER: "mouseover",
        MOUSEOUT: "mouseout",
        MOUSEMOVE: "mousemove",
        SELECTSTART: "selectstart",
        KEYPRESS: "keypress",
        KEYDOWN: "keydown",
        KEYUP: "keyup",
        BLUR: "blur",
        FOCUS: "focus",
        DEACTIVATE: "deactivate",
        FOCUSIN: goog.userAgent.IE ? "focusin" : "DOMFocusIn",
        FOCUSOUT: goog.userAgent.IE ? "focusout" : "DOMFocusOut",
        CHANGE: "change",
        SELECT: "select",
        SUBMIT: "submit",
        INPUT: "input",
        PROPERTYCHANGE: "propertychange",
        DRAGSTART: "dragstart",
        DRAG: "drag",
        DRAGENTER: "dragenter",
        DRAGOVER: "dragover",
        DRAGLEAVE: "dragleave",
        DROP: "drop",
        DRAGEND: "dragend",
        TOUCHSTART: "touchstart",
        TOUCHMOVE: "touchmove",
        TOUCHEND: "touchend",
        TOUCHCANCEL: "touchcancel",
        BEFOREUNLOAD: "beforeunload",
        CONTEXTMENU: "contextmenu",
        ERROR: "error",
        HELP: "help",
        LOAD: "load",
        LOSECAPTURE: "losecapture",
        READYSTATECHANGE: "readystatechange",
        RESIZE: "resize",
        SCROLL: "scroll",
        UNLOAD: "unload",
        HASHCHANGE: "hashchange",
        PAGEHIDE: "pagehide",
        PAGESHOW: "pageshow",
        POPSTATE: "popstate",
        COPY: "copy",
        PASTE: "paste",
        CUT: "cut",
        BEFORECOPY: "beforecopy",
        BEFORECUT: "beforecut",
        BEFOREPASTE: "beforepaste",
        ONLINE: "online",
        OFFLINE: "offline",
        MESSAGE: "message",
        CONNECT: "connect",
        TRANSITIONEND: goog.userAgent.WEBKIT ? "webkitTransitionEnd" : goog.userAgent.OPERA ? "oTransitionEnd" : "transitionend",
        MSGESTURECHANGE: "MSGestureChange",
        MSGESTUREEND: "MSGestureEnd",
        MSGESTUREHOLD: "MSGestureHold",
        MSGESTURESTART: "MSGestureStart",
        MSGESTURETAP: "MSGestureTap",
        MSGOTPOINTERCAPTURE: "MSGotPointerCapture",
        MSINERTIASTART: "MSInertiaStart",
        MSLOSTPOINTERCAPTURE: "MSLostPointerCapture",
        MSPOINTERCANCEL: "MSPointerCancel",
        MSPOINTERDOWN: "MSPointerDown",
        MSPOINTERMOVE: "MSPointerMove",
        MSPOINTEROVER: "MSPointerOver",
        MSPOINTEROUT: "MSPointerOut",
        MSPOINTERUP: "MSPointerUp"
    };
    goog.events.Event = function(a, b) {
        this.type = a;
        this.currentTarget = this.target = b
    };
    goog.events.Event.prototype.disposeInternal = function() {};
    goog.events.Event.prototype.dispose = function() {};
    goog.events.Event.prototype.propagationStopped_ = !1;
    goog.events.Event.prototype.defaultPrevented = !1;
    goog.events.Event.prototype.returnValue_ = !0;
    goog.events.Event.prototype.stopPropagation = function() {
        this.propagationStopped_ = !0
    };
    goog.events.Event.prototype.preventDefault = function() {
        this.defaultPrevented = !0;
        this.returnValue_ = !1
    };
    goog.events.Event.stopPropagation = function(a) {
        a.stopPropagation()
    };
    goog.events.Event.preventDefault = function(a) {
        a.preventDefault()
    };
    goog.reflect = {};
    goog.reflect.object = function(a, b) {
        return b
    };
    goog.reflect.sinkValue = function(a) {
        goog.reflect.sinkValue[" "](a);
        return a
    };
    goog.reflect.sinkValue[" "] = goog.nullFunction;
    goog.reflect.canAccessProperty = function(a, b) {
        try {
            return goog.reflect.sinkValue(a[b]), !0
        } catch (c) {}
        return !1
    };
    goog.events.BrowserEvent = function(a, b) {
        a && this.init(a, b)
    };
    goog.inherits(goog.events.BrowserEvent, goog.events.Event);
    goog.events.BrowserEvent.MouseButton = {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2
    };
    goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
    goog.events.BrowserEvent.prototype.target = null;
    goog.events.BrowserEvent.prototype.relatedTarget = null;
    goog.events.BrowserEvent.prototype.offsetX = 0;
    goog.events.BrowserEvent.prototype.offsetY = 0;
    goog.events.BrowserEvent.prototype.clientX = 0;
    goog.events.BrowserEvent.prototype.clientY = 0;
    goog.events.BrowserEvent.prototype.screenX = 0;
    goog.events.BrowserEvent.prototype.screenY = 0;
    goog.events.BrowserEvent.prototype.button = 0;
    goog.events.BrowserEvent.prototype.keyCode = 0;
    goog.events.BrowserEvent.prototype.charCode = 0;
    goog.events.BrowserEvent.prototype.ctrlKey = !1;
    goog.events.BrowserEvent.prototype.altKey = !1;
    goog.events.BrowserEvent.prototype.shiftKey = !1;
    goog.events.BrowserEvent.prototype.metaKey = !1;
    goog.events.BrowserEvent.prototype.platformModifierKey = !1;
    goog.events.BrowserEvent.prototype.event_ = null;
    goog.events.BrowserEvent.prototype.init = function(a, b) {
        var c = this.type = a.type;
        goog.events.Event.call(this, c);
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var d = a.relatedTarget;
        d ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty(d, "nodeName") || (d = null)) : c == goog.events.EventType.MOUSEOVER ? d = a.fromElement : c == goog.events.EventType.MOUSEOUT && (d = a.toElement);
        this.relatedTarget = d;
        this.offsetX = goog.userAgent.WEBKIT || void 0 !== a.offsetX ? a.offsetX : a.layerX;
        this.offsetY = goog.userAgent.WEBKIT || void 0 !==
            a.offsetY ? a.offsetY : a.layerY;
        this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
        this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
        this.screenX = a.screenX || 0;
        this.screenY = a.screenY || 0;
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.platformModifierKey = goog.userAgent.MAC ? a.metaKey : a.ctrlKey;
        this.state = a.state;
        this.event_ = a;
        a.defaultPrevented && this.preventDefault();
        delete this.propagationStopped_
    };
    goog.events.BrowserEvent.prototype.isButton = function(a) {
        return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == a : "click" == this.type ? a == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[a])
    };
    goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
        return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
    };
    goog.events.BrowserEvent.prototype.stopPropagation = function() {
        goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
        this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
    };
    goog.events.BrowserEvent.prototype.preventDefault = function() {
        goog.events.BrowserEvent.superClass_.preventDefault.call(this);
        var a = this.event_;
        if (a.preventDefault) a.preventDefault();
        else if (a.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
        } catch (b) {}
    };
    goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
        return this.event_
    };
    goog.events.BrowserEvent.prototype.disposeInternal = function() {};
    goog.events.listeners_ = {};
    goog.events.listenerTree_ = {};
    goog.events.sources_ = {};
    goog.events.onString_ = "on";
    goog.events.onStringMap_ = {};
    goog.events.keySeparator_ = "_";
    goog.events.listen = function(a, b, c, d, e) {
        if (goog.isArray(b)) {
            for (var f = 0; f < b.length; f++) goog.events.listen(a, b[f], c, d, e);
            return null
        }
        return goog.events.listen_(a, b, c, !1, d, e)
    };
    goog.events.listen_ = function(a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        e = !!e;
        var g = goog.events.listenerTree_;
        b in g || (g[b] = {
            count_: 0,
            remaining_: 0
        });
        g = g[b];
        e in g || (g[e] = {
            count_: 0,
            remaining_: 0
        }, g.count_++);
        var g = g[e],
            h = goog.getUid(a),
            j;
        g.remaining_++;
        if (g[h]) {
            j = g[h];
            for (var k = 0; k < j.length; k++)
                if (g = j[k], g.listener == c && g.handler == f) {
                    if (g.removed) break;
                    d || (j[k].callOnce = !1);
                    return j[k].key
                }
        } else j = g[h] = [], g.count_++;
        k = goog.events.getProxy();
        k.src = a;
        g = new goog.events.Listener;
        g.init(c, k, a, b,
            e, f);
        g.callOnce = d;
        c = g.key;
        k.key = c;
        j.push(g);
        goog.events.listeners_[c] = g;
        goog.events.sources_[h] || (goog.events.sources_[h] = []);
        goog.events.sources_[h].push(g);
        a.addEventListener ? (a == goog.global || !a.customEvent_) && a.addEventListener(b, k, e) : a.attachEvent(goog.events.getOnString_(b), k);
        return c
    };
    goog.events.getProxy = function() {
        var a = goog.events.handleBrowserEvent_,
            b = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function(c) {
                return a.call(b.src, b.key, c)
            } : function(c) {
                c = a.call(b.src, b.key, c);
                if (!c) return c
            };
        return b
    };
    goog.events.listenOnce = function(a, b, c, d, e) {
        if (goog.isArray(b)) {
            for (var f = 0; f < b.length; f++) goog.events.listenOnce(a, b[f], c, d, e);
            return null
        }
        return goog.events.listen_(a, b, c, !0, d, e)
    };
    goog.events.listenWithWrapper = function(a, b, c, d, e) {
        b.listen(a, c, d, e)
    };
    goog.events.unlisten = function(a, b, c, d, e) {
        if (goog.isArray(b)) {
            for (var f = 0; f < b.length; f++) goog.events.unlisten(a, b[f], c, d, e);
            return null
        }
        d = !!d;
        a = goog.events.getListeners_(a, b, d);
        if (!a) return !1;
        for (f = 0; f < a.length; f++)
            if (a[f].listener == c && a[f].capture == d && a[f].handler == e) return goog.events.unlistenByKey(a[f].key);
        return !1
    };
    goog.events.unlistenByKey = function(a) {
        if (!goog.events.listeners_[a]) return !1;
        var b = goog.events.listeners_[a];
        if (b.removed) return !1;
        var c = b.src,
            d = b.type,
            e = b.proxy,
            f = b.capture;
        c.removeEventListener ? (c == goog.global || !c.customEvent_) && c.removeEventListener(d, e, f) : c.detachEvent && c.detachEvent(goog.events.getOnString_(d), e);
        c = goog.getUid(c);
        goog.events.sources_[c] && (e = goog.events.sources_[c], goog.array.remove(e, b), 0 == e.length && delete goog.events.sources_[c]);
        b.removed = !0;
        if (b = goog.events.listenerTree_[d][f][c]) b.needsCleanup_ = !0, goog.events.cleanUp_(d, f, c, b);
        delete goog.events.listeners_[a];
        return !0
    };
    goog.events.unlistenWithWrapper = function(a, b, c, d, e) {
        b.unlisten(a, c, d, e)
    };
    goog.events.cleanUp_ = function(a, b, c, d) {
        if (!d.locked_ && d.needsCleanup_) {
            for (var e = 0, f = 0; e < d.length; e++) d[e].removed ? d[e].proxy.src = null : (e != f && (d[f] = d[e]), f++);
            d.length = f;
            d.needsCleanup_ = !1;
            0 == f && (delete goog.events.listenerTree_[a][b][c], goog.events.listenerTree_[a][b].count_--, 0 == goog.events.listenerTree_[a][b].count_ && (delete goog.events.listenerTree_[a][b], goog.events.listenerTree_[a].count_--), 0 == goog.events.listenerTree_[a].count_ && delete goog.events.listenerTree_[a])
        }
    };
    goog.events.removeAll = function(a, b, c) {
        var d = 0,
            e = null == b,
            f = null == c;
        c = !!c;
        if (null == a) goog.object.forEach(goog.events.sources_, function(a) {
            for (var g = a.length - 1; 0 <= g; g--) {
                var h = a[g];
                if ((e || b == h.type) && (f || c == h.capture)) goog.events.unlistenByKey(h.key), d++
            }
        });
        else if (a = goog.getUid(a), goog.events.sources_[a]) {
            a = goog.events.sources_[a];
            for (var g = a.length - 1; 0 <= g; g--) {
                var h = a[g];
                if ((e || b == h.type) && (f || c == h.capture)) goog.events.unlistenByKey(h.key), d++
            }
        }
        return d
    };
    goog.events.getListeners = function(a, b, c) {
        return goog.events.getListeners_(a, b, c) || []
    };
    goog.events.getListeners_ = function(a, b, c) {
        var d = goog.events.listenerTree_;
        return b in d && (d = d[b], c in d && (d = d[c], a = goog.getUid(a), d[a])) ? d[a] : null
    };
    goog.events.getListener = function(a, b, c, d, e) {
        d = !!d;
        if (a = goog.events.getListeners_(a, b, d))
            for (b = 0; b < a.length; b++)
                if (!a[b].removed && a[b].listener == c && a[b].capture == d && a[b].handler == e) return a[b];
        return null
    };
    goog.events.hasListener = function(a, b, c) {
        a = goog.getUid(a);
        var d = goog.events.sources_[a];
        if (d) {
            var e = goog.isDef(b),
                f = goog.isDef(c);
            return e && f ? (d = goog.events.listenerTree_[b], !!d && !!d[c] && a in d[c]) : !e && !f ? !0 : goog.array.some(d, function(a) {
                return e && a.type == b || f && a.capture == c
            })
        }
        return !1
    };
    goog.events.expose = function(a) {
        var b = [],
            c;
        for (c in a) a[c] && a[c].id ? b.push(c + " = " + a[c] + " (" + a[c].id + ")") : b.push(c + " = " + a[c]);
        return b.join("\n")
    };
    goog.events.getOnString_ = function(a) {
        return a in goog.events.onStringMap_ ? goog.events.onStringMap_[a] : goog.events.onStringMap_[a] = goog.events.onString_ + a
    };
    goog.events.fireListeners = function(a, b, c, d) {
        var e = goog.events.listenerTree_;
        return b in e && (e = e[b], c in e) ? goog.events.fireListeners_(e[c], a, b, c, d) : !0
    };
    goog.events.fireListeners_ = function(a, b, c, d, e) {
        var f = 1;
        b = goog.getUid(b);
        if (a[b]) {
            a.remaining_--;
            a = a[b];
            a.locked_ ? a.locked_++ : a.locked_ = 1;
            try {
                for (var g = a.length, h = 0; h < g; h++) {
                    var j = a[h];
                    j && !j.removed && (f &= !1 !== goog.events.fireListener(j, e))
                }
            } finally {
                a.locked_--, goog.events.cleanUp_(c, d, b, a)
            }
        }
        return Boolean(f)
    };
    goog.events.fireListener = function(a, b) {
        a.callOnce && goog.events.unlistenByKey(a.key);
        return a.handleEvent(b)
    };
    goog.events.getTotalListenerCount = function() {
        return goog.object.getCount(goog.events.listeners_)
    };
    goog.events.dispatchEvent = function(a, b) {
        var c = b.type || b,
            d = goog.events.listenerTree_;
        if (!(c in d)) return !0;
        if (goog.isString(b)) b = new goog.events.Event(b, a);
        else if (b instanceof goog.events.Event) b.target = b.target || a;
        else {
            var e = b;
            b = new goog.events.Event(c, a);
            goog.object.extend(b, e)
        }
        var e = 1,
            f, d = d[c],
            c = !0 in d,
            g;
        if (c) {
            f = [];
            for (g = a; g; g = g.getParentEventTarget()) f.push(g);
            g = d[!0];
            g.remaining_ = g.count_;
            for (var h = f.length - 1; !b.propagationStopped_ && 0 <= h && g.remaining_; h--) b.currentTarget = f[h], e &= goog.events.fireListeners_(g,
                f[h], b.type, !0, b) && !1 != b.returnValue_
        }
        if (!1 in d)
            if (g = d[!1], g.remaining_ = g.count_, c)
                for (h = 0; !b.propagationStopped_ && h < f.length && g.remaining_; h++) b.currentTarget = f[h], e &= goog.events.fireListeners_(g, f[h], b.type, !1, b) && !1 != b.returnValue_;
            else
                for (d = a; !b.propagationStopped_ && d && g.remaining_; d = d.getParentEventTarget()) b.currentTarget = d, e &= goog.events.fireListeners_(g, d, b.type, !1, b) && !1 != b.returnValue_;
        return Boolean(e)
    };
    goog.events.protectBrowserEventEntryPoint = function(a) {
        goog.events.handleBrowserEvent_ = a.protectEntryPoint(goog.events.handleBrowserEvent_)
    };
    goog.events.handleBrowserEvent_ = function(a, b) {
        if (!goog.events.listeners_[a]) return !0;
        var c = goog.events.listeners_[a],
            d = c.type,
            e = goog.events.listenerTree_;
        if (!(d in e)) return !0;
        var e = e[d],
            f, g;
        if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
            f = b || goog.getObjectByName("window.event");
            var h = !0 in e,
                j = !1 in e;
            if (h) {
                if (goog.events.isMarkedIeEvent_(f)) return !0;
                goog.events.markIeEvent_(f)
            }
            var k = new goog.events.BrowserEvent;
            k.init(f, this);
            f = !0;
            try {
                if (h) {
                    for (var l = [], m = k.currentTarget; m; m = m.parentNode) l.push(m);
                    g = e[!0];
                    g.remaining_ = g.count_;
                    for (var p = l.length - 1; !k.propagationStopped_ && 0 <= p && g.remaining_; p--) k.currentTarget = l[p], f &= goog.events.fireListeners_(g, l[p], d, !0, k);
                    if (j) {
                        g = e[!1];
                        g.remaining_ = g.count_;
                        for (p = 0; !k.propagationStopped_ && p < l.length && g.remaining_; p++) k.currentTarget = l[p], f &= goog.events.fireListeners_(g, l[p], d, !1, k)
                    }
                } else f = goog.events.fireListener(c, k)
            } finally {
                l && (l.length = 0)
            }
            return f
        }
        d = new goog.events.BrowserEvent(b, this);
        return f = goog.events.fireListener(c, d)
    };
    goog.events.markIeEvent_ = function(a) {
        var b = !1;
        if (0 == a.keyCode) try {
            a.keyCode = -1;
            return
        } catch (c) {
            b = !0
        }
        if (b || void 0 == a.returnValue) a.returnValue = !0
    };
    goog.events.isMarkedIeEvent_ = function(a) {
        return 0 > a.keyCode || void 0 != a.returnValue
    };
    goog.events.uniqueIdCounter_ = 0;
    goog.events.getUniqueId = function(a) {
        return a + "_" + goog.events.uniqueIdCounter_++
    };
    goog.debug.entryPointRegistry.register(function(a) {
        goog.events.handleBrowserEvent_ = a(goog.events.handleBrowserEvent_)
    });
    goog.events.EventTarget = function() {
        goog.Disposable.call(this)
    };
    goog.inherits(goog.events.EventTarget, goog.Disposable);
    goog.events.EventTarget.prototype.customEvent_ = !0;
    goog.events.EventTarget.prototype.parentEventTarget_ = null;
    goog.events.EventTarget.prototype.getParentEventTarget = function() {
        return this.parentEventTarget_
    };
    goog.events.EventTarget.prototype.setParentEventTarget = function(a) {
        this.parentEventTarget_ = a
    };
    goog.events.EventTarget.prototype.addEventListener = function(a, b, c, d) {
        goog.events.listen(this, a, b, c, d)
    };
    goog.events.EventTarget.prototype.removeEventListener = function(a, b, c, d) {
        goog.events.unlisten(this, a, b, c, d)
    };
    goog.events.EventTarget.prototype.dispatchEvent = function(a) {
        return goog.events.dispatchEvent(this, a)
    };
    goog.events.EventTarget.prototype.disposeInternal = function() {
        goog.events.EventTarget.superClass_.disposeInternal.call(this);
        goog.events.removeAll(this);
        this.parentEventTarget_ = null
    };
    var tart = {
        events: {}
    };
    tart.events.GestureHandler = function(a) {
        this.el = a || document.body;
        goog.events.listen(this.el, goog.events.EventType.TOUCHSTART, this.onTouchstart, !1, this);
        goog.events.listen(this.el, goog.events.EventType.TOUCHMOVE, this.onTouchmove, !1, this);
        goog.events.listen(this.el, goog.events.EventType.TOUCHEND, this.onTouchend, !1, this)
    };
    goog.addSingletonGetter(tart.events.GestureHandler);
    tart.events.GestureHandler.prototype.deviceIsIOSWithBadTarget = navigator.userAgent.match(/iPhone/i) && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
    tart.events.GestureHandler.prototype.onTouchstart = function(a) {
        this.canSwipe = this.canTap = this.isInMotion = !0;
        a = a.getBrowserEvent();
        var b = a.changedTouches[0];
        this.touches = [a.timeStamp, b.pageX, b.pageY]
    };
    tart.events.GestureHandler.prototype.onTouchmove = function(a) {
        var b = this.touches,
            c = a.getBrowserEvent(),
            d = c.changedTouches[0];
        if (20 < Math.abs(d.pageX - b[1]) || 20 < Math.abs(d.pageY - b[2])) this.canTap = !1;
        if (this.canSwipe)
            if (b.push(c.timeStamp, d.pageX, d.pageY), +new Date > b[0] + 100) this.canSwipe = !1;
            else {
                var e = c.timeStamp,
                    b = goog.array.filter(b, function(a, b, c) {
                        return c[b - b % 3] > e - 250
                    });
                1 < b.length / 3 && (c = new goog.math.Coordinate(b[1], b[2]), b = new goog.math.Coordinate(b[b.length - 2], b[b.length - 1]), 60 > goog.math.Coordinate.distance(c,
                    b) || (c = goog.math.angle(c.x, c.y, b.x, b.y), b = tart.events.EventType.SWIPE_RIGHT, 45 < c && 135 > c ? b = tart.events.EventType.SWIPE_DOWN : 135 < c && 225 > c ? b = tart.events.EventType.SWIPE_LEFT : 225 < c && 315 > c && (b = tart.events.EventType.SWIPE_UP), c = document.createEvent("Event"), c.initEvent(b, !0, !0), a.target.dispatchEvent(c), this.canSwipe = !1))
            }
    };
    tart.events.GestureHandler.prototype.onTouchend = function(a) {
        this.isInMotion = !1;
        if (this.canTap) {
            var b = this.touches,
                c = a.getBrowserEvent().changedTouches[0];
            20 < Math.abs(c.pageX - b[1]) || 20 < Math.abs(c.pageY - b[2]) ? this.canTap = !1 : (b = document.createEvent("Event"), b.initEvent(tart.events.EventType.TAP, !0, !0), a = a.target, this.deviceIsIOSWithBadTarget && (a = document.elementFromPoint(c.pageX - window.pageXOffset, c.pageY - window.pageYOffset)), a.dispatchEvent(b))
        }
    };
    tart.events.HoverHandler = function(a) {
        goog.events.EventTarget.call(this);
        goog.events.listen(a || document.body, [goog.events.EventType.MOUSEOVER, goog.events.EventType.MOUSEOUT], this)
    };
    goog.inherits(tart.events.HoverHandler, goog.events.EventTarget);
    tart.events.HoverHandler.prototype.handleEvent = function(a) {
        a.type == goog.events.EventType.MOUSEOVER ? a.relatedTarget && !goog.dom.contains(a.target, a.relatedTarget) && (a = new goog.events.BrowserEvent(a.getBrowserEvent()), a.type = tart.events.EventType.MOUSEENTER, this.dispatchEvent(a)) : a.type == goog.events.EventType.MOUSEOUT && (a.relatedTarget && !goog.dom.contains(a.target, a.relatedTarget)) && (a = new goog.events.BrowserEvent(a.getBrowserEvent()), a.type = tart.events.EventType.MOUSELEAVE, this.dispatchEvent(a))
    };
    tart.events.EventType = {
        MOUSEENTER: "mouseenter",
        MOUSELEAVE: "mouseleave",
        TAP: "tap",
        SWIPE_RIGHT: "swipeRight",
        SWIPE_UP: "swipeUp",
        SWIPE_LEFT: "swipeLeft",
        SWIPE_DOWN: "swipeDown"
    };
    tart.ui = {};
    tart.ui.ComponentManager = function() {
        this.components = {};
        this.gestureHandler = tart.events.GestureHandler.getInstance();
        this.hoverHandler = new tart.events.HoverHandler;
        goog.events.listen(document.body, tart.ui.ComponentManager.eventTypes, this);
        goog.events.listen(this.hoverHandler, [tart.events.EventType.MOUSEENTER, tart.events.EventType.MOUSELEAVE], this)
    };
    goog.addSingletonGetter(tart.ui.ComponentManager);
    tart.ui.ComponentManager.prototype.getParentCmp = function(a) {
        var b = a,
            c;
        do {
            if (!(c = this.components[b.getAttribute && b.getAttribute("data-cmp")]))(c = this.components[b.id]) && a.setAttribute("data-cmp", b.id);
            if (c) break
        } while (b = b.parentNode);
        return c
    };
    tart.ui.ComponentManager.eventTypes = [goog.events.EventType.CLICK, goog.events.EventType.MOUSEOVER, goog.events.EventType.MOUSEOUT, goog.events.EventType.MOUSEMOVE, goog.events.EventType.MOUSEDOWN, goog.events.EventType.MOUSEUP, tart.events.EventType.MOUSEENTER, tart.events.EventType.MOUSELEAVE, tart.events.EventType.TAP, tart.events.EventType.SWIPE_LEFT, tart.events.EventType.SWIPE_RIGHT, tart.events.EventType.SWIPE_UP, tart.events.EventType.SWIPE_DOWN, goog.events.EventType.SCROLL, goog.events.EventType.KEYUP,
        goog.events.EventType.FOCUSIN, goog.events.EventType.FOCUSOUT, goog.events.EventType.TOUCHSTART, goog.events.EventType.TOUCHMOVE, goog.events.EventType.TOUCHEND
    ];
    tart.ui.ComponentManager.prototype.handleEvent = function(a) {
        var b = this.getParentCmp(a.target),
            c = b && b.events && b.events[a.type];
        if (c) {
            var d = goog.object.getKeys(c);
            do
                if (a.type == tart.events.EventType.MOUSEENTER || a.type == tart.events.EventType.MOUSELEAVE) {
                    if (a.relatedTarget && !goog.dom.contains(a.target, a.relatedTarget) && !1 === this.callHandler(b, a, c, d)) break
                } else if (!1 === this.callHandler(b, a, c, d)) break; while ((a.target = a.target.parentNode) && a.target != b.getElement())
        }
    };
    tart.ui.ComponentManager.prototype.callHandler = function(a, b, c, d) {
        var e = !0;
        goog.array.forEach(d, function(d) {
            this.matchesSelector(b.target, d) && (e = c[d].call(a, b))
        }, this);
        return e
    };
    tart.ui.ComponentManager.prototype.matchesSelector = function(a, b) {
        return 0 <= goog.array.indexOf(goog.dom.query(b), a)
    };
    tart.ui.ComponentManager.prototype.set = function(a) {
        this.components[a.getId()] = a
    };
    tart.ui.ComponentManager.prototype.remove = function(a) {
        delete this.components[a.getId()]
    };
    pb.ui = {};
    pb.ui.ComponentManager = function() {
        tart.ui.ComponentManager.call(this);
        this.components = {}
    };
    goog.inherits(pb.ui.ComponentManager, tart.ui.ComponentManager);
    goog.addSingletonGetter(pb.ui.ComponentManager);
    pb.ui.ComponentManager.prototype.set = function(a) {
        this.components[a.getId()] = a
    };
    pb.ui.ComponentManager.prototype.remove = function(a) {
        delete this.components[a.getId()]
    };
    tart.dom = {};
    (function() {
        var a = document.createElement("div");
        tart.dom.createElement = function(b) {
            a.innerHTML = b;
            return a.removeChild(a.firstChild)
        }
    })();
    goog.math.Box = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    goog.math.Box.boundingBox = function(a) {
        for (var b = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            b.top = Math.min(b.top, d.y);
            b.right = Math.max(b.right, d.x);
            b.bottom = Math.max(b.bottom, d.y);
            b.left = Math.min(b.left, d.x)
        }
        return b
    };
    goog.math.Box.prototype.clone = function() {
        return new goog.math.Box(this.top, this.right, this.bottom, this.left)
    };
    goog.DEBUG && (goog.math.Box.prototype.toString = function() {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
    });
    goog.math.Box.prototype.contains = function(a) {
        return goog.math.Box.contains(this, a)
    };
    goog.math.Box.prototype.expand = function(a, b, c, d) {
        goog.isObject(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += b, this.bottom += c, this.left -= d);
        return this
    };
    goog.math.Box.prototype.expandToInclude = function(a) {
        this.left = Math.min(this.left, a.left);
        this.top = Math.min(this.top, a.top);
        this.right = Math.max(this.right, a.right);
        this.bottom = Math.max(this.bottom, a.bottom)
    };
    goog.math.Box.equals = function(a, b) {
        return a == b ? !0 : !a || !b ? !1 : a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left
    };
    goog.math.Box.contains = function(a, b) {
        return !a || !b ? !1 : b instanceof goog.math.Box ? b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom : b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom
    };
    goog.math.Box.relativePositionX = function(a, b) {
        return b.x < a.left ? b.x - a.left : b.x > a.right ? b.x - a.right : 0
    };
    goog.math.Box.relativePositionY = function(a, b) {
        return b.y < a.top ? b.y - a.top : b.y > a.bottom ? b.y - a.bottom : 0
    };
    goog.math.Box.distance = function(a, b) {
        var c = goog.math.Box.relativePositionX(a, b),
            d = goog.math.Box.relativePositionY(a, b);
        return Math.sqrt(c * c + d * d)
    };
    goog.math.Box.intersects = function(a, b) {
        return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom
    };
    goog.math.Box.intersectsWithPadding = function(a, b, c) {
        return a.left <= b.right + c && b.left <= a.right + c && a.top <= b.bottom + c && b.top <= a.bottom + c
    };
    goog.math.Rect = function(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    goog.math.Rect.prototype.clone = function() {
        return new goog.math.Rect(this.left, this.top, this.width, this.height)
    };
    goog.math.Rect.prototype.toBox = function() {
        return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left)
    };
    goog.math.Rect.createFromBox = function(a) {
        return new goog.math.Rect(a.left, a.top, a.right - a.left, a.bottom - a.top)
    };
    goog.DEBUG && (goog.math.Rect.prototype.toString = function() {
        return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
    });
    goog.math.Rect.equals = function(a, b) {
        return a == b ? !0 : !a || !b ? !1 : a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height
    };
    goog.math.Rect.prototype.intersection = function(a) {
        var b = Math.max(this.left, a.left),
            c = Math.min(this.left + this.width, a.left + a.width);
        if (b <= c) {
            var d = Math.max(this.top, a.top);
            a = Math.min(this.top + this.height, a.top + a.height);
            if (d <= a) return this.left = b, this.top = d, this.width = c - b, this.height = a - d, !0
        }
        return !1
    };
    goog.math.Rect.intersection = function(a, b) {
        var c = Math.max(a.left, b.left),
            d = Math.min(a.left + a.width, b.left + b.width);
        if (c <= d) {
            var e = Math.max(a.top, b.top),
                f = Math.min(a.top + a.height, b.top + b.height);
            if (e <= f) return new goog.math.Rect(c, e, d - c, f - e)
        }
        return null
    };
    goog.math.Rect.intersects = function(a, b) {
        return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height
    };
    goog.math.Rect.prototype.intersects = function(a) {
        return goog.math.Rect.intersects(this, a)
    };
    goog.math.Rect.difference = function(a, b) {
        var c = goog.math.Rect.intersection(a, b);
        if (!c || !c.height || !c.width) return [a.clone()];
        var c = [],
            d = a.top,
            e = a.height,
            f = a.left + a.width,
            g = a.top + a.height,
            h = b.left + b.width,
            j = b.top + b.height;
        b.top > a.top && (c.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top)), d = b.top, e -= b.top - a.top);
        j < g && (c.push(new goog.math.Rect(a.left, j, a.width, g - j)), e = j - d);
        b.left > a.left && c.push(new goog.math.Rect(a.left, d, b.left - a.left, e));
        h < f && c.push(new goog.math.Rect(h, d, f - h, e));
        return c
    };
    goog.math.Rect.prototype.difference = function(a) {
        return goog.math.Rect.difference(this, a)
    };
    goog.math.Rect.prototype.boundingRect = function(a) {
        var b = Math.max(this.left + this.width, a.left + a.width),
            c = Math.max(this.top + this.height, a.top + a.height);
        this.left = Math.min(this.left, a.left);
        this.top = Math.min(this.top, a.top);
        this.width = b - this.left;
        this.height = c - this.top
    };
    goog.math.Rect.boundingRect = function(a, b) {
        if (!a || !b) return null;
        var c = a.clone();
        c.boundingRect(b);
        return c
    };
    goog.math.Rect.prototype.contains = function(a) {
        return a instanceof goog.math.Rect ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
    };
    goog.math.Rect.prototype.getSize = function() {
        return new goog.math.Size(this.width, this.height)
    };
    goog.dom.vendor = {};
    goog.dom.vendor.getVendorJsPrefix = function() {
        return goog.userAgent.WEBKIT ? "Webkit" : goog.userAgent.GECKO ? "Moz" : goog.userAgent.IE ? "ms" : goog.userAgent.OPERA ? "O" : null
    };
    goog.dom.vendor.getVendorPrefix = function() {
        return goog.userAgent.WEBKIT ? "-webkit" : goog.userAgent.GECKO ? "-moz" : goog.userAgent.IE ? "-ms" : goog.userAgent.OPERA ? "-o" : null
    };
    goog.style = {};
    goog.style.setStyle = function(a, b, c) {
        goog.isString(b) ? goog.style.setStyle_(a, c, b) : goog.object.forEach(b, goog.partial(goog.style.setStyle_, a))
    };
    goog.style.setStyle_ = function(a, b, c) {
        (c = goog.style.getVendorJsStyleName_(a, c)) && (a.style[c] = b)
    };
    goog.style.getVendorJsStyleName_ = function(a, b) {
        var c = goog.string.toCamelCase(b);
        if (void 0 === a.style[c]) {
            var d = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(b);
            if (void 0 !== a.style[d]) return d
        }
        return c
    };
    goog.style.getVendorStyleName_ = function(a, b) {
        var c = goog.string.toCamelCase(b);
        return void 0 === a.style[c] && (c = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(b), void 0 !== a.style[c]) ? goog.dom.vendor.getVendorPrefix() + "-" + b : b
    };
    goog.style.getStyle = function(a, b) {
        var c = a.style[goog.string.toCamelCase(b)];
        return "undefined" !== typeof c ? c : a.style[goog.style.getVendorJsStyleName_(a, b)] || ""
    };
    goog.style.getComputedStyle = function(a, b) {
        var c = goog.dom.getOwnerDocument(a);
        return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : ""
    };
    goog.style.getCascadedStyle = function(a, b) {
        return a.currentStyle ? a.currentStyle[b] : null
    };
    goog.style.getStyle_ = function(a, b) {
        return goog.style.getComputedStyle(a, b) || goog.style.getCascadedStyle(a, b) || a.style && a.style[b]
    };
    goog.style.getComputedPosition = function(a) {
        return goog.style.getStyle_(a, "position")
    };
    goog.style.getBackgroundColor = function(a) {
        return goog.style.getStyle_(a, "backgroundColor")
    };
    goog.style.getComputedOverflowX = function(a) {
        return goog.style.getStyle_(a, "overflowX")
    };
    goog.style.getComputedOverflowY = function(a) {
        return goog.style.getStyle_(a, "overflowY")
    };
    goog.style.getComputedZIndex = function(a) {
        return goog.style.getStyle_(a, "zIndex")
    };
    goog.style.getComputedTextAlign = function(a) {
        return goog.style.getStyle_(a, "textAlign")
    };
    goog.style.getComputedCursor = function(a) {
        return goog.style.getStyle_(a, "cursor")
    };
    goog.style.setPosition = function(a, b, c) {
        var d, e = goog.userAgent.GECKO && (goog.userAgent.MAC || goog.userAgent.X11) && goog.userAgent.isVersion("1.9");
        b instanceof goog.math.Coordinate ? (d = b.x, b = b.y) : (d = b, b = c);
        a.style.left = goog.style.getPixelStyleValue_(d, e);
        a.style.top = goog.style.getPixelStyleValue_(b, e)
    };
    goog.style.getPosition = function(a) {
        return new goog.math.Coordinate(a.offsetLeft, a.offsetTop)
    };
    goog.style.getClientViewportElement = function(a) {
        a = a ? goog.dom.getOwnerDocument(a) : goog.dom.getDocument();
        return goog.userAgent.IE && !goog.userAgent.isDocumentMode(9) && !goog.dom.getDomHelper(a).isCss1CompatMode() ? a.body : a.documentElement
    };
    goog.style.getViewportPageOffset = function(a) {
        var b = a.body;
        a = a.documentElement;
        return new goog.math.Coordinate(b.scrollLeft || a.scrollLeft, b.scrollTop || a.scrollTop)
    };
    goog.style.getBoundingClientRect_ = function(a) {
        var b = a.getBoundingClientRect();
        goog.userAgent.IE && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
        return b
    };
    goog.style.getOffsetParent = function(a) {
        if (goog.userAgent.IE && !goog.userAgent.isDocumentMode(8)) return a.offsetParent;
        var b = goog.dom.getOwnerDocument(a),
            c = goog.style.getStyle_(a, "position"),
            d = "fixed" == c || "absolute" == c;
        for (a = a.parentNode; a && a != b; a = a.parentNode)
            if (c = goog.style.getStyle_(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) return a;
        return null
    };
    goog.style.getVisibleRectForElement = function(a) {
        for (var b = new goog.math.Box(0, Infinity, Infinity, 0), c = goog.dom.getDomHelper(a), d = c.getDocument().body, e = c.getDocument().documentElement, f = c.getDocumentScrollElement(); a = goog.style.getOffsetParent(a);)
            if ((!goog.userAgent.IE || 0 != a.clientWidth) && (!goog.userAgent.WEBKIT || 0 != a.clientHeight || a != d) && a != d && a != e && "visible" != goog.style.getStyle_(a, "overflow")) {
                var g = goog.style.getPageOffset(a),
                    h = goog.style.getClientLeftTop(a);
                g.x += h.x;
                g.y += h.y;
                b.top = Math.max(b.top,
                    g.y);
                b.right = Math.min(b.right, g.x + a.clientWidth);
                b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
                b.left = Math.max(b.left, g.x)
            }
        d = f.scrollLeft;
        f = f.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, f);
        c = c.getViewportSize();
        b.right = Math.min(b.right, d + c.width);
        b.bottom = Math.min(b.bottom, f + c.height);
        return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
    };
    goog.style.getContainerOffsetToScrollInto = function(a, b, c) {
        var d = goog.style.getPageOffset(a),
            e = goog.style.getPageOffset(b),
            f = goog.style.getBorderBox(b),
            g = d.x - e.x - f.left,
            d = d.y - e.y - f.top,
            e = b.clientWidth - a.offsetWidth;
        a = b.clientHeight - a.offsetHeight;
        f = b.scrollLeft;
        b = b.scrollTop;
        c ? (f += g - e / 2, b += d - a / 2) : (f += Math.min(g, Math.max(g - e, 0)), b += Math.min(d, Math.max(d - a, 0)));
        return new goog.math.Coordinate(f, b)
    };
    goog.style.scrollIntoContainerView = function(a, b, c) {
        a = goog.style.getContainerOffsetToScrollInto(a, b, c);
        b.scrollLeft = a.x;
        b.scrollTop = a.y
    };
    goog.style.getClientLeftTop = function(a) {
        if (goog.userAgent.GECKO && !goog.userAgent.isVersion("1.9")) {
            var b = parseFloat(goog.style.getComputedStyle(a, "borderLeftWidth"));
            if (goog.style.isRightToLeft(a)) var c = a.offsetWidth - a.clientWidth - b - parseFloat(goog.style.getComputedStyle(a, "borderRightWidth")),
                b = b + c;
            return new goog.math.Coordinate(b, parseFloat(goog.style.getComputedStyle(a, "borderTopWidth")))
        }
        return new goog.math.Coordinate(a.clientLeft, a.clientTop)
    };
    goog.style.getPageOffset = function(a) {
        var b, c = goog.dom.getOwnerDocument(a),
            d = goog.style.getStyle_(a, "position");
        goog.asserts.assertObject(a, "Parameter is required");
        var e = goog.userAgent.GECKO && c.getBoxObjectFor && !a.getBoundingClientRect && "absolute" == d && (b = c.getBoxObjectFor(a)) && (0 > b.screenX || 0 > b.screenY),
            f = new goog.math.Coordinate(0, 0),
            g = goog.style.getClientViewportElement(c);
        if (a == g) return f;
        if (a.getBoundingClientRect) b = goog.style.getBoundingClientRect_(a), a = goog.dom.getDomHelper(c).getDocumentScroll(),
            f.x = b.left + a.x, f.y = b.top + a.y;
        else if (c.getBoxObjectFor && !e) b = c.getBoxObjectFor(a), a = c.getBoxObjectFor(g), f.x = b.screenX - a.screenX, f.y = b.screenY - a.screenY;
        else {
            b = a;
            do {
                f.x += b.offsetLeft;
                f.y += b.offsetTop;
                b != a && (f.x += b.clientLeft || 0, f.y += b.clientTop || 0);
                if (goog.userAgent.WEBKIT && "fixed" == goog.style.getComputedPosition(b)) {
                    f.x += c.body.scrollLeft;
                    f.y += c.body.scrollTop;
                    break
                }
                b = b.offsetParent
            } while (b && b != a);
            if (goog.userAgent.OPERA || goog.userAgent.WEBKIT && "absolute" == d) f.y -= c.body.offsetTop;
            for (b = a;
                (b = goog.style.getOffsetParent(b)) &&
                b != c.body && b != g;)
                if (f.x -= b.scrollLeft, !goog.userAgent.OPERA || "TR" != b.tagName) f.y -= b.scrollTop
        }
        return f
    };
    goog.style.getPageOffsetLeft = function(a) {
        return goog.style.getPageOffset(a).x
    };
    goog.style.getPageOffsetTop = function(a) {
        return goog.style.getPageOffset(a).y
    };
    goog.style.getFramedPageOffset = function(a, b) {
        var c = new goog.math.Coordinate(0, 0),
            d = goog.dom.getWindow(goog.dom.getOwnerDocument(a)),
            e = a;
        do {
            var f = d == b ? goog.style.getPageOffset(e) : goog.style.getClientPosition(e);
            c.x += f.x;
            c.y += f.y
        } while (d && d != b && (e = d.frameElement) && (d = d.parent));
        return c
    };
    goog.style.translateRectForAnotherFrame = function(a, b, c) {
        if (b.getDocument() != c.getDocument()) {
            var d = b.getDocument().body;
            c = goog.style.getFramedPageOffset(d, c.getWindow());
            c = goog.math.Coordinate.difference(c, goog.style.getPageOffset(d));
            goog.userAgent.IE && !b.isCss1CompatMode() && (c = goog.math.Coordinate.difference(c, b.getDocumentScroll()));
            a.left += c.x;
            a.top += c.y
        }
    };
    goog.style.getRelativePosition = function(a, b) {
        var c = goog.style.getClientPosition(a),
            d = goog.style.getClientPosition(b);
        return new goog.math.Coordinate(c.x - d.x, c.y - d.y)
    };
    goog.style.getClientPosition = function(a) {
        var b = new goog.math.Coordinate;
        if (a.nodeType == goog.dom.NodeType.ELEMENT) {
            if (a.getBoundingClientRect) {
                var c = goog.style.getBoundingClientRect_(a);
                b.x = c.left;
                b.y = c.top
            } else {
                var c = goog.dom.getDomHelper(a).getDocumentScroll(),
                    d = goog.style.getPageOffset(a);
                b.x = d.x - c.x;
                b.y = d.y - c.y
            }
            goog.userAgent.GECKO && !goog.userAgent.isVersion(12) && (b = goog.math.Coordinate.sum(b, goog.style.getCssTranslation(a)))
        } else c = goog.isFunction(a.getBrowserEvent), d = a, a.targetTouches ? d = a.targetTouches[0] :
            c && a.getBrowserEvent().targetTouches && (d = a.getBrowserEvent().targetTouches[0]), b.x = d.clientX, b.y = d.clientY;
        return b
    };
    goog.style.setPageOffset = function(a, b, c) {
        var d = goog.style.getPageOffset(a);
        b instanceof goog.math.Coordinate && (c = b.y, b = b.x);
        goog.style.setPosition(a, a.offsetLeft + (b - d.x), a.offsetTop + (c - d.y))
    };
    goog.style.setSize = function(a, b, c) {
        if (b instanceof goog.math.Size) c = b.height, b = b.width;
        else if (void 0 == c) throw Error("missing height argument");
        goog.style.setWidth(a, b);
        goog.style.setHeight(a, c)
    };
    goog.style.getPixelStyleValue_ = function(a, b) {
        "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
        return a
    };
    goog.style.setHeight = function(a, b) {
        a.style.height = goog.style.getPixelStyleValue_(b, !0)
    };
    goog.style.setWidth = function(a, b) {
        a.style.width = goog.style.getPixelStyleValue_(b, !0)
    };
    goog.style.getSize = function(a) {
        if ("none" != goog.style.getStyle_(a, "display")) return goog.style.getSizeWithDisplay_(a);
        var b = a.style,
            c = b.display,
            d = b.visibility,
            e = b.position;
        b.visibility = "hidden";
        b.position = "absolute";
        b.display = "inline";
        a = goog.style.getSizeWithDisplay_(a);
        b.display = c;
        b.position = e;
        b.visibility = d;
        return a
    };
    goog.style.getSizeWithDisplay_ = function(a) {
        var b = a.offsetWidth,
            c = a.offsetHeight,
            d = goog.userAgent.WEBKIT && !b && !c;
        return (!goog.isDef(b) || d) && a.getBoundingClientRect ? (a = goog.style.getBoundingClientRect_(a), new goog.math.Size(a.right - a.left, a.bottom - a.top)) : new goog.math.Size(b, c)
    };
    goog.style.getBounds = function(a) {
        var b = goog.style.getPageOffset(a);
        a = goog.style.getSize(a);
        return new goog.math.Rect(b.x, b.y, a.width, a.height)
    };
    goog.style.toCamelCase = function(a) {
        return goog.string.toCamelCase(String(a))
    };
    goog.style.toSelectorCase = function(a) {
        return goog.string.toSelectorCase(a)
    };
    goog.style.getOpacity = function(a) {
        var b = a.style;
        a = "";
        "opacity" in b ? a = b.opacity : "MozOpacity" in b ? a = b.MozOpacity : "filter" in b && (b = b.filter.match(/alpha\(opacity=([\d.]+)\)/)) && (a = String(b[1] / 100));
        return "" == a ? a : Number(a)
    };
    goog.style.setOpacity = function(a, b) {
        var c = a.style;
        "opacity" in c ? c.opacity = b : "MozOpacity" in c ? c.MozOpacity = b : "filter" in c && (c.filter = "" === b ? "" : "alpha(opacity=" + 100 * b + ")")
    };
    goog.style.setTransparentBackgroundImage = function(a, b) {
        var c = a.style;
        goog.userAgent.IE && !goog.userAgent.isVersion("8") ? c.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '", sizingMethod="crop")' : (c.backgroundImage = "url(" + b + ")", c.backgroundPosition = "top left", c.backgroundRepeat = "no-repeat")
    };
    goog.style.clearTransparentBackgroundImage = function(a) {
        a = a.style;
        "filter" in a ? a.filter = "" : a.backgroundImage = "none"
    };
    goog.style.showElement = function(a, b) {
        a.style.display = b ? "" : "none"
    };
    goog.style.isElementShown = function(a) {
        return "none" != a.style.display
    };
    goog.style.installStyles = function(a, b) {
        var c = goog.dom.getDomHelper(b),
            d = null;
        if (goog.userAgent.IE) d = c.getDocument().createStyleSheet(), goog.style.setStyles(d, a);
        else {
            var e = c.getElementsByTagNameAndClass("head")[0];
            e || (d = c.getElementsByTagNameAndClass("body")[0], e = c.createDom("head"), d.parentNode.insertBefore(e, d));
            d = c.createDom("style");
            goog.style.setStyles(d, a);
            c.appendChild(e, d)
        }
        return d
    };
    goog.style.uninstallStyles = function(a) {
        goog.dom.removeNode(a.ownerNode || a.owningElement || a)
    };
    goog.style.setStyles = function(a, b) {
        goog.userAgent.IE ? a.cssText = b : a.innerHTML = b
    };
    goog.style.setPreWrap = function(a) {
        a = a.style;
        goog.userAgent.IE && !goog.userAgent.isVersion("8") ? (a.whiteSpace = "pre", a.wordWrap = "break-word") : a.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap"
    };
    goog.style.setInlineBlock = function(a) {
        a = a.style;
        a.position = "relative";
        goog.userAgent.IE && !goog.userAgent.isVersion("8") ? (a.zoom = "1", a.display = "inline") : a.display = goog.userAgent.GECKO ? goog.userAgent.isVersion("1.9a") ? "inline-block" : "-moz-inline-box" : "inline-block"
    };
    goog.style.isRightToLeft = function(a) {
        return "rtl" == goog.style.getStyle_(a, "direction")
    };
    goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT ? "WebkitUserSelect" : null;
    goog.style.isUnselectable = function(a) {
        return goog.style.unselectableStyle_ ? "none" == a.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == a.getAttribute("unselectable") : !1
    };
    goog.style.setUnselectable = function(a, b, c) {
        c = !c ? a.getElementsByTagName("*") : null;
        var d = goog.style.unselectableStyle_;
        if (d) {
            if (b = b ? "none" : "", a.style[d] = b, c) {
                a = 0;
                for (var e; e = c[a]; a++) e.style[d] = b
            }
        } else if (goog.userAgent.IE || goog.userAgent.OPERA)
            if (b = b ? "on" : "", a.setAttribute("unselectable", b), c)
                for (a = 0; e = c[a]; a++) e.setAttribute("unselectable", b)
    };
    goog.style.getBorderBoxSize = function(a) {
        return new goog.math.Size(a.offsetWidth, a.offsetHeight)
    };
    goog.style.setBorderBoxSize = function(a, b) {
        var c = goog.dom.getOwnerDocument(a),
            d = goog.dom.getDomHelper(c).isCss1CompatMode();
        if (goog.userAgent.IE && (!d || !goog.userAgent.isVersion("8")))
            if (c = a.style, d) {
                var d = goog.style.getPaddingBox(a),
                    e = goog.style.getBorderBox(a);
                c.pixelWidth = b.width - e.left - d.left - d.right - e.right;
                c.pixelHeight = b.height - e.top - d.top - d.bottom - e.bottom
            } else c.pixelWidth = b.width, c.pixelHeight = b.height;
        else goog.style.setBoxSizingSize_(a, b, "border-box")
    };
    goog.style.getContentBoxSize = function(a) {
        var b = goog.dom.getOwnerDocument(a),
            c = goog.userAgent.IE && a.currentStyle;
        if (c && goog.dom.getDomHelper(b).isCss1CompatMode() && "auto" != c.width && "auto" != c.height && !c.boxSizing) return b = goog.style.getIePixelValue_(a, c.width, "width", "pixelWidth"), a = goog.style.getIePixelValue_(a, c.height, "height", "pixelHeight"), new goog.math.Size(b, a);
        c = goog.style.getBorderBoxSize(a);
        b = goog.style.getPaddingBox(a);
        a = goog.style.getBorderBox(a);
        return new goog.math.Size(c.width - a.left -
            b.left - b.right - a.right, c.height - a.top - b.top - b.bottom - a.bottom)
    };
    goog.style.setContentBoxSize = function(a, b) {
        var c = goog.dom.getOwnerDocument(a),
            d = goog.dom.getDomHelper(c).isCss1CompatMode();
        if (goog.userAgent.IE && (!d || !goog.userAgent.isVersion("8")))
            if (c = a.style, d) c.pixelWidth = b.width, c.pixelHeight = b.height;
            else {
                var d = goog.style.getPaddingBox(a),
                    e = goog.style.getBorderBox(a);
                c.pixelWidth = b.width + e.left + d.left + d.right + e.right;
                c.pixelHeight = b.height + e.top + d.top + d.bottom + e.bottom
            }
        else goog.style.setBoxSizingSize_(a, b, "content-box")
    };
    goog.style.setBoxSizingSize_ = function(a, b, c) {
        a = a.style;
        goog.userAgent.GECKO ? a.MozBoxSizing = c : goog.userAgent.WEBKIT ? a.WebkitBoxSizing = c : a.boxSizing = c;
        a.width = Math.max(b.width, 0) + "px";
        a.height = Math.max(b.height, 0) + "px"
    };
    goog.style.getIePixelValue_ = function(a, b, c, d) {
        if (/^\d+px?$/.test(b)) return parseInt(b, 10);
        var e = a.style[c],
            f = a.runtimeStyle[c];
        a.runtimeStyle[c] = a.currentStyle[c];
        a.style[c] = b;
        b = a.style[d];
        a.style[c] = e;
        a.runtimeStyle[c] = f;
        return b
    };
    goog.style.getIePixelDistance_ = function(a, b) {
        var c = goog.style.getCascadedStyle(a, b);
        return c ? goog.style.getIePixelValue_(a, c, "left", "pixelLeft") : 0
    };
    goog.style.getBox_ = function(a, b) {
        if (goog.userAgent.IE) {
            var c = goog.style.getIePixelDistance_(a, b + "Left"),
                d = goog.style.getIePixelDistance_(a, b + "Right"),
                e = goog.style.getIePixelDistance_(a, b + "Top"),
                f = goog.style.getIePixelDistance_(a, b + "Bottom");
            return new goog.math.Box(e, d, f, c)
        }
        c = goog.style.getComputedStyle(a, b + "Left");
        d = goog.style.getComputedStyle(a, b + "Right");
        e = goog.style.getComputedStyle(a, b + "Top");
        f = goog.style.getComputedStyle(a, b + "Bottom");
        return new goog.math.Box(parseFloat(e), parseFloat(d), parseFloat(f),
            parseFloat(c))
    };
    goog.style.getPaddingBox = function(a) {
        return goog.style.getBox_(a, "padding")
    };
    goog.style.getMarginBox = function(a) {
        return goog.style.getBox_(a, "margin")
    };
    goog.style.ieBorderWidthKeywords_ = {
        thin: 2,
        medium: 4,
        thick: 6
    };
    goog.style.getIePixelBorder_ = function(a, b) {
        if ("none" == goog.style.getCascadedStyle(a, b + "Style")) return 0;
        var c = goog.style.getCascadedStyle(a, b + "Width");
        return c in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[c] : goog.style.getIePixelValue_(a, c, "left", "pixelLeft")
    };
    goog.style.getBorderBox = function(a) {
        if (goog.userAgent.IE) {
            var b = goog.style.getIePixelBorder_(a, "borderLeft"),
                c = goog.style.getIePixelBorder_(a, "borderRight"),
                d = goog.style.getIePixelBorder_(a, "borderTop");
            a = goog.style.getIePixelBorder_(a, "borderBottom");
            return new goog.math.Box(d, c, a, b)
        }
        b = goog.style.getComputedStyle(a, "borderLeftWidth");
        c = goog.style.getComputedStyle(a, "borderRightWidth");
        d = goog.style.getComputedStyle(a, "borderTopWidth");
        a = goog.style.getComputedStyle(a, "borderBottomWidth");
        return new goog.math.Box(parseFloat(d),
            parseFloat(c), parseFloat(a), parseFloat(b))
    };
    goog.style.getFontFamily = function(a) {
        var b = goog.dom.getOwnerDocument(a),
            c = "";
        if (b.body.createTextRange) {
            b = b.body.createTextRange();
            b.moveToElementText(a);
            try {
                c = b.queryCommandValue("FontName")
            } catch (d) {
                c = ""
            }
        }
        c || (c = goog.style.getStyle_(a, "fontFamily"));
        a = c.split(",");
        1 < a.length && (c = a[0]);
        return goog.string.stripQuotes(c, "\"'")
    };
    goog.style.lengthUnitRegex_ = /[^\d]+$/;
    goog.style.getLengthUnits = function(a) {
        return (a = a.match(goog.style.lengthUnitRegex_)) && a[0] || null
    };
    goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {
        cm: 1,
        "in": 1,
        mm: 1,
        pc: 1,
        pt: 1
    };
    goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {
        em: 1,
        ex: 1
    };
    goog.style.getFontSize = function(a) {
        var b = goog.style.getStyle_(a, "fontSize"),
            c = goog.style.getLengthUnits(b);
        if (b && "px" == c) return parseInt(b, 10);
        if (goog.userAgent.IE) {
            if (c in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) return goog.style.getIePixelValue_(a, b, "left", "pixelLeft");
            if (a.parentNode && a.parentNode.nodeType == goog.dom.NodeType.ELEMENT && c in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) return a = a.parentNode, c = goog.style.getStyle_(a, "fontSize"), goog.style.getIePixelValue_(a, b == c ? "1em" : b, "left", "pixelLeft")
        }
        c =
            goog.dom.createDom("span", {
                style: "visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"
            });
        goog.dom.appendChild(a, c);
        b = c.offsetHeight;
        goog.dom.removeNode(c);
        return b
    };
    goog.style.parseStyleAttribute = function(a) {
        var b = {};
        goog.array.forEach(a.split(/\s*;\s*/), function(a) {
            a = a.split(/\s*:\s*/);
            2 == a.length && (b[goog.string.toCamelCase(a[0].toLowerCase())] = a[1])
        });
        return b
    };
    goog.style.toStyleAttribute = function(a) {
        var b = [];
        goog.object.forEach(a, function(a, d) {
            b.push(goog.string.toSelectorCase(d), ":", a, ";")
        });
        return b.join("")
    };
    goog.style.setFloat = function(a, b) {
        a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = b
    };
    goog.style.getFloat = function(a) {
        return a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
    };
    goog.style.getScrollbarWidth = function(a) {
        var b = goog.dom.createElement("div");
        a && (b.className = a);
        b.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px";
        a = goog.dom.createElement("div");
        goog.style.setSize(a, "200px", "200px");
        b.appendChild(a);
        goog.dom.appendChild(goog.dom.getDocument().body, b);
        a = b.offsetWidth - b.clientWidth;
        goog.dom.removeNode(b);
        return a
    };
    goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
    goog.style.getCssTranslation = function(a) {
        var b;
        goog.userAgent.IE ? b = "-ms-transform" : goog.userAgent.WEBKIT ? b = "-webkit-transform" : goog.userAgent.OPERA ? b = "-o-transform" : goog.userAgent.GECKO && (b = "-moz-transform");
        var c;
        b && (c = goog.style.getStyle_(a, b));
        c || (c = goog.style.getStyle_(a, "transform"));
        if (!c) return new goog.math.Coordinate(0, 0);
        a = c.match(goog.style.MATRIX_TRANSLATION_REGEX_);
        return !a ? new goog.math.Coordinate(0, 0) : new goog.math.Coordinate(parseFloat(a[1]), parseFloat(a[2]))
    };
    goog.events.EventHandler = function(a) {
        goog.Disposable.call(this);
        this.handler_ = a;
        this.keys_ = []
    };
    goog.inherits(goog.events.EventHandler, goog.Disposable);
    goog.events.EventHandler.typeArray_ = [];
    goog.events.EventHandler.prototype.listen = function(a, b, c, d, e) {
        goog.isArray(b) || (goog.events.EventHandler.typeArray_[0] = b, b = goog.events.EventHandler.typeArray_);
        for (var f = 0; f < b.length; f++) {
            var g = goog.events.listen(a, b[f], c || this, d || !1, e || this.handler_ || this);
            this.keys_.push(g)
        }
        return this
    };
    goog.events.EventHandler.prototype.listenOnce = function(a, b, c, d, e) {
        if (goog.isArray(b))
            for (var f = 0; f < b.length; f++) this.listenOnce(a, b[f], c, d, e);
        else a = goog.events.listenOnce(a, b, c || this, d, e || this.handler_ || this), this.keys_.push(a);
        return this
    };
    goog.events.EventHandler.prototype.listenWithWrapper = function(a, b, c, d, e) {
        b.listen(a, c, d, e || this.handler_ || this, this);
        return this
    };
    goog.events.EventHandler.prototype.getListenerCount = function() {
        return this.keys_.length
    };
    goog.events.EventHandler.prototype.unlisten = function(a, b, c, d, e) {
        if (goog.isArray(b))
            for (var f = 0; f < b.length; f++) this.unlisten(a, b[f], c, d, e);
        else if (a = goog.events.getListener(a, b, c || this, d, e || this.handler_ || this)) a = a.key, goog.events.unlistenByKey(a), goog.array.remove(this.keys_, a);
        return this
    };
    goog.events.EventHandler.prototype.unlistenWithWrapper = function(a, b, c, d, e) {
        b.unlisten(a, c, d, e || this.handler_ || this, this);
        return this
    };
    goog.events.EventHandler.prototype.removeAll = function() {
        goog.array.forEach(this.keys_, goog.events.unlistenByKey);
        this.keys_.length = 0
    };
    goog.events.EventHandler.prototype.disposeInternal = function() {
        goog.events.EventHandler.superClass_.disposeInternal.call(this);
        this.removeAll()
    };
    goog.events.EventHandler.prototype.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    };
    goog.ui = {};
    goog.ui.IdGenerator = function() {};
    goog.addSingletonGetter(goog.ui.IdGenerator);
    goog.ui.IdGenerator.prototype.nextId_ = 0;
    goog.ui.IdGenerator.prototype.getNextUniqueId = function() {
        return ":" + (this.nextId_++).toString(36)
    };
    goog.ui.IdGenerator.instance = goog.ui.IdGenerator.getInstance();
    goog.ui.Component = function(a) {
        goog.events.EventTarget.call(this);
        this.dom_ = a || goog.dom.getDomHelper();
        this.rightToLeft_ = goog.ui.Component.defaultRightToLeft_
    };
    goog.inherits(goog.ui.Component, goog.events.EventTarget);
    goog.ui.Component.prototype.idGenerator_ = goog.ui.IdGenerator.getInstance();
    goog.ui.Component.defaultRightToLeft_ = null;
    goog.ui.Component.EventType = {
        BEFORE_SHOW: "beforeshow",
        SHOW: "show",
        HIDE: "hide",
        DISABLE: "disable",
        ENABLE: "enable",
        HIGHLIGHT: "highlight",
        UNHIGHLIGHT: "unhighlight",
        ACTIVATE: "activate",
        DEACTIVATE: "deactivate",
        SELECT: "select",
        UNSELECT: "unselect",
        CHECK: "check",
        UNCHECK: "uncheck",
        FOCUS: "focus",
        BLUR: "blur",
        OPEN: "open",
        CLOSE: "close",
        ENTER: "enter",
        LEAVE: "leave",
        ACTION: "action",
        CHANGE: "change"
    };
    goog.ui.Component.Error = {
        NOT_SUPPORTED: "Method not supported",
        DECORATE_INVALID: "Invalid element to decorate",
        ALREADY_RENDERED: "Component already rendered",
        PARENT_UNABLE_TO_BE_SET: "Unable to set parent component",
        CHILD_INDEX_OUT_OF_BOUNDS: "Child component index out of bounds",
        NOT_OUR_CHILD: "Child is not in parent component",
        NOT_IN_DOCUMENT: "Operation not supported while component is not in document",
        STATE_INVALID: "Invalid component state"
    };
    goog.ui.Component.State = {
        ALL: 255,
        DISABLED: 1,
        HOVER: 2,
        ACTIVE: 4,
        SELECTED: 8,
        CHECKED: 16,
        FOCUSED: 32,
        OPENED: 64
    };
    goog.ui.Component.getStateTransitionEvent = function(a, b) {
        switch (a) {
            case goog.ui.Component.State.DISABLED:
                return b ? goog.ui.Component.EventType.DISABLE : goog.ui.Component.EventType.ENABLE;
            case goog.ui.Component.State.HOVER:
                return b ? goog.ui.Component.EventType.HIGHLIGHT : goog.ui.Component.EventType.UNHIGHLIGHT;
            case goog.ui.Component.State.ACTIVE:
                return b ? goog.ui.Component.EventType.ACTIVATE : goog.ui.Component.EventType.DEACTIVATE;
            case goog.ui.Component.State.SELECTED:
                return b ? goog.ui.Component.EventType.SELECT :
                    goog.ui.Component.EventType.UNSELECT;
            case goog.ui.Component.State.CHECKED:
                return b ? goog.ui.Component.EventType.CHECK : goog.ui.Component.EventType.UNCHECK;
            case goog.ui.Component.State.FOCUSED:
                return b ? goog.ui.Component.EventType.FOCUS : goog.ui.Component.EventType.BLUR;
            case goog.ui.Component.State.OPENED:
                return b ? goog.ui.Component.EventType.OPEN : goog.ui.Component.EventType.CLOSE
        }
        throw Error(goog.ui.Component.Error.STATE_INVALID);
    };
    goog.ui.Component.setDefaultRightToLeft = function(a) {
        goog.ui.Component.defaultRightToLeft_ = a
    };
    goog.ui.Component.prototype.id_ = null;
    goog.ui.Component.prototype.inDocument_ = !1;
    goog.ui.Component.prototype.element_ = null;
    goog.ui.Component.prototype.rightToLeft_ = null;
    goog.ui.Component.prototype.model_ = null;
    goog.ui.Component.prototype.parent_ = null;
    goog.ui.Component.prototype.children_ = null;
    goog.ui.Component.prototype.childIndex_ = null;
    goog.ui.Component.prototype.wasDecorated_ = !1;
    goog.ui.Component.prototype.getId = function() {
        return this.id_ || (this.id_ = this.idGenerator_.getNextUniqueId())
    };
    goog.ui.Component.prototype.setId = function(a) {
        this.parent_ && this.parent_.childIndex_ && (goog.object.remove(this.parent_.childIndex_, this.id_), goog.object.add(this.parent_.childIndex_, a, this));
        this.id_ = a
    };
    goog.ui.Component.prototype.getElement = function() {
        return this.element_
    };
    goog.ui.Component.prototype.setElementInternal = function(a) {
        this.element_ = a
    };
    goog.ui.Component.prototype.getElementsByClass = function(a) {
        return this.element_ ? this.dom_.getElementsByClass(a, this.element_) : []
    };
    goog.ui.Component.prototype.getElementByClass = function(a) {
        return this.element_ ? this.dom_.getElementByClass(a, this.element_) : null
    };
    goog.ui.Component.prototype.getHandler = function() {
        return this.googUiComponentHandler_ || (this.googUiComponentHandler_ = new goog.events.EventHandler(this))
    };
    goog.ui.Component.prototype.setParent = function(a) {
        if (this == a) throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
        if (a && this.parent_ && this.id_ && this.parent_.getChild(this.id_) && this.parent_ != a) throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
        this.parent_ = a;
        goog.ui.Component.superClass_.setParentEventTarget.call(this, a)
    };
    goog.ui.Component.prototype.getParent = function() {
        return this.parent_
    };
    goog.ui.Component.prototype.setParentEventTarget = function(a) {
        if (this.parent_ && this.parent_ != a) throw Error(goog.ui.Component.Error.NOT_SUPPORTED);
        goog.ui.Component.superClass_.setParentEventTarget.call(this, a)
    };
    goog.ui.Component.prototype.getDomHelper = function() {
        return this.dom_
    };
    goog.ui.Component.prototype.isInDocument = function() {
        return this.inDocument_
    };
    goog.ui.Component.prototype.createDom = function() {
        this.element_ = this.dom_.createElement("div")
    };
    goog.ui.Component.prototype.render = function(a) {
        this.render_(a)
    };
    goog.ui.Component.prototype.renderBefore = function(a) {
        this.render_(a.parentNode, a)
    };
    goog.ui.Component.prototype.render_ = function(a, b) {
        if (this.inDocument_) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
        this.element_ || this.createDom();
        a ? a.insertBefore(this.element_, b || null) : this.dom_.getDocument().body.appendChild(this.element_);
        (!this.parent_ || this.parent_.isInDocument()) && this.enterDocument()
    };
    goog.ui.Component.prototype.decorate = function(a) {
        if (this.inDocument_) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
        if (a && this.canDecorate(a)) {
            this.wasDecorated_ = !0;
            if (!this.dom_ || this.dom_.getDocument() != goog.dom.getOwnerDocument(a)) this.dom_ = goog.dom.getDomHelper(a);
            this.decorateInternal(a);
            this.enterDocument()
        } else throw Error(goog.ui.Component.Error.DECORATE_INVALID);
    };
    goog.ui.Component.prototype.canDecorate = function() {
        return !0
    };
    goog.ui.Component.prototype.wasDecorated = function() {
        return this.wasDecorated_
    };
    goog.ui.Component.prototype.decorateInternal = function(a) {
        this.element_ = a
    };
    goog.ui.Component.prototype.enterDocument = function() {
        this.inDocument_ = !0;
        this.forEachChild(function(a) {
            !a.isInDocument() && a.getElement() && a.enterDocument()
        })
    };
    goog.ui.Component.prototype.exitDocument = function() {
        this.forEachChild(function(a) {
            a.isInDocument() && a.exitDocument()
        });
        this.googUiComponentHandler_ && this.googUiComponentHandler_.removeAll();
        this.inDocument_ = !1
    };
    goog.ui.Component.prototype.disposeInternal = function() {
        goog.ui.Component.superClass_.disposeInternal.call(this);
        this.inDocument_ && this.exitDocument();
        this.googUiComponentHandler_ && (this.googUiComponentHandler_.dispose(), delete this.googUiComponentHandler_);
        this.forEachChild(function(a) {
            a.dispose()
        });
        !this.wasDecorated_ && this.element_ && goog.dom.removeNode(this.element_);
        this.parent_ = this.model_ = this.element_ = this.childIndex_ = this.children_ = null
    };
    goog.ui.Component.prototype.makeId = function(a) {
        return this.getId() + "." + a
    };
    goog.ui.Component.prototype.makeIds = function(a) {
        var b = {},
            c;
        for (c in a) b[c] = this.makeId(a[c]);
        return b
    };
    goog.ui.Component.prototype.getModel = function() {
        return this.model_
    };
    goog.ui.Component.prototype.setModel = function(a) {
        this.model_ = a
    };
    goog.ui.Component.prototype.getFragmentFromId = function(a) {
        return a.substring(this.getId().length + 1)
    };
    goog.ui.Component.prototype.getElementByFragment = function(a) {
        if (!this.inDocument_) throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);
        return this.dom_.getElement(this.makeId(a))
    };
    goog.ui.Component.prototype.addChild = function(a, b) {
        this.addChildAt(a, this.getChildCount(), b)
    };
    goog.ui.Component.prototype.addChildAt = function(a, b, c) {
        if (a.inDocument_ && (c || !this.inDocument_)) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
        if (0 > b || b > this.getChildCount()) throw Error(goog.ui.Component.Error.CHILD_INDEX_OUT_OF_BOUNDS);
        if (!this.childIndex_ || !this.children_) this.childIndex_ = {}, this.children_ = [];
        a.getParent() == this ? (goog.object.set(this.childIndex_, a.getId(), a), goog.array.remove(this.children_, a), goog.dom.removeNode(a.getElement())) : goog.object.add(this.childIndex_, a.getId(),
            a);
        a.setParent(this);
        goog.array.insertAt(this.children_, a, b);
        a.inDocument_ && this.inDocument_ && a.getParent() == this ? (c = this.getContentElement(), c.insertBefore(a.getElement(), c.childNodes[b] || null)) : c ? (this.element_ || this.createDom(), b = this.getChildAt(b + 1), a.render_(this.getContentElement(), b ? b.element_ : null)) : this.inDocument_ && (!a.inDocument_ && a.element_ && a.element_.parentNode && a.element_.parentNode.nodeType == goog.dom.NodeType.ELEMENT) && a.enterDocument()
    };
    goog.ui.Component.prototype.getContentElement = function() {
        return this.element_
    };
    goog.ui.Component.prototype.isRightToLeft = function() {
        null == this.rightToLeft_ && (this.rightToLeft_ = goog.style.isRightToLeft(this.inDocument_ ? this.element_ : this.dom_.getDocument().body));
        return this.rightToLeft_
    };
    goog.ui.Component.prototype.setRightToLeft = function(a) {
        if (this.inDocument_) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
        this.rightToLeft_ = a
    };
    goog.ui.Component.prototype.hasChildren = function() {
        return !!this.children_ && 0 != this.children_.length
    };
    goog.ui.Component.prototype.getChildCount = function() {
        return this.children_ ? this.children_.length : 0
    };
    goog.ui.Component.prototype.getChildIds = function() {
        var a = [];
        this.forEachChild(function(b) {
            a.push(b.getId())
        });
        return a
    };
    goog.ui.Component.prototype.getChild = function(a) {
        return this.childIndex_ && a ? goog.object.get(this.childIndex_, a) || null : null
    };
    goog.ui.Component.prototype.getChildAt = function(a) {
        return this.children_ ? this.children_[a] || null : null
    };
    goog.ui.Component.prototype.forEachChild = function(a, b) {
        this.children_ && goog.array.forEach(this.children_, a, b)
    };
    goog.ui.Component.prototype.indexOfChild = function(a) {
        return this.children_ && a ? goog.array.indexOf(this.children_, a) : -1
    };
    goog.ui.Component.prototype.removeChild = function(a, b) {
        if (a) {
            var c = goog.isString(a) ? a : a.getId();
            a = this.getChild(c);
            c && a && (goog.object.remove(this.childIndex_, c), goog.array.remove(this.children_, a), b && (a.exitDocument(), a.element_ && goog.dom.removeNode(a.element_)), a.setParent(null))
        }
        if (!a) throw Error(goog.ui.Component.Error.NOT_OUR_CHILD);
        return a
    };
    goog.ui.Component.prototype.removeChildAt = function(a, b) {
        return this.removeChild(this.getChildAt(a), b)
    };
    goog.ui.Component.prototype.removeChildren = function(a) {
        for (var b = []; this.hasChildren();) b.push(this.removeChildAt(0, a));
        return b
    };
    goog.a11y = {};
    goog.a11y.aria = {};
    goog.a11y.aria.State = {
        ACTIVEDESCENDANT: "activedescendant",
        ATOMIC: "atomic",
        AUTOCOMPLETE: "autocomplete",
        BUSY: "busy",
        CHECKED: "checked",
        CONTROLS: "controls",
        DESCRIBEDBY: "describedby",
        DISABLED: "disabled",
        DROPEFFECT: "dropeffect",
        EXPANDED: "expanded",
        FLOWTO: "flowto",
        GRABBED: "grabbed",
        HASPOPUP: "haspopup",
        HIDDEN: "hidden",
        INVALID: "invalid",
        LABEL: "label",
        LABELLEDBY: "labelledby",
        LEVEL: "level",
        LIVE: "live",
        MULTILINE: "multiline",
        MULTISELECTABLE: "multiselectable",
        ORIENTATION: "orientation",
        OWNS: "owns",
        POSINSET: "posinset",
        PRESSED: "pressed",
        READONLY: "readonly",
        RELEVANT: "relevant",
        REQUIRED: "required",
        SELECTED: "selected",
        SETSIZE: "setsize",
        SORT: "sort",
        VALUEMAX: "valuemax",
        VALUEMIN: "valuemin",
        VALUENOW: "valuenow",
        VALUETEXT: "valuetext"
    };
    goog.a11y.aria.Role = {
        ALERT: "alert",
        ALERTDIALOG: "alertdialog",
        APPLICATION: "application",
        ARTICLE: "article",
        BANNER: "banner",
        BUTTON: "button",
        CHECKBOX: "checkbox",
        COLUMNHEADER: "columnheader",
        COMBOBOX: "combobox",
        COMPLEMENTARY: "complementary",
        DIALOG: "dialog",
        DIRECTORY: "directory",
        DOCUMENT: "document",
        FORM: "form",
        GRID: "grid",
        GRIDCELL: "gridcell",
        GROUP: "group",
        HEADING: "heading",
        IMG: "img",
        LINK: "link",
        LIST: "list",
        LISTBOX: "listbox",
        LISTITEM: "listitem",
        LOG: "log",
        MAIN: "main",
        MARQUEE: "marquee",
        MATH: "math",
        MENU: "menu",
        MENUBAR: "menubar",
        MENU_ITEM: "menuitem",
        MENU_ITEM_CHECKBOX: "menuitemcheckbox",
        MENU_ITEM_RADIO: "menuitemradio",
        NAVIGATION: "navigation",
        NOTE: "note",
        OPTION: "option",
        PRESENTATION: "presentation",
        PROGRESSBAR: "progressbar",
        RADIO: "radio",
        RADIOGROUP: "radiogroup",
        REGION: "region",
        ROW: "row",
        ROWGROUP: "rowgroup",
        ROWHEADER: "rowheader",
        SCROLLBAR: "scrollbar",
        SEARCH: "search",
        SEPARATOR: "separator",
        SLIDER: "slider",
        SPINBUTTON: "spinbutton",
        STATUS: "status",
        TAB: "tab",
        TAB_LIST: "tablist",
        TAB_PANEL: "tabpanel",
        TEXTBOX: "textbox",
        TIMER: "timer",
        TOOLBAR: "toolbar",
        TOOLTIP: "tooltip",
        TREE: "tree",
        TREEGRID: "treegrid",
        TREEITEM: "treeitem"
    };
    goog.a11y.aria.LivePriority = {
        OFF: "off",
        POLITE: "polite",
        ASSERTIVE: "assertive"
    };
    goog.a11y.aria.setRole = function(a, b) {
        a.setAttribute("role", b)
    };
    goog.a11y.aria.getRole = function(a) {
        return a.getAttribute("role") || ""
    };
    goog.a11y.aria.setState = function(a, b, c) {
        a.setAttribute("aria-" + b, c)
    };
    goog.a11y.aria.getState = function(a, b) {
        var c = a.getAttribute("aria-" + b);
        return !0 === c || !1 === c ? c ? "true" : "false" : c ? String(c) : ""
    };
    goog.a11y.aria.getActiveDescendant = function(a) {
        var b = goog.a11y.aria.getState(a, goog.a11y.aria.State.ACTIVEDESCENDANT);
        return goog.dom.getOwnerDocument(a).getElementById(b)
    };
    goog.a11y.aria.setActiveDescendant = function(a, b) {
        goog.a11y.aria.setState(a, goog.a11y.aria.State.ACTIVEDESCENDANT, b ? b.id : "")
    };
    goog.a11y.aria.Announcer = function(a) {
        goog.Disposable.call(this);
        this.domHelper_ = a || goog.dom.getDomHelper();
        this.liveRegions_ = {}
    };
    goog.inherits(goog.a11y.aria.Announcer, goog.Disposable);
    goog.a11y.aria.Announcer.prototype.disposeInternal = function() {
        goog.object.forEach(this.liveRegions_, this.domHelper_.removeNode, this.domHelper_);
        this.domHelper_ = this.liveRegions_ = null;
        goog.a11y.aria.Announcer.superClass_.disposeInternal.call(this)
    };
    goog.a11y.aria.Announcer.prototype.say = function(a, b) {
        goog.dom.setTextContent(this.getLiveRegion_(b || goog.a11y.aria.LivePriority.POLITE), a)
    };
    goog.a11y.aria.Announcer.prototype.getLiveRegion_ = function(a) {
        if (this.liveRegions_[a]) return this.liveRegions_[a];
        var b;
        b = this.domHelper_.createElement("div");
        b.style.position = "absolute";
        b.style.top = "-1000px";
        goog.a11y.aria.setState(b, goog.a11y.aria.State.LIVE, a);
        goog.a11y.aria.setState(b, goog.a11y.aria.State.ATOMIC, "true");
        this.domHelper_.getDocument().body.appendChild(b);
        return this.liveRegions_[a] = b
    };
    goog.dom.a11y = {};
    goog.dom.a11y.State = goog.a11y.aria.State;
    goog.dom.a11y.Role = goog.a11y.aria.Role;
    goog.dom.a11y.LivePriority = goog.a11y.aria.LivePriority;
    goog.dom.a11y.setRole = function(a, b) {
        goog.a11y.aria.setRole(a, b)
    };
    goog.dom.a11y.getRole = function(a) {
        return goog.a11y.aria.getRole(a)
    };
    goog.dom.a11y.setState = function(a, b, c) {
        goog.a11y.aria.setState(a, b, c)
    };
    goog.dom.a11y.getState = function(a, b) {
        return goog.a11y.aria.getState(a, b)
    };
    goog.dom.a11y.getActiveDescendant = function(a) {
        return goog.a11y.aria.getActiveDescendant(a)
    };
    goog.dom.a11y.setActiveDescendant = function(a, b) {
        goog.a11y.aria.setActiveDescendant(a, b)
    };
    goog.dom.a11y.Announcer = goog.a11y.aria.Announcer;
    goog.ui.ControlRenderer = function() {};
    goog.addSingletonGetter(goog.ui.ControlRenderer);
    goog.ui.ControlRenderer.getCustomRenderer = function(a, b) {
        var c = new a;
        c.getCssClass = function() {
            return b
        };
        return c
    };
    goog.ui.ControlRenderer.CSS_CLASS = "goog-control";
    goog.ui.ControlRenderer.IE6_CLASS_COMBINATIONS = [];
    goog.ui.ControlRenderer.prototype.getAriaRole = function() {};
    goog.ui.ControlRenderer.prototype.createDom = function(a) {
        var b = a.getDomHelper().createDom("div", this.getClassNames(a).join(" "), a.getContent());
        this.setAriaStates(a, b);
        return b
    };
    goog.ui.ControlRenderer.prototype.getContentElement = function(a) {
        return a
    };
    goog.ui.ControlRenderer.prototype.enableClassName = function(a, b, c) {
        if (a = a.getElement ? a.getElement() : a)
            if (goog.userAgent.IE && !goog.userAgent.isVersion("7")) {
                var d = this.getAppliedCombinedClassNames_(goog.dom.classes.get(a), b);
                d.push(b);
                goog.partial(c ? goog.dom.classes.add : goog.dom.classes.remove, a).apply(null, d)
            } else goog.dom.classes.enable(a, b, c)
    };
    goog.ui.ControlRenderer.prototype.enableExtraClassName = function(a, b, c) {
        this.enableClassName(a, b, c)
    };
    goog.ui.ControlRenderer.prototype.canDecorate = function() {
        return !0
    };
    goog.ui.ControlRenderer.prototype.decorate = function(a, b) {
        b.id && a.setId(b.id);
        var c = this.getContentElement(b);
        c && c.firstChild ? a.setContentInternal(c.firstChild.nextSibling ? goog.array.clone(c.childNodes) : c.firstChild) : a.setContentInternal(null);
        var d = 0,
            e = this.getCssClass(),
            f = this.getStructuralCssClass(),
            g = !1,
            h = !1,
            c = !1,
            j = goog.dom.classes.get(b);
        goog.array.forEach(j, function(a) {
            !g && a == e ? (g = !0, f == e && (h = !0)) : !h && a == f ? h = !0 : d |= this.getStateFromClass(a)
        }, this);
        a.setStateInternal(d);
        g || (j.push(e), f == e && (h = !0));
        h || j.push(f);
        var k = a.getExtraClassNames();
        k && j.push.apply(j, k);
        if (goog.userAgent.IE && !goog.userAgent.isVersion("7")) {
            var l = this.getAppliedCombinedClassNames_(j);
            0 < l.length && (j.push.apply(j, l), c = !0)
        }(!g || !h || k || c) && goog.dom.classes.set(b, j.join(" "));
        this.setAriaStates(a, b);
        return b
    };
    goog.ui.ControlRenderer.prototype.initializeDom = function(a) {
        a.isRightToLeft() && this.setRightToLeft(a.getElement(), !0);
        a.isEnabled() && this.setFocusable(a, a.isVisible())
    };
    goog.ui.ControlRenderer.prototype.setAriaRole = function(a, b) {
        var c = b || this.getAriaRole();
        c && goog.dom.a11y.setRole(a, c)
    };
    goog.ui.ControlRenderer.prototype.setAriaStates = function(a, b) {
        goog.asserts.assert(a);
        goog.asserts.assert(b);
        a.isEnabled() || this.updateAriaState(b, goog.ui.Component.State.DISABLED, !0);
        a.isSelected() && this.updateAriaState(b, goog.ui.Component.State.SELECTED, !0);
        a.isSupportedState(goog.ui.Component.State.CHECKED) && this.updateAriaState(b, goog.ui.Component.State.CHECKED, a.isChecked());
        a.isSupportedState(goog.ui.Component.State.OPENED) && this.updateAriaState(b, goog.ui.Component.State.OPENED, a.isOpen())
    };
    goog.ui.ControlRenderer.prototype.setAllowTextSelection = function(a, b) {
        goog.style.setUnselectable(a, !b, !goog.userAgent.IE && !goog.userAgent.OPERA)
    };
    goog.ui.ControlRenderer.prototype.setRightToLeft = function(a, b) {
        this.enableClassName(a, this.getStructuralCssClass() + "-rtl", b)
    };
    goog.ui.ControlRenderer.prototype.isFocusable = function(a) {
        var b;
        return a.isSupportedState(goog.ui.Component.State.FOCUSED) && (b = a.getKeyEventTarget()) ? goog.dom.isFocusableTabIndex(b) : !1
    };
    goog.ui.ControlRenderer.prototype.setFocusable = function(a, b) {
        var c;
        if (a.isSupportedState(goog.ui.Component.State.FOCUSED) && (c = a.getKeyEventTarget())) {
            if (!b && a.isFocused()) {
                try {
                    c.blur()
                } catch (d) {}
                a.isFocused() && a.handleBlur(null)
            }
            goog.dom.isFocusableTabIndex(c) != b && goog.dom.setFocusableTabIndex(c, b)
        }
    };
    goog.ui.ControlRenderer.prototype.setVisible = function(a, b) {
        goog.style.showElement(a, b)
    };
    goog.ui.ControlRenderer.prototype.setState = function(a, b, c) {
        var d = a.getElement();
        if (d) {
            var e = this.getClassForState(b);
            e && this.enableClassName(a, e, c);
            this.updateAriaState(d, b, c)
        }
    };
    goog.ui.ControlRenderer.prototype.updateAriaState = function(a, b, c) {
        goog.ui.ControlRenderer.ARIA_STATE_MAP_ || (goog.ui.ControlRenderer.ARIA_STATE_MAP_ = goog.object.create(goog.ui.Component.State.DISABLED, goog.dom.a11y.State.DISABLED, goog.ui.Component.State.SELECTED, goog.dom.a11y.State.SELECTED, goog.ui.Component.State.CHECKED, goog.dom.a11y.State.CHECKED, goog.ui.Component.State.OPENED, goog.dom.a11y.State.EXPANDED));
        (b = goog.ui.ControlRenderer.ARIA_STATE_MAP_[b]) && goog.dom.a11y.setState(a, b, c)
    };
    goog.ui.ControlRenderer.prototype.setContent = function(a, b) {
        var c = this.getContentElement(a);
        if (c && (goog.dom.removeChildren(c), b))
            if (goog.isString(b)) goog.dom.setTextContent(c, b);
            else {
                var d = function(a) {
                    if (a) {
                        var b = goog.dom.getOwnerDocument(c);
                        c.appendChild(goog.isString(a) ? b.createTextNode(a) : a)
                    }
                };
                goog.isArray(b) ? goog.array.forEach(b, d) : goog.isArrayLike(b) && !("nodeType" in b) ? goog.array.forEach(goog.array.clone(b), d) : d(b)
            }
    };
    goog.ui.ControlRenderer.prototype.getKeyEventTarget = function(a) {
        return a.getElement()
    };
    goog.ui.ControlRenderer.prototype.getCssClass = function() {
        return goog.ui.ControlRenderer.CSS_CLASS
    };
    goog.ui.ControlRenderer.prototype.getIe6ClassCombinations = function() {
        return []
    };
    goog.ui.ControlRenderer.prototype.getStructuralCssClass = function() {
        return this.getCssClass()
    };
    goog.ui.ControlRenderer.prototype.getClassNames = function(a) {
        var b = this.getCssClass(),
            c = [b],
            d = this.getStructuralCssClass();
        d != b && c.push(d);
        b = this.getClassNamesForState(a.getState());
        c.push.apply(c, b);
        (a = a.getExtraClassNames()) && c.push.apply(c, a);
        goog.userAgent.IE && !goog.userAgent.isVersion("7") && c.push.apply(c, this.getAppliedCombinedClassNames_(c));
        return c
    };
    goog.ui.ControlRenderer.prototype.getAppliedCombinedClassNames_ = function(a, b) {
        var c = [];
        b && (a = a.concat([b]));
        goog.array.forEach(this.getIe6ClassCombinations(), function(d) {
            goog.array.every(d, goog.partial(goog.array.contains, a)) && (!b || goog.array.contains(d, b)) && c.push(d.join("_"))
        });
        return c
    };
    goog.ui.ControlRenderer.prototype.getClassNamesForState = function(a) {
        for (var b = []; a;) {
            var c = a & -a;
            b.push(this.getClassForState(c));
            a &= ~c
        }
        return b
    };
    goog.ui.ControlRenderer.prototype.getClassForState = function(a) {
        this.classByState_ || this.createClassByStateMap_();
        return this.classByState_[a]
    };
    goog.ui.ControlRenderer.prototype.getStateFromClass = function(a) {
        this.stateByClass_ || this.createStateByClassMap_();
        a = parseInt(this.stateByClass_[a], 10);
        return isNaN(a) ? 0 : a
    };
    goog.ui.ControlRenderer.prototype.createClassByStateMap_ = function() {
        var a = this.getStructuralCssClass();
        this.classByState_ = goog.object.create(goog.ui.Component.State.DISABLED, a + "-disabled", goog.ui.Component.State.HOVER, a + "-hover", goog.ui.Component.State.ACTIVE, a + "-active", goog.ui.Component.State.SELECTED, a + "-selected", goog.ui.Component.State.CHECKED, a + "-checked", goog.ui.Component.State.FOCUSED, a + "-focused", goog.ui.Component.State.OPENED, a + "-open")
    };
    goog.ui.ControlRenderer.prototype.createStateByClassMap_ = function() {
        this.classByState_ || this.createClassByStateMap_();
        this.stateByClass_ = goog.object.transpose(this.classByState_)
    };
    goog.ui.registry = {};
    goog.ui.registry.getDefaultRenderer = function(a) {
        for (var b; a;) {
            b = goog.getUid(a);
            if (b = goog.ui.registry.defaultRenderers_[b]) break;
            a = a.superClass_ ? a.superClass_.constructor : null
        }
        return b ? goog.isFunction(b.getInstance) ? b.getInstance() : new b : null
    };
    goog.ui.registry.setDefaultRenderer = function(a, b) {
        if (!goog.isFunction(a)) throw Error("Invalid component class " + a);
        if (!goog.isFunction(b)) throw Error("Invalid renderer class " + b);
        var c = goog.getUid(a);
        goog.ui.registry.defaultRenderers_[c] = b
    };
    goog.ui.registry.getDecoratorByClassName = function(a) {
        return a in goog.ui.registry.decoratorFunctions_ ? goog.ui.registry.decoratorFunctions_[a]() : null
    };
    goog.ui.registry.setDecoratorByClassName = function(a, b) {
        if (!a) throw Error("Invalid class name " + a);
        if (!goog.isFunction(b)) throw Error("Invalid decorator function " + b);
        goog.ui.registry.decoratorFunctions_[a] = b
    };
    goog.ui.registry.getDecorator = function(a) {
        for (var b = goog.dom.classes.get(a), c = 0, d = b.length; c < d; c++)
            if (a = goog.ui.registry.getDecoratorByClassName(b[c])) return a;
        return null
    };
    goog.ui.registry.reset = function() {
        goog.ui.registry.defaultRenderers_ = {};
        goog.ui.registry.decoratorFunctions_ = {}
    };
    goog.ui.registry.defaultRenderers_ = {};
    goog.ui.registry.decoratorFunctions_ = {};
    goog.ui.decorate = function(a) {
        var b = goog.ui.registry.getDecorator(a);
        b && b.decorate(a);
        return b
    };
    goog.events.KeyCodes = {
        WIN_KEY_FF_LINUX: 0,
        MAC_ENTER: 3,
        BACKSPACE: 8,
        TAB: 9,
        NUM_CENTER: 12,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        CAPS_LOCK: 20,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        PRINT_SCREEN: 44,
        INSERT: 45,
        DELETE: 46,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        FF_SEMICOLON: 59,
        FF_EQUALS: 61,
        QUESTION_MARK: 63,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        META: 91,
        WIN_KEY_RIGHT: 92,
        CONTEXT_MENU: 93,
        NUM_ZERO: 96,
        NUM_ONE: 97,
        NUM_TWO: 98,
        NUM_THREE: 99,
        NUM_FOUR: 100,
        NUM_FIVE: 101,
        NUM_SIX: 102,
        NUM_SEVEN: 103,
        NUM_EIGHT: 104,
        NUM_NINE: 105,
        NUM_MULTIPLY: 106,
        NUM_PLUS: 107,
        NUM_MINUS: 109,
        NUM_PERIOD: 110,
        NUM_DIVISION: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        NUMLOCK: 144,
        SCROLL_LOCK: 145,
        FIRST_MEDIA_KEY: 166,
        LAST_MEDIA_KEY: 183,
        SEMICOLON: 186,
        DASH: 189,
        EQUALS: 187,
        COMMA: 188,
        PERIOD: 190,
        SLASH: 191,
        APOSTROPHE: 192,
        TILDE: 192,
        SINGLE_QUOTE: 222,
        OPEN_SQUARE_BRACKET: 219,
        BACKSLASH: 220,
        CLOSE_SQUARE_BRACKET: 221,
        WIN_KEY: 224,
        MAC_FF_META: 224,
        WIN_IME: 229,
        PHANTOM: 255
    };
    goog.events.KeyCodes.isTextModifyingKeyEvent = function(a) {
        if (a.altKey && !a.ctrlKey || a.metaKey || a.keyCode >= goog.events.KeyCodes.F1 && a.keyCode <= goog.events.KeyCodes.F12) return !1;
        switch (a.keyCode) {
            case goog.events.KeyCodes.ALT:
            case goog.events.KeyCodes.CAPS_LOCK:
            case goog.events.KeyCodes.CONTEXT_MENU:
            case goog.events.KeyCodes.CTRL:
            case goog.events.KeyCodes.DOWN:
            case goog.events.KeyCodes.END:
            case goog.events.KeyCodes.ESC:
            case goog.events.KeyCodes.HOME:
            case goog.events.KeyCodes.INSERT:
            case goog.events.KeyCodes.LEFT:
            case goog.events.KeyCodes.MAC_FF_META:
            case goog.events.KeyCodes.META:
            case goog.events.KeyCodes.NUMLOCK:
            case goog.events.KeyCodes.NUM_CENTER:
            case goog.events.KeyCodes.PAGE_DOWN:
            case goog.events.KeyCodes.PAGE_UP:
            case goog.events.KeyCodes.PAUSE:
            case goog.events.KeyCodes.PHANTOM:
            case goog.events.KeyCodes.PRINT_SCREEN:
            case goog.events.KeyCodes.RIGHT:
            case goog.events.KeyCodes.SCROLL_LOCK:
            case goog.events.KeyCodes.SHIFT:
            case goog.events.KeyCodes.UP:
            case goog.events.KeyCodes.WIN_KEY:
            case goog.events.KeyCodes.WIN_KEY_RIGHT:
                return !1;
            case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
                return !goog.userAgent.GECKO;
            default:
                return a.keyCode < goog.events.KeyCodes.FIRST_MEDIA_KEY || a.keyCode > goog.events.KeyCodes.LAST_MEDIA_KEY
        }
    };
    goog.events.KeyCodes.firesKeyPressEvent = function(a, b, c, d, e) {
        if (!goog.userAgent.IE && (!goog.userAgent.WEBKIT || !goog.userAgent.isVersion("525"))) return !0;
        if (goog.userAgent.MAC && e) return goog.events.KeyCodes.isCharacterKey(a);
        if (e && !d || !c && (b == goog.events.KeyCodes.CTRL || b == goog.events.KeyCodes.ALT || goog.userAgent.MAC && b == goog.events.KeyCodes.META)) return !1;
        if (goog.userAgent.WEBKIT && d && c) switch (a) {
            case goog.events.KeyCodes.BACKSLASH:
            case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
            case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
            case goog.events.KeyCodes.TILDE:
            case goog.events.KeyCodes.SEMICOLON:
            case goog.events.KeyCodes.DASH:
            case goog.events.KeyCodes.EQUALS:
            case goog.events.KeyCodes.COMMA:
            case goog.events.KeyCodes.PERIOD:
            case goog.events.KeyCodes.SLASH:
            case goog.events.KeyCodes.APOSTROPHE:
            case goog.events.KeyCodes.SINGLE_QUOTE:
                return !1
        }
        if (goog.userAgent.IE && d &&
            b == a) return !1;
        switch (a) {
            case goog.events.KeyCodes.ENTER:
                return !(goog.userAgent.IE && goog.userAgent.isDocumentMode(9));
            case goog.events.KeyCodes.ESC:
                return !goog.userAgent.WEBKIT
        }
        return goog.events.KeyCodes.isCharacterKey(a)
    };
    goog.events.KeyCodes.isCharacterKey = function(a) {
        if (a >= goog.events.KeyCodes.ZERO && a <= goog.events.KeyCodes.NINE || a >= goog.events.KeyCodes.NUM_ZERO && a <= goog.events.KeyCodes.NUM_MULTIPLY || a >= goog.events.KeyCodes.A && a <= goog.events.KeyCodes.Z || goog.userAgent.WEBKIT && 0 == a) return !0;
        switch (a) {
            case goog.events.KeyCodes.SPACE:
            case goog.events.KeyCodes.QUESTION_MARK:
            case goog.events.KeyCodes.NUM_PLUS:
            case goog.events.KeyCodes.NUM_MINUS:
            case goog.events.KeyCodes.NUM_PERIOD:
            case goog.events.KeyCodes.NUM_DIVISION:
            case goog.events.KeyCodes.SEMICOLON:
            case goog.events.KeyCodes.FF_SEMICOLON:
            case goog.events.KeyCodes.DASH:
            case goog.events.KeyCodes.EQUALS:
            case goog.events.KeyCodes.FF_EQUALS:
            case goog.events.KeyCodes.COMMA:
            case goog.events.KeyCodes.PERIOD:
            case goog.events.KeyCodes.SLASH:
            case goog.events.KeyCodes.APOSTROPHE:
            case goog.events.KeyCodes.SINGLE_QUOTE:
            case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
            case goog.events.KeyCodes.BACKSLASH:
            case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
                return !0;
            default:
                return !1
        }
    };
    goog.events.KeyCodes.normalizeGeckoKeyCode = function(a) {
        switch (a) {
            case goog.events.KeyCodes.FF_EQUALS:
                return goog.events.KeyCodes.EQUALS;
            case goog.events.KeyCodes.FF_SEMICOLON:
                return goog.events.KeyCodes.SEMICOLON;
            case goog.events.KeyCodes.MAC_FF_META:
                return goog.events.KeyCodes.META;
            case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
                return goog.events.KeyCodes.WIN_KEY;
            default:
                return a
        }
    };
    goog.events.KeyHandler = function(a, b) {
        goog.events.EventTarget.call(this);
        a && this.attach(a, b)
    };
    goog.inherits(goog.events.KeyHandler, goog.events.EventTarget);
    goog.events.KeyHandler.prototype.element_ = null;
    goog.events.KeyHandler.prototype.keyPressKey_ = null;
    goog.events.KeyHandler.prototype.keyDownKey_ = null;
    goog.events.KeyHandler.prototype.keyUpKey_ = null;
    goog.events.KeyHandler.prototype.lastKey_ = -1;
    goog.events.KeyHandler.prototype.keyCode_ = -1;
    goog.events.KeyHandler.prototype.altKey_ = !1;
    goog.events.KeyHandler.EventType = {
        KEY: "key"
    };
    goog.events.KeyHandler.safariKey_ = {
        3: goog.events.KeyCodes.ENTER,
        12: goog.events.KeyCodes.NUMLOCK,
        63232: goog.events.KeyCodes.UP,
        63233: goog.events.KeyCodes.DOWN,
        63234: goog.events.KeyCodes.LEFT,
        63235: goog.events.KeyCodes.RIGHT,
        63236: goog.events.KeyCodes.F1,
        63237: goog.events.KeyCodes.F2,
        63238: goog.events.KeyCodes.F3,
        63239: goog.events.KeyCodes.F4,
        63240: goog.events.KeyCodes.F5,
        63241: goog.events.KeyCodes.F6,
        63242: goog.events.KeyCodes.F7,
        63243: goog.events.KeyCodes.F8,
        63244: goog.events.KeyCodes.F9,
        63245: goog.events.KeyCodes.F10,
        63246: goog.events.KeyCodes.F11,
        63247: goog.events.KeyCodes.F12,
        63248: goog.events.KeyCodes.PRINT_SCREEN,
        63272: goog.events.KeyCodes.DELETE,
        63273: goog.events.KeyCodes.HOME,
        63275: goog.events.KeyCodes.END,
        63276: goog.events.KeyCodes.PAGE_UP,
        63277: goog.events.KeyCodes.PAGE_DOWN,
        63289: goog.events.KeyCodes.NUMLOCK,
        63302: goog.events.KeyCodes.INSERT
    };
    goog.events.KeyHandler.keyIdentifier_ = {
        Up: goog.events.KeyCodes.UP,
        Down: goog.events.KeyCodes.DOWN,
        Left: goog.events.KeyCodes.LEFT,
        Right: goog.events.KeyCodes.RIGHT,
        Enter: goog.events.KeyCodes.ENTER,
        F1: goog.events.KeyCodes.F1,
        F2: goog.events.KeyCodes.F2,
        F3: goog.events.KeyCodes.F3,
        F4: goog.events.KeyCodes.F4,
        F5: goog.events.KeyCodes.F5,
        F6: goog.events.KeyCodes.F6,
        F7: goog.events.KeyCodes.F7,
        F8: goog.events.KeyCodes.F8,
        F9: goog.events.KeyCodes.F9,
        F10: goog.events.KeyCodes.F10,
        F11: goog.events.KeyCodes.F11,
        F12: goog.events.KeyCodes.F12,
        "U+007F": goog.events.KeyCodes.DELETE,
        Home: goog.events.KeyCodes.HOME,
        End: goog.events.KeyCodes.END,
        PageUp: goog.events.KeyCodes.PAGE_UP,
        PageDown: goog.events.KeyCodes.PAGE_DOWN,
        Insert: goog.events.KeyCodes.INSERT
    };
    goog.events.KeyHandler.USES_KEYDOWN_ = goog.userAgent.IE || goog.userAgent.WEBKIT && goog.userAgent.isVersion("525");
    goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ = goog.userAgent.MAC && goog.userAgent.GECKO;
    goog.events.KeyHandler.prototype.handleKeyDown_ = function(a) {
        if (goog.userAgent.WEBKIT && (this.lastKey_ == goog.events.KeyCodes.CTRL && !a.ctrlKey || this.lastKey_ == goog.events.KeyCodes.ALT && !a.altKey || goog.userAgent.MAC && this.lastKey_ == goog.events.KeyCodes.META && !a.metaKey)) this.keyCode_ = this.lastKey_ = -1; - 1 == this.lastKey_ && (a.ctrlKey && a.keyCode != goog.events.KeyCodes.CTRL ? this.lastKey_ = goog.events.KeyCodes.CTRL : a.altKey && a.keyCode != goog.events.KeyCodes.ALT ? this.lastKey_ = goog.events.KeyCodes.ALT : a.metaKey &&
            a.keyCode != goog.events.KeyCodes.META && (this.lastKey_ = goog.events.KeyCodes.META));
        goog.events.KeyHandler.USES_KEYDOWN_ && !goog.events.KeyCodes.firesKeyPressEvent(a.keyCode, this.lastKey_, a.shiftKey, a.ctrlKey, a.altKey) ? this.handleEvent(a) : (this.keyCode_ = goog.userAgent.GECKO ? goog.events.KeyCodes.normalizeGeckoKeyCode(a.keyCode) : a.keyCode, goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (this.altKey_ = a.altKey))
    };
    goog.events.KeyHandler.prototype.resetState = function() {
        this.keyCode_ = this.lastKey_ = -1
    };
    goog.events.KeyHandler.prototype.handleKeyup_ = function(a) {
        this.resetState();
        this.altKey_ = a.altKey
    };
    goog.events.KeyHandler.prototype.handleEvent = function(a) {
        var b = a.getBrowserEvent(),
            c, d, e = b.altKey;
        goog.userAgent.IE && a.type == goog.events.EventType.KEYPRESS ? (c = this.keyCode_, d = c != goog.events.KeyCodes.ENTER && c != goog.events.KeyCodes.ESC ? b.keyCode : 0) : goog.userAgent.WEBKIT && a.type == goog.events.EventType.KEYPRESS ? (c = this.keyCode_, d = 0 <= b.charCode && 63232 > b.charCode && goog.events.KeyCodes.isCharacterKey(c) ? b.charCode : 0) : goog.userAgent.OPERA ? (c = this.keyCode_, d = goog.events.KeyCodes.isCharacterKey(c) ? b.keyCode :
            0) : (c = b.keyCode || this.keyCode_, d = b.charCode || 0, goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (e = this.altKey_), goog.userAgent.MAC && (d == goog.events.KeyCodes.QUESTION_MARK && c == goog.events.KeyCodes.WIN_KEY) && (c = goog.events.KeyCodes.SLASH));
        var f = c,
            g = b.keyIdentifier;
        c ? 63232 <= c && c in goog.events.KeyHandler.safariKey_ ? f = goog.events.KeyHandler.safariKey_[c] : 25 == c && a.shiftKey && (f = 9) : g && g in goog.events.KeyHandler.keyIdentifier_ && (f = goog.events.KeyHandler.keyIdentifier_[g]);
        a = f == this.lastKey_;
        this.lastKey_ =
            f;
        b = new goog.events.KeyEvent(f, d, a, b);
        b.altKey = e;
        this.dispatchEvent(b)
    };
    goog.events.KeyHandler.prototype.getElement = function() {
        return this.element_
    };
    goog.events.KeyHandler.prototype.attach = function(a, b) {
        this.keyUpKey_ && this.detach();
        this.element_ = a;
        this.keyPressKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYPRESS, this, b);
        this.keyDownKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYDOWN, this.handleKeyDown_, b, this);
        this.keyUpKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYUP, this.handleKeyup_, b, this)
    };
    goog.events.KeyHandler.prototype.detach = function() {
        this.keyPressKey_ && (goog.events.unlistenByKey(this.keyPressKey_), goog.events.unlistenByKey(this.keyDownKey_), goog.events.unlistenByKey(this.keyUpKey_), this.keyUpKey_ = this.keyDownKey_ = this.keyPressKey_ = null);
        this.element_ = null;
        this.keyCode_ = this.lastKey_ = -1
    };
    goog.events.KeyHandler.prototype.disposeInternal = function() {
        goog.events.KeyHandler.superClass_.disposeInternal.call(this);
        this.detach()
    };
    goog.events.KeyEvent = function(a, b, c, d) {
        goog.events.BrowserEvent.call(this, d);
        this.type = goog.events.KeyHandler.EventType.KEY;
        this.keyCode = a;
        this.charCode = b;
        this.repeat = c
    };
    goog.inherits(goog.events.KeyEvent, goog.events.BrowserEvent);
    goog.ui.Control = function(a, b, c) {
        goog.ui.Component.call(this, c);
        this.renderer_ = b || goog.ui.registry.getDefaultRenderer(this.constructor);
        this.setContentInternal(a)
    };
    goog.inherits(goog.ui.Control, goog.ui.Component);
    goog.ui.Control.registerDecorator = goog.ui.registry.setDecoratorByClassName;
    goog.ui.Control.getDecorator = goog.ui.registry.getDecorator;
    goog.ui.Control.decorate = goog.ui.decorate;
    goog.ui.Control.prototype.content_ = null;
    goog.ui.Control.prototype.state_ = 0;
    goog.ui.Control.prototype.supportedStates_ = goog.ui.Component.State.DISABLED | goog.ui.Component.State.HOVER | goog.ui.Component.State.ACTIVE | goog.ui.Component.State.FOCUSED;
    goog.ui.Control.prototype.autoStates_ = goog.ui.Component.State.ALL;
    goog.ui.Control.prototype.statesWithTransitionEvents_ = 0;
    goog.ui.Control.prototype.visible_ = !0;
    goog.ui.Control.prototype.extraClassNames_ = null;
    goog.ui.Control.prototype.handleMouseEvents_ = !0;
    goog.ui.Control.prototype.allowTextSelection_ = !1;
    goog.ui.Control.prototype.preferredAriaRole_ = null;
    goog.ui.Control.prototype.isHandleMouseEvents = function() {
        return this.handleMouseEvents_
    };
    goog.ui.Control.prototype.setHandleMouseEvents = function(a) {
        this.isInDocument() && a != this.handleMouseEvents_ && this.enableMouseEventHandling_(a);
        this.handleMouseEvents_ = a
    };
    goog.ui.Control.prototype.getKeyEventTarget = function() {
        return this.renderer_.getKeyEventTarget(this)
    };
    goog.ui.Control.prototype.getKeyHandler = function() {
        return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler)
    };
    goog.ui.Control.prototype.getRenderer = function() {
        return this.renderer_
    };
    goog.ui.Control.prototype.setRenderer = function(a) {
        if (this.isInDocument()) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
        this.getElement() && this.setElementInternal(null);
        this.renderer_ = a
    };
    goog.ui.Control.prototype.getExtraClassNames = function() {
        return this.extraClassNames_
    };
    goog.ui.Control.prototype.addClassName = function(a) {
        a && (this.extraClassNames_ ? goog.array.contains(this.extraClassNames_, a) || this.extraClassNames_.push(a) : this.extraClassNames_ = [a], this.renderer_.enableExtraClassName(this, a, !0))
    };
    goog.ui.Control.prototype.removeClassName = function(a) {
        a && this.extraClassNames_ && (goog.array.remove(this.extraClassNames_, a), 0 == this.extraClassNames_.length && (this.extraClassNames_ = null), this.renderer_.enableExtraClassName(this, a, !1))
    };
    goog.ui.Control.prototype.enableClassName = function(a, b) {
        b ? this.addClassName(a) : this.removeClassName(a)
    };
    goog.ui.Control.prototype.createDom = function() {
        var a = this.renderer_.createDom(this);
        this.setElementInternal(a);
        this.renderer_.setAriaRole(a, this.getPreferredAriaRole());
        this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(a, !1);
        this.isVisible() || this.renderer_.setVisible(a, !1)
    };
    goog.ui.Control.prototype.getPreferredAriaRole = function() {
        return this.preferredAriaRole_
    };
    goog.ui.Control.prototype.setPreferredAriaRole = function(a) {
        this.preferredAriaRole_ = a
    };
    goog.ui.Control.prototype.getContentElement = function() {
        return this.renderer_.getContentElement(this.getElement())
    };
    goog.ui.Control.prototype.canDecorate = function(a) {
        return this.renderer_.canDecorate(a)
    };
    goog.ui.Control.prototype.decorateInternal = function(a) {
        a = this.renderer_.decorate(this, a);
        this.setElementInternal(a);
        this.renderer_.setAriaRole(a, this.getPreferredAriaRole());
        this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(a, !1);
        this.visible_ = "none" != a.style.display
    };
    goog.ui.Control.prototype.enterDocument = function() {
        goog.ui.Control.superClass_.enterDocument.call(this);
        this.renderer_.initializeDom(this);
        if (this.supportedStates_ & ~goog.ui.Component.State.DISABLED && (this.isHandleMouseEvents() && this.enableMouseEventHandling_(!0), this.isSupportedState(goog.ui.Component.State.FOCUSED))) {
            var a = this.getKeyEventTarget();
            if (a) {
                var b = this.getKeyHandler();
                b.attach(a);
                this.getHandler().listen(b, goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent).listen(a, goog.events.EventType.FOCUS,
                    this.handleFocus).listen(a, goog.events.EventType.BLUR, this.handleBlur)
            }
        }
    };
    goog.ui.Control.prototype.enableMouseEventHandling_ = function(a) {
        var b = this.getHandler(),
            c = this.getElement();
        a ? (b.listen(c, goog.events.EventType.MOUSEOVER, this.handleMouseOver).listen(c, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).listen(c, goog.events.EventType.MOUSEUP, this.handleMouseUp).listen(c, goog.events.EventType.MOUSEOUT, this.handleMouseOut), this.handleContextMenu != goog.nullFunction && b.listen(c, goog.events.EventType.CONTEXTMENU, this.handleContextMenu), goog.userAgent.IE && b.listen(c,
            goog.events.EventType.DBLCLICK, this.handleDblClick)) : (b.unlisten(c, goog.events.EventType.MOUSEOVER, this.handleMouseOver).unlisten(c, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).unlisten(c, goog.events.EventType.MOUSEUP, this.handleMouseUp).unlisten(c, goog.events.EventType.MOUSEOUT, this.handleMouseOut), this.handleContextMenu != goog.nullFunction && b.unlisten(c, goog.events.EventType.CONTEXTMENU, this.handleContextMenu), goog.userAgent.IE && b.unlisten(c, goog.events.EventType.DBLCLICK, this.handleDblClick))
    };
    goog.ui.Control.prototype.exitDocument = function() {
        goog.ui.Control.superClass_.exitDocument.call(this);
        this.keyHandler_ && this.keyHandler_.detach();
        this.isVisible() && this.isEnabled() && this.renderer_.setFocusable(this, !1)
    };
    goog.ui.Control.prototype.disposeInternal = function() {
        goog.ui.Control.superClass_.disposeInternal.call(this);
        this.keyHandler_ && (this.keyHandler_.dispose(), delete this.keyHandler_);
        delete this.renderer_;
        this.extraClassNames_ = this.content_ = null
    };
    goog.ui.Control.prototype.getContent = function() {
        return this.content_
    };
    goog.ui.Control.prototype.setContent = function(a) {
        this.renderer_.setContent(this.getElement(), a);
        this.setContentInternal(a)
    };
    goog.ui.Control.prototype.setContentInternal = function(a) {
        this.content_ = a
    };
    goog.ui.Control.prototype.getCaption = function() {
        var a = this.getContent();
        if (!a) return "";
        a = goog.isString(a) ? a : goog.isArray(a) ? goog.array.map(a, goog.dom.getRawTextContent).join("") : goog.dom.getTextContent(a);
        return goog.string.collapseBreakingSpaces(a)
    };
    goog.ui.Control.prototype.setCaption = function(a) {
        this.setContent(a)
    };
    goog.ui.Control.prototype.setRightToLeft = function(a) {
        goog.ui.Control.superClass_.setRightToLeft.call(this, a);
        var b = this.getElement();
        b && this.renderer_.setRightToLeft(b, a)
    };
    goog.ui.Control.prototype.isAllowTextSelection = function() {
        return this.allowTextSelection_
    };
    goog.ui.Control.prototype.setAllowTextSelection = function(a) {
        this.allowTextSelection_ = a;
        var b = this.getElement();
        b && this.renderer_.setAllowTextSelection(b, a)
    };
    goog.ui.Control.prototype.isVisible = function() {
        return this.visible_
    };
    goog.ui.Control.prototype.setVisible = function(a, b) {
        if (b || this.visible_ != a && this.dispatchEvent(a ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
            var c = this.getElement();
            c && this.renderer_.setVisible(c, a);
            this.isEnabled() && this.renderer_.setFocusable(this, a);
            this.visible_ = a;
            return !0
        }
        return !1
    };
    goog.ui.Control.prototype.isEnabled = function() {
        return !this.hasState(goog.ui.Component.State.DISABLED)
    };
    goog.ui.Control.prototype.isParentDisabled_ = function() {
        var a = this.getParent();
        return !!a && "function" == typeof a.isEnabled && !a.isEnabled()
    };
    goog.ui.Control.prototype.setEnabled = function(a) {
        !this.isParentDisabled_() && this.isTransitionAllowed(goog.ui.Component.State.DISABLED, !a) && (a || (this.setActive(!1), this.setHighlighted(!1)), this.isVisible() && this.renderer_.setFocusable(this, a), this.setState(goog.ui.Component.State.DISABLED, !a))
    };
    goog.ui.Control.prototype.isHighlighted = function() {
        return this.hasState(goog.ui.Component.State.HOVER)
    };
    goog.ui.Control.prototype.setHighlighted = function(a) {
        this.isTransitionAllowed(goog.ui.Component.State.HOVER, a) && this.setState(goog.ui.Component.State.HOVER, a)
    };
    goog.ui.Control.prototype.isActive = function() {
        return this.hasState(goog.ui.Component.State.ACTIVE)
    };
    goog.ui.Control.prototype.setActive = function(a) {
        this.isTransitionAllowed(goog.ui.Component.State.ACTIVE, a) && this.setState(goog.ui.Component.State.ACTIVE, a)
    };
    goog.ui.Control.prototype.isSelected = function() {
        return this.hasState(goog.ui.Component.State.SELECTED)
    };
    goog.ui.Control.prototype.setSelected = function(a) {
        this.isTransitionAllowed(goog.ui.Component.State.SELECTED, a) && this.setState(goog.ui.Component.State.SELECTED, a)
    };
    goog.ui.Control.prototype.isChecked = function() {
        return this.hasState(goog.ui.Component.State.CHECKED)
    };
    goog.ui.Control.prototype.setChecked = function(a) {
        this.isTransitionAllowed(goog.ui.Component.State.CHECKED, a) && this.setState(goog.ui.Component.State.CHECKED, a)
    };
    goog.ui.Control.prototype.isFocused = function() {
        return this.hasState(goog.ui.Component.State.FOCUSED)
    };
    goog.ui.Control.prototype.setFocused = function(a) {
        this.isTransitionAllowed(goog.ui.Component.State.FOCUSED, a) && this.setState(goog.ui.Component.State.FOCUSED, a)
    };
    goog.ui.Control.prototype.isOpen = function() {
        return this.hasState(goog.ui.Component.State.OPENED)
    };
    goog.ui.Control.prototype.setOpen = function(a) {
        this.isTransitionAllowed(goog.ui.Component.State.OPENED, a) && this.setState(goog.ui.Component.State.OPENED, a)
    };
    goog.ui.Control.prototype.getState = function() {
        return this.state_
    };
    goog.ui.Control.prototype.hasState = function(a) {
        return !!(this.state_ & a)
    };
    goog.ui.Control.prototype.setState = function(a, b) {
        this.isSupportedState(a) && b != this.hasState(a) && (this.renderer_.setState(this, a, b), this.state_ = b ? this.state_ | a : this.state_ & ~a)
    };
    goog.ui.Control.prototype.setStateInternal = function(a) {
        this.state_ = a
    };
    goog.ui.Control.prototype.isSupportedState = function(a) {
        return !!(this.supportedStates_ & a)
    };
    goog.ui.Control.prototype.setSupportedState = function(a, b) {
        if (this.isInDocument() && this.hasState(a) && !b) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
        !b && this.hasState(a) && this.setState(a, !1);
        this.supportedStates_ = b ? this.supportedStates_ | a : this.supportedStates_ & ~a
    };
    goog.ui.Control.prototype.isAutoState = function(a) {
        return !!(this.autoStates_ & a) && this.isSupportedState(a)
    };
    goog.ui.Control.prototype.setAutoStates = function(a, b) {
        this.autoStates_ = b ? this.autoStates_ | a : this.autoStates_ & ~a
    };
    goog.ui.Control.prototype.isDispatchTransitionEvents = function(a) {
        return !!(this.statesWithTransitionEvents_ & a) && this.isSupportedState(a)
    };
    goog.ui.Control.prototype.setDispatchTransitionEvents = function(a, b) {
        this.statesWithTransitionEvents_ = b ? this.statesWithTransitionEvents_ | a : this.statesWithTransitionEvents_ & ~a
    };
    goog.ui.Control.prototype.isTransitionAllowed = function(a, b) {
        return this.isSupportedState(a) && this.hasState(a) != b && (!(this.statesWithTransitionEvents_ & a) || this.dispatchEvent(goog.ui.Component.getStateTransitionEvent(a, b))) && !this.isDisposed()
    };
    goog.ui.Control.prototype.handleMouseOver = function(a) {
        !goog.ui.Control.isMouseEventWithinElement_(a, this.getElement()) && (this.dispatchEvent(goog.ui.Component.EventType.ENTER) && this.isEnabled() && this.isAutoState(goog.ui.Component.State.HOVER)) && this.setHighlighted(!0)
    };
    goog.ui.Control.prototype.handleMouseOut = function(a) {
        !goog.ui.Control.isMouseEventWithinElement_(a, this.getElement()) && this.dispatchEvent(goog.ui.Component.EventType.LEAVE) && (this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1), this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!1))
    };
    goog.ui.Control.prototype.handleContextMenu = goog.nullFunction;
    goog.ui.Control.isMouseEventWithinElement_ = function(a, b) {
        return !!a.relatedTarget && goog.dom.contains(b, a.relatedTarget)
    };
    goog.ui.Control.prototype.handleMouseDown = function(a) {
        this.isEnabled() && (this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0), a.isMouseActionButton() && (this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!0), this.renderer_.isFocusable(this) && this.getKeyEventTarget().focus()));
        !this.isAllowTextSelection() && a.isMouseActionButton() && a.preventDefault()
    };
    goog.ui.Control.prototype.handleMouseUp = function(a) {
        this.isEnabled() && (this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0), this.isActive() && (this.performActionInternal(a) && this.isAutoState(goog.ui.Component.State.ACTIVE)) && this.setActive(!1))
    };
    goog.ui.Control.prototype.handleDblClick = function(a) {
        this.isEnabled() && this.performActionInternal(a)
    };
    goog.ui.Control.prototype.performActionInternal = function(a) {
        this.isAutoState(goog.ui.Component.State.CHECKED) && this.setChecked(!this.isChecked());
        this.isAutoState(goog.ui.Component.State.SELECTED) && this.setSelected(!0);
        this.isAutoState(goog.ui.Component.State.OPENED) && this.setOpen(!this.isOpen());
        var b = new goog.events.Event(goog.ui.Component.EventType.ACTION, this);
        a && (b.altKey = a.altKey, b.ctrlKey = a.ctrlKey, b.metaKey = a.metaKey, b.shiftKey = a.shiftKey, b.platformModifierKey = a.platformModifierKey);
        return this.dispatchEvent(b)
    };
    goog.ui.Control.prototype.handleFocus = function() {
        this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(!0)
    };
    goog.ui.Control.prototype.handleBlur = function() {
        this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1);
        this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(!1)
    };
    goog.ui.Control.prototype.handleKeyEvent = function(a) {
        return this.isVisible() && this.isEnabled() && this.handleKeyEventInternal(a) ? (a.preventDefault(), a.stopPropagation(), !0) : !1
    };
    goog.ui.Control.prototype.handleKeyEventInternal = function(a) {
        return a.keyCode == goog.events.KeyCodes.ENTER && this.performActionInternal(a)
    };
    goog.ui.registry.setDefaultRenderer(goog.ui.Control, goog.ui.ControlRenderer);
    goog.ui.registry.setDecoratorByClassName(goog.ui.ControlRenderer.CSS_CLASS, function() {
        return new goog.ui.Control(null)
    });
    goog.ui.MenuSeparatorRenderer = function() {
        goog.ui.ControlRenderer.call(this)
    };
    goog.inherits(goog.ui.MenuSeparatorRenderer, goog.ui.ControlRenderer);
    goog.addSingletonGetter(goog.ui.MenuSeparatorRenderer);
    goog.ui.MenuSeparatorRenderer.CSS_CLASS = "goog-menuseparator";
    goog.ui.MenuSeparatorRenderer.prototype.createDom = function(a) {
        return a.getDomHelper().createDom("div", this.getCssClass())
    };
    goog.ui.MenuSeparatorRenderer.prototype.decorate = function(a, b) {
        b.id && a.setId(b.id);
        if ("HR" == b.tagName) {
            var c = b;
            b = this.createDom(a);
            goog.dom.insertSiblingBefore(b, c);
            goog.dom.removeNode(c)
        } else goog.dom.classes.add(b, this.getCssClass());
        return b
    };
    goog.ui.MenuSeparatorRenderer.prototype.setContent = function() {};
    goog.ui.MenuSeparatorRenderer.prototype.getCssClass = function() {
        return goog.ui.MenuSeparatorRenderer.CSS_CLASS
    };
    goog.ui.Separator = function(a, b) {
        goog.ui.Control.call(this, null, a || goog.ui.MenuSeparatorRenderer.getInstance(), b);
        this.setSupportedState(goog.ui.Component.State.DISABLED, !1);
        this.setSupportedState(goog.ui.Component.State.HOVER, !1);
        this.setSupportedState(goog.ui.Component.State.ACTIVE, !1);
        this.setSupportedState(goog.ui.Component.State.FOCUSED, !1);
        this.setStateInternal(goog.ui.Component.State.DISABLED)
    };
    goog.inherits(goog.ui.Separator, goog.ui.Control);
    goog.ui.Separator.prototype.enterDocument = function() {
        goog.ui.Separator.superClass_.enterDocument.call(this);
        goog.dom.a11y.setRole(this.getElement(), "separator")
    };
    goog.ui.registry.setDecoratorByClassName(goog.ui.MenuSeparatorRenderer.CSS_CLASS, function() {
        return new goog.ui.Separator
    });
    goog.ui.ContainerRenderer = function() {};
    goog.addSingletonGetter(goog.ui.ContainerRenderer);
    goog.ui.ContainerRenderer.getCustomRenderer = function(a, b) {
        var c = new a;
        c.getCssClass = function() {
            return b
        };
        return c
    };
    goog.ui.ContainerRenderer.CSS_CLASS = "goog-container";
    goog.ui.ContainerRenderer.prototype.getAriaRole = function() {};
    goog.ui.ContainerRenderer.prototype.enableTabIndex = function(a, b) {
        a && (a.tabIndex = b ? 0 : -1)
    };
    goog.ui.ContainerRenderer.prototype.createDom = function(a) {
        return a.getDomHelper().createDom("div", this.getClassNames(a).join(" "))
    };
    goog.ui.ContainerRenderer.prototype.getContentElement = function(a) {
        return a
    };
    goog.ui.ContainerRenderer.prototype.canDecorate = function(a) {
        return "DIV" == a.tagName
    };
    goog.ui.ContainerRenderer.prototype.decorate = function(a, b) {
        b.id && a.setId(b.id);
        var c = this.getCssClass(),
            d = !1,
            e = goog.dom.classes.get(b);
        e && goog.array.forEach(e, function(b) {
            b == c ? d = !0 : b && this.setStateFromClassName(a, b, c)
        }, this);
        d || goog.dom.classes.add(b, c);
        this.decorateChildren(a, this.getContentElement(b));
        return b
    };
    goog.ui.ContainerRenderer.prototype.setStateFromClassName = function(a, b, c) {
        b == c + "-disabled" ? a.setEnabled(!1) : b == c + "-horizontal" ? a.setOrientation(goog.ui.Container.Orientation.HORIZONTAL) : b == c + "-vertical" && a.setOrientation(goog.ui.Container.Orientation.VERTICAL)
    };
    goog.ui.ContainerRenderer.prototype.decorateChildren = function(a, b, c) {
        if (b) {
            c = c || b.firstChild;
            for (var d; c && c.parentNode == b;) {
                d = c.nextSibling;
                if (c.nodeType == goog.dom.NodeType.ELEMENT) {
                    var e = this.getDecoratorForChild(c);
                    e && (e.setElementInternal(c), a.isEnabled() || e.setEnabled(!1), a.addChild(e), e.decorate(c))
                } else(!c.nodeValue || "" == goog.string.trim(c.nodeValue)) && b.removeChild(c);
                c = d
            }
        }
    };
    goog.ui.ContainerRenderer.prototype.getDecoratorForChild = function(a) {
        return goog.ui.registry.getDecorator(a)
    };
    goog.ui.ContainerRenderer.prototype.initializeDom = function(a) {
        a = a.getElement();
        goog.style.setUnselectable(a, !0, goog.userAgent.GECKO);
        goog.userAgent.IE && (a.hideFocus = !0);
        var b = this.getAriaRole();
        b && goog.dom.a11y.setRole(a, b)
    };
    goog.ui.ContainerRenderer.prototype.getKeyEventTarget = function(a) {
        return a.getElement()
    };
    goog.ui.ContainerRenderer.prototype.getCssClass = function() {
        return goog.ui.ContainerRenderer.CSS_CLASS
    };
    goog.ui.ContainerRenderer.prototype.getClassNames = function(a) {
        var b = this.getCssClass(),
            c = a.getOrientation() == goog.ui.Container.Orientation.HORIZONTAL,
            c = [b, c ? b + "-horizontal" : b + "-vertical"];
        a.isEnabled() || c.push(b + "-disabled");
        return c
    };
    goog.ui.ContainerRenderer.prototype.getDefaultOrientation = function() {
        return goog.ui.Container.Orientation.VERTICAL
    };
    goog.ui.Container = function(a, b, c) {
        goog.ui.Component.call(this, c);
        this.renderer_ = b || goog.ui.ContainerRenderer.getInstance();
        this.orientation_ = a || this.renderer_.getDefaultOrientation()
    };
    goog.inherits(goog.ui.Container, goog.ui.Component);
    goog.ui.Container.EventType = {
        AFTER_SHOW: "aftershow",
        AFTER_HIDE: "afterhide"
    };
    goog.ui.Container.Orientation = {
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical"
    };
    goog.ui.Container.prototype.keyEventTarget_ = null;
    goog.ui.Container.prototype.keyHandler_ = null;
    goog.ui.Container.prototype.renderer_ = null;
    goog.ui.Container.prototype.orientation_ = null;
    goog.ui.Container.prototype.visible_ = !0;
    goog.ui.Container.prototype.enabled_ = !0;
    goog.ui.Container.prototype.focusable_ = !0;
    goog.ui.Container.prototype.highlightedIndex_ = -1;
    goog.ui.Container.prototype.openItem_ = null;
    goog.ui.Container.prototype.mouseButtonPressed_ = !1;
    goog.ui.Container.prototype.allowFocusableChildren_ = !1;
    goog.ui.Container.prototype.openFollowsHighlight_ = !0;
    goog.ui.Container.prototype.childElementIdMap_ = null;
    goog.ui.Container.prototype.getKeyEventTarget = function() {
        return this.keyEventTarget_ || this.renderer_.getKeyEventTarget(this)
    };
    goog.ui.Container.prototype.setKeyEventTarget = function(a) {
        if (this.focusable_) {
            var b = this.getKeyEventTarget(),
                c = this.isInDocument();
            this.keyEventTarget_ = a;
            var d = this.getKeyEventTarget();
            c && (this.keyEventTarget_ = b, this.enableFocusHandling_(!1), this.keyEventTarget_ = a, this.getKeyHandler().attach(d), this.enableFocusHandling_(!0))
        } else throw Error("Can't set key event target for container that doesn't support keyboard focus!");
    };
    goog.ui.Container.prototype.getKeyHandler = function() {
        return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler(this.getKeyEventTarget()))
    };
    goog.ui.Container.prototype.getRenderer = function() {
        return this.renderer_
    };
    goog.ui.Container.prototype.setRenderer = function(a) {
        if (this.getElement()) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
        this.renderer_ = a
    };
    goog.ui.Container.prototype.createDom = function() {
        this.setElementInternal(this.renderer_.createDom(this))
    };
    goog.ui.Container.prototype.getContentElement = function() {
        return this.renderer_.getContentElement(this.getElement())
    };
    goog.ui.Container.prototype.canDecorate = function(a) {
        return this.renderer_.canDecorate(a)
    };
    goog.ui.Container.prototype.decorateInternal = function(a) {
        this.setElementInternal(this.renderer_.decorate(this, a));
        "none" == a.style.display && (this.visible_ = !1)
    };
    goog.ui.Container.prototype.enterDocument = function() {
        goog.ui.Container.superClass_.enterDocument.call(this);
        this.forEachChild(function(a) {
            a.isInDocument() && this.registerChildId_(a)
        }, this);
        var a = this.getElement();
        this.renderer_.initializeDom(this);
        this.setVisible(this.visible_, !0);
        this.getHandler().listen(this, goog.ui.Component.EventType.ENTER, this.handleEnterItem).listen(this, goog.ui.Component.EventType.HIGHLIGHT, this.handleHighlightItem).listen(this, goog.ui.Component.EventType.UNHIGHLIGHT, this.handleUnHighlightItem).listen(this,
            goog.ui.Component.EventType.OPEN, this.handleOpenItem).listen(this, goog.ui.Component.EventType.CLOSE, this.handleCloseItem).listen(a, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).listen(goog.dom.getOwnerDocument(a), goog.events.EventType.MOUSEUP, this.handleDocumentMouseUp).listen(a, [goog.events.EventType.MOUSEDOWN, goog.events.EventType.MOUSEUP, goog.events.EventType.MOUSEOVER, goog.events.EventType.MOUSEOUT, goog.events.EventType.CONTEXTMENU], this.handleChildMouseEvents);
        this.isFocusable() && this.enableFocusHandling_(!0)
    };
    goog.ui.Container.prototype.enableFocusHandling_ = function(a) {
        var b = this.getHandler(),
            c = this.getKeyEventTarget();
        a ? b.listen(c, goog.events.EventType.FOCUS, this.handleFocus).listen(c, goog.events.EventType.BLUR, this.handleBlur).listen(this.getKeyHandler(), goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent) : b.unlisten(c, goog.events.EventType.FOCUS, this.handleFocus).unlisten(c, goog.events.EventType.BLUR, this.handleBlur).unlisten(this.getKeyHandler(), goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent)
    };
    goog.ui.Container.prototype.exitDocument = function() {
        this.setHighlightedIndex(-1);
        this.openItem_ && this.openItem_.setOpen(!1);
        this.mouseButtonPressed_ = !1;
        goog.ui.Container.superClass_.exitDocument.call(this)
    };
    goog.ui.Container.prototype.disposeInternal = function() {
        goog.ui.Container.superClass_.disposeInternal.call(this);
        this.keyHandler_ && (this.keyHandler_.dispose(), this.keyHandler_ = null);
        this.renderer_ = this.openItem_ = this.childElementIdMap_ = this.keyEventTarget_ = null
    };
    goog.ui.Container.prototype.handleEnterItem = function() {
        return !0
    };
    goog.ui.Container.prototype.handleHighlightItem = function(a) {
        var b = this.indexOfChild(a.target);
        if (-1 < b && b != this.highlightedIndex_) {
            var c = this.getHighlighted();
            c && c.setHighlighted(!1);
            this.highlightedIndex_ = b;
            c = this.getHighlighted();
            this.isMouseButtonPressed() && c.setActive(!0);
            this.openFollowsHighlight_ && (this.openItem_ && c != this.openItem_) && (c.isSupportedState(goog.ui.Component.State.OPENED) ? c.setOpen(!0) : this.openItem_.setOpen(!1))
        }
        goog.dom.a11y.setState(this.getElement(), goog.dom.a11y.State.ACTIVEDESCENDANT,
            a.target.getElement().id)
    };
    goog.ui.Container.prototype.handleUnHighlightItem = function(a) {
        a.target == this.getHighlighted() && (this.highlightedIndex_ = -1);
        goog.dom.a11y.setState(this.getElement(), goog.dom.a11y.State.ACTIVEDESCENDANT, "")
    };
    goog.ui.Container.prototype.handleOpenItem = function(a) {
        if ((a = a.target) && a != this.openItem_ && a.getParent() == this) this.openItem_ && this.openItem_.setOpen(!1), this.openItem_ = a
    };
    goog.ui.Container.prototype.handleCloseItem = function(a) {
        a.target == this.openItem_ && (this.openItem_ = null)
    };
    goog.ui.Container.prototype.handleMouseDown = function(a) {
        this.enabled_ && this.setMouseButtonPressed(!0);
        var b = this.getKeyEventTarget();
        b && goog.dom.isFocusableTabIndex(b) ? b.focus() : a.preventDefault()
    };
    goog.ui.Container.prototype.handleDocumentMouseUp = function() {
        this.setMouseButtonPressed(!1)
    };
    goog.ui.Container.prototype.handleChildMouseEvents = function(a) {
        var b = this.getOwnerControl(a.target);
        if (b) switch (a.type) {
            case goog.events.EventType.MOUSEDOWN:
                b.handleMouseDown(a);
                break;
            case goog.events.EventType.MOUSEUP:
                b.handleMouseUp(a);
                break;
            case goog.events.EventType.MOUSEOVER:
                b.handleMouseOver(a);
                break;
            case goog.events.EventType.MOUSEOUT:
                b.handleMouseOut(a);
                break;
            case goog.events.EventType.CONTEXTMENU:
                b.handleContextMenu(a)
        }
    };
    goog.ui.Container.prototype.getOwnerControl = function(a) {
        if (this.childElementIdMap_)
            for (var b = this.getElement(); a && a !== b;) {
                var c = a.id;
                if (c in this.childElementIdMap_) return this.childElementIdMap_[c];
                a = a.parentNode
            }
        return null
    };
    goog.ui.Container.prototype.handleFocus = function() {};
    goog.ui.Container.prototype.handleBlur = function() {
        this.setHighlightedIndex(-1);
        this.setMouseButtonPressed(!1);
        this.openItem_ && this.openItem_.setOpen(!1)
    };
    goog.ui.Container.prototype.handleKeyEvent = function(a) {
        return this.isEnabled() && this.isVisible() && (0 != this.getChildCount() || this.keyEventTarget_) && this.handleKeyEventInternal(a) ? (a.preventDefault(), a.stopPropagation(), !0) : !1
    };
    goog.ui.Container.prototype.handleKeyEventInternal = function(a) {
        var b = this.getHighlighted();
        if (b && "function" == typeof b.handleKeyEvent && b.handleKeyEvent(a) || this.openItem_ && this.openItem_ != b && "function" == typeof this.openItem_.handleKeyEvent && this.openItem_.handleKeyEvent(a)) return !0;
        if (a.shiftKey || a.ctrlKey || a.metaKey || a.altKey) return !1;
        switch (a.keyCode) {
            case goog.events.KeyCodes.ESC:
                if (this.isFocusable()) this.getKeyEventTarget().blur();
                else return !1;
                break;
            case goog.events.KeyCodes.HOME:
                this.highlightFirst();
                break;
            case goog.events.KeyCodes.END:
                this.highlightLast();
                break;
            case goog.events.KeyCodes.UP:
                if (this.orientation_ == goog.ui.Container.Orientation.VERTICAL) this.highlightPrevious();
                else return !1;
                break;
            case goog.events.KeyCodes.LEFT:
                if (this.orientation_ == goog.ui.Container.Orientation.HORIZONTAL) this.isRightToLeft() ? this.highlightNext() : this.highlightPrevious();
                else return !1;
                break;
            case goog.events.KeyCodes.DOWN:
                if (this.orientation_ == goog.ui.Container.Orientation.VERTICAL) this.highlightNext();
                else return !1;
                break;
            case goog.events.KeyCodes.RIGHT:
                if (this.orientation_ == goog.ui.Container.Orientation.HORIZONTAL) this.isRightToLeft() ? this.highlightPrevious() : this.highlightNext();
                else return !1;
                break;
            default:
                return !1
        }
        return !0
    };
    goog.ui.Container.prototype.registerChildId_ = function(a) {
        var b = a.getElement(),
            b = b.id || (b.id = a.getId());
        this.childElementIdMap_ || (this.childElementIdMap_ = {});
        this.childElementIdMap_[b] = a
    };
    goog.ui.Container.prototype.addChild = function(a, b) {
        goog.asserts.assertInstanceof(a, goog.ui.Control, "The child of a container must be a control");
        goog.ui.Container.superClass_.addChild.call(this, a, b)
    };
    goog.ui.Container.prototype.addChildAt = function(a, b, c) {
        a.setDispatchTransitionEvents(goog.ui.Component.State.HOVER, !0);
        a.setDispatchTransitionEvents(goog.ui.Component.State.OPENED, !0);
        (this.isFocusable() || !this.isFocusableChildrenAllowed()) && a.setSupportedState(goog.ui.Component.State.FOCUSED, !1);
        a.setHandleMouseEvents(!1);
        goog.ui.Container.superClass_.addChildAt.call(this, a, b, c);
        a.isInDocument() && this.isInDocument() && this.registerChildId_(a);
        b <= this.highlightedIndex_ && this.highlightedIndex_++
    };
    goog.ui.Container.prototype.removeChild = function(a, b) {
        if (a = goog.isString(a) ? this.getChild(a) : a) {
            var c = this.indexOfChild(a); - 1 != c && (c == this.highlightedIndex_ ? a.setHighlighted(!1) : c < this.highlightedIndex_ && this.highlightedIndex_--);
            (c = a.getElement()) && (c.id && this.childElementIdMap_) && goog.object.remove(this.childElementIdMap_, c.id)
        }
        a = goog.ui.Container.superClass_.removeChild.call(this, a, b);
        a.setHandleMouseEvents(!0);
        return a
    };
    goog.ui.Container.prototype.getOrientation = function() {
        return this.orientation_
    };
    goog.ui.Container.prototype.setOrientation = function(a) {
        if (this.getElement()) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
        this.orientation_ = a
    };
    goog.ui.Container.prototype.isVisible = function() {
        return this.visible_
    };
    goog.ui.Container.prototype.setVisible = function(a, b) {
        if (b || this.visible_ != a && this.dispatchEvent(a ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
            this.visible_ = a;
            var c = this.getElement();
            c && (goog.style.showElement(c, a), this.isFocusable() && this.renderer_.enableTabIndex(this.getKeyEventTarget(), this.enabled_ && this.visible_), b || this.dispatchEvent(this.visible_ ? goog.ui.Container.EventType.AFTER_SHOW : goog.ui.Container.EventType.AFTER_HIDE));
            return !0
        }
        return !1
    };
    goog.ui.Container.prototype.isEnabled = function() {
        return this.enabled_
    };
    goog.ui.Container.prototype.setEnabled = function(a) {
        if (this.enabled_ != a && this.dispatchEvent(a ? goog.ui.Component.EventType.ENABLE : goog.ui.Component.EventType.DISABLE)) a ? (this.enabled_ = !0, this.forEachChild(function(a) {
            a.wasDisabled ? delete a.wasDisabled : a.setEnabled(!0)
        })) : (this.forEachChild(function(a) {
            a.isEnabled() ? a.setEnabled(!1) : a.wasDisabled = !0
        }), this.enabled_ = !1, this.setMouseButtonPressed(!1)), this.isFocusable() && this.renderer_.enableTabIndex(this.getKeyEventTarget(), a && this.visible_)
    };
    goog.ui.Container.prototype.isFocusable = function() {
        return this.focusable_
    };
    goog.ui.Container.prototype.setFocusable = function(a) {
        a != this.focusable_ && this.isInDocument() && this.enableFocusHandling_(a);
        this.focusable_ = a;
        this.enabled_ && this.visible_ && this.renderer_.enableTabIndex(this.getKeyEventTarget(), a)
    };
    goog.ui.Container.prototype.isFocusableChildrenAllowed = function() {
        return this.allowFocusableChildren_
    };
    goog.ui.Container.prototype.setFocusableChildrenAllowed = function(a) {
        this.allowFocusableChildren_ = a
    };
    goog.ui.Container.prototype.isOpenFollowsHighlight = function() {
        return this.openFollowsHighlight_
    };
    goog.ui.Container.prototype.setOpenFollowsHighlight = function(a) {
        this.openFollowsHighlight_ = a
    };
    goog.ui.Container.prototype.getHighlightedIndex = function() {
        return this.highlightedIndex_
    };
    goog.ui.Container.prototype.setHighlightedIndex = function(a) {
        (a = this.getChildAt(a)) ? a.setHighlighted(!0): -1 < this.highlightedIndex_ && this.getHighlighted().setHighlighted(!1)
    };
    goog.ui.Container.prototype.setHighlighted = function(a) {
        this.setHighlightedIndex(this.indexOfChild(a))
    };
    goog.ui.Container.prototype.getHighlighted = function() {
        return this.getChildAt(this.highlightedIndex_)
    };
    goog.ui.Container.prototype.highlightFirst = function() {
        this.highlightHelper(function(a, b) {
            return (a + 1) % b
        }, this.getChildCount() - 1)
    };
    goog.ui.Container.prototype.highlightLast = function() {
        this.highlightHelper(function(a, b) {
            a--;
            return 0 > a ? b - 1 : a
        }, 0)
    };
    goog.ui.Container.prototype.highlightNext = function() {
        this.highlightHelper(function(a, b) {
            return (a + 1) % b
        }, this.highlightedIndex_)
    };
    goog.ui.Container.prototype.highlightPrevious = function() {
        this.highlightHelper(function(a, b) {
            a--;
            return 0 > a ? b - 1 : a
        }, this.highlightedIndex_)
    };
    goog.ui.Container.prototype.highlightHelper = function(a, b) {
        for (var c = 0 > b ? this.indexOfChild(this.openItem_) : b, d = this.getChildCount(), c = a.call(this, c, d), e = 0; e <= d;) {
            var f = this.getChildAt(c);
            if (f && this.canHighlightItem(f)) return this.setHighlightedIndexFromKeyEvent(c), !0;
            e++;
            c = a.call(this, c, d)
        }
        return !1
    };
    goog.ui.Container.prototype.canHighlightItem = function(a) {
        return a.isVisible() && a.isEnabled() && a.isSupportedState(goog.ui.Component.State.HOVER)
    };
    goog.ui.Container.prototype.setHighlightedIndexFromKeyEvent = function(a) {
        this.setHighlightedIndex(a)
    };
    goog.ui.Container.prototype.getOpenItem = function() {
        return this.openItem_
    };
    goog.ui.Container.prototype.isMouseButtonPressed = function() {
        return this.mouseButtonPressed_
    };
    goog.ui.Container.prototype.setMouseButtonPressed = function(a) {
        this.mouseButtonPressed_ = a
    };
    pb.ui.Component = function() {
        goog.ui.Component.call(this);
        pb.ui.ComponentManager.getInstance().set(this)
    };
    goog.inherits(pb.ui.Component, goog.ui.Component);
    pb.ui.Component.prototype.bindModelEvents = function() {};
    pb.ui.Component.prototype.createDom = function() {
        this.setElementInternal(tart.dom.createElement(this.templates_base()))
    };
    pb.ui.Component.prototype.setModel = function(a) {
        pb.ui.Component.superClass_.setModel.call(this, a);
        this.model = this.getModel()
    };
    pb.ui.Component.prototype.addChildAt = function(a, b, c) {
        !1 != c && (c = !0);
        pb.ui.Component.superClass_.addChildAt.call(this, a, b, c)
    };
    pb.ui.Component.prototype.addChildren = function(a, b) {
        var c = this;
        a.forEach(function(a) {
            c.addChild(a, b)
        }, this)
    };
    pb.ui.Component.prototype.getChildren = function() {
        var a = this;
        return this.getChildIds().map(function(b) {
            return a.getChild(b)
        })
    };
    pb.ui.Component.prototype.disposeInternal = function() {
        pb.ui.Component.superClass_.disposeInternal.call(this);
        this.model && this.model.dispose && this.model.dispose();
        this.model = null
    };
    pb.ui.Component.prototype.$ = function(a) {
        return goog.dom.query(a, this.getElement())
    };
    pb.ui.Component.prototype.templates_base = function() {
        return '<div id="' + this.getId() + '"></div>'
    };
    tart.ui.ComponentModel = function() {};
    goog.inherits(tart.ui.ComponentModel, goog.events.EventTarget);
    pb.pot = {};
    pb.pot.PotModel = function(a, b, c, d, e, f) {
        tart.ui.ComponentModel.call(this);
        a instanceof Function ? this.callback = a : this.param = a;
        this.minValue = d || 0;
        this.maxValue = e || 1;
        this.defaultValue = f || 0.5;
        this.name = b;
        this.multiplier = c;
        this.value = this.minValue;
        this.setValue(this.defaultValue)
    };
    goog.inherits(pb.pot.PotModel, tart.ui.ComponentModel);
    pb.pot.PotModel.prototype.setValue = function(a) {
        var b = this.value;
        a = goog.math.clamp(a, 0, 1);
        this.processValue(a, b);
        a = {
            type: pb.pot.PotModel.EventType.VALUE_CHANGED,
            newValue: this.value,
            oldValue: b
        };
        this.param ? this.param.value = this.value : this.callback(this.value, b);
        this.dispatchEvent(a)
    };
    pb.pot.PotModel.prototype.processValue = function(a) {
        this.value = goog.math.lerp(this.minValue, this.maxValue, a) * this.multiplier
    };
    pb.pot.PotModel.prototype.getValue = function() {
        return this.value
    };
    pb.pot.PotModel.prototype.getNormalizedValue = function() {
        var a = this.value / this.multiplier;
        return a = (a - this.minValue) / (this.maxValue - this.minValue)
    };
    pb.pot.PotModel.EventType = {
        VALUE_CHANGED: "valueChanged"
    };
    pb.pot.Pot = function(a, b, c, d, e, f, g) {
        this.setModel(new this.modelClass(a, b, c || 1, e, f, g));
        this.size = d || pb.pot.Pot.Size.REGULAR;
        this.bindModelEvents();
        pb.ui.Component.call(this)
    };
    goog.inherits(pb.pot.Pot, pb.ui.Component);
    pb.pot.Pot.prototype.modelClass = pb.pot.PotModel;
    pb.pot.Pot.prototype.angle = 260;
    pb.pot.Pot.prototype.setValue = function(a) {
        this.model.setValue(a)
    };
    pb.pot.Pot.prototype.updateUi = function() {
        if (this.isInDocument()) {
            var a = "rotateZ(" + this.model.getNormalizedValue() * this.angle + "deg)";
            this.$(this.mappings.KNOB)[0].style["-webkit-transform"] = a;
            this.$(this.mappings.KNOB)[0].style.transform = a
        }
    };
    pb.pot.Pot.prototype.templates_base = function() {
        return '<div class="pot ' + this.size + '" id="' + this.getId() + '"><div class="knobHolder"><div class="knob"></div></div><div class="nameHolder"><div class="name">' + this.model.name + "</div></div></div>"
    };
    pb.pot.Pot.prototype.enterDocument = function() {
        pb.pot.Pot.superClass_.enterDocument.call(this);
        this.updateUi()
    };
    pb.pot.Pot.prototype.mappings = {
        KNOB: ".knob",
        KNOB_HOLDER: ".knobHolder"
    };
    pb.pot.Pot.Size = {
        SMALL: "small",
        REGULAR: "regular"
    };
    pb.pot.Pot.prototype.bindModelEvents = function() {
        goog.events.listen(this.model, pb.pot.PotModel.EventType.VALUE_CHANGED, this.updateUi, !1, this)
    };
    (function(a) {
        a.events = {};
        (a.events[goog.events.EventType.MOUSEDOWN] = {})[a.mappings.KNOB] = function(a) {
            this.flag = !0;
            this.oldY = a.clientY;
            var c = goog.events.listen(document.body, "mouseup", function() {
                    this.flag = !1;
                    goog.events.unlistenByKey(d);
                    goog.events.unlistenByKey(c)
                }, !1, this),
                d = goog.events.listen(document.body, "mousemove", function(a) {
                    this.flag && (this.setValue(this.model.getNormalizedValue() - (a.clientY - this.oldY) / 100), this.oldY = a.clientY)
                }, !1, this)
        }
    })(pb.pot.Pot.prototype);
    pb.pot.LinearModel = function(a, b, c, d, e, f) {
        pb.pot.PotModel.call(this, a, b, c, d, e, f)
    };
    goog.inherits(pb.pot.LinearModel, pb.pot.PotModel);
    pb.pot.Linear = function(a, b, c, d, e, f, g) {
        pb.pot.Pot.call(this, a, b, c, d, e, f, g)
    };
    goog.inherits(pb.pot.Linear, pb.pot.Pot);
    pb.pot.Linear.prototype.modelClass = pb.pot.LinearModel;
    goog.color = {};
    goog.color.names = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370d8",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#d87093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    };
    goog.color.parse = function(a) {
        var b = {};
        a = String(a);
        var c = goog.color.prependHashIfNecessaryHelper(a);
        if (goog.color.isValidHexColor_(c)) return b.hex = goog.color.normalizeHex(c), b.type = "hex", b;
        c = goog.color.isValidRgbColor_(a);
        if (c.length) return b.hex = goog.color.rgbArrayToHex(c), b.type = "rgb", b;
        if (goog.color.names && (c = goog.color.names[a.toLowerCase()])) return b.hex = c, b.type = "named", b;
        throw Error(a + " is not a valid color string");
    };
    goog.color.isValidColor = function(a) {
        var b = goog.color.prependHashIfNecessaryHelper(a);
        return !(!goog.color.isValidHexColor_(b) && !(goog.color.isValidRgbColor_(a).length || goog.color.names && goog.color.names[a.toLowerCase()]))
    };
    goog.color.parseRgb = function(a) {
        var b = goog.color.isValidRgbColor_(a);
        if (!b.length) throw Error(a + " is not a valid RGB color");
        return b
    };
    goog.color.hexToRgbStyle = function(a) {
        return goog.color.rgbStyle_(goog.color.hexToRgb(a))
    };
    goog.color.hexTripletRe_ = /#(.)(.)(.)/;
    goog.color.normalizeHex = function(a) {
        if (!goog.color.isValidHexColor_(a)) throw Error("'" + a + "' is not a valid hex color");
        4 == a.length && (a = a.replace(goog.color.hexTripletRe_, "#$1$1$2$2$3$3"));
        return a.toLowerCase()
    };
    goog.color.hexToRgb = function(a) {
        a = goog.color.normalizeHex(a);
        var b = parseInt(a.substr(1, 2), 16),
            c = parseInt(a.substr(3, 2), 16);
        a = parseInt(a.substr(5, 2), 16);
        return [b, c, a]
    };
    goog.color.rgbToHex = function(a, b, c) {
        a = Number(a);
        b = Number(b);
        c = Number(c);
        if (isNaN(a) || 0 > a || 255 < a || isNaN(b) || 0 > b || 255 < b || isNaN(c) || 0 > c || 255 < c) throw Error('"(' + a + "," + b + "," + c + '") is not a valid RGB color');
        a = goog.color.prependZeroIfNecessaryHelper(a.toString(16));
        b = goog.color.prependZeroIfNecessaryHelper(b.toString(16));
        c = goog.color.prependZeroIfNecessaryHelper(c.toString(16));
        return "#" + a + b + c
    };
    goog.color.rgbArrayToHex = function(a) {
        return goog.color.rgbToHex(a[0], a[1], a[2])
    };
    goog.color.rgbToHsl = function(a, b, c) {
        a /= 255;
        b /= 255;
        c /= 255;
        var d = Math.max(a, b, c),
            e = Math.min(a, b, c),
            f = 0,
            g = 0,
            h = 0.5 * (d + e);
        d != e && (d == a ? f = 60 * (b - c) / (d - e) : d == b ? f = 60 * (c - a) / (d - e) + 120 : d == c && (f = 60 * (a - b) / (d - e) + 240), g = 0 < h && 0.5 >= h ? (d - e) / (2 * h) : (d - e) / (2 - 2 * h));
        return [Math.round(f + 360) % 360, g, h]
    };
    goog.color.rgbArrayToHsl = function(a) {
        return goog.color.rgbToHsl(a[0], a[1], a[2])
    };
    goog.color.hueToRgb_ = function(a, b, c) {
        0 > c ? c += 1 : 1 < c && (c -= 1);
        return 1 > 6 * c ? a + 6 * (b - a) * c : 1 > 2 * c ? b : 2 > 3 * c ? a + 6 * (b - a) * (2 / 3 - c) : a
    };
    goog.color.hslToRgb = function(a, b, c) {
        var d = 0,
            e = 0,
            f = 0;
        a /= 360;
        if (0 == b) d = e = f = 255 * c;
        else var g = f = 0,
            g = 0.5 > c ? c * (1 + b) : c + b - b * c,
            f = 2 * c - g,
            d = 255 * goog.color.hueToRgb_(f, g, a + 1 / 3),
            e = 255 * goog.color.hueToRgb_(f, g, a),
            f = 255 * goog.color.hueToRgb_(f, g, a - 1 / 3);
        return [Math.round(d), Math.round(e), Math.round(f)]
    };
    goog.color.hslArrayToRgb = function(a) {
        return goog.color.hslToRgb(a[0], a[1], a[2])
    };
    goog.color.validHexColorRe_ = /^#(?:[0-9a-f]{3}){1,2}$/i;
    goog.color.isValidHexColor_ = function(a) {
        return goog.color.validHexColorRe_.test(a)
    };
    goog.color.normalizedHexColorRe_ = /^#[0-9a-f]{6}$/;
    goog.color.isNormalizedHexColor_ = function(a) {
        return goog.color.normalizedHexColorRe_.test(a)
    };
    goog.color.rgbColorRe_ = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
    goog.color.isValidRgbColor_ = function(a) {
        var b = a.match(goog.color.rgbColorRe_);
        if (b) {
            a = Number(b[1]);
            var c = Number(b[2]),
                b = Number(b[3]);
            if (0 <= a && 255 >= a && 0 <= c && 255 >= c && 0 <= b && 255 >= b) return [a, c, b]
        }
        return []
    };
    goog.color.prependZeroIfNecessaryHelper = function(a) {
        return 1 == a.length ? "0" + a : a
    };
    goog.color.prependHashIfNecessaryHelper = function(a) {
        return "#" == a.charAt(0) ? a : "#" + a
    };
    goog.color.rgbStyle_ = function(a) {
        return "rgb(" + a.join(",") + ")"
    };
    goog.color.hsvToRgb = function(a, b, c) {
        var d = 0,
            e = 0,
            f = 0;
        if (0 == b) f = e = d = c;
        else {
            var g = Math.floor(a / 60),
                h = a / 60 - g;
            a = c * (1 - b);
            var j = c * (1 - b * h);
            b = c * (1 - b * (1 - h));
            switch (g) {
                case 1:
                    d = j;
                    e = c;
                    f = a;
                    break;
                case 2:
                    d = a;
                    e = c;
                    f = b;
                    break;
                case 3:
                    d = a;
                    e = j;
                    f = c;
                    break;
                case 4:
                    d = b;
                    e = a;
                    f = c;
                    break;
                case 5:
                    d = c;
                    e = a;
                    f = j;
                    break;
                case 6:
                case 0:
                    d = c, e = b, f = a
            }
        }
        return [Math.floor(d), Math.floor(e), Math.floor(f)]
    };
    goog.color.rgbToHsv = function(a, b, c) {
        var d = Math.max(Math.max(a, b), c),
            e = Math.min(Math.min(a, b), c);
        if (e == d) e = a = 0;
        else {
            var f = d - e,
                e = f / d;
            a = 60 * (a == d ? (b - c) / f : b == d ? 2 + (c - a) / f : 4 + (a - b) / f);
            0 > a && (a += 360);
            360 < a && (a -= 360)
        }
        return [a, e, d]
    };
    goog.color.rgbArrayToHsv = function(a) {
        return goog.color.rgbToHsv(a[0], a[1], a[2])
    };
    goog.color.hsvArrayToRgb = function(a) {
        return goog.color.hsvToRgb(a[0], a[1], a[2])
    };
    goog.color.hexToHsl = function(a) {
        a = goog.color.hexToRgb(a);
        return goog.color.rgbToHsl(a[0], a[1], a[2])
    };
    goog.color.hslToHex = function(a, b, c) {
        return goog.color.rgbArrayToHex(goog.color.hslToRgb(a, b, c))
    };
    goog.color.hslArrayToHex = function(a) {
        return goog.color.rgbArrayToHex(goog.color.hslToRgb(a[0], a[1], a[2]))
    };
    goog.color.hexToHsv = function(a) {
        return goog.color.rgbArrayToHsv(goog.color.hexToRgb(a))
    };
    goog.color.hsvToHex = function(a, b, c) {
        return goog.color.rgbArrayToHex(goog.color.hsvToRgb(a, b, c))
    };
    goog.color.hsvArrayToHex = function(a) {
        return goog.color.hsvToHex(a[0], a[1], a[2])
    };
    goog.color.hslDistance = function(a, b) {
        var c, d;
        c = 0.5 >= a[2] ? a[1] * a[2] : a[1] * (1 - a[2]);
        d = 0.5 >= b[2] ? b[1] * b[2] : b[1] * (1 - b[2]);
        return (a[2] - b[2]) * (a[2] - b[2]) + c * c + d * d - 2 * c * d * Math.cos(2 * (a[0] / 360 - b[0] / 360) * Math.PI)
    };
    goog.color.blend = function(a, b, c) {
        c = goog.math.clamp(c, 0, 1);
        return [Math.round(c * a[0] + (1 - c) * b[0]), Math.round(c * a[1] + (1 - c) * b[1]), Math.round(c * a[2] + (1 - c) * b[2])]
    };
    goog.color.darken = function(a, b) {
        return goog.color.blend([0, 0, 0], a, b)
    };
    goog.color.lighten = function(a, b) {
        return goog.color.blend([255, 255, 255], a, b)
    };
    goog.color.highContrast = function(a, b) {
        for (var c = [], d = 0; d < b.length; d++) c.push({
            color: b[d],
            diff: goog.color.yiqBrightnessDiff_(b[d], a) + goog.color.colorDiff_(b[d], a)
        });
        c.sort(function(a, b) {
            return b.diff - a.diff
        });
        return c[0].color
    };
    goog.color.yiqBrightness_ = function(a) {
        return Math.round((299 * a[0] + 587 * a[1] + 114 * a[2]) / 1E3)
    };
    goog.color.yiqBrightnessDiff_ = function(a, b) {
        return Math.abs(goog.color.yiqBrightness_(a) - goog.color.yiqBrightness_(b))
    };
    goog.color.colorDiff_ = function(a, b) {
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])
    };
    pb.shadowMaker = function(a, b, c, d, e, f) {
        e = e || [];
        f = f || [];
        var g = document.defaultView.getComputedStyle(a, null).getPropertyValue("background-color"),
            h = goog.color.hexToHsl(goog.color.parse(g).hex);
        h[2] *= c || 1;
        c = function(a, b, c, d, e) {
            return a + "px " + b + "px " + c + "px " + ((e || 0) + "px") + " hsl(" + h[0] + ", " + 100 * h[1] + "%, " + d + "%)"
        };
        for (var g = [], j = (window.innerWidth / 2 - goog.style.getPageOffset(a).x - a.offsetWidth / 2) / 30, k = (window.innerHeight - goog.style.getPageOffset(a).y - a.offsetHeight / 2) / 80 * b / 10, l = b; b--;) g.push(c(j * b / l, 2 * k * b /
            l, 0, 100 * h[2] - 100 * h[2] * (b + 5) / l / 1.6));
        g.splice(0, 0, c(j, 2 * k, 4 * l, 0, 0), c(j / d / 8, 3 * k, 4 * l, 30, l / 12), c(j / d / 8, 2 * k, l, 0, l / 4 / d), c(j / d / 8, 2.55 * k, 2 * l, 5, l / 3 / d));
        g = [].concat(e, g.reverse(), f);
        a.style.boxShadow = g.join(", ");
        a.style.left = "-" + j / 2 + "px"
    };
    pb.textShadowMaker = function(a, b, c, d, e, f) {
        c = c || [];
        d = d || [];
        for (var g = document.defaultView.getComputedStyle(a, null).getPropertyValue("color"), h = goog.color.hexToHsl(goog.color.parse(g).hex), g = function(a, b, c, d) {
                return a + "px " + b + "px " + c + "px hsl(" + h[0] + ", " + 100 * h[1] + "%, " + d + "%)"
            }, j = [], k = (window.innerWidth / 2 - goog.style.getPageOffset(a).x - a.offsetWidth / 2) / 30, l = (window.innerHeight - goog.style.getPageOffset(a).y - a.offsetHeight / 2) / 30 * b / 10, m = b; b--;) {
            var p = k * b / m,
                r = 2 * l * b / m;
            e && (r = -r);
            f && (p = -p * Math.pow(f, 4));
            j.push(g(p,
                r, 0, 100 * h[2] - 100 * h[2] * (b + 5) / m / 1.6))
        }
        j.splice(0, 0, g(k, 0, 2 * m, 0), g(k, 1.8 * l, m / 2, 0), g(k, 2.5 * l, 2 * m, 0));
        j = [].concat(c, j.reverse(), d);
        a.style.textShadow = j.join(", ")
    };
    pb.textShadowMakerDom = function(a, b) {
        a.style.position = "absolute";
        for (var c = document.defaultView.getComputedStyle(a, null).getPropertyValue("color"), c = goog.color.hexToRgb(goog.color.parse(c).hex), d = 0; d < b; d++) {
            var e = a.cloneNode(!0);
            e.style.position = "absolute";
            e.style.webkitTransform = "translateZ(-" + d + "px)";
            e.style.color = goog.color.rgbArrayToHex(goog.color.darken(c, 0.8 * (d / b) + 0.2));
            goog.dom.insertSiblingBefore(e, a);
            d == b - 1 && (e.style.textShadow = "0 0 10px black,0 0 20px black,0 0 30px black,0 0 40px black,0 0 50px black")
        }
    };
    pb.footswitch = {};
    pb.footswitch.SwitchModel = function(a) {
        tart.ui.ComponentModel.call(this);
        this.name = a;
        this.nodes = [
            [],
            [],
            []
        ];
        this.state = !1
    };
    goog.inherits(pb.footswitch.SwitchModel, tart.ui.ComponentModel);
    pb.footswitch.SwitchModel.prototype.toggle = function() {
        var a = this.state;
        (this.state = !this.state) ? this.turnOn(): this.turnOff();
        this.dispatchEvent({
            type: this.state ? pb.footswitch.SwitchModel.EventType.ON : pb.footswitch.SwitchModel.EventType.OFF,
            newValue: this.state,
            oldValue: a
        })
    };
    pb.footswitch.SwitchModel.prototype.turnOn = function() {
        var a = function(a) {
            a[1].disconnect();
            a[0] && a[1].connect(a[0])
        };
        goog.array.forEach(this.nodes, function(b) {
            b && (a(b), setTimeout(function() {
                a(b)
            }, 10))
        })
    };
    pb.footswitch.SwitchModel.prototype.turnOff = function() {
        var a = function(a) {
            a[1].disconnect();
            a[2] && a[1].connect(a[2])
        };
        goog.array.forEach(this.nodes, function(b) {
            a(b);
            setTimeout(function() {
                a(b)
            }, 10)
        })
    };
    pb.footswitch.SwitchModel.prototype.setNodes = function(a) {
        this.nodes = a;
        this.state = !this.state;
        this.toggle()
    };
    pb.footswitch.SwitchModel.EventType = {
        ON: "on",
        OFF: "off"
    };
    pb.footswitch.Switch = function(a) {
        this.model = new this.modelClass(a);
        pb.ui.Component.call(this)
    };
    goog.inherits(pb.footswitch.Switch, pb.ui.Component);
    pb.footswitch.Switch.prototype.modelClass = pb.footswitch.SwitchModel;
    pb.footswitch.Switch.prototype.setNodes = function(a) {
        this.model.setNodes(a)
    };
    pb.footswitch.Switch.prototype.getState = function() {
        return this.model.state
    };
    pb.footswitch.Switch.prototype.toggle = function() {
        this.model.toggle()
    };
    pb.footswitch.Switch.prototype.templates_base = function() {
        return '<div class="switch" id="' + this.getId() + '"><div class="button"></div>' + this.templates_name() + "</div>"
    };
    pb.footswitch.Switch.prototype.templates_name = function() {
        return this.model.name ? '<div class="name">' + this.model.name + "</div>" : ""
    };
    pb.footswitch.Switch.prototype.mappings = {
        BUTTON: ".button"
    };
    (function(a) {
        a.events = {};
        (a.events[goog.events.EventType.CLICK] = {})[a.mappings.BUTTON] = a.toggle
    })(pb.footswitch.Switch.prototype);
    pb.footswitch.MomentaryModel = function(a) {
        pb.footswitch.SwitchModel.call(this, a);
        this.state = !1
    };
    goog.inherits(pb.footswitch.MomentaryModel, pb.footswitch.SwitchModel);
    pb.footswitch.Momentary = function(a) {
        pb.footswitch.Switch.call(this, a);
        this.state = !1
    };
    goog.inherits(pb.footswitch.Momentary, pb.footswitch.Switch);
    pb.footswitch.Momentary.prototype.modelClass = pb.footswitch.MomentaryModel;
    (function(a) {
        a.events = {};
        var b = a.events[goog.events.EventType.MOUSEDOWN] = {},
            c = a.events[goog.events.EventType.MOUSEUP] = {};
        b[a.mappings.BUTTON] = a.toggle;
        c[a.mappings.BUTTON] = a.toggle
    })(pb.footswitch.Momentary.prototype);
    pb.IConnectable = function() {};
    pb.IConnectable.prototype.connect = function() {};
    pb.IConnectable.prototype.disconnect = function() {};
    pb.IConnectable.prototype.setPrev = function() {};
    pb.IConnectable.prototype.getInput = function() {};
    pb.Connectable = function(a) {
        pb.ui.Component.call(this);
        this.setModel(new this.modelClass(a));
        this.createChildComponents();
        this.bindModelEvents()
    };
    goog.inherits(pb.Connectable, pb.ui.Component);
    pb.Connectable.prototype.modelClass = pb.ConnectableModel;
    pb.Connectable.prototype.createChildComponents = function() {
        this.components = []
    };
    pb.Connectable.prototype.getInput = function() {
        return this.model.getInput()
    };
    pb.Connectable.prototype.getOutput = function() {
        return this.model.getOutput()
    };
    pb.Connectable.prototype.setPrev = function(a) {
        this.model.setPrev(a.getOutput())
    };
    pb.Connectable.prototype.connect = function(a) {
        a.setPrev(this);
        this.model.connect(a.getInput())
    };
    pb.Connectable.prototype.disconnect = function() {
        this.model.disconnect()
    };
    pb.Led = function(a, b) {
        pb.ui.Component.call(this);
        this.footswitch = a;
        this.name = b || "";
        this.state = !1;
        this.bindModelEvents()
    };
    goog.inherits(pb.Led, pb.ui.Component);
    pb.Led.prototype.toggle = function() {
        this.state = !this.state;
        this.updateUi()
    };
    pb.Led.prototype.updateUi = function() {
        this.isInDocument() && goog.dom.classes.enable(this.getElement(), "on", this.state)
    };
    pb.Led.prototype.templates_base = function() {
        return '<div class="led" id="' + this.getId() + '"><div class="nameHolder"><div class="name">' + this.name + "</div></div></div>"
    };
    pb.Led.prototype.enterDocument = function() {
        pb.Led.superClass_.enterDocument.call(this);
        this.updateUi()
    };
    pb.Led.prototype.bindModelEvents = function() {
        this.footswitch && goog.events.listen(this.footswitch.model, [pb.footswitch.SwitchModel.EventType.ON, pb.footswitch.SwitchModel.EventType.OFF], this.onSwitchValueChange, !1, this)
    };
    pb.Led.prototype.onSwitchValueChange = function(a) {
        this.state = a.newValue;
        this.updateUi()
    };
    pb.footswitch.ToggleModel = function(a) {
        pb.footswitch.SwitchModel.call(this, a);
        this.state = !0
    };
    goog.inherits(pb.footswitch.ToggleModel, pb.footswitch.SwitchModel);
    pb.footswitch.Toggle = function(a) {
        pb.footswitch.Switch.call(this, a)
    };
    goog.inherits(pb.footswitch.Toggle, pb.footswitch.Switch);
    pb.footswitch.Toggle.prototype.modelClass = pb.footswitch.ToggleModel;
    pb.stomp.Box = function(a) {
        pb.Connectable.call(this, a)
    };
    goog.inherits(pb.stomp.Box, pb.Connectable);
    pb.stomp.Box.prototype.modelClass = pb.stomp.BoxModel;
    pb.stomp.Box.prototype.createChildComponents = function() {
        this.createPots();
        this.createSwitches()
    };
    pb.stomp.Box.prototype.createPots = function() {
        this.volumePot = new pb.pot.Linear(this.model.level.gain, "volume", 1);
        this.volumePot.setValue(1);
        this.pots = [this.volumePot]
    };
    pb.stomp.Box.prototype.createSwitches = function() {
        this.bypassSwitch = new pb.footswitch.Toggle;
        this.led = new pb.Led(this.bypassSwitch);
        this.leds = [this.led];
        this.switches = [this.bypassSwitch];
        var a = this;
        goog.events.listen(this.bypassSwitch.model, pb.footswitch.SwitchModel.EventType.ON, function() {
            this.model.routeInternal();
            setTimeout(function() {
                a.model.routeInternal()
            }, 10)
        }, !1, this)
    };
    pb.stomp.Box.prototype.connect = function(a) {
        pb.stomp.Box.superClass_.connect.call(this, a);
        this.bypassSwitch.setNodes(this.model.nodes)
    };
    pb.stomp.Box.prototype.setLevel = function(a) {
        this.volumePot.setValue(a)
    };
    pb.stomp.Box.prototype.templates_base = function() {
        var a = this.name.replace(/\s/g, "-").toLowerCase();
        return '<div id="' + this.getId() + '" class="box ' + a + '"><div class="pots"></div><div class="name">' + this.name + '</div><div class="leds"></div><div class="switches"></div></div>'
    };
    pb.stomp.Box.prototype.enterDocument = function() {
        pb.stomp.Box.superClass_.enterDocument.call(this);
        this.pots.forEach(function(a) {
            a.render(this.$(this.mappings.POTS)[0])
        }, this);
        this.switches.forEach(function(a) {
            a.render(this.$(this.mappings.SWITCHES)[0])
        }, this);
        this.leds.forEach(function(a) {
            a.render(this.$(this.mappings.LEDS)[0])
        }, this)
    };
    pb.stomp.Box.prototype.mappings = {
        POTS: ".pots",
        SWITCHES: ".switches",
        LEDS: ".leds"
    };
    pb.stomp.Box.prototype.name = "pb";
    pb.stomp.Volume = function(a) {
        pb.stomp.Box.call(this, a);
        this.volumePot.setValue(1)
    };
    goog.inherits(pb.stomp.Volume, pb.stomp.Box);
    pb.stomp.Volume.prototype.modelClass = pb.stomp.VolumeModel;
    pb.stomp.Volume.prototype.name = "volume";
    pb.stomp.OverdriveModel = function(a) {
        pb.stomp.BoxModel.call(this, a);
        this.lowPassFreq = 3E3;
        this.lowPass = this.context.createBiquadFilter();
        this.lowPass.type = 0;
        this.lowPass.frequency.value = this.lowPassFreq;
        this.waveShaper = this.context.createWaveShaper();
        this.effects = [this.waveShaper, this.lowPass, this.level]
    };
    goog.inherits(pb.stomp.OverdriveModel, pb.stomp.BoxModel);
    pb.stomp.OverdriveModel.prototype.createWSCurve = function(a) {
        this.wsCurve = new Float32Array(22050);
        for (var b = Math.PI / 180, c = 0; 22050 > c; c += 1) {
            var d = 2 * c / 22050 - 1;
            this.wsCurve[c] = 20 * ((3 + a) * d) * b / (Math.PI + a * Math.abs(d))
        }
        this.waveShaper.curve = this.wsCurve
    };
    pb.stomp.OverdriveModel.prototype.setDrive = function(a) {
        this.createWSCurve(10 * a)
    };
    pb.stomp.OverdriveModel.prototype.setTone = function(a) {
        this.lowPass.frequency.value = 2E3 + a
    };
    pb.pot.LogModel = function(a, b, c, d, e, f) {
        pb.pot.PotModel.call(this, a, b, c, d, e, f)
    };
    goog.inherits(pb.pot.LogModel, pb.pot.PotModel);
    pb.pot.LogModel.prototype.processValue = function(a, b) {
        a = Math.pow(a, 3.3);
        pb.pot.LogModel.superClass_.processValue.call(this, a, b)
    };
    pb.pot.LogModel.prototype.getNormalizedValue = function() {
        var a = pb.pot.LogModel.superClass_.getNormalizedValue.call(this);
        return a = Math.pow(a, 1 / 3.3)
    };
    pb.pot.Log = function(a, b, c, d, e, f, g) {
        pb.pot.Pot.call(this, a, b, c, d, e, f, g)
    };
    goog.inherits(pb.pot.Log, pb.pot.Pot);
    pb.pot.Log.prototype.modelClass = pb.pot.LogModel;
    pb.stomp.Overdrive = function(a) {
        pb.stomp.Box.call(this, a)
    };
    goog.inherits(pb.stomp.Overdrive, pb.stomp.Box);
    pb.stomp.Overdrive.prototype.modelClass = pb.stomp.OverdriveModel;
    pb.stomp.Overdrive.prototype.createPots = function() {
        pb.stomp.Overdrive.superClass_.createPots.call(this);
        var a = goog.bind(this.model.setDrive, this.model),
            b = goog.bind(this.model.setTone, this.model);
        this.drivePot = new pb.pot.Log(a, "drive", 2E3);
        this.tonePot = new pb.pot.Log(b, "tone", 3E3, pb.pot.Pot.Size.SMALL);
        this.pots.push(this.drivePot, this.tonePot)
    };
    pb.stomp.Overdrive.prototype.setDrive = function(a) {
        this.drivePot.setValue(a)
    };
    pb.stomp.Overdrive.prototype.setTone = function(a) {
        this.tonePot.setValue(a)
    };
    pb.stomp.Overdrive.prototype.name = "overdrive";
    pb.stomp.DelayModel = function(a) {
        pb.stomp.BoxModel.call(this, a);
        this.delayer = this.context.createDelay();
        this.delayer.delayTime.value = 0.4;
        this.feedbackGain = this.context.createGain();
        this.feedbackGain.gain.value = 0.9;
        this.effects = [this.delayer, this.feedbackGain, this.level]
    };
    goog.inherits(pb.stomp.DelayModel, pb.stomp.BoxModel);
    pb.stomp.DelayModel.prototype.setDelayTimer = function(a) {
        this.delayer.delayTime.value = a
    };
    pb.stomp.DelayModel.prototype.setFeedbackGain = function(a) {
        this.feedbackGain.gain.value = a
    };
    pb.stomp.DelayModel.prototype.routeInternal = function() {
        pb.stomp.DelayModel.superClass_.routeInternal.call(this);
        this.feedbackGain.connect(this.delayer);
        this.inputBuffer.connect(this.outputBuffer)
    };
    pb.stomp.Delay = function(a) {
        pb.stomp.Box.call(this, a)
    };
    goog.inherits(pb.stomp.Delay, pb.stomp.Box);
    pb.stomp.Delay.prototype.modelClass = pb.stomp.DelayModel;
    pb.stomp.Delay.prototype.createPots = function() {
        pb.stomp.Delay.superClass_.createPots.call(this);
        var a = goog.bind(this.model.setDelayTimer, this.model),
            b = goog.bind(this.model.setFeedbackGain, this.model);
        this.delayTimerPot = new pb.pot.Log(a, "delay time", 5);
        this.feedbackGainPot = new pb.pot.Linear(b, "feedback gain", 0.95);
        this.pots.push(this.delayTimerPot, this.feedbackGainPot)
    };
    pb.stomp.Delay.prototype.setDelayTimer = function(a) {
        this.delayTimerPot.setValue(a)
    };
    pb.stomp.Delay.prototype.setFeedbackGain = function(a) {
        this.feedbackGainPot.setValue(a)
    };
    pb.stomp.Delay.prototype.name = "delay";
    pb.stomp.ConvModel = function(a) {
        pb.stomp.BoxModel.call(this, a);
        this.conv = this.context.createConvolver();
        this.convGain = this.context.createGain();
        this.effects = [this.conv, this.convGain];
        this.iRPath && this.loadIR()
    };
    goog.inherits(pb.stomp.ConvModel, pb.stomp.BoxModel);
    pb.stomp.ConvModel.prototype.routeInternal = function() {
        pb.stomp.ConvModel.superClass_.routeInternal.call(this);
        this.inputBuffer.connect(this.outputBuffer)
    };
    pb.stomp.ConvModel.prototype.loadIR = function() {
        var a = this,
            b = new XMLHttpRequest;
        b.open("GET", this.iRPath, !0);
        b.responseType = "arraybuffer";
        b.onload = function() {
            a.context.decodeAudioData(b.response, function(b) {
                a.conv.buffer = b
            })
        };
        b.send()
    };
    pb.stomp.CabinetModel = function(a) {
        pb.stomp.ConvModel.call(this, a)
    };
    goog.inherits(pb.stomp.CabinetModel, pb.stomp.ConvModel);
    pb.stomp.CabinetModel.prototype.iRPath = "resources/effect/example/audio/ir/speaker/AK-SPKRS_VinUs_002.wav";
    pb.stomp.Conv = function(a) {
        pb.stomp.Box.call(this, a)
    };
    goog.inherits(pb.stomp.Conv, pb.stomp.Box);
    pb.stomp.Conv.prototype.modelClass = pb.stomp.ConvModel;
    pb.stomp.Conv.prototype.name = "convo";
    pb.stomp.Conv.prototype.gainMultiplier = 1;
    pb.stomp.Conv.prototype.createPots = function() {
        this.volumePot = new pb.pot.Pot(this.model.convGain.gain, "effect", this.gainMultiplier);
        this.pots = [].concat(this.volumePot)
    };
    pb.stomp.Cabinet = function(a) {
        pb.stomp.Conv.call(this, a);
        this.volumePot.setValue(1)
    };
    goog.inherits(pb.stomp.Cabinet, pb.stomp.Conv);
    pb.stomp.Cabinet.prototype.modelClass = pb.stomp.CabinetModel;
    pb.stomp.Cabinet.prototype.name = "cabinet";
    pb.stomp.Cabinet.prototype.gainMultiplier = 10;
    (function() {
        var a = Math.floor(2147483648 * Math.random());
        tart.getUid = function() {
            return (a++).toString(36)
        }
    })();
    goog.functions = {};
    goog.functions.constant = function(a) {
        return function() {
            return a
        }
    };
    goog.functions.FALSE = goog.functions.constant(!1);
    goog.functions.TRUE = goog.functions.constant(!0);
    goog.functions.NULL = goog.functions.constant(null);
    goog.functions.identity = function(a) {
        return a
    };
    goog.functions.error = function(a) {
        return function() {
            throw Error(a);
        }
    };
    goog.functions.lock = function(a, b) {
        b = b || 0;
        return function() {
            return a.apply(this, Array.prototype.slice.call(arguments, 0, b))
        }
    };
    goog.functions.withReturnValue = function(a, b) {
        return goog.functions.sequence(a, goog.functions.constant(b))
    };
    goog.functions.compose = function(a, b) {
        var c = arguments,
            d = c.length;
        return function() {
            var a;
            d && (a = c[d - 1].apply(this, arguments));
            for (var b = d - 2; 0 <= b; b--) a = c[b].call(this, a);
            return a
        }
    };
    goog.functions.sequence = function(a) {
        var b = arguments,
            c = b.length;
        return function() {
            for (var a, e = 0; e < c; e++) a = b[e].apply(this, arguments);
            return a
        }
    };
    goog.functions.and = function(a) {
        var b = arguments,
            c = b.length;
        return function() {
            for (var a = 0; a < c; a++)
                if (!b[a].apply(this, arguments)) return !1;
            return !0
        }
    };
    goog.functions.or = function(a) {
        var b = arguments,
            c = b.length;
        return function() {
            for (var a = 0; a < c; a++)
                if (b[a].apply(this, arguments)) return !0;
            return !1
        }
    };
    goog.functions.not = function(a) {
        return function() {
            return !a.apply(this, arguments)
        }
    };
    goog.functions.create = function(a, b) {
        var c = function() {};
        c.prototype = a.prototype;
        c = new c;
        a.apply(c, Array.prototype.slice.call(arguments, 1));
        return c
    };
    /*
     Portions of this code are from the Dojo Toolkit, received by
     The Closure Library Authors under the BSD license. All other code is
     Copyright 2005-2009 The Closure Library Authors. All Rights Reserved.

    The "New" BSD License:

    Copyright (c) 2005-2009, The Dojo Foundation
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

     Redistributions of source code must retain the above copyright notice, this
        list of conditions and the following disclaimer.
     Redistributions in binary form must reproduce the above copyright notice,
        this list of conditions and the following disclaimer in the documentation
        and/or other materials provided with the distribution.
     Neither the name of the Dojo Foundation nor the names of its contributors
        may be used to endorse or promote products derived from this software
        without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
    FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
    DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
    OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    */
    goog.dom.query = function() {
        function a(a, b) {
            var c = b || [];
            a && c.push(a);
            return c
        }
        var b = goog.userAgent.WEBKIT && "BackCompat" == goog.dom.getDocument().compatMode,
            c = goog.dom.getDocument().firstChild.children ? "children" : "childNodes",
            d = !1,
            e = function(a) {
                a = 0 <= ">~+".indexOf(a.slice(-1)) ? a + " * " : a + " ";
                for (var b = function(b, c) {
                        return goog.string.trim(a.slice(b, c))
                    }, c = [], e = -1, f = -1, g = -1, h = -1, j = -1, k = -1, l = -1, v = "", s = "", B, q = 0, p = a.length, n = null, m = null, r = function() {
                        0 <= k && (n.id = b(k, q).replace(/\\/g, ""), k = -1);
                        if (0 <= l) {
                            var a =
                                l == q ? null : b(l, q);
                            0 > ">~+".indexOf(a) ? n.tag = a : n.oper = a;
                            l = -1
                        }
                        0 <= j && (n.classes.push(b(j + 1, q).replace(/\\/g, "")), j = -1)
                    }; v = s, s = a.charAt(q), q < p; q++)
                    if ("\\" != v)
                        if (n || (B = q, n = {
                                query: null,
                                pseudos: [],
                                attrs: [],
                                classes: [],
                                tag: null,
                                oper: null,
                                id: null,
                                getTag: function() {
                                    return d ? this.otag : this.tag
                                }
                            }, l = q), 0 <= e)
                            if ("]" == s) {
                                m.attr ? m.matchFor = b(g || e + 1, q) : m.attr = b(e + 1, q);
                                if ((e = m.matchFor) && ('"' == e.charAt(0) || "'" == e.charAt(0))) m.matchFor = e.slice(1, -1);
                                n.attrs.push(m);
                                m = null;
                                e = g = -1
                            } else "=" == s && (g = 0 <= "|~^$*".indexOf(v) ? v : "",
                                m.type = g + s, m.attr = b(e + 1, q - g.length), g = q + 1);
                else 0 <= f ? ")" == s && (0 <= h && (m.value = b(f + 1, q)), h = f = -1) : "#" == s ? (r(), k = q + 1) : "." == s ? (r(), j = q) : ":" == s ? (r(), h = q) : "[" == s ? (r(), e = q, m = {}) : "(" == s ? (0 <= h && (m = {
                    name: b(h + 1, q),
                    value: null
                }, n.pseudos.push(m)), f = q) : " " == s && v != s && (r(), 0 <= h && n.pseudos.push({
                    name: b(h + 1, q)
                }), n.loops = n.pseudos.length || n.attrs.length || n.classes.length, n.oquery = n.query = b(B, q), n.otag = n.tag = n.oper ? null : n.tag || "*", n.tag && (n.tag = n.tag.toUpperCase()), c.length && c[c.length - 1].oper && (n.infixOper = c.pop(), n.query =
                    n.infixOper.query + " " + n.query), c.push(n), n = null);
                return c
            },
            f = function(a, b) {
                return !a ? b : !b ? a : function() {
                    return a.apply(window, arguments) && b.apply(window, arguments)
                }
            },
            g = function(a) {
                return 1 == a.nodeType
            },
            h = function(a, b) {
                return !a ? "" : "class" == b ? a.className || "" : "for" == b ? a.htmlFor || "" : "style" == b ? a.style.cssText || "" : (d ? a.getAttribute(b) : a.getAttribute(b, 2)) || ""
            },
            j = {
                "*=": function(a, b) {
                    return function(c) {
                        return 0 <= h(c, a).indexOf(b)
                    }
                },
                "^=": function(a, b) {
                    return function(c) {
                        return 0 == h(c, a).indexOf(b)
                    }
                },
                "$=": function(a,
                    b) {
                    return function(c) {
                        c = " " + h(c, a);
                        return c.lastIndexOf(b) == c.length - b.length
                    }
                },
                "~=": function(a, b) {
                    var c = " " + b + " ";
                    return function(b) {
                        return 0 <= (" " + h(b, a) + " ").indexOf(c)
                    }
                },
                "|=": function(a, b) {
                    b = " " + b;
                    return function(c) {
                        c = " " + h(c, a);
                        return c == b || 0 == c.indexOf(b + "-")
                    }
                },
                "=": function(a, b) {
                    return function(c) {
                        return h(c, a) == b
                    }
                }
            },
            k = "undefined" == typeof goog.dom.getDocument().firstChild.nextElementSibling,
            l = !k ? "nextElementSibling" : "nextSibling",
            m = !k ? "previousElementSibling" : "previousSibling",
            p = k ? g : goog.functions.TRUE,
            r = function(a) {
                for (; a = a[m];)
                    if (p(a)) return !1;
                return !0
            },
            A = function(a) {
                for (; a = a[l];)
                    if (p(a)) return !1;
                return !0
            },
            w = function(a) {
                var b = a.parentNode,
                    d = 0,
                    e = b[c],
                    f = a._i || -1,
                    g = b._l || -1;
                if (!e) return -1;
                e = e.length;
                if (g == e && 0 <= f && 0 <= g) return f;
                b._l = e;
                f = -1;
                for (b = b.firstElementChild || b.firstChild; b; b = b[l]) p(b) && (b._i = ++d, a === b && (f = d));
                return f
            },
            K = function(a) {
                return !(w(a) % 2)
            },
            L = function(a) {
                return w(a) % 2
            },
            y = {
                checked: function() {
                    return function(a) {
                        return a.checked || a.attributes.checked
                    }
                },
                "first-child": function() {
                    return r
                },
                "last-child": function() {
                    return A
                },
                "only-child": function() {
                    return function(a) {
                        return !r(a) || !A(a) ? !1 : !0
                    }
                },
                empty: function() {
                    return function(a) {
                        var b = a.childNodes;
                        for (a = a.childNodes.length - 1; 0 <= a; a--) {
                            var c = b[a].nodeType;
                            if (1 === c || 3 == c) return !1
                        }
                        return !0
                    }
                },
                contains: function(a, b) {
                    var c = b.charAt(0);
                    if ('"' == c || "'" == c) b = b.slice(1, -1);
                    return function(a) {
                        return 0 <= a.innerHTML.indexOf(b)
                    }
                },
                not: function(a, b) {
                    var c = e(b)[0],
                        d = {
                            el: 1
                        };
                    "*" != c.tag && (d.tag = 1);
                    c.classes.length || (d.classes = 1);
                    var f = u(c, d);
                    return function(a) {
                        return !f(a)
                    }
                },
                "nth-child": function(a, b) {
                    if ("odd" == b) return L;
                    if ("even" == b) return K;
                    if (-1 != b.indexOf("n")) {
                        var c = b.split("n", 2),
                            d = c[0] ? "-" == c[0] ? -1 : parseInt(c[0], 10) : 1,
                            e = c[1] ? parseInt(c[1], 10) : 0,
                            f = 0,
                            g = -1;
                        0 < d ? 0 > e ? e = e % d && d + e % d : 0 < e && (e >= d && (f = e - e % d), e %= d) : 0 > d && (d *= -1, 0 < e && (g = e, e %= d));
                        if (0 < d) return function(a) {
                            a = w(a);
                            return a >= f && (0 > g || a <= g) && a % d == e
                        };
                        b = e
                    }
                    var h = parseInt(b, 10);
                    return function(a) {
                        return w(a) == h
                    }
                }
            },
            N = goog.userAgent.IE ? function(a) {
                var b = a.toLowerCase();
                "class" == b && (a = "className");
                return function(c) {
                    return d ?
                        c.getAttribute(a) : c[a] || c[b]
                }
            } : function(a) {
                return function(b) {
                    return b && b.getAttribute && b.hasAttribute(a)
                }
            },
            u = function(a, b) {
                if (!a) return goog.functions.TRUE;
                b = b || {};
                var c = null;
                b.el || (c = f(c, g));
                b.tag || "*" != a.tag && (c = f(c, function(b) {
                    return b && b.tagName == a.getTag()
                }));
                b.classes || goog.array.forEach(a.classes, function(a, b) {
                    var d = RegExp("(?:^|\\s)" + a + "(?:\\s|$)");
                    c = f(c, function(a) {
                        return d.test(a.className)
                    });
                    c.count = b
                });
                b.pseudos || goog.array.forEach(a.pseudos, function(a) {
                    var b = a.name;
                    y[b] && (c = f(c, y[b](b,
                        a.value)))
                });
                b.attrs || goog.array.forEach(a.attrs, function(a) {
                    var b, d = a.attr;
                    a.type && j[a.type] ? b = j[a.type](d, a.matchFor) : d.length && (b = N(d));
                    b && (c = f(c, b))
                });
                b.id || a.id && (c = f(c, function(b) {
                    return !!b && b.id == a.id
                }));
                !c && !("default" in b) && (c = goog.functions.TRUE);
                return c
            },
            C = {},
            D = function(d) {
                var e = C[d.query];
                if (e) return e;
                var f = d.infixOper,
                    f = f ? f.oper : "",
                    h = u(d, {
                        el: 1
                    }),
                    j = "*" == d.tag,
                    m = goog.dom.getDocument().getElementsByClassName;
                if (f)
                    if (m = {
                            el: 1
                        }, j && (m.tag = 1), h = u(d, m), "+" == f) var r = h,
                        e = function(a, b, c) {
                            for (; a =
                                a[l];)
                                if (!k || g(a)) {
                                    (!c || z(a, c)) && r(a) && b.push(a);
                                    break
                                }
                            return b
                        };
                    else if ("~" == f) var M = h,
                    e = function(a, b, c) {
                        for (a = a[l]; a;) {
                            if (p(a)) {
                                if (c && !z(a, c)) break;
                                M(a) && b.push(a)
                            }
                            a = a[l]
                        }
                        return b
                    };
                else {
                    if (">" == f) var x = h,
                        x = x || goog.functions.TRUE,
                        e = function(a, b, d) {
                            for (var e = 0, f = a[c]; a = f[e++];) p(a) && ((!d || z(a, d)) && x(a, e)) && b.push(a);
                            return b
                        }
                } else if (d.id) h = !d.loops && j ? goog.functions.TRUE : u(d, {
                    el: 1,
                    id: 1
                }), e = function(b, c) {
                    var e = goog.dom.getDomHelper(b).getElement(d.id);
                    if (e && h(e)) {
                        if (9 == b.nodeType) return a(e, c);
                        for (var f =
                                e.parentNode; f && f != b;) f = f.parentNode;
                        if (f) return a(e, c)
                    }
                };
                else if (m && /\{\s*\[native code\]\s*\}/.test(String(m)) && d.classes.length && !b) var h = u(d, {
                        el: 1,
                        classes: 1,
                        id: 1
                    }),
                    t = d.classes.join(" "),
                    e = function(b, c) {
                        for (var d = a(0, c), e, f = 0, g = b.getElementsByClassName(t); e = g[f++];) h(e, b) && d.push(e);
                        return d
                    };
                else !j && !d.loops ? e = function(b, c) {
                    for (var e = a(0, c), f, g = 0, h = b.getElementsByTagName(d.getTag()); f = h[g++];) e.push(f);
                    return e
                } : (h = u(d, {
                    el: 1,
                    tag: 1,
                    id: 1
                }), e = function(b, c) {
                    for (var e = a(0, c), f, g = 0, j = b.getElementsByTagName(d.getTag()); f =
                        j[g++];) h(f, b) && e.push(f);
                    return e
                });
                return C[d.query] = e
            },
            E = {},
            F = {},
            G = function(b) {
                var c = e(goog.string.trim(b));
                if (1 == c.length) {
                    var d = D(c[0]);
                    return function(a) {
                        if (a = d(a, [])) a.nozip = !0;
                        return a
                    }
                }
                return function(b) {
                    b = a(b);
                    for (var d, e, f = c.length, g, h, j = 0; j < f; j++) {
                        h = [];
                        d = c[j];
                        e = b.length - 1;
                        0 < e && (g = {}, h.nozip = !0);
                        e = D(d);
                        for (var k = 0; d = b[k]; k++) e(d, h, g);
                        if (!h.length) break;
                        b = h
                    }
                    return h
                }
            },
            H = !!goog.dom.getDocument().querySelectorAll && (!goog.userAgent.WEBKIT || goog.userAgent.isVersion("526")),
            I = function(a, c) {
                if (H) {
                    var d =
                        F[a];
                    if (d && !c) return d
                }
                if (d = E[a]) return d;
                var d = a.charAt(0),
                    e = -1 == a.indexOf(" ");
                0 <= a.indexOf("#") && e && (c = !0);
                if (H && !c && -1 == ">~+".indexOf(d) && (!goog.userAgent.IE || -1 == a.indexOf(":")) && !(b && 0 <= a.indexOf(".")) && -1 == a.indexOf(":contains") && -1 == a.indexOf("|=")) {
                    var f = 0 <= ">~+".indexOf(a.charAt(a.length - 1)) ? a + " *" : a;
                    return F[a] = function(b) {
                        try {
                            if (!(9 == b.nodeType || e)) throw "";
                            var c = b.querySelectorAll(f);
                            goog.userAgent.IE ? c.commentStrip = !0 : c.nozip = !0;
                            return c
                        } catch (d) {
                            return I(a, !0)(b)
                        }
                    }
                }
                var g = a.split(/\s*,\s*/);
                return E[a] = 2 > g.length ? G(a) : function(a) {
                    for (var b = 0, c = [], d; d = g[b++];) c = c.concat(G(d)(a));
                    return c
                }
            },
            t = 0,
            O = goog.userAgent.IE ? function(a) {
                return d ? a.getAttribute("_uid") || a.setAttribute("_uid", ++t) || t : a.uniqueID
            } : function(a) {
                return a._uid || (a._uid = ++t)
            },
            z = function(a, b) {
                if (!b) return 1;
                var c = O(a);
                return !b[c] ? b[c] = 1 : 0
            },
            P = function(a) {
                if (a && a.nozip) return a;
                var b = [];
                if (!a || !a.length) return b;
                a[0] && b.push(a[0]);
                if (2 > a.length) return b;
                t++;
                if (goog.userAgent.IE && d) {
                    var c = t + "";
                    a[0].setAttribute("_zipIdx", c);
                    for (var e = 1, f; f = a[e]; e++) a[e].getAttribute("_zipIdx") != c && b.push(f), f.setAttribute("_zipIdx", c)
                } else if (goog.userAgent.IE && a.commentStrip) try {
                    for (e = 1; f = a[e]; e++) g(f) && b.push(f)
                } catch (h) {} else {
                    a[0] && (a[0]._zipIdx = t);
                    for (e = 1; f = a[e]; e++) a[e]._zipIdx != t && b.push(f), f._zipIdx = t
                }
                return b
            },
            J = function(a, b) {
                if (!a) return [];
                if (a.constructor == Array) return a;
                if (!goog.isString(a)) return [a];
                if (goog.isString(b) && (b = goog.dom.getElement(b), !b)) return [];
                b = b || goog.dom.getDocument();
                var c = b.ownerDocument || b.documentElement;
                d = b.contentType && "application/xml" == b.contentType || goog.userAgent.OPERA && (b.doctype || "[object XMLDocument]" == c.toString()) || !!c && (goog.userAgent.IE ? c.xml : b.xmlVersion || c.xmlVersion);
                return (c = I(a)(b)) && c.nozip ? c : P(c)
            };
        J.pseudos = y;
        return J
    }();
    goog.exportSymbol("goog.dom.query", goog.dom.query);
    goog.exportSymbol("goog.dom.query.pseudos", goog.dom.query.pseudos);
    tart.ui.DlgComponent = function() {
        this.id = tart.getUid();
        tart.ui.ComponentManager.getInstance().set(this);
        this.bindModelEvents()
    };
    goog.inherits(tart.ui.DlgComponent, goog.events.EventTarget);
    tart.ui.DlgComponent.prototype.getElement = function() {
        var a = this.element;
        a || (a = this.element = goog.dom.getElement(this.id));
        return a
    };
    tart.ui.DlgComponent.prototype.getPlaceholder = function() {
        return this.templates_base()
    };
    tart.ui.DlgComponent.prototype.bindModelEvents = function() {};
    tart.ui.DlgComponent.prototype.getChild = function(a) {
        var b = null,
            c = this.getElement();
        c && (b = goog.dom.query(a, c));
        return b
    };
    tart.ui.DlgComponent.prototype.render = function(a, b) {
        a && (this.element = tart.dom.createElement(this.getPlaceholder()), a.insertBefore(this.element, a.childNodes[b] || null))
    };
    tart.ui.DlgComponent.prototype.getId = function() {
        return this.id
    };
    tart.ui.DlgComponent.prototype.templates_base = function() {
        return '<div id="' + this.id + '"></div>'
    };
    tart.ui.DlgComponent.prototype.disposeInternal = function() {
        tart.ui.ComponentManager.getInstance().remove(this);
        this.id = this.element = null
    };
    pb.stomp.ReverbModel = function(a) {
        pb.stomp.ConvModel.call(this, a)
    };
    goog.inherits(pb.stomp.ReverbModel, pb.stomp.ConvModel);
    pb.stomp.ReverbModel.prototype.iRPath = "resources/effect/example/audio/ir/reverb/pcm90cleanplate.wav";
    pb.stomp.Reverb = function(a) {
        pb.stomp.Conv.call(this, a)
    };
    goog.inherits(pb.stomp.Reverb, pb.stomp.Conv);
    pb.stomp.Reverb.prototype.modelClass = pb.stomp.ReverbModel;
    pb.stomp.Reverb.prototype.name = "reverb";
    pb.stomp.Reverb.prototype.gainMultiplier = 1;
    pb.Board = function(a) {
        pb.Connectable.call(this, a);
        this.context = a
    };
    goog.inherits(pb.Board, pb.Connectable);
    pb.Board.prototype.pedals = null;
    pb.Board.prototype.addPedals = function(a) {
        pb.ui.Component.prototype.addChildren.call(this, a)
    };
    pb.Board.prototype.doShadows = function() {
        this.getPedals().forEach(function(a) {
            pb.shadowMaker(a.getElement(), 40, 0.5, 0.7);
            a.pots.forEach(function(a) {
                pb.shadowMaker(a.$(a.mappings.KNOB_HOLDER)[0], 10, 0.5, 4)
            })
        })
    };
    pb.Board.prototype.addChildAt = function(a, b, c) {
        pb.Board.superClass_.addChildAt.call(this, a, b, c);
        this.getPedals().length && goog.dom.removeNode(this.$(this.mappings.EMPTY)[0]);
        this.routeInternal();
        this.isInDocument() && this.doShadows()
    };
    pb.Board.prototype.addPedalAt = function(a, b, c) {
        this.addChildAt(a, b, c)
    };
    pb.Board.prototype.removeChild = function(a, b) {
        var c = pb.Board.superClass_.removeChild.call(this, a, b);
        0 == this.getPedals().length && (this.getElement().innerHTML = this.templates_empty());
        this.routeInternal();
        return c
    };
    pb.Board.prototype.enterDocument = function() {
        pb.Board.superClass_.enterDocument.call(this);
        this.doShadows()
    };
    pb.Board.prototype.getPedals = function() {
        return this.getChildren()
    };
    pb.Board.prototype.templates_base = function() {
        return '<div id="' + this.getId() + '" class="board">' + this.templates_empty() + "</div>"
    };
    pb.Board.prototype.templates_empty = function() {
        return '<div class="empty"><div class="text">board is empty</div></div>'
    };
    pb.Board.prototype.connect = function(a) {
        pb.Board.superClass_.connect.call(this, a);
        this.output = a;
        this.routeInternal()
    };
    pb.Board.prototype.routeInternal = function() {
        var a = this.getPedals();
        this.getInput().disconnect();
        a.length ? (this.getInput().connect(a[0].getInput()), this.output && a[a.length - 1].connect(this.output), a.forEach(function(b, c) {
            b.disconnect();
            a[c + 1] && b.connect(a[c + 1])
        }), this.output && this.mediaStreamDestination && a[a.length - 1].model.getOutput().connect(this.mediaStreamDestination)) : (this.getInput().connect(this.getOutput()), this.mediaStreamDestination && this.getInput().connect(this.mediaStreamDestination))
    };
    pb.Board.prototype.setMediaStreamDestination = function(a) {
        this.mediaStreamDestination = a
    };
    pb.Board.prototype.mappings = {
        EMPTY: ".empty"
    };
    pb.io = {};
    pb.io.Output = function(a) {
        this.source = a.destination
    };
    pb.io.Output.prototype.getInput = function() {
        return this.source
    };
    pb.io.Output.prototype.setPrev = function(a) {
        this.prev = a
    };
    pb.io.Output.prototype.connect = function() {};
    pb.io.Output.prototype.getOutput = function() {};
    pb.io.Output.prototype.disconnect = function() {};
    pb.io.Input = function(a) {
        this.source = a.createBufferSource();
        this.source.loop = !0;
        this.state = pb.io.Input.State.NOT_STARTED;
        this.source.addEventListener("ended", this.onEnded.bind(this))
    };
    goog.inherits(pb.io.Input, goog.events.EventTarget);
    pb.io.Input.State = {
        NOT_STARTED: "notStarted",
        PLAYING: "playing",
        FINISHED: "finished"
    };
    pb.io.Input.prototype.play = function(a) {
        this.state == pb.io.Input.State.NOT_STARTED && (this.source.start(a || 0), this.state = pb.io.Input.State.PLAYING)
    };
    pb.io.Input.prototype.stop = function(a) {
        this.state == pb.io.Input.State.PLAYING && (this.source.stop(a || 0), this.state = pb.io.Input.State.FINISHED)
    };
    pb.io.Input.prototype.setSourceBuffer = function(a) {
        this.source.buffer = a
    };
    pb.io.Input.prototype.connect = function(a) {
        a.setPrev(this);
        this.source.connect(a.getInput())
    };
    pb.io.Input.prototype.disconnect = function() {
        this.source.disconnect()
    };
    pb.io.Input.prototype.getOutput = function() {
        return this.source
    };
    pb.io.Input.prototype.onEnded = function() {
        this.state = pb.io.Input.State.FINISHED
    };
    pb.io.Input.prototype.setPrev = function() {};
    pb.io.Input.prototype.getInput = function() {};
    pb.io.FileInput = function(a, b) {
        pb.io.Input.call(this, a);
        var c = this,
            d = new XMLHttpRequest;
        alert('b: '+b);
        d.open("GET", b, !0);
        d.responseType = "arraybuffer";
        d.onload = function() {
            a.decodeAudioData(d.response, function(a) {
                c.setSourceBuffer(a);
                c.dispatchEvent("loaded")
            })
        };
        d.send()
    };
    goog.inherits(pb.io.FileInput, pb.io.Input);
    pb.io.StreamInput = function(a) {
        pb.io.Input.call(this, a);
        var b = this;
        navigator.getUserMedia({
            audio: {
                mandatory: {
                    echoCancellation: !1,
                    googEchoCancellation: !1,
                    googEchoCancellation2: !1,
                    googAutoGainControl: !1,
                    googNoiseSuppression: !1,
                    googNoiseSuppression2: !1
                }
            }
        }, function(c) {
            b.disconnect();
            b.source = a.createMediaStreamSource(c);
            b.dispatchEvent("loaded")
        }, function(a) {
            throw Error(a);
        })
    };
    goog.inherits(pb.io.StreamInput, pb.io.Input);
    pb.io.StreamInput.prototype.stop = function() {
        this.source.disconnect()
    };
    pb.Stage = function() {
        pb.ui.Component.call(this);
        this.context = new AudioContext;
        this.initIO()
    };
    goog.inherits(pb.Stage, pb.ui.Component);
    pb.Stage.prototype.getContext = function() {
        return this.context
    };
    pb.Stage.prototype.initIO = function() {
        this.input = new pb.io.Input(this.context);
        this.output = new pb.io.Output(this.context)
    };
    pb.Stage.prototype.setBoard = function(a) {
        this.board && this.board.dispose();
        this.board = a;
        this.mediaStreamDestination && this.board.setMediaStreamDestination(this.mediaStreamDestination);
        this.route();
        this.addChild(this.board)
    };
    pb.Stage.prototype.route = function() {
        this.input.disconnect();
        this.input.connect(this.board);
        this.board.connect(this.output)
    };
    pb.Stage.prototype.setMediaStreamDestination = function(a) {
        this.mediaStreamDestination = a;
        this.board.setMediaStreamDestination(this.mediaStreamDestination)
    };
    pb.Stage.prototype.play = function(a) {
        this.input.disconnect();
        this.input = new pb.io.FileInput(this.context, a);
        this.route();
        this.input.addEventListener("loaded", this.input.play.bind(this.input, 0), !1)
    };
    pb.Stage.prototype.stop = function() {
        this.input.stop()
    };
    pb.Stage.prototype.templates_base = function() {
        return '<div id="' + this.getId() + '" class="stage"></div>'
    };
    pb.Bootstrapper = function() {};
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;;
    window.pb = pb;
})()