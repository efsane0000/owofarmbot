global.love = "e<3"; // 💔
var version = "1.0.7.6";
var banversion = "0.1.10";
//coded by @mid0aria on github
const os = require("os");
if (os.userInfo().username === "DESKTOP-3VVC3") {
    console.log(".l.");
    process.exit(0);
}
//who is aix ?
const cp = require("child_process");
const fs = require("fs");
const path = require("path");

//------------
const packageJson = require("./package.json");

for (let dep of Object.keys(packageJson.dependencies)) {
    try {
        require.resolve(dep);
    } catch (err) {
        console.log("Installing dependencies...");
        cp.execSync(`npm i`);
    }
}
const request = require("request");
const chalk = require("chalk");
const config = require("./config.json");

require("dotenv").config();

const { https } = require("follow-redirects");
const collect = require("collect.js");
const DiscordRPC = require("discord-rpc");
const delay = require("delay");
const socketio = require("socket.io")(1337);
const notifier = require("node-notifier");
const diagnosticinformation = require("systeminformation");
const Buffer = require("buffer").Buffer;

const rpcclientid = "1078993881556865155";
const rpc = new DiscordRPC.Client({ transport: "ipc" });

let maintoken = config.main.token || process.env.MAIN_TOKEN;
let extratoken = config.extra.token || process.env.EXTRA_TOKEN;
let settings = config.settings;
let maintokenuserid = config.main.userid;
let mainchannelid = config.main.channelid;
let owodmmainchannelid = config.main.owodmchannelid;
let extratokencheck = config.settings.extratoken;
let extratokenuserid = config.extra.userid;
let extrachannelid = config.extra.channelid;
let owodmextrachannelid = config.extra.owodmchannelid;
let mainautoquestchannelid = config.main.autoquestchannelid;
let extraautoquestchannelid = config.extra.autoquestchannelid;
let maingamblechannelid = config.main.gamblechannelid;
let extragamblechannelid = config.extra.gamblechannelid;
let prefix = settings.prefix;
if (prefix == (null || undefined || "")) {
    prefix = "owo";
}

global.quest = true;
global.questtitle = "";

//console.clear();
process.title = `OwO Farm Bot 💗 Bot Version ${version} / BanBypass Version ${banversion} 💗`;

checkversion();

if (config.windowssettings.controlcdetectec) {
    process.on("SIGINT", function () {
        console.log(chalk.yellow("CTRL + C detected..."));
        console.log(chalk.red("killing socket client"));
        cp.exec("taskkill /f /im cmd.exe");
        cp.exec("taskkill /f /im windowsterminal.exe");
    });
}
var asciieye = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣤⣤⣤⣤⣤⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠻⠿⢿⣿⣿⣿⣿⣿⣶⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⣿⣿⣿⣿⣿⣿⣶⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣷⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⣀⣙⢿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠻⣿⣿⣿⣿⣿⣿⣿⣄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⡟⠹⠿⠟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⠋⡬⢿⣿⣷⣤⣤⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⡇⢸⡇⢸⣿⣿⣿⠟⠁⢀⣬⢽⣿⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣧⣈⣛⣿⣿⣿⡇⠀⠀⣾⠁⢀⢻⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣧⣄⣀⠙⠷⢋⣼⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁
⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀
⠸⣿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀
⠀⢹⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀
⠀⠀⠹⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀
⠀⠀⠀⠙⣿⣿⣿⣿⣿⣶⣤⣀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠛⠛⠛⠛⠛⠛⠛⠋⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;

console.log(asciieye);
console.log("opened socket client");
cp.exec("cd utils && start socket.bat");

if (settings.huntandbattle) {
    var rpchab = "✅";
} else {
    var rpchab = "❌";
}
if (settings.banbypass) {
    var rpcbanb = "✅";
    var rpcbant = `BanBypass system v${banversion}`;
    var rpcdetails = `🔥 Bot v${version}/BanBypass v${banversion} 🔥`;
} else {
    var rpcbanb = "❌";
    var rpcbant = "BanBypass system disabled";
    var rpcdetails = `🔥 Bot v${version} 🔥`;
}
if (settings.animals.enable) {
    if (settings.animals.type == "sacrifice") {
        var rpcanimals = "sacrifice";
    } else if (settings.animals.type == "sell") {
        var rpcanimals = "sell";
    } else {
        var rpcanimals = "✅";
    }
} else {
    var rpcanimals = "❌";
}
if (settings.inventory.inventorycheck) {
    var rpcinventory = "✅";
} else {
    var rpcinventory = "❌";
}
if (settings.times.enable) {
    var times = "User controlled times.";
    setTimeout(() => {
        socketio.emit("times", {
            data: times,
        });
    }, 2500);
} else {
    var times = "Developer recommended time intervals are used";
    setTimeout(() => {
        socketio.emit("times", {
            data: times,
        });
    }, 2500);
}
setTimeout(() => {
    socketio.emit("bot", {
        info: `Hunt and Battle: ${rpchab} BanBypass: ${rpcbanb} Inventory Check: ${rpcinventory} Animals: ${rpcanimals}`,
    });
}, 2500);

rpc.on("ready", () => {
    console.log(chalk.blue("Discord RPC Started!"));

    rpc.setActivity({
        details: rpcdetails,
        state: `Hunt and Battle: ${rpchab} BanBypass: ${rpcbanb} Inventory: ${rpcinventory} Animals: ${rpcanimals}`,
        startTimestamp: new Date(),
        largeImageKey: "owo",
        largeImageText: `v${version}`,
        smallImageKey: "ban",
        smallImageText: rpcbant,
        instance: false,
        buttons: [
            {
                label: "Farm Bot",
                url: "https://github.com/Mid0aria/owofarmbot",
            },
            {
                label: "Developer",
                url: "https://github.com/Mid0aria/",
            },
        ],
    });
});

if (extratoken === maintoken) {
    extratokencheck = false;
}

if (mainchannelid.lenght == 0) {
    console.log(chalk.red("Main Token Channel ID ❌"));

    process.exit(0);
}
if (maintokenuserid.lenght == 0) {
    console.log(chalk.red("Main Token User ID ❌"));

    process.exit(0);
}
if (owodmmainchannelid.lenght == 0) {
    console.log(chalk.red("Main Token OwO DM Channel ID ❌"));

    process.exit(0);
}

if (extratokencheck) {
    if (extrachannelid.lenght == 0) {
        console.log(chalk.red("Extra Token Channel ID ❌"));

        process.exit(0);
    }
    if (extratokenuserid.lenght == 0) {
        console.log(chalk.red("Extra Token User ID ❌"));

        process.exit(0);
    }
    if (owodmextrachannelid.lenght == 0) {
        console.log(chalk.red("Extra Token OwO DM Channel ID ❌"));

        process.exit(0);
    }
}

//E <3

DiscordRPC.register(rpcclientid);

if (settings.discordrpc) {
    rpc.login({ clientId: rpcclientid }).catch((e) => {
        console.log(",..,");
    });
}

console.log(
    chalk.cyan("github.com/mid0aria\n") +
        chalk.cyan("Made with love for e<3\n") +
        chalk.magenta("OwO Farm Bot Started") +
        chalk.blue(` version ${version}`)
);

if (settings.banbypass) {
    global.mainbanc = false;
    global.extrabanc = false;

    console.log(
        chalk.yellow("Captcha (ban) Bypass System by Aix ") +
            chalk.blue(`version ${banversion}`)
    );
    console.log(`{/__/}\n( ^ . ^)\n/ > ` + chalk.red("Captcha Bypass"));
} else {
    global.mainbanc = true;
    global.extrabanc = true;
    console.log(chalk.red(`{/__/}\n( • . •)\n/ > 🥒`));
}

//notify related
//sorry i dont know about javascript very much
var notifynumber = config.settings.notifynumber;

if (notifynumber < 0) {
    console.log(
        chalk.red(" Invalid notify number!"),
        chalk.white("\n Defaulting to 1."),
        chalk.gray(
            "\n Why on earth you think you can use a negative value for a notify repeating number?"
        )
    );
    notifynumber = 1;
}
if (notifynumber > 6) {
    console.log(
        chalk.white(
            " Look like your number of notify is quite big, are you sure?"
        )
    );
}

global.mainhuntc = true;
global.mainbattlec = true;
global.extrahuntc = true;
global.extrabattlec = true;

const mainctrl = settings.manualcontroller.main;
const extractrl = settings.manualcontroller.extra;

global.mainhuntdaily = false;
global.mainbattledaily = false;
global.mainhuntpaused = false;
global.mainquest = false;
global.extrahuntdaily = false;
global.extrabattledaily = false;
global.extrahuntpaused = false;
global.extraquest = false;

const mainrarity = mainctrl.maximum_gem_rarity;
var mainmaxgemvalue;
switch (mainrarity) {
    case "legendary":
        mainmaxgemvalue = 6;
        break;
    case "mythical":
        mainmaxgemvalue = 5;
        break;
    case "epic":
        mainmaxgemvalue = 4;
        break;
    case "rare":
        mainmaxgemvalue = 3;
        break;
    case "uncommon":
        mainmaxgemvalue = 2;
        break;
    case "common":
        mainmaxgemvalue = 1;
        break;
    default:
        mainmaxgemvalue = 7;
        break;
}

