import { Prisma } from '.prisma/client';

const resultAsResponse = Prisma.validator<Prisma.ResultArgs>()({
  select: {
    salmonId: true,
    bossCounts: true,
    bossKillCounts: true,
    dangerRate: true,
    startTime: true,
    playTime: true,
    endTime: true,
    jobResult: {
      select: {
        failureReason: true,
        failureWave: true,
        isClear: true,
      },
    },
    players: {
      select: {
        name: true,
        nsaid: true,
        bossKillCounts: true,
        deadCount: true,
        goldenIkuraNum: true,
        helpCount: true,
        ikuraNum: true,
        gradeId: true,
        gradePoint: true,
        gradePointDelta: true,
        specialId: true,
        specialCounts: true,
        weaponList: true,
      },
    },
    waves: {
      select: {
        waterLevel: true,
        eventType: true,
        ikuraNum: true,
        goldenIkuraNum: true,
        goldenIkuraPopNum: true,
        quotaNum: true,
      },
    },
  },
});

type ResultAsResponse = Prisma.ResultGetPayload<typeof resultAsResponse>;
