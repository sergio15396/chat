# WeChat - Aplicació de Xat en Temps Real

WeChat és una aplicació de xat en temps real desenvolupada amb FastAPI i WebSockets que permet la comunicació instantània entre usuaris.

## Característiques Principals

### Nivell 1: Funcionalitat Bàsica
- Aplicació web funcional amb servidor FastAPI
- Comunicació en temps real mitjançant WebSockets
- Interfície d'usuari moderna i responsiva

### Nivell 2: Comunicació Multi-Client
- Suport per múltiples connexions simultànies
- Sincronització en temps real entre diferents finestres
- Visualització immediata dels missatges en totes les sessions obertes

### Nivell 3: Identificació d'Usuaris
- Sistema d'identificació per nom d'usuari
- Visualització del nom de l'usuari en cada missatge
- Interfície personalitzada per cada usuari

### Nivell 4: Sales de Xat
- Creació de sales de xat independents
- Aïllament de missatges per sala

### Nivell 5: Sistema d'Administració
- Creació automàtica d'administradors per sala
- Funcionalitats d'administrador:
  - Designació d'altres administradors
  - Esborrat de missatges

### Nivell 6: Multi-Sala
- Suport per múltiples sales simultànies
- Historial de missatges per sala
- Persistència de missatges entre sessions

### Nivell 7: Funcionalitats Innovadores
- Mode fosc/clar amb persistència
- Interfície moderna amb Font Awesome
- Disseny responsiu i adaptatiu
- Animacions i transicions suaus
- Modal per accions d'administrador
- Notificacions d'entrada/sortida d'usuaris

## Requisits Tècnics

- Python 3.7+
- FastAPI
- WebSockets
- HTML5
- CSS3
- JavaScript

## Instal·lació

1. Clona el repositori:
```bash
git clone [URL_DEL_REPOSITORI]
```

2. Instal·la les dependències:
```bash
pip install -r requirements.txt
```

3. Executa la comanda:
```bash
uvicorn server:app --reload
```

4. Obre el navegador a `http://localhost:8000`

## Ús

1. Introdueix el teu nom d'usuari
2. Crea o uneix-te a una sala existent
3. Comença a xatejar!

### Funcions d'Administrador
- Crea una sala per convertir-te en administrador
- Utilitza el botó d'administrador per designar nous admins
- Utilitza el botó d'esborrar per eliminar missatges

## Llicència

Aquest projecte està llicenciat sota la llicència MIT. 
