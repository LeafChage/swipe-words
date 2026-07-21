#!/bin/bash

version="$(cat manifest.json | jq -r .version)"
if ! [ -n "$(git tag --list | grep $version)" ]; then
    git tag -a "$version" -m "$version"
    git push origin "$version"
    echo "success"
    echo "you can relase, on https://github.com/LeafChage/obsidian-anki-card/releases"
else
    echo "already released, you should version up refering to manifest.json" 1>&2
fi



