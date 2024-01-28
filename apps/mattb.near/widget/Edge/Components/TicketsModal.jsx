let { showModal, closeModal } = props;

State.init({
  showModal: showModal ?? false,
});

const WIDGET_OWNER = "mattb.near";
const URL_EVENT_SF = "https://partiful.com/e/hfRtoRSuVH4tGrzwmOW3";
const URL_EVENT_NYC = "https://partiful.com/e/8fZfzaNqqm8MSTA5I7E7";

const Content = styled.div`
    h1 {
        font-family: Time News Roman;
        font-size:1.5rem;
    }

    p {

    }
`;

const Tickets = styled.div`
    display:grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: .4rem;
    padding:.5rem 0;

    @media screen and (max-width:700px) {
        display:block;
    }
`;

const Ticket = styled.a`
    display:block;
    cursor:pointer;
    border: 1px solid rgba(0,0,0,1);
    padding: .8rem;
    transition: all .2s;
    color:#000;
    text-decoration:none!important;

    @media screen and (max-width:700px) {
        :not(:last-of-type) {
            margin-bottom:1.5rem;
        }
    }

    :hover {
        background-color:#000;
        color:#fff;
        box-shadow: 0 0 0 5px #000;
        border-color:#fff;
        transition: all .2s;
    }

    .title, .price {
        font-size:1.2rem;
        line-height:1.3rem;
        margin-bottom:.5rem;
    }

    .description {
        font-size:.8rem;
        opacity:.6;
    }

    ul {
        padding:0;
        padding:0 1.2rem;
        li {
            font-size:.8rem;
            margin-bottom:.2rem;
        }
    }
`;

return (
  <Widget
    src={`${WIDGET_OWNER}/widget/Edge.Components.Modal`}
    props={{
      showModal: props.showModal,
      onClose: (closed) => {
        State.update({ showModal: false });

        if (typeof closeModal === "function") {
          closeModal();
        }
      },
      slot: (
        <Content>
          <h1>Choose your ticket.</h1>
          <Tickets>
            <Ticket href={URL_EVENT_SF} target="_blank">
              <p className="title">September 1st, 2023</p>
              <p className="description">San Francisco</p>
            </Ticket>
            <Ticket href={URL_EVENT_NYC} target="_blank">
              <p className="title">September 19th, 2023</p>
              <p className="description">New York City</p>
            </Ticket>
          </Tickets>
        </Content>
      ),
    }}
  />
);
