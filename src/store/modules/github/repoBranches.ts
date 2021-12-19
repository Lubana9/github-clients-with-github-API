export type RepoBranchesApi = {
  name: string;
  commit: commit;
  protected: boolean;
};

export type commit = {
  sha: string;
  url: string;
};

export type RepoBranchesModel = {
  name: string;
  commit: commit;
  protected: boolean;
};

export const normalaizRepoBranches = (
  from: RepoBranchesApi
): RepoBranchesModel => ({
  name: from.name,
  commit: from.commit,
  protected: from.protected,
});
