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
    FSAClient.getAuthorities().then(authorities => {
      this.setState({ authorities, loading: false });
    });
  }

  selectAuthority(event) {
    const selectedAuthorityId = event.target.value;
    if (selectedAuthorityId === "default") {
      this.setState({ breakdown: null, selectedAuthorityId });
    } else {
      FSAClient.getEstablishments(selectedAuthorityId).then(breakdown =>
        this.setState({ breakdown, selectedAuthorityId })
      );
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
