/**
 * build box home
 */

const HeroSection = styled.div`
  &.home-hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;

    .home-heading {
      flex: 1;
      max-width: 60%;

      .home-header {
        span {
          display: block;
          font-size: 72px;
          margin-bottom: 0.5rem;
        }
      }
    }
  }
`;

return (
  <>
    <HeroSection className="home-hero">
      <div className="home-heading">
        <h1 className="home-header">
          <span>🔨 📦 build box</span>
          <br />
        </h1>
      </div>
    </HeroSection>
  </>
);
