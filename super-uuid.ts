export default class UUID {
    private buffer = [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ]

    constructor(x: string | ArrayBuffer) {
        if (typeof x === 'string') {
            this.buffer = fromString(x)
        }
    }

    get bytesLE() {
        const [a, b, c, d, e] = this.segments

        return [
            ...a.reverse(),
            ...b.reverse(),
            ...c.reverse(),
            ...d,
            ...e
        ]
    }

    get bytesBE() {
        return this.buffer
    }

    toString() {
        return this.segments.reduce(function (acc, x, i) {
            const segment = intsToHexString(x)
            if (i === 0) {
                return segment
            } else {
                return `${acc}-${segment}`
            }
        }, '')
    }

    get segments() {
        const a = this.buffer.slice(0, 4)
        const b = this.buffer.slice(4, 6)
        const c = this.buffer.slice(6, 8)
        const d = this.buffer.slice(8, 10)
        const e = this.buffer.slice(10, 16)
        return [a, b, c, d, e]
    }
}


function fromString(uid: string): number[] {
    const matches = uid.match(/[0-9a-fA-F]{2}/g) || []
    if (matches.length !== 16) {
        throw new TypeError('String is not a valid UUID')
    }
    return matches.map(x => parseInt(x, 16))
}

function intsToHexString(numbers: number[]): string {
    return numbers.reduce((ac, x) => {
        const str = x <= 16 ? `0${x.toString(16)}` : x.toString(16);
        return `${ac}${str}`
    }, '')
}