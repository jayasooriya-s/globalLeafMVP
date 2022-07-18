// __tests__/index.test.jsx

import { render } from '@testing-library/react'
import Home, { getBranchData } from '../pages/index'
import formatNumber from '../helper/formatNumber'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'

describe('Home', () => {

    it('renders a app', () => {
        render(<Home />)
    }),

        it('formatting Sale Amount with currency', () => {
            expect(formatNumber(465)).toBe('465.00 $')
        }),
        it('formatting sale with currency and comma in 1000 s', () => {
            expect(formatNumber(1000)).toBe('1,000.00 $')
        }),

        test('Check in branch data API fetch', async () => {
            expect.assertions(0);
            try {
                await getBranchData('1');
            } catch (e) {
                expect(e).toMatch('error');
            }
        })

})
