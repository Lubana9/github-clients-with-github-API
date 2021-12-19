import {
  GitHubRepoOwnerApi,
  GitHubRepoOwnerModel,
  normalizeGithubRepoOwner,
} from "./githubRepoOwner";
export type RepoItemApi = {
  id: number;
  url: string;
  name: string;
  stargazers_count: number;
  pushed_at: string;
  owner: GitHubRepoOwnerApi;
};

export type RepoItemModel = {
  id: number;
  url: string;
  name: string;
  stargazersCount: number;
  pushedAt: string;
  owner: GitHubRepoOwnerModel;
};

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
  id: from.id,
  url: from.url,
  name: from.name,
  stargazersCount: from.stargazers_count,
  pushedAt: from.pushed_at,
  owner: normalizeGithubRepoOwner(from.owner),
});
