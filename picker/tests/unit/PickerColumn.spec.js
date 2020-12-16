import { render, fireEvent } from '@testing-library/vue';
import PickerColumn from '@/components/PickerColumn.vue';

describe('PickerColumn component', () => {
  const props = {
    timeslots: ['AM', 'PM', 'EVE'],
    value: '2020-12-16',
  };

  it('should render a PickerCell for each timeslot provided', () => {
    const { getAllByTestId } = render(PickerColumn, { props });
    const pickerCells = getAllByTestId('picker-cell-button');

    expect(pickerCells.length).toBe(props.timeslots.length);
  });

  it('should emit an event containing the date value and the timeslot', async () => {
    const { getByText, emitted } = render(PickerColumn, { props });

    const dateTimeslot = { date: '2020-12-16', timeslot: 'AM' };

    const cellWithinColumn = getByText('AM');
    await fireEvent.click(cellWithinColumn);
    const [emittedValue] = emitted().dateTimeslotSelected[0];

    expect(emittedValue).toEqual(dateTimeslot);
  });
});
