1. Зайди в папку backend и добавить файл .env
2. Записать в него:
   DATABASE_URL="file:./dev.db"
3. В терминале выполнить команды
   npx prisma migrate dev --name init
   npx prisma generate
