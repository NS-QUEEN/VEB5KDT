# Books App Backend

See on Node.js/Express põhine API, mis teenindab raamatute, kasutajate ja logide päringuid.

## Funktsioonid

- JWT-põhine autentimine (Admin ja User rollid)
- CRUD raamatute jaoks (Adminil kõik õigused, User saab vaadata ja kommenteerida)
- Kommenteerimine raamatutele (User ja Admin)
- Tegevuste logimine (uue raamatu lisamine, muutmine, kustutamine, kommentaaride lisamine)
- Demo andmed JSON failides

## Käivitamine

1. Ava terminalis see kaust:
    
    backend
    

2. Paigalda vajalikud paketid:
    
    npm install
    

3. Käivita server:
    
    node server.js
    

- API on saadaval aadressil: http://localhost:4000/api

## Kasutajad (vaikimisi)

- **Admin:**  
  Kasutajanimi: `admin`  
  Parool: `admin123`

- **User:**  
  Kasutajanimi: `user`  
  Parool: `user123`

## Andmefailid

- `books.json` – raamatud
- `users.json` – kasutajad
- `logs.json` – tegevuste logi

Failid asuvad backend kaustas ja on lihtsalt muudetavad.

## API Põhiteed

- POST `/api/login` – sisselogimine, tagastab JWT
- GET `/api/books` – raamatute nimekiri (otsinguga)
- GET `/api/books/:id` – ühe raamatu detailid
- POST `/api/books` – lisa uus raamat (Admin)
- PUT `/api/books/:id` – muuda raamatut (Admin)
- DELETE `/api/books/:id` – kustuta raamat (Admin)
- POST `/api/books/:id/comments` – lisa kommentaar (User/Admin)
- GET `/api/logs` – vaata logisid (Admin)

## Märkused

- Kasutatud failipõhine salvestus
- Server tuleb käivitada enne frontend'i
