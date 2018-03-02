"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UUID = /** @class */ (function () {
    function UUID(x) {
        this.buffer = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        ];
        if (typeof x === 'string') {
            this.buffer = fromString(x);
        }
    }
    Object.defineProperty(UUID.prototype, "bytesLE", {
        get: function () {
            var _a = this.segments, a = _a[0], b = _a[1], c = _a[2], d = _a[3], e = _a[4];
            return a.reverse().concat(b.reverse(), c.reverse(), d, e);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UUID.prototype, "bytesBE", {
        get: function () {
            return this.buffer;
        },
        enumerable: true,
        configurable: true
    });
    UUID.prototype.toString = function () {
        return this.segments.reduce(function (acc, x, i) {
            var segment = intsToHexString(x);
            if (i === 0) {
                return segment;
            }
            else {
                return acc + "-" + segment;
            }
        }, '');
    };
    Object.defineProperty(UUID.prototype, "segments", {
        get: function () {
            var a = this.buffer.slice(0, 4);
            var b = this.buffer.slice(4, 6);
            var c = this.buffer.slice(6, 8);
            var d = this.buffer.slice(8, 10);
            var e = this.buffer.slice(10, 16);
            return [a, b, c, d, e];
        },
        enumerable: true,
        configurable: true
    });
    return UUID;
}());
exports.default = UUID;
function fromString(uid) {
    var matches = uid.match(/[0-9a-fA-F]{2}/g) || [];
    if (matches.length !== 16) {
        throw new TypeError('String is not a valid UUID');
    }
    return matches.map(function (x) { return parseInt(x, 16); });
}
function intsToHexString(numbers) {
    return numbers.reduce(function (ac, x) {
        var str = x <= 16 ? "0" + x.toString(16) : x.toString(16);
        return "" + ac + str;
    }, '');
}
