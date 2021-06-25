import { formatDate } from '../date-utils'

describe('formatDate', () => {
    test('Formats iso string to MMMM DD, YYYY format (by default)', () => {
        const formattedDate = formatDate('2021-06-25')
        expect(formattedDate).toBe('June 25, 2021')
    })

    test('Formats date object to MMMM DD, YYYY format (by default)', () => {
        const formattedDate = formatDate(new Date('2021-06-25'))
        expect(formattedDate).toBe('June 25, 2021')
    })
})

describe('getDayOfYearIndex', () => {
    test('', () => {
        //
    })
})

describe('getDayOfWeekLong', () => {
    test('', () => {
        //
    })
})
