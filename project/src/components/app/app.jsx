import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import LoginScreen from '../login-screen/login-screen';
import RoomScreen from '../room-screen/room-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Loading from '../loading/loading';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../private-route/private-route';
import {getIsDataLoaded} from '../../store/data/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';

function App() {
  const isDataLoaded = useSelector(getIsDataLoaded);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const isCheckedAuth = (auth) => auth === AuthorizationStatus.UNKNOWN;

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return <Loading />;
  }

  return (
    <Switch>
      <Route exact path={AppRoute.MAIN}>
        <MainScreen />
      </Route>
      <PrivateRoute
        exact
        path={AppRoute.FAVORITES}
        redirect={AppRoute.LOGIN}
        isAuth={authorizationStatus === AuthorizationStatus.AUTH}
        render={() => <FavoritesScreen />}
      />
      <PrivateRoute
        exact
        path={AppRoute.LOGIN}
        redirect={AppRoute.MAIN}
        isAuth={authorizationStatus !== AuthorizationStatus.AUTH}
        render={() => <LoginScreen />}
      />
      <Route exact path = {`${AppRoute.ROOM}/:id`}
        render = {({match}) => {
          const {id} = match.params;
          return (
            <RoomScreen id={id} />
          );
        }}
      />
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;
