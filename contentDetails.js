console.clear()
var productList=[]
let id = location.search.split('?')[1]
console.log(id)

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}

function dynamicCartSection(ob, itemCounter) {
    productList.push({
      product_name: ob.name,
      product_brand: ob.brand,
      product_price: ob.price,
      product_qty: itemCounter
    })
 }

function updateCartInfo() {
    fetch("./js/items.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        res.text().then((data) => {
          contentTitle = JSON.parse(data);
  
          let counter = Number(localStorage.getItem('counter') != null ? localStorage.getItem('counter') : 0);
  
          let item = localStorage.getItem('orderId').split(" ");
  
          let i;
          let totalAmount = 0;
          for (i = 0; i < counter; i++) {
            let itemCounter = 1;
            for (let j = i + 1; j < counter; j++) {
              if (Number(item[j]) == Number(item[i])) {
                itemCounter += 1;
              }
            }
            totalAmount += Number(contentTitle[item[i] - 1].price) * itemCounter;
            dynamicCartSection(contentTitle[item[i] - 1], itemCounter);
            i += itemCounter - 1;
          }
          
          adlPushEvent({
            event: "updated_cart",
            pageName: "Content_Details_Page",
            productList,
            totalAmount
          })
        });
      })
      .catch((error) => console.error("Unable to fetch data:", error));
  }

function dynamicContentDetails(ob)
{
    let mainContainer = document.createElement('div')
    mainContainer.id = 'containerD'
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div')
    imageSectionDiv.id = 'imageSection'

    let imgTag = document.createElement('img')
     imgTag.id = 'imgDetails'
     //imgTag.id = ob.photos
     imgTag.src = ob.preview

    imageSectionDiv.appendChild(imgTag)

    let productDetailsDiv = document.createElement('div')
    productDetailsDiv.id = 'productDetails'

    // console.log(productDetailsDiv);

    let h1 = document.createElement('h1')
    let h1Text = document.createTextNode(ob.name)
    h1.appendChild(h1Text)
    h1.classList.add('productName')

    let h4 = document.createElement('h4')
    let h4Text = document.createTextNode(ob.brand)
    h4.appendChild(h4Text)
    h4.classList.add('brandName')
    console.log(h4);

    let detailsDiv = document.createElement('div')
    detailsDiv.id = 'details'

    let h3DetailsDiv = document.createElement('h3')
    let h3DetailsText = document.createTextNode('Rs ' + ob.price)
    h3DetailsDiv.appendChild(h3DetailsText)

    let h3 = document.createElement('h3')
    let h3Text = document.createTextNode('Description')
    h3.appendChild(h3Text)

    let para = document.createElement('p')
    let paraText = document.createTextNode(ob.description)
    para.appendChild(paraText)

    let productPreviewDiv = document.createElement('div')
    productPreviewDiv.id = 'productPreview'

    let h3ProductPreviewDiv = document.createElement('h3')
    let h3ProductPreviewText = document.createTextNode('Product Preview')
    h3ProductPreviewDiv.appendChild(h3ProductPreviewText)
    productPreviewDiv.appendChild(h3ProductPreviewDiv)

    adlPushEvent({
        event: "pageLoad",
        pageName: "Content_Details_Page",
        product_name:ob.name,
        product_brand:ob.brand,
        product_price:ob.price
      })

    let i;
    for(i=0; i<ob.photos.length; i++)
    {
        let imgTagProductPreviewDiv = document.createElement('img')
        imgTagProductPreviewDiv.id = 'previewImg'
        imgTagProductPreviewDiv.src = ob.photos[i]
        imgTagProductPreviewDiv.onclick = function(event)
        {
            console.log("clicked" + this.src)
            imgTag.src = ob.photos[i]
            document.getElementById("imgDetails").src = this.src 
            
        }
        productPreviewDiv.appendChild(imgTagProductPreviewDiv)
    }

    let buttonDiv = document.createElement('div')
    buttonDiv.id = 'button'

    let buttonTag = document.createElement('button')
    buttonDiv.appendChild(buttonTag)

    buttonText = document.createTextNode('Add to Cart')
    buttonTag.onclick  =   function()
    {
        let order = id+" "
        let counter = 1
        /*
        if(document.cookie.indexOf(',counter=')>=0)
        {
            console.log('counter>0')
            order = id + " " + document.cookie.split(',counter')[0].split('=')[1]
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1
        }
        document.cookie = "orderId=" + order + ",counter=" + counter
        console.log(document.cookie)
        */
        if (localStorage.getItem('counter')!=null && localStorage.getItem('counter').length>0)
        {
            console.log('counter>0')
            order = id + " " + localStorage.getItem('orderId')
            counter = Number(localStorage.getItem('counter')) + 1
        }
        localStorage.setItem('counter',counter)
        localStorage.setItem('orderId',order)
        // document.cookie = "orderId=" + order + ",counter=" + counter
        document.getElementById("badge").innerHTML = counter

        adlPushEvent({
        event: "add_to_cart",
        pageName: "Content_Details_Page",
        product_name:ob.name,
        product_brand:ob.brand,
        product_price:ob.price
      })
      updateCartInfo();
    }
    buttonTag.appendChild(buttonText)


    console.log(mainContainer.appendChild(imageSectionDiv));
    mainContainer.appendChild(imageSectionDiv)
    mainContainer.appendChild(productDetailsDiv)
    productDetailsDiv.appendChild(h1)
    productDetailsDiv.appendChild(h4)
    productDetailsDiv.appendChild(detailsDiv)
    detailsDiv.appendChild(h3DetailsDiv)
    detailsDiv.appendChild(h3)
    detailsDiv.appendChild(para)
    productDetailsDiv.appendChild(productPreviewDiv)
    
    
    productDetailsDiv.appendChild(buttonDiv)


    return mainContainer
}




// BACKEND CALLING

let httpRequest = new XMLHttpRequest()
{
    httpRequest.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status == 200)
        {
            console.log('connected!!');
            let contentDetails = JSON.parse(this.responseText)
            {
                console.log(contentDetails);
                dynamicContentDetails(contentDetails)
            }
        }
        else
        {
            console.log('not connected!');
        }
    }
}

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/'+id, true)
httpRequest.send()  
