import { render } from '@testing-library/react';

import DeleteZone from './delete-zone';

describe('DeleteZone', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DeleteZone />);
        expect(baseElement).toBeTruthy();
    });
});
