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

    const optArticleSelector = '.post',
          optTitleSelector = '.post-title', 
          optTitleListSelector = '.titles', 
          optArticleTagsSelector = '.post-tags .list',
          optArticleAuthorSelector = '.post-author',
          optTagsListSelector = '.tags.list',
          optCloudClassCount = 5,
          optCloudClassPrefix = 'tag-size-',
          optAuthorsListSelector = '.list .authors';

function generateTitleLinks(customSelector = ''){
    console.log('function generateTitleLinks has started');
    console.log('optArticleSelector is:', optArticleSelector, 'customSelector is:', customSelector);
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector)
    console.log('znaleziono liste linkow')
    titleList.innerHTML = '';
    console.log('wyczyszczono liste linkow')
    
    /* find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);


    
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

//Module 6.2

function calculateTagsParams(tags){
    const params = {max: 0, min: 999999};
    
    for (let tag in tags){
        if(tags[tag] > params.max){
  params.max = tags[tag];
        }
        if(tags[tag] < params.min){
  params.min = tags[tag];
        }
        console.log(tag + ' is used ' + tags[tag] + ' times');
    }
    
    return params;
    
}

function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix + classNumber;
    
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    
    
  /* find all articles */
    
    const articles = document.querySelectorAll(optArticleSelector);
    
    console.log('Znaleziono nastepujace artykuly:', articles);

  /* START LOOP: for every article: */
    for(let article of articles){
    
    
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log('Znaleziono nastepujace wrappery tagow:', tagsWrapper);
    
    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('Znaleziono nastepujace tagi:', articleTags)


    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('podzielono tagi i zapisano tablicach:', articleTagsArray)

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
    console.log('wyswietlam osobno kazdy tag:', tag)
        
      /* generate HTML of the link */
        const linkTag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log(linkTag);

      /* add generated code to html variable */
        html = html + linkTag  + ' ';
        console.log(html)
        
      /* [NEW] check if this link is NOT already in allTags */
        if(!allTags.hasOwnProperty(tag)){
            /* [NEW] add generated code to allTags array */
            allTags[tag] = 1;
      } else {
            allTags[tag]++;
      }
        

    /* END LOOP: for each tag */
    }
        
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /* END LOOP: for every article: */
    }
    
  /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    
    let allTagsHTML = '';
    
    for (let tag in allTags){
        allTagsHTML += '<a class='+ calculateTagClass(allTags[tag], tagsParams) +'  href="#tag-' + tag + '">' + tag + '</a> ';
    }
    tagList.innerHTML = allTagsHTML;
    console.log(allTagsHTML);
}
    

generateTags();



function tagClickHandler(event){
    console.log('Function tagClickHandler has started');
    
    
  /* prevent default action for this event */
    event.preventDefault();


  /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Tag was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href')
    console.log('Clicked tag href is:', href)
    
  /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    
  /* find all tag links with class active */
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]')
    console.log(tagLinks)
    
  /* START LOOP: for each active tag link */
    for (let tagLink of tagLinks){
        
    /* remove class active */
    tagLink.classList.remove('active')

  /* END LOOP: for each active tag link */
    }
  /* find all tag links with "href" attribute equal to the "href" constant */
    const allTags = document.querySelectorAll('a[href^="' + href + '"]');    
    
  /* START LOOP: for each found tag link */
    for(const tag of allTags){

    /* add class active */
    tag.classList.add('active');

  /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){
    
  /* find all links to tags */
    const links = document.querySelectorAll('.tags a, .post-tags a');
    
  /* START LOOP: for each link */
    for(let link of links){
    
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  

  /* END LOOP: for each link */
    }
}

addClickListenersToTags();


function generateAuthors(){
    console.log('function generateAuthors has started')
  
    /* [MY] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    
    console.log('Znaleziono nastepujace artykuly:', articles);

  /* START LOOP: for every article: */
    for(let article of articles){
    
    
    /* find tags wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log('Znaleziono nastepujace wrappery tagow:', authorWrapper);
    
    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log('Znaleziono nastepujacych Autorów:', articleAuthor)


    
      /* generate HTML of the link */
        const linkAuthor = '<a href="#-tag' + articleAuthor + '">' + articleAuthor + '</a>';
        console.log(linkAuthor);

      /* add generated code to html variable */
        html = html + linkAuthor  + ' ';
        console.log(html)


    /* insert HTML of all the links into the author wrapper */
    authorWrapper.innerHTML = html;
        
    
    /* [MY] check if this link is NOT already in allTags */
        if(!allAuthors.hasOwnProperty(articleAuthor)){
            /* [NEW] add generated code to allTags array */
            allAuthors[articleAuthor] = 1;
      } else {
            allAuthors[articleAuthor]++;
      }

  /* END LOOP: for every article: */
    }
    
    /* [MY] find list of tags in right column */
    const authorList = document.querySelector('.authors');
 
    //const tagsParams = calculateTagsParams(allTags);
    //console.log('tagsParams:', tagsParams);
    
    let allAuthorsHTML = '';
    
    for (let author in allAuthors){
        allAuthorsHTML += '<li><a href="#-tag' + author + '">' + author + '</a>('+ allAuthors[author] +')</li>';
    }
    authorList.innerHTML = allAuthorsHTML;
    console.log(allAuthorsHTML);
    
    }

 generateAuthors();

function authorClickHandler(event){
    console.log('Function authorClickHandler has started');
    
    
  /* prevent default action for this event */
    event.preventDefault();


  /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Author was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href')
    console.log('Clicked Author href is:', href)
    
  /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#-tag', '');
    
  /* find all author links with class active */
    const authorLinks = document.querySelectorAll('a.active[href^="#-tag"]')
    console.log(authorLinks)
    
  /* START LOOP: for each active tag link */
    for (let authorLink of authorLinks){
        
    /* remove class active */
    authorLink.classList.remove('active')

  /* END LOOP: for each active author link */
    }
  /* find all author links with "href" attribute equal to the "href" constant */
    const allAuthors = document.querySelectorAll('a[href^="' + href + '"]');    
    
  /* START LOOP: for each found author link */
    for(const author of allAuthors){

    /* add class active */
    author.classList.add('active');

  /* END LOOP: for each found author link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors(){
    
  /* find all links to Authors */
    const links = document.querySelectorAll('.post-author a, .authors a');
    
  /* START LOOP: for each link */
    for(let link of links){
    
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  

  /* END LOOP: for each link */
    }
}

addClickListenersToAuthors();
