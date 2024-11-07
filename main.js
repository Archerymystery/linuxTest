const osObj = {
  Ubuntu: {
    icon: "https://cdn2.iconfinder.com/data/icons/metro-ui-icon-set/512/OS_Ubuntu.png",
    enterLevel: 1,
    stable: true,
    fromBox: true,
    characteristics: ["DE", "daily use", "snap"],
  },
  Debian: {
    icon: "https://cdn1.iconfinder.com/data/icons/Vista-Inspirate_1.0/128x128/apps/debian.png",
    enterLevel: 2,
    stable: true,
    fromBox: true,
    characteristics: ["DE", "daily use"],
  },
  "Arch Linux": {
    icon: "https://www.shareicon.net/download/2015/09/11/99301_archlinux.svg",
    enterLevel: 3,
    stable: false,
    fromBox: false,
    characteristics: ["DE", "WM", "daily use", "gaming"],
  },
  BlackArch: {
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/BlackArch_logo.png/250px-BlackArch_logo.png",
    enterLevel: 3,
    stable: false,
    fromBox: false,
    characteristics: ["DE", "WM", "anonymous"],
  },
  Manjaro: {
    icon: "https://static-00.iconduck.com/assets.00/manjaro-icon-2048x2048-v1i92etv.png",
    enterLevel: 1,
    stable: false,
    fromBox: true,
    characteristics: ["DE", "WM", "daily use", "gaming"],
  },
  "Linux Mint": {
    icon: "https://static-00.iconduck.com/assets.00/distributor-logo-linux-mint-icon-512x512-hrp3xyqk.png", // This one remains PNG
    enterLevel: 1,
    stable: true,
    fromBox: true,
    characteristics: ["DE", "daily use", "snap"],
  },
  "Elementary OS": {
    icon: "https://static-00.iconduck.com/assets.00/elementary-os-icon-256x256-1qcp698e.png", // Already PNG
    enterLevel: 1,
    stable: true,
    fromBox: true,
    characteristics: ["DE", "daily use"],
  },
  "Kali Linux": {
    icon: "https://static-00.iconduck.com/assets.00/distributor-logo-kali-icon-512x512-7y8c173y.png", // This one remains PNG
    enterLevel: 3,
    stable: false,
    fromBox: true,
    characteristics: ["DE", "anonymous"],
  },

  Gentoo: {
    icon: "https://cdn0.iconfinder.com/data/icons/flat-round-system/512/gentoo-512.png", // This one remains PNG
    enterLevel: 3,
    stable: true,
    fromBox: false,
    characteristics: ["DE", "WM", "daily use"],
  },
  Slackware: {
    icon: "https://cdn1.iconfinder.com/data/icons/system-black-circles/512/slackware-256.png", // This one remains PNG
    enterLevel: 3,
    stable: true,
    fromBox: false,
    characteristics: ["DE", "daily use"],
  },
  "MX Linux": {
    icon: "https://static-00.iconduck.com/assets.00/mxlinux-icon-512x460-qwzlwvy2.png", // PNG
    enterLevel: 1,
    stable: true,
    fromBox: true,
    characteristics: ["DE", "daily use"],
  },
  "Puppy Linux": {
    icon: "https://static-00.iconduck.com/assets.00/puppy-linux-icon-512x512-voeek34m.png", // PNG
    enterLevel: 2,
    stable: true,
    fromBox: true,
    characteristics: ["DE", "daily use"],
  },
  Lubuntu: {
    icon: "https://static-00.iconduck.com/assets.00/distributor-logo-lubuntu-icon-512x512-tje143fd.png", // This one remains PNG
    enterLevel: 1,
    stable: true,
    fromBox: true,
    characteristics: ["DE", "daily use"],
  },
  Xubuntu: {
    icon: "https://static-00.iconduck.com/assets.00/xubuntu-icon-512x512-v1ltp5cb.png", // This one remains PNG
    enterLevel: 1,
    stable: true,
    fromBox: true,
    characteristics: ["DE", "gaming", "daily use"],
  },
};

