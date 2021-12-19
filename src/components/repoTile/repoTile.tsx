import React from "react";

import Avatar from "@components/avatar";
import "./style.scss";
import StarIcon from "@components/starIcon/index";
import { RepoItemModel } from "@store/modules/github";

export type RepoTileProps = {
  repos: RepoItemModel;
};
const RepoTile: React.FC<RepoTileProps> = ({ repos }) => {
  return (
    <div className="card card-primary">
      <Avatar letter={repos.name[0]} src={repos.owner.avatarUrl} alt="img" />
      <div className="card-body">
        <h4 className="card-heading">{repos.name}</h4>
        <div className="card-link">
          {" "}
          <a className="card-link_txt " href="https://kts.studio/">
            {repos.owner.login}
          </a>
        </div>
        <div className="card-content ">
          <StarIcon />
          <span className="card-content_txt">
            {repos.stargazersCount}&ensp; {repos.pushedAt}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RepoTile);
