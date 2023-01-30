# BioDBSys

## Project decription

This project was made for univeristy purposes, but it also has contributed to obtaining new knowledge in making .exe files for a specific platform.

BioDBSys is software capable of processing nucleotide sequence records with a command-line user interface. Examples of nucleotide sequence records can be viewed at the following website: https://ftp.ncbi.nih.gov/genbank.

## Running the program

There are two ways how you can launch the program:

- The easiest way is to open terminal in the specified directory and run commands:

  `npm install; npm start`
  
  This will open the program in the terminal.

- The other option is to run command:

  `npm run build`
  
  This will create a `.exe` file for Windows x64 architecture which can be launched.

## Description of actions

1. Using the keyboard arrows and the Enter key, you must select the working directory in this
the directory will store all the information.
2. After selecting the directory, 6 main actions are offered that can be performed. This dialogue
opens after each operation except "Exit".
3. The "Show current content" action prints the nucleotide sequence that is being processed.
4. The action "Add sequence from a file" adds a sequence from another .seq to the sequence to be processed
files. This file to be added is selected from the working directory.
5. The "Edit sequence manually" action opens the local machine's default .txt editor, which contains
the sequence to be processed is visible. You can edit the sequence in the editor, then save the file and it
to close. Closing the editor returns the user to the action menu.
6. The action "Delete sequence" deletes the sequence to be processed.
7. The “Export sequence” action creates a .seq file from the sequence to be processed, but before that
the user is asked some additional questions - file name and other required
information to successfully create a .seq file.
8. The “Exit” operation saves the sequence to be processed in a temporary “temp.txt” file in the working directory, and
the program terminates by closing the command line window. When the program is launched from this
the working directory itself, the “temp.txt” file (if it exists) is read, the information is
loaded and can be processed again before closing the program sequence.
