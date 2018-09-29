// 在提供的范本 - Enemy 类(Class)的基础上创建 Player 类
// 填 Player 实例(instance)起始的位置信息(提示: x? y?)
// 用 Player 类创造一个player实例 (你就会看到游戏场景被启动了)
// 使用 Enemy 类创造多个 enemy 实例
// 填入 enemy 实例的起始位置信息
// 填入 enemy 实例的移动函数(function)
// 建立 player 的输入(input)函数 (Brian注: 以控制player的上下左右移动)
// 建立检测碰撞的函数

class Entity {
    constructor(x, y, sprite) {
            this.x = x;
            this.y = y;
            this.pos = [x, y]; //储存初始位置
            this.sprite = sprite;
        }
        // 此为游戏必须的函数，用来在屏幕上画出资源，
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    reset() {
        //将 x 和 y 设置为最开始的位置
        this.x = this.pos[0];
        this.y = this.pos[1];
    }
}

// 这是我们的玩家要躲避的敌人
class Enemy extends Entity {
    constructor(x, y) {
        // 要应用到每个敌人的实例的变量写在这里
        // 我们已经提供了一个来帮助你实现更多
        super(x, y, 'images/enemy-bug.png');
        this.speed = getRandomNum(20, 120); //使每个 enemy 的速度随机

    }

    // 此为游戏必须的函数，用来更新敌人的位置
    // 参数: dt ，表示时间间隙
    update(dt) {
        // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
        // 都是以同样的速度运行的

        if (this.x < maxWidth) {
            this.x += this.speed * dt;
        } else {
            this.reset();
        }
    }
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
class Player extends Entity {
    constructor(x, y) {
        super(x, y, 'images/char-cat-girl.png');
        this.isWin = false;
    }


    update() {
        // 检测是否碰撞
        for (let enemy of allEnemies) {
            if ((this.y === enemy.y) && (Math.abs(this.x - enemy.x) < colWid / 2)) {
                this.reset();
            }
        }

        // 检测是否赢得游戏
        // Player 的 x y 是否到达最上面一行
        if (this.y < 0) {
            setTimeout(() => {
                this.reset();
            }, 500);
        }
    }

    handleInput(keyCode) {
        // 根据 keyCode 控制角色移动
        switch (keyCode) {
            case 'left':
                if (this.x > 0) {
                    this.x -= colWid;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= rowHigh;
                }
                break;
            case 'right':
                if (this.x <= colWid * 3) {
                    this.x += colWid;
                }
                break;
            case 'down':
                if (this.y <= rowHigh * 4) {
                    this.y += rowHigh;
                }
                break;
        }
    }
}

// class Star extends Entity {
//     constructor(x, y) {
//         super(x, y, 'images/Star.png');
//     }

//     reset() {
//         // 使星星消失
//         this.x = -200;
//         this.y = -200;
//     }
// }

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
let allEnemies = [],
    stars = [];
const numEnemies = 3,
    rowHigh = 83,
    colWid = 101,
    spriteOffset = 11,
    maxWidth = 505,
    maxHight = 606;

function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(getRandomNum(0, 100), rowHigh * (i + 1) - spriteOffset));
}

const player = new Player(colWid * 2, rowHigh * 5 - spriteOffset);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});