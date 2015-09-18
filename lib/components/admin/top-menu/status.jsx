import React from 'react';
import {Component} from 'relax-framework';
import FormState from '../../form-state';
import Animate from '../../animate';

export default class Status extends Component {
  render () {
    if (this.props.state) {
      return <FormState state={this.props.state} message={this.props.stateMessage} />;
    } else {
      if (this.props.draft._version < this.context.page._version) {
        return (
          <Animate transition='slideDownIn' key='behind'>
            <span className='status behind'>
              <span>Your draft revision is behind current one - </span>
              <a href='#' onClick={this.props.fetchCurrent}> fetch current</a>
            </span>
          </Animate>
        );
      } else if (this.props.draft.actions && this.props.draft.actions.length > 0) {
        return (
          <Animate transition='slideDownIn' key='draft'>
            <span className='status draft'>
              <span>Editing your draft - </span>
              <a href='#' onClick={this.props.fetchCurrent}> drop my changes</a>
            </span>
          </Animate>
        );
      } else {
        return (
          <Animate transition='slideDownIn' key='published'>
            <span className='status published'>Seeing published version</span>
          </Animate>
        );
      }
    }
  }
}

Status.contextTypes = {
  page: React.PropTypes.object.isRequired
};

Status.propTypes = {
  draft: React.PropTypes.object.isRequired,
  fetchCurrent: React.PropTypes.func.isRequired,
  state: React.PropTypes.string,
  stateMessage: React.PropTypes.string
};