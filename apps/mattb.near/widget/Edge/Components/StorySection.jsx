const Box = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    padding:2rem;
    box-sizing:border-box;
    width:100%;
    min-height:80vh;
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

return (
  <Box id="about">
    <Wrapper>
      <p className="title">Our Story.</p>
      <p className="subtitle">Open-Source AI & Next-Gen Web Evolution</p>
      <p className="content">
        We are a research and development organization dedicated to
        democratizing access to open intelligence and advancing the evolution of
        next-gen web architecture.
      </p>

      <p className="content">
        <span className="company">EDGE</span> was founded with a distinct
        mission in response to a gap in the market. While many organizations
        focus on AI development, few are experimenting with the next generation
        of AI and distributed web intersection.
      </p>

      <p className="content">
        As the rise of AI transforms the way we interact with the web, we
        explore new architectures, frameworks, and mechanisms that will emerge.
      </p>

      <p className="content">
        To fill this void, <span className="company">EDGE</span> assembled a
        collective of top experts, engineers, and developers who share such
        passion to educate, brainstorm, experiment, and collectively push the
        innovation boundaries.
      </p>
    </Wrapper>
  </Box>
);
