import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import Page from '@app/page'

describe('Home', () => {
    it('check the homepage', () => {
        render(<Page/>)
        expect('Welcome to GradePal').toBeInTheDocument()
    })
})