-- CreateTable
CREATE TABLE "HolidayRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "fromDate" DATETIME NOT NULL,
    "toDate" DATETIME NOT NULL,
    "numberOfDays" INTEGER NOT NULL,
    "typeId" TEXT NOT NULL,
    CONSTRAINT "HolidayRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HolidayRequest_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "HolidayType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HolidayType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
