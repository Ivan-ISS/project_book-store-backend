# project_book-store-backend

:exclamation::exclamation::exclamation: В корне проекта создан файл __project_book-store-backend.postman_collection.json__, где сохранен результат экспорта документации из postman для того чтобы быстро развернуть ее на своем устройстве в postman. Также ниже приводится копия документации в текущем описании.

:exclamation: ***Деплой проекта выполнен с использованием Vercel.***
Ссылка на адрес приложения для выполнения запросов: https://project-book-store-backend.vercel.app/

## Цель:
***Создадать API для книжного интернет-магазина Book store с использованием Express.js, Prisma ORM, а также сервиса Supabase с базой данных PostgreSQL***

__Проект *Book store*__ - это приложение "интернет магазин" с реализацией серверной части.<br>

## Список эндпоинтов
### Эндпоинты для книг:

&nbsp; :heavy_check_mark: __GET /api/v1/books__ — получение списка книг. Принимает следующие параметры строки:
- perPage — количество выводимых книг в запросе;
- page — постраничный вывод книг;
- category — категория выводимых книг (может принимать массив сразу с несколькими категориями).

&nbsp; :heavy_check_mark: __POST /api/v1/books__ — добавление книги. В теле запроса принимает данные для книги:
- название книги;
- год выпуска;
- категории, к которым относится книга;
- автор;
- стоимость в определенной валюте.

&nbsp; :heavy_check_mark: __PUT /api/v1/books/:id__ — редактирование книги. В теле запроса можно отправить произвольное количество полей, которые необходимо отредактировать.

&nbsp; :heavy_check_mark: __DELETE /api/v1/books/:id__ — удаление книги по идентификатору.<br><br>

### Эндпоинты для категорий:

&nbsp; :heavy_check_mark: __GET /api/v1/categories__ — получение списка категорий, принимает параметры page и perPage.

&nbsp; :heavy_check_mark: __POST, PUT, DELETE__ — для категорий. Аналогичны эндпоинтам для книг.<br><br>

### Эндпоинты для пользователей:

&nbsp; :heavy_check_mark: __POST /api/v1/user/login__ — авторизация по электронной почте или логину. После авторизации эндпоинт возвращает JWT-токен.

&nbsp; :heavy_check_mark: __POST /api/v1/user/register__ — регистрация. Принимает такие же параметры в теле запроса, как /api/v1/user/login и возвращает JWT-токены после регистрации. Регистрация создает нового пользователя в базе данных.

&nbsp; :heavy_check_mark: __GET /api/v1/user/books__ — список книг, которые сохранил пользователь.

&nbsp; :heavy_check_mark: __PUT /api/v1/user/:id__ — редактирование данных о пользователе. Пользователь может редактировать своё имя или описание о себе.

&nbsp; :heavy_check_mark: __DELETE /api/v1/user/:id__ — удаление пользователя.<br><br>

### Эндпоинты для рейтинга книг:

&nbsp; :heavy_check_mark: __POST /api/v1/rating__ — добавление рейтинга. Рейтинг не может быть добавлен, если пользователь не авторизован.<br><br>

# Ниже приведена документация

# 📁 Collection: books 


## End-point: books list
### Method: GET
>```
>http://project-book-store-backend.vercel.app/api/v1/books?perPage=6&page=1&category=Travel
>```
### Query Params

|Param|value|
|---|---|
|perPage|6|
|page|1|
|category|Travel|


