import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {logout} from '../../store/api-actions';
import {getAuthorizationStatus, getUserData} from '../../store/user/selectors';

function Header() {
  const dispatch = useDispatch();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userEmail = useSelector(getUserData).email;
  const userAvatar = useSelector(getUserData).avatar;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.MAIN}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                authorizationStatus === AuthorizationStatus.AUTH
                  ?
                  <React.Fragment>
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.FAVORITES}
                      >
                        <div
                          className="header__avatar-wrapper user__avatar-wrapper"
                          style={{backgroundImage: `url(${userAvatar})`, borderRadius: '50%'}}
                        />
                        <span className="header__user-name user__name">{userEmail}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link
                        className="header__nav-link"
                        to={AppRoute.MAIN}
                        onClick={(evt) => {
                          evt.preventDefault();
                          dispatch(logout());
                        }}
                      >
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </React.Fragment>
                  :
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.LOGIN}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
