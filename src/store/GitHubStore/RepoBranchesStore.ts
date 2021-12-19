import ApiStore from "@store/ApiStore";
import { HTTPMethod } from "@store/ApiStore/types";
import {
  normalaizRepoBranches,
  RepoBranchesApi,
  RepoBranchesModel,
} from "@store/modules/github/repoBranches";
import {
  CollectionModel,
  getIniitCollectionModels,
  linearizedCollection,
  normalaizCollection,
} from "@store/modules/shared/collection";
import { Meta } from "@utils/Meta";
import { ILocalStore } from "@utils/UseLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import {
  getBranchesList,
  GetOrganizationRepoBranchesParams,
  IBranches,
} from "./types";

const BASE_URL = "https://api.github.com";
type PrivateFilds = "_branches" | "_meta";
export default class RepoBranchStore implements IBranches, ILocalStore {
  private readonly apiStore = new ApiStore(BASE_URL);
  private _meta: Meta = Meta.initial;
  private _branches: CollectionModel<string, RepoBranchesModel> =
    getIniitCollectionModels();

  constructor() {
    makeObservable<RepoBranchStore, PrivateFilds>(this, {
      _branches: observable.ref,
      _meta: observable,
      metaBranches: computed,
      branches: computed,
      getBranchesList: action,
    });
  }
  get metaBranches(): Meta {
    return this._meta;
  }
  get branches(): RepoBranchesModel[] {
    return linearizedCollection(this._branches);
  }
  async getBranchesList(
    params: GetOrganizationRepoBranchesParams
  ): Promise<void> {
    this._meta = Meta.loading;
    this._branches = getIniitCollectionModels();
    const response = await this.apiStore.request<RepoBranchesApi[]>({
      method: HTTPMethod.get,
      data: {},
      headers: {},
      endpoint: getBranchesList(params.owner, params.repo),
    });
    runInAction(() => {
      if (response.success) {
        try {
          const branches: RepoBranchesModel[] = [];
          for (const item of response.data) {
            branches.push(normalaizRepoBranches(item));
          }
          this._meta = Meta.succses;
          this._branches = normalaizCollection(
            branches,
            (item) => item.commit.sha
          );
          return;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
          this._meta = Meta.error;
          this._branches = getIniitCollectionModels();
        }
      }
    });
  }

  destroy() {}
}
