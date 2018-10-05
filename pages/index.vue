<template>
  <div class="main">
    <div
      class="card"
      v-for="card in cards"
      :key="card.suit + card.rank"
      :style="`
        width: ${100 / 13}%;
        height: ${100 / 4}%;
        opacity: ${card.match ? 0 : 1};
        cursor: ${(!card.turn && !card.match && !returnCards.length && !deleteCards.length) ? '' : ''};
      `"
    >
      <img
        @click="changeCurrentCard(card)"
        :src="card.turn ? require('../assets/image/' + card.suit + card.rank + '.png')
                        : require('../assets/image/z02.png')"
      >
    </div>
    <div>Cards count: {{cardTotal}}</div>
  </div>
</template>

<script>
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
  display: inline-flex;
  border-radius: 5%;
  padding: 0.2rem;
}
.card > img {
  width: 100%;
  margin: auto
}
</style>

