/*
  Warnings:

  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_id_user_followed_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_id_user_follower_fkey";

-- DropTable
DROP TABLE "Follow";

-- CreateTable
CREATE TABLE "follow" (
    "id_user_follower" UUID NOT NULL,
    "id_user_followed" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id_user_follower","id_user_followed")
);

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_id_user_follower_fkey" FOREIGN KEY ("id_user_follower") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_id_user_followed_fkey" FOREIGN KEY ("id_user_followed") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
