import { render, fireEvent } from '@testing-library/vue';
import PickerColumn from '@/components/PickerColumn.vue';
import { AVAILABLE_DELIVERY_SLOTS, DELIVERY_SLOT_LABELS } from '@/util/constants';

describe('PickerColumn component', () => {
  const props = {
    timeslots: AVAILABLE_DELIVERY_SLOTS,
    deliverySlot: { date: '2020-12-16', slots: {} },
  };

  it('should render a PickerCell for each timeslot provided', () => {
    const { getAllByTestId } = render(PickerColumn, { props });
    const pickerCells = getAllByTestId('picker-cell-button');

    expect(pickerCells.length).toBe(props.timeslots.length);
  });

  it('should emit an event containing the date value and the timeslot', async () => {
    const { getByText, emitted } = render(PickerColumn, { props });

    const timeslot = 'AM';

    const dateTimeslot = { date: '2020-12-16', timeslot };

    const cellWithinColumn = getByText(DELIVERY_SLOT_LABELS[timeslot]);
    await fireEvent.click(cellWithinColumn);
    const [emittedValue] = emitted().dateTimeslotSelected[0];

    expect(emittedValue).toEqual(dateTimeslot);
  });
});
