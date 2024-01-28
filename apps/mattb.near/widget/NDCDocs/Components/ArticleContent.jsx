const { article, index, coverImage } = props;

function getProfileImage(accountId) {
  let image = Social.getr(`${accountId}/profile`).image || {
    ipfs_cid: "",
  };

  return `https://ipfs.near.social/ipfs/${image.ipfs_cid}`;
}

const getDate = (timestamp) => {
  const date = new Date(Number(timestamp));
  return date.toDateString();
};

function getName(accountId) {
  return Social.getr(`${accountId}/profile`).name || "-";
}

const ArticleDetails = styled.div`
    display:flex;
    margin:auto;
    width:100%;
    box-sizing:border-box;
    padding: .5rem 0;
    margin:1rem auto;
    padding:1rem;
    background-color:rgba(0,0,0,.02);
    border-radius:20px;

    div:first-of-type {
      display:flex;
      align-items:center;
    }

    div + div {
      padding-left:10px;

      .name {
        font-weight:bold;
        margin:0;
      }

      .handle, .last-modification {
        font-size:.7rem;
        margin:0;
        opacity:.5;
      }

      .last-modification {
        opacity:.5;
      }

    }
`;

const Avatar = styled.div`
    border-radius:100%;
    width:40px;
    height:40px;
    background-color:rgba(0,0,0,.05);
    background-position:center;
    background-size:cover;
    background-repeat:no-repeat;
`;

const Cover = styled.div`
  width:100%;
  height:400px;
  background-position:center;
  background-size:cover;
  background-repeat:no-repeat;
  border-radius:20px;
`;

return (
  <>
    {coverImage && (
      <Cover
        style={{
          backgroundImage: `url(${coverImage})`,
        }}
      ></Cover>
    )}
    <ArticleDetails>
      <div>
        <Avatar
          style={{
            "background-image": `url("${getProfileImage(article.author)}")`,
          }}
        ></Avatar>
      </div>
      <div>
        <p className="name">{getName(article.author)}</p>
        <p className="handle">
          @{article.author} · <strong>{getDate(article.timeCreate)}</strong>
        </p>
        <p className="last-modification">
          Last edit by <strong>@{article.lastEditor}</strong> on{" "}
          <strong>{getDate(article.timeLastEdit)}</strong>
        </p>
      </div>
    </ArticleDetails>
    {index.map((content) => (
      <div id={content.contentStart} className="markdown">
        <OverlayTrigger
          key={content.contentStart}
          placement="left"
          overlay={<Tooltip id={`tooltip-left`}>Copy link</Tooltip>}
        >
          <div
            className="link"
            onClick={() =>
              clipboard.writeText(`${path}#${content.contentStart}`)
            }
          >
            🔗
          </div>
        </OverlayTrigger>
        <Markdown
          text={article.body
            .split("\n")
            .slice(
              content.contentStart,
              content.contentEnd || article.body.split("\n").length
            )
            .join("\n")}
        />
      </div>
    ))}
  </>
);
