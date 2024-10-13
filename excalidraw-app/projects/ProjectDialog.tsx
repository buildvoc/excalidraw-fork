import { useState } from "react";
import { useI18n } from "../../src/i18n";
import { KEYS } from "../../src/keys";

import { Dialog } from "../../src/components/Dialog";
import { TextField } from "../../src/components/TextField";
import { FilledButton } from "../../src/components/FilledButton";

import { toast } from "react-toastify";

import "./ProjectDialog.scss";
import { addProject } from "../api/project";

export type ProjectModalProps = {
  handleClose: () => void;
  setErrorMessage: (message: string) => void;
};

export const ProjectModal = ({
  setErrorMessage,
  handleClose,
}: ProjectModalProps) => {
  const { t } = useI18n();

  const [projectName, setProjectName] = useState<string>("");

  const handleSubmit = async () => {
    try {
      await addProject({projectName});
      toast.success("New Project created.");
      handleClose();
    } catch (error: any) {
      const msg = error.response?.data?.message[0] || "Create project failed!";
      setErrorMessage(msg);
    }
  };

  return (
    <>
      <h3 className="ProjectDialog__active__header">
        Create new project
      </h3>
      <TextField
        placeholder="Name"
        label="Enter project name"
        onChange={setProjectName}
        onKeyDown={(event) => event.key === KEYS.ENTER && handleSubmit()}
      />
      <div className="ProjectDialog__active__description">
        <p>{t("encrypted.tooltip")}</p>
      </div>

      <div className="ProjectDialog__active__actions">
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

const ProjectDialog = (props: ProjectModalProps) => {
  return (
    <Dialog size="small" onCloseRequest={props.handleClose} title={false}>
      <div className="ProjectDialog">
        <ProjectModal {...props} />
      </div>
    </Dialog>
  );
};

export default ProjectDialog;
