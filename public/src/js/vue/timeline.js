module.exports = {
  props: ['mensagens'],
  mounted(){
    console.log("loadd");
  },
  template: `
      <div class="messages">
          <div class="mobile menu-toggle">
            <i class="fas fa-bars"></i>
          </div>

          <div class="commands">
            <span class="video-up">
              <i class="fas fa-file-video fa-lg" aria-hidden="true"></i>
            </span>
            <span class="audio-up">
              <i class="fas fa-file-audio fa-lg" aria-hidden="true"></i>
            </span>
            <span class="code-up">
              <i class="fas fa-file-code fa-lg" aria-hidden="true"></i>
            </span>
            <span class="image-up">
              <i class="fas fa-file-image fa-lg" aria-hidden="true"></i>
            </span>
            <span class="help-chat">
              <i class="fas fa-info-circle fa-lg" aria-hidden="true"></i>
            </span>
          </div>

          <div class="menu-colors" style="display:none">
            <div class="btns">
              <button class="change-msg-color">Trocar cor de mensagem enviada</button>
              <button class="change-back-color">Trocar plano de fundo</button>
            </div>
          </div>

          <div class="emojis"></div>

          <div class="luz">
            <div class="luz-conteudo"></div>
            <div class="luz-btn">
              <button class="btn-link luz-btn" onclick="acender_luz()">Acender Luz</button>
            </div>
          </div>

        <div class="message" :data-user-id="mensagem.id" v-for="mensagem in mensagens">
          <div class="user" v-if="!mensagem.me">
            <img :src="chat.url + mensagem.icon" alt="">
          </div>
          <div class="body" :style="'border-bottom-right-radius:0px !important;background:' + chat.colors.message_me" v-if="mensagem.me" >
            <div class="body-user">
              <p class="name-user">{{ mensagem.nome }}</p>
              <div class="time">{{ mensagem.horario }}</div>
            </div>
            <div class="text" v-html="mensagem.text"></div>
          </div>
          <div class="body" style="border-bottom-left-radius:0px!important" v-else>
            <div class="body-user">
              <p class="name-user">{{ mensagem.nome }}</p>
              <div class="time">{{ mensagem.horario }}</div>
            </div>
            <div class="text" v-html="mensagem.text"></div>
          </div>

          <div class="user" v-if="mensagem.me">
            <img :src="chat.url + mensagem.icon" alt="">
          </div>
        </div>
      </div>
    </div>
  `
};

// <div class="user" v-if="!mensagem.me">
//           <img :src="chat.url + mensagem.icon" alt="">
//         </div>
//         <div class="body" :style="'border-bottom-right-radius:0px !important;background:' + chat.colors.message_me" v-if="mensagem.me" >
//           <div class="body-user">
//             <p class="name-user">{{ mensagem.nome }}</p>
//             <div class="time">{{ mensagem.horario }}</div>
//           </div>
//           <div class="text" v-html="mensagem.text"></div>
//         </div>
//         <div class="body" style="border-bottom-left-radius:0px!important" v-else>
//           <div class="body-user">
//             <p class="name-user">{{ mensagem.nome }}</p>
//             <div class="time">{{ mensagem.horario }}</div>
//           </div>
//           <div class="text" v-html="mensagem.text"></div>
//         </div>

//         <div class="user" v-if="mensagem.me">
//           <img :src="chat.url + mensagem.icon" alt="">
//         </div>
