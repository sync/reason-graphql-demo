import React from 'react';
import { render } from '../../utils/testUtils';
import Header from '../Header';

describe('Header', () => {
  it('renders a title and 2 links', () => {
    const { getByText } = render(<Header />);

    expect(getByText('Reddit')).toBeTruthy();
    expect(getByText('Home')).toBeTruthy();
  });
});
