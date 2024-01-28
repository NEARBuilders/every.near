const { showModal } = props;

const EVENT_URL = "https://partiful.com/e/8fZfzaNqqm8MSTA5I7E7";

const Box = styled.div`
    padding:2rem;
    box-sizing:border-box;
    width:100%;
    min-height:50vh;
    background-color:#fff;
    color:#000;
    max-width:1000px;
    margin:0 auto;

    .title, .subtitle {
        font-family: Times New Roman;
        padding:0;
        margin:0;
    }

    .title {
        font-size:1.875rem;
    }

    .subtitle {
        font-size:1rem;
        opacity:.6;
    }
    
    .content {
        margin-top:1rem;

        .company {
            font-family: Times New Roman;
            font-weight:bold;
            border-bottom: 1px solid rgba(0,0,0,1);
        }
    }
`;

const Wrapper = styled.div`

`;

const Tickets = styled.div`
    display:grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
    padding:2.5rem 0;

    @media screen and (max-width:700px) {
        display:block;
    }
`;

const Ticket = styled.a`
    display:block;
    cursor:pointer;
    border: 1px solid rgba(0,0,0,1);
    padding: 1.5rem;
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
        font-size:1.5rem;
        line-height:1.3rem;
        margin-bottom:1.7rem;
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

const Button = styled.a`
    display:inline-block;
    padding:.3rem 1rem!important;
    border:0;
    color:#000;
    background-color:#fff;
    transition: all .2s;
    font-size:.9rem;
    border:2px solid #000;
    text-decoraction:none!important;

    :hover {
        background-color:#000;
        color:#fff;
        box-shadow: 0 0 0 3px #000;
        border-color:#fff;
        transition: all .2s;
    }
`;

return (
  <Box id="speakers">
    <Wrapper>
      <p className="title">Ticket.</p>
      <p className="subtitle">Be part of the Edge Intelligence Summit</p>
      <Tickets>
        <Ticket
          onClick={() => {
            if (typeof showModal === "function") {
              showModal();
            }
          }}
          target="_blank"
        >
          <p className="title">All day access.</p>
          <p className="price">FREE</p>
          <p className="description">{speaker.description}</p>
          <ul>
            <li>All talks & panels</li>
            <li>Food and drinks included</li>
            <li>Edge Intelligence Summit t-shirt</li>
            <li>Networking drinks with speakers & attendees</li>
          </ul>
        </Ticket>
        <Ticket
          onClick={() => {
            if (typeof showModal === "function") {
              showModal();
            }
          }}
          target="_blank"
        >
          <p className="title">#Party.</p>
          <p className="price">FREE</p>
          <p className="description">{speaker.description}</p>
          <ul>
            <li>10 PM - 12 PM</li>
            <li>Rave with top DJs</li>
            <li>VJs and projections</li>
            <li>Networking with attendees, speakers & sponsors</li>
          </ul>
        </Ticket>
      </Tickets>

      <Button
        onClick={() => {
          if (typeof showModal === "function") {
            showModal();
          }
        }}
        target="_blank"
      >
        GET A TICKET
      </Button>
    </Wrapper>
  </Box>
);
