Comp 3008 Project 2

Part 1 - Data cleaning/formatting
- open index.html in a web browser
- upload image and text data 
Part 2 - Implementing a new system



Part 2 testing with participants
ID's 0-2 - Jeremy
ID's 3-5 - Jordan
ID's 6-7 - Esti
ID's 8-9 - Shaan

Process:
Message in group that you are about to begin a test, so that only one person is
running test at any given time, thus preventing merge conflicts, and keeping data
more organized

git pull
go to part 2 directory

Run these 6 commands with every participant:
python SamplePassScheme.py learn {id} Email
python SamplePassScheme.py learn {id} Banking
python SamplePassScheme.py learn {id} Shopping
python SamplePassScheme.py enter {id} Email
python SamplePassScheme.py enter {id} Banking
python SamplePassScheme.py enter {id} Shopping

If above commands don't work, run 'pip install pygame'

git add .
git commit -a -m "Completed tests for participant {id}"
git push

Message group that your test is complete