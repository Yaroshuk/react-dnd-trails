let mousePos = { x: undefined, y: undefined };

function contentLoaded() {
  let canvas = null;
  let ctx = null;
  const store = window.store;
  let subscribed = false;
  let lines = [];

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;
  let worldScale = 1;

  const storeSub = () => {
    lines = store.getState()?.lines || [];
  };

  function getRandomBlueColor() {
    var shadesOfBlue = ["00", "33", "66", "99", "CC", "FF"]; // Значения оттенков для голубого цвета

    // Выбираем случайный оттенок из массива shadesOfBlue
    var randomShade = shadesOfBlue[Math.floor(Math.random() * shadesOfBlue.length)];

    // Создаем случайный цвет в формате HEX, используя выбранный оттенок и фиксированное значение для красного и зеленого
    var randomColor = "#00" + randomShade + randomShade;

    return randomColor;
  }

  const draw = () => {
    if (store && !subscribed) {
      store.subscribe(storeSub);
      subscribed = true;
    }

    if (!canvas) {
      canvas = document.querySelector("#canvas");
      return;
    }

    const canvasRect = canvas.getBoundingClientRect();

    function convert(coords) {
      const x = (coords.x - centerX - canvasRect.x) / worldScale;
      const y = (coords.y - centerY - canvasRect.y) / worldScale;
      return {
        x: x,
        y: y,
      };
    }

    if (!ctx && canvas) {
      canvas.width = canvasRect.width;
      canvas.height = canvasRect.height;
      ctx = canvas.getContext("2d");
      ctx.translate(centerX, centerY);
    }

    ctx.clearRect(-centerX, -centerY, screenWidth, screenHeight);

    function drawTempLine(startX, startY, endX, endY) {
      // Определение контрольных точек для изогнутости линии
      var cp1x = startX + Math.random() * 50 - 25;
      var cp1y = startY + Math.random() * 50 - 25;
      var cp2x = endX + Math.random() * 50 - 25;
      var cp2y = endY + Math.random() * 50 - 25;

      // var cp1x = startX + 10;
      // var cp1y = startY + 50;
      // var cp2x = endX + 10;
      // var cp2y = endY + 50;

      // Определение переменных для контроля шага и длины пунктира
      var dashLen = 5;
      var dashCount = Math.floor(Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) / dashLen);

      var dashOn = true; // Переключатель для отслеживания "включено/выключено"

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);

      var length = ctx.measureText;
      var totalLength = ctx.lineWidth * length;

      var deltaX = (endX - startX) / dashCount;
      var deltaY = (endY - startY) / dashCount;
      var dist = 0; // Счетчик для вычисления длины пройденного пути

      ctx.strokeStyle = getRandomBlueColor();
      // for (var i = 0; i < dashCount; i++) {
      //   var dashX = startX + deltaX * i;
      //   var dashY = startY + deltaY * i;

      //   dist += Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

      //   if (dist >= dashLen) {
      //     dashOn = !dashOn;
      //     dist = 0; // Сбросить счетчик длины пройденного пути
      //   }

      //   if (dashOn) {
      //     ctx.lineTo(dashX, dashY);
      //   } else {
      //     ctx.moveTo(dashX, dashY);
      //   }
      // }

      ctx.stroke(); // Рисуем пунктирную линию
    }

    function drawDottedLine(startX, startY, endX, endY) {
      // Определяем переменные для контроля шага и длины пунктира
      var dashLen = 5;
      var dashCount = Math.floor(Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) / dashLen);

      var dashOn = true; // Переключатель для отслеживания состояния "включено/выключено"

      ctx.beginPath();
      ctx.moveTo(startX, startY);

      ctx.strokeStyle = "black"

      var deltaX = (endX - startX) / dashCount;
      var deltaY = (endY - startY) / dashCount;

      for (var i = 0; i < dashCount; i++) {
        var dashX = startX + deltaX * i;
        var dashY = startY + deltaY * i;

        if (dashOn) {
          ctx.lineTo(dashX, dashY);
        } else {
          ctx.moveTo(dashX, dashY);
        }

        dashOn = !dashOn;
      }

      ctx.stroke(); // Рисуем пунктирную линию
    }

    //const canvasRect = canvas.getBoundingClientRect();

    lines.forEach((item) => {
      if (item.type === "mouse" && item.id[0]) {
        const el1 = document.querySelector(`#${item.id[0]} .block__point`);

        if (!el1) return;
        const react = el1.getBoundingClientRect();

        const reactCord = convert({ x: react.x + react.width / 2, y: react.y + react.height / 2 });
        const mouseCord = convert({ x: mousePos.x, y: mousePos.y });

        drawTempLine(reactCord.x, reactCord.y, mouseCord.x, mouseCord.y);
        // ctx.moveTo(reactCord.x, reactCord.y);
        // ctx.lineTo(mouseCord.x, mouseCord.y);

        // ctx.stroke();

        return;
      }

      if (item.type === "object" && item.id?.length === 2) {
        const el1 = document.querySelector(`#${item.id[0]} .block__point`);
        const el2 = document.querySelector(`#${item.id[1]} .block__point`);

        if (!el1 || !el2) return;
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();

        const reactCord1 = convert({ x: rect1.x + rect1.width / 2, y: rect1.y + rect1.height / 2 });
        const reactCord2 = convert({ x: rect2.x + rect2.width / 2, y: rect2.y + rect2.height / 2 });

        // ctx.beginPath();
        drawDottedLine(reactCord1.x, reactCord1.y, reactCord2.x, reactCord2.y);
        // ctx.moveTo(reactCord1.x, reactCord1.y);
        // ctx.lineTo(reactCord2.x, reactCord2.y);

        // ctx.stroke();

        return;
      }
    });
  };

  setInterval(() => draw(), 10);
}

document.addEventListener("DOMContentLoaded", contentLoaded);

window.addEventListener("mousemove", (event) => {
  mousePos = { x: event.clientX, y: event.clientY };
});
