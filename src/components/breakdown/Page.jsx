import React, { Component } from "react";

import FSAClient from "../../services/FSAClient";
import Breakdown from "./Breakdown";
import SelectAuthority from "./SelectAuthority";

class Page extends Component {
  constructor(props) {
    super(props);
    this.selectAuthority = this.selectAuthority.bind(this);

    this.state = {
      authorities: null,
      breakdown: null,
      loading: true,
      selectedAuthorityId: "default"
    };
  }

  componentDidMount() {
    FSAClient.getAuthorities()
      .then(authorities => {
        this.setState({ authorities, loading: false });
      })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        this.setState({ error: true });
        // Send error to APM or logging endpoint
      });
  }

  selectAuthority(event) {
    const selectedAuthorityId = event.target.value;
    if (selectedAuthorityId === "default") {
      this.setState({ breakdown: null, selectedAuthorityId });
    } else {
      this.setState({ loading: true });
      FSAClient.getEstablishments(selectedAuthorityId)
        .then(breakdown => this.setState({ breakdown, loading: false, selectedAuthorityId }))
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          this.setState({ error: true });
          // Send error to APM or logging endpoint
        });
    }
  }

  render() {
    if (this.state.error) {
      return <div>Opps, sorry, something went wrong. Please refresh the page and try again.</div>;
    }

    if (this.state.loading) {
      return <div>Loading . . .</div>;
    }

    return (
      <div>
        <SelectAuthority
          authorities={this.state.authorities}
          onChange={this.selectAuthority}
          value={this.state.selectedAuthorityId}
        />
        {this.state.breakdown && <Breakdown breakdown={this.state.breakdown} />}
      </div>
    );
  }
}

export default Page;
