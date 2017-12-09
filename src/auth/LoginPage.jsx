import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { push } from 'react-router-redux'
import * as firebase from 'firebase'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import Button from 'grommet/components/Button'

export class LoginPage extends React.Component {
  static login() {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    firebase.auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => firebase.auth().signInWithPopup(googleProvider))
      .catch((err) => {
        console.error('Signin fail', err)
      })
  }

  constructor(params) {
    super(params)

    this.handleLoggedInUser = this.handleLoggedInUser.bind(this)
  }

  componentWillMount() {
    this.handleLoggedInUser()
  }

  componentWillUpdate(props) {
    this.handleLoggedInUser(props)
  }

  handleLoggedInUser(props) {
    const user = props.user || this.props.user
    if (user) {
      this.props.gotoExpenses()
    }
  }

  render() {
    return (
      <Box pad="medium" align="center">
        <Header>
          <Heading margin="medium">Login</Heading>
        </Header>

        <Button label="Login with Google" primary onClick={LoginPage.login} />
      </Box>
    )
  }
}

LoginPage.propTypes = {
  user: PropTypes.object,
  gotoExpenses: PropTypes.func.isRequired
}

LoginPage.defaultProps = {
  user: null
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gotoExpenses: () => dispatch(push('/expenses'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
