import withAuthRedirect from "./withAuthRedirect";
import Routes from "../constants/routes";
/**
 * Require the user to be authenticated in order to render the component.
 * If the user isn't authenticated, forward to the given URL.
 */
export default function withAuth(WrappedComponent, location = Routes.LOGIN) {
  return withAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: true,
  });
}
