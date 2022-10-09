import { render } from '@testing-library/react';

import HeaderRow from './header-row';

describe('HeaderRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeaderRow />);
    expect(baseElement).toBeTruthy();
  });
});
