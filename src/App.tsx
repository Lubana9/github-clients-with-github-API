import { routes } from "@config/configs";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import ReposSearchPage from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Route path={routes.reposDetails.mask} component={ReposSearchPage} />
      <Redirect to={routes.reposDetails.mask} />
    </BrowserRouter>
  );
};

export default App;
