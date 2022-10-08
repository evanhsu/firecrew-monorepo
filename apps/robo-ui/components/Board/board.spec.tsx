import { render } from '@testing-library/react';

import Board from './board';

describe('Board', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Board />);
    expect(baseElement).toBeTruthy();
  });
});
