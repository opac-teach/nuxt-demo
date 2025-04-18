import { mount } from '@vue/test-utils';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useCoin } from '@/stores/coin';

// Créer un composant minimal pour tester uniquement la partie affichage des memecoins
const MemecoinsListing = {
  template: `
    <div>
      <h2 v-if="coinStore.loading">Loading Coins</h2>
      <div v-else-if="!coinStore.error" v-for="coin in coinStore.coins" :key="coin.id" class="mt-[50px] flex flex-col">
        <img class="h-[200px] w-[200px]" :src="coin.logoUrl" alt="Coin logo" />
        <p>{{ coin.name }} : {{ coin.symbol }}</p>
      </div>
      <div v-else>
        <p>{{ coinStore.error }}</p>
      </div>
    </div>
  `,
  setup() {
    const coinStore = useCoin();
    return { coinStore };
  }
};

describe('Memecoins Listing Component', () => {
  test('shows loading state', async () => {
    const wrapper = mount(MemecoinsListing, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              coin: {
                loading: true,
                error: '',
                coins: []
              }
            }
          })
        ]
      }
    });
    
    expect(wrapper.text()).toContain('Loading Coins');
  });
  
  test('displays coins when loaded', async () => {
    const mockCoins = [
      { id: '1', name: 'TestCoin', symbol: 'TC', description: 'Test', logoUrl: 'https://example.com/logo.png' },
      { id: '2', name: 'AnotherCoin', symbol: 'AC', description: 'Another test', logoUrl: 'https://example.com/logo2.png' }
    ];
    
    const wrapper = mount(MemecoinsListing, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              coin: {
                loading: false,
                error: '',
                coins: mockCoins
              }
            }
          })
        ]
      }
    });
    
    expect(wrapper.text()).toContain('TestCoin : TC');
    expect(wrapper.text()).toContain('AnotherCoin : AC');
    expect(wrapper.findAll('img').length).toBe(2);
  });
  
  test('shows error when there is an error', async () => {
    const wrapper = mount(MemecoinsListing, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              coin: {
                loading: false,
                error: 'Failed to load coins',
                coins: []
              }
            }
          })
        ]
      }
    });
    
    expect(wrapper.text()).toContain('Failed to load coins');
  });
});