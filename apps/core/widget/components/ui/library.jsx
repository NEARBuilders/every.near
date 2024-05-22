const { Avatar, AvatarGroup, Button, Badge, Container } = VM.require(
  "${config_account}/widget/components"
) || {
  Avatar: () => <></>,
  AvatarGroup: () => <></>,
  Button: () => <></>,
  Badge: () => <></>,
  Container: () => <></>,
};

const badgeSizes = ["xx-small", "x-small", "small", "medium"];
const badgeStyles = ["alpha", "solid"];
const badgeColors = ["black", "blue", "green", "yellow", "red"];

const avatarIds = [
  "itexpert120-contra.near",
  "kwok0997.near",
  "itexpert120-contra.near",
  "itexpert120-contra.near",
  "itexpert120-contra.near",
  "itexpert120-contra.near",
  "itexpert120-contra.near",
  "itexpert120-contra.near",
];

const [selected, setSelected] = useState(null);

const badges = [];

badgeSizes.forEach((size) => {
  badgeStyles.forEach((style) => {
    badgeColors.forEach((color) => {
      badges.push({ size, style, color });
    });
  });
});

return (
  <div className="d-flex flex-column gap-3">
    <h1>UI Library</h1>
    <h2>Button</h2>
    <div className="d-flex align-items-center gap-5 flex-wrap">
      <div className="d-flex align-items-center gap-3 flex-wrap">
        <Button size={"large"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
        <Button size={"medium"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
        <Button size={"small"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
      </div>
      <div className="d-flex align-items-center gap-3">
        <Button size={"large"} icon>
          <i className="bi bi-box"></i>
        </Button>
        <Button size={"medium"} icon>
          <i className="bi bi-box"></i>
        </Button>
        <Button size={"small"} icon>
          <i className="bi bi-box"></i>
        </Button>
      </div>
    </div>
    <div className="d-flex align-items-center gap-5 flex-wrap">
      <div className="d-flex align-items-center gap-3 flex-wrap">
        <Button variant="secondary" size={"large"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
        <Button variant="secondary" size={"medium"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
        <Button variant="secondary" size={"small"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
      </div>
      <div className="d-flex align-items-center gap-3">
        <Button variant="secondary" size={"large"} icon>
          <i className="bi bi-box"></i>
        </Button>
        <Button variant="secondary" size={"medium"} icon>
          <i className="bi bi-box"></i>
        </Button>
        <Button variant="secondary" size={"small"} icon>
          <i className="bi bi-box"></i>
        </Button>
      </div>
    </div>
    <div className="d-flex align-items-center gap-5 flex-wrap">
      <div className="d-flex align-items-center gap-3 flex-wrap">
        <Button variant="tertiary" size={"large"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
        <Button variant="tertiary" size={"medium"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
        <Button variant="tertiary" size={"small"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
      </div>
      <div className="d-flex align-items-center gap-3">
        <Button variant="tertiary" size={"large"} icon>
          <i className="bi bi-box"></i>
        </Button>
        <Button variant="tertiary" size={"medium"} icon>
          <i className="bi bi-box"></i>
        </Button>
        <Button variant="tertiary" size={"small"} icon>
          <i className="bi bi-box"></i>
        </Button>
      </div>
    </div>
    <div className="d-flex align-items-center gap-5 flex-wrap">
      <div className="d-flex align-items-center gap-3 flex-wrap">
        <Button href="https://google.com" size={"large"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
        <Button href="https://google.com">
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
      </div>
    </div>
    <div className="d-flex align-items-center gap-5 flex-wrap">
      <div className="d-flex align-items-center gap-3 flex-wrap">
        <Button type="danger" size={"large"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
        <Button type="danger" size={"medium"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
        <Button type="danger" size={"small"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
      </div>
      <div className="d-flex align-items-center gap-3">
        <Button type="danger" size={"large"} icon>
          <i className="bi bi-box"></i>
        </Button>
        <Button type="danger" size={"medium"} icon>
          <i className="bi bi-box"></i>
        </Button>
        <Button type="danger" size={"small"} icon>
          <i className="bi bi-box"></i>
        </Button>
      </div>
    </div>
    <div className="d-flex align-items-center gap-5 flex-wrap">
      <div className="d-flex align-items-center gap-3 flex-wrap">
        <Button type="danger" variant="secondary" size={"large"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
        <Button type="danger" variant="secondary" size={"medium"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
        <Button type="danger" variant="secondary" size={"small"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
      </div>
      <div className="d-flex align-items-center gap-3">
        <Button type="danger" variant="secondary" size={"large"} icon>
          <i className="bi bi-box"></i>
        </Button>
        <Button type="danger" variant="secondary" size={"medium"} icon>
          <i className="bi bi-box"></i>
        </Button>
        <Button type="danger" variant="secondary" size={"small"} icon>
          <i className="bi bi-box"></i>
        </Button>
      </div>
    </div>
    <div className="d-flex align-items-center gap-5 flex-wrap">
      <div className="d-flex align-items-center gap-3 flex-wrap">
        <Button type="danger" variant="tertiary" size={"large"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
        <Button type="danger" variant="tertiary" size={"medium"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
        <Button type="danger" variant="tertiary" size={"small"}>
          <i className="bi bi-box"></i> button <i className="bi bi-box"></i>
        </Button>
      </div>
      <div className="d-flex align-items-center gap-3">
        <Button type="danger" variant="tertiary" size={"large"} icon>
          <i className="bi bi-box"></i>
        </Button>
        <Button type="danger" variant="tertiary" size={"medium"} icon>
          <i className="bi bi-box"></i>
        </Button>
        <Button type="danger" variant="tertiary" size={"small"} icon>
          <i className="bi bi-box"></i>
        </Button>
      </div>
    </div>
    <h2>Badge</h2>
    <div className="d-flex flex-wrap gap-3 align-items-center">
      {badges.map((badge, index) => (
        <Badge
          style={{ width: "max-content" }}
          key={index}
          size={badge.size}
          variant={badge.style}
          color={badge.color}
        >
          1
        </Badge>
      ))}
    </div>
    <h2>Chips</h2>
    <h3>Single</h3>
    <Widget
      src="${config_account}/widget/components.chips"
      props={{
        items: badgeColors,
        onSelect: (selected) => setSelected(selected),
      }}
    />
    <h3>Multiple</h3>
    <Widget
      src="${config_account}/widget/components.chips"
      props={{
        items: badgeColors,
        onSelect: (selected) => setSelected(selected),
        multiple: true,
      }}
    />
    <h2>Avatar</h2>
    <div className="d-flex align-items-center gap-3">
      <Avatar accountId={"itexpert120-contra.near"} form="rectangle" size="48px" />
      <Avatar accountId={"itexpert120-contra.near"} form="rectangle" size="40px" />
      <Avatar accountId={"itexpert120-contra.near"} form="rectangle" size="32px" />
      <Avatar accountId={"itexpert120-contra.near"} form="rectangle" size="24px" />
    </div>
    <div className="d-flex align-items-center gap-3">
      <Avatar accountId={"itexpert120-contra.near"} form="circle" size="48px" />
      <Avatar accountId={"itexpert120-contra.near"} form="circle" size="40px" />
      <Avatar accountId={"itexpert120-contra.near"} form="circle" size="32px" />
      <Avatar accountId={"itexpert120-contra.near"} form="circle" size="24px" />
    </div>
    <div className="d-flex flex-column gap-3">
      <AvatarGroup accountIds={avatarIds} maxCount={5} size="48px" />
      <AvatarGroup accountIds={avatarIds} maxCount={5} size="40px" />
      <AvatarGroup accountIds={avatarIds} maxCount={5} size="32px" />
      <AvatarGroup accountIds={avatarIds} maxCount={5} size="24px" />
    </div>
  </div>
);
