# Практичні роботи з вебпрограмування

ПР-19, ПР-21 і ПР-25 — самостійні роботи JavaScript. ПР-24 розміщена у вебчастині PostService. ПР-26 та ПР-26–27 використовують його API. Основа поштового застосунку — [проєкт із компонентів програмної інженерії](https://github.com/On1-kode/posta3.0-ta-inshi-practichni).

| Робота | Де знаходиться |
| --- | --- |
| ПР-19 Середня оцінка | pr19 |
| ПР-21 Типи даних і ПДВ | pr21 |
| ПР-24 Основи ООП | PostServiceSolution/PostService/wwwroot/pr24 |
| ПР-25 Калькулятор | pr25 |
| ПР-26 Fetch API | PostServiceSolution/PostService/wwwroot/shipments |
| ПР-26–27 Форма | PostServiceSolution/PostService/wwwroot/shipments/edit.html та edit.js |
| ПР-28 Docker | Dockerfile та папка pr28 |

Початкова таблиця — `shipments/baseline.html`, таблиця за заголовками — `shipments/index.html`. HTTP-запити для перевірки API — `postings.rest`.

Для ПР-19, ПР-21 і ПР-25 відкрийте файл index.html у відповідній папці. Сервер для них не потрібен.

## Запуск PostService

Потрібні .NET SDK 10 і .NET 8 Runtime.

```powershell
dotnet run --project PostServiceSolution/PostService
```

Початковий вебклієнт: http://localhost:5082/. Таблиця Fetch API: http://localhost:5082/shipments/. Форма: http://localhost:5082/shipments/edit.html. Swagger: http://localhost:5082/swagger/.

ПР-24: http://localhost:5082/pr24/ (у Docker — http://localhost:8080/pr24/).

Відправлення зберігаються в SQLite. Windows-клієнт також залишився в рішенні `PostServiceSolution/PostService.slnx`.

## Docker

```powershell
docker build -t veb-practical .
docker run -d --name veb-practical -p 127.0.0.1:8080:8080 --mount type=volume,source=veb-postservice-data,target=/data veb-practical
```

Сайт: http://localhost:8080. База зберігається в томі `veb-postservice-data`.

Статичний Nginx-сайт для вправи ПР-28:

```powershell
docker build -t my-static-website ./pr28
docker run -d --name static-website -p 127.0.0.1:8081:80 my-static-website
```

Адреса: http://localhost:8081. Після зміни `pr28/html/index.html` потрібно зупинити та видалити контейнер `static-website`, перебудувати образ і запустити його знову.
