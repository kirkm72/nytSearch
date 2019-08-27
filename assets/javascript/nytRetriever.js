const key='olLxyaAGoNDfbLbvCY3tB9AmFzj2c75i';
const queryUrlDefault = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+key+"&q=";
// let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=olLxyaAGoNDfbLbvCY3tB9AmFzj2c75i";
// let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=olLxyaAGoNDfbLbvCY3tB9AmFzj2c75i&&begin_date=20120101&end_date=20121231";
// let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=olLxyaAGoNDfbLbvCY3tB9AmFzj2c75i&&begin_date=20120101&end_date=20121231";
$(document.body).on("click", "#search-button", function(event){
    event.preventDefault();
    let queryUrl = queryUrlDefault;
    const topic = $("#search-term").val();
    queryUrl += topic;
    const start_year = $("#start-year").val();
    const end_year = $("#end-year").val();
    const articleCount = $(".number-select").val();

    console.log(start_year);
    console.log(end_year);

    if(start_year != ''){
      queryUrl +="&begin_date="+start_year+"0101";
    }
    if(end_year != ''){
      queryUrl +="&end_date="+end_year+"1231";
    }
    console.log(queryUrl);
    $.ajax({
        url: queryUrl,
        method: "GET"
      })
      .then(function(response){
        $(".tmpResults").empty();
        for(let i=0; i<articleCount; i++){   
          const headline=response.response.docs[i].headline.main;
          const authors=response.response.docs[i].byline.original;
          const link=response.response.docs[i].web_url;

          const newDiv=$("<div class='tmpResults'>");
          const newLink=$("<a>");
          newLink.attr("href", link);
          newLink.attr("target", "_blank");
          newLink.text(headline);

          newDiv.append((i+1) + ": ");
          newDiv.append(newLink);
          newDiv.append(" - " + authors);
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
  $("#search-term").val("");
  $("#start-year").val("");
  $("#end-year").val("");
  $(".number-select").val("5");
});