import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter, push } from 'react-router-redux'
import * as firebase from 'firebase'
import GrommetApp from 'grommet/components/App'
import Article from 'grommet/components/Article'
import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Section from 'grommet/components/Section'
import Toast from 'grommet/components/Toast'

import store, { history } from './store'

import { loggedIn, loggedOut } from './auth'
import { addToast, removeToast } from './home'

import HomePage from './home/HomePage'
import LoginPage from './auth/LoginPage'
import Http404Page from './Http404Page'

export default class App extends React.Component {
  static logout() {
    firebase.auth().signOut().then(() => {
      store.dispatch(loggedOut())
      store.dispatch(push('/'))
      store.dispatch(addToast('Successfully logged out'))
    })
  }

  static onToastClose(id) {
    store.dispatch(removeToast(id))
  }

  constructor(params) {
    super(params)

    this.state = {
      isLoggedIn: false
    }
  }

  componentWillMount() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp({
        apiKey: 'AIzaSyAL9RFWMnFN6R2LMEDO0lr0uMkoEKXd43Y',
        authDomain: 'finances-jiewmeng.firebaseapp.com',
        databaseURL: 'https://finances-jiewmeng.firebaseio.com',
        projectId: 'finances-jiewmeng',
        storageBucket: 'finances-jiewmeng.appspot.com',
        messagingSenderId: '236282796861'
      })

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          store.dispatch(loggedIn(user))
          this.setState({
            isLoggedIn: true
          })
        } else {
          store.dispatch(loggedOut())
          this.setState({
            isLoggedIn: false
          })
        }
      })
    }
  }

  render() {
    let menu = null
    if (this.state.isLoggedIn) {
      menu = (
        <React.Fragment>
          <Button plain label="Expenses" href="/expenses" />
          <Button plain label="Savings" href="/savings" />
          <Button plain label="Investments" href="/investments" />
          <Button plain label="Logout" onClick={App.logout} />
        </React.Fragment>
      )
    }

    const toasts = store.getState().app.toasts.map(t => {
      return (
        <Toast key={t.id} status={t.status} onClose={() => App.onToastClose(t.id)}>
          {t.message}
        </Toast>
      )
    })

    return (
      <GrommetApp centered={false}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Article>
              <Header fixed separator="bottom">
                <Box pad="medium" flex direction="row">
                  <Title>Finances</Title>
                  <Box flex justify="end" direction="row" responsive={false}>
                    {menu}
                  </Box>
                </Box>
              </Header>

              <Section>
                <Switch>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/auth/login" component={LoginPage} />
                  <Route component={Http404Page} />
                </Switch>
              </Section>

              {toasts}
            </Article>
          </ConnectedRouter>
        </Provider>
      </GrommetApp>
    )
  }
}
