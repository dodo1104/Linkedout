import React from 'react';

export default function withLoading(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoaded: false
      };
    }

    componentDidMount() {
      this.setState({ ...this.state, isLoaded: true });
    }

    render() {
      return this.state.isLoaded ? (
        <WrappedComponent {...this.props} />
      ) : (
        <h3>loading...</h3>
      );
    }
  };
}
