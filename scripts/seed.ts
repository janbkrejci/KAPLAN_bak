import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    await db.resource.deleteMany();
    console.log("Resources count: ", await db.resource.count());
    await db.resourceAvailabilityOverride.deleteMany();
    console.log("Resource Availability Overrides count: ", await db.resourceAvailabilityOverride.count());
    await db.resourceLeave.deleteMany();
    console.log("Resource Leaves count: ", await db.resourceLeave.count());
    await db.resourceCapability.deleteMany();
    console.log("Resource Capabilities count: ", await db.resourceCapability.count());
    await db.resourceKind.deleteMany();
    console.log("Resource Kinds count: ", await db.resourceKind.count());
    await db.workingHoursSchema.deleteMany();
    console.log("Working Hours Schemas count: ", await db.workingHoursSchema.count());
    await db.organizationalUnit.deleteMany();
    console.log("Organizational Units count: ", await db.organizationalUnit.count());
    await db.nationalHoliday.deleteMany();
    console.log("National Holidays count: ", await db.nationalHoliday.count());


    // NationalHoliday entity - 13 records
    const nationalHolidayData: Prisma.NationalHolidayCreateArgs['data'][] = [
      { day: 1, month: 1, name: 'Nový rok' },
      { day: 1, month: 5, name: 'Svátek práce' },
      { day: 8, month: 5, name: 'Den vítězství' },
      { day: 5, month: 7, name: 'Den slovanských věrozvěstů Cyrila a Metoděje' },
      { day: 6, month: 7, name: 'Den upálení mistra Jana Husa' },
      { day: 28, month: 9, name: 'Den české státnosti' },
      { day: 28, month: 10, name: 'Den vzniku samostatného československého státu' },
      { day: 17, month: 11, name: 'Den boje za svobodu a demokracii' },
      { day: 24, month: 12, name: 'Štědrý den' },
      { day: 25, month: 12, name: '1. svátek vánoční' },
      { day: 26, month: 12, name: '2. svátek vánoční' },
      { day: 29, month: 3, year: 2024, name: 'Velký pátek' },
      { day: 1, month: 4, year: 2024, name: 'Velikonoční pondělí' },
    ]
    if ((await db.nationalHoliday.count()) === 0) {
      for (const data of nationalHolidayData) {
        await db.nationalHoliday.create({ data });
      }
      console.log("National Holidays count: ", await db.nationalHoliday.count());
    } else {
      console.log('National holidays already seeded')
    }

    // WorkingHoursSchema entity - 10 records
    const workingHoursSchemaData: Prisma.WorkingHoursSchemaCreateArgs['data'][] = [
      { name: '8/5 no holidays', monday: 8, tuesday: 8, wednesday: 8, thursday: 8, friday: 8, saturday: 0, sunday: 0, holidayIfWeekend: 0, holidayIfWorkDay: 0 },
      { name: '8/5 with holidays', monday: 8, tuesday: 8, wednesday: 8, thursday: 8, friday: 8, saturday: 0, sunday: 0, holidayIfWeekend: 8, holidayIfWorkDay: 8 },
      { name: '8/5 with holidaysOnWorkdays', monday: 8, tuesday: 8, wednesday: 8, thursday: 8, friday: 8, saturday: 0, sunday: 0, holidayIfWeekend: 0, holidayIfWorkDay: 8 },
      { name: '4/5 no holidays', monday: 4, tuesday: 4, wednesday: 4, thursday: 4, friday: 4, saturday: 0, sunday: 0, holidayIfWeekend: 0, holidayIfWorkDay: 0 },
      { name: '4/5 with holidays', monday: 4, tuesday: 4, wednesday: 4, thursday: 4, friday: 4, saturday: 0, sunday: 0, holidayIfWeekend: 4, holidayIfWorkDay: 4 },
      { name: '4/5 with holidaysOnWorkDays', monday: 4, tuesday: 4, wednesday: 4, thursday: 4, friday: 4, saturday: 0, sunday: 0, holidayIfWeekend: 0, holidayIfWorkDay: 4 },
      { name: '8/7 no holidays', monday: 8, tuesday: 8, wednesday: 8, thursday: 8, friday: 8, saturday: 8, sunday: 8, holidayIfWeekend: 0, holidayIfWorkDay: 0 },
      { name: '8/7 with holidays', monday: 8, tuesday: 8, wednesday: 8, thursday: 8, friday: 8, saturday: 8, sunday: 8, holidayIfWeekend: 8, holidayIfWorkDay: 8 },
      { name: '8/7 with holidaysOnWorkDays', monday: 8, tuesday: 8, wednesday: 8, thursday: 8, friday: 8, saturday: 8, sunday: 8, holidayIfWeekend: 0, holidayIfWorkDay: 8 },
      { name: '24/7', monday: 24, tuesday: 24, wednesday: 24, thursday: 24, friday: 24, saturday: 24, sunday: 24, holidayIfWeekend: 24, holidayIfWorkDay: 24 },
    ]
    if ((await db.workingHoursSchema.count()) === 0) {
      for (const data of workingHoursSchemaData) {
        await db.workingHoursSchema.create({ data });
      }
      console.log("Working Hours Schemas count: ", await db.workingHoursSchema.count());
    } else {
      console.log('Working hours schemas already seeded')
    }

    // OrganizationalUnit entity - 11 records
    const organizationalUnitData: Prisma.OrganizationalUnitCreateArgs['data'][] = [
      { name: 'AI', code: '0000' },
      { name: 'Technický úsek', code: '9200', parentOrganizationalUnit: { connect: { name: 'AI' } } },
      { name: 'Reprografie', code: '9002', parentOrganizationalUnit: { connect: { name: 'AI' } } },
      { name: 'TODO majitel letadla', code: 'xxxx', parentOrganizationalUnit: { connect: { name: 'AI' } } },
      { name: 'Změnová služba a normalizace', code: '9211', parentOrganizationalUnit: { connect: { name: 'Technický úsek' } } },
      { name: 'Vývojová zkušebna', code: '9232', parentOrganizationalUnit: { connect: { name: 'Technický úsek' } } },
      { name: 'Vývoj', code: '9203', parentOrganizationalUnit: { connect: { name: 'Technický úsek' } } },
      { name: 'Projekční a technické analýzy', code: '9201', parentOrganizationalUnit: { connect: { name: 'Technický úsek' } } },
      { name: 'Technologická příprava výroby', code: '9220', parentOrganizationalUnit: { connect: { name: 'Technický úsek' } } },
      { name: 'Letová způsobilost a CAMO', code: '9233', parentOrganizationalUnit: { connect: { name: 'Technický úsek' } } },
      { name: 'Dokumentace a provoz', code: '9231', parentOrganizationalUnit: { connect: { name: 'Technický úsek' } } },
    ]
    if ((await db.organizationalUnit.count()) === 0) {
      for (const data of organizationalUnitData) {
        // const record =
        await db.organizationalUnit.create({ data })
        // console.log(record)
      }
      console.log("Organizational Units count: ", await db.organizationalUnit.count());
    } else {
      console.log('Organizational units already seeded')
    }

    // ResourceKind entity - 3 records
    const resourceKindData: Prisma.ResourceKindCreateArgs['data'][] = [
      { name: 'Letadlo', hourlyCost: 1000, workingHoursSchema: { connect: { name: '24/7' } } },
      { name: 'Zaměstnanec fulltime', hourlyCost: 100, workingHoursSchema: { connect: { name: '8/5 no holidays' } } },
      { name: 'Zaměstnanec parttime', hourlyCost: 100, workingHoursSchema: { connect: { name: '4/5 no holidays' } } }
    ]
    if ((await db.resourceKind.count()) === 0) {
      for (const data of resourceKindData) {
        await db.resourceKind.create({ data });
      }
      console.log("Resource Kinds count: ", await db.resourceKind.count());
    } else {
      console.log('Resource kinds already seeded')
    }

    // ResourceCapability entity
    const resourceCapabilityData: Prisma.ResourceCapabilityCreateArgs['data'][] = [
      { name: 'Konstruktér' },
      { name: 'Technolog' },
      { name: 'Projektant' },
      { name: 'Koordinátor' },
      { name: 'Vedoucí pracovník' },
      { name: 'Zkušební technik' },
    ]
    if ((await db.resourceCapability.count()) === 0) {
      for (const data of resourceCapabilityData) {
        await db.resourceCapability.create({ data });
      }
      console.log("Resource Capabilities count: ", await db.resourceCapability.count());
    } else {
      console.log('Resource capabilities already seeded')
    }

    // Resource entity
    const resourceData: Prisma.ResourceCreateArgs['data'][] = [
      {
        id: 'clthhn0l9000008lbgw0wbhmu',
        name: 'Novák Petr',
        resourceCapabilities: { connect: [{ name: 'Vedoucí pracovník' }] },
        resourceKind: { connect: { name: 'Zaměstnanec fulltime' } },
        activeSince: new Date('2021-01-01'),
        activeUntil: undefined,
        organizationalUnit: { connect: { name: 'Technický úsek' } },
      },
      {
        id: 'clthhn6ri000108lb3gkx7c77',
        name: '5001',
        resourceKind: { connect: { name: 'Letadlo' } },
        activeSince: new Date('2024-01-01'),
        activeUntil: undefined,
        organizationalUnit: { connect: { name: 'TODO majitel letadla' } },
      },
      {
        id: 'clthhnhbk000208lb3ik4gvsq',
        name: 'Pokorný Luboš',
        resourceCapabilities: { connect: [{ name: 'Konstruktér' }] },
        resourceKind: { connect: { name: 'Zaměstnanec parttime' } },
        activeSince: new Date('2024-01-01'),
        activeUntil: new Date('2024-03-31'),
        organizationalUnit: { connect: { name: 'Vývoj' } },
      },
      {
        id: 'clthhnp1p000308lbb68x2avh',
        name: 'Kovář Jan',
        resourceCapabilities: { connect: [{ name: 'Technolog' }] },
        resourceKind: { connect: { name: 'Zaměstnanec fulltime' } },
        activeSince: new Date('2024-04-01'),
        activeUntil: undefined,
        organizationalUnit: { connect: { name: 'Vývojová zkušebna' } },
      },
      {
        id: 'clthhnw8d000408lbegmq2bdn',
        name: 'Kučera Jiří',
        resourceCapabilities: { connect: [{ name: 'Projektant' }] },
        resourceKind: { connect: { name: 'Zaměstnanec fulltime' } },
        activeSince: new Date('2024-02-01'),
        activeUntil: undefined,
        organizationalUnit: { connect: { name: 'Projekční a technické analýzy' } },
      },
      {
        id: 'clthho36g000508lb5k5w3sp9',
        name: 'Krejčí Pavel',
        resourceCapabilities: { connect: [{ name: 'Zkušební technik' }] },
        resourceKind: { connect: { name: 'Zaměstnanec fulltime' } },
        activeSince: new Date('2024-01-01'),
        activeUntil: new Date('2024-07-31'),
        organizationalUnit: { connect: { name: 'Vývojová zkušebna' } },
      },
    ]
    if ((await db.resource.count()) === 0) {
      for (const data of resourceData) {
        await db.resource.create({ data });
      }
      console.log("Resources count: ", await db.resource.count());
    } else {
      console.log('Resources already seeded')
    }

    // ResourceLeave entity TODO
    const resourceLeaveData: Prisma.ResourceLeaveCreateArgs['data'][] = [
      // for each resource create 3 leave records in random dates one before activeSince,
      // one after activeUntil(if it exists, otherwise in may 2024, one in between,
      // all in 2024 if possible
      // length of leave should be randomly between 1 and 10 days
      // workingHours at first and last day should be randomly either 0 or half of their workinghoursschema daily hours
      // resource should be set to existing resource using { connect: { name: '(resource name)' }
      { description: 'Novák Petr 2024-01-01(0) to 2024-01-03(0)', resource: { connect: { name: 'Novák Petr' } }, dateFrom: new Date('2024-01-01'), dateTo: new Date('2024-01-03'), firstDayWorkingHours: 0, lastDayWorkingHours: 0 },
      { description: 'Novák Petr 2024-01-15(4) to 2024-01-24(4)', resource: { connect: { name: 'Novák Petr' } }, dateFrom: new Date('2024-01-15'), dateTo: new Date('2024-01-24'), firstDayWorkingHours: 4, lastDayWorkingHours: 0 },
      { description: 'Novák Petr 2024-02-15(0) to 2024-02-17(0)', resource: { connect: { name: 'Novák Petr' } }, dateFrom: new Date('2024-02-15'), dateTo: new Date('2024-02-17'), firstDayWorkingHours: 0, lastDayWorkingHours: 0 },
      { description: 'Pokorný Luboš 2024-01-01(0) to 2024-01-03(0)', resource: { connect: { name: 'Pokorný Luboš' } }, dateFrom: new Date('2024-01-01'), dateTo: new Date('2024-01-03'), firstDayWorkingHours: 0, lastDayWorkingHours: 0 },
      { description: 'Pokorný Luboš 2024-01-15(4) to 2024-01-24(4)', resource: { connect: { name: 'Pokorný Luboš' } }, dateFrom: new Date('2024-01-15'), dateTo: new Date('2024-01-24'), firstDayWorkingHours: 0, lastDayWorkingHours: 4 },
      { description: 'Pokorný Luboš 2024-02-15(0) to 2024-02-17(0)', resource: { connect: { name: 'Pokorný Luboš' } }, dateFrom: new Date('2024-02-15'), dateTo: new Date('2024-02-17'), firstDayWorkingHours: 0, lastDayWorkingHours: 0 },
      { description: 'Kovář Jan 2024-01-01(0) to 2024-01-03(0)', resource: { connect: { name: 'Kovář Jan' } }, dateFrom: new Date('2024-01-01'), dateTo: new Date('2024-01-03'), firstDayWorkingHours: 0, lastDayWorkingHours: 0 },
      { description: 'Kovář Jan 2024-01-15(4) to 2024-01-24(4)', resource: { connect: { name: 'Kovář Jan' } }, dateFrom: new Date('2024-01-15'), dateTo: new Date('2024-01-24'), firstDayWorkingHours: 4, lastDayWorkingHours: 4 },
      { description: 'Kovář Jan 2024-02-15(0) to 2024-02-17(0)', resource: { connect: { name: 'Kovář Jan' } }, dateFrom: new Date('2024-02-15'), dateTo: new Date('2024-02-17'), firstDayWorkingHours: 0, lastDayWorkingHours: 0 },
      { description: 'Kučera Jiří 2024-01-01(0) to 2024-01-03(0)', resource: { connect: { name: 'Kučera Jiří' } }, dateFrom: new Date('2024-01-01'), dateTo: new Date('2024-01-03'), firstDayWorkingHours: 0, lastDayWorkingHours: 0 },
      { description: 'Kučera Jiří 2024-01-15(4) to 2024-01-24(4)', resource: { connect: { name: 'Kučera Jiří' } }, dateFrom: new Date('2024-01-15'), dateTo: new Date('2024-01-24'), firstDayWorkingHours: 0, lastDayWorkingHours: 4 },
      { description: 'Kučera Jiří 2024-02-15(0) to 2024-02-17(0)', resource: { connect: { name: 'Kučera Jiří' } }, dateFrom: new Date('2024-02-15'), dateTo: new Date('2024-02-17'), firstDayWorkingHours: 0, lastDayWorkingHours: 0 },
      { description: 'Krejčí Pavel 2024-01-01(0) to 2024-01-03(0)', resource: { connect: { name: 'Krejčí Pavel' } }, dateFrom: new Date('2024-01-01'), dateTo: new Date('2024-01-03'), firstDayWorkingHours: 0, lastDayWorkingHours: 0 },
      { description: 'Krejčí Pavel 2024-01-15(4) to 2024-01-24(4)', resource: { connect: { name: 'Krejčí Pavel' } }, dateFrom: new Date('2024-01-15'), dateTo: new Date('2024-01-24'), firstDayWorkingHours: 4, lastDayWorkingHours: 0 },
      { description: 'Krejčí Pavel 2024-02-15(0) to 2024-02-17(0)', resource: { connect: { name: 'Krejčí Pavel' } }, dateFrom: new Date('2024-02-15'), dateTo: new Date('2024-02-17'), firstDayWorkingHours: 0, lastDayWorkingHours: 0 },
    ]
    if ((await db.resourceLeave.count()) === 0) {
      for (const data of resourceLeaveData) {
        await db.resourceLeave.create({ data });
      }
      console.log("Resource Leaves count: ", await db.resourceLeave.count());
    } else {
      console.log('Resource leaves already seeded')
    }

    // ResourceAvailabilityOverride entity TODO
    const resourceAvailabilityOverrideData: Prisma.ResourceAvailabilityOverrideCreateArgs['data'][] = [
      // for each resource create 3 override records in random dates one before activeSince,
      // one after activeUntil(if it exists, otherwise in may 2024, one in between,
      // all in 2024 if possible
      // and dailyHours should be set to 0 to 8 hours randomly
      // resource should be set to existing resource using { connect: { name: '(resource name)' }
      {
        description: 'první dekáda v lednu všichni jen 4 hodiny denně',
        dateFrom: new Date('2024-01-01'), dateTo: new Date('2024-01-10'), dailyHoursAvailable: 4,
        resources: {
          connect: [{ name: 'Novák Petr' },
          { name: 'Pokorný Luboš' },
          { name: 'Kovář Jan' },
          { name: 'Kučera Jiří' },
          { name: 'Krejčí Pavel' }]
        }
      },
      {
        description: 'druhá dekáda v únoru všichni jen 6 hodin denně',
        dateFrom: new Date('2024-02-11'), dateTo: new Date('2024-02-20'), dailyHoursAvailable: 6,
        resources: {
          connect: [{ name: 'Novák Petr' },
          { name: 'Pokorný Luboš' },
          { name: 'Kovář Jan' },
          { name: 'Kučera Jiří' },
          { name: 'Krejčí Pavel' }]
        }
      },
      {
        description: 'třetí dekáda v březnu někteří jen 2 hodiny denně',
        dateFrom: new Date('2024-03-21'), dateTo: new Date('2024-03-31'), dailyHoursAvailable: 2,
        resources: {
          connect: [{ name: 'Novák Petr' },
          { name: 'Pokorný Luboš' },
          { name: 'Kovář Jan' },
          ]
        }
      },
    ]
    if ((await db.resourceAvailabilityOverride.count()) === 0) {
      for (const data of resourceAvailabilityOverrideData) {
        // const record =
        await db.resourceAvailabilityOverride.create({ data })
        // console.log(record)
      }
      console.log("Resource Availability Overrides count: ", await db.resourceAvailabilityOverride.count());
    } else {
      console.log('Resource availability overrides already seeded')
    }
    // Update "const data = []" to match your data model and seeding needs
    //
    // const data: Prisma.UserExampleCreateArgs['data'][] = [
    //   // To try this example data with the UserExample model in schema.prisma,
    //   // uncomment the lines below and run 'yarn rw prisma migrate dev'
    //   //
    //   // { name: 'alice', email: 'alice@example.com' },
    //   // { name: 'mark', email: 'mark@example.com' },
    //   // { name: 'jackie', email: 'jackie@example.com' },
    //   // { name: 'bob', email: 'bob@example.com' },
    // ]
    // console.log(
    //   "\nUsing the default './scripts/seed.ts' template\nEdit the file to add seed data\n"
    // )

    // if ((await db.userExample.count()) === 0) {
    //   // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    //   // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    //   await Promise.all(
    //     //
    //     // Change to match your data model and seeding needs
    //     //
    //     data.map(async (data: Prisma.UserExampleCreateArgs['data']) => {
    //       const record = await db.userExample.create({ data })
    //       console.log(record)
    //     })
    //   )
    // } else {
    //   console.log('Users already seeded')
    // }

    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:
    //
    //   import { hashPassword } from '@redwoodjs/auth-dbauth-api'
    //
    //   const users = [
    //     { name: 'john', email: 'john@example.com', password: 'secret1' },
    //     { name: 'jane', email: 'jane@example.com', password: 'secret2' }
    //   ]
    //
    //   for (const user of users) {
    //     const [hashedPassword, salt] = hashPassword(user.password)
    //     await db.user.create({
    //       data: {
    //         name: user.name,
    //         email: user.email,
    //         hashedPassword,
    //         salt
    //       }
    //     })
    //   }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
