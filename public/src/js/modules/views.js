const is_link = (m) => {
    let p1 = /(.*)<a(.*)>(.*)<\/a>(.*)/;
    let p2 = /(.*)<iframe(.*)>(.*)<\/iframe>(.*)/;
   // m = m.replace(/\s\s/gi, '').replace(/\n/gi, '');
    if(p1.test(m)) return m;
    if(p2.test(m)) return m;
    return false;
};

const templates = () => {
    return {
      'login': (data) => `
            <div class="people" id="${data.id}">
              <span class="status-active"></span>
              <p class="name">${data.nome}</p>
              <img src="${chat.url + data.icon}" alt="" class="my-icon">
              <div class="user-message"></div>
            </div>
      `,
      'ons': (data) => `<span class="users-on spanabble">${data.ons}</span>`,
      'message': (data) => {
          if(data.nome === null) return '';
          return $(`
              <div id="${data.id}" class="message">
                <div class="user">
                  <img src="${chat.url + data.icon}" alt="">
                </div>
                <span class="arrow"></span> 
                <div class="body">
                  <div class="body-user">
                      <p class="name-user">${data.nome}</p>
                      <div class="time">${data.horario}</div>
                  </div>
                  <div class="text" ${(is_link(data.text)) ? 'style="flex-direction:column;"' : ''}>${data.text}</div>
                </div>
              </div>
          `).attr('data-user', JSON.stringify(data));
      },
      'message_people': (data) => {
          let tpl = (number) => `
              <span class="arrow-user" style="border-right: 7.5px solid #2ecc71;"></span>
              <div class="message">
                <div class="text-user" style="background:#2ecc71">${number}</div>
              </div>
          `;
          var $el = '';
          if(!document.querySelector('.people-active')){
            console.log($(`div.people[id="${data.id}"]>img`));
            $(`div.people[id="${data.id}"]>img`).css('border', '1.5px solid #2ecc71');
            $el = $(`div.people[id="${data.id}"] .user-message`);
            $el.addClass('people-active');
            $el.html(tpl('Nova Mensagem'));
          }
          if(document.querySelector('.people-active')){
            $('.people-active').parent().find('img').css('border', 'none');
            $('.people-active').html('');
            $('.people-active').removeClass('people-active');
            $el = $(`div.people[id="${data.id}"] .user-message`);
            $el.addClass('people-active');
            $el.html(tpl('Nova Mensagem'));
            $(`div.people[id="${data.id}"]>img`).css('border', '1.5px solid #2ecc71');
          }
          return $el;
      },
      'logout': (data) => {
          return $(`
              <div id="${data.id}" class="message">
                <div class="user">
                  <img src="${chat.url + data.icon}" alt="">
                </div>
                <span class="arrow"></span> 
                <div class="body">
                  <div class="body-user">
                      <p class="name-user">${data.nome}</p>
                      <div class="time">${data.horario}</div>
                  </div>
                  <div class="text">${data.nome} saiu da sala.</div>
                </div>
              </div>
          `).attr('data-user', JSON.stringify(data));
      },
      'message_write': (data) => {
          return $(`
            <div write-id="${data.id}" class="message bounceIn animated">
              <div class="user">
                <img src="${chat.url + data.icon}" alt="">
              </div>
              <span class="arrow"></span> 
              <div class="body">
                <div class="body-user">
                    <p class="name-user">${data.nome}</p>
                    <div class="time">${data.horario}</div>
                </div>
                <div class="text">
                    <div class="spinner">
                      <div class="bounce1"></div>
                      <div class="bounce2"></div>
                      <div class="bounce3"></div>
                    </div>
                </div>
              </div>
            </div>
          `);
      }
    };
};

module.exports = templates;
