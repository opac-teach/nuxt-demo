import { describe, test, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCoin } from '@/stores/coin';

// Mock fetch
global.fetch = vi.fn();

describe('Coin Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });
  
  test('getCoins updates coins state', async () => {
    const mockCoins = [
      { id: '1', name: 'TestCoin', symbol: 'TC', description: 'Test', logoUrl: 'https://example.com/logo.png' }
    ];
    
    // Mock the fetch implementation
    vi.mocked(fetch).mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCoins)
      } as Response)
    );
    
    const store = useCoin();
    await store.getCoins();
    
    expect(store.coins).toEqual(mockCoins);
    expect(store.loading).toBe(false);
    expect(store.error).toBe('');
  });
  
  test('createCoin calls the API with correct data', async () => {
    const testCoin = {
      name: 'TestCoin',
      symbol: 'TC',
      description: 'Test description',
      logoUrl: 'https://example.com/logo.png'
    };
    
    vi.mocked(fetch).mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'success' })
      } as Response)
    );
    
    const store = useCoin();
    
    // Mock getCoins to prevent additional fetch calls
    store.getCoins = vi.fn();
    
    await store.createCoin(testCoin);
    
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('create-memecoin'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(testCoin)
      })
    );
    expect(store.getCoins).toHaveBeenCalledTimes(1);
  });
});