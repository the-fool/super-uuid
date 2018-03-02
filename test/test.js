const expect = require('chai').expect
const UUID = require('../dist/super-uuid').default

const uuidString = '00010203-0405-0607-0809-0a0b0c0d0e0f'
const uuidStringNoDashes = uuidString.replace(/-/g, '')

describe('Super-UUID', () => {
    it('Should be exported as a function', () => {
        const t = typeof UUID
        expect(t).to.eq('function')
    })

    describe('functionality', () => {
        it('should contruct from a string with dashes', () => {
            const u = new UUID(uuidString)
            expect(u.bytesBE.length).to.eq(16)
            expect(u.bytesBE[1]).to.eq(1)
        })

        it('should contruct from a string without dashes', () => {
            const u = new UUID(uuidStringNoDashes)
            expect(u.bytesBE.length).to.eq(16)
            expect(u.bytesBE[1]).to.eq(1)
        })

        it('should throw with invalid strings', () => {
            expect(() => new UUID('')).to.throw()
            expect(() => new UUID('abc')).to.throw()
            expect(() => new UUID('xxxxxxxx-xxxx-xxxx-xxxx-0x0x0x0x0x0x')).to.throw()
        })

        it('should do big endia correctly', () => {
            const u = new UUID(uuidString)
            for (let i = 0; i < 16; i++) {
                expect(u.bytesBE[i]).to.eq(i)
            }
        })

        it('should do little endian correctly', () => {
            const u = new UUID(uuidString)
            expect(u.bytesLE[0]).to.eq(3)
            expect(u.bytesLE[1]).to.eq(2)
            expect(u.bytesLE[2]).to.eq(1)
            expect(u.bytesLE[3]).to.eq(0)

            expect(u.bytesLE[4]).to.eq(5)
            expect(u.bytesLE[5]).to.eq(4)

            expect(u.bytesLE[6]).to.eq(7)
            expect(u.bytesLE[7]).to.eq(6)

            expect(u.bytesLE[8]).to.eq(8)
            expect(u.bytesLE[9]).to.eq(9)

            expect(u.bytesLE[10]).to.eq(10)
            expect(u.bytesLE[11]).to.eq(11)
            expect(u.bytesLE[12]).to.eq(12)
            expect(u.bytesLE[13]).to.eq(13)
            expect(u.bytesLE[14]).to.eq(14)
            expect(u.bytesLE[15]).to.eq(15)
        })
    })

    it('should print out a nice string', () => {
        const u = new UUID(uuidString)
        expect(u.toString()).to.eq(uuidString)

        const u2 = new UUID(uuidStringNoDashes)
        expect(u2.toString()).to.eq(uuidString)
    })
})



