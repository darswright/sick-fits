import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>must supply token</p>
        <RequestReset />
      </div>
    );
  }

  return (
    <div>
      <p>reset your password {query.token}</p>
      <Reset token={query.token} />
    </div>
  );
}
