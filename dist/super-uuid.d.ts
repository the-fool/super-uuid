export default class UUID {
    private buffer;
    constructor(x: string | ArrayBuffer);
    readonly bytesLE: number[];
    readonly bytesBE: number[];
    toString(): string;
    readonly segments: number[][];
}
