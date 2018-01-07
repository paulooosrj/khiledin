#!/bin/sh
###########################
    # add all added/modified files
    git add -A
    # commit changes
    git commit -am "made changes"
    # push to git remote repository
    git push heroku master
    ###########################
    echo Press Enter...
read