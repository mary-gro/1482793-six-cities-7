import React from 'react';
import {render} from '@testing-library/react';
import EmptyOffersList from './empty-offers-list';

const city = 'Amsterdam';

describe('Component: EmptyOffersList', () => {
  it('should render correctly', () => {
    const {getByText} = render(<EmptyOffersList activeCity={city} />);

    expect(getByText('No places to stay available')).toBeInTheDocument();
    expect(getByText(`We could not find any property available at the moment in ${city}`)).toBeInTheDocument();
  });
});
