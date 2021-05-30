class Game{
    constructor(){
        this.restart = createButton("Restart");
    }

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    
    async start() {
        if(gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);
        
        player2 = createSprite(800,500);
        player2.addImage("player2", player_img);
        players=[player1,player2];

        this.restart.hide();
    }
    
    play() {
        form.hide();
        this.restart.show();
        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        var positionY = 50;

        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            positionY += 30
            
            players[index -1].x = x;
            players[index - 1].y = y;

            if(index === player.index) {
                fill(0);
                textSize(25);
                textFont("georgia");
                textAlign(CENTER);
                text(allPlayers[plr].name,x,y+25);
            }

            fill(255);
            textSize(25);
            textFont("georgia");
            textAlign(CENTER);
            text(allPlayers[plr].name + ": "+allPlayers[plr].score,75,positionY);

            if(allPlayers.player1.score >= 20 || allPlayers.player2.score >= 20) {
                game.update(2);
              }

            if(players[index-1].isTouching(fruitGroup)) {
                fruitGroup.removeSprites();;
                player.score++;
                player.update();
            }
            if(players[index-1].isTouching(fruit2Group)) {
                fruit2Group.removeSprites();;
                player.score++;
                player.update();
            }
            if(players[index-1].isTouching(fruit3Group)) {
                fruit3Group.removeSprites();;
                player.score++;
                player.update();
            }
            if(players[index-1].isTouching(fruit4Group)) {
                fruit4Group.removeSprites();;
                player.score++;
                player.update();
            }
        }

        if(keyIsDown(RIGHT_ARROW) && player.index!==null) {
            player.distance-=10;
            player.update();
        }
        if(keyIsDown(LEFT_ARROW) && player.index!==null) {
            player.distance+=10;
            player.update();
        }

        if(frameCount%100 === 0) {
            fruit = createSprite(random(100,1000),0,100,100);
            fruit.velocityY = 6;
            fruitGroup.add(fruit);
            fruit.lifetime = 200;
            var r = Math.round(random(1,5));
            if(r === 1) {
                fruit.addImage(fruit1_img);
            } else if(r === 2) {
                fruit.addImage(fruit2_img);
            } else if(r === 3) {
                fruit.addImage(fruit3_img);
            } else if(r === 4) {
                fruit.addImage(fruit4_img);
            } else if(r === 5) {
                fruit.addImage(fruit5_img);
            }
        }

        if(frameCount%120 === 0) {
            fruit2 = createSprite(random(100,1000),0,100,100);
            fruit2.velocityY = 6;
            fruit2Group.add(fruit2);
            fruit2.lifetime = 200;
            var r2 = Math.round(random(1,5));
            if(r2 === 1) {
                fruit2.addImage(fruit1_img);
            } else if(r2 === 2) {
                fruit2.addImage(fruit2_img);
            } else if(r2 === 3) {
                fruit2.addImage(fruit3_img);
            } else if(r2 === 4) {
                fruit2.addImage(fruit4_img);
            } else if(r2 === 5) {
                fruit2.addImage(fruit5_img);
            }
        }

        if(frameCount%140 === 0) {
            fruit3 = createSprite(random(100,1000),0,100,100);
            fruit3.velocityY = 6;
            fruit3Group.add(fruit3);
            fruit3.lifetime = 200;
            var r3 = Math.round(random(1,5));
            if(r3 === 1) {
                fruit3.addImage(fruit1_img);
            } else if(r3 === 2) {
                fruit3.addImage(fruit2_img);
            } else if(r3 === 3) {
                fruit3.addImage(fruit3_img);
            } else if(r3 === 4) {
                fruit3.addImage(fruit4_img);
            } else if(r3 === 5) {
                fruit3.addImage(fruit5_img);
            }
        }

        if(frameCount%160 === 0) {
            fruit4 = createSprite(random(100,1000),0,100,100);
            fruit4.velocityY = 6;
            fruit4Group.add(fruit4);
            fruit4.lifetime = 200;
            var r4 = Math.round(random(1,5));
            if(r4 === 1) {
                fruit4.addImage(fruit1_img);
            } else if(r4 === 2) {
                fruit4.addImage(fruit2_img);
            } else if(r4 === 3) {
                fruit4.addImage(fruit3_img);
            } else if(r4 === 4) {
                fruit4.addImage(fruit4_img);
            } else if(r4 === 5) {
                fruit4.addImage(fruit5_img);
            }
        }

        this.restart.position(1000,200);
        this.restart.style('width', '100px');
        this.restart.style('height', '40px');
        this.restart.style('background', 'lightpink');
        this.restart.mousePressed(() => {
            this.reset();
            game = new Game();
            game.getState();
            game.start();
        });
    }

    end(){
        background(back_img);
        textSize(40);
        textFont("georgia");
        fill("skyblue");
        if(player.score >= 20) {
            text("Game Over! You won! Awesome job!",500,500);
        } else {
            text("Game Over! Better luck next time!",500,500);
        }
        if(allPlayers.player1.score >= 20) {
            text(allPlayers.player1.name+"has won!",500,450);
        } else if(allPlayers.player2.score >= 20) {
            text(allPlayers.player2.name+" has won!",500,450);
        }
    }

    reset() {
        database.ref('/').update({
            gameState: 0,
            playerCount: 0
        })
        database.ref("players/player1").update({
            score: 0,
            name: "",
            distance:0
        });
        database.ref("players/player2").update({
            score: 0,
            name: "",
            distance:0
        });
        this.restart.hide();
    }
}