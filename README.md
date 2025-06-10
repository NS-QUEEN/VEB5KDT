# Books App Frontend

See on React + Material-UI põhine äpp, mis võimaldab raamatuid sirvida, otsida, hallata ning lisada kommentaare.

## Funktsioonid

- Sisselogimine (Admin ja User rollid)
- Raamatute nimekiri ja otsing (pealkiri, autor, žanr)
- Raamatu detailvaade (info, kommentaarid)
- Adminil võimalus lisada, muuta, kustutada raamatuid
- Kasutaja saab lisada kommentaare
- Kasutajasessiooni haldus LocalStorage abil

## Käivitamine

1. Ava terminalis see kaust:
    
    frontend
    

2. Paigalda vajalikud paketid:
    
    npm install
    

3. Käivita arenduskeskkond:
    
    npm start
    

- Rakendus avaneb: http://localhost:3000
- Backend peab töötama http://localhost:4000

## Kasutajad (vaikimisi)

- **Admin:**  
  Kasutajanimi: `admin`  
  Parool: `admin123`

- **User:**  
  Kasutajanimi: `user`  
  Parool: `user123`

## Kasutatud tehnoloogiad

- [React](https://react.dev/)
- [Material-UI](https://mui.com/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)

## Märkused

- Andmed pärinevad backendist REST API kaudu
- Logi sisse enne rakenduse kasutamist
