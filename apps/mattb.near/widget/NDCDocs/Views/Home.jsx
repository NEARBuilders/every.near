const { embedHeader, accountId, profile, view } = props;

State.init({
  currentView: view || "articles",
});

const widgetOwner = "mattb.near";

const addressForArticles = "ndcWikiArticle";
const authorsWhitelist = [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "shubham007.near",
  "psalm.near",
  "fiftycent.near",
];
accountId = accountId || context.accountId;
profile = profile || Social.getr(`${accountId}/profile`);

if (!profile) {
  return "Loading...";
}

let views = {
  articles: (
    <>
      <Widget
        src={`${widgetOwner}/widget/NDCDocs.Components.ArticlesList`}
        props={{ writersWhiteList }}
      />
    </>
  ),
  authors: (
    <>
      <Widget
        src={`${widgetOwner}/widget/NDCDocs.Components.AuthorsList`}
        props={{ writersWhiteList }}
      />
    </>
  ),
};

return (
  <div
    className="container-fluid"
    style={{
      backgroundColor: "#fff",
    }}
  >
    {(typeof embedHeader == "undefined" || !!embedHeader) && (
      <Widget
        src={`${widgetOwner}/widget/NDC.Components.Header`}
        props={{
          onRefresh: (data) => State.update(data),
          tabs: {
            articles: {
              text: "Articles",
            },
            authors: {
              text: "Authors",
            },
          },
          selectedTab: "articles",
        }}
      />
    )}
    <div
      style={{
        margin: "0 auto",
        width: "90%",
        minWidth: "360px",
        padding: "2rem",
      }}
    >
      {state.currentView in views ? views[state.currentView] : "404"}
    </div>
  </div>
);
