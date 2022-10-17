import { render } from '@testing-library/react';

import Cell from './cell';

describe('Cell', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Cell />);
        expect(baseElement).toBeTruthy();
    });
});
