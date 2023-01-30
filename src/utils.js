import fs from "fs";
import path from "path";

export const inputValid = (str) => {
  const regex =
    /^(([acgt]{10} ){5}[acgt]{10}\n)*(([acgt]{10} ){0,5}[acgt]{1,10})?$/;
  const validation = str.match(regex);
  return !!validation;
};

export const getLineFirstWord = (string) => {
  return string.trim().split(" ")[0];
};

export const getSequenceOfLine = (string) => {
  return string.trim().split(" ").slice(1).join(" ");
};

export const getFileSequence = (pathToFile) => {
  const lines = fs.readFileSync(pathToFile, "utf8").split("\n");
  const from = lines.findIndex((line) => getLineFirstWord(line) === "ORIGIN");
  const to = lines.findIndex((line) => getLineFirstWord(line) === "//");
  const sequence = lines
    .slice(from, to)
    .map((line) => getSequenceOfLine(line))
    .join("\n")
    .trim();
  return sequence;
};

export const getWorkspaceWIP = (workspacePath) => {
  const wipFilePath = path.join(workspacePath, "temp.txt");
  if (fs.existsSync(wipFilePath)) {
    return fs.readFileSync(wipFilePath, "utf8");
  } else {
    return "";
  }
};

export const saveWIP = (workspacePath, sequence) => {
  fs.writeFileSync(path.join(workspacePath, "temp.txt"), sequence, "utf8");
};

export const removeWhitespaces = (string) => {
  return string.replace(/[ \n]+/g, "");
};

export const formatString = (string) => {
  const spaces = string.replace(/(.{10})/g, "$1 ");
  return spaces.replace(/((?:[^ ]* ){5}[^ ]*)[ ]/g, "$1\n");
};

export const combineTwoFormatedStrings = (str1, str2) => {
  const combination = removeWhitespaces(str1) + removeWhitespaces(str2);
  return formatString(combination);
};

export const formatIndexSpacing = (number) => {
  const times = 9 - number.toString().length;
  return " ".repeat(times) + number.toString();
};

export const getLineIndexes = (string) => {
  if (string) {
    const lines = string.split("\n");
    return lines
      .map((line, i) => `${formatIndexSpacing(60 * i + 1)} ${line}`)
      .join("\n");
  } else {
    return "";
  }
};

export const exportFile = (info) => {
  const { fileName, locus, reference, authors, origin, dirName } = info;
  const fileContent =
    `LOCUS       ${locus}\n` +
    `REFERENCE   ${reference}\n` +
    `  AUTHORS   ${authors}\n` +
    `ORIGIN\n${origin}\n//\n`;
  fs.writeFileSync(
    path.join(dirName, `${fileName ? fileName : "_"}.seq`),
    fileContent,
    "utf8"
  );
};
