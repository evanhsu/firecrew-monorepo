import { render } from '@testing-library/react';

import AddTileForm from './add-tile-form';

describe('AddTileForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddTileForm />);
    expect(baseElement).toBeTruthy();
  });
});
