# my_first_steps
https://github.com/viniciusna/my_first_steps.git

vinic@LAPTOP-E0COG5FP MINGW64 ~/Documents/Programação/my_first_steps (master)
$ echo "# my_first_steps" >> Readme.md

vinic@LAPTOP-E0COG5FP MINGW64 ~/Documents/Programação/my_first_steps
$ git init
Initialized empty Git repository in C:/Users/vinic/Documents/Programação/my_first_steps/.git/

vinic@LAPTOP-E0COG5FP MINGW64 ~/Documents/Programação/my_first_steps (master)
$ git add .
warning: LF will be replaced by CRLF in Readme.md.
The file will have its original line endings in your working directory

vinic@LAPTOP-E0COG5FP MINGW64 ~/Documents/Programação/my_first_steps (master)
$ git commit -m "primeiro commit"
[master (root-commit) bc9adc4] primeiro commit
 1 file changed, 1 insertion(+)
 create mode 100644 Readme.md

vinic@LAPTOP-E0COG5FP MINGW64 ~/Documents/Programação/my_first_steps (master)
$ git branch -M master

vinic@LAPTOP-E0COG5FP MINGW64 ~/Documents/Programação/my_first_steps (master)
$ git remote add origin https://github.com/viniciusna/my_first_steps.git

vinic@LAPTOP-E0COG5FP MINGW64 ~/Documents/Programação/my_first_steps (master)
$ git push -u origin master
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 238 bytes | 238.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/viniciusna/my_first_steps.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.

vinic@LAPTOP-E0COG5FP MINGW64 ~/Documents/Programação/my_first_steps (master)
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   Readme.md

no changes added to commit (use "git add" and/or "git commit -a")

vinic@LAPTOP-E0COG5FP MINGW64 ~/Documents/Programação/my_first_steps (master)
$ git add Readme.md
warning: LF will be replaced by CRLF in Readme.md.
The file will have its original line endings in your working directory

vinic@LAPTOP-E0COG5FP MINGW64 ~/Documents/Programação/my_first_steps (master)
$ git commit -m "segundo commit"
[master 45d6c00] segundo commit
 1 file changed, 35 insertions(+)

vinic@LAPTOP-E0COG5FP MINGW64 ~/Documents/Programação/my_first_steps (master)
$ git push origin master
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 794 bytes | 794.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/viniciusna/my_first_steps.git
   bc9adc4..45d6c00  master -> master

serei_ignorado.txt