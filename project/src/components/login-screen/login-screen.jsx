import React, {useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {login} from '../../store/api-actions';
import Header from '../header/header';
import {AppRoute, Toast} from '../../const';
import {getCity} from '../../store/offers/selectors';

function LoginScreen() {
  const dispatch = useDispatch();
  const activeCity = useSelector(getCity);
  const loginRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!loginRef.current.value.includes('@')) {
      toast.error(Toast.EMAIL_ERROR_TEXT, {
        position: Toast.POSITION,
        autoClose: Toast.AUTOCLOSE_TIME,
      });
      return;
    }

    if ((passwordRef.current.value.length <= 1) || (passwordRef.current.value).slice(0,1) === ' ') {
      toast.error(Toast.PASSWORD_ERROR_TEXT, {
        position: Toast.POSITION,
        autoClose: Toast.AUTOCLOSE_TIME,
      });
      return;
    }

    dispatch(login({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    }));
  };

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <ToastContainer />
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required=""
                  id="email"
                  data-testid="email"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required=""
                  id="password"
                  data-testid="password"
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.MAIN}>
                <span>{activeCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