const extrararity = extractrl.maximum_gem_rarity;
var extramaxgemvalue;
switch (extrararity) {
    case "legendary":
        extramaxgemvalue = 6;
        break;
    case "mythical":
        extramaxgemvalue = 5;
        break;
    case "epic":
        extramaxgemvalue = 4;
        break;
    case "rare":
        extramaxgemvalue = 3;
        break;
    case "uncommon":
        extramaxgemvalue = 2;
        break;
    case "common":
        extramaxgemvalue = 1;
        break;
    default:
        extramaxgemvalue = 7;
        break;
}

var notifymethod = settings.notifymethod;
if (notifymethod != "promt" || notifymethod != "notify")
    notifymethod = "notify";

//----------------------------------------------------Check Main Token----------------------------------------------------//
request.get(
    {
        headers: {
            authorization: maintoken,
        },
        url: "https://canary.discord.com/api/v9/users/@me",
    },
    function (error, response, body) {
        if (error) {
            console.error(error);
        }
        var bod = JSON.parse(body);

        if (String(bod.message) === "401: Unauthorized") {
            console.log(
                chalk.red(`Main Token / ${String(bod.message)} (TOKEN WRONG!)`)
            );
            updateerrorsocket(
                `Main Token / ${String(bod.message)} (TOKEN WRONG!)`
            );
            setTimeout(() => {
                process.exit(0);
            }, 5000);
        } else {
            console.log(chalk.green("Main Token ✅"));
            console.log(
                `[Main Token] User: ${bod.username}#${bod.discriminator}`
            );

            checklist(maintoken, "Main Token", mainchannelid);
            global.mainfirstrun = true;
            if (settings.autoquest)
                setTimeout(
                    () =>
                        getquests(
                            maintoken,
                            mainautoquestchannelid,
                            "Main Token"
                        ),
                    6100
                );
            sleepy("Main", "CheckList");
        }
    }
);

//----------------------------------------------------Check Extra Token----------------------------------------------------//
if (extratokencheck) {
    global.etoken = true;
    request.get(
        {
            headers: {
                authorization: extratoken,
            },
            url: "https://canary.discord.com/api/v9/users/@me",
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            var bod = JSON.parse(body);

            if (String(bod.message) === "401: Unauthorized") {
                global.etoken = false;
                console.log(chalk.red("Extra Token ❌"));
                console.log(chalk.red(`EXTRA TOKEN / ${String(bod.message)}`));
            } else {
                global.etoken = true;
                console.log(chalk.green("Extra Token ✅"));
                console.log(
                    `[Extra Token] User: ${bod.username}#${bod.discriminator}`
                );

                if (global.etoken) {
                    setTimeout(() => {
                        checklist(extratoken, "Extra Token", extrachannelid);
                        global.extrafirstrun = true;
                        if (settings.autoquest)
                            setTimeout(
                                () =>
                                    getquests(
                                        extratoken,
                                        extraautoquestchannelid,
                                        "Extra Token"
                                    ),
                                6100
                            );
                        setTimeout(() => {
                            sleepy("Extra", "CheckList");
                        }, 5000);
                    }, 3500);
                }
            }
        }
    );
} else {
    global.etoken = false;
}
//--------------------------HUNT BATTLE-------------------------------------------------------//
function triggerhunt() {
    if (settings.times.enable) {
        var smaller_timehunt = settings.times.huntbottom;
        var bigger_timehunt = settings.times.hunttop;
        var timehunt = Math.floor(
            Math.random() * (bigger_timehunt - smaller_timehunt + 1) +
                smaller_timehunt
        );
    } else {
        var timehunt = parseInt(rantime());
        if (timehunt <= 6000) timehunt = timehunt + 2000;
        var timebattle = timehunt + 1000;
    }

    if (mainctrl.stop_hunt_after_quest && global.mainhuntdaily) {
        if (global.mainquest && !global.quest) {
            console.log(
                chalk.magenta("[Main Token]") +
                    chalk.white("Quest completed.\n") +
                    chalk.red("STOPPED HUNTING ON [Main Token]")
            );
            global.mainhuntpaused = true;
            return;
        }
    } else if (mainctrl.stop_hunt_after_daily) {
        if (global.mainhuntdaily) {
            console.log(
                chalk.magenta("[Main Token]") +
                    chalk.white("Daily hunt completed.\n") +
                    chalk.red("STOPPED HUNTING ON [Main Token]")
            );
            global.mainhuntpaused = true;
            return;
        }
    }

    if (settings.huntandbattle) {
        if (global.mainhuntc)
            setTimeout(
                () => hunt(maintoken, timehunt, "Main Token", mainchannelid),
                timehunt
            );
        else huntcheck(maintoken, "Main Token", mainchannelid, 3);
        if (settings.inventory.inventorycheck) {
            setTimeout(() => {
                checkinv(maintoken, mainchannelid, "Main Token");
            }, 2500);
        }
    }
}

function triggerbattle() {
    if (settings.times.enable) {
        var smaller_timebattle = settings.times.battlebottom;
        var bigger_timebattle = settings.times.battletop;
        var timebattle = Math.floor(
            Math.random() * (bigger_timebattle - smaller_timebattle + 1) +
                smaller_timebattle
        );
    } else {
        var timehunt = parseInt(rantime());
        if (timehunt <= 6000) timehunt = timehunt + 2000;
        var timebattle = timehunt + 1000;
    }

    if (mainctrl.stop_battle_after_quest && global.mainbattledaily) {
        if (global.mainquest && !global.quest) {
            console.log(
                chalk.magenta("[Main Token]") +
                    chalk.white("Quest completed.\n") +
                    chalk.red("STOPPED BATTLING ON [Main Token]")
            );
            return;
        }
    } else if (mainctrl.stop_battle_after_daily) {
        if (global.mainbattledaily) {
            console.log(
                chalk.magenta("[Main Token]") +
                    chalk.white("Daily battle completed.\n") +
                    chalk.red("STOPPED BATTLING ON [Main Token]")
            );
            return;
        }
    }

    if (settings.huntandbattle) {
        if (global.mainbattlec)
            setTimeout(
                () =>
                    battle(maintoken, timebattle, "Main Token", mainchannelid),
                timebattle
            );
        else battlecheck(maintoken, "Main Token", mainchannelid, 3);
    }
}

function triggerextrahunt() {
    if (settings.times.enable) {
        var smaller_timehunt = settings.times.huntbottom;
        var bigger_timehunt = settings.times.hunttop;
        var timehunt = Math.floor(
            Math.random() * (bigger_timehunt - smaller_timehunt + 1) +
                smaller_timehunt
        );
    } else {
        var timehunt = parseInt(rantime());
        if (timehunt <= 6000) timehunt = timehunt + 2000;
        var timebattle = timehunt + 1000;
    }

    if (extractrl.stop_hunt_after_quest && global.extrahuntdaily) {
        if (global.extraquest && !global.quest) {
            console.log(
                chalk.magenta("[Extra Token]") +
                    chalk.white("Quest completed.\n") +
                    chalk.red("STOPPED HUNTING ON [Extra Token]")
            );
            global.extrahuntpaused = true;
            return;
        }
    } else if (extractrl.stop_hunt_after_daily) {
        if (global.extrahuntdaily) {
            console.log(
                chalk.magenta("[Extra Token]") +
                    chalk.white("Daily hunt completed.\n") +
                    chalk.red("STOPPED HUNTING ON [Extra Token]")
            );
            global.extrahuntpaused = true;
            return;
        }
    }

    if (settings.huntandbattle) {
        if (global.extrahuntc)
            setTimeout(
                () => hunt(extratoken, timehunt, "Extra Token", extrachannelid),
                timehunt
            );
        else huntcheck(extratoken, "Extra Token", extrachannelid, 3);
        if (settings.inventory.inventorycheck) {
            setTimeout(() => {
                checkinv(extratoken, extrachannelid, "Extra Token");
            }, 2500);
        }
    }
}

function triggerextrabattle() {
    if (settings.times.enable) {
        var smaller_timebattle = settings.times.battlebottom;
        var bigger_timebattle = settings.times.battletop;
        var timebattle = Math.floor(
            Math.random() * (bigger_timebattle - smaller_timebattle + 1) +
                smaller_timebattle
        );
    } else {
        var timehunt = parseInt(rantime());
        if (timehunt <= 6000) timehunt = timehunt + 2000;
        var timebattle = timehunt + 1000;
    }

    if (extractrl.stop_battle_after_quest && global.extrabattledaily) {
        if (global.extraquest && !global.quest) {
            console.log(
                chalk.magenta("[Extra Token]") +
                    chalk.white("Quest completed.\n") +
                    chalk.red("STOPPED BATTLING ON [Extra Token]")
            );
            return;
        }
    } else if (extractrl.stop_battle_after_daily) {
        if (global.extrabattledaily) {
            console.log(
                chalk.magenta("[Extra Token]") +
                    chalk.white("Daily battle completed.\n") +
                    chalk.red("STOPPED BATTLING ON [Extra Token]")
            );
            return;
        }
    }

    if (settings.huntandbattle) {
        if (global.extrabattlec)
            setTimeout(
                () =>
                    battle(
                        extratoken,
                        timebattle,
                        "Extra Token",
                        extrachannelid
                    ),
                timebattle
            );
        else battlecheck(extratoken, "Extra Token", extrachannelid, 3);
    }
}

