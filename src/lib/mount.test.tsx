import { describe, expect, it } from 'vitest';
import { waitFor } from '@testing-library/react';
import { mountApp } from '@/lib/mount';

describe('mountApp', () => {
  it('mounts the app into #root', async () => {
    document.body.innerHTML = '<div id="root"></div>';
    mountApp(() => <p>mounted app</p>);
    await waitFor(() => expect(document.getElementById('root')).toHaveTextContent('mounted app'));
  });

  it('is a no-op when #root is missing', () => {
    document.body.innerHTML = '';
    expect(() => mountApp(() => <p>x</p>)).not.toThrow();
  });
});
