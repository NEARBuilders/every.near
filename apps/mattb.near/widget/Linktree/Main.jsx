const { theme } = props;

const loggedIn = context.accountId ? props.loggedIn ?? false : false;
const accountId = loggedIn
  ? context.accountId ?? "ndcplug.near"
  : props.accountId ?? "ndcplug.near";
const viewingOwnAccount = accountId === context.accountId;

const AVAILABLE_THEMES = {
  default: "Default",
  dark: "Dark",
  gold: "Gold",
  blossom: "Blossom",
  vibrant: "Vibrant",
  aqua: "Aqua",
  neon: "Neon",
  vintage: "Vintage",
  eclectic: "Eclectic",
};
const themeName =
  theme in AVAILABLE_THEMES
    ? AVAILABLE_THEMES[theme]
    : AVAILABLE_THEMES["default"];

const Theme = VM.require(`mattb.near/widget/Linktree.Themes.${themeName}`);

const LinktreeSDK = VM.require("mattb.near/widget/Linktree.Utils.SDK");

// Load profile data
LinktreeSDK.load(accountId);

return (
  <>
    <Theme.Linktree>
      <a href={LinktreeSDK.getShareUrl(accountId)} target="_blank">
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: LinktreeSDK.account.data.image,
            alt: LinktreeSDK.account.data.name,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
            style: {
              height: "100%",
              maxHeight: 150,
              borderRadius: "50%",
              aspectRatio: 1 / 1,
              objectFit: "cover",
            },
          }}
        />
      </a>

      <Theme.Details>
        <h2>{LinktreeSDK.account.data.name || accountId}</h2>

        <h5>@{accountId}</h5>
        {LinktreeSDK.account.tags.length > 0 && (
          <Theme.TagsSection>
            <Widget
              src="near/widget/Tags"
              props={{
                tags: LinktreeSDK.account.tags,
              }}
            />
          </Theme.TagsSection>
        )}
      </Theme.Details>

      {LinktreeSDK.account.data.linktree && (
        <Theme.LinktreeLinks>
          {LinktreeSDK.account.data.linktree.website && (
            <a
              href={`https://${LinktreeSDK.account.data.linktree.website}`}
              target="_blank"
            >
              <button style={{ width: "100%" }}>
                {" "}
                <i className="bi bi-globe"></i> Website
              </button>
            </a>
          )}

          {LinktreeSDK.account.data.linktree.github && (
            <>
              <a
                href={`https://github.com/${LinktreeSDK.account.data.linktree.github}`}
                target="_blank"
              >
                <button style={{ width: "100%" }}>
                  <i className="bi bi-github"></i> Github
                </button>
              </a>
            </>
          )}

          {LinktreeSDK.account.data.linktree.twitter && (
            <a
              href={`https://twitter.com/${LinktreeSDK.account.data.linktree.twitter}`}
              target="_blank"
            >
              <button style={{ width: "100%" }}>
                <i className="bi bi-twitter"></i> Twitter
              </button>
            </a>
          )}

          {LinktreeSDK.account.data.linktree.telegram && (
            <a
              href={`https://t.me/${LinktreeSDK.account.data.linktree.telegram}`}
              target="_blank"
            >
              <button style={{ width: "100%" }}>
                <i className="bi bi-telegram"></i> Telegram
              </button>
            </a>
          )}
        </Theme.LinktreeLinks>
      )}
    </Theme.Linktree>
  </>
);
