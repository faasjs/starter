#!/bin/bash

if [[ -z "$@" ]];
then
  echo -e 'Usage: \e[33mstart <service A> <service B>\e[0m'
  echo 'Supported service list: api www'
  echo 'Example: start api www'
  exit 0
fi

PID_LIST=''

for cmd in "$@"; do {
  case $cmd in
    api)
      yarn --cwd /root/app/api dev | awk '{ print "[\e[32mapi\e[0m]", $0 }' & pid=$!
    ;;
    www)
      yarn --cwd /root/app/www dev | awk '{ print "[\e[32mwww\e[0m]", $0 }' & pid=$!
    ;;
    *)
      echo -e "\e[91mUnknown service $cmd\e[0m"
      if [ -n "$PID_LIST" ]
      then
        kill $PID_LIST
      fi
      exit 0
    ;;
  esac
  PID_LIST+=" $pid";
} done

trap "kill $PID_LIST" SIGINT

wait $PID_LIST
