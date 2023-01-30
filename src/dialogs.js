import os from "os";
import inquirer from "inquirer";
import { ACTIONS } from "./strings.js";

export const selectWorkspaceDirectory = async () => {
  const directoryPath = (
    await inquirer.prompt([
      {
        type: "file-tree-selection",
        name: "directory",
        message: "Choose workspace directory!",
        onlyShowDir: true,
        enableGoUpperDirectory: true,
        root: os.homedir(),
      },
    ])
  ).directory;
  return directoryPath;
};

export const getAction = async () => {
  const answer = (
    await inquirer.prompt([
      {
        type: "list",
        name: "dialog",
        message: "Choose action:",
        choices: Object.values(ACTIONS),
      },
    ])
  ).dialog;
  return answer;
};

export const selectSeqFile = async (workspaceDir) => {
  const filePath = (
    await inquirer.prompt([
      {
        type: "file-tree-selection",
        name: "file",
        message: "Choose nucleotid sequence file!",
        validate: (str) => {
          if (str.endsWith(".seq")) return true;
        },
        onlyShowValid: true,
        root: workspaceDir,
      },
    ])
  ).file;
  return filePath;
};

export const getEditorResult = async (currentContent) => {
  const editorText = (
    await inquirer.prompt([
      {
        type: "editor",
        name: "editorText",
        message: "Edit",
        default: currentContent,
      },
    ])
  ).editorText;
  return editorText.trim();
};

export const getExportInfo = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "fileName",
      message: "Enter file name: ",
    },
    {
      type: "input",
      name: "locus",
      message: "Locus name: ",
    },
    {
      type: "input",
      name: "reference",
      message: "Reference: ",
      default: 1,
    },
    {
      type: "input",
      name: "authors",
      message: "Authors: ",
    },
  ]);
  return answers;
};
