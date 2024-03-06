-- CreateTable
CREATE TABLE "Follow" (
    "id_user_follower" UUID NOT NULL,
    "id_user_followed" UUID NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id_user_follower","id_user_followed")
);

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_id_user_follower_fkey" FOREIGN KEY ("id_user_follower") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_id_user_followed_fkey" FOREIGN KEY ("id_user_followed") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
