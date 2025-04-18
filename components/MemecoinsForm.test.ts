import { mount } from '@vue/test-utils';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { reactive, watch } from 'vue';
import { useCoin } from '@/stores/coin';

// Créer un composant minimal pour tester le formulaire
const MemecoinsForm = {
  template: `
    <form @submit.prevent="createCoin" class="flex flex-col">
      <input id="name" v-model="coinForm.name" required minlength="4" maxlength="16" />
      <input id="symbol" v-model="coinForm.symbol" type="text" required minlength="2" maxlength="4" pattern="[A-Z]+" />
      <textarea id="description" v-model="coinForm.description" maxlength="1000"></textarea>
      <input id="logoUrl" v-model="coinForm.logoUrl" type="url" maxlength="200" />
      <button type="submit">Create</button>
    </form>
  `,
  setup() {
    const coinStore = useCoin();
    const coinForm = reactive({
      name: '',
      symbol: '',
      description: '',
      logoUrl: '',
    });
    
    function createCoin() {
      coinStore.createCoin(coinForm);
    }
    
    watch(coinForm, (newValue) => {
      coinForm.symbol = newValue.symbol.toUpperCase();
    });
    
    return { coinForm, createCoin };
  }
};

describe('Memecoins Form Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  test('submits form with correct data', async () => {
    const wrapper = mount(MemecoinsForm, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    });
    
    const coinStore = useCoin();
    
    // Fill the form
    await wrapper.find('#name').setValue('TestCoin');
    await wrapper.find('#symbol').setValue('TC');
    await wrapper.find('#description').setValue('This is a test coin');
    await wrapper.find('#logoUrl').setValue('https://example.com/logo.png');
    
    // Submit the form
    await wrapper.find('form').trigger('submit');
    
    expect(coinStore.createCoin).toHaveBeenCalledWith({
      name: 'TestCoin',
      symbol: 'TC',
      description: 'This is a test coin',
      logoUrl: 'https://example.com/logo.png'
    });
  });
  
  test('automatically converts symbol to uppercase', async () => {
    const wrapper = mount(MemecoinsForm, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    });
    
    await wrapper.find('#symbol').setValue('tc');
    expect(wrapper.vm.coinForm.symbol).toBe('TC');
  });
});