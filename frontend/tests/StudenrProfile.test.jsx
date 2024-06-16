import React from 'react';
import { render, screen } from '@testing-library/react';
import StudentProfile from '../src/Student/StudentProfile';

const localStoragedata = {
  getItem: jest.fn().mockReturnValue(JSON.stringify({
    firstName: 'Mohamed Infas',
    lastName: 'Nizam',
    dateOfBirth: '2001-01-16T00:00:00.000+00:00',
    email: 'infas1002@gmail.com',
    regNo: 'EG/2020/4327',
    nicNo: '200102102893',
    achievements: 'Something',
    createdAt: '2024-03-13T06:57:54.525+00:00'
  })),
};
global.localStorage = localStoragedata;

describe('StudentProfile component', () => {
  test('renders user profile correctly', () => {
    render(<StudentProfile />);
  });
});
