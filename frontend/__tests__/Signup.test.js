import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import Signup, { SIGN_UP_MUTATION } from '../components/SignUp';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

const me = fakeUser();

const mocks = [
  {
    request: {
      query: SIGN_UP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password: '',
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  //   {
  //     request: {
  //       query: CURRENT_USER_QUERY,
  //     },
  //     result: {
  //       data: {
  //         me,
  //       },
  //     },
  //   },
];

describe('<SignUp />', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <Signup />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('calls the mutation properly', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <Signup />
      </MockedProvider>
    );

    await userEvent.type(screen.getByPlaceholderText('Your Name'), me.name);
    await userEvent.type(
      screen.getByPlaceholderText('Your Email Address'),
      me.email
    );
    await userEvent.type(screen.getByPlaceholderText('Password'), me.password);

    await userEvent.click(screen.getByText('Sign Up'));
    await screen.findByText(
      `Signed up with ${me.email} - Please go ahead ans sign in!`
    );
  });
});
