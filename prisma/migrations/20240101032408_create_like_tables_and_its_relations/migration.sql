/*
  Warnings:

  - You are about to drop the column `idUser` on the `tweets` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `tweets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tweets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tweets" DROP CONSTRAINT "tweets_idUser_fkey";

-- AlterTable
ALTER TABLE "Follow" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "tweets" DROP COLUMN "idUser",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id_user" UUID NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "likes" (
    "id" UUID NOT NULL,
    "id_user" UUID NOT NULL,
    "id_tweet" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_id_tweet_fkey" FOREIGN KEY ("id_tweet") REFERENCES "tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
