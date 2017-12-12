const templates = () => {
    return {
      'login': (data) => `
            <div class="people" id="${data.id}">
              <span class="status-active"></span>
              <p class="name">${data.nome}</p>
              <img src="${data.icon}" alt="" class="my-icon">
            </div>
      `,
      'ons': (data) => `<span class="users-on spanabble">${data.ons}</span>`,
      'message': (data) => {
          var el = document.createElement('div');
          el.setAttribute('id', data.id);
          el.setAttribute('data-user', JSON.stringify(data));
          el.setAttribute('class', 'message');
          var template = `
              <div class="user">
                <img src="${data.icon}" alt="">
                <p class="name-user">${data.nome}</p>
              </div>
              <div class="body">
                <div class="text">${data.text}</div>
                <div class="time">${data.horario}</div>
              </div>
          `;
          el.innerHTML = template;
          return el;
      },
      'logout': (data) => {
           var el = document.createElement('div');
           el.setAttribute('id', data.id);
           el.setAttribute('class', 'message');
           var template = `
              <div class="user">
                <img src="${data.icon}" alt="">
                <p class="name-user">${data.nome}</p>
              </div>
              <div class="body">
                <div class="text">${data.nome} saiu da sala.</div>
                <div class="time">${data.horario}</div>
              </div>
          `;
          el.innerHTML = template;
          return el;
      },
      'message_write': (data) => {
          var el = document.createElement('div');
          el.setAttribute('write-id', data.id);
          el.setAttribute('class', 'message');
          var template = `
                <div class="user">
                  <img src="${data.icon}" alt="">
                  <p class="name-user">${data.nome}</p>
                </div>
                <div class="body">
                  <div class="text">${data.text}</div>
                  <div class="time">${data.horario}</div>
                </div>
          `;
          el.innerHTML = template;
          return el;
      }
    };
};

module.exports = templates;