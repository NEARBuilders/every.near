const LensVerifier = VM.require("mattb.near/widget/SDKs.Verifiers.Lens");
const LensSDK = VM.require("mattb.near/widget/LensSDKRequire");

const LensLib = {
  createProof: (address, nearAccount, onCommit, onCancel) => {
    LensVerifier.createProof(address, nearAccount)
      .then(({ handle, signature }) => {
        let identity = {
          lens: {
            name: handle,
            signature,
          },
        };

        Social.set(
          {
            identity,
            index: {
              identity: JSON.stringify({
                key: "lens",
                value: {
                  ...identity.lens,
                },
              }),
            },
          },
          {
            onCommit: () => {
              if (typeof onCommit === "function") {
                onCommit(handle);
              }
            },
            onCancel,
          }
        );
      })
      .catch((error) => {
        console.error(error);
        if (typeof onCancel === "function") {
          onCancel();
        }
      });
  },
  verify: (handle, nearAccount, signature) =>
    LensVerifier.verify(handle, nearAccount, signature),
  listRecentlyVerifiedProfiles: (options) => {
    return LensLib.getIdentity({
      limit: 5,
      ...options,
    });
  },
  getVerifiedProfiles: (nearAccounts) => {
    return LensLib.getIdentity({
      accountId: nearAccounts,
    });
  },
  getVerifiedProfile: (nearAccount) => {
    return LensLib.getIdentity({
      accountId: nearAccount,
      limit: 1,
    });
  },
  getIdentity: (options) => {
    return Social.index("identity", "lens", {
      order: "desc",
      ...options,
    });
  },
  getAddressHandle: (address) => {
    return LensSDK.getProfileByEthereumAddress(address).then((payload) => {
      let [profile] = payload.body.data.profiles.items;
      return profile.handle;
    });
  },
};

return LensLib;
