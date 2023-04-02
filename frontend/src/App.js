import React, {Suspense} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

//import Users from './user/pages/Users';
//import NewPost from './post/pages/NewPost';
//import UserPost from './post/pages/UserPost';
//import UpdatePost from './post/pages/UpdatePost';
//import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const Users = React.lazy(() => import('./user/pages/Users'));
const NewPost = React.lazy(() => import('./post/pages/NewPost'));
const UserPost = React.lazy(() => import('./post/pages/UserPost'));
const UpdatePost = React.lazy(() => import('./post/pages/UpdatePost'));
const Auth = React.lazy(() => import('./user/pages/Auth'));

const App = () => {

  const { token, login, logout, userId} = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/post" exact>
          <UserPost />
        </Route>
        <Route path="/post/new" exact>
          <NewPost />
        </Route>
        <Route path="/post/:postId">
          <UpdatePost />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/post" exact>
          <UserPost />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
