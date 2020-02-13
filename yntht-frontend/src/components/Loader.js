import React from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import './Loader.css';

class Loader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ hidden: false });
    }, 500);
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