-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "number_of_people" INTEGER NOT NULL,
    "booking_time" TIMESTAMP(3) NOT NULL,
    "booker_first_name" TEXT NOT NULL,
    "booker_last_name" TEXT NOT NULL,
    "booker_phone" TEXT NOT NULL,
    "booker_email" TEXT NOT NULL,
    "booker_occasion" TEXT NOT NULL,
    "booker_request" TEXT NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tables" (
    "id" SERIAL NOT NULL,
    "seats" INTEGER NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings_on_tables" (
    "booking_id" INTEGER NOT NULL,
    "table_id" INTEGER NOT NULL,

    CONSTRAINT "bookings_on_tables_pkey" PRIMARY KEY ("booking_id","table_id")
);

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings_on_tables" ADD CONSTRAINT "bookings_on_tables_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings_on_tables" ADD CONSTRAINT "bookings_on_tables_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
