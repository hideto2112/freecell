<template>
  <div class="main">
    <v-ons-page>
      <v-ons-toolbar>
        <div class="center">Cards count: {{cardTotal}}</div>
      </v-ons-toolbar>
      <div class="background" style="background: #009432;"></div>
      <div class="content">
        <v-ons-button
        class="card"
        v-for="card in cards"
        :key="card.suit + card.rank"
        :style="`
          width: ${100 / 13 * 0.8}%;
          margin: ${100 / 13 * 0.1}%;
          opacity: ${card.match ? 0 : 1};
        `"
        >
        <div>
          <img
            @click="changeCurrentCard(card)"
            :src="card.turn ? require('../assets/image/' + card.suit + card.rank + '.png')
                            : require('../assets/image/z02.png')"
            :style="`
              cursor: ${(!card.turn && !card.match && !returnCards.length && !deleteCards.length) ? '' : ''};
            `"
          />
          </div>
        </v-ons-button>
      </div>
    </v-ons-page>
  </div>
</template>

<script>
// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

// JS import
import Vue from 'vue';
import VueOnsen from 'vue-onsenui'; // This already imports 'onsenui'

Vue.use(VueOnsen);

export default {
  data() {
    const suits = ['s', 'h', 'd', 'c'];

    const initialCards = [];
    for(let i = 0; i < suits.length; i += 1) {
      for(let j = 0; j < 13; j += 1) {
        initialCards.push({
          suit: suits[i],
          rank: ('0' + (j + 1)).slice(-2),
          turn: false,
          match: false,
        });

      }
    }

    const cards = [];

    for(let i = initialCards.length; i > 0; i -= 1) {
      const targetIndex = Math.floor(Math.random() * i);
      cards.push(initialCards[targetIndex]);
      initialCards.splice(targetIndex, 1);
    }

    return {
      cardTotal: cards.length,
      suits,
      cards,
      currentCard: '',
      judgeFlg: false,
      returnCards: [],
      deleteCards: [],
    };
  },
  computed: {
    setCardImage() {
      return (i) => {
        const test = '01';
        return '~assets/image/s'+ test +'.png'
      };
    },
  },
  methods: {
    changeCurrentCard(card) {

      if(!this.returnCards.length && !this.deleteCards.length) {
        card.turn = true;

        if(this.currentCard !== '') {

          if(card.rank === this.currentCard.rank
              && card.suit !== this.currentCard.suit) {

            this.deleteCards.push(card, this.currentCard);
            setTimeout(this.deleteCard, 2000);
            this.judgeFlg = true;

          } else {
            this.judgeFlg = false;
          }

          this.returnCards.push(card, this.currentCard);
          setTimeout(this.returnCard, 3000);
          this.currentCard = '';

        } else {
          this.currentCard = card
        }
      }      
    },
    returnCard() {
      this.returnCards[0].turn = false;
      this.returnCards[1].turn = false;
      this.returnCards = [];
    },
    deleteCard() {
      this.deleteCards[0].match = true;
      this.deleteCards[1].match = true;
      this.deleteCards = [];
      this.cardTotal -= 2;
    },
  },
}
</script>

<style scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #16a085;
  padding: 20px;
}

.card {
  display: inline-block;
  padding: 0;
}

.card > div {
  padding-top:150%;
  position: relative;
}

.card > div > img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  height: 100%;
  background: #fff;
  display:flex;
  justify-content: center;
  align-items: center;
}
</style>

