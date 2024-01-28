const { title } = props;
title = title ?? "Recently verified";

const LensLib = VM.require("mattb.near/widget/NearBadger.Libs.Lens");

let recentlyVerified = LensLib.listRecentlyVerifiedProfiles({
  subscribe: true,
});

const Section = styled.div`
    height:100vh;
    overflow:hidden;

    h1 {
        font-weight:bold;
        margin-bottom:1.3rem;
        padding:1rem 1.8rem 0;
    }
`;

const Carousel = styled.div`
  display:flex;
  flex-wrap:no-wrap;
  overflow-y:auto;
  padding:0 1.8rem 1rem;

  > div {
    :not(:last-of-type) {
      margin-right:15px;
    }
  }
`;

return (
  <Section>
    <h1>{title}</h1>
    <Carousel>
      {recentlyVerified.map((verifiedProfile) => (
        <Widget
          src="mattb.near/widget/NearBadger.Components.Profile"
          props={{
            accountId: verifiedProfile.accountId,
            name: verifiedProfile.value.name,
          }}
        />
      ))}
    </Carousel>
  </Section>
);
