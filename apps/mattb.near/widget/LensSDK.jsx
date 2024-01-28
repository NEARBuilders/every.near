const { onLoad, onRefresh, loaded, testnet } = props;

const LENS_API_URL = testnet
  ? "https://api-mumbai.lens.dev"
  : "https://api.lens.dev";

let LensSDK = {
  jwt: {
    accessToken: "",
    refreshToken: "",
  },
  authenticated: false,
  request: (query, variables, headers, method) => {
    return asyncFetch(LENS_API_URL, {
      method: method || "POST",
      headers: headers || {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables || {},
      }),
    });
  },
  getChallenge: (address) => {
    return LensSDK.request(
      `
        query Challenge ($address: EthereumAddress!) {
            challenge(request: { address: $address}) {
            text
            }
        }
       `,
      {
        address: address,
      }
    );
  },
  authenticateSignature: (address, signature) => {
    return LensSDK.request(
      `
        mutation Authenticate ($address: EthereumAddress!, $signature: Signature!) {
            authenticate(request: {
            address: $address,
            signature: $signature
            }) {
            accessToken
            refreshToken
            }
        }
      `,
      {
        address: address,
        signature: signature,
      }
    );
  },
  authenticateLens: (address, signer, onSuccess) => {
    LensSDK.getChallenge(address).then((payload) => {
      let challenge = payload.body.data.challenge.text;
      const response = signer().signMessage(challenge);

      response.then((signature) => {
        LensSDK.authenticateSignature(address, signature).then((payload) => {
          if (
            payload.status === 200 &&
            !!payload.body.data.authenticate.accessToken
          ) {
            LensSDK.jwt.accessToken =
              payload.body.data.authenticate.accessToken;
            LensSDK.jwt.refreshToken =
              payload.body.data.authenticate.refreshToken;
            LensSDK.authenticated = true;

            if (onSuccess) {
              onSuccess();
            }

            if (onRefresh) {
              onRefresh(LensSDK);
            }
          }
        });
      });
    });
  },
  isFollowedByMe: (profileId) => {
    return LensSDK.request(
      `
                query Profile {
                    profile(request: { profileId: "` +
        profileId +
        `" }) {
                        isFollowedByMe
                    }
                }`,
      {},
      {
        "Content-Type": "application/json",
        "x-access-token": LensSDK.jwt.accessToken,
      }
    );
  },
  getProfileByHandle: (handle) => {
    return LensSDK.request(
      `
        query Profile ($handle: Handle!) {
          profile(request: { handle: $handle }) {
            id
            name
            bio
            attributes {
              displayType
              traitType
              key
              value
            }
            followNftAddress
            metadata
            isDefault
            picture {
              ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
              }
              ... on MediaSet {
                original {
                  url
                  mimeType
                }
              }
              __typename
            }
            handle
            coverPicture {
              ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
              }
              ... on MediaSet {
                original {
                  url
                  mimeType
                }
              }
              __typename
            }
            ownedBy
            stats {
              totalFollowers
              totalFollowing
              totalPosts
              totalComments
              totalMirrors
              totalPublications
              totalCollects
            }
          }
    }
  `,
      {
        handle: handle,
      }
    );
  },
  getProfileByEthereumAddress: (ethereumAddress) => {
    return LensSDK.request(
      `
        query Profiles ($address: [EthereumAddress!]) {
        profiles(request: { ownedBy: $address}) {
          items {
            handle
          }
        }
    }
    `,
      {
        address: [ethereumAddress],
      }
    );
  },
  followProfile: (profileId) => {
    return LensSDK.request(
      `
        mutation ProxyAction {
            proxyAction(request: {
                follow: {
                    freeFollow: {
                        profileId: "` +
        profileId +
        `"
                    }
                }
            })
        }`,
      {},
      {
        "Content-Type": "application/json",
        "x-access-token": LensSDK.jwt.accessToken,
      }
    );
  },
  unfollowProfile: (profileId) => {
    return LensSDK.request(
      `
        mutation Unfollow {
  createUnfollowTypedData(request: { profile: "` +
        profileId +
        `" }) {
    id
    expiresAt
    typedData {
      domain {
        name
        chainId
        version
        verifyingContract
        __typename
      }
      types {
        BurnWithSig {
          name
          type
          __typename
        }
        __typename
      }
      value {
        nonce
        deadline
        tokenId
        __typename
      }
      __typename
    }
    __typename
  }
}`,
      {},
      {
        "Content-Type": "application/json",
        "x-access-token": LensSDK.jwt.accessToken,
      }
    );
  },
  getPost: (publicationId) => {
    return LensSDK.request(`query Publication {
  publication(request: {
    publicationId: "${publicationId}"
  }) {
   __typename 
    ... on Post {
      ...PostFields
    }
    ... on Comment {
      ...CommentFields
    }
    ... on Mirror {
      ...MirrorFields
    }
  }
}

fragment MediaFields on Media {
  url
  mimeType
}

fragment ProfileFields on Profile {
  id
  name
  bio
  attributes {
    displayType
    traitType
    key
    value
  }
  isFollowedByMe
  isFollowing(who: null)
  followNftAddress
  metadata
  isDefault
  handle
  picture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
    }
  }
  coverPicture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
    }
  }
  ownedBy
  dispatcher {
    address
  }
  stats {
    totalFollowers
    totalFollowing
    totalPosts
    totalComments
    totalMirrors
    totalPublications
    totalCollects
  }
  followModule {
    ...FollowModuleFields
  }
}

fragment PublicationStatsFields on PublicationStats { 
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
  totalUpvotes
}

fragment MetadataOutputFields on MetadataOutput {
  name
  description
  content
  media {
    original {
      ...MediaFields
    }
  }
  attributes {
    displayType
    traitType
    value
  }
}

fragment Erc20Fields on Erc20 {
  name
  symbol
  decimals
  address
}

fragment PostFields on Post {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  mirrors(by: null)
  hasCollectedByMe
}

fragment MirrorBaseFields on Mirror {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  hasCollectedByMe
}

fragment MirrorFields on Mirror {
  ...MirrorBaseFields
  mirrorOf {
   ... on Post {
      ...PostFields          
   }
   ... on Comment {
      ...CommentFields          
   }
  }
}

fragment CommentBaseFields on Comment {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  mirrors(by: null)
  hasCollectedByMe
}

fragment CommentFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
      ...MirrorBaseFields
      mirrorOf {
        ... on Post {
           ...PostFields          
        }
        ... on Comment {
           ...CommentMirrorOfFields        
        }
      }
    }
  }
}

fragment CommentMirrorOfFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
       ...MirrorBaseFields
    }
  }
}

fragment FollowModuleFields on FollowModule {
  ... on FeeFollowModuleSettings {
    type
    amount {
      asset {
        name
        symbol
        decimals
        address
      }
      value
    }
    recipient
  }
  ... on ProfileFollowModuleSettings {
    type
    contractAddress
  }
  ... on RevertFollowModuleSettings {
    type
    contractAddress
  }
  ... on UnknownFollowModuleSettings {
    type
    contractAddress
    followModuleReturnData
  }
}

fragment CollectModuleFields on CollectModule {
  __typename
  ... on FreeCollectModuleSettings {
    type
    followerOnly
    contractAddress
  }
  ... on FeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedTimedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on RevertCollectModuleSettings {
    type
  }
  ... on TimedFeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on UnknownCollectModuleSettings {
    type
    contractAddress
    collectModuleReturnData
  }
}

fragment ReferenceModuleFields on ReferenceModule {
  ... on FollowOnlyReferenceModuleSettings {
    type
    contractAddress
  }
  ... on UnknownReferenceModuleSettings {
    type
    contractAddress
    referenceModuleReturnData
  }
  ... on DegreesOfSeparationReferenceModuleSettings {
    type
    contractAddress
    commentsRestricted
    mirrorsRestricted
    degreesOfSeparation
  }
}`);
  },
  getPostComments: (postId) => {
    return LensSDK.request(
      `query CommentFeed($request: PublicationsQueryRequest!, $reactionRequest: ReactionFieldResolverRequest, $profileId: ProfileId) {
	  publications(request: $request) {
	    items {
	      ... on Comment {
	        ...CommentFields
	        __typename
	      }
	      __typename
	    }
	    pageInfo {
	      next
	      __typename
	    }
	    __typename
	  }
	}

	fragment CommentFields on Comment {
	  id
	  profile {
	    ...ProfileFields
	    __typename
	  }
	  reaction(request: $reactionRequest)
	  mirrors(by: $profileId)
	  bookmarked(by: $profileId)
	  notInterested(by: $profileId)
	  hasCollectedByMe
	  onChainContentURI
	  isGated
	  isDataAvailability
	  dataAvailabilityProofs
	  canComment(profileId: $profileId) {
	    result
	    __typename
	  }
	  canMirror(profileId: $profileId) {
	    result
	    __typename
	  }
	  canDecrypt(profileId: $profileId) {
	    result
	    reasons
	    __typename
	  }
	  collectModule {
	    ...CollectModuleFields
	    __typename
	  }
	  stats {
	    ...StatsFields
	    __typename
	  }
	  metadata {
	    ...MetadataFields
	    __typename
	  }
	  hidden
	  createdAt
	  appId
	  commentOn {
	    ... on Post {
	      ...PostFields
	      __typename
	    }
	    ... on Comment {
	      id
	      profile {
	        ...ProfileFields
	        __typename
	      }
	      reaction(request: $reactionRequest)
	      mirrors(by: $profileId)
	      bookmarked(by: $profileId)
	      notInterested(by: $profileId)
	      hasCollectedByMe
	      onChainContentURI
	      isGated
	      isDataAvailability
	      dataAvailabilityProofs
	      canComment(profileId: $profileId) {
	        result
	        __typename
	      }
	      canMirror(profileId: $profileId) {
	        result
	        __typename
	      }
	      canDecrypt(profileId: $profileId) {
	        result
	        reasons
	        __typename
	      }
	      collectModule {
	        ...CollectModuleFields
	        __typename
	      }
	      metadata {
	        ...MetadataFields
	        __typename
	      }
	      stats {
	        ...StatsFields
	        __typename
	      }
	      mainPost {
	        ... on Post {
	          ...PostFields
	          __typename
	        }
	        ... on Mirror {
	          ...MirrorFields
	          __typename
	        }
	        __typename
	      }
	      hidden
	      createdAt
	      __typename
	    }
	    ... on Mirror {
	      ...MirrorFields
	      __typename
	    }
	    __typename
	  }
	  __typename
	}

	fragment ProfileFields on Profile {
	  id
	  name
	  handle
	  bio
	  ownedBy
	  isFollowedByMe
	  stats {
	    totalFollowers
	    totalFollowing
	    totalPosts
	    totalComments
	    totalMirrors
	    __typename
	  }
	  attributes {
	    traitType
	    key
	    value
	    __typename
	  }
	  picture {
	    ... on MediaSet {
	      original {
	        url
	        __typename
	      }
	      __typename
	    }
	    ... on NftImage {
	      uri
	      tokenId
	      contractAddress
	      chainId
	      __typename
	    }
	    __typename
	  }
	  coverPicture {
	    ... on MediaSet {
	      original {
	        url
	        __typename
	      }
	      __typename
	    }
	    __typename
	  }
	  followModule {
	    __typename
	  }
	  __typename
	}

	fragment CollectModuleFields on CollectModule {
	  ... on FreeCollectModuleSettings {
	    type
	    contractAddress
	    followerOnly
	    __typename
	  }
	  ... on FeeCollectModuleSettings {
	    type
	    referralFee
	    contractAddress
	    followerOnly
	    amount {
	      ...ModuleFeeAmountFields
	      __typename
	    }
	    __typename
	  }
	  ... on LimitedFeeCollectModuleSettings {
	    type
	    collectLimit
	    referralFee
	    contractAddress
	    followerOnly
	    amount {
	      ...ModuleFeeAmountFields
	      __typename
	    }
	    __typename
	  }
	  ... on LimitedTimedFeeCollectModuleSettings {
	    type
	    collectLimit
	    endTimestamp
	    referralFee
	    contractAddress
	    followerOnly
	    amount {
	      ...ModuleFeeAmountFields
	      __typename
	    }
	    __typename
	  }
	  ... on TimedFeeCollectModuleSettings {
	    type
	    endTimestamp
	    referralFee
	    contractAddress
	    followerOnly
	    amount {
	      ...ModuleFeeAmountFields
	      __typename
	    }
	    __typename
	  }
	  ... on MultirecipientFeeCollectModuleSettings {
	    type
	    optionalCollectLimit: collectLimit
	    optionalEndTimestamp: endTimestamp
	    referralFee
	    followerOnly
	    contractAddress
	    amount {
	      ...ModuleFeeAmountFields
	      __typename
	    }
	    recipients {
	      recipient
	      split
	      __typename
	    }
	    __typename
	  }
	  ... on SimpleCollectModuleSettings {
	    type
	    optionalCollectLimit: collectLimit
	    optionalEndTimestamp: endTimestamp
	    contractAddress
	    followerOnly
	    fee {
	      amount {
	        ...ModuleFeeAmountFields
	        __typename
	      }
	      recipient
	      referralFee
	      __typename
	    }
	    __typename
	  }
	  __typename
	}

	fragment ModuleFeeAmountFields on ModuleFeeAmount {
	  asset {
	    symbol
	    decimals
	    address
	    __typename
	  }
	  value
	  __typename
	}

	fragment StatsFields on PublicationStats {
	  totalUpvotes
	  totalAmountOfMirrors
	  totalAmountOfCollects
	  totalBookmarks
	  totalAmountOfComments
	  commentsTotal(customFilters: GARDENERS)
	  __typename
	}

	fragment MetadataFields on MetadataOutput {
	  name
	  content
	  image
	  tags
	  attributes {
	    traitType
	    value
	    __typename
	  }
	  cover {
	    original {
	      url
	      __typename
	    }
	    __typename
	  }
	  media {
	    original {
	      url
	      mimeType
	      __typename
	    }
	    __typename
	  }
	  encryptionParams {
	    accessCondition {
	      or {
	        criteria {
	          ...SimpleConditionFields
	          and {
	            criteria {
	              ...SimpleConditionFields
	              __typename
	            }
	            __typename
	          }
	          or {
	            criteria {
	              ...SimpleConditionFields
	              __typename
	            }
	            __typename
	          }
	          __typename
	        }
	        __typename
	      }
	      __typename
	    }
	    __typename
	  }
	  __typename
	}

	fragment SimpleConditionFields on AccessConditionOutput {
	  nft {
	    contractAddress
	    chainID
	    contractType
	    tokenIds
	    __typename
	  }
	  eoa {
	    address
	    __typename
	  }
	  token {
	    contractAddress
	    amount
	    chainID
	    condition
	    decimals
	    __typename
	  }
	  follow {
	    profileId
	    __typename
	  }
	  collect {
	    publicationId
	    thisPublication
	    __typename
	  }
	  __typename
	}

	fragment PostFields on Post {
	  id
	  profile {
	    ...ProfileFields
	    __typename
	  }
	  reaction(request: $reactionRequest)
	  mirrors(by: $profileId)
	  bookmarked(by: $profileId)
	  notInterested(by: $profileId)
	  hasCollectedByMe
	  onChainContentURI
	  isGated
	  isDataAvailability
	  dataAvailabilityProofs
	  canComment(profileId: $profileId) {
	    result
	    __typename
	  }
	  canMirror(profileId: $profileId) {
	    result
	    __typename
	  }
	  canDecrypt(profileId: $profileId) {
	    result
	    reasons
	    __typename
	  }
	  collectModule {
	    ...CollectModuleFields
	    __typename
	  }
	  stats {
	    ...StatsFields
	    __typename
	  }
	  metadata {
	    ...MetadataFields
	    __typename
	  }
	  hidden
	  createdAt
	  appId
	  __typename
	}

	fragment MirrorFields on Mirror {
	  id
	  profile {
	    ...ProfileFields
	    __typename
	  }
	  reaction(request: $reactionRequest)
	  hasCollectedByMe
	  isGated
	  isDataAvailability
	  dataAvailabilityProofs
	  canComment(profileId: $profileId) {
	    result
	    __typename
	  }
	  canMirror(profileId: $profileId) {
	    result
	    __typename
	  }
	  canDecrypt(profileId: $profileId) {
	    result
	    reasons
	    __typename
	  }
	  collectModule {
	    ...CollectModuleFields
	    __typename
	  }
	  stats {
	    ...StatsFields
	    __typename
	  }
	  metadata {
	    ...MetadataFields
	    __typename
	  }
	  hidden
	  mirrorOf {
	    ... on Post {
	      ...PostFields
	      __typename
	    }
	    ... on Comment {
	      id
	      profile {
	        ...ProfileFields
	        __typename
	      }
	      collectNftAddress
	      reaction(request: $reactionRequest)
	      mirrors(by: $profileId)
	      bookmarked(by: $profileId)
	      notInterested(by: $profileId)
	      onChainContentURI
	      isGated
	      isDataAvailability
	      dataAvailabilityProofs
	      canComment(profileId: $profileId) {
	        result
	        __typename
	      }
	      canMirror(profileId: $profileId) {
	        result
	        __typename
	      }
	      canDecrypt(profileId: $profileId) {
	        result
	        reasons
	        __typename
	      }
	      stats {
	        ...StatsFields
	        __typename
	      }
	      createdAt
	      __typename
	    }
	    __typename
	  }
	  createdAt
	  appId
	  __typename
	}`,
      {
        profileId: null,
        request: {
          commentsOf: postId,
          commentsOfOrdering: "RANKING",
          commentsRankingFilter: "RELEVANT",
        },
        reactionRequest: null,
        limit: 30,
      }
    );
  },
};

if (!!onLoad && !loaded) {
  onLoad(LensSDK);
}
