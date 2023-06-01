import React from 'react';
import { Oval } from 'react-loader-spinner';

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

    componentWillUnmount() {
      console.log('withLoading hoc post unmount');
    }

    render() {
      // setTimeout(() => {
      //   this.setState({ ...this.state, isLoaded: true });
      // }, 4000);
      return (
        <div style={{ width: '100%', heigth: '100%' }}>
          {this.state.isLoaded ? (
            <WrappedComponent {...this.props} />
          ) : (
            <Oval
              height={50}
              width={50}
              color="#2580da"
              wrapperStyle={{
                marginLeft: 'calc(50% - 25px)'
              }}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#2580da"
              strokeWidth={5}
              strokeWidthSecondary={6}
            />
          )}
        </div>
      );
    }
  };
}
