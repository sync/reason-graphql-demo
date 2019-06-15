import React from 'react';
import { render, fireEvent } from '../../utils/testUtils';
import Picker from '../Picker.gen';

describe('Picker', () => {
  it('renders a picker (when uncontrolled)', () => {
    const option1 = 'test option 1';
    const option2 = 'test option 2';
    const options = [option1, option2];

    // option 1 selected by default
    const { getByText, getByTestId } = render(<Picker options={options} />);

    expect(getByText(`Subreddit: ${option1}`)).toBeTruthy();
    expect(getByText(option1)).toBeTruthy();
    expect(getByText(option2)).toBeTruthy();

    // select option 2
    fireEvent.change(getByTestId('picker-select-test-id'), {
      target: { value: option2 },
    });

    expect(getByText(`Subreddit: ${option2}`)).toBeTruthy();
  });

  it('renders a picker (when controlled)', () => {
    const option1 = 'test option 1';
    const option2 = 'test option 2';
    const options = [option1, option2];

    const onChange = jest.fn();

    // option 2 selected
    const { getByText, getByTestId } = render(
      <Picker options={options} value={option2} onChange={onChange} />,
    );

    expect(getByText(`Subreddit: ${option2}`)).toBeTruthy();
    expect(getByText(option1)).toBeTruthy();
    expect(getByText(option2)).toBeTruthy();

    // select option 1
    fireEvent.change(getByTestId('picker-select-test-id'), {
      target: { value: option1 },
    });

    expect(onChange).toHaveBeenCalledWith(option1);
  });

  it('render an empty picker', () => {
    const { getByText } = render(<Picker options={[]} />);

    expect(getByText(`Subreddit: Not provided...`)).toBeTruthy();
  });
});
