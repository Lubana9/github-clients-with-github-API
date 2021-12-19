export type RepoData = {
  name: Array<string>;
  avatar_url: string;
  owner: RepoOwner;
  stargazers_count: number;
  updated_at: string;
  id: number;
};

export type RepoOwner = {
  login: string;
};
