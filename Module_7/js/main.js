const posts = [
    {
      img: "https://placeimg.com/400/150/arch",
      title: "Post title 1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
      link: 'link-1.com'
    },
    {
      img: "https://placeimg.com/400/150/nature",
      title: "Post title 2",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
      link: 'link-2.com'
    },
    {
      img: "https://placeimg.com/400/150/arch",
      title: "Post title 3",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
      link: 'link-3.com'
    }
  ];
  
  const root = document.querySelector('#root');
  
  const elements = createCardItem(posts);
  root.append(elements);
  console.log(createCardItem);
  
  // function createCardItem(arr) {
  //   const elements = [];
    
  //   arr.forEach(item => {
  //     const el = createPostCard(item);
  //     elements.push(el);
  //   });
  //   return elements;
  // };
  
  //or

  function createCardItem(arr) {
    return arr.reduce((acc, el) => acc.concat(createPostCard(el)), []);
  };
  
  function createPostCard({img, title, text, link}) {
    const wrap = document.createElement('div');
    wrap.className = "post";
    root.append(wrap);
    
    const image = document.createElement('img');
    image.className = "post__image";
    image.setAttribute('src', img);
    
     const titleText = document.createElement('h2');
     titleText.className = "post__text";
     titleText.textContent = title;
    
     const textCont = document.createElement('p');
     textCont.className = "post__text";
     textCont.textContent = text;
    
     const linkButton = document.createElement('a');
     linkButton.className = "button";
     linkButton.textContent = "Read more";
     linkButton.setAttribute('href', link);
    
     wrap.append(image);
     wrap.append(titleText);
     wrap.append(textCont);
     wrap.append(linkButton);
  };