#!/bin/bash

artist=$(playerctl metadata xesam:artist)
title=$(playerctl metadata xesam:title)

echo "$artist - $title"