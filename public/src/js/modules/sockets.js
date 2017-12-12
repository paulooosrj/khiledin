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

module.exports = (socket) => {

    socket.emit('login', get_user());

    socket.on('new login', (data) => {
        chat.messages++;
        if(!user_on_exists(data)) chat.peoples++;
        let emit = Object.assign(data, {
            'text': data.nome + ' entrou na sala.',
            'horario': get_horario()
        });
        session('my_id', data.my_id);
        if(!chat.messages_receive_user.includes(data.nome)){
            chat.messages_receive_user.push(data);
        }

        $('.messages').appendChild(templates().message(emit));

        if(!user_on_exists(data)){
            $('.peoples-timeline').innerHTML += templates().login(emit);
        }

        $('.messages-number').innerHTML = chat.messages;
        $('.users-on').innerHTML = chat.peoples;
        to_scroll();
    });

    socket.on('new emit message', (data) => {
        chat.messages++;
        if(!chat.messages_receive_user.includes(data.nome)){
            chat.messages_receive_user.push(data);
        }
        $('.messages').appendChild(templates().message(data));
        $('.messages-number').innerHTML = chat.messages;
        to_scroll();
        clear_input();
    });

    socket.on('new clear', (node) => {
        bot_remove(node);
    });

    socket.on('new escrevendo', (data) => {
        if(!$(data.node)){
            $('.messages').appendChild(templates().message_write(data));
            to_scroll();
        }
    });

    socket.on('logout', (user) => {
        $('.messages').appendChild(templates().logout(Object.assign({}, user, {
            'horario': get_horario()
        })));
        bot_remove(`.peoples-timeline>div[id="${user.id}"]`);
    });

};