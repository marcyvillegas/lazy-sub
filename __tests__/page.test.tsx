import Animation from '@/modules/animation'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Page', () => {
  it('renders a heading', () => {
    render(<Animation />)

    const heading = screen.getByRole('div')

    // add comment for testing
    expect(heading).toBeInTheDocument()
  })
})
