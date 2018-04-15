import authoritiesBasic from "../../test/fixtures/authorities/basic.json";

const transformAuthority = authority => ({
  id: authority.LocalAuthorityId,
  idCode: authority.LocalAuthorityIdCode,
  name: authority.Name,
  establishmentCount: authority.EstablishmentCount,
  schemeType: authority.SchemeType
});

const getAuthorities = () =>
  Promise.resolve(authoritiesBasic)
    .then(({ authorities }) => authorities)
    .then(authorities => authorities.map(transformAuthority));

export default {
  getAuthorities
};
