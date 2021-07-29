import React from 'react';
import {render, screen} from '@testing-library/react';
import Review from './review';

const mockReview = {
  comment:
    'Good location, friendly owners, quiet place.',
  date: '2020-04-04T14:14:56.569Z',
  id: 1,
  rating: 5,
  user: {
    avatarUrl: 'img/avatar-max.jpg',
    id: 1,
    isPro: true,
    name: 'Tom Potter',
  },
};

describe('Component: Review', () => {

  it('should render correctly', () => {
    render(<Review review={mockReview}/>);

    expect(screen.getByText('Good location, friendly owners, quiet place.')).toBeInTheDocument();
    expect(screen.getByText('Tom Potter')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockReview.user.avatarUrl);
  });
});
