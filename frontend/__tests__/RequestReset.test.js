import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import RequestReset, {
  REQUEST_RESET_MUTATION,
} from '../components/RequestReset';

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: 'wesbos@gmail.com' },
    },
    result: {
      data: {
        sendUserPasswordResetLink: null,
      },
    },
  },
];

const email = 'wesbos@gmail.com';

describe('<RequestReset />', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('calls the mutation when submitted', async () => {
    const { debug } = render(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );
    userEvent.type(screen.getByPlaceholderText('Your Email Address'), email);
    userEvent.click(screen.getByText('Request Reset'));

    const success = await screen.findByText(/Success/i);
    expect(success).toBeInTheDocument();
  });
});
