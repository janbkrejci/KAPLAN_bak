#! /bin/bash

# this script recreates forcefully all sdls

# for each sdl in ['resource', 'resourceKind', 'resourceCapability', 'workingHoursSchema', 'resourceLeave', 'resourceLeaveType', 'resourceAvailabilityOverride', 'organizationalUnit']
# repeat the following:
# yarn rw g sdl <sdl> -f

for sdl in resource resourceKind resourceCapability workingHoursSchema resourceLeave resourceLeaveType resourceAvailabilityOverride organizationalUnit
do
  yarn rw g sdl $sdl -f
  # if error, exit
  if [ $? -ne 0 ]; then
    exit 1
  fi
done
