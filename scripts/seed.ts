import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //

    // NationalHoliday entity
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
      await Promise.all(
        nationalHolidayData.map(async (data: Prisma.NationalHolidayCreateArgs['data']) => {
          const record = await db.nationalHoliday.create({ data })
          console.log(record)
        })
      )
    } else {
      console.log('National holidays already seeded')
    }

    // WorkingHoursSchema entity
    const workingHoursSchemaData: Prisma.WorkingHoursSchemaCreateArgs['data'][] = [
      { id: '8/5 no holidays', name: '8/5 no holidays', monday: 8, tuesday: 8, wednesday: 8, thursday: 8, friday: 8, saturday: 0, sunday: 0, holidayIfWeekend: 0, holidayIfWorkDay: 0 },
      { id: '8/5 with holidays', name: '8/5 with holidays', monday: 8, tuesday: 8, wednesday: 8, thursday: 8, friday: 8, saturday: 0, sunday: 0, holidayIfWeekend: 8, holidayIfWorkDay: 8 },
      { id: '8/5 with holidaysOnWorkdays', name: '8/5 with holidaysOnWorkdays', monday: 8, tuesday: 8, wednesday: 8, thursday: 8, friday: 8, saturday: 0, sunday: 0, holidayIfWeekend: 0, holidayIfWorkDay: 8 },
      { id: '4/5 no holidays', name: '4/5 no holidays', monday: 4, tuesday: 4, wednesday: 4, thursday: 4, friday: 4, saturday: 0, sunday: 0, holidayIfWeekend: 0, holidayIfWorkDay: 0 },
      { id: '4/5 with holidays', name: '4/5 with holidays', monday: 4, tuesday: 4, wednesday: 4, thursday: 4, friday: 4, saturday: 0, sunday: 0, holidayIfWeekend: 4, holidayIfWorkDay: 4 },
      { id: '4/5 with holidaysOnWorkDays', name: '4/5 with holidaysOnWorkDays', monday: 4, tuesday: 4, wednesday: 4, thursday: 4, friday: 4, saturday: 0, sunday: 0, holidayIfWeekend: 0, holidayIfWorkDay: 4 },
      { id: '8/7 no holidays', name: '8/7 no holidays', monday: 8, tuesday: 8, wednesday: 8, thursday: 8, friday: 8, saturday: 8, sunday: 8, holidayIfWeekend: 0, holidayIfWorkDay: 0 },
      { id: '8/7 with holidays', name: '8/7 with holidays', monday: 8, tuesday: 8, wednesday: 8, thursday: 8, friday: 8, saturday: 8, sunday: 8, holidayIfWeekend: 8, holidayIfWorkDay: 8 },
      { id: '8/7 with holidaysOnWorkDays', name: '8/7 with holidaysOnWorkDays', monday: 8, tuesday: 8, wednesday: 8, thursday: 8, friday: 8, saturday: 8, sunday: 8, holidayIfWeekend: 0, holidayIfWorkDay: 8 },
      { id: '24/7', name: '24/7', monday: 24, tuesday: 24, wednesday: 24, thursday: 24, friday: 24, saturday: 24, sunday: 24, holidayIfWeekend: 24, holidayIfWorkDay: 24 },
    ]
    if ((await db.workingHoursSchema.count()) === 0) {
      await Promise.all(
        workingHoursSchemaData.map(async (data: Prisma.WorkingHoursSchemaCreateArgs['data']) => {
          const record = await db.workingHoursSchema.create({ data })
          console.log(record)
        })
      )
    } else {
      console.log('Working hours schemas already seeded')
    }

    // OrganizationalUnit entity
    const organizationalUnitData: Prisma.OrganizationalUnitCreateArgs['data'][] = [
      { id: 'AI', name: 'AI', code: '0000' },
      { id: 'Technický úsek', name: 'Technický úsek', code: '9200', parentOrganizationalUnitId: 'AI' },
      { id: 'Reprografie', name: 'Reprografie', code: '9002', parentOrganizationalUnitId: 'AI' },
      { id: 'TODO majitel letadla', name: 'TODO majitel letadla', code: 'xxxx', parentOrganizationalUnitId: 'AI' },
      { id: 'Změnová služba a normalizace', name: 'Změnová služba a normalizace', code: '9211', parentOrganizationalUnitId: 'Technický úsek' },
      { id: 'Vývojová zkušebna', name: 'Vývojová zkušebna', code: '9232', parentOrganizationalUnitId: 'Technický úsek' },
      { id: 'Vývoj', name: 'Vývoj', code: '9203', parentOrganizationalUnitId: 'Technický úsek' },
      { id: 'Projekční a technické analýzy', name: 'Projekční a technické analýzy', code: '9201', parentOrganizationalUnitId: 'Technický úsek' },
      { id: 'Technologická příprava výroby', name: 'Technologická příprava výroby', code: '9220', parentOrganizationalUnitId: 'Technický úsek' },
      { id: 'Letová způsobilost a CAMO', name: 'Letová způsobilost a CAMO', code: '9233', parentOrganizationalUnitId: 'Technický úsek' },
      { id: 'Dokumentace a provoz', name: 'Dokumentace a provoz', code: '9231', parentOrganizationalUnitId: 'Technický úsek' },
    ]
    if ((await db.organizationalUnit.count()) === 0) {
      for (const data of organizationalUnitData) {
        const record = await db.organizationalUnit.create({ data })
        console.log(record)
      }
    } else {
      console.log('Organizational units already seeded')
    }

    // ResourceKind entity
    const resourceKindData: Prisma.ResourceKindCreateArgs['data'][] = [
      { id: 'Letadlo', name: 'Letadlo', hourlyCost: 1000, workingHoursSchemaId: '24/7' },
      { id: 'Zaměstnanec fulltime', name: 'Zaměstnanec fulltime', hourlyCost: 100, workingHoursSchemaId: '8/5 no holidays' },
      { id: 'Zaměstnanec parttime', name: 'Zaměstnanec parttime', hourlyCost: 100, workingHoursSchemaId: '4/5 no holidays' },
    ]
    if ((await db.resourceKind.count()) === 0) {
      await Promise.all(
        resourceKindData.map(async (data: Prisma.ResourceKindCreateArgs['data']) => {
          const record = await db.resourceKind.create({ data })
          console.log(record)
        })
      )
    } else {
      console.log('Resource kinds already seeded')
    }

    // ResourceCapability entity
    const resourceCapabilityData: Prisma.ResourceCapabilityCreateArgs['data'][] = [
      { id: 'Konstruktér', name: 'Konstruktér' },
      { id: 'Technolog', name: 'Technolog' },
      { id: 'Projektant', name: 'Projektant' },
      { id: 'Koordinátor', name: 'Koordinátor' },
      { id: 'Vedoucí pracovník', name: 'Vedoucí pracovník' },
      { id: 'Zkušební technik', name: 'Zkušební technik' },
    ]
    if ((await db.resourceCapability.count()) === 0) {
      await Promise.all(
        resourceCapabilityData.map(async (data: Prisma.ResourceCapabilityCreateArgs['data']) => {
          const record = await db.resourceCapability.create({ data })
          console.log(record)
        })
      )
    } else {
      console.log('Resource capabilities already seeded')
    }

    // Resource entity
    const resourceData: Prisma.ResourceCreateArgs['data'][] = [
      {
        id: 'clthhn0l9000008lbgw0wbhmu',
        name: 'Novák Petr',
        resourceCapabilities: { connect: [{ id: 'Vedoucí pracovník' }] },
        resourceKindId: 'Zaměstnanec fulltime',
        activeSince: new Date('2021-01-01'),
        activeUntil: undefined,
        organizationalUnitId: 'Technický úsek',
      },
      {
        id: 'clthhn6ri000108lb3gkx7c77',
        name: '5001',
        resourceKindId: 'Letadlo',
        activeSince: new Date('2024-01-01'),
        activeUntil: undefined,
        organizationalUnitId: 'TODO majitel letadla',
      },
      {
        id: 'clthhnhbk000208lb3ik4gvsq',
        name: 'Pokorný Luboš',
        resourceCapabilities: { connect: [{ id: 'Konstruktér' }] },
        resourceKindId: 'Zaměstnanec parttime',
        activeSince: new Date('2024-01-01'),
        activeUntil: new Date('2024-03-31'),
        organizationalUnitId: 'Vývoj',
      },
      {
        id: 'clthhnp1p000308lbb68x2avh',
        name: 'Kovář Jan',
        resourceCapabilities: { connect: [{ id: 'Technolog' }] },
        resourceKindId: 'Zaměstnanec fulltime',
        activeSince: new Date('2024-04-01'),
        activeUntil: undefined,
        organizationalUnitId: 'Vývojová zkušebna',
      },
      {
        id: 'clthhnw8d000408lbegmq2bdn',
        name: 'Kučera Jiří',
        resourceCapabilities: { connect: [{ id: 'Projektant' }] },
        resourceKindId: 'Zaměstnanec fulltime',
        activeSince: new Date('2024-02-01'),
        activeUntil: undefined,
        organizationalUnitId: 'Projekční a technické analýzy',
      },
      {
        id: 'clthho36g000508lb5k5w3sp9',
        name: 'Krejčí Pavel',
        resourceCapabilities: { connect: [{ id: 'Zkušební technik' }] },
        resourceKindId: 'Zaměstnanec fulltime',
        activeSince: new Date('2024-01-01'),
        activeUntil: new Date('2024-07-31'),
        organizationalUnitId: 'Vývojová zkušebna',
      },
    ]
    if ((await db.resource.count()) === 0) {
      await Promise.all(
        resourceData.map(async (data: Prisma.ResourceCreateArgs['data']) => {
          const record = await db.resource.create({ data })
          console.log(record)
        })
      )
    } else {
      console.log('Resources already seeded')
    }

    // ResourceLeave entity TODO
    const resourceLeaveData: Prisma.ResourceLeaveCreateArgs['data'][] = [

    ]
    if ((await db.resourceLeave.count()) === 0) {
      await Promise.all(
        resourceLeaveData.map(async (data: Prisma.ResourceLeaveCreateArgs['data']) => {
          const record = await db.resourceLeave.create({ data })
          console.log(record)
        })
      )
    } else {
      console.log('Resource leaves already seeded')
    }

    // ResourceAvailabilityOverride entity TODO
    const resourceAvailabilityOverrideData: Prisma.ResourceAvailabilityOverrideCreateArgs['data'][] = [

    ]
    if ((await db.resourceAvailabilityOverride.count()) === 0) {
      await Promise.all(
        resourceAvailabilityOverrideData.map(async (data: Prisma.ResourceAvailabilityOverrideCreateArgs['data']) => {
          const record = await db.resourceAvailabilityOverride.create({ data })
          console.log(record)
        })
      )
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