triggerhunt();
triggerbattle();
if (global.etoken) {
    triggerextrahunt();
    triggerextrabattle();
}
//-----------------------------------ANIMALS----------------------------------------------//
if (settings.times.intervals.animals.enable) {
    var timeanimalsinterval = settings.times.intervals.animals.time;
} else {
    var timeanimalsinterval = 1200000;
}

if (settings.animals.enable) {
    setInterval(() => {
        if (settings.banbypass) {
            bancheck(maintoken, mainchannelid);
            dmbancheck(maintoken, owodmmainchannelid);
        }
        animals(maintoken, "Main Token", mainchannelid, settings.animals.type);
        if (global.etoken) {
            if (settings.banbypass) {
                extrabancheck(extratoken, extrachannelid);
                dmextrabancheck(extratoken, owodmextrachannelid);
            }
            animals(
                extratoken,
                "Extra Token",
                extrachannelid,
                settings.animals.type
            );
        }
    }, timeanimalsinterval);
}

//--------------------------------PRAY-------------------------------------------------//
if (settings.times.intervals.pray.enable) {
    var timeprayinterval = settings.times.intervals.pray.time;
} else {
    var timeprayinterval = 303000;
}
if (settings.pray) {
    setInterval(() => {
        if (settings.banbypass) {
            bancheck(maintoken, mainchannelid);
            dmbancheck(maintoken, owodmmainchannelid);
        }
        pray(maintoken, "Main Token", mainchannelid);
        if (global.etoken) {
            if (settings.banbypass) {
                extrabancheck(extratoken, extrachannelid);
                dmextrabancheck(extratoken, owodmextrachannelid);
            }
            pray(extratoken, "Extra Token", extrachannelid);
        }
    }, timeprayinterval);
}
//--------------------------------CURSE-------------------------------------------------//
if (settings.times.intervals.curse.enable) {
    var timecurseinterval = settings.times.intervals.curse.time;
} else {
    var timecurseinterval = 303500;
}
if (settings.curse) {
    setInterval(() => {
        if (settings.banbypass) {
            bancheck(maintoken, mainchannelid);
            dmbancheck(maintoken, owodmmainchannelid);
        }
        curse(maintoken, "Main Token", mainchannelid);
        if (global.etoken) {
            if (settings.banbypass) {
                extrabancheck(extratoken, extrachannelid);
                dmextrabancheck(extratoken, owodmextrachannelid);
            }
            curse(extratoken, "Extra Token", extrachannelid);
        }
    }, timecurseinterval);
}
//--------------------------------UPGRADE-------------------------------------------------//
if (settings.times.intervals.upgrade.enable) {
    var timeupgradeinterval = settings.times.intervals.upgrade.time;
} else {
    var timeupgradeinterval = 1205000;
}
if (settings.upgradeautohunt.enable) {
    setInterval(() => {
        if (settings.banbypass) {
            bancheck(maintoken, mainchannelid);
            dmbancheck(maintoken, owodmmainchannelid);
        }
        upgradeall(maintoken, "Main Token", mainchannelid);
        if (global.etoken) {
            if (settings.banbypass) {
                extrabancheck(extratoken, extrachannelid);
                dmextrabancheck(extratoken, owodmextrachannelid);
            }
            upgradeall(extratoken, "Extra Token", extrachannelid);
        }
    }, timeupgradeinterval);
}

//--------------------------------GAMBLE-------------------------------------------------//

if (settings.times.intervals.gamble.enable) {
    var timegamblecoinflipinterval =
        settings.times.intervals.gamble.coinflip.time;
    var timegambleslotsinterval = settings.times.intervals.gamble.slots.time;
} else {
    var timegamblecoinflipinterval = 25000;
    var timegambleslotsinterval = 25000;
}
if (settings.gamble.coinflip.enable) {
    setInterval(() => {
        if (settings.banbypass) {
            bancheck(maintoken, mainchannelid);
            dmbancheck(maintoken, owodmmainchannelid);
        }
        coinflip(maintoken, "Main Token", maingamblechannelid);
        if (global.etoken) {
            if (settings.banbypass) {
                extrabancheck(extratoken, extrachannelid);
                dmextrabancheck(extratoken, owodmextrachannelid);
            }
            extra_coinflip(extratoken, "Extra Token", extragamblechannelid);
        }
    }, timegamblecoinflipinterval);
}

if (settings.gamble.slots.enable) {
    setInterval(() => {
        if (settings.banbypass) {
            bancheck(maintoken, mainchannelid);
            dmbancheck(maintoken, owodmmainchannelid);
        }
        slots(maintoken, "Main Token", maingamblechannelid);
        if (global.etoken) {
            if (settings.banbypass) {
                extrabancheck(extratoken, extrachannelid);
                dmextrabancheck(extratoken, owodmextrachannelid);
            }
            slots(extratoken, "Extra Token", extragamblechannelid);
        }
    }, timegambleslotsinterval);
}

//----------------------------------------------------FUNCTIONS----------------------------------------------------//

function checkversion() {
    var versi = path.join(__dirname, "/version.json");

    if (fs.existsSync(versi)) {
        console.log();
    } else {
        const versiun = https.get(
            "https://raw.githubusercontent.com/Mid0aria/owofarmbot/main/version.json",
            function (response) {
                var versistream = fs.createWriteStream(versi);
                response.pipe(versistream);
                versistream.on("finish", () => {
                    versistream.close();
                });
            }
        );
    }
    setTimeout(() => {
        request.get(
            {
                url: "https://raw.githubusercontent.com/Mid0aria/owofarmbot/main/version.json",
            },
            function (err, res, body) {
                let bod = JSON.parse(body);

                var apdater = path.join(__dirname, "/updater.js");
                if (bod.updater === require("./version.json").updater) {
                    console.log(
                        chalk.yellow(
                            `Updater Repo Version: ${
                                bod.updater
                            } / Updater Installed Version: ${
                                require("./version.json").updater
                            }`
                        )
                    );
                } else {
                    const boti = https.get(
                        "https://raw.githubusercontent.com/Mid0aria/owofarmbot/main/updater.js",
                        function (response) {
                            var buotstream = fs.createWriteStream(apdater);
                            response.pipe(buotstream);
                            buotstream.on("finish", () => {
                                buotstream.close();
                                console.log("updater.js updated");
                            });
                        }
                    );
                }
                if (bod.version === version) {
                    console.log(
                        chalk.yellow(
                            `Repo Version: ${bod.version} / Installed Version: ${version}`
                        )
                    );
                } else {
                    console.clear();
                    console.log(
                        chalk.yellow(
                            `Repo Version: ${bod.version} / Installed Version: ${version}`
                        )
                    );
                    console.log(
                        chalk.red(
                            "Your farm bot is not up to date please run node updater.js"
                        ) + chalk.yellow(`\nRelease note: ${bod.note}`)
                    );
                    updateerrorsocket(
                        "Your farm bot is not up to date please run node updater.js"
                    );
                    process.exit(0);
                }
            }
        );
    }, 1500);
}

function nonce() {
    return "1098393848631590" + Math.floor(Math.random() * 9999);
}

function rantime() {
    var s = Math.floor(Math.random() * 9);
    if (s == 0) s = Math.floor(Math.random() * 9);
    return s + "000";
}

function autoseed(token) {
    var seedrandom = require("seedrandom");
    var rng = seedrandom.xor4096(`seedaccess-entropyverror-apiv10.${token}`);
    return rng();
}

function sleepy(t, e) {
    console.log(
        chalk.red(
            `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
        ) +
            chalk.magenta(` [${t} Token] `) +
            chalk.red(`${e} Waiting ...`)
    );
}

async function typing(token, channelid) {
    if (settings.typingindicator) {
        request.post(
            {
                headers: {
                    authorization: token,
                },
                url: `https://discord.com/api/v9/channels/${channelid}/typing`,
            },
            function (error, response, body) {
                if (error) {
                    console.log(chalk.red("Typing indicator failed"));
                    if (error) {
                        console.error(error);
                    }
                }
            }
        );
    } else return;
}

async function updatequestssocket(p1, p2) {
    socketio.emit("quest", {
        quest: `${global.questtitle}`,
        progress: `${p1} / ${p2}`,
        date: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    });
}

async function updatechecklistsocket(i, e) {
    setTimeout(() => {
        socketio.emit("checklist", {
            name: i,
            status: e,
        });
    }, 3000);
}

async function updateerrorsocket(eyl) {
    setTimeout(() => {
        socketio.emit("errors", {
            error: eyl,
        });
    }, 3100);
}

//----------------------------------------------------Main Features----------------------------------------------------//
function hunt(token, timehunt, tokentype, channelid) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,

            json: {
                content: `${prefix} hunt`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.blue(` Hunt ✅ (${timehunt} ms)`)
            );
        }
    );
    if (tokentype == "Extra Token") {
        global.extrahuntc = false;
        extrahuntcheck(token, tokentype, channelid, 3);
    } else {
        global.mainhuntc = false;
        huntcheck(token, tokentype, channelid, 3);
    }
}

