$(document).ready(() => {
  var callData = new CallData();
  var listChosen = new ListChosen();
  function renderHTML() {
    callData
      .getListData()
      .done(function (result) {
        let contentNavPills = "";
        let contentTabPane = "";
        result.navPills.forEach((item, index) => {
          let activeClass = item.tabName === "tabTopClothes" ? "active" : "";
          let fadeClass = item.tabName !== "tabTopClothes" ? "fade" : "";
          contentNavPills += getElementTabPill(item, activeClass);
          contentTabPane += getElementTabPanes(
            item,
            fadeClass,
            activeClass,
            result
          );
        });
        $(".nav-pills").html(contentNavPills);
        $(".tab-content").html(contentTabPane);
      })
      .fail((err) => {
        console.log(err);
      });
  }

  renderHTML();

  function getElementTabPanes(item, fadeClass, activeClass, result) {
    return ` 
    <div class="tab-pane container ${activeClass} ${fadeClass}" id="${
      item.tabName
    }">
        <div class="row">
            ${renderTabPane(item.tabName, result.tabPanes)}
            
        </div>
    </div>`;
  }
  function getElementTabPill(item, activeClass) {
    return `
      <li class="nav-item">
            <a
                class="nav-link ${activeClass} btn-default"
                data-toggle="pill"
                href="#${item.tabName}"
                >${item.showName}</a>
          
        </li>
      `;
  }
  function renderTabPane(tabName, arrTabPane) {
    var tempArr = null;
    var eleItem = null;
    switch (tabName) {
      case "tabTopClothes":
        tempArr = getTypeArr("topclothes", arrTabPane);
        eleItem = getEleItem(tempArr);
        break;
      case "tabBotClothes":
        tempArr = getTypeArr("botclothes", arrTabPane);
        eleItem = getEleItem(tempArr);
        break;
      case "tabShoes":
        tempArr = getTypeArr("shoes", arrTabPane);
        eleItem = getEleItem(tempArr);
        break;
      case "tabHandBags":
        tempArr = getTypeArr("handbags", arrTabPane);
        eleItem = getEleItem(tempArr);
        break;
      case "tabNecklaces":
        tempArr = getTypeArr("necklaces", arrTabPane);
        eleItem = getEleItem(tempArr);
        break;
      case "tabHairStyle":
        tempArr = getTypeArr("hairstyle", arrTabPane);
        eleItem = getEleItem(tempArr);
        break;
      case "tabBackground":
        tempArr = getTypeArr("background", arrTabPane);
        eleItem = getEleItem(tempArr);
        break;
      default:
        break;
    }
    return eleItem;
  }

  function getTypeArr(tabType, data) {
    let tempArr = [];
    data.forEach((item) => {
      if (item.type === tabType) {
        tempArr.push(item);
      }
    });

    return tempArr;
  }

  function getEleItem(tempArr) {
    let content = "";
    tempArr.forEach((item) => {
      content += `
        <div class="col-md-3">
            <div class="card text-center">
                <img
                    src="${item.imgSrc_jpg}"
                    />
                <h4><b>${item.name}</b></h4>
                <button data-id ="${item.id}" data-type ="${item.type}" data-name ="${item.name}" data-desc ="${item.desc} data-imgsrcjpg ="${item.imgSrc_jpg} data-imgsrcpng ="${item.imgSrc_png}" class="changStyle">Thử đồ</button>
          </div>
        </div>
        `;
    });
    return content;
  }

  function findIndex(type) {
    var index = -1;
    if (listChosen.arr && listChosen.arr.length > 0) {
      listChosen.arr.forEach(function (_item, i) {
        if (_item.type === type) {
          index = i;
        }
      });
    }
    return index;
  }

  $("body").delegate(".changStyle", "click", function () {
    let id = $(this).data("id");
    let type = $(this).data("type");
    let name = $(this).data("name");
    let desc = $(this).data("desc");
    let imgsrc_jpg = $(this).data("imgsrcjpg");
    let imgSrc_png = $(this).data("imgsrcpng");

    var chooseItem = new ChooseItem(
      id,
      type,
      name,
      desc,
      imgsrc_jpg,
      imgSrc_png
    );

    var index = findIndex(chooseItem.type);
    if (index !== -1) {
      //update
      listChosen.arr[index] = chooseItem;
      console.log(listChosen);
    } else {
      //addItem
      listChosen.addItem(chooseItem);
    }

    renderContent(listChosen.arr);
  });
});

function renderContent(chooseItem) {
  if (chooseItem && chooseItem.length > 0) {
    chooseItem.forEach(function (item) {
      if (item.type === "topclothes") {
        renderBikiniTop(item.iimgsrc_pngd);
        console.log(item.iimgsrc_pngd);
      }
      if (item.type === "botclothes") {
        renderBikiniBot(item.iimgsrc_pngd);
      }
      if (item.type === "shoes") {
        renderShoes(item.iimgsrc_pngd);
      }
      if (item.type === "handbags") {
        renderHandbags(item.iimgsrc_pngd);
      }
      if (item.type === "necklaces") {
        renderNecklaces(item.iimgsrc_pngd);
      }
      if (item.type === "hairstyle") {
        renderHairstyle(item.iimgsrc_pngd);
      }
      if (item.type === "background") {
        renderBackground(item.iimgsrc_pngd);
      }
    });
  }
}
function renderBikiniTop(img) {
  $(".bikinitop").css({
    width: "500px",
    height: "500px",
    background: `url(${img})`,
    position: "absolute",
    top: "-9%",
    left: "-5%",
    zIndex: "3",
    transform: "scale(0.5)",
  });
}
function renderBikiniBot(img) {
  $(".bikinibottom").css({
    width: "500px",
    height: "1000px",
    background: `url(${img})`,
    position: "absolute",
    top: "-30%",
    left: "-5%",
    zIndex: "2",
    transform: "scale(0.5)",
  });
}
function renderShoes(img) {
  $(".feet").css({
    width: "500px",
    height: "1000px",
    background: `url(${img})`,
    position: "absolute",
    bottom: "-37%",
    right: "-3.5%",
    transform: "scale(0.5)",
    zIndex: "1",
  });
}
function renderHandbags(img) {
  $(".handbag").css({
    width: "500px",
    height: "1000px",
    background: `url(${img})`,
    position: "absolute",
    bottom: "-40%",
    right: "-3.5%",
    transform: "scale(0.5)",
    zIndex: "4",
  });
}
function renderNecklaces(img) {
  $(".necklace").css({
    width: "500px",
    height: "1000px",
    background: `url(${img})`,
    position: "absolute",
    bottom: "-40%",
    right: "-3.5%",
    transform: "scale(0.5)",
    zIndex: "4",
  });
}

function renderHairstyle(img) {
  $(".hairstyle").css({
    width: "1000px",
    height: "1000px",
    background: `url(${img})`,
    position: "absolute",
    top: "-75%",
    right: "-57%",
    transform: "scale(0.15)",
    zIndex: "4",
  });
}
function renderBackground(img) {
  $(".background").css({
    backgroundImage: `url(${img})`,
  });
}
