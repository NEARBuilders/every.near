const { Layout } = VM.require("${alias_devs}/widget/Layout") || {
  Layout: () => <>layout not found</>,
};

const { Router } = VM.require("${alias_devs}/widget/Router") || {
  Router: () => <>router not found</>,
};

const { href } = VM.require("${alias_devs}/widget/lib.url") || {
  href: () => <>function not found</>,
};

const page = props.page || "home";

const data = Social.index("post", "main", { order: "desc", limit: 1 });

const { accountId, blockHeight } = data && data.length && data[0];

// const item = {
//   path: `${accountId}/post/main`,
//   blockHeight: blockHeight,
//   type: "social",
// };

// const item = {
//   path: `${alias_mob}/post/main`,
//   blockHeight: "81101335",
//   type: "social",
// };

const item = {
  path: "efiz.near/thing/core",
};

const CSS = styled.div`
    width: 100%,
    height: 100vh;
`;

const Header = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "space-between", border: "solid" }}>
    {children}
  </div>
);

const Footer = ({ owner }) => <>built by {owner} :)</>;

const Sidebar = () => <>sidebar</>;

const Button = styled.button``;

const NavLink = ({ page, children }) => {
  const link = href({
    widgetSrc: "${config_index}",
    params: {
      page,
    },
  });
  return (
    <Link to={link}>
      <Button>{children}</Button>
    </Link>
  );
};

const Content = () => (
  <Layout
    blocks={{
      Header: () => <Header>{page}</Header>,
      Footer: () => (
        <Footer
          owner={<Widget src="${alias_mob}/widget/ProfileLine" props={{ accountId: "efiz.near" }} />}
        />
      ),
    }}
  >
    <div style={{ minHeight: "65vh" }}>
      <Router
        config={{
          param: "page",
          routes: {
            home: {
              path: "every.near/widget/every.thing.view",
              init: item,
            },
            // library: {
            //   path: "every.near/widget/every.thing.view",
            //   init: {
            //     path: "every.near/widget/every.library.view",
            //   },
            // },
            about: {
              path: "efiz.near/widget/Tree",
              init: { rootPath: "${alias_mob}" },
            },
            poke: {
              path: "pokethe.near/widget/Index",
              init: { rootPath: "root.near" },
            },
          },
        }}
        page={page}
      />
    </div>
  </Layout>
);

return (
  <CSS>
    <Layout
      variant="sidebar"
      blocks={{
        Sidebar,
        Header: () => (
          <Header>
            <Link to={href({ widgetSrc: "${config_index}" })}>header</Link>
            <div>
              <NavLink page="about">about</NavLink>
              <NavLink page="poke">poke</NavLink>
              <Widget
                src="${alias_devs}/widget/GithubForkButton"
                props={{ username: "nearbuilders", repository: "every.near" }}
              />
            </div>
          </Header>
        ),
        Footer: () => <Footer owner="everyone" />,
      }}
    >
      <Content />
    </Layout>
  </CSS>
);
