import React from 'react';
import Player from './Player';
import { AiFillCloseCircle } from 'react-icons/ai';

import './ImageFile.css';

export default class ImageFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 'someUniqueId', // I would use this.props.id for a real world implementation
      imageURI: null,
      file: null,
      label: 'Image'
    };
  }

  buildImgTag() {
    let imgTag = null;
    if (this.state.imageURI !== null)
      imgTag = (
        <div className="row">
          <div className="small-9 small-centered columns">
            <img className="thumbnail" src={this.state.imageURI}></img>
          </div>
        </div>
      );
    return imgTag;
  }

  readURI(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        this.setState({ imageURI: ev.target.result });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleChange(e) {
    const targetFile = e.target.files[0];
    this.readURI(e); // maybe call this with webworker or async library?
    console.log(targetFile);
    if (targetFile) {
      this.setState({ file: targetFile });
      this.props.updateFile(targetFile);
    }
    if (this.props.onChange !== undefined) this.props.onChange(e); // propagate to parent component
  }

  render() {
    const imgTag = this.buildImgTag();
    const { file, label } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        {/* <label htmlFor={this.state.id} className="button">
          Upload an image
        </label> */}

        <input
          // id={this.state.id}
          id="inputImage"
          type="file"
          onChange={(e) => {
            if (e.target.files[0] === undefined) return;
            this.handleChange(e);
            this.setState({ label: 'Image' });
          }}
          onClick={(e) => (e.target.value = null)}
          className="dis-hidden"
          accept=".jpeg, .jpg, .png"
        />

        <input
          // id={this.state.id}
          id="inputVideo"
          type="file"
          onChange={(e) => {
            if (e.target.files[0] === undefined) return;
            this.handleChange(e);
            this.setState({ label: 'Video' });
          }}
          onClick={(e) => (e.target.value = null)}
          className="dis-hidden"
          accept=".mp3,.mp4"
        />

        {file && (
          <>
            <div className="flex">
              <AiFillCloseCircle
                className="image-file__file__close-btn"
                onClick={() => {
                  this.setState({ file: null, imageURI: null });
                  this.props.updateFile(null);
                }}
              />
              <h3>{file.name}</h3>
            </div>
            <div key={file.name}>
              {label === 'Video' ? <Player file={file} /> : imgTag}
            </div>
          </>
        )}
      </div>
    );
  }
}
