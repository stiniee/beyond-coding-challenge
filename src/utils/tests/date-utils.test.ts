import { formatDate, getDayOfYearIndex } from '../date-utils'

describe('formatDate util', () => {
    test('Format iso string to default format MMMM DD, YYYY', () => {
        const formattedDate = formatDate('2021-06-25')
        expect(formattedDate).toBe('June 25, 2021')
    })

    test('Format iso string to specified format', () => {
        let formattedDate = formatDate('2021-06-25', 'MM/DD/YYYY')
        expect(formattedDate).toBe('06/25/2021')

        formattedDate = formatDate('2021-06-25', 'YYYY MMM Do')
        expect(formattedDate).toBe('2021 Jun 25th')
    })

    test('Format date object to default format MMMM DD, YYYY', () => {
        const formattedDate = formatDate(new Date('2021-06-25'))
        expect(formattedDate).toBe('June 25, 2021')
    })

    test('Format date object to specified format', () => {
        let formattedDate = formatDate(new Date('2021-06-25'), 'MM/DD/YYYY')
        expect(formattedDate).toBe('06/25/2021')

        formattedDate = formatDate(new Date('2021-06-25'), 'YYYY MMM Do')
        expect(formattedDate).toBe('2021 Jun 25th')
    })
})

describe('getDayOfYearIndex util', () => {
    test.only('Get the day of year index from iso string', () => {
        let index = getDayOfYearIndex('2021-01-01')
        expect(index).toBe(0)

        index = getDayOfYearIndex('2021-12-17')
        expect(index).toBe(350)

        index = getDayOfYearIndex('2021-12-31')
        expect(index).toBe(364)
    })

    test('Get the day of year index from date object', () => {
        let index = getDayOfYearIndex(new Date('2021-01-01'))
        expect(index).toBe(0)

        index = getDayOfYearIndex(new Date('2021-12-17'))
        expect(index).toBe(350)

        index = getDayOfYearIndex(new Date('2021-12-31'))
        expect(index).toBe(364)
    })
})
