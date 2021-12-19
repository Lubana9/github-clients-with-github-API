/* eslint-disable no-console */
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";

import { BranchesOutlined } from "@ant-design/icons";
import Button from "@components/button";
import Input from "@components/input";
import RepoTile from "@components/repoTile";
import "./style.scss";
import SearchIcon from "@components/searchIcon";
import { routes } from "@config/configs";
import "antd/dist/antd.css";
import ReposListStore from "@store/GitHubStore";
import RepoBranchesStore from "@store/GitHubStore/RepoBranchesStore";
import { Meta } from "@utils/Meta";
import { useLocalStore } from "@utils/UseLocalStore";
import { Drawer, Skeleton, Empty, Popover } from "antd";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
const repoContext = createContext({
  repos: [],
});

export const useReposContext = () => useContext(repoContext);

const ReposSearchPage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const githubStore = useLocalStore(() => new ReposListStore());
  const repoBranchesStore = useLocalStore(() => new RepoBranchesStore());
  useEffect(() => {
    githubStore.getOrganizationReposList({
      organizaionName: "ktsstudio",
    });
  }, [githubStore]);

  const getDetails = (reponame: string, owner: string) => {
    repoBranchesStore.getBranchesList({
      repo: reponame,
      owner: owner,
    });
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handelClick = useCallback(() => {
    if (githubStore.value) {
      githubStore.getOrganizationReposList({
        organizaionName: githubStore.value,
      });
    } else {
      githubStore.getOrganizationReposList({
        organizaionName: "ktsstudio",
      });
    }
  }, [githubStore]);

  const handelChange = useCallback(
    (value: string): string => {
      return githubStore.setValue(value);
    },
    [githubStore]
  );

  return (
    <>
      <div className="grid grid-1x2">
        <form className="input-group">
          <Input value={githubStore.value} onChange={handelChange} />
          <Button isLoading={githubStore.meta} onClick={handelClick}>
            <SearchIcon />
          </Button>
        </form>
      </div>
      {githubStore.meta === Meta.loading && <Skeleton active />}
      {githubStore.list.length ? (
        <>
          <InfiniteScroll
            dataLength={githubStore.list.length}
            next={() =>
              setTimeout(() => {
                githubStore.GetAdditionalOrganization({
                  additionalOrganizaionName: githubStore.value,
                });
              }, 1500)
            }
            hasMore={true}
            loader={""}
          >
            <div className="grid grid--1x3" onClick={showDrawer}>
              {githubStore.list.map((user) => {
                return (
                  <Link
                    className="card-link_txt"
                    to={routes.reposDetails.create(`${user.id}`)}
                    onClick={() =>
                      getDetails(`${user.name}`, `${user.owner.login}`)
                    }
                  >
                    <RepoTile key={user.id} repos={user} />
                  </Link>
                );
              })}
            </div>
          </InfiniteScroll>
        </>
      ) : (
        <>{githubStore.meta === Meta.error ? <Empty /> : <></>}</>
      )}
      <div>
        <Drawer
          title={<BranchesOutlined />}
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          {repoBranchesStore.branches.map((branches: any) => {
            return (
              <Popover
                placement="left"
                content={
                  <div> {branches.protected === true ? "Yes" : "No"} </div>
                }
                title=" Protected"
              >
                <Link
                  key={branches.commit.sha}
                  className="card-link_txt"
                  to={routes.reposDetails.create(`${branches.commit.sha}`)}
                >
                  <ul>
                    <li>{branches.name}</li>
                  </ul>
                </Link>
              </Popover>
            );
          })}
        </Drawer>
      </div>
    </>
  );
};

export default observer(ReposSearchPage);
