import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import './Loader.css';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
    };
  }

  render() {
    const { loading } = this.props;
    const { hidden } = this.state;

    return hidden ? '' : (
      <div className="LoaderContainer">
        <ScaleLoader
          height={100}
          width={40}
          color="#FFFFFF"
          loading={loading}
        />
      </div>
    );
  }
}

export default Loader;
