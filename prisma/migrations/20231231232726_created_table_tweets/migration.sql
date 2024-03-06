-- CreateTable
CREATE TABLE "tweets" (
    "id" UUID NOT NULL,
    "idUser" UUID NOT NULL,
    "content" VARCHAR(140) NOT NULL,

    CONSTRAINT "tweets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
