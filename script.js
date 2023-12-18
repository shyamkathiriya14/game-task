const cards = document.querySelectorAll('.card');

    let userName;
    let startTime;
    let endTime;
    let matchCard = 0;
    let cardOne, cardTwo;
    let disableDeck = false;
    const cardscontainer = document.getElementById('cardscontainer');
    const demo = document.getElementById('demo');
    let count = 0;

    let ddata = JSON.parse(localStorage.getItem('scoreBoard')) || [];

    window.addEventListener('DOMContentLoaded', function(){
      userName = prompt('Please Enter your name: ');
      console.log('ScoreBoard', ddata);
    //   updateScoreboard();
    })

    function flipCard({target: clickCard}){
    //   const clickCard = e.target;
      
      if(clickCard !== cardOne && !disableDeck){
        clickCard.classList.add("flip");
        if(!cardOne){
          return cardOne = clickCard;
        }
        count++; // Increase by 1 whenever the user opens a card
		console.log(' >>> Updated User Moves ', count);
        if(count === 1){ // Check if the user is opening a card for the first time
          startTime = +new Date(); // If yes, then save start time
        }
        cardTwo = clickCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector('.back-view img').src;
        let cardTwoImg = cardTwo.querySelector('.back-view img').src;
        matchCards(cardOneImg, cardTwoImg);
      }
    }

    function matchCards(img1, img2){
      if(img1 == img2){
        matchCard++;
        if(matchCard == 8){
          endTime = +new Date(); // Save end time to calculate the total game play time
          let totalGameTime = endTime - startTime;
          let newData = {userName: userName, totalGameTime: totalGameTime, totalMoves: count};
          ddata.push(newData);
          localStorage.setItem('scoreBoard', JSON.stringify(ddata));
          setTimeout(()=>{
            return stuffCard();
          }, 1000);
        }
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
      }

      setTimeout(() => {
        cardOne.classList.remove("flip");
        cardTwo.classList.remove("flip");
        cardOne = cardTwo = "";
        disableDeck = false;
      }, 1200);
    }

    function stuffCard(){
      matchCard = 0;
      disableDeck = false;
      cardOne = cardTwo = "";
      let array = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
      array.sort(()=> Math.random() > 0.5 ? 1 : -1);
      cards.forEach((card,i)=>{
        card.classList.remove('flip');
        let imgTag = card.querySelector('img');
        imgTag.src = `images/img-${array[i]}.png`;
        card.addEventListener('click', flipCard);
      });
      updateScoreboard();
    }
	stuffCard()

	function formatTime(milliseconds) {
		const hours = Math.floor(milliseconds / (1000 * 60 * 60));
		const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
		return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	  }

    function updateScoreboard() {
		ddata.sort((a, b) => a.totalMoves - b.totalMoves);

		let scoreboardHTML = `
    <table>
      <tr>
	  <th>Rank </th>
        <th>User Name</th>
        <th>Total Game Time</th>
        <th>Total Moves</th>
      </tr>
  `;

  ddata.forEach((data, i) => {
    scoreboardHTML += `
      <tr class="scoreboard-line">
	  <td>${i+1}</td>
        <td>${data.userName}</td>
        <td>${formatTime(data.totalGameTime)}</td>
        <td>${data.totalMoves}</td>
      </tr>
    `;
  });

  scoreboardHTML += `</table>`;
  demo.innerHTML = scoreboardHTML;
    }



    cards.forEach(card => {
      card.addEventListener('click', flipCard);
    });
