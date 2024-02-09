let myConf = {};
window.SecureIds = ((function (t) {
  "use strict";
  var e = [],
    r = [],
    n = "undefined" != typeof Uint8Array ? Uint8Array : Array,
    i = !1;
  function o() {
    i = !0;
    for (
      var t =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        n = 0,
        o = t.length;
      n < o;
      ++n
    )
      (e[n] = t[n]), (r[t.charCodeAt(n)] = n);
    (r["-".charCodeAt(0)] = 62), (r["_".charCodeAt(0)] = 63);
  }
  function s(t, r, n) {
    for (var i, o, s = [], h = r; h < n; h += 3)
      (i = (t[h] << 16) + (t[h + 1] << 8) + t[h + 2]),
        s.push(
          e[((o = i) >> 18) & 63] +
            e[(o >> 12) & 63] +
            e[(o >> 6) & 63] +
            e[63 & o]
        );
    return s.join("");
  }
  function h(t) {
    var r;
    i || o();
    for (
      var n = t.length, h = n % 3, u = "", a = [], f = 16383, c = 0, l = n - h;
      c < l;
      c += f
    )
      a.push(s(t, c, c + f > l ? l : c + f));
    return (
      1 === h
        ? ((r = t[n - 1]),
          (u += e[r >> 2]),
          (u += e[(r << 4) & 63]),
          (u += "=="))
        : 2 === h &&
          ((r = (t[n - 2] << 8) + t[n - 1]),
          (u += e[r >> 10]),
          (u += e[(r >> 4) & 63]),
          (u += e[(r << 2) & 63]),
          (u += "=")),
      a.push(u),
      a.join("")
    );
  }
  function u(t, e, r, n, i) {
    var o,
      s,
      h = 8 * i - n - 1,
      u = (1 << h) - 1,
      a = u >> 1,
      f = -7,
      c = r ? i - 1 : 0,
      l = r ? -1 : 1,
      p = t[e + c];
    for (
      c += l, o = p & ((1 << -f) - 1), p >>= -f, f += h;
      f > 0;
      o = 256 * o + t[e + c], c += l, f -= 8
    );
    for (
      s = o & ((1 << -f) - 1), o >>= -f, f += n;
      f > 0;
      s = 256 * s + t[e + c], c += l, f -= 8
    );
    if (0 === o) o = 1 - a;
    else {
      if (o === u) return s ? NaN : (1 / 0) * (p ? -1 : 1);
      (s += Math.pow(2, n)), (o -= a);
    }
    return (p ? -1 : 1) * s * Math.pow(2, o - n);
  }
  function a(t, e, r, n, i, o) {
    var s,
      h,
      u,
      a = 8 * o - i - 1,
      f = (1 << a) - 1,
      c = f >> 1,
      l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      p = n ? 0 : o - 1,
      g = n ? 1 : -1,
      d = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
    for (
      e = Math.abs(e),
        isNaN(e) || e === 1 / 0
          ? ((h = isNaN(e) ? 1 : 0), (s = f))
          : ((s = Math.floor(Math.log(e) / Math.LN2)),
            e * (u = Math.pow(2, -s)) < 1 && (s--, (u *= 2)),
            (e += s + c >= 1 ? l / u : l * Math.pow(2, 1 - c)) * u >= 2 &&
              (s++, (u /= 2)),
            s + c >= f
              ? ((h = 0), (s = f))
              : s + c >= 1
              ? ((h = (e * u - 1) * Math.pow(2, i)), (s += c))
              : ((h = e * Math.pow(2, c - 1) * Math.pow(2, i)), (s = 0)));
      i >= 8;
      t[r + p] = 255 & h, p += g, h /= 256, i -= 8
    );
    for (
      s = (s << i) | h, a += i;
      a > 0;
      t[r + p] = 255 & s, p += g, s /= 256, a -= 8
    );
    t[r + p - g] |= 128 * d;
  }
  var f = {}.toString,
    c =
      Array.isArray ||
      function (t) {
        return "[object Array]" == f.call(t);
      };
  function l() {
    return g.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
  }
  function p(t, e) {
    if (l() < e) throw new RangeError("Invalid typed array length");
    return (
      g.TYPED_ARRAY_SUPPORT
        ? ((t = new Uint8Array(e)).__proto__ = g.prototype)
        : (null === t && (t = new g(e)), (t.length = e)),
      t
    );
  }
  function g(t, e, r) {
    if (!(g.TYPED_ARRAY_SUPPORT || this instanceof g)) return new g(t, e, r);
    if ("number" == typeof t) {
      if ("string" == typeof e)
        throw new Error(
          "If encoding is specified then the first argument must be a string"
        );
      return w(this, t);
    }
    return d(this, t, e, r);
  }
  function d(t, e, r, n) {
    if ("number" == typeof e)
      throw new TypeError('"value" argument must not be a number');
    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer
      ? (function (t, e, r, n) {
          if ((e.byteLength, r < 0 || e.byteLength < r))
            throw new RangeError("'offset' is out of bounds");
          if (e.byteLength < r + (n || 0))
            throw new RangeError("'length' is out of bounds");
          e =
            void 0 === r && void 0 === n
              ? new Uint8Array(e)
              : void 0 === n
              ? new Uint8Array(e, r)
              : new Uint8Array(e, r, n);
          g.TYPED_ARRAY_SUPPORT
            ? ((t = e).__proto__ = g.prototype)
            : (t = v(t, e));
          return t;
        })(t, e, r, n)
      : "string" == typeof e
      ? (function (t, e, r) {
          ("string" == typeof r && "" !== r) || (r = "utf8");
          if (!g.isEncoding(r))
            throw new TypeError('"encoding" must be a valid string encoding');
          var n = 0 | E(e, r),
            i = (t = p(t, n)).write(e, r);
          i !== n && (t = t.slice(0, i));
          return t;
        })(t, e, r)
      : (function (t, e) {
          if (m(e)) {
            var r = 0 | b(e.length);
            return 0 === (t = p(t, r)).length || e.copy(t, 0, 0, r), t;
          }
          if (e) {
            if (
              ("undefined" != typeof ArrayBuffer &&
                e.buffer instanceof ArrayBuffer) ||
              "length" in e
            )
              return "number" != typeof e.length || (n = e.length) != n
                ? p(t, 0)
                : v(t, e);
            if ("Buffer" === e.type && c(e.data)) return v(t, e.data);
          }
          var n;
          throw new TypeError(
            "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
          );
        })(t, e);
  }
  function y(t) {
    if ("number" != typeof t)
      throw new TypeError('"size" argument must be a number');
    if (t < 0) throw new RangeError('"size" argument must not be negative');
  }
  function w(t, e) {
    if ((y(e), (t = p(t, e < 0 ? 0 : 0 | b(e))), !g.TYPED_ARRAY_SUPPORT))
      for (var r = 0; r < e; ++r) t[r] = 0;
    return t;
  }
  function v(t, e) {
    var r = e.length < 0 ? 0 : 0 | b(e.length);
    t = p(t, r);
    for (var n = 0; n < r; n += 1) t[n] = 255 & e[n];
    return t;
  }
  function b(t) {
    if (t >= l())
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          l().toString(16) +
          " bytes"
      );
    return 0 | t;
  }
  function m(t) {
    return !(null == t || !t._isBuffer);
  }
  function E(t, e) {
    if (m(t)) return t.length;
    if (
      "undefined" != typeof ArrayBuffer &&
      "function" == typeof ArrayBuffer.isView &&
      (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
    )
      return t.byteLength;
    "string" != typeof t && (t = "" + t);
    var r = t.length;
    if (0 === r) return 0;
    for (var n = !1; ; )
      switch (e) {
        case "ascii":
        case "latin1":
        case "binary":
          return r;
        case "utf8":
        case "utf-8":
        case void 0:
          return J(t).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return 2 * r;
        case "hex":
          return r >>> 1;
        case "base64":
          return Z(t).length;
        default:
          if (n) return J(t).length;
          (e = ("" + e).toLowerCase()), (n = !0);
      }
  }
  function A(t, e, r) {
    var n = !1;
    if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return "";
    if (((void 0 === r || r > this.length) && (r = this.length), r <= 0))
      return "";
    if ((r >>>= 0) <= (e >>>= 0)) return "";
    for (t || (t = "utf8"); ; )
      switch (t) {
        case "hex":
          return x(this, e, r);
        case "utf8":
        case "utf-8":
          return L(this, e, r);
        case "ascii":
          return M(this, e, r);
        case "latin1":
        case "binary":
          return C(this, e, r);
        case "base64":
          return Y(this, e, r);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return O(this, e, r);
        default:
          if (n) throw new TypeError("Unknown encoding: " + t);
          (t = (t + "").toLowerCase()), (n = !0);
      }
  }
  function R(t, e, r) {
    var n = t[e];
    (t[e] = t[r]), (t[r] = n);
  }
  function _(t, e, r, n, i) {
    if (0 === t.length) return -1;
    if (
      ("string" == typeof r
        ? ((n = r), (r = 0))
        : r > 2147483647
        ? (r = 2147483647)
        : r < -2147483648 && (r = -2147483648),
      (r = +r),
      isNaN(r) && (r = i ? 0 : t.length - 1),
      r < 0 && (r = t.length + r),
      r >= t.length)
    ) {
      if (i) return -1;
      r = t.length - 1;
    } else if (r < 0) {
      if (!i) return -1;
      r = 0;
    }
    if (("string" == typeof e && (e = g.from(e, n)), m(e)))
      return 0 === e.length ? -1 : T(t, e, r, n, i);
    if ("number" == typeof e)
      return (
        (e &= 255),
        g.TYPED_ARRAY_SUPPORT &&
        "function" == typeof Uint8Array.prototype.indexOf
          ? i
            ? Uint8Array.prototype.indexOf.call(t, e, r)
            : Uint8Array.prototype.lastIndexOf.call(t, e, r)
          : T(t, [e], r, n, i)
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  function T(t, e, r, n, i) {
    var o,
      s = 1,
      h = t.length,
      u = e.length;
    if (
      void 0 !== n &&
      ("ucs2" === (n = String(n).toLowerCase()) ||
        "ucs-2" === n ||
        "utf16le" === n ||
        "utf-16le" === n)
    ) {
      if (t.length < 2 || e.length < 2) return -1;
      (s = 2), (h /= 2), (u /= 2), (r /= 2);
    }
    function a(t, e) {
      return 1 === s ? t[e] : t.readUInt16BE(e * s);
    }
    if (i) {
      var f = -1;
      for (o = r; o < h; o++)
        if (a(t, o) === a(e, -1 === f ? 0 : o - f)) {
          if ((-1 === f && (f = o), o - f + 1 === u)) return f * s;
        } else -1 !== f && (o -= o - f), (f = -1);
    } else
      for (r + u > h && (r = h - u), o = r; o >= 0; o--) {
        for (var c = !0, l = 0; l < u; l++)
          if (a(t, o + l) !== a(e, l)) {
            c = !1;
            break;
          }
        if (c) return o;
      }
    return -1;
  }
  function S(t, e, r, n) {
    r = Number(r) || 0;
    var i = t.length - r;
    n ? (n = Number(n)) > i && (n = i) : (n = i);
    var o = e.length;
    if (o % 2 != 0) throw new TypeError("Invalid hex string");
    n > o / 2 && (n = o / 2);
    for (var s = 0; s < n; ++s) {
      var h = parseInt(e.substr(2 * s, 2), 16);
      if (isNaN(h)) return s;
      t[r + s] = h;
    }
    return s;
  }
  function I(t, e, r, n) {
    return G(J(e, t.length - r), t, r, n);
  }
  function P(t, e, r, n) {
    return G(
      (function (t) {
        for (var e = [], r = 0; r < t.length; ++r)
          e.push(255 & t.charCodeAt(r));
        return e;
      })(e),
      t,
      r,
      n
    );
  }
  function B(t, e, r, n) {
    return P(t, e, r, n);
  }
  function U(t, e, r, n) {
    return G(Z(e), t, r, n);
  }
  function N(t, e, r, n) {
    return G(
      (function (t, e) {
        for (var r, n, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s)
          (n = (r = t.charCodeAt(s)) >> 8), (i = r % 256), o.push(i), o.push(n);
        return o;
      })(e, t.length - r),
      t,
      r,
      n
    );
  }
  function Y(t, e, r) {
    return 0 === e && r === t.length ? h(t) : h(t.slice(e, r));
  }
  function L(t, e, r) {
    r = Math.min(t.length, r);
    for (var n = [], i = e; i < r; ) {
      var o,
        s,
        h,
        u,
        a = t[i],
        f = null,
        c = a > 239 ? 4 : a > 223 ? 3 : a > 191 ? 2 : 1;
      if (i + c <= r)
        switch (c) {
          case 1:
            a < 128 && (f = a);
            break;
          case 2:
            128 == (192 & (o = t[i + 1])) &&
              (u = ((31 & a) << 6) | (63 & o)) > 127 &&
              (f = u);
            break;
          case 3:
            (o = t[i + 1]),
              (s = t[i + 2]),
              128 == (192 & o) &&
                128 == (192 & s) &&
                (u = ((15 & a) << 12) | ((63 & o) << 6) | (63 & s)) > 2047 &&
                (u < 55296 || u > 57343) &&
                (f = u);
            break;
          case 4:
            (o = t[i + 1]),
              (s = t[i + 2]),
              (h = t[i + 3]),
              128 == (192 & o) &&
                128 == (192 & s) &&
                128 == (192 & h) &&
                (u =
                  ((15 & a) << 18) |
                  ((63 & o) << 12) |
                  ((63 & s) << 6) |
                  (63 & h)) > 65535 &&
                u < 1114112 &&
                (f = u);
        }
      null === f
        ? ((f = 65533), (c = 1))
        : f > 65535 &&
          ((f -= 65536),
          n.push(((f >>> 10) & 1023) | 55296),
          (f = 56320 | (1023 & f))),
        n.push(f),
        (i += c);
    }
    return (function (t) {
      var e = t.length;
      if (e <= D) return String.fromCharCode.apply(String, t);
      var r = "",
        n = 0;
      for (; n < e; )
        r += String.fromCharCode.apply(String, t.slice(n, (n += D)));
      return r;
    })(n);
  }
  (g.TYPED_ARRAY_SUPPORT =
    void 0 === window.TYPED_ARRAY_SUPPORT || window.TYPED_ARRAY_SUPPORT),
    l(),
    (g.poolSize = 8192),
    (g._augment = function (t) {
      return (t.__proto__ = g.prototype), t;
    }),
    (g.from = function (t, e, r) {
      return d(null, t, e, r);
    }),
    g.TYPED_ARRAY_SUPPORT &&
      ((g.prototype.__proto__ = Uint8Array.prototype),
      (g.__proto__ = Uint8Array),
      "undefined" != typeof Symbol && Symbol.species && g[Symbol.species]),
    (g.alloc = function (t, e, r) {
      return (function (t, e, r, n) {
        return (
          y(e),
          e <= 0
            ? p(t, e)
            : void 0 !== r
            ? "string" == typeof n
              ? p(t, e).fill(r, n)
              : p(t, e).fill(r)
            : p(t, e)
        );
      })(null, t, e, r);
    }),
    (g.allocUnsafe = function (t) {
      return w(null, t);
    }),
    (g.allocUnsafeSlow = function (t) {
      return w(null, t);
    }),
    (g.isBuffer = function (t) {
      return (
        null != t &&
        (!!t._isBuffer ||
          K(t) ||
          (function (t) {
            return (
              "function" == typeof t.readFloatLE &&
              "function" == typeof t.slice &&
              K(t.slice(0, 0))
            );
          })(t))
      );
    }),
    (g.compare = function (t, e) {
      if (!m(t) || !m(e)) throw new TypeError("Arguments must be Buffers");
      if (t === e) return 0;
      for (
        var r = t.length, n = e.length, i = 0, o = Math.min(r, n);
        i < o;
        ++i
      )
        if (t[i] !== e[i]) {
          (r = t[i]), (n = e[i]);
          break;
        }
      return r < n ? -1 : n < r ? 1 : 0;
    }),
    (g.isEncoding = function (t) {
      switch (String(t).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }),
    (g.concat = function (t, e) {
      if (!c(t))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === t.length) return g.alloc(0);
      var r;
      if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
      var n = g.allocUnsafe(e),
        i = 0;
      for (r = 0; r < t.length; ++r) {
        var o = t[r];
        if (!m(o))
          throw new TypeError('"list" argument must be an Array of Buffers');
        o.copy(n, i), (i += o.length);
      }
      return n;
    }),
    (g.byteLength = E),
    (g.prototype._isBuffer = !0),
    (g.prototype.swap16 = function () {
      var t = this.length;
      if (t % 2 != 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var e = 0; e < t; e += 2) R(this, e, e + 1);
      return this;
    }),
    (g.prototype.swap32 = function () {
      var t = this.length;
      if (t % 4 != 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var e = 0; e < t; e += 4) R(this, e, e + 3), R(this, e + 1, e + 2);
      return this;
    }),
    (g.prototype.swap64 = function () {
      var t = this.length;
      if (t % 8 != 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var e = 0; e < t; e += 8)
        R(this, e, e + 7),
          R(this, e + 1, e + 6),
          R(this, e + 2, e + 5),
          R(this, e + 3, e + 4);
      return this;
    }),
    (g.prototype.toString = function () {
      var t = 0 | this.length;
      return 0 === t
        ? ""
        : 0 === arguments.length
        ? L(this, 0, t)
        : A.apply(this, arguments);
    }),
    (g.prototype.equals = function (t) {
      if (!m(t)) throw new TypeError("Argument must be a Buffer");
      return this === t || 0 === g.compare(this, t);
    }),
    (g.prototype.inspect = function () {
      var t = "";
      return (
        this.length > 0 &&
          ((t = this.toString("hex", 0, 50).match(/.{2}/g).join(" ")),
          this.length > 50 && (t += " ... ")),
        "<Buffer " + t + ">"
      );
    }),
    (g.prototype.compare = function (t, e, r, n, i) {
      if (!m(t)) throw new TypeError("Argument must be a Buffer");
      if (
        (void 0 === e && (e = 0),
        void 0 === r && (r = t ? t.length : 0),
        void 0 === n && (n = 0),
        void 0 === i && (i = this.length),
        e < 0 || r > t.length || n < 0 || i > this.length)
      )
        throw new RangeError("out of range index");
      if (n >= i && e >= r) return 0;
      if (n >= i) return -1;
      if (e >= r) return 1;
      if (this === t) return 0;
      for (
        var o = (i >>>= 0) - (n >>>= 0),
          s = (r >>>= 0) - (e >>>= 0),
          h = Math.min(o, s),
          u = this.slice(n, i),
          a = t.slice(e, r),
          f = 0;
        f < h;
        ++f
      )
        if (u[f] !== a[f]) {
          (o = u[f]), (s = a[f]);
          break;
        }
      return o < s ? -1 : s < o ? 1 : 0;
    }),
    (g.prototype.includes = function (t, e, r) {
      return -1 !== this.indexOf(t, e, r);
    }),
    (g.prototype.indexOf = function (t, e, r) {
      return _(this, t, e, r, !0);
    }),
    (g.prototype.lastIndexOf = function (t, e, r) {
      return _(this, t, e, r, !1);
    }),
    (g.prototype.write = function (t, e, r, n) {
      if (void 0 === e) (n = "utf8"), (r = this.length), (e = 0);
      else if (void 0 === r && "string" == typeof e)
        (n = e), (r = this.length), (e = 0);
      else {
        if (!isFinite(e))
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        (e |= 0),
          isFinite(r)
            ? ((r |= 0), void 0 === n && (n = "utf8"))
            : ((n = r), (r = void 0));
      }
      var i = this.length - e;
      if (
        ((void 0 === r || r > i) && (r = i),
        (t.length > 0 && (r < 0 || e < 0)) || e > this.length)
      )
        throw new RangeError("Attempt to write outside buffer bounds");
      n || (n = "utf8");
      for (var o = !1; ; )
        switch (n) {
          case "hex":
            return S(this, t, e, r);
          case "utf8":
          case "utf-8":
            return I(this, t, e, r);
          case "ascii":
            return P(this, t, e, r);
          case "latin1":
          case "binary":
            return B(this, t, e, r);
          case "base64":
            return U(this, t, e, r);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return N(this, t, e, r);
          default:
            if (o) throw new TypeError("Unknown encoding: " + n);
            (n = ("" + n).toLowerCase()), (o = !0);
        }
    }),
    (g.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    });
  var D = 4096;
  function M(t, e, r) {
    var n = "";
    r = Math.min(t.length, r);
    for (var i = e; i < r; ++i) n += String.fromCharCode(127 & t[i]);
    return n;
  }
  function C(t, e, r) {
    var n = "";
    r = Math.min(t.length, r);
    for (var i = e; i < r; ++i) n += String.fromCharCode(t[i]);
    return n;
  }
  function x(t, e, r) {
    var n = t.length;
    (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
    for (var i = "", o = e; o < r; ++o) i += W(t[o]);
    return i;
  }
  function O(t, e, r) {
    for (var n = t.slice(e, r), i = "", o = 0; o < n.length; o += 2)
      i += String.fromCharCode(n[o] + 256 * n[o + 1]);
    return i;
  }
  function $(t, e, r) {
    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
    if (t + e > r)
      throw new RangeError("Trying to access beyond buffer length");
  }
  function k(t, e, r, n, i, o) {
    if (!m(t))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (e > i || e < o)
      throw new RangeError('"value" argument is out of bounds');
    if (r + n > t.length) throw new RangeError("Index out of range");
  }
  function j(t, e, r, n) {
    e < 0 && (e = 65535 + e + 1);
    for (var i = 0, o = Math.min(t.length - r, 2); i < o; ++i)
      t[r + i] = (e & (255 << (8 * (n ? i : 1 - i)))) >>> (8 * (n ? i : 1 - i));
  }
  function F(t, e, r, n) {
    e < 0 && (e = 4294967295 + e + 1);
    for (var i = 0, o = Math.min(t.length - r, 4); i < o; ++i)
      t[r + i] = (e >>> (8 * (n ? i : 3 - i))) & 255;
  }
  function H(t, e, r, n, i, o) {
    if (r + n > t.length) throw new RangeError("Index out of range");
    if (r < 0) throw new RangeError("Index out of range");
  }
  function z(t, e, r, n, i) {
    return i || H(t, 0, r, 4), a(t, e, r, n, 23, 4), r + 4;
  }
  function V(t, e, r, n, i) {
    return i || H(t, 0, r, 8), a(t, e, r, n, 52, 8), r + 8;
  }
  (g.prototype.slice = function (t, e) {
    var r,
      n = this.length;
    if (
      ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
      (e = void 0 === e ? n : ~~e) < 0
        ? (e += n) < 0 && (e = 0)
        : e > n && (e = n),
      e < t && (e = t),
      g.TYPED_ARRAY_SUPPORT)
    )
      (r = this.subarray(t, e)).__proto__ = g.prototype;
    else {
      var i = e - t;
      r = new g(i, void 0);
      for (var o = 0; o < i; ++o) r[o] = this[o + t];
    }
    return r;
  }),
    (g.prototype.readUIntLE = function (t, e, r) {
      (t |= 0), (e |= 0), r || $(t, e, this.length);
      for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
        n += this[t + o] * i;
      return n;
    }),
    (g.prototype.readUIntBE = function (t, e, r) {
      (t |= 0), (e |= 0), r || $(t, e, this.length);
      for (var n = this[t + --e], i = 1; e > 0 && (i *= 256); )
        n += this[t + --e] * i;
      return n;
    }),
    (g.prototype.readUInt8 = function (t, e) {
      return e || $(t, 1, this.length), this[t];
    }),
    (g.prototype.readUInt16LE = function (t, e) {
      return e || $(t, 2, this.length), this[t] | (this[t + 1] << 8);
    }),
    (g.prototype.readUInt16BE = function (t, e) {
      return e || $(t, 2, this.length), (this[t] << 8) | this[t + 1];
    }),
    (g.prototype.readUInt32LE = function (t, e) {
      return (
        e || $(t, 4, this.length),
        (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
          16777216 * this[t + 3]
      );
    }),
    (g.prototype.readUInt32BE = function (t, e) {
      return (
        e || $(t, 4, this.length),
        16777216 * this[t] +
          ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
      );
    }),
    (g.prototype.readIntLE = function (t, e, r) {
      (t |= 0), (e |= 0), r || $(t, e, this.length);
      for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
        n += this[t + o] * i;
      return n >= (i *= 128) && (n -= Math.pow(2, 8 * e)), n;
    }),
    (g.prototype.readIntBE = function (t, e, r) {
      (t |= 0), (e |= 0), r || $(t, e, this.length);
      for (var n = e, i = 1, o = this[t + --n]; n > 0 && (i *= 256); )
        o += this[t + --n] * i;
      return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o;
    }),
    (g.prototype.readInt8 = function (t, e) {
      return (
        e || $(t, 1, this.length),
        128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
      );
    }),
    (g.prototype.readInt16LE = function (t, e) {
      e || $(t, 2, this.length);
      var r = this[t] | (this[t + 1] << 8);
      return 32768 & r ? 4294901760 | r : r;
    }),
    (g.prototype.readInt16BE = function (t, e) {
      e || $(t, 2, this.length);
      var r = this[t + 1] | (this[t] << 8);
      return 32768 & r ? 4294901760 | r : r;
    }),
    (g.prototype.readInt32LE = function (t, e) {
      return (
        e || $(t, 4, this.length),
        this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
      );
    }),
    (g.prototype.readInt32BE = function (t, e) {
      return (
        e || $(t, 4, this.length),
        (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
      );
    }),
    (g.prototype.readFloatLE = function (t, e) {
      return e || $(t, 4, this.length), u(this, t, !0, 23, 4);
    }),
    (g.prototype.readFloatBE = function (t, e) {
      return e || $(t, 4, this.length), u(this, t, !1, 23, 4);
    }),
    (g.prototype.readDoubleLE = function (t, e) {
      return e || $(t, 8, this.length), u(this, t, !0, 52, 8);
    }),
    (g.prototype.readDoubleBE = function (t, e) {
      return e || $(t, 8, this.length), u(this, t, !1, 52, 8);
    }),
    (g.prototype.writeUIntLE = function (t, e, r, n) {
      ((t = +t), (e |= 0), (r |= 0), n) ||
        k(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
      var i = 1,
        o = 0;
      for (this[e] = 255 & t; ++o < r && (i *= 256); )
        this[e + o] = (t / i) & 255;
      return e + r;
    }),
    (g.prototype.writeUIntBE = function (t, e, r, n) {
      ((t = +t), (e |= 0), (r |= 0), n) ||
        k(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
      var i = r - 1,
        o = 1;
      for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); )
        this[e + i] = (t / o) & 255;
      return e + r;
    }),
    (g.prototype.writeUInt8 = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || k(this, t, e, 1, 255, 0),
        g.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
        (this[e] = 255 & t),
        e + 1
      );
    }),
    (g.prototype.writeUInt16LE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || k(this, t, e, 2, 65535, 0),
        g.TYPED_ARRAY_SUPPORT
          ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
          : j(this, t, e, !0),
        e + 2
      );
    }),
    (g.prototype.writeUInt16BE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || k(this, t, e, 2, 65535, 0),
        g.TYPED_ARRAY_SUPPORT
          ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
          : j(this, t, e, !1),
        e + 2
      );
    }),
    (g.prototype.writeUInt32LE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || k(this, t, e, 4, 4294967295, 0),
        g.TYPED_ARRAY_SUPPORT
          ? ((this[e + 3] = t >>> 24),
            (this[e + 2] = t >>> 16),
            (this[e + 1] = t >>> 8),
            (this[e] = 255 & t))
          : F(this, t, e, !0),
        e + 4
      );
    }),
    (g.prototype.writeUInt32BE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || k(this, t, e, 4, 4294967295, 0),
        g.TYPED_ARRAY_SUPPORT
          ? ((this[e] = t >>> 24),
            (this[e + 1] = t >>> 16),
            (this[e + 2] = t >>> 8),
            (this[e + 3] = 255 & t))
          : F(this, t, e, !1),
        e + 4
      );
    }),
    (g.prototype.writeIntLE = function (t, e, r, n) {
      if (((t = +t), (e |= 0), !n)) {
        var i = Math.pow(2, 8 * r - 1);
        k(this, t, e, r, i - 1, -i);
      }
      var o = 0,
        s = 1,
        h = 0;
      for (this[e] = 255 & t; ++o < r && (s *= 256); )
        t < 0 && 0 === h && 0 !== this[e + o - 1] && (h = 1),
          (this[e + o] = (((t / s) >> 0) - h) & 255);
      return e + r;
    }),
    (g.prototype.writeIntBE = function (t, e, r, n) {
      if (((t = +t), (e |= 0), !n)) {
        var i = Math.pow(2, 8 * r - 1);
        k(this, t, e, r, i - 1, -i);
      }
      var o = r - 1,
        s = 1,
        h = 0;
      for (this[e + o] = 255 & t; --o >= 0 && (s *= 256); )
        t < 0 && 0 === h && 0 !== this[e + o + 1] && (h = 1),
          (this[e + o] = (((t / s) >> 0) - h) & 255);
      return e + r;
    }),
    (g.prototype.writeInt8 = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || k(this, t, e, 1, 127, -128),
        g.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
        t < 0 && (t = 255 + t + 1),
        (this[e] = 255 & t),
        e + 1
      );
    }),
    (g.prototype.writeInt16LE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || k(this, t, e, 2, 32767, -32768),
        g.TYPED_ARRAY_SUPPORT
          ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
          : j(this, t, e, !0),
        e + 2
      );
    }),
    (g.prototype.writeInt16BE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || k(this, t, e, 2, 32767, -32768),
        g.TYPED_ARRAY_SUPPORT
          ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
          : j(this, t, e, !1),
        e + 2
      );
    }),
    (g.prototype.writeInt32LE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || k(this, t, e, 4, 2147483647, -2147483648),
        g.TYPED_ARRAY_SUPPORT
          ? ((this[e] = 255 & t),
            (this[e + 1] = t >>> 8),
            (this[e + 2] = t >>> 16),
            (this[e + 3] = t >>> 24))
          : F(this, t, e, !0),
        e + 4
      );
    }),
    (g.prototype.writeInt32BE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || k(this, t, e, 4, 2147483647, -2147483648),
        t < 0 && (t = 4294967295 + t + 1),
        g.TYPED_ARRAY_SUPPORT
          ? ((this[e] = t >>> 24),
            (this[e + 1] = t >>> 16),
            (this[e + 2] = t >>> 8),
            (this[e + 3] = 255 & t))
          : F(this, t, e, !1),
        e + 4
      );
    }),
    (g.prototype.writeFloatLE = function (t, e, r) {
      return z(this, t, e, !0, r);
    }),
    (g.prototype.writeFloatBE = function (t, e, r) {
      return z(this, t, e, !1, r);
    }),
    (g.prototype.writeDoubleLE = function (t, e, r) {
      return V(this, t, e, !0, r);
    }),
    (g.prototype.writeDoubleBE = function (t, e, r) {
      return V(this, t, e, !1, r);
    }),
    (g.prototype.copy = function (t, e, r, n) {
      if (
        (r || (r = 0),
        n || 0 === n || (n = this.length),
        e >= t.length && (e = t.length),
        e || (e = 0),
        n > 0 && n < r && (n = r),
        n === r)
      )
        return 0;
      if (0 === t.length || 0 === this.length) return 0;
      if (e < 0) throw new RangeError("targetStart out of bounds");
      if (r < 0 || r >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (n < 0) throw new RangeError("sourceEnd out of bounds");
      n > this.length && (n = this.length),
        t.length - e < n - r && (n = t.length - e + r);
      var i,
        o = n - r;
      if (this === t && r < e && e < n)
        for (i = o - 1; i >= 0; --i) t[i + e] = this[i + r];
      else if (o < 1e3 || !g.TYPED_ARRAY_SUPPORT)
        for (i = 0; i < o; ++i) t[i + e] = this[i + r];
      else Uint8Array.prototype.set.call(t, this.subarray(r, r + o), e);
      return o;
    }),
    (g.prototype.fill = function (t, e, r, n) {
      if ("string" == typeof t) {
        if (
          ("string" == typeof e
            ? ((n = e), (e = 0), (r = this.length))
            : "string" == typeof r && ((n = r), (r = this.length)),
          1 === t.length)
        ) {
          var i = t.charCodeAt(0);
          i < 256 && (t = i);
        }
        if (void 0 !== n && "string" != typeof n)
          throw new TypeError("encoding must be a string");
        if ("string" == typeof n && !g.isEncoding(n))
          throw new TypeError("Unknown encoding: " + n);
      } else "number" == typeof t && (t &= 255);
      if (e < 0 || this.length < e || this.length < r)
        throw new RangeError("Out of range index");
      if (r <= e) return this;
      var o;
      if (
        ((e >>>= 0),
        (r = void 0 === r ? this.length : r >>> 0),
        t || (t = 0),
        "number" == typeof t)
      )
        for (o = e; o < r; ++o) this[o] = t;
      else {
        var s = m(t) ? t : J(new g(t, n).toString()),
          h = s.length;
        for (o = 0; o < r - e; ++o) this[o + e] = s[o % h];
      }
      return this;
    });
  var q = /[^+\/0-9A-Za-z-_]/g;
  function W(t) {
    return t < 16 ? "0" + t.toString(16) : t.toString(16);
  }
  function J(t, e) {
    var r;
    e = e || 1 / 0;
    for (var n = t.length, i = null, o = [], s = 0; s < n; ++s) {
      if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
        if (!i) {
          if (r > 56319) {
            (e -= 3) > -1 && o.push(239, 191, 189);
            continue;
          }
          if (s + 1 === n) {
            (e -= 3) > -1 && o.push(239, 191, 189);
            continue;
          }
          i = r;
          continue;
        }
        if (r < 56320) {
          (e -= 3) > -1 && o.push(239, 191, 189), (i = r);
          continue;
        }
        r = 65536 + (((i - 55296) << 10) | (r - 56320));
      } else i && (e -= 3) > -1 && o.push(239, 191, 189);
      if (((i = null), r < 128)) {
        if ((e -= 1) < 0) break;
        o.push(r);
      } else if (r < 2048) {
        if ((e -= 2) < 0) break;
        o.push((r >> 6) | 192, (63 & r) | 128);
      } else if (r < 65536) {
        if ((e -= 3) < 0) break;
        o.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
      } else {
        if (!(r < 1114112)) throw new Error("Invalid code point");
        if ((e -= 4) < 0) break;
        o.push(
          (r >> 18) | 240,
          ((r >> 12) & 63) | 128,
          ((r >> 6) & 63) | 128,
          (63 & r) | 128
        );
      }
    }
    return o;
  }
  function Z(t) {
    return (function (t) {
      var e, s, h, u, a, f;
      i || o();
      var c = t.length;
      if (c % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      (a = "=" === t[c - 2] ? 2 : "=" === t[c - 1] ? 1 : 0),
        (f = new n((3 * c) / 4 - a)),
        (h = a > 0 ? c - 4 : c);
      var l = 0;
      for (e = 0, s = 0; e < h; e += 4, s += 3)
        (u =
          (r[t.charCodeAt(e)] << 18) |
          (r[t.charCodeAt(e + 1)] << 12) |
          (r[t.charCodeAt(e + 2)] << 6) |
          r[t.charCodeAt(e + 3)]),
          (f[l++] = (u >> 16) & 255),
          (f[l++] = (u >> 8) & 255),
          (f[l++] = 255 & u);
      return (
        2 === a
          ? ((u = (r[t.charCodeAt(e)] << 2) | (r[t.charCodeAt(e + 1)] >> 4)),
            (f[l++] = 255 & u))
          : 1 === a &&
            ((u =
              (r[t.charCodeAt(e)] << 10) |
              (r[t.charCodeAt(e + 1)] << 4) |
              (r[t.charCodeAt(e + 2)] >> 2)),
            (f[l++] = (u >> 8) & 255),
            (f[l++] = 255 & u)),
        f
      );
    })(
      (function (t) {
        if (
          (t = (function (t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
          })(t).replace(q, "")).length < 2
        )
          return "";
        for (; t.length % 4 != 0; ) t += "=";
        return t;
      })(t)
    );
  }
  function G(t, e, r, n) {
    for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i)
      e[i + r] = t[i];
    return i;
  }
  function K(t) {
    return (
      !!t.constructor &&
      "function" == typeof t.constructor.isBuffer &&
      t.constructor.isBuffer(t)
    );
  }
  function Q() {
    throw new Error("setTimeout has not been defined");
  }
  function X() {
    throw new Error("clearTimeout has not been defined");
  }
  var tt = Q,
    et = X;
  function rt(t) {
    if (tt === setTimeout) return setTimeout(t, 0);
    if ((tt === Q || !tt) && setTimeout)
      return (tt = setTimeout), setTimeout(t, 0);
    try {
      return tt(t, 0);
    } catch (e) {
      try {
        return tt.call(null, t, 0);
      } catch (e) {
        return tt.call(this, t, 0);
      }
    }
  }
  "function" == typeof window.setTimeout && (tt = setTimeout),
    "function" == typeof window.clearTimeout && (et = clearTimeout);
  var nt,
    it = [],
    ot = !1,
    st = -1;
  function ht() {
    ot &&
      nt &&
      ((ot = !1),
      nt.length ? (it = nt.concat(it)) : (st = -1),
      it.length && ut());
  }
  function ut() {
    if (!ot) {
      var t = rt(ht);
      ot = !0;
      for (var e = it.length; e; ) {
        for (nt = it, it = []; ++st < e; ) nt && nt[st].run();
        (st = -1), (e = it.length);
      }
      (nt = null),
        (ot = !1),
        (function (t) {
          if (et === clearTimeout) return clearTimeout(t);
          if ((et === X || !et) && clearTimeout)
            return (et = clearTimeout), clearTimeout(t);
          try {
            et(t);
          } catch (e) {
            try {
              return et.call(null, t);
            } catch (e) {
              return et.call(this, t);
            }
          }
        })(t);
    }
  }
  function at(t, e) {
    (this.fun = t), (this.array = e);
  }
  at.prototype.run = function () {
    this.fun.apply(null, this.array);
  };
  function ft() {}
  var ct = ft,
    lt = ft,
    pt = ft,
    gt = ft,
    dt = ft,
    yt = ft,
    wt = ft;
  var vt = window.performance || {},
    bt =
      vt.now ||
      vt.mozNow ||
      vt.msNow ||
      vt.oNow ||
      vt.webkitNow ||
      function () {
        return new Date().getTime();
      };
  var mt = new Date();
  var Et = {
    nextTick: function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
      it.push(new at(t, e)), 1 !== it.length || ot || rt(ut);
    },
    title: "browser",
    browser: !0,
    env: {},
    argv: [],
    version: "",
    versions: {},
    on: ct,
    addListener: lt,
    once: pt,
    off: gt,
    removeListener: dt,
    removeAllListeners: yt,
    emit: wt,
    binding: function (t) {
      throw new Error("process.binding is not supported");
    },
    cwd: function () {
      return "/";
    },
    chdir: function (t) {
      throw new Error("process.chdir is not supported");
    },
    umask: function () {
      return 0;
    },
    hrtime: function (t) {
      var e = 0.001 * bt.call(vt),
        r = Math.floor(e),
        n = Math.floor((e % 1) * 1e9);
      return t && ((r -= t[0]), (n -= t[1]) < 0 && (r--, (n += 1e9))), [r, n];
    },
    platform: "browser",
    release: {},
    config: {},
    uptime: function () {
      return (new Date() - mt) / 1e3;
    },
  };
  const At = (t) =>
      "bigint" == typeof t ||
      (!Number.isNaN(Number(t)) && Math.floor(Number(t)) === t),
    Rt = (t) => "bigint" == typeof t || (t >= 0 && Number.isSafeInteger(t));
  function _t(t, e) {
    if (0 === e.length) return t;
    let r;
    const n = [...t];
    for (let t = n.length - 1, i = 0, o = 0; t > 0; t--, i++) {
      (i %= e.length), (o += r = e[i].codePointAt(0));
      const s = (r + i + o) % t,
        h = n[t],
        u = n[s];
      (n[s] = h), (n[t] = u);
    }
    return n;
  }
  const Tt = (t, e) =>
      t.reduce((r, n) => {
        const i = e.indexOf(n);
        if (-1 === i)
          throw new Error(
            `The provided ID (${t.join(
              ""
            )}) is invalid, as it contains characters that do not exist in the alphabet (${e.join(
              ""
            )})`
          );
        if ("bigint" == typeof r) return r * BigInt(e.length) + BigInt(i);
        const o = r * e.length + i;
        if (Number.isSafeInteger(o)) return o;
        if ("function" == typeof BigInt)
          return BigInt(r) * BigInt(e.length) + BigInt(i);
        throw new Error(
          "Unable to decode the provided string, due to lack of support for BigInt numbers in the current environment"
        );
      }, 0),
    St = /^\+?\d+$/,
    It = (t) =>
      new RegExp(
        t
          .map((t) => Pt(t))
          .sort((t, e) => e.length - t.length)
          .join("|")
      ),
    Pt = (t) => t.replace(/[\s#$()*+,.?[\\\]^{|}-]/g, "\\$&");
  class Bt {
    constructor(
      t = "",
      e = 0,
      r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      n = "cfhistuCFHISTU"
    ) {
      if (((this.minLength = e), "number" != typeof e))
        throw new TypeError(
          `Hashids: Provided 'minLength' has to be a number (is ${typeof e})`
        );
      if ("string" != typeof t)
        throw new TypeError(
          `Hashids: Provided 'salt' has to be a string (is ${typeof t})`
        );
      if ("string" != typeof r)
        throw new TypeError(
          `Hashids: Provided alphabet has to be a string (is ${typeof r})`
        );
      const i = Array.from(t),
        o = Array.from(r),
        s = Array.from(n);
      this.salt = i;
      const h = [...new Set(o)];
      var u;
      if (h.length < 16)
        throw new Error(
          `Hashids: alphabet must contain at least 16 unique characters, provided: ${h.join(
            ""
          )}`
        );
      this.alphabet = ((u = s), h.filter((t) => !u.includes(t)));
      const a = ((t, e) => t.filter((t) => e.includes(t)))(s, h);
      let f, c;
      (this.seps = _t(a, i)),
        (0 === this.seps.length ||
          this.alphabet.length / this.seps.length > 3.5) &&
          ((f = Math.ceil(this.alphabet.length / 3.5)),
          f > this.seps.length &&
            ((c = f - this.seps.length),
            this.seps.push(...this.alphabet.slice(0, c)),
            (this.alphabet = this.alphabet.slice(c)))),
        (this.alphabet = _t(this.alphabet, i));
      const l = Math.ceil(this.alphabet.length / 12);
      this.alphabet.length < 3
        ? ((this.guards = this.seps.slice(0, l)),
          (this.seps = this.seps.slice(l)))
        : ((this.guards = this.alphabet.slice(0, l)),
          (this.alphabet = this.alphabet.slice(l))),
        (this.guardsRegExp = It(this.guards)),
        (this.sepsRegExp = It(this.seps)),
        (this.allowedCharsRegExp = ((t) =>
          new RegExp(
            `^[${t
              .map((t) => Pt(t))
              .sort((t, e) => e.length - t.length)
              .join("")}]+$`
          ))([...this.alphabet, ...this.guards, ...this.seps]));
    }
    encode(t, ...e) {
      let r = Array.isArray(t) ? t : [...(null != t ? [t] : []), ...e];
      return 0 === r.length
        ? ""
        : (r.every(At) ||
            (r = r.map((t) => {
              return "bigint" == typeof t || "number" == typeof t
                ? t
                : ((e = String(t)),
                  St.test(e) ? Number.parseInt(e, 10) : Number.NaN);
              var e;
            })),
          r.every(Rt) ? this._encode(r).join("") : "");
    }
    decode(t) {
      return t && "string" == typeof t && 0 !== t.length ? this._decode(t) : [];
    }
    encodeHex(t) {
      let e = t;
      switch (typeof e) {
        case "bigint":
          e = e.toString(16);
          break;
        case "string":
          if (!/^[\dA-Fa-f]+$/.test(e)) return "";
          break;
        default:
          throw new Error(
            `Hashids: The provided value is neither a string, nor a BigInt (got: ${typeof e})`
          );
      }
      const r =
        ((n = e),
        (i = 12),
        (o = (t) => Number.parseInt(`1${t}`, 16)),
        Array.from({ length: Math.ceil(n.length / i) }, (t, e) =>
          o(n.slice(e * i, (e + 1) * i))
        ));
      var n, i, o;
      return this.encode(r);
    }
    decodeHex(t) {
      return this.decode(t)
        .map((t) => t.toString(16).slice(1))
        .join("");
    }
    isValidId(t) {
      return this.allowedCharsRegExp.test(t);
    }
    _encode(t) {
      let { alphabet: e } = this;
      const r = t.reduce(
        (t, e, r) =>
          t +
          ("bigint" == typeof e ? Number(e % BigInt(r + 100)) : e % (r + 100)),
        0
      );
      let n = [e[r % e.length]];
      const i = [...n],
        { seps: o } = this,
        { guards: s } = this;
      if (
        (t.forEach((r, s) => {
          const h = i.concat(this.salt, e);
          e = _t(e, h);
          const u = ((t, e) => {
            const r = [];
            let n = t;
            if ("bigint" == typeof n) {
              const t = BigInt(e.length);
              do {
                r.unshift(e[Number(n % t)]), (n /= t);
              } while (n > BigInt(0));
            } else
              do {
                r.unshift(e[n % e.length]), (n = Math.floor(n / e.length));
              } while (n > 0);
            return r;
          })(r, e);
          if ((n.push(...u), s + 1 < t.length)) {
            const t = u[0].codePointAt(0) + s,
              e = "bigint" == typeof r ? Number(r % BigInt(t)) : r % t;
            n.push(o[e % o.length]);
          }
        }),
        n.length < this.minLength)
      ) {
        const t = (r + n[0].codePointAt(0)) % s.length;
        if ((n.unshift(s[t]), n.length < this.minLength)) {
          const t = (r + n[2].codePointAt(0)) % s.length;
          n.push(s[t]);
        }
      }
      const h = Math.floor(e.length / 2);
      for (; n.length < this.minLength; ) {
        (e = _t(e, e)), n.unshift(...e.slice(h)), n.push(...e.slice(0, h));
        const t = n.length - this.minLength;
        if (t > 0) {
          const e = t / 2;
          n = n.slice(e, e + this.minLength);
        }
      }
      return n;
    }
    _decode(t) {
      if (!this.isValidId(t))
        throw new Error(
          `The provided ID (${t}) is invalid, as it contains characters that do not exist in the alphabet (${this.guards.join(
            ""
          )}${this.seps.join("")}${this.alphabet.join("")})`
        );
      const e = t.split(this.guardsRegExp),
        r = e[3 === e.length || 2 === e.length ? 1 : 0];
      if (0 === r.length) return [];
      const n = r[Symbol.iterator]().next().value,
        i = r.slice(n.length).split(this.sepsRegExp);
      let o = this.alphabet;
      const s = [];
      for (const t of i) {
        const e = _t(o, [n, ...this.salt, ...o].slice(0, o.length));
        s.push(Tt(Array.from(t), e)), (o = e);
      }
      return this._encode(s).join("") !== t ? [] : s;
    }
  }
  class Ut extends Error {
    constructor(t) {
      super(`Wrong id ${t}`);
    }
  }
  class Nt {
    static config(t) {
      const e = t || Nt.readConfig();
      myConf = { ...e };
    }
    static encode = (t, e) => {
      const r = myConf.innerSalts[myConf.innerVersion],
        n = new Bt(`${t}.${r}`),
        i = [myConf.innerVersion, ...g.from(n.encode(e))];
      return `${t}_${new Bt(myConf.sharedSalt, 24).encode(i)}`;
    };
    static decode = (t, e) => {
      try {
        const [r, n] = t.split("_");
        if (e && r !== e) return 0;
        const i = new Bt(myConf.sharedSalt, 24),
          [o, ...s] = i.decode(n),
          h = myConf.innerSalts[o];
        return new Bt(`${r}.${h}`).decode(g.from(s).toString())[0];
      } catch (e) {
        throw (console.error(e), new Ut(t));
      }
    };
    static readConfig = () => {
      const t = ["SIDS_SHARED_SALT", "SIDS_INNER_SALTS", "SIDS_INNER_VERSION"];
      for (const e of t)
        if (!Et.env[e]) throw new Error(`process.env.${e} must be set.`);
      return {
        sharedSalt: Et.env.SIDS_SHARED_SALT,
        innerSalts: Et.env.SIDS_INNER_SALTS.split(","),
        innerVersion: Number.parseInt(Et.env.SIDS_INNER_VERSION, 10),
      };
    };
  }
  const Yt = (t) => t;
  return (
    (t.SecureIds = Nt),
    (t.SecuredIdsStaticInterface = Yt),
    (t.WrongIdError = Ut),
    Object.defineProperty(t, "__esModule", { value: !0 }),
    t
  );
})({})).SecureIds;
