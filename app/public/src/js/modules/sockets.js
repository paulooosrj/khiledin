const {
    gen_id,
    session,
    clear_input,
    user_on_exists,
    to_scroll,
    get_user,
    get_horario,
    html_element
} = require('./utils');
const templates = require('./views');
const filtros = require('./filtros');
const bot_remove = filtros.bot_remove;

let debugMessage = arr => arr.map(a => console.log(a.text));

module.exports = (socket) => {

    socket.emit('chat', {
        [chat.sala + "login"]: get_user()
    });

    socket.on(chat.sala + "login", (data) => {

        data.me = get_user()['id'] === data.id;
        chat.messages++;

        if(!user_on_exists(data)) chat.peoples++;

        data = Object.assign(data, {
            'text': data.nome + ' entrou na sala.',
            'horario': get_horario()
        });

        session('my_id', data.my_id);

        chat.messages_receive_user.push(data);

        if(!user_on_exists(data)){

            chat.peoples_add.push(data.nome);

            // data.text = emojione.toImage(data.text);

            $('.peoples-timeline').append(templates().login(data));
            $('.messages').append(templates().message(data));
            // console.log(data);

            // global.app.messages = global.app.messages.concat(data);
            // console.log(data);

            $('.messages-number').html(chat.messages);
            $('.users-on').html(chat.peoples);

            // debugMessage(global.app.messages);

            to_scroll();
        }

    });

    socket.on(chat.sala + "message", (data = {}) => {
        data.text = emojione.toImage(data.text);
        data.me = get_user()['id'] === data.id;
        if(!chat.end_message.includes(data.text)){
            chat.messages++;
            chat.end_message = data.text;
            // global.app.messages = global.app.messages.concat(data);
            // debugMessage(global.app.messages);
            // console.log(global.app.messages);
            let d = templates().message(data);
            $('.messages').append(d);
            $('.messages-number').html(chat.messages);
            if(!data.init) templates().message_people(data);
            chat.messages_receive_user.push(data);
            to_scroll();
        }
    });

    socket.on(chat.sala + "clear", (node) => {
        bot_remove(node);
    });

    socket.on(chat.sala + "escrevendo", (data) => {
        if(!document.querySelector(data.node)){
            $('.messages').append(templates().message_write(data));
            to_scroll();
        }
    });

    socket.on(chat.sala + "banido", (user) => {
        user.text = `${user.nome} foi banido da sala.`;
        user.horario = get_horario();
        let data = user;
        let d = templates().message(data);
        $('.messages').append(d);
        if(user.id === get_user()['id']){
            location.href = './logout';
        }
    });

    socket.on(chat.sala + 'logout', (user) => {
        $('.messages').append(templates().logout(Object.assign({}, user, {
            'horario': get_horario()
        })));
        bot_remove(`.peoples-timeline>div[id="${user.id}"]`);
        to_scroll();
    });

};