### Response: 201
```json
[
    {
        "id": 1,
        "name": "Architecture",
        "price": "8.79",
        "language": "En",
        "description": "The aim of this book is to expand the subject and matter of architecture, and to explore their interdependence",
        "yearPublished": 2001,
        "currencyId": 1,
        "authors": [
            {
                "bookId": 1,
                "authorId": 1,
                "author": {
                    "id": 1,
                    "firstName": "Jonathan",
                    "lastName": "Hill",
                    "yearsActive": "1935-2023"
                }
            },
            {
                "bookId": 1,
                "authorId": 2,
                "author": {
                    "id": 2,
                    "firstName": "Emily",
                    "lastName": "Thompson",
                    "yearsActive": "1945-present"
                }
            },
            {
                "bookId": 1,
                "authorId": 3,
                "author": {
                    "id": 3,
                    "firstName": "Peter",
                    "lastName": "Galison",
                    "yearsActive": "1948-present"
                }
            }
        ],
        "categories": [
            {
                "bookId": 1,
                "categoryId": 1,
                "category": {
                    "id": 1,
                    "name": "Architecture"
                }
            },
            {
                "bookId": 1,
                "categoryId": 5,
                "category": {
                    "id": 5,
                    "name": "Crafts & Hobbies"
                }
            }
        ],
        "currency": {
            "id": 1,
            "name": "Russian Ruble",
            "acronym": "RUB"
        }
    },
    {
        "id": 2,
        "name": "Some Essays on Golf-Course Architecture",
        "price": "5.79",
        "language": "En",
        "description": "Some Essays on Golf-Course Architecture features selected writings from prominent architects of the early 20th century",
        "yearPublished": 2020,
        "currencyId": 1,
        "authors": [
            {
                "bookId": 2,
                "authorId": 3,
                "author": {
                    "id": 3,
                    "firstName": "Peter",
                    "lastName": "Galison",
                    "yearsActive": "1948-present"
                }
            }
        ],
        "categories": [
            {
                "bookId": 2,
                "categoryId": 2,
                "category": {
                    "id": 2,
                    "name": "Art"
                }
            },
            {
                "bookId": 2,
                "categoryId": 6,
                "category": {
                    "id": 6,
                    "name": "Drama"
                }
            }
        ],
        "currency": {
            "id": 1,
            "name": "Russian Ruble",
            "acronym": "RUB"
        }
    },
    {
        "id": 3,
        "name": "The Architecture of Science",
        "price": "10.59",
        "language": "En",
        "description": "Table of Contents The Architecture of Science by Galison, Peter L. (Editor); Edelman, Shimon (Editor); Thompson, Emily (Editor)",
        "yearPublished": 1999,
        "currencyId": 1,
        "authors": [
            {
                "bookId": 3,
                "authorId": 3,
                "author": {
                    "id": 3,
                    "firstName": "Peter",
                    "lastName": "Galison",
                    "yearsActive": "1948-present"
                }
            }
        ],
        "categories": [
            {
                "bookId": 3,
                "categoryId": 3,
                "category": {
                    "id": 3,
                    "name": "Biography & Autobiography"
                }
            }
        ],
        "currency": {
            "id": 1,
            "name": "Russian Ruble",
            "acronym": "RUB"
        }
    },
    {
        "id": 4,
        "name": "Architecture Subjects Itself",
        "price": "1.79",
        "language": "En",
        "description": "Best description",
        "yearPublished": 1993,
        "currencyId": 1,
        "authors": [
            {
                "bookId": 4,
                "authorId": 2,
                "author": {
                    "id": 2,
                    "firstName": "Emily",
                    "lastName": "Thompson",
                    "yearsActive": "1945-present"
                }
            }
        ],
        "categories": [
            {
                "bookId": 4,
                "categoryId": 4,
                "category": {
                    "id": 4,
                    "name": "Business"
                }
            }
        ],
        "currency": {
            "id": 1,
            "name": "Russian Ruble",
            "acronym": "RUB"
        }
    },
    {
        "id": 5,
        "name": "Architecture for a Free Subjectivity",
        "price": "3.39",
        "language": "En",
        "description": "Architecture for a Free Subjectivity reformulates the French philosopher Gilles Deleuze`s model of subjectivity for architecture",
        "yearPublished": 2013,
        "currencyId": 1,
        "authors": [
            {
                "bookId": 5,
                "authorId": 3,
                "author": {
                    "id": 3,
                    "firstName": "Peter",
                    "lastName": "Galison",
                    "yearsActive": "1948-present"
                }
            }
        ],
        "categories": [
            {
                "bookId": 5,
                "categoryId": 5,
                "category": {
                    "id": 5,
                    "name": "Crafts & Hobbies"
                }
            }
        ],
        "currency": {
            "id": 1,
            "name": "Russian Ruble",
            "acronym": "RUB"
        }
    },
    {
        "id": 6,
        "name": "Golf Architecture: Economy in Course Construction and Green-Keeping",
        "price": "88.15",
        "language": "En",
        "description": "Golf Architecture: Economy in Course Construction and Green-Keeping\\\" by A. Mackenzie",
        "yearPublished": 2023,
        "currencyId": 1,
        "authors": [
            {
                "bookId": 6,
                "authorId": 1,
                "author": {
                    "id": 1,
                    "firstName": "Jonathan",
                    "lastName": "Hill",
                    "yearsActive": "1935-2023"
                }
            }
        ],
        "categories": [
            {
                "bookId": 6,
                "categoryId": 6,
                "category": {
                    "id": 6,
                    "name": "Drama"
                }
            }
        ],
        "currency": {
            "id": 1,
            "name": "Russian Ruble",
            "acronym": "RUB"
        }
    }
]
```

### Response: 201
```json
[
    {
        "id": 16,
        "name": "Postgraduate UK study and funding guide",
        "price": "120.15",
        "language": "En",
        "description": "Features information on studying at Postgraduate level in the UK, what is involved",
        "yearPublished": 2008,
        "currencyId": 1,
        "authors": [
            {
                "bookId": 16,
                "authorId": 2,
                "author": {
                    "id": 2,
                    "firstName": "Emily",
                    "lastName": "Thompson",
                    "yearsActive": "1945-present"
                }
            }
        ],
        "categories": [
            {
                "bookId": 16,
                "categoryId": 16,
                "category": {
                    "id": 16,
                    "name": "Travel"
                }
            }
        ],
        "currency": {
            "id": 1,
            "name": "Russian Ruble",
            "acronym": "RUB"
        }
    },
    {
        "id": 72,
        "name": "Title Six",
        "price": "150.11",
        "language": "en",
        "description": "It's cool very cool",
        "yearPublished": 1988,
        "currencyId": 1,
        "authors": [
            {
                "bookId": 72,
                "authorId": 2,
                "author": {
                    "id": 2,
                    "firstName": "Emily",
                    "lastName": "Thompson",
                    "yearsActive": "1945-present"
                }
            },
            {
                "bookId": 72,
                "authorId": 25,
                "author": {
                    "id": 25,
                    "firstName": "Paul",
                    "lastName": "Shepheard",
                    "yearsActive": "1968-present"
                }
            }
        ],
        "categories": [
            {
                "bookId": 72,
                "categoryId": 1,
                "category": {
                    "id": 1,
                    "name": "Architecture"
                }
            },
            {
                "bookId": 72,
                "categoryId": 4,
                "category": {
                    "id": 4,
                    "name": "Business"
                }
            },
            {
                "bookId": 72,
                "categoryId": 16,
                "category": {
                    "id": 16,
                    "name": "Travel"
                }
            }
        ],
        "currency": {
            "id": 1,
            "name": "Russian Ruble",
            "acronym": "RUB"
        },
        "averageRating": 5
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: create book
### Method: POST
>```
>http://project-book-store-backend.vercel.app/api/v1/books
>```
### Body (**raw**)

```json
{
    "name": "Title Title",
    "price": 150.11,
    "language": "en",
    "description": "About book",
    "yearPublished": 1988,
    "currency": {
        "name": "Russian Ruble",
        "acronym": "RUB"
    },
    "authors": [
        {
            "firstName": "Emily",
            "lastName": "Thompson",
            "yearsActive": "1945-present"
        },
        {
            "firstName": "Paul",
            "lastName": "Shepheard",
            "yearsActive": "1968-present"
        }
    ],
    "categories": [
        {
            "name": "Architecture"
        }
    ]
}
```

### Response: 201
```json
{
    "id": 76,
    "name": "Title Title",
    "price": "150.11",
    "language": "en",
    "description": "About book",
    "yearPublished": 1988,
    "currencyId": 1
}
```

### Response: 400
```json
Field description is absent
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: update book
### Method: PUT
>```
>http://project-book-store-backend.vercel.app/api/v1/books/76
>```
### Body (**raw**)

```json
{
    "price": 170.11,
    "description": "About book",
    "yearPublished": 1988,
    "authors": [
        {
            "firstName": "Jonathan",
            "lastName": "Hill",
            "yearsActive": "1935-2023"
        },
        {
            "firstName": "Peter",
            "lastName": "Galison",
            "yearsActive": "1948-present"
        }
    ],
    "categories": [
        {
            "name": "Humor"
        },
        {
            "name": "Travel"
        }
    ]
}
```

### Response: 404
```json
Book with id: 75 is not found
```

### Response: 200
```json
{
    "id": 76,
    "name": "Title Title",
    "price": "170.11",
    "language": "en",
    "description": "About book",
    "yearPublished": 1988,
    "currencyId": 1
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete book
### Method: DELETE
>```
>http://project-book-store-backend.vercel.app/api/v1/books/75
>```
### Response: 200
```json
Book with id: 74 has been deleted
```

### Response: 404
```json
Book with id: 75 is not found
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: categories 


## End-point: categories list
### Method: GET
>```
>http://project-book-store-backend.vercel.app/api/v1/categories?perPage=10&page=1
>```
### Query Params

|Param|value|
|---|---|
|perPage|10|
|page|1|


### Response: 200
```json
[
    {
        "id": 1,
        "name": "Architecture",
        "books": [
            {
                "bookId": 1,
                "categoryId": 1,
                "book": {
                    "id": 1,
                    "name": "Architecture",
                    "price": "8.79",
                    "language": "En",
                    "description": "The aim of this book is to expand the subject and matter of architecture, and to explore their interdependence",
                    "yearPublished": 2001,
                    "currencyId": 1
                }
            },
            {
                "bookId": 17,
                "categoryId": 1,
                "book": {
                    "id": 17,
                    "name": "Pragmatic Enterprise Architecture",
                    "price": "15.79",
                    "language": "En",
                    "description": "Pragmatic Enterprise Architecture is a practical hands-on instruction manual for enterprise architects. This book prepares you to better engage IT, management, and business users by equipping you with the tools",
                    "yearPublished": 2014,
                    "currencyId": 1
                }
            },
            {
                "bookId": 72,
                "categoryId": 1,
                "book": {
                    "id": 72,
                    "name": "Title Six",
                    "price": "150.11",
                    "language": "en",
                    "description": "It's cool very cool",
                    "yearPublished": 1988,
                    "currencyId": 1
                }
            },
            {
                "bookId": 73,
                "categoryId": 1,
                "book": {
                    "id": 73,
                    "name": "Title Seven",
                    "price": "150.11",
                    "language": "en",
                    "description": "It's cool",
                    "yearPublished": 1978,
                    "currencyId": 1
                }
            }
        ]
    },
    {
        "id": 2,
        "name": "Art",
        "books": [
            {
                "bookId": 2,
                "categoryId": 2,
                "book": {
                    "id": 2,
                    "name": "Some Essays on Golf-Course Architecture",
                    "price": "5.79",
                    "language": "En",
                    "description": "Some Essays on Golf-Course Architecture features selected writings from prominent architects of the early 20th century",
                    "yearPublished": 2020,
                    "currencyId": 1
                }
            },
            {
                "bookId": 18,
                "categoryId": 2,
                "book": {
                    "id": 18,
                    "name": "Schools of Architecture",
                    "price": "11.59",
                    "language": "En",
                    "description": "In this book you will find another manifestation of this sub-culture",
                    "yearPublished": 1996,
                    "currencyId": 1
                }
            }
        ]
    },
    {
        "id": 3,
        "name": "Biography & Autobiography",
        "books": [
            {
                "bookId": 3,
                "categoryId": 3,
                "book": {
                    "id": 3,
                    "name": "The Architecture of Science",
                    "price": "10.59",
                    "language": "En",
                    "description": "Table of Contents The Architecture of Science by Galison, Peter L. (Editor); Edelman, Shimon (Editor); Thompson, Emily (Editor)",
                    "yearPublished": 1999,
                    "currencyId": 1
                }
            },
            {
                "bookId": 19,
                "categoryId": 3,
                "book": {
                    "id": 19,
                    "name": "Rethinking Architecture",
                    "price": "3.75",
                    "language": "En",
                    "description": "Brought together for the first time - the seminal writing on architecture by key philosophers and cultural theorist of the twentieth century",
                    "yearPublished": 2005,
                    "currencyId": 1
                }
            }
        ]
    },
    {
        "id": 4,
        "name": "Business",
        "books": [
            {
                "bookId": 4,
                "categoryId": 4,
                "book": {
                    "id": 4,
                    "name": "Architecture Subjects Itself",
                    "price": "1.79",
                    "language": "En",
                    "description": "Best description",
                    "yearPublished": 1993,
                    "currencyId": 1
                }
            },
            {
                "bookId": 20,
                "categoryId": 4,
                "book": {
                    "id": 20,
                    "name": "The Architecture of the Illusive Distance",
                    "price": "1.39",
                    "language": "En",
                    "description": "Focusing on three secular institutional building types: libraries, museums, and cinemas, this book explores the intricate interplay between culture and architecture",
                    "yearPublished": 2016,
                    "currencyId": 1
                }
            },
            {
                "bookId": 72,
                "categoryId": 4,
                "book": {
                    "id": 72,
                    "name": "Title Six",
                    "price": "150.11",
                    "language": "en",
                    "description": "It's cool very cool",
                    "yearPublished": 1988,
                    "currencyId": 1
                }
            },
            {
                "bookId": 73,
                "categoryId": 4,
                "book": {
                    "id": 73,
                    "name": "Title Seven",
                    "price": "150.11",
                    "language": "en",
                    "description": "It's cool",
                    "yearPublished": 1978,
                    "currencyId": 1
                }
            }
        ]
    },
    {
        "id": 5,
        "name": "Crafts & Hobbies",
        "books": [
            {
                "bookId": 5,
                "categoryId": 5,
                "book": {
                    "id": 5,
                    "name": "Architecture for a Free Subjectivity",
                    "price": "3.39",
                    "language": "En",
                    "description": "Architecture for a Free Subjectivity reformulates the French philosopher Gilles Deleuze`s model of subjectivity for architecture",
                    "yearPublished": 2013,
                    "currencyId": 1
                }
            },
            {
                "bookId": 1,
                "categoryId": 5,
                "book": {
                    "id": 1,
                    "name": "Architecture",
                    "price": "8.79",
                    "language": "En",
                    "description": "The aim of this book is to expand the subject and matter of architecture, and to explore their interdependence",
                    "yearPublished": 2001,
                    "currencyId": 1
                }
            }
        ]
    },
    {
        "id": 6,
        "name": "Drama",
        "books": [
            {
                "bookId": 6,
                "categoryId": 6,
                "book": {
                    "id": 6,
                    "name": "Golf Architecture: Economy in Course Construction and Green-Keeping",
                    "price": "88.15",
                    "language": "En",
                    "description": "Golf Architecture: Economy in Course Construction and Green-Keeping\\\" by A. Mackenzie",
                    "yearPublished": 2023,
                    "currencyId": 1
                }
            },
            {
                "bookId": 2,
                "categoryId": 6,
                "book": {
                    "id": 2,
                    "name": "Some Essays on Golf-Course Architecture",
                    "price": "5.79",
                    "language": "En",
                    "description": "Some Essays on Golf-Course Architecture features selected writings from prominent architects of the early 20th century",
                    "yearPublished": 2020,
                    "currencyId": 1
                }
            }
        ]
    }
]
```

### Response: 200
```json
[
    {
        "id": 1,
        "name": "Architecture",
        "books": [
            {
                "bookId": 1,
                "categoryId": 1,
                "book": {
                    "id": 1,
                    "name": "Architecture",
                    "price": "8.79",
                    "language": "En",
                    "description": "The aim of this book is to expand the subject and matter of architecture, and to explore their interdependence",
                    "yearPublished": 2001,
                    "currencyId": 1
                }
            },
            {
                "bookId": 17,
                "categoryId": 1,
                "book": {
                    "id": 17,
                    "name": "Pragmatic Enterprise Architecture",
                    "price": "15.79",
                    "language": "En",
                    "description": "Pragmatic Enterprise Architecture is a practical hands-on instruction manual for enterprise architects. This book prepares you to better engage IT, management, and business users by equipping you with the tools",
                    "yearPublished": 2014,
                    "currencyId": 1
                }
            },
            {
                "bookId": 72,
                "categoryId": 1,
                "book": {
                    "id": 72,
                    "name": "Title Six",
                    "price": "150.11",
                    "language": "en",
                    "description": "It's cool very cool",
                    "yearPublished": 1988,
                    "currencyId": 1
                }
            },
            {
                "bookId": 73,
                "categoryId": 1,
                "book": {
                    "id": 73,
                    "name": "Title Seven",
                    "price": "150.11",
                    "language": "en",
                    "description": "It's cool",
                    "yearPublished": 1978,
                    "currencyId": 1
                }
            }
        ]
    },
    {
        "id": 2,
        "name": "Art",
        "books": [
            {
                "bookId": 2,
                "categoryId": 2,
                "book": {
                    "id": 2,
                    "name": "Some Essays on Golf-Course Architecture",
                    "price": "5.79",
                    "language": "En",
                    "description": "Some Essays on Golf-Course Architecture features selected writings from prominent architects of the early 20th century",
                    "yearPublished": 2020,
                    "currencyId": 1
                }
            },
            {
                "bookId": 18,
                "categoryId": 2,
                "book": {
                    "id": 18,
                    "name": "Schools of Architecture",
                    "price": "11.59",
                    "language": "En",
                    "description": "In this book you will find another manifestation of this sub-culture",
                    "yearPublished": 1996,
                    "currencyId": 1
                }
            }
        ]
    },
    {
        "id": 3,
        "name": "Biography & Autobiography",
        "books": [
            {
                "bookId": 3,
                "categoryId": 3,
                "book": {
                    "id": 3,
                    "name": "The Architecture of Science",
                    "price": "10.59",
                    "language": "En",
                    "description": "Table of Contents The Architecture of Science by Galison, Peter L. (Editor); Edelman, Shimon (Editor); Thompson, Emily (Editor)",
                    "yearPublished": 1999,
                    "currencyId": 1
                }
            },
            {
                "bookId": 19,
                "categoryId": 3,
                "book": {
                    "id": 19,
                    "name": "Rethinking Architecture",
                    "price": "3.75",
                    "language": "En",
                    "description": "Brought together for the first time - the seminal writing on architecture by key philosophers and cultural theorist of the twentieth century",
                    "yearPublished": 2005,
                    "currencyId": 1
                }
            }
        ]
    },
    {
        "id": 4,
        "name": "Business",
        "books": [
            {
                "bookId": 4,
                "categoryId": 4,
                "book": {
                    "id": 4,
                    "name": "Architecture Subjects Itself",
                    "price": "1.79",
                    "language": "En",
                    "description": "Best description",
                    "yearPublished": 1993,
                    "currencyId": 1
                }
            },
            {
                "bookId": 20,
                "categoryId": 4,
                "book": {
                    "id": 20,
                    "name": "The Architecture of the Illusive Distance",
                    "price": "1.39",
                    "language": "En",
                    "description": "Focusing on three secular institutional building types: libraries, museums, and cinemas, this book explores the intricate interplay between culture and architecture",
                    "yearPublished": 2016,
                    "currencyId": 1
                }
            },
            {
                "bookId": 72,
                "categoryId": 4,
                "book": {
                    "id": 72,
                    "name": "Title Six",
                    "price": "150.11",
                    "language": "en",
                    "description": "It's cool very cool",
                    "yearPublished": 1988,
                    "currencyId": 1
                }
            },
            {
                "bookId": 73,
                "categoryId": 4,
                "book": {
                    "id": 73,
                    "name": "Title Seven",
                    "price": "150.11",
                    "language": "en",
                    "description": "It's cool",
                    "yearPublished": 1978,
                    "currencyId": 1
                }
            }
        ]
    },
    {
        "id": 5,
        "name": "Crafts & Hobbies",
        "books": [
            {
                "bookId": 5,
                "categoryId": 5,
                "book": {
                    "id": 5,
                    "name": "Architecture for a Free Subjectivity",
                    "price": "3.39",
                    "language": "En",
                    "description": "Architecture for a Free Subjectivity reformulates the French philosopher Gilles Deleuze`s model of subjectivity for architecture",
                    "yearPublished": 2013,
                    "currencyId": 1
                }
            },
            {
                "bookId": 1,
                "categoryId": 5,
                "book": {
                    "id": 1,
                    "name": "Architecture",
                    "price": "8.79",
                    "language": "En",
                    "description": "The aim of this book is to expand the subject and matter of architecture, and to explore their interdependence",
                    "yearPublished": 2001,
                    "currencyId": 1
                }
            }
        ]
    },
    {
        "id": 6,
        "name": "Drama",
        "books": [
            {
                "bookId": 6,
                "categoryId": 6,
                "book": {
                    "id": 6,
                    "name": "Golf Architecture: Economy in Course Construction and Green-Keeping",
                    "price": "88.15",
                    "language": "En",
                    "description": "Golf Architecture: Economy in Course Construction and Green-Keeping\\\" by A. Mackenzie",
                    "yearPublished": 2023,
                    "currencyId": 1
                }
            },
            {
                "bookId": 2,
                "categoryId": 6,
                "book": {
                    "id": 2,
                    "name": "Some Essays on Golf-Course Architecture",
                    "price": "5.79",
                    "language": "En",
                    "description": "Some Essays on Golf-Course Architecture features selected writings from prominent architects of the early 20th century",
                    "yearPublished": 2020,
                    "currencyId": 1
                }
            }
        ]
    },
    {
        "id": 7,
        "name": "Fiction",
        "books": [
            {
                "bookId": 7,
                "categoryId": 7,
                "book": {
                    "id": 7,
                    "name": "What Is Architecture?",
                    "price": "15.79",
                    "language": "En",
                    "description": "British architect and critic Paul Shepheard is a fresh new voice in current postmodern debates about the history and meaning of architecture",
                    "yearPublished": 2013,
                    "currencyId": 1
                }
            }
        ]
    },
    {
        "id": 8,
        "name": "Cooking",
        "books": [
            {
                "bookId": 8,
                "categoryId": 8,
                "book": {
                    "id": 8,
                    "name": "Golf Course Design",
                    "price": "11.59",
                    "language": "En",
                    "description": "Zwei der berühmtesten Golfplatzarchitekten aller Zeiten beantworten Ihnen hier jede erdenkliche Frage zum Thema der Gestaltung von Golfplätzen",
                    "yearPublished": 1998,
                    "currencyId": 1
                }
            }
        ]
    },
    {
        "id": 9,
        "name": "Health & Fitness",
        "books": [
            {
                "bookId": 9,
                "categoryId": 9,
                "book": {
                    "id": 9,
                    "name": "Forty Ways to Think About Architecture",
                    "price": "4.75",
                    "language": "En",
                    "description": "How do we think about architecture historically andtheoretically? Forty Ways to Think about Architectureprovides an introduction to some",
                    "yearPublished": 2015,
                    "currencyId": 1
                }
            }
        ]
    },
    {
        "id": 10,
        "name": "History",
        "books": [
            {
                "bookId": 10,
                "categoryId": 10,
                "book": {
                    "id": 10,
                    "name": "Building Theories",
                    "price": "3.39",
                    "language": "En",
                    "description": "Building Theories speaks to the value of words in architecture",
                    "yearPublished": 2022,
                    "currencyId": 1
                }
            }
        ]
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: create category
### Method: POST
>```
>http://project-book-store-backend.vercel.app/api/v1/categories
>```
### Body (**raw**)

```json
{
    "name": "New category!"
}
```

### Response: 201
```json
{
    "id": 22,
    "name": "New category!"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: edit category
### Method: PUT
>```
>http://project-book-store-backend.vercel.app/api/v1/categories/22
>```
### Body (**raw**)

```json
{
    "name": "Updated category!"
}
```

### Response: 200
```json
{
    "id": 23,
    "name": "Updated category!"
}
```

### Response: 404
```json
Category with id: 23 is not found
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete category
### Method: DELETE
>```
>http://project-book-store-backend.vercel.app/api/v1/categories/23
>```
### Response: 200
```json
Category with id: 22 has been deleted
```

### Response: 404
```json
Category with id: 23 is not found
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: user 


## End-point: register
### Method: POST
>```
>http://project-book-store-backend.vercel.app/api/v1/user/register
>```
### Body (**raw**)

```json
{
    "password": "example-password",
    "email": "example@mail.ru"
}
```

### Response: 201
```json
{
    "id": 30,
    "name": "",
    "dob": "2024-06-10T11:16:31.200Z",
    "description": "",
    "email": "example@mail.ru",
    "password": "1Ga6+5fQScRHcQM3SLLGKkd/R6mh6IL705U4Hui1kXQvl/eJoQOKpGHp2PFAxQnib0AQVCBefCtOuH6/7uwiO6mCc/1BHgdPGVPZ1qvClw2R4X4slY2WTuiW8IHHlxYd4+S6gvXZsO9IuAWDJtc5FOfzyN6lk+PjzildIiAZXafEbqCKjcWFYk8/heUIvYstm4zeZn9fIveZ32PX5w55fAasbHDCgFdX7wNLDG+nectgbTkAk95KBhd7hhDPwkKieDqLNt6qYBJIZCXB4EFG6lyL9VUKDBx1tpjfWLoURT2MKWCFx/o15uNezymne/5Fx4/J2w8aJpceDzR88Iihyz+tUzWUG70427xxsyfg0Lp+LT1CXFOnDCgFuNl9MJygIQkSv4pllOtQGpKoEhWz/nXNz2AClnJLtfdsoTb44SVQsy2PzkJlGcOdA5NGG+Ut0W8Tlrf5SxiVZggNNTlh82HeKAVS+GP6sD7cXY91fVB+FZOJAwXSIr6AEWunikw6y5FddRg0r8pQxyHoq1zcSjUV/EEE3k8ACVHpTL3S44hhc3626FPB73oZ1dN3c+b7nJBvILzMxs4GEFhPxA2OapZHDWjjVvt15/PRQSomDIFFxjpjZCo5YWj1ofZNvH2mTOi7KHE+kDoZRQIK1f8pfN6X2/X2CAs42T4ppFzN6CI=",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAbWFpbC5ydSIsInBhc3N3b3JkIjoiMUdhNis1ZlFTY1JIY1FNM1NMTEdLa2QvUjZtaDZJTDcwNVU0SHVpMWtYUXZsL2VKb1FPS3BHSHAyUEZBeFFuaWIwQVFWQ0JlZkN0T3VINi83dXdpTzZtQ2MvMUJIZ2RQR1ZQWjFxdkNsdzJSNFg0c2xZMldUdWlXOElISGx4WWQ0K1M2Z3ZYWnNPOUl1QVdESnRjNUZPZnp5TjZsaytQanppbGRJaUFaWGFmRWJxQ0tqY1dGWWs4L2hlVUl2WXN0bTR6ZVpuOWZJdmVaMzJQWDV3NTVmQWFzYkhEQ2dGZFg3d05MREcrbmVjdGdiVGtBazk1S0JoZDdoaERQd2tLaWVEcUxOdDZxWUJKSVpDWEI0RUZHNmx5TDlWVUtEQngxdHBqZldMb1VSVDJNS1dDRngvbzE1dU5lenltbmUvNUZ4NC9KMnc4YUpwY2VEelI4OElpaHl6K3RVeldVRzcwNDI3eHhzeWZnMExwK0xUMUNYRk9uRENnRnVObDlNSnlnSVFrU3Y0cGxsT3RRR3BLb0VoV3ovblhOejJBQ2xuSkx0ZmRzb1RiNDRTVlFzeTJQemtKbEdjT2RBNU5HRytVdDBXOFRscmY1U3hpVlpnZ05OVGxoODJIZUtBVlMrR1A2c0Q3Y1hZOTFmVkIrRlpPSkF3WFNJcjZBRVd1bmlrdzZ5NUZkZFJnMHI4cFF4eUhvcTF6Y1NqVVYvRUVFM2s4QUNWSHBUTDNTNDRoaGMzNjI2RlBCNzNvWjFkTjNjK2I3bkpCdklMek14czRHRUZoUHhBMk9hcFpIRFdqalZ2dDE1L1BSUVNvbURJRkZ4anBqWkNvNVlXajFvZlpOdkgybVRPaTdLSEUra0RvWlJRSUsxZjhwZk42WDIvWDJDQXM0MlQ0cHBGek42Q0k9IiwiaWF0IjoxNzE4MDE4MTkxfQ.Gt7ehixwD1wTnA-SvJaQwweUqmej5fKc7QT9iqBaJC4"
}
```

### Response: 400
```json
A user with this email: example@mail.ru already exists
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: login
### Method: POST
>```
>http://project-book-store-backend.vercel.app/api/v1/user/login
>```
### Body (**raw**)

```json
{
    "password": "example-password",
    "email": "example@mail.ru"
}
```

### Response: 200
```json
{
    "id": 30,
    "name": "",
    "dob": "2024-06-10T11:16:31.200Z",
    "description": "",
    "email": "example@mail.ru",
    "password": "1Ga6+5fQScRHcQM3SLLGKkd/R6mh6IL705U4Hui1kXQvl/eJoQOKpGHp2PFAxQnib0AQVCBefCtOuH6/7uwiO6mCc/1BHgdPGVPZ1qvClw2R4X4slY2WTuiW8IHHlxYd4+S6gvXZsO9IuAWDJtc5FOfzyN6lk+PjzildIiAZXafEbqCKjcWFYk8/heUIvYstm4zeZn9fIveZ32PX5w55fAasbHDCgFdX7wNLDG+nectgbTkAk95KBhd7hhDPwkKieDqLNt6qYBJIZCXB4EFG6lyL9VUKDBx1tpjfWLoURT2MKWCFx/o15uNezymne/5Fx4/J2w8aJpceDzR88Iihyz+tUzWUG70427xxsyfg0Lp+LT1CXFOnDCgFuNl9MJygIQkSv4pllOtQGpKoEhWz/nXNz2AClnJLtfdsoTb44SVQsy2PzkJlGcOdA5NGG+Ut0W8Tlrf5SxiVZggNNTlh82HeKAVS+GP6sD7cXY91fVB+FZOJAwXSIr6AEWunikw6y5FddRg0r8pQxyHoq1zcSjUV/EEE3k8ACVHpTL3S44hhc3626FPB73oZ1dN3c+b7nJBvILzMxs4GEFhPxA2OapZHDWjjVvt15/PRQSomDIFFxjpjZCo5YWj1ofZNvH2mTOi7KHE+kDoZRQIK1f8pfN6X2/X2CAs42T4ppFzN6CI=",
    "books": [],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAbWFpbC5ydSIsInBhc3N3b3JkIjoiZXhhbXBsZS1wYXNzd29yZCIsImlhdCI6MTcxODAxODQxNH0.lfM1VrpcujMKCMTgfSW0Nruc4f1j3AmrTFPo-BZlqLw"
}
```

### Response: 404
```json
User with email: not-exist@mail.ru does not exist
```

### Response: 401
```json
Incorrect password entered
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get books
### Method: GET
>```
>http://project-book-store-backend.vercel.app/api/v1/user/books/19
>```
### Response: 200
```json
[
    {
        "userId": 19,
        "bookId": 18,
        "book": {
            "id": 18,
            "name": "Schools of Architecture",
            "price": "11.59",
            "language": "En",
            "description": "In this book you will find another manifestation of this sub-culture",
            "yearPublished": 1996,
            "currencyId": 1,
            "currency": {
                "id": 1,
                "name": "Russian Ruble",
                "acronym": "RUB"
            }
        }
    },
    {
        "userId": 19,
        "bookId": 15,
        "book": {
            "id": 15,
            "name": "Analysing Architecture",
            "price": "2.45",
            "language": "En",
            "description": "Now in its fifth edition, Analysing Architecture has become internationally established as the best introduction to architecture",
            "yearPublished": 2020,
            "currencyId": 1,
            "currency": {
                "id": 1,
                "name": "Russian Ruble",
                "acronym": "RUB"
            }
        }
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: edit profile
### Method: PUT
>```
>http://project-book-store-backend.vercel.app/api/v1/user/30
>```
### Body (**raw**)

```json
{
    "name": "Arnold",
    "description": "About me"
}
```

### Response: 200
```json
User details have been updated
```

### Response: 404
```json
User with id: 31 is not found
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete profile
### Method: DELETE
>```
>http://project-book-store-backend.vercel.app/api/v1/user/29
>```
### Response: 200
```json
User with id: 29 has been deleted
```

### Response: 404
```json
Book with id: 29 is not found
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: rating 


## End-point: rating set
### Method: GET
>```
>undefined
>```
### Response: 201
```json
The rating has been set
```

### Response: 401
```json
Token not provided! Please log in.
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
