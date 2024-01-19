import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import Page from '@app/en/page'

describe('En', () => {
    it('check the /en page', () => {
        render(<Page/>)
        expect('Welcome to GradePal').toBeInTheDocument()
    })
})