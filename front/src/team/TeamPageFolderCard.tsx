import React from "react";
import { Folder } from "./TeamPage";

const TeamPageFolderCard = ({
  folder,
  onClick,
}: {
  folder: Folder;
  onClick: () => void;
}) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-body">
        <div className="card-title">{folder.title}</div>
      </div>
    </div>
  );
};

export default TeamPageFolderCard;
