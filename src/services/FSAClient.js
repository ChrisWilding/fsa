import es6Promise from "es6-promise";
import "isomorphic-fetch";
import config from "../config";

es6Promise.polyfill();

const transformAuthority = authority => ({
  id: authority.LocalAuthorityId,
  idCode: authority.LocalAuthorityIdCode,
  name: authority.Name,
  establishmentCount: authority.EstablishmentCount,
  schemeType: authority.SchemeType
});

const getAuthorities = () =>
  fetch(`${config.BASE_URL}/authorities/basic`, {
    headers: new Headers({
      "X-API-Version": 2
    })
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(`FSA API returned HTTP status ${response.status} - ${response.statusText}`);
    })
    .then(({ authorities }) => authorities)
    .then(authorities => authorities.map(transformAuthority));

const transformEstablishments = establishments => {
  const initialValues = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
    0: 0,
    Exempt: 0
  };

  const ratingCounts = establishments.reduce((result, establishment) => {
    result[establishment.RatingValue] += 1; // eslint-disable-line no-param-reassign
    return result;
  }, Object.assign({}, initialValues));

  return Object.keys(ratingCounts).reduce((result, key) => {
    const decimal = ratingCounts[key] / establishments.length;
    const percentage = decimal * 100;
    const rounded = Math.round(percentage);
    result[key] = rounded; // eslint-disable-line no-param-reassign
    return result;
  }, Object.assign({}, initialValues));
};

const getEstablishments = localAuthorityId =>
  fetch(`${config.BASE_URL}/establishments?localAuthorityId=${localAuthorityId}&pageSize=99999`, {
    headers: new Headers({
      "X-API-Version": 2
    })
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(`FSA API returned HTTP status ${response.status} - ${response.statusText}`);
    })
    .then(({ establishments }) => establishments)
    .then(transformEstablishments);

export default {
  getAuthorities,
  getEstablishments
};
