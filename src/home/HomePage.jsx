import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

export class HomePage extends React.Component {
  constructor(params) {
    super(params)

    this.handleRedirects = this.handleRedirects.bind(this)
  }

  componentWillMount() {
    this.handleRedirects()
  }

  componentWillUpdate() {
    this.handleRedirects()
  }

  handleRedirects() {
    if (this.props.user) {
      this.props.gotoExpensesPage()
    } else {
      this.props.gotoLoginPage()
    }
  }

  render() {
    return <div />
  }
}

HomePage.propTypes = {
  user: PropTypes.object,
  gotoExpensesPage: PropTypes.func.isRequired,
  gotoLoginPage: PropTypes.func.isRequired
}

HomePage.defaultProps = {
  user: null
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gotoLoginPage: () => dispatch(push('/auth/login')),
    gotoExpensesPage: () => dispatch(push('/expenses'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
