#! /bin/bash

yarn rw prisma migrate dev
yarn rw g types
yarn rw prisma generate
./recreateSDLs.sh
yarn rw prisma db seed
