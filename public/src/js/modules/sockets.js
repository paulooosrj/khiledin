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

        chat.messages_receive_user.push(data);

        if(!user_on_exists(data)){
            chat.peoples_add.push(data.nome);
            emit.text = emojione.toImage(emit.text);
            $('.peoples-timeline').append(templates().login(emit));
            $('.messages').append(templates().message(emit));
            $('.messages-number').html(chat.messages);
            $('.users-on').html(chat.peoples);
            to_scroll();
        }

    });

    socket.on('new emit message', (data = {}) => {
        data.text = emojione.toImage(data.text);
        console.log(chat.end_message.includes(data.text));
        if(!chat.end_message.includes(data.text)){
            chat.messages++;
            chat.end_message = data.text;
            let d = templates().message(data);
            $('.messages').append(d);
            $('.messages-number').html(chat.messages);
            if(!data.init) templates().message_people(data);
            chat.messages_receive_user.push(data);
            to_scroll();
        }
    });

    socket.on('new clear', (node) => {
        bot_remove(node);
    });

    socket.on('new escrevendo', (data) => {
        if(!document.querySelector(data.node)){
            $('.messages').append(templates().message_write(data));
            to_scroll();
        }
    });

    socket.on('new banido', (user) => {
        user.text = `${user.nome} foi banido da sala.`;
        user.horario = get_horario();
        let data = user;
        let d = templates().message(data);
        $('.messages').append(d);
        if(user.id === get_user()['id']){
            location.href = './logout';
        }
    });

    socket.on('logout', (user) => {
        $('.messages').append(templates().logout(Object.assign({}, user, {
            'horario': get_horario()
        })));
        bot_remove(`.peoples-timeline>div[id="${user.id}"]`);
    });

};