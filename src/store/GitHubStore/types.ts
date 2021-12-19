export type GetOrganizationReposListParams = {
  organizaionName: string;
};

export type GetAdditionalOrganization = {
  additionalOrganizaionName: string;
};

export type GetOrganizationRepoBranchesParams = {
  owner: string;
  repo: string;
};

export const getBranchesList = (owner: string, repo: string) =>
  `/repos/${owner}/${repo}/branches`;

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;
}

export interface IBranches {
  getBranchesList(params: GetOrganizationRepoBranchesParams): Promise<void>;
}
