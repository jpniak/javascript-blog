'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

  /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }

  /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);
    clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
    
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
}


  /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href')
    console.log('Clicked selector is:', articleSelector)

  /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector)
    console.log('Chosen article is:', targetArticle)
    
  /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log('Active article is:', targetArticle);
}

    

//Second part - submodule 5.4

    const optArticleSelector = '.post', optTitleSelector = '.post-title', optTitleListSelector = '.titles';

function generateTitleLinks(){
    console.log('function generateTitleLinks has started')

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector)
    console.log('znaleziono liste linkow')
    titleList.innerHTML = '';
    console.log('wyczyszczono liste linkow')
    
    /* find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector);

    
    let html = '';
    
    /* for each article */
    for(let article of articles){ // Co ta pętla ma robić?, bo już się zgubiłem... ah, chyba wiem - te punkty z komentarzy :-)
    
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('pobrano atrybuty ID');
    
    
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('odczytano tytul artykulu');
    
    /* get the title from the title element */
    //wg mnie to powyzej tez TO robi...
    
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
        
    /* insert link into html variable */
    html = html + linkHTML;        
    }
    
    titleList.innerHTML = html;
    
    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for(let link of links){
    link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();