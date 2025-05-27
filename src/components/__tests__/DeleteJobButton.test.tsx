import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteJobButton from '../jobs/DeleteJobButton';
import 'whatwg-fetch';


jest.mock('next/navigation', () => {
  const refresh = jest.fn();
  return {
    useRouter: () => ({
      refresh,
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    }),
    __esModule: true,
    __mockedRefresh: refresh,
  };
});

beforeEach(() => {
  window.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  ) as jest.Mock;

  window.confirm = jest.fn(() => true);


  const { __mockedRefresh } = require('next/navigation');
  __mockedRefresh.mockClear();
});

describe('DeleteJobButton', () => {
  it('calls confirm and router.refresh when Delete is clicked', async () => {
    render(<DeleteJobButton jobId="1" jobTitle="Frontend Developer" />);
    const button = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(button);

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete "Frontend Developer"?'
    );
    const { __mockedRefresh } = require('next/navigation');
    await waitFor(() => {
      expect(__mockedRefresh).toHaveBeenCalled();
    });
  });
});