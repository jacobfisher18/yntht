import React from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import './Loader.css';

class Loader extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
  }

  componentDidMount() {
    this._isMounted = true;

    setTimeout(() => {
      if (this._isMounted) {
        this.setState({ hidden: false });
      }
    }, 500);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return this.state.hidden ? '' : (
      <div className="LoaderContainer">
        <ScaleLoader
          height={100}
          width={40}
          color={"#FFFFFF"}
          loading={this.props.loading}
        />
      </div>
    )
  }
}

export default Loader;