function battle(token, timebattle, tokentype, channelid) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `${prefix} battle`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.blue(` Battle ✅ (${timebattle} ms)`)
            );
        }
    );
    if (tokentype == "Extra Token") {
        global.extrabattlec = false;
        extrabattlecheck(token, tokentype, channelid, 3);
    } else {
        global.mainbattlec = false;
        battlecheck(token, tokentype, channelid, 3);
    }
}

function animals(token, tokentype, channelid, type) {
    let animalcheck = false;
    var animaltypes = "";
    var ranks = [
        "common",
        "uncommon",
        "rare",
        "epic",
        "mythical",
        "patreon",
        "cpatreon",
        "legendary",
        "gem",
        "bot",
        "distorted",
        "fabled",
        "special",
        "hidden",
    ];
    for (a in ranks) {
        var e = ranks[a];

        if (config.settings.animals.animaltype[e]) {
            var animaltypes = animaltypes + `${e} `;
        }
    }

    if (type === "sacrifice" || type === "sell") {
        animalcheck = true;
    }

    if (animalcheck) {
        const request = require("request");
        typing(token, channelid);
        request.post(
            {
                headers: {
                    authorization: token,
                },
                url: `https://discord.com/api/v9/channels/${channelid}/messages`,
                json: {
                    content: `owo ${type} ${animaltypes}`,
                    nonce: nonce(),
                    tts: false,
                    flags: 0,
                },
            },
            function (error, response, body) {
                if (error) {
                    console.error(error);
                }
                console.log(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} [${tokentype}] Animals ✅ / Type: ${type}`
                );
            }
        );
    } else {
        console.log(
            `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} [${tokentype}] Animals ❌ / Error: Incorrect Type`
        );
    }
}

function pray(token, tokentype, channelid) {
    if (tokentype == "Extra Token") {
        var ct = `${prefix} pray <@${maintokenuserid}>`;
    } else {
        var ct = `${prefix} pray`;
    }
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: ct,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.yellow(" Pray ✅")
            );
        }
    );
}

function curse(token, tokentype, channelid) {
    if (tokentype == "Extra Token") {
        var ct = `${prefix} curse <@${maintokenuserid}>`;
    } else {
        var ct = `${prefix} curse `;
    }
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: ct,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.yellow(" Curse ✅")
            );
        }
    );
}

function checklist(token, tokentype, channelid) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `${prefix} cl`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.yellow("Sending Checklist📜 ...")
            );
            setTimeout(() => {
                request.get(
                    {
                        headers: {
                            authorization: token,
                        },
                        url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=3`,
                    },
                    function (error, response, body) {
                        if (error) {
                            console.error(error);
                        }
                        try {
                            var bod = JSON.parse(body);
                            if (!bod[0]) return;
                            var cont = bod[0].embeds;
                            var des = cont[0].description;

                            if (cont[0].author.name.includes("Checklist")) {
                                chalk.magenta(` [${tokentype}]`) +
                                    chalk.yellow("Getting Checklist 🔎");
                                if (des.includes("☑️ 🎉")) {
                                    updatechecklistsocket("all", "✅");
                                    return "checklist completed";
                                }
                                if (des.includes("☑️ 💎")) {
                                    updatechecklistsocket("lb", "✅");
                                    if (tokentype == "Main Token")
                                        global.mainhuntdaily = true;
                                    else global.extrahuntdaily = true;
                                }
                                if (des.includes("☑️ ⚔")) {
                                    updatechecklistsocket("crate", "✅");
                                    if (tokentype == "Main Token")
                                        global.mainbattledaily = true;
                                    else global.extrabattledaily = true;
                                }

                                if (des.includes("⬛ 🎁")) {
                                    daily(token, tokentype, channelid);
                                } else {
                                    updatechecklistsocket("daily", "✅");
                                }
                                if (des.includes("⬛ 🍪")) {
                                    cookie(token, tokentype, channelid);
                                } else {
                                    updatechecklistsocket("cookie", "✅");
                                }
                                if (des.includes("⬛ 📝")) {
                                    console.log(
                                        chalk.magenta(`[${tokentype}] `) +
                                            chalk.red(
                                                "YOUR DAILY VOTE IS AVAILABLE!"
                                            )
                                    );
                                } else {
                                    updatechecklistsocket("vote", "✅");
                                }
                                if (des.includes("⬛ 📜")) {
                                    if (settings.autoquest) {
                                        getquests(
                                            maintoken,
                                            mainautoquestchannelid,
                                            "Main Token"
                                        );
                                    }
                                } else {
                                    updatechecklistsocket("quest", "✅");
                                }
                            }
                        } catch (error) {
                            updateerrorsocket(
                                "Unable to get Checklist (RESTART BOT!)"
                            );
                            console.log(
                                chalk.red(
                                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                                ) +
                                    chalk.magenta(` [${tokentype}]`) +
                                    chalk.red("Unable to get Checklist❗")
                            );
                        }
                    }
                );
            }, 2000);
        }
    );
}

function daily(token, tokentype, channelid) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `${prefix} daily`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            updatechecklistsocket("daily", "✅");
            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.yellow(" Daily ✅")
            );
        }
    );
}

