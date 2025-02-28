const dataTiles = [
    { id: 0, hidden: true, position: 0 },
    { id: 1, hidden: false, position: 1 },
    { id: 2, hidden: false, position: 2 },
    { id: 3, hidden: false, position: 3, },
    { id: 4, hidden: false, position: 4 },
    { id: 5, hidden: false, position: 5 },
    { id: 6, hidden: false, position: 6 },
    { id: 7, hidden: false, position: 7 },
    { id: 8, hidden: false, position: 8 },
  ]
  
  const allowedMoves = [
    { positions: [1, 3] },
    { positions: [0, 4, 2] },
    { positions: [1, 5] },
    { positions: [0, 4, 6] },
    { positions: [1, 3, 5, 7] },
    { positions: [2, 4, 8] },
    { positions: [3, 7] },
    { positions: [6, 4, 8] },
    { positions: [7, 5] }
  ]


  const onOrOff = () => Math.round(Math.random() * 100) > 50 ? true : false;
    
  const randomiseTiles = (dataTiles) => {
      const positionList = [0];
      while (positionList.length < 9) {
          const selection = Math.round(Math.random(1) * 8);
          if (positionList.includes(selection) === false) {
              positionList.push(selection);
          }
      }
  
      for (let i = 1; i < 9; i++) {
          dataTiles[i].position = positionList[i];
          if (i === 1 || i === 3) {
              dataTiles[i].movable = true;
          }
      }
  };
  
  const autoMove = (dataTiles, allowedMoves) => {
      let tileToMove = 0;
      const numberOfMoves = 200;
  
      for (let i = 0; i < numberOfMoves; i++) {
  
          //get new position
          const newSelection = Math.round(Math.random(1) * (allowedMoves[tileToMove].positions.length - 1));
          const newTile = allowedMoves[tileToMove].positions[newSelection];
  
          dataTiles[tileToMove].hidden = false;
          dataTiles[newTile].hidden = true;
  
          const currentPosition = dataTiles[tileToMove].position;
          dataTiles[tileToMove].position = dataTiles[newTile].position;
          dataTiles[newTile].position = currentPosition;
  
          tileToMove = newTile;
      }
  
      return tileToMove;
  };
  
  const checkComplete = (dataToTest) => {
      for (let i = 0; i < 9; i++) {
          if (dataToTest[i].id != dataToTest[i].position) {
              return false;
          }
      }
  
      return true;
  };

  let isComplete = false;
  let tileNumber = ''+Math.floor(Math.random() * 7);
  let tileData = Array.from(dataTiles);
  let emptyPosition = autoMove(tileData,allowedMoves);

  const gameBoard = document.getElementById('gameBoard');
  const gameHint = document.getElementById('gameHint');
  const btnRestart = document.getElementById('btnRestart');

  btnRestart.addEventListener('click', () => {
    isComplete = false;
    tileData = Array.from(dataTiles);
    emptyPosition = autoMove(tileData,allowedMoves);
    gameHint.classList.remove('tileImg' + tileNumber);
    tileNumber = ''+Math.floor(Math.random() * 7);
    drawGameTiles();
    const btnRestart = document.getElementById('btnRestart');
    gameHint.classList.add('tileImg' + tileNumber);
  });

  const btnHint = document.getElementById('btnHint');
  btnHint.addEventListener('click', () => {
    gameBoard.classList.add('hidden');
    gameHint.classList.remove('hidden');

    const hintTimeOut = setTimeout(() => {
        gameHint.classList.add('hidden');
        gameBoard.classList.remove('hidden');
    }, 1000);
  });

  const handleClick = (tile) => {
    if (isComplete){
    return;
    }

    const validMove = allowedMoves[tile.id].positions.includes(emptyPosition);

    if (validMove === true) {
        let tempTileData = Array.from(tileData);

        tempTileData[tile.id].hidden = true;
        tempTileData[emptyPosition].hidden = false;

        const currentPosition = tempTileData[tile.id].position;
        tempTileData[tile.id].position = tempTileData[emptyPosition].position;
        tempTileData[emptyPosition].position = currentPosition;

        const completeChecked = checkComplete(tempTileData)

        if (completeChecked === true) {
            tempTileData[0].hidden = false;
            const btnRestart = document.getElementById('btnRestart');
            btnRestart.classList.remove('hidden');
            btnHint.classList.add('hidden');
        }

        isComplete = completeChecked;
        emptyPosition = tile.id;
        tileData = Array.from(tempTileData);

        drawGameTiles();
    }
}

const drawGameTile = (gameTile) => {
    const newTile = document.createElement("div");
    newTile.id = gameTile.id;
    newTile.className = 'tile tileImg' + tileNumber + ' position' + gameTile.position + (gameTile.hidden ? ' hide':'');
    newTile.addEventListener('click',() => {handleClick(gameTile);});
    gameBoard.append(newTile);
}

const drawGameTiles = () => 
{
    gameBoard.innerHTML = "";
    tileData.map(tile => drawGameTile(tile));
}

drawGameTiles();
