import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import ComponentTypeIcons from "./ComponentTypeIcons";

class ComponentSummaryList extends React.Component {
  constructor() {
    super();
    this.state = { showAll: false };
  }

  handleShowAll(event) {
    // the user clicked a list item in the blueprint contents area to expand or collapse
    this.setState(prevState => ({ showAll: !prevState.showAll }));
    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    const listItems = this.state.showAll ? this.props.listItems : this.props.listItems.slice(0, 5);
    return (
      <div className="cmpsr-summary-listview">
        <p>
          <strong>
            <FormattedMessage defaultMessage="Dependencies" />
          </strong>
          <span className="badge">{this.props.listItems.length}</span>
          <a href="#" className="pull-right" onClick={e => this.handleShowAll(e)}>
            {this.state.showAll ? (
              <FormattedMessage defaultMessage="Show Less" />
            ) : (
              <FormattedMessage defaultMessage="Show All" />
            )}
          </a>
        </p>
        <div className="list-pf cmpsr-list-pf__compacted">
          {listItems.map(listItem => (
            <div className="list-pf-item" key={listItem.name}>
              <div className="list-pf-container">
                <div className="list-pf-content list-pf-content-flex ">
                  <div className="list-pf-left">
                    <ComponentTypeIcons
                      componentType={listItem.ui_type}
                      componentInBlueprint
                      isDependency={this.props.isDependency}
                    />
                  </div>
                  <div className="list-pf-content-wrapper">
                    <div className="list-pf-main-content">
                      <div className="list-pf-description ">{listItem.name}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ComponentSummaryList.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object),
  isDependency: PropTypes.bool
};

ComponentSummaryList.defaultProps = {
  listItems: [],
  isDependency: false
};

export default ComponentSummaryList;
