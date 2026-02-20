@echo off
REM -----------------------------
REM Ultimate Professional GitHub Push Script
REM -----------------------------

REM Use current folder name as repo name
FOR %%* IN (.) DO SET RepoName=%%~n*

REM Use current folder as project path
SET ProjectPath=%CD%

REM Ask user for repository visibility
SET /P RepoVisibility=Do you want the repository to be public or private? (public/private): 

REM Ask user for branch name
SET /P BranchName=Enter the branch name to push (default: main): 
IF "%BranchName%"=="" SET BranchName=main

REM Generate commit message with date and time
FOR /F "tokens=1-4 delims=/ " %%a IN ('date /t') DO SET Date=%%a-%%b-%%c
FOR /F "tokens=1-2 delims=: " %%a IN ('time /t') DO SET Time=%%a-%%b
SET CommitMessage=Update_%Date%_%Time%

cd /d "%ProjectPath%"

REM Initialize Git if not already
git init

REM Check for changes
git add .
git diff --cached --quiet
IF ERRORLEVEL 1 (
    git commit -m "%CommitMessage%"
    SET DidCommit=1
) ELSE (
    echo No changes detected. Skipping commit.
    SET DidCommit=0
)

REM Check if remote repository exists
gh repo view %RepoName% >nul 2>&1
IF ERRORLEVEL 1 (
    echo Repository not found. Creating repository on GitHub...
    gh repo create %RepoName% --%RepoVisibility% --source=. --remote=origin --push
) ELSE (
    echo Repository exists. Pushing updates...
    git remote remove origin >nul 2>&1
    git remote add origin git@github.com:HamoideAbd/%RepoName%.git
    git branch -M %BranchName%
    git push -u origin %BranchName%
)

REM Log the push details
IF NOT EXIST GitPushLog.txt echo Git Push Log > GitPushLog.txt
IF %DidCommit%==1 (
    echo %Date% %Time% - Branch: %BranchName% - Commit: %CommitMessage% >> GitPushLog.txt
) ELSE (
    echo %Date% %Time% - Branch: %BranchName% - No changes to commit >> GitPushLog.txt
)

echo.
echo -----------------------------
echo Project "%RepoName%" pushed successfully!
echo Branch: %BranchName%
echo Commit message: %CommitMessage%
echo -----------------------------
pause