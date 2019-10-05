import { STATE_LOGIN, STATE_SIGNUP } from './components/AuthForm';
import { EmptyLayout, LayoutRoute, MainLayout } from './components/Layout';
import PageSpinner from './components/PageSpinner';
import AuthPage from './pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import PlaylistsContainer from "./containers/PlaylistsContainer";
import DashboardPageContainer from "./containers/DashboardPageContainer";
import UploadAudioContainer from "./containers/UploadAudioContainer";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Col} from "reactstrap";
import DisplayPlaylist from "./pages/DisplayPlaylist";

// const AddTrackPage = React.lazy(() => import('./pages/AddTrackPage'));
const SingleAlbumPage = React.lazy(() => import('./pages/SingleAlbumPage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {

    // toast.success('on change');
    return (
      <BrowserRouter basename={getBasename()}>
          <Switch>
            {/*Login component*/}
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            {/*Sign Up component*/}
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={DashboardPageContainer} />
                <Route exact path="/playlist" component={PlaylistsContainer} />
                <Route exact path="/single-album" component={SingleAlbumPage} />
                <Route exact path="/add-track" component={UploadAudioContainer} />
                <Route exact path="/view-playlist/:id" component={DisplayPlaylist} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>

        <ToastContainer />

      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
