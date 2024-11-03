function exec() {
    fetch("./js/items.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        res.text().then((data) => {contentTitle = JSON.parse(data);
          if (localStorage.getItem('counter')!=null && localStorage.getItem('counter').length>0) {
            var counter = localStorage.getItem('counter');
            document.getElementById("badge").innerHTML = counter;
          }
          for (let i = 0; i < contentTitle.length; i++) {
            if (contentTitle[i].isAccessory) {
              console.log(contentTitle[i]);
            //   containerAccessories.appendChild(
            //     dynamicClothingSection(contentTitle[i])
            //   );
            } else {
              console.log(contentTitle[i]);
            //   containerClothing.appendChild(
            //     dynamicClothingSection(contentTitle[i])
            //   );
            }
          }});
      })
      .catch((error) => console.error("Unable to fetch data:", error));
  }
  
  exec();