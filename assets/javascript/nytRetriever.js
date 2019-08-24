let topic='';
let key='olLxyaAGoNDfbLbvCY3tB9AmFzj2c75i';
let start_year;
let end_year;
let articleCount;

let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+key+"&q=";
// let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=olLxyaAGoNDfbLbvCY3tB9AmFzj2c75i";
// let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=olLxyaAGoNDfbLbvCY3tB9AmFzj2c75i&&begin_date=20120101&end_date=20121231";
// let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=olLxyaAGoNDfbLbvCY3tB9AmFzj2c75i&&begin_date=20120101&end_date=20121231";
$("#search-button").on("click", function(event){
    event.preventDefault();
    topic = $("#search-term").val();
    queryURL += topic;
    start_year = $("#start-year").val();
    end_year = $("#end-year").val();
    articleCount = $(".number-select").val();

    console.log(start_year);
    console.log(end_year);

    if(start_year != ''){
      queryURL +="&begin_date="+start_year+"0101";
    }
    if(end_year != ''){
      queryURL +="&end_date="+end_year+"1231";
    }
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response){
        for(let i=0; i<articleCount; i++){   
          let headline=response.response.docs[i].headline.main;
          let authors=response.response.docs[i].byline.original;
          
          const newDiv=$("<div class='tmpResults'>");
          newDiv.append(i+1)
          newDiv.append(headline)
          newDiv.append(authors)
          $(".panel").append(newDiv);

      }
      })
      .catch(function(error){
          alert("error");
      });
      // alert("end");
});

$("#clear-all").on("click", function(event){
  event.preventDefault();
  $(".tmpResults").empty();
  
})