function cookie(token, tokentype, channelid) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            //not suggested to cookie to OwO because it will always send a captcha
            json: {
                content: `${prefix} cookie <@408785106942164992>`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            updatechecklistsocket("cookie", "✅");
            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.yellow(" Cookie ✅")
            );
        }
    );
}
let currentBet = settings.gamble.coinflip.default_amount;
function coinflip(token, tokentype, channelid) {
    const maxBet = settings.gamble.coinflip.max_amount;
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `owo coinflip ${currentBet}`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        async function (error, response, body) {
            if (error) {
                if (error) {
                    console.error(error);
                }
            }

            await delay(6000);

            request.get(
                {
                    headers: {
                        authorization: token,
                    },
                    url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=3`,
                },
                async function (error, response, body) {
                    if (error) {
                        if (error) {
                            console.error(error);
                        }
                    }

                    try {
                        const bod = JSON.parse(body);
                        if (!bod[0]) return;
                        const cont = bod[0].content;

                        if (cont.includes("and you lost it all... :c")) {
                            currentBet *= settings.gamble.coinflip.multipler;
                            if (Number.isNaN(currentBet)) {
                                currentBet = currentBet;
                            } else {
                                currentBet = Math.round(currentBet);
                            }

                            const lostamount = Math.round(
                                currentBet / settings.gamble.coinflip.multipler
                            );
                            console.log(
                                chalk.red(
                                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                                ) +
                                    chalk.magenta(` [${tokentype}]`) +
                                    chalk.yellow(
                                        ` Lost ${lostamount} in coinflip, next betting ${currentBet}`
                                    )
                            );
                            if (currentBet > maxBet) {
                                currentBet =
                                    settings.gamble.coinflip.default_amount;
                            }
                        } else if (cont.includes(" and you won")) {
                            console.log(
                                chalk.red(
                                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                                ) +
                                    chalk.magenta(` [${tokentype}]`) +
                                    chalk.yellow(
                                        ` You have won ${currentBet} in coinflip`
                                    )
                            );
                            currentBet =
                                settings.gamble.coinflip.default_amount;
                        } else {
                            await delay(10000);
                            request.get(
                                {
                                    headers: {
                                        authorization: token,
                                    },
                                    url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=3`,
                                },
                                async function (error, response, body) {
                                    if (error) {
                                        console.error(error);
                                    }

                                    try {
                                        const bod = JSON.parse(body);
                                        if (!bod[0]) return;
                                        const cont = bod[0].content;

                                        if (
                                            cont.includes(
                                                "and you lost it all... :c"
                                            )
                                        ) {
                                            currentBet *=
                                                settings.gamble.coinflip
                                                    .multipler;
                                            if (Number.isNaN(currentBet)) {
                                                currentBet = currentBet;
                                            } else {
                                                currentBet =
                                                    Math.round(currentBet);
                                            }

                                            const lostamount = Math.round(
                                                currentBet /
                                                    settings.gamble.coinflip
                                                        .multipler
                                            );
                                            console.log(
                                                chalk.red(
                                                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                                                ) +
                                                    chalk.magenta(
                                                        ` [${tokentype}]`
                                                    ) +
                                                    chalk.yellow(
                                                        ` Lost ${lostamount} in coinflip, next betting ${currentBet}`
                                                    )
                                            );
                                            if (currentBet > maxBet) {
                                                currentBet =
                                                    settings.gamble.coinflip
                                                        .default_amount;
                                            }
                                        } else if (
                                            cont.includes(" and you won")
                                        ) {
                                            console.log(
                                                chalk.red(
                                                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                                                ) +
                                                    chalk.magenta(
                                                        ` [${tokentype}]`
                                                    ) +
                                                    chalk.yellow(
                                                        ` You have won ${currentBet} in coinflip`
                                                    )
                                            );
                                            currentBet =
                                                settings.gamble.coinflip
                                                    .default_amount;
                                        } else {
                                            console.log(
                                                chalk.red(
                                                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}` +
                                                        chalk.magenta(
                                                            ` [${tokentype}]`
                                                        ) +
                                                        chalk.yellow(
                                                            ` Could not get the response, retrying...`
                                                        )
                                                )
                                            );
                                        }
                                    } catch (e) {
                                        console.error(e);
                                        return diagnosticreport(e);
                                    }
                                }
                            );
                        }
                    } catch (e) {
                        console.error(e);
                        return diagnosticreport(e);
                    } finally {
                        // Cleanup or additional operations
                    }
                }
            );
        }
    );
}

function extra_coinflip(token, tokentype, channelid) {
    extra_currentBet = settings.gamble.coinflip.default_amount;
    extra_maxBet = settings.gamble.coinflip.max_amount;
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `owo coinflip ${extra_currentBet}`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        async function (error, response, body) {
            if (error) {
                console.error(error);
            }

            await delay(6000);

            request.get(
                {
                    headers: {
                        authorization: token,
                    },
                    url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=3`,
                },
                async function (error, response, body) {
                    if (error) {
                        console.error(error);
                    }

                    try {
                        const bod = JSON.parse(body);
                        if (!bod[0]) return;
                        const cont = bod[0].content;

                        if (cont.includes("and you lost it all... :c")) {
                            extra_currentBet *=
                                settings.gamble.coinflip.multipler;
                            if (Number.isNaN(extra_currentBet)) {
                                extra_currentBet = extra_currentBet;
                            } else {
                                extra_currentBet = Math.round(extra_currentBet);
                            }

                            const lostamount = Math.round(
                                extra_currentBet /
                                    settings.gamble.coinflip.multipler
                            );
                            console.log(
                                chalk.red(
                                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                                ) +
                                    chalk.magenta(` [${tokentype}]`) +
                                    chalk.yellow(
                                        ` Lost ${lostamount} in coinflip, next betting ${currentBet}`
                                    )
                            );
                            if (extra_currentBet > extra_maxBet) {
                                extra_currentBet =
                                    settings.gamble.coinflip.default_amount;
                            }
                        } else if (cont.includes("and you won ")) {
                            console.log(
                                chalk.red(
                                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                                ) +
                                    chalk.magenta(` [${tokentype}]`) +
                                    chalk.yellow(
                                        ` You have won ${currentBet} in coinflip`
                                    )
                            );
                            extra_currentBet =
                                settings.gamble.coinflip.default_amount;
                        } else {
                            console.log(
                                chalk.red(
                                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}` +
                                        chalk.magenta(` [${tokentype}]`) +
                                        chalk.yellow(
                                            ` Could not get the reponse, retrying...`
                                        )
                                )
                            );
                        }
                    } catch (e) {
                        console.error(e);
                        return diagnosticreport(e);
                    } finally {
                        // Cleanup or additional operations
                    }
                }
            );
        }
    );
}

function slots(token, tokentype, channelid) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `owo slots ${settings.gamble.slots.amount}`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.yellow(
                        ` Gamble / Slots ✅ / Amount: ${settings.gamble.slots.amount}`
                    )
            );
        }
    );
}

function upgradeall(token, tokentype, channelid) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token, //E <3
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `owo upgrade ${settings.upgradeautohunt.type} all`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.yellow(" Upgrade AutoHunt ✅")
            );
        }
    );
}

//----------------------------------------------------Inventory----------------------------------------------------//

function checkinv(token, channelid, tokentype) {
    if (settings.inventory.gemcheck) {
        request.get(
            {
                headers: {
                    authorization: token,
                },
                url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=3`,
            },
            function (error, response, body) {
                if (error) {
                    console.error(error);
                }
                var bod = JSON.parse(body);
                if (!bod[0]) return;
                var cont = bod[0].content;
                if (
                    cont.includes("You found:") ||
                    cont.includes("and caught a")
                ) {
                    var collection = collect(["alulu"]);
                    console.log(
                        chalk.red(
                            `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                        ) +
                            chalk.magenta(` [${tokentype}]`) +
                            chalk.yellow(" inventory checking 🔍 (type-1)")
                        //cod ed by @mid0aria on github
                    );
                    if (!cont.includes("gem1")) {
                        collection.push("huntgem");
                    }
                    if (!cont.includes("gem3")) {
                        collection.push("empgem");
                    }
                    if (!cont.includes("gem4")) {
                        collection.push("luckgem");
                    }
                    if (
                        !cont.includes("gem1") ||
                        !cont.includes("gem3") ||
                        !cont.includes("gem4")
                    ) {
                        getinv(
                            token,
                            channelid,
                            tokentype,
                            "gemvar",
                            collection
                        );
                        console.log(
                            chalk.red(
                                `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                            ) +
                                chalk.magenta(` [${tokentype}]`) +
                                chalk.yellow(" inventory checking 🔍 (type-1)")
                            //cod ed by @mid0aria on github
                        );
                    }
                }
            }
        );
    } else {
        console.log(
            chalk.red(
                `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
            ) +
                chalk.magenta(` [${tokentype}]`) +
                chalk.yellow(" inventory checking 🔍 (type-2)")
        );
        getinv(token, channelid, tokentype, "nogem", collect(["nocollection"]));
    }
}

function getinv(token, channelid, tokentype, gemc, collectc) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `${prefix} inv`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
        }
    ); //coded by @mid0aria on github
    setTimeout(() => {
        request.get(
            {
                headers: {
                    authorization: token,
                },
                url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=3`,
            },
            function (error, response, body) {
                if (error) {
                    console.error(error);
                }
                var bod = JSON.parse(body);
                if (!bod[0]) return;
                var cont = bod[0].content;
                if (gemc == "gemvar") {
                    var empgem = "";
                    var empgemstatus = false;
                    var luckgem = "";
                    var luckgemstatus = false;
                    var huntgem = "";
                    var huntgemstatus = false;
                    var specialgem = "";
                    var specialgemstatus = false;
                    var gem = "";
                    var gemusebro = false;

                    if (collectc.contains("huntgem")) {
                        switch (true) {
                            case cont.includes("`057`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 7) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 7)):
                                huntgem = "57";
                                huntgemstatus = true;
                                break;
                            case cont.includes("`056`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 6) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 6)):
                                huntgem = "56";
                                huntgemstatus = true;
                                break;
                            case cont.includes("`055`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 5) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 5)):
                                huntgem = "55";
                                huntgemstatus = true;
                                break;
                            case cont.includes("`054`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 4) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 4)):
                                huntgem = "54";
                                huntgemstatus = true;
                                break;
                            case cont.includes("`053`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 3) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 3)):
                                huntgem = "53";
                                huntgemstatus = true;
                                break;
                            case cont.includes("`052`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 2) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 2)):
                                huntgem = "52";
                                huntgemstatus = true;
                                break;
                            case cont.includes("`051`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 1) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 1)):
                                huntgem = "51";
                                huntgemstatus = true;
                                break;
                            default:
                                huntgemstatus = false;
                                break;
                        }
                    }
                    if (collectc.contains("empgem")) {
                        switch (true) {
                            case cont.includes("`071`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 7) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 7)):
                                empgem = "71";
                                empgemstatus = true;
                                break;
                            case cont.includes("`070`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 6) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 6)):
                                empgem = "70";
                                empgemstatus = true;
                                break;
                            case cont.includes("`069`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 5) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 5)):
                                empgem = "69";
                                empgemstatus = true;
                                break;
                            case cont.includes("`068`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 4) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 4)):
                                empgem = "68";
                                empgemstatus = true;
                                break;
                            case cont.includes("`067`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 3) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 3)):
                                empgem = "67";
                                empgemstatus = true;
                                break;
                            case cont.includes("`066`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 2) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 2)):
                                empgem = "66";
                                empgemstatus = true;
                                break;
                            case cont.includes("`065`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 1) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 1)):
                                empgem = "65";
                                empgemstatus = true;
                                break;
                            default:
                                empgemstatus = false;
                                break;
                        }
                    }
                    if (collectc.contains("luckgem")) {
                        switch (true) {
                            case cont.includes("`078`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 7) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 7)):
                                luckgem = "78";
                                luckgemstatus = true;
                                break;
                            case cont.includes("`077`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 6) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 6)):
                                luckgem = "77";
                                luckgemstatus = true;
                                break;
                            case cont.includes("`076`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 5) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 5)):
                                luckgem = "76";
                                luckgemstatus = true;
                                break;
                            case cont.includes("`075`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 4) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 4)):
                                luckgem = "75";
                                luckgemstatus = true;
                                break;
                            case cont.includes("`074`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 3) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 3)):
                                luckgem = "74";
                                luckgemstatus = true;
                                break;
                            case cont.includes("`073`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 2) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 2)):
                                luckgem = "73";
                                luckgemstatus = true;
                                break;
                            case cont.includes("`072`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 1) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 1)):
                                luckgem = "72";
                                luckgemstatus = true;
                                break;
                            default:
                                luckgemstatus = false;
                                break;
                        }
                    }

                    if (collectc.contains("specialgem")) {
                        switch (true) {
                            case cont.includes("`085`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 7) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 7)):
                                specialgem = "85";
                                specialgemstatus = true;
                                break;
                            case cont.includes("`084`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 6) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 6)):
                                specialgem = "84";
                                specialgemstatus = true;
                                break;
                            case cont.includes("`083`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 5) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 5)):
                                specialgem = "83";
                                specialgemstatus = true;
                                break;
                            case cont.includes("`082`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 4) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 4)):
                                specialgem = "82";
                                specialgemstatus = true;
                                break;
                            case cont.includes("`081`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 3) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 3)):
                                specialgem = "81";
                                specialgemstatus = true;
                                break;
                            case cont.includes("`080`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 2) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 2)):
                                specialgem = "80";
                                specialgemstatus = true;
                                break;
                            case cont.includes("`079`") &&
                                ((tokentype == "Main Token" &&
                                    mainmaxgemvalue >= 1) ||
                                    (tokentype == "Extra Token" &&
                                        extramaxgemvalue >= 1)):
                                specialgem = "79";
                                specialgemstatus = true;
                                break;
                            default:
                                specialgemstatus = false;
                                break;
                        }
                    }

                    if (huntgemstatus) {
                        var gem = gem + ` ${huntgem}`;
                        gemusebro = true;
                    }
                    if (empgemstatus) {
                        var gem = gem + ` ${empgem}`;
                        gemusebro = true;
                    }
                    if (luckgemstatus) {
                        var gem = gem + ` ${luckgem}`;
                        gemusebro = true;
                    }
                    if (specialgemstatus) {
                        var gem = gem + ` ${specialgem}`;
                        gemusebro = true;
                    }
                    if (gemusebro) {
                        gemuse(token, gem, channelid, tokentype);
                    }
                }

                if (settings.inventory.lootboxcheck) {
                    if (cont.includes("`050`")) {
                        setTimeout(() => {
                            boxuse(token, "lootbox all", channelid, tokentype);
                        }, 2000);
                    }
                }

                if (settings.inventory.fabledlootboxcheck) {
                    if (cont.includes("`049`")) {
                        setTimeout(() => {
                            boxuse(
                                token,
                                "lootbox fabled all",
                                channelid,
                                tokentype
                            );
                        }, 2000);
                    }
                }

                if (settings.inventory.cratecheck) {
                    if (cont.includes("`100`")) {
                        setTimeout(() => {
                            boxuse(token, "crate all", channelid, tokentype);
                        }, 2000);
                    }
                }

                if (settings.inventory.eventcheck) {
                    if (cont.includes("`018`")) {
                        // valentines day
                        setTimeout(() => {
                            eventuse(token, "18", channelid, tokentype);
                        }, 2000); //E <3
                    }
                    if (cont.includes("`019`")) {
                        // anniversary day
                        setTimeout(() => {
                            eventuse(token, "19", channelid, tokentype);
                        }, 2000);
                    }
                    if (cont.includes("`020`")) {
                        // fakelootbox
                        setTimeout(() => {
                            eventuse(token, "20", channelid, tokentype);
                        }, 2000);
                    }
                    if (cont.includes("`23`")) {
                        setTimeout(() => {
                            eventuse(token, "23", channelid, tokentype);
                        }, 2000);
                    }
                }
            }
        );
    }, 3000);
}

function gemuse(token, gem, channelid, tokentype) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `owo use ${gem}`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.yellow(" Gem ✅")
            );
        }
    );
}

function boxuse(token, box, channelid, tokentype) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `owo ${box}`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.yellow(` ${box}✅`)
            );
        }
    );
}

function eventuse(token, eventbox, channelid, tokentype) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `owo use ${eventbox}`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            switch (eventbox) {
                case "18":
                    var namebox = "Love Letter (Valentine's Day)";
                    break;
                case "19":
                    var namebox = "Anniversary Present";
                case "20":
                    var namebox = "Fake Lootbox";
            }

            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.yellow(` ${namebox} ✅`)
            );
        }
    );
}
//. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .. ... __ .
//----------------------------------------------------Quest----------------------------------------------------//
async function getquests(token, channelid, tokentype) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `${prefix} quest`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        async function (error, response, body) {
            if (error) {
                console.error(error);
            }
            await delay(3500);
            request.get(
                {
                    headers: {
                        authorization: token,
                    },
                    url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=3`,
                },
                async function (error, response, body) {
                    if (error) {
                        console.error(error);
                    }
                    try {
                        var bod = JSON.parse(body);
                        if (!bod[0]) return;
                        var cont = bod[0].embeds;
                        await delay(2500);
                        console.log(
                            chalk.red(
                                `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                            ) +
                                chalk.magenta(` [${tokentype}]`) +
                                chalk.yellow("Checking quest 🔎")
                        );
                        if (
                            cont[0].description.includes(
                                "You finished all of your quests!"
                            )
                        ) {
                            global.quest = false;
                            if (tokentype == "Main token")
                                global.mainquest = true;
                            else global.extraquest = true;
                        } else {
                            var quest = cont[0].description
                                .split("**1. ")[1]
                                .split("**")[0];
                            global.questtitle = `${quest}`;
                            var progress1 = cont[0].description
                                .split("Progress: [")[1]
                                .split("/")[0];
                            var progress2 = cont[0].description
                                .split("/")[1]
                                .split("]")[0];

                            if (
                                (quest.includes("Battle") ||
                                    quest.includes("Have a friend curse you") ||
                                    quest.includes(
                                        "Have a friend pray to you"
                                    ) ||
                                    quest.includes(
                                        "Receive a cookie from 1 friends"
                                    )) &&
                                !global.etoken
                            ) {
                                try {
                                    quest = cont[0].description
                                        .split("**2. ")[1]
                                        .split("**")[0];
                                    global.questtitle = `${quest}`;
                                    var progress1 = cont[0].description
                                        .split("Progress: [")[2]
                                        .split("/")[0];
                                    var progress2 = cont[0].description
                                        .split("/")[2]
                                        .split("]")[0];
                                } catch (error) {
                                    global.quest = false;
                                }
                                if (
                                    (quest.includes("Battle") ||
                                        quest.includes(
                                            "Have a friend curse you"
                                        ) ||
                                        quest.includes(
                                            "Have a friend pray to you"
                                        ) ||
                                        quest.includes(
                                            "Receive a cookie from 1 friends"
                                        )) &&
                                    !global.etoken
                                ) {
                                    try {
                                        quest = cont[0].description
                                            .split("**3. ")[1]
                                            .split("**")[0];
                                        global.questtitle = `${quest}`;
                                        var progress1 = cont[0].description
                                            .split("Progress: [")[3]
                                            .split("/")[0];
                                        var progress2 = cont[0].description
                                            .split("/")[3]
                                            .split("]")[0];
                                    } catch (error) {
                                        global.quest = false;
                                    }
                                }
                            }

                            if (global.quest) {
                                socketio.emit("quest", {
                                    quest: `${global.questtitle}`,
                                    progress: `${progress1} / ${progress2}`,
                                    date: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                                });

                                if (!global.etoken) {
                                    if (quest.includes("Say 'owo'")) {
                                        global.quest = false;
                                        return questsayowo(
                                            token,
                                            channelid,
                                            parseInt(progress1),
                                            parseInt(progress2)
                                        );
                                    } else if (
                                        quest.includes(
                                            "xp from hunting and battling"
                                        )
                                    ) {
                                        global.quest = false;
                                        if (tokentype == "Main Token")
                                            global.mainquest = false;
                                        else global.extraquest = false;
                                        return xpquests(
                                            token,
                                            channelid,
                                            tokentype
                                        );
                                    } else {
                                        if (tokentype == "Main Token")
                                            global.mainquest = true;
                                        else global.extraquest = true;
                                        if (quest.includes("Gamble")) {
                                            global.quest = false;
                                            return questgamble(
                                                token,
                                                channelid,
                                                parseInt(progress1), //coded by @mid0aria on github
                                                parseInt(progress2)
                                            );
                                        } else if (
                                            quest.includes("Use an action")
                                        ) {
                                            global.quest = false;
                                            return questuseactioncommand(
                                                token,
                                                channelid,
                                                parseInt(progress1), //coded by @mid0aria on github
                                                parseInt(progress2)
                                            );
                                        }
                                    }
                                } else {
                                    if (
                                        quest.includes(
                                            "Have a friend curse you"
                                        )
                                    ) {
                                        global.quest = false;
                                        return questcurseme(
                                            extratoken,
                                            maintokenuserid,
                                            channelid,
                                            parseInt(progress1),
                                            parseInt(progress2)
                                        );
                                    } else if (
                                        quest.includes(
                                            "Have a friend pray to you"
                                        )
                                    ) {
                                        global.quest = false; //coded by @mid0aria on github
                                        return questprayme(
                                            extratoken,
                                            maintokenuserid,
                                            channelid,
                                            parseInt(progress1),
                                            parseInt(progress2)
                                        );
                                    } else if (
                                        quest.includes("Battle with a friend")
                                    ) {
                                        global.quest = false;
                                        return questbattlefriend(
                                            token,
                                            extratoken,
                                            maintokenuserid,
                                            channelid,
                                            parseInt(progress1),
                                            parseInt(progress2)
                                        );
                                    } else if (
                                        quest.includes(
                                            "Receive a cookie from 1 friends"
                                        )
                                    ) {
                                        global.quest = false;
                                        return questcookiefriend(
                                            extratoken,
                                            maintokenuserid,
                                            channelid,
                                            parseInt(progress1),
                                            parseInt(progress2)
                                        );
                                    }
                                }
                            }
                        }
                    } catch (error) {
                        updateerrorsocket("Unable to check Quest");
                        console.log(
                            chalk.red(
                                `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                            ) +
                                chalk.magenta(` [${tokentype}]`) +
                                chalk.red("Unable to check quest❗")
                        );

                        console.error(error);
                    }
                }
            );
        }
    );
}

async function questsayowo(token, channelid, pro1, pro2) {
    for (let np = pro2 - pro1; np > 0; np--) {
        request.post({
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: "owo",
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        });
        var socketp = pro1;
        var socketpro1 = socketp++;
        updatequestssocket(socketpro1, pro2);
        await delay(32500);
        for (let sayowoelaina = 0; sayowoelaina < 4; sayowoelaina++) {
            elaina2(token, channelid);
            await delay(2000);
        }
    }
    global.quest = true;
    getquests(token, channelid);
}

async function xpquests(token, channelid, tokentype) {
    await delay(540000);
    global.quest = true;
    if (tokentype == "Main Token") global.mainquest = true;
    else global.extraquest = true;
    getquests(token, channelid, tokentype);
}

async function questcurseme(token, userid, channelid, pro1, pro2) {
    for (let np = pro2 - pro1; np > 0; np--) {
        request.post({
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `owo curse <@${userid}>`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        });
        var socketp = pro1;
        var socketpro1 = socketp++;
        updatequestssocket(socketpro1, pro2);
        await delay(302000);
    }
    global.quest = true;
    getquests(token, channelid);
}

async function questprayme(token, userid, channelid, pro1, pro2) {
    for (let np = pro2 - pro1; np > 0; np--) {
        request.post({
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `owo pray <@${userid}>`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        });
        var socketp = pro1;
        var socketpro1 = socketp++;
        updatequestssocket(socketpro1, pro2);
        await delay(302000);
    }
    global.quest = true;
    getquests(token, channelid);
}

async function questbattlefriend(
    maintoken,
    extratoken,
    mainuserid,
    channelid,
    pro1,
    pro2
) {
    for (let np = pro2 - pro1; np > 0; np--) {
        request.post({
            headers: {
                authorization: extratoken,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `owo battle <@${mainuserid}>`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        });
        await delay(7800);
        request.post({
            headers: {
                authorization: maintoken,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `owo ab`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        });
        var socketp = pro1;
        var socketpro1 = socketp++;
        updatequestssocket(socketpro1, pro2);
        await delay(15000);
    }
    global.quest = true;
    getquests(maintoken, channelid);
}

async function questgamble(token, channelid, pro1, pro2) {
    for (let np = pro2 - pro1; np > 0; np--) {
        request.post({
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `owo cf 1`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        });
        var socketp = pro1;
        var socketpro1 = socketp++;
        updatequestssocket(socketpro1, pro2);
        await delay(16000);
    }
    global.quest = true;
    getquests(token, channelid);
}

async function questcookiefriend(token, userid, channelid, pro1, pro2) {
    for (let np = pro2 - pro1; np > 0; np--) {
        request.post({
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `owo cookie <@${userid}>`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        });
        var socketp = pro1;
        var socketpro1 = socketp++;
        updatequestssocket(socketpro1, pro2);
        await delay(302000);
    }
    global.quest = true;
    getquests(token, channelid);
}

async function questuseactioncommand(token, userid, channelid, pro1, pro2) {
    for (let np = pro2 - pro1; np > 0; np--) {
        request.post({
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `owo cuddle <@408785106942164992> `,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        });
        var socketp = pro1;
        var socketpro1 = socketp++;
        updatequestssocket(socketpro1, pro2);
        await delay(7800);
    }
    global.quest = true;
    getquests(token, channelid);
}

//----------------------------------------------------BanCheck + Similar Bypass----------------------------------------------------//

function bancheck(token, channelid) {
    request.get(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=5`,
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            var bod = JSON.parse(body);
            if (!bod[0]) return;
            var cont = bod[0].content;

            if (
                cont.toLowerCase().includes("captcha") ||
                cont
                    .toLowerCase()
                    .includes(
                        "please complete your captcha to verify that you are human!"
                    )
            ) {
                global.mainbanc = false;
                console.clear();
                console.log(
                    chalk.red(
                        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                    ) +
                        chalk.magenta(" [Main Token]") +
                        chalk.red(" Chat Captcha! ❌")
                );
                if (notifymethod == "notify") {
                    for (let i = 0; i < notifynumber; i++) {
                        notifier.notify({
                            title: "(Main Token) Captcha Detected!",
                            message: "Solve the captcha and restart the bot!",
                            icon: "./utils/captcha.png",
                            sound: true,
                            wait: true,
                            appID: "OwO Farm Bot",
                        });
                    }
                }
                if (notifymethod == "promt") {
                    for (let i = 0; i < notifynumber; i++)
                        setTimeout(() => createpromt("Main Token"), 1600);
                }
                setTimeout(() => {
                    updateerrorsocket("(Main Token) Solve Captcha!");
                    process.exit(0);
                }, 1600);
            } else {
                global.mainbanc = true;
                elaina2(token, channelid);
                console.log(
                    chalk.red(
                        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                    ) +
                        chalk.magenta(" [Main Token]") +
                        chalk.green(" Chat Captcha Checked ✅")
                );
                setTimeout(() => {
                    sleepy("Main", "Chat Captcha");
                }, 5000);
            }
        }
    );
}

function extrabancheck(token, channelid) {
    request.get(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=5`,
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            var bod = JSON.parse(body);
            if (!bod[0]) return;
            var cont = bod[0].content;
            if (
                cont.toLowerCase().includes("captcha") ||
                cont
                    .toLowerCase()
                    .includes(
                        "please complete your captcha to verify that you are human!"
                    )
            ) {
                global.extrabanc = false;
                console.clear();
                console.log(
                    chalk.red(
                        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                    ) +
                        chalk.magenta(" [Extra Token]") +
                        chalk.red(" Chat Captcha! ❌")
                );
                if (notifymethod == "notify") {
                    for (let i = 0; i < notifynumber; i++) {
                        notifier.notify({
                            title: "(Extra Token) Captcha Detected!",
                            message: "Solve the captcha and restart the bot!",
                            icon: "./utils/captcha.png",
                            sound: true,
                            wait: true,
                            appID: "OwO Farm Bot",
                        });
                    }
                }
                if (notifymethod == "promt") {
                    for (let i = 0; i < notifynumber; i++)
                        setTimeout(() => createpromt("Extra Token"), 1600);
                }
                setTimeout(() => {
                    updateerrorsocket("(Extra Token) Solve Captcha!");
                    process.exit(0);
                }, 1600);
            } else {
                global.extrabanc = true;
                elaina2(token, channelid);
                console.log(
                    chalk.red(
                        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                    ) +
                        chalk.magenta(" [Extra Token]") +
                        chalk.green(" Chat Captcha Checked ✅")
                );
                setTimeout(() => {
                    sleepy("Extra", "Chat Captcha");
                }, 5000);
            }
        }
    );
}

function dmbancheck(token, channelid) {
    request.get(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=1`,
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            var bod = JSON.parse(body);
            if (bod[0] == undefined) {
                dmprotectprouwu(token, channelid, "Main Token");
            } else {
                var cont = bod[0].content;

                if (
                    cont.toLowerCase().includes("are you a real human?") ||
                    cont
                        .toLowerCase()
                        .includes(
                            "please complete your captcha to verify that you are human!"
                        )
                ) {
                    global.mainbanc = false;
                    console.clear();
                    console.log(
                        chalk.red(
                            `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                        ) +
                            chalk.magenta(" [Main Token]") +
                            chalk.red(" DM Captcha! ❌")
                    );
                    if (notifymethod == "notify") {
                        for (let i = 0; i < notifynumber; i++) {
                            notifier.notify({
                                title: "(Main Token) Captcha Detected!",
                                message:
                                    "Solve the captcha and restart the bot!",
                                icon: "./utils/captcha.png",
                                sound: true,
                                wait: true,
                                appID: "OwO Farm Bot",
                            });
                        }
                    }
                    if (notifymethod == "promt") {
                        for (let i = 0; i < notifynumber; i++)
                            setTimeout(() => createpromt("Main Token"), 1600);
                    }
                    setTimeout(() => {
                        updateerrorsocket("(Main Token) Solve DM Captcha!");
                        process.exit(0);
                    }, 1600);
                } else {
                    global.mainbanc = true;
                    console.log(
                        chalk.red(
                            `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                        ) +
                            chalk.magenta(" [Main Token]") +
                            chalk.green(" DM Captcha Checked ✅")
                    );

                    setTimeout(() => {
                        sleepy("Main", "Dm Captcha");
                    }, 2000);
                }
            }
        }
    );
}

function dmextrabancheck(token, channelid) {
    request.get(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=1`,
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            var bod = JSON.parse(body);
            if (bod[0] == undefined) {
                dmprotectprouwu(token, channelid, "Extra Token");
            } else {
                var cont = bod[0].content;
                if (
                    cont.toLowerCase().includes("are you a real human?") ||
                    cont
                        .toLowerCase()
                        .includes(
                            "please complete your captcha to verify that you are human!"
                        )
                ) {
                    global.extrabanc = false;
                    console.clear();
                    console.log(
                        chalk.red(
                            `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                        ) +
                            chalk.magenta(" [Extra Token]") +
                            chalk.red(" DM Captcha! ❌")
                    );
                    if (notifymethod == "notify") {
                        for (let i = 0; i < notifynumber; i++) {
                            notifier.notify({
                                title: "(Extra Token) Captcha Detected!",
                                message:
                                    "Solve the captcha and restart the bot!",
                                icon: "./utils/captcha.png",
                                sound: true,
                                wait: true,
                                appID: "OwO Farm Bot",
                            });
                        }
                    }
                    if (notifymethod == "promt") {
                        for (let i = 0; i < notifynumber; i++)
                            setTimeout(() => createpromt("Extra Token"), 1600);
                    }
                    setTimeout(() => {
                        updateerrorsocket("(Extra Token) Solve DM Captcha!");
                        process.exit(0);
                    }, 1600);
                } else {
                    global.extrabanc = true;
                    console.log(
                        chalk.red(
                            `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                        ) +
                            chalk.magenta(" [Extra Token]") +
                            chalk.green(" DM Captcha Checked ✅")
                    );
                    setTimeout(() => {
                        sleepy("Extra", "DM Captcha");
                    }, 2000);
                }
            }
        }
    );
}

function dmprotectprouwu(token, channelid, tokentype) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
                "super-x": autoseed(token),
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: "hi bro",
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (err, res, body) {
            if (body) {
                console.log(
                    chalk.red(
                        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                    ) +
                        chalk.magenta(` [${tokentype}]`) +
                        chalk.red(" OwO dm channel id incorrect ❌")
                );
            }
        }
    );
}

function elaina2(token, channelid, phrasesFilePath) {
    // Read the JSON
    fs.readFile("./phrases/phrases.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return diagnosticreport(err);
        }

        // Parse the JSON data
        try {
            const phrasesObject = JSON.parse(data);
            const phrases = phrasesObject.phrases;

            if (!phrases || !phrases.length) {
                console.log("Phrases array is undefined or empty.");
                return;
            }

            let result = Math.floor(Math.random() * phrases.length);

            var ilu = phrases[result];
            //E <3
            typing(token, channelid);
            request.post({
                headers: {
                    authorization: token,
                },
                url: `https://discord.com/api/v9/channels/${channelid}/messages`,

                json: {
                    content: ilu,
                    nonce: nonce(),
                    tts: false,
                    flags: 0,
                },
            });
        } catch (error) {
            if (error) {
                console.error(error);
            }
        }
    });
}

function createpromt(tokentype) {
    const psCommands = [
        "Add-Type -AssemblyName PresentationFramework",
        "[System.Windows.MessageBox]::" +
            `Show(\'Captcha detected on ${tokentype}! App Aborted!\', \'OwO Farm Bot\', \'OK\', \'Warning\')`,
    ];
    const psScript = psCommands.join("; ");
    cp.exec(`powershell.exe -ExecutionPolicy Bypass -Command "${psScript}"`);
}

//----------------------------------------------------CHECK IF HUNTED OR BATTLED----------------------------------------------------//
//little help from random guys
//training myself, for better future, for the love for her <3
function huntcheck(token, tokentype, channelid, checknumber) {
    request.get(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=${checknumber}`,
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            var bod = JSON.parse(body);
            if (!bod[0]) return;
            var cont = bod[0].content;

            if (cont.includes("You found:") || cont.includes("and caught a")) {
                global.mainhuntc = true;
                triggerhunt();
                if (settings.banbypass && !global.mainhuntpaused) {
                    if (global.mainfirstrun) global.mainfirstrun = false;
                    else {
                        bancheck(maintoken, mainchannelid);
                        dmbancheck(maintoken, owodmmainchannelid);
                    }
                }

                if (cont.includes("3/3") && cont.includes("lootbox"))
                    global.mainhuntdaily = true;
            } else {
                checknumber = checknumber + 1;
                if (checknumber >= 8) {
                    global.mainhuntc = true;
                    triggerhunt();
                    if (settings.banbypass && !global.mainhuntpaused) {
                        if (global.mainfirstrun) global.mainfirstrun = false;
                        else {
                            bancheck(maintoken, mainchannelid);
                            dmbancheck(maintoken, owodmmainchannelid);
                        }
                    }
                    return;
                } else
                    setTimeout(
                        () =>
                            huntcheck(token, tokentype, channelid, checknumber),
                        1600
                    );
            }
        }
    );
}

function battlecheck(token, tokentype, channelid, checknumber) {
    request.get(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=${checknumber}`,
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            var bod = JSON.parse(body);
            if (!bod[0]) return;
            var cont = bod[0].embeds;

            if (
                cont.length > 0 &&
                (cont[0].author.name.includes("goes into battle") ||
                    cont[0].footer.text.includes("your team gained"))
            ) {
                global.mainbattlec = true;
                triggerbattle();
                if (settings.banbypass && global.mainhuntpaused) {
                    if (global.mainfirstrun) global.mainfirstrun = false;
                    else {
                        bancheck(maintoken, mainchannelid);
                        dmbancheck(maintoken, owodmmainchannelid);
                    }
                }

                if (
                    bod[0].content.includes("weapon crate") &&
                    bod[0].content.includes("3/3")
                )
                    global.mainbattledaily = true;
            } else {
                checknumber = checknumber + 1;
                if (checknumber >= 8) {
                    global.mainbattlec = true;
                    triggerbattle();
                    if (settings.banbypass && global.mainhuntpaused) {
                        if (global.mainfirstrun) global.mainfirstrun = false;
                        else {
                            bancheck(maintoken, mainchannelid);
                            dmbancheck(maintoken, owodmmainchannelid);
                        }
                    }
                    return;
                } else
                    setTimeout(
                        () =>
                            battlecheck(
                                token,
                                tokentype,
                                channelid,
                                checknumber
                            ),
                        1600
                    );
            }
        }
    );
}

function extrahuntcheck(token, tokentype, channelid, checknumber) {
    request.get(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=${checknumber}`,
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            var bod = JSON.parse(body);
            if (!bod[0]) return;
            var cont = bod[0].content;

            if (cont.includes("You found:") || cont.includes("and caught a")) {
                global.extrahuntc = true;
                triggerextrahunt();
                if (settings.banbypass && global.extrahuntpaused) {
                    if (global.extrafirstrun) global.extrafirstrun = false;
                    else {
                        bancheck(extratoken, extrachannelid);
                        dmbancheck(extratoken, owodmextrachannelid);
                    }
                }

                if (cont.includes("3/3") && cont.includes("lootbox"))
                    global.extrahuntdaily = true;
            } else {
                checknumber = checknumber + 1;
                if (checknumber >= 8) {
                    global.extrahuntc = true;
                    triggerextrahunt();
                    if (settings.banbypass && global.extrahuntpaused) {
                        if (global.extrafirstrun) global.extrafirstrun = false;
                        else {
                            bancheck(extratoken, extrachannelid);
                            dmbancheck(extratoken, owodmextrachannelid);
                        }
                    }
                    return;
                } else
                    setTimeout(
                        () =>
                            extrahuntcheck(
                                token,
                                tokentype,
                                channelid,
                                checknumber
                            ),
                        1600
                    );
            }
        }
    );
}

function extrabattlecheck(token, tokentype, channelid, checknumber) {
    request.get(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=${checknumber}`,
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
            }
            var bod = JSON.parse(body);
            if (!bod[0]) return;
            var cont = bod[0].embeds;

            if (
                cont.length > 0 &&
                (cont[0].author.name.includes("goes into battle") ||
                    cont[0].footer.text.includes("your team gained"))
            ) {
                global.extrabattlec = true;
                triggerextrabattle();
                if (settings.banbypass && global.extrahuntpaused) {
                    if (global.extrafirstrun) global.extrafirstrun = false;
                    else {
                        bancheck(extratoken, extrachannelid);
                        dmbancheck(extratoken, owodmextrachannelid);
                    }
                }

                if (
                    bod[0].content.includes("weapon crate") &&
                    bod[0].content.includes("3/3")
                )
                    global.extrabattledaily = true;
            } else {
                checknumber = checknumber + 1;
                if (checknumber >= 8) {
                    global.extrabattlec = true;
                    triggerextrabattle();
                    if (settings.banbypass && !global.extrahuntpaused) {
                        if (global.extrafirstrun) global.extrafirstrun = false;
                        else {
                            bancheck(extratoken, extrachannelid);
                            dmbancheck(extratoken, owodmextrachannelid);
                        }
                    }
                    return;
                } else
                    setTimeout(
                        () =>
                            extrabattlecheck(
                                token,
                                tokentype,
                                channelid,
                                checknumber
                            ),
                        1600
                    );
            }
        }
    );
}