let questions = {
  "Як добре ви знаєте лінукс?": {
    a1: ["В перше чую про нього", 1],
    a2: ["Я досить впевнений у своїх навичках", 2],
    a3: ["Я дуже добре знаю лінукс", 3],
  },
  "Ви хочете щоб OS була готова з коробки?": {
    a1: ["Так", true],
    a2: ["Ні", false],
  },
  "Оберіть один пункт": {
    a1: ["Швидкі оновлення", false],
    a2: ["Стабільність", true],
  },
  "Оберіть GUI яке ви хочете\n\nМожна обрати декілька варіантів": {
    a1: ["Desktop environment", "DE"],
    a2: ["Window manager", "WM"],
  },
  "Для чого ви хочете використовувати Лінукс\n\nМожна обрати декілька варіантів":
    {
      a1: ["Геймінг", "daily use"],
      a2: ["Щоденне використання", "gaming"],
      a3: ["Анонімність", "anonymous"],
    },
  "Як ви віднесетесь до snap": {
    a1: ["Обожнюю", "snap"],
    a2: ["В перше чую/без різниці", ""],
    a3: ["Ненавиджу", "no snap"],
  },
};
let choseOS = {
  enterLevel: null,
  stable: null,
  fromBox: null,
  characteristics: [],
  hate: [],
};
let iter = 0;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function loader() {
  document.getElementById("loader").removeAttribute("hidden");
  document.getElementById("test").setAttribute("hidden", true);
  await sleep(100);
  document.getElementById("test").removeAttribute("hidden");
  document.getElementById("loader").setAttribute("hidden", true);
}
function findClosestOS(choseOS, osList) {
  const results = [];

  for (let osName in osList) {
    const osData = osList[osName];
    let score = 0;
    const matchedCharacteristics = [];
    const unmatchedCharacteristics = [];
    let enterLevel = null;
    if (osData.enterLevel == 1) {
      enterLevel = "Для початківців";
    } else if (osData.enterLevel == 2) {
      enterLevel = "Для досвідчених користувачів";
    } else {
      enterLevel = "Для експертів";
    }
    if (choseOS.enterLevel === osData.enterLevel) {
      matchedCharacteristics.push(`${enterLevel}`);
      score += 2;
    } else {
      unmatchedCharacteristics.push(`${enterLevel}`);
    }

    if (choseOS.stable === osData.stable) {
      matchedCharacteristics.push(
        `${osData.stable ? "Стабільний" : "Швидко оновлюється"}`
      );
      score += 3;
    } else {
      unmatchedCharacteristics.push(
        `${osData.stable ? "Стабільний" : "Швидко оновлюється"}`
      );
    }
    if (choseOS.fromBox === osData.fromBox) {
      matchedCharacteristics.push(
        ` ${osData.fromBox ? "Готовий з коробки" : "Do it your self"}`
      );
      score += 2;
    } else {
      unmatchedCharacteristics.push(
        `${osData.fromBox ? "Готовий з коробки" : "Do it your self"}`
      );
    }

    osData.characteristics.forEach((char) => {
      if (choseOS.characteristics.includes(char)) {
        matchedCharacteristics.push(getCharacteristicDescription(char));
        score += 1;
      } else if (!choseOS.hate.includes(char)) {
        unmatchedCharacteristics.push(getCharacteristicDescription(char));
      }
    });

    const hatedCharacteristics = osData.characteristics
      .filter((char) => choseOS.hate.includes(char))
      .map(getCharacteristicDescription);
    score -= hatedCharacteristics.length * 3;

    results.push({
      os_name: osName,
      score,
      matchedCharacteristics,
      unmatchedCharacteristics,
      hatedCharacteristics,
    });
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}
function getCharacteristicDescription(char) {
  switch (char) {
    case "DE":
      return "Desktop Environment";
    case "WM":
      return "Window Manager";
    case "daily use":
      return "Для щоденного використання";
    case "anonymous":
      return "Зосереджений на приватності";
    case "gaming":
      return "Придатний для ігор";
    case "snap":
      return "Має попередньо встановлений Snap";
    default:
      return char;
  }
}

async function press(a) {
  if (
    document.getElementById("question").textContent ==
    "Як добре ви знаєте лінукс?"
  ) {
    choseOS.enterLevel = questions["Як добре ви знаєте лінукс?"][a][1];
    delete questions["Як добре ви знаєте лінукс?"];
  } else if (
    document.getElementById("question").textContent ==
    "Ви хочете щоб OS була готова з коробки?"
  ) {
    choseOS.fromBox =
      questions["Ви хочете щоб OS була готова з коробки?"][a][1];
    delete questions["Ви хочете щоб OS була готова з коробки?"];
  } else if (
    document.getElementById("question").textContent == "Оберіть один пункт"
  ) {
    choseOS.stable = questions["Оберіть один пункт"][a][1];
    delete questions["Оберіть один пункт"];
    document.getElementById("answers_list").style.height = "90%";
    document.getElementById("confirm").removeAttribute("hidden");
  } else if (
    document.getElementById("question").textContent ==
    "Як ви віднесетесь до snap"
  ) {
    if (a == "a1") {
      choseOS.characteristics.push("snap");
    } else if (a == "a3") {
      choseOS.hate.push("snap");
    }

    delete questions["Як ви віднесетесь до snap"];
    const closestOS = findClosestOS(choseOS, osObj);
    console.log(closestOS);
    let html = ``;
    for (let i = 0; i < closestOS.length; i++) {
      let os = closestOS[i];
      let goodli = ``;
      for (const good of os.matchedCharacteristics) {
        goodli += `\n<li>${good}</li>`;
      }
      let badli = ``;
      for (const bad of os.unmatchedCharacteristics) {
        badli += `\n<li>${bad}</li>`;
      }
      console.log(goodli, badli);
      html += `\n    <div class="container">
          <div class="top-bar" style="background-color:${
            i === 0
              ? "gold"
              : i === 1
              ? "silver"
              : i === 2
              ? "	#CD7F32"
              : "#f0f0f0"
          };">
            <img
              src="${osObj[os.os_name].icon}"
              height="30px"
              alt="${os.os_name}"
              class="icon"
            />
            <span class="text">${os.os_name}</span>
          </div>

          <ul class="point-list positive">
                ${goodli}
          </ul>
          <ul class="point-list negative">
          ${badli}
          </ul>
        </div>`;
    }
    document.getElementById("board").innerHTML = html;
    document.getElementById("box").removeAttribute("hidden");
    document.getElementById("box").style.height = "max-content";
    document.getElementById("board").removeAttribute("hidden");
    document.getElementById("test").setAttribute("hidden", true);
    return;
  } else if (
    document.getElementById("question").textContent == "Ваше ім'я Назар?"
  ) {
  } else {
    document.getElementById(a).classList.toggle("selected");
    return;
  }
  console.log(choseOS);
  const questionsKeys = Object.keys(questions);

  document.getElementById("a1").textContent =
    questions[questionsKeys[0]]["a1"][0];
  document.getElementById("a2").textContent =
    questions[questionsKeys[0]]["a2"][0];
  if (
    questions[questionsKeys[0]] &&
    questions[questionsKeys[0]].hasOwnProperty("a3")
  ) {
    console.log("as");
    document.getElementById("a3").removeAttribute("hidden");
    document.getElementById("a3").textContent =
      questions[questionsKeys[0]]["a3"][0];
  } else {
    document.getElementById("a3").setAttribute("hidden", true);
  }
  document.getElementById("question").textContent = questionsKeys[0];
  await loader();
}

async function Start() {
  document.getElementById("a2").textContent = "Ні";
  document.getElementById("a1").textContent = "Так";
  document.getElementById("question").textContent = "Ви любите біль?";
  document.getElementById("answers_list").style.height = "100%";
  document.getElementById("a3").setAttribute("hidden", true);
  document.getElementById("confirm").setAttribute("hidden", true);
  document.getElementById("start_test").setAttribute("hidden", true);
  document.getElementById("test").removeAttribute("hidden");
}
async function a1() {
  if (iter <= 1) {
    Arch();
    return;
  }

  await press("a1");
}
async function a2() {
  if (iter == 0) {
    document.getElementById("loader").removeAttribute("hidden");
    document.getElementById("test").setAttribute("hidden", true);
    await sleep(100);
    document.getElementById("test").removeAttribute("hidden");
    document.getElementById("loader").setAttribute("hidden", true);

    document.getElementById("a2").textContent = "Ні";
    document.getElementById("a1").textContent = "Так";
    document.getElementById("question").textContent = "Ваше ім'я Назар?";
    document.getElementById("answers_list").style.height = "100%";
    iter += 1;
    return;
  }
  iter += 1;
  await press("a2");
}
async function a3() {
  await press("a3");
}

async function Arch() {
  let html = ``;
  for (let i = 0; i < 20; i++) {
    html += `\n    <div class="container">
        <div class="top-bar" style="background-color:${
          i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "	#CD7F32" : "#f0f0f0"
        };">
          <img
            src="${osObj["Arch Linux"].icon}"
            height="30px"
            alt="Arch Linux"
            class="icon"
          />
          <span class="text">${"Arch Linux"}</span>
        </div>

        <ul class="point-list positive">
              <li>Він ідеальний</li>
        </ul>
        <ul class="point-list negative">
          <li>Мінусів нема</li>
        </ul>
      </div>`;
  }
  document.getElementById("board").innerHTML = html;
  document.getElementById("box").removeAttribute("hidden");
  document.getElementById("box").style.height = "max-content";
  document.getElementById("board").removeAttribute("hidden");
  document.getElementById("test").setAttribute("hidden", true);
}
async function confirm() {
  let l = [];
  for (let i = 1; i <= 3; i++) {
    let element = document.getElementById(`a${i}`);

    if (element.classList.contains("selected")) {
      document.getElementById(`a${i}`).classList.remove("selected");

      choseOS.characteristics.push(
        questions[document.getElementById("question").textContent][`a${i}`][1]
      );
      l.push(
        questions[document.getElementById("question").textContent][`a${i}`][1]
      );
    }
  }
  if (l.length == 0) {
    alert("Ви нічого не обрали");
    return;
  }

  console.log(choseOS);
  delete questions[document.getElementById("question").textContent];
  const questionsKeys = Object.keys(questions);

  document.getElementById("a1").textContent =
    questions[questionsKeys[0]]["a1"][0];
  document.getElementById("a2").textContent =
    questions[questionsKeys[0]]["a2"][0];
  if (
    questions[questionsKeys[0]] &&
    questions[questionsKeys[0]].hasOwnProperty("a3")
  ) {
    console.log("as");
    document.getElementById("a3").removeAttribute("hidden");
    document.getElementById("a3").textContent =
      questions[questionsKeys[0]]["a3"][0];
  } else {
    document.getElementById("a3").setAttribute("hidden", true);
  }
  document.getElementById("question").textContent = questionsKeys[0];
  if (questionsKeys[0] == "Як ви віднесетесь до snap") {
    document.getElementById("answers_list").style.height = "100%";
    document.getElementById("confirm").setAttribute("hidden", true);
  }
  await loader();
}
