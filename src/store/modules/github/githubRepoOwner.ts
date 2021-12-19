export type GitHubRepoOwnerApi = {
  id: number;
  url: string;
  avatar_url: string;
  login: string;
};

export type GitHubRepoOwnerModel = {
  id: number;
  url: string;
  avatarUrl: string;
  login: string;
};

export const normalizeGithubRepoOwner = (
  from: GitHubRepoOwnerApi
): GitHubRepoOwnerModel => ({
  id: from.id,
  url: from.url,
  avatarUrl: from.avatar_url,
  login: from.login,
});
