import React from 'react';
import {render, screen} from '@testing-library/react';
import ReviewsList from './reviews-list';

const reviews = [
  {
    comment:
      'Good location, friendly owners, quiet place.',
    date: '2020-04-04T14:14:56.569Z',
    id: 1,
    rating: 5,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 1,
      isPro: true,
      name: 'Tom Tailor',
    },
  },
  {
    comment:
      'Not very clean, loud street, small bathroom.',
    date: '2021-02-02T12:12:56.569Z',
    id: 2,
    rating: 2,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 2,
      isPro: false,
      name: 'Ann Potter',
    },
  },
];

describe('Component: ReviewsList', () => {

  it('should render correctly', () => {
    render(<ReviewsList reviews={reviews}/>);

    expect(screen.getByText('Good location, friendly owners, quiet place.')).toBeInTheDocument();
    expect(screen.getByText('Not very clean, loud street, small bathroom.')).toBeInTheDocument();
    expect(screen.getByText('Ann Potter')).toBeInTheDocument();
    expect(screen.getByText('Tom Tailor')).toBeInTheDocument();
  });
});
