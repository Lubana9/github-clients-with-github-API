/* eslint-disable no-console */
import {
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "@store/modules/github";
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

import ApiStore from "../ApiStore";
import { HTTPMethod } from "../ApiStore/types";
import {
  GetOrganizationReposListParams,
  IGitHubStore,
  GetAdditionalOrganization,
} from "./types";
const baseUrl = "https://api.github.com";

type PrivateFilds =
  | "_list"
  | "_meta"
  | "_value"
  | "_repo"
  | "_pageNumber"
  | "_selectedRepo";
export default class ReposListStore implements IGitHubStore, ILocalStore {
  private readonly apiStore = new ApiStore(baseUrl);
  private _list: CollectionModel<number, RepoItemModel> =
    getIniitCollectionModels();
  private _repo: RepoItemModel[] = [];
  private _selectedRepo: RepoItemModel | null = null;
  private _meta: Meta = Meta.initial;
  private _value: string = "";
  private _pageNumber: number = 1;
  constructor() {
    makeObservable<ReposListStore, PrivateFilds>(this, {
      _list: observable.ref,
      _repo: observable,
      _meta: observable,
      _value: observable,
      _pageNumber: observable,
      _selectedRepo: observable,
      list: computed,
      meta: computed,
      page: computed,
      selectedRepo: computed,
      getOrganizationReposList: action,
      GetAdditionalOrganization: action,
      setValue: action,
      setList: action,
    });
  }

  get list(): RepoItemModel[] {
    return linearizedCollection(this._list);
  }
  get meta(): Meta {
    return this._meta;
  }

  get value(): string {
    return this._value;
  }

  get page(): number {
    return this._pageNumber;
  }

  get selectedRepo(): RepoItemModel | null {
    return this._selectedRepo;
  }

  setValue(value: string): string {
    return (this._value = value);
  }
  setList(repo: RepoItemModel[]) {
    this._repo = repo;
  }

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void> {
    this._meta = Meta.loading;
    this._list = getIniitCollectionModels();
    this._pageNumber = 1;
    const response = await this.apiStore.request<RepoItemApi[]>({
      method: HTTPMethod.get,
      data: {
        page: this._pageNumber,
        pages: 100,
      },
      headers: {},
      endpoint: `/orgs/${params.organizaionName}/repos`,
    });

    runInAction(() => {
      if (response.success) {
        try {
          const list: RepoItemModel[] = [];
          for (const item of response.data) {
            list.push(normalizeRepoItem(item));
          }
          this._meta = Meta.succses;
          this._pageNumber++;
          this._list = normalaizCollection(list, (item) => item.id);
          return;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
          this._meta = Meta.error;
          this._list = getIniitCollectionModels();
        }
      }
    });
  }

  async GetAdditionalOrganization(
    params: GetAdditionalOrganization
  ): Promise<void> {
    this._meta = Meta.loading;
    this._list = getIniitCollectionModels();
    const response = await this.apiStore.request<RepoItemApi[]>({
      method: HTTPMethod.get,
      data: {
        page: this._pageNumber,
        pages: 100,
      },
      headers: {},
      endpoint: `/orgs/${params.additionalOrganizaionName}/repos`,
    });

    runInAction(() => {
      if (response.success) {
        try {
          const list: RepoItemModel[] = [];
          for (const item of response.data) {
            list.push(normalizeRepoItem(item));
          }
          this._meta = Meta.succses;
          this._pageNumber++;
          this._list = normalaizCollection(list, (item) => item.id);
          return;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
          this._meta = Meta.error;
          this._list = getIniitCollectionModels();
        }
      }
    });
  }
  // private readonly _qsReaction: IReactionDisposer = reaction(
  //   () => rootStore.query.getParam("search"),
  //   (search) => {
  //     // return this.getOrganizationReposList({search});
  //   }
  // );

  destroy() {}
}
