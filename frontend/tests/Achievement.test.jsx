import React from 'react';
import { render, screen } from '@testing-library/react';
import Achievement from '../src/Achievementss/Achievement';

test('should render achivements page', () => {
  render(<Achievement/>);
});
