import React from 'react';
import {render, screen} from '@testing-library/react';
import ReviewRating from './review-rating';

describe('Component: ReviewRating', () => {
  it('should render correctly', () => {
    const onFieldChange = jest.fn();
    const isDisabled = true;

    render(<ReviewRating onFieldChange={onFieldChange} isDisabled={isDisabled} />);

    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
    expect(screen.getByDisplayValue('4')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });
});
