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
            this.sprite = sprite;
        }
        // 此为游戏必须的函数，用来在屏幕上画出资源，
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// 这是我们的玩家要躲避的敌人
class Enemy extends Entity {
    constructor(x, y, speed) {
        // 要应用到每个敌人的实例的变量写在这里
        // 我们已经提供了一个来帮助你实现更多
        super(x, y, 'images/enemy-bug.png');
        this.speed = speed;

    }

    // 此为游戏必须的函数，用来更新敌人的位置
    // 参数: dt ，表示时间间隙
    update(dt) {
        // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
        // 都是以同样的速度运行的
        this.x += this.speed * dt;
    }
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
class Player extends Entity {
    constructor(x, y) {
        super(x, y, 'images/char-cat-girl.png');
    }

    handleInput(keyCode) {
        // 根据 keyCode 控制角色移动
        switch (keyCode) {
            case 'left':
                this.x += colWid * (-1);
                break;
            case 'up':
                this.y += rowHigh * (-1);
                break;
            case 'right':
                this.x += colWid;
                break;
            case 'down':
                this.y += rowHigh;
                break;
        }
    }
    update() {
        // this.x = x0Player;
        // this.y = y0Player;
    }
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
let allEnemies = [];
const numEnemies = 3;
const rowHigh = 83;
const colWid = 101;
const x0Enemy = 0;
const y0Enemy = 60;
const x0Player = 200;
const y0Player = 408;


allEnemies.push(new Enemy(x0Enemy, y0Enemy, 50));
allEnemies.push(new Enemy(x0Enemy, y0Enemy + rowHigh, 60));
allEnemies.push(new Enemy(x0Enemy, y0Enemy + rowHigh * 2, 30));

const player = new Player(x0Player, y0Player);

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