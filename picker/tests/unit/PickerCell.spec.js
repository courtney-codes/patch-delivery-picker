import { render, fireEvent } from '@testing-library/vue';
import PickerCell from '@/components/PickerCell.vue';

describe('PickerCell component', () => {
  const props = {
    value: 'AM',
  };

  it('should show as available if the slot is available', () => {});

  it('should display as unbookable if the slot is full', () => {});

  it('should emit an event containing the time slot when clicked', async () => {
    const { getByTestId, emitted } = render(PickerCell, { props });
    const cellButton = getByTestId('picker-cell-button');

    await fireEvent.click(cellButton);
    const [emittedValue] = emitted().timeslotSelected[0];

    expect(emittedValue).toBe('AM');
  });
});
