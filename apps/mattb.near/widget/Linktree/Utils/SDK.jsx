const LinktreeSDK = {
  account: {
    name: "",
    data: null,
    tags: [],
    followers: {
      list: [],
      count: 0,
    },
    following: {
      list: [],
      count: 0,
    },
  },
  load: (account) => {
    let profile = LinktreeSDK.getProfile(account);
    let followers = LinktreeSDK.getFollowers(account);
    let following = LinktreeSDK.getFollowing(account);

    LinktreeSDK.account = {
      name: account,
      data: profile,
      tags: Object.keys(profile.tags || {}),
      followers: {
        list: followers[account],
        count: Object.keys(followers[account].graph.follow || {}).length,
      },
      following: {
        list: following,
        count: Object.keys(following || {}).length,
      },
    };
  },
  getAccountUrl: (account) => `#/near/widget/ProfilePage?accountId=${account}`,
  getShareUrl: (account) =>
    `https://near.org/${LinktreeSDK.getAccountUrl(account)}`,
  getProfile: (account) => Social.get(`${account}/profile/**`, "final") || {},
  getFollowing: (account) =>
    Social.keys(`${account}/graph/follow/*`, "final", {
      return_type: "BlockHeight",
      values_only: true,
    }),
  getFollowers: (account) =>
    Social.keys(`*/graph/follow/${account}`, "final", {
      return_type: "BlockHeight",
      values_only: true,
    }),
};

return LinktreeSDK;
