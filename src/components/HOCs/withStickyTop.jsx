import React, { Component } from "react";
import uuidv4 from "uuid/v4";

export default function withStickyTop(Top, Rest) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchBarHeight: ""
      }
      this.stickyTopID = uuidv4();
    }

    componentDidMount() {
      var searchbar = document.getElementById(this.stickyTopID);
      var style = searchbar.currentStyle || window.getComputedStyle(searchbar);
      var ht = searchbar.clientHeight;
      var mtop = style.marginTop;
      var mbot = style.marginBottom;
      var btop = style.borderTopWidth;
      var bbot = style.borderBottomWidth;
      var ptop = style.paddingTop;
      var pbot = style.paddingBottom;
      var offset = `calc(${mtop} + ${mbot} + ${btop} + ${bbot} + ${ptop} + `
        + `${pbot} + ${ht}px)`;
      this.setState({searchBarHeight: offset});
    }

    render() {
      return (
        <div>
          <div className="navbar-fixed-top" id={this.stickyTopID}>
            <Top {...this.props} />
          </div>
          { this.state.searchBarHeight && (
            <div style={{marginTop: this.state.searchBarHeight}}>
              <Rest {...this.props} />
            </div>
          )}
      </div>
      )
    }
  }
}
