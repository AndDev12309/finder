import withAuthRedirect from "./withAuthRedirect";
import Routes from "../constants/routes";
// import history from '../utils/history';

/**
 * Require the user to be unauthenticated in order to render the component.
 * If the user is authenticated, forward to the given URL.
 */
export default function withoutAuth(WrappedComponent, location = Routes.HOME) {
  // const from = history.location.state && history.location.state.from.pathname;

  return withAuthRedirect({
    WrappedComponent,
    location /*from ||*/,
    expectedAuth: false,
  });
}
