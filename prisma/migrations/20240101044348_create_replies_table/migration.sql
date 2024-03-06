-- CreateTable
CREATE TABLE "replies" (
    "id" UUID NOT NULL,
    "id_user" UUID NOT NULL,
    "id_tweet" UUID NOT NULL,
    "content" VARCHAR(140) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "replies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_id_tweet_fkey" FOREIGN KEY ("id_tweet") REFERENCES "tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
