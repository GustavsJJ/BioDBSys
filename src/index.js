import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";
import {
  getAction,
  getEditorResult,
  getExportInfo,
  selectSeqFile,
  selectWorkspaceDirectory,
} from "./dialogs.js";
import {
  combineTwoFormatedStrings,
  exportFile,
  getFileSequence,
  getLineIndexes,
  getWorkspaceWIP,
  inputValid,
  saveWIP,
} from "./utils.js";
import { ACTIONS } from "./strings.js";

inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);

let WORKSPACE_DIR = "";
let CURRENT_SEQ = "";

const dialogLoop = async () => {
  const action = await getAction();

  switch (action) {
    case ACTIONS.SHOW:
      console.log(`\n${CURRENT_SEQ}\n`);
      await dialogLoop();
      break;
    case ACTIONS.ADD:
      const filePath = await selectSeqFile(WORKSPACE_DIR);
      const fileContents = getFileSequence(filePath);
      CURRENT_SEQ = combineTwoFormatedStrings(CURRENT_SEQ, fileContents);
      await dialogLoop();
      break;
    case ACTIONS.EDIT:
      const edited = await getEditorResult(CURRENT_SEQ);
      if (inputValid(edited)) {
        CURRENT_SEQ = edited;
      } else {
        console.log("\x1b[31m  Error: Input invalid; changes not saved!");
      }
      await dialogLoop();
      break;
    case ACTIONS.DELETE:
      CURRENT_SEQ = "";
      console.log("\x1b[33m  Current sequence is deleted!");
      await dialogLoop();
      break;
    case ACTIONS.EXPORT:
      const origin = getLineIndexes(CURRENT_SEQ);
      const answers = await getExportInfo();
      exportFile({ ...answers, origin, dirName: WORKSPACE_DIR });
      console.log("\x1b[32m  File exported!");
      await dialogLoop();
      break;
    case ACTIONS.EXIT:
      saveWIP(WORKSPACE_DIR, CURRENT_SEQ);
      break;
  }
};

const start = async () => {
  console.log("\x1b[42m BioDBSys \x1b[40m ");
  console.log("\x1b[32m Made by: GustavsJJ \x1b[30m" + "\n");
  WORKSPACE_DIR = await selectWorkspaceDirectory();
  CURRENT_SEQ = getWorkspaceWIP(WORKSPACE_DIR);
  await dialogLoop();
};

start();
