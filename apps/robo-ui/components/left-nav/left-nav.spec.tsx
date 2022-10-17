import { render } from '@testing-library/react';

import LeftNav from './left-nav';

describe('LeftNav', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<LeftNav />);
        expect(baseElement).toBeTruthy();
    });
});
