State.init({
  showModal: false,
});

const WIDGET_OWNER = "mattb.near";

const Main = styled.div`
  position:relative;
`;
const HeaderWrapper = styled.div`
  position:sticky;
  top:0;
  left:0;
  z-index:9999;
`;
const JumbotronWrapper = styled.div`
`;

return (
  <Main>
    <Widget
      src={`${WIDGET_OWNER}/widget/Edge.Components.TicketsModal`}
      props={{
        showModal: state.showModal,
        closeModal: () => State.update({ showModal: false }),
      }}
    />
    <HeaderWrapper>
      <Widget
        src={`${WIDGET_OWNER}/widget/Edge.Components.Header`}
        props={{
          showModal: () => State.update({ showModal: true }),
        }}
      />
    </HeaderWrapper>
    <JumbotronWrapper>
      <Widget
        src={`${WIDGET_OWNER}/widget/Edge.Components.HomeSection`}
        props={{
          showModal: () => State.update({ showModal: true }),
        }}
      />
    </JumbotronWrapper>
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.StorySection`} />
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.MainTopicsSection`} />
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.SpeakersSection`} />
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.HostsSection`} />
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.SponsorsSection`} />
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.ProgramSection`} />
    <Widget
      src={`${WIDGET_OWNER}/widget/Edge.Components.TicketsSection`}
      props={{
        showModal: () => State.update({ showModal: true }),
      }}
    />
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.FaqSection`} />
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.Footer`} />
  </Main>
);
