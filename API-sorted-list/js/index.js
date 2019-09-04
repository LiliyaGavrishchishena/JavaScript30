/*Створити сторінку на якій відобразити список постів де кожен пост складається із 
заголовку, 
опису, 
картинки, 
дати створення та 
списку тегів. 
Надати можливість сортування постів 
за датою - спадання і зростання; 
та тегами - найвище в списку ті, в яких найбільше співпадінь із заданими тегами, 
тобто, якщо користувач задав три теги, то найвище будуть ті пости в яких є всі три теги, 
з 2 співпадаючими тегами нижче у списку і т.д.; 
якщо пости мають однакову кількість співпадінь, 
тоді їх між собою потрібно сортувати за датою. 
Критерієм успішно виконаного сортування за тегами є те,
що останні додані пости з найбільшою кількістю співпадінь є найвище в списку. 
На сторінці відобразити 10 постів і як тільки користувач доскролить до 10-го додати ще 10; 
відповідно при досягненні 20-го, 30-го і т.д. кожного разу додавати 10 постів. 
Надати можливість повернутися до початкового стану - на сторінці тільки 10 постів. 
Надати можливість видаляти пости зі списку. 
Видалені пости не повинні з’являтися в списку до повного перезавантаження сторінки. 
Опціонально. 
Реалізувати пошук постів. 
Пошук повинен бути миттєвим, тобто при кожному введені символа в поле пошуку - відображати ті пости, 
в заголовку яких є слово що шукається. 
Завантажити всі пости з цього JSON файла на етапі завантаження сторінки використовуючи XMLHttpRequest або fetch. 
Для цього використовуйте код нижче:

const url = 'https://api.myjson.com/bins/152f9j';
fetch(url)
    .then(res => res.json())
    .then(data => {
        const rawData = data.data;
        return rawData.map(post => {
          //all needed data is listed below as an entity 
          let createdAt = post.createdAt;
                description = post.description;
                img = post.image;
                tags = post.tags;
                title = post.title;
            //create element
            //append element
        });
    })
    .catch((error) => {
        console.log(JSON.stringify(error));
    });
Використання будь яких додаткових бібліотек для роботи з DOM елементами (до прикладу jQuery) - ЗАБОРОНЕНО.*/

'use strict';
const api = {
  baseUrl: 'https://api.myjson.com/bins/152f9j',

  getPosts(id = "") {
    return fetch(`${this.baseUrl}${id}`, {
      method: 'GET',
    })
      .then(response => {
        if (response.ok) return response.json();

        throw new Error(`Error while fetching: ${response.statusText}`);
      })
      .catch(error => console.log('ERROR: ', error));
  },

};

document.addEventListener('DOMContentLoaded', () => {
  const refs = selectRefs();

  refs.GetAllPosts.addEventListener('submit', handleGetAllPosts);

  function handleGetAllPosts(event) {
    event.preventDefault();

    api.getPosts().then(posts => {
      let data = posts.data;
      const markup = data.reduce(
        (acc, post) => acc + createPostsMarkup(post),
        '',
      );

      refs.reply.innerHTML = markup;
    });
  }


  function createPostsMarkup({ title, description, image, createdAt, tags}) {
    const item = `<div class="grid-item">
    <div> Title: ${title}</div> 
    <div>description: ${description}</div> 
    <div>image: ${image}</div> 
    <div> createdAt:${createdAt}</div> 
    <div>tags:${tags}</div>
    </div>`;
    return item;
  }

  function selectRefs() {
    const refs = {};

    refs.reply = document.querySelector('.reply');

    refs.GetAllPosts = document.querySelector('.js-form-get-all');

    return refs;
  }
});