import {render} from '@testing-library/react';
import React from 'react';
import Loading from './loading';

describe('Component: Loading', () => {
  it('should render correctly', () => {
    const {container} = render(<Loading />);
    expect(container.querySelector('.spinner')).toBeInTheDocument();
  });
});
