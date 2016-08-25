#!/usr/bin/env bash

rm -rf ./git/hooks/pre-commit
cp hooks/* .git/hooks
echo "Git hooks has been successfully installed!"
