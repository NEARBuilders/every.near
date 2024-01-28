const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

function Header() {
  return <></>;
}

function Footer() {
  return <></>;
}

// Define the new component that follows the AppLayout pattern
function AppLayout({ active, routes, children }) {
  return (
    <>
      <Container>
        <Header />
        <ContentContainer>{children}</ContentContainer>
        <Footer />
      </Container>
    </>
  );
}

return { AppLayout };
