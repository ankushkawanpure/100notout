console.clear();
class Gamer {
  constructor(name) {
    this.name = name;
    this.currentScore;
    this.totalScore = 0;
    this.isBusted = false;
  }
}

var app = new Vue({
  el: "#app",
  data: {
    lowestScore: 0,
    gamers: [],
    newMemberName: "",
    bustedPlayers: new Set()
  },
  computed:{
    getLowestScore: function(){
      return this.lowestScore;
    }
  },
  methods: {
    addMember: function(event) {
      if(this.newMemberName === ''){
        return;
      }
      console.log(this.newMemberName);
      this.gamers.push(new Gamer(this.newMemberName));
      this.newMemberName = "";
    },
    computeScores: function() {
      let scores = this.gamers.map(gamer => gamer.currentScore);
      debugger;
      this.lowestScore = Math.min(...scores);
      this.gamers.forEach((gamer, index) => {
        if (!this.bustedPlayers.has(gamer.name)) {
          gamer.totalScore =
            gamer.totalScore + parseInt(gamer.currentScore) - this.lowestScore;
          gamer.currentScore = 0;
          if (gamer.totalScore > 100) {
            gamer.isBusted = true;
            this.bustedPlayers.add(gamer.name);
          }
        }
      });
      this.lowestScore='';
    }
  }
});

console.log(app.gamers);

