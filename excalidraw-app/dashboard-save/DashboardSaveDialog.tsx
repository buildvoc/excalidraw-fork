import { useEffect, useRef, useState } from "react";
import { useI18n } from "../../src/i18n";
import { KEYS } from "../../src/keys";

import { Dialog } from "../../src/components/Dialog";
import { TextField } from "../../src/components/TextField";
import { FilledButton } from "../../src/components/FilledButton";

import "./DashboardSaveDialog.scss";

import { getProjects } from "../api/project";
import { useAtom } from "jotai";
import { projectDialogShownAtom } from "../projects/Project";

export type DashboardSaveModalProps = {
  handleClose: () => void;
  setErrorMessage: (message: string) => void;
};

export const DashboardSaveModal = ({
  setErrorMessage,
  handleClose,
}: DashboardSaveModalProps) => {
  const { t } = useI18n();
  const ref = useRef<HTMLInputElement>(null);

  const [projectDialogShown, setProjectDialogShown] = useAtom(projectDialogShownAtom);
  const [title, setTitle] = useState<string>("Untilted");
  const [selectedProject, setSelectedProject] = useState<string>();
  
  const [projects, setProjects] = useState<any>([]);
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const resp = await getProjects();
        setProjects(resp);
      } catch (error: any) {
        const msg = error.response?.data?.message[0] || "Load projects failed!";
        setErrorMessage(msg);
      }
    };
    loadProjects();
  }, [projectDialogShown]);

  const handleSubmit = async () => {
    try {

      console.log(selectedProject, title);
      
      
    } catch (error: any) {
      const msg = error.response?.data?.message[0] || "Save to dashboard failed!";
      setErrorMessage(msg);
    }
  };

  return (
    <>
      <h3 className="DashboardSaveDialog__active__header">
        Save to project...
      </h3>
      <TextField
        placeholder="Title"
        label="Title"
        value={title}
        onChange={setTitle}
        onKeyDown={(event) => event.key === KEYS.ENTER && handleSubmit()}
      />
      <div className="ExcTextField--fullWidth">
        <div className="ExcTextField__label">
          Select project or {" "}
          <a className="ExcTextField__link"
            onClick={() => setProjectDialogShown(true)}
            >Add new</a>
        </div>
        <select
          className="dropdown-select dropdown-select__proj"
          onChange={({ target }) => setSelectedProject(target.value)}
          value={selectedProject}
          aria-label={"Select project"}
          style={{width: "100%"}}
        >
          {projects.map((item: any) => (
            <option key={item.id} value={item.id}>
              {item.projectName}
            </option>
          ))}
        </select>
      </div>
      <div className="DashboardSaveDialog__active__description">
        <p>{t("encrypted.tooltip")}</p>
      </div>

      <div className="DashboardSaveDialog__active__actions">
        <FilledButton
          size="large"
          variant="outlined"
          color="primary"
          label={t("buttons.cancel")}
          onClick={handleClose}
        />
        <FilledButton
          size="large"
          label={t("buttons.confirm")}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

const DashboardSaveDialog = (props: DashboardSaveModalProps) => {
  return (
    <Dialog size="small" onCloseRequest={props.handleClose} title={false}>
      <div className="DashboardSaveDialog">
        <DashboardSaveModal {...props} />
      </div>
    </Dialog>
  );
};

export default DashboardSaveDialog;
