#! /bin/bash

yarn rw prisma migrate dev
./recreateSDLs.sh
yarn rw prisma db seed